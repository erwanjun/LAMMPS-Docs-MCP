---
title: "Error and Warning Messages"
description: "Complete list of LAMMPS error and warning messages with explanations"
category: "general"
tags: ["errors", "warnings", "debugging", "troubleshooting"]
commands: []
---
Could not find fix adapt storage fix ID This should not happen unless you explicitly deleted a secondary fix that fix adapt created internally.  

Could not find fix halt variable name Self-explanatory.  

Could not find fix gcmc exclusion group ID Self-explanatory.  

Could not find fix gcmc rotation group ID Self-explanatory.  

Could not find fix group ID A group ID used in the fix command does not exist.  

Could not find fix msst compute ID Self-explanatory.  

Could not find fix poems group ID A group ID used in the fix poems command does not exist.  

Could not find fix recenter group ID A group ID used in the fix recenter command does not exist.  

Could not find fix rigid group ID A group ID used in the fix rigid command does not exist.  

Could not find fix srd group ID Self-explanatory.  

Could not find fix_modify ID A fix ID used in the fix_modify command does not exist.  

Could not find fix_modify pressure ID The compute ID for computing pressure does not exist.  

Could not find fix_modify temperature ID The compute ID for computing temperature does not exist.  

Could not find group clear group ID Self-explanatory.  

Could not find group delete group ID Self-explanatory.  

ld not find pair fix ID A fix is created internally by the pair style to store shear history information. You cannot delete it.  

Could not find set group ID Group ID specified in set command does not exist.  

Could not find specified fix gcmc group ID Self-explanatory.  

Could not find thermo compute ID Compute ID specified in thermo_style command does not exist.  

Could not find thermo custom compute ID The compute ID needed by thermo style custom to compute a requested quantity does not exist.  

Could not find thermo custom fix ID The fix ID needed by thermo style custom to compute a requested quantity does not exist.  

Could not find thermo custom variable name Self-explanatory.  

Could not find thermo fix ID Fix ID specified in thermo_style command does not exist.  

Could not find thermo variable name Self-explanatory.  

Could not find thermo_modify pressure ID The compute ID needed by thermo style custom to compute pressure does not exist.  

Could not find thermo_modify temperature ID The compute ID needed by thermo style custom to compute temperature does not exist.  

Could not find undump ID A dump ID used in the undump command does not exist.  

Could not find velocity group ID A group ID used in the velocity command does not exist.  

uld not find velocity temperature $\pmb{I D}$ The compute ID needed by the velocity command to compute temperature does not exist.  

Could not find/initialize a specified accelerator device Could not initialize at least one of the devices specified for the gpu package  

Could not grab element entry from EIM potential file Self-explanatory  

Could not grab global entry from EIM potential file Self-explanatory.  

Could not grab pair entry from EIM potential file Self-explanatory.  

Could not initialize embedded Python The main module in Python was not accessible.  

uld not open Python file The specified file of Python code cannot be opened. Check that the path and name are correct.  

Could not process Python file The Python code in the specified file was not run successfully by Python, probably due to errors in the Python code.  

Could not process Python string The Python code in the here string was not run successfully by Python, probably due to errors in the Python code.  

Coulomb PPPMDisp order has been reduced below minorder The default minimum order is 2. This can be reset by the kspace_modify minorder command.  

Coulombic cutoff not supported in pair_style buck/long/coul/coul Must use long-range Coulombic interactions.  

Coulombic cutoff not supported in pair_style lj/long/coul/long Must use long-range Coulombic interactions.  

Coulombic cutoff not supported in pair_style lj/long/tip4p/long Must use long-range Coulombic interactions.  

Coulombic cutoffs of pair hybrid sub-styles do not match If using a Kspace solver, all Coulombic cutoffs of long pair styles must be the same.  

Coulombic cut not supported in pair_style lj/long/dipole/long Must use long-range Coulombic interactions.  

Cound not find dump_modify ID Self-explanatory.  

Create_atoms command before simulation box is defined The create_atoms command cannot be used before a read_data, read_restart, or create_box command.  

Create_atoms molecule has atom IDs, but system does not The atom_style id command can be used to force atom IDs to be stored.  

Create_atoms molecule must have atom types The defined molecule does not specify atom types.  

Create_atoms molecule must have coordinates The defined molecule does not specify coordinates.  

Create_atoms region ID does not exist A region ID used in the create_atoms command does not exist.  

Create_bonds command before simulation box is defined Self-explanatory.  

Create_bonds command requires no kspace_style be defined This is so that atom pairs that are already bonded to not appear in the neighbor list.  

eate_bonds command requires special_bonds 1-2 weights be 0.0 This is so that atom pairs that are already bonded to not appear in the neighbor list.  

Create_bonds max distance $>$ neighbor cutoff Can only create bonds for atom pairs that will be in neighbor list.  

Create_bonds requires a pair style be defined Self-explanatory.  

Create_box region ID does not exist Self-explanatory.  

Create_box region does not support a bounding box Not all regions represent bounded volumes. You cannot use such a region with the create_box command.  

Custom floating point vector for fix store/state does not exist The command is accessing a vector added by the fix property/atom command, that does not exist.  

Custom integer vector for fix store/state does not exist The command is accessing a vector added by the fix property/atom command, that does not exist.  

Custom per-atom property ID is not floating point Self-explanatory.  

Custom per-atom property ID is not integer Self-explanatory.  

Cut-offs missing in pair_style lj/long/dipole/long Self-explanatory.  

Cutoffs missing in pair_style buck/long/coul/long Self-explanatory.  

Cutoffs missing in pair_style lj/long/coul/long Self-explanatory.  

# Cyclic loop in joint connections  

Fix poems cannot (yet) work with coupled bodies whose joints connect the bodies in a ring (or cycle).  

Degenerate lattice primitive vectors Invalid set of 3 lattice vectors for lattice command.  

Delete region ID does not exist Self-explanatory.  

Delete_atoms command before simulation box is defined The delete_atoms command cannot be used before a read_data, read_restart, or create_box command.  

Delete_atoms cutoff $>$ max neighbor cutoff Can only delete atoms in atom pairs that will be in neighbor list.  

Delete_atoms mol yes requires atom attribute molecule Cannot use this option with a non-molecular system.  

Delete_atoms requires a pair style be defined This is because atom deletion within a cutoff uses a pairwise neighbor list.  

Delete_bonds command before simulation box is defined The delete_bonds command cannot be used before a read_data, read_restart, or create_box command.  

Delete_bonds command with no atoms existing No atoms are yet defined so the delete_bonds command cannot be used.  

Deposition region extends outside simulation box Self-explanatory.  

Did not assign all atoms correctly  

Atoms read in from a data file were not assigned correctly to processors. This is likely due to some atom coordinates being outside a non-periodic simulation box.  

# Did not assign all restart atoms correctly  

Atoms read in from the restart file were not assigned correctly to processors. This is likely due to some atom coordinates being outside a non-periodic simulation box. Normally this should not happen. You may wish to use the “remap” option on the read_restart command to see if this helps.  

# Did not find all elements in MEAM library file  

Some requested elements were not found in the MEAM file. Check spelling etc.  

# Did not find fix shake partner info  

Could not find bond partners implied by fix shake command. This error can be triggered if the delete_bonds command was used before fix shake, and it removed bonds without resetting the 1-2, 1-3, 1-4 weighting list via the special keyword.  

Did not find keyword in table file  

Keyword used in pair_coeff command was not found in table file.  

Did not set pressure for fix rigid/nph The press keyword must be specified.  

Did not set temp for fix rigid/nvt/small Self-explanatory.  

Did not set temp or press for fix rigid/npt/small Self-explanatory.  

Did not set temperature for fix rigid/nvt The temp keyword must be specified.  

Did not set temperature or pressure for fix rigid/npt  

The temp and press keywords must be specified.  

# Dihedral atom missing in delete_bonds  

The delete_bonds command cannot find one or more atoms in a particular dihedral on a particular processor.   
The pairwise cutoff is too short or the atoms are too far apart to make a valid dihedral.  

# Dihedral atom missing in set command  

The set command cannot find one or more atoms in a particular dihedral on a particular processor. The pairwise cutoff is too short or the atoms are too far apart to make a valid dihedral.  

# Dihedral atoms $\%d\%d\%d\%d$ missing on proc %d at step %ld  

One or more of 4 atoms needed to compute a particular dihedral are missing on this processor. Typically this is because the pairwise cutoff is set too short or the dihedral has blown apart and an atom is too far away.  

# Dihedral atoms missing on proc %d at step %ld  

One or more of 4 atoms needed to compute a particular dihedral are missing on this processor. Typically this is because the pairwise cutoff is set too short or the dihedral has blown apart and an atom is too far away.  

# Dihedral charmm is incompatible with Pair style  

Dihedral style charmm must be used with a pair style charmm in order for the 1-4 epsilon/sigma parameters to be defined.  

# Dihedral coeff for hybrid has invalid style  

Dihedral style hybrid uses another dihedral style as one of its coefficients. The dihedral style used in the dihedral_coeff command or read from a restart file is not recognized.  

ihedral coeffs are not set No dihedral coefficients have been assigned in the data file or via the dihedral_coeff command.  

Dihedral style hybrid cannot have hybrid as an argument Self-explanatory.  

Dihedral style hybrid cannot have none as an argument Self-explanatory.  

Dihedral style hybrid cannot use same dihedral style twice Self-explanatory.  

Dihedral/improper extent $>$ half of periodic box length  

This error was detected by the neigh_modify check yes setting. It is an error because the dihedral atoms are so far apart it is ambiguous how it should be defined.  

Dihedral_coeff command before dihedral_style is defined  

Coefficients cannot be set in the data file or via the dihedral_coeff command until an dihedral_style has been assigned.  

Dihedral_coeff command before simulation box is defined  

The dihedral_coeff command cannot be used before a read_data, read_restart, or create_box command.  

Dihedral_coeff command when no dihedrals allowed The chosen atom style does not allow for dihedrals to be defined.  

Dihedral_style command when no dihedrals allowed The chosen atom style does not allow for dihedrals to be defined.  

# Dihedrals assigned incorrectly  

Dihedrals read in from the data file were not assigned correctly to atoms. This means there is something invalid about the topology definitions.  

# Dihedrals defined but no dihedral types  

The data file header lists dihedrals but no dihedral types.  

# Dimension command after simulation box is defined  

The dimension command cannot be used after a read_data, read_restart, or create_box command.  

Disk limit not supported by OS or illegal path Self-explanatory.  

Dispersion PPPMDisp order has been reduced below minorder The default minimum order is 2. This can be reset by the kspace_modify minorder command.  

Displace_atoms command before simulation box is defined The displace_atoms command cannot be used before a read_data, read_restart, or create_box command.  

Distance must be $>\pmb{\theta}$ for compute event/displace Self-explanatory.  

Divide by 0 in influence function This should not normally occur. It is likely a problem with your model.  

Divide by 0 in influence function of pair peri/lps This should not normally occur. It is likely a problem with your model.  

Divide by 0 in variable formula Self-explanatory.  

Domain too large for neighbor bins The domain has become extremely large so that neighbor bins cannot be used. Most likely, one or more atoms have been blown out of the simulation box to a great distance.  

Double precision is not supported on this accelerator Self-explanatory  

Dump atom/gz only writes compressed files The dump atom/gz output file name must have a .gz suffix.  

Dump cfg arguments can not mix xs|ys|zs with xsu|ysu|zsu Self-explanatory.  

Dump cfg arguments must start with ‘mass type xs ys zs’ or ‘mass type xsu ysu zsu’ This is a requirement of the CFG output format. See the dump cfg doc page for more detail  

Dump cfg requires one snapshot per file Use the wildcard “\*” character in the filename.  

Dump cfg/gz only writes compressed files The dump cfg/gz output file name must have a .gz suffix.  

Dump custom and fix not computed at compatible times The fix must produce per-atom quantities on timesteps that dump custom needs them.  

Dump custom compute does not calculate per-atom array Self-explanatory.  

Dump custom compute does not calculate per-atom vector Self-explanatory.  

Dump custom compute does not compute per-atom info Self-explanatory.  

Dump custom compute vector is accessed out-of-range Self-explanatory.  

Dump custom fix does not compute per-atom array Self-explanatory.  

Dump custom fix does not compute per-atom info Self-explanatory.  

Dump custom fix does not compute per-atom vector Self-explanatory.  

Dump custom fix vector is accessed out-of-range Self-explanatory.  

Dump custom variable is not atom-style variable Only atom-style variables generate per-atom quantities, needed for dump output.  

Dump custom/gz only writes compressed files The dump custom/gz output file name must have a .gz suffix.  

Dump dcd of non-matching # of atoms Every snapshot written by dump dcd must contain the same # of atoms.  

Dump dcd requires sorting by atom $\pmb{I D}$ Use the dump_modify sort command to enable this.  

Dump every variable returned a bad timestep The variable must return a timestep greater than the current timestep.  

Dump file MPI-IO output not allowed with $\%$ in filename This is because a $\%$ signifies one file per processor and MPI-IO creates one large file for all processors.  

Dump file does not contain requested snapshot Self-explanatory.  

Dump file is incorrectly formatted Self-explanatory.  

Dump image body yes requires atom style body Self-explanatory.  

Dump image bond not allowed with no bond types Self-explanatory.  

Dump image cannot perform sorting Self-explanatory.  

Dump image line requires atom style line Self-explanatory.  

Dump image requires one snapshot per file Use a “\*” in the filename.  

Dump image tri requires atom style tri Self-explanatory.  

Dump local and fix not computed at compatible times The fix must produce per-atom quantities on timesteps that dump local needs them.  

Dump local attributes contain no compute or fix Self-explanatory.  

Dump local compute does not calculate local array Self-explanatory.  

Dump local compute does not calculate local vector Self-explanatory.   
Dump local compute does not compute local info Self-explanatory.   
Dump local compute vector is accessed out-of-range Self-explanatory.   
Dump local count is not consistent across input fields Every column of output must be the same length.   
Dump local fix does not compute local array Self-explanatory.   
Dump local fix does not compute local info Self-explanatory.   
Dump local fix does not compute local vector Self-explanatory.   
Dump local fix vector is accessed out-of-range Self-explanatory.   
Dump modify bcolor not allowed with no bond types Self-explanatory.   
Dump modify bdiam not allowed with no bond types Self-explanatory.   
Dump modify compute ID does not compute per-atom array Self-explanatory.   
Dump modify compute ID does not compute per-atom info Self-explanatory.   
Dump modify compute ID does not compute per-atom vector Self-explanatory.   
Dump modify compute ID vector is not large enough Self-explanatory.   
Dump modify element names do not match atom types Number of element names must equal number of atom types.   
Dump modify fix ID does not compute per-atom array Self-explanatory.   
Dump modify fix ID does not compute per-atom info Self-explanatory.   
Dump modify fix ID does not compute per-atom vector Self-explanatory.   
Dump modify fix ID vector is not large enough Self-explanatory.   
Dump modify variable is not atom-style variable Self-explanatory.   
Dump sort column is invalid Self-explanatory.  

Dump xtc requires sorting by atom ID  

Use the dump_modify sort command to enable this.  

Dump xyz/gz only writes compressed files The dump xyz/gz output file name must have a .gz suffix.  

Dump_modify buffer yes not allowed for this style Self-explanatory.  

Dump_modify format string is too short There are more fields to be dumped in a line of output than your format string specifies.  

Dump_modify region ID does not exist Self-explanatory.  

Dumping an atom property that is not allocated The chosen atom style does not define the per-atom quantity being dumped.  

Duplicate atom IDs exist Self-explanatory.  

Duplicate fields in read_dump command Self-explanatory.  

Duplicate particle in PeriDynamic bond - simulation box is too small This is likely because your box length is shorter than 2 times the bond length.  

Electronic temperature dropped below zero Something has gone wrong with the fix ttm electron temperature model.  

Element not defined in potential file The specified element is not in the potential file.  

Empty brackets in variable There is no variable syntax that uses empty brackets. Check the variable doc page.  

Energy was not tallied on needed timestep You are using a thermo keyword that requires potentials to have tallied energy, but they did not on this timestep. See the variable page for ideas on how to make this work.  

Epsilon or sigma reference not set by pair style in PPPMDisp Self-explanatory.  

Epsilon or sigma reference not set by pair style in ewald/n The pair style is not providing the needed epsilon or sigma values.  

Error in MEAM parameter file: keyword %s (further information) Self-explanatory. Check the parameter file.  

Error in vdw spline: inner radius $>$ outer radius A pre-tabulated spline is invalid. Likely a problem with the potential parameters.  

Error writing averaged chunk data Something in the output to the file triggered an error.  

Error writing file header Something in the output to the file triggered an error.  

Error writing out correlation data Something in the output to the file triggered an error.  

Error writing out histogram data Something in the output to the file triggered an error.  

Error writing out time averaged data Something in the output to the file triggered an error.  

Failed to allocate %ld bytes for array %s Your LAMMPS simulation has run out of memory. You need to run a smaller simulation or on more processors.  

Failed to open FFmpeg pipeline to file %s The specified file cannot be opened. Check that the path and name are correct and writable and that the FFmpeg executable can be found and run.  

Failed to reallocate %ld bytes for array $9\mathbf{\epsilon}_{\mathrm{{/0}}s}$ Your LAMMPS simulation has run out of memory. You need to run a smaller simulation or on more processors.  

Fewer SRD bins than processors in some dimension This is not allowed. Make your SRD bin size smaller.  

File variable could not read value Check the file assigned to the variable.  

Final box dimension due to fix deform is $<\pmb{\theta.0}$ Self-explanatory.  

Fix %s does not allow use of dynamic group Dynamic groups have not yet been enabled for this fix.  

Fix ID for compute chunk/atom does not exist Self-explanatory.  

Fix ID for compute erotate/rigid does not exist Self-explanatory.  

Fix ID for compute ke/rigid does not exist Self-explanatory.  

Fix ID for compute reduce does not exist Self-explanatory.  

Fix ID for compute slice does not exist Self-explanatory.  

Fix ID for fix ave/atom does not exist Self-explanatory.  

Fix ID for fix ave/chunk does not exist Self-explanatory.  

Fix ID for fix ave/correlate does not exist Self-explanatory.  

Fix ID for fix ave/histo does not exist Self-explanatory.  

Fix ID for fix ave/time does not exist Self-explanatory.  

Fix ID for fix store/state does not exist Self-explanatory  

Fix ID for fix vector does not exist Self-explanatory.  

Fix ID for read_data does not exist Self-explanatory.  

Fix ID for velocity does not exist Self-explanatory.  

Fix ID must be alphanumeric or underscore characters Self-explanatory.  

Fix SRD: bad bin assignment for SRD advection Something has gone wrong in your SRD model; try using more conservative settings.  

Fix SRD: bad search bin assignment Something has gone wrong in your SRD model; try using more conservative settings.  

Fix SRD: bad stencil bin for big particle Something has gone wrong in your SRD model; try using more conservative settings.  

Fix SRD: too many big particles in bin Reset the ATOMPERBIN parameter at the top of fix_srd.cpp to a larger value, and re-compile the code.  

Fix SRD: too many walls in bin This should not happen unless your system has been setup incorrectly.  

Fix adapt interface to this pair style not supported New coding for the pair style would need to be done.  

Fix adapt kspace style does not exist Self-explanatory.  

Fix adapt pair style does not exist Self-explanatory  

Fix adapt pair style param not supported The pair style does not know about the parameter you specified.  

Fix adapt requires atom attribute charge The atom style being used does not specify an atom charge.  

Fix adapt requires atom attribute diameter The atom style being used does not specify an atom diameter.  

Fix adapt type pair range is not valid for pair hybrid sub-style Self-explanatory.  

Fix append/atoms requires a lattice be defined Use the lattice command for this purpose.  

Fix ave/atom compute array is accessed out-of-range Self-explanatory.  

Fix ave/atom compute does not calculate a per-atom array Self-explanatory.  

Fix ave/atom compute does not calculate a per-atom vector A compute used by fix ave/atom must generate per-atom values.  

Fix ave/atom compute does not calculate per-atom values A compute used by fix ave/atom must generate per-atom values.  

Fix ave/atom fix array is accessed out-of-range Self-explanatory.  

Fix ave/atom fix does not calculate a per-atom array Self-explanatory.  

Fix ave/atom fix does not calculate a per-atom vector A fix used by fix ave/atom must generate per-atom values.  

Fix ave/atom fix does not calculate per-atom values A fix used by fix ave/atom must generate per-atom valu   
Fix ave/atom variable is not atom-style variable A variable used by fix ave/atom must generate per-atom values.   
Fix ave/chunk compute does not calculate a per-atom arra Self-explanatory.   
Fix ave/chunk compute does not calculate a per-atom vecto Self-explanatory.   
Fix ave/chunk compute does not calculate per-atom values Self-explanatory.   
Fix ave/chunk compute vector is accessed out-of-range Self-explanatory.   
Fix ave/chunk does not use chunk/atom compute The specified compute is not for a compute chunk/atom command.   
Fix ave/chunk fix does not calculate a per-atom array Self-explanatory.   
Fix ave/chunk fix does not calculate a per-atom vector Self-explanatory.   
Fix ave/chunk fix does not calculate per-atom values Self-explanatory.   
Fix ave/chunk fix vector is accessed out-of-range Self-explanatory.   
Fix ave/chunk variable is not atom-style variable Self-explanatory.   
Fix ave/correlate compute does not calculate a scalar Self-explanatory.   
Fix ave/correlate compute does not calculate a vector Self-explanatory.   
Fix ave/correlate compute vector is accessed out-of-range The index for the vector is out of bounds.   
Fix ave/correlate fix does not calculate a scalar Self-explanatory.   
Fix ave/correlate fix does not calculate a vector Self-explanatory.   
Fix ave/correlate fix vector is accessed out-of-range The index for the vector is out of bounds.   
Fix ave/correlate variable is not equal-style variable Self-explanatory.   
Fix ave/histo cannot input local values in scalar mode Self-explanatory.   
Fix ave/histo cannot input per-atom values in scalar mode Self-explanatory.   
Fix ave/histo compute array is accessed out-of-range Self-explanatory.   
Fix ave/histo compute does not calculate a global array Self-explanatory.   
Fix ave/histo compute does not calculate a global scalar Self-explanatory.   
Fix ave/histo compute does not calculate a global vector Self-explanatory.   
Fix ave/histo compute does not calculate a local array Self-explanatory.   
Fix ave/histo compute does not calculate a local vector Self-explanatory.   
Fix ave/histo compute does not calculate a per-atom array Self-explanatory.   
Fix ave/histo compute does not calculate a per-atom vector Self-explanatory.   
Fix ave/histo compute does not calculate local values Self-explanatory.   
Fix ave/histo compute does not calculate per-atom values Self-explanatory.   
Fix ave/histo compute vector is accessed out-of-range Self-explanatory.   
Fix ave/histo fix array is accessed out-of-range Self-explanatory.   
Fix ave/histo fix does not calculate a global array Self-explanatory.   
Fix ave/histo fix does not calculate a global scalar Self-explanatory.   
Fix ave/histo fix does not calculate a global vector Self-explanatory.   
Fix ave/histo fix does not calculate a local array Self-explanatory.   
Fix ave/histo fix does not calculate a local vector Self-explanatory.   
Fix ave/histo fix does not calculate a per-atom array Self-explanatory.   
Fix ave/histo fix does not calculate a per-atom vector Self-explanatory.   
Fix ave/histo fix does not calculate local values Self-explanatory.  

Fix ave/histo fix does not calculate per-atom values Self-explanatory.  

Fix ave/histo fix vector is accessed out-of-range Self-explanatory.  

Fix ave/histo input is invalid compute Self-explanatory.  

Fix ave/histo input is invalid fix Self-explanatory.  

Fix ave/histo input is invalid variable Self-explanatory.  

Fix ave/histo inputs are not all global, peratom, or local All inputs in a single fix ave/histo command must be of the same style.  

Fix ave/histo/weight value and weight vector lengths do not match Self-explanatory.  

One of more of the vector inputs has individual elements which are flagged as intensive or extensive. Such an  

Fix ave/time cannot set output array intensive/extensive from these inputs input cannot be flagged as all intensive/extensive when turned into an array by fix ave/time.   
Fix ave/time cannot use variable with vector mode Variables produce scalar values.   
Fix ave/time columns are inconsistent lengths Self-explanatory.   
Fix ave/time compute array is accessed out-of-range An index for the array is out of bounds.   
Fix ave/time compute does not calculate a scalar Self-explanatory.   
Fix ave/time compute does not calculate a vector Self-explanatory.   
Fix ave/time compute does not calculate an array Self-explanatory.   
Fix ave/time compute vector is accessed out-of-range The index for the vector is out of bounds.   
Fix ave/time fix array cannot be variable length Self-explanatory.   
Fix ave/time fix array is accessed out-of-range An index for the array is out of bounds.   
Fix ave/time fix does not calculate a scalar Self-explanatory.   
Fix ave/time fix does not calculate a vector Self-explanatory.   
Fix ave/time fix does not calculate an array Self-explanatory.   
Fix ave/time fix vector cannot be variable length Self-explanatory.  

Fix ave/time fix vector is accessed out-of-range The index for the vector is out of bounds.  

Fix ave/time variable is not equal-style variable Self-explanatory.  

Fix balance rcb cannot be used with comm_style brick Comm_style tiled must be used instead.  

Fix balance shift string is invalid The string can only contain the characters “x”, “y”, or “z”.  

# Fix bond/break needs ghost atoms from further away  

This is because the fix needs to walk bonds to a certain distance to acquire needed info, The comm_modify cutof command can be used to extend the communication range.  

Fix bond/create angle type is invalid Self-explanatory.  

Fix bond/create cutoff is longer than pairwise cutof  

This is not allowed because bond creation is done using the pairwise neighbor list.  

Fix bond/create dihedral type is invalid Self-explanatory.  

Fix bond/create improper type is invalid Self-explanatory.  

Fix bond/create induced too many angles/dihedrals/impropers per atom  

See the read_data command for info on using the “extra/angle/per/atom”, (or dihedral, improper) keywords to allow for additional angles, dihedrals, and impropers to be formed.  

Fix bond/create needs ghost atoms from further away  

This is because the fix needs to walk bonds to a certain distance to acquire needed info, The comm_modify cutoff command can be used to extend the communication range.  

Fix bond/react: Cannot use fix bond/react with non-molecular systems Only systems with bonds that can be changed can be used. Atom_style template does not qualify.  

Fix bond/react: Invalid template atom ID in map file Atom IDs in molecule templates range from 1 to the number of atoms in the template.  

Fix bond/react: Rmax cutoff is longer than pairwise cutoff This is not allowed because bond creation is done using the pairwise neighbor list.  

Fix bond/react: Molecule template ID for fix bond/react does not exist A valid molecule template must have been created with the molecule command.  

Fix bond/react: Reaction templates must contain the same number of atoms There should be a one-to-one correspondence between atoms in the pre-reacted and post-reacted templates, as specified by the map file.  

Fix bond/react: Unknown section in map file  

Please ensure reaction map files are properly formatted.  

# Fix bond/react: Atom/Bond type affected by reaction too close to template edge  

This means an atom which changes type or connectivity during the reaction is too close to an ‘edge’ atom defined in the map file. This could cause incorrect assignment of bonds, angle, etc. Generally, this means you must include more atoms in your templates, such that there are at least two atoms between each atom involved in the reaction and an edge atom.  

# Fix bond/react: Fix bond/react needs ghost atoms from farther away  

This is because a processor needs to map the entire unreacted molecule template onto simulation atoms it knows about. The comm_modify cutoff command can be used to extend the communication range.  

Fix bond/react: A deleted atom cannot remain bonded to an atom that is not deleted Self-explanatory.  

Fix bond/react: First neighbors of chiral atoms must be of mutually different types Self-explanatory.  

Fix bond/react: Chiral atoms must have exactly four first neighbors Self-explanatory.  

Fix bond/react: Molecule template ‘Coords’ section required for chiralIDs keyword The coordinates of atoms in the pre-reacted template are used to determine chiralit  

Fix bond/react special bond generation overflow  

The number of special bonds per-atom created by a reaction exceeds the system setting. See the read_data or create_box command for how to specify this value.  

Fix bond/react topology/atom exceed system topology/atom  

The number of bonds, angles etc per-atom created by a reaction exceeds the system setting. See the read_data or create_box command for how to specify this value.  

Fix bond/swap cannot use dihedral or improper styles These styles cannot be defined when using this fix.  

Fix bond/swap requires pair and bond styles Self-explanatory.  

Fix bond/swap requires special_bonds ${\bf\delta}=\pmb{\theta},\pmb{l},\pmb{l}$ Self-explanatory.  

Fix box/relax generated negative box length The pressure being applied is likely too large. Try applying it incrementally, to build to the high pressure.  

Fix command before simulation box is defined The fix command cannot be used before a read_data, read_restart, or create_box command.  

Fix deform cannot use yz variable with xy  

The yz setting cannot be a variable if xy deformation is also specified. This is because LAMMPS cannot determine if the yz setting will induce a box flip which would be invalid if xy is also changing.  

Fix deform is changing yz too much with xy  

When both yz and xy are changing, it induces changes in xz if the box must flip from one tilt extreme to another.   
Thus it is not allowed for yz to grow so much that a flip is induced.  

Fix deform tilt factors require triclinic box  

Cannot deform the tilt factors of a simulation box unless it is a triclinic (non-orthogonal) box.  

Fix deform volume setting is invalid Cannot use volume style unless other dimensions are being controlled.  

Fix deposit and fix rigid/small not using same molecule template $\pmb{I D}$ Self-explanatory.  

Fix deposit and fix shake not using same molecule template ID Self-explanatory.  

Fix deposit molecule must have atom types The defined molecule does not specify atom types.  

Fix deposit molecule must have coordinates The defined molecule does not specify coordinates.  

Fix deposit molecule template ID must be same as atom_style template ID When using atom_style template, you cannot deposit molecules that are not in that template.  

Fix deposit region cannot be dynamic Only static regions can be used with fix deposit.  

Fix deposit region does not support a bounding box Not all regions represent bounded volumes. You cannot use such a region with the fix deposit command.  

Fix deposit shake fix does not exist Self-explanatory.  

Fix efield requires atom attribute q or mu The atom style defined does not have this attribute.  

Fix efield with dipoles cannot use atom-style variables This option is not supported.  

Fix evaporate molecule requires atom attribute molecule The atom style being used does not define a molecule ID.  

Fix external callback function not set This must be done by an external program in order to use this fix.  

Fix for fix ave/atom not computed at compatible time Fixes generate their values on specific timesteps. Fix ave/atom is requesting a value on a non-allowed timestep.  

Fix for fix ave/chunk not computed at compatible time Fixes generate their values on specific timesteps. Fix ave/chunk is requesting a value on a non-allowed timeste  

Fix for fix ave/correlate not computed at compatible time Fixes generate their values on specific timesteps. Fix ave/correlate is requesting a value on a non-allowed timestep.  

Fix for fix ave/histo not computed at compatible time Fixes generate their values on specific timesteps. Fix ave/histo is requesting a value on a non-allowed timestep.  

Fix for fix ave/spatial not computed at compatible time Fixes generate their values on specific timesteps. Fix ave/spatial is requesting a value on a non-allowed timestep  

Fix for fix ave/time not computed at compatible time Fixes generate their values on specific timesteps. Fix ave/time is requesting a value on a non-allowed timestep.  

Fix for fix store/state not computed at compatible time Fixes generate their values on specific timesteps. Fix store/state is requesting a value on a non-allowed timestep  

Fix for fix vector not computed at compatible time Fixes generate their values on specific timesteps. Fix vector is requesting a value on a non-allowed timestep.  

Fix freeze requires atom attribute torque The atom style defined does not have this attribute.  

Fix gcmc and fix shake not using same molecule template ID Self-explanatory.  

Fix gcmc atom has charge, but atom style does not Self-explanatory.  

Fix gcmc cannot exchange individual atoms belonging to a molecule  

This is an error since you should not delete only one atom of a molecule. The user has specified atomic (nonmolecular) gas exchanges, but an atom belonging to a molecule could be deleted.  

Fix gcmc does not (yet) work with atom_style template Self-explanatory.  

Fix gcmc molecule command requires that atoms have molecule attributes  

Should not choose the gcmc molecule feature if no molecules are being simulated. The general molecule flag is off, but gcmc’s molecule flag is on.  

Fix gcmc molecule has charges, but atom style does not Self-explanatory.  

Fix gcmc molecule must have atom types The defined molecule does not specify atom types.  

Fix gcmc molecule must have coordinates The defined molecule does not specify coordinates.  

Fix gcmc molecule template ID must be same as atom_style template ID When using atom_style template, you cannot insert molecules that are not in that template.  

Fix gcmc put atom outside box This should not normally happen. Contact the developers.  

Fix gcmc ran out of available atom IDs See the setting for tagint in the src/lmptype.h file.  

Fix gcmc ran out of available molecule IDs See the setting for tagint in the src/lmptype.h file.  

Fix gcmc region cannot be dynamic Only static regions can be used with fix gcmc.  

Fix gcmc region does not support a bounding box Not all regions represent bounded volumes. You cannot use such a region with the fix gcmc command.  

Fix gcmc region extends outside simulation box Self-explanatory.  

Fix gcmc shake fix does not exist Self-explanatory.  

Fix gld c coefficients must be $>=\pmb{\theta}$ Self-explanatory.  

Fix gld needs more prony series coefficients Self-explanatory.  

Fix gld prony terms must be > 0 Self-explanatory.  

Fix gld series type must be pprony for now Self-explanatory.  

Fix gld start temperature must be $>=\pmb{\theta}$ Self-explanatory.  

Fix gld stop temperature must be $>=\pmb{\theta}$ Self-explanatory.  

Fix gld tau coefficients must be $>\pmb{\theta}$ Self-explanatory.  

Fix halt variable is not equal-style variable Self-explanatory.  

Fix heat group has no atoms Self-explanatory.  

Fix heat kinetic energy of an atom went negative This will cause the velocity rescaling about to be performed by fix heat to be invalid.  

Fix heat kinetic energy went negative This will cause the velocity rescaling about to be performed by fix heat to be invalid.  

Fix in variable not computed at compatible time Fixes generate their values on specific timesteps. The variable is requesting the values on a non-allowed timestep  

Fix langevin angmom is not yet implemented with kokkos This option is not yet available.  

Fix langevin angmom requires atom style ellipsoid Self-explanatory.  

Fix langevin angmom requires extended particles This fix option cannot be used with point particles.  

Fix langevin gjf and respa are not compatible Self-explanatory.  

Fix langevin gjf cannot have period equal to dt/2 If the period is equal to dt/2 then division by zero will happen.  

Fix langevin gjf should come before fix nve Self-explanatory.  

Fix langevin gjf with tbias is not yet implemented with kokkos This option is not yet available.  

Fix langevin omega is not yet implemented with kokkos This option is not yet available.  

Fix langevin omega requires atom style sphere Self-explanatory.  

Fix langevin omega requires extended particles One of the particles has radius 0.0.  

Fix langevin period must be $>\pmb{\theta.0}$ The time window for temperature relaxation must be $>0$  

Fix langevin variable returned negative temperature Self-explanatory.  

Fix momentum group has no atoms Self-explanatory.  

Fix move cannot define z or vz variable for 2d problem Self-explanatory.  

Fix move cannot rotate aroung non z-axis for 2d problem Self-explanatory.  

Fix move cannot set linear z motion for 2d problem Self-explanatory.  

Fix move cannot set wiggle z motion for 2d problem Self-explanatory.  

Fix msst compute ID does not compute potential energy Self-explanatory.  

Fix msst compute ID does not compute pressure Self-explanatory.  

Fix msst compute ID does not compute temperature Self-explanatory.  

Fix msst requires a periodic box Self-explanatory.  

Fix msst tscale must satisfy $\pmb{0}<=t s c a l e<I$ Self-explanatory.  

