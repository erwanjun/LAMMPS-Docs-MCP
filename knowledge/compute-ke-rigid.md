---
title: "Compute KE/Rigid, MLIAP, MSD"
description: "Rigid body kinetic energy, ML-IAP descriptor compute, mean square displacement"
category: "compute"
tags: ["kinetic-energy", "rigid-body", "ML-IAP", "machine-learning", "MSD", "diffusion"]
commands: ["compute ke/rigid", "compute mliap", "compute msd"]
---
# 3.65.5 Restrictions  

This compute is part of the EFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.65.6 Related commands  

none  

# 3.65.7 Default  

none  

# 3.66 compute ke/rigid command  

# 3.66.1 Syntax  

compute ID group-ID ke/rigid fix-ID  

• ID, group-ID are documented in compute command • ke $=$ style name of this compute command • fix- $\cdot\mathrm{ID}=\mathrm{ID}$ of rigid body fix  

# 3.66.2 Examples  

# 3.66.3 Description  

Define a computation that calculates the translational kinetic energy of a collection of rigid bodies, as defined by one of the fix rigid command variants.  

The kinetic energy of each rigid body is computed as $\textstyle{\frac{1}{2}}M V_{\mathrm{cm}}^{2}$ , where $M$ is the total mass of the rigid body, and $V_{\mathrm{{cm}}}$ is its center-of-mass velocity.  

The fix-ID should be the ID of one of the fix rigid commands which defines the rigid bodies. The group specified in the compute command is ignored. The kinetic energy of all the rigid bodies defined by the fix rigid command in included in the calculation.  

# 3.66.4 Output info  

This compute calculates a global scalar (the summed KE of all the rigid bodies). This value can be used by any command that uses a global scalar value from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “extensive”. The scalar value will be in energy units.  

# 3.66.5 Restrictions  

This compute is part of the RIGID package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.66.6 Related commands  

compute erotate/rigid  

# 3.66.7 Default  

none  

# 3.67 compute mliap command  

# 3.67.1 Syntax  

compute ID group-ID mliap ... keyword values ...  

• ID, group-ID are documented in compute command   
• mliap $=$ style name of this compute command   
• two or more keyword/value pairs must be appended   
• keyword $=$ model or descriptor or gradgradflag model values $=$ style style $=$ linear or quadratic or mliappy descriptor values $=$ style filename $\mathrm{style}=\mathrm{sna}$ or ace filename $=$ name of file containing descriptor definitions gradgradflag value $=0/1$ toggle gradgrad method for force gradient  

# 3.67.2 Examples  

<html><body><table><tr><td>compute mliap model linear descriptor sna Ta06A.mliap.descriptor compute mliap model linear descriptor ace H_N_O ccs.yaceg gradgradflag1</td></tr></table></body></html>  

# 3.67.3 Description  

Compute style mliap provides a general interface to the gradient of machine-learning interatomic potentials with respect to model parameters. It is used primarily for calculating the gradient of energy, force, and stress components with respect to model parameters, which is useful when training mliap pair_style models to match target data. It provides separate definitions of the interatomic potential functional form (model) and the geometric quantities that characterize the atomic positions (descriptor). By defining model and descriptor separately, it is possible to use many different models with a given descriptor, or many different descriptors with a given model. Currently, the compute supports linear and quadratic SNAP descriptor computes used in pair_style snap, linear SO3 descriptor computes, and linear ACE descriptor computes used in pair_style pace, and it is straightforward to add new descriptor styles.  

The compute mliap command must be followed by two keywords model and descriptor in either order.  

The model keyword is followed by the model style (linear, quadratic or mliappy). The mliappy model is only available if LAMMPS is built with the mliappy Python module. There are specific installation instructions for that module. For the mliap compute, specifying a linear model will compute the specified descriptors and gradients with respect to linear model parameters whereas quadratic will do the same, but for the quadratic products of descriptors.  

The descriptor keyword is followed by a descriptor style, and additional arguments. The compute currently supports three descriptor styles: sna, so3, and ace, but it is is straightforward to add additional descriptor styles. The SNAP descriptor style sna is the same as that used by pair_style snap, including the linear, quadratic, and chem variants. A single additional argument specifies the descriptor filename containing the parameters and setting used by the SNAP  

# 3.67. compute mliap command  

descriptor. The descriptor filename usually ends in the .mliap.descriptor extension. The format of this file is identical to the descriptor file in the pair_style mliap, and is described in detail there.  

The ACE descriptor style ace is the same as pair_style pace. A single additional argument specifies the ace descriptor filename that contains parameters and settings for the ACE descriptors. This file format differs from the SNAP or SO3 descriptor files, and has a .yace or .ace extension. However, as with other mliap descriptor styles, this file is identical to the ace descriptor file in pair_style mliap, where it is described in further detail.  

![](images/f8bd8dd41bb2ec058f1acb2de0be8ce4e20d8bef8ade75320bfcf456fb90b5e7.jpg)  

# Note  

The number of LAMMPS atom types (and the value of nelems in the model) must match the value of nelems in the descriptor file.  

Compute mliap calculates a global array containing gradient information. The number of columns in the array is nelems $\times n p a r a m s+1$ . The first row of the array contain the derivative of potential energy with respect to. to each parameter and each element. The last six rows of the array contain the corresponding derivatives of the virial stress tensor, listed in Voigt notation: pxx, pyy, pzz, pyz, pxz, and pxy. In between the energy and stress rows are the 3N rows containing the derivatives of the force components. See section below on output for a detailed description of how rows and columns are ordered.  

The element in the last column of each row contains the potential energy, force, or stress, according to the row. These quantities correspond to the user-specified reference potential that must be subtracted from the target data when training a model. The potential energy calculation uses the built in compute thermo_pe. The stress calculation uses a compute called mliap_press that is automatically created behind the scenes, according to the following command:  

compute mliap_press all pressure NULL virial  

See section below on output for a detailed explanation of the data layout in the global array.  

The optional keyword gradgradflag controls how the force gradient is calculated. A value of 1 requires that the model provide the matrix of double gradients of energy with respect to both parameters and descriptors. For the linear and quadratic models this matrix is sparse and so is easily calculated and stored. For other models, this matrix may be prohibitively expensive to calculate and store. A value of 0 requires that the descriptor provide the derivative of the descriptors with respect to the position of every neighbor atom. This is not optimal for linear and quadratic models, but may be a better choice for more complex models.  

Atoms not in the group do not contribute to this compute. Neighbor atoms not in the group do not contribute to this compute. The neighbor list needed to compute this quantity is constructed each time the calculation is performed (i.e., each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently.  

# Note  

If the user-specified reference potentials includes bonded and non-bonded pairwise interactions, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this fix uses the neighbor list, it also means those pairs will not be included in the calculation. The rerun command is not an option here, since the reference potential is required for the last column of the global array. A work-around is to prevent pairwise interactions from being removed by explicitly adding a tiny positive value for every pairwise interaction that would otherwise be set to zero in the special_bonds command.  

# 3.67.4 Output info  

Compute mliap evaluates a global array. The columns are arranged into nelems blocks, listed in order of element $I.$ . Each block contains one column for each of the nparams model parameters. A final column contains the corresponding energy, force component on an atom, or virial stress component. The rows of the array appear in the following order:  

• 1 row: Derivatives of potential energy with respect to each parameter of each element.   
• $3N$ rows: Derivatives of force components; the $x,y$ , and $z$ components of the force on atom $i$ appear in consecutive rows. The atoms are sorted based on atom ID.   
• 6 rows: Derivatives of the virial stress tensor with respect to each parameter of each element. The ordering of the rows follows Voigt notation: pxx, pyy, pzz, pyz, pxz, pxy.  

These values can be accessed by any command that uses a global array from a compute as input. See the Howto output doc page for an overview of LAMMPS output options. To see how this command can be used within a Python workflow to train machine-learning interatomic potentials, see the examples in FitSNAP.  

# 3.67.5 Restrictions  

This compute is part of the ML-IAP package. It is only enabled if LAMMPS was built with that package. In addition, building LAMMPS with the ML-IAP package requires building LAMMPS with the ML-SNAP package. The mliappy model also requires building LAMMPS with the PYTHON package. The ace descriptor also requires building LAMMPS with the ML-PACE package. See the Build package page for more info. Note that kk (KOKKOS) accelerated variants of SNAP and ACE descriptors are not compatible with mliap descriptor.  

# 3.67.6 Related commands  

pair_style mliap  

# 3.67.7 Default  

The keyword defaults are gradgradflag $=1$  

# 3.68 compute momentum command  

# 3.68.1 Syntax  

compute ID group-ID momentum  

• ID, group-ID are documented in compute command • momentum $=$ style name of this compute command  

# 3.68.2 Examples  

# 3.68.4 Output info  

This compute calculates a global vector (the summed momentum) of length 3. This value can be used by any command that uses a global vector value from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector value calculated by this compute is “extensive”. The vector value will be in mass\*velocity units.  

# 3.68.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.68.6 Related commands  

# 3.68.7 Default  

none  

# 3.69 compute msd command  

# 3.69.1 Syntax  

compute ID group-ID msd keyword values ...  

• ID, group-ID are documented in compute command   
• msd $=$ style name of this compute command   
• zero or more keyword/value pairs may be appended   
keyword $=$ com or average com value $=$ yes or no average valu $\mathrm{\Delta_{\mathrm{{3}}}}=\mathrm{yes}$ or no  

# 3.69.2 Examples  

<html><body><table><tr><td>compute 1 all msd</td></tr><tr><td>compute 1 upper msd com yes average yes</td></tr><tr><td></td></tr></table></body></html>  

# 3.69.3 Description  

Define a computation that calculates the mean-squared displacement (MSD) of the group of atoms, including all effects due to atoms passing through periodic boundaries. For computation of the non-Gaussian parameter of mean-squared displacement, see the compute msd/nongauss command.  

A vector of four quantities is calculated by this compute. The first three elements of the vector are the squared $d x$ , $d y$ , and $d z$ displacements, summed and averaged over atoms in the group. The fourth element is the total squared displacement (i.e., $d x^{2}+d y^{2}+d z^{2})$ , summed and averaged over atoms in the group.  

The slope of the mean-squared displacement (MSD) versus time is proportional to the diffusion coefficient of the diffusing atoms.  

The displacement of an atom is from its reference position. This is normally the original position at the time the compute command was issued, unless the average keyword is set to yes. The value of the displacement will be 0.0 for atoms not in the specified compute group.  

If the com option is set to yes then the effect of any drift in the center-of-mass of the group of atoms is subtracted out before the displacement of each atom is calculated.  

If the average option is set to yes then the reference position of an atom is based on the average position of that atom, corrected for center-of-mass motion if requested. The average position is a running average over all previous calls to the compute, including the current call. So on the first call it is current position, on the second call it is the arithmetic average of the current position and the position on the first call, and so on. Note that when using this option, the precise value of the mean square displacement will depend on the number of times the compute is called. So, for example, changing the frequency of thermo output may change the computed displacement. Also, the precise values will be changed if a single simulation is broken up into two parts, using either multiple run commands or a restart file. It only makes sense to use this option if the atoms are not diffusing, so that their average positions relative to the center of mass of the system are stationary. The most common case is crystalline solids undergoing thermal motion.  

![](images/167d4ffecdb06e73369fc93860f1b312a89347af8d090bd44ea458837c4de1da.jpg)  

# Note  

Initial coordinates are stored in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g. to 0) before invoking this compute by using the set image command.  

# Note  

If you want the quantities calculated by this compute to be continuous when running from a restart file, then you should use the same ID for this compute, as in the original run. This is so that the fix this compute creates to store per-atom quantities will also have the same ID, and thus be initialized correctly with atom reference positions from the restart file. When average is set to yes, then the atom reference positions are restored correctly, but not the number of samples used obtain them. As a result, the reference positions from the restart file are combined with subsequent positions as if they were from a single sample, instead of many, which will change the values of msd somewhat.  

# 3.69.4 Output info  

This compute calculates a global vector of length 4, which can be accessed by indices 1–4 by any command that uses global vector values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The vector values are “intensive”. The vector values will be in distance2 units.  

# 3.69.5 Restrictions  

Compute msd cannot be used with a dynamic group.  

# 3.69.6 Related commands  

compute msd/nongauss, compute displace_atom, fix store/state, compute msd/chunk  

# 3.69.7 Default  

The option default are com $=$ no, average $=$ no.  

# 3.70 compute msd/chunk command  

# 3.70.1 Syntax  

compute ID group-ID msd/chunk chunkID  

• ID, group-ID are documented in compute command • msd/chunk $=$ style name of this compute command • chunkID $=$ ID of compute chunk/atom command  

# 3.70.2 Examples  

compute 1 all msd/chunk molchunk  

# 3.70.3 Description  

Define a computation that calculates the mean-squared displacement (MSD) for multiple chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

Four quantities are calculated by this compute for each chunk. The first 3 quantities are the squared dx, dy, and $d z$ displacements of the center-of-mass. The fourth component is the total squared displacement (i.e., $d x^{2}+d y^{2}+d z^{2})$ of the center-of-mass. These calculations include all effects due to atoms passing through periodic boundaries.  

Note that only atoms in the specified group contribute to the calculation. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

The slope of the mean-squared displacement (MSD) versus time is proportional to the diffusion coefficient of the diffusing chunks.  

The displacement of the center-of-mass of the chunk is from its original center-of-mass position, calculated on the timestep this compute command was first invoked.  

![](images/6283f0ac7f7d55ad8081a4331c56d01434241707ff267f8a69cbf40159bd8840.jpg)  

# Note  

The number of chunks Nchunk calculated by the compute chunk/atom command must remain constant each time this compute is invoked, so that the displacement for each chunk from its original position can be computed consistently. If Nchunk does not remain constant, an error will be generated. If needed, you can enforce a constant Nchunk by using the nchunk once or ids once options when specifying the compute chunk/atom command.  

# Note  

This compute stores the original position (of the center-of-mass) of each chunk. When a displacement is calculated on a later timestep, it is assumed that the same atoms are assigned to the same chunk ID. However LAMMPS has no simple way to ensure this is the case, though you can use the ids once option when specifying the compute chunk/atom command. Note that if this is not the case, the MSD calculation does not have a sensible meaning.  

![](images/0b858bb0b779b54929a78039953837df02f6cb62ea3515037e4d7dbbf51b794e.jpg)  

# Note  

The initial coordinates of the atoms in each chunk are stored in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

# Note  

If you want the quantities calculated by this compute to be continuous when running from a restart file, then you should use the same ID for this compute, as in the original run. This is so that the fix this compute creates to store per-chunk quantities will also have the same ID, and thus be initialized correctly with chunk reference positions from the restart file.  

The simplest way to output the results of the compute msd/chunk calculation to a file is to use the fix ave/time command, for example:  

compute cc1 all chunk/atom molecule   
compute myChunk all msd/chunk cc1   
fix 1 all ave/time 100 1 100 c_myChunk[\*] file tmp.out mode vector  

# 3.70.4 Output info  

This compute calculates a global array where the number of rows $=$ the number of chunks Nchunk as calculated by the specified compute chunk/atom command. The number of columns $=4$ for $d x,d y,d z,$ , and the total displacement. These values can be accessed by any command that uses global array values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The array values are “intensive”. The array values will be in distance2 units.  

# 3.70.5 Restrictions  

none  

# 3.70.6 Related commands  

compute msd  

# 3.70.7 Default  

none  

# 3.71 compute msd/nongauss command  

# 3.71.1 Syntax  

compute ID group-ID msd/nongauss keyword values ...  

• ID, group-ID are documented in compute command • msd/nongauss $=$ style name of this compute command zero or more keyword/value pairs may be appended  

# 3.71. compute msd/nongauss command  

• keyword $=$ com com value $=$ yes or no  

# 3.71.2 Examples  

<html><body><table><tr><td>compute 1 all msd nongauss</td></tr><tr><td>compute 1 upper msd, nongauss com yes</td></tr><tr><td></td></tr></table></body></html>  

# 3.71.3 Description  

Define a computation that calculates the mean-squared displacement (MSD) and non-Gaussian parameter (NGP) of the group of atoms, including all effects due to atoms passing through periodic boundaries.  

A vector of three quantities is calculated by this compute. The first element of the vector is the total squared displacement, $d r^{2}=d x^{2}+d y^{2}+d z^{2}$ , of the atoms, and the second is the fourth power of these displacements, $d r^{4}=(d x^{2}+d y^{2}+d z^{2})^{2}$ , summed and averaged over atoms in the group. The third component is the non-Gaussian diffusion parameter NGP,  

$$
\mathrm{NGP}(t)=\frac{3\left\langle(r(t)-r(0))^{4}\right\rangle}{5\left\langle(r(t)-r(0))^{2}\right\rangle^{2}}-1.
$$  

The NGP is a commonly used quantity in studies of dynamical heterogeneity. Its minimum theoretical value $(-0.4)$ occurs when all atoms have the same displacement magnitude. $\mathrm{{NGP}=0}$ for Brownian diffusion, while $\mathrm{{NGP}>0}$ when some mobile atoms move faster than others.  

If the com option is set to yes then the effect of any drift in the center-of-mass of the group of atoms is subtracted out before the displacement of each atom is calculated.  

See the compute msd page for further important NOTEs, which also apply to this compute.  

# 3.71.4 Output info  

This compute calculates a global vector of length 3, which can be accessed by indices 1–3 by any command that uses global vector values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The vector values are “intensive”. The first vector value will be in distance2 units, the second is in distance4 units, and the third is dimensionless.  

# 3.71.5 Restrictions  

Compute msd/nongauss cannot be used with a dynamic group.  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package See the Build package page for more info.  

# 3.71.6 Related commands  

compute msd  

# 3.71.7 Default  

The option default is $\mathrm{{com}=n o}$ .  

# 3.72 compute nbond/atom command  

# 3.72.1 Syntax  

compute ID group-ID nbond/atom keyword value  

• ID, group-ID are documented in compute command   
• nbond/atom $=$ style name of this compute command   
• zero or more keyword/value pairs may be appended   
• keyword $=$ bond/type bond/type value $=$ btype btype $=$ bond type included in count  

# 3.72.2 Examples  

<html><body><table><tr><td>compute 1 all nbond/ /atom compute 1 all nbond/ /atom bond/type 2</td></tr></table></body></html>  

# 3.72.3 Description  

Added in version 4May2022.  

Define a computation that computes the number of bonds each atom is part of. Bonds which are broken are not counted in the tally. See the Howto broken bonds page for more information. The number of bonds will be zero for atoms not in the specified compute group. This compute does not depend on Newton bond settings.  

If the keyword bond/type is specified, only bonds of btype are counted.  

# 3.72.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

# 3.72.5 Restrictions  

This compute is part of the BPM package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.72.6 Related commands  

# 3.72.7 Default  

none  

# 3.73 compute omega/chunk command  

# 3.73.1 Syntax  

compute ID group-ID omega/chunk chunkID  

• ID, group-ID are documented in compute command • omega/chunk $=$ style name of this compute command  

# 3.72. compute nbond/atom command  

• chunkID $=$ ID of compute chunk/atom command  

# 3.73.2 Examples  

# 3.73.3 Description  

Define a computation that calculates the angular velocity (omega) of multiple chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

This compute calculates the three components of the angular velocity vector for each chunk via the formula $\vec{L}=\mathbf{I}\cdot\vec{\omega}$ , where $\vec{L}$ is the angular momentum vector of the chunk, I is its moment of inertia tensor, and $\omega$ is the angular velocity of the chunk. The calculation includes all effects due to atoms passing through periodic boundaries.  

Note that only atoms in the specified group contribute to the calculation. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

# $\Theta$ Note  

The coordinates of an atom contribute to the chunk’s angular velocity in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

The simplest way to output the results of the compute omega/chunk calculation to a file is to use the fix ave/time command, for example:  

compute cc1 all chunk/atom molecule   
compute myChunk all omega/chunk cc1   
fix 1 all ave/time 100 1 100 c_myChunk[\*] file tmp.out mode vector  

# 3.73.4 Output info  

This compute calculates a global array where the number of rows is the number of chunks Nchunk as calculated by the specified compute chunk/atom command. The number of columns is 3 for the three $(x,y,z)$ components of the angular velocity for each chunk. These values can be accessed by any command that uses global array values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The array values are “intensive”. The array values will be in velocity/distance units.  

# 3.73.5 Restrictions  

none  

# 3.73.6 Related commands  

variable omega() function  

# 3.73.7 Default  

none  

# 3.74 compute orientorder/atom command  

Accelerator Variants: orientorder/atom/kk  

# 3.74.1 Syntax  

compute ID group-ID orientorder/atom keyword values ...  

• ID, group-ID are documented in compute command   
• orientorder/atom $=$ style name of this compute command   
• one or more keyword/value pairs may be appended keyword $=$ cutoff or nnn or degrees or wl or wl/hat or components or chunksize cutoff value $=$ distance cutoff nnn value $=$ number of nearest neighbors degrees values $=$ nlvalues, l1, l2,... wl value $=$ yes or no wl/hat value $=$ yes or no components value $=$ ldegree chunksize value $=$ number of atoms in each pass  

# 3.74.2 Examples  

compute 1 all orientorder/atom   
compute 1 all orientorder/atom degrees 5 4 6 8 10 12 nnn NULL cutoff 1.5   
compute 1 all orientorder/atom wl/hat yes   
compute 1 all orientorder/atom components 6  

# 3.74.3 Description  

Define a computation that calculates a set of bond-orientational order parameters $Q_{\ell}$ for each atom in a group. These order parameters were introduced by Steinhardt et al. as a way to characterize the local orientational order in atomic structures. For each atom, $Q_{\ell}$ is a real number defined as follows:  

$$
\begin{array}{l}{{\displaystyle{{\bar{Y}}_{\ell m}}=\frac{1}{n n n}\sum_{j=1}^{n n n}Y_{\ell m}\left(\theta({\bf{r}}_{i j}),\phi({\bf{r}}_{i j})\right)}~}\ {{\displaystyle Q_{\ell}=\sqrt{\frac{4\pi}{2\ell+1}\sum_{m=-\ell}^{m=\ell}{{{\bar{Y}}_{\ell m}}{{\bar{Y}}_{\ell m}}^{*}}}}~}\end{array}
$$  

The first equation defines the local order parameters as averages of the spherical harmonics $Y_{\ell m}$ for each neighbor. These are complex number components of the 3D analog of the 2D order parameter $q_{n}$ , which is implemented as LAMMPS compute hexorder/atom. The summation is over the nnn nearest neighbors of the central atom. The angles $\theta$ and $\phi$ are the standard spherical polar angles defining the direction of the bond vector $r_{i j}$ . The phase and sign of $Y_{\ell m}$ follow the standard conventions, so that $\mathrm{sign}(Y_{\ell\ell}(0,0))=(-1)^{\ell}$ . The second equation defines $Q_{\ell}$ , which is a rotationally invariant non-negative amplitude obtained by summing over all the components of degree $\ell$ .  

The optional keyword cutoff defines the distance cutoff used when searching for neighbors. The default value, also the maximum allowable value, is the cutoff specified by the pair style.  

The optional keyword nnn defines the number of nearest neighbors used to calculate $Q_{\ell}$ . The default value is 12. If the value is NULL, then all neighbors up to the specified distance cutoff are used.  

The optional keyword degrees defines the list of order parameters to be computed. The first argument nlvalues is the number of order parameters. This is followed by that number of non-negative integers giving the degree of each order parameter. Because $Q_{2}$ and all odd-degree order parameters are zero for atoms in cubic crystals (see Steinhardt), the default order parameters are $Q_{4},Q_{6},Q_{8},Q_{10}$ , and $Q_{12}$ . For the FCC crystal with nnn $=12$ ,  

$$
Q_{4}=\sqrt{\frac{7}{192}}\approx0.19094
$$  

The numerical values of all order parameters up to $Q_{12}$ for a range of commonly encountered high-symmetry structures are given in Table I of Mickel et $a l.$ ., and these can be reproduced with this compute.  

The optional keyword $w l$ will output the third-order invariants $W_{\ell}$ (see Eq. 1.4 in Steinhardt) for the same degrees as for the $Q_{\ell}$ parameters. For the FCC crystal with nnn $=12$ ,  

$$
W_{4}=-\sqrt{\frac{14}{143}}\left(\frac{49}{4096}\right)\pi^{-3/2}\approx-0.0006722136
$$  

The optional keyword wl/hat will output the normalized third-order invariants $\hat{W}_{\ell}$ (see Eq. 2.2 in Steinhardt) for the same degrees as for the $Q_{\ell}$ parameters. For the FCC crystal with nnn $=12$ ,  

$$
\hat{W}_{4}=-\frac{7}{3}\sqrt{\frac{2}{429}}\approx-0.159317
$$  

The numerical values of $\hat{W}_{\ell}$ for a range of commonly encountered high-symmetry structures are given in Table I of Steinhardt, and these can be reproduced with this keyword.  

The optional keyword components will output the components of the normalized complex vector $\hat{Y}_{\ell m}=\bar{Y}_{\ell m}/|\bar{Y}_{\ell m}|$ of degree ldegree, which must be included in the list of order parameters to be computed. This option can be used in conjunction with compute coord_atom to calculate the ten Wolde’s criterion to identify crystal-like particles, as discussed in ten Wolde.  

The optional keyword chunksize is only applicable when using the the KOKKOS package and is ignored otherwise. This keyword controls the number of atoms in each pass used to compute the bond-orientational order parameters and is used to avoid running out of memory. For example if there are 32768 atoms in the simulation and the chunksize is set to 16384, the parameter calculation will be broken up into two passes.  