Fix npt/nph has tilted box too far in one step - periodic cell is too far from equilibrium state Self-explanatory. The change in the box tilt is too extreme on a short timescale.  

Fix numdiff requires an atom map, see atom_modify Self-explanatory. Efficient loop over all atoms for numerical difference requires an atom map.  

Fix numdiff requires consecutive atom IDs Self-explanatory. Efficient loop over all atoms for numerical difference requires consecutive atom IDs.  

Fix numdiff/virial must use group all Virial contributions computed by this fix are computed on all atoms.  

Fix nve/asphere requires extended particles This fix can only be used for particles with a shape setting.  

Fix nve/asphere/noforce requires atom style ellipsoid Self-explanatory.  

Fix nve/asphere/noforce requires extended particles One of the particles is not an ellipsoid.  

Fix nve/body requires atom style body Self-explanatory.  

Fix nve/body requires bodies This fix can only be used for particles that are bodies.  

Fix nve/line can only be used for 2d simulations Self-explanatory.  

Fix nve/line requires atom style line Self-explanatory.  

Fix nve/line requires line particles Self-explanatory.  

Fix nve/sphere dipole requires atom attribute mu An atom style with this attribute is needed.  

Fix nve/sphere requires atom style sphere Self-explanatory.  

Fix nve/sphere requires extended particles This fix can only be used for particles of a finite size.  

Fix nve/tri can only be used for 3d simulations Self-explanatory.  

Fix nve/tri requires atom style tri Self-explanatory.  

Fix nve/tri requires tri particles Self-explanatory.  

Fix nvt/nph/npt asphere requires extended particles The shape setting for a particle in the fix group has shape $=0.0$ , which means it is a point particle.  

Fix nvt/nph/npt body requires bodies Self-explanatory.  

Fix nvt/nph/npt sphere requires atom style sphere Self-explanatory.  

Fix nvt/npt/nph damping parameters must be $>\pmb{\theta.0}$ Self-explanatory.  

Fix nvt/npt/nph dilate group ID does not exist Self-explanatory.  

Fix nvt/sphere requires extended particles This fix can only be used for particles of a finite size.  

Fix orient/fcc file open failed The fix orient/fcc command could not open a specified file.  

Fix orient/fcc file read failed The fix orient/fcc command could not read the needed parameters from a specified file.  

Fix orient/fcc found self twice The neighbor lists used by fix orient/fcc are messed up. If this error occurs, it is likely a bug, so send an email to the developers.  

Fix peri neigh does not exist Somehow a fix that the pair style defines has been deleted.  

Fix pour and fix rigid/small not using same molecule template ID Self-explanatory.  

Fix pour and fix shake not using same molecule template ID Self-explanatory.  

Fix pour insertion count per timestep is 0 Self-explanatory.  

Fix pour molecule must have atom types The defined molecule does not specify atom types.  

Fix pour molecule must have coordinates The defined molecule does not specify coordinates.  

Fix pour molecule template ID must be same as atom style template ID When using atom_style template, you cannot pour molecules that are not in that template.  

Fix pour polydisperse fractions do not sum to 1.0 Self-explanatory.  

Fix pour region ID does not exist Self-explanatory.  

Fix pour region cannot be dynamic Only static regions can be used with fix pour.  

# Fix pour region does not support a bounding box  

Not all regions represent bounded volumes. You cannot use such a region with the fix pour command.  

Fix pour requires atom attributes radius, rmass The atom style defined does not have these attributes.  

Fix pour rigid fix does not exist Self-explanatory.  

Fix pour shake fix does not exist Self-explanatory.  

Fix press/berendsen damping parameters must be $>\pmb{\theta.0}$ Self-explanatory.  

Fix property/atom cannot specify mol twice Self-explanatory.  

Fix property/atom cannot specify q twice Self-explanatory.  

Fix property/atom mol when atom_style already has molecule attribute Self-explanatory.  

Fix property/atom q when atom_style already has charge attribute Self-explanatory.  

Fix property/atom vector name already exists The name for an integer or floating-point vector must be unique.  

Fix qeq has negative upper Taper radius cutof Self-explanatory.  

Fix qeq/comb group has no atoms Self-explanatory.  

Fix qeq/comb requires atom attribute q An atom style with charge must be used to perform charge equilibration.  

Fix qeq/dynamic group has no atoms Self-explanatory.  

Fix qeq/dynamic requires atom attribute q Self-explanatory.  

Fix qeq/fire group has no atoms Self-explanatory.  

Fix qeq/fire requires atom attribute q Self-explanatory.  

Fix qeq/point group has no atoms Self-explanatory.  

Fix qeq/point has insufficient QEq matrix size Occurs when number of neighbor atoms for an atom increased too much during a run. Increase SAFE_ZONE and MIN_CAP in fix_qeq.h and re-compile.  

Fix qeq/point requires atom attribute q Self-explanatory.  

Fix qeq/shielded group has no atoms Self-explanatory.  

# Fix qeq/shielded has insufficient QEq matrix size  

Occurs when number of neighbor atoms for an atom increased too much during a run. Increase SAFE_ZONE and MIN_CAP in fix_qeq.h and re-compile.  

Fix qeq/shielded requires atom attribute q Self-explanatory.  

Fix qeq/slater could not extract params from pair coul/streitz This should not happen unless pair coul/streitz has been altered.  

Fix qeq/slater group has no atoms Self-explanatory.  

Fix qeq/slater has insufficient QEq matrix size Occurs when number of neighbor atoms for an atom increased too much during a run. Increase SAFE_ZONE and MIN_CAP in fix_qeq.h and re-compile.  

Fix qeq/slater requires atom attribute q Self-explanatory.  

Fix reax/bonds numbonds $>$ nsbmax_most The limit of the number of bonds expected by the ReaxFF force field was exceeded.  

Fix recenter group has no atoms Self-explanatory.  

Fix restrain requires an atom map, see atom_modify Self-explanatory.  

Fix rigid atom has non-zero image flag in a non-periodic dimension Image flags for non-periodic dimensions should not be set.  

Fix rigid file has no lines Self-explanatory.  

Fix rigid langevin period must be $>\pmb{\theta.0}$ Self-explanatory.  

Fix rigid molecule requires atom attribute molecule Self-explanatory.  

Fix rigid npt/nph dilate group ID does not exist Self-explanatory.  

Fix rigid npt/nph does not yet allow triclinic box This is a current restriction in LAMMPS.  

Fix rigid npt/nph period must be $>\pmb{\theta.0}$ Self-explanatory.  

Fix rigid npt/small t_chain should not be less than 1 Self-explanatory.  

Fix rigid npt/small t_order must be 3 or 5 Self-explanatory.  

Fix rigid nvt/npt/nph damping parameters must $b e>0.0$ Self-explanatory.  

Fix rigid nvt/small t_chain should not be less than 1 Self-explanatory.  

Fix rigid nvt/small t_iter should not be less than 1 Self-explanatory.  

Fix rigid nvt/small t_order must be 3 or 5 Self-explanatory.   
Fix rigid xy torque cannot be on for 2d simulation Self-explanatory.   
Fix rigid z force cannot be on for 2d simulation Self-explanatory.   
Fix rigid/npt period must be > 0.0 Self-explanatory.   
Fix rigid/npt temperature order must be 3 or 5 Self-explanatory.   
Fix rigid/npt/small period must be $>\pmb{\theta.0}$ Self-explanatory.   
Fix rigid/nvt period must $b e>0.0$ Self-explanatory.   
Fix rigid/nvt temperature order must be 3 or 5 Self-explanatory.   
Fix rigid/nvt/small period must be > 0.0 Self-explanatory.   
Fix rigid/small atom has non-zero image flag in a non-periodic dimension Image flags for non-periodic dimensions should not be set.   
Fix rigid/small langevin period must be $>\pmb{\theta.0}$ Self-explanatory.   
Fix rigid/small molecule must have atom types The defined molecule does not specify atom types.   
Fix rigid/small molecule must have coordinates The defined molecule does not specify coordinates.   
Fix rigid/small npt/nph period must be $>\pmb{\theta.0}$ Self-explanatory.   
Fix rigid/small nvt/npt/nph damping parameters must be $>\pmb{\theta.0}$ Self-explanatory.   
Fix rigid/small nvt/npt/nph dilate group ID does not exist Self-explanatory.   
Fix rigid/small requires an atom map, see atom_modify Self-explanatory.   
Fix rigid/small requires atom attribute molecule Self-explanatory.   
Fix rigid: Bad principal moments The principal moments of inertia computed for a rigid body are not within the required tolerances.   
Fix shake cannot be used with minimization  

Cannot use fix shake while doing an energy minimization since it turns off bonds that should contribute to the energy.  

# Fix shake molecule template must have shake info  

The defined molecule does not specify SHAKE information.  

Fix spring couple group ID does not exist Self-explanatory.  

Fix srd can only currently be used with comm_style brick This is a current restriction in LAMMPS.  

Fix srd lamda must be $>=\pmb{\theta.6}$ of SRD grid size This is a requirement for accuracy reasons.  

Fix srd no-slip requires atom attribute torque This is because the SRD collisions will impart torque to the solute particles.  

Fix srd requires SRD particles all have same mass Self-explanatory.  

Fix srd requires ghost atoms store velocity Use the comm_modify vel yes command to enable this.  

Fix srd requires newton pair on Self-explanatory.  

Fix store/state compute array is accessed out-of-range Self-explanatory.  

Fix store/state compute does not calculate a per-atom array The compute calculates a per-atom vector.  

Fix store/state compute does not calculate a per-atom vector The compute calculates a per-atom vector.  

Fix store/state compute does not calculate per-atom values Computes that calculate global or local quantities cannot be used with fix store/state.  

Fix store/state fix array is accessed out-of-range Self-explanatory.  

Fix store/state fix does not calculate a per-atom array The fix calculates a per-atom vector.  

Fix store/state fix does not calculate a per-atom vector The fix calculates a per-atom array.  

Fix store/state fix does not calculate per-atom values Fixes that calculate global or local quantities cannot be used with fix store/state.  

Fix store/state for atom property that is not allocated Self-explanatory.  

Fix store/state variable is not atom-style variable Only atom-style variables calculate per-atom quantities.  

Fix temp/berendsen period must be $:>\pmb{\theta.0}$ Self-explanatory.  

Fix temp/berendsen variable returned negative temperature Self-explanatory.  

Fix temp/csld is not compatible with fix rattle or fix shake These two commands cannot currently be used together with fix temp/csld.  

Fix temp/csld variable returned negative temperature Self-explanatory.  

Fix temp/csvr variable returned negative temperature Self-explanatory.  

Fix temp/rescale variable returned negative temperature Self-explanatory.  

Fix tfmc displacement length must be $>\pmb{\theta}$ Self-explanatory.  

Fix tfmc is not compatible with fix shake These two commands cannot currently be used together.  

Fix tfmc temperature must be $>\pmb{\theta}$ Self-explanatory.  

Fix thermal/conductivity swap value must be positive Self-explanatory.  

Fix tmd must come after integration fixes Any fix tmd command must appear in the input script after all time integration fixes (nve, nvt, npt). See the fix tmd documentation for details.  

Fix ttm electron temperatures must $b e>0.0$ Self-explanatory.  

Fix ttm electronic_density must be $>\pmb{\theta.0}$ Self-explanatory.  

Fix ttm electronic_specific_heat must be $>\pmb{\theta.0}$ Self-explanatory.  

Fix ttm electronic_thermal_conductivity must be $>=\pmb{0.0}$ Self-explanatory.  

Fix ttm gamma_p must be > 0.0 Self-explanatory.  

Fix ttm gamma_s must be $>=\pmb{0.0}$ Self-explanatory.  

Fix ttm number of nodes must ${\pmb b}{\pmb e}>{\pmb\theta}$ Self-explanatory.  

Fix ttm v_0 must be $>=\pmb{0.0}$ Self-explanatory.  

Fix used in compute chunk/atom not computed at compatible time The chunk/atom compute cannot query the output of the fix on a timestep it is needed.  

Fix used in compute reduce not computed at compatible time Fixes generate their values on specific timesteps. Compute reduce is requesting a value on a non-allowed timestep.  

Fix used in compute slice not computed at compatible time Fixes generate their values on specific timesteps. Compute slice is requesting a value on a non-allowed timestep.  

Fix vector cannot set output array intensive/extensive from these inputs The inputs to the command have conflicting intensive/extensive attributes. You need to use more than one fix vector command.  

Fix vector compute does not calculate a scalar Self-explanatory.  

Fix vector compute does not calculate a vector Self-explanatory.  

Fix vector compute vector is accessed out-of-range Self-explanatory.  

Fix vector fix does not calculate a scalar Self-explanatory.  

Fix vector fix does not calculate a vector Self-explanatory.  

Fix vector fix vector is accessed out-of-range Self-explanatory.  

Fix vector variable is not equal-style variable Self-explanatory.  

Fix viscosity swap value must be positive Self-explanatory.  

Fix viscosity vtarget value must be positive Self-explanatory.  

Fix wall cutoff $<=\pmb{0.0}$ Self-explanatory.  

Fix wall/colloid requires atom style sphere Self-explanatory.  

Fix wall/colloid requires extended particles One of the particles has radius 0.0.  

Fix wall/gran is incompatible with Pair style Must use a granular pair style to define the parameters needed for this fix.  

Fix wall/gran requires atom style sphere Self-explanatory.  

Fix wall/piston command only available at zlo The face keyword must be zlo.  

Fix wall/region colloid requires atom style sphere Self-explanatory.  

Fix wall/region colloid requires extended particles One of the particles has radius 0.0.  

Fix wall/region cutoff $<=\pmb{0.0}$ Self-explanatory.  

Fix_modify pressure $\pmb{I D}$ does not compute pressure The compute ID assigned to the fix must compute pressure.  

Fix_modify temperature ID does not compute temperature The compute ID assigned to the fix must compute temperature.  

For triclinic deformation, specified target stress must be hydrostatic Triclinic pressure control is allowed using the tri keyword, but non-hydrostatic pressure control can not be used in this case.  

Found no restart file matching pattern When using a “\*” in the restart file name, no matching file was found.  

GPU library not compiled for this accelerator Self-explanatory.  

GPU package does not (yet) work with atom_style template Self-explanatory.  

GPU particle split must be set to 1 for this pair style. For this pair style, you cannot run part of the force calculation on the host. See the package command.  

GPUs are requested but Kokkos has not been compiled for CUDA Re-compile Kokkos with CUDA support to use GPUs.  

Ghost velocity forward comm not yet implemented with Kokkos This is a current restriction.  

Gmask function in equal-style variable formula Gmask is per-atom operation.  

Gravity changed since fix pour was created The gravity vector defined by fix gravity must be static.  

Gravity must point in -y to use with fix pour in 2d Self-explanatory.  

Gravity must point in -z to use with fix pour in 3d Self-explanatory.  

Grmask function in equal-style variable formula Grmask is per-atom operation.  

Group ID does not exist A group ID used in the group command does not exist.  

Group ID in variable formula does not exist Self-explanatory.  

Group all cannot be made dynamic This operation is not allowed.  

Group command before simulation box is defined The group command cannot be used before a read_data, read_restart, or create_box command.  

Group dynamic cannot reference itself Self-explanatory.  

Group dynamic parent group cannot be dynamic Self-explanatory.  

Group dynamic parent group does not exist Self-explanatory.  

Group region ID does not exist A region ID used in the group command does not exist.  

If read_dump purges it cannot replace or trim These operations are not compatible. See the read_dump doc page for details.  

Illegal . . . command Self-explanatory. Check the input script syntax and compare to the documentation for the command. You can use -echo screen as a command-line option when running LAMMPS to see the offending  

# Illegal COMB parameter  

One or more of the coefficients defined in the potential file is invalid.  

# Illegal COMB3 parameter  

One or more of the coefficients defined in the potential file is invalid.  

# 11.6. Error messages  

# Illegal Stillinger-Weber parameter  

One or more of the coefficients defined in the potential file is invalid.  

Illegal Tersoff parameter One or more of the coefficients defined in the potential file is invalid  

Illegal Vashishta parameter One or more of the coefficients defined in the potential file is invalid.  

Illegal compute voronoi/atom command (occupation and (surface or edges)) Self-explanatory.  

Illegal coul/streitz parameter One or more of the coefficients defined in the potential file is invalid.  

Illegal dump_modify sfactor value (must be $>\pmb{0.0}$ ) Self-explanatory.  

Illegal dump_modify tfactor value (must ${\bf\nabla}b e>0.0,$ ) Self-explanatory.  

gal fix gcmc gas mass $<=\pmb{\theta}$ The computed mass of the designated gas molecule or atom type was less than or equal to zero.  

Illegal fix tfmc random seed Seeds can only be nonzero positive integers.  

Illegal fix wall/piston velocity The piston velocity must be positive.  

Illegal integrate style Self-explanatory.  

Illegal nb3b/harmonic parameter One or more of the coefficients defined in the potential file is invalid.  

Illegal number of angle table entries There must be at least 2 table entries.  

Illegal number of bond table entries There must be at least 2 table entries.  

Illegal number of pair table entries There must be at least 2 table entries.  

Illegal or unset periodicity in restart This error should not normally occur unless the restart file is invalid.  

Illegal range increment value The increment must be $>=1$ .  

Illegal simulation box The lower bound of the simulation box is greater than the upper bound.  

Illegal size double vector read requested This error should not normally occur unless the restart file is invalid.  

Illegal size integer vector read requested This error should not normally occur unless the restart file is invalid.  

# Illegal size string or corrupt restart  

This error should not normally occur unless the restart file is invalid.  

# Imageint setting in lmptype.h is invalid  

Imageint must be as large or larger than smallint.  

# Imageint setting in lmptype.h is not compatible  

Format of imageint stored in restart file is not consistent with LAMMPS version you are running. See the settings in src/lmptype.h  

# Improper atom missing in delete_bonds  

The delete_bonds command cannot find one or more atoms in a particular improper on a particular processor.   
The pairwise cutoff is too short or the atoms are too far apart to make a valid improper.  

# Improper atom missing in set command  

The set command cannot find one or more atoms in a particular improper on a particular processor. The pairwise cutoff is too short or the atoms are too far apart to make a valid improper.  

# Improper atoms $\%d\%d\%d\%d$ missing on proc %d at step %ld  

One or more of 4 atoms needed to compute a particular improper are missing on this processor. Typically this is because the pairwise cutoff is set too short or the improper has blown apart and an atom is too far away.  

# Improper atoms missing on proc %d at step %ld  

One or more of 4 atoms needed to compute a particular improper are missing on this processor. Typically this is because the pairwise cutoff is set too short or the improper has blown apart and an atom is too far away.  

# Improper coeff for hybrid has invalid style  

Improper style hybrid uses another improper style as one of its coefficients. The improper style used in the improper_coeff command or read from a restart file is not recognized.  

Improper coeffs are not set No improper coefficients have been assigned in the data file or via the improper_coeff command.  

Improper style hybrid cannot have hybrid as an argument Self-explanatory.  

Improper style hybrid cannot have none as an argument Self-explanatory.  

Improper style hybrid cannot use same improper style twice Self-explanatory.  

Improper_coeff command before improper_style is defined Coefficients cannot be set in the data file or via the improper_coeff command until an improper_style has been assigned.  

Improper_coeff command before simulation box is defined The improper_coeff command cannot be used before a read_data, read_restart, or create_box command.  

Improper_coeff command when no impropers allowed The chosen atom style does not allow for impropers to be define  

Improper_style command when no impropers allowed The chosen atom style does not allow for impropers to be defined  

# Impropers assigned incorrectly  

Impropers read in from the data file were not assigned correctly to atoms. This means there is something invalid about the topology definitions.  

Impropers defined but no improper types The data file header lists improper but no improper types.  

# Incompatible KIM Simulator Model  

The requested KIM Simulator Model was defined for a different MD code and thus is not compatible with LAMMPS.  

# 11.6. Error messages  

# Incompatible units for KIM Simulator Model  

The selected unit style is not compatible with the requested KIM Simulator Model.  

Incomplete use of variables in create_atoms command The var and set options must be used together.  

Inconsistent iparam/jparam values in fix bond/create command If itype and jtype are the same, then their maxbond and newtype settings must also be the same.  

Inconsistent line segment in data file The end points of the line segment are not equal distances from the center point which is the atom coordinate.  

nconsistent triangle in data file The centroid of the triangle as defined by the corner points is not the atom coordinate.  

Inconsistent use of finite-size particles by molecule template molecules Not all of the molecules define a radius for their constituent particles.  

Incorrect # of floating-point values in Bodies section of data file See page for body style.  

Incorrect # of integer values in Bodies section of data file See page for body style.  

Incorrect %s format in data file A section of the data file being read by fix property/atom does not have the correct number of values per line.  

Incorrect SNAP parameter file The file cannot be parsed correctly, check its internal syntax.  

Incorrect args for angle coefficients Self-explanatory. Check the input script or data file.  

Incorrect args for bond coefficients Self-explanatory. Check the input script or data file.  

Incorrect args for dihedral coefficients Self-explanatory. Check the input script or data file.  

Incorrect args for improper coefficients Self-explanatory. Check the input script or data file.  

Incorrect args for pair coefficients Self-explanatory. Check the input script or data file.  

Incorrect args in pair_style command Self-explanatory.  

Incorrect atom format in data file Number of values per atom line in the data file is not consistent with the atom style.  

Incorrect atom format in neb file The number of fields per line is not what expected.  

Incorrect bonus data format in data file See the read_data page for a description of how various kinds of bonus data must be formatted for certain atom styles.  

Incorrect boundaries with slab Ewald Must have periodic x,y dimensions and non-periodic z dimension to use 2d slab option with Ewald.  

Must have periodic x,y dimensions and non-periodic z dimension to use 2d slab option with Ewald.  

# Incorrect boundaries with slab PPPM  

Must have periodic x,y dimensions and non-periodic z dimension to use 2d slab option with PPPM.  

Must have periodic x,y dimensions and non-periodic z dimension to use 2d slab option with pppm/disp.  

Incorrect conversion in format string  

A format style variable was not using either a $\%.$ , a $\%{\bf g}$ , or a $\%{\mathrm{e}}$ conversion. Or an immediate variable with format suffix was not using either a $\%\mathrm{{f}}$ , a $\%{\bf g}$ or a $\%{\mathrm{e}}$ conversion in the format suffix.  

Incorrect element names in ADP potential file The element names in the ADP file do not match those requested.  

Incorrect element names in EAM potential file The element names in the EAM file do not match those requested.  

Incorrect format of . . . section in data file Number or type of values per line in the given section of the data file is not consistent with the requirements for this section.  

Incorrect format in COMB potential file Incorrect number of words per line in the potential file.  

Incorrect format in COMB3 potential file Incorrect number of words per line in the potential file.  

Incorrect format in MEAM library file Incorrect number of words per line in the potential file.  

Incorrect format in SNAP coefficient file Incorrect number of words per line in the coefficient file.  

Incorrect format in SNAP parameter file Incorrect number of words per line in the parameter file.  

Incorrect format in Stillinger-Weber potential file Incorrect number of words per line in the potential file.  

Incorrect format in TMD target file Format of file read by fix tmd command is incorrect.  

Incorrect format in Tersoff potential file Incorrect number of words per line in the potential file.  

Incorrect format in Vashishta potential file Incorrect number of words per line in the potential file.  

Incorrect format in coul/streitz potential file Incorrect number of words per line in the potential file.  

Incorrect format in nb3b/harmonic potential file Incorrect number of words per line in the potential file.  

Incorrect integer value in Bodies section of data file See page for body style.  

Incorrect multiplicity arg for dihedral coefficients Self-explanatory. Check the input script or data file.  

Incorrect number of elements in potential file Self-explanatory.  

Incorrect rigid body format in fix rigid file The number of fields per line is not what expected.  

Incorrect rigid body format in fix rigid/small file The number of fields per line is not what expected.  

Incorrect sign arg for dihedral coefficients Self-explanatory. Check the input script or data file.  

Incorrect table format check for element types Self-explanatory.  

ncorrect velocity format in data file Each atom style defines a format for the Velocity section of the data file. The read-in lines do not match.  

Incorrect weight arg for dihedral coefficients Self-explanatory. Check the input script or data file.  

Index between variable brackets must be positive Self-explanatory.  

Indexed per-atom vector in variable formula without atom map  

Accessing a value from an atom vector requires the ability to lookup an atom index, which is provided by an atom map. An atom map does not exist (by default) for non-molecular problems. Using the atom_modify map command will force an atom map to be created.  

Initial temperatures not all set in fix ttm Self-explanatory.  

Input line quote not followed by white-space An end quote must be followed by white-space.  

Insertion region extends outside simulation box Self-explanatory.  

Insufficient Jacobi rotations for POEMS body Eigensolve for rigid body was not sufficiently accurate.  

Insufficient Jacobi rotations for body nparticle Eigensolve for rigid body was not sufficiently accurate.  

Insufficient Jacobi rotations for rigid body Eigensolve for rigid body was not sufficiently accurate.  

Insufficient Jacobi rotations for rigid molecule Eigensolve for rigid body was not sufficiently accurate.  

Insufficient Jacobi rotations for triangle The calculation of the inertia tensor of the triangle failed. This should not happen if it is a reasonably shaped triangle.  

Insufficient memory on accelerator There is insufficient memory on one of the devices specified for the gpu package  

Internal error in atom_style body This error should not occur. Contact the developers.  

Invalid -reorder $N$ value Self-explanatory.  

Invalid Angles section in molecule file Self-explanatory.  

Invalid Bonds section in molecule file Self-explanatory.  

Invalid Boolean syntax in if command Self-explanatory.  

Invalid Charges section in molecule file Self-explanatory.  

Invalid Coords section in molecule file Self-explanatory.  

Invalid Diameters section in molecule file Self-explanatory.  

Invalid Dihedrals section in molecule file Self-explanatory.  

Invalid Impropers section in molecule file Self-explanatory.  

Invalid Kokkos command-line args Self-explanatory. See Section 2.7 of the manual for details.  

Invalid LAMMPS restart file The file does not appear to be a LAMMPS restart file since it does not contain the correct magic string at the beginning.  

Invalid Masses section in molecule file Self-explanatory.  

Invalid molecule ID in molecule file Molecule ID must be a non-zero positive integer.  

Invalid Molecules section in molecule file Self-explanatory.  

nvalid REAX atom type There is a mis-match between LAMMPS atom types and the elements listed in the ReaxFF force field file.  

Invalid Special Bond Counts section in molecule file Self-explanatory.  

Invalid Types section in molecule file Self-explanatory.  

Invalid angle count in molecule file Self-explanatory.  

Invalid angle table length Length must be 2 or greater.  

Invalid angle type in Angles section of data file Angle type must be positive integer and within range of specified angle types.  

Invalid angle type in Angles section of molecule file Self-explanatory.  

Invalid angle type index for fix shake Self-explanatory.  

Invalid args for non-hybrid pair coefficients “NULL” is only supported in pair_coeff calls when using pair hybrid  

Invalid argument to factorial %d N must be $>=0$ and $<=167$ , otherwise the factorial result is too large.  

# Invalid atom ID in %s section of data file  

An atom in a section of the data file being read by fix property/atom has an invalid atom ID that is $<=0$ or $>$ the maximum existing atom ID.  

Invalid atom ID in Angles section of data file Atom IDs must be positive integers and within range of defined atoms.  

Invalid atom ID in Angles section of molecule file Self-explanatory.  

Invalid atom ID in Atoms section of data file Atom IDs must be positive integers.  

Invalid atom ID in Bodies section of data file Atom IDs must be positive integers and within range of defined atoms.  

Invalid atom ID in Bonds section of data file Atom IDs must be positive integers and within range of defined atoms.  

Invalid atom ID in Bonds section of molecule file Self-explanatory.  

Invalid atom ID in Bonus section of data file Atom IDs must be positive integers and within range of defined atoms.  

Invalid atom ID in Dihedrals section of data file Atom IDs must be positive integers and within range of defined atoms.  

Invalid atom ID in Fragments section of molecule file Self-explanatory.  

Invalid atom ID in Impropers section of data file Atom IDs must be positive integers and within range of defined atoms.  

Invalid atom ID in Velocities section of data file Atom IDs must be positive integers and within range of defined atoms.  

Invalid atom ID in dihedrals section of molecule file Self-explanatory.  

Invalid atom ID in impropers section of molecule file Self-explanatory.  

Invalid atom ID in variable file Self-explanatory.  

Invalid atom IDs in neb file An ID in the file was not found in the system.  

Invalid atom diameter in molecule file Diameters must be $>=0.0$ .  

Invalid atom mass for fix shake Mass specified in fix shake command must be $>0.0$ .  

Invalid atom mass in molecule file Masses must be $>0.0$ .  

Invalid atom type in Atoms section of data file Atom types must range from 1 to specified # of types.  

Invalid atom type in create_atoms command The create_box command specified the range of valid atom types. An invalid type is being requested.  

# Invalid atom type in create_atoms mol command  

The atom types in the defined molecule are added to the value specified in the create_atoms command, as an offset. The final value for each atom must be between 1 to N, where N is the number of atom types.  

Invalid atom type in fix atom/swap command The atom type specified in the atom/swap command does not exist.  

Invalid atom type in fix bond/create command Self-explanatory.  

Invalid atom type in fix deposit command Self-explanatory.  

Invalid atom type in fix deposit mol command  

The atom types in the defined molecule are added to the value specified in the create_atoms command, as an offset. The final value for each atom must be between 1 to N, where N is the number of atom types.  

Invalid atom type in fix gcmc command The atom type specified in the gcmc command does not exist.  

Invalid atom type in fix pour command Self-explanatory.  

Invalid atom type in fix pour mol command  

The atom types in the defined molecule are added to the value specified in the create_atoms command, as an offset. The final value for each atom must be between 1 to N, where N is the number of atom types.  

Invalid atom type in molecule file Atom types must range from 1 to specified # of types.  

Invalid atom type in neighbor exclusion list Atom types must range from 1 to Ntypes inclusive.  

Invalid atom type index for fix shake Atom types must range from 1 to Ntypes inclusive.  

Invalid atom types in pair_write command Atom types must range from 1 to Ntypes inclusive.  

Invalid atom vector in variable formula The atom vector is not recognized.  

Invalid atom_style body command No body style argument was provided.  

Invalid atom_style command Self-explanatory.  

Invalid attribute in dump custom command Self-explanatory.  

Invalid attribute in dump local command Self-explanatory.  

Invalid attribute in dump modify command Self-explanatory.  

Invalid basis setting in create_atoms command  

The basis index must be between 1 to N where N is the number of basis atoms in the lattice. The type index must be between 1 to N where $\mathbf{N}$ is the number of atom types.  

# Invalid basis setting in fix append/atoms command  

The basis index must be between 1 to N where N is the number of basis atoms in the lattice. The type index must be between 1 to N where N is the number of atom types.  

Invalid bin bounds in compute chunk/atom The lo/hi values are inconsistent.  

Invalid bin bounds in fix ave/spatial The lo/hi values are inconsistent.  

Invalid body nparticle command Arguments in atom-style command are not correct.  

Invalid bond count in molecule file Self-explanatory.  

Invalid bond table length Length must be 2 or greater.  

Invalid bond type in Bonds section of data file Bond type must be positive integer and within range of specified bond types.  

Invalid bond type in Bonds section of molecule file Self-explanatory.  

Invalid bond type in create_bonds command Self-explanatory.  

Invalid bond type in fix bond/break command Self-explanatory.  

Invalid bond type in fix bond/create command Self-explanatory.  

Invalid bond type index for fix shake Self-explanatory. Check the fix shake command in the input script.  

Invalid coeffs for this dihedral style Cannot set class 2 coeffs in data file for this dihedral style.  

Invalid color in dump_modify command The specified color name was not in the list of recognized colors. See the dump_modify doc page.  

Invalid color map min/max values The min/max values are not consistent with either each other or with values in the color map.  

Invalid command-line argument One or more command-line arguments is invalid. Check the syntax of the command you are using to launch LAMMPS.  

Invalid compute ID in variable formula The compute is not recognized.  

Invalid create_atoms rotation vector for 2d model The rotation vector can only have a z component.  

Invalid custom OpenCL parameter string. There are not enough or too many parameters in the custom string for package GPU.  

Invalid cutoff in comm_modify command Specified cutoff must be $>=0.0$ .  

Invalid cutoffs in pair_write command Inner cutoff must be larger than 0.0 and less than outer cutoff.  

Invalid d1 or d2 value for pair colloid coeffNeither d1 or d2 can be $<0$ .  

Invalid data file section: Angle Coeffs Atom style does not allow angles.  

Invalid data file section: AngleAngle Coeffs Atom style does not allow impropers.  

Invalid data file section: AngleAngleTorsion Coeffs Atom style does not allow dihedrals.  

Invalid data file section: AngleTorsion Coeffs Atom style does not allow dihedrals.  

Invalid data file section: Angles Atom style does not allow angles.  

Invalid data file section: Bodies Atom style does not allow bodies.  

Invalid data file section: Bond Coeffs Atom style does not allow bonds.  

Invalid data file section: BondAngle Coeffs Atom style does not allow angles.  

Invalid data file section: BondBond Coeffs Atom style does not allow angles.  

Invalid data file section: BondBond13 Coeffs Atom style does not allow dihedrals.  

Invalid data file section: Bonds Atom style does not allow bonds.  

Invalid data file section: Dihedral Coeffs Atom style does not allow dihedrals.  

Invalid data file section: Dihedrals Atom style does not allow dihedrals.  

Invalid data file section: Ellipsoids Atom style does not allow ellipsoids.  

Invalid data file section: EndBondTorsion Coeffs Atom style does not allow dihedrals.  

Invalid data file section: Improper Coeffs Atom style does not allow impropers.  

Invalid data file section: Impropers Atom style does not allow impropers.  

Invalid data file section: Lines Atom style does not allow lines.  

Invalid data file section: MiddleBondTorsion Coeffs Atom style does not allow dihedrals.  

Invalid data file section: Triangles Atom style does not allow triangles.  

Invalid delta_conf in tad command The value must be between 0 and 1 inclusive.  

Invalid density in Atoms section of data file Density value cannot be $<=0.0$ .  

Invalid density in set command Density must be $>0.0$ .  

Invalid diameter in set command Self-explanatory.  

Invalid dihedral count in molecule file Self-explanatory.  

Invalid dihedral type in Dihedrals section of data file Dihedral type must be positive integer and within range of specified dihedral types.  

Invalid dihedral type in dihedrals section of molecule file Self-explanatory.  

Invalid dipole length in set command Self-explanatory.  

Invalid displace_atoms rotate axis for 2d Axis must be in z direction.  

nvalid dump dcd filename Filenames used with the dump dcd style cannot be binary or compressed or cause multiple files to be written.  

Invalid dump frequency Dump frequency must be 1 or greater.  

valid dump image element name The specified element name was not in the standard list of elements. See the dump_modify doc page.  

Invalid dump image filename The file produced by dump image cannot be binary and must be for a single processor.  

Invalid dump image theta value Theta must be between 0.0 and 180.0 inclusive.  

Invalid dump image zoom value Zoom value must be $>0.0$ .  

nvalid dump movie filename The file produced by dump movie cannot be binary or compressed and must be a single file for a single processor  

Invalid dump xtc filename Filenames used with the dump xtc style cannot be binary or compressed or cause multiple files to be written.  

Invalid dump xyz filename Filenames used with the dump xyz style cannot be binary or cause files to be written by each processor.  

Invalid dump_modify threshold operator Operator keyword used for threshold specification in not recognized.  

Invalid entry in -reorder file Self-explanatory.  

Invalid fix ID in variable formula The fix is not recognized.  

Invalid fix ave/time off column Self-explanatory.  

Invalid fix box/relax command for a 2d simulation Fix box/relax styles involving the z dimension cannot be used in a 2d simulation.  

Invalid fix box/relax command pressure settings If multiple dimensions are coupled, those dimensions must be specified.  

Invalid fix box/relax pressure settings Settings for coupled dimensions must be the same.  

Invalid fix halt attribute Self-explanatory.  

Invalid fix halt operator Self-explanatory.  

Invalid fix nvt/npt/nph command for a 2d simulation Cannot control z dimension in a 2d model.  

Invalid fix nvt/npt/nph command pressure settings If multiple dimensions are coupled, those dimensions must be specified.  

Invalid fix nvt/npt/nph pressure settings Settings for coupled dimensions must be the same.  

Invalid fix press/berendsen for a 2d simulation The z component of pressure cannot be controlled for a 2d model.  

Invalid fix press/berendsen pressure settings Settings for coupled dimensions must be the same.  

Invalid fix qeq parameter file Element index $>$ number of atom types.  

Invalid fix rigid npt/nph command for a 2d simulation Cannot control z dimension in a 2d model.  

Invalid fix rigid npt/nph command pressure settings If multiple dimensions are coupled, those dimensions must be specified.  

Invalid fix rigid/small npt/nph command for a 2d simulation Cannot control z dimension in a 2d model.  

Invalid fix rigid/small npt/nph command pressure settings If multiple dimensions are coupled, those dimensions must be specified.  

Invalid flag in force field section of restart file Unrecognized entry in restart file.  

Invalid flag in header section of restart file Unrecognized entry in restart file.  

Invalid flag in peratom section of restart file The format of this section of the file is not correct.  

Invalid flag in type arrays section of restart file Unrecognized entry in restart file.  

Invalid frequency in temper command Nevery must be $>0$ .  

Invalid group ID in neigh_modify command A group ID used in the neigh_modify command does not exist.  

Invalid group function in variable formula Group function is not recognized.  

Invalid group in comm_modify command Self-explanatory.  

Invalid image up vector Up vector cannot be (0,0,0).  

Invalid immediate variable Syntax of immediate value is incorrect.  

Invalid improper count in molecule file Self-explanatory.  

Invalid improper type in Impropers section of data file Improper type must be positive integer and within range of specified improper types.  

Invalid improper type in impropers section of molecule file Self-explanatory.  

Invalid index for non-body particles in compute body/local command Only indices 1,2,3 can be used for non-body particles.  

Invalid index in compute body/local command Self-explanatory.  

Invalid is_active() function in variable formula Self-explanatory.  

Invalid is_available() function in variable formula Self-explanatory.  

Invalid is_defined() function in variable formula Self-explanatory.  

Invalid keyword in angle table parameters Self-explanatory.  

Invalid keyword in bond table parameters Self-explanatory.  

Invalid keyword in compute angle/local command Self-explanatory.  

Invalid keyword in compute bond/local command Self-explanatory.  

Invalid keyword in compute dihedral/local command Self-explanatory.  

Invalid keyword in compute improper/local command Self-explanatory.  

Invalid keyword in compute pair/local command Self-explanatory.  

Invalid keyword in compute property/atom command Self-explanatory.  

Invalid keyword in compute property/chunk command Self-explanatory.  

Invalid keyword in compute property/local command Self-explanatory.  

Invalid keyword in dump cfg command Self-explanatory.  

Invalid keyword in pair table parameters Keyword used in list of table parameters is not recognized.  

Invalid length in set command Self-explanatory.  

Invalid mass in set command Self-explanatory.  

Invalid mass line in data file Self-explanatory.  

Invalid mass value Self-explanatory.  

Invalid math function in variable formula Self-explanatory.  

Invalid math/group/special function in variable formula Self-explanatory.  

Invalid option in lattice command for non-custom style Certain lattice keywords are not supported unless the lattice style is “custom”.  

For respa, ordering of force computations within respa levels must obey certain rules. E.g. bonds cannot be compute less frequently than angles, pairwise forces cannot be computed less frequently than kspace, etc.  

Invalid pair table cutoff Cutoffs in pair_coeff command are not valid with read-in pair table.  

Invalid pair table length Length of read-in pair table is invalid  

Invalid param file for fix qeq/shielded Invalid value of gamma.  

Invalid param file for fix qeq/slater Zeta value is 0.0.  

Invalid partitions in processors part command Valid partitions are numbered 1 to $\mathbf{N}$ and the sender and receiver cannot be the same partition.  

Invalid python command Self-explanatory. Check the input script syntax and compare to the documentation for the command. You ca use -echo screen as a command-line option when running LAMMPS to see the offending line.  

Invalid radius in Atoms section of data file Radius must be $>=0.0$ .  

Invalid random number seed in fix ttm command Random number seed must be $>0$ .  

Invalid random number seed in set command Random number seed must be $>0$ .  

Invalid replace values in compute reduce Self-explanatory.  

Invalid rigid body ID in fix rigid file The ID does not match the number of an existing ID of rigid bodies that are defined by the fix rigid command.  

Invalid rigid body ID in fix rigid/small file  

The ID does not match the number of an existing ID of rigid bodies that are defined by the fix rigid/smal command.  

# Invalid run command N value  

The number of timesteps must fit in a 32-bit integer. If you want to run for more steps than this, perform multiple shorter runs.  

Invalid run command start/stop value Self-explanatory.  

Invalid run command upto value Self-explanatory.  

Invalid seed for Marsaglia random # generator The initial seed for this random number generator must be a positive integer less than or equal to 900 million.  

Invalid seed for Park random # generator The initial seed for this random number generator must be a positive integer.  

Invalid shake angle type in molecule file Self-explanatory.  

Invalid shake atom in molecule file Self-explanatory.  

Invalid shake bond type in molecule file Self-explanatory.  

Invalid shake flag in molecule file Self-explanatory.  

Invalid shape in Ellipsoids section of data file Self-explanatory.  

Invalid shape in Triangles section of data file Two or more of the triangle corners are duplicate points.  

Invalid shape in set command Self-explanatory.  

Invalid shear direction for fix wall/gran Self-explanatory.  

Invalid special atom index in molecule file Self-explanatory.  

Invalid special function in variable formula Self-explanatory.  

Invalid style in pair_write command Self-explanatory. Check the input script.  

Invalid syntax in variable formula Self-explanatory.  

Invalid t_event in prd command Self-explanatory.  

# Invalid t_event in tad command  

The value must be greater than 0.  

Invalid template atom in Atoms section of data file  

The atom indices must be between 1 to N, where N is the number of atoms in the template molecule the atom belongs to.  

valid template index in Atoms section of data file The template indices must be between 1 to N, where N is the number of molecules in the template.  

Invalid thermo keyword in variable formula The keyword is not recognized.  

nvalid threads_per_atom specified. For 3-body potentials on the GPU, the threads_per_atom setting cannot be greater than 4 for NVIDIA GPUs.  

Invalid timestep reset for fix ave/atom Resetting the timestep has invalidated the sequence of timesteps this fix needs to process.  

Invalid timestep reset for fix ave/chunk Resetting the timestep has invalidated the sequence of timesteps this fix needs to process.  

Invalid timestep reset for fix ave/correlate Resetting the timestep has invalidated the sequence of timesteps this fix needs to process.  

Invalid timestep reset for fix ave/histo Resetting the timestep has invalidated the sequence of timesteps this fix needs to process.  

Invalid timestep reset for fix ave/spatial Resetting the timestep has invalidated the sequence of timesteps this fix needs to process.  

Invalid timestep reset for fix ave/time Resetting the timestep has invalidated the sequence of timesteps this fix needs to process.  

Invalid tmax in tad command The value must be greater than 0.0.  

Invalid type for mass set  

Mass command must set a type from 1-N where N is the number of atom types.  

Invalid label2type() function syntax in variable formula  

The first argument must be a label map kind (atom, bond, angle, dihedral, or improper) and the second argument must be a valid type label that has been assigned to a numeric type.  

# Invalid use of library file() function  

This function is called through the library interface. This error should not occur. Contact the developers if it does.  

Invalid value in set command  

The value specified for the setting is invalid, likely because it is too small or too large.  

Invalid variable evaluation in variable formula A variable used in a formula could not be evaluated.  

Invalid variable in next command Self-explanatory.  

Invalid variable name Variable name used in an input script line is invalid.  

Invalid variable name in variable formula Variable name is not recognized.  

Invalid variable style in special function next Only file-style or atomfile-style variables can be used with next().  

Invalid variable style with next command Variable styles equal and world cannot be used in a next command.  

Invalid volume in set command Volume must be $>0.0$ .  

Invalid wiggle direction for fix wall/gran Self-explanatory.  

Invoked angle equil angle on angle style none Self-explanatory.  

Invoked angle single on angle style none Self-explanatory.  

Invoked bond equil distance on bond style none Self-explanatory.  

Invoked bond single on bond style none Self-explanatory.  

Invoked pair single on pair style none A command (e.g. a dump) attempted to invoke the single() function on a pair style none, which is illegal. You are probably attempting to compute per-atom quantities with an undefined pair style.  

Invoking coulombic in pair style lj/coul requires atom attribute q The atom style defined does not have this attribute.  

Invoking coulombic in pair style lj/long/dipole/long requires atom attribute q The atom style defined does not have these attributes.  

KIM Simulator Model has no Model definition There is no model definition (key: model-defn) in the KIM Simulator Model. Please contact the OpenKIM database maintainers to verify and potentially correct this.  

KOKKOS package does not yet support comm_style tiled Self-explanatory.  

KOKKOS package requires a kokkos enabled atom_style Self-explanatory.  

KSpace accuracy must be $>\pmb{\theta}$ The kspace accuracy designated in the input must be greater than zero.  

KSpace accuracy too large to estimate G vector Reduce the accuracy request or specify gewald explicitly via the kspace_modify comman  

KSpace accuracy too low Requested accuracy must be less than 1.0.  

KSpace solver requires a pair style No pair style is defined.  

KSpace style does not yet support triclinic geometries The specified kspace style does not allow for non-orthogonal simulation boxes.  

KSpace style has not yet been set Cannot use kspace_modify command until a kspace style is set.  

# KSpace style is incompatible with Pair style  

Setting a kspace style requires that a pair style with matching long-range Coulombic or dispersion components be used.  

Keyword %s in MEAM parameter file not recognized Self-explanatory.  

Kokkos has been compiled for CUDA but no GPUs are requested One or more GPUs must be used when Kokkos is compiled for CUDA.  

Kspace_modify mesh parameter must be all zero or all positive Valid kspace mesh parameters are ${>}0$ . The code will try to auto-detect suitable values when all three mesh sizes are set to zero (the default).  

Kspace_modify mesh/disp parameter must be all zero or all positive Valid kspace mesh/disp parameters are ${>}0$ . The code will try to auto-detect suitable values when all three mesh sizes are set to zero and the required accuracy via force/disp/real as well as force/disp/kspace is set.  

Kspace style does not support compute group/group Self-explanatory.  

Kspace style pppm/disp/tip4p requires newton on Self-explanatory.  

Kspace style pppm/tip4p requires newton on Self-explanatory.  

Kspace style requires atom attribute q The atom style defined does not have these attributes.  

Kspace_modify eigtol must be smaller than one Self-explanatory.  

LAMMPS is not built with Python embedded This is done by including the PYTHON package before LAMMPS is built. This is required to use python-style variables.  

LAMMPS unit_style lj not supported by KIM models Self-explanatory. Check the input script or data file.  

LJ6 off not supported in pair_style buck/long/coul/long Self-explanatory.  

Label map is incomplete: all types must be assigned a unique type label For a given type-kind (atom types, bond types, etc.) to be written to the data file, all associated types must be assigned a type label, and each type label can be assigned to only one numeric type.  

Label wasn’t found in input script Self-explanatory.  

Labelmap command before simulation box is defined  

The labelmap command cannot be used before a read_data, read_restart, or create_box command.  

Lattice orient vectors are not orthogonal The three specified lattice orientation vectors must be mutually orthogonal.  

Lattice orient vectors are not right-handed  

The three specified lattice orientation vectors must create a right-handed coordinate system such that a1 cross a2 $=\mathrm{a}3$ .  

# Lattice primitive vectors are collinear  

The specified lattice primitive vectors do not for a unit cell with non-zero volume.  

# 11.6. Error messages  

Lattice settings are not compatible with 2d simulation  

One or more of the specified lattice vectors has a non-zero z component.  

Lattice spacings are invalid Each x,y,z spacing must be $>0$ .  

Lattice style incompatible with simulation dimension 2d simulation can use sq, sq2, or hex lattice. 3d simulation can use sc, bcc, or fcc lattice.  

Log of zero/negative value in variable formula Self-explanatory.  

Lost atoms via balance: original %ld current %ld This should not occur. Report the problem to the developers.  

# Lost atoms: original %ld current %ld  

Lost atoms are checked for each time thermo output is done. See the thermo_modify lost command for options. Lost atoms usually indicate bad dynamics, e.g. atoms have been blown far out of the simulation box, or moved further than one processor’s subdomain away before reneighboring.  

MEAM library error %d A call to the MEAM Fortran library returned an error.  

MPI_LMP_BIGINT and bigint in lmptype.h are not compatible The size of the MPI datatype does not match the size of a bigint.  

MPI_LMP_TAGINT and tagint in lmptype.h are not compatible The size of the MPI datatype does not match the size of a tagint.  

MSM can only currently be used with comm_style brick This is a current restriction in LAMMPS.  

MSM grid is too large The global MSM grid is larger than OFFSET in one or more dimensions. OFFSET is currently set to 16384. You likely need to decrease the requested accuracy.  

MSM order must be 4, 6, 8, or 10 This is a limitation of the MSM implementation in LAMMPS: the MSM order can only be 4, 6, 8, or 10.  

Mass command before simulation box is defined The mass command cannot be used before a read_data, read_restart, or create_box command.  

Matrix factorization to split dispersion coefficients failed This should not normally happen. Contact the developers.  

Min_style command before simulation box is defined The min_style command cannot be used before a read_data, read_restart, or create_box command.  

Minimization could not find thermo_pe compute This compute is created by the thermo command. It must have been explicitly deleted by a uncompute command.  

Minimize command before simulation box is defined The minimize command cannot be used before a read_data, read_restart, or create_box command.  

Mismatched brackets in variable Self-explanatory.  

Mismatched compute in variable formula  

A compute is referenced incorrectly or a compute that produces per-atom values is used in an equal-style variable formula.  

# Mismatched fix in variable formula  

A fix is referenced incorrectly or a fix that produces per-atom values is used in an equal-style variable formula.  

# Mismatched parameter in MEAM library file: $z\sp{\prime}{=}l a t$  

The coordination number and lattice do not match, check that consistent values are given.  

# Mismatched variable in variable formula  

A variable is referenced incorrectly or an atom-style variable that produces per-atom values is used in an equalstyle variable formula.  

Modulo 0 in variable formula Self-explanatory.  

Molecule IDs too large for compute chunk/atom  

The IDs must not be larger than can be stored in a 32-bit integer since chunk IDs are 32-bit integers.  

Molecule auto special bond generation overflow Counts exceed maxspecial setting for other atoms in system.  

Molecule file has angles but no nangles setting Self-explanatory.  

Molecule file has body params but no setting for them Self-explanatory.  

Molecule file has bonds but no nbonds setting Self-explanatory.  

Molecule file has dihedrals but no ndihedrals setting Self-explanatory.  

Molecule file has fragments but no nfragments setting Self-explanatory.  

Molecule file has impropers but no nimpropers setting Self-explanatory.  

Molecule file has no Body Doubles section Self-explanatory.  

Molecule file has no Body Integers section Self-explanatory.  

Molecule file has no Fragments section Self-explanatory.  

Molecule file has special flags but no bonds Self-explanatory.  

Molecule file needs both Special Bond sections Self-explanatory.  

Molecule file requires atom style body Self-explanatory.  

Molecule file shake flags not before shake atoms The order of the two sections is important.  

Molecule file shake flags not before shake bonds The order of the two sections is important.  

Molecule file shake info is incomplete All 3 SHAKE sections are needed.  

Molecule file special list does not match special count The number of values in an atom’s special list does not match count.  

Molecule file z center-of-mass must be 0.0 for 2d Self-explanatory.  

Molecule file z coord must be 0.0 for 2d Self-explanatory.  

Molecule natoms must be 1 for body particle Self-explanatory.  

Molecule sizescale must be 1.0 for body particle Self-explanatory.  

Molecule template ID for atom_style template does not exist Self-explanatory.  

Molecule template ID for create_atoms does not exist Self-explanatory.  

Molecule template ID for fix deposit does not exist Self-explanatory.  

Molecule template ID for fix gcmc does not exist Self-explanatory.  

Molecule template ID for fix pour does not exist Self-explanatory.  

Molecule template ID for fix rigid/small does not exist Self-explanatory.  

Molecule template ID for fix shake does not exist Self-explanatory.  

Molecule template ID must be alphanumeric or underscore characters Self-explanatory.  

Molecule topology/atom exceeds system topology/atom  

The number of bonds, angles, etc per-atom in the molecule exceeds the system setting. See the create_box command for how to specify these values.  

Molecule topology type exceeds system topology type The number of bond, angle, etc types in the molecule exceeds the system setting. See the create_box command for how to specify these values.  

More than one fix deform Only one fix deform can be defined at a time.  

More than one fix freeze Only one of these fixes can be defined, since the granular pair potentials access it.  

More than one fix shake Only one fix shake can be defined.  

Mu not allowed when not using semi-grand in fix atom/swap command Self-explanatory.  

Must define angle_style before Angle Coeffs Must use an angle_style command before reading a data file that defines Angle Coeffs.  

Must define angle_style before BondAngle Coeffs Must use an angle_style command before reading a data file that defines Angle Coeffs.  

Must define angle_style before BondBond Coeffs Must use an angle_style command before reading a data file that defines Angle Coeffs.  

Must define bond_style before Bond Coeffs Must use a bond_style command before reading a data file that defines Bond Coeffs.  

Must define dihedral_style before AngleAngleTorsion Coeffs Must use a dihedral_style command before reading a data file that defines AngleAngleTorsion Coeffs.  

Must define dihedral_style before AngleTorsion Coeffs Must use a dihedral_style command before reading a data file that defines AngleTorsion Coeffs.  

Must define dihedral_style before BondBond13 Coeffs Must use a dihedral_style command before reading a data file that defines BondBond13 Coeffs.  

Must define dihedral_style before Dihedral Coeffs Must use a dihedral_style command before reading a data file that defines Dihedral Coeffs.  

Must define dihedral_style before EndBondTorsion Coeffs Must use a dihedral_style command before reading a data file that defines EndBondTorsion Coeffs.  

Must define dihedral_style before MiddleBondTorsion Coeffs Must use a dihedral_style command before reading a data file that defines MiddleBondTorsion Coeffs.  

Must define improper_style before AngleAngle Coeffs Must use an improper_style command before reading a data file that defines AngleAngle Coeffs.  

Must define improper_style before Improper Coeffs Must use an improper_style command before reading a data file that defines Improper Coeffs.  

Must define pair_style before Pair Coeffs Must use a pair_style command before reading a data file that defines Pair Coeffs.  

Must define pair_style before PairIJ Coeffs Must use a pair_style command before reading a data file that defines PairIJ Coeffs.  

Must have more than one processor partition to temper Cannot use the temper command with only one processor partition. Use the -partition command-line option  

Must not have multiple fixes change box parameter . . . Self-explanatory.  

Must read Angle Type Labels before Angles An Angle Type Labels section of a data file must come before the Angles section.  

Must read Atom Type Labels before Atoms An Atom Type Labels section of a data file must come before the Atoms section.  

Must read Atoms before Angles The Atoms section of a data file must come before an Angles section.  

Must read Atoms before Bodies The Atoms section of a data file must come before a Bodies section.  

Must read Atoms before Bonds The Atoms section of a data file must come before a Bonds section.  

Must read Atoms before Dihedrals The Atoms section of a data file must come before a Dihedrals section.  

Must read Atoms before Ellipsoids The Atoms section of a data file must come before a Ellipsoids section.  

Must read Atoms before Impropers The Atoms section of a data file must come before an Impropers section  

Must read Atoms before Lines  

The Atoms section of a data file must come before a Lines section.  

Must read Atoms before Triangles The Atoms section of a data file must come before a Triangles section.  

Must read Atoms before Velocities The Atoms section of a data file must come before a Velocities section.  

Must read Bond Type Labels before Bonds A Bond Type Labels section of a data file must come before the Bonds section.  

Must read Dihedral Type Labels before Dihedrals An Dihedral Type Labels section of a data file must come before the Dihedrals section.  

Must read Improper Type Labels before Impropers An Improper Type Labels section of a data file must come before the Impropers section.  

Must re-specify non-restarted pair style $({\pmb x}{\pmb x}{\pmb x})$ after read_restart For pair styles, that do not store their settings in a restart file, it must be defined with a new ‘pair_style’ command after read_restart.  

# Must set both respa inner and outer  

Cannot use just the inner or outer option with respa without using the other.  

# Must set number of threads via package omp command  

Because you are using the OPENMP package, set the number of threads via its settings, not by the pair_style snap nthreads setting.  

# Must shrink-wrap piston boundary  

The boundary style of the face where the piston is applied must be of type s (shrink-wrapped).  

Must specify a region in fix deposit The region keyword must be specified with this fix.  

Must specify a region in fix pour Self-explanatory.  

Must specify at least 2 types in fix atom/swap command Self-explanatory.  

Must use ‘kim_style init’ command before simulation box is defined Self-explanatory.  

Must use ‘kim_style define’ command after simulation box is defined Self-explanatory.  

Must use ‘kim_style init’ command before ‘kim_style define’ Self-explanatory.  

Must use ‘kspace_modify pressure/scalar no’ for rRESPA with kspace_style MSM The kspace scalar pressure option cannot (yet) be used with rRESPA.  

Must use ‘kspace_modify pressure/scalar no’ for tensor components with kspace_style msm Otherwise MSM will compute only a scalar pressure. See the kspace_modify command for details on this setting.  

Must use ‘kspace_modify pressure/scalar no’ to obtain per-atom virial with kspace_style MSM The kspace scalar pressure option cannot be used to obtain per-atom virial.  

Must use ‘kspace_modify pressure/scalar no’ with GPU MSM Pair styles The kspace scalar pressure option is not (yet) compatible with GPU MSM Pair styles.  

Must use ‘kspace_modify pressure/scalar no’ with kspace_style msm/cg The kspace scalar pressure option is not compatible with kspace_style msm/cg.  

# Must use -in switch with multiple partitions  

A multi-partition simulation cannot read the input script from stdin. The -in command-line option must be used to specify a file.  

Must use Kokkos half/thread or full neighbor list with threads or GPUs Using Kokkos half-neighbor lists with threading is not allowed.  

Must use a block or cylinder region with fix pour Self-explanatory.  

Must use a block region with fix pour for 2d simulations Self-explanatory.  

Must use a bond style with TIP4P potential TIP4P potentials assume bond lengths in water are constrained by a fix shake command.  

Must use a molecular atom style with fix poems molecule Self-explanatory.  

Must use a z-axis cylinder region with fix pour Self-explanatory.  

Must use an angle style with TIP4P potential TIP4P potentials assume angles in water are constrained by a fix shake command.  

Must use atom map style array with Kokkos See the atom_modify map command.  

Must use atom style with molecule IDs with fix bond/swap Self-explanatory.  

Must use pair_style comb or comb3 with fix qeq/comb Self-explanatory.  

Must use variable energy with fix addforce Must define an energy variable when applying a dynamic force during minimization.  

Must use variable energy with fix efield You must define an energy when performing a minimization with a variable E-field.  

NEB command before simulation box is defined Self-explanatory.  

NEB requires damped dynamics minimizer Use a different minimization style.  

NEB requires use of fix neb Self-explanatory.  

NL ramp in wall/piston only implemented in zlo for now The ramp keyword can only be used for piston applied to face zlo.  

Need nswaptypes mu values in fix atom/swap command Self-explanatory.  

Needed bonus data not in data file Some atom styles require bonus data. See the read_data page for details.  

Needed molecular topology not in data file The header of the data file indicated bonds, angles, etc would be included, but they are not present.  

Neigh_modify exclude molecule requires atom attribute molecule Self-explanatory.  

Neigh_modify include group $\scriptstyle{\mathrm{:=}}$ atom_modify first group Self-explanatory.  

Neighbor delay must be 0 or multiple of every setting The delay and every parameters set via the neigh_modify command are inconsistent. If the delay setting is non-zero, then it must be a multiple of the every setting.  

Neighbor include group not allowed with ghost neighbors This is a current restriction within LAMMPS.  

Neighbor list overflow, boost neigh_modify one  

There are too many neighbors of a single atom. Use the neigh_modify command to increase the max number of neighbors allowed for one atom. You may also want to boost the page size.  

Neighbor multi not yet enabled for ghost neighbors This is a current restriction within LAMMPS.  

Neighbor multi not yet enabled for granular Self-explanatory.  

Neighbor multi not yet enabled for rRESPA Self-explanatory.  

Neighbor page size must be $>=I0x$ the one atom setting This is required to prevent wasting too much memory.  

New atom IDs exceed maximum allowed $\pmb{I D}$ See the setting for tagint in the src/lmptype.h file.  

New bond exceeded bonds per atom in create_bonds See the read_data command for info on using the “extra/bond/per/atom” keyword to allow for additional bonds to be formed  

New bond exceeded bonds per atom in fix bond/create See the read_data command for info on using the “extra/bond/per/atom” keyword to allow for additional bonds to be formed  

New bond exceeded special list size in fix bond/create See the “read_data extra/special/per/atom” command (or the “create_box extra/special/per/atom” command) for info on how to leave space in the special bonds list to allow for additional bonds to be formed.  

# Newton bond change after simulation box is defined  

The newton command cannot be used to change the newton bond value after a read_data, read_restart, or create_box command.  

Next command must list all universe and uloop variables This is to ensure they stay in sync.  

No Kspace style defined for compute group/group Self-explanatory.  

No OpenMP support compiled in An OpenMP flag is set, but LAMMPS was not built with OpenMP support.  

No angle style is defined for compute angle/local Self-explanatory.  

No angles allowed with this atom style Self-explanatory.  

# No atoms in data file  

The header of the data file indicated that atoms would be included, but they are not present.  

No basis atoms in lattice Basis atoms must be defined for lattice style user.  

No bodies allowed with this atom style Self-explanatory. Check data file.  

No bond style is defined for compute bond/local Self-explanatory.  

No bonds allowed with this atom style Self-explanatory.  

No box information in dump. You have to use ‘box no’ Self-explanatory.  

No count or invalid atom count in molecule file The number of atoms must be specified.  

No dihedral style is defined for compute dihedral/local Self-explanatory.  

No dihedrals allowed with this atom style Self-explanatory.  

No dump custom arguments specified The dump custom command requires that atom quantities be specified to output to dump file.  

No dump local arguments specified Self-explanatory.  

No ellipsoids allowed with this atom style Self-explanatory. Check data file.  

No fix gravity defined for fix pour Gravity is required to use fix pour.  

No improper style is defined for compute improper/local Self-explanatory.  

No impropers allowed with this atom style Self-explanatory.  

No input values for fix ave/spatial Self-explanatory.  

No lines allowed with this atom style Self-explanatory. Check data file.  

No matching element in ADP potential file The ADP potential file does not contain elements that match the requested elements.  

No matching element in EAM potential file The EAM potential file does not contain elements that match the requested elements.  

No molecule topology allowed with atom style template The data file cannot specify the number of bonds, angles, etc, because this info if inferred from the molecule templates.  

No overlap of box and region for create_atoms Self-explanatory.  

No pair coul/streitz for fix qeq/slater These commands must be used together.  

No pair hbond/dreiding coefficients set Self-explanatory.  

No pair style defined for compute group/group Cannot calculate group interactions without a pair style defined.  

No pair style is defined for compute pair/local Self-explanatory.  

No pair style is defined for compute property/local Self-explanatory.  

No rigid bodies defined The fix specification did not end up defining any rigid bodies.  

No triangles allowed with this atom style Self-explanatory. Check data file.  

No values in fix ave/chunk command Self-explanatory.  

No values in fix ave/time command Self-explanatory.  

Non digit character between brackets in variable Self-explanatory.  

Non integer # of swaps in temper command Swap frequency in temper command must evenly divide the total # of timesteps.  

Non-numeric box dimensions - simulation unstable The box size has apparently blown up.  

Non-zero atom IDs with atom_modify $i d=n o$ Self-explanatory.  

Non-zero read_data shift z value for 2d simulation Self-explanatory.  

Nprocs not a multiple of N for -reorder Self-explanatory.  

Number of core atoms $\scriptstyle{\mathrm{:=}}$ number of shell atoms There must be a one-to-one pairing of core and shell atoms.  

Numeric index is out of bounds  

A command with an argument that specifies an integer or range of integers is using a value that is less than 1 or greater than the maximum allowed limit.  

One or more Atom IDs is negative Atom IDs must be positive integers.  

One or more atom IDs is too big The limit on atom IDs is set by the SMALLBIG, BIGBIG, SMALLSMALL setting in your LAMMPS build. See the Build settings page for more info.  

One or more atom IDs is zero Either all atoms IDs must be zero or none of them.  

One or more atoms belong to multiple rigid bodies Two or more rigid bodies defined by the fix rigid command cannot contain the same atom  

One or more rigid bodies are a single particle Self-explanatory.  

# One or zero atoms in rigid body  

Any rigid body defined by the fix rigid command must contain 2 or more atoms.  

Only 2 types allowed when not using semi-grand in fix atom/swap command Self-explanatory.  

Only one cut-off allowed when requesting all long Self-explanatory.  

Only one cutoff allowed when requesting all long Self-explanatory.  

Only zhi currently implemented for fix append/atoms Self-explanatory.  

# Out of range atoms - cannot compute MSM  

One or more atoms are attempting to map their charge to a MSM grid point that is not owned by a processor. This is likely for one of two reasons, both of them bad. First, it may mean that an atom near the boundary of a processor’s subdomain has moved more than 1/2 the neighbor skin distance without neighbor lists being rebuilt and atoms being migrated to new processors. This also means you may be missing pairwise interactions that need to be computed. The solution is to change the re-neighboring criteria via the neigh_modify command. The safest settings are “delay 0 every 1 check yes”. Second, it may mean that an atom has moved far outside a processor’s subdomain or even the entire simulation box. This indicates bad physics, e.g. due to highly overlapping atoms, too large a timestep, etc.  

# Out of range atoms - cannot compute PPPM  

One or more atoms are attempting to map their charge to a PPPM grid point that is not owned by a processor. This is likely for one of two reasons, both of them bad. First, it may mean that an atom near the boundary of a processor’s subdomain has moved more than 1/2 the neighbor skin distance without neighbor lists being rebuilt and atoms being migrated to new processors. This also means you may be missing pairwise interactions that need to be computed. The solution is to change the re-neighboring criteria via the neigh_modify command. The safest settings are “delay 0 every 1 check yes”. Second, it may mean that an atom has moved far outside a processor’s subdomain or even the entire simulation box. This indicates bad physics, e.g. due to highly overlapping atoms, too large a timestep, etc.  

# Out of range atoms - cannot compute PPPMDisp  

One or more atoms are attempting to map their charge to a PPPM grid point that is not owned by a processor. This is likely for one of two reasons, both of them bad. First, it may mean that an atom near the boundary of a processor’s subdomain has moved more than 1/2 the neighbor skin distance without neighbor lists being rebuilt and atoms being migrated to new processors. This also means you may be missing pairwise interactions that need to be computed. The solution is to change the re-neighboring criteria via the neigh_modify command. The safest settings are “delay 0 every 1 check yes”. Second, it may mean that an atom has moved far outside a processor’s subdomain or even the entire simulation box. This indicates bad physics, e.g. due to highly overlapping atoms, too large a timestep, etc.  

# Overflow of allocated fix vector storage  

This should not normally happen if the fix correctly calculated how long the vector will grow to. Contact the developers.  

Overlapping large/large in pair colloid This potential is infinite when there is an overlap.  

Overlapping small/large in pair colloid This potential is infinite when there is an overlap.  

POEMS fix must come before NPT/NPH fix  

NPT/NPH fix must be defined in input script after all poems fixes, else the fix contribution to the pressure virial is incorrect.  

# 11.6. Error messages  

# PPPM can only currently be used with comm_style brick  

This is a current restriction in LAMMPS.  

# PPPM grid is too large  

The global PPPM grid is larger than OFFSET in one or more dimensions. OFFSET is currently set to 4096. You likely need to decrease the requested accuracy.  

PPPM grid stencil extends beyond nearest neighbor processor This is not allowed if the kspace_modify overlap setting is no.  

PPPM order $<$ minimum allowed order  

The default minimum order is 2. This can be reset by the kspace_modify minorder command.  

PPPM order cannot be $<2$ or $>$ than %d This is a limitation of the PPPM implementation in LAMMPS.  

PPPMDisp Coulomb grid is too large The global PPPM grid is larger than OFFSET in one or more dimensions. OFFSET is currently set to 4096. You likely need to decrease the requested accuracy.  

# PPPMDisp Dispersion grid is too large  

The global PPPM grid is larger than OFFSET in one or more dimensions. OFFSET is currently set to 4096. You likely need to decrease the requested accuracy.  

PPPMDisp can only currently be used with comm_style brick This is a current restriction in LAMMPS.  

PPPMDisp coulomb order cannot be greater than %d This is a limitation of the PPPM implementation in LAMMPS.  

PPPMDisp used but no parameters set, for further information please see the pppm/disp documentation An efficient and accurate usage of the pppm/disp requires settings via the kspace_modify command. Please see the pppm/disp documentation for further instructions.  

# PRD command before simulation box is defined  

The prd command cannot be used before a read_data, read_restart, or create_box command.  

PRD nsteps must be multiple of t_event Self-explanatory.  

PRD t_corr must be multiple of t_event Self-explanatory.  

Package command after simulation box is defined The package command cannot be used after a read_data, read_restart, or create_box command.  

Package gpu command without GPU package installed The GPU package must be installed via “make yes-gpu” before LAMMPS is built.  

Package intel command without INTEL package installed The INTEL package must be installed via “make yes-intel” before LAMMPS is built.  

Package kokkos command without KOKKOS package enabled The KOKKOS package must be installed via “make yes-kokkos” before LAMMPS is built, and the “-k on” must be used to enable the package.  

Package omp command without OPENMP package installed  

The OPENMP package must be installed via “make yes-openmp” before LAMMPS is built.  

Pair body requires atom style body Self-explanatory.  

Pair body requires body style nparticle This pair style is specific to the nparticle body style.  

Pair brownian requires atom style sphere Self-explanatory.  

Pair brownian requires extended particles One of the particles has radius 0.0.  

Pair brownian requires monodisperse particles All particles must be the same finite size.  

Pair brownian/poly requires atom style sphere Self-explanatory.  

Pair brownian/poly requires extended particles One of the particles has radius 0.0.  

Pair brownian/poly requires newton pair off Self-explanatory.  

Pair coeff for hybrid has invalid style Style in pair coeff must have been listed in pair_style command.  

Pair coul/wolf requires atom attribute $\pmb q$ The atom style defined does not have this attribute.  

Pair cutoff $<$ Respa interior cutoff One or more pairwise cutoffs are too short to use with the specified rRESPA cutoffs.  

Pair dipole/cut requires atom attributes q, mu, torque The atom style defined does not have these attributes.  

Pair dipole/cut/gpu requires atom attributes q, mu, torque The atom style defined does not have this attribute.  

Pair dipole/long requires atom attributes q, mu, torque The atom style defined does not have these attributes.  

Pair dipole/sf/gpu requires atom attributes q, mu, torque The atom style defined does not one or more of these attributes.  

Pair distance $<$ table inner cutoff Two atoms are closer together than the pairwise table allows.  

Pair distance $>$ table outer cutoff Two atoms are further apart than the pairwise table allows.  

Pair dpd requires ghost atoms store velocity Use the comm_modify vel yes command to enable this.  