The value of $Q_{\ell}$ is set to zero for atoms not in the specified compute group, as well as for atoms that have less than nnn neighbors within the distance cutoff, unless nnn is NULL.  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (i.e., each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently.  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this fix uses the neighbor list, it also means those pairs will not be included in the order parameter. This difficulty can be circumvented by writing a dump file, and using the rerun command to compute the order parameter for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 3.74.4 Output info  

This compute calculates a per-atom array with nlvalues columns, giving the $Q_{\ell}$ values for each atom, which are real numbers in the range $0\leq Q_{\ell}\leq1$ .  

If the keyword $w l$ is set to yes, then the $W_{\ell}$ values for each atom will be added to the output array, which are real numbers.  

If the keyword wl/hat is set to yes, then the $\hat{W}_{\ell}$ values for each atom will be added to the output array, which are real numbers.  

If the keyword components is set, then the real and imaginary parts of each component of normalized $\hat{Y}_{\ell m}$ will be added to the output array in the following order: $\Re(\hat{Y}_{-m}),\mathbb{S}(\bar{\hat{Y}}_{-m}),\Re(\hat{Y}_{-m+1}),\mathbb{S}(\hat{Y}_{-m+1}),\dots,\Re(\hat{Y}_{m}),\mathbb{S}(\hat{Y}_{m}).$  

In summary, the per-atom array will contain nlvalues columns, followed by an additional nlvalues columns if $w l$ is set to yes, followed by an additional nlvalues columns if wl/hat is set to yes, followed by an additional $2^{*}(2^{*}~l d e g r e e+1)$ columns if the components keyword is set.  

These values can be accessed by any command that uses per-atom values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

# 3.74.5 Restrictions  

none  

# 3.74.6 Related commands  

compute coord/atom, compute centro/atom, compute hexorder/atom  

# 3.74.7 Default  

The option defaults are cutoff $=$ pair style cutoff, $n n n=12$ , degrees $=$ 5 4 6 8 10 12 (i.e., $Q_{4},Q_{6},Q_{8},Q_{10}$ , and $Q_{12}$ ), $w l$ $\mathbf{\tau}=\mathbf{n}\mathbf{O}$ , wl/hat $=$ no, components off, and chunksize $=16384$  

(Steinhardt) P. Steinhardt, D. Nelson, and M. Ronchetti, Phys. Rev. B 28, 784 (1983).   
(Mickel) W. Mickel, S. C. Kapfer, G. E. Schroeder-Turkand, K. Mecke, J. Chem. Phys. 138, 044501 (2013).   
(tenWolde) P. R. ten Wolde, M. J. Ruiz-Montero, D. Frenkel, J. Chem. Phys. 104, 9932 (1996).  

# 3.75 compute pace command  

# 3.75.1 Syntax  

compute ID group-ID pace ace_potential_filename ... keyword values ...  

• ID, group-ID are documented in compute command   
• pace $=$ style name of this compute command   
• ace_potential_filename $=$ file name (in the .yace or .ace format from pace pair_style) including ACE hyperparameters, bonds, and generalized coupling coefficients   
• keyword $=$ bikflag or dgradflag bikflag value $=0$ or 1 $0=$ descriptors are summed over atoms of each type $1=$ descriptors are listed separately for each atom dgradflag value $=0$ or 1 $0=$ descriptor gradients are summed over atoms of each type $1=$ descriptor gradients are listed separately for each atom pair  

# 3.75.2 Examples  

compute pace all pace coupling_coefficients.yace compute pace all pace coupling_coefficients.yace 0 1 compute pace all pace coupling_coefficients.yace 1 1  

# 3.75.3 Description  

Added in version 7Feb2024.  

This compute calculates a set of quantities related to the atomic cluster expansion (ACE) descriptors of the atoms in a group. ACE descriptors are highly general atomic descriptors, encoding the radial and angular distribution of neighbor atoms, up to arbitrary bond order (rank). The detailed mathematical definition is given in the paper by (Drautz). These descriptors are used in the pace pair_style. Quantities obtained from compute pace are related to those used in pace pair_style to evaluate atomic energies, forces, and stresses for linear ACE models.  

For example, the energy for a linear ACE model is calculated as: $\begin{array}{r}{E=\sum_{i}^{N_{-}a t o m s}\sum_{\nu}c_{\nu}B_{i,\nu}}\end{array}$ . The ACE descriptors for atom $i B_{i,\nu}$ , and $c_{\nu}$ are linear model parameters. The detailed definition and indexing convention for ACE descriptors is given in (Drautz). In short, body order $N$ , angular character, radial character, and chemical elements in the $N.$ -body descriptor are encoded by $\nu$ . In the pace pair_style, the linear model parameters and the ACE descriptors are combined for efficient evaluation of energies and forces. The details and benefits of this efficient implementation are given in (Lysogorskiy), but the combined descriptors and linear model parameters for the purposes of compute pace may be expressed in terms of the ACE descriptors mentioned above.  

$$
\begin{array}{r}{c_{\nu}B_{i,\nu}=\sum_{\nu^{\prime}\in\nu}\left[c_{\nu}C(\nu^{\prime})\right]A_{i,\nu^{\prime}}}\end{array}
$$  

where the bracketed terms on the right-hand side are the combined functions with linear model parameters typically provided in the <name>.yace potential file for pace pair_style. When these bracketed terms are multiplied by the products of the atomic base from (Drautz), $A_{i,\nu^{\prime}}$ , the ACE descriptors are recovered but they are also scaled by linear model parameters. The generalized coupling coefficients, written in short-hand here as $C(\nu^{\prime})$ , are the generalized Clebsch-Gordan or generalized Wigner symbols. It may be desirable to reverse the combination of these descriptors and the linear model parameters so that the ACE descriptors themselves may be used. The ACE descriptors and their gradients are often used when training ACE models, performing custom data analysis, generalizing ACE model forms, and other tasks that involve direct computation of descriptors. The key utility of compute pace is that it can compute the ACE descriptors and gradients so that these tasks can be performed during a LAMMPS simulation or so that LAMMPS can be used as a driver for tasks like ACE model parameterization. To see how this command can be used within a Python workflow to train ACE potentials, see the examples in FitSNAP. Examples on using outputs from this compute to construct general ACE potential forms are demonstrated in (Goff). The various keywords and inputs to compute pace determine what ACE descriptors and related quantities are returned in a compute array.  

The coefficient file, ${<n a m e>.y a c e}$ , ultimately defines the number of ACE descriptors to be computed, their maximum body-order, the degree of angular character they have, the degree of radial character they have, the chemical character (which element-element interactions are encoded by descriptors), and other hyper-parameters defined in (Drautz). These may be modeled after the potential files in pace pair_style, and have the same format. Details on how to generate the coefficient files to train ACE models may be found in FitSNAP.  

The keyword bikflag determines whether or not to list the descriptors of each atom separately, or sum them together and list in a single row. If bikflag is set to $O$ then a single descriptor row is used, which contains the per-atom ACE descriptors $B_{i,\nu}$ summed over all atoms $i$ to produce $B_{\nu}$ . If bikflag is set to $I$ this is replaced by a separate per-atom ACE descriptor row for each atom. In this case, the entries in the final column for these rows are set to zero.  

The keyword dgradflag determines whether to sum atom gradients or list them separately. If dgradflag is set to 0, the ACE descriptor gradients w.r.t. atom $j$ are summed over all atoms $i^{,}$ of, which may be useful when training linear ACE models on atomic forces. If dgradflag is set to 1, gradients are listed separately for each pair of atoms. Each row corresponds to a single term ∂∂Bri,ajν where raj is the a-th position coordinate of the atom with global index j. This also changes the number of columns to be equal to the number of ACE descriptors, with 3 additional columns representing the indices $i,j,$ and $a$ , as explained more in the Output info section below. The option dgradflag ${\bf\ddot{\rho}}=I$ requires that bikflag $\scriptstyle=I$ .  

![](images/4263c66b8da8ec71a26c86068b058b87cc550686f62007f811b5b8de09021278.jpg)  

# Note  

It is noted here that in contrast to pace pair_style, the .yace file for compute pace typically should not contain linear parameters for an ACE potential. If $c_{\nu}$ are included, the value of the descriptor will not be returned in the compute array, but instead, the energy contribution from that descriptor will be returned. Do not do this unless it is the desired behavior. In short, you should not plug in a ‘.yace’ for a pace potential into this compute to evaluate descriptors.  

![](images/2de05cd4456a63a1eb110c17f5ff72324b842f5477b0d5fa89d05b6f5042951f.jpg)  

# Note  

Generalized Clebsch-Gordan or Generalized Wigner symbols (with appropriate factors) must be used to evaluate ACE descriptors with this compute. There are multiple ways to define the generalized coupling coefficients. Because of this, this compute will not revert your potential file to a coupling coefficient file. Instead this compute allows the user to supply coupling coefficients that follow any convention.  

# Note  

Using dgradflag $=1$ produces a global array with $N+3N^{2}+1$ rows which becomes expensive for systems with more than 1000 atoms.  

![](images/a653bd2dcc2db00688c7ec5497962d8b07feb7e91f47cdd13eb5991fb3993006.jpg)  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this fix uses the neighbor list, it also means those pairs will not be included in the calculation. One way to get around this, is to write a dump file, and use the rerun command to compute the ACE descriptors for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

# 3.75.4 Output info  

Compute pace evaluates a global array. The columns are arranged into ntypes blocks, listed in order of atom type I. Each block contains one column for each ACE descriptor, the same as for compute sna/atomin compute snap. A final column contains the corresponding energy, force component on an atom, or virial stress component. The rows of the array appear in the following order:  

• 1 row: pace average descriptor values for all atoms of type I   
• $_{3^{*}n}$ force rows: quantities, with derivatives w.r.t. x, y, and z coordinate of atom $i$ appearing in consecutive rows. The atoms are sorted based on atom ID and run up to the total number of atoms, $n$ .   
• 6 rows: virial quantities summed for all atoms of type I  

For example, if # $B_{i,\nu}=30$ and ntypes $^{=1}$ , the number of columns in the The number of columns in the global array generated by pace are 31, and 931, respectively, while the number of rows is $1{+}3{^{*}n}{+}6$ , where $n$ is the total number of atoms.  

If the bik keyword is set to 1, the structure of the pace array is expanded. The first $N$ rows of the pace array correspond to # $B_{i,\nu}$ instead of a single row summed over atoms $i$ . In this case, the entries in the final column for these rows are set to zero. Also, each row contains only non-zero entries for the columns corresponding to the type of that atom. This is not true in the case of dgradflag keyword $=1$ (see below).  

If the dgradflag keyword is set to 1, this changes the structure of the global array completely. Here the per-atom quantities are replaced with rows corresponding to descriptor gradient components on single atoms:  

$$
\frac{\partial B_{i,\nu}}{\partial r_{j}^{a}}
$$  

where $r_{j}^{a}$ is the $a{\cdot}t h$ position coordinate of the atom with global index $j$ . The rows are organized in chunks, where each chunk corresponds to an atom with global index $j$ . The rows in an atom $j$ chunk correspond to atoms with global index $i.$ The total number of rows for these descriptor gradients is therefore $3N^{2}$ . The number of columns is equal to the number of ACE descriptors, plus 3 additional left-most columns representing the global atom indices i, $j$ , and Cartesian direction $a$ (0, 1, 2, for $\mathbf{X}$ , y, z). The first 3 columns of the first $N$ rows belong to the reference potential force components. The remaining K columns contain the $B_{i,\nu}$ per-atom descriptors corresponding to the non-zero entries obtained when $b i k f a g=1$ . The first column of the last row, after the first $N+3N^{2}$ rows, contains the reference potential energy. The virial components are not used with this option. The total number of rows is therefore $N+3N^{2}+1$ and the number of columns is $K+3$ .  

These values can be accessed by any command that uses global values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

# 3.75.5 Restrictions  

These computes are part of the ML-PACE package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.75.6 Related commands  

pair_style pace pair_style snap compute snap  

# 3.75.7 Default  

The optional keyword defaults are $b i k f a g=0$ , dgradflag $=0$  

(Drautz) Drautz, Phys Rev B, 99, 014104 (2019).   
(Lysogorskiy) Lysogorskiy, van der Oord, Bochkarev, Menon, Rinaldi, Hammerschmidt, Mrovec, Thompson, Csanyi, Ortner, Drautz, npj Comp Mat, 7, 97 (2021).   
(Goff) Goff, Zhang, Negre, Rohskopf, Niklasson, Journal of Chemical Theory and Computation 19, no. 13 (2023).  

# 3.76 compute pair command  

# 3.76.1 Syntax  

compute ID group-ID pair pstyle [nstyle] [evalue]  

• ID, group-ID are documented in compute command   
• pair $=$ style name of this compute command   
• pstyle $=$ style name of a pair style that calculates additional values   
• nsub $=n$ -instance of a sub-style, if a pair style is used multiple times in a hybrid style   
• evalue $=$ epair or evdwl or ecoul or blank (optional)  

# 3.76.2 Examples  

compute 1 all pair gauss   
compute 1 all pair lj/cut/coul/cut ecoul   
compute 1 all pair tersoff 2 epair   
compute 1 all pair reaxff  

# 3.76.3 Description  

Define a computation that extracts additional values calculated by a pair style, and makes them accessible for output or further processing by other commands.  

![](images/44217311c6d20cf93678c1c8ee0edbe0cfabcd9eb267567b3cfa1678410d7888.jpg)  

# Note  

The group specified for this command is ignored.  

The specified pstyle must be a pair style used in your simulation either by itself or as a sub-style in a pair_style hybrid or hybrid/overlay command. If the sub-style is used more than once, an additional number nsub has to be specified in order to choose which instance of the sub-style will be used by the compute. Not specifying the number in this case will cause the compute to fail.  

The evalue setting is optional. All pair styles tally a potential energy epair which may be broken into two parts: evdwl and ecoul such that epair $=e\nu d w l+e c o u l$ . If the pair style calculates Coulombic interactions, their energy will be tallied in ecoul. Everything else (whether it is a Lennard-Jones style van der Waals interaction or not) is tallied in evdwl. If evalue is blank or specified as epair, then epair is stored as a global scalar by this compute. This is useful when using pair_style hybrid if you want to know the portion of the total energy contributed by one sub-style. If evalue is specified as evdwl or ecoul, then just that portion of the energy is stored as a global scalar.  

![](images/7407613120e52dd02d3c213370fd04465690c7af41cd90bc409be0025b9e4c01.jpg)  

# Note  

The energy returned by the evdwl keyword does not include tail corrections, even if they are enabled via the pair_modify command.  

Some pair styles tally additional quantities, e.g. a breakdown of potential energy into 14 components is tallied by the pair_style reaxff command. These values (1 or more) are stored as a global vector by this compute. See the page for individual pair styles for info on these values.  

# 3.76.4 Output info  

This compute calculates a global scalar which is epair or evdwl or ecoul. If the pair style supports it, it also calculates a global vector of length $\geq1$ , as determined by the pair style. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The scalar and vector values calculated by this compute are “extensive”.  

The scalar value will be in energy units. The vector values will typically also be in energy units, but see the page for the pair style for details.  

# 3.76.5 Restrictions  

none  

# 3.76.6 Related commands  

compute pe, compute bond, fix pair  

# 3.76.7 Default  

The keyword defaults are evalue $=$ epair, nsub $=0$ .  

# 3.77 compute pair/local command  

# 3.77.1 Syntax  

ompute ID group-ID pair/local value1 value2 ... keyword args ...  

• ID, group-ID are documented in compute command   
pair/local $=$ style name of this compute command   
• one or more values may be appended   
• value $=$ dist or $d x$ or $d y$ or $d z$ or eng or force or $f x$ or $f y$ or $f\boldsymbol{z}$ or $p I$ or $p2$ or . . . dist $=$ pairwise distance $\mathrm{dx,dy,dz=}$ components of pairwise distance $\mathrm{eng}=$ pairwise energy force $=$ pairwise force fx,fy,fz $=$ components of pairwise force p1, p2, ... $=$ pair style specific quantities for allowed N values  

• zero or more keyword/arg pairs may be appended • keyword $=$ cutoff  

cutoff arg = type or radius  

# 3.77.2 Examples  

<html><body><table><tr><td>compute 1 all pair /local eng</td></tr><tr><td>compute 1 all pair/ /local dist eng force</td></tr><tr><td>compute 1 all pair /local dist eng fx fy fz</td></tr><tr><td>compute 1 all pair/local dist fx fy fz pl p2 p3</td></tr></table></body></html>  

# 3.77.3 Description  

Define a computation that calculates properties of individual pairwise interactions. The number of datums generated, aggregated across all processors, equals the number of pairwise interactions in the system.  

The local data stored by this command is generated by looping over the pairwise neighbor list. Info about an individual pairwise interaction will only be included if both atoms in the pair are in the specified compute group, and if the current pairwise distance is less than the force cutoff distance for that interaction, as defined by the pair_style and pair_coeff commands.  

The value dist is the distance between the pair of atoms. The values $d x,d y$ , and $d z$ are the $(x,y,z)$ components of the distance between the pair of atoms. This value is always the distance from the atom of higher to the one with the lower atom ID.  

The value eng is the interaction energy for the pair of atoms.  

The value force is the force acting between the pair of atoms, which is positive for a repulsive force and negative for an attractive force. The values $f x,f y$ , and $f\boldsymbol{z}$ are the $(x,y,z)$ components of force on atom I. For pair styles that apply non-central forces, such as granular pair styles, these values only include the $(x,y,z)$ components of the normal force component.  

A pair style may define additional pairwise quantities which can be accessed as $p I$ to $p N$ , where $N$ is defined by the pair style. Most pair styles do not define any additional quantities, so $N=0$ . An example of ones that do are the granular pair styles which calculate the tangential force between two particles and return its components and magnitude acting on atom $I$ for $N\in\{1,2,3,4\}$ . See individual pair styles for details.  

When using $p N$ with pair style hybrid, the output will be the Nth quantity from the sub-style that computes the pairwise interaction (based on atom types). If that sub-style does not define a $p N_{:}$ , the output will be 0.0. The maximum allowed $N$ is the maximum number of quantities provided by any sub-style.  

When using $p N$ with pair style hybrid/overlay the quantities from all sub-styles that provide them are concatenated together into one long list. For example, if there are 3 sub-styles and 2 of them have additional output (with 3 and 4 quantities, respectively), then 7 values ( $_{p l}$ up to $p7$ ) are defined. The values $p I$ to $p3$ refer to quantities defined by the first of the two sub-styles. Values $p4$ to $p7$ refer to quantities from the second of the two sub-styles. If the referenced $p N$ is not computed for the specific pairwise interaction (based on atom types), then the output will be 0.0.  

The value dist, $d x,d y$ and $d z$ will be in distance units. The value eng will be in energy units. The values force, fx, fy, and $f\boldsymbol{z}$ will be in force units. The values $p N$ will be in whatever units the pair style defines.  

The optional cutoff keyword determines how the force cutoff distance for an interaction is determined. For the default setting of type, the pairwise cutoff defined by the pair_style command for the types of the two atoms is used. For the radius setting, the sum of the radii of the two particles is used as a cutoff. For example, this is appropriate for granular particles which only interact when they are overlapping, as computed by granular pair styles. Note that if a granular model defines atom types such that all particles of a specific type are monodisperse (same diameter), then the two settings are effectively identical.  

Note that as atoms migrate from processor to processor, there will be no consistent ordering of the entries within the local vector or array from one timestep to the next. The only consistency that is guaranteed is that the ordering on a particular timestep will be the same for local vectors or arrays generated by other compute commands. For example, pair output from the compute property/local command can be combined with data from this command and output by the dump local command in a consistent way.  

Here is an example of how to do this:  

compute 1 all property/local patom1 patom2   
compute 2 all pair/local dist eng force   
dump 1 all local 1000 tmp.dump index c_1[1] c_1[2] c_2[1] c_2[2] c_2[3]  

#  Note  

For pairs, if two atoms I,J are involved in 1–2, 1–3, and 1–4 interactions within the molecular topology, their pairwise interaction may be turned off, and thus they may not appear in the neighbor list, and will not be part of the local data created by this command. More specifically, this will be true of I,J pairs with a weighting factor of 0.0; pairs with a non-zero weighting factor are included. The weighting factors for 1–2, 1–3, and 1–4 pairwise interactions are set by the special_bonds command. An exception is if long-range Coulombics are being computed via the kspace_style command, then atom pairs with weighting factors of zero are still included in the neighbor list, so that a portion of the long-range interaction contribution can be computed in the pair style. Hence in that case, those atom pairs will be part of the local data created by this command.  

# 3.77.4 Output info  

This compute calculates a local vector or local array depending on the number of keywords. The length of the vector or number of rows in the array is the number of pairs. If a single keyword is specified, a local vector is produced. If two or more keywords are specified, a local array is produced where the number of columns $=$ the number of keywords. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The output for dist will be in distance units. The output for eng will be in energy units. The output for force, fx, fy, and $f\boldsymbol{z}$ will be in force units. The output for $p N$ will be in whatever units the pair style defines.  

# 3.77.5 Restrictions  

none  

# 3.77.6 Related commands  

dump local, compute property/local  

# 3.77.7 Default  

The keyword default is cutoff $=$ type.  

# 3.78 compute pe command  

# 3.78.1 Syntax  

compute ID group-ID pe keyword ...  

• ID, group-ID are documented in compute command • pe $=$ style name of this compute command • zero or more keywords may be appended  

• keyword $=$ pair or bond or angle or dihedral or improper or kspace or fix  

# 3.78.2 Examples  

compute 1 all pe compute molPE all pe bond angle dihedral improper  

# 3.78.3 Description  

Define a computation that calculates the potential energy of the entire system of atoms. The specified group must be “all”. See the compute pe/atom command if you want per-atom energies. These per-atom values could be summed for a group of atoms via the compute reduce command.  

The energy is calculated by the various pair, bond, etc. potentials defined for the simulation. If no extra keywords are listed, then the potential energy is the sum of pair, bond, angle, dihedral, improper, $k$ -space (long-range), and fix energy (i.e., it is as though all the keywords were listed). If any extra keywords are listed, then only those components are summed to compute the potential energy.  

The $k$ -space contribution requires 1 extra FFT each timestep the energy is calculated, if using the PPPM solver via the kspace_style pppm command. Thus it can increase the cost of the PPPM calculation if it is needed on a large fraction of the simulation timesteps.  

Various fixes can contribute to the total potential energy of the system if the $f\boldsymbol{u}\boldsymbol{x}$ contribution is included. See the doc pages for individual fixes for details of which ones compute a potential energy.  

![](images/96d7f74ca58d32905af2b00e6c89adcef32661ed7b1f2755f4b885eae25e5785.jpg)  

# Note  

The fix_modify energy yes command must also be specified if a fix is to contribute potential energy to this command.  

A compute of this style with the ID of “thermo_pe” is created when LAMMPS starts up, as if this command were in the input script:  

# 3.78.7 Default  

none  

# 3.79 compute pe/atom command  

# 3.79.1 Syntax  

compute ID group-ID pe/atom keyword ...  

• ID, group-ID are documented in compute command pe/atom $=$ style name of this compute command • zero or more keywords may be appended • keyword $=$ pair or bond or angle or dihedral or improper or kspace or fix  

# 3.79.2 Examples  

<html><body><table><tr><td>compute 1 all pe/atom</td></tr><tr><td>compute 1 all pe/atom pair</td></tr><tr><td>compute 1 all pe/atom pair bond</td></tr><tr><td></td></tr></table></body></html>  

# 3.79.3 Description  

Define a computation that computes the per-atom potential energy for each atom in a group. See the compute pe command if you want the potential energy of the entire system.  

The per-atom energy is calculated by the various pair, bond, etc potentials defined for the simulation. If no extra keywords are listed, then the potential energy is the sum of pair, bond, angle, dihedral, improper, $k$ -space (long-range), and fix energy (i.e., it is as though all the keywords were listed). If any extra keywords are listed, then only those components are summed to compute the potential energy.  

Note that the energy of each atom is due to its interaction with all other atoms in the simulation, not just with other atoms in the group.  

For an energy contribution produced by a small set of atoms (e.g., 4 atoms in a dihedral or 3 atoms in a Tersoff 3-body interaction), that energy is assigned in equal portions to each atom in the set (e.g., 1/4 of the dihedral energy to each of the four atoms).  

The dihedral_style charmm style calculates pairwise interactions between 1–4 atoms. The energy contribution of these terms is included in the pair energy, not the dihedral energy.  

The KSpace contribution is calculated using the method in (Heyes) for the Ewald method and a related method for PPPM, as specified by the kspace_style pppm command. For PPPM, the calculation requires 1 extra FFT each timestep that per-atom energy is calculated. This document describes how the long-range per-atom energy calculation is performed.  

Various fixes can contribute to the per-atom potential energy of the system if the $f\boldsymbol{n}\boldsymbol{x}$ contribution is included. See the doc pages for individual fixes for details of which ones compute a per-atom potential energy.  

# Note  

The fix_modify energy yes command must also be specified if a fix is to contribute per-atom potential energy to this command.  

As an example of per-atom potential energy compared to total potential energy, these lines in an input script should yield the same result in the last 2 columns of thermo output:  

compute peratom all pe/atom compute pe all reduce sum c_peratom thermo_style custom step temp etotal press pe c_pe  

![](images/a3b8d3207d36279dc9eba762f97fd173e925021880d4ce014f85b6c3aa226611.jpg)  

# Note  

The per-atom energy does not include any Lennard-Jones tail corrections to the energy added by the pair_modify tail yes command, since those are contributions to the global system energy.  

# 3.79.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be in energy units.  

# 3.79.5 Restrictions  

# 3.79.6 Related commands  

compute pe, compute stress/atom  

# 3.79.7 Default  

none  

(Heyes) Heyes, Phys Rev B 49, 755 (1994),  

# 3.80 compute plasticity/atom command  

# 3.80.1 Syntax  

compute ID group-ID plasticity/atom  

• ID, group-ID are documented in compute command • plasticity/atom $=$ style name of this compute command  

# 3.80.2 Examples  

This command can be invoked for one of the Peridynamic pair styles: peri/eps.   
The plasticity value will be 0.0 for atoms not in the specified compute group.  

# 3.80.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values are unitless numbers $\lambda\ge0.0$ .  

# 3.80.5 Restrictions  

This compute is part of the PERI package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.80.6 Related commands  

compute damage/atom, compute dilatation/atom  

# 3.80.7 Default  

none  

(Mitchell) Mitchell, “A non-local, ordinary-state-based viscoelasticity model for peridynamics”, Sandia National Lab Report, 8064:1-28 (2011).  

3.81 compute pod/atom command  

3.82 compute podd/atom command  

3.83 compute pod/local command  

3.84 compute pod/global command  

# 3.84.1 Syntax  

compute ID group-ID pod/atom param.pod coefficients.pod compute ID group-ID podd/atom param.pod coefficients.pod compute ID group-ID pod/local param.pod coefficients.pod compute ID group-ID pod/global param.pod coefficients.pod  

• ID, group-ID are documented in compute command   
• pod/atom $=$ style name of this compute command   
param.pod $=$ the parameter file specifies parameters of the POD descriptors   
• coefficients.pod $=$ the coefficient file specifies coefficients of the POD potential  

# 3.84.2 Examples  

<html><body><table><tr><td>compute d all pod/atom Ta_param.pod</td></tr><tr><td>compute dd all podd /atom Ta_param.pod</td></tr><tr><td>compute ldd all pod/local Ta_param.pod</td></tr><tr><td>compute gdd all podd/global Ta_param.pod</td></tr><tr><td>compute d all pod/atom Ta_param.pod Ta_coefficients.pod</td></tr><tr><td>compute dd all podd/ /atom Ta_param.pod Ta_coefficients.pod</td></tr><tr><td>compute ldd all pod/local Ta_param.pod Ta_coefficients.pod</td></tr><tr><td>compute gdd all podd/global Ta_param.pod Ta_coefficients.pod</td></tr></table></body></html>  

# 3.84.3 Description  

Added in version 27June2024.  

Define a computation that calculates a set of quantities related to the POD descriptors of the atoms in a group. These computes are used primarily for calculating the dependence of energy and force components on the linear coefficients in the pod pair_style, which is useful when training a POD potential to match target data. POD descriptors of an atom are characterized by the radial and angular distribution of neighbor atoms. The detailed mathematical definition is given in the papers by (Nguyen and Rohskopf), (Nguyen2023), (Nguyen2024), and (Nguyen and Sema).  

Compute pod/atom calculates the per-atom POD descriptors.  

Compute podd/atom calculates derivatives of the per-atom POD descriptors with respect to atom positions.   
Compute pod/local calculates the per-atom POD descriptors and their derivatives with respect to atom positions.   
Compute pod/global calculates the global POD descriptors and their derivatives with respect to atom positions.   
Examples how to use Compute POD commands are found in the directory examples/PACKAGES/pod.  

![](images/7325f7ad57c44dbd03dfc9ac3665f6fd578007298be931596012fd8a2fbcfa7d.jpg)  

# Warning  

All of these compute styles produce very large per-atom output arrays that scale with the total number of atoms in the system. This will result in very large memory consumption for systems with a large number of atoms.  

# 3.84.4 Output info  

Compute pod/atom produces an 2D array of size $N\times M$ , where $N$ is the number of atoms and $M$ is the number of descriptors. Each column corresponds to a particular POD descriptor.  

Compute podd/atom produces an 2D array of size $N\times(M*3N)$ . Each column corresponds to a particular derivative of a POD descriptor.  

Compute pod/local produces an 2D array of size $(1+3N)\times(M*N)$ . The first row contains the per-atom descriptors, and the last 3N rows contain the derivatives of the per-atom descriptors with respect to atom positions.  

Compute pod/global produces an 2D array of size $(1+3N)\times(M)$ . The first row contains the global descriptors, and the last 3N rows contain the derivatives of the global descriptors with respect to atom positions.  

# 3.84.5 Restrictions  

These computes are part of the ML-POD package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.84.6 Related commands  

fitpod, pair_style pod  

# 3.84.7 Default  

none  

(Nguyen and Rohskopf) Nguyen and Rohskopf, Journal of Computational Physics, 480, 112030, (2023).   
(Nguyen2023) Nguyen, Physical Review B, 107(14), 144103, (2023).   
(Nguyen2024) Nguyen, Journal of Computational Physics, 113102, (2024).   
(Nguyen and Sema) Nguyen and Sema, https://arxiv.org/abs/2405.00306, (2024).  

# 3.85 compute pressure command  

# 3.85.1 Syntax  

compute ID group-ID pressure temp-ID keyword ...  

• ID, group-ID are documented in compute command   
• pressure $=$ style name of this compute command   
• temp- $\mathrm{\cdotID}=\mathrm{ID}$ of compute that calculates temperature, can be NULL if not needed   
• zero or more keywords may be appended   
• keyword $=k e$ or pair or bond or angle or dihedral or improper or kspace or fix or virial or pair/hybrid  

# 3.85.2 Examples  

compute 1 all pressure thermo_temp compute 1 all pressure NULL pair bond compute 1 all pressure NULL pair/hybrid lj/cut  

# 3.85.3 Description  

Define a computation that calculates the pressure of the entire system of atoms. The specified group must be “all”. See the compute stress/atom command if you want per-atom pressure (stress). These per-atom values could be summed for a group of atoms via the compute reduce command.  

The pressure is computed by the formula  

$$
P={\frac{N k_{B}T}{V}}+{\frac{1}{V d}}\sum_{i=1}^{N^{\prime}}{\vec{r}}_{i}\cdot{\vec{f}}_{i}
$$  

where $N$ is the number of atoms in the system (see discussion of DOF below), $k_{B}$ is the Boltzmann constant, $T$ is the temperature, $d$ is the dimensionality of the system (2 for 2d, 3 for 3d), and $V$ is the system volume (or area in 2d). The second term is the virial, equal to $-d U/d V$ , computed for all pairwise as well as 2-body, 3-body, 4-body, many-body, and long-range interactions, where $\vec{r}_{i}$ and $\vec{f}_{i}$ are the position and force vector of atom $i$ , and the dot indicates the dot product (scalar product). This is computed in parallel for each subdomain and then summed over all parallel processes. Thus $N^{\prime}$ necessarily includes atoms from neighboring subdomains (so-called ghost atoms) and the position and force vectors of ghost atoms are thus included in the summation. Only when running in serial and without periodic boundary conditions is $N^{\prime}=N$ the number of atoms in the system. Fixes that impose constraints (e.g., the fix shake command) may also contribute to the virial term.  

A symmetric pressure tensor, stored as a 6-element vector, is also calculated by this compute. The six components of the vector are ordered $x x,y y,z z,x y,x z,y z.$ . The equation for the $(I,J)$ components (where $I$ and $J$ are $x,y$ , or $z$ ) is similar to the above formula, except that the first term uses components related to the kinetic energy tensor and the second term uses components of the virial tensor:  

$$
P_{I J}=\frac{1}{V}\sum_{k=1}^{N}m_{k}\nu_{k_{I}}\nu_{k_{J}}+\frac{1}{V}\sum_{k=1}^{N^{\prime}}r_{k_{I}}f_{k_{J}}.
$$  

If no extra keywords are listed, the entire equations above are calculated. This includes a kinetic energy (temperature) term and the virial as the sum of pair, bond, angle, dihedral, improper, kspace (long-range), and fix contributions to the force on each atom. If any extra keywords are listed, then only those components are summed to compute temperature or ke and/or the virial. The virial keyword means include all terms except the kinetic energy $k e$ .  

The pair/hybrid keyword means to only include contribution from a sub-style in a hybrid or hybrid/overlay pair style.  

Details of how LAMMPS computes the virial efficiently for the entire system, including for many-body potentials and accounting for the effects of periodic boundary conditions are discussed in (Thompson).  

The temperature and kinetic energy tensor are not calculated by this compute, but rather by the temperature compute specified with the command. See the doc pages for individual compute temp variants for an explanation of how they calculate temperature and a symmetric tensor (6-element vector) whose components are twice that of the traditional KE tensor. That tensor is what appears in the pressure tensor formula above.  

If the kinetic energy is not included in the pressure, than the temperature compute is not used and can be specified as NULL. Normally the temperature compute used by compute pressure should calculate the temperature of all atoms for consistency with the virial term, but any compute style that calculates temperature can be used (e.g., one that excludes frozen atoms or other degrees of freedom).  

Note that if desired the specified temperature compute can be one that subtracts off a bias to calculate a temperature using only the thermal velocity of the atoms (e.g., by subtracting a background streaming velocity). See the doc pages for individual compute commands to determine which ones include a bias.  

Also note that the $N$ in the first formula above is really degrees-of-freedom divided by $d=$ dimensionality, where the DOF value is calculated by the temperature compute. See the various compute temperature styles for details.  

A compute of this style with the ID of thermo_press is created when LAMMPS starts up, as if this command were in the input script:  

# 3.85.5 Restrictions  

none  

# 3.85.6 Related commands  

compute temp, compute stress/atom, thermo_style, fix numdiff/virial,  

# 3.85.7 Default  

By default the compute includes contributions from the keywords: ke pair bond angle dihedral improper kspace fix  

(Thompson) Thompson, Plimpton, Mattson, J Chem Phys, 131, 154107 (2009).  

# 3.86 compute pressure/alchemy command  

# 3.86.1 Syntax  

compute ID group-ID pressure/alchemy fix-ID  

• ID, group-ID are documented in compute command • pressure/alchemy $=$ style name of this compute command • fix-ID = ID of fix alchemy command  

# 3.86.2 Examples  

fix trans all alchemy compute mixed all pressure/alchemy trans thermo_modify press mixed  

# 3.86.3 Description  

Added in version 28Mar2023.  

Define a compute style that makes the “mixed” system pressure available for a system that uses the fix alchemy command to transform one topology to another. This can be used in combination with either thermo_modify press or fix_modify press to output and access a pressure consistent with the simulated combined two topology system.  

The actual pressure is determined with compute pressure commands that are internally used by fix alchemy for each topology individually and then combined. This command just extracts the information from the fix.  

The examples/PACKAGES/alchemy folder contains an example input for this command.  

# 3.86.4 Output info  

This compute calculates a global scalar (the pressure) and a global vector of length 6 (the pressure tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The ordering of values in the symmetric pressure tensor is as follows: $p_{x x},p_{y y},p_{z z},p_{x y},p_{x z},p_{y z}.$  

The scalar and vector values calculated by this compute are “intensive”. The scalar and vector values will be in pressur units.  

# 3.86.5 Restrictions  

This compute is part of the REPLICA package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.86.6 Related commands  

fix alchemy, compute pressure, thermo_modify, fix_modify  

# 3.86.7 Default  

none  

# 3.87 compute pressure/uef command  

# 3.87.1 Syntax  

compute ID group-ID pressure/uef temp-ID keyword ...  

• ID, group-ID are documented in compute command   
• pressure/uef $=$ style name of this compute command   
• temp- $\mathrm{\cdotID}=\mathrm{ID}$ of compute that calculates temperature, can be NULL if not needed   
• zero or more keywords may be appended   
• keyword $=k e$ or pair or bond or angle or dihedral or improper or kspace or fix or virial  

# 3.87.2 Examples  

<html><body><table><tr><td>compute 1 all pressure/uef my_temp_uef</td></tr><tr><td>compute 2 all pressure/ /uef my_temp_uef virial</td></tr></table></body></html>  

# 3.87.3 Description  

This command is used to compute the pressure tensor in the reference frame of the applied flow field when fix nvt/uef or fix npt/uef is used. It is not necessary to use this command to compute the scalar value of the pressure. A compute pressure may be used for that purpose.  

The keywords and output information are documented in compute_pressure.  

# 3.87.4 Restrictions  

This fix is part of the UEF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This command can only be used when fix nvt/uef or fix npt/uef is active.  

The kinetic contribution to the pressure tensor will be accurate only when the compute specified by temp-ID is a compute temp/uef .  

# 3.87.5 Related commands  

compute pressure, fix nvt/uef , compute temp/uef  

# 3.87.6 Default  

none  

# 3.88 compute property/atom command  

# 3.88.1 Syntax  

compute ID group-ID property/atom input1 input2 ...  

• ID, group-ID are documented in compute command • property/atom $=$ style name of this compute command • input $=$ one or more atom attributes  

possible attributes $=\mathrm{id}$ , mol, proc, type, mass, x, y, z, xs, ys, zs, xu, yu, zu, ix, iy, iz, vx, vy, vz, fx, fy, fz, q, mux, muy, muz, mu, spx, spy, spz, sp, fmx, fmy, fmz, nbonds, radius, diameter, omegax, omegay, omegaz, temperature, heatflow, angmomx, angmomy, angmomz, shapex, shapey, shapez, quatw, quati, quatj, quatk, tqx, tqy, tqz, end1x, end1y, end1z, end2x, end2y, end2z, corner1x, corner1y, corner1z, corner2x, corner2y, corner2z, corner3x, corner3y, corner3z, i_name, d_name, i2_name[I], d2_name[I], vfrac, s0, espin, eradius, ervel, erforce, rho, drho, e, de, cv, buckling,  

id = atom ID   
mol = molecule ID   
proc = ID of processor that owns atom   
type $-$ atom type   
mass = atom mass   
x,y,z = unscaled atom coordinates   
xs,ys,zs = scaled atom coordinates   
xu,yu,zu $-$ unwrapped atom coordinates   
ix,iy,iz = box image that the atom is in   
vx,vy,vz $-$ atom velocities   
fx,fy,fz = forces on atoms   
q = atom charge   
mux,muy,muz = orientation of dipole moment of atom   
mu = magnitude of dipole moment of atom   
spx, spy, spz = direction of the atomic magnetic spin   
sp = magintude of atomic magnetic spin moment   
fmx, fmy, fmz = magnetic force   
nbonds = number of bonds assigned to an atom   
radius,diameter = radius,diameter of spherical particle   
omegax,omegay,omegaz $-$ angular velocity of spherical particle   
temperature = internal temperature of spherical particle   
heatflow = internal heat flow of spherical particle   
angmomx,angmomy,angmomz = angular momentum of aspherical particle   
shapex,shapey,shapez = 3 diameters of aspherical particle   
quatw,quati,quatj,quatk = quaternion components for aspherical or body particles   
tqx,tqy,tqz = torque on finite-size particles   
end12x, end12y, $\mathrm{end12z=end}$ points of line segment   
corner123x, corner123y, corner123z = corner points of triangle   
i_name = custom integer vector with name   
d_name = custom floating point vector with name   
i2_name[I] = Ith column of custom integer array with name   
d2_name[I] = Ith column of custom floating-point array with name  

PERI package per-atom properties: vfrac = volume fraction $\mathrm{s0=max}$ stretch of any bond a particle is part of  

EFF and AWPMD package per-atom properties:   
espin $=$ electron spin   
eradius $=$ electron radius   
ervel = electron radial velocity   
erforce $=$ electron radial force   
SPH package per-atom properties:   
rho = density of SPH particles   
drho = change in density   
e = energy   
de = change in thermal energy   
cv = heat capacity  

# 3.88.2 Examples  

compute 1 all property/atom xs vx fx mux   
compute 2 all property/atom type   
compute 1 all property/atom ix iy iz   
compute 3 all property/atom sp spx spy spz   
compute 1 all property/atom i_myFlag d_Sxyz[1] d_Sxyz[3]  

# 3.88.3 Description  

Define a computation that simply stores atom attributes for each atom in the group. This is useful so that the values can be used by other output commands that take computes as inputs. See for example, the compute reduce, fix ave/atom, fix ave/histo, fix ave/chunk, and atom-style variable commands.  

The list of possible attributes is essentially the same as that used by the dump custom command, which describes their meaning, with some additional quantities that are only defined for certain atom styles. The goal of this augmented list gives an input script access to any per-atom quantity stored by LAMMPS.  

The values are stored in a per-atom vector or array as discussed below. Zeroes are stored for atoms not in the specified group or for quantities that are not defined for a particular particle in the group (e.g., shapex if the particle is not an ellipsoid).  

Attributes i_name, d_name, i2_name, d2_name refer to custom per-atom integer and floating-point vectors or arrays that have been added via the fix property/atom command. When that command is used specific names are given to each attribute which are the “name” portion of these attributes. For arrays i2_name and d2_name, the column of the array must also be included following the name in brackets (e.g., d2_xyz[2] or i2_mySpin[3]).  

The additional quantities only accessible via this command, and not directly via the dump custom command, are as follows.  

Nbonds is available for all molecular atom styles and refers to the number of explicit bonds assigned to an atom. Note that if the newton bond command is set to on, which is the default, then every bond in the system is assigned to only one of the two atoms in the bond. Thus a bond between atoms $I$ and $J$ may be tallied for either atom $I$ or atom $J$ . If newton bond off is set, it will be tallied with both atom $I$ and atom $J$ .  

The quantities shapex, shapey, and shapez are defined for ellipsoidal particles and define the 3d shape of each particle.  

The quantities quatw, quati, quatj, and quatk are defined for ellipsoidal particles and body particles and store the 4- vector quaternion representing the orientation of each particle. See the set command for an explanation of the quaternion vector.  

End1x, end1y, end1z, end2x, end2y, end2z, are defined for line segment particles and define the end points of each line segment.  

Corner1x, corner1y, corner1z, corner2x, corner2y, corner2z, corner3x, corner3y, corner3z, are defined for triangula particles and define the corner points of each triangle.  

In addition, the various per-atom quantities listed above for specific packages are only accessible by this command.  

Changed in version 15Sep2022: The espin property was previously called spin.  

# 3.88.4 Output info  

This compute calculates a per-atom vector or per-atom array depending on the number of input values. If a single input is specified, a per-atom vector is produced. If two or more inputs are specified, a per-atom array is produced where the number of columns $=$ the number of inputs. The vector or array can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector or array values will be in whatever units the corresponding attribute is in (e.g., velocity units for vx, charge units for $q$ ).  

For the spin quantities, $s p$ is in the units of the Bohr magneton; spx, spy, and spz are unitless quantities; and fmx, fmy, and fmz are given in rad/THz.  

# 3.88.5 Restrictions  

none  

# 3.88.6 Related commands  

dump custom, compute reduce, fix ave/atom, fix ave/chunk, fix property/atom  

# 3.88.7 Default  

none  

# 3.89 compute property/chunk command  

# 3.89.1 Syntax  

compute ID group-ID property/chunk chunkID input1 input2 ...  

• ID, group-ID are documented in compute command • property/chunk $=$ style name of this compute command • chunkID $=\mathrm{ID}$ of compute chunk/atom command that defines the chunks  

• input1,etc $=$ one or more attributes  

attribute $\mathrm{;=count}$ , id, coord1, coord2, coord3 $\mathrm{count}=\#$ of atoms in chunk id $=$ original chunk IDs before compression by compute chunk/atom coord $123=$ coordinates for spatial bins calculated by compute chunk/atom  

# 3.89.2 Examples  

<html><body><table><tr><td>compute 1 all property/chunk bin2d id count</td></tr><tr><td>compute 1 all property/ chunk myChunks id coord1</td></tr></table></body></html>  

# 3.89.3 Description  

Define a computation that stores the specified attributes of chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

This compute calculates and stores the specified attributes of chunks as global data so they can be accessed by other output commands and used in conjunction with other commands that generate per-chunk data, such as compute com/chunk or compute msd/chunk.  

Note that only atoms in the specified group contribute to the calculation of the count attribute. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

The count attribute is the number of atoms in the chunk.  

The id attribute stores the original chunk ID for each chunk. It can only be used if the compress keyword was set to yes for the compute chunk/atom command referenced by chunkID. This means that the original chunk IDs (e.g., molecule IDs) will have been compressed to remove chunk IDs with no atoms assigned to them. Thus a compressed chunk ID of 3 may correspond to an original chunk ID (molecule ID in this case) of 415. The id attribute will then be 415 for the third chunk.  

The coordN attributes can only be used if a binning style was used in the compute chunk/atom command referenced by chunkID. For bin/1d, bin/2d, and bin/3d styles the attribute is the center point of the bin in the corresponding dimension. Style bin/1d only defines a coord1 attribute. Style bin/2d adds a coord2 attribute. Style bin/3d adds a coord3 attribute.  

Note that if the value of the units keyword used in the compute chunk/atom command is box or lattice, the coordN attributes will be in distance units. If the value of the units keyword is reduced, the coordN attributes will be in unitless reduced units (0-1).  

The simplest way to output the results of the compute property/chunk calculation to a file is to use the fix ave/time command, for example:  

compute cc1 all chunk/atom molecule   
compute myChunk1 all property/chunk cc1 count   
compute myChunk2 all com/chunk cc1   
fix 1 all ave/time 100 1 100 c_myChunk1 c_myChunk2[\*] file tmp.out mode vector  

# 3.89.4 Output info  

This compute calculates a global vector or global array depending on the number of input values. The length of the vector or number of rows in the array is the number of chunks.  

This compute calculates a global vector or global array where the number of rows $=$ the number of chunks Nchunk as calculated by the specified compute chunk/atom command. If a single input is specified, a global vector is produced. If two or more inputs are specified, a global array is produced where the number of columns $=$ the number of inputs. The vector or array can be accessed by any command that uses global values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector or array values are “intensive”. The values will be unitless or in the units discussed above.  

# 3.89.5 Restrictions  

none  

# 3.89.6 Related commands  

fix ave/chunk  

# 3.89.7 Default  

none  

# 3.90 compute property/grid command  

# 3.90.1 Syntax  

compute ID group-ID property/grid Nx Ny Nz input1 input2 ...  

• ID, group-ID are documented in compute command property/grid $=$ style name of this compute command • Nx, Ny, $\mathbf{Nz}=$ grid size in each dimension • input1,etc $=$ one or more attributes  

attributes = id, ix, iy, iz, x, y, z, xs, ys, zs, xc, yc, zc, xsc, ysc, zsc $\mathrm{id}=\mathrm{ID}$ of grid cell, x fastest, y next, z slowest proc $=$ processor ID (0 to Nprocs-1) which owns the grid cell ix,iy,iz $=$ grid indices in each dimension (1 to N inclusive) x,y,z = coords of lower left corner of grid cell xs,ys,zs $=$ scaled coords of lower left corner of grid cell (0.0 to 1.0) xc,yc,zc = coords of center point of grid cell xsc,ysc,zsc $=$ scaled coords of center point of grid cell (0.0 to 1.0)  

# 3.90.2 Examples  

<html><body><table><tr><td>ZI K1 xI p1 07 01 01 pua /A4edo1d 1e I 04ndo compute 1 all property/ /grid 100 100 1 id xc yc zc</td></tr></table></body></html>  

# 3.90.3 Description  

Define a computation that stores the specified attributes of a distributed grid. In LAMMPS, distributed grids are regular 2d or 3d grids which overlay a 2d or 3d simulation domain. Each processor owns the grid cells whose center points lie within its subdomain. See the Howto grid doc page for details of how distributed grids can be defined by various commands and referenced.  

This compute stores the specified attributes of grids as per-grid data so they can be accessed by other output commands such as dump grid.  

$N x,N y$ , and $N z$ define the size of the grid. For a 2d simulation $N z$ must be 1. When this compute is used by dump grid, to output per-grid values from other computes of fixes, the grid size specified for this command must be consistent with the grid sizes used by the other commands.  

The id attribute is the grid ID for each grid cell. For a global grid of size $\mathbf{Nx}$ by Ny by $\mathbf{Nz}$ (in 3d simulations) the grid IDs range from 1 to $\mathrm{Nx^{*}N y^{*}N z}$ . They are ordered with the X index of the 3d grid varying fastest, then Y, then Z slowest. For 2d grids (in 2d simulations), the grid IDs range from 1 to $\mathrm{{Nx}^{*}\mathrm{{Ny},}}$ , with X varying fastest and Y slowest.  

Added in version 21Nov2023.  

The proc attribute is the ID of the processor which owns the grid cell. Processor IDs range from 0 to Nprocs - 1, where Nprocs is the number of processors the simulation is running on. Each grid cell is owned by a single processor.  

The ix, iy, iz attributes are the indices of a grid cell in each dimension. They range from 1 to Nx inclusive in the X dimension, and similar for Y and Z.  

The $x$ , y, z attributes are the coordinates of the lower left corner point of each grid cell.  

The xs, ys, zs attributes are also coordinates of the lower left corner point of each grid cell, except in scaled coordinates, where the lower-left corner of the entire simulation box is (0,0,0) and the upper right corner is (1,1,1).  

The xc, yc, zc attributes are the coordinates of the center point of each grid cell.  

The xsc, ysc, zsc attributes are also coordinates of the center point each grid cell, except in scaled coordinates, where the lower-left corner of the entire simulation box is (0,0,0) and the upper right corner is (1,1,1).  

For triclinic simulation boxes, the grid point coordinates for (x,y,z) and (xc,yc,zc) will reflect the triclinic geometry.   
For (xs,yz,zs) and (xsc,ysc,zsc), the coordinates are the same for orthogonal versus triclinic boxes.  

# 3.90.4 Output info  

This compute calculates a per-grid vector or array depending on the number of input values. The length of the vector or number of array rows (distributed across all processors) is $\mathrm{Nx^{*}N y^{*}N z}$ . For access by other commands, the name of the single grid produced by this command is “grid”. The name of its per-grid data is “data”.  

The (x,y,z) and (xc,yc,zc) coordinates are in distance units.  

# 3.90.5 Restrictions  

For 2d simulations, the attributes which refer to the Z dimension cannot be used.  

# 3.90.6 Related commands  

dump grid  

# 3.90.7 Default  

none  

# 3.91 compute property/local command  

# 3.91.1 Syntax  

compute ID group-ID property/local attribute1 attribute2 ... keyword args ...  

• ID, group-ID are documented in compute command   
• property/local $=$ style name of this compute command   
• one or more attributes of the same type (neighbor, pair, bond, angle, dihedral, or improper) may be appended  

possible attributes $=$ natom1, natom2, ntype1, ntype2, patom1, patom2, ptype1, ptype2, batom1, batom2, btype, aatom1, aatom2, aatom3, atype, datom1, datom2, datom3, datom4, dtype, iatom1, iatom2, iatom3, iatom4, itype  

– Neighbor attributes  

natom1, natom2 $=$ store IDs of two atoms in each pair (within neighbor cutoff) ntype1, ntype2 $=$ store types of two atoms in each pair (within neighbor cutoff)  

– Pair attributes  

patom1, patom $2=$ store IDs of two atoms in each pair (within force cutoff) ptype1, ptype2 $=$ store types of two atoms in each pair (within force cutoff)  

– Bond attributes  

batom1, batom2 = store IDs of two atoms in each bond btype $=$ store bond type of each bond  

– Angle attributes  

aatom1, aatom2, aatom $3=$ store IDs of three atoms in each angle atype $=$ store angle type of each angle  

– Dihedral attributes  

datom1, datom2, datom3, datom4 = store IDs of 4 atoms in each dihedral dtype $=$ store dihedral type of each dihedral  

– Improper attributes  

iatom1, iatom2, iatom3, iatom4 $=$ store IDs of 4 atoms in each improper itype $=$ store improper type of each improper  

• zero or more keyword/arg pairs may be appended   
• keyword $=$ cutoff cutoff arg $=$ type or radius  

# 3.91.2 Examples  

<html><body><table><tr><td>compute 1 all property/local btype batom1 batom2</td></tr><tr><td>compute 1 all property/local atype aatom2</td></tr></table></body></html>  

# 3.91.3 Description  

Define a computation that stores the specified attributes as local data so it can be accessed by other output commands. If the input attributes refer to bond information, then the number of datums generated, aggregated across all processors, equals the number of bonds in the system. Ditto for pairs, angles, etc.  

If multiple attributes are specified then they must all generate the same amount of information, so that the resulting local array has the same number of rows for each column. This means that only bond attributes can be specified together, or angle attributes, etc. Bond and angle attributes cannot be mixed in the same compute property/local command.  

If the inputs are pair attributes, the local data is generated by looping over the pairwise neighbor list. Info about an individual pairwise interaction will only be included if both atoms in the pair are in the specified compute group. For natom1 and natom2, all atom pairs in the neighbor list are considered (out to the neighbor cutoff $=$ force cutoff $^+$ neighbor skin). For patom1 and patom2, the distance between the atoms must be less than the force cutoff distance for that pair to be included, as defined by the pair_style and pair_coeff commands.  

The optional cutoff keyword determines how the force cutoff distance for an interaction is determined for the patom1 and patom2 attributes. For the default setting of type, the pairwise cutoff defined by the pair_style command for the types of the two atoms is used. For the radius setting, the sum of the radii of the two particles is used as a cutoff. For example, this is appropriate for granular particles which only interact when they are overlapping, as computed by granular pair styles. Note that if a granular model defines atom types such that all particles of a specific type are monodisperse (same diameter), then the two settings are effectively identical.  

If the inputs are bond, angle, etc attributes, the local data is generated by looping over all the atoms owned on a processor and extracting bond, angle, etc info. For bonds, info about an individual bond will only be included if both atoms in the bond are in the specified compute group. Likewise for angles, dihedrals, etc.  

For bonds and angles, a bonds/angles that have been broken by setting their bond/angle type to 0 will not be included. Bonds/angles that have been turned off (see the fix shake or delete_bonds commands) by setting their bond/angle type negative are written into the file. This is consistent with the compute bond/local and compute angle/local commands  

Note that as atoms migrate from processor to processor, there will be no consistent ordering of the entries within the local vector or array from one timestep to the next. The only consistency that is guaranteed is that the ordering on a particular timestep will be the same for local vectors or arrays generated by other compute commands. For example, output from the compute bond/local command can be combined with bond atom indices from this command and output by the dump local command in a consistent way.  

The natom1 and natom2 or patom1 and patom2 attributes refer to the atom IDs of the two atoms in each pairwise interaction computed by the pair_style command. The ntype1 and ntype2 or ptype1 and ptype2 attributes refer to the atom types of the two atoms in each pairwise interaction.  

#  Note  

For pairs, if two atoms $I,J$ are involved in 1–2, 1–3, 1–4 interactions within the molecular topology, their pairwise interaction may be turned off, and thus they may not appear in the neighbor list, and will not be part of the local data created by this command. More specifically, this may be true of $I,J$ pairs with a weighting factor of 0.0; pairs with a non-zero weighting factor are included. The weighting factors for 1–2, 1–3, and 1–4 pairwise interactions are set by the special_bonds command.  

The batom1 and batom2 attributes refer to the atom IDs of the 2 atoms in each bond. The btype attribute refers to the type of the bond, from 1 to Nbtypes $=\#$ of bond types. The number of bond types is defined in the data file read by the  

read_data command.  

The attributes that start with “a”, “d”, and “i” refer to similar values for angles, dihedrals, and impropers.  

# 3.91.4 Output info  

This compute calculates a local vector or local array depending on the number of input values. The length of the vector or number of rows in the array is the number of bonds, angles, etc. If a single input is specified, a local vector is produced. If two or more inputs are specified, a local array is produced where the number of columns $=$ the number of inputs. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector or array values will be integers that correspond to the specified attribute.  

# 3.91.5 Restrictions  

none  

# 3.91.6 Related commands  

dump local, compute reduce  

# 3.91.7 Default  

The keyword default is cutoff $=$ type.  

# 3.92 compute ptm/atom command  

# 3.92.1 Syntax  

compute ID group-ID ptm/atom structures threshold group2-ID  

• ID, group-ID are documented in compute command   
• ptm/atom $=$ style name of this compute command   
• structures $=$ default or all or any hyphen-separated combination of fcc, hcp, bcc, ico, sc, dcub, dhex, or graphene $=$ structure types to search for   
• threshold $=$ lattice distortion threshold (RMSD)   
• group2-ID determines which group is used for neighbor selection (optional, default “all”)  

# 3.92.2 Examples  

<html><body><table><tr><td>compute 1 all ptm/atom default 0.1 all</td></tr><tr><td></td></tr><tr><td>compute 1 all ptm/ atom fcc-hcp-dcub-dhex 0.15 all</td></tr><tr><td>compute 1 all ptm/atom all 0</td></tr></table></body></html>  

# 3.92.3 Description  

Define a computation that determines the local lattice structure around an atom using the PTM (Polyhedral Template Matching) method. The PTM method is described in (Larsen).  

Currently, there are seven lattice structures PTM recognizes:  

• fcc = 1  

• hcp = 2   
• bcc = 3   
• ico (icosahedral) $=4$   
• sc (simple cubic) $=5$   
• dcub (diamond cubic) $=6$   
• dhex (diamond hexagonal) $=7$   
• graphene $=8$  

The value of the PTM structure will be 0 for unknown types and $^{-1}$ for atoms not in the specified compute group. The choice of structures to search for can be specified using the “structures” argument, which is a hyphen-separated list of structure keywords. Two convenient pre-set options are provided:  

• default: fcc-hcp-bcc-ico • all: fcc-hcp-bcc-ico-sc-dcub-dhex-graphene  

The ‘default’ setting detects the same structures as the Common Neighbor Analysis method. The ‘all’ setting searches for all structure types. A performance penalty is incurred for the diamond and graphene structures, so it is not recommended to use this option if it is known that the simulation does not contain these structures.  

PTM identifies structures using two steps. First, a graph isomorphism test is used to identify potential structure matches. Next, the deviation is computed between the local structure (in the simulation) and a template of the ideal lattice structure. The deviation is calculated as:  

$$
\mathrm{RMSD}(\mathbf{u},\mathbf{v})=\operatorname*{min}_{s,\mathbf{Q}}\sqrt{\frac{1}{N}\sum_{i=1}^{N}\left\|s[\vec{u}_{i}-\bar{\mathbf{u}}]-\mathbf{Q}\cdot\vec{\nu}_{i}\right\|^{2}}
$$  

Here, $\vec{u}$ and $\vec{\nu}$ contain the coordinates of the local and ideal structures respectively, $s$ is a scale factor, and Q is a rotation. The best match is identified by the lowest RMSD value, using the optimal scaling, rotation, and correspondence between the points.  

The threshold keyword sets an upper limit on the maximum permitted deviation before a local structure is identified as disordered. Typical values are in the range 0.1–0.15, but larger values may be desirable at higher temperatures. A value of 0 is equivalent to infinity and can be used if no threshold is desired.  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (e.g., each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently or to have multiple compute/dump commands, each with a ptm/atom style. By default the compute processes all neighbors unless the optional group2-ID argument is given, then only members of that group are considered as neighbors.  

# 3.92.4 Output info  

This compute calculates a per-atom array, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

Results are stored in the per-atom array in the following order:  

• type   
rmsd   
• interatomic distance qw   
• qx   
qy  

qz  

The type is a number from $^{-1}$ to 8. The rmsd is a positive real number. The interatomic distance is computed from the scale factor in the RMSD equation. The $(q w,q x,q y,q z)$ parameters represent the orientation of the local structure in quaternion form. The reference coordinates for each template (from which the orientation is determined) can be found in the ptm_constants. $h$ file in the PTM source directory. For atoms that are not within the compute group-ID, all values are set to zero.  

# 3.92.5 Restrictions  

This fix is part of the PTM package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.92.6 Related commands  

compute centro/atom compute cna/atom  

# 3.92.7 Default  

none  

(Larsen) Larsen, Schmidt, Schiotz, Modelling Simul Mater Sci Eng, 24, 055007 (2016).  

# 3.93 compute rattlers/atom command  

# 3.93.1 Syntax  

compute ID group-ID rattlers/atom cutoff zmin ntries  

• ID, group-ID are documented in compute command   
• rattlers/atom $=$ style name of this compute command   
• cutof $=t y p e$ or radius type $=$ cutoffs determined based on atom types radius $=$ cutoffs determined based on atom diameters (atom style sphere)   
• zmin $=$ minimum coordination for a non-rattler atom   
• ntries $=$ maximum number of iterations to remove rattlers  

# 3.93.2 Examples  

Rattlers are identified using an interactive approach. The coordination number of all atoms is first calculated. The type and radius settings are used to select whether interaction cutoffs are determined by atom types or by the sum of atomic radii (atom style sphere), respectively. Rattlers are then identified as atoms with a coordination number less than zmin and are removed from consideration. Atomic coordination numbers are then recalculated, excluding previously identified rattlers, to identify a new set of rattlers. This process is iterated up to a maximum of ntries or until no new rattlers are identified and the remaining atoms form a stable network of contacts.  

In dense homogeneous systems where the average atom coordination number is expected to be larger than zmin, this process usually only takes a few iterations and a value of ntries around ten may be sufficient. In systems with significant heterogeneity or average coordination numbers less than zmin, an appropriate value of ntries depends heavily on the specific system. For instance, a linear chain of N rattler atoms with a zmin of 2 would take N/2 iterations to identify that all the atoms are rattlers.  

# 3.93.4 Output info  

This compute calculates a per-atom vector and a global scalar. The vector designates which atoms are rattlers, indicated by a value 1. Non-rattlers have a value of 0. The global scalar returns the total number of rattlers in the system. See the Howto output page for an overview of LAMMPS output options.  

# 3.93.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package See the Build package page for more info.  

The radius cutoff option requires that atoms store a radius as defined by the atom_style sphere or similar commands.  

# 3.93.6 Related commands  

compute coord/atom compute contact/atom  

# 3.93.7 Default  

none  

# 3.94 compute rdf command  

# 3.94.1 Syntax  

compute ID group-ID rdf Nbin itype1 jtype1 itype2 jtype2 ... keyword/value ...  

• ID, group-ID are documented in compute command   
• rdf $=$ style name of this compute command   
• Nbin $=$ number of RDF bins   
• itypeN $=$ central atom type for Nth RDF histogram (integer, type label, or asterisk form)   
• jtypeN $=$ distribution atom type for Nth RDF histogram (integer, type label, or asterisk form)   
• zero or more keyword/value pairs may be appended   
• keyword $=$ cutoff cutoff valu $\underline{{\mathbf{\Pi}}}=\operatorname{Rcut}$ Rcut $=$ cutoff distance for RDF computation (distance units)  

# 3.94.2 Examples  

compute 1 all rdf 100   
compute 1 all rdf 100 1 1   
compute 1 all rdf $100~^{*}~3$ cutoff 5.0   
compute 1 fluid rdf 500 1 1 1 2 2 1 2 2   
compute 1 fluid rdf $5001^{*}325^{*}10$ cutoff 3.5  

# 3.94.3 Description  

Define a computation that calculates the radial distribution function (RDF), also called $g(r)$ , and the coordination number for a group of particles. Both are calculated in histogram form by binning pairwise distances into Nbin bins from 0.0 to the maximum force cutoff defined by the pair_style command or the cutoff distance Rcut specified via the cutoff keyword. The bins are of uniform size in radial distance. Thus a single bin encompasses a thin shell of distances in 3d and a thin ring of distances in 2d.  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this fix uses a neighbor list, it also means those pairs will not be included in the RDF. This does not apply when using long-range coulomb interactions (coul/long, coul/msm, coul/wolf or similar. One way to get around this would be to set special_bond scaling factors to very tiny numbers that are not exactly zero (e.g., $1.0\times10^{-50}.$ ). Another workaround is to write a dump file, and use the rerun command to compute the RDF for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

By default the RDF is computed out to the maximum force cutoff defined by the pair_style command. If the cutoff keyword is used, then the RDF is computed accurately out to the $R c u t>0.0$ distance specified.  

# Note  

Normally, you should only use the cutoff keyword if no pair style is defined (e.g., the rerun command is being used to post-process a dump file of snapshots) or if you really want the RDF for distances beyond the pair_style force cutoff and cannot easily post-process a dump file to calculate it. This is because using the cutoff keyword incurs extra computation and possibly communication, which may slow down your simulation. If you specify $R c u t\le$ force cutoff, you will force an additional neighbor list to be built at every timestep this command is invoked (or every reneighboring timestep, whichever is less frequent), which is inefficient. LAMMPS will warn you if this is the case. If you specify a Rcut $>$ force cutoff, you must ensure ghost atom information out to $R c u t+s k i n$ is communicated, via the comm_modify cutoff command, else the RDF computation cannot be performed, and LAMMPS will give an error message. The skin value is what is specified with the neighbor command. In this case, you are forcing a large neighbor list to be built just for the RDF computation, and extra communication to be performed every timestep.  

The itypeN and jtypeN arguments are optional. These arguments must come in pairs. If no pairs are listed, then a single histogram is computed for $g(r)$ between all atom types. If one or more pairs are listed, then a separate histogram is generated for each itype,jtype pair.  

The itypeN and jtypeN settings can be specified in one of three ways. One or both of the types in the I,J pair can be a type label. Or an explicit numeric value can be used, as in the fourth example above. Or a wild-card asterisk can be used to specify a range of atom types. This takes the form “\*” or $\mathbf{\overline{{\rho}}}^{\mathbf{6}\mathbf{*}}\mathbf{\overline{{n}}}^{\mathbf{,}\mathbf{,}}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\rightarrow}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m  

to n (inclusive).  

If both itypeN and jtypeN are single values, as in the fourth example above, this means that a $g(r)$ is computed where atoms of type itypeN are the central atom, and atoms of type jtypeN are the distribution atom. If either itypeN and jtypeN represent a range of values via the wild-card asterisk, as in the fifth example above, this means that a $g(r)$ is computed where atoms of any of the range of types represented by itypeN are the central atom, and atoms of any of the range of types represented by jtypeN are the distribution atom.  

Pairwise distances are generated by looping over a pairwise neighbor list, just as they would be in a pair_style computation. The distance between two atoms $I$ and $J$ is included in a specific histogram if the following criteria are met:  

• atoms $I$ and $J$ are both in the specified compute group • the distance between atoms $I$ and $J$ is less than the maximum force cutof • the type of the $I$ atom matches itypeN (one or a range of types) • the type of the $J$ atom matches jtypeN (one or a range of types)  

It is OK if a particular pairwise distance is included in more than one individual histogram, due to the way the itypeN and jtypeN arguments are specified.  

The $g(r)$ value for a bin is calculated from the histogram count by scaling it by the idealized number of how many counts there would be if atoms of type jtypeN were uniformly distributed. Thus it involves the count of itypeN atoms, the count of jtypeN atoms, the volume of the entire simulation box, and the volume of the bin’s thin shell in 3d (or the area of the bin’s thin ring in 2d).  

A coordination number coord $(r)$ is also calculated, which is the number of atoms of type jtypeN within the current bin or closer, averaged over atoms of type itypeN. This is calculated as the area- or volume-weighted sum of $g(r)$ values over all bins up to and including the current bin, multiplied by the global average volume density of atoms of type jtypeN.  

The simplest way to output the results of the compute rdf calculation to a file is to use the fix ave/time command, for example:  

<html><body><table><tr><td>compute myRDF all rdf 50</td></tr><tr><td>fix 1 all ave/time 100 1 100 c_myRDF[*] file tmp.rdf mode vector</td></tr></table></body></html>  

# 3.94.4 Output info  

This compute calculates a global array in which the number of rows is Nbins and the number of columns is $1+2N_{\mathrm{pairs}}$ , where $N_{\mathrm{pairs}}$ is the number of $I,J$ pairings specified. The first column has the bin coordinate (center of the bin), and each successive set of two columns has the $g(r)$ and coord $(r)$ values for a specific set of itypeN versus jtypeN interactions, as described above. These values can be used by any command that uses a global values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The array values calculated by this compute are all “intensive”.  

The first column of array values will be in distance units. The $g(r)$ columns of array values are normalized numbers $\ge0.0$ . The coordination number columns of array values are also numbers $\ge0.0$ .  

# 3.94.5 Restrictions  

By default, the RDF is not computed for distances longer than the largest force cutoff, since the neighbor list creation will only contain pairs up to that distance (plus neighbor list skin). This distance can be increased using the cutoff keyword but this keyword is only valid with neighbor styles ‘bin’ and ‘nsq’.  

If you want an RDF for larger distances, you can also use the rerun command to post-process a dump file, use pair style zero and set the force cutoff to be longer in the rerun script. Note that in the rerun context, the force cutoff is arbitrary and with pair style zero you are not computing any forces, and you are not running dynamics you are not changing the model that generated the trajectory.  

The definition of $g(r)$ used by LAMMPS is only appropriate for characterizing atoms that are uniformly distributed throughout the simulation cell. In such cases, the coordination number is still correct and meaningful. As an example, if a large simulation cell contains only one atom of type itypeN and one of jtypeN, then $g(r)$ will register an arbitrarily large spike at whatever distance they happen to be at, and zero everywhere else. The function coord $(r)$ will show a step change from zero to one at the location of the spike in $g(r)$ .  

# Note  

compute rdf can handle dynamic groups and systems where atoms are added or removed, but this causes that certain normalization parameters need to be re-computed in every step and include collective communication operations This will reduce performance and limit parallel efficiency and scaling. For systems, where only the type of atoms changes (e.g., when using fix atom/swap), you need to explicitly request the dynamic normalization updates via compute_modify dynamic/dof yes  

# 3.94.6 Related commands  

fix ave/time, compute_modify, compute adf  

# 3.94.7 Default  

The keyword defaults are cutof $=0.0$ (use the pairwise force cutoff).  

# 3.95 compute reaxff/atom command  

Accelerator Variants: reaxff/atom/kk  

# 3.95.1 Syntax  

compute ID group-ID reaxff/atom attribute args ... keyword value ...  

• ID, group-ID are documented in compute command   
• reaxff/atom $=$ name of this compute command   
• attribute $=$ pair pair $\mathrm{args=nsub}$ nsub $=\mathrm{~n~}$ -instance of a sub-style, if a pair style is used multiple times in a hybrid style   
• keyword $=$ bonds bonds value $=\mathrm{no}$ or yes no $=$ ignore list of local bonds yes $=$ include list of local bonds  

# 3.95.2 Examples  

compute 1 all reaxff/atom bonds yes  

# 3.95.3 Description  

Added in version 7Feb2024.  

Define a computation that extracts bond information computed by the ReaxFF potential specified by pair_style reaxff . By default, it produces per-atom data that includes the following columns:  

• abo $=$ atom bond order (sum of all bonds) • nlp $=$ number of lone pairs • nb $=$ number of bonds  

Bonds will only be included if its atoms are in the group.  

In addition, if bonds is set to yes, the compute will also produce a local array of all bonds on the current processor whose atoms are in the group. The columns of each entry of this local array are:  

• id_ $\mathrm{i}=$ atom i id of bond • id_j $=$ atom j id of bond • bo $=$ bond order of bond  

# 3.95.4 Output info  

This compute calculates a per-atom array and local array depending on the number of keywords. The number of rows in the local array is the number of bonds as described above. Both per-atom and local array have 3 columns.  

The arrays can be accessed by any command that uses local and per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 3.95.5 Restrictions  

The compute reaxff/atom command requires that the pair_style reaxff is invoked. This fix is part of the REAXFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.95.6 Related commands  

pair_style reaxff  

# 3.95.7 Default  

The option defaults are $b o n d s=n o$ .  

3.96 compute reduce command  

# 3.97 compute reduce/region command  

# 3.97.1 Syntax  

compute ID group-ID style arg mode input1 input2 ... keyword args ...  

• ID, group-ID are documented in compute command   
• style $=$ reduce or reduce/region reduce arg $=$ none reduce/region arg $=$ region-ID region- $\mathrm{\cdotID}=\mathrm{ID}$ of region to use for choosing atoms   
• mode $=s u m$ or min or minabs or max or maxabs or ave or sumsq or avesq or sumabs or aveabs   
• one or more inputs can be listed   
• input $=x$ or $y$ or $z$ or $\nu x$ or vy or $\nu z$ or $f x$ or $f y$ or fz or c_ID or c_ID[N] or f_ID or f_ID[N] or v_name x,y,z,vx,vy,vz,fx,fy,fz $=$ atom attribute (position, velocity, force component) $\mathrm{c\_ID}=\mathrm{per}$ -atom or local vector calculated by a compute with ID $\mathrm{c\_ID[I]=Ith}$ column of per-atom or local array calculated by a compute with ID, I can include␣ $\hookrightarrow$ wildcard (see below) f_ID = per-atom or local vector calculated by a fix with ID $\mathrm{f}\_\mathrm{ID}[\mathrm{I}]=\mathrm{I}$ th column of per-atom or local array calculated by a fix with ID, I can include wildcard␣ $\hookrightarrow$ (see below) v_name $=$ per-atom vector calculated by an atom-style variable with name   
• zero or more keyword/args pairs may be appended   
• keyword $=$ replace or inputs replace $\mathrm{args=vec1}$ vec2 $\mathrm{vec1}=$ reduced value from this input vector will be replaced $\mathrm{vec2=}$ replace it with vec1[N] where N is index of max/min value from vec2 inputs arg $=$ peratom or local peratom $=$ all inputs are per-atom quantities (default) local $=$ all input are local quantities  

# 3.97.2 Examples  

compute 1 all reduce sum c_force   
compute 1 all reduce/region subbox sum c_force   
compute 2 all reduce min c_press[2] f_ave v_myKE   
compute 2 all reduce min c_press[\*] f_ave v_myKE inputs peratom   
compute 3 fluid reduce max c_index[1] c_index[2] c_dist replace 1 3 replace 2 3   
compute 4 all reduce max c_bond inputs local  

# 3.97.3 Description  

Define a calculation that “reduces” one or more vector inputs into scalar values, one per listed input. For the compute reduce command, the inputs can be either per-atom or local quantities and must all be of the same kind (per-atom or local); see discussion of the optional inputs keyword below. The compute reduce/region command can only be used with per-atom inputs.  

Atom attributes are per-atom quantities, computes and fixes can generate either per-atom or local quantities, and atomstyle variables generate per-atom quantities. See the variable command and its special functions which can perform the same reduction operations as the compute reduce command on global vectors.  

The reduction operation is specified by the mode setting. The sum option adds the values in the vector into a global total. The min or max options find the minimum or maximum value across all vector values. The minabs or maxabs options find the minimum or maximum value across all absolute vector values. The ave setting adds the vector values into a global total, then divides by the number of values in the vector. The sumsq option sums the square of the values in the vector into a global total. The avesq setting does the same as sumsq, then divides the sum of squares by the number of values. The last two options can be useful for calculating the variance of some quantity (e.g., variance $=$ sumsq − ave2). The sumabs option sums the absolute values in the vector into a global total. The aveabs setting does the same as sumabs, then divides the sum of absolute values by the number of values.  

Each listed input is operated on independently. For per-atom inputs, the group specified with this command means only atoms within the group contribute to the result. Likewise for per-atom inputs, if the compute reduce/region command is used, the atoms must also currently be within the region. Note that an input that produces per-atom quantities may define its own group which affects the quantities it returns. For example, if a compute is used as an input which generates a per-atom vector, it will generate values of 0.0 for atoms that are not in the group specified for that compute.  

Each listed input can be an atom attribute (position, velocity, force component) or can be the result of a compute or $f\boldsymbol{{x}}$ or the evaluation of an atom-style variable.  

Note that for values from a compute or fix, the bracketed index $I$ can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\rightarrow}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the size of the vector (for mode $=$ scalar) or the number of columns in the array (for mode $=$ vector), then an asterisk with no numeric values means all indices from 1 to $N$ . A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from m to $N$ (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual columns of the array had been listed one by one. For example, the following two compute reduce commands are equivalent, since the compute stress/atom command creates a per-atom array with six columns:  

compute myPress all stress/atom NULL   
compute 2 all reduce min c_myPress[\*]   
compute 2 all reduce min c_myPress[1] c_myPress[2] c_myPress[3] & c_myPress[4] c_myPress[5] c_myPress[6]  

The atom attribute values (x, y, z, vx, vy, vz, fx, fy, and $f\boldsymbol{z},$ ) are self-explanatory. Note that other atom attributes can be used as inputs to this fix by using the compute property/atom command and then specifying an input value from that compute.  

If a value begins with $\mathrm{~\"~}\mathrm{~c~}_{-}\mathrm{~,~}$ , a compute ID must follow which has been previously defined in the input script. Valid computes can generate per-atom or local quantities. See the individual compute page for details. If no bracketed integer is appended, the vector calculated by the compute is used. If a bracketed integer is appended, the Ith column of the array calculated by the compute is used. Users can also write code for their own compute styles and add them to LAMMPS. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

If a value begins with “f_”, a fix ID must follow which has been previously defined in the input script. Valid fixes can generate per-atom or local quantities. See the individual $f\boldsymbol{a}\boldsymbol{x}$ page for details. Note that some fixes only produce their values on certain timesteps, which must be compatible with when compute reduce references the values, else an error results. If no bracketed integer is appended, the vector calculated by the fix is used. If a bracketed integer is appended, the Ith column of the array calculated by the fix is used. Users can also write code for their own fix style and add them to LAMMPS. See the discussion above for how $I$ can be specified with a wildcard asterisk to effectively specify multiple values.  

If a value begins with “v_”, a variable name must follow which has been previously defined in the input script. It must be an atom-style variable. Atom-style variables can reference thermodynamic keywords and various per-atom attributes, or invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of generating per-atom quantities to reduce.  

If the replace keyword is used, two indices vec1 and vec2 are specified, where each index ranges from 1 to the number of input values. The replace keyword can only be used if the mode is min or max. It works as follows. $\mathrm{A\operatorname*{min}/m a x}$ is computed as usual on the vec2 input vector. The index $N$ of that value within vec2 is also stored. Then, instead of performing a min/max on the vec1 input vector, the stored index is used to select the Nth element of the vec1 vector.  

Thus, for example, if you wish to use this compute to find the bond with maximum stretch, you can do it as follows:  

compute 1 all property/local batom1 batom2 compute 2 all bond/local dist compute 3 all reduce max c_1[1] c_1[2] c_2 replace 1 3 replace 2 3 thermo_style custom step temp c_3[1] c_3[2] c_3[3]  

The first two input values in the compute reduce command are vectors with the IDs of the two atoms in each bond, using the compute property/local command. The last input value is bond distance, using the compute bond/local command. Instead of taking the max of the two atom ID vectors, which does not yield useful information in this context, the replace keywords will extract the atom IDs for the two atoms in the bond of maximum stretch. These atom IDs and the bond stretch will be printed with thermodynamic output.  

Added in version 21Nov2023.  

The inputs keyword allows selection of whether all the inputs are per-atom or local quantities. As noted above, all the inputs must be the same kind (per-atom or local). Per-atom is the default setting. If a compute or fix is specified as an input, it must produce per-atom or local data to match this setting. If it produces both, like for example the compute voronoi/atom command, then this keyword selects between them. If a compute only produces local data, like for example the compute bond/local command, the setting “inputs local” is required.  

If a single input is specified this compute produces a global scalar value. If multiple inputs are specified, this compute produces a global vector of values, the length of which is equal to the number of inputs specified.  

As discussed below, for the sum, sumabs, and sumsq modes, the value(s) produced by this compute are all “extensive”, meaning their value scales linearly with the number of atoms involved. If normalized values are desired, this compute can be accessed by the thermo_style custom command with thermo_modify norm yes set as an option. Or it can be accessed by a variable that divides by the appropriate atom count.  

# 3.97.4 Output info  

This compute calculates a global scalar if a single input value is specified or a global vector of length $N$ , where $N$ is the number of inputs, and which can be accessed by indices 1 to $N$ . These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

All the scalar or vector values calculated by this compute are “intensive”, except when the sum, sumabs, or sumsq modes are used on per-atom or local vectors, in which case the calculated values are “extensive”.  

The scalar or vector values will be in whatever units the quantities being reduced are in.  

# 3.97.5 Restrictions  

As noted above, the compute reduce/region command can only be used with per-atom inputs.  

# 3.97.6 Related commands  

compute, fix, variable  

# 3.97.7 Default  

The default value for the inputs keyword is peratom.  

# 3.98 compute reduce/chunk command  

# 3.98.1 Syntax  

compute ID group-ID reduce/chunk chunkID mode input1 input2 ...  

• ID, group-ID are documented in compute command   
• reduce/chunk $=$ style name of this compute command   
• chunkID $=\mathrm{ID}$ of compute chunk/atom command   
• mode $=$ sum or min or max   
• one or more inputs can be listed   
• i $\mathrm{nput}=\mathrm{c}\_\mathrm{ID}$ , c_ID[N], f_ID, f_ID[N], v_ID   
$\mathrm{\overbrace{c\_ID}=p e r}.$ -atom vector calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ column of per-atom array calculated by a compute with ID, I can include wildcard␣   
$\hookrightarrow$ (see below)   
$\mathrm{f}\_\mathrm{ID}=\mathrm{per}$ -atom vector calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ column of per-atom array calculated by a fix with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)   
v_name = per-atom vector calculated by an atom-style variable with name  

# 3.98.2 Examples  

compute 1 all reduce/chunk mychunk min c_cluster  

# 3.98.3 Description  

Define a calculation that reduces one or more per-atom vectors into per-chunk values. This can be useful for diagnostic output. Or when used in conjunction with the compute chunk/spread/atom command it can be used to create per-atom values that induce a new set of chunks with a second compute chunk/atom command. An example is given below.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

For each atom, this compute accesses its chunk ID from the specified chunkID compute. The per-atom value from an input contributes to a per-chunk value corresponding the chunk ID.  

# 3.98. compute reduce/chunk command  

The reduction operation is specified by the mode setting and is performed over all the per-atom values from the atoms in each chunk. The sum option adds the per-atom values to a per-chunk total. The min or max options find the minimum or maximum value of the per-atom values for each chunk.  

Note that only atoms in the specified group contribute to the reduction operation. If the chunkID compute returns a 0 for the chunk ID of an atom (i.e., the atom is not in a chunk defined by the compute chunk/atom command), that atom will also not contribute to the reduction operation. An input that is a compute or fix may define its own group which affects the quantities it returns. For example, a compute will return a zero value for atoms that are not in the group specified for that compute.  

Each listed input is operated on independently. Each input can be the result of a compute or $f\boldsymbol{{x}}$ or the evaluation of an atom-style variable.  

Note that for values from a compute or fix, the bracketed index I can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\rightarrow}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the size of the vector (for mode $=$ scalar) or the number of columns in the array (for mode $=$ vector), then an asterisk with no numeric values means all indices from 1 to $N$ . A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from n to $N$ (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual columns of the array had been listed one by one. For example, the following two compute reduce/chunk commands are equivalent, since the compute property/chunk command creates a per-atom array with 3 columns:  

compute prop all property/atom vx vy vz   
compute 10 all reduce/chunk mychunk max c_prop[\*]   
compute 10 all reduce/chunk mychunk max c_prop[1] c_prop[2] c_prop[3]  

Here is an example of using this compute, in conjunction with the compute chunk/spread/atom command to identify self-assembled micelles. The commands below can be added to the examples/in.micelle script.  

Imagine a collection of polymer chains or small molecules with hydrophobic end groups. All the hydrophobic (HP) atoms are assigned to a group called “phobic”.  

These commands will assign a unique cluster ID to all HP atoms within a specified distance of each other. A cluster will contain all HP atoms in a single molecule, but also the HP atoms in nearby molecules (e.g., molecules that have clumped to form a micelle due to the attraction induced by the hydrophobicity). The output of the chunk/reduce command will be a cluster ID per chunk (molecule). Molecules with the same cluster ID are in the same micelle.  

group phobic type 4 # specific to in.micelle model compute cluster phobic cluster/atom 2.0 compute cmol all chunk/atom molecule compute reduce phobic reduce/chunk cmol min c_cluster  

This per-chunk info could be output in at least two ways:  

fix 10 all ave/time 1000 1 1000 c_reduce file tmp.phobic mode vector compute spread all chunk/spread/atom cmol c_reduce dump 1 all custom 1000 tmp.dump id type mol x y z c_cluster c_spread dump_modify 1 sort id  

In the first case, each snapshot in the tmp.phobic file will contain one line per molecule. Molecules with the same value are in the same micelle. In the second case each dump snapshot contains all atoms, each with a final field with the cluster ID of the micelle that the HP atoms of that atom’s molecule belong to.  

The result from compute chunk/spread/atom can be used to define a new set of chunks, where all the atoms in all the molecules in the same micelle are assigned to the same chunk (i.e., one chunk per micelle).  

compute micelle all chunk/atom c_spread compress yes  

Further analysis on a per-micelle basis can now be performed using any of the per-chunk computes listed on the Howto chunk doc page (e.g., count the number of atoms in each micelle, calculate its center or mass, shape/moments of inertia, and radius of gyration).  

compute prop all property/chunk micelle count fix 20 all ave/time 1000 1 1000 c_prop file tmp.micelle mode vector  

Each snapshot in the tmp.micelle file will have one line per micelle with its count of atoms, plus a first line for a chunk with all the solvent atoms. By the time 50000 steps have elapsed, there are a handful of large micelles.  

# 3.98.4 Output info  

This compute calculates a global vector if a single input value is specified, otherwise a global array is output. The number of columns in the array is the number of inputs provided. The length of the vector or the number of vector elements or array rows $=$ the number of chunks Nchunk as calculated by the specified compute chunk/atom command. The vector or array can be accessed by any command that uses global values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom values for the vector or each column of the array will be in whatever units the corresponding input value is in. The vector or array values are “intensive”.  

# 3.98.5 Restrictions  

none  

# 3.98.6 Related commands  

compute chunk/atom, compute reduce, compute chunk/spread/atom  

# 3.98.7 Default  

none  

# 3.99 compute rheo/property/atom command  

# 3.99.1 Syntax  

compute ID group-ID rheo/property/atom input1 input2 ...  

• ID, group-ID are documented in compute command • rheo/property/atom $=$ style name of this compute command • input $=$ one or more atom attributes  

possible attributes $=$ phase, surface, surface/r, surface/divr, surface/n/a, coordination, shift/v/a, energy, temperature, heatflow, conductivity, cv, viscosity, pressure, rho, grad/v/ab, stress/v/ab, stress/t/ab, nbond/shell  

# 3.99. compute rheo/property/atom command  

phase $=$ atom phase state   
surface $-$ atom surface status   
surface/r = atom distance from the surface   
surface/divr = divergence of position at atom position   
surface/ $\mathbf{n}/\mathbf{a_{\alpha}}=\mathbf{a_{\alpha}}$ -component of surface normal vector   
coordination = coordination number   
shift/ $\mathbf{v}/\mathbf{a}=\mathbf{a}$ -component of atom shifting velocity   
energy = atom energy   
temperature = atom temperature   
heatflow = atom heat flow   
conductivity = atom conductivity   
cv = atom specific heat   
viscosity $-$ atom viscosity   
pressure = atom pressure   
rho = atom density   
grad/v/ab = ab-component of atom velocity gradient tensor   
stress/v/ab = ab-component of atom viscous stress tensor   
stress/t/ab = ab-component of atom total stress tensor (pressure and viscous)   
nbond/shell = number of oxide bonds  

# 3.99.2 Examples  

compute 1 all rheo/property/atom phase surface/r surface/n/\* pressure compute 2 all rheo/property/atom shift/v/x grad/v/xx stress/v/\*  

# 3.99.3 Description  

Added in version $29\mathrm{Aug}2024$ .  

Define a computation that stores atom attributes specific to the RHEO package for each atom in the group. This is useful so that the values can be used by other output commands that take computes as inputs. See for example, the compute reduce, fix ave/atom, fix ave/histo, fix ave/chunk, and atom-style variable commands.  

For vector attributes, e.g. shift/v/ α, one must specify $\alpha$ as the $x,y$ , or z component, e.g. shift/v/x. Alternatively, a wild card \* will include all components, $x$ and $y$ in 2D or $x,y,$ , and $z$ in 3D.  

For tensor attributes, e.g. grad/v/ $\alpha\beta$ , one must specify both $\alpha$ and $\beta$ as $x,y$ , or z, e.g. grad/v/xy. Alternatively, a wild card \* will include all components. In 2D, this includes xx, xy, $y x$ , and yy. In 3D, this includes xx, xy, xz, yx, yy, yz, zx, zy, and zz.  

Many properties require their respective fixes, listed below in related commands, be defined. For instance, the viscosity attribute is the viscosity of a particle calculated by fix rheo/viscosity. The meaning of less obvious properties is described below.  

The phase property indicates whether the particle is in a fluid state, a value of 0, or a solid state, a value of 1.  

The surface property indicates the surface designation produced by the interface/reconstruct option of fix rheo. Bulk particles have a value of 0, surface particles have a value of 1, and splash particles have a value of 2. The surface/r property is the distance from the surface, up to the kernel cutoff length. Surface particles have a value of 0. The surface/n/ $\alpha$ properties are the components of the surface normal vector.  

The shift/v/ $\alpha$ properties are the components of the shifting velocity produced by the shift option of fix rheo  

The nbond/shell property is the number of shell bonds that have been activated from bond style rheo/shell.  

The values are stored in a per-atom vector or array as discussed below. Zeroes are stored for atoms not in the specified group or for quantities that are not defined for a particular particle in the group  

# 3.99.4 Output info  

This compute calculates a per-atom vector or per-atom array depending on the number of input values. Generally, if a single input is specified, a per-atom vector is produced. If two or more inputs are specified, a per-atom array is produced where the number of columns $=$ the number of inputs. However, if a wild card \* is used for a vector or tensor, then the number of inputs is considered to be incremented by the dimension or the dimension squared, respectively. The vector or array can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector or array values will be in whatever units the corresponding attribute is in (e.g., density units for rho).  

# 3.99.5 Restrictions  

none  

# 3.99.6 Related commands  

dump custom, compute reduce, fix ave/atom, fix ave/chunk, fix rheo/viscosity, fix rheo/pressure, fix rheo/thermal, fix rheo/oxdiation, fix rheo  

# 3.99.7 Default  

none  

# 3.100 compute rigid/local command  

# 3.100.1 Syntax  

compute ID group-ID rigid/local rigidID input1 input2 ...  

• ID, group-ID are documented in compute command • rigid/local $=$ style name of this compute command • rigidID $=$ ID of fix rigid/small command or one of its variants • input $=$ one or more rigid body attributes  

possible attributes $=$ id, mol, mass, x, y, z, xu, yu, zu, ix, iy, iz vx, vy, vz, fx, fy, fz, omegax, omegay, omegaz, angmomx, angmomy, angmomz, quatw, quati, quatj, quatk, tqx, tqy, tqz, inertiax, inertiay, inertiaz  

id = atom ID of atom within body which owns body properties   
mol = molecule ID used to define body in fix rigid/small command   
mass $-$ total mass of body   
x,y,z = center of mass coords of body   
xu,yu,zu = unwrapped center of mass coords of body   
ix,iy,iz $-$ box image that the center of mass is in   
vx,vy,vz $-$ center of mass velocities   
fx,fy,fz $=$ force of center of mass   
omegax,omegay,omegaz $=$ angular velocity of body  

angmomx,angmomy,angmomz $=$ angular momentum of body quatw,quati,quatj,quatk $=$ quaternion components for body tqx,tqy,tqz $=$ torque on body inertiax,inertiay,inertiaz $=$ diagonalized moments of inertia of body  

# 3.100.2 Examples  

# 3.100.3 Description  

Define a computation that simply stores rigid body attributes for rigid bodies defined by the fix rigid/small command or one of its NVE, NVT, NPT, NPH variants. The data is stored as local data so it can be accessed by other output commands that process local data, such as the compute reduce or dump local commands.  

Note that this command only works with the fix rigid/small command or its variants, not the fix rigid command and its variants. The ID of the fix rigid/small command used to define rigid bodies must be specified as rigidID. The $f\alpha$ rigid command is typically used to define a handful of (potentially very large) rigid bodies. It outputs similar per-body information as this command directly from the fix as global data; see the fix rigid page for details  

The local data stored by this command is generated by looping over all the atoms owned on a processor. If the atom is not in the specified group- $\mathbf{\nabla}\cdot I D$ or is not part of a rigid body it is skipped. If it is not the atom within a body that is assigned to store the body information it is skipped (only one atom per body is so assigned). If it is the assigned atom, then the info for that body is output. This means that information for $N$ bodies is generated. $N$ may be less than the number of bodies defined by the fix rigid command, if the atoms in some bodies are not in the group- $\mathbf{\nabla}\cdot I D$ .  

![](images/a8339f97fb9f0140a3c000cfb08a98cbfeb3bb7edb8995a0ca5992a36c69f9c0.jpg)  

# Note  

Which atom in a body owns the body info is determined internal to LAMMPS; it’s the one nearest the geometric center of the body. Typically you should avoid this complication, by defining the group associated with this fix to include/exclude entire bodies.  

Note that as atoms and bodies migrate from processor to processor, there will be no consistent ordering of the entries within the local vector or array from one timestep to the next.  

Here is an example of how to use this compute to dump rigid body info to a file:  

compute 1 all rigid/local myRigid mol x y z fx fy fz dump 1 all local 1000 tmp.dump index c_1[1] c_1[2] c_1[3] c_1[4] c_1[5] c_1[6] c_1[7]  

This section explains the rigid body attributes that can be specified.  

The id attribute is the atom-ID of the atom which owns the rigid body, which is assigned by the fix rigid/small command.  

The mol attribute is the molecule ID of the rigid body. It should be the molecule ID which all of the atoms in the body belong to, since that is how the fix rigid/small command defines its rigid bodies.  

The mass attribute is the total mass of the rigid body.  

There are two options for outputting the coordinates of the center of mass (COM) of the body. The $x$ , y, z attributes write the COM “unscaled”, in the appropriate distance units (Å, $\sigma$ , etc). Use xu, yu, zu if you want the COM “unwrapped” by the image flags for each body. Unwrapped means that if the body COM has passed through a periodic boundary one or more times, the value is generated what the COM coordinate would be if it had not been wrapped back into the periodic box.  

The image flags for the body can be generated directly using the ix, iy, $i z$ attributes. For periodic dimensions, they specify which image of the simulation box the COM is considered to be in. An image of 0 means it is inside the box as defined. A value of 2 means add 2 box lengths to get the true value. A value of −1 means subtract 1 box length to get the true value. LAMMPS updates these flags as the rigid body COMs cross periodic boundaries during the simulation.  

The vx, vy, vz, fx, fy, fz attributes are components of the COM velocity and force on the COM of the body.  

The omegax, omegay, and omegaz attributes are the angular velocity components of the body in the system frame around its COM.  

The angmomx, angmomy, and angmomz attributes are the angular momentum components of the body in the system frame around its COM.  

The quatw, quati, quatj, and quatk attributes are the components of the 4-vector quaternion representing the orientation of the rigid body. See the set command for an explanation of the quaternion vector.  

The tqx, tqy, tqz attributes are components of the torque acting on the body around its COM.  

The inertiax, inertiay, inertiaz attributes are components of diagonalized inertia tensor for the body (i.e., the thre moments of inertia for the body around its principal axes), as computed internally by LAMMPS.  

# 3.100.4 Output info  

This compute calculates a local vector or local array depending on the number of keywords. The length of the vector or number of rows in the array is the number of rigid bodies. If a single keyword is specified, a local vector is produced. If two or more keywords are specified, a local array is produced where the number of columns $=$ the number of keywords. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector or array values will be in whatever units the corresponding attribute is in:  

• id,mol $=$ unitless   
• mass $=$ mass units   
• x,y,z and xy,yu,zu $=$ distance units   
• vx,vy,vz $=$ velocity units   
• fx,fy,fz $=$ force units   
• omegax,omegay,omegaz $=$ radians/time units angmomx,angmomy,angmomz $=$ mass\*distance2/time units quatw,quati,quatj,quatk $=$ unitless   
• tqx,tqy,tqz $=$ torque units   
• inertiax,inertiay,inertiaz $=$ mass\*distance2 units  

# 3.100.5 Restrictions  

This compute is part of the RIGID package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.100.6 Related commands  

dump local, compute reduce  

# 3.100.7 Default  

none  

# 3.101 compute saed command  

# 3.101.1 Syntax  

compute ID group-ID saed lambda type1 type2 ... typeN keyword value ...  

• ID, group-ID are documented in compute command   
• saed $=$ style name of this compute command   
• lambda $=$ wavelength of incident radiation (length units)   
• type1 type2 . . . typeN $=$ chemical symbol of each atom type (see valid options below)   
• zero or more keyword/value pairs may be appended   
• keyword $=$ Kmax or Zone or dR_Ewald or $c$ or manual or echo Kmax value $=$ Maximum distance explored from reciprocal space origin (inverse length units) Zone values = z1 z2 z3 $\mathrm{z1,z2,z3=Zo}$ ne axis of incident radiation. If z1=z2=z3=0 all reciprocal space will be meshed up to Kmax dR_Ewald value = Thickness of Ewald sphere slice intercepting reciprocal space (inverse length units) c values = c1 c2 c3 c1,c2,c3 = parameters to adjust the spacing of the reciprocal lattice nodes in the h, k, and l directions respectively manual $=$ flag to use manual spacing of reciprocal lattice points based on the values of the c parameters echo = flag to provide extra output for debugging purposes  

# 3.101.2 Examples  

compute 1 all saed 0.0251 Al O Kmax 1.70 Zone 0 0 1 dR_Ewald 0.01 c 0.5 0.5 0.5 compute 2 all saed 0.0251 Ni Kmax 1.70 Zone 0 0 0 c 0.05 0.05 0.05 manual echo fix 1 all saed/vtk 1 1 1 c_1 file Al2O3_001.saed   
fix 2 all saed/vtk 1 1 1 c_2 file Ni_000.saed  

# 3.101.3 Description  

Define a computation that calculates electron diffraction intensity as described in (Coleman) on a mesh of reciprocal lattice nodes defined by the entire simulation domain (or manually) using simulated radiation of wavelength lambda.  

The electron diffraction intensity I at each reciprocal lattice point is computed from the structure factor F using the equations:  

$$
\begin{array}{c}{{I=\displaystyle\frac{F^{*}F}{N}}}\ {{F({\bf k})=\sum_{j=1}^{N}f_{j}(\theta)e x p(2\pi i{\bf k}\cdot{\bf r}_{j})}}\end{array}
$$  

Here, K is the location of the reciprocal lattice node, $r_{j}$ is the position of each atom, $f_{j}$ are atomic scattering factors.  

Diffraction intensities are calculated on a three-dimensional mesh of reciprocal lattice nodes. The mesh spacing is defined either (a) by the entire simulation domain or (b) manually using selected values as shown in the 2D diagram below.  

![](images/ee368424cdbcf0b4b7e3518d691bbaeb3e3018c51799bb82f7317bf9c186dfbb.jpg)  

For a mesh defined by the simulation domain, a rectilinear grid is constructed with spacing $c^{*}\mathrm{inv}(\mathrm{A})$ along each reciprocal lattice axis. Where A are the vectors corresponding to the edges of the simulation cell. If one or two directions has non-periodic boundary conditions, then the spacing in these directions is defined from the average of the (inversed) box lengths with periodic boundary conditions. Meshes defined by the simulation domain must contain at least one periodic boundary.  

If the manual flag is included, the mesh of reciprocal lattice nodes will defined using the $c$ values for the spacing along each reciprocal lattice axis. Note that manual mapping of the reciprocal space mesh is good for comparing diffraction results from multiple simulations; however it can reduce the likelihood that Bragg reflections will be satisfied unless small spacing parameters $(<0.05\mathrm{~\AA~}^{-}1)$ ) are implemented. Meshes with manual spacing do not require a periodic boundary.  

The limits of the reciprocal lattice mesh are determined by the use of the Kmax, Zone, and dR_Ewald parameters. The rectilinear mesh created about the origin of reciprocal space is terminated at the boundary of a sphere of radius Kmax centered at the origin. If Zone parameters $z l=z2=z3=0$ are used, diffraction intensities are computed throughout the entire spherical volume - note this can greatly increase the cost of computation. Otherwise, Zone parameters will denote the $z1=h,z2=k$ , and $z3=\ell$ (in a global sense) zone axis of an intersecting Ewald sphere. Diffraction intensities will only be computed at the intersection of the reciprocal lattice mesh and a dR_Ewald thick surface of the Ewald sphere. See the example 3D intensity data and the intersection of a [010] zone axis in the below image.  

![](images/25de809120458a0b4fbcd567fb459da69cb5ff9e4ead20537d14fd6fabd57be9.jpg)  

The atomic scattering factors, fj, accounts for the reduction in diffraction intensity due to Compton scattering. Compute saed uses analytical approximations of the atomic scattering factors that vary for each atom type (type1 type2 . . . typeN) and angle of diffraction. The analytic approximation is computed using the formula (Brown):  

$$
f_{j}\left(\frac{s i n(\theta)}{\lambda}\right)=\sum_{i}^{5}a_{i}e x p\left(-b_{i}\frac{s i n^{2}(\theta)}{\lambda^{2}}\right)
$$  

Coefficients parameterized by $(F o x)$ are assigned for each atom type designating the chemical symbol and charge of each atom type. Valid chemical symbols for compute saed are:  

<html><body><table><tr><td>H</td><td>He</td><td>Li</td><td>Be</td><td>B</td><td>C</td><td>N</td><td>0</td><td>F</td><td>Ne</td><td>Na</td><td>Mg</td><td>Al</td><td>Si P</td><td></td><td></td><td>C1</td><td>Ar</td><td>K</td></tr><tr><td>Sc</td><td>Ti</td><td>V</td><td>Cr</td><td>Mn</td><td>Fe</td><td>Co</td><td>Ni</td><td>Cu</td><td>Zn</td><td>Ga</td><td>Ge As</td><td>Se</td><td>Br</td><td>Kr</td><td>Rb</td><td>Sr</td><td></td><td>Zr</td></tr><tr><td>Nb</td><td>Mo</td><td>Tc</td><td>Ru</td><td>Rh</td><td>Pd</td><td>Ag</td><td>Cd In</td><td>Sn</td><td>Sb</td><td>Te</td><td>I</td><td>Xe</td><td>Cs</td><td>Ba</td><td>La</td><td>Ce</td><td>Pr</td><td>PN</td></tr><tr><td>Pm</td><td>Sm</td><td>Eu</td><td>Gd</td><td>Tb</td><td>Dy</td><td>Ho</td><td>Er</td><td>Tm</td><td>Yb Lu</td><td>Hf</td><td>Ta</td><td>W</td><td>Re</td><td>Os</td><td>Ir</td><td>Pt</td><td>Au</td><td>Hg</td></tr><tr><td>T1</td><td>Pb</td><td>Bi</td><td>Po</td><td>At</td><td>Rn</td><td>Fr</td><td>Ra</td><td>Ac Th</td><td>Pa</td><td>U</td><td>Np</td><td>Pu</td><td>Am</td><td>Cm</td><td>Bk</td><td>Cf</td><td></td><td></td></tr></table></body></html>  

If the echo keyword is specified, compute saed will provide extra reporting information to the screen.  

# 3.101.4 Output info  

This compute calculates a global vector. The length of the vector is the number of reciprocal lattice nodes that are explored by the mesh. The entries of the global vector are the computed diffraction intensities as described above.  

The vector can be accessed by any command that uses global values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

All array values calculated by this compute are “intensive”.  

# 3.101.5 Restrictions  

This compute is part of the DIFFRACTION package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The compute_saed command does not work for triclinic cells.  

# 3.101.6 Related commands  

fix saed_vtk, compute xrd  

# 3.101.7 Default  

The option defaults are Kma $\varsigma=1.70$ , Zone 1 0 0, c 1 1 1, dR_Ewald $=0.01$ .  

(Coleman) Coleman, Spearot, Capolungo, MSMSE, 21, 055020 (2013).   
(Brown) Brown et al. International Tables for Crystallography Volume C: Mathematical and Chemical Tables, 554-95 (2004).   
(Fox) Fox, O’Keefe, Tabbernor, Acta Crystallogr. A, 45, 786-93 (1989).  

# 3.102 compute slcsa/atom command  

# 3.102.1 Syntax  

compute ID group-ID slcsa/atom twojmax nclasses db_mean_descriptor_file lda_file lr_decision_file lr $\hookrightarrow$ bias_file maha_file value  

• ID, group-ID are documented in compute command   
• slcsa/atom $=$ style name of this compute command   
• twojmax $=$ band limit for bispectrum components (non-negative integer)   
• nclasses $=$ number of crystal structures used in the database for the classifier SL-CSA   
• db_mean_descriptor_file $=$ file name of file containing the database mean descriptor   
• lda_file $=$ file name of file containing the linear discriminant analysis matrix for dimension reduction   
• lr_decision_file $=$ file name of file containing the scaling matrix for logistic regression classification   
• lr_bias_file $=$ file name of file containing the bias vector for logistic regression classification   
• maha_file $=$ file name of file containing for each crystal structure: the Mahalanobis distance threshold for sani check purposes, the average reduced descriptor and the inverse of the corresponding covariance matrix   
• $\mathrm{c\_ID[^{*}]=}$ compute ID of previously required compute sna/atom command  

# 3.102.2 Examples  

compute b1 all sna/atom 9.0 0.99363 8 0.5 1.0 rmin0 0.0 nnn 24 wmode 1 delta 0.3 compute b2 all slcsa/atom 8 4 mean_descriptors.dat lda_scalings.dat lr_decision.dat lr_bias.dat maha ,→thresholds.dat c_b1[\*]  

# 3.102.3 Description  

Added in version 7Feb2024.  

Define a computation that performs the Supervised Learning Crystal Structure Analysis (SL-CSA) from (Lafourcade) for each atom in the group. The SL-CSA tool takes as an input a per-atom descriptor (bispectrum) that is computed through the compute sna/atom command and then proceeds to a dimension reduction step followed by a logistic regression in order to assign a probable crystal structure to each atom in the group. The SL-CSA tool is pre-trained on a database containing $C$ distinct crystal structures from which a crystal structure classifier is derived and a tutorial to build such a tool is available at SL-CSA.  

The first step of the SL-CSA tool consists in performing a dimension reduction of the per-atom descriptor $\mathbf{B}^{i}\in\mathbb{R}^{D}$ through the Linear Discriminant Analysis (LDA) method, leading to a new projected descriptor $\mathbf{x}^{i}=\mathrm{P_{LDA}}(\mathbf{B}^{i}):\mathbb{R}^{D}\rightarrow$ Rd=C−1:  

$$
\mathbf{x}^{i}=\mathbf{C}_{\mathrm{LDA}}^{T}\cdot(\mathbf{B}^{i}-\mu_{\mathrm{db}}^{\mathbf{B}})
$$  

where $\mathbf{C}_{\mathrm{LDA}}^{T}\in\mathbb{R}^{D\times d}$ is the reduction coefficients matrix of the LDA model read in file lda_file, $\mathbf{B}^{i}\in\mathbb{R}^{D}$ is the bispectrum of atom $i$ and $\mu_{\mathrm{db}}^{\mathbf{B}}\in\mathbb{R}^{D}$ is the average descriptor of the entire database. The latter is computed from the average descriptors of each crystal structure read from the file mean_descriptors_file.  

The new projected descriptor with dimension $d=C-1$ allows for a good separation of different crystal structures fingerprints in the latent space.  

Once the dimension reduction step is performed by means of LDA, the new descriptor $\mathbf{x}^{i}\in\mathbb{R}^{d=C-1}$ is taken as an input for performing a multinomial logistic regression (LR) which provides a score vector $\mathbf{s}^{i}=\mathrm{P}_{\mathrm{LR}}(\mathbf{x}^{i}):\mathbb{R}^{d}\rightarrow\mathbb{R}^{C}$ defined as:  

$$
\mathbf{s}^{i}=\mathbf{b}_{\mathrm{LR}}+\mathbf{D}_{\mathrm{LR}}\cdot\mathbf{x}^{i^{T}}
$$  

with ${\bf b}_{\mathrm{LR}}\in\mathbb{R}^{C}$ and $\mathbf{D}_{\mathrm{LR}}\in\mathbb{R}^{C\times d}$ the bias vector and decision matrix of the LR model after training both read in files lr_fil1 and lr_file2 respectively.  

Finally, a probability vector $\mathbf{p}^{i}=\mathrm{P}_{\mathrm{LR}}(\mathbf{x}^{i}):\mathbb{R}^{d}\rightarrow\mathbb{R}^{C}$ is defined as:  

$$
\mathbf{p}^{i}=\frac{\exp(\mathbf{s}^{i})}{\sum_{j}\exp({s_{j}^{i}})}
$$  

from which the crystal structure assigned to each atom with descriptor $\mathbf{B}^{i}$ and projected descriptor $\mathbf{x}^{i}$ is computed as the argmax of the probability vector $\ensuremath{\mathbf{p}}^{i}$ . Since the logistic regression step systematically attributes a crystal structure to each atom, a sanity check is needed to avoid misclassification. To this end, a per-atom Mahalanobis distance to each crystal structure $C S$ present in the database is computed:  

$$
d_{\mathrm{Mahalanobis}}^{i\rightarrow\mathrm{CS}}=\sqrt{(\mathbf{x}^{i}-\mu_{\mathrm{CS}}^{\mathrm{x}})^{\mathrm{T}}\cdot{\mathbf{\overline{{c}}}_{\mathrm{S}}^{-1}}\cdot(\mathbf{x}^{i}-\mu_{\mathrm{CS}}^{\mathrm{x}})}
$$  

where $\mu_{\mathrm{CS}}^{{\bf X}}\in\mathbb{R}^{d}$ is the average projected descriptor of crystal structure $C S$ in the database and where $\mathbf{u}_{\mathrm{CS}}\in\mathbb{R}^{d\times d}$ is the corresponding covariance matrix. Finally, if the Mahalanobis distance to crystal structure $C S$ for atom $i$ is greater than the pre-determined threshold, no crystal structure is assigned to atom $i.$ . The Mahalanobis distance thresholds are read in file maha_file while the covariance matrices are read in file covmat_file.  

The SL-CSA framework provides an automatic computation of the different matrices and thresholds required for a proper classification and writes down all the required files for calling the compute slcsa/atom command.  

The compute slcsa/atom command requires that the compute sna/atom command is called before as it takes the resulting per-atom bispectrum as an input. In addition, it is crucial that the value twojmax is set to the same value of the value twojmax used in the compute sna/atom command, as well as that the value nclasses is set to the number of crystal structures used in the database to train the SL-CSA tool.  

# 3.102.4 Output info  

By default, this compute computes the Mahalanobis distances to the different crystal structures present in the database in addition to assigning a crystal structure for each atom as a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

# 3.102.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package See the Build package page for more info.  

# 3.102.6 Related commands  

compute sna/atom  

# 3.102.7 Default  

none  

(Lafourcade) Lafourcade, Maillet, Denoual, Duval, Allera, Goryaeva, and Marinica, Comp. Mat. Science, 230, 112534 (2023)  

# 3.103 compute slice command  

# 3.103.1 Syntax  

compute ID group-ID slice Nstart Nstop Nskip input1 input2 ...  

• ID, group-ID are documented in compute command • slice $=$ style name of this compute command • Nstart $=$ starting index within input vector(s) • Nstop $=$ stopping index within input vector(s) • Nskip $=$ extract every Nskip elements from input vector(s) • i $\mathrm{{1put}=c\_I D}$ , c_ID[N], f_ID, f_ID[N]  

$\overline{{\mathrm{c\_ID}}}=\mathrm{global}$ vector calculated by a compute with ID $\mathrm{c\_ID[I]=Ith}$ column of global array calculated by a compute with ID $\mathrm{f\_ID=global}$ vector calculated by a fix with ID $\mathrm{f\_ID[I]=Ith}$ column of global array calculated by a fix with ID v_name $=$ vector calculated by an vector-style variable with name  

# 3.103.2 Examples  

<html><body><table><tr><td>compute 1 all slice 1 100 10 c_msdmol[4]</td></tr><tr><td>compute 1 all slice 301 400 1 c_msdmol[4] v_myVec</td></tr></table></body></html>  

# 3.103.3 Description  

Define a calculation that “slices” one or more vector inputs into smaller vectors, one per listed input. The inputs can be global quantities; they cannot be per-atom or local quantities. Computes and fixes and vector-style variables can generate such global quantities. The group specified with this command is ignored.  

The values extracted from the input vector(s) are determined by the Nstart, Nstop, and Nskip parameters. The elements of an input vector of length $\mathbf{N}$ are indexed from 1 to N. Starting at element Nstart, every Mth element is extracted, where $\mathbf{M}=N s k i p$ , until element Nstop is reached. The extracted quantities are stored as a vector, which is typically shorter than the input vector.  

Each listed input is operated on independently to produce one output vector. Each listed input must be a global vector or column of a global array calculated by another compute or $f\alpha$ .  

If an input value begins with $\"c_{-}\"$ , a compute ID must follow which has been previously defined in the input script and which generates a global vector or array. See the individual compute doc page for details. If no bracketed integer is appended, the vector calculated by the compute is used. If a bracketed integer is appended, the Ith column of the array calculated by the compute is used. Users can also write code for their own compute styles and add them to LAMMPS.  

If a value begins with “f_”, a fix ID must follow which has been previously defined in the input script and which generates a global vector or array. See the individual $f\boldsymbol{{x}}$ page for details. Note that some fixes only produce their values on certain timesteps, which must be compatible with when compute slice references the values, else an error results. If no bracketed integer is appended, the vector calculated by the fix is used. If a bracketed integer is appended, the Ith column of the array calculated by the fix is used. Users can also write code for their own fix style and add them to LAMMPS.  

If an input value begins with $\begin{array}{r}{\mathbf{\tilde{\Sigma}}^{6\leftarrow}\mathbf{V}_{-}^{\quad\mathbf{\Xi},\mathbf{\Xi},\mathbf{\Xi}}}\end{array}$ , a variable name must follow which has been previously defined in the input script. Only vector-style variables can be referenced. See the variable command for details. Note that variables of style vector define a formula which can reference individual atom properties or thermodynamic keywords, or they can invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of specifying quantities to slice.  

If a single input is specified this compute produces a global vector, even if the length of the vector is 1. If multiple inputs are specified, then a global array of values is produced, with the number of columns equal to the number of inputs specified.  

# 3.103.4 Output info  

This compute calculates a global vector if a single input value is specified or a global array with N columns where N is the number of inputs. The length of the vector or the number of rows in the array is equal to the number of values extracted from each input vector. These values can be used by any command that uses global vector or array values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector or array values calculated by this compute are simply copies of values generated by computes or fixes or variables that are input vectors to this compute. If there is a single input vector of intensive and/or extensive values, then each value in the vector of values calculated by this compute will be “intensive” or “extensive”, depending on the corresponding input value. If there are multiple input vectors, and all the values in them are intensive, then the array values calculated by this compute are “intensive”. If there are multiple input vectors, and any value in them is extensive, then the array values calculated by this compute are “extensive”. Values produced by a variable are treated as intensive.  

The vector or array values will be in whatever units the input quantities are in.  

# 3.103.5 Restrictions  

none  

3.103.6 Related commands compute, fix, compute reduce  

# 3.103.7 Default  

none  

# 3.104 compute smd/contact/radius command  

# 3.104.1 Syntax  

compute ID group-ID smd/contact/radius  

• ID, group-ID are documented in compute command • smd/contact/radius $=$ style name of this compute command  

# 3.104.2 Examples  

# 3.104.3 Description  

Define a computation which outputs the contact radius, i.e., the radius used to prevent particles from penetrating each other. The contact radius is used only to prevent particles belonging to different physical bodies from penetrating each other. It is used by the contact pair styles, e.g., smd/hertz and smd/tri_surface.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

The value of the contact radius will be 0.0 for particles not in the specified compute group.  

# 3.104.4 Output info  

This compute calculates a per-particle vector, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle vector values will be in distance units.  

# 3.104.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.104.6 Related commands  

dump custom smd/hertz smd/tri_surface  

# 3.104.7 Default  

none  

# 3.105 compute smd/damage command  

# 3.105.1 Syntax  

compute ID group-ID smd/damage  

• ID, group-ID are documented in compute command • smd/damage $=$ style name of this compute command  

# 3.105.2 Examples  

# 3.105.3 Description  

Define a computation that calculates the damage status of SPH particles according to the damage model which is defined via the SMD SPH pair styles, e.g., the maximum plastic strain failure criterion.  

See this PDF guide to use Smooth Mach Dynamics in LAMMPS.  

# Output Info:  

This compute calculates a per-particle vector, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle values are dimensionless an in the range of zero to one.  

# 3.105.4 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the “Build  

# 3.105.5 Related commands  

smd/plastic_strain, smd/tlsph_stress  

# 3.105.6 Default  

none  

# 3.106 compute smd/hourglass/error command  

# 3.106.1 Syntax  

compute ID group-ID smd/hourglass/error  

• ID, group-ID are documented in compute command • smd/hourglass/error $=$ style name of this compute command  

# 3.106.2 Examples  

# 3.106.3 Description  

Define a computation which outputs the error of the approximated relative separation with respect to the actual relative separation of the particles i and j. Ideally, if the deformation gradient is exact, and there exists a unique mapping between all particles’ positions within the neighborhood of the central node and the deformation gradient, the approximated relative separation will coincide with the actual relative separation of the particles i and j in the deformed configuration. This compute is only really useful for debugging the hourglass control mechanism which is part of the Total-Lagrangian SPH pair style.  

See this PDF guide to use Smooth Mach Dynamics in LAMMPS.  

# Output Info:  

This compute calculates a per-particle vector, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle vector values will are dimensionless. See units.  

# 3.106.4 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This quantity will be computed only for particles which interact with tlsph pair style.  

# 3.106.5 Related commands  

smd/tlsph_defgrad  

# 3.106.6 Default  

# 3.107 compute smd/internal/energy command  

# 3.107.1 Syntax  

compute ID group-ID smd/internal/energy  

• ID, group-ID are documented in compute command • smd/smd/internal/energy $=$ style name of this compute command  

# 3.107.2 Examples  

# 3.107.4 Output Info  

This compute calculates a per-particle vector, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle vector values will be given in units of energy.  

# 3.107.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info. This compute can only be used for particles which interact via the updated Lagrangian or total Lagrangian SPH pair styles.  

# 3.107.6 Related commands  

none  

# 3.107.7 Default  

# 3.108 compute smd/plastic/strain command  

# 3.108.1 Syntax  

compute ID group-ID smd/plastic/strain  

• ID, group-ID are documented in compute command • smd/plastic/strain $=$ style name of this compute command  

# 3.108.2 Examples  

# 3.108.5 Related commands  

smd/plastic/strain/rate, smd/tlsph/strain/rate, smd/tlsph/strain  

# 3.108.6 Default  

none  

# 3.109 compute smd/plastic/strain/rate command  

# 3.109.1 Syntax  

compute ID group-ID smd/plastic/strain/rate  

• ID, group-ID are documented in compute command • smd/plastic/strain/rate $=$ style name of this compute command  

# 3.109.2 Examples  

# 3.109.3 Description  

Define a computation that outputs the time rate of the equivalent plastic strain. This command is only meaningful if a material model with plasticity is defined.  

See this PDF guide to use Smooth Mach Dynamics in LAMMPS.  

# Output Info:  

This compute calculates a per-particle vector, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle values will be given in units of one over time.  

# 3.109.4 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info. This compute can only be used for particles which interact via the updated Lagrangian or total Lagrangian SPH pair styles.  

# 3.109.5 Related commands  

smd/plastic/strain, smd/tlsph/strain/rate, smd/tlsph/strain  

# 3.109.6 Default  

none  

# 3.110 compute smd/rho command  

# 3.110.1 Syntax  

# 3.109. compute smd/plastic/strain/rate command  

# LAMMPS Documentation, Release 4Feb2025  

compute ID group-ID smd/rho  

• ID, group-ID are documented in compute command • smd/rho $=$ style name of this compute command  

# 3.110.2 Examples  

# 3.110.3 Description  

Define a computation that calculates the per-particle mass density. The mass density is the mass of a particle which is constant during the course of a simulation, divided by its volume, which can change due to mechanical deformation.  

See this PDF guide to use Smooth Mach Dynamics in LAMMPS.  

# 3.110.4 Output info  

This compute calculates a per-particle vector, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle values will be in units of mass over volume.  

# 3.110.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.110.6 Related commands  

compute smd/vol  

# 3.110.7 Default  

none  

# 3.111 compute smd/tlsph/defgrad command  

# 3.111.1 Syntax  

compute ID group-ID smd/tlsph/defgrad  

• ID, group-ID are documented in compute command smd/tlsph/defgrad $=$ style name of this compute command  

# 3.111.2 Examples  

# 3.111.3 Description  

Define a computation that calculates the deformation gradient. It is only meaningful for particles which interact according to the Total-Lagrangian SPH pair style.  

See this PDF guide to use Smooth Mach Dynamics in LAMMPS.  

# 3.111.4 Output info  

This compute outputs a per-particle vector of vectors (tensors), which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The per-particle vector values will be given dimensionless. See units. The per-particle vector has 10 entries. The first nine entries correspond to the xx, xy, xz, yx, yy, yz, zx, zy, zz components of the asymmetric deformation gradient tensor. The tenth entry is the determinant of the deformation gradient.  

# 3.111.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info. TThis compute can only be used for particles which interact via the total Lagrangian SPH pair style.  

# 3.111.6 Related commands  

smd/hourglass/error  

# 3.111.7 Default  

none  

# 3.112 compute smd/tlsph/dt command  

# 3.112.1 Syntax  

compute ID group-ID smd/tlsph/dt  

• ID, group-ID are documented in compute command • smd/tlsph/dt $=$ style name of this compute command  

# 3.112.2 Examples  

# 3.112.4 Output info  

This compute calculates a per-particle vector, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle values will be given in units of time.  

# 3.112.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This compute can only be used for particles interacting with the Total-Lagrangian SPH pair style.  

# 3.112.6 Related commands  

smd/adjust/dt  

# 3.112.7 Default  

none  

# 3.113 compute smd/tlsph/num/neighs command  

# 3.113.1 Syntax  

compute ID group-ID smd/tlsph/num/neighs  

• ID, group-ID are documented in compute command • smd/tlsph/num/neighs $=$ style name of this compute command  

# 3.113.2 Examples  

# 3.113.6 Related commands  

smd/ulsph/num/neighs  

# 3.113.7 Default  

none  

# 3.114 compute smd/tlsph/shape command  

# 3.114.1 Syntax  

compute ID group-ID smd/tlsph/shape  

• ID, group-ID are documented in compute command • smd/tlsph/shape $=$ style name of this compute command  

# 3.114.2 Examples  

# 3.114.3 Description  

Define a computation that outputs the current shape of the volume associated with a particle as a rotated ellipsoid. It is only meaningful for particles which interact according to the Total-Lagrangian SPH pair style.  

See this PDF guide to use Smooth Mach Dynamics in LAMMPS.  

# 3.114.4 Output info  

This compute calculates a per-particle vector of vectors, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle vector has 7 entries. The first three entries correspond to the lengths of the ellipsoid’s axes and have units of length. These axis values are computed as the contact radius times the xx, yy, or zz components of the GreenLagrange strain tensor associated with the particle. The next 4 values are quaternions (order: q, x, y, z) which describe the spatial rotation of the particle relative to its initial state.  

# 3.114.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This quantity will be computed only for particles which interact with the Total-Lagrangian SPH pair style.  

# 3.114.6 Related commands  

smd/contact/radius  

# 3.114.7 Default  

none  

# 3.115 compute smd/tlsph/strain command  

# 3.115.1 Syntax  

compute ID group-ID smd/tlsph/strain  

• ID, group-ID are documented in compute command • smd/tlsph/strain $=$ style name of this compute command  

# 3.115.2 Examples  

# 3.115.3 Description  

Define a computation that calculates the Green-Lagrange strain tensor for particles interacting via the Total-Lagrangian SPH pair style.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

# 3.115.4 Output info  

This compute calculates a per-particle vector of vectors (tensors), which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The per-particle tensor values will be given dimensionless. See units.  

The per-particle vector has 6 entries, corresponding to the xx, yy, zz, xy, xz, yz components of the symmetric strain tensor.  

# 3.115.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This quantity will be computed only for particles which interact with the Total-Lagrangian SPH pair style.  

# 3.115.6 Related commands  

smd/tlsph/strain/rate, smd/tlsph/stress  

# 3.115.7 Default  

none  

# 3.116 compute smd/tlsph/strain/rate command  

# 3.116.1 Syntax  

compute ID group-ID smd/tlsph/strain/rate  

• ID, group-ID are documented in compute command • smd/tlsph/strain/rate $=$ style name of this compute command  

# 3.116.2 Examples  

# 3.116.3 Description  

Define a computation that calculates the rate of the strain tensor for particles interacting via the Total-Lagrangian SPH pair style.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

# 3.116.4 Output info  

This compute calculates a per-particle vector of vectors (tensors), which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The values will be given in units of one over time.  

The per-particle vector has 6 entries, corresponding to the xx, yy, zz, xy, xz, yz components of the symmetric strain rate tensor.  

# 3.116.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This quantity will be computed only for particles which interact with Total-Lagrangian SPH pair style.  

# 3.116.6 Related commands  

compute smd/tlsph/strain, compute smd/tlsph/stress  

# 3.116.7 Default  

none  

# 3.117 compute smd/tlsph/stress command  

# 3.117.1 Syntax  

compute ID group-ID smd/tlsph/stress  

• ID, group-ID are documented in compute command • smd/tlsph/stress $=$ style name of this compute command  

# 3.117.2 Examples  

compute 1 all smd/tlsph/stress  

# 3.117.3 Description  

Define a computation that outputs the Cauchy stress tensor for particles interacting via the Total-Lagrangian SPH pair style.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

# 3.117.4 Output info  

This compute calculates a per-particle vector of vectors (tensors), which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The values will be given in units of pressure.  

The per-particle vector has 7 entries. The first six entries correspond to the xx, yy, zz, xy, xz and yz components of the symmetric Cauchy stress tensor. The seventh entry is the second invariant of the stress tensor, i.e., the von Mises equivalent stress.  

# 3.117.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This quantity will be computed only for particles which interact with the Total-Lagrangian SPH pair style.  

# 3.117.6 Related commands  

compute smd/tlsph/strain, cmopute smd/tlsph/strain/rate  

# 3.117.7 Default  

none  

# 3.118 compute smd/triangle/vertices command  

# 3.118.1 Syntax  

compute ID group-ID smd/triangle/vertices  

• ID, group-ID are documented in compute command • smd/triangle/vertices $=$ style name of this compute command  

# 3.118.2 Examples  

# 3.118.4 Output info  

This compute returns a per-particle vector of vectors, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle vector has nine entries, $(\mathrm{x1/y1/z1})$ , $(\mathrm{x}2/\mathrm{y}2/\mathrm{z}2)$ , and $(\mathrm{x}3/\mathrm{y}3/\mathrm{z}3)$ corresponding to the first, second, and third vertex of each triangle.  

It is only meaningful to use this compute for a group of particles which is created via the fix smd/wall_surface command.  

The output of this compute can be used with the dump2vtk_tris tool to generate a VTK representation of the smd/wall_surface mesh for visualization purposes.  

The values will be given in units of distance.  

# 3.118.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.118.6 Related commands  

fix smd/move/tri/surf , fix smd/wall_surface  

# 3.118.7 Default  

none  

# 3.119 compute smd/ulsph/effm command  

# 3.119.1 Syntax  

compute ID group-ID smd/ulsph/effm  

• ID, group-ID are documented in compute command • smd/ulsph/effm $=$ style name of this compute command  

# 3.119.2 Examples  

# 3.119.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info. This compute can only be used for particles which interact with the updated Lagrangian SPH pair style.  

# 3.119.6 Related commands  

pair smd/ulsph  

# 3.119.7 Default  

none  

# 3.120 compute smd/ulsph/num/neighs command  

# 3.120.1 Syntax  

compute ID group-ID smd/ulsph/num/neighs  

• ID, group-ID are documented in compute command • smd/ulsph/num/neighs $=$ style name of this compute command  

# 3.120.2 Examples  

# 3.120.3 Description  

Define a computation that returns the number of neighbor particles inside of the smoothing kernel radius for particles interacting via the updated Lagrangian SPH pair style.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

# 3.120.4 Output info  

This compute returns a per-particle vector, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle values will be given dimensionless, see units.  

# 3.120.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info. This compute can only be used for particles which interact with the updated Lagrangian SPH pair style.  

# 3.120.6 Related commands  

compute smd/tlsph/num/neighs  

# 3.120.7 Default  

none  

# 3.121 compute smd/ulsph/strain command  

# 3.121.1 Syntax  

compute ID group-ID smd/ulsph/strain  

• ID, group-ID are documented in compute command • smd/ulsph/strain $=$ style name of this compute command  

# 3.121.2 Examples  

# 3.121.3 Description  

Define a computation that outputs the logarithmic strain tensor. for particles interacting via the updated Lagrangian SPH pair style.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

# 3.121.4 Output info  

This compute calculates a per-particle tensor, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle vector has 6 entries, corresponding to the xx, yy, zz, xy, xz, yz components of the symmetric strain rate tensor.  

The per-particle tensor values will be given dimensionless, see units.  

# 3.121.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info. This compute can only be used for particles which interact with the updated Lagrangian SPH pair style.  

# 3.121.6 Related commands  

compute smd/tlsph/strain  

# 3.121.7 Default  

none  

# 3.122 compute smd/ulsph/strain/rate command  

# 3.122.1 Syntax  

compute ID group-ID smd/ulsph/strain/rate  

# 3.121. compute smd/ulsph/strain command  

# LAMMPS Documentation, Release 4Feb2025  

• ID, group-ID are documented in compute command smd/ulsph/strain/rate $=$ style name of this compute command  

# 3.122.2 Examples  

# 3.122.3 Description  

Define a computation that outputs the rate of the logarithmic strain tensor for particles interacting via the updated Lagrangian SPH pair style.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

# 3.122.4 Output info  

This compute calculates a per-particle vector of vectors (tensors), which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The values will be given in units of one over time.  

The per-particle vector has 6 entries, corresponding to the xx, yy, zz, xy, xz, yz components of the symmetric strain rate tensor.  

# 3.122.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This compute can only be used for particles which interact with the updated Lagrangian SPH pair style.  

# 3.122.6 Related commands  

compute smd/tlsph/strain/rate  

# 3.122.7 Default  

none  

# 3.123 compute smd/ulsph/stress command  

# 3.123.1 Syntax  

compute ID group-ID smd/ulsph/stress  

• ID, group-ID are documented in compute command • smd/ulsph/stress $=$ style name of this compute command  

# 3.123.2 Examples  

compute 1 all smd/ulsph/stress  

# 3.123.3 Description  

Define a computation that outputs the Cauchy stress tensor.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

# 3.123.4 Output info  

This compute calculates a per-particle vector of vectors (tensors), which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The values will be given in units of pressure.  

The per-particle vector has 7 entries. The first six entries correspond to the xx, yy, zz, xy, xz, yz components of the symmetric Cauchy stress tensor. The seventh entry is the second invariant of the stress tensor, i.e., the von Mises equivalent stress.  

# 3.123.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info. This compute can only be used for particles which interact with the updated Lagrangian SPH pair style.  

# 3.123.6 Related commands  

compute smd/ulsph/strain, compute smd/ulsph/strain/rate compute smd/tlsph/stress  

# 3.123.7 Default  

none  

# 3.124 compute smd/vol command  

# 3.124.1 Syntax  

compute ID group-ID smd/vol  

• ID, group-ID are documented in compute command • smd/vol $=$ style name of this compute command  

# 3.124.2 Examples  

# 3.124.4 Output info  

This compute calculates a per-particle vector, which can be accessed by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle vector values will be given in units of volume.  

Additionally, the compute returns a scalar, which is the sum of the per-particle volumes of the group for which the compute is defined.  

# 3.124.5 Restrictions  

This compute is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.124.6 Related commands  

compute smd/rho  

# 3.124.7 Default  

none   
3.125 compute sna/atom command   
3.126 compute snad/atom command   
3.127 compute snav/atom command   
3.128 compute snap command   
3.129 compute sna/grid command   
3.130 compute sna/grid/kk command  

3.131 compute sna/grid/local command  

Accelerator Variants: sna/grid/local/kk  

# 3.131.1 Syntax  

compute ID group-ID sna/atom rcutfac rfac0 twojmax R_1 R_2 ... w_1 w_2 ... keyword values ... compute ID group-ID snad/atom rcutfac rfac0 twojmax R_1 R_2 ... w_1 w_2 ... keyword values ... compute ID group-ID snav/atom rcutfac rfac0 twojmax R_1 R_2 ... w_1 w_2 ... keyword values ... compute ID group-ID snap rcutfac rfac0 twojmax R_1 R_2 ... w_1 w_2 ... keyword values ... compute ID group-ID snap rcutfac rfac0 twojmax R_1 R_2 ... w_1 w_2 ... keyword values ... compute ID group-ID sna/grid grid nx ny nz rcutfac rfac0 twojmax R_1 R_2 ... w_1 w_2 ... keyword␣ $\hookrightarrow$ values ...   
compute ID group-ID sna/grid/local grid nx ny nz rcutfac rfac0 twojmax R_1 R_2 ... w_1 w_2 ...␣ ,→keyword values ...  

• ID, group-ID are documented in compute command • sna/atom $=$ style name of this compute command  

• rcutfac $=$ scale factor applied to all cutoff radii (positive real)   
• rfac0 $=$ parameter in distance to angle conversion ( $0<$ rcutfac $<1$ )   
• twojmax $=$ band limit for bispectrum components (non-negative integer)   
$\cdot R\_I,R\_2,...=\operatorname{lis}$ t of cutoff radii, one for each type (distance units)   
• $w_{-}I,w_{-}2,\ldots=$ list of neighbor weights, one for each type   
• grid values $\mathbf{\tau}=\mathbf{n}\mathbf{X}$ , ny, nz, number of grid points in x, y, and z directions (positive integer)   
• zero or more keyword/value pairs may be appended   
• keyword $=$ rmin0 or switchflag or bzeroflag or quadraticflag or chem or bnormflag or wselfallflag or bikflag or switchinnerflag or sinner or dinner or dgradflag or nnn or wmode or delta   
rmin0 value $=$ parameter in distance to angle conversion (distance units)   
switchflag value $=0$ or 1 $0=\mathrm{do}$ not use switching function $1={\mathrm{use}}$ switching function   
bzeroflag value $=0$ or 1 $0=\mathrm{do}$ not subtract B0 1 = subtract B0   
quadraticflag value = 0 or 1 $0=\mathrm{do}$ not generate quadratic terms 1 = generate quadratic terms   
chem values = nelements elementlist nelements $-$ number of SNAP elements elementlist = ntypes integers in range [0, nelements)   
bnormflag value = 0 or 1 $0=\mathrm{do}$ not normalize 1 = normalize bispectrum components   
wselfallflag value = 0 or 1 $0=$ self-contribution only for element of central atom $1=$ self-contribution for all elements   
switchinnerflag value = 0 or 1 $0=\mathrm{do}$ not use inner switching function $1={\mathrm{use}}$ inner switching function   
sinner values = sinnerlist sinnerlist = ntypes values of Sinner (distance units)   
dinner values = dinnerlist dinnerlist = ntypes values of Dinner (distance units)   
bikflag value $=0$ or 1 (only implemented for compute sn $0=$ descriptors are summed over atoms of each type $1=$ descriptors are listed separately for each atom   
dgradflag value = 0 or 1 (only implemented for compute snap) $0=$ descriptor gradients are summed over atoms of each type $1=$ descriptor gradients are listed separately for each atom pair  

# • additional keyword $=$ nnn or wmode or delta  

nnn value $=$ number of considered nearest neighbors to compute the bispectrum over a target␣   
$\hookrightarrow$ specific number of neighbors (only implemented for compute sna/atom)   
wmode value $=$ weight function for finding optimal cutoff to match the target number of neighbors␣   
$\hookrightarrow$ (required if nnn used, only implemented for compute sna/atom) $0=$ heavyside weight function 1 = hyperbolic tangent weight function  

delta value $=$ transition interval centered at cutoff distance for hyperbolic tangent weight function␣ $\hookrightarrow$ (ignored if wmode=0, required if wmode=1, only implemented for compute sna/atom)  

# 3.131.2 Examples  

<html><body><table><tr><td>compute b all sna</td><td>atom 1.4 0.99363 6 2.0 2.4 0.75 1.0 rmin0 0.0</td><td></td></tr><tr><td>compute db all sna atom 1.4 0.95 6 2.0 1.0 atom 1.4 0.95 6 2.0 1.0</td><td></td><td></td></tr><tr><td>compute vb all sna snap</td><td></td><td></td></tr><tr><td>compute snap all</td><td></td><td></td></tr><tr><td>compute snap all snap</td><td></td><td></td></tr><tr><td>compute snap all snap sna</td><td>1.0 0.99363 6 3.81 3.83 1.0 0.93 switchinnerfag 1</td><td>sinner 1.35 1.6 dinner 0.25 0.3</td></tr><tr><td>compute bgrid lall compute bnnn all sna</td><td>grid/local grid 200 200 200 1.4 0.95 6 2.0 1.0 atom 9.0 0.99363 8 0.5 1.0 rmin0 0.0</td><td>nnn 24 wmode 1 delta 0.2</td></tr></table></body></html>  

# 3.131.3 Description  

Define a computation that calculates a set of quantities related to the bispectrum components of the atoms in a group. These computes are used primarily for calculating the dependence of energy, force, and stress components on the linear coefficients in the snap pair_style, which is useful when training a SNAP potential to match target data.  

Bispectrum components of an atom are order parameters characterizing the radial and angular distribution of neighbo atoms. The detailed mathematical definition is given in the paper by Thompson et al. (Thompson)  

The position of a neighbor atom $i^{,}$ relative to a central atom $i$ is a point within the 3D ball of radius $R_{i i^{\prime}}=r c u t f a c$ $(R_{i}+R_{i}^{\prime})$  

Bartok et al. (Bartok), proposed mapping this 3D ball onto the 3-sphere, the surface of the unit ball in a four-dimensional space. The radial distance $r$ within $R\_{i i}^{\prime}$ is mapped on to a third polar angle $\theta_{0}$ defined by,  

$$
\theta_{0}={\mathsf{r f a c}}0{\frac{r-r_{m i n0}}{R_{i i^{\prime}}-r_{m i n0}}}\pi
$$  

In this way, all possible neighbor positions are mapped on to a subset of the 3-sphere. Points south of the latitude $\theta_{0}=$ rfac0 $\pi$ are excluded.  

The natural basis for functions on the 3-sphere is formed by the representatives of $S U(2)$ , the matrices $U_{m,m^{\prime}}^{j}(\theta,\phi,\theta_{0})$ . These functions are better known as $D_{m,m^{\prime}}^{j}$ , the elements of the Wigner $D$ -matrices (Meremianin, Varshalovich, Mason) The density of neighbors on the 3-sphere can be written as a sum of Dirac-delta functions, one for each neighbor, weighted by species and radial distance. Expanding this density function as a generalized Fourier series in the basis functions, we can write each Fourier coefficient as  

$$
u_{m,m^{\prime}}^{j}=U_{m,m^{\prime}}^{j}(0,0,0)+\sum_{r_{i i^{\prime}}<R_{i i^{\prime}}}f_{c}(r_{i i^{\prime}})w_{\mu_{i^{\prime}}}U_{m,m^{\prime}}^{j}(\theta_{0},\theta,\phi)
$$  

The $\boldsymbol{w}_{\mu_{i^{\prime}}}$ neighbor weights are dimensionless numbers that depend on $\mu_{i^{\prime}}$ , the SNAP element of atom $\displaystyle i^{\prime}$ , while the central atom is arbitrarily assigned a unit weight. The function $f_{c}(r)$ ensures that the contribution of each neighbor atom goes smoothly to zero at $R_{i i^{\prime}}$ :  

$$
\begin{array}{l}{f_{c}(r)=\displaystyle\frac{1}{2}(\cos(\pi\frac{r-r_{m i n0}}{R_{i i^{\prime}}-r_{m i n0}})+1),r\leq R_{i i^{\prime}}}\ {=0,r>R_{i i^{\prime}}}\end{array}
$$  

The expansion coefficients $u_{m,m^{\prime}}^{j}$ are complex-valued and they are not directly useful as descriptors, because they are not invariant under rotation of the polar coordinate frame. However, the following scalar triple products of expansion coefficients can be shown to be real-valued and invariant under rotation (Bartok).  

$$
B_{j_{1},j_{2},j}=\sum_{m_{1},m_{1}^{\prime}=-j_{1}}^{j_{1}}\sum_{m_{2},m_{2}^{\prime}=-j_{2}}^{j_{2}}\sum_{m,m^{\prime}=-j}^{j}(u_{m,m^{\prime}}^{j})^{*}H_{j_{1}m_{1}m_{1}^{\prime}}^{\quad j_{1}m_{1}^{\prime}\quad u_{m_{1},m_{1}^{\prime}}^{j_{1}}u_{m_{2},m_{2}^{\prime}}^{j_{2}}}
$$  

The constants H jj1mmm1′m1 ′ , j2m2m2′ are coupling coefficients, analogous to Clebsch-Gordan coefficients for rotations on the 2-sphere. These invariants are the components of the bispectrum and these are the quantities calculated by the compute sna/atom. They characterize the strength of density correlations at three points on the 3-sphere. The $\mathrm{j}2\mathrm{=}0$ subset form the power spectrum, which characterizes the correlations of two points. The lowest-order components describe the coarsest features of the density function, while higher-order components reflect finer detail. Each bispectrum component contains terms that depend on the positions of up to 4 atoms (3 neighbors and the central atom).  

Compute snad/atom calculates the derivative of the bispectrum components summed separately for each LAMMPS atom type:  

$$
-\sum_{i^{\prime}\in I}\frac{\partial B_{j_{1},j_{2},j}^{i^{\prime}}}{\partial\mathbf{r}_{i}}
$$  

The sum is over all atoms $i^{,}$ of atom type $I.$ . For each atom $i.$ , this compute evaluates the above expression for each direction, each atom type, and each bispectrum component. See section below on output for a detailed explanation.  

Compute snav/atom calculates the virial contribution due to the derivatives:  

$$
-\mathbf{r}_{i}\otimes\sum_{i^{\prime}\in I}\frac{\partial B_{j_{1},j_{2},j}^{i^{\prime}}}{\partial\mathbf{r}_{i}}
$$  

Again, the sum is over all atoms $i^{\prime}$ of atom type $I.$ . For each atom $i.$ , this compute evaluates the above expression for each of the six virial components, each atom type, and each bispectrum component. See section below on output for a detailed explanation.  

Compute snap calculates a global array containing information related to all three of the above per-atom computes sna/atom, snad/atom, and snav/atom. The first row of the array contains the summation of sna/atom over all atoms, but broken out by type. The last six rows of the array contain the summation of snav/atom over all atoms, broken out by type. In between these are $3^{*}N$ rows containing the same values computed by snad/atom (these are already summed over all atoms and broken out by type). The element in the last column of each row contains the potential energy, force, or stress, according to the row. These quantities correspond to the user-specified reference potential that must be subtracted from the target data when fitting SNAP. The potential energy calculation uses the built in compute thermo_pe. The stress calculation uses a compute called snap_press that is automatically created behind the scenes, according to the following command:  

compute snap_press all pressure NULL virial  

See section below on output for a detailed explanation of the data layout in the global array.  

Added in version $3\mathrm{Aug}2022$ .  

The compute sna/grid and sna/grid/local commands calculate bispectrum components for a regular grid of points. These are calculated from the local density of nearby atoms $i^{\prime}$ around each grid point, as if there was a central atom $i$ at the grid point. This is useful for characterizing fine-scale structure in a configuration of atoms, and it is used in the MALA package to build machine-learning surrogates for finite-temperature Kohn-Sham density functional theory (Ellis et al.) Neighbor atoms not in the group do not contribute to the bispectrum components of the grid points. The distance cutof $R_{i i^{\prime}}$ assumes that $i$ has the same type as the neighbor atom $\displaystyle i^{\prime}$ . Both computes can be hardware accelerated with Kokkos by using the sna/grid/kk and sna/grid/local/kk commands, respectively.  

Compute sna/grid calculates a global array containing bispectrum components for a regular grid of points. The grid is aligned with the current box dimensions, with the first point at the box origin, and forming a regular 3d array with $n x,n y$ , and $n z$ points in the x, y, and z directions. For triclinic boxes, the array is congruent with the periodic lattice vectors a, b, and c. The array contains one row for each of the $n x\times n y\times n z$ grid points, looping over the index for ix fastest, then $i y$ , and $i z$ slowest. Each row of the array contains the $x,y$ , and $z$ coordinates of the grid point, followed by the bispectrum components. See section below on output for a detailed explanation of the data layout in the global array.  

Compute sna/grid/local calculates bispectrum components of a regular grid of points similarly to compute sna/grid described above. However, because the array is local, it contains only rows for grid points that are local to the processor subdomain. The global grid of $n x\times n y\times n z$ points is still laid out in space the same as for sna/grid, but grid points are strictly partitioned, so that every grid point appears in one and only one local array. The array contains one row for each of the local grid points, looping over the global index $i x$ fastest, then $i y$ , and $i z$ slowest. Each row of the array contains the global indexes $i x,i y$ , and $i z$ first, followed by the $x,y,$ and $z$ coordinates of the grid point, followed by the bispectrum components. See section below on output for a detailed explanation of the data layout in the global array.  

The value of all bispectrum components will be zero for atoms not in the group. Neighbor atoms not in the group do not contribute to the bispectrum of atoms in the group.  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (i.e. each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently.  

The argument rcutfac is a scale factor that controls the ratio of atomic radius to radial cutoff distance.  

The argument rfac0 and the optional keyword rmin0 define the linear mapping from radial distance to polar angle theta0 on the 3-sphere, given above.  

The argument twojmax defines which bispectrum components are generated. See section below on output for a detailed explanation of the number of bispectrum components and the ordered in which they are listed.  

The keyword switchflag can be used to turn off the switching function $f_{c}(r)$ .  

The keyword bzeroflag determines whether or not $B O$ , the bispectrum components of an atom with no neighbors, are subtracted from the calculated bispectrum components. This optional keyword normally only affects compute sna/atom. However, when quadraticflag is on, it also affects snad/atom and snav/atom.  

The keyword quadraticflag determines whether or not the quadratic combinations of bispectrum quantities are generated. These are formed by taking the outer product of the vector of bispectrum components with itself. See section below on output for a detailed explanation of the number of quadratic terms and the ordered in which they are listed.  

The keyword chem activates the explicit multi-element variant of the SNAP bispectrum components. The argument nelements specifies the number of SNAP elements that will be handled. This is followed by elementlist, a list of integers of length ntypes, with values in the range [0, nelements ), which maps each LAMMPS type to one of the SNAP elements. Note that multiple LAMMPS types can be mapped to the same element, and some elements may be mapped by no LAMMPS type. However, in typical use cases (training SNAP potentials) the mapping from LAMMPS types to elements is one-to-one.  

The explicit multi-element variant invoked by the chem keyword partitions the density of neighbors into partial densities for each chemical element. This is described in detail in the paper by Cusentino et al. The bispectrum components are indexed on ordered triplets of elements:  

$$
B_{j_{1},j_{2},j}^{\kappa\lambda\mu}=\sum_{m_{1},m_{1}^{\prime}=-j_{1}}^{j_{1}}\sum_{m_{2},m_{2}^{\prime}=-j_{2}}^{j_{2}}\sum_{m,m^{\prime}=-j}^{j}(u_{j,m,m^{\prime}}^{\mu})^{*}H_{j_{1}m_{1}m_{1}^{\prime}}^{j m m^{\prime}}u_{j_{1},m_{1},m_{1}^{\prime}}^{\kappa}u_{j_{2},m_{2},m_{2}^{\prime}}^{\lambda}
$$  

where $u_{j,m,m^{\prime}}^{\mu}$ is an expansion coefficient for the partial density of neighbors of element $\mu$  

$$
u_{j,m,m^{\prime}}^{\mu}=w_{\mu_{i}\mu}^{s e l f}U^{j,m,m^{\prime}}(0,0,0)+\sum_{r_{i i^{\prime}}<R_{i i^{\prime}}}\delta_{\mu\mu_{i^{\prime}}}f_{c}(r_{i i^{\prime}})w_{\mu_{i^{\prime}}}U^{j,m,m^{\prime}}(\theta_{0},\theta,\phi)
$$  

where $w_{\mu_{i}\mu}^{s e l f}$ is the self-contribution, which is either 1 or 0 (see keyword wselfallflag below), $\delta_{\mu\mu_{i^{\prime}}}$ indicates that the sum is only over neighbor atoms of element $\mu$ , and all other quantities are the same as those appearing in the original equation for $u_{m,m^{\prime}}^{j}$ given above.  

The keyword wselfallflag defines the rule used for the self-contribution. If wselfallflag is on, then $w_{\mu_{i}\mu}^{s e l f}=1$ . If it is off then wµiµ $w_{\mu_{i}\mu}^{s e l f}=0$ , except in the case of $\mu_{i}=\mu$ , when $w_{\mu_{i}\mu}^{s e l f}=1$ . When the chem keyword is not used, this keyword has no effect.  

The keyword bnormflag determines whether or not the bispectrum component $B_{j_{1},j_{2},j}$ is divided by a factor of $2j+1$ . This normalization simplifies force calculations because of the following symmetry relation  

$$
\frac{B_{j_{1},j_{2},j}}{2j+1}=\frac{B_{j,j_{2},j_{1}}}{2j_{1}+1}=\frac{B_{j_{1},j,j_{2}}}{2j_{2}+1}
$$  

This option is typically used in conjunction with the chem keyword, and LAMMPS will generate a warning if both chem and bnormflag are not both set or not both unset.  

The keyword switchinnerflag with value 1 activates an additional radial switching function similar to $f_{c}(r)$ above, but acting to switch off smoothly contributions from neighbor atoms at short separation distances. This is useful when SNAP is used in combination with a simple repulsive potential. For a neighbor atom at distance $r$ , its contribution is scaled by a multiplicative factor $f_{i n n e r}(r)$ defined as follows:  

$$
\begin{array}{l}{\displaystyle=0,\displaystyle r\leq S_{i n n e r}-D_{i n n e r}}\ {\displaystyle f_{i n n e r}(r)=\frac{1}{2}(1-\cos(\frac\pi2(1+\frac{r-S_{i n n e r}}{D_{i n n e r}})),S_{i n n e r}-D_{i n n e r}<r\leq S_{i n n e r}+D_{i n n e r}}\ {\displaystyle=1,r>S_{i n n e r}+D_{i n n e r}}\end{array}
$$  

where the switching region is centered at $S_{i n n e r}$ and it extends a distance $D_{i n n e r}$ to the left and to the right of this. With this option, additional keywords sinner and dinner must be used, each followed by ntypes values for $S_{i n n e r}$ and $D_{i n n e r}$ espectively. When the central atom and the neighbor atom have different types, the values of $S_{i n n e r}$ and $D_{i n n e r}$ are the arithmetic means of the values for both types.  

The keywords bikflag and dgradflag are only used by compute snap. The keyword bikflag determines whether or not to list the descriptors of each atom separately, or sum them together and list in a single row. If bikflag is set to $O$ then a single bispectrum row is used, which contains the per-atom bispectrum descriptors $B_{i,k}$ summed over all atoms $i$ to produce $B_{k}$ . If bikflag is set to $I$ this is replaced by a separate per-atom bispectrum row for each atom. In this case, the entries in the final column for these rows are set to zero.  

The keyword dgradflag determines whether to sum atom gradients or list them separately. If dgradflag is set to 0, the bispectrum descriptor gradients w.r.t. atom $j$ are summed over all atoms $i^{,}$ of type $I$ (similar to snad/atom above). If dgradflag is set to 1, gradients are listed separately for each pair of atoms. Each row corresponds to a single term $\frac{\partial B_{i,k}}{\partial r_{j}^{a}}$ where $r_{j}^{a}$ is the $a{\cdot}t h$ position coordinate of the atom with global index $j$ . This also changes the number of columns to be equal to the number of bispectrum components, with 3 additional columns representing the indices i, $j$ , and $a$ , as explained more in the Output info section below. The option dgradflag $\scriptstyle=I$ requires that $b i k f a g{=}I$ .  

# Note  

Using dgradflag $=1$ produces a global array with $N+3N^{2}+1$ rows which becomes expensive for systems with more than 1000 atoms.  

![](images/2d295e84d5eb8bf308187f43c2a4038cbffd57a042f3ecedf85f7c35f8aa63af.jpg)  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this fix uses the neighbor list, it also means those pairs will not be included in the calculation. One way to get around this, is to write a dump file, and use the rerun command to compute the bispectrum components for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

The keyword nnn allows for the calculation of the bispectrum over a specific target number of neighbors. This option is only implemented for the compute sna/atom. An optimal cutoff radius for defining the neighborhood of the central atom is calculated by means of a dichotomy algorithm. This iterative process allows to assign weights to neighboring atoms in order to match the total sum of weights with the target number of neighbors. Depending on the radial weight function used in that process, the cutoff radius can fluctuate a lot in the presence of thermal noise. Therefore, in addition to the nnn keyword, the keyword wmode allows to choose whether a Heaviside $(w m o d e=0$ ) function or a Hyperbolic tangent function $(w m o d e=1$ ) should be used. If the Heaviside function is used, the cutoff radius exactly matches the distance between the central atom an its nnn’th neighbor. However, in the case of the hyperbolic tangent function, the dichotomy algorithm allows to span the weights over a distance delta in order to reduce fluctuations in the resulting local atomic environment fingerprint. The detailed formalism is given in the paper by Lafourcade et al. (Lafourcade).  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 3.131.4 Output info  

Compute sna/atom calculates a per-atom array, each column corresponding to a particular bispectrum component. The total number of columns and the identity of the bispectrum component contained in each column depend of the value of twojmax, as described by the following piece of python code:  

for j1 in range(0,twojmax+1): for j2 in range(0,j1+1): for j $\mathrm{in~range(j1-j2,min(twojmax,j1+j2)+1,2)};$ if $(\mathrm{j}>=\mathrm{j}1)$ : print $\mathrm{j}1/2.,\mathrm{j}2/2.,\mathrm{j}/2$ .  

There are $m(m+1)/2$ descriptors with last index $j,$ , where $m=\lfloor j\rfloor+1$ . Hence, for even twojmax $=2(m{-}1)$ , $K=$ $m(m+1)(2m+1)/6$ , the $m$ -th pyramidal number, and for odd twojm $\scriptstyle{l x=2m-1}$ , $K=m(m+1)(m+2)/3$ , twice the $m$ -th tetrahedral number.  

![](images/1867b3f46e34c0b486f459d26bd3d3616b9fd688487e0ade1724d38634d8cb0f.jpg)  

# Note  

the diagonal keyword allowing other possible choices for the number of bispectrum components was removed in 2019, since all potentials use the value of 3, corresponding to the above set of bispectrum components.  

Compute snad/atom evaluates a per-atom array. The columns are arranged into ntypes blocks, listed in order of atom type I. Each block contains three sub-blocks corresponding to the $x,y$ , and $z$ components of the atom position. Each of these sub-blocks contains $K$ columns for the $K$ bispectrum components, the same as for compute sna/atom  

Compute snav/atom evaluates a per-atom array. The columns are arranged into ntypes blocks, listed in order of atom type I. Each block contains six sub-blocks corresponding to the $x x$ , yy, zz, yz, xz, and xy components of the virial tensor in Voigt notation. Each of these sub-blocks contains $K$ columns for the $K$ bispectrum components, the same as for compute sna/atom  

Compute snap evaluates a global array. The columns are arranged into ntypes blocks, listed in order of atom type I. Each block contains one column for each bispectrum component, the same as for compute sna/atom. A final column contains the corresponding energy, force component on an atom, or virial stress component. The rows of the array appear in the following order:  

• 1 row: sna/atom quantities summed for all atoms of type $I$   
• $3^{*}N$ rows: snad/atom quantities, with derivatives w.r.t. x, y, and z coordinate of atom $i$ appearing in consecutive rows. The atoms are sorted based on atom ID.   
• 6 rows: snav/atom quantities summed for all atoms of type I  

For example, if $K=30$ and ntypes $^{=1}$ , the number of columns in the per-atom arrays generated by sna/atom, snad/atom, and snav/atom are 30, 90, and 180, respectively. With quadratic value $^{=1}$ , the numbers of columns are 930, 2790, and 5580, respectively. The number of columns in the global array generated by snap are 31, and 931, respectively, while the number of rows is $1{+}3{^{*}}N{+}6$ , where $N$ is the total number of atoms.  

Compute sna/grid evaluates a global array. The array contains one row for each of the $n x\times n y\times n z$ grid points, looping over the index for $i x$ fastest, then $i y$ , and $i z$ slowest. Each row of the array contains the $x,y$ , and $z$ coordinates of the grid point, followed by the bispectrum components.  

Compute sna/grid/local evaluates a local array. The array contains one row for each of the local grid points, looping over the global index $i x$ fastest, then $i y$ , and $i z$ slowest. Each row of the array contains the global indexes $i x,i y$ , and $i z$ first, followed by the $x,y,$ , and $z$ coordinates of the grid point, followed by the bispectrum components.  

If the quadratic keyword value is set to 1, then additional columns are generated, corresponding to the products of all distinct pairs of bispectrum components. If the number of bispectrum components is $K$ , then the number of distinct pairs is $K(K{+}1)/2$ . For compute sna/atom these columns are appended to existing $K$ columns. The ordering of quadratic terms is upper-triangular, (1,1),(1,2). . $.(1,K),(2,1)...(K{-}1,K{-}1),(K{-}1,K),(K,K)$ . For computes snad/atom and snav/atom each set of $K(K{+}1)/2$ additional columns is inserted directly after each of sub-block of linear terms i.e. linear and quadratic terms are contiguous. So the nesting order from inside to outside is bispectrum component, linear then quadratic, vector/tensor component, type.  

If the chem keyword is used, then the data is arranged into $N_{e l e m}^{3}$ sub-blocks, each sub-block corresponding to a particular chemical labeling $\kappa\lambda\mu$ with the last label changing fastest. Each sub-block contains $K$ bispectrum components. For the purposes of handling contributions to force, virial, and quadratic combinations, these $N_{e l e m}^{3}$ sub-blocks are treated as a single block of $K N_{e l e m}^{3}$ columns.  

If the bik keyword is set to 1, the structure of the snap array is expanded. The first $N$ rows of the snap array correspond to $B_{i,k}$ instead of a single row summed over atoms $i$ . In this case, the entries in the final column for these rows are set to zero. Also, each row contains only non-zero entries for the columns corresponding to the type of that atom. This is not true in the case of dgradflag keyword $=1$ (see below).  

If the dgradflag keyword is set to 1, this changes the structure of the global array completely. Here the snad/atom quantities are replaced with rows corresponding to descriptor gradient components on single atoms:  

$$
\frac{\partial B_{i,k}}{\partial r_{j}^{a}}
$$  

where $r_{j}^{a}$ is the $a{\cdot}t h$ position coordinate of the atom with global index $j$ . The rows are organized in chunks, where each chunk corresponds to an atom with global index $j$ . The rows in an atom $j$ chunk correspond to atoms with global index $i$ . The total number of rows for these descriptor gradients is therefore $3N^{2}$ . The number of columns is equal to the number of bispectrum components, plus 3 additional left-most columns representing the global atom indices $i,j,$ and Cartesian direction $a$ (0, 1, 2, for $\mathbf{X}$ , y, z). The first 3 columns of the first $N$ rows belong to the reference potential force components. The remaining K columns contain the $B_{i,k}$ per-atom descriptors corresponding to the non-zero entries obtained when bikflag $=1$ . The first column of the last row, after the first $N+3N^{2}$ rows, contains the reference potential energy. The virial components are not used with this option. The total number of rows is therefore $N+3N^{2}+1$ and the number of columns is $K+3$ .  

These values can be accessed by any command that uses per-atom values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options. To see how this command can be used within a Python workflow to train SNAP potentials, see the examples in FitSNAP.  

# 3.131.5 Restrictions  

These computes are part of the ML-SNAP package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.131.6 Related commands  

pair_style snap compute slcsa/atom  

# 3.131.7 Default  

The optional keyword defaults are rmin $\scriptstyle!O=0$ , switchflag $=1$ , bzeroflag $=1$ , quadraticflag $=0$ , bnormflag $=0$ , wselfallflag $=0$ , switchinnerflag $=0$ , $n n n=-1$ , wmode $=0$ , delta $=1.\mathrm{e}{-3}$  

(Thompson) Thompson, Swiler, Trott, Foiles, Tucker, J Comp Phys, 285, 316, (2015).  

(Bartok) Bartok, Payne, Risi, Csanyi, Phys Rev Lett, 104, 136403 (2010).  

(Meremianin) Meremianin, J. Phys. A, 39, 3099 (2006).  

(Varshalovich) Varshalovich, Moskalev, Khersonskii, Quantum Theory of Angular Momentum, World Scientific, Singapore (1987).  

(Mason) J. K. Mason, Acta Cryst A65, 259 (2009).  

(Cusentino) Cusentino, Wood, Thompson, J Phys Chem A, 124, 5456, (2020)  

(Ellis) Ellis, Fiedler, Popoola, Modine, Stephens, Thompson, Cangi, Rajamanickam, Phys. Rev. B, 104, 035120, (2021)  

(Lafourcade) Lafourcade, Maillet, Denoual, Duval, Allera, Goryaeva, and Marinica, Comp. Mat. Science, 230, 112534 (2023)  

# 3.132 compute sph/e/atom command  

# 3.132.1 Syntax  

compute ID group-ID sph/e/atom  

• ID, group-ID are documented in compute command • sph/e/atom $=$ style name of this compute command  

# 3.132.2 Examples  

![](images/da86068cfbb995b4e284c6759b7ac7e685e75ecf3a0d2769cde729cc8dd5d538.jpg)  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

The value of the internal energy will be 0.0 for atoms not in the specified compute group.  

# 3.132.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be in energy units.  

# 3.132.5 Restrictions  

This compute is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.132.6 Related commands  

dump custom  

# 3.132.7 Default  

none  

# 3.133 compute sph/rho/atom command  

# 3.133.1 Syntax  

compute ID group-ID sph/rho/atom  

• ID, group-ID are documented in compute command sph/rho/atom $=$ style name of this compute command  

# 3.133.2 Examples  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

The value of the SPH density will be 0.0 for atoms not in the specified compute group.  

# 3.133.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be in mass/volume units.  

# 3.133.5 Restrictions  

This compute is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.133.6 Related commands  

dump custom  

# 3.133.7 Default  

none  

# 3.134 compute sph/t/atom command  

# 3.134.1 Syntax  

compute ID group-ID sph/t/atom  

• ID, group-ID are documented in compute command sph/t/atom $=$ style name of this compute command  

# 3.134.2 Examples  

![](images/76fb60e172d0ba7a402b7e76e493c827c63828d352d7f60271045365174149db.jpg)  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

The value of the internal energy will be 0.0 for atoms not in the specified compute group.  

# 3.134.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be in temperature units.  

# 3.134.5 Restrictions  

This compute is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.134.6 Related commands  

dump custom  

# 3.134.7 Default  

none  

# 3.135 compute spin command  

# 3.135.1 Syntax  

compute ID group-ID spin  

• ID, group-ID are documented in compute command spin $=$ style name of this compute command  

# 3.135.2 Examples  

The simplest way to output the results of the compute spin calculation is to define some of the quantities as variables, and to use the thermo and thermo_style commands, for example:  

<html><body><table><tr><td>compute out_mag</td><td>all spin</td></tr><tr><td>variable mag_z</td><td>equal c_out _mag[3]</td></tr><tr><td>variable mag_norm</td><td>equal c_out mag[4]</td></tr><tr><td>variable temp_1 mag</td><td>equal lcout t_mag[6]</td></tr><tr><td>thermo thermo style</td><td>10 custom step v_mag_z v_mag_norm v_t temp_1 mag</td></tr></table></body></html>  

This series of commands evaluates the total magnetization along z, the norm of the total magnetization, and the magnetic temperature. Three variables are assigned to those quantities. The thermo and thermo_style commands print them every 10 timesteps.  

# 3.135.4 Output info  

The array values are “intensive”. The array values will be in metal units (units).  

# 3.135.5 Restrictions  

The spin compute is part of the SPIN package. This compute is only enabled if LAMMPS was built with this package.   
See the Build package page for more info. The atom_style has to be “spin” for this compute to be valid.  

# Related commands:  

none  

# 3.135.6 Default  

none  

(Nurdin) Nurdin and Schotte Phys Rev E, 61(4), 3579 (2000)  

# 3.136 compute stress/atom command  

# 3.137 compute centroid/stress/atom command  

# 3.137.1 Syntax  

compute ID group-ID style temp-ID keyword ...  

• ID, group-ID are documented in compute command   
• style $=$ stress/atom or centroid/stress/atom   
• temp- $\mathrm{\cdotID}=\mathrm{ID}$ of compute that calculates temperature, can be NULL if not needed   
• zero or more keywords may be appended   
• keyword $=k e$ or pair or bond or angle or dihedral or improper or kspace or fix or virial  

# 3.137.2 Examples  

compute 1 mobile stress/atom NULL   
compute 1 mobile stress/atom myRamp   
compute 1 all stress/atom NULL pair bond   
compute 1 all centroid/stress/atom NULL bond dihedral improper  

# 3.137.3 Description  

Define a computation that computes per-atom stress tensor for each atom in a group. In case of compute stress/atom, the tensor for each atom is symmetric with 6 components and is stored as a 6-element vector in the following order: $x x$ , yy, zz, xy, xz, yz. In case of compute centroid/stress/atom, the tensor for each atom is asymmetric with 9 components and is stored as a 9-element vector in the following order: xx, yy, zz, xy, xz, yz, yx, zx, zy. See the compute pressure command if you want the stress tensor (pressure) of the entire system.  

The stress tensor for atom $I$ is given by the following formula, where $a$ and $b$ take on values $x,y,z$ to generate the components of the tensor:  

$$
S_{a b}=-m\nu_{a}\nu_{b}-W_{a b}
$$  

The first term is a kinetic energy contribution for atom $I$ . See details below on how the specified temp- $.I D$ can affect the velocities used in this calculation. The second term is the virial contribution due to intra and intermolecular interactions, where the exact computation details are determined by the compute style.  

In case of compute stress/atom, the virial contribution is:  

$$
\begin{array}{l}{{\displaystyle{\cal W}_{a b}=\frac{1}{2}\sum_{n=1}^{N_{p}}(r_{1_{a}}F_{1_{b}}+r_{2_{a}}F_{2_{b}})+\frac{1}{2}\sum_{n=1}^{N_{b}}(r_{1_{a}}F_{1_{b}}+r_{2_{a}}F_{2_{b}})}}\ {{\displaystyle~+\frac{1}{3}\sum_{n=1}^{N_{a}}(r_{1_{a}}F_{1_{b}}+r_{2_{a}}F_{2_{b}}+r_{3_{a}}F_{3_{b}})+\frac{1}{4}\sum_{n=1}^{N_{d}}(r_{1_{a}}F_{1_{b}}+r_{2_{a}}F_{2_{b}}+r_{3_{a}}F_{3_{b}}+r_{4_{a}}F_{4_{b}})}}\ {{\displaystyle~+\frac{1}{4}\sum_{n=1}^{N_{i}}(r_{1_{a}}F_{1_{b}}+r_{2_{a}}F_{2_{b}}+r_{3_{a}}F_{3_{b}}+r_{4_{a}}F_{4_{b}})+\mathrm{Kspace}(r_{i_{a}},F_{i_{b}})+\sum_{n=1}^{N_{f}}r_{i_{a}}F_{i_{b}}}}\end{array}
$$  

The first term is a pairwise energy contribution where $n$ loops over the $N_{p}$ neighbors of atom $I,{\bf r}_{1}$ and $\mathbf{r}_{2}$ are the positions of the two atoms in the pairwise interaction, and $\mathbf{F}_{1}$ and ${\bf F}_{2}$ are the forces on the two atoms resulting from the pairwise interaction. The second term is a bond contribution of similar form for the $N_{b}$ bonds which atom $I$ is part of. There are similar terms for the $N_{a}$ angle, $N_{d}$ dihedral, and $N_{i}$ improper interactions atom $I$ is part of. There is also a term for the KSpace contribution from long-range Coulombic interactions, if defined. Finally, there is a term for the $N_{f}$ fixes that apply internal constraint forces to atom $I$ . Currently, only the fix shake and fix rigid commands contribute to this term. As the coefficients in the formula imply, a virial contribution produced by a small set of atoms (e.g. 4 atoms in a dihedral or 3 atoms in a Tersoff 3-body interaction) is assigned in equal portions to each atom in the set. E.g. 1/4 of the dihedral virial to each of the 4 atoms, or 1/3 of the fix virial due to SHAKE constraints applied to atoms in a water molecule via the $f\boldsymbol{a}\boldsymbol{x}$ shake command. As an exception, the virial contribution from constraint forces in $f\alpha$ rigid on each atom is computed from the constraint force acting on the corresponding atom and its position, i.e. the total virial is not equally distributed.  

In case of compute centroid/stress/atom, the virial contribution is:  

$$
\begin{array}{l}{{\displaystyle{\cal W}_{a b}=\sum_{n=1}^{N_{p}}r_{I0_{a}}F_{I_{b}}+\sum_{n=1}^{N_{b}}r_{I0_{a}}F_{I_{b}}+\sum_{n=1}^{N_{a}}r_{I0_{a}}F_{I_{b}}+\sum_{n=1}^{N_{d}}r_{I0_{a}}F_{I_{b}}+\sum_{n=1}^{N_{d}}r_{I0_{a}}F_{I_{b}}+\sum_{n=1}^{N_{i}}r_{I0_{a}}F_{I_{b}}}}\ {{\displaystyle~+\mathrm{Kspace}(r_{i_{a}},F_{i_{b}})+\sum_{n=1}^{N_{f}}r_{i_{a}}F_{i_{b}}}}\end{array}
$$  

As with compute stress/atom, the first, second, third, fourth and fifth terms are pairwise, bond, angle, dihedral and improper contributions, but instead of assigning the virial contribution equally to each atom, only the force $\mathbf{F}_{I}$ acting on atom $I$ due to the interaction and the relative position ${\bf r}_{I0}$ of the atom $I$ to the geometric center of the interacting atoms, i.e. centroid, is used. As the geometric center is different for each interaction, the ${\bf r}_{I0}$ also differs. The sixth term, Kspace contribution, is computed identically to compute stress/atom. The seventh term is handed differently depending on if the constraint forces are due to fix shake or fix rigid. In case of SHAKE constraints, each distance constraint is handed as a pairwise interaction. E.g. in case of a water molecule, two OH and one HH distance constraints are treated as three pairwise interactions. In case of fix rigid, all constraint forces in the molecule are treated as a single many-body interaction with a single centroid position. In case of water molecule, the formula expression would become identical to that of the three-body angle interaction. Although the total system virial is the same as compute stress/atom, compute centroid/stress/atom is know to result in more consistent heat flux values for angle, dihedrals, improper and constraint force contributions when computed via compute heat/flux.  

If no extra keywords are listed, the kinetic contribution and all of the virial contribution terms are included in the per-atom stress tensor. If any extra keywords are listed, only those terms are summed to compute the tensor. The virial keyword means include all terms except the kinetic energy ke.  

Note that the stress for each atom is due to its interaction with all other atoms in the simulation, not just with other atoms in the group.  

Details of how compute stress/atom obtains the virial for individual atoms for either pairwise or many-body potentials, and including the effects of periodic boundary conditions is discussed in (Thompson). The basic idea for many-body potentials is to treat each component of the force computation between a small cluster of atoms in the same manner as in the formula above for bond, angle, dihedral, etc interactions. Namely the quantity $\mathbf{r}\cdot\mathbf{F}$ is summed over the atoms in the interaction, with the $r$ vectors unwrapped by periodic boundaries so that the cluster of atoms is close together. The total contribution for the cluster interaction is divided evenly among those atoms.  

Details of how compute centroid/stress/atom obtains the virial for individual atoms are given in (Surblys2019) and (Surblys2021), where the idea is that the virial of the atom $I$ is the result of only the force $\mathbf{F}_{I}$ on the atom due to the interaction and its positional vector ${\bf r}_{I0}$ , relative to the geometric center of the interacting atoms, regardless of the number of participating atoms. The periodic boundary treatment is identical to that of compute stress/atom, and both of them reduce to identical expressions for two-body interactions, i.e. computed values for contributions from bonds and two-body pair styles, such as Lennard-Jones, will be the same, while contributions from angles, dihedrals and impropers will be different.  

The dihedral_style charmm style calculates pairwise interactions between 1-4 atoms. The virial contribution of these terms is included in the pair virial, not the dihedral virial.  

The KSpace contribution is calculated using the method in (Heyes) for the Ewald method and by the methodology described in (Sirk) for PPPM. The choice of KSpace solver is specified by the kspace_style pppm command. Note that for PPPM, the calculation requires 6 extra FFTs each timestep that per-atom stress is calculated. Thus it can significantly increase the cost of the PPPM calculation if it is needed on a large fraction of the simulation timesteps.  

The temp- $\mathbf{\nabla}\cdot I D$ argument can be used to affect the per-atom velocities used in the kinetic energy contribution to the total stress. If the kinetic energy is not included in the stress, than the temperature compute is not used and can be specified as NULL. If the kinetic energy is included and you wish to use atom velocities as-is, then temp-ID can also be specified as NULL. If desired, the specified temperature compute can be one that subtracts off a bias to leave each atom with only a thermal velocity to use in the formula above, e.g. by subtracting a background streaming velocity. See the doc pages for individual compute commands to determine which ones include a bias.  

Note that as defined in the formula, per-atom stress is the negative of the per-atom pressure tensor. It is also really a stress\*volume formulation, meaning the computed quantity is in units of pressure\*volume. It would need to be divided by a per-atom volume to have units of stress (pressure), but an individual atom’s volume is not well defined or easy to compute in a deformed solid or a liquid. See the compute voronoi/atom command for one possible way to estimate a per-atom volume.  

Thus, if the diagonal components of the per-atom stress tensor are summed for all atoms in the system and the sum is divided by $d V$ , where $d=$ dimension and $V$ is the volume of the system, the result should be $-{\cal P}$ , where $P$ is the total pressure of the system.  

These lines in an input script for a 3d system should yield that result. I.e. the last 2 columns of thermo output will be the same:  

compute peratom all stress/atom NULL compute p all reduce sum c_peratom[1] c_peratom[2] c_peratom[3] variable press equal -(c_p[1]+c_p[2]+c_p[3])/(3\*vol) thermo_style custom step temp etotal press v_press  

![](images/a5430f9ba21adf027ff9dbed4d6ae0ba81dd5138ea9fdab2f0893d234b16de63.jpg)  

# Note  

The per-atom stress does not include any Lennard-Jones tail corrections to the pressure added by the pair_modify tail yes command, since those are contributions to the global system pressure.  

The compute stress/atom can be used in a number of ways. Here is an example to compute a 1-d pressure profile in x-direction across the complete simulation box. You will need to adjust the number of bins and the selections for time averaging to your specific simulation. This assumes that the dimensions of the simulation cell does not change.  

# set number of bins   
variable nbins index 20   
variable fraction equal 1.0/v_nbins   
$\#$ define bins as chunks   
compute cchunk all chunk/atom bin/1d x lower \${fraction} units reduced   
compute stress all stress/atom NULL   
$\#$ apply conversion to pressure early since we have no variable style for processing chunks   
variable press atom -(c_stress[1]+c_stress[2]+c_stress[3])/(3.0\*vol\*\${fraction})   
compute binpress all reduce/chunk cchunk sum v_press   
fix avg all ave/time 10 40 400 c_binpress mode vector file ave_stress.txt  

# 3.137.4 Output info  

Compute stress/atom calculates a per-atom array with 6 columns, which can be accessed by indices 1-6 by any command that uses per-atom values from a compute as input. Compute centroid/stress/atom produces a per-atom array with 9 columns, but otherwise can be used in an identical manner to compute stress/atom. See the Howto output page for an overview of LAMMPS output options.  

The ordering of the 6 columns for stress/atom is as follows: xx, yy, zz, xy, xz, yz. The ordering of the 9 columns for centroid/stress/atom is as follows: xx, yy, zz, xy, xz, yz, yx, zx, zy.  

The per-atom array values will be in pressure\*volume units as discussed above.  

# 3.137.5 Restrictions  

Currently, compute centroid/stress/atom does not support pair styles with many-body interactions ( $E A M$ is an exception, since its computations are performed pairwise), nor granular pair styles with pairwise forces which are not aligned with the vector between the pair of particles. All bond styles are supported. All angle, dihedral, improper styles are supported with the exception of INTEL and KOKKOS variants of specific styles. It also does not support models with long-range Coulombic or dispersion forces, i.e. the kspace_style command in LAMMPS. It also does not implement the following fixes which add rigid-body constraints: fix rigid/\* and the OpenMP accelerated version of $f\boldsymbol{{x}}$ rigid/small, while all other fix rigid/\*/small are implemented.  

LAMMPS will generate an error if one of these options is included in your model. Extension of centroid stress calculations to these force and fix styles is planned for the future.  

# 3.137.6 Related commands  

compute pe, compute pressure  

# 3.137.7 Default  

By default the compute includes contributions from the keywords: ke pair bond angle dihedral improper kspace fix  

(Heyes) Heyes, Phys Rev B, 49, 755 (1994).   
(Sirk) Sirk, Moore, Brown, J Chem Phys, 138, 064505 (2013).   
(Thompson) Thompson, Plimpton, Mattson, J Chem Phys, 131, 154107 (2009).   
(Surblys2019) Surblys, Matsubara, Kikugawa, Ohara, Phys Rev E, 99, 051301(R) (2019).   
(Surblys2021) Surblys, Matsubara, Kikugawa, Ohara, J Appl Phys 130, 215104 (2021).  

# 3.138 compute stress/cartesian command  

# 3.138.1 Syntax  

compute ID group-ID stress/cartesian args • ID, group-ID are documented in compute command • args $=$ argument specific to the compute style  

stress/cartesian $\mathrm{args}=\mathrm{dim}1$ bin_width1 dim2 bin_width2 keyword   
$\mathrm{dim1=x}$ or y or z   
bin_width1 $=$ width of the bin   
$\mathrm{{dim2}=x}$ or y or z or NULL   
bin_width $?=$ width of the bin   
keyword $=\mathrm{ke}$ or pair or bond  

# 3.138.2 Examples  

compute 1 all stress/cartesian x 0.1 NULL 0 compute 1 all stress/cartesian y 0.1 z 0.1 compute 1 all stress/cartesian x 0.1 NULL 0 ke pair  

# 3.138.3 Description  

Compute stress/cartesian defines computations that calculate profiles of the diagonal components of the local stress tensor over one or two Cartesian dimensions, as described in (Ikeshoji). The stress tensor is split into a kinetic contribution $P^{k}$ and a virial contribution $P^{\nu}$ . The sum gives the total stress tensor $P=P^{k}+P^{\nu}$ . This compute obeys momentum balance through fluid interfaces. They use the Irving–Kirkwood contour, which is the straight line between particle pairs.  

Added in version 15Jun2023: Added support for bond styles  

This compute only supports pair and bond (no angle, dihedral, improper, or kspace) forces. By default, if no extra keywords are specified, all supported contributions to the stress are included (ke, pair, bond). If any keywords are specified, then only those components are summed.  

# 3.138.4 Output info  

The output columns for stress/cartesian are the position of the center of the local volume in the first and second dimensions, number density, $P_{x x}^{k}$ , $P_{y y}^{k}$ , $P_{z z}^{k}$ , $P_{x x}^{\nu}$ , $P_{y y}^{\nu}$ , and $P_{z z}^{\nu}$ . There are 8 columns when one dimension is specified and 9 columns when two dimensions are specified. The number of bins (rows) is $(L_{1}/b_{1})(L_{2}/b_{2})$ , where $L_{1}$ and $L_{2}$ are the lengths of the simulation box in the specified dimensions and $b_{1}$ and $b_{2}$ are the specified bin widths. When only one dimension is specified, the number of bins (rows) is $L_{1}/b_{1}$ .  

This array can be output with fix ave/time,  

compute p all stress/cartesian x 0.1 fix 2 all ave/time 100 1 100 c_p[\*] file dump_p.out mode vector  

The values calculated by this compute are “intensive”. The stress values will be in pressure units. The number density values are in inverse volume units.  

NOTE 1: The local stress does not include any Lennard-Jones tail corrections to the stress added by the pair_modify tail yes command, since those are contributions to the global system pressure.  

NOTE 2: The local stress profiles generated by these computes are similar to those obtained by the method-ofplanes (MOP). A key difference is that compute stress/mop/profile considers particles crossing a set of planes, while stress/cartesian computes averages for a set of small volumes. Moreover, this compute computes the diagonal components of the stress tensor $P_{x x}$ , $P_{y y}$ , and $P_{z z}$ , while stress/mop/profile computes the components $P_{i x},P_{i y}$ , and $P_{i z}$ , where $i$ is the direction normal to the plane.  

More information on the similarities and differences can be found in (Ikeshoji).  

# 3.138.5 Restrictions  

These computes calculate the stress tensor contributions for pair and bond forces only (no angle, dihedral, improper, or kspace force). It requires pairwise force calculations not available for most many-body pair styles.  

These computes are part of the EXTRA-COMPUTE package. They are only enabled if LAMMPS was built with that package. See the Build package doc page for more info.  

# 3.138.6 Related commands  

compute stress/atom, compute pressure, compute stress/mop/profile, compute stress/spherical, compute stress/cylinder  

(Ikeshoji) Ikeshoji, Hafskjold, Furuholt, Mol Sim, 29, 101-109, (2003).  

3.139 compute stress/cylinder command  

# 3.140 compute stress/spherical command  

# 3.140.1 Syntax  

compute ID group-ID style args • ID, group-ID are documented in compute command • style $=$ stress/spherical or stress/cylinder • args $=$ argument specific to the compute style  

stress/cylinder args = zlo zh Rmax bin_width keyword zlo = minimum z-boundary for cylinder zhi = maximum z-boundary for cylinder Rmax $-$ maximum radius to perform calculation to bin_width = width of radial bins to use for calculation keyword = ke (zero or one can be specified) ke = yes or no   
stress/spherical $\mathrm{{x0}}$ , y0, z0 = origin of the spherical coordinate system bin_width = width of spherical shells Rmax $-$ maximum radius of spherical shells  

# 3.140.2 Examples  

compute 1 all stress/cylinder -10.0 10.0 15.0 0.25 compute 1 all stress/cylinder -10.0 10.0 15.0 0.25 ke no compute 1 all stress/spherical 0 0 0 0.1 10  

# 3.140.3 Description  

Compute stress/cylinder, and compute stress/spherical define computations that calculate profiles of the diagonal components of the local stress tensor in the specified coordinate system. The stress tensor is split into a kinetic contribution $P^{k}$ and a virial contribution $P^{\nu}$ . The sum gives the total stress tensor $P=P^{k}+P^{\nu}$ . These computes can for example be used to calculate the diagonal components of the local stress tensor of surfaces with cylindrical or spherical symmetry. These computes obeys momentum balance through fluid interfaces. They use the Irving–Kirkwood contour, which is the straight line between particle pairs.  

The compute stress/cylinder computes the stress profile along the radial direction in cylindrical coordinates, as described in (Addington). The compute stress/spherical computes the stress profile along the radial direction in spherical coordinates, as described in (Ikeshoji).  

# 3.140.4 Output info  

The default output columns for stress/cylinder are the radius to the center of the cylindrical shell, number density, $P_{r r}^{k},P_{\phi\phi}^{k},P_{z z}^{k},P_{r r}^{\nu},P_{\phi\phi}^{\nu}$ , and $P_{z z}^{\nu}$ . When the keyword $k e$ is set to $n o$ , the kinetic contributions are not calculated, and consequently there are only 5 columns: the position of the center of the cylindrical shell, the number density, $P_{r r}^{\nu},P_{\phi\phi}^{\nu}$ , and $P_{z z}^{\nu}$ . The number of bins (rows) is $R_{\mathrm{max}}/b$ , where $b$ is the specified bin width.  

The output columns for stress/spherical are the position of the center of the spherical shell, the number density, $P_{r r}^{k}$ , $P_{\theta\theta}^{k},P_{\phi\phi}^{k},P_{r r}^{\nu},P_{\theta\theta}^{\nu}$ , and $P_{\phi\phi}^{\nu}$ . There are 8 columns and the number of bins (rows) is $R_{\mathrm{max}}/b$ , where $b$ is the specified bin  

This array can be output with fix ave/time,  

<html><body><table><tr><td>compute p all stress/spherical 0 0 0 0.1 10</td></tr><tr><td>a po anod dp  [Jd  o1 I o1 ae n z xy</td></tr></table></body></html>  

The values calculated by this compute are “intensive”. The stress values will be in pressure units. The number density values are in inverse volume units.  

NOTE 1: The local stress does not include any Lennard-Jones tail corrections to the stress added by the pair_modify tail yes command, since those are contributions to the global system pressure.  

# 3.140.5 Restrictions  

These computes calculate the stress tensor contributions for pair styles only (i.e., no bond, angle, dihedral, etc. contributions, and in the presence of bonded interactions, the result may be incorrect due to exclusions for special bonds excluding pairs of atoms completely). It requires pairwise force calculations not available for most many-body pair styles. Note that $k$ -space calculations are also excluded.  

These computes are part of the EXTRA-COMPUTE package. They are only enabled if LAMMPS was built with that package. See the Build package doc page for more info.  

# 3.140.6 Related commands  

compute stress/atom, compute pressure, compute stress/mop/profile, compute stress/cartesian  

# 3.140.7 Default  

The keyword default for ke in style stress/cylinder is yes.  

(Ikeshoji) Ikeshoji, Hafskjold, Furuholt, Mol Sim, 29, 101-109, (2003).   
(Addington) Addington, Long, Gubbins, J Chem Phys, 149, 084109 (2018).  

# 3.141 compute stress/mop command  

# 3.142 compute stress/mop/profile command  

# 3.142.1 Syntax  

compute ID group-ID style dir args keywords ...  

• ID, group-ID are documented in compute command   
• style $=$ stress/mop or stress/mop/profile   
• dir $=x$ or $y$ or $z$ is the direction normal to the plane   
• args $=$ argument specific to the compute style   
• keywords $=k i n$ or conf or total or pair or bond or angle or dihedral (one or more can be specified)  

stress/mop args = pos  

pos $=$ lower or center or upper or coordinate value (distance units) is the position of the plane   
stress/mop/profile args $=$ origin delta   
origin $=$ lower or center or upper or coordinate value (distance units) is the position of the first plane   
delta $=$ value (distance units) is the distance between planes  

# 3.142.2 Examples  

compute 1 all stress/mop x lower total   
compute 1 liquid stress/mop z 0.0 kin conf   
fix 1 all ave/time $10100010000\mathrm{c}_{-}1[^{\ast}]$ file mop.time   
fix 1 all ave/time 10 1000 10000 c_1[2] file mop.time   
compute 1 all stress/mop/profile x lower 0.1 total   
compute 1 liquid stress/mop/profile z 0.0 0.25 kin conf   
fix 1 all ave/time $5002010000\mathrm{c}_{-}1[^{\ast}]$ ave running overwrite file mopp.time mode vector  

# 3.141. compute stress/mop command  

# 3.142.3 Description  

Compute stress/mop and compute stress/mop/profile define computations that calculate components of the local stress tensor using the method of planes (Todd). Specifically in compute stress/mop calculates 3 components are computed in directions dir,x; dir,y; and dir,z; where dir is the direction normal to the plane, while in compute stress/mop/profile the profile of the stress is computed.  

Contrary to methods based on histograms of atomic stress (i.e., using compute stress/atom), the method of planes is compatible with mechanical balance in heterogeneous systems and at interfaces (Todd).  

The stress tensor is the sum of a kinetic term and a configurational term, which are given respectively by Eq. (21) and Eq. (16) in (Todd). For the kinetic part, the algorithm considers that atoms have crossed the plane if their positions at times $t-\Delta t$ and $t$ are one on either side of the plane, and uses the velocity at time $t-\Delta t/2$ given by the velocity Verlet algorithm.  

Added in version 15Jun2023: contributions from bond, angle and dihedral potentials  

Between one and seven keywords can be used to indicate which contributions to the stress must be computed: total stress (total), kinetic stress (kin), configurational stress (conf), stress due to bond stretching (bond), stress due to angle bending (angle), stress due to dihedral terms (dihedral) and/or due to pairwise non-bonded interactions (pair).  

NOTE 1: The configurational stress is computed considering all pairs of atoms where at least one atom belongs to group group-ID.  

NOTE 2: The local stress does not include any Lennard-Jones tail corrections to the stress added by the pair_modify tail yes command, since those are contributions to the global system pressure.  

NOTE 3: The local stress profile generated by compute stress/mop/profile is similar to that obtained by compute stress/cartesian. A key difference is that compute stress/mop/profile considers particles crossing a set of planes, while stress/cartesian computes averages for a set of small volumes. Moreover, stress/cartesian compute computes the diagonal components of the stress tensor $P_{x x}$ , $P_{y y}$ , and $P_{z z}$ , while stress/mop/profile computes the components $P_{i x},P_{i y}$ , and $P_{i z}$ , where $i$ is the direction normal to the plane.  

# 3.142.4 Output info  

Compute stress/mop calculates a global vector (indices starting at 1), with 3 values for each declared keyword (in the order the keywords have been declared). For each keyword, the stress tensor components are ordered as follows: stress_dir,x, stress_dir,y, and stress_dir,z.  

Compute stress/mop/profile instead calculates a global array, with 1 column giving the position of the planes where the stress tensor was computed, and with 3 columns of values for each declared keyword (in the order the keywords have been declared). For each keyword, the profiles of stress tensor components are ordered as follows: stress_dir,x; stress_dir,y; and stress_dir,z.  

The values are in pressure units.  

The values produced by this compute can be accessed by various output commands. For instance, the results can be written to a file using the fix ave/time command. Please see the example in the examples/PACKAGES/mop folder.  

# 3.142.5 Restrictions  

These styles are part of the EXTRA-COMPUTE package. They are only enabled if LAMMPS is built with that package.   
See the Build package doc page on for more info.  

The method is implemented for orthogonal simulation boxes whose size does not change in time, and axis-aligned planes.  

Contributions from bonds, angles, and dihedrals are not compatible with MPI parallel runs.  

The method only works with two-body pair interactions, because it requires the class method Pair::single() to be implemented, which is not possible for manybody potentials. In particular, compute stress/mop/profile and stress/mop  

do not work with more than two-body pair interactions, long range (kspace) interactions and improper intramolecular interactions.  

The impact of fixes that affect the stress (e.g. fix langevin) is also not included in the stress computed here.  

# 3.142.6 Related commands  

compute stress/atom, compute pressure, compute stress/cartesian, compute stress/cylinder, compute stress/spherical  

# 3.142.7 Default  

none  

(Todd) B. D. Todd, Denis J. Evans, and Peter J. Daivis: “Pressure tensor for inhomogeneous fluids”, Phys. Rev. E 52, 1627 (1995).  

(Ikeshoji) Ikeshoji, Hafskjold, Furuholt, Mol Sim, 29, 101-109, (2003).  

3.143 compute force/tally command  

3.144 compute heat/flux/tally command  

3.145 compute heat/flux/virial/tally command  

3.146 compute pe/tally command  

3.147 compute pe/mol/tally command  

3.148 compute stress/tally command  

# 3.148.1 Syntax  

compute ID group-ID style group2-ID  

• ID, group-ID are documented in compute command   
• style $=$ force/tally or heat/flux/tally or heat/flux/virial/tally or pe/tally or pe/mol/tally or stress/tally   
• group2-ID $=$ group ID of second (or same) group  

# 3.148.2 Examples  

compute 1 lower force/tally upper compute 1 left pe/tally right compute 1 lower stress/tally lower compute 1 subregion heat/flux/tally all compute 1 liquid heat/flux/virial/tally solid  

# 3.148.3 Description  

Define a computation that calculates properties between two groups of atoms by accumulating them from pairwise non-bonded computations. Except for heat/flux/virial/tally, the two groups can be the same. This is similar to compute group/group only that the data is accumulated directly during the non-bonded force computation. The computes force/tally, pe/tally, stress/tally, and heat/flux/tally are primarily provided as example how to program additional, more sophisticated computes using the tally callback mechanism. Compute pe/mol/tally is one such style, that can—through using this mechanism—separately tally intermolecular and intramolecular energies. Something that would otherwise be impossible without integrating this as a core functionality into the base classes of LAMMPS.  

Compute heat/flux/tally obtains the heat flux (strictly speaking, heat flow) inside the first group, which is the sum of the convective contribution due to atoms in the first group and the virial contribution due to interaction between the first and second groups:  

$$
\mathbf{Q}=\sum_{i\in\mathrm{group}1}e_{i}\mathbf{v}_{i}+\frac{1}{2}\sum_{\substack{i\in\mathrm{group}1}}\sum_{\substack{j\in\mathrm{group}2}}\left(\mathbf{F}_{i j}\cdot\mathbf{v}_{j}\right)\mathbf{r}_{i j}
$$  

When the second group in heat/flux/tally is set to “all”, the resulting values will be identical to that obtained by compute heat/flux, provided only pairwise interactions exist.  

Compute heat/flux/virial/tally obtains the total virial heat flux (strictly speaking, heat flow) into the first group due to interaction with the second group, and is defined as:  

$$
Q={\frac{1}{2}}\sum_{i\in\operatorname{group}1}\sum_{j\in\operatorname{group}2}\mathbf{F}_{i j}\cdot\left(\mathbf{v}_{i}+\mathbf{v}_{j}\right)
$$  

Although, the heat/flux/virial/tally compute does not include the convective term, it can be used to obtain the total heat flux over control surfaces, when there are no particles crossing over, such as is often in solid–solid and solid–liquid interfaces. This would be identical to the method of planes method. Note that the heat/flux/virial/tally compute is distinctly different from the heat/flux and heat/flux/tally computes, that are essentially volume averaging methods. The following example demonstrates the difference:  

<html><body><table><tr><td># System with only pairwise interactions.</td><td></td><td></td></tr><tr><td># Non-periodic boundaries in the x direction.</td><td></td><td></td></tr><tr><td></td><td># Has LeftLiquid and RightWall groups along x direction.</td><td></td></tr><tr><td></td><td># Heat fux over the solid-liquid interface</td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td>compute hflow _hfvt RightWall heat /fux/virial/tally LeftLiquid</td><td></td></tr><tr><td></td><td>variable hflux_hfvt equal c_hflow _hfvt /(ly*lz)</td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td># two approaches.</td><td># x component of approximate heat fux vector inside the liquid region,</td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td># compute myKE all ke/atom</td><td></td><td></td></tr><tr><td>compute myPE all pe/atom</td><td></td><td></td></tr><tr><td>compute myStress all stress/atom NULL virial</td><td></td><td></td></tr><tr><td>compute hfow _hf LeftLiquid heat/fux myKE myPE myStress</td><td></td><td></td></tr><tr><td>variable hflux_hf equal c_hflow _hf[1]/${volLiq}</td><td></td><td></td></tr><tr><td>#</td><td></td><td></td></tr><tr><td>compute hflow_hft LeftLiquid heat/fux/tally all</td><td></td><td></td></tr><tr><td>variable hflux_hft equal c_hfow_hft[1] /${volLiq}</td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td># Pressure over the solid-liquid interface, three approaches.</td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td>(continues on next page)</td></tr><tr><td></td><td></td><td></td></tr></table></body></html>  

(continued from previous page)  

#   
compute force_gg RightWall group/group LeftLiquid   
variable press_gg equal c_force_gg[1]/(ly\*lz)   
#   
compute force_ft RightWall force/tally LeftLiquid   
compute rforce_ft RightWall reduce sum c_force_ft[1]   
variable press_ft equal c_rforce_ft/(ly\*lz)   
#   
compute rforce_hfvt all reduce sum c_hflow_hfvt[1]   
variable press_hfvt equal c_rforce_hfvt/(ly\*lz)  

The pairwise contributions are computing via a callback that the compute registers with the non-bonded pairwise force computation. This limits the use to systems that have no bonds, no Kspace, and no many-body interactions. On the other hand, the computation does not have to compute forces or energies a second time and thus can be much more efficient. The callback mechanism allows to write more complex pairwise property computations.  

# 3.148.4 Output info  

• Compute pe/tally calculates a global scalar (the energy) and a per atom scalar (the contributions of the single atom to the global scalar).  

• Compute pe/mol/tally calculates a global four-element vector containing (in this order): evdwl and ecoul for intramolecular pairs and evdwl and ecoul for intermolecular pairs. Since molecules are identified by their molecule IDs, the partitioning does not have to be related to molecules, but the energies are tallied into the respective slots depending on whether the molecule IDs of a pair are the same or different.   
• Compute force/tally calculates a global scalar (the force magnitude) and a per atom 3-element vector (force contribution from each atom).   
• Compute stress/tally calculates a global scalar (average of the diagonal elements of the stress tensor) and a per atom vector (the six elements of stress tensor contributions from the individual atom).   
• As in compute heat/flux, compute heat/flux/tally calculates a global vector of length 6, where the first three components are the x, y, z components of the full heat flow vector, and the next three components are the corresponding components of just the convective portion of the flow (i.e., the first term in the equation for Q).   
• Compute heat/flux/virial/tally calculates a global scalar (heat flow) and a per atom three-element vector (contribution to the force acting over atoms in the first group from individual atoms in both groups).  

Both the scalar and vector values calculated by this compute are “extensive”.  

# 3.148.5 Restrictions  

This compute is part of the TALLY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Not all pair styles can be evaluated in a pairwise mode as required by this compute. For example, 3-body and other many-body potentials, such as Tersoff and Stillinger-Weber cannot be used. EAM potentials only include the pair potential portion of the EAM interaction when used by this compute, not the embedding term. Also bonded or Kspace interactions do not contribute to this compute.  

These computes are not compatible with accelerated pair styles from the GPU, INTEL, KOKKOS, or OPENMP packages. They will either create an error or print a warning when required data was not tallied in the required way and thus the data acquisition functions from these computes not called.  

When used with dynamic groups, a run $O$ command needs to be inserted in order to initialize the dynamic groups before accessing the computes.  

# 3.148.6 Related commands  

• compute group/group • compute heat/flux  

# 3.148.7 Default  

none  

# 3.149 compute tdpd/cc/atom command  

# 3.149.1 Syntax  

compute ID group-ID tdpd/cc/atom index  

• ID, group-ID are documented in compute command • tdpd/cc/atom $=$ style name of this compute command • index $=$ index of chemical species (1 to Nspecies)  

# 3.149.2 Examples  

# 3.149.3 Description  

Define a computation that calculates the per-atom chemical concentration of a specified species for each tDPD particle in a group.  

The chemical concentration of each species is defined as the number of molecules carried by a tDPD particle for dilute solution. For more details see (Li2015).  

# 3.149.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be in the units of chemical species per unit mass.  

# 3.149.5 Restrictions  

This compute is part of the DPD-MESO package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.149.6 Related commands  

pair_style tdpd  

# 3.149.7 Default  

none  

(Li2015) Li, Yazdani, Tartakovsky, Karniadakis, J Chem Phys, 143: 014101 (2015). DOI: 10.1063/1.4923254  

# 3.150 compute temp command  

Accelerator Variants: temp/kk  

# 3.150.1 Syntax  

compute ID group-ID temp  

• ID, group-ID are documented in compute command • temp $=$ style name of this compute command  

# 3.150.2 Examples  

compute 1 all temp compute myTemp mobile temp  

# 3.150.3 Description  

Define a computation that calculates the temperature of a group of atoms. A compute of this style can be used by any command that computes a temperature, e.g. thermo_modify, fix temp/rescale, fix npt, etc.  

The temperature is calculated by the formula  

$$
T=\frac{2E_{\mathrm{kin}}}{N_{\mathrm{DOF}}k_{B}}\quad\mathrm{with}\quad E_{\mathrm{kin}}=\sum_{i=1}^{N_{\mathrm{atons}}}\frac{1}{2}m_{i}\nu_{i}^{2}\quad\mathrm{and}\quad N_{\mathrm{DOF}}=n_{\mathrm{dim}}N_{\mathrm{atoms}}-n_{\mathrm{dim}}-N_{\mathrm{fixDOFs}}
$$  

where $E_{\mathrm{kin}}$ is the total kinetic energy of the group of atoms, $n_{\mathrm{dim}}$ is the dimensionality of the simulation (i.e. either 2 or 3), $N_{\mathrm{atoms}}$ is the number of atoms in the group, $N_{\mathrm{{fixDOFs}}}$ is the number of degrees of freedom removed by fix commands (see below), $k_{B}$ is the Boltzmann constant, and $T$ is the resulting computed temperature.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the 1/2 factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the xy component, and so on. Note that because it lacks the $1/2$ factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered $x x$ , yy, zz, xy, xz, yz.  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic option of the compute_modify command if this is not the case.  

This compute subtracts out degrees-of-freedom due to fixes that constrain molecular motion, such as fix shake and $f\alpha$ rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees-of-freedom can be altered using the extra option of the compute_modify command. By default this extra component is initialized to $n_{\mathrm{dim}}$ (as shown in the formula above) to represent the degrees of freedom removed from a system due to its translation invariance due to periodic boundary conditions.  

A compute of this style with the ID of “thermo_temp” is created when LAMMPS starts up, as if this command were in the input script:  

See the “thermo_style” command for more details.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 3.150.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length six (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.150.5 Restrictions  

none  

# 3.150.6 Related commands  

compute temp/partial, compute temp/region, compute pressure  

# 3.150.7 Default  

none  

# 3.151 compute temp/asphere command  

# 3.151.1 Syntax  

compute ID group-ID temp/asphere keyword value ...  

• ID, group-ID are documented in compute command • temp/asphere $=$ style name of this compute command • zero or more keyword/value pairs may be appended • keyword $=$ bias or dof  

bias value $=$ bias-ID bias-ID = ID of a temperature compute that removes a velocity bias   
dof value = all or rotate all = compute temperature of translational and rotational degrees of freedom rotate $-$ compute temperature of just rotational degrees of freedom  

# 3.151.2 Examples  

compute 1 all temp/asphere compute myTemp mobile temp/asphere bias tempCOM compute myTemp mobile temp/asphere dof rotate  

# 3.151.3 Description  

Define a computation that calculates the temperature of a group of aspherical particles, including a contribution from both their translational and rotational kinetic energy. This differs from the usual compute temp command, which assumes point particles with only translational kinetic energy.  

Only finite-size particles (aspherical or spherical) can be included in the group. For 3d finite-size particles, each has six degrees of freedom (three translational, three rotational). For 2d finite-size particles, each has three degrees of freedom (two translational, one rotational).  

![](images/04cb937fd98eed56125631c4b0317698f019acb4b25be436c03138071c28ee7b.jpg)  

# Note  

This choice for degrees of freedom (DOF) assumes that all finite-size aspherical or spherical particles in your model will freely rotate, sampling all their rotational DOF. It is possible to use a combination of interaction potentials and fixes that induce no torque or otherwise constrain some of all of your particles so that this is not the case. Then there are fewer DOF and you should use the compute_modify extra/dof command to adjust the DOF accordingly.  

For example, an aspherical particle with all three of its shape parameters the same is a sphere. If it does not rotate, then it should have 3 DOF instead of 6 in 3d (or two instead of three in 2d). A uniaxial aspherical particle has two of its three shape parameters the same. If it does not rotate around the axis perpendicular to its circular cross section, then it should have 5 DOF instead of 6 in 3d. The latter is the case for uniaxial ellipsoids in a GayBerne model since there is no induced torque around the optical axis. It will also be the case for biaxial ellipsoids when exactly two of the semiaxes have the same length and the corresponding relative well depths are equal.  

The translational kinetic energy is computed the same as is described by the compute temp command. The rotational kinetic energy is computed as ${\scriptstyle{\frac{1}{2}}}I\omega^{2}$ , where $I$ is the inertia tensor for the aspherical particle and $\omega$ is its angular velocity, which is computed from its angular momentum.  

![](images/d706cd359ac95cd34a584a2f7afcf8dece0c839460218dc072fe7563d12dccf1.jpg)  

# Note  

For 2d models, particles are treated as ellipsoids, not ellipses, meaning their moments of inertia will be the same as in 3d.  

A kinetic energy tensor, stored as a six-element vector, is also calculated by this compute. The formula for the components of the tensor is the same as the above formula, except that $\nu^{2}$ and $\omega^{2}$ are replaced by $\nu_{x}\nu_{y}$ and $\omega_{x}\omega_{y}$ for the $x y$ component, and the appropriate elements of the moment of inertia tensor are used. The six components of the vector are ordered xx, yy, zz, xy, xz, yz.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the 1/2 factor is NOT included and the $\nu_{i}^{2}$ and $\omega^{2}$ are replaced by $\nu_{x}\nu_{y}$ and $\omega_{x}\omega_{y}$ for the xy component, and so on. And the appropriate elements of the moment of inertia tensor are used. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered xx, yy, zz, xy, xz, yz.  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic/dof option of the compute_modify command if this is not the case.  

This compute subtracts out translational degrees-of-freedom due to fixes that constrain molecular motion, such as fix shake and fix rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees-of-freedom can be altered using the extra/dof option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

The keyword/value option pairs are used in the following ways.  

For the bias keyword, bias-ID refers to the ID of a temperature compute that removes a “bias” velocity from each atom. This allows compute temp/sphere to compute its thermal temperature after the translational kinetic energy components have been altered in a prescribed way (e.g., to remove a flow velocity profile). Thermostats that use this compute will work with this bias term. See the doc pages for individual computes that calculate a temperature and the doc pages for fixes that perform thermostatting for more details.  

For the dof keyword, a setting of all calculates a temperature that includes both translational and rotational degrees of freedom. A setting of rotate calculates a temperature that includes only rotational degrees of freedom.  

# 3.151.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.151.5 Restrictions  

This compute is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This compute requires that atoms store angular momentum and a quaternion as defined by the atom_style ellipsoid command.  

All particles in the group must be finite-size. They cannot be point particles, but they can be aspherical or spherical as defined by their shape attribute.  

# 3.151.6 Related commands  

compute temp  

# 3.151.7 Default  

none  

# 3.152 compute temp/body command  

# 3.152.1 Syntax  

compute ID group-ID temp/body keyword value ...  

• ID, group-ID are documented in compute command   
• temp/body $=$ style name of this compute command   
• zero or more keyword/value pairs may be appended   
• keyword $=$ bias or dof bias value $=$ bias-ID bias- $\mathrm{ID}=\mathrm{ID}$ of a temperature compute that removes a velocity bias dof value $=$ all or rotate all $=$ compute temperature of translational and rotational degrees of freedom rotate $=$ compute temperature of just rotational degrees of freedom  

# 3.152.2 Examples  

compute 1 all temp/body compute myTemp mobile temp/body bias tempCOM compute myTemp mobile temp/body dof rotate  

# 3.152.3 Description  

Define a computation that calculates the temperature of a group of body particles, including a contribution from both their translational and rotational kinetic energy. This differs from the usual compute temp command, which assumes point particles with only translational kinetic energy.  

Only body particles can be included in the group. For 3d particles, each has 6 degrees of freedom (3 translational, 3 rotational). For 2d body particles, each has 3 degrees of freedom (2 translational, 1 rotational).  

#  Note  

This choice for degrees of freedom (DOF) assumes that all body particles in your model will freely rotate, sampling all their rotational DOF. It is possible to use a combination of interaction potentials and fixes that induce no torque or otherwise constrain some of all of your particles so that this is not the case. Then there are less DOF and you should use the compute_modify extra/dof command to adjust the DOF accordingly.  

The translational kinetic energy is computed the same as is described by the compute temp command. The rotational kinetic energy is computed as ${\scriptstyle{\frac{1}{2}}}I\omega^{2}$ , where $I$ is the moment of inertia tensor for the aspherical particle and $\omega$ is its angular velocity, which is computed from its angular momentum.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the 1/2 factor is NOT included and the $\nu_{i}^{2}$ and $\omega^{2}$ are replaced by $\nu_{x}\nu_{y}$ and $\omega_{x}\omega_{y}$ for the $x y$ component, and so on. And the appropriate elements of the moment of inertia tensor are used. Note that because it lacks the $1/2$ factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered xx, yy, zz, xy, xz, yz.  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic/dof option of the compute_modify command if this is not the case.  

This compute subtracts out translational degrees-of-freedom due to fixes that constrain molecular motion, such as $f\alpha$ shake and fix rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees-of-freedom can be altered using the extra/dof option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

The keyword/value option pairs are used in the following ways.  

For the bias keyword, bias-ID refers to the ID of a temperature compute that removes a “bias” velocity from each atom. This allows compute temp/sphere to compute its thermal temperature after the translational kinetic energy components have been altered in a prescribed way (e.g., to remove a flow velocity profile). Thermostats that use this compute will work with this bias term. See the doc pages for individual computes that calculate a temperature and the doc pages for fixes that perform thermostatting for more details.  

For the dof keyword, a setting of all calculates a temperature that includes both translational and rotational degrees of freedom. A setting of rotate calculates a temperature that includes only rotational degrees of freedom.  

# 3.152.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.152.5 Restrictions  

This compute is part of the BODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This compute requires that atoms store angular momentum and a quaternion as defined by the atom_style body command.  

# 3.152.6 Related commands  

compute temp  

# 3.152.7 Default  

none  

# 3.153 compute temp/chunk command  

# 3.153.1 Syntax  

compute ID group-ID temp/chunk chunkID value1 value2 ... keyword value ...  

• ID, group-ID are documented in compute command • temp/chunk $=$ style name of this compute command • chunkID $=\mathrm{ID}$ of compute chunk/atom command  

• zero or more values can be listed as value1,value2,etc.  

• value $=$ temp or kecom or internal  

$\mathrm{{\overline{{temp}}=}}$ temperature of each chunk   
kecom $=$ kinetic energy of each chunk based on velocity of center of mass   
internal $=$ internal kinetic energy of each chunk  

• zero or more keyword/value pairs may be appended • keyword $=$ com or bias or adof or cdof  

com value $=$ yes or no   
yes $=$ subtract center-of-mass velocity from each chunk before calculating temperature $\mathrm{no}=\mathrm{do}$ not subtract center-of-mass velocity   
bias value $=$ bias-ID bias-ID = ID of a temperature compute that removes a velocity bias   
adof value $=$ dof_per_atom dof_per_atom = define this many degrees-of-freedom per atom   
cdof value = dof_per_chunk dof_per_chunk = define this many degrees-of-freedom per chunk  

# 3.153.2 Examples  

<html><body><table><tr><td>compute 1 fuid temp chunk molchunk</td></tr><tr><td></td></tr><tr><td>e 1 fuid temp compute chunk molchunk temp internal</td></tr><tr><td>compute 1 fuid temp chunk molchunk bias tpartial adof 2.0</td></tr></table></body></html>  

# 3.153.3 Description  

Define a computation that calculates the temperature of a group of atoms that are also in chunks, after optionally subtracting out the center-of-mass velocity of each chunk. By specifying optional values, it can also calculate the per-chunk temperature or energies of the multiple chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

The temperature is calculated by the formula  

$$
\mathrm{KE}=\frac{\mathrm{DOF}}{2}k_{B}T,
$$  

where KE is the total kinetic energy of all atoms assigned to chunks (sum of ${\scriptstyle{\frac{1}{2}}}m\nu^{2}.$ ), DOF is the the total number of degrees of freedom for those atoms, $k_{B}$ is Boltzmann constant, and $T$ is the absolute temperature.  

The DOF is calculated as $N{\times}a d o f+N_{\mathrm{chunk}}{\times}c d o f;$ where $N$ is the number of atoms contributing to the kinetic energy, adof is the number of degrees of freedom per atom, and cdof is the number of degrees of freedom per chunk. By default, adof $=2$ or $3=$ dimensionality of system, as set via the dimension command, and cdof $=0.0$ . This gives the usual formula for temperature.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the 1/2 factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the xy component, and so on. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered xx, yy, zz, xy, xz, $y z$  

Note that the number of atoms contributing to the temperature is calculated each time the temperature is evaluated since it is assumed the atoms may be dynamically assigned to chunks. Thus there is no need to use the dynamic option of the compute_modify command for this compute style.  

If any optional values are specified, then per-chunk quantities are also calculated and stored in a global array, as described below.  

The temp value calculates the temperature for each chunk by the formula  

$$
\mathrm{KE}=\frac{\mathrm{DOF}}{2}k_{B}T,
$$  

where KE is the total kinetic energy of the chunk of atoms (sum of ${\scriptstyle\frac{1}{2}}m\nu^{2}.$ ), DOF is the total number of degrees of freedom for all atoms in the chunk, $k_{B}$ is the Boltzmann constant, and $T$ is the absolute temperature.  

The number of degrees of freedom (DOF) in this case is calculated as $N{\times}a d o f+c d o f\quad$ , where $N$ is the number of atoms in the chunk, adof is the number of degrees of freedom per atom, and cdof is the number of degrees of freedom per chunk. By default, cdof $=2$ or $3=$ dimensionality of system, as set via the dimension command, and cdof $=0.0$ . This gives the usual formula for temperature.  

The kecom value calculates the kinetic energy of each chunk as if all its atoms were moving with the velocity of the center-of-mass of the chunk.  

The internal value calculates the internal kinetic energy of each chunk. The interal KE is summed over the atoms in the chunk using an internal “thermal” velocity for each atom, which is its velocity minus the center-of-mass velocity of the chunk.  

Note that currently the global and per-chunk temperatures calculated by this compute only include translational degrees of freedom for each atom. No rotational degrees of freedom are included for finite-size particles. Also no degrees of freedom are subtracted for any velocity bias or constraints that are applied, such as compute temp/partial, or fix shake or fix rigid. This is because those degrees of freedom (e.g., a constrained bond) could apply to sets of atoms that are both included and excluded from a specific chunk, and hence the concept is somewhat ill-defined. In some cases, you can use the adof and cdof keywords to adjust the calculated degrees of freedom appropriately, as explained below.  

Note that the per-chunk temperature calculated by this compute and the fix ave/chunk temp command can be different. This compute calculates the temperature for each chunk for a single snapshot. Fix ave/chunk can do that but can also time average those values over many snapshots, or it can compute a temperature as if the atoms in the chunk on different timesteps were collected together as one set of atoms to calculate their temperature. This compute allows the center-of-mass velocity of each chunk to be subtracted before calculating the temperature; fix ave/chunk does not.  

![](images/93017db17364983215da2c7e529a039de11d729d60b961f7f53918251ea86a2c.jpg)  

# Note  

Only atoms in the specified group contribute to the calculations performed by this compute. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

The simplest way to output the per-chunk results of the compute temp/chunk calculation to a file is to use the fix ave/time command, for example:  

compute cc1 all chunk/atom molecule compute myChunk all temp/chunk cc1 temp fix 1 all ave/time 100 1 100 c_myChunk[1] file tmp.out mode vector  

The keyword/value option pairs are used in the following ways.  

The com keyword can be used with a value of yes to subtract the velocity of the center-of-mass (VCM) for each chunk from the velocity of the atoms in that chunk, before calculating either the global or per-chunk temperature. This can be useful if the atoms are streaming or otherwise moving collectively, and you wish to calculate only the thermal temperature. This per-chunk VCM bias can be used in other fixes and computes that can incorporate a temperature bias. If this compute is used as a temperature bias in other commands then this bias is subtracted from each atom, the command runs with the remaining thermal velocities, and then the bias is added back in. This includes thermostatting fixes like fix nvt, fix temp/rescale, fix temp/berendsen, and fix langevin, and computes like compute stress/atom and compute pressure. See the input script in examples/stress_vcm for an example of how to use the com keyword in conjunction with compute stress/atom to create a stress profile of a rigid body while removing the overall motion of the rigid body.  

For the bias keyword, bias-ID refers to the ID of a temperature compute that removes a “bias” velocity from each atom. This also allows calculation of the global or per-chunk temperature using only the thermal temperature of atoms in each chunk after the translational kinetic energy components have been altered in a prescribed way (e.g., to remove a velocity profile). It also applies to the calculation of the other per-chunk values, such as kecom or internal, which involve the center-of-mass velocity of each chunk, which is calculated after the velocity bias is removed from each atom. Note that the temperature compute will apply its bias globally to the entire system, not on a per-chunk basis.  

The adof and cdof keywords define the values used in the degree of freedom (DOF) formulas used for the global or per-chunk temperature, as described above. They can be used to calculate a more appropriate temperature for some kinds of chunks. Here are three examples:  

If spatially binned chunks contain some number of water molecules and fix shake is used to make each molecule rigid, then you could calculate a temperature with six degrees of freedom (DOF) (three translational, three rotational) per molecule by setting adof to 2.0.  

If compute temp/partial is used with the bias keyword to only allow the x component of velocity to contribute to the temperature, then adof $=1.0$ would be appropriate.  

If each chunk consists of a large molecule, with some number of its bonds constrained by fix shake or the entire molecule by fix rigid/small, adof $=0.0$ and cdof could be set to the remaining degrees of freedom for the entire molecule (entire chunk in this case; i.e., 6 for 3d, or 3 for 2d, for a rigid molecule).  

# 3.153.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

This compute also optionally calculates a global array, if one or more of the optional values are specified. The number of rows in the array is the number of chunks Nchunk as calculated by the specified compute chunk/atom command. The number of columns is the number of specified values (1 or more). These values can be accessed by any command that uses global array values from a compute as input. Again, see the Howto output doc page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”. The array values are “intensive”.  

The scalar value is in temperature units. The vector values are in energy units. The array values will be in temperature units for the temp value, and in energy units for the kecom and internal values.  

# 3.153.5 Restrictions  

The com and bias keywords cannot be used together.  

# 3.153.6 Related commands  

compute temp, fix ave/chunk temp  

# 3.153.7 Default  

The option defaults are com no, no bias, adof $=$ dimensionality of the system (2 or 3), and cdof $=0.0$  

# 3.154 compute temp/com command  

# 3.154.1 Syntax  

compute ID group-ID temp/com  

• ID, group-ID are documented in compute command • temp/com $=$ style name of this compute command  

# 3.154.2 Examples  

compute 1 all temp/com compute myTemp mobile temp/com  

# 3.154.3 Description  

Define a computation that calculates the temperature of a group of atoms, after subtracting out the center-of-mass velocity of the group. This is useful if the group is expected to have a non-zero net velocity for some reason. A compute of this style can be used by any command that computes a temperature, (e.g., thermo_modify, fix temp/rescale, fix npt).  

After the center-of-mass velocity has been subtracted from each atom, the temperature is calculated by the formula  

$$
{\mathrm{KE}}={\frac{\dim}{2}}N k_{B}T,
$$  

where KE is the total kinetic energy of the group of atoms (sum of ${\scriptstyle{\frac{1}{2}}}m\nu^{2})$ , $\mathrm{dim}=2$ or 3 is the dimensionality of the simulation, $N$ is number of atoms in the group, $k_{B}$ is the Boltzmann constant, and $T$ is the absolute temperature.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the $1/2$ factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the xy component, and so on. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered xx, yy, zz, xy, xz, yz.  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic option of the compute_modify command if this is not the case.  

The removal of the center-of-mass velocity by this fix is essentially computing the temperature after a “bias” has been removed from the velocity of the atoms. If this compute is used with a fix command that performs thermostatting then this bias will be subtracted from each atom, thermostatting of the remaining thermal velocity will be performed, and the bias will be added back in. Thermostatting fixes that work in this way include fix nvt, fix temp/rescale, fix temp/berendsen, and fix langevin.  

This compute subtracts out degrees-of-freedom due to fixes that constrain molecular motion, such as fix shake and $f\alpha$ rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees-of-freedom can be altered using the extra option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

# 3.154.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values is in energy units.  

# 3.154.5 Restrictions  

none  

# 3.154.6 Related commands  

compute temp  

# 3.154.7 Default  

none  

# 3.155 compute temp/cs command  

# 3.155.1 Syntax  

compute ID group-ID temp/cs group1 group2 • ID, group-ID are documented in compute command • temp/cs $=$ style name of this compute command group1 $=$ group-ID of either cores or shells • group2 $=$ group-ID of either shells or cores  

# 3.155.2 Examples  

<html><body><table><tr><td>compute oxygen _C-s all 1 temp/cs O_( core shell</td></tr><tr><td>shells all temp compute core cs cores shells</td></tr></table></body></html>  

# 3.155.3 Description  

Define a computation that calculates the temperature of a system based on the center-of-mass velocity of atom pairs that are bonded to each other. This compute is designed to be used with the adiabatic core/shell model of (Mitchell and Fincham). See the Howto coreshell page for an overview of the model as implemented in LAMMPS. Specifically, this compute enables correct temperature calculation and thermostatting of core/shell pairs where it is desirable for the internal degrees of freedom of the core/shell pairs to not be influenced by a thermostat. A compute of this style can be used by any command that computes a temperature via fix_modify (e.g., fix temp/rescale, fix npt).  

Note that this compute does not require all ions to be polarized, hence defined as core/shell pairs. One can mix core/shell pairs and ions without a satellite particle if desired. The compute will consider the non-polarized ions according to the physical system.  

For this compute, core and shell particles are specified by two respective group IDs, which can be defined using the group command. The number of atoms in the two groups must be the same and there should be one bond defined between a pair of atoms in the two groups. Non-polarized ions which might also be included in the treated system should not be included into either of these groups, they are taken into account by the group- $\mathbf{\nabla}\cdot I D$ (second argument) of the compute.  

The temperature is calculated by the formula  

$$
{\mathrm{KE}}={\frac{\dim}{2}}N k_{B}T,
$$  

where KE is the total kinetic energy of the group of atoms (sum of ${\scriptstyle{\frac{1}{2}}}m\nu^{2}$ ), $\mathrm{dim}=2$ or 3 is the dimensionality of the simulation, $N$ is the number of atoms in the group, $k_{B}$ is the Boltzmann constant, and $T$ is the absolute temperature. Note that the velocity of each core or shell atom used in the KE calculation is the velocity of the center-of-mass (COM) of the core/shell pair the atom is part of.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the 1/2 factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the $x y$ component, and so on. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered xx, yy, zz, xy, xz, yz.  

The change this fix makes to core/shell atom velocities is essentially computing the temperature after a “bias” has been removed from the velocity of the atoms. This “bias” is the velocity of the atom relative to the center-of-mass velocity of the core/shell pair. If this compute is used with a fix command that performs thermostatting then this bias will be subtracted from each atom, thermostatting of the remaining center-of-mass velocity will be performed, and the bias will be added back in. This means the thermostatting will effectively be performed on the core/shell pairs, instead of on the individual core and shell atoms. Thermostatting fixes that work in this way include fix nvt, fix temp/rescale, fix temp/berendsen, and fix langevin.  

The internal energy of core/shell pairs can be calculated by the compute temp/chunk command, if chunks are defined as core/shell pairs. See the Howto coreshell doc page for more discussion on how to do this.  

# 3.155.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.155.5 Restrictions  

The number of core/shell pairs contributing to the temperature is assumed to be constant for the duration of the run.   
No fixes should be used which generate new molecules or atoms during a simulation.  

# 3.155.6 Related commands  

compute temp, compute temp/chunk  

# 3.155.7 Default  

none  

(Mitchell and Fincham) Mitchell, Fincham, J Phys Condensed Matter, 5, 1031-1038 (1993).  

# 3.156 compute temp/deform command  

Accelerator Variants: temp/deform/kk  

# 3.156.1 Syntax  

compute ID group-ID temp/deform  

• ID, group-ID are documented in compute command • temp/deform $=$ style name of this compute command  

# 3.156.2 Examples  

# 3.156.3 Description  

Define a computation that calculates the temperature of a group of atoms, after subtracting out a streaming velocity induced by the simulation box changing size and/or shape, for example in a non-equilibrium MD (NEMD) simulation. The size/shape change is induced by use of the fix deform command. A compute of this style is created by the $f\alpha$ nvt/sllod command to compute the thermal temperature of atoms for thermostatting purposes. A compute of this style can also be used by any command that computes a temperature (e.g., thermo_modify, fix temp/rescale, fix npt).  

The deformation fix changes the box size and/or shape over time, so each atom in the simulation box can be thought of as having a “streaming” velocity. For example, if the box is being sheared in $x.$ , relative to $y$ , then atoms at the bottom of the box (low $y$ ) have a small $x$ velocity, while atoms at the top of the box (high $y$ ) have a large $x$ velocity. This position-dependent streaming velocity is subtracted from each atom’s actual velocity to yield a thermal velocity, which is then used to compute the temperature.  

![](images/e80a7ae45c65b014c8225f6109f4b21925074050a2792ca007fafcb97b0934f3.jpg)  

# Note  

Fix deform has an option for remapping either atom coordinates or velocities to the changing simulation box. When using this compute in conjunction with a deforming box, fix deform should NOT remap atom positions, but rather should let atoms respond to the changing box by adjusting their own velocities (or let fix deform remap the atom velocities; see its remap option). If fix deform does remap atom positions, then they appear to move with the box but their velocity is not changed, and thus they do NOT have the streaming velocity assumed by this compute. LAMMPS will warn you if fix deform is defined and its remap setting is not consistent with this compute.  

After the streaming velocity has been subtracted from each atom, the temperature is calculated by the formula  

$$
{\mathrm{KE}}={\frac{\dim}{2}}N k_{B}T,
$$  

where KE is the total kinetic energy of the group of atoms (sum of ${\scriptstyle{\frac{1}{2}}}m\nu^{2}$ , $\mathrm{dim}=2$ or 3 is the dimensionality of the simulation, $N$ is the number of atoms in the group, $k_{B}$ is the Boltzmann constant, and $T$ is the temperature. Note that $\nu$ in the kinetic energy formula is the atom’s velocity.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the 1/2 factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the $x y$ component, and so on. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered $x x$ , yy, zz, xy, xz, yz.  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic option of the compute_modify command if this is not the case.  

The removal of the box deformation velocity component by this fix is essentially computing the temperature after a “bias” has been removed from the velocity of the atoms. If this compute is used with a fix command that performs thermostatting then this bias will be subtracted from each atom, thermostatting of the remaining thermal velocity will be performed, and the bias will be added back in. Thermostatting fixes that work in this way include fix nvt, fix temp/rescale, fix temp/berendsen, and fix langevin.  

# Note  

The temperature calculated by this compute is only accurate if the atoms are indeed moving with a stream velocity profile that matches the box deformation. If not, then the compute will subtract off an incorrect stream velocity, yielding a bogus thermal temperature. You should not assume that your atoms are streaming at the same rate the box is deforming. Rather, you should monitor their velocity profiles (e.g., via the fix ave/chunk command). You can also compare the results of this compute to compute temp/profile, which actually calculates the stream profile before subtracting it. If the two computes do not give roughly the same temperature, then your atoms are not streaming consistent with the box deformation. See the fix deform command for more details on ways to get atoms to stream consistently with the box deformation.  

This compute subtracts out degrees-of-freedom due to fixes that constrain molecular motion, such as fix shake and fix rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees-of-freedom can be altered using the extra option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 3.156.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.156.5 Restrictions  

none  

# 3.156.6 Related commands  

compute temp/ramp, compute temp/profile, fix deform, fix nvt/sllod  

# 3.156.7 Default  

none  

# 3.157 compute temp/deform/eff command  

# 3.157.1 Syntax  

compute ID group-ID temp/deform/eff  

• ID, group-ID are documented in compute command • temp/deform/eff $=$ style name of this compute command  

# 3.157.2 Examples  

# 3.157.3 Description  

Define a computation that calculates the temperature of a group of nuclei and electrons in the electron force field model, after subtracting out a streaming velocity induced by the simulation box changing size and/or shape, for example in a non-equilibrium MD (NEMD) simulation. The size/shape change is induced by use of the fix deform command. A compute of this style is created by the fix nvt/sllod/eff command to compute the thermal temperature of atoms for thermostatting purposes. A compute of this style can also be used by any command that computes a temperature (e.g., thermo_modify, fix npt/eff ).  

The calculation performed by this compute is exactly like that described by the compute temp/deform command, except that the formulas for the temperature (scalar) and diagonal components of the symmetric tensor (vector) include the radial electron velocity contributions, as discussed by the compute temp/eff command. Note that only the translational degrees of freedom for each nuclei or electron are affected by the streaming velocity adjustment. The radial velocity component of the electrons is not affected.  

# 3.157.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.157.5 Restrictions  

This compute is part of the EFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.157.6 Related commands  

compute temp/ramp, fix deform, fix nvt/sllod/eff  

# 3.157.7 Default  

none  

# 3.158 compute temp/drude command  

# 3.158.1 Syntax  

compute ID group-ID temp/drude  

• ID, group-ID are documented in compute command • temp/drude $=$ style name of this compute command  

# 3.158.2 Examples  

Example input scripts available: examples/PACKAGES/drude.  

# 3.158.3 Description  

Define a computation that calculates the temperatures of core–Drude pairs. This compute is designed to be used with the thermalized Drude oscillator model. Polarizable models in LAMMPS are described on the Howto polarizable doc page.  

Drude oscillators consist of a core particle and a Drude particle connected by a harmonic bond, and the relative motion of these Drude oscillators is usually maintained cold by a specific thermostat that acts on the relative motion of the core–Drude particle pairs. Therefore, because LAMMPS considers Drude particles as normal atoms in its default temperature compute (compute temp command), the reduced temperature of the core–Drude particle pairs is not calculated correctly.  

By contrast, this compute calculates the temperature of the cores using center-of-mass velocities of the core–Drude pairs, and the reduced temperature of the Drude particles using the relative velocities of the Drude particles with respect to their cores. Non-polarizable atoms are considered as cores. Their velocities contribute to the temperature of the cores.  

# 3.158.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6, which can be accessed by indices 1–6, whose components are  

1. temperature of the centers of mass (temperature units)   
2. temperature of the dipoles (temperature units)   
3. number of degrees of freedom of the centers of mass   
4. number of degrees of freedom of the dipoles   
5. kinetic energy of the centers of mass (energy units)   
6. kinetic energy of the dipoles (energy units)  

These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

Both the scalar value and the first two values of the vector calculated by this compute are “intensive”. The other four vector values are “extensive”.  

# 3.158.5 Restrictions  

The number of degrees of freedom contributing to the temperature is assumed to be constant for the duration of the run unless the fix_modify command sets the option dynamic/dof yes.  

# 3.158.6 Related commands  

fix drude, fix langevin/drude, fix drude/transform, pair_style thole, compute temp  

# 3.158.7 Default  

none  

# 3.159 compute temp/eff command  

# 3.159.1 Syntax  

compute ID group-ID temp/eff  

• ID, group-ID are documented in compute command • temp/ef $=$ style name of this compute command  

# 3.159.2 Examples  

compute 1 all temp/eff compute myTemp mobile temp/eff  

# 3.159.3 Description  

Define a computation that calculates the temperature of a group of nuclei and electrons in the electron force field model.   
A compute of this style can be used by commands that compute a temperature (e.g., thermo_modify, fix npt/eff ).  

The temperature is calculated by the formula  

$$
{\mathrm{KE}}={\frac{\dim}{2}}N k_{B}T,
$$  

where KE is the total kinetic energy of the group of atoms (sum of ${\scriptstyle{\frac{1}{2}}}m\nu^{2}$ for nuclei and sum of $\textstyle{\frac{1}{2}}(m\nu^{2}+{\frac{3}{4}}m s^{2})$ for electrons, where $s$ includes the radial electron velocity contributions), $\mathrm{dim}=2$ or 3 is the dimensionality of the simulation, $N$ is the number of atoms (only total number of nuclei in the eFF (see the pair_eff command) in the group, $k_{B}$ is the Boltzmann constant, and $T$ is the absolute temperature. This expression is summed over all nuclear and electronic degrees of freedom, essentially by setting the kinetic contribution to the heat capacity to $\scriptstyle{\frac{3}{2}}k$ (where only nuclei contribute). This subtlety is valid for temperatures well below the Fermi temperature, which for densities two to five times the density of liquid hydrogen ranges from 86,000 to $170{,}000\mathrm{K}$ .  

# Note  

For eFF models, in order to override the default temperature reported by LAMMPS in the thermodynamic quantities reported via the thermo command, the user should apply a thermo_modify command, as shown in the following example:  

compute effTemp all temp/eff thermo_style custom step etotal pe ke temp press thermo_modify temp effTemp  

A six-component kinetic energy tensor is also calculated by this compute for use in the computation of a pressure tensor. The formula for the components of the tensor is the same as the above formula, except that $\nu^{2}$ is replaced by $\nu_{x}\nu_{y}$ for the xy component, etc. For the eFF, again, the radial electronic velocities are also considered.  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic option of the compute_modify command if this is not the case.  

This compute subtracts out degrees-of-freedom due to fixes that constrain molecular motion, such as fix shake and $f\alpha$ rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees-of-freedom can be altered using the extra option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

# 3.159.4 Output info  

The scalar value calculated by this compute is “intensive”, meaning it is independent of the number of atoms in the simulation. The vector values are “extensive”, meaning they scale with the number of atoms in the simulation.  

# 3.159.5 Restrictions  

This compute is part of the EFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.159.6 Related commands  

compute temp/partial, compute temp/region, compute pressure  

# 3.159.7 Default  

none  

# 3.160 compute temp/partial command  

# 3.160.1 Syntax  

compute ID group-ID temp/partial xflag yflag zflag  

• ID, group-ID are documented in compute command • temp/partial $=$ style name of this compute command • xflag,yflag,zflag $=0/1$ for whether to exclude/include this dimension  

# 3.160.2 Examples  

# 3.160.3 Description  

Define a computation that calculates the temperature of a group of atoms, after excluding one or more velocity components. A compute of this style can be used by any command that computes a temperature (e.g. thermo_modify, fix temp/rescale, fix npt).  

The temperature is calculated by the formula  

$$
{\mathrm{KE}}={\frac{\dim}{2}}N k_{B}T,
$$  

where KE is the total kinetic energy of the group of atoms (sum of ${\scriptstyle\frac{1}{2}}m\nu^{2},$ ), $\mathrm{dim}=2$ or 3 is the dimensionality of the simulation, $N$ is the number of atoms in the group, $k_{B}$ is the Boltzmann constant, and $T=$ temperature. The calculation of KE excludes the $x,y,$ , or $z$ dimensions if xflag, yflag, or zflag is 0. The dim parameter is adjusted to give the correct number of degrees of freedom.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressure command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the 1/2 factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the xy component, and so on. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered $x x,y y,z z,x y,x z,y z.$ .  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic option of the compute_modify command if this is not the case.  

The removal of velocity components by this fix is essentially computing the temperature after a “bias” has been removed from the velocity of the atoms. If this compute is used with a fix command that performs thermostatting then this bias will be subtracted from each atom, thermostatting of the remaining thermal velocity will be performed, and the bias will be added back in. Thermostatting fixes that work in this way include fix nvt, fix temp/rescale, fix temp/berendsen, and fix langevin.  

This compute subtracts out degrees-of-freedom due to fixes that constrain molecular motion, such as fix shake and $f\alpha$ rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees-of-freedom can be altered using the extra option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

# 3.160.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.160.5 Restrictions  

none  

# 3.160.6 Related commands  

compute temp, compute temp/region, compute pressure  

# 3.160.7 Default  

none  

# 3.161 compute temp/profile command  

# 3.161.1 Syntax  

compute ID group-ID temp/profile xflag yflag zflag binstyle args  

• ID, group-ID are documented in compute command   
• temp/profile $=$ style name of this compute command   
• xflag,yflag,zflag $=0/1$ for whether to exclude/include this dimension   
• binstyle = x or y or z or xy or yz or xz or xyz $\mathrm{xarg}=\mathrm{Nx}$ $\mathrm{\Delta}r\mathrm{arg}=\mathrm{Ny}$ $\mathrm{zarg=Nz}$ xy $\mathrm{args=NxNy}$ yz args $i=\mathrm{Ny}~\mathrm{Nz}$ xz args $=\operatorname{Nx}\operatorname{Nz}$ xyz arg ${\sf s}=\mathrm{Nx}\mathrm{Ny}\mathrm{Nz}$ Nx, Ny, $\mathrm{Nz}={}$ number of velocity bins in x, y, z dimensions   
• zero or more keyword/value pairs may be appended   
• keyword $=$ out out value $=$ tensor or bin  

# 3.161.2 Examples  

<html><body><table><tr><td>compute myTemp fow temp/profile 1 1 1 x 10</td></tr><tr><td>flow temp/profile 1 1 1 x 10 out bin</td></tr><tr><td>compute myTemp myTemp fow temp/profile 0 1 1 xyz 20 20 20</td></tr><tr><td>compute</td></tr></table></body></html>  

# 3.161.3 Description  

Define a computation that calculates the temperature of a group of atoms, after subtracting out a spatially-averaged center-of-mass velocity field, before computing the kinetic energy. This can be useful for thermostatting a collection of atoms undergoing a complex flow (e.g. via a profile-unbiased thermostat (PUT) as described in (Evans)). A compute of this style can be used by any command that computes a temperature (e.g. thermo_modify, fix temp/rescale, fix npt).  

The xflag, yflag, zflag settings determine which components of average velocity are subtracted out.  

The binstyle setting and its $N x,N y,N z$ arguments determine how bins are setup to perform spatial averaging. “Bins” can be 1d slabs, 2d pencils, or 3d bricks depending on which binstyle is used. The simulation box is partitioned conceptually into $N x\times N y\times N z$ bins. Depending on the binstyle, you may only specify one or two of these values; the others are effectively set to 1 (no binning in that dimension). For non-orthogonal (triclinic) simulation boxes, the bins are “tilted” slabs or pencils or bricks that are parallel to the tilted faces of the box. See the region prism command for a discussion of the geometry of tilted boxes in LAMMPS.  

When a temperature is computed, the center-of-mass velocity for the set of atoms that are both in the compute group and in the same spatial bin is calculated. This bias velocity is then subtracted from the velocities of individual atoms in the bin to yield a thermal velocity for each atom. Note that if there is only one atom in the bin, its thermal velocity will thus be 0.0.  

After the spatially-averaged velocity field has been subtracted from each atom, the temperature is calculated by the formula  

$$
\mathrm{KE}=\left({\frac{\mathrm{dim}}{N}}-N_{s}N_{x}N_{y}N_{z}-\mathrm{extra}\right){\frac{k_{B}T}{2}},
$$  

where KE is the total kinetic energy of the group of atoms (sum of ${\scriptstyle{\frac{1}{2}}}m\nu^{2}$ ; $\mathrm{dim}=2$ or 3 is the dimensionality of the simulation; $N_{s}=0$ , 1, 2, or 3 for streaming velocity subtracted in 0, 1, 2, or 3 dimensions, respectively; extra is the number of extra degrees of freedom; $N$ is the number of atoms in the group; $k_{B}$ is the Boltzmann constant, and $T$ is the absolute temperature. The $N_{s}N_{x}N_{y}N_{z}$ term is the number of degrees of freedom subtracted to adjust for the removal of the center-of-mass velocity in each direction of the $N x^{*}N y^{*}N z$ bins, as discussed in the (Evans) paper. The extra term defaults to $\mathrm{dim}-N_{s}$ and accounts for overall conservation of center-of-mass velocity across the group in directions where streaming velocity is not subtracted. This can be altered using the extra option of the compute_modify command.  

If the out keyword is used with a tensor value, which is the default, then a symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the $1/2$ factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the $x y$ component, and so on. Note that because it lacks the $1/2$ factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered xx, yy, zz, xy, xz, yz.  

If the out keyword is used with a bin value, the count of atoms and computed temperature for each bin are stored for output, as an array of values, as described below. The temperature of each bin is calculated as described above, where the bias velocity is subtracted and only the remaining thermal velocity of atoms in the bin contributes to the temperature. See the note below for how the temperature is normalized by the degrees-of-freedom of atoms in the bin.  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic option of the compute_modify command if this is not the case.  

The removal of the spatially-averaged velocity field by this fix is essentially computing the temperature after a “bias” has been removed from the velocity of the atoms. If this compute is used with a fix command that performs thermostatting then this bias will be subtracted from each atom, thermostatting of the remaining thermal velocity will be performed, and the bias will be added back in. Thermostatting fixes that work in this way include fix nvt, fix temp/rescale, fix temp/berendsen, and fix langevin.  

This compute subtracts out degrees-of-freedom due to fixes that constrain molecular motion, such as fix shake and $f\alpha$ rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees-of-freedom can be altered using the extra option of the compute_modify command.  

# Note  

When using the out keyword with a value of bin, the calculated temperature for each bin includes the degrees-offreedom adjustment described in the preceding paragraph for fixes that constrain molecular motion, as well as the adjustment due to the extra option (which defaults to dim - Ns as described above), by fractionally applying them based on the fraction of atoms in each bin. As a result, the bin degrees-of-freedom summed over all bins exactly equals the degrees-of-freedom used in the scalar temperature calculation, $\Sigma N_{\mathrm{DOF}_{i}}=N_{\mathrm{DOF}}$ and the corresponding relation for temperature is also satisfied $(\Sigma N_{\mathrm{DOF}_{i}}T_{i}=N_{\mathrm{DOF}}T)$ . These relations will break down in cases for which the adjustment exceeds the actual number of degrees of freedom in a bin. This could happen if a bin is empty or in situations in which rigid molecules are non-uniformly distributed, in which case the reported temperature within a bin may not be accurate.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting. Using this compute in conjunction with a thermostatting fix, as explained there, will effectively implement a profileunbiased thermostat (PUT), as described in (Evans).  

# 3.161.4 Output info  

This compute calculates a global scalar (the temperature). Depending on the setting of the out keyword, it also calculates a global vector or array. For $o u t=t e n s o r$ , it calculates a vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. For $o u t=b i n$ it calculates a global array which has 2 columns and $N$ rows, where $N$ is the number of bins. The first column contains the number of atoms in that bin. The second contains the temperature of that bin, calculated as described above. The ordering of rows in the array is as follows. Bins in $x$ vary fastest, then $y$ , then $z$ . Thus for a $10\times10\times103\mathrm{d}$ array of bins, there will be 1000 rows. The bin with indices $(i_{x},i_{y},i_{z})=(2,3,4)$ would map to row $M=10^{2}(i_{z}-1)+10(i_{y}-1)+i_{x}=322$ , where the rows are numbered from 1 to 1000 and the bin indices are numbered from 1 to 10 in each dimension.  

These values can be used by any command that uses global scalar or vector or array values from a compute as input.   
See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”. The array values are “intensive”.  

The scalar value us in temperature units. The vector values are in energy units. The first column of array values are counts; the values in the second column will be in temperature units.  

# 3.161.5 Restrictions  

You should not use too large a velocity-binning grid, especially in 3d. In the current implementation, the binned velocity averages are summed across all processors, so this will be inefficient if the grid is too large, and the operation is performed every timestep, as it will be for most thermostats.  

# 3.161.6 Related commands  

compute temp, compute temp/ramp, compute temp/deform, compute pressure  

# 3.161.7 Default  

The option default is out $=$ tensor.  

(Evans) Evans and Morriss, Phys Rev Lett, 56, 2172-2175 (1986).  

# 3.162 compute temp/ramp command  

# 3.162.1 Syntax  

compute ID group-ID temp/ramp vdim vlo vhi dim clo chi keyword value ...  

• ID, group-ID are documented in compute command   
• temp/ramp $=$ style name of this compute command   
• vdim $=\nu x$ or vy or vz   
• vlo,vhi $=$ subtract velocities between vlo and vhi (velocity units)   
• $\mathrm{dim}=x$ or $y$ or z   
• clo,chi $=$ lower and upper bound of domain to subtract from (distance units)  

• zero or more keyword/value pairs may be appended • keyword $=$ units  

units value $=$ lattice or box  

# 3.162.2 Examples  

compute 2nd middle temp/ramp vx 0 8 y 2 12 units lattice  

# 3.162.3 Description  

Define a computation that calculates the temperature of a group of atoms, after subtracting out an ramped velocity profile before computing the kinetic energy. A compute of this style can be used by any command that computes a temperature (e.g. thermo_modify, fix temp/rescale, fix npt).  

The meaning of the arguments for this command which define the velocity ramp are the same as for the velocity ramp command which was presumably used to impose the velocity.  

After the ramp velocity has been subtracted from the specified dimension for each atom, the temperature is calculated by the formula  

$$
{\mathrm{KE}}={\frac{\dim}{2}}N k_{B}T,
$$  

where KE is the total kinetic energy of the group of atoms (sum of ${\scriptstyle\frac{1}{2}}m\nu^{2}.$ ), $\mathrm{dim}=2$ or 3 is the dimensionality of the simulation, $N$ is the number of atoms in the group, $k_{B}$ is the Boltzmann constant, and $T$ is the absolute temperature.  

The units keyword determines the meaning of the distance units used for coordinates $(c l o,c h i)$ and velocities $(\nu l o,\nu h i)$ . A box value selects standard distance units as defined by the units command (e.g., Å for units $=$ real or metal). A lattice value means the distance units are in lattice spacings (i.e., velocity in lattice spacings per unit time). The lattice command must have been previously used to define the lattice spacing.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the $1/2$ factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the $x y$ component, and so on. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered xx, yy, zz, xy, xz, yz.  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic option of the compute_modify command if this is not the case.  

The removal of the ramped velocity component by this fix is essentially computing the temperature after a “bias” has been removed from the velocity of the atoms. If this compute is used with a fix command that performs thermostatting then this bias will be subtracted from each atom, thermostatting of the remaining thermal velocity will be performed, and the bias will be added back in. Thermostatting fixes that work in this way include fix nvt, fix temp/rescale, fix temp/berendsen, and fix langevin.  

This compute subtracts out degrees-of-freedom due to fixes that constrain molecular motion, such as fix shake and $f\alpha$ rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees-of-freedom can be altered using the extra option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

# 3.162.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.   
The scalar value is in temperature units. The vector values are in energy units.  

# 3.162.5 Restrictions  

none  

# 3.162.6 Related commands  

compute temp, compute temp/profile, compute temp/deform, compute pressure  

# 3.162.7 Default  

The option default is units $=$ lattice.  

# 3.163 compute temp/region command  

# 3.163.1 Syntax  

compute ID group-ID temp/region region-ID  

• ID, group-ID are documented in compute command • temp/region $=$ style name of this compute command • region- $\mathrm{{\cdot}I D=I D}$ of region to use for choosing atoms  

# 3.163.2 Examples  

compute mine flow temp/region boundary  

# 3.163.3 Description  

Define a computation that calculates the temperature of a group of atoms in a geometric region. This can be useful for thermostatting one portion of the simulation box. For example, a McDLT simulation where one side is cooled, and the other side is heated. A compute of this style can be used by any command that computes a temperature (e.g., thermo_modify, fix temp/rescale).  

Note that a region-style temperature can be used to thermostat with fix temp/rescale or fix langevin, but should probably not be used with Nose–Hoover style fixes $(f i x n\nu t,f i x n p t$ , or fix nph) if the degrees of freedom included in the computed temperature vary with time.  

The temperature is calculated by the formula  

$$
{\mathrm{KE}}={\frac{\dim}{2}}N k_{B}T,
$$  

where $\mathrm{KE}=$ is the total kinetic energy of the group of atoms (sum of ${\scriptstyle\frac{1}{2}}m\nu^{2}.$ ), $\mathrm{dim}=2$ or 3 is the dimensionality of the simulation, $N$ is the number of atoms in both the group and region, $k_{B}$ is the Boltzmann constant, and $T$ temperature.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the 1/2 factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the $x y$ component, and so on. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered $x x$ , yy, zz, xy, xz, yz.  

The number of atoms contributing to the temperature is calculated each time the temperature is evaluated since it is assumed atoms can enter/leave the region. Thus there is no need to use the dynamic option of the compute_modify command for this compute style.  

The removal of atoms outside the region by this fix is essentially computing the temperature after a “bias” has been removed, which in this case is the velocity of any atoms outside the region. If this compute is used with a fix command that performs thermostatting then this bias will be subtracted from each atom, thermostatting of the remaining thermal velocity will be performed, and the bias will be added back in. Thermostatting fixes that work in this way include $f\alpha$ nvt, fix temp/rescale, fix temp/berendsen, and fix langevin. This means that when this compute is used to calculate the temperature for any of the thermostatting fixes via the fix modify temp command, the thermostat will operate only on atoms that are currently in the geometric region.  

Unlike other compute styles that calculate temperature, this compute does not subtract out degrees-of-freedom due to fixes that constrain motion, such as fix shake and fix rigid. This is because those degrees of freedom (e.g., a constrained bond) could apply to sets of atoms that straddle the region boundary, and hence the concept is somewhat ill-defined. If needed the number of subtracted degrees of freedom can be set explicitly using the extra option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

# 3.163.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.163.5 Restrictions  

none  

# 3.163.6 Related commands  

compute temp, compute pressure  

# 3.163.7 Default  

none  

# 3.164 compute temp/region/eff command  

# 3.164.1 Syntax  

compute ID group-ID temp/region/eff region-ID  

• ID, group-ID are documented in compute command • temp/region/ef $=$ style name of this compute command • region- $\mathrm{{\cdot}I D=I D}$ of region to use for choosing atoms  

# 3.164.2 Examples  

# 3.164.3 Description  

Define a computation that calculates the temperature of a group of nuclei and electrons in the electron force field model, within a geometric region using the electron force field. A compute of this style can be used by commands that compute a temperature (e.g., thermo_modify).  

The operation of this compute is exactly like that described by the compute temp/region command, except that the formulas for the temperature (scalar) and diagonal components of the symmetric tensor (vector) include the radial electron velocity contributions, as discussed by the compute temp/eff command.  

# 3.164.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.164.5 Restrictions  

This compute is part of the EFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.164.6 Related commands  

compute temp/region, compute temp/eff , compute pressure  

# 3.164.7 Default  

none  

# 3.165 compute temp/rotate command  

# 3.165.1 Syntax  

compute ID group-ID temp/rotate  

• ID, group-ID are documented in compute command • temp/rotate $=$ style name of this compute command  

# 3.165.2 Examples  

compute Tbead bead temp/rotate  

# 3.165.3 Description  

Define a computation that calculates the temperature of a group of atoms, after subtracting out the center-of-mass velocity and angular velocity of the group. This is useful if the group is expected to have a non-zero net velocity and/or global rotation motion for some reason. A compute of this style can be used by any command that computes a temperature (e.g., thermo_modify, fix temp/rescale, fix npt).  

After the center-of-mass velocity and angular velocity has been subtracted from each atom, the temperature is calculated by the formula  

$$
{\mathrm{KE}}={\frac{\dim}{2}}N k_{B}T,
$$  

where KE is the total kinetic energy of the group of atoms (sum of ${\scriptstyle\frac{1}{2}}m\nu^{2}.$ ), $\mathrm{dim}=2$ or 3 is the dimensionality of the simulation, $N$ is the number of atoms in the group, $k_{B}$ is the Boltzmann constant, and $T$ is the absolute temperature.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the 1/2 factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the $x y$ component, and so on. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered $x x,y y,z z,x y,x z,y z.$  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic option of the compute_modify command if this is not the case.  

The removal of the center-of-mass velocity and angular velocity by this fix is essentially computing the temperature after a “bias” has been removed from the velocity of the atoms. If this compute is used with a fix command that performs thermostatting then this bias will be subtracted from each atom, thermostatting of the remaining thermal velocity will be performed, and the bias will be added back in. Thermostatting fixes that work in this way include $f\alpha$ nvt, fix temp/rescale, fix temp/berendsen, and fix langevin.  

This compute subtracts out degrees-of-freedom due to fixes that constrain molecular motion, such as fix shake and $f\alpha$ rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees-of-freedom can be altered using the extra option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

# 3.165.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1-6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.165.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.165.6 Related commands  

compute temp  

# 3.165.7 Default  

none  

# 3.166 compute temp/sphere command  

# 3.166.1 Syntax  

compute ID group-ID temp/sphere keyword value ...  

• ID, group-ID are documented in compute command   
• temp/sphere $=$ style name of this compute command   
• zero or more keyword/value pairs may be appended   
• keyword $=$ bias or dof bias value $=$ bias-ID bias- $\mathrm{ID}=\mathrm{ID}$ of a temperature compute that removes a velocity bias dof value $=$ all or rotate all $=$ compute temperature of translational and rotational degrees of freedom rotate $=$ compute temperature of just rotational degrees of freedom  

# 3.166.2 Examples  

compute 1 all temp/sphere compute myTemp mobile temp/sphere bias tempCOM compute myTemp mobile temp/sphere dof rotate  

# 3.166.3 Description  

Define a computation that calculates the temperature of a group of spherical particles, including a contribution from both their translational and rotational kinetic energy. This differs from the usual compute temp command, which assumes point particles with only translational kinetic energy.  

Both point and finite-size particles can be included in the group. Point particles do not rotate, so they have only three translational degrees of freedom. For 3d spherical particles, each has six degrees of freedom (three translational, three rotational). For 2d spherical particles, each has three degrees of freedom (two translational, one rotational).  

# Note  

This choice for degrees of freedom (DOF) assumes that all finite-size spherical particles in your model will freely rotate, sampling all their rotational DOF. It is possible to use a combination of interaction potentials and fixes that induce no torque or otherwise constrain some of all of your particles so that this is not the case. Then there are less DOF and you should use the compute_modify extra/dof command to adjust the DOF accordingly.  

The translational kinetic energy is computed the same as is described by the compute temp command. The rotational kinetic energy is computed as ${\scriptstyle{\frac{1}{2}}}I\omega^{2}$ , where $I$ is the moment of inertia for a sphere and $\omega$ is the particle’s angular velocity.  

# Note  

For 2d models, particles are treated as spheres, not disks, meaning their moment of inertia will be the same as in 3d.  

A kinetic energy tensor, stored as a six-element vector, is also calculated by this compute. The formula for the components of the tensor is the same as the above formulas, except that $\nu^{2}$ and $\omega^{2}$ are replaced by $\nu_{x}\nu_{y}$ and $\omega_{x}\omega_{y}$ for the $x y$ component. The six components of the vector are ordered $x x$ , yy, zz, xy, xz, yz.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the 1/2 factor is NOT included and the $\nu_{i}^{2}$ and $\omega^{2}$ are replaced by $\nu_{x}\nu_{y}$ and $\omega_{x}\omega_{y}$ for the $x y$ component, and so on. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered xx, yy, zz, xy, xz, yz.  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic option of the compute_modify command if this is not the case.  

This compute subtracts out translational degrees-of-freedom due to fixes that constrain molecular motion, such as $f\alpha$ shake and fix rigid. This means the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees of freedom can be altered using the extra/dof option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

The keyword/value option pairs are used in the following ways.  

For the bias keyword, bias-ID refers to the ID of a temperature compute that removes a “bias” velocity from each atom. This allows compute temp/sphere to compute its thermal temperature after the translational kinetic energy components have been altered in a prescribed way (e.g., to remove a flow velocity profile). Thermostats that use this compute will work with this bias term. See the doc pages for individual computes that calculate a temperature and the doc pages for fixes that perform thermostatting for more details.  

For the dof keyword, a setting of all calculates a temperature that includes both translational and rotational degrees of freedom. A setting of rotate calculates a temperature that includes only rotational degrees of freedom.  

# 3.166.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 6 (symmetric tensor), which can be accessed by indices 1–6. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The vector values are “extensive”.  

The scalar value is in temperature units. The vector values are in energy units.  

# 3.166.5 Restrictions  

This fix requires that atoms store torque and angular velocity (omega) and a radius as defined by the atom_style sphere command.  

All particles in the group must be finite-size spheres, or point particles with radius $=0.0$ .  

# 3.166.6 Related commands  

compute temp, compute temp/asphere  

# 3.166.7 Default  

The option defaults are no bias and dof $=$ all.  

# 3.167 compute temp/uef command  

# 3.167.1 Syntax  

compute ID group-ID temp/uef  

• ID, group-ID are documented in compute command • temp/uef $=$ style name of this compute command  

# 3.167.2 Examples  

<html><body><table><tr><td>compute 1 all temp/uef</td></tr><tr><td>compute 2 sel temp/uef</td></tr><tr><td></td></tr></table></body></html>  

# 3.167.3 Description  

This command is used to compute the kinetic energy tensor in the reference frame of the applied flow field when $f\alpha$ nvt/uef or fix npt/uef is used. It is not necessary to use this command to compute the scalar value of the temperature. A compute temp may be used for that purpose.  

Output information for this command can be found in the documentation for compute temp.  

# 3.167.4 Restrictions  

This fix is part of the UEF package. It is only enabled if LAMMPS was built with that package. See the Build packag page for more info.  

This command can only be used when fix nvt/uef or fix npt/uef is active.  

# 3.167.5 Related commands  

compute temp, fix nvt/uef , compute pressure/uef  

# 3.167.6 Default  

none  

# 3.168 compute ti command  

# 3.168.1 Syntax  

compute ID group ti keyword args ...  

• ID, group-ID are documented in compute command • ti $=$ style name of this compute command  

• one or more attribute/arg pairs may be appended • keyword $=$ pair style (lj/cut, gauss, born, etc.) or tail or kspace  

pair style args $=$ atype v_name1 v_name2 atype $=$ atom type (see asterisk form below)   
v_name1 $=$ variable with name1 that is energy scale factor and function of lambda $\mathrm{v\_name2=}$ variable with name2 that is derivative of v_name1 with respect to lambda   
tail args $=$ atype v_name1 v_name2 atype $=$ atom type (see asterisk form below)   
v_name1 = variable with name1 that is energy tail correction scale factor and function of lambda   
v_name2 = variable with name2 that is derivative of v_name1 with respect to lambda   
kspace args $=$ atype v_name1 v_name2   
atype $=$ atom type (see asterisk form below)   
v_name1 = variable with name1 that is K-Space scale factor and function of lambda $\mathrm{v\_name2=}$ variable with name2 that is derivative of v_name1 with respect to lambda  

# 3.168.2 Examples  

compute 1 all ti lj/cut 1 v_lj v_dlj coul/long 2 v_c v_dc kspace 1 v_ks v_dks compute 1 all ti lj/cut 1\*3 v_lj v_dlj coul/long \* v_c v_dc kspace \* v_ks v_dks  

# 3.168.3 Description  

Define a computation that calculates the derivative of the interaction potential with respect to lambda, the coupling parameter used in a thermodynamic integration. This derivative can be used to infer a free energy difference resulting from an alchemical simulation, as described in Eike.  

Typically this compute will be used in conjunction with the fix adapt command which can perform alchemical transformations by adjusting the strength of an interaction potential as a simulation runs, as defined by one or more pair_style or kspace_style commands. This scaling is done via a prefactor on the energy, forces, virial calculated by the pair or $k$ -space style. The prefactor is often a function of a lambda parameter which may be adjusted from 0 to 1 (or vice versa) over the course of a run. The time-dependent adjustment is what the fix adapt command does.  

Assume that the unscaled energy of a pair_style or kspace_style is given by $U$ . Then the scaled energy is  

$$
U_{s}=f(\lambda)U
$$  

where $f$ is some function of $\lambda$ . What this compute calculates is  

$$
\frac{d U_{s}}{d\lambda}=U\frac{d f(\lambda)}{d\lambda}=\frac{U_{s}}{f(\lambda)}\frac{d f(\lambda)}{d\lambda},
$$  

which is the derivative of the system’s scaled potential energy $U_{s}$ with respect to $\lambda$ .  

To perform this calculation, you provide one or more atom types as atype. The variable atype can be specified in one of two ways. An explicit numeric value can be used, as in the first example above, or a wildcard asterisk can be used in place of or in conjunction with the atype argument to select multiple atom types. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast\rightarrow}$ or $\ '_{\mathrm{m}}\ast_{\mathrm{n}}\cdots$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $\mathbf{N}$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

You also specify two functions, as equal-style variables. The first is specified as v_name1, where name1 is the name of the variable, and is $f(\lambda)$ in the notation above. The second is specified as $\nu.$ _name2, where name2 is the name of the variable, and is $d f(\lambda)/d\lambda$ in the notation above (i.e., it is the analytic derivative of $f$ with respect to $\lambda$ ). Note that the name1 variable is also typically given as an argument to the fix adapt command.  

An alchemical simulation may use several pair potentials together, invoked via the pair_style hybrid or hybrid/overlay command. The total $d U_{s}/d\lambda$ for the overall system is calculated as the sum of each contributing term as listed by the keywords in the compute $t i$ command. Individual pair potentials can be listed, which will be sub-styles in the hybrid case. You can also include a $k$ -space term via the kspace keyword. You can also include a pairwise long-range tail correction to the energy via the tail keyword.  

For each term, you can specify a different (or the same) scale factor by the two variables that you list. Again, these will typically correspond toe the scale factors applied to these various potentials and the $k$ -space contribution via the fix adapt command.  

More details about the exact functional forms for the computation of $d u/d l$ can be found in the paper by Eike.  

# 3.168.4 Output info  

This compute calculates a global scalar, namely $d U_{s}/d\lambda$ . This value can be used by any command that uses a global scalar value from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “extensive”.  

The scalar value will be in energy units.  

# 3.168.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.168.6 Related commands  

fix adapt  

# 3.168.7 Default  

none  

(Eike) Eike and Maginn, Journal of Chemical Physics, 124, 164503 (2006).  

# 3.169 compute torque/chunk command  

# 3.169.1 Syntax  

compute ID group-ID torque/chunk chunkID  

• ID, group-ID are documented in compute command • torque/chunk $=$ style name of this compute command • chunkID $=$ ID of compute chunk/atom command  

# 3.169.2 Examples  

compute 1 fluid torque/chunk molchunk  

# 3.169.3 Description  

Define a computation that calculates the torque on multiple chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

This compute calculates the three components of the torque vector for eqch chunk, due to the forces on the individual atoms in the chunk around the center-of-mass of the chunk. The calculation includes all effects due to atoms passing through periodic boundaries.  

Note that only atoms in the specified group contribute to the calculation. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

![](images/e12c49c4ca9327fbeaa516929cb840117e70f22389c733867866e41bdf2b4b44.jpg)  

# Note  

The coordinates of an atom contribute to the chunk’s torque in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

The simplest way to output the results of the compute torque/chunk calculation to a file is to use the fix ave/time command, for example:  

compute cc1 all chunk/atom molecule   
compute myChunk all torque/chunk cc1   
fix 1 all ave/time 100 1 100 c_myChunk[\*] file tmp.out mode vector  

# 3.169.4 Output info  

This compute calculates a global array where the number of rows is equal to the number of chunks Nchunk as calculated by the specified compute chunk/atom command. The number of columns is three for the $x.$ , y, and $z$ components of the torque for each chunk. These values can be accessed by any command that uses global array values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The array values are “intensive”. The array values will be in force-distance units.  

# 3.169.5 Restrictions  

none  

# 3.169.6 Related commands  

variable torque() function  

# 3.169.7 Default  

none  

# 3.169. compute torque/chunk command  

# 3.170 compute vacf command  

# 3.170.1 Syntax  

# compute ID group-ID vacf  

• ID, group-ID are documented in compute command • vacf $=$ style name of this compute command  

# 3.170.2 Examples  

<html><body><table><tr><td>compute 1 all vacf</td></tr><tr><td>compute 1 upper vacf</td></tr><tr><td></td></tr></table></body></html>  

# 3.170.3 Description  

Define a computation that calculates the velocity auto-correlation function (VACF), averaged over a group of atoms. Each atom’s contribution to the VACF is its current velocity vector dotted into its initial velocity vector at the time the compute was specified.  

A vector of four quantities is calculated by this compute. The first three elements of the vector are $\nu_{x}\nu_{x,0}$ (and similar for the $y$ and $z$ components), summed and averaged over atoms in the group, where $\nu_{x}$ is the current $x$ -component of the velocity of the atom and $\nu_{x,0}$ is the initial $x$ -component of the velocity of the atom. The fourth element of the vector is the total VACF (i.e., $(\nu_{x}\nu_{x,0}+\nu_{y}\nu_{y,0}+\nu_{z}\nu_{z,0}))$ ), summed and averaged over atoms in the group.  

The integral of the VACF versus time is proportional to the diffusion coefficient of the diffusing atoms. This can be computed in the following manner, using the variable trap() function:  

compute 2 all vacf fix 5 all vector 1 c_2[4] variable diff equal dt\*trap(f_5) thermo_style custom step v_diff  

# Note  

If you want the quantities calculated by this compute to be continuous when running from a restart file, then you should use the same ID for this compute, as in the original run. This is so that the fix this compute creates to store per-atom quantities will also have the same ID, and thus be initialized correctly with time $_{:=0}$ atom velocities from the restart file.  

# 3.170.4 Output info  

This compute calculates a global vector of length 4, which can be accessed by indices 1–4 by any command that uses global vector values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The vector values are “intensive”. The vector values will be in velocity2 units.  

# 3.170.5 Restrictions  

none  

# 3.170.6 Related commands  

compute msd  

# 3.170.7 Default  

none  

# 3.171 compute vcm/chunk command  

# 3.171.1 Syntax  

compute ID group-ID vcm/chunk chunkID  

• ID, group-ID are documented in compute command • vcm/chunk $=$ style name of this compute command • chunkID $=$ ID of compute chunk/atom command  

# 3.171.2 Examples  

compute 1 fluid vcm/chunk molchunk  

# 3.171.3 Description  

Define a computation that calculates the center-of-mass velocity for multiple chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

This compute calculates the $(x,y,z)$ components of the center-of-mass velocity for each chunk. This is done by summing mass\*velocity for each atom in the chunk and dividing the sum by the total mass of the chunk.  

Note that only atoms in the specified group contribute to the calculation. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

The simplest way to output the results of the compute vcm/chunk calculation to a file is to use the fix ave/time command, for example:  

<html><body><table><tr><td>compute ccl all chunk/atom molecule</td></tr><tr><td></td></tr><tr><td>compute myChunk all 1 vcm/chunk ccl</td></tr><tr><td>fix 1 all ave /time 100 1 100 c_myChunk[*] file tmp.out mode vector</td></tr></table></body></html>  

# 3.171.4 Output info  

This compute calculates a global array where the number of rows is the number of chunks Nchunk as calculated by the specified compute chunk/atom command. The number of columns is 3 for the $(x,y,z)$ center-of-mass velocity coordinates of each chunk. These values can be accessed by any command that uses global array values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The array values are “intensive”. The array values will be in velocity units.  

# 3.171. compute vcm/chunk command  

# 3.171.5 Restrictions  

none  

# 3.171.6 Related commands  

none  

# 3.171.7 Default  

none  

# 3.172 compute viscosity/cos command  

# 3.172.1 Syntax  

compute ID group-ID viscosity/cos  

• ID, group-ID are documented in compute command • viscosity/cos $=$ style name of this compute command  

# 3.172.2 Examples  

units real   
compute cos all viscosity/cos   
variable V equal c_cos[7]   
variable A equal 0.02E-5 # A/fs^2   
variable density equal density   
variable lz equal lz   
variable reciprocalViscosity equal v_V/\${A}/v_density\*39.4784/v_lz/v_lz\*100 # 1/(Pa\*s)  

# 3.172.3 Description  

Define a computation that calculates the velocity amplitude of a group of atoms with an cosine-shaped velocity profile and the temperature of them after subtracting out the velocity profile before computing the kinetic energy. A compute of this style can be used by any command that computes a temperature (e.g., thermo_modify, fix npt).  

This command together with fix_accelerate/cos enables viscosity calculation with periodic perturbation method, as described by Hess. An acceleration along the $x$ -direction is applied to the simulation system by using fix_accelerate/cos command. The acceleration is a periodic function along the $z$ -direction:  

$$
a_{x}(z)=A\cos\left(\frac{2\pi z}{l_{z}}\right)
$$  

where $A$ is the acceleration amplitude, $l_{z}$ is the $z$ -length of the simulation box. At steady state, the acceleration generates a velocity profile:  

$$
\nu_{x}(z)=V\cos\left(\frac{2\pi z}{l_{z}}\right)
$$  

The generated velocity amplitude $V$ is related to the shear viscosity $\eta$ by  

$$
V=\frac{A\rho}{\eta}\left(\frac{l_{z}}{2\pi}\right)^{2},
$$  

and it can be obtained from ensemble average of the velocity profile via  

$$
V={\frac{\sum_{i}2m_{i}\nu_{i,x}\cos\left({\frac{2\pi z_{i}}{l_{z}}}\right)}{\sum_{i}m_{i}}}
$$  

where $m_{i}$ , $\nu_{i,x}$ and $z_{i}$ are the mass, $x$ -component velocity, and $z$ -coordinate of a particle, respectively.  

After the cosine-shaped collective velocity in the $x$ -direction has been subtracted for each atom, the temperature is calculated by the formula  

$$
{\mathrm{KE}}={\frac{\dim}{2}}N k_{B}T,
$$  

where KE is the total kinetic energy of the group of atoms (sum of ${\scriptstyle\frac{1}{2}}m\nu^{2}.$ ), $\mathrm{dim}=2$ or 3 is the dimensionality of the simulation, $N$ is the number of atoms in the group, $k_{B}$ is the Boltzmann constant, and $T$ is the absolute temperature.  

A symmetric tensor, stored as a six-element vector, is also calculated by this compute for use in the computation of a pressure tensor by the compute pressue command. The formula for the components of the tensor is the same as the above expression for $E_{\mathrm{kin}}$ , except that the $1/2$ factor is NOT included and the $\nu_{i}^{2}$ is replaced by $\nu_{i,x}\nu_{i,y}$ for the $x y$ component, and so on. Note that because it lacks the 1/2 factor, these tensor components are twice those of the traditional kinetic energy tensor. The six components of the vector are ordered xx, yy, zz, xy, xz, yz.  

The number of atoms contributing to the temperature is assumed to be constant for the duration of the run; use the dynamic option of the compute_modify command if this is not the case. However, in order to get meaningful results, the group ID of this compute should be all.  

The removal of the cosine-shaped velocity component by this command is essentially computing the temperature after a “bias” has been removed from the velocity of the atoms. If this compute is used with a fix command that performs thermostatting then this bias will be subtracted from each atom, thermostatting of the remaining thermal velocity will be performed, and the bias will be added back in. Thermostatting fixes that work in this way include fix nvt, fix temp/rescale, fix temp/berendsen, and fix langevin.  

This compute subtracts out degrees of freedom due to fixes that constrain molecular motion, such as fix shake and $f\alpha$ rigid. This means that the temperature of groups of atoms that include these constraints will be computed correctly. If needed, the subtracted degrees of freedom can be altered using the extra option of the compute_modify command.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

# 3.172.4 Output info  

This compute calculates a global scalar (the temperature) and a global vector of length 7, which can be accessed by indices 1–7. The first six elements of the vector are those of the symmetric tensor discussed above. The seventh is the cosine-shaped velocity amplitude $V$ , which can be used to calculate the reciprocal viscosity, as shown in the example. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The first six elements of vector values are “extensive”, and the seventh element of vector values is “intensive”.  

The scalar value is in temperature units. The first six elements of vector values are in energy units. The seventh element of vector value us in velocity units.  

# 3.172.5 Restrictions  

This compute is part of the MISC package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Since this compute depends on fix accelerate/cos which can only work for 3d systems, it cannot be used for 2d systems.  

# 3.172. compute viscosity/cos command  

# 3.172.6 Related commands  

fix accelerate/cos  

# 3.172.7 Default  

none  

(Hess) Hess, B. The Journal of Chemical Physics 2002, 116 (1), 209-217.  

# 3.173 compute voronoi/atom command  

# 3.173.1 Syntax  

compute ID group-ID voronoi/atom keyword arg ...  

• ID, group-ID are documented in compute command   
• voronoi/atom $=$ style name of this compute command   
• zero or more keyword/value pairs may be appended   
• keyword $=$ only_group or occupation or surface or radius or edge_histo or edge_threshold or face_threshold or neighbors only_group = no arg occupation $=\mathrm{no}$ arg surface arg $=$ sgroup-ID sgroup-ID $=$ compute the dividing surface between group-ID and sgroup-ID this keyword adds a third column to the compute output radius arg = v_r v_r = radius atom style variable for a poly-disperse Voronoi tessellation edge_histo arg $-$ maxedge maxedge $-$ maximum number of Voronoi cell edges to be accounted in the histogram edge_threshold arg = minlength minlength = minimum length for an edge to be counted face_threshold arg = minarea minarea $=$ minimum area for a face to be counted neighbors value $=$ yes or no $=$ store list of all neighbors or no  

# 3.173.2 Examples  

compute 1 all voronoi/atom compute 2 precipitate voronoi/atom surface matrix compute 3b precipitate voronoi/atom radius v_r compute 4 solute voronoi/atom only_group compute 5 defects voronoi/atom occupation compute 6 all voronoi/atom neighbors yes  

# 3.173.3 Description  

Define a computation that calculates the Voronoi tessellation of the atoms in the simulation box. The tessellation is calculated using all atoms in the simulation, but non-zero values are only stored for atoms in the group.  

Two per-atom quantities are calculated by this compute. The first is the volume of the Voronoi cell around each atom. Any point in an atom’s Voronoi cell is closer to that atom than any other. The second is the number of faces of the Voronoi cell. This is equal to the number of nearest neighbors of the central atom, plus any exterior faces (see note below).  

If the only_group keyword is specified the tessellation is performed only with respect to the atoms contained in the compute group. This is equivalent to deleting all atoms not contained in the group prior to evaluating the tessellation.  

If the surface keyword is specified a third quantity per atom is computed: the Voronoi cell surface of the given atom. surface takes a group ID as an argument. If a group other than all is specified, only the Voronoi cell facets facing a neighbor atom from the specified group are counted towards the surface area.  

In the example above, a precipitate embedded in a matrix, only atoms at the surface of the precipitate will have non-zero surface area, and only the outward facing facets of the Voronoi cells are counted (the hull of the precipitate). The total surface area of the precipitate can be obtained by running a “reduce sum” compute on c_2[3].  

If the radius keyword is specified with an atom style variable as the argument, a poly-disperse Voronoi tessellation is performed. Examples for radius variables are  

variable r1 atom $(\mathrm{type{=}{=}1)^{\ast}0.1{+}(\mathrm{type{=}{=}2)^{\ast}0.4}}$ compute radius all property/atom radius variable r2 atom c_radius  

Here $\mathbf{V}\_\mathbf{r}1$ specifies a per-type radius of 0.1 units for type 1 atoms and 0.4 units for type 2 atoms, and v_r2 accesses the radius property present in atom_style sphere for granular models.  

The edge_histo keyword activates the compilation of a histogram of number of edges on the faces of the Voronoi cells in the compute group. The argument maxedge of the this keyword is the largest number of edges on a single Voronoi cell face expected to occur in the sample. This keyword generates output of a global vector by this compute with maxedge $+1$ entries. The last entry in the vector contains the number of faces with more than maxedge edges. Since the polygon with the smallest amount of edges is a triangle, entries 1 and 2 of the vector will always be zero.  

The edge_threshold and face_threshold keywords allow the suppression of edges below a given minimum length and faces below a given minimum area. Ultra short edges and ultra small faces can occur as artifacts of the Voronoi tessellation. These keywords will affect the neighbor count and edge histogram outputs.  

If the occupation keyword is specified the tessellation is only performed for the first invocation of the compute and then stored. For all following invocations of the compute the number of atoms in each Voronoi cell in the stored tessellation is counted. In this mode the compute returns a per-atom array with 2 columns. The first column is the number of atoms currently in the Voronoi volume defined by this atom at the time of the first invocation of the compute (note that the atom may have moved significantly). The second column contains the total number of atoms sharing the Voronoi cell of the stored tessellation at the location of the current atom. Numbers in column one can be any positive integer including zero, while column two values will always be greater than zero. Column one data can be used to locate vacancies (the coordinates are given by the atom coordinates at the time step when the compute was first invoked), while column two data can be used to identify interstitial atoms.  

If the neighbors value is set to yes, then this compute also creates a local array with 3 columns. There is one row for each face of each Voronoi cell. The 3 columns are the atom ID of the atom that owns the cell, the atom ID of the atom in the neighboring cell (or zero if the face is external), and the area of the face. The array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options. More specifically, the array can be accessed by a dump local command to write a file containing all the Voronoi neighbors in a system:  

If the face_threshold keyword is used, then only faces with areas greater than the threshold are stored.  

The Voronoi calculation is performed by the freely available Voro $^{++}$ package, written by Chris Rycroft at UC Berkeley and LBL, which must be installed on your system when building LAMMPS for use with this compute. See instructions on obtaining and installing the $\mathrm{Voro++}$ software in the src/VORONOI/README file.  

# Note  

The calculation of Voronoi volumes is performed by each processor for the atoms it owns, and includes the effect of ghost atoms stored by the processor. This assumes that the Voronoi cells of owned atoms are not affected by atoms beyond the ghost atom cut-off distance. This is usually a good assumption for liquid and solid systems, but may lead to underestimation of Voronoi volumes in low density systems. By default, the set of ghost atoms stored by each processor is determined by the cutoff used for pair_style interactions. The cutoff can be set explicitly via the comm_modify cutoff command. The Voronoi cells for atoms adjacent to empty regions will extend into those regions up to the communication cutoff in $x,y$ , or z. In that situation, an exterior face is created at the cutoff distance normal to the $x,y$ , or $z$ direction. For triclinic systems, the exterior face is parallel to the corresponding reciprocal lattice vector.  

# Note  

The $\scriptstyle{\mathrm{Voro}}++$ package performs its calculation in 3d. This will still work for a 2d LAMMPS simulation, provided all the atoms have the same $z$ -coordinate. The Voronoi cell of each atom will be a columnar polyhedron with constant cross-sectional area along the $z$ -direction and two exterior faces at the top and bottom of the simulation box. If the atoms do not all have the same $z$ -coordinate, then the columnar cells will be accordingly distorted. The crosssectional area of each Voronoi cell can be obtained by dividing its volume by the z extent of the simulation box. Note that you define the $z$ extent of the simulation box for 2d simulations when using the create_box or read_data commands.  

# 3.173.4 Output info  

Deprecated since version 21Nov2023: The peratom keyword was removed as it is no longer required.  

This compute calculates a per-atom array with two columns. In regular dynamic tessellation mode the first column is the Voronoi volume, the second is the neighbor count, as described above (read above for the output data in case the occupation keyword is specified). These values can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

If the edge_histo keyword is used, then this compute generates a global vector of length maxedge $^{\cdot+1}$ , containing a histogram of the number of edges per face.  

If the neighbors value is set to yes, then this compute calculates a local array with three columns. There is one row fo each face of each Voronoi cell.  

The Voronoi cell volume will be in distance units cubed. The Voronoi face area will be in distance units squared.  

# 3.173.5 Restrictions  

This compute is part of the VORONOI package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

It also requires you have a copy of the $\mathrm{Voro++}$ library built and installed on your system. See instructions on obtaining and installing the $\mathrm{Voro++}$ software in the src/VORONOI/README file.  

# 3.173.6 Related commands  

dump custom, dump local  

# 3.173.7 Default  

The default for the neighbors keyword is no.  

# 3.174 compute xrd command  

# 3.174.1 Syntax  

compute ID group-ID xrd lambda type1 type2 ... typeN keyword value ...  

• ID, group-ID are documented in compute command   
• xrd $=$ style name of this compute command   
• lambda $=$ wavelength of incident radiation (length units)   
• type1 type2 . . . typeN $=$ chemical symbol of each atom type (see valid options below)   
• zero or more keyword/value pairs may be appended   
• keyword $=$ 2Theta or $c$ or $L P$ or manual or echo 2Theta value $\mathrm{s=Min2^{\circ}}$ Theta Max2Theta Min2Theta,Max2Theta $=$ minimum and maximum 2 theta range to explore (radians or degrees) c values = c1 c2 c3 c1,c2,c3 = parameters to adjust the spacing of the reciprocal lattice nodes in the h, $\mathrm{k\Omega}$ , and l directions respectively LP value = switch to apply Lorentz-polarization factor $0/1=\mathrm{off/on}$ manual = flag to use manual spacing of reciprocal lattice points based on the values of the c parameters echo = flag to provide extra output for debugging purposes  

# 3.174.2 Examples  

compute 1 all xrd 1.541838 Al O 2Theta 0.087 0.87 c 1 1 1 LP 1 echo compute 2 all xrd 1.541838 Al O 2Theta 10 100 c 0.05 0.05 0.05 LP 1 manual fix 1 all ave/histo/weight 1 1 1 0.087 0.87 250 c_1[1] c_1[2] mode vector file Rad2Theta.xrd fix 2 all ave/histo/weight 1 1 1 10 100 250 c_2[1] c_2[2] mode vector file Deg2Theta.xrd  

# 3.174.3 Description  

Define a computation that calculates $\mathrm{\DeltaX}$ -ray diffraction intensity as described in (Coleman) on a mesh of reciprocal lattice nodes defined by the entire simulation domain (or manually) using a simulated radiation of wavelength lambda.  

The X-ray diffraction intensity, $I$ , at each reciprocal lattice point, $k$ , is computed from the structure factor, $F$ , using the  

equations:  

$$
\begin{array}{c}{I=L_{P}(\theta)\displaystyle\frac{F^{*}F}{N}}\ {F(\mathbf{k})=\displaystyle\sum_{j=1}^{N}f_{j}(\theta)e x p(2\pi i\mathbf{k}\cdot\mathbf{r}_{j})}\ {L_{P}(\theta)=\displaystyle\frac{1+\cos^{2}(2\theta)}{\cos(\theta)\sin^{2}(\theta)}}\ {\displaystyle\frac{\sin(\theta)}{\lambda}=\displaystyle\frac{\|\mathbf{k}\|}{2}}\end{array}
$$  

Here, $\mathbf{k}$ is the location of the reciprocal lattice node, $r_{j}$ is the position of each atom, $f_{j}$ are atomic scattering factors, $L p$ is the Lorentz-polarization factor, and $\theta$ is the scattering angle of diffraction. The Lorentz-polarization factor can be turned off using the optional $L P$ keyword.  

Diffraction intensities are calculated on a three-dimensional mesh of reciprocal lattice nodes. The mesh spacing is defined either (a) by the entire simulation domain or (b) manually using selected values as shown in the 2D diagram below.  

![](images/e2342240989acbb2b0dbeb1d8c4f41862018b49b865ca8d78752fa1b1e5bfe99.jpg)  

For a mesh defined by the simulation domain, a rectilinear grid is constructed with spacing $c A^{-1}$ along each reciprocal lattice axis, where $A$ is a matrix containing the vectors corresponding to the edges of the simulation cell. If one or two directions has non-periodic boundary conditions, then the spacing in these directions is defined from the average of the (inversed) box lengths with periodic boundary conditions. Meshes defined by the simulation domain must contain at least one periodic boundary.  

If the manual flag is included, the mesh of reciprocal lattice nodes will be defined using the $c$ values for the spacing along each reciprocal lattice axis. Note that manual mapping of the reciprocal space mesh is good for comparing diffraction results from multiple simulations; however, it can reduce the likelihood that Bragg reflections will be satisfied unless small spacing parameters $(<0.05\mathrm{~\AA~}^{-1})$ ) are implemented. Meshes with manual spacing do not require a periodic boundary.  

The limits of the reciprocal lattice mesh are determined by range of scattering angles explored. The 2Theta parameter allows the user to reduce the scattering angle range to only the region of interest which reduces the cost of the computation.  

The atomic scattering factor, $f_{j}$ , accounts for the reduction in diffraction intensity due to Compton scattering. Compute xrd uses analytical approximations of the atomic scattering factors that vary for each atom type (type1 type2 . . . typeN) and angle of diffraction. The analytic approximation is computed using the formula (Colliex):  

$$
f_{j}\left(\frac{\sin(\theta)}{\lambda}\right)=\sum_{i=1}^{4}a_{i}\exp\left(-b_{i}\frac{\sin^{2}(\theta)}{\lambda^{2}}\right)+c
$$  

Coefficients parameterized by (Peng) are assigned for each atom type designating the chemical symbol and charge of each atom type. Valid chemical symbols for compute xrd are:  

<html><body><table><tr><td>H</td><td>He1-</td><td>He</td><td>Li</td><td>Lil+</td></tr><tr><td>Be</td><td>Be2+</td><td>B</td><td>C</td><td>Cval</td></tr><tr><td>N</td><td>0</td><td>01-</td><td>F</td><td>F1-</td></tr><tr><td>Ne</td><td>Na</td><td>Nal+</td><td>Mg</td><td>Mg2+</td></tr><tr><td>A1</td><td>A13+</td><td>Si</td><td>Sival</td><td>Si4+</td></tr><tr><td>P</td><td>S</td><td>C1</td><td>C11-</td><td>Ar</td></tr><tr><td>K</td><td>Ca</td><td>Ca2+</td><td>Sc</td><td>Sc3+</td></tr><tr><td>Ti</td><td>Ti2+</td><td>Ti3+</td><td>Ti4+</td><td>V</td></tr><tr><td>V2+</td><td>V3+</td><td>V5+</td><td>Cr</td><td>Cr2+</td></tr><tr><td>Cr3+</td><td>Mn</td><td>Mn2+</td><td>Mn3+</td><td>Mn4+</td></tr><tr><td>Fe</td><td>Fe2+</td><td>Fe3+</td><td>Co</td><td>Co2+</td></tr><tr><td>Co</td><td>Ni</td><td>Ni2+</td><td>Ni3+</td><td>Cu</td></tr><tr><td>Cul+</td><td>Cu2+</td><td>Zn</td><td>Zn2+</td><td>Ga</td></tr><tr><td>Ga3+</td><td>Ge</td><td>Ge4+</td><td>As</td><td>Se</td></tr><tr><td>Br</td><td>Brl-</td><td>Kr</td><td>Rb</td><td>Rb1+</td></tr><tr><td>Sr</td><td>Sr2+</td><td>Y</td><td>Y3+</td><td>Zr</td></tr><tr><td>Zr4+</td><td>Nb</td><td>Nb3+</td><td>Nb5+</td><td>Mo</td></tr><tr><td>Mo3+</td><td>Mo5+</td><td>Mo6+</td><td>Tc</td><td>Ru</td></tr><tr><td>Ru3+</td><td>Ru4+</td><td>Rh</td><td>Rh3+</td><td>Rh4+</td></tr><tr><td>Pd</td><td>Pd2+</td><td>Pd4+</td><td>Ag</td><td>Ag1+</td></tr><tr><td>Ag2+</td><td>Cd</td><td>Cd2+</td><td>In</td><td>In3+</td></tr><tr><td>Sn</td><td>Sn2+</td><td>Sn4+</td><td>Sb</td><td>Sb3+</td></tr><tr><td>Sb5+</td><td>Te</td><td>I</td><td>11-</td><td>Xe</td></tr><tr><td>Cs</td><td>Cs1+</td><td>Ba</td><td>Ba2+</td><td>La</td></tr><tr><td>La3+</td><td>Ce</td><td>Ce3+</td><td>Ce4+</td><td>Pr</td></tr><tr><td>Pr3+</td><td>Pr4+</td><td>PN</td><td>Nd3+</td><td>Pm</td></tr><tr><td>Pm3+</td><td>Sm</td><td>Sm3+</td><td>Eu</td><td>Eu2+</td></tr><tr><td>Eu3+</td><td>Gd</td><td>Gd3+</td><td>Tb</td><td>Tb3+</td></tr><tr><td>Dy</td><td>Dy3+</td><td>Ho</td><td>Ho3+</td><td>Er</td></tr><tr><td>Er3+</td><td>Tm</td><td>Tm3+</td><td>Yb</td><td>Yb2+</td></tr><tr><td>Yb3+</td><td>Lu</td><td>Lu3+</td><td>JH</td><td>Hf4+</td></tr><tr><td>Ta</td><td>Ta5+</td><td>W</td><td>W6+</td><td>Re</td></tr><tr><td>Os</td><td>Os4+</td><td>Ir</td><td>Ir3+</td><td>Ir4+</td></tr><tr><td>Pt</td><td>Pt2+</td><td>Pt4+</td><td>Au</td><td>Aul+</td></tr><tr><td>Au3+</td><td>Hg</td><td>Hg1+</td><td>Hg2+</td><td>T1</td></tr><tr><td>T11+</td><td>T13+</td><td>Pb</td><td>Pb2+</td><td>Pb4+</td></tr><tr><td>Bi</td><td>Bi3+</td><td>Bi5+</td><td>Po</td><td>At</td></tr><tr><td>Rn</td><td>Fr</td><td>Ra</td><td>Ra2+</td><td>Ac</td></tr><tr><td>Ac3+</td><td>Th</td><td>Th4+</td><td>Pa</td><td>U</td></tr><tr><td>U3+</td><td>U4+</td><td>U6+</td><td>Np</td><td>Np3+</td></tr><tr><td>Np4+</td><td>Np6+</td><td>Pu</td><td>Pu3+</td><td>Pu4+</td></tr><tr><td>Pu6+</td><td>Am</td><td>Cm</td><td>Bk</td><td>Cf</td></tr></table></body></html>  

If the echo keyword is specified, compute xrd will provide extra reporting information to the screen.  

# 3.174. compute xrd command  