Pair gayberne epsilon $^{a,b,c}$ coeffs are not all set Each atom type involved in pair_style gayberne must have these 3 coefficients set at least once.  

Pair gayberne requires atom style ellipsoid Self-explanatory.  

Pair gayberne requires atoms with same type have same shape Self-explanatory.  

Pair gayberne/gpu requires atom style ellipsoid Self-explanatory.  

Pair gayberne/gpu requires atoms with same type have same shape Self-explanatory.  

Pair granular requires atom attributes radius, rmass The atom style defined does not have these attributes.  

Pair granular requires ghost atoms store velocity Use the comm_modify vel yes command to enable this.  

Pair granular with shear history requires newton pair off This is a current restriction of the implementation of pair granular styles with history.  

Pair hybrid single calls do not support per sub-style special bond values Self-explanatory.  

Pair hybrid sub-style does not support single call You are attempting to invoke a single() call on a pair style that does not support it.  

Pair hybrid sub-style is not used No pair_coeff command used a sub-style specified in the pair_style command.  

Pair inner cutof $<$ Respa interior cutoff One or more pairwise cutoffs are too short to use with the specified rRESPA cutoffs.  

Pair inner cutof $>=$ Pair outer cutoff The specified cutoffs for the pair style are inconsistent.  

Pair line/lj requires atom style line Self-explanatory.  

Pair lj/long/dipole/long requires atom attributes mu, torque The atom style defined does not have these attributes.  

Pair lubricate requires atom style sphere Self-explanatory.  

Pair lubricate requires ghost atoms store velocity Use the comm_modify vel yes command to enable this.  

Pair lubricate requires monodisperse particles All particles must be the same finite size.  

Pair lubricate/poly requires atom style sphere Self-explanatory.  

Pair lubricate/poly requires extended particles One of the particles has radius 0.0.  

Pair lubricate/poly requires ghost atoms store velocity Use the comm_modify vel yes command to enable this.  

Pair lubricate/poly requires newton pair of Self-explanatory.  

Pair lubricateU requires atom style sphere Self-explanatory.  

Pair lubricateU requires ghost atoms store velocity Use the comm_modify vel yes command to enable this.  

Pair lubricateU requires monodisperse particles All particles must be the same finite size.  

Pair lubricateU/poly requires ghost atoms store velocity Use the comm_modify vel yes command to enable this.  

Pair lubricateU/poly requires newton pair of Self-explanatory.  

Pair peri lattice is not identical in x, y, and z The lattice defined by the lattice command must be cubic.  

Pair peri requires a lattice be defined Use the lattice command for this purpose.  

Pair peri requires an atom map, see atom_modify Even for atomic systems, an atom map is required to find Peridynamic bonds. Use the atom_modify command to define one.  

Pair resquared epsilon a,b,c coeffs are not all set Self-explanatory.  

Pair resquared epsilon and sigma coeffs are not all set Self-explanatory.  

Pair resquared requires atom style ellipsoid Self-explanatory.  

Pair resquared requires atoms with same type have same shape Self-explanatory.  

Pair resquared/gpu requires atom style ellipsoid Self-explanatory.  

Pair resquared/gpu requires atoms with same type have same shape Self-explanatory.  

Pair style AIREBO requires atom IDs This is a requirement to use the AIREBO potential.  

Pair style AIREBO requires newton pair on See the newton command. This is a restriction to use the AIREBO potential.  

Pair style BOP requires atom IDs This is a requirement to use the BOP potential.  

Pair style BOP requires newton pair on See the newton command. This is a restriction to use the BOP potential.  

Pair style COMB requires atom IDs This is a requirement to use the AIREBO potential.  

Pair style COMB requires atom attribute q Self-explanatory.  

Pair style COMB requires newton pair on See the newton command. This is a restriction to use the COMB potential.  

Pair style COMB3 requires atom IDs This is a requirement to use the COMB3 potential.  

Pair style COMB3 requires atom attribute q Self-explanatory.  

Pair style COMB3 requires newton pair on See the newton command. This is a restriction to use the COMB3 potential.  

Pair style LCBOP requires atom IDs This is a requirement to use the LCBOP potential.  

Pair style LCBOP requires newton pair on See the newton command. This is a restriction to use the Tersoff potential.  

Pair style MEAM requires newton pair on See the newton command. This is a restriction to use the MEAM potential.  

Pair style SNAP requires newton pair on See the newton command. This is a restriction to use the SNAP potential.  

Pair style Stillinger-Weber requires atom IDs This is a requirement to use the SW potential.  

Pair style Stillinger-Weber requires newton pair on See the newton command. This is a restriction to use the SW potential.  

Pair style Tersoff requires atom IDs This is a requirement to use the Tersoff potential.  

Pair style Tersoff requires newton pair on See the newton command. This is a restriction to use the Tersoff potential.  

Pair style Vashishta requires atom IDs This is a requirement to use the Vashishta potential.  

Pair style Vashishta requires newton pair on See the newton command. This is a restriction to use the Vashishta potential.  

Pair style bop requires comm ghost cutoff at least $_{3x}$ larger than $\%{\pmb g}$ Use the communicate ghost command to set this. See the pair bop page for more details.  

Pair style born/coul/long requires atom attribute q An atom style that defines this attribute must be used.  

Pair style born/coul/long/gpu requires atom attribute $\pmb q$ The atom style defined does not have this attribute.  

Pair style born/coul/wolf requires atom attribute $\pmb q$ The atom style defined does not have this attribute.  

Pair style buck/coul/cut requires atom attribute q The atom style defined does not have this attribute.  

Pair style buck/coul/long requires atom attribute q The atom style defined does not have these attributes.  

Pair style buck/coul/long/gpu requires atom attribute $\pmb q$ The atom style defined does not have this attribute.  

Pair style buck/long/coul/long requires atom attribute $\pmb q$ The atom style defined does not have this attribute.  

Pair style coul/cut requires atom attribute $\pmb q$ The atom style defined does not have these attributes.  

Pair style coul/cut/gpu requires atom attribute $\pmb q$ The atom style defined does not have this attribute.  

Pair style coul/debye/gpu requires atom attribute $\pmb q$ The atom style defined does not have this attribute.  

Pair style coul/dsf requires atom attribute q The atom style defined does not have this attribute.  

Pair style coul/dsf/gpu requires atom attribute q The atom style defined does not have this attribute.  

Pair style coul/long/gpu requires atom attribute q The atom style defined does not have these attributes.  

Pair style coul/streitz requires atom attribute q Self-explanatory.  

Pair style does not have extra field requested by compute pair/local The pair style does not support the pN value requested by the compute pair/local command.  

Pair style does not support bond_style quartic The pair style does not have a single() function, so it can not be invoked by bond_style quartic.  

Pair style does not support compute group/group The pair_style does not have a single() function, so it cannot be invoked by the compute group/group command  

Pair style does not support compute pair/local The pair style does not have a single() function, so it can not be invoked by compute pair/local.  

Pair style does not support compute property/local The pair style does not have a single() function, so it can not be invoked by fix bond/swap.  

Pair style does not support fix bond/swap The pair style does not have a single() function, so it can not be invoked by fix bond/swap.  

Pair style does not support pair_write The pair style does not have a single() function, so it can not be invoked by pair write.  

Pair style does not support rRESPA inner/middle/outer You are attempting to use rRESPA options with a pair style that does not support them.  

Pair style granular with history requires atoms have IDs Atoms in the simulation do not have IDs, so history effects cannot be tracked by the granular pair potential.  

Pair style hbond/dreiding requires an atom map, see atom_modify Self-explanatory.  

Pair style hbond/dreiding requires atom IDs Self-explanatory.  

Pair style hbond/dreiding requires molecular system Self-explanatory.  

Pair style hbond/dreiding requires newton pair on See the newton command for details.  

Pair style hybrid cannot have hybrid as an argument Self-explanatory.  

Pair style hybrid cannot have none as an argument Self-explanatory.  

Pair style is incompatible with KSpace style If a pair style with a long-range Coulombic component is selected, then a kspace style must also be used.  

Pair style is incompatible with TIP4P KSpace style The pair style does not have the requires TIP4P settings.  

Pair style lj/charmm/coul/charmm requires atom attribute q The atom style defined does not have these attributes.  

Pair style lj/charmm/coul/long requires atom attribute q The atom style defined does not have these attributes.  

Pair style lj/charmm/coul/long/gpu requires atom attribute q The atom style defined does not have this attribute.  

Pair style lj/class2/coul/cut requires atom attribute q The atom style defined does not have this attribute.  

Pair style lj/class2/coul/long requires atom attribute q The atom style defined does not have this attribute.  

Pair style lj/class2/coul/long/gpu requires atom attribute q The atom style defined does not have this attribute.  

Pair style lj/cut/coul/cut requires atom attribute q The atom style defined does not have this attribute.  

Pair style lj/cut/coul/cut/gpu requires atom attribute $\pmb q$ The atom style defined does not have this attribute.  

Pair style lj/cut/coul/debye/gpu requires atom attribute $\pmb q$ The atom style defined does not have this attribute.  

Pair style lj/cut/coul/dsf requires atom attribute q The atom style defined does not have these attributes.  

Pair style lj/cut/coul/dsf/gpu requires atom attribute q The atom style defined does not have this attribute.  

Pair style lj/cut/coul/long requires atom attribute q The atom style defined does not have this attribute.  

Pair style lj/cut/coul/long/gpu requires atom attribute q The atom style defined does not have this attribute.  

Pair style lj/cut/tip4p/cut requires atom IDs This is a requirement to use this potential.  

Pair style lj/cut/tip4p/cut requires atom attribute q The atom style defined does not have this attribute.  

Pair style lj/cut/tip4p/cut requires newton pair on See the newton command. This is a restriction to use this potential.  

Pair style lj/cut/tip4p/long requires atom IDs There are no atom IDs defined in the system and the TIP4P potential requires them to find O,H atoms with a water molecule.  

Pair style lj/cut/tip4p/long requires atom attribute q The atom style defined does not have these attributes.  

Pair style lj/cut/tip4p/long requires newton pair on This is because the computation of constraint forces within a water molecule adds forces to atoms owned by other processors.  

Pair style lj/gromacs/coul/gromacs requires atom attribute q An atom_style with this attribute is needed.  

Pair style lj/long/dipole/long does not currently support respa This feature is not yet supported.  

# Pair style lj/long/tip4p/long requires atom IDs  

There are no atom IDs defined in the system and the TIP4P potential requires them to find O,H atoms with a water molecule.  

Pair style lj/long/tip4p/long requires atom attribute q The atom style defined does not have these attributes.  

This is because the computation of constraint forces within a water molecule adds forces to atoms owned by other processors.  

Pair style lj/spica/coul/long/gpu requires atom attribute q The atom style defined does not have this attribute.  

Pair style nb3b/harmonic requires atom IDs This is a requirement to use this potential.  

Pair style nb3b/harmonic requires newton pair on See the newton command. This is a restriction to use this potential.  

Pair style nm/cut/coul/cut requires atom attribute q The atom style defined does not have this attribute.  

Pair style nm/cut/coul/long requires atom attribute q The atom style defined does not have this attribute.  

Pair style peri requires atom style peri Self-explanatory.  

Pair style polymorphic requires atom IDs This is a requirement to use the polymorphic potential.  

Pair style polymorphic requires newton pair on See the newton command. This is a restriction to use the polymorphic potential.  

Pair style reax requires atom IDs This is a requirement to use the ReaxFF potential.  

Pair style reax requires atom attribute q The atom style defined does not have this attribute.  

Pair style reax requires newton pair on This is a requirement to use the ReaxFF potential.  

Pair style requires a KSpace style No kspace style is defined.  

Pair style requires use of kspace_style ewald/disp Self-explanatory.  

Pair style sw/gpu requires atom IDs This is a requirement to use this potential.  

Pair style sw/gpu requires newton pair off See the newton command. This is a restriction to use this potential.  

Pair style vashishta/gpu requires atom IDs This is a requirement to use this potential.  

Pair style vashishta/gpu requires newton pair of See the newton command. This is a restriction to use this potential.  

Pair style tersoff/gpu requires atom IDs his is a requirement to use the tersoff/gpu potential  

# 11.6. Error messages  

Pair style tersoff/gpu requires newton pair off  

See the newton command. This is a restriction to use this pair style.  

Pair style tip4p/cut requires atom IDs This is a requirement to use this potential.  

Pair style tip4p/cut requires atom attribute q The atom style defined does not have this attribute.  

Pair style tip4p/cut requires newton pair on See the newton command. This is a restriction to use this potential.  

Pair style tip4p/long requires atom IDs There are no atom IDs defined in the system and the TIP4P potential requires them to find O,H atoms with a water molecule.  

Pair style tip4p/long requires atom attribute q The atom style defined does not have these attributes.  

Pair style tip4p/long requires newton pair on  

This is because the computation of constraint forces within a water molecule adds forces to atoms owned by other processors.  

Pair table cutoffs must all be equal to use with KSpace  

When using pair style table with a long-range KSpace solver, the cutoffs for all atom type pairs must all be the same, since the long-range solver starts at that cutoff.  

Pair table parameters did not set N List of pair table parameters must include N setting.  

Pair tersoff/zbl requires metal or real units This is a current restriction of this pair potential.  

Pair tersoff/zbl/kk requires metal or real units This is a current restriction of this pair potential.  

Pair tri/lj requires atom style tri Self-explanatory.  

Pair yukawa/colloid requires atom style sphere Self-explanatory.  

Pair yukawa/colloid requires atoms with same type have same radius Self-explanatory.  

Pair yukawa/colloid/gpu requires atom style sphere Self-explanatory.  

PairKIM only works with 3D problems This is a current limitation.  

Pair_coeff command before pair_style is defined Self-explanatory.  

Pair_coeff command before simulation box is defined The pair_coeff command cannot be used before a read_data, read_restart, or create_box command.  

Pair_modify command before pair_style is defined Self-explanatory.  

Pair_modify special setting for pair hybrid incompatible with global special_bonds setting Cannot override a setting of 0.0 or 1.0 or change a setting between 0.0 and 1.0.  

Pair_write command before pair_style is defined Self-explanatory.  

Particle on or inside fix wall surface Particles must be “exterior” to the wall in order for energy/force to be calculated.  

article outside surface of region used in fix wall/region  

Particles must be inside the region for energy/force to be calculated. A particle outside the region generates an error.  

Per-atom compute in equal-style variable formula Equal-style variables cannot use per-atom quantities.  

You are using a thermo keyword that requires potentials to have tallied energy, but they did not on this timestep.   
See the variable page for ideas on how to make this work.  

Per-atom fix in equal-style variable formula Equal-style variables cannot use per-atom quantities  

Per-atom virial was not tallied on needed timestep You are using a thermo keyword that requires potentials to have tallied the virial, but they did not on this timestep. See the variable page for ideas on how to make this work.  

Per-processor system is too big The number of owned atoms plus ghost atoms on a single processor must fit in 32-bit integer.  

Potential energy ID for fix neb does not exist Self-explanatory.  

Potential energy ID for fix nvt/nph/npt does not exist A compute for potential energy must be defined.  

Potential file has duplicate entry The potential file has more than one entry for the same element.  

Potential file is missing an entry The potential file does not have a needed entry.  

Power by 0 in variable formula Self-explanatory.  

Pressure ID for fix box/relax does not exist The compute ID needed to compute pressure for the fix does not exist.  

Pressure ID for fix modify does not exist Self-explanatory.  

Pressure ID for fix npt/nph does not exist Self-explanatory.  

Pressure ID for fix press/berendsen does not exist The compute ID needed to compute pressure for the fix does not exist.  

Pressure ID for fix rigid npt/nph does not exist Self-explanatory.  

Pressure ID for thermo does not exist The compute ID needed to compute pressure for thermodynamics does not exist.  

Pressure control can not be used with fix nvt Self-explanatory.  

Pressure control can not be used with fix nvt/asphere Self-explanatory.  

Pressure control can not be used with fix nvt/body Self-explanatory.  

Pressure control can not be used with fix nvt/sllod Self-explanatory.  

Pressure control can not be used with fix nvt/sphere Self-explanatory.  

Pressure control must be used with fix nph Self-explanatory.  

Pressure control must be used with fix nph/asphere Self-explanatory.  

Pressure control must be used with fix nph/body Self-explanatory.  

Pressure control must be used with fix nph/small Self-explanatory.  

Pressure control must be used with fix nph/sphere Self-explanatory.  

Pressure control must be used with fix nphug A pressure control keyword (iso, aniso, tri, x, y, or z) must be provided.  

Pressure control must be used with fix npt Self-explanatory.  

Pressure control must be used with fix npt/asphere Self-explanatory.  

Pressure control must be used with fix npt/body Self-explanatory.  

Pressure control must be used with fix npt/sphere Self-explanatory.  

Processor count in z must be 1 for 2d simulation Self-explanatory.  

rocessor partitions do not match number of allocated processors  

The total number of processors in all partitions must match the number of processors LAMMPS is running on.  

The processors command cannot be used after a read_data, read_restart, or create_box command.  

Processors custom grid file is inconsistent The vales in the custom file are not consistent with the number of processors you are running on or the $\mathrm{Px},\mathrm{Py},\mathrm{Pz}$ settings of the processors command. Or there was not a setting for every processor.  

Processors grid numa and map style are incompatible Using numa for gstyle in the processors command requires using cart for the map option.  

Processors part option and grid style are incompatible Cannot use gstyle numa or custom with the part option.  

Processors twogrid requires proc count be a multiple of core count Self-explanatory.  

Pstart and Pstop must have the same value Self-explanatory.  

# Python function evaluation failed  

The Python function did not run successfully and/or did not return a value (if it is supposed to return a value).   
This is probably due to some error condition in the function.  

Python function is not callable The provided Python code was run successfully, but it not define a callable function with the required name.  

Python invoke of undefined function Cannot invoke a function that has not been previously defined.  

Python variable does not match Python function This matching is defined by the python-style variable and the python command.  

ython variable has no function No python command was used to define the function associated with the python-style variable.  

QEQ with ‘newton pair off’ not supported See the newton command. This is a restriction to use the QEQ fixes.  

$R\pmb{0}<\pmb{\theta}$ for fix spring command Equilibrium spring length is invalid.  

RATTLE coordinate constraints are not satisfied up to desired tolerance Self-explanatory.  

# RATTLE determinant $\mathbf{\partial}:=0.0$  

The determinant of the matrix being solved for a single cluster specified by the fix rattle command is numerically invalid.  

# RATTLE failed  

Certain constraints were not satisfied.  

RATTLE velocity constraints are not satisfied up to desired tolerance Self-explanatory.  

Read data add offset is too big It cannot be larger than the size of atom IDs, e.g. the maximum 32-bit integer.  

Read dump of atom property that is not allocated Self-explanatory.  

Read rerun dump file timestep $>$ specified stop Self-explanatory.  

Read restart MPI-IO input not allowed with $\%$ in filename This is because a $\%$ signifies one file per processor and MPI-IO creates one large file for all processors.  

Read_data shrink wrap did not assign all atoms correctly  

This is typically because the box-size specified in the data file is large compared to the actual extent of atoms in a shrink-wrapped dimension. When LAMMPS shrink-wraps the box atoms will be lost if the processor they are re-assigned to is too far away. Choose a box size closer to the actual extent of the atoms.  

# Read_dump command before simulation box is defined  

The read_dump command cannot be used before a read_data, read_restart, or create_box command.  

Read_dump field not found in dump file Self-explanatory.  

# Read_dump triclinic status does not match simulation  

Both the dump snapshot and the current LAMMPS simulation must be using either an orthogonal or triclinic box.  

Read_dump xyz fields do not have consistent scaling/wrapping Self-explanatory.  

Reax_defs.h setting for NATDEF is too small Edit the setting in the ReaxFF library and re-compile the library and re-build LAMMPS.  

Reax_defs.h setting for NNEIGHMAXDEF is too small Edit the setting in the ReaxFF library and re-compile the library and re-build LAMMPS.   
Receiving partition in processors part command is already a receiver Cannot specify a partition to be a recei   
Region ID for compute chunk/atom does not exist Self-explanatory.   
Region ID for compute reduce/region does not exist Self-explanatory.   
Region ID for compute temp/region does not exist Self-explanatory.   
Region ID for dump custom does not exist Self-explanatory.   
Region ID for fix addforce does not exist Self-explanatory.   
Region ID for fix atom/swap does not exist Self-explanatory.   
Region ID for fix ave/spatial does not exist Self-explanatory.   
Region ID for fix aveforce does not exist Self-explanatory.   
Region ID for fix deposit does not exist Self-explanatory.   
Region ID for fix efield does not exist Self-explanatory.   
Region ID for fix evaporate does not exist Self-explanatory.   
Region ID for fix gcmc does not exist Self-explanatory.   
Region ID for fix heat does not exist Self-explanatory.   
Region ID for fix setforce does not exist Self-explanatory.   
Region ID for fix wall/region does not exist Self-explanatory.   
Region ID for group dynamic does not exist Self-explanatory.  

Region ID in variable formula does not exist Self-explanatory.  

Region cannot have 0 length rotation vector Self-explanatory.  

Region for fix oneway does not exist Self-explanatory.  

Region intersect region ID does not exist Self-explanatory.  

Region union or intersect cannot be dynamic The sub-regions can be dynamic, but not the combined region.  

Region union region ID does not exist One or more of the region IDs specified by the region union command does not exist.  

Replacing a fix, but new style $\mathrel{\mathop:}=$ old style  

A fix ID can be used a second time, but only if the style matches the previous fix. In this case it is assumed you want to reset a fix’s parameters. This error may mean you are mistakenly re-using a fix ID when you do not intend to.  

# Replicate command before simulation box is defined  

The replicate command cannot be used before a read_data, read_restart, or create_box command.  

Replicate did not assign all atoms correctly  

Atoms replicated by the replicate command were not assigned correctly to processors. This is likely due to some atom coordinates being outside a non-periodic simulation box.  

Replicated system atom IDs are too big See the setting for tagint in the src/lmptype.h file.  

Replicated system is too big See the setting for bigint in the src/lmptype.h file.  

Required border comm not yet implemented with Kokkos There are various limitations in the communication options supported by Kokkos.  

Rerun command before simulation box is defined The rerun command cannot be used before a read_data, read_restart, or create_box command.  

Rerun dump file does not contain requested snapshot Self-explanatory.  

Resetting timestep size is not allowed with fix move This is because fix move is moving atoms based on elapsed time.  

Respa inner cutoffs are invalid The first cutoff must be $<=$ the second cutoff.  

Respa levels must be $>=I$ Self-explanatory.  

Respa middle cutoffs are invalid The first cutoff must be $<=$ the second cutoff.  

Restart file MPI-IO output not allowed with $\%$ in filename This is because a $\%$ signifies one file per processor and MPI-IO creates one large file for all processors.  

# Restart file byte ordering is not recognized  

The file does not appear to be a LAMMPS restart file since it does not contain a recognized byte-ordering flag at the beginning.  

# Restart file byte ordering is swapped  

The file was written on a machine with different byte-ordering than the machine you are reading it on. Convert it to a text data file instead, on the machine you wrote it on.  

# Restart file incompatible with current version  

This is probably because you are trying to read a file created with a version of LAMMPS that is too old compared to the current version. Use your older version of LAMMPS and convert the restart file to a data file.  

# Restart file is a MPI-IO file  

The file is inconsistent with the filename you specified for it.  

Restart file is a multi-proc file The file is inconsistent with the filename you specified for it  

Restart file is not a MPI-IO file The file is inconsistent with the filename you specified for it.  

Restart file is not a multi-proc file The file is inconsistent with the filename you specified for it.  

Restart variable returned a bad timestep The variable must return a timestep greater than the current timestep.  

Restrain atoms %d %d %d %d missing on proc %d at step %ld The 4 atoms in a restrain dihedral specified by the fix restrain command are not all accessible to a processor. This probably means an atom has moved too far.  

Restrain atoms $70d\%d\%d$ missing on proc %d at step %ld  

The three atoms in a restrain angle specified by the fix restrain command are not all accessible to a processor.   
This probably means an atom has moved too far.  

# Restrain atoms %d %d missing on proc %d at step %ld  

The two atoms in a restrain bond specified by the fix restrain command are not all accessible to a processor. This probably means an atom has moved too far.  

# Reuse of compute ID  

A compute ID cannot be used twice.  

# Reuse of dump ID  

A dump ID cannot be used twice.  

Reuse of molecule template ID The template IDs must be unique.  

# Reuse of region ID  

A region ID cannot be used twice.  

# Rigid body atoms %d %d missing on proc %d at step %ld  

This means that an atom cannot find the atom that owns the rigid body it is part of, or vice versa. The solution is to use the communicate cutoff command to ensure ghost atoms are acquired from far enough away to encompass the max distance printed when the fix rigid/small command was invoked.  

# Rigid body has degenerate moment of inertia  

Fix poems will only work with bodies (collections of atoms) that have non-zero principal moments of inertia.   
This means they must be 3 or more non-collinear atoms, even with joint atoms removed.  

# Rigid fix must come before NPT/NPH fix  

NPT/NPH fix must be defined in input script after all rigid fixes, else the rigid fix contribution to the pressure virial is incorrect.  

Rmask function in equal-style variable formula Rmask is per-atom operation.  

# Run command before simulation box is defined  

The run command cannot be used before a read_data, read_restart, or create_box command.  

Run command start value is after start of run Self-explanatory.  

Run command stop value is before end of run Self-explanatory.  

Run_style command before simulation box is defined The run_style command cannot be used before a read_data, read_restart, or create_box command.  

SRD bin size for fix srd differs from user request Fix SRD had to adjust the bin size to fit the simulation box. See the cubic keyword if you want this message to be an error vs warning.  

# SRD bins for fix srd are not cubic enough  

The bin shape is not within tolerance of cubic. See the cubic keyword if you want this message to be an error vs warning.  

SRD particle %d started inside big particle %d on step %ld bounce %d See the inside keyword if you want this message to be an error vs warning.  

SRD particle %d started inside wall %d on step %ld bounce %d See the inside keyword if you want this message to be an error vs warning.  

Same dimension twice in fix ave/spatial Self-explanatory.  

Sending partition in processors part command is already a sender Cannot specify a partition to be a sender twice.  

Set command before simulation box is defined The set command cannot be used before a read_data, read_restart, or create_box command.  

Set command floating point vector does not exist Self-explanatory.  

Set command integer vector does not exist Self-explanatory.  

Set command with no atoms existing No atoms are yet defined so the set command cannot be used.  

Set region ID does not exist Region ID specified in set command does not exist.  

Shake angles have different bond types  

All 3-atom angle-constrained SHAKE clusters specified by the fix shake command that are the same angle type, must also have the same bond types for the two bonds in the angle.  

# Shake atoms %d %d %d %d missing on proc %d at step %ld  

The 4 atoms in a single shake cluster specified by the fix shake command are not all accessible to a processor.   
This probably means an atom has moved too far.  

# Shake atoms %d %d %d missing on proc %d at step %ld  

The three atoms in a single shake cluster specified by the fix shake command are not all accessible to a processor.   
This probably means an atom has moved too far.  

# Shake atoms %d %d missing on proc %d at step %ld  

The two atoms in a single shake cluster specified by the fix shake command are not all accessible to a processor.   
This probably means an atom has moved too far.  

# Shake cluster of more than 4 atoms  

A single cluster specified by the fix shake command can have no more than 4 atoms.  

# Shake clusters are connected  

A single cluster specified by the fix shake command must have a single central atom with up to 3 other atoms bonded to it.  

# Shake determinant $\mathbf{\mu}=\mathbf{\mathbf{\nabla}}\pmb{\theta.0}$  

The determinant of the matrix being solved for a single cluster specified by the fix shake command is numerically invalid.  

# Shake fix must come before NPT/NPH fix  

NPT fix must be defined in input script after SHAKE fix, else the SHAKE fix contribution to the pressure virial is incorrect.  

# Shear history overflow, boost neigh_modify one  

There are too many neighbors of a single atom. Use the neigh_modify command to increase the max number of neighbors allowed for one atom. You may also want to boost the page size.  

# Small to big integers are not sized correctly  

This error occurs when the sizes of smallint, imageint, tagint, bigint, as defined in src/lmptype.h are not what is expected. Contact the developers if this occurs.  

Smallint setting in lmptype.h is invalid It has to be the size of an integer.  

Smallint setting in lmptype.h is not compatible  

Smallint stored in restart file is not consistent with LAMMPS version you are running.  

Special list size exceeded in fix bond/create  

See the “read_data extra/special/per/atom” command (or the “create_box extra/special/per/atom” command) for info on how to leave space in the special bonds list to allow for additional bonds to be formed.  

# Species XXX is not supported by this KIM Simulator Model  

The kim_style define command was referencing a species that is not present in the requested KIM Simulator Model.  

# Specified processors $\scriptstyle{\mathrm{:=}}$ physical processors  

The 3d grid of processors defined by the processors command does not match the number of processors LAMMPS is being run on.  

Specified target stress must be uniaxial or hydrostatic Self-explanatory.  

Sqrt of negative value in variable formula Self-explanatory.  

Subsequent read data induced too many angles per atom See the extra/angle/per/atom keyword for the create_box or the read_data command to set this limit larger  

Subsequent read data induced too many bonds per atom See the extra/bond/per/atom keyword for the create_box or the read_data command to set this limit larger  

Subsequent read data induced too many dihedrals per atom See the extra/dihedral/per/atom keyword for the create_box or the read_data command to set this limit larger  

Subsequent read data induced too many impropers per atom See the extra/improper/per/atom keyword for the create_box or the read_data command to set this limit larger  

# Substitution for illegal variable  

Input script line contained a variable that could not be substituted for.  

# Support for writing images in JPEG format not included  

LAMMPS was not built with the -DLAMMPS_JPEG switch in the Makefile.  

Support for writing images in PNG format not included LAMMPS was not built with the -DLAMMPS_PNG switch in the Makefile.  

Support for writing movies not included LAMMPS was not built with the -DLAMMPS_FFMPEG switch in the Makefile  

System in data file is too big See the setting for bigint in the src/lmptype.h file.  

System is not charge neutral, net charge $=\%g$ The total charge on all atoms on the system is not 0.0. For some KSpace solvers this is an error.  

TAD nsteps must be multiple of t_event Self-explanatory.  

TIP4P hydrogen has incorrect atom type The TIP4P pairwise computation found an $\mathrm{H}$ atom whose type does not agree with the specified H type.  

TIP4P hydrogen is missing The TIP4P pairwise computation failed to find the correct H atom within a water molecule.  

TMD target file did not list all group atoms The target file for the fix tmd command did not list all atoms in the fix group.  

Tad command before simulation box is defined Self-explanatory.  

Tagint setting in lmptype.h is invalid Tagint must be as large or larger than smallint.  

Tagint setting in lmptype.h is not compatible Format of tagint stored in restart file is not consistent with LAMMPS version you are running. See the settings in src/lmptype.h  

Target pressure for fix rigid/nph cannot $b e<0.0$ Self-explanatory.  

Target pressure for fix rigid/npt/small cannot be $<\pmb{\theta.0}$ Self-explanatory.  

Target temperature for fix nvt/npt/nph cannot be 0.0 Self-explanatory.  

Target temperature for fix rigid/npt cannot be 0.0 Self-explanatory.  

Target temperature for fix rigid/npt/small cannot be 0.0 Self-explanatory.  

Target temperature for fix rigid/nvt cannot be 0.0 Self-explanatory.  

Target temperature for fix rigid/nvt/small cannot be 0.0 Self-explanatory.  

Temper command before simulation box is defined The temper command cannot be used before a read_data, read_restart, or create_box command.  

Temperature ID for fix bond/swap does not exist Self-explanatory.  

Temperature ID for fix box/relax does not exist Self-explanatory.  

Temperature ID for fix nvt/npt does not exist Self-explanatory.  

Temperature ID for fix press/berendsen does not exist Self-explanatory.  

Temperature ID for fix rigid nvt/npt/nph does not exist Self-explanatory.  

Temperature ID for fix temp/berendsen does not exist Self-explanatory.  

Temperature ID for fix temp/csld does not exist Self-explanatory.  

Temperature ID for fix temp/csvr does not exist Self-explanatory.  

Temperature ID for fix temp/rescale does not exist Self-explanatory.  

Temperature compute degrees of freedom $<\pmb{\theta}$ This should not happen if you are calculating the temperature on a valid set of atoms.  

Temperature control can not be used with fix nph Self-explanatory.  

Temperature control can not be used with fix nph/asphere Self-explanatory.  

Temperature control can not be used with fix nph/body Self-explanatory.  

Temperature control can not be used with fix nph/sphere Self-explanatory.  

Temperature control must be used with fix nphug The temp keyword must be provided.  

Temperature control must be used with fix npt Self-explanatory.  

Temperature control must be used with fix npt/asphere Self-explanatory.  

Temperature control must be used with fix npt/body Self-explanatory.  

Temperature control must be used with fix npt/sphere Self-explanatory.  

Temperature control must be used with fix nvt Self-explanatory.  

Temperature control must be used with fix nvt/asphere Self-explanatory.  

Temperature control must be used with fix nvt/body Self-explanatory.  

Temperature control must be used with fix nvt/sllod Self-explanatory.  

Temperature control must be used with fix nvt/sphere Self-explanatory.  

Temperature control must not be used with fix nph/small Self-explanatory.  

Temperature for fix nvt/sllod does not have a bias The specified compute must compute temperature with a bias.  

Tempering could not find thermo_pe compute This compute is created by the thermo command. It must have been explicitly deleted by a uncompute command.  

Tempering fix ID is not defined The fix ID specified by the temper command does not exist.  

Tempering temperature fix is not valid The fix specified by the temper command is not one that controls temperature (nvt or langevin)  

Test_descriptor_string already allocated This is an internal error. Contact the developers.  

The package gpu command is required for gpu styles Self-explanatory.  

Thermo and fix not computed at compatible times Fixes generate values on specific timesteps. The thermo output does not match these timesteps.  

Thermo compute array is accessed out-of-range Self-explanatory.  

Thermo compute does not compute array Self-explanatory.  

Thermo compute does not compute scala Self-explanatory.  

Thermo compute does not compute vector Self-explanatory.  

Thermo compute vector is accessed out-of-range Self-explanatory.  

Thermo custom variable cannot be indexed Self-explanatory.  

Thermo custom variable is not equal-style variable Only equal-style variables can be output with thermodynamics, not atom-style variables.  

Thermo every variable returned a bad timestep The variable must return a timestep greater than the current timestep.  

Thermo fix array is accessed out-of-range Self-explanatory.  

Thermo fix does not compute array Self-explanatory.  

Thermo fix does not compute scalar Self-explanatory.  

Thermo fix does not compute vector Self-explanatory.  

Thermo fix vector is accessed out-of-range Self-explanatory.  

# ermo keyword in variable requires thermo to use/init pe  

You are using a thermo keyword in a variable that requires potential energy to be calculated, but your thermo output does not use it. Add it to your thermo output.  

# Thermo keyword in variable requires thermo to use/init press  

You are using a thermo keyword in a variable that requires pressure to be calculated, but your thermo output does not use it. Add it to your thermo output.  

Thermo keyword in variable requires thermo to use/init temp  

You are using a thermo keyword in a variable that requires temperature to be calculated, but your thermo output does not use it. Add it to your thermo output.  

Thermo style does not use press Cannot use thermo_modify to set this parameter since the thermo_style is not computing this quantity.  

Thermo style does not use temp Cannot use thermo_modify to set this parameter since the thermo_style is not computing this quantity.  

Thermo_modify every variable returned a bad timestep The returned timestep is less than or equal to the current timestep.  

Thermo_modify int format does not contain d character Self-explanatory.  

Thermo_modify pressure ID does not compute pressure The specified compute ID does not compute pressure.  

Thermo_modify temperature ID does not compute temperature The specified compute ID does not compute temperature.  

Thermo_style command before simulation box is defined The thermo_style command cannot be used before a read_data, read_restart, or create_box command.  

This variable thermo keyword cannot be used between runs Keywords that refer to time (such as cpu, elapsed) do not make sense in between runs.  

Threshold for an atom property that is not allocated A dump threshold has been requested on a quantity that is not defined by the atom style used in this simulation.  

Timestep must be $>=\pmb{\theta}$ Specified timestep is invalid.  

Too big a problem to use velocity create loop all The system size must fit in a 32-bit integer to use this option.  

Too big a timestep for dump dcd The timestep must fit in a 32-bit integer to use this dump style.  

Too big a timestep for dump xtc The timestep must fit in a 32-bit integer to use this dump style.  

Too few bits for lookup table Table size specified via pair_modify command does not work with your machine’s floating point representation.  

Too few lines in %s section of data file Self-explanatory.  

Too few values in body lines in data file Self-explanatory.  

Too few values in body section of molecule file Self-explanatory.  

Too many -pk arguments in command-line The string formed by concatenating the arguments is too long. Use a package command in the input script instead.  

Too many MSM grid levels The max number of MSM grid levels is hardwired to 10.  

Too many args in variable function More args are used than any variable function allows.  

Too many atom pairs for pair bop The number of atomic pairs exceeds the expected number. Check your atomic structure to ensure that it is realistic.  

Too many atom sorting bins This is likely due to an immense simulation box that has blown up to a large size.  

Too many atom triplets for pair bop  

The number of three atom groups for angle determinations exceeds the expected number. Check your atomic structure to ensure that it is realistic.  

Too many atoms for dump dcd The system size must fit in a 32-bit integer to use this dump style.  

Too many atoms for dump xtc The system size must fit in a 32-bit integer to use this dump style.  

Too many elements extracted from MEAM library. Increase ‘maxelt’ in meam.h and recompile.  

Too many exponent bits for lookup table Table size specified via pair_modify command does not work with your machine’s floating point representation.  

Too many groups The maximum number of atom groups (including the “all” group) is given by MAX_GROUP in group.cpp and is 32.  

# Too many iterations  

You must use a number of iterations that fit in a 32-bit integer for minimization.  

Too many lines in one body in data file - boost MAXBODY  

MAXBODY is a setting at the top of the src/read_data.cpp file. Set it larger and re-compile the code.  

Too many local+ghost atoms for neighbor list  

The number of nlocal $^+$ nghost atoms on a processor is limited by the size of a 32-bit integer with 2 bits removed for masking 1-2, 1-3, 1-4 neighbors.  

Too many mantissa bits for lookup table Table size specified via pair_modify command does not work with your machine’s floating point representation.  

Too many masses for fix shake The fix shake command cannot list more masses than there are atom types.  

Too many molecules for fix poems The limit is $2^{\wedge}31={\sim}2$ billion molecules.  

Too many molecules for fix rigid The limit is $2^{\wedge}31={\sim}2$ billion molecules.  

# Too many neighbor bins  

This is likely due to an immense simulation box that has blown up to a large size.  

Too many timesteps The cumulative timesteps must fit in a 64-bit integer.  

Too many timesteps for NEB You must use a number of timesteps that fit in a 32-bit integer for NEB.  

Too many total atoms See the setting for bigint in the src/lmptype.h file.  

Too many total bits for bitmapped lookup table Table size specified via pair_modify command is too large. Note that a value of N generates a $2\mathsf{N N}$ size table.  

Too many values in body lines in data file Self-explanatory.  

Too many values in body section of molecule file Self-explanatory.  

Too much buffered per-proc info for dump The size of the buffered string must fit in a 32-bit integer for a dump.  

o much per-proc info for dump Number of local atoms times number of columns must fit in a 32-bit integer for dump.  

Topology type exceeds system topology type The number of bond, angle, etc types exceeds the system setting. See the create_box or read_data command for how to specify these values.  

Tree structure in joint connections Fix poems cannot (yet) work with coupled bodies whose joints connect the bodies in a tree structure.  

Tried to convert a double to int, but input_double $>$ INT_MAX Self-explanatory.  

Trying to build an occasional neighbor list before initialization completed This is not allowed. Source code caller needs to be modified.  

Two fix ave commands using same compute chunk/atom command in incompatible ways They are both attempting to “lock” the chunk/atom command so that the chunk assignments persist for some number of timesteps, but are doing it in different ways.  

Two groups cannot be the same in fix spring couple Self-explanatory.  

The %s type label %s is already in use for type %s For a given type-kind (atom types, bond types, etc.), a given type label can be assigned to only one numeric type  

Type label string %s for %s type %s is invalid See the labelmap command documentation for valid type labels.  

Unable to initialize accelerator for use There was a problem initializing an accelerator for the gpu package  

Unbalanced quotes in input line No matching end double quote was found following a leading double quote.  

Unexpected end of -reorder file Self-explanatory.  

Unexpected empty line in Angle Coeffs section Read a blank line where there should be coefficient data  

Unexpected empty line in Bond Coeffs section Read a blank line where there should be coefficient data.  

Unexpected empty line in Dihedral Coeffs section Read a blank line where there should be coefficient data.  

Unexpected empty line in Improper Coeffs section Read a blank line where there should be coefficient data.  

Unexpected empty line in Pair Coeffs section Read a blank line where there should be coefficient data.  

Unexpected end of custom file Self-explanatory.  

Unexpected end of data file LAMMPS hit the end of the data file while attempting to read a section. Something is wrong with the format of the data file.  

Unexpected end of dump file A read operation from the file failed.  

Unexpected end of fix rigid file A read operation from the file failed.  

Unexpected end of fix rigid/small file A read operation from the file failed.  

Unexpected end of molecule file Self-explanatory.  

Unexpected end of neb file A read operation from the file failed.  

Units command after simulation box is defined The units command cannot be used after a read_data, read_restart, or create_box command.  

Universe/uloop variable count < # of partitions  

A universe or uloop style variable must specify a number of values $>=$ to the number of processor partitions.  

Unrecognized angle style The choice of angle style is unknown.  

Unrecognized atom style The choice of atom style is unknown.  

Unrecognized body style The choice of body style is unknown.  

Unrecognized bond style The choice of bond style is unknown.  

Unknown category for info is_active() Self-explanatory.  

Unknown category for info is_available() Self-explanatory.  

Unknown category for info is_defined() Self-explanatory.  

Unrecognized command: %s The command is not known to LAMMPS. Check the input script.  

Unrecognized compute style The choice of compute style is unknown.  

Unrecognized dihedral style The choice of dihedral style is unknown.  

Unrecognized dump reader style The choice of dump reader style via the format keyword is unknown.  

Unrecognized dump style The choice of dump style is unknown.  

Unknown error in GPU library Self-explanatory.  

Unrecognized fix style The choice of fix style is unknown.  

Unknown identifier in data file: %s A section of the data file cannot be read by LAMMPS.  

Unrecognized improper style The choice of improper style is unknown.  

Unknown keyword in thermo_style custom command One or more specified keywords are not recognized.  

Unrecognized kspace style The choice of kspace style is unknown.  

Unknown name for info newton category Self-explanatory.  

Unknown name for info package category Self-explanatory.  

Unknown name for info pair category Self-explanatory.  

Unrecognized pair style The choice of pair style is unknown.  

Unknown pair_modify hybrid sub-style The choice of sub-style is unknown.  

Unrecognized region style The choice of region style is unknown.  

Unknown section in molecule file Self-explanatory.  

Unknown table style in angle style table Self-explanatory.  

Unknown table style in bond style table Self-explanatory.  

Unknown table style in pair_style command Style of table is invalid for use with pair_style table command.  

Unknown unit_style Self-explanatory. Check the input script or data file.  

# Unrecognized lattice type in MEAM library file  

The lattice type in an entry of the MEAM library file is not valid.  

Unrecognized lattice type in MEAM parameter file The lattice type in an entry of the MEAM parameter file is not valid.  

Unrecognized pair style in compute pair command Self-explanatory.  

Unsupported mixing rule in kspace_style ewald/disp Only geometric mixing is supported.  

Unsupported order in kspace_style ewald/disp Only $1/\mathrm{r}{\wedge}6$ dispersion or dipole terms are supported.  

Unsupported order in kspace_style pppm/disp, pair_style $9\mathbf{\epsilon}_{\mathrm{{/0}}s}$ Only pair styles with $1/\mathrm{r}$ and $1/\mathrm{r}\Lambda/6$ dependence are currently supported.  

Unsupported parameter in MEAM library file Self-explanatory.  

Use cutoff keyword to set cutoff in single mode Mode is single so cutoff/multi keyword cannot be used.  

Use cutoff/multi keyword to set cutoff in multi mode Mode is multi so cutoff keyword cannot be used.  

Using fix nvt/sllod with inconsistent fix deform remap option Fix nvt/sllod requires that deforming atoms have a velocity profile provided by “remap v” as a fix deform option.  

Using fix nvt/sllod with no fix deform defined Self-explanatory.  

Using fix srd with inconsistent fix deform remap option When shearing the box in an SRD simulation, the remap v option for fix deform needs to be used.  

Using pair lubricate with inconsistent fix deform remap option Must use remap v option with fix deform with this pair style.  

Using pair lubricate/poly with inconsistent fix deform remap option If fix deform is used, the remap v option is required.  

Using suffix gpu without GPU package installed Self-explanatory.  

Using suffix intel without INTEL package installed Self-explanatory.  

Using suffix kk without KOKKOS package enabled Self-explanatory.  

Using suffix omp without OPENMP package installed Self-explanatory.  

Using update dipole flag requires atom attribute mu Self-explanatory.  

Using update dipole flag requires atom style sphere Self-explanatory.  

Variable ID in variable formula does not exist Self-explanatory.  

Variable atom ID is too large Specified ID is larger than the maximum allowed atom ID.  

Variable evaluation before simulation box is defined Cannot evaluate a compute or fix or atom-based value in a variable before the simulation has been setup.  

Variable evaluation in fix wall gave bad value The returned value for epsilon or sigma $<0.0$ .  

Variable evaluation in region gave bad value Variable returned a radius $<0.0$ .  

Variable for compute ti is invalid style Self-explanatory.  

Variable for create_atoms is invalid style The variables must be equal-style variables.  

Variable for displace_atoms is invalid style It must be an equal-style or atom-style variable.  

Variable for dump every is invalid style Only equal-style variables can be used.  

Variable for dump image center is invalid style Must be an equal-style variable.  

Variable for dump image phi is invalid style Must be an equal-style variable.  

Variable for dump image theta is invalid style Must be an equal-style variable.  

Variable for dump image zoom is invalid style Must be an equal-style variable.  

Variable for fix adapt is invalid style Only equal-style variables can be used.  

Variable for fix addforce is invalid style Self-explanatory.  

Variable for fix aveforce is invalid style Only equal-style variables can be used.  

Variable for fix deform is invalid style The variable must be an equal-style variable.  

Variable for fix efield is invalid style The variable must be an equal- or atom-style variable.  

Variable for fix gravity is invalid style Only equal-style variables can be used.  

Variable for fix heat is invalid style Only equal-style or atom-style variables can be used.  

Variable for fix indent is invalid style Only equal-style variables can be used.  

Variable for fix indent is not equal style Only equal-style variables can be used.  

Variable for fix langevin is invalid style It must be an equal-style variable.   
Variable for fix move is invalid style Only equal-style variables can be used.   
Variable for fix setforce is invalid style Only equal-style variables can be used.   
Variable for fix temp/berendsen is invalid style Only equal-style variables can be used.   
Variable for fix temp/csld is invalid style Only equal-style variables can be used.   
Variable for fix temp/csvr is invalid style Only equal-style variables can be used.   
Variable for fix temp/rescale is invalid style Only equal-style variables can be used.   
Variable for fix wall is invalid style Only equal-style variables can be used.   
Variable for fix wall/reflect is invalid style Only equal-style variables can be used.   
Variable for fix wall/srd is invalid style Only equal-style variables can be used.   
Variable for group dynamic is invalid style The variable must be an atom-style variable.   
Variable for group is invalid style Only atom-style variables can be used.   
Variable for region cylinder is invalid style Only equal-style variables are allowed.   
Variable for region is invalid style Only equal-style variables can be used.   
Variable for region is not equal style Self-explanatory.   
Variable for region sphere is invalid style Only equal-style variables are allowed.   
Variable for restart is invalid style Only equal-style variables can be used.   
Variable for set command is invalid style Only atom-style variables can be used.   
Variable for thermo every is invalid style Only equal-style variables can be used.   
Variable for velocity set is invalid style Only atom-style variables can be used.   
Variable for voronoi radius is not atom style Self-explanatory.  

Variable formula compute array is accessed out-of-range Self-explanatory.  

Variable formula compute vector is accessed out-of-range Self-explanatory.  

Variable formula fix array is accessed out-of-range Self-explanatory.  

Variable formula fix vector is accessed out-of-range Self-explanatory.  

Variable has circular dependency A circular dependency is when variable “a” in used by variable “b” and variable “b” is also used by variable “a”. Circular dependencies with longer chains of dependence are also not allowed.  

Variable name between brackets must be alphanumeric or underscore characters Self-explanatory.   
Variable name for compute chunk/atom does not exis Self-explanatory.   
Variable name for compute reduce does not exist Self-explanatory.   
Variable name for compute ti does not exist Self-explanatory.   
Variable name for create_atoms does not exist Self-explanatory.   
Variable name for displace_atoms does not exist Self-explanatory.   
Variable name for dump every does not exist Self-explanatory.   
Variable name for dump image center does not exist Self-explanatory.   
Variable name for dump image phi does not exist Self-explanatory.   
Variable name for dump image theta does not exist Self-explanatory.   
Variable name for dump image zoom does not exist Self-explanatory.   
Variable name for fix adapt does not exist Self-explanatory.   
Variable name for fix addforce does not exist Self-explanatory.   
Variable name for fix ave/atom does not exist Self-explanatory.   
Variable name for fix ave/chunk does not exist Self-explanatory.   
Variable name for fix ave/correlate does not exist Self-explanatory.   
Variable name for fix ave/histo does not exist Self-explanatory.   
Variable name for fix ave/spatial does not exist Self-explanatory.   
Variable name for fix ave/time does not exist Self-explanatory.   
Variable name for fix aveforce does not exist Self-explanatory.   
Variable name for fix deform does not exist Self-explanatory.   
Variable name for fix efield does not exist Self-explanatory.   
Variable name for fix gravity does not exist Self-explanatory.   
Variable name for fix heat does not exist Self-explanatory.   
Variable name for fix indent does not exist Self-explanatory.   
Variable name for fix langevin does not exist Self-explanatory.   
Variable name for fix move does not exist Self-explanatory.   
Variable name for fix setforce does not exist Self-explanatory.   
Variable name for fix store/state does not exist Self-explanatory.   
Variable name for fix temp/berendsen does not exist Self-explanatory.   
Variable name for fix temp/csld does not exist Self-explanatory.   
Variable name for fix temp/csvr does not exist Self-explanatory.   
Variable name for fix temp/rescale does not exist Self-explanatory.   
Variable name for fix vector does not exist Self-explanatory.   
Variable name for fix wall does not exist Self-explanatory.   
Variable name for fix wall/reflect does not exist Self-explanatory.   
Variable name for fix wall/srd does not exist Self-explanatory.  

Variable name for group does not exist Self-explanatory.  

Variable name for group dynamic does not exist Self-explanatory.  

Variable name for region cylinder does not exist Self-explanatory.  

Variable name for region does not exist Self-explanatory.  

Variable name for region sphere does not exist Self-explanatory.  

Variable name for restart does not exist Self-explanatory.  

Variable name for set command does not exist Self-explanatory.  

Variable name for thermo every does not exist Self-explanatory.  

Variable name for velocity set does not exist Self-explanatory.  

Variable name for voronoi radius does not exist Self-explanatory.  

Variable name must be alphanumeric or underscore characters Self-explanatory.  

Variable uses atom property that is not allocated Self-explanatory.  

Velocity command before simulation box is defined The velocity command cannot be used before a read_data, read_restart, or create_box command.  

Velocity command with no atoms existing A velocity command has been used, but no atoms yet exist.  

Velocity ramp in z for a 2d problem Self-explanatory.  

Velocity rigid used with non-rigid fix-ID Self-explanatory.  

Velocity temperature ID does calculate a velocity bias The specified compute must compute a bias for temperature.  

Velocity temperature ID does not compute temperature The compute ID given to the velocity command must compute temperature.  

Verlet/split can only currently be used with comm_style brick This is a current restriction in LAMMPS.  

Verlet/split does not yet support TIP4P This is a current limitation.  

Verlet/split requires 2 partitions See the -partition command-line switch.  

Verlet/split requires Rspace partition layout be multiple of Kspace partition layout in each dim This is controlled by the processors command.  

Verlet/split requires Rspace partition size be multiple of Kspace partition size This is so there is an equal number of Rspace processors for every Kspace pro  

Virial was not tallied on needed timestep You are using a thermo keyword that requires potentials to have tallied the virial, but they did not on this timestep. See the variable page for ideas on how to make this work.  

Voro $^{\mathrel{+{+}}}$ error: narea and neigh have a different size This error is returned by the $\mathrm{Voro++}$ library.  

Wall defined twice in fix wall command Self-explanatory.  

Wall defined twice in fix wall/reflect command Self-explanatory.  

Wall defined twice in fix wall/srd command Self-explanatory.  

Water H epsilon must be 0.0 for pair style lj/cut/tip4p/cut This is because LAMMPS does not compute the Lennard-Jones interactions with these particles for efficiency reasons.  

Water H epsilon must be 0.0 for pair style lj/cut/tip4p/long This is because LAMMPS does not compute the Lennard-Jones interactions with these particles for efficiency reasons.  

Water H epsilon must be 0.0 for pair style lj/long/tip4p/long This is because LAMMPS does not compute the Lennard-Jones interactions with these particles for efficiency reasons.  

World variable count does not match # of partitions A world-style variable must specify a number of values equal to the number of processor partitions.  

Write_data command before simulation box is defined Self-explanatory.  

rite_restart command before simulation box is defined The write_restart command cannot be used before a read_data, read_restart, or create_box command.  

Zero length rotation vector with displace_atoms Self-explanatory.  

Zero length rotation vector with fix move Self-explanatory.  

Zero-length lattice orient vector Self-explanatory.  

# 11.7 Warning messages  

This is an alphabetic list of the WARNING messages LAMMPS prints out and the reason why. If the explanation here is not sufficient, the documentation for the offending command may help. Warning messages also list the source file and line number where the warning was generated. For example, a message like this:  

WARNING: Bond atom missing in box size check (domain.cpp:187)  

means that line $\#187$ in the file src/domain.cpp generated the error. Looking in the source code may help you figure out what went wrong.  

Doc page with ERROR messages  

# Adjusting Coulombic cutoff for MSM, new cutof $=\%g$  

The adjust/cutoff command is turned on and the Coulombic cutoff has been adjusted to match the user-specified accuracy.  

# Angle atoms missing at step %ld  

One or more of three atoms needed to compute a particular angle are missing on this processor. Typically this is because the pairwise cutoff is set too short or the angle has blown apart and an atom is too far away.  

Angle style in data file differs from currently defined angle style Self-explanatory.  

Angles are defined but no angle style is set The topology contains angles, but there are no angle forces computed since there was no angle_style command.  

Atom style in data file differs from currently defined atom style Self-explanatory.  

Bond atom missing in box size check  

The second atom needed to compute a particular bond is missing on this processor. Typically this is because the pairwise cutoff is set too short or the bond has blown apart and an atom is too far away.  

# Bond atom missing in image check  

The second atom in a particular bond is missing on this processor. Typically this is because the pairwise cutoff is set too short or the bond has blown apart and an atom is too far away.  

# Bond atoms missing at step %ld  

The second atom needed to compute a particular bond is missing on this processor. Typically this is because the pairwise cutoff is set too short or the bond has blown apart and an atom is too far away.  

Bond style in data file differs from currently defined bond style Self-explanatory.  

Bonds are defined but no bond style is set The topology contains bonds, but there are no bond forces computed since there was no bond_style command.  

# Bond/angle/dihedral extent $>$ half of periodic box length  

This is a restriction because LAMMPS can be confused about which image of an atom in the bonded interaction is the correct one to use. “Extent” in this context means the maximum end-to-end length of the bond/angle/dihedral. LAMMPS computes this by taking the maximum bond length, multiplying by the number of bonds in the interaction (e.g. 3 for a dihedral) and adding a small amount of stretch.  

Both groups in compute group/group have a net charge; the Kspace boundary correction to energy will be non-zero Self-explanatory.  

Calling write_dump before a full system init.  

The write_dump command is used before the system has been fully initialized as part of a ‘run’ or ‘minimize’ command. Not all dump styles and features are fully supported at this point and thus the command may fail or produce incomplete or incorrect output. Insert a “run $0^{\cdot\cdot}$ command, if a full system init is required.  

Cannot count rigid body degrees-of-freedom before bodies are fully initialized This means the temperature associated with the rigid bodies may be incorrect on this timestep.  

# Cannot count rigid body degrees-of-freedom before bodies are initialized  

This means the temperature associated with the rigid bodies may be incorrect on this timestep.  

Cannot include log terms without 1/r terms; setting flagHI to 1 Self-explanatory.  

Cannot include log terms without 1/r terms; setting flagHI to 1. Self-explanatory.  

Charges are set, but coulombic solver is not used Self-explanatory.  

Charges did not converge at step %ld: %lg Self-explanatory.  

# Communication cutoff is 0.0. No ghost atoms will be generated. Atoms may get lost  

The communication cutoff defaults to the maximum of what is inferred from pair and bond styles (will be zero, if none are defined) and what is specified via comm_modify cutoff (defaults to 0.0). If this results to 0.0, no ghost atoms will be generated and LAMMPS may lose atoms or use incorrect periodic images of atoms in interaction lists. To avoid, either use pair style zero with a suitable cutoff or use comm_modify cutoff .  

# Communication cutoff is shorter than a bond length based estimate. This may lead to errors.  

Since LAMMPS stores topology data with individual atoms, all atoms comprising a bond, angle, dihedral or improper must be present on any subdomain that “owns” the atom with the information, either as a local or a ghost atom. The communication cutoff is what determines up to what distance from a subdomain boundary ghost atoms are created. The communication cutoff is by default the largest non-bonded cutoff plus the neighbor skin distance, but for short or non-bonded cutoffs and/or long bonds, this may not be sufficient. This warning indicates that there is an increased risk of a simulation stopping unexpectedly because of Bond/Angle/Dihedral/Improper atoms missing. It can be silenced by manually setting the communication cutoff via comm_modify cutoff . However, since the heuristic used to determine the estimate is not always accurate, it is not changed automatically and the warning may be ignored depending on the specific system being simulated.  

Communication cutoff is too small for SNAP micro load balancing, increased to %lf Self-explanatory.  

Compute cna/atom cutoff may be too large to find ghost atom neighbors The neighbor cutoff used may not encompass enough ghost atoms to perform this operation correctly.  

# Computing temperature of portions of rigid bodies  

The group defined by the temperature compute does not encompass all the atoms in one or more rigid bodies, so the change in degrees-of-freedom for the atoms in those partial rigid bodies will not be accounted for.  

Create_bonds max distance $>$ minimum neighbor cutof  

This means atom pairs for some atom types may not be in the neighbor list and thus no bond can be created between them.  

# Delete_atoms cutoff $\upharpoonright$ minimum neighbor cutof  

This means atom pairs for some atom types may not be in the neighbor list and thus an atom in that pair cannot be deleted.  

# Dihedral atoms missing at step %ld  

One or more of 4 atoms needed to compute a particular dihedral are missing on this processor. Typically this is because the pairwise cutoff is set too short or the dihedral has blown apart and an atom is too far away.  

# Dihedral problem  

Conformation of the 4 listed dihedral atoms is extreme; you may want to check your simulation geometry.  

Dihedral problem: %d %ld %d %d %d %d Conformation of the 4 listed dihedral atoms is extreme; you may want to check your simulation geometry.  

Dihedral style in data file differs from currently defined dihedral style Self-explanatory.  

# Dihedrals are defined but no dihedral style is set  

The topology contains dihedrals, but there are no dihedral forces computed since there was no dihedral_style command.  

Dump dcd/xtc timestamp may be wrong with fix dt/reset If the fix changes the timestep, the dump dcd file will not reflect the change.  

Energy due to X extra global DOFs will be included in minimizer energies When using fixes like box/relax, the potential energy used by the minimizer is augmented by an additional energy provided by the fix. Thus the printed converged energy may be different from the total potential energy.  

Estimated error in splitting of dispersion coeffs is $\%{\pmb g}$ Error is greater than 0.0001 percent.  

Ewald/disp Newton solver failed, using old method to estimate g_ewald Self-explanatory. Choosing a different cutoff value may help.  

# FENE bond too long  

A FENE bond has stretched dangerously far. It’s interaction strength will be truncated to attempt to prevent the bond from blowing up.  

FENE bond too long: %ld %d %d %g  

A FENE bond has stretched dangerously far. It’s interaction strength will be truncated to attempt to prevent the bond from blowing up.  

# FENE bond too long: %ld $\%{\pmb g}$  

A FENE bond has stretched dangerously far. It’s interaction strength will be truncated to attempt to prevent the bond from blowing up.  

Fix halt condition for fix-id %s met on step %ld with value %g Self explanatory.  

Fix SRD walls overlap but fix srd overlap not set You likely want to set this in your input script.  

Fix bond/create is used multiple times or with fix bond/break - may not work as expected  

When using fix bond/create multiple times or in combination with fix bond/break, the individual fix instances do not share information about changes they made at the same time step and thus it may result in unexpected behavior.  

# Fix bond/react: Atom affected by reaction too close to template edge  

This means an atom which changes type or connectivity during the reaction is too close to an ‘edge’ atom defined in the superimpose file. This could cause incorrect assignment of bonds, angle, etc. Generally, this means you must include more atoms in your templates, such that there are at least two atoms between each atom involved in the reaction and an edge atom.  

# Fix bond/swap will ignore defined angles  

See the page for fix bond/swap for more info on this restriction.  

# Fix deposit near setting $<$ possible overlap separation $\%{\pmb g}$  

This test is performed for finite size particles with a diameter, not for point particles. The near setting is smaller than the particle diameter which can lead to overlaps.  

# Fix evaporate may delete atom with non-zero molecule $\pmb{I D}$  

This is probably an error, since you should not delete only one atom of a molecule.  

# Fix gcmc using full_energy option  

Fix gcmc has automatically turned on the full_energy option since it is required for systems like the one specified by the user. User input included one or more of the following: kspace, triclinic, a hybrid pair style, an eam pair style, or no “single” function for the pair style.  

Fix langevin gjf using random gaussians is not implemented with kokkos This will most likely cause errors in kinetic fluctuations.  

Fix property/atom mol or charge w/out ghost communication A model typically needs these properties defined for ghost atoms.  

Fix qeq CG convergence failed $(\%g)$ after %d iterations at %ld step Self-explanatory.  

Fix qeq has non-zero lower Taper radius cutof Absolute value must be $<=0.01$ .  

Fix qeq has very low Taper radius cutoff Value should typically be $>=5.0$ .  

Fix qeq/dynamic tolerance may be too small for damped dynamics Self-explanatory.  

Fix qeq/fire tolerance may be too small for damped fires Self-explanatory.  

Fix rattle should come after all other integration fixes  

This fix is designed to work after all other integration fixes change atom positions. Thus it should be the last integration fix specified. If not, it will not satisfy the desired constraints as well as it otherwise would.  

Other fixes may change the position of the center-of-mass, so fix recenter should come last.  

Fix srd SRD moves may trigger frequent reneighboring This is because the SRD particles may move long distances.  

Fix srd grid size $>I/4$ of big particle diameter This may cause accuracy problems.  

Fix srd particle moved outside valid domain This may indicate a problem with your simulation parameters.  

Fix srd particles may move $>$ big particle diameter This may cause accuracy problems.  

Fix srd viscosity $<\pmb{\theta.0}$ due to low SRD density This may cause accuracy problems.  

Fixes cannot send data in Kokkos communication, switching to classic communication This is current restriction with Kokkos.  

For better accuracy use ‘pair_modify table $\pmb{\theta}^{,}$ The user-specified force accuracy cannot be achieved unless the table feature is disabled by using ‘pair_modify table 0’.  

Geometric mixing assumed for $\pmb{I}/\pmb{r}^{\wedge}\pmb{\delta}$ coefficients Self-explanatory.  

Group for fix_modify temp != fix group  

The fix_modify command is specifying a temperature computation that computes a temperature on a different group of atoms than the fix itself operates on. This is probably not what you want to do.  

H matrix size has been exceeded: m_fill=%d H.m=%dn This is the size of the matrix.  

# Ignoring unknown or incorrect info command flag  

Self-explanatory. An unknown argument was given to the info command. Compare your input with the documentation.  

# 11.7. Warning messages  

# Improper atoms missing at step %ld  

One or more of 4 atoms needed to compute a particular improper are missing on this processor. Typically this is because the pairwise cutoff is set too short or the improper has blown apart and an atom is too far away.  

Improper problem: %d %ld %d %d %d %d Conformation of the 4 listed improper atoms is extreme; you may want to check your simulation geometry.  

Improper style in data file differs from currently defined improper style Self-explanatory.  

# Impropers are defined but no improper style is set  

The topology contains impropers, but there are no improper forces computed since there was no improper_style command.  

# Inconsistent image flags  

The image flags for a pair on bonded atoms appear to be inconsistent. Inconsistent means that when the coordinates of the two atoms are unwrapped using the image flags, the two atoms are far apart. Specifically they are further apart than half a periodic box length. Or they are more than a box length apart in a non-periodic dimension. This is usually due to the initial data file not having correct image flags for the two atoms in a bond that straddles a periodic boundary. They should be different by 1 in that case. This is a warning because inconsistent image flags will not cause problems for dynamics or most LAMMPS simulations. However they can cause problems when such atoms are used with the fix rigid or replicate commands. Note that if you have an infinite periodic crystal with bonds then it is impossible to have fully consistent image flags, since some bonds will cross periodic boundaries and connect two atoms with the same image flag.  

# Increasing communication cutoff for GPU style  

The pair style has increased the communication cutoff to be consistent with the communication cutoff require ments for this pair style when run on the GPU.  

KIM Model does not provide ‘energy’; Potential energy will be zero Self-explanatory.  

KIM Model does not provide ‘forces’; Forces will be zero Self-explanatory.  

KIM Model does not provide ‘particleEnergy’; energy per atom will be zero Self-explanatory.  

KIM Model does not provide ‘particleVirial’; virial per atom will be zero Self-explanatory.  

Kspace_modify slab param $<2.0$ may cause unphysical behavior The kspace_modify slab parameter should be larger to ensure periodic grids padded with empty space do not overlap.  

Less insertions than requested  

The fix pour command was unsuccessful at finding open space for as many particles as it tried to insert.  

Library error in lammps_gather_atoms  

This library function cannot be used if atom IDs are not defined or are not consecutively numbered.  

Library error in lammps_scatter_atoms  

This library function cannot be used if atom IDs are not defined or are not consecutively numbered, or if no atom map is defined. See the atom_modify command for details about atom maps.  

# Likewise 1-2 special neighbor interactions $\mathbf{\langle\langle\mu\rangle}=\mathbf{\nabla}\mathbf{\mu}\cdot\mathbf{\nabla}$  

The topology contains bonds, but there is no bond style defined and a 1-2 special neighbor scaling factor was not 1.0. This means that pair style interactions may have scaled or missing pairs in the neighbor list in expectation of interactions for those pairs being computed from the bond style.  

# Likewise 1-3 special neighbor interactions $\mathbf{\langle\langle\mu\rangle}=\mathbf{\nabla}\mathbf{\mu}\cdot\mathbf{\nabla}$  

The topology contains angles, but there is no angle style defined and a 1-3 special neighbor scaling factor was not 1.0. This means that pair style interactions may have scaled or missing pairs in the neighbor list in expectation of interactions for those pairs being computed from the angle style.  

# Likewise 1-4 special neighbor interactions $\mathbf{\langle\langle\mu\rangle}=\mathbf{\nabla}\mathbf{\mu}\cdot\mathbf{\nabla}$  

The topology contains dihedrals, but there is no dihedral style defined and a 1-4 special neighbor scaling factor was not 1.0. This means that pair style interactions may have scaled or missing pairs in the neighbor list in expectation of interactions for those pairs being computed from the dihedral style.  

Lost atoms via change_box: original %ld current %ld The command options you have used caused atoms to be lost.  

Lost atoms via displace_atoms: original %ld current %ld  

The command options you have used caused atoms to be lost.  

# Lost atoms: original %ld current %ld  

Lost atoms are checked for each time thermo output is done. See the thermo_modify lost command for options. Lost atoms usually indicate bad dynamics, e.g. atoms have been blown far out of the simulation box, or moved further than one processor’s subdomain away before reneighboring.  

MSM mesh too small, increasing to 2 points in each direction Self-explanatory.  

# Mismatch between velocity and compute groups  

The temperature computation used by the velocity command will not be on the same group of atoms that velocities are being set for.  

Mixing forced for lj coefficients Self-explanatory.  

Molecule attributes do not match system attributes An attribute is specified (e.g. diameter, charge) that is not defined for the specified atom style.  

Molecule has bond topology but no special bond settings This means the bonded atoms will not be excluded in pairwise interactions.  

Molecule template for create_atoms has multiple molecules The create_atoms command will only create molecules of a single type, i.e. the first molecule in the template.  

Molecule template for fix gcmc has multiple molecules The fix gcmc command will only create molecules of a single type, i.e. the first molecule in the template.  

Molecule template for fix shake has multiple molecules The fix shake command will only recognize molecules of a single type, i.e. the first molecule in the template.  

More than one compute centro/atom It is not efficient to use compute centro/atom more than once.  

More than one compute cluster/atom It is not efficient to use compute cluster/atom more than once.  

More than one compute cna/atom defined It is not efficient to use compute cna/atom more than once.  

More than one compute contact/atom It is not efficient to use compute contact/atom more than once.  

More than one compute coord/atom It is not efficient to use compute coord/atom more than once.  

More than one compute damage/atom It is not efficient to use compute ke/atom more than once.  

# 11.7. Warning messages  

More than one compute dilatation/atom Self-explanatory.  

More than one compute erotate/sphere/atom It is not efficient to use compute erorate/sphere/atom more than once.  

More than one compute hexorder/atom It is not efficient to use compute hexorder/atom more than once.  

More than one compute ke/atom It is not efficient to use compute ke/atom more than once.  

More than one compute orientorder/atom It is not efficient to use compute orientorder/atom more than once.  

More than one compute plasticity/atom Self-explanatory.  

More than one compute sna/atom Self-explanatory.  

More than one compute sna/grid Self-explanatory.  

More than one compute sna/grid/local Self-explanatory.  

More than one compute snav/atom Self-explanatory.  

More than one fix poems It is not efficient to use fix poems more than once.  

More than one fix rigid It is not efficient to use fix rigid more than once.  

# Neighbor exclusions used with KSpace solver may give inconsistent Coulombic energies  

This is because excluding specific pair interactions also excludes them from long-range interactions which may not be the desired effect. The special_bonds command handles this consistently by ensuring excluded (or weighted) 1-2, 1-3, 1-4 interactions are treated consistently by both the short-range pair style and the long-range solver. This is not done for exclusions of charged atom pairs via the neigh_modify exclude command.  

# New thermo_style command, previous thermo_modify settings will be lost  

If a thermo_style command is used after a thermo_modify command, the settings changed by the thermo_modify command will be reset to their default values. This is because the thermo_modify command acts on the currently defined thermo style, and a thermo_style command creates a new style.  

# No Kspace calculation with verlet/split  

The second partition performs a kspace calculation so the kspace_style command must be used.  

No automatic unit conversion to XTC file format conventions possible for units $\boldsymbol{\mathit{l j}}$ This means no scaling will be performed.  

No fixes defined, atoms won’t move  

If you are not using a fix like nve, nvt, npt then atom velocities and coordinates will not be updated during timestepping.  

# No joints between rigid bodies, use fix rigid instead  

The bodies defined by fix poems are not connected by joints. POEMS will integrate the body motion, but it would be more efficient to use fix rigid.  

# Not using real units with pair reaxf  

This is most likely an error, unless you have created your own ReaxFF parameter file in a different set of units.  

# umber of MSM mesh points changed to be a multiple of 2  

MSM requires that the number of grid points in each direction be a multiple of two and the number of grid points in one or more directions have been adjusted to meet this requirement.  

MP_NUM_THREADS environment is not set. This environment variable must be set appropriately to use the OPENMP package.  

One or more atoms are time integrated more than once  

This is probably an error since you typically do not want to advance the positions or velocities of an atom more than once per timestep.  

One or more chunks do not contain all atoms in molecule This may not be what you intended.  

# One or more dynamic groups may not be updated at correct point in timestep  

If there are other fixes that act immediately after the initial stage of time integration within a timestep (i.e. after atoms move), then the command that sets up the dynamic group should appear after those fixes. This will ensure that dynamic group assignments are made after all atoms have moved.  

One or more respa levels compute no forces This is computationally inefficient.  

Pair COMB charge $\%$ .10f with force $\%$ .10f hit max barrier Something is possibly wrong with your model.  

Pair COMB charge $\%$ .10f with force $\%$ .10f hit min barrier Something is possibly wrong with your model.  

Pair brownian needs newton pair on for momentum conservation Self-explanatory.  

Pair dpd needs newton pair on for momentum conservation Self-explanatory.  

Pair dsmc: num_of_collisions $>$ number_of_A Collision model in DSMC is breaking down.  

Pair dsmc: num_of_collisions $>$ number_of_B Collision model in DSMC is breaking down.  

Pair style in data file differs from currently defined pair style Self-explanatory.  

Pair style restartinfo set but has no restart support  

This pair style has a bug, where it does not support reading and writing information to a restart file, but does not set the member variable “restartinfo” to 0 as required in that case.  

# Particle deposition was unsuccessful  

The fix deposit command was not able to insert as many atoms as needed. The requested volume fraction may be too high, or other atoms may be in the insertion region.  

# Proc subdomain size $<$ neighbor skin, could lead to lost atoms  

The decomposition of the physical domain (likely due to load balancing) has led to a processor’s subdomain being smaller than the neighbor skin in one or more dimensions. Since reneighboring is triggered by atoms moving the skin distance, this may lead to lost atoms, if an atom moves all the way across a neighboring processor’s subdomain before reneighboring is triggered.  

# Reducing PPPM order b/c stencil extends beyond nearest neighbor processor  

This may lead to a larger grid than desired. See the kspace_modify overlap command to prevent changing of the PPPM order.  

Reducing PPPMDisp Coulomb order b/c stencil extends beyond neighbor processor This may lead to a larger grid than desired. See the kspace_modify overlap command to prevent changing of the PPPM order.  

Reducing PPPMDisp dispersion order b/c stencil extends beyond neighbor processor This may lead to a larger grid than desired. See the kspace_modify overlap command to prevent changing of the PPPM order.  

# Replacing a fix, but new group $\mathrel{\mathop:}=$ old group  

The ID and style of a fix match for a fix you are changing with a fix command, but the new group you are specifying does not match the old group.  

# Replicating in a non-periodic dimension  

The parameters for a replicate command will cause a non-periodic dimension to be replicated; this may cause unwanted behavior.  

# Resetting reneighboring criteria during PRD  

A PRD simulation requires that neigh_modify settings be delay $=0$ , every $=1$ , check $=$ yes. Since these settings were not in place, LAMMPS changed them and will restore them to their original values after the PRD simulation.  

# Resetting reneighboring criteria during TAD  

A TAD simulation requires that neigh_modify settings be delay $=0$ , every $=1$ , check $=$ yes. Since these settings were not in place, LAMMPS changed them and will restore them to their original values after the PRD simulation.  

# Resetting reneighboring criteria during minimization  

Minimization requires that neigh_modify settings be delay $=0$ , every $=1$ , check $=$ yes. Since these settings were not in place, LAMMPS changed them and will restore them to their original values after the minimization.  

# Restart file used different # of processors  

The restart file was written out by a LAMMPS simulation running on a different number of processors. Due to round-off, the trajectories of your restarted simulation may diverge a little more quickly than if you ran on the same # of processors.  

# Restart file used different 3d processor grid  

The restart file was written out by a LAMMPS simulation running on a different 3d grid of processors. Due to round-off, the trajectories of your restarted simulation may diverge a little more quickly than if you ran on the same # of processors.  

Restart file used different boundary settings, using restart file values Your input script cannot change these restart file settings.  

Restart file used different newton bond setting, using restart file value The restart file value will override the setting in the input script.  

Restart file used different newton pair setting, using input script value The input script value will override the setting in the restart file.  

Restrain problem: %d %ld %d %d %d %d Conformation of the 4 listed dihedral atoms is extreme; you may want to check your simulation geometry.  

Running PRD with only one replica This is allowed, but you will get no parallel speed-up.  

SRD bin shifting turned on due to small lamda This is done to try to preserve accuracy.  

# SRD bin size for fix srd differs from user request  

Fix SRD had to adjust the bin size to fit the simulation box. See the cubic keyword if you want this message to be an error vs warning.  

# SRD bins for fix srd are not cubic enough  

The bin shape is not within tolerance of cubic. See the cubic keyword if you want this message to be an error vs warning.  

SRD particle %d started inside big particle %d on step %ld bounce %d See the inside keyword if you want this message to be an error vs warning.  

SRD particle %d started inside wall %d on step %ld bounce %d See the inside keyword if you want this message to be an error vs warnin  

# Shake determinant $<\pmb{\theta.0}$  

The determinant of the quadratic equation being solved for a single cluster specified by the fix shake command is numerically suspect. LAMMPS will set it to 0.0 and continue.  

Shell command ‘%s’ failed with error $40\text{\textperthousand}$ ’ Self-explanatory.  

Shell command returned with non-zero status This may indicate the shell command did not operate as expected.  

Should not allow rigid bodies to bounce off reflecting walls LAMMPS allows this, but their dynamics are not computed correctly.  

Should not use fix nve/limit with fix shake or fix rattle This will lead to invalid constraint forces in the SHAKE/RATTLE computation.  

Simulations might be very slow because of large number of structure factors Self-explanatory.  

Slab correction not needed for MSM Slab correction is intended to be used with Ewald or PPPM and is not needed by MSM  

Specifying an ‘subset’ value of $\mathbf{\nabla}\cdot\pmb{0}^{\star}$ is equivalent to no ‘subset’ keyword Self-explanatory.  

System is not charge neutral, net charge $=\%g$ The total charge on all atoms on the system is not 0.0. For some KSpace solvers this is only a warning.  

Table inner cutoff $>=$ outer cutoff  

You specified an inner cutoff for a Coulombic table that is longer than the global cutoff. Probably not what you wanted.  

# Temperature for MSST is not for group all  

User-assigned temperature to MSST fix does not compute temperature for all atoms. Since MSST computes a global pressure, the kinetic energy contribution from the temperature is assumed to also be for all atoms. Thus the pressure used by MSST could be inaccurate.  

# Temperature for NPT is not for group all  

User-assigned temperature to NPT fix does not compute temperature for all atoms. Since NPT computes a global pressure, the kinetic energy contribution from the temperature is assumed to also be for all atoms. Thus the pressure used by NPT could be inaccurate.  

# Temperature for fix modify is not for group all  

The temperature compute is being used with a pressure calculation which does operate on group all, so this may be inconsistent.  

# Temperature for thermo pressure is not for group all  

User-assigned temperature to thermo via the thermo_modify command does not compute temperature for all  

atoms. Since thermo computes a global pressure, the kinetic energy contribution from the temperature is assumed to also be for all atoms. Thus the pressure printed by thermo could be inaccurate.  

The fix ave/spatial command has been replaced by the more flexible fix ave/chunk and compute chunk/atom   
commands – fix ave/spatial will be removed in the summer of 2015 Self-explanatory.  

he minimizer does not re-orient dipoles when using fix efield  

This means that only the atom coordinates will be minimized, not the orientation of the dipoles.  

Too many common neighbors in CNA %d times More than the maximum # of neighbors was found multiple times. This was unexpected.  

Too many inner timesteps in fix ttm Self-explanatory.  

Too many neighbors in CNA for %d atoms More than the maximum # of neighbors was found multiple times. This was unexpected.  

Use special bonds ${\bf\delta}=\pmb{\theta},\pmb{l},\pmb{l}$ with bond style fene Most FENE models need this setting for the special_bonds command.  

Use special bonds ${\bf\delta}=\pmb{\theta},\pmb{l},\pmb{l}$ with bond style fene/expand Most FENE models need this setting for the special_bonds command.  

Using a many-body potential with bonds/angles/dihedrals and special_bond exclusions This is likely not what you want to do. The exclusion settings will eliminate neighbors in the neighbor list, which the many-body potential needs to calculated its terms correctly.  

Using compute temp/deform with inconsistent fix deform remap option  

Fix nvt/sllod assumes deforming atoms have a velocity profile provided by “remap v” or “remap none” as a fix deform option.  

Using compute temp/deform with no fix deform defined  

This is probably an error, since it makes little sense to use compute temp/deform in this case.  

Using fix srd with box deformation but no SRD thermostat The deformation will heat the SRD particles so this can be dangerous  

Using kspace solver on system with no charge Self-explanatory.  

Using largest cut-off for lj/long/dipole/long long long Self-explanatory.  

Using largest cutoff for buck/long/coul/long Self-explanatory.  

Using largest cutoff for lj/long/coul/long Self-explanatory.  

Using largest cutoff for pair_style lj/long/tip4p/long Self-explanatory.  

Using package gpu without any pair style defined Self-explanatory.  

Using pair potential shift with pair_modify compute no The shift effects will thus not be computed.  

Using pair tail corrections with nonperiodic system This is probably a bogus thing to do, since tail corrections are computed by integrating the density of a periodic system out to infinity.  

Using pair tail corrections with pair_modify compute no The tail corrections will thus not be computed.  

# Part II  

# Programmer Guide  

# LAMMPS LIBRARY INTERFACES  

As described on the library interface to LAMMPS page, LAMMPS can be built as a library (static or shared), so that it can be called by another code, used in a coupled manner with other codes, or driven through a Python script. The LAMMPS standalone executable itself is essentially a thin wrapper on top of the LAMMPS library, which creates a LAMMPS instance, passes the input for processing to that instance, and then exits.  

Most of the APIs described below are based on C language wrapper functions in the files src/library.h and src/library. cpp, but it is also possible to use $\mathrm{C}{+}{+}$ directly. The basic procedure is always the same: you create one or more instances of LAMMPS, pass commands as strings or from files to that LAMMPS instance to execute calculations, and/or call functions that read, manipulate, and update data from the active class instances inside LAMMPS to do analysis or perform operations that are not possible with existing input script commands.  

# Thread-safety  

LAMMPS was initially not conceived as a thread-safe program, but over the years changes have been applied to replace operations that collide with creating multiple LAMMPS instances from multiple-threads of the same process with thread-safe alternatives. This primarily applies to the core LAMMPS code and less so on add-on packages, especially when those packages require additional code in the lib folder, interface LAMMPS to Fortran libraries, or the code uses static variables (like the COLVARS package).  

Another major issue to deal with is to correctly handle MPI. Creating a LAMMPS instance requires passing an MPI communicator, or it assumes the MPI_COMM_WORLD communicator, which spans all MPI processor ranks. When creating multiple LAMMPS object instances from different threads, this communicator has to be different for each thread or else collisions can happen. Or it has to be guaranteed, that only one thread at a time is active. MPI communicators, however, are not a problem, if LAMMPS is compiled with the MPI STUBS library, which implies that there is no MPI communication and only 1 MPI rank.  

# 1.1 LAMMPS C Library API  

The C library interface is the most commonly used path to manage LAMMPS instances from a compiled code and it is the basis for the Python and Fortran modules. Almost all functions of the C language API require an argument containing a “handle” in the form of a void \* type variable, which points to the location of a LAMMPS class instance.  

The library.h header file by default does not include the mpi.h header file and thus hides the lammps_open() function which requires the declaration of the MPI_comm data type. This is only a problem when the communicator that would be passed is different from MPI_COMM_WORLD. Otherwise calling lammps_open_no_mpi() will work just as well. To make lammps_open() available, you need to compile the code with -DLAMMPS_LIB_MPI or add the line $\#$ define LAMMPS_LIB_MPI before #include "library.h".  

Please note the mpi.h file must usually be the same (and thus the MPI library in use) for the LAMMPS code and library and the calling code. The exception is when LAMMPS was compiled in serial mode using the STUBS MPI library.  

In that case the calling code may be compiled with a different MPI library so long as lammps_open_no_mpi() is called to create a LAMMPS instance. In that case each MPI rank will run LAMMPS in serial mode.  

![](images/ed5db8df0f60af19cf46e4284b194cb6cbece16f8d5972cdc36359fe89a7268f.jpg)  

# Errors versus exceptions  

If the LAMMPS executable encounters an error condition, it will abort after printing an error message. It does so by catching the exceptions that LAMMPS could throw. For a C library interface this is usually not desirable since the calling code might lack the ability to catch such exceptions. Thus, the library functions will catch those exceptions and return from the affected functions. The error status can be queried and an error message retrieved. This is, for example used by the LAMMPS python module and then a suitable Python exception is thrown.  

# $\Theta$ Using the C library interface as a plugin  

Rather than including the C library directly and link to the LAMMPS library at compile time, you can use the liblammpsplugin.h header file and the liblammpsplugin.c C code in the examples/COUPLE/plugin folder for an interface to LAMMPS that is largely identical to the regular library interface, only that it will load a LAMMPS shared library file at runtime. This can be useful for applications where the interface to LAMMPS would be an optional feature.  

![](images/c00cb09196d9d1163c048aefc2c583e70d71f419509ed89836369a1d4ddac7fa.jpg)  

# Warning  

No checks are made on the arguments of the function calls of the C library interface. All function arguments must be non-NULL unless explicitly allowed, and must point to consistent and valid data. Buffers for storing returned data must be allocated to a suitable size. Passing invalid or unsuitable information will likely cause crashes or corrupt data.  

# 1.1.1 Creating or deleting a LAMMPS object  

This section documents the following functions:  

• lammps_open()   
• lammps_open_no_mpi()   
• lammps_open_fortran()   
• lammps_close()   
• lammps_mpi_init()   
• lammps_mpi_finalize()   
• lammps_kokkos_finalize()   
• lammps_python_finalize()   
• lammps_error()  

The lammps_open() and lammps_open_no_mpi() functions are used to create and initialize a LAMMPS() instance. They return a reference to this instance as a void \* pointer to be used as the “handle” argument in subsequent function calls until that instance is destroyed by calling lammps_close(). Here is a simple example demonstrating its use:  

#include "library.h"   
#include <stdio.h>   
int main(int argc, char \*\*argv) void \*handle; int version; const char $\mathrm{\boldmath~\Psi~}^{*}\mathrm{lmpargv}||=\{\mathrm{\boldmath~\Psi~}^{*}\mathrm{liblammps}^{_{\mathrm{W}}},\mathrm{\boldmath~\Psi~}^{*}\mathrm{log}^{_{\mathrm{W}}},\mathrm{\boldmath~\Psi~}^{*}\mathrm{none}^{_{\mathrm{W}}}\}$ ;   
int lmpargc = sizeof(lmpargv)/sizeof(const char \*); /\* create LAMMPS instance \*/   
handle = lammps_open_no_mpi(lmpargc, (char $^{**}$ )lmpargv, NULL); if (handle == NULL) { printf("LAMMPS initialization failed"); lammps_mpi_finalize(); return 1; } /\* get and print numerical version code \*/ version = lammps_version(handle); printf("LAMMPS Version: %d\n",version); /\* delete LAMMPS instance and shut down MPI \*/ lammps_close(handle); lammps_mpi_finalize(); return 0;  

The LAMMPS library uses the MPI library it was compiled with and will either run on all processors in the MPI_COMM_WORLD communicator or on the set of processors in the communicator passed as the comm argument of lammps_open(). This means the calling code can run LAMMPS on all or a subset of processors. For example, a wrapper code might decide to alternate between LAMMPS and another code, allowing them both to run on all the processors. Or it might allocate part of the processors to LAMMPS and the rest to the other code by creating a custom communicator with MPI_Comm_split() and running both codes concurrently before syncing them up periodically. Or it might instantiate multiple instances of LAMMPS to perform different calculations and either alternate between them, run them concurrently on split communicators, or run them one after the other. The lammps_open() function may be called multiple times for this latter purpose.  

The lammps_close() function is used to shut down the LAMMPS class pointed to by the handle passed as an argument and free all its memory. This has to be called for every instance created with one of the lammps_open() functions. It will, however, not call MPI_Finalize(), since that may only be called once. See lammps_mpi_finalize() for an alternative to invoking MPI_Finalize() explicitly from the calling program.  

The lammps_open() function creates a new LAMMPS class instance while passing in a list of strings as if they were command-line arguments for the LAMMPS executable, and an MPI communicator for LAMMPS to run under. Since the list of arguments is exactly as when called from the command-line, the first argument would be the name of the executable and thus is otherwise ignored. However argc may be set to 0 and then argv may be NULL. If MPI is not yet initialized, $\mathrm{MPI\_Init}()$ will be called during creation of the LAMMPS class instance.  

If for some reason the creation or initialization of the LAMMPS instance fails a null pointer is returned.  

Changed in version $18\mathrm{Sep}2020$ : This function now has the pointer to the created LAMMPS class instance as return value. For backward compatibility it is still possible to provide the address of a pointer variable as final argument ptr.  

Deprecated since version 18Sep2020: The ptr argument will be removed in a future release of LAMMPS. It should be set to NULL instead.  

# See also  

lammps_open_no_mpi(), lammps_open_fortran()  

![](images/da72b066b55e3f39c928f4bb71b96406b679b501e9707f9c194a8657ccb13d6d.jpg)  

# Note  

This function is only declared when the code using the LAMMPS library.h include file is compiled with -DLAMMPS_LIB_MPI, or contains a $\#$ define LAMMPS_LIB_MPI 1 statement before #include "library.h". Otherwise you can only use the lammps_open_no_mpi() or lammps_open_fortran() functions.  

# Parameters  

• argc – number of command-line arguments   
• argv – list of command-line argument strings   
• comm – MPI communicator for this LAMMPS instance   
• ptr – pointer to a void pointer variable which serves as a handle; may be NULL  

# Returns  

pointer to new LAMMPS instance cast to void \*  

void \*lammps_open_no_mpi(int argc, char \*\*argv, void \*\*ptr) Variant of lammps_open() that implicitly uses MPI_COMM_WORLD.  

This function is a version of lammps_open(), that is missing the MPI communicator argument. It will use MPI_COMM_WORLD instead. The type and purpose of arguments and return value are otherwise the same.  

Outside of the convenience, this function is useful, when the LAMMPS library was compiled in serial mode, but the calling code runs in parallel and the MPI_Comm data type of the STUBS library would not be compatible with that of the calling code.  

If for some reason the creation or initialization of the LAMMPS instance fails a null pointer is returned.  

Changed in version 18Sep2020: This function now has the pointer to the created LAMMPS class instance as return value. For backward compatibility it is still possible to provide the address of a pointer variable as final argument ptr.  

Deprecated since version 18Sep2020: The ptr argument will be removed in a future release of LAMMPS. It should be set to NULL instead.  

# See also  

lammps_open(), lammps_open_fortran()  

# Parameters  

• argc – number of command-line arguments  

• argv – list of command-line argument strings • ptr – pointer to a void pointer variable which serves as a handle; may be NULL  

# Returns  

pointer to new LAMMPS instance cast to void \*  

void \*lammps_open_fortran(int argc, char \*\*argv, int f_comm)  

Variant of lammps_open() using a Fortran MPI communicator.  

Added in version 18Sep2020.  

This function is a version of lammps_open(), that uses an integer for the MPI communicator as the MPI Fortran interface does. It is used in the lammps() constructor of the LAMMPS Fortran module. Internally it converts the f_comm argument into a C-style MPI communicator with MPI_Comm_f2c() and then calls lammps_open().  

If for some reason the creation or initialization of the LAMMPS instance fails a null pointer is returned.  

# See also  

lammps_open_fortran(), lammps_open_no_mpi()  

# Parameters  

• argc – number of command-line arguments • argv – list of command-line argument strings • f_comm – Fortran style MPI communicator for this LAMMPS instance  

# Returns  

pointer to new LAMMPS instance cast to void \*  

void lammps_close(void \*handle)  

Delete a LAMMPS instance created by lammps_open() or its variants.  

This function deletes the LAMMPS class instance pointed to by handle that was created by one of the lammps_open() variants. It does not call MPI_Finalize() to allow creating and deleting multiple LAMMPS instances concurrently or sequentially. See lammps_mpi_finalize() for a function performing this operation.  

# Parameters  

handle – pointer to a previously created LAMMPS instance  

void lammps_mpi_init()  

Ensure the MPI environment is initialized.  

Added in version 18Sep2020.  

The MPI standard requires that any MPI application must call $\mathrm{MPI\_Init}()$ exactly once before performing any other MPI function calls. This function checks, whether MPI is already initialized and calls $\mathrm{MPI\_Init}()$ in case it is not.  

# 1.1. LAMMPS C Library API  

void lammps_mpi_finalize()  

Shut down the MPI infrastructure.  

Added in version 18Sep2020.  

The MPI standard requires that any MPI application calls MPI_Finalize() before exiting. Even if a calling program does not do any MPI calls, MPI is still initialized internally to avoid errors accessing any MPI functions. This function should then be called right before exiting the program to wait until all (parallel) tasks are completed and then MPI is cleanly shut down. After calling this function no more MPI calls may be made.  

# See also  

lammps_kokkos_finalize(), lammps_python_finalize()  

void lammps_kokkos_finalize()  

Shut down the Kokkos library environment.  

Added in version 2Jul2021.  

The Kokkos library may only be initialized once during the execution of a process. This is done automatically the first time Kokkos functionality is used. This requires that the Kokkos environment must be explicitly shut down after any LAMMPS instance using it is closed (to release associated resources). After calling this function no Kokkos functionality may be used.  

# See also  

lammps_mpi_finalize(), lammps_python_finalize()  

void lammps_python_finalize()  

Clear the embedded Python environment  

Added in version 20Sep2021.  

This function resets and clears an embedded Python environment by calling the Py_Finalize() function of the embedded Python library, if enabled. This call would free up all allocated resources and release loaded shared objects.  

However, this is not done when a LAMMPS instance is deleted because a) LAMMPS may have been used through the Python module and thus the Python interpreter is external and not embedded into LAMMPS and therefore may not be reset by LAMMPS b) some Python modules and extensions, most notably NumPy, are not compatible with being initialized multiple times, which would happen if additional LAMMPS instances using Python would be created after after calling Py_Finalize().  

This function can be called to explicitly clear the Python environment in case it is safe to do so.  

# See also  

lammps_mpi_finalize(), lammps_kokkos_finalize()  

void lammps_error(void \*handle, int error_type, const char \*error_text)  

Call a LAMMPS Error class function  

Added in version 3Nov2022.  

This function is a wrapper around functions in the Error to print an error message and then stop LAMMPS.  

The error_type parameter selects which function to call. It is a sum of constants from _LMP_ERROR_CONST. If the value does not match any valid combination of constants a warning is printed and the function returns.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • error_type – parameter to select function in the Error class • error_text – error message  

# 1.1.2 Executing commands  

This section documents the following functions:  

• lammps_file() • lammps_command() • lammps_commands_list() • lammps_commands_string() • lammps_expand()  

Once a LAMMPS instance is created, there are multiple ways to “drive” a simulation. In most cases it is easiest to process single or multiple LAMMPS commands like in an input file. This can be done through reading a file or passing single commands or lists of commands or blocks of commands with the following functions.  

Via these functions, the calling code can have LAMMPS act on a series of input file commands that are either read from a file or passed as strings. For example, this allows setup of a problem from an input script, and then running it in stages while performing other operations in between or concurrently. The caller can interleave the LAMMPS function calls with operations it performs, such as calls to extract information from or set information within LAMMPS, or calls to another code’s library.  

Just as with input script parsing comments can be included in the file or strings, and expansion of variables with $\$\{\mathrm{name}\}$ or \$(expression) syntax is performed. Below is a short example using some of these functions.  

/\* define to make the otherwise hidden prototype for "lammps_open()" visible \*/   
#define LAMMPS_LIB_MPI   
#include "library.h"   
#include <mpi.h>   
#include $<$ <stdio.h>   
int main(int argc, char \*\*argv)   
{   
void \*handle;   
int i;   
(continue on next pag  

(continued from previous page)  

MPI_Init(&argc, &argv);   
handle = lammps_open(0, NULL, MPI_COMM_WORLD, NULL);   
lammps_file(handle,"in.sysinit");   
lammps_command(handle,"run 1000 post no");   
for (i=0; i < 100; ++i) { lammps_commands_string(handle,"run 100 pre no post no\n" "print $^1\mathrm{PE}=\mathbb{\mathbb{S}}(\mathrm{pe})^{\prime}\backslash\mathrm{n}$ " "print $^1\mathrm{KE}=\mathbb{S}(\mathrm{ke})^{1}\backslash\mathbf{n}^{\prime}$ ");   
}   
lammps_close(handle);   
MPI_Finalize();   
return 0;  

void lammps_file(void \*handle, const char \*file)  

Process LAMMPS input from a file.  

This function processes commands in the file pointed to by filename line by line and thus functions very similar to the include command. The function returns when the end of the file is reached and the commands have completed.  

The actual work is done by the functions Input::file(const char \*) and Input::file().  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • filename – name of a file with LAMMPS input  

char \*lammps_command(void \*handle, const char \*cmd)  

Process a single LAMMPS input command from a string.  

This function tells LAMMPS to execute the single command in the string cmd. The entire string is considered as command and need not have a (final) newline character. Newline characters in the body of the string, however, will be treated as part of the command and will not start a second command. The function lammps_commands_string() processes a string with multiple command-lines.  

The function returns the name of the command on success or NULL when passing a string without a command.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance cmd – string with a single LAMMPS command  

# Returns  

string with parsed command name or NULL  

void lammps_commands_list(void \*handle, int ncmd, const char \*\*cmds)  

Process multiple LAMMPS input commands from list of strings.  

This function processes multiple commands from a list of strings by first concatenating the individual strings in cmds into a single string, inserting newline characters as needed. The combined string is passed to lammps_commands_string() for processing.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • ncmd – number of lines in cmds • cmds – list of strings with LAMMPS commands  

void lammps_commands_string(void \*handle, const char \*str)  

Process a block of LAMMPS input commands from a single string.  

This function processes a multi-line string similar to a block of commands from a file. The string may have multiple lines (separated by newline characters) and also single commands may be distributed over multiple lines with continuation characters (’&’). Those lines are combined by removing the ‘&’ and the following newline character. After this processing the string is handed to LAMMPS for parsing and executing.  

Added in version 21Nov2023: The command is now able to process long strings with triple quotes and loops using jump SELF <label>.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • str – string with block of LAMMPS input commands  

char \*lammps_expand(void \*handle, const char \*line) expand a single LAMMPS input line from a string.  

This function tells LAMMPS to expand the string in cmd like it would process an input line fed to lammps_command() without executing it. The entire string is considered as input and need not have a (final) newline character. Newline characters in the body of the string, however, will be treated as part of the command and will not start a second command.  

The function returns the expanded string in a new string buffer that must be freed with lammps_free() after use to avoid a memory leak.  

See also lammps_eval()  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • line – string with a single LAMMPS input line  

# Returns  

string with expanded line  

# 1.1. LAMMPS C Library API  

# 1.1.3 System properties  

This section documents the following functions:  

• lammps_get_natoms()   
• lammps_get_thermo()   
• lammps_last_thermo()   
• lammps_extract_box()   
• lammps_reset_box()   
• lammps_memory_usage()   
• lammps_get_mpi_comm()   
• lammps_extract_setting()   
• lammps_extract_global_datatype()   
• lammps_extract_global()   
• lammps_extract_pair_dimension()   
• lammps_extract_pair()   
• lammps_map_atom()  

The library interface allows the extraction of different kinds of information about the active simulation instance and also - in some cases - to apply modifications to it. This enables combining of a LAMMPS simulation with other processing and simulation methods computed by the calling code, or by another code that is coupled to LAMMPS via the library interface. In some cases the data returned is direct reference to the original data inside LAMMPS, cast to a void pointer. In that case the data needs to be cast to a suitable pointer for the calling program to access it, and you may need to know the correct dimensions and lengths. This also means you can directly change those value(s) from the calling program (e.g., to modify atom positions). Of course, changing values should be done with care. When accessing per-atom data, please note that these data are the per-processor local data and are indexed accordingly. Per-atom data can change sizes and ordering at every neighbor list rebuild or atom sort event as atoms migrate between subdomains and processors.  

#include "library.h"   
#include <stdio.h>   
int main(int argc, char \*\*argv)   
void \*handle; int i; handle = lammps_open_no_mpi(0, NULL, NULL); lammps_file(handle,"in.sysinit"); printf("Running a simulation with %g atoms.\n", lammps_get_natoms(handle)); printf(" %d local and %d ghost atoms. %d atom types\n", lammps_extract_setting(handle,"nlocal"), lammps_extract_setting(handle,"nghost"), lammps_extract_setting(handle,"ntypes")); double \*dt = (double \*)lammps_extract_global(handle,"dt");  

(continued from previous page)  

<html><body><table><tr><td>printf("Changing timestep from %g to 0.5\n", *dt); *dt = 0.5;</td></tr><tr><td>lammps_command(handle,"run 1000 post no");</td></tr><tr><td></td></tr><tr><td>for (i=0; i < 10; ++i) {</td></tr><tr><td>lammps _command(handle,"run 100 pre no post no");</td></tr><tr><td>printf("PE = %g\nKE = %g\n",</td></tr><tr><td>lammps_get_t thermo(handle,"pe"), lammps _get _thermo(handle,"ke"));</td></tr><tr><td>lammps_close(handle);</td></tr></table></body></html>  

double lammps_get_natoms(void \*handle)  

Return the total number of atoms in the system.  

This number may be very large when running large simulations across multiple processes. Depending on compile time choices, LAMMPS may be using either 32-bit or a 64-bit integer to store this number. For portability this function returns thus a double precision floating point number, which can represent up to a 53-bit signed integer exactly $(\approx10^{16})$ ).  

As an alternative, you can use lammps_extract_global() and cast the resulting pointer to an integer pointer of the correct size and dereference it. The size of that integer (in bytes) can be queried by calling lammps_extract_setting() to return the size of a bigint integer.  

Changed in version $18\mathrm{Sep}2020$ : The type of the return value was changed from int to double to accommodate reporting atom counts for larger systems that would overflow a 32-bit int without having to depend on a 64-bit bit integer type definition.  

# Parameters  

handle – pointer to a previously created LAMMPS instance  

# Returns  

total number of atoms or 0 if value is too large  

double lammps_get_thermo(void \*handle, const char \*keyword)  

Evaluate a thermo keyword.  

This function returns the current value of a thermo keyword. Unlike lammps_extract_global() it does not give access to the storage of the desired data but returns its value as a double, so it can also return information that is computed on-the-fly. Use lammps_last_thermo() to get access to the cached data from the last thermo output.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • keyword – string with the name of the thermo keyword  

# Returns  

value of the requested thermo property or 0.0  

# 1.1. LAMMPS C Library API  

void \*lammps_last_thermo(void \*handle, const char \*what, int index)  

Access cached data from last thermo output  

Added in version $15\mathrm{Jun}2023$ .  

This function provides access to cached data from the last thermo output. This differs from lammps_get_thermo() in that it does not trigger an evaluation. Instead it provides direct access to a readonly location of the last thermo output data and the corresponding keyword strings. How to handle the return value depends on the value of the what argument string. When accessing the data from a concurrent thread while LAMMPS is running, the cache needs to be locked first and then unlocked after the data is obtained, so that the data is not corrupted while reading in case LAMMPS wants to update it at the same time. Outside of a run, the lock/unlock calls have no effect.  

<html><body><table><tr><td>Value of what</td><td>Description of return value</td><td>Data type</td><td>Uses index</td></tr><tr><td>setup</td><td>1 if setup is not completed and thus thermo data in- valid, O otherwise</td><td>pointer to int</td><td>no</td></tr><tr><td>line</td><td>line number (O-based) of current line in current file or buffer</td><td>pointer to int</td><td>no</td></tr><tr><td>imagename</td><td>file name of the last dump image file written</td><td>pointer to O-terminated const char array</td><td>no</td></tr><tr><td>step</td><td>timestep when thelast thermo output was generated or -1</td><td>pointer to bigint</td><td>no</td></tr><tr><td>num</td><td>number of fields in thermo output</td><td>pointer to int</td><td>no</td></tr><tr><td>keyword</td><td>column keyword for thermo output</td><td>pointer to O-terminated const char array</td><td>yes</td></tr><tr><td>type</td><td>data type of thermo output column; see LMP DATATYPE CONST</td><td>pointer to int</td><td>yes</td></tr><tr><td>data</td><td>actual field data for column</td><td>pointer to int, int64_t or double</td><td>yes</td></tr><tr><td>lock</td><td>acquires lock to thermo data cache</td><td>NULL pointer</td><td>no</td></tr><tr><td>unlock</td><td>releaseslockto thermodatacache</td><td>NULL pointer</td><td>no</td></tr></table></body></html>  

#  Note  

The type property points to a static location that is reassigned with every call, so the returned pointer should be recast, dereferenced, and assigned immediately. Otherwise, its value may be changed with the next invocation of the function.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • what – string with the kind of data requested • index – integer with index into data arrays, ignored for scalar data  

# Returns  

pointer to location of requested data cast to void or NULL  

void lammps_extract_box(void \*handle, double \*boxlo, double \*boxhi, double $^{*}\mathrm{xy}$ , double ${}^{*}\mathbf{y}\mathbf{Z}.$ , double ${}^{*}\mathbf{x}\mathbf{Z}.$ , int \*pflags, int \*boxflag)  

Extract simulation box parameters.  

This function (re-)initializes the simulation box and boundary information and then assign the designated data to the locations in the pointers passed as arguments. Any argument (except the first) may be a NULL pointer and then will not be assigned.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• boxlo – pointer to 3 doubles where the lower box boundary is stored   
• boxhi – pointer to 3 doubles where the upper box boundary is stored   
• xy – pointer to a double where the xy tilt factor is stored   
• yz – pointer to a double where the yz tilt factor is stored   
• xz – pointer to a double where the xz tilt factor is stored   
• pflags – pointer to 3 ints, set to 1 for periodic boundaries and 0 for non-periodic   
• boxflag – pointer to an int, which is set to 1 if the box will be changed during a simulation by a fix and 0 if not.  

void lammps_reset_box(void \*handle, double \*boxlo, double \*boxhi, double xy, double yz, double xz)  

Reset simulation box parameters.  

This function sets the simulation box dimensions (upper and lower bounds and tilt factors) from the provided data and then re-initializes the box information and all derived settings. It may only be called before atoms are created.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• boxlo – pointer to 3 doubles containing the lower box boundary   
• boxhi – pointer to 3 doubles containing the upper box boundary   
• xy – xy tilt factor   
• yz – yz tilt factor   
• xz – xz tilt factor  

void lammps_memory_usage(void \*handle, double \*meminfo)  

Get memory usage information  

Added in version 18Sep2020.  

This function will retrieve memory usage information for the current LAMMPS instance or process. The meminfo buffer will be filled with 3 different numbers (if supported by the operating system). The first is the tally (in MBytes) of all large memory allocations made by LAMMPS. This is a lower boundary of how much memory is requested and does not account for memory allocated on the stack or allocations via new. The second number is  

# 1.1. LAMMPS C Library API  

the current memory allocation of the current process as returned by a memory allocation reporting in the system library. The third number is the maximum amount of RAM (not swap) used by the process so far. If any of the two latter parameters is not supported by the operating system it will be set to zero.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • meminfo – buffer with space for at least 3 double to store data in.  

int lammps_get_mpi_comm(void \*handle)  

Return current LAMMPS world communicator as integer  

Added in version 18Sep2020.  

This will take the LAMMPS “world” communicator and convert it to an integer using $\mathrm{MPI\_Comm\_c2f()}$ , so it is equivalent to the corresponding MPI communicator in Fortran. This way it can be safely passed around between different programming languages. To convert it to the C language representation use MPI_Comm_f2c().  

If LAMMPS was compiled with MPI_STUBS, this function returns -1.  

See also lammps_open_fortran()  

# Parameters  

handle – pointer to a previously created LAMMPS instance  

# Returns  

Fortran representation of the LAMMPS world communicator int lammps_extract_setting(void \*handle, const char \*keyword)  

Query LAMMPS about global settings.  

This function will retrieve or compute global properties. In contrast to lammps_get_thermo() this function returns an int. The following tables list the currently supported keyword. If a keyword is not recognized, the function returns -1. The integer sizes functions may be called without a valid LAMMPS object handle (it is ignored).  

• Integer sizes • Image masks • System status • System sizes • Atom style flags  

# Integer sizes  

<html><body><table><tr><td>Keyword</td><td>Description / Return value</td></tr><tr><td>bigint</td><td>size of the bigint integer type, 4 or 8 bytes. Set at compile time.</td></tr><tr><td>tagint</td><td>size of the tagint integer type, 4 or 8 bytes. Set at compile time.</td></tr><tr><td>imageint</td><td>size of the imageint integer type, 4 or 8 bytes. Set at compile time.</td></tr></table></body></html>  

# Image masks  

These settings are related to how LAMMPS stores and interprets periodic images. The values are used internally by the Fortran interface and are not likely to be useful to users.  

System status   


<html><body><table><tr><td>Keyword</td><td>Description/Returnvalue</td></tr><tr><td>IMGMASK</td><td>Bit-mask used to convert image flags to a single integer</td></tr><tr><td>IMGMAX</td><td>Maximum allowed image number for a particular atom</td></tr><tr><td>IMGBITS</td><td>Bits used in image counts</td></tr><tr><td>IMG2BITS</td><td>Second bitmask used in image counts</td></tr></table></body></html>  

<html><body><table><tr><td>Keyword</td><td>Description/Returnvalue</td></tr><tr><td>dimension</td><td>Number of dimensions:2 or 3.See dimension command.</td></tr><tr><td>box_exist</td><td>1 if the simulation box is defined,Oif not.See create_box command.</td></tr><tr><td>kokkos_active</td><td>1 if the KOKKOS package is compiled in and activated, O if not. See KOKKOS package.</td></tr><tr><td>kokkos_nthreads</td><td>s Number of Kokkos threads per MPI process, O if Kokkos is not active. See KOKKOS package.</td></tr><tr><td>kokkos_ngpus</td><td>Number of Kokkos gpus per physical node, O if Kokkos is not active or no GPU support. See KOKKOS package.</td></tr><tr><td>nthreads</td><td>Number of requested OpenMP threads per MPI process for LAMMPS'execution</td></tr><tr><td>newton_bond</td><td>1 if Newton's 3rd law is applied to bonded interactions, O if not.</td></tr><tr><td>newton_pair</td><td>1 if Newton's 3rd law is applied to non-bonded interactions, O if not.</td></tr><tr><td>triclinic</td><td>1 if the the simulation box is triclinic, O if orthogonal. See change_box command.</td></tr></table></body></html>  

# Communication status  

System sizes   


<html><body><table><tr><td>Keyword</td><td>Description/Returnvalue</td></tr><tr><td>uni- verse_rank</td><td>MPI rank on LAMMPS’universe communicator (O <= universe_rank< universe_size)</td></tr><tr><td>universe_size world_rank</td><td>Number of ranks on LAMMPS’universe communicator(world_size <=universe_size)</td></tr><tr><td>world_size</td><td>MPI rank on LAMMPS’world communicator (O<= world_rank < world_size,= comm->me) Number of ranks on LAMMPS’world communicator (aka comm->nprocs)</td></tr><tr><td>comm_style comm_layout</td><td>communication style (O = BRICK, 1 = TILED) communicationlayout(O =LAYOUT_UNIFORM,1 =LAYOUT_NONUNIFORM,2=</td></tr><tr><td>comm_mode</td><td>LAYOUT_TILED)</td></tr><tr><td></td><td>communication mode (O = SINGLE, 1 = MULTI, 2 = MULTIOLD) ghost_velocity whether velocities are communicated for ghost atoms (0 = no, 1 = yes)</td></tr></table></body></html>  

<html><body><table><tr><td>Keyword</td><td>Description/Returnvalue</td></tr><tr><td>nlocal</td><td>number of “owned" atoms of the current MPI rank.</td></tr><tr><td>nghost</td><td>number of“ghost"atoms of the current MPI rank.</td></tr><tr><td>nall</td><td></td></tr><tr><td>nmax</td><td>maximum of nlocal+nghost across all MPI ranks (for per-atom data array size).</td></tr><tr><td>ntypes</td><td>number of atom types</td></tr><tr><td>nbondtypes</td><td>number of bond types</td></tr><tr><td>nangletypes</td><td>number of angle types</td></tr><tr><td>ndihedraltypes</td><td>number of dihedral types</td></tr><tr><td>nimpropertypes</td><td>number of improper types</td></tr><tr><td>nellipsoids</td><td>number of atoms thathave ellipsoid data</td></tr><tr><td>nlines</td><td>number of atoms that have line data (see pair style line/lj)</td></tr><tr><td>ntris</td><td>number of atoms thathave triangledata (seepairstyletri/lj)</td></tr><tr><td>nbodies</td><td>number of atoms thathave body data (see theBody particleHowTo)</td></tr></table></body></html>  

# Atom style flags  

<html><body><table><tr><td>Keyword</td><td>Description/Returnvalue</td></tr><tr><td>molecule_flag</td><td>g1 if the atom style includes molecular topology data. See atom_style command.</td></tr><tr><td>q_flag</td><td>1 if the atom style includes point charges. See atom_style command.</td></tr><tr><td>mu_flag</td><td>1 if the atom style includes point dipoles. See atom_style command.</td></tr><tr><td>rmass_fag</td><td>1 if the atom style includes per-atom masses, O if there are per-type masses. See atom_style command.</td></tr><tr><td>radius_flag</td><td>1 if the atom style includes a per-atom radius. See atom_style command.</td></tr><tr><td>ellipsoid_fag</td><td>1 if the atom style describes extended particles that may be ellipsoidal. See atom_style com- mand.</td></tr><tr><td>omega_flag</td><td>1 if the atom style can store per-atom rotational velocities. See atom_style command.</td></tr><tr><td>torque_flag</td><td>1 if the atom style can store per-atom torques. See atom_style command.</td></tr><tr><td>angmom_flag</td><td>1 if the atom style can store per-atom angular momentum. See atom_style command.</td></tr></table></body></html>  

# See also  

lammps_extract_global()  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • keyword – string with the name of the thermo keyword  

# Returns  

value of the queried setting or -1 if unknown  

nt lammps_extract_global_datatype(void \*handle, const char \*name)  

Get data type of internal global LAMMPS variables or arrays.  

Added in version 18Sep2020.  

This function returns an integer that encodes the data type of the global property with the specified name. See LMP_DATATYPE_CONST for valid values. Callers of lammps_extract_global() can use this information to then decide how to cast the void \* pointer and access the data.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance (unused) • name – string with the name of the extracted property  

# Returns  

integer constant encoding the data type of the property or -1 if not found.  

void \*lammps_extract_global(void \*handle, const char \*name)  

Get pointer to internal global LAMMPS variables or arrays.  

This function returns a pointer to the location of some global property stored in one of the constituent classes of a LAMMPS instance. The returned pointer is cast to void \* and needs to be cast to a pointer of the type that the entity represents. The pointers returned by this function are generally persistent; therefore it is not necessary to call the function again, unless a clear command command is issued which wipes out and recreates the contents of the LAMMPS class.  

Please also see lammps_extract_setting(), lammps_get_thermo(), and lammps_extract_box().  

The following tables list the supported names, their data types, length of the data area, and a short description. The data type can also be queried through calling lammps_extract_global_datatype(). The bigint type may be defined to be either an int or an int64_t. This is set at compile time of the LAMMPS library and can be queried through calling lammps_extract_setting(). The function lammps_extract_global_datatype() will directly report the “native” data type. The following tables are provided:  

• Timestep settings   
• Simulation box settings   
• System property settings   
• Git revision and version settings   
• Unit settings  

Timestep settings   


<html><body><table><tr><td>Name</td><td>Type</td><td>Length</td><td>Description</td></tr><tr><td>dt</td><td>double</td><td>1</td><td>length of the time step.See timestep command.</td></tr><tr><td>ntimestep</td><td>bigint</td><td>1</td><td>current time step number. See reset_timestep command.</td></tr><tr><td>atime</td><td>double</td><td>1</td><td>accumulated simulation time in time units.</td></tr><tr><td>atimestep</td><td>bigint</td><td>一</td><td>the number of the timestep when “atime' was last updated.</td></tr><tr><td>respa_levels</td><td>int</td><td>1</td><td>Nrespa a = number of r-RESPA levels. See run_style command.</td></tr><tr><td>respa_dt</td><td>double</td><td>Nrespa</td><td>length of the time steps with r-RESPA. See run_style command.</td></tr></table></body></html>  

# Simulation box settings  

<html><body><table><tr><td>Name</td><td>Type</td><td>Length</td><td>Description</td></tr><tr><td>boxxhi</td><td>double</td><td>1</td><td>upper box boundary in x-direction; see create_box command.</td></tr><tr><td>boxylo</td><td>double</td><td>1</td><td>lower box boundary in y-direction; see create_box command.</td></tr><tr><td>boxyhi</td><td>double</td><td>1</td><td>upper box boundary in y-direction; see create_box command.</td></tr><tr><td>boxzlo</td><td>double</td><td>1</td><td>lower box boundary in z-direction; see create_box command.</td></tr><tr><td>boxzhi</td><td>double</td><td></td><td>upper box boundary in z-direction; see create_box command.</td></tr><tr><td>sublo</td><td>double</td><td>3</td><td>subboxlowerboundaries</td></tr><tr><td>subhi</td><td>double</td><td>3</td><td>subboxupperboundaries</td></tr><tr><td>sublo_lambda</td><td>double</td><td>3</td><td>subbox lower boundaries in fractional coordinates (for triclinic cells)</td></tr><tr><td>subhi_lambda</td><td>double</td><td>3</td><td>subbox upper boundaries in fractional coordinates (for triclinic cells)</td></tr><tr><td>periodicity</td><td>int</td><td>3</td><td>O if non-periodic, 1 if periodic for x, y, and z; see boundary command.</td></tr><tr><td>triclinic</td><td>int</td><td>1</td><td>1 if box is triclinic, O if orthogonal; see change_box command.</td></tr><tr><td>xy</td><td>double</td><td>1</td><td>triclinic tilt factor; see Triclinic (non-orthogonal) simulation boxes.</td></tr><tr><td>yz</td><td>double</td><td></td><td>triclinic tilt factor; see Triclinic (non-orthogonal) simulation boxes.</td></tr><tr><td>XZ</td><td>double</td><td></td><td>triclinic tilt factor; see Triclinic (non-orthogonal) simulation boxes.</td></tr><tr><td>xlattice</td><td>double</td><td></td><td>lattice spacing in x-direction; see lattice command.</td></tr><tr><td>ylattice</td><td>double</td><td></td><td>lattice spacing in y-direction; see lattice command.</td></tr><tr><td>zlattice</td><td>double</td><td>1</td><td>lattice spacing in z-direction; see lattice command.</td></tr><tr><td>procgrid</td><td>int</td><td>3</td><td>processor count in x-, y-, and z- direction; see processors command.</td></tr></table></body></html>  

# System property settings  

<html><body><table><tr><td>Name</td><td>Type</td><td>Length</td><td>Description</td></tr><tr><td>ntypes</td><td>int</td><td>1</td><td>number of atom types</td></tr><tr><td>nbonds</td><td>bigint</td><td>1</td><td>total number of bonds in the simulation.</td></tr><tr><td>nangles</td><td>bigint</td><td>1</td><td>total number of angles in the simulation.</td></tr><tr><td>ndihedrals</td><td>bigint</td><td>1</td><td>total number of dihedrals in the simulation.</td></tr><tr><td>nimpropers</td><td>bigint</td><td>1</td><td>total number of impropers in the simulation.</td></tr><tr><td>natoms</td><td>bigint</td><td>1</td><td>total number of atoms in the simulation.</td></tr><tr><td>nlocal</td><td>int</td><td>1</td><td>number of “owned" atoms of the current MPI rank.</td></tr><tr><td>nghost</td><td>int</td><td>1</td><td>number of “ghost" atoms of the current MPI rank.</td></tr><tr><td>nmax</td><td>int</td><td>1</td><td>maximum of nlocal+nghost across all MPI ranks (for per-atom data array size).</td></tr><tr><td>special_lj</td><td>double</td><td>4</td><td>special pair weighting factors for LJ interactions (first element is always 1.0)</td></tr><tr><td>special_coul</td><td>double</td><td>4</td><td>special pair weighting factors for Coulomb interactions (first element is always 1.0)</td></tr><tr><td>map_style</td><td>int</td><td>1</td><td>atom map setting: 0 = none, 1 = array, 2 = hash, 3 = yes</td></tr><tr><td>map_tag_max</td><td>int/bigint</td><td>1</td><td>largest atom ID that can be mapped to a local index (bigint with -DLAMMPS_BIGBIG)</td></tr><tr><td>sametag</td><td>int</td><td>variable</td><td>index of next local atom with the same ID in ascending order. -1 signals end.</td></tr><tr><td>sortfreq</td><td>int</td><td>1</td><td>frequency of atom sorting. O means sorting is off.</td></tr><tr><td>nextsort</td><td>bigint</td><td>1</td><td>timestep when atoms are sorted next</td></tr><tr><td>q_flag</td><td>int</td><td>1</td><td>deprecated. Use lammps _extract_setting() instead.</td></tr><tr><td>atom_style</td><td>char *</td><td>1</td><td>string with the current atom style.</td></tr><tr><td>pair_style</td><td>char *</td><td>1</td><td>string with the current pair style.</td></tr><tr><td>bond_style</td><td>char *</td><td>1</td><td>string with the current bond style.</td></tr><tr><td>angle_style</td><td>char *</td><td>1</td><td>string with the current angle style.</td></tr><tr><td>dihedral_style</td><td>char *</td><td>1</td><td>string with the current dihedral style.</td></tr><tr><td>improper_style</td><td>char *</td><td>1</td><td>string with the current improper style.</td></tr><tr><td>kspace_style</td><td>char *</td><td>1</td><td>string with the current KSpace style.</td></tr></table></body></html>  

# Git revision and version settings  

Unit settings   


<html><body><table><tr><td>Name</td><td>Type</td><td>Length</td><td>Description</td></tr><tr><td>git_commit</td><td>constchar*</td><td>1</td><td>Git commit hash for the LAMMPS version.</td></tr><tr><td>git_branch</td><td>constchar*</td><td>1</td><td>GitbranchfortheLAMMPSversion.</td></tr><tr><td>git_descriptor</td><td>constchar*</td><td>1</td><td>Combined descriptor for the git revision</td></tr><tr><td>lammps_version</td><td>const char</td><td>1</td><td>LAMMPS version string.</td></tr></table></body></html>  

<html><body><table><tr><td>Name</td><td>Type</td><td>Length</td><td>Description</td></tr><tr><td>units</td><td>char *</td><td>1</td><td>string with the current unit style. See units command.</td></tr><tr><td>boltz</td><td>double</td><td>1</td><td>value of the “boltz"constant. See units command.</td></tr><tr><td>hplanck</td><td>double</td><td>1</td><td>value of the “hplanck' constant. See units command.</td></tr><tr><td>mvv2e</td><td>double</td><td>1</td><td>factor to convert ↓mv2 for a particle to the current energy unit; See unitscommand.</td></tr><tr><td>ftm2v</td><td>double</td><td>1</td><td>(description missing) See units command.</td></tr><tr><td>mv2d</td><td>double</td><td>1</td><td>(description missing) See units command.</td></tr><tr><td>nktv2p</td><td>double</td><td>1</td><td>(description missing) See units command.</td></tr><tr><td>qqr2e</td><td>double</td><td>1</td><td>factortoconvert</td></tr><tr><td>qe2f</td><td>double</td><td>1</td><td>(description missing) See units command.</td></tr><tr><td>vxmu2f</td><td>double</td><td>1</td><td>(description missing) See units command.</td></tr><tr><td>xxt2kmu</td><td>double</td><td>1</td><td>(description missing) See units command.</td></tr><tr><td>dielectric</td><td>double</td><td>1</td><td>value of thedielectric constant.Seedielectriccommand.</td></tr><tr><td>qqrd2e</td><td>double</td><td>1</td><td>(description missing) See units command.</td></tr><tr><td>e_mass</td><td>double</td><td>1</td><td>(description missing) See units command.</td></tr><tr><td>hhmrr2e</td><td>double</td><td>1</td><td>(description missing) See units command.</td></tr><tr><td>mvh2r</td><td>double double</td><td>1</td><td>(description missing) See units command.</td></tr><tr><td>angstrom</td><td></td><td>1</td><td>constant to convert current length unit to angstroms; 1.0 for reduced (aka "lj"') units. See units command.</td></tr><tr><td>femtosecond</td><td>double</td><td>1</td><td>duced (aka “lj") units</td></tr><tr><td>qelectron</td><td>double</td><td>1</td><td>(description missing) See units command.</td></tr></table></body></html>  

![](images/c665c9509eafc08f0f83db84fbcc04f9cc7ac640a6b485adf658eb1f4b9adc33.jpg)  

# Warning  

Modifying the data in the location pointed to by the returned pointer may lead to inconsistent internal data and thus may cause failures or crashes or bogus simulations. In general it is thus usually better to use a LAMMPS input command that sets or changes these parameters. Those will take care of all side effects and necessary updates of settings derived from such settings. Where possible, a reference to such a command or a relevant section of the manual is given below.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • name – string with the name of the extracted property  

# Returns  

pointer (cast to void \*) to the location of the requested property. NULL if name is not known.  

int lammps_extract_pair_dimension(void \*handle, const char \*name)  

Get data dimension of pair style data accessible via Pair::extract().  

Added in version 29Aug2024.  

This function returns an integer that specified the dimensionality of the data that can be extracted from the current pair style with Pair::extract(). Callers of lammps_extract_pair() can use this information to then decide how to cast the void \* pointer and access the data.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance name – string with the name of the extracted property  

# Returns  

integer constant encoding the dimensionality of the extractable pair style property or $^-1$ if not found.  

void \*lammps_extract_pair(void \*handle, const char \*name)  

Get extract pair style data accessible via Pair::extract().  

Added in version 29Aug2024.  

This function returns a pointer to data available from the current pair style with Pair::extract(). The dimensionality of the returned pointer can be determined with lammps_extract_pair_dimension().  

# Parameters  

• handle – pointer to a previously created LAMMPS instance name – string with the name of the extracted property  

# Returns  

pointer (cast to void \*) to the location of the requested property. NULL if name is not known.  

int lammps_map_atom(void \*handle, const void \*id)  

Map global atom ID to local atom index  

Added in version 27June2024.  

This function returns an integer that corresponds to the local atom index for an atom with the global atom ID id.   
The atom ID is passed as a void pointer so that it can use the same interface for either a 32-bit or 64-bit tagint.   
The size of the tagint can be determined using lammps_extract_setting().  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • id – void pointer to the atom ID (of data type tagint, i.e. 32-bit or 64-bit integer)  

# Returns  

local atom index or -1 if the atom is not found or no map exists  

# 1.1.4 Per-atom properties  

This section documents the following functions:  

• lammps_extract_atom_datatype()• lammps_extract_atom_size()• lammps_extract_atom()  

# 1.1. LAMMPS C Library API  

int lammps_extract_atom_datatype(void \*handle, const char \*name)  

Get data type of a LAMMPS per-atom property  

Added in version 18Sep2020.  

This function returns an integer that encodes the data type of the per-atom property with the specified name. See LMP_DATATYPE_CONST for valid values. Callers of lammps_extract_atom() can use this information to decide how to cast the void \* pointer and access the data. In addition, lammps_extract_atom_size() can be used to get information about the vector or array dimensions.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance name – string with the name of the extracted property  

# Returns  

integer constant encoding the data type of the property or -1 if not found.  

int lammps_extract_atom_size(void \*handle, const char \*name, int type)  

Get dimension info of a LAMMPS per-atom property  

Added in version 19Nov2024.  

This function returns an integer with the size of the per-atom property with the specified name. This allows to accurately determine the size of the per-atom data vectors or arrays. For per-atom arrays, the type argument is required to return either the number of rows or the number of columns. It is ignored for per-atom vectors.  

Callers of lammps_extract_atom() can use this information in combination with the result from lammps_extract_atom_datatype() to decide how to cast the void \* pointer and access the data.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – string with the name of the extracted property   
• type – either LMP_SIZE_ROWS or LMP_SIZE_COLS if name refers to a per-atom array otherwise ignored  

# Returns  

integer with the size of the vector or array dimension or -1 void \*lammps_extract_atom(void \*handle, const char \*name)  

Get pointer to a LAMMPS per-atom property.  

This function returns a pointer to the location of per-atom properties (and per-atom-type properties in the case of the ‘mass’ keyword). Per-atom data is distributed across sub-domains and thus MPI ranks. The returned pointer is cast to void \* and needs to be cast to a pointer of data type that the entity represents. You can use the functions lammps_extract_atom_datatype() and lammps_extract_atom_size() to determine data type, dimensions and sizes of the storage pointed to by the returned pointer.  

A table with supported keywords is included in the documentation of the Atom::extract() function.  

![](images/12b390adef0496f6ff56d1e6a4a2ab18facf79a6251ffb7fbb81dcc3c34fbc27.jpg)  

# Warning  

The pointers returned by this function are generally not persistent since per-atom data may be re-distributed, re-allocated, and re-ordered at every re-neighboring operation.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • name – string with the name of the extracted property  

# Returns  

pointer (cast to void \*) to the location of the requested data or NULL if not found.  

# 1.1.5 Computes, fixes, variables  

This section documents accessing or modifying data stored by computes, fixes, or variables in LAMMPS using the following functions:  

• lammps_extract_compute()   
• lammps_extract_fix()   
• lammps_extract_variable_datatype()   
• lammps_extract_variable()   
• lammps_set_variable()   
• lammps_set_string_variable()   
• lammps_set_internal_variable()   
• lammps_variable_info()   
• lammps_eval()   
• lammps_clearstep_compute()   
• lammps_addstep_compute_all()   
• lammps_addstep_compute()  

void \*lammps_extract_compute(void \*handle, const char $^{\mathrm{*}}\mathrm{i}\mathrm{d}$ , int style, int type)  

Get pointer to data from a LAMMPS compute.  

This function returns a pointer to the location of data provided by a compute command instance identified by the compute-ID. Computes may provide global, per-atom, or local data, and those may be a scalar, a vector, or an array or they may provide the information about the dimensions of the respective data. Since computes may provide multiple kinds of data, it is required to set style and type flags representing what specific data is desired. This also determines to what kind of pointer the returned pointer needs to be cast to access the data correctly. The function returns NULL if the compute ID is not found or the requested data is not available or current. The following table lists the available options.  

<html><body><table><tr><td>Style (see Type LMP STYLE CONS</td><td>(see LMP_TYPE_CONS type</td><td>Returned</td><td>Returned data</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_TYPE_SCALAR</td><td>double *</td><td>Global scalar</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_TYPE_VECTOR</td><td>double *</td><td>Global vector</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_TYPE_ARRAY</td><td>double **</td><td>Global array</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_SIZE_VECTOR</td><td>int *</td><td>Length of global vector</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_SIZE_ROWS</td><td>int *</td><td>Rows of global array</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_SIZE_COLS</td><td>int *</td><td>Columns of global array</td></tr><tr><td>LMP_STYLE_ATOM</td><td>LMP_TYPE_VECTOR</td><td>double *</td><td>Per-atom value</td></tr><tr><td>LMP_STYLE_ATOM</td><td>LMP_TYPE_ARRAY</td><td>double **</td><td>Per-atom vector</td></tr><tr><td>LMP_STYLE_ATOM</td><td>LMP_SIZE_COLS</td><td>int *</td><td>Columns in per-atom array, O if vector</td></tr><tr><td>LMP_STYLE_LOCAL</td><td>LMP_TYPE_VECTOR</td><td>double *</td><td>Local data vector</td></tr><tr><td>LMP STYLE LOCAL</td><td>LMPTYPEARRAY</td><td>double **</td><td>Local data array</td></tr><tr><td>LMP_STYLE_LOCAL</td><td>LMP_SIZE_VECTOR</td><td>int *</td><td>AliasforLMP_SIZE_ROWS</td></tr><tr><td>LMP_STYLE_LOCAL</td><td>LMP_SIZE_ROWS</td><td>int *</td><td>Number of local array rows or length</td></tr><tr><td>LMP_STYLE_LOCAL</td><td>LMP_SIZE_COLS</td><td>int *</td><td>of vector Number of local array columns, O if vector</td></tr></table></body></html>  

# Note  

If the compute’s data is not computed for the current step, the compute will be invoked. LAMMPS cannot easily check at that time, if it is valid to invoke a compute, so it may fail with an error. The caller has to check to avoid such an error.  

# o Warning  

The pointers returned by this function are generally not persistent since the computed data may be redistributed, re-allocated, and re-ordered at every invocation. It is advisable to re-invoke this function before the data is accessed, or make a copy if the data shall be used after other LAMMPS commands have been issued.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• id – string with ID of the compute   
• style – constant indicating the style of data requested (global, per-atom, or local)   
• type – constant indicating type of data (scalar, vector, or array) or size of rows or columns  

# Returns  

pointer (cast to void \*) to the location of the requested data or NULL if not found.  

void \*lammps_extract_fix(void \*handle, const char $^{\mathrm{*}}\mathrm{i}\mathrm{d}$ , int style, int type, int nrow, int ncol) Get pointer to data from a LAMMPS fix.  

This function returns a pointer to data provided by a fix command instance identified by its fix-ID. Fixes may provide global, per-atom, or local data, and those may be a scalar, a vector, or an array, or they may provide the information about the dimensions of the respective data. Since individual fixes may provide multiple kinds of data, it is required to set style and type flags representing what specific data is desired. This also determines to what kind of pointer the returned pointer needs to be cast to access the data correctly. The function returns NULL if the fix ID is not found or the requested data is not available.  

The following table lists the available options.  

<html><body><table><tr><td>Style (see Type LMP STYLE CONS LMP TYPE</td><td>(see Returned _CONS type</td><td>Returned data</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_TYPE_SCALAR double *</td><td>Copy of global scalar</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_TYPE_VECTOR double *</td><td>Copy of global vector element at index</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_TYPE_ARRAY double *</td><td>nrow Copy of global array element at nrow,</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_SIZE_VECTOR</td><td>ncol int * Length of global vector</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_SIZE_ROWS int *</td><td>Rows in global array</td></tr><tr><td>LMP_STYLE_GLOBAL</td><td>LMP_SIZE_COLS int *</td><td>Columns in global array</td></tr><tr><td>LMP_STYLE_ATOM</td><td>LMP_TYPE_VECTOR</td><td>double * Per-atom value</td></tr><tr><td>LMP_STYLE_ATOM</td><td>LMP_TYPE_ARRAY double **</td><td>Per-atom vector</td></tr><tr><td>LMP_STYLE_ATOM</td><td>LMP_SIZE_COLS int *</td><td>Columns of per-atom array, O if vector</td></tr><tr><td>LMP_STYLE_LOCAL</td><td>LMP_TYPE_VECTOR double *</td><td>Local data vector</td></tr><tr><td>LMP_STYLE_LOCAL</td><td>LMP_TYPE_ARRAY double **</td><td>Local data array</td></tr><tr><td>LMP_STYLE_LOCAL LMP_STYLE_LOCAL</td><td>LMP_SIZE_ROWS int * int *</td><td>Number of local data rows</td></tr><tr><td></td><td>LMP_SIZE_COLS</td><td>Number of local data columns</td></tr></table></body></html>  

#  Note  

When requesting global data, the fix data can only be accessed one item at a time without access to the pointer itself. Thus this function will allocate storage for a single double value, copy the returned value to it, and returns a pointer to the location of the copy. Therefore the allocated storage needs to be freed after its use to avoid a memory leak. Example:  

double \*dptr = (double \*) lammps_extract_fix(handle, name, LMP_STYLE_GLOBAL, LMP_TYPE_VECTOR, 0, 0);   
double value = \*dptr;   
lammps_free((void \*)dptr);  

# Note  

LAMMPS cannot easily check if it is valid to access the data, so it may fail with an error. The caller has to avoid such an error.  

![](images/0fea99ad4e0ed70b2f7739cb3efdc1a49426ebd91273d51a20ae3e84585e1c06.jpg)  

# Warning  

The pointers returned by this function for per-atom or local data are generally not persistent, since the computed data may be re-distributed, re-allocated, and re-ordered at every invocation of the fix. It is thus advisable to re-invoke this function before the data is accessed, or make a copy, if the data shall be used after other  

LAMMPS commands have been issued.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• id – string with ID of the fix   
• style – constant indicating the style of data requested (global, per-atom, or local)   
• type – constant indicating type of data (scalar, vector, or array) or size of rows or columns   
• nrow – row index (only used for global vectors and arrays)   
• ncol – column index (only used for global arrays)  

# Returns  

pointer (cast to void \*) to the location of the requested data or NULL if not found.  

int lammps_extract_variable_datatype(void \*handle, const char \*name)  

Get data type of a LAMMPS variable.  

Added in version 3Nov2022.  

This function returns an integer that encodes the data type of the variable with the specified name. See LMP_VAR_CONST for valid values. Callers of lammps_extract_variable() can use this information to decide how to cast the void \* pointer and access the data.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance name – string with the name of the extracted variable  

# Returns  

integer constant encoding the data type of the property or -1 if not found.  

void \*lammps_extract_variable(void \*handle, const char \*name, const char \*group)  

Get pointer to data from a LAMMPS variable.  

This function returns a pointer to data from a LAMMPS variable command identified by its name. When the variable is either an equal-style compatible variable, a vector-style variable, or an atom-style variable, the variable is evaluated and the corresponding value(s) returned. Variables of style internal are compatible with equal-style variables and so are python-style variables, if they return a numeric value. For other variable styles, their string value is returned. The function returns NULL when a variable of the provided name is not found or of an incompatible style. The group argument is only used for atom-style variables and ignored otherwise, with one exception: for style vector, if group is “GET_VECTOR_SIZE”, the returned pointer will yield the length of the vector to be returned when dereferenced. This pointer must be deallocated after the value is read to avoid a memory leak. If group is set to NULL when extracting data from an atom-style variable, the group is assumed to be “all”.  

When requesting data from an equal-style or compatible variable this function allocates storage for a single double value, copies the returned value to it, and returns a pointer to the location of the copy. Therefore the allocated storage needs to be freed after its use to avoid a memory leak. Example:  

double \*dptr = (double \*) lammps_extract_variable(handle, name, NULL);   
double value = \*dptr;   
lammps_free((void \*)dptr);  

For atom-style variables, the return value is a pointer to an allocated block of storage of double of the length atom- $\cdot>$ nlocal. Since the data returned are a copy, the location will persist, but its content will not be updated in case the variable is re-evaluated. To avoid a memory leak, this pointer needs to be freed after use in the calling program.  

For vector-style variables, the returned pointer points to actual LAMMPS data and thus it should not be deallocated. Its length depends on the variable, compute, or fix data used to construct the vector-style variable. This length can be fetched by calling this function with group set to a non-NULL pointer (NULL returns the vector). In that case it will return the vector length as an allocated int pointer cast to a void \* pointer. That pointer can be recast and dereferenced to an integer yielding the length of the vector. This pointer must be deallocated when finished with it to avoid memory leaks. Example:  

double \*vectvals = (double \*) lammps_extract_variable(handle, name, NULL);   
int ${}^{*}\mathrm{intptr}=(\mathrm{int}^{*})$ ) lammps_extract_variable(handle, name, 1);   
int vectlen $=*$ intptr;   
lammps_free((void \*)intptr);  

For other variable styles the returned pointer needs to be cast to a char pointer and it should not be deallocated. Example:  

const char \*cptr = (const char \*) lammps_extract_variable(handle,name,NULL);   
printf("The value of variable $\mathrm{\mathit{\Omega}{}_{\mathrm{{/os}}}}$ is $\%\mathrm{s}\backslash\mathrm{n}^{\prime\prime}$ , name, cptr);  

# Note  

LAMMPS cannot easily check if it is valid to access the data referenced by the variables (e.g., computes, fixes, or thermodynamic info), so it may fail with an error. The caller has to make certain that the data is extracted only when it safe to evaluate the variable and thus an error or crash are avoided.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – name of the variable   
• group – group-ID for atom style variable or NULL or non-NULL to get vector length  

# Returns  

pointer (cast to void \*) to the location of the requested data or NULL if not found.  

int lammps_set_variable(void \*handle, const char \*name, const char \*str)  

Set the value of a string-style variable.  

Deprecated since version 7Feb2024.  

This function assigns a new value from the string str to the string-style variable name. This is a way to directly change the string value of a LAMMPS variable that was previous defined with a variable name string command without using any LAMMPS commands to delete and redefine the variable.  

Returns -1 if a variable of that name does not exist or if it is not a string-style variable, otherwise 0.  

# 1.1. LAMMPS C Library API  

![](images/940e176bf1303f03eedeb526a5165c7cded78276a459debd4e168c8e7b64e84d.jpg)  

# Warning  

This function is deprecated and lammps_set_string_variable() should be used instead.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – name of the variable   
• str – new value of the variable  

# Returns  

0 on success or -1 on failure  

int lammps_set_string_variable(void \*handle, const char \*name, const char $^{*}\mathrm{str}$ )  

Set the value of a string-style variable.  

Added in version 7Feb2024.  

This function assigns a new value from the string str to the string-style variable name. This is a way to directly change the string value of a LAMMPS variable that was previous defined with a variable name string command without using any LAMMPS commands to delete and redefine the variable.  

Returns -1 if a variable of that name does not exist or if it is not a string-style variable, otherwise 0.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – name of the variable   
• str – new value of the variable  

# Returns  

0 on success or -1 on failure  

int lammps_set_internal_variable(void \*handle, const char \*name, double value)  

Set the value of an internal-style variable.  

Added in version 7Feb2024.  

This function assigns a new value from the floating point number value to the internal-style variable name. This is a way to directly change the numerical value of such a LAMMPS variable that was previous defined with a variable name internal command without using any LAMMPS commands to delete and redefine the variable.  

Returns -1 if a variable of that name does not exist or is not an internal-style variable, otherwise 0.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – name of the variable   
• value – new value of the variable  

# Returns  

0 on success or -1 on failure  

int lammps_variable_info(void \*handle, int idx, char \*buf, int bufsize)  

Retrieve informational string for a variable.  

Added in version 21Nov2023.  

This function copies a string with human readable information about a defined variable: name, style, current value(s) into the provided C-style string buffer. That is the same info as produced by the info variables command. The length of the buffer must be provided as buf_size argument. If the info exceeds the length of the buffer, it will be truncated accordingly. If the index is out of range, the function returns 0 and buffer is set to an empty string, otherwise 1.  

# Parameters  

• handle – pointer to a previously created LAMMPS instance cast to void \*. • idx – index of the variable $\mathrm{0<=id{x}<n v a r}.$ )   
• buffer – string buffer to copy the info to   
• buf_size – size of the provided string buffer  

# Returns  

1 if successful, otherwise 0  

double lammps_eval(void \*handle, const char \*expr)  

Evaluate an immediate variable expression  

Added in version 4Feb2025.  

This function takes a string with an expression that can be used for equal style variables, evaluates it and returns the resulting (scalar) value as a floating point number.  

See also lammps_expand()  

# Parameters  

• handle – pointer to a previously created LAMMPS instance cast to void \*. expr – string with expression  

# Returns  

result from expression  

void lammps_clearstep_compute(void \*handle)  

Clear whether a compute has been invoked.  

Added in version 4Feb2025: This function clears the invoked flag of all computes. Called everywhere that computes are used, before computes are invoked. The invoked flag is used to avoid re-invoking same compute multiple times and to flag computes that store invocation times as having been invoked  

# See also  

lammps_addstep_compute_all() lammps_addstep_compute()  

# Parameters  

handle – pointer to a previously created LAMMPS instance cast to void \*.  

void lammps_addstep_compute_all(void \*handle, void \*nextstep)  

Add next timestep to all computes  

Added in version 4Feb2025: loop over all computes schedule next invocation for those that store invocation times called when not sure what computes will be needed on newstep do not loop only over n_timeflag, since may not be set yet  

# See also  

lammps_clearstep_compute() lammps_addstep_compute()  

# Parameters  

• handle – pointer to a previously created LAMMPS instance cast to void \*. • newstep – pointer to bigint of next timestep the compute will be invoked  

void lammps_addstep_compute(void \*handle, void \*nextstep) Add next timestep to compute if it has been invoked in the current timestep  

Added in version 4Feb2025: loop over computes that store invocation times if its invoked flag set on this timestep, schedule next invocation called everywhere that computes are used, after computes are invoked  

See also lammps_addstep_compute_all() lammps_clearstep_compute()  

# Parameters  

• handle – pointer to a previously created LAMMPS instance cast to void \*. • newstep – next timestep the compute will be invoked  

enum LAMMPS_NS::multitype::_LMP_DATATYPE_CONST  

Data type constants for extracting data from atoms, computes and fixes  

This enum must be kept in sync with the corresponding enum or constants in python/lammps/ constants.py, fortran/lammps.f90, tools/swig/lammps.i, src/library.h, and examples/COUPLE/plugin/ liblammpsplugin.h  

Values:  

enumerator LAMMPS_NONE no data type assigned (yet)   
enumerator LAMMPS_INT 32-bit integer (array)   
enumerator LAMMPS_INT_2D two-dimensional 32-bit integer array   
enumerator LAMMPS_DOUBLE 64-bit double (array)   
enumerator LAMMPS_DOUBLE_2D two-dimensional 64-bit double array   
enumerator LAMMPS_INT64 64-bit integer (array)   
enumerator LAMMPS_INT64_2D two-dimensional 64-bit integer array   
enumerator LAMMPS_STRING C-String  

enum _LMP_STYLE_CONST  

Style constants for extracting data from computes and fixes.  

Must be kept in sync with the equivalent constants in python/lammps/constants.py, fortran/lammps.f90, tools/swig/lammps.i, and examples/COUPLE/plugin/liblammpsplugin.h  

Values:   
enumerator LMP_STYLE_GLOBAL return global data   
enumerator LMP_STYLE_ATOM return per-atom data   
enumerator LMP_STYLE_LOCAL return local data  

enum _LMP_TYPE_CONST  

Type and size constants for extracting data from computes and fixes.  

Must be kept in sync with the equivalent constants in python/lammps/constants.py, fortran/lammps.f90, tools/swig/lammps.i, and examples/COUPLE/plugin/liblammpsplugin.h  

Values:   
enumerator LMP_TYPE_SCALAR return scalar   
enumerator LMP_TYPE_VECTOR return vector   
enumerator LMP_TYPE_ARRAY return array   
enumerator LMP_SIZE_VECTOR return length of vector   
enumerator LMP_SIZE_ROWS return number of rows   
enumerator LMP_SIZE_COLS return number of columns  

enum _LMP_VAR_CONST  

Variable style constants for extracting data from variables.  

Must be kept in sync with the equivalent constants in python/lammps/constants.py, fortran/lammps.f90, tools/swig/lammps.i, and examples/COUPLE/plugin/liblammpsplugin.h  

Values:  

enumerator LMP_VAR_EQUAL compatible with equal-style variables   
enumerator LMP_VAR_ATOM compatible with atom-style variables   
enumerator LMP_VAR_VECTOR compatible with vector-style variables   
enumerator LMP_VAR_STRING return value will be a string (catch-all)  

# 1.1.6 Scatter/gather operations  

This section has functions which gather per-atom data from one or more processors into a contiguous global list ordered by atom ID. The same list is returned to all calling processors. It also contains functions which scatter per-atom data from a contiguous global list across the processors that own those atom IDs. It also has a create_atoms() function which can create new atoms by scattering them appropriately to owning processors in the LAMMPS spatial decomposition.  

It documents the following functions:  

• lammps_gather_atoms()   
• lammps_gather_atoms_concat()   
• lammps_gather_atoms_subset()   
• lammps_scatter_atoms()   
• lammps_scatter_atoms_subset()   
• lammps_gather_bonds()   
• lammps_gather_angles()   
• lammps_gather_dihedrals()   
• lammps_gather_impropers()   
• lammps_gather()   
• lammps_gather_concat()   
• lammps_gather_subset()   
• lammps_scatter()   
• lammps_scatter_subset()   
• lammps_create_atoms()  

void lammps_gather_atoms(void \*handle, const char \*name, int type, int count, void \*data) Gather the named atom-based entity for all atoms across all processes, in order.  

This subroutine gathers data for all atoms and stores them in a one-dimensional array allocated by the user. The data will be ordered by atom ID, which requires consecutive atom IDs (1 to natoms). If you need a similar array but have non-consecutive atom IDs, see lammps_gather_atoms_concat(); for a similar array but for a subset of atoms, see lammps_gather_atoms_subset().  

The data array will be ordered in groups of count values, sorted by atom ID (e.g., if name is $x$ and $c o u n t=$ 3, then d $a t a=\mathrm{x}[0][0]$ , x[0][1], x[0][2], x[1][0], x[1][1], x[1][2], x[2][0], . . .); data must be pre-allocated by the caller to length $(c o u n t\times n a t o m s)$ , as queried by lammps_get_natoms(), lammps_extract_global(), or lammps_extract_setting().  

# Restrictions  

This function is not compatible with -DLAMMPS_BIGBIG.  

Atom IDs must be defined and consecutive.  

The total number of atoms must not be more than 2147483647 (max 32-bit signed int).  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – desired quantity (e.g., $x$ or charge)   
• type – 0 for int values, 1 for double values   
• count – number of per-atom values (e.g., 1 for type or charge, 3 for $x$ or $f$ ); use count $=3$ with image if you want a single image flag unpacked into $(x,y,z)$ components.   
• data – per-atom values packed in a 1-dimensional array of length natoms \* count.  

void lammps_gather_atoms_concat(void \*handle, const char \*name, int type, int count, void \*data) Gather the named atom-based entity for all atoms across all processes, unordered.  

This subroutine gathers data for all atoms and stores them in a one-dimensional array allocated by the user. The data will be a concatenation of chunks from each processor’s owned atoms, in whatever order the atoms are in on each processor. This process has no requirement that the atom IDs be consecutive. If you need the ID of each atom, you can do another lammps_gather_atoms_concat() call with name set to id. If you have consecutive IDs and want the data to be in order, use lammps_gather_atoms(); for a similar array but for a subset of atoms, use lammps_gather_atoms_subset().  

The data array will be in groups of count values, with natoms groups total, but not in order by atom ID (e.g., if name is $x$ and count is 3, then data might be something like x[10][0], x[10][1], x[10][2], x[2][0], x[2][1], x[2][2], x[4][0], . . .); data must be pre-allocated by the caller to length $(c o u n t\times n a t o m s)$ , as queried by lammps_get_natoms(), lammps_extract_global(), or lammps_extract_setting().  

![](images/d42628ae0c87b1af4230884aff44997e1f834d446a57a1aaea589a96067c9ccf.jpg)  

# Restrictions  

This function is not compatible with -DLAMMPS_BIGBIG.  

Atom IDs must be defined.  

The total number of atoms must not be more than 2147483647 (max 32-bit signed int).  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – desired quantity (e.g., $x$ or charge\ )   
• type – 0 for int values, 1 for double values   
• count – number of per-atom values (e.g., 1 for type or charge, 3 for $x$ or $f$ ); use count $=3$ with “image” if you want single image flags unpacked into $(x,y,z)$   
• data – per-atom values packed in a 1-dimensional array of length natoms \* count.  

void lammps_gather_atoms_subset(void \*handle, const char \*name, int type, int count, int ndata, int \*ids, void \*data)  

Gather the named atom-based entity for a subset of atoms.  

This subroutine gathers data for the requested atom IDs and stores them in a one-dimensional array allocated by the user. The data will be ordered by atom ID, but there is no requirement that the IDs be consecutive. If you wish to return a similar array for all the atoms, use lammps_gather_atoms() or lammps_gather_atoms_concat().  

The data array will be in groups of count values, sorted by atom ID in the same order as the array ids (e.g., if name is $x.$ , $c o u n t=3$ , and $i d s$ is {100, 57, 210}, then data might look like $\lbrace\mathrm{x}[100][0]$ , x[100][1], x[100][2], x[57][0], x[57][1], x[57][2], $\mathrm{x}[210][0],\dots.$ ; ids must be provided by the user with length ndata, and data must be pre-allocated by the caller to length $(c o u n t\times n d a t a)$ .  

![](images/9eda6a41cb7d0d36eccccca86fdfec21b16684b69960e1c95593af8cf339966a.jpg)  

# Restrictions  

This function is not compatible with -DLAMMPS_BIGBIG.  

Atom IDs must be defined and an atom map must be enabled  

The total number of atoms must not be more than 2147483647 (max 32-bit signed int).  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – desired quantity (e.g., $x$ or charge)   
• type – 0 for int values, 1 for double values   
• count – number of per-atom values (e.g., 1 for type or charge, 3 for $x$ or $f$ ); use count $=3$ with “image” if you want single image flags unpacked into $(x,y,z)$   
• ndata – number of atoms for which to return data (can be all of them)   
• ids – list of ndata atom IDs for which to return data   
• data – per-atom values packed in a 1-dimensional array of length ndata \* count.  

oid lammps_scatter_atoms(void \*handle, const char \*name, int type, int count, void \*data)  

Scatter the named atom-based entities in data to all processes.  

This subroutine takes data stored in a one-dimensional array supplied by the user and scatters them to all atoms on all processes. The data must be ordered by atom ID, with the requirement that the IDs be consecutive. Use lammps_scatter_atoms_subset() to scatter data for some (or all) atoms, unordered.  

The data array needs to be ordered in groups of count values, sorted by atom ID (e.g., if name is $x$ and $c o u n t=$ 3, then data $=\{\mathrm{x}[0][0]$ , x[0][1], x[0][2], x[1][0], x[1][1], x[1][2], x[2][0], . . .}); data must be of length (count $\times n a t o m s)$ .  

![](images/40d8151a88735ea27141d2411f108ae7b039f5696da27a872d60879e71c5bce6.jpg)  

# Restrictions  

This function is not compatible with -DLAMMPS_BIGBIG.  

Atom IDs must be defined, must be consecutive, and an atom map must be enabled  

The total number of atoms must not be more than 2147483647 (max 32-bit signed int).  

# Parameters  

# LAMMPS Documentation, Release 4Feb2025  

• handle – pointer to a previously created LAMMPS instance   
• name – desired quantity (e.g., $x$ or charge)   
• type – 0 for int values, 1 for double values   
• count – number of per-atom values (e.g., 1 for type or charge, 3 for $x$ or $f$ ); use count $=3$ with image if you have a single image flag packed into $(x,y,z)$ components.   
• data – per-atom values packed in a one-dimensional array of length natoms \* count.  

oid lammps_scatter_atoms_subset(void \*handle, const char \*name, int type, int count, int ndata, int \*ids, void \*data)  

Scatter the named atom-based entities in data from a subset of atoms to all processes.  

This subroutine takes data stored in a one-dimensional array supplied by the user and scatters them to a subset of atoms on all processes. The array data contains data associated with atom IDs, but there is no requirement that the IDs be consecutive, as they are provided in a separate array. Use lammps_scatter_atoms() to scatter data for all atoms, in order.  

The data array needs to be organized in groups of count values, with the groups in the same order as the array ids. For example, if you want data to be the array $\{\mathbf{x}[1][0]$ , x[1][1], x[1][2], x[100][0], x[100][1], x[100][2], x[57][0], x[57][1], x[57][2]}, then count $=3$ , ndata $=3$ , and ids would be {1, 100, 57}.  

![](images/7bdff3f0e74b73d212cd41fc24ec00c554b92ed270cae752d9a960aa072f7784.jpg)  

# Restrictions  

This function is not compatible with -DLAMMPS_BIGBIG.  

Atom IDs must be defined and an atom map must be enabled  

The total number of atoms must not be more than 2147483647 (max 32-bit signed int).  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – desired quantity (e.g., $x$ or charge)   
• type – 0 for int values, 1 for double values   
• count – number of per-atom values (e.g., 1 for type or charge, 3 for $x$ or $f$ ); use count $=3$ with “image” if you have all the image flags packed into $(x y z)$   
• ndata – number of atoms listed in ids and data arrays   
• ids – list of ndata atom IDs to scatter data to   
• data – per-atom values packed in a 1-dimensional array of length ndata \* count.  

void lammps_gather_bonds(void \*handle, void \*data)  

Gather type and constituent atom info for all bonds  

Added in version 28Jul2021.  

This function copies the list of all bonds into a buffer provided by the calling code. The buffer will be filled with bond type, bond atom 1, bond atom 2 for each bond. Thus the buffer has to be allocated to the dimension of 3 times the total number of bonds times the size of the LAMMPS “tagint” type, which is either 4 or 8 bytes depending on whether they are stored in 32-bit or 64-bit integers, respectively. This size depends on the compile time settings used when compiling the LAMMPS library and can be queried by calling lammps_extract_setting() with the keyword “tagint”.  

When running in parallel, the data buffer must be allocated on all MPI ranks and will be filled with the information for all bonds in the system.  

Below is a brief C code demonstrating accessing this collected bond information.  

#include "library.h"   
#include <stdint.h>   
#include <stdio.h>   
#include <stdlib.h>   
int main(int argc, char \*\*argv) int tagintsize; int64_t i, nbonds; void \*handle, \*bonds; $\mathrm{handle=lammps\_open\_no\_mpi(0,NULL,NULL);}$ lammps_file(handle, "in.some_input"); tagintsize = lammps_extract_setting(handle, "tagint"); if (tagintsize = 4) nbonds = \*(int32_t \*)lammps_extract_global(handle, "nbonds"); else $\mathrm{nbonds}=\mathrm{}^{\ast}(\mathrm{int64\_t^{\ast})l a m m p s\_e x t r a c t\_g l o b a l(h a n d l e,~}^{\ast}\mathrm{nbonds^{\dagger})};$ bonds = malloc(nbonds \* 3 \* tagintsize); lammps_gather_bonds(handle, bonds); if (lammps_extract_setting(handle, "world_rank") == 0) $\{$ if (tagintsize $==4$ ) $\{$ int32_t \*bonds_ ${\mathrm{\boldmath~real}}=({\mathrm{int32}}\_{}{\mathrm{\boldmath~t~}}{}^{*}){\mathrm{bonds}};$ for ( $\mathrm{i}=0$ ; i < nbonds; ++i) { printf("bond % 4ld: type = %d, atoms: $\%4\mathrm{d}\%4\mathrm{d}\cdot\mathrm{n}^{1}{,}^{1}\mathrm{i}.$ , bonds_real[3\*i], bonds_real[3\*i+1], bonds_real[3\*i+2]); } $\}$ else $\{$ int64_t \*bonds_real = (int64_t \*)bonds; for ( $\mathrm{i}=0$ ; i < nbonds; ++i) { printf("bond % 4ld: type = %ld, atoms: % 4ld % 4ld\n",i, bonds_real[3\*i], bonds_real[3\*i+1], bonds_real[3\*i+2]); lammps_close(handle); lammps_mpi_finalize();  

(continued from previous page)  

free(bonds);   
return 0;  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • data – pointer to data to copy the result to  

void lammps_gather_angles(void \*handle, void \*data)  

Gather type and constituent atom info for all angles  

Added in version 8Feb2023.  

This function copies the list of all angles into a buffer provided by the calling code. The buffer will be filled with angle type, angle atom 1, angle atom 2, angle atom 3 for each angle. Thus the buffer has to be allocated to the dimension of 4 times the total number of angles times the size of the LAMMPS “tagint” type, which is either 4 or 8 bytes depending on whether they are stored in 32-bit or 64-bit integers, respectively. This size depends on the compile time settings used when compiling the LAMMPS library and can be queried by calling lammps_extract_setting() with the keyword “tagint”.  

When running in parallel, the data buffer must be allocated on all MPI ranks and will be filled with the information for all angles in the system.  

Below is a brief C code demonstrating accessing this collected angle information.  

<html><body><table><tr><td>#include "library.h"</td></tr><tr><td>#include <stdint.h></td></tr><tr><td>#include <stdio.h></td></tr><tr><td>#include <stdlib.h></td></tr><tr><td>int main(int argc, char **argv)</td></tr><tr><td></td></tr><tr><td>int tagintsize; int64_t i, nangles;</td></tr><tr><td>void *handle, *angles;</td></tr><tr><td>handle = lammps_open _no_mpi(O, NULL, NULL);</td></tr><tr><td>lammps_file(handle, "in.some_input");</td></tr><tr><td>tagintsize = lammps_extract _setting(handle, "tagint");</td></tr><tr><td>if (tagintsize == 4) nangles = *(int32_t *)lammps_extract _global(handle, "nangles");</td></tr><tr><td>else</td></tr><tr><td>nangles = *(int64_t *)lammps_extract_global(handle, "nangles");</td></tr><tr><td>angles = malloc(nangles * 4 * tagintsize);</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td>lammps_gather _angles(handle, angles);</td></tr></table></body></html>  

(continued from previous page)  

if (lammps_extract_setting(handle, "world_rank") == 0) { if (tagintsize == 4) $\{$ int32_t \*angles_real = (int32_t \*)angles; for ( $\mathrm{i}=0$ ; i $<$ nangles; ++i) { printf("angle % 4ld: type = %d, atoms: % 4d % 4d $\%$ 4d\n",i, angles_real[4\*i], angles_real[4\*i+1], angles_real[4\*i+2], angles_real[4\*i+3]); $\}$ else { int64_t \*angles_real = (int64_t \*)angles; for ( $\mathrm{i}=0$ ; i $<$ nangles; ++i) { printf("angle % 4ld: type = %ld, atoms: $\%$ 4ld % 4ld % 4ld\n",i, angles_real[4\*i], angles_real[4\*i+1], angles_real[4\*i+2], angles_real[4\*i+3]); }   
lammps_close(handle);   
lammps_mpi_finalize();   
free(angles);   
return 0;  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • data – pointer to data to copy the result to  

void lammps_gather_dihedrals(void \*handle, void \*data)  

Gather type and constituent atom info for all dihedrals  

Added in version 8Feb2023.  

This function copies the list of all dihedrals into a buffer provided by the calling code. The buffer will be filled with dihedral type, dihedral atom 1, dihedral atom 2, dihedral atom 3, dihedral atom 4 for each dihedral. Thus the buffer has to be allocated to the dimension of 5 times the total number of dihedrals times the size of the LAMMPS “tagint” type, which is either 4 or 8 bytes depending on whether they are stored in 32-bit or 64-bit integers, respectively. This size depends on the compile time settings used when compiling the LAMMPS library and can be queried by calling lammps_extract_setting() with the keyword “tagint”.  

When running in parallel, the data buffer must be allocated on all MPI ranks and will be filled with the information for all dihedrals in the system.  

Below is a brief C code demonstrating accessing this collected dihedral information.  

#include <stdint.h> #include <stdio.h> #include <stdlib.h> (continues on next page)  

(continued from previous page) int main(int argc, char \*\*argv) int tagintsize; int64_t i, ndihedrals; void \*handle, \*dihedrals; $\mathrm{handle=lammps\_open\_no\_mpi(0,NULL,NULL);}$ lammps_file(handle, "in.some_input"); tagintsize = lammps_extract_setting(handle, "tagint"); if (tagintsize 4) $\mathrm{,ndihedrals=}\mathrm{^{\ast}(i n t{32}\mathrm{\_t}\mathrm{~^{\ast})l a m m p s\mathrm{\_extract}\_g l o b a l(h a n d l e,\mathrm{^{\ast}n d i h}}}$ edrals"); else ndihedrals = \*(int64_t \*)lammps_extract_global(handle, "ndihedrals"); dihedrals = malloc(ndihedrals \* 5 \* tagintsize); lammps_gather_dihedrals(handle, dihedrals); if (lammps_extract_setting(handle, "world_rank") == 0) { if (tagintsize == 4) $\{$ int32_t \*dihedrals $\underline{{\mathrm{real}}}=(\mathrm{int32\_t^{*}})\mathrm{dihedrals};$ for ( $\mathrm{i}=0$ ; i $<$ ndihedrals; ++i) { printf("dihedral % 4ld: type = %d, atoms: % 4d % 4d % 4d % 4d\n",i, dihedrals_real[5\*i], dihedrals_real[5\*i+1], dihedrals_real[5\*i+2], dihedrals_ $\hookrightarrow$ real[5\*i+3], dihedrals_real[5\*i+4]); } $\}$ else { int64_t \*dihedrals_real = (int64_t \*)dihedrals; for ( ${\mathrm{i}}=0$ ; i $<$ ndihedrals; ++i) { printf("dihedral % 4ld: type = %ld, atoms: $\%$ 4ld % 4ld % 4ld % 4ld\n",i, dihedrals_real[5\*i], dihedrals_real[5\*i+1], dihedrals_real[5\*i+2], dihedrals_ $\hookrightarrow$ real[5\*i+3], dihedrals_real[5\*i+4]); } } } lammps_close(handle); lammps_mpi_finalize(); free(dihedrals); return 0;  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • data – pointer to data to copy the result to  

void lammps_gather_impropers(void \*handle, void \*data) Gather type and constituent atom info for all impropers  

Added in version 8Feb2023.  

This function copies the list of all impropers into a buffer provided by the calling code. The buffer will be filled with improper type, improper atom 1, improper atom 2, improper atom 3, improper atom 4 for each improper. Thus the buffer has to be allocated to the dimension of 5 times the total number of impropers times the size of the LAMMPS “tagint” type, which is either 4 or 8 bytes depending on whether they are stored in 32-bit or 64-bit integers, respectively. This size depends on the compile time settings used when compiling the LAMMPS library and can be queried by calling lammps_extract_setting() with the keyword “tagint”.  

When running in parallel, the data buffer must be allocated on all MPI ranks and will be filled with the information for all impropers in the system.  

Below is a brief C code demonstrating accessing this collected improper information.  

#include "library.h"   
#include <stdint.h>   
#include <stdio.h>   
#include <stdlib.h>   
int main(int argc, char \*\*argv) int tagintsize; int64_t i, nimpropers; void $^*$ handle, $^*$ impropers; $\mathrm{handle=lammps\_open\_no\_mpi(0,NULL,NULL);}$ lammps_file(handle, "in.some_input"); tagintsize = lammps_extract_setting(handle, "tagint"); if (tagintsize == 4) nimpropers = \*(int32_t \*)lammps_extract_global(handle, "nimpropers"); else $\mathrm{nimpropers}=\mathrm{}^{\ast}(\mathrm{int64\_t~^{\ast}})\mathrm{lammps\_extract\_global(handle,~^{\ast}n i m p s\_s t)}$ mpropers"); impropers = malloc(nimpropers $*_{\textrm{\tiny5}}*$ tagintsize); lammps_gather_impropers(handle, impropers); if (lammps_extract_setting(handle, "world_rank") == 0) { if (tagintsize == 4) $\{$ int32_t \*impropers_ $\mathrm{\Delta_{real}=(i n t32\_t\leftrightarrow)i m p r o p e r s;}$ for ( $\mathrm{i}=0$ ; i $<$ nimpropers; ++i) { printf("improper % 4ld: type = %d, atoms: $\%$ 4d % 4d % 4d % 4d\n",i, impropers_real[5\*i], impropers_real[5\*i+1], impropers_real[5\*i+2], impropers_   
$\hookrightarrow$ real[5\*i+3], impropers_real[5\*i+4]); } $\}$ else { int64_t \*impropers_real = (int64_t \*)impropers; for ( ${\mathrm{i}}=0$ ; i $<$ nimpropers; ++i) $\{$ printf("improper % 4ld: type = %ld, atoms: % 4ld % 4ld $\%$ 4ld $\%$ 4ld\n",i, impropers_real[5\*i], impropers_real[5\*i+1], impropers_real[5\*i+2], impropers   
$\hookrightarrow$ real[5\*i+3], impropers_real[5\*i+4]); }  

(continues on next page)  

(continued from previous page)  

lammps_close(handle);   
lammps_mpi_finalize();   
free(impropers);   
return 0;  

# Parameters  

• handle – pointer to a previously created LAMMPS instance • data – pointer to data to copy the result to  

void lammps_gather(void \*handle, const char \*name, int type, int count, void \*data)  

Gather the named per-atom, per-atom fix, per-atom compute, or fix property/atom-based entities from all processes, in order by atom ID.  

This subroutine gathers data from all processes and stores them in a one-dimensional array allocated by the user. The array data will be ordered by atom ID, which requires consecutive IDs (1 to natoms). If you need a similar array but for non-consecutive atom IDs, see lammps_gather_concat(); for a similar array but for a subset of atoms, see lammps_gather_subset().  

The data array will be ordered in groups of count values, sorted by atom ID (e.g., if name is $x.$ , then data is {x[0][0], x[0][1], x[0][2], x[1][0], x[1][1], x[1][2], x[2][0], . . .}); data must be pre-allocated by the caller to the correct length $(c o u n t\times n a t o m s)$ , as queried by lammps_get_natoms(), lammps_extract_global(), or lammps_extract_setting().  

This function will return an error if fix or compute data are requested and the fix or compute ID given does not have per-atom data.  

![](images/09039d5d9126139d6a6f3459ebcaa4c9a4aa25b3b84a966c4576c53da3034545.jpg)  

# Restrictions  

This function is not compatible with -DLAMMPS_BIGBIG.  

Atom IDs must be defined and must be consecutive.  

The total number of atoms must not be more than 2147483647 (max 32-bit signed int).  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – desired quantity (e.g., “x” or “f” for atom properties, “f_id” for per-atom fix data, “c_id” for per-atom compute data, “d_name” or “i_name” for fix property/atom vectors with $c o u n t=1$ , “d2_name” or “i2_name” for fix property/atom vectors with count $>1$ )   
• type – 0 for int values, 1 for double values   
• count – number of per-atom values (e.g., 1 for type or charge, 3 for $x$ or $f$ ); use count $=3$ with image if you want the image flags unpacked into $(x,y,z)$ components.   
• data – per-atom values packed into a one-dimensional array of length natoms \* count.  

void lammps_gather_concat(void \*handle, const char \*name, int type, int count, void \*data)  

Gather the named per-atom, per-atom fix, per-atom compute, or fix property/atom-based entities from all processes, unordered.  

This subroutine gathers data for all atoms and stores them in a one-dimensional array allocated by the user. The data will be a concatenation of chunks from each processor’s owned atoms, in whatever order the atoms are in on each processor. This process has no requirement that the atom IDs be consecutive. If you need the ID of each atom, you can do another call to either lammps_gather_atoms_concat() or lammps_gather_concat() with name set to id. If you have consecutive IDs and want the data to be in order, use lammps_gather(); for a similar array but for a subset of atoms, use lammps_gather_subset().  

The data array will be in groups of count values, with natoms groups total, but not in order by atom ID (e.g., if name is $x$ and count is 3, then data might be something like $\{\mathbf{x}[10][0]$ , x[10][1], x[10][2], x[2][0], x[2][1], x[2][2], x[4][0], . . .}); data must be pre-allocated by the caller to length $(c o u n t\times n a t o m s)$ , as queried by lammps_get_natoms(), lammps_extract_global(), or lammps_extract_setting().  

![](images/bc7e117b9c3fde2479c1a93d006d8ffe75ceec2d0c5a1ac494394ed5ac2d48b6.jpg)  

# Restrictions  

This function is not compatible with -DLAMMPS_BIGBIG.  

Atom IDs must be defined.  

The total number of atoms must be less than 2147483647 (max 32-bit signed int).  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – desired quantity (e.g., “x” or “f” for atom properties, “f_id” for per-atom fix data, “c_id” for per-atom compute data, “d_name” or “i_name” for fix property/atom vectors with count $=1$ , “d2_name” or “i2_name” for fix property/atom vectors with count $>1$ )   
• type – 0 for int values, 1 for double values   
• count – number of per-atom values (e.g., 1 for type or charge, 3 for $x$ or $f$ ); use count $=3$ with image if you want the image flags unpacked into $(x,y,z)$ components.   
• data – per-atom values packed into a one-dimensional array of length natoms \* count.  

oid lammps_gather_subset(void \*handle, const char \*name, int type, int count, int ndata, int \*ids, void \*data)  

Gather the named per-atom, per-atom fix, per-atom compute, or fix property/atom-based entities from all processes for a subset of atoms.  

This subroutine gathers data for the requested atom IDs and stores them in a one-dimensional array allocated by the user. The data will be ordered by atom ID, but there is no requirement that the IDs be consecutive. If you wish to return a similar array for all the atoms, use lammps_gather() or lammps_gather_concat().  

The data array will be in groups of count values, sorted by atom ID in the same order as the array ids (e.g., if name is $x_{:}$ $,c o u n t=3$ , and ids is {100, 57, 210}, then data might look like {x[100][0], x[100][1], x[100][2], x[57][0], x[57][1], x[57][2], x[210][0], . . .}); ids must be provided by the user with length ndata, and data must be pre-allocated by the caller to length $(c o u n t\times n d a t a)$ .  

# 1.1. LAMMPS C Library API  

![](images/736c543f50fa36607dca40bc05a03ae11e2c707313ebf89f70a313e27d46308a.jpg)  

# Restrictions  

This function is not compatible with -DLAMMPS_BIGBIG.  

Atom IDs must be defined and an atom map must be enabled  

The total number of atoms must not be more than 2147483647 (max 32-bit signed int).  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – desired quantity (e.g., “x” or “f” for atom properties, “f_id” for per-atom fix data, “c_id” for per-atom compute data, “d_name” or “i_name” for fix property/atom vectors with $c o u n t=1$ , “d2_name” or “i2_name” for fix property/atom vectors with count $>1$ )   
• type – 0 for int values, 1 for double values   
• count – number of per-atom values (e.g., 1 for type or charge, 3 for $x$ or $f$ ); use count $=3$ with image if you want the image flags unpacked into $(x,y,z)$ components.   
• ndata – number of atoms for which to return data (can be all of them)   
• ids – list of ndata atom IDs for which to return data   
• data – per-atom values packed into a one-dimensional array of length ndata \* count.  

void lammps_scatter(void \*handle, const char \*name, int type, int count, void \*data)  

Scatter the named per-atom, per-atom fix, per-atom compute, or fix property/atom-based entity in data to all processes.  

This subroutine takes data stored in a one-dimensional array supplied by the user and scatters them to all atoms on all processes. The data must be ordered by atom ID, with the requirement that the IDs be consecutive. Use lammps_scatter_subset() to scatter data for some (or all) atoms, unordered.  

The data array needs to be ordered in groups of count values, sorted by atom ID (e.g., if name is $x$ and $c o u n t=$ 3, then data $=\{\mathrm{x}[0][0]$ , x[0][1], x[0][2], x[1][0], x[1][1], x[1][2], x[2][0], . . .}); data must be of length (count $\times n a t o m s)$ .  

![](images/4d9ce95f0d610c1b9eea688e0e0fbfc9a445c162329c23686903572a7c0f5c95.jpg)  

# Restrictions  

This function is not compatible with -DLAMMPS_BIGBIG.  

Atom IDs must be defined, must be consecutive, and an atom map must be enabled  

The total number of atoms must not be more than 2147483647 (max 32-bit signed int).  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – desired quantity (e.g., “x” or “f” for atom properties, “f_id” for per-atom fix data, “c_id” for per-atom compute data, “d_name” or “i_name” for fix property/atom vectors with $c o u n t=1$ , “d2_name” or “i2_name” for fix property/atom vectors with count $>1$ )   
• type – 0 for int values, 1 for double values  

• count – number of per-atom values (e.g., 1 for type or charge, 3 for $x$ or $f$ ); use count $=3$ with image if you have a single image flag packed into $(x,y,z)$ components.  

• data – per-atom values packed in a one-dimensional array of length natoms \* count.  

oid lammps_scatter_subset(void \*handle, const char \*name, int type, int count, int ndata, int \*ids, void \*data)  

Scatter the named per-atom, per-atom fix, per-atom compute, or fix property/atom-based entities in data from a subset of atoms to all processes.  

This subroutine takes data stored in a one-dimensional array supplied by the user and scatters them to a subset of atoms on all processes. The array data contains data associated with atom IDs, but there is no requirement that the IDs be consecutive, as they are provided in a separate array. Use lammps_scatter() to scatter data for all atoms, in order.  

The data array needs to be organized in groups of count values, with the groups in the same order as the array ids. For example, if you want data to be the array $\{\mathbf{x}[1][0]$ , x[1][1], x[1][2], x[100][0], x[100][1], x[100][2], x[57][0], x[57][1], x[57][2]}, then count $=3$ , ndata $=3$ , and ids would be {1, 100, 57}.  

![](images/743cd416830ae63cc3c183b4ee538ef90b7b60ae99eb6eb0302592cbf4e253ba.jpg)  

# Restrictions  

This function is not compatible with -DLAMMPS_BIGBIG.  

Atom IDs must be defined and an atom map must be enabled  

The total number of atoms must not be more than 2147483647 (max 32-bit signed int).  

# Parameters  

• handle – pointer to a previously created LAMMPS instance   
• name – desired quantity (e.g., “x” or “f” for atom properties, “f_id” for per-atom fix data, “c_id” for per-atom compute data, “d_name” or “i_name” for fix property/atom vectors with $c o u n t=1$ , $^{\leftarrow}\mathrm{d}2.$ _name” or “i2_name” for fix property/atom vectors with count $>1$ )   
• type – 0 for int values, 1 for double values   
• count – number of per-atom values (e.g., 1 for type or charge, 3 for $x$ or $f$ ); use count $=3$ with “image” if you want single image flags unpacked into $(x,y,z)$   
• ndata – number of atoms listed in ids and data arrays   
• ids – list of ndata atom IDs to scatter data to   
• data – per-atom values packed in a 1-dimensional array of length ndata \* count.  

int lammps_create_atoms(void \*handle, int n, const int \*id, const int \*type, const double $^*\mathbf{X}$ , const double ${}^{*}\mathbf{V}.$ const int \*image, int bexpand)  

Create N atoms from list of coordinates  

The prototype for this function when compiling with -DLAMMPS_BIGBIG is:  

# 1.1. LAMMPS C Library API  