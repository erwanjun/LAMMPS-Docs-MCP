---
title: "Granular Contact Models"
description: "Detailed granular pair_style with normal/tangential damping, rolling, twisting models"
category: "pair_style"
tags: ["granular", "DEM", "contact", "Hertz", "JKR", "damping", "friction"]
commands: ["pair_style granular", "pair_style gran/hooke", "pair_style gran/hertz/history"]
---
where $k_{n d}$ is the same stiffness defined in the above Tsuji model. For any other normal model, e.g. the hertz and hertz/material models, the damping coefficient is:  

$$
\eta_{n}=-2\sqrt{\frac{5}{6}}\frac{\log(e)}{\sqrt{\pi^{2}+(\log(e))^{2}}}\sqrt{\frac{3}{2}k_{n d}m_{e f f}},
$$  

Since coeff_restitution accounts for the effective mass, effective radius, and pairwise overlaps (except when used with the hooke normal model) when calculating the damping coefficient, it accurately reproduces the specified coefficient of restitution for both monodisperse and polydisperse particle pairs. This damping model is not compatible with cohesive normal models such as JKR or DMT.  

The total normal force is computed as the sum of the elastic and damping components:  

$$
{\bf F}_{n}={\bf F}_{n e}+{\bf F}_{n,d a m p}
$$  

The pair_coeff command also requires specification of the tangential contact model. The required keyword tangential is expected, followed by the model choice and associated parameters. Currently supported tangential model choices and their expected parameters are as follows:  

1. linear_nohistory : $x_{\gamma,t}$ , $\mu_{s}$   
2. linear_history : $k_{t},x_{\gamma,t}.$ , µs   
3. mindlin : $k_{t}$ or NULL, $x_{\gamma,t}$ , $\mu_{s}$   
4. mindlin/force : $k_{t}$ or NULL, $x_{\gamma,t}$ , $\mu_{s}$   
5. mindlin_rescale : $k_{t}$ or NULL, $x_{\gamma,t}$ , $\mu_{s}$   
6. mindlin_rescale/force : $k_{t}$ or NULL, $x_{\gamma,t},\mu_{s}$  

Here, $x_{\gamma,t}$ is a dimensionless multiplier for the normal damping $\eta_{n}$ that determines the magnitude of the tangential damping, $\mu_{t}$ is the tangential (or sliding) friction coefficient, and $k_{t}$ is the tangential stiffness coefficient.  

For tangential linear_nohistory, a simple velocity-dependent Coulomb friction criterion is used, which mimics the behavior of the pair gran/hooke style. The tangential force $\mathbf{F}_{t}$ is given by:  

$$
\mathbf{F}_{t}=-\operatorname*{min}(\mu_{t}F_{n0},\|\mathbf{F}_{\mathrm{t,damp}}\|)\mathbf{t}
$$  

The tangential damping force $\mathbf{F_{t,damp}}$ is given by:  

$$
{\bf F}_{\mathrm{t,damp}}=-\eta_{t}{\bf v}_{t,r e l}
$$  

The tangential damping prefactor $\eta_{t}$ is calculated by scaling the normal damping $\eta_{n}$ (see above):  

$$
\eta_{t}=-x_{\gamma,t}\eta_{n}
$$  

The normal damping prefactor $\eta_{n}$ is determined by the choice of the damping keyword, as discussed above. Thus, the damping keyword also affects the tangential damping. The parameter $x_{\gamma,t}$ is a scaling coefficient. Several works in the literature use $x_{\gamma,t}=1$ (Marshall, Tsuji et al, Silbert et al). The relative tangential velocity at the point of contact is given by $\mathbf{v}_{t,r e l}=\mathbf{v}_{t}-(R_{i}\Omega_{i}+R_{j}\Omega_{j})\times\mathbf{n}$ , where $\mathbf{v}_{t}=\mathbf{v}_{r}-\mathbf{v}_{r}\cdot\mathbf{n}\mathbf{n}$ , $\mathbf{v}_{r}=\mathbf{v}_{j}-\mathbf{v}_{i}$ . The direction of the applied force is $\mathbf{t}=\mathbf{v_{t,rel}}/\lVert\mathbf{v_{t,rel}}\rVert$ .  

The normal force value $F_{n0}$ used to compute the critical force depends on the form of the contact model. For noncohesive models (hertz, hertz/material, hooke), it is given by the magnitude of the normal force:  

$$
F_{n0}=\left|\left|\mathbf{F}_{n}\right|\right|
$$  

For cohesive models such as $j k r$ and dmt, the critical force is adjusted so that the critical tangential force approaches $\mu_{t}F_{p u l l o f f}$ , see Marshall, equation 43, and Thornton. For both models, $F_{n0}$ takes the form:  

$$
F_{n0}=\|\mathbf{F}_{n e}+2F_{p u l l o f f}\|
$$  

Where $F_{p u l l o f f}=3\pi\gamma R$ for $j k r$ , and $F_{p u l l o f f}=4\pi\gamma R$ for dmt.  

The remaining tangential options all use accumulated tangential displacement (i.e. contact history), except for the options mindlin/force and mindlin_rescale/force, that use accumulated tangential force instead, and are discussed further below. The accumulated tangential displacement is discussed in details below in the context of the linear_history option. The same treatment of the accumulated displacement applies to the other options as well.  

For tangential linear_history, the tangential force is given by:  

$$
\mathbf{F}_{t}=-\operatorname*{min}(\mu_{t}F_{n0},\parallel-k_{t}\xi+\mathbf{F}_{\mathrm{t,damp}}\parallel)\mathbf{t}
$$  

Here, $\xi$ is the tangential displacement accumulated during the entire duration of the contact:  

$$
\xi=\int_{t0}^{t}\mathbf{v}_{t,r e l}(\tau)\mathrm{d}\tau
$$  

This accumulated tangential displacement must be adjusted to account for changes in the frame of reference of the contacting pair of particles during contact. This occurs due to the overall motion of the contacting particles in a rigidbody-like fashion during the duration of the contact. There are two modes of motion that are relevant: the ‘tumbling’ rotation of the contacting pair, which changes the orientation of the plane in which tangential displacement occurs; and ‘spinning’ rotation of the contacting pair about the vector connecting their centers of mass (n). Corrections due to the former mode of motion are made by rotating the accumulated displacement into the plane that is tangential to the contact vector at each step, or equivalently removing any component of the tangential displacement that lies along $\mathbf{n}$ , and rescaling to preserve the magnitude. This follows the discussion in Luding, see equation 17 and relevant discussion in that work:  

$$
\boldsymbol{\xi}=\big(\xi^{\prime}-(\mathbf{n}\cdot\boldsymbol{\xi}^{\prime})\mathbf{n}\big)\frac{\lVert\xi^{\prime}\rVert}{\lVert\xi^{\prime}-(\mathbf{n}\cdot\boldsymbol{\xi}^{\prime})\mathbf{n}\rVert}
$$  

Here, $\xi^{\prime}$ is the accumulated displacement prior to the current time step and $\xi$ is the corrected displacement. Corrections to the displacement due to the second mode of motion described above (rotations about $\mathbf{n}$ ) are not currently implemented, but are expected to be minor for most simulations.  

Furthermore, when the tangential force exceeds the critical force, the tangential displacement is re-scaled to match the value for the critical force (see Luding, equation 20 and related discussion):  

$$
{\boldsymbol\xi}=-\frac{1}{k_{t}}\left(\mu_{t}F_{n0}\mathbf{t}-\mathbf{F}_{t,d a m p}\right)
$$  

The tangential force is added to the total normal force (elastic plus damping) to produce the total force on the particle. The tangential force also acts at the contact point (defined as the center of the overlap region) to induce a torque on each particle according to:  

$$
\begin{array}{l}{{\displaystyle\tau_{i}=-(R_{i}-0.5\delta){\bf n}\times{\bf F}_{t}}}\ {{\mathrm{~}}}\ {{\displaystyle\tau_{j}=-(R_{j}-0.5\delta){\bf n}\times{\bf F}_{t}}}\end{array}
$$  

For tangential mindlin, the Mindlin no-slip solution is used which differs from the linear_history option by an additional factor of $a$ , the radius of the contact region. The tangential force is given by:  

$$
\mathbf{F}_{t}=-\operatorname*{min}(\mu_{t}F_{n0},\parallel-k_{t}a\xi+\mathbf{F}_{\mathrm{t,damp}}\parallel)\mathbf{t}
$$  

Here, $a$ is the radius of the contact region, given by $a={\sqrt{R\delta}}$ for all normal contact models, except for $j k r_{\mathrm{:}}$ , where it is given implicitly by $\delta=a^{2}/R-2\sqrt{\pi\gamma a/E}$ , see discussion above. To match the Mindlin solution, one should set $k_{t}=8G_{e f f}$ , where $G_{e f f}$ is the effective shear modulus given by:  

$$
G_{e f f}=\left(\frac{2-\nu_{i}}{G_{i}}+\frac{2-\nu_{j}}{G_{j}}\right)^{-1}
$$  

where $G_{i}$ is the shear modulus of a particle of type $i$ , related to Young’s modulus $E_{i}$ and Poisson’s ratio $\nu_{i}$ by $G_{i}= $ $E_{i}/(2(1+\nu_{i}))$ . This can also be achieved by specifying NULL for $k_{t}$ , in which case a normal contact model that specifies material parameters $E_{i}$ and $\nu_{i}$ is required (e.g. hertz/material, dmt or $j k r$ ). In this case, mixing of the shear modulus for different particle types $i$ and $j$ is done according to the formula above.  

![](images/b67a6270499a46da641cf21545a2cb5d61ac7f61ee8e65ac74d316c61549207e.jpg)  

# Note  

The radius of the contact region $a$ depends on the normal overlap. As a result, the tangential force for mindlin can change due to a variation in normal overlap, even with no change in tangential displacement.  

For tangential mindlin/force, the accumulated elastic tangential force characterizes the contact history, instead of the accumulated tangential displacement. This prevents the dependence of the tangential force on the normal overlap as noted above. The tangential force is given by:  

$$
\mathbf{F}_{t}=-\operatorname*{min}(\mu_{t}F_{n0},\lVert\mathbf{F}_{t e}+\mathbf{F}_{\mathrm{t,damp}}\rVert)\mathbf{t}
$$  

The increment of the elastic component of the tangential force $\mathbf{F}_{t e}$ is given by:  

$$
\mathrm{d}\mathbf{F}_{t e}=-k_{t}a\mathbf{v}_{t,r e l}\mathrm{d}\tau
$$  

The changes in frame of reference of the contacting pair of particles during contact are accounted for by the same formula as above, replacing the accumulated tangential displacement $\xi$ , by the accumulated tangential elastic force $F_{t e}$ . When the tangential force exceeds the critical force, the tangential force is directly re-scaled to match the value for the critical force:  

$$
\mathbf{F}_{t e}=-\mu_{t}F_{n0}\mathbf{t}+\mathbf{F}_{t,d a m p}
$$  

The same rules as those described for mindlin apply regarding the tangential stiffness and mixing of the shear modulus for different particle types.  

The mindlin_rescale option uses the same form as mindlin, but the magnitude of the tangential displacement is re-scaled as the contact unloads, i.e. if a < atn 1 :  

$$
\xi=\xi_{{\bf t}_{\mathrm{n-1}}}\frac{a}{a_{t_{n-1}}}
$$  

Here, $t_{n-1}$ indicates the value at the previous time step. This rescaling accounts for the fact that a decrease in the contact area upon unloading leads to the contact being unable to support the previous tangential loading, and spurious energy is created without the rescaling above (Walton ).  

# Note  

For mindlin, a decrease in the tangential force already occurs as the contact unloads, due to the dependence of the tangential force on the normal force described above. By re-scaling $\xi$ , mindlin_rescale effectively re-scales the tangential force twice, i.e., proportionally to $a^{2}$ . This peculiar behavior results from use of the accumulated tangential displacement to characterize the contact history. Although mindlin_rescale remains available for historic reasons and backward compatibility purposes, it should be avoided in favor of mindlin_rescale/force.  

The mindlin_rescale/force option uses the same form as mindlin/force, but the magnitude of the tangential elastic force is re-scaled as the contact unloads, i.e. if $a<a_{t_{n-1}}$ :  

$$
{\bf F}_{t e}={\bf F}_{t e,t_{n-1}}\frac{a}{a_{t_{n-1}}}
$$  

This approach provides a better approximation of the Mindlin-Deresiewicz laws and is more consistent than mindlin_rescale. See discussions in Thornton et al, 2013, particularly equation 18(b) of that work and associated discussion, and Agnolin and Roux, 2007, particularly Appendix A.  

The optional rolling keyword enables rolling friction, which resists pure rolling motion of particles. The options currently supported are:  

1. none   
2. sds : kroll , γroll , µroll  

If the rolling keyword is not specified, the model defaults to none.  

For rolling sds, rolling friction is computed via a spring-dashpot-slider, using a ‘pseudo-force’ formulation, as detailed by Luding. Unlike the formulation in Marshall, this allows for the required adjustment of rolling displacement due to changes in the frame of reference of the contacting pair. The rolling pseudo-force is computed analogously to the tangential force:  

$$
\mathbf{F}_{r o l l,0}=k_{r o l l}\xi_{r o l l}-\gamma_{r o l l}\mathbf{v}_{r o l l}
$$  

Here, $\mathbf{v}_{r o l l}=-R(\Omega_{i}-\Omega_{j})\times\mathbf{n}$ is the relative rolling velocity, as given in Wang et al and Luding. This differs from the expressions given by Kuhn and Bagi and used in Marshall; see Wang et al for details. The rolling displacement is given by:  

$$
\xi_{r o l l}=\int_{t_{0}}^{t}\mathbf{v}_{r o l l}(\tau)\mathrm{d}\tau
$$  

A Coulomb friction criterion truncates the rolling pseudo-force if it exceeds a critical value:  

$$
\mathbf{F}_{r o l l}=\operatorname*{min}(\mu_{r o l l}F_{n,0},\|\mathbf{F}_{r o l l,0}\|)\mathbf{k}
$$  

Here, $\mathbf{k}=\mathbf{v}_{r o l l}/\left\|\mathbf{v}_{r o l l}\right\|$ is the direction of the pseudo-force. As with tangential displacement, the rolling displacement is rescaled when the critical force is exceeded, so that the spring length corresponds the critical force. Additionally, the displacement is adjusted to account for rotations of the frame of reference of the two contacting particles in a manner analogous to the tangential displacement.  

The rolling pseudo-force does not contribute to the total force on either particle (hence ‘pseudo’), but acts only to induce an equal and opposite torque on each particle, according to:  

$$
{\tau_{r o l l,i}}=R\mathbf{n}\times\mathbf{F}_{r o l l}
$$  

$$
\tau_{r o l l,j}=-\tau_{r o l l,i}
$$  

The optional twisting keyword enables twisting friction, which resists rotation of two contacting particles about the vector n that connects their centers. The options currently supported are:  

1. none   
2. sds : ktwist , γtwist , µtwist   
3. marshall  

# 4.123. pair_style granular command  

If the twisting keyword is not specified, the model defaults to none.  

For both twisting sds and twisting marshall, a history-dependent spring-dashpot-slider is used to compute the twisting torque. Because twisting displacement is a scalar, there is no need to adjust for changes in the frame of reference due to rotations of the particle pair. The formulation in Marshall therefore provides the most straightforward treatment:  

$$
\tau_{t w i s t,0}=-k_{t w i s t}\xi_{t w i s t}-\gamma_{t w i s t}\Omega_{t w i s t}
$$  

Here $\begin{array}{r}{\xi_{t w i s t}=\int_{t_{0}}^{t}\Omega_{t w i s t}(\tau)\mathrm{d}\tau}\end{array}$ is the twisting angular displacement, and $\Omega_{t w i s t}=(\pmb{\mathrm{\mathbf{\equiv}}}_{i}-\pmb{\mathrm{\mathbf{\equiv}}}_{j})\cdot\pmb{\mathrm{\mathbf{n}}}$ is the relative twisting angular velocity. The torque is then truncated according to:  

$$
\tau_{t w i s t}=\operatorname*{min}(\mu_{t w i s t}F_{n,0},\tau_{t w i s t,0})
$$  

Similar to the sliding and rolling displacement, the angular displacement is rescaled so that it corresponds to the critical value if the twisting torque exceeds this critical value:  

$$
\xi_{t w i s t}=\frac{1}{k_{t w i s t}}(\mu_{t w i s t}F_{n,0}s g n(\Omega_{t w i s t})-\gamma_{t w i s t}\Omega_{t w i s t})
$$  

For twisting sds, the coefficients $k_{t w i s t},\gamma_{t w i s t}$ and $\mu_{t w i s t}$ are simply the user input parameters that follow the twisting sds keywords in the pair_coeff command.  

For twisting_marshall, the coefficients are expressed in terms of sliding friction coefficients, as discussed in Marshall (see equations 32 and 33 of that work):  

$$
\begin{array}{c}{{k_{t w i s t}=0.5k_{t}a^{2}}}\ {{{}}}\ {{\eta_{t w i s t}=0.5\eta_{t}a^{2}}}\ {{{}}}\ {{\mu_{t w i s t}=\displaystyle\frac{2}{3}a\mu_{t}}}\end{array}
$$  

Finally, the twisting torque on each particle is given by:  

$$
\tau_{t w i s t,i}=\tau_{t w i s t}{\bf n}
$$  

$$
\tau_{t w i s t,j}=-\tau_{t w i s t,i}
$$  

If two particles are moving away from each other while in contact, there is a possibility that the particles could experience an effective attractive force due to damping. If the optional limit_damping keyword is used, this option will zero out the normal component of the force if there is an effective attractive force. This keyword cannot be used with the JKR or DMT models.  

The optional heat keyword enables heat conduction. The options currently supported are:  

1. none   
2. radius : $k_{s}$   
3. area : $h_{s}$  

If the heat keyword is not specified, the model defaults to none. All heat models calculate an additional pairwise quantity accessible by the single() function (described below) which is the heat conducted between the two particles.  

For heat radius, the heat $Q$ conducted between two particles is given by  

$$
Q=2k_{s}a\Delta T
$$  

where $\Delta T$ is the difference in the two particles’ temperature, $k_{s}$ is a non-negative numeric value for the conductivity (in units of power/(length\*temperature)), and $a$ is the radius of the contact and depends on the normal force model. This is the model proposed by Vargas and McCarthy.  

For heat area, the heat $Q$ conducted between two particles is given by  

$$
Q=h_{s}A\Delta T
$$  

where $\Delta T$ is the difference in the two particles’ temperature, $h_{s}$ is a non-negative numeric value for the heat transfer coefficient (in units of power/(area\*temperature)), and $A=\pi a^{2}$ is the area of the contact and depends on the normal force model.  

Note that the option none must either be used in all or none of of the pair_coeff calls. See fix heat/flow and fix property/atom for more information on this option.  

The granular pair style can reproduce the behavior of the pair gran/\* styles with the appropriate settings (some very minor differences can be expected due to corrections in displacement history frame-of-reference, and the application of the torque at the center of the contact rather than at each particle). The first example above is equivalent to pair gran/hooke 1000.0 NULL 50.0 50.0 0.4 1. The second example is equivalent to pair gran/hooke/history 1000.0 500.0 50.0 50.0 0.4 1. The third example is equivalent to pair gran/hertz/history 1000.0 500.0 50.0 50.0 0.4 1 limit_damping.  

LAMMPS automatically sets pairwise cutoff values for pair_style granular based on particle radii (and in the case of jkr pull-off distances). In the vast majority of situations, this is adequate. However, a cutoff value can optionally be appended to the pair_style granular command to specify a global cutoff (i.e. a cutoff for all atom types). Additionally, the optional cutoff keyword can be passed to the pair_coeff command, followed by a cutoff value. This will set a pairwise cutoff for the atom types in the pair_coeff command. These options may be useful in some rare cases where the automatic cutoff determination is not sufficient, e.g. if particle diameters are being modified via the fix adapt command. In that case, the global cutoff specified as part of the pair_style granular command is applied to all atom types, unless it is overridden for a given atom type combination by the cutoff value specified in the pair coeff command. If cutoff is only specified in the pair coeff command and no global cutoff is appended to the pair_style granular command, then LAMMPS will use that cutoff for the specified atom type combination, and automatically set pairwise cutoffs for the remaining atom types.  

# 4.123.4 Mixing, shift, table, tail correction, restart, rRESPA info  

The pair_modify mix, shift, table, and tail options are not relevant for granular pair styles.  

Mixing of coefficients is carried out using geometric averaging for most quantities, e.g. if friction coefficient for type 1-type 1 interactions is set to $\mu_{1}$ , and friction coefficient for type 2-type 2 interactions is set to $\mu_{2}$ , the friction coefficient for type1-type2 interactions is computed as $\sqrt{\mu_{1}\mu_{2}}$ (unless explicitly specified to a different value by a pair_coeff 1 2 . . . command). The exception to this is elastic modulus, only applicable to hertz/material, dmt and $j k r$ normal contact models. In that case, the effective elastic modulus is computed as:  

$$
E_{e f f,i j}=\left(\frac{1-\nu_{i}^{2}}{E_{i}}+\frac{1-\nu_{j}^{2}}{E_{j}}\right)^{-1}
$$  

If the $i{-}j$ coefficients $E_{i j}$ and $\nu_{i j}$ are explicitly specified, the effective modulus is computed as:  

$$
E_{e f f,i j}=\left(\frac{1-\nu_{i j}^{2}}{E_{i j}}+\frac{1-\nu_{i j}^{2}}{E_{i j}}\right)^{-1}
$$  

or  

$$
E_{e f f,i j}=\frac{E_{i j}}{2(1-\nu_{i j}^{2})}
$$  

These pair styles write their information to binary restart files, so a pair_style command does not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

The single() function of these pair styles returns 0.0 for the energy of a pairwise interaction, since energy is not conserved in these dissipative potentials. It also returns only the normal component of the pairwise interaction force. However, the single() function also calculates at least 13 extra pairwise quantities. The first 3 are the components of the tangential force between particles I and J, acting on particle I. The fourth is the magnitude of this tangential force. The next 3 (5-7) are the components of the rolling torque acting on particle I. The next entry (8) is the magnitude of the rolling torque. The next entry (9) is the magnitude of the twisting torque acting about the vector connecting the two particle centers. The next 3 (10-12) are the components of the vector connecting the centers of the two particles $(\mathbf{x}\_\mathbf{I}-\mathbf{x}\_\mathbf{J})$ . If a granular sub-model calculates additional contact information (e.g. the heat sub-models calculate the amount of heat exchanged), these quantities are appended to the end of this list. First, any extra values from the normal sub-model are appended followed by the damping, tangential, rolling, twisting, then heat models. See the descriptions of specific granular sub-models above for information on any extra quantities. If two or more models are defined by pair coefficients, the size of the array is set by the maximum number of extra quantities in a model but the order of quantities is determined by each model’s specific set of sub-models. Any unused quantities are zeroed.  

These extra quantities can be accessed by the compute pair/local command, as $p l,p2,...,p l2$ .  

# 4.123.5 Restrictions  

This pair style is part of the GRANULAR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires that atoms store per-particle radius, torque, and angular velocity (omega) as defined by the atom_style sphere.  

This pair style requires you to use the comm_modify vel yes command so that velocities are stored by ghost atoms.  

This pair style will not restart exactly when using the read_restart command, though it should provide statistically similar results. This is because the forces it computes depend on atom velocities and the atom velocities have been propagated half a timestep between the force computation and when the restart is written, due to using Velocity Verlet time integration. See the read_restart command for more details.  

Accumulated values for individual contacts are saved to restart files but are not saved to data files. Therefore, forces may differ significantly when a system is reloaded using the read_data command.  

# 4.123.6 Related commands  

pair_coeff pair gran/\*  

# 4.123.7 Default  

For the pair_coeff settings: damping viscoelastic, rolling none, twisting none.  

# 4.123.8 References  

(Brilliantov et al, 1996) Brilliantov, N. V., Spahn, F., Hertzsch, J. M., & Poschel, T. (1996). Model for collisions in granular gases. Physical review E, 53(5), 5382.   
(Tsuji et al, 1992) Tsuji, Y., Tanaka, T., & Ishida, T. (1992). Lagrangian numerical simulation of plug flow of cohesionless particles in a horizontal pipe. Powder technology, 71(3), 239-250.   
(Johnson et al, 1971) Johnson, K. L., Kendall, K., & Roberts, A. D. (1971). Surface energy and the contact of elastic solids. Proc. R. Soc. Lond. A, 324(1558), 301-313.   
(Derjaguin et al, 1975) Derjaguin, B. V., Muller, V. M., & Toporov, Y. P. (1975). Effect of contact deformations on the adhesion of particles. Journal of Colloid and interface science, 53(2), 314-326.   
(Zunker and Kamrin, 2024) Zunker, W., & Kamrin, K. (2024). A mechanically-derived contact model for adhesive elastic-perfectly plastic particles, Part I: Utilizing the method of dimensionality reduction. Journal of the Mechanics and Physics of Solids, 183, 105492.   
(Zunker and Kamrin, 2024) Zunker, W., & Kamrin, K. (2024). A mechanically-derived contact model for adhesive elastic-perfectly plastic particles, Part II: Contact under high compaction-modeling a bulk elastic response. Journal of the Mechanics and Physics of Solids, 183, 105493.   
(Zunker et al, 2025) Zunker, W., Dunatunga, S., Thakur, S., Tang, P., & Kamrin, K. (2025). Experimentally validated DEM for large deformation powder compaction: mechanically-derived contact model and screening of non-physical contacts.   
(Luding, 2008) Luding, S. (2008). Cohesive, frictional powders: contact models for tension. Granular matter, 10(4), 235.   
(Marshall, 2009) Marshall, J. S. (2009). Discrete-element modeling of particulate aerosol flows. Journal of Computational Physics, 228(5), 1541-1561.   
(Silbert, 2001) Silbert, L. E., Ertas, D., Grest, G. S., Halsey, T. C., Levine, D., & Plimpton, S. J. (2001). Granular flow down an inclined plane: Bagnold scaling and rheology. Physical Review E, 64(5), 051302.   
(Kuhn and Bagi, 2005) Kuhn, M. R., & Bagi, K. (2004). Contact rolling and deformation in granular media. International journal of solids and structures, 41(21), 5793-5820.   
(Wang et al, 2015) Wang, Y., Alonso-Marroquin, F., & Guo, W. W. (2015). Rolling and sliding in 3-D discrete element models. Particuology, 23, 49-55.   
(Thornton, 1991) Thornton, C. (1991). Interparticle sliding in the presence of adhesion. J. Phys. D: Appl. Phys. 24 1942   
(Mindlin, 1949) Mindlin, R. D. (1949). Compliance of elastic bodies in contact. J. Appl. Mech., ASME 16, 259-268. (Thornton et al, 2013) Thornton, C., Cummins, S. J., & Cleary, P. W. (2013). An investigation of the comparative behavior of alternative contact force models during inelastic collisions. Powder Technology, 233, 30-46.   
(Otis R. Walton) Walton, O.R., Personal Communication   
(Mindlin and Deresiewicz, 1953) Mindlin, R.D., & Deresiewicz, H (1953). Elastic Spheres in Contact under Varying Oblique Force. J. Appl. Mech., ASME 20, 327-344.   
(Agnolin and Roux 2007) Agnolin, I. & Roux, J-N. (2007). Internal states of model isotropic granular packings. I. Assembling process, geometry, and contact networks. Phys. Rev. E, 76, 061302.   
(Vargas and McCarthy 2001) Vargas, W.L. and McCarthy, J.J. (2001). Heat conduction in granular materials. AIChE Journal, 47(5), 1052-1059.  

# 4.124 pair_style lj/gromacs command  

Accelerator Variants: lj/gromacs/gpu, lj/gromacs/kk, lj/gromacs/omp  

# 4.125 pair_style lj/gromacs/coul/gromacs command  

Accelerator Variants: lj/gromacs/coul/gromacs/kk, lj/gromacs/coul/gromacs/omp  

# 4.125.1 Syntax  

• style $=$ lj/gromacs or lj/gromacs/coul/gromacs • args $=$ list of arguments for a particular style  

lj/gromacs args $=$ inner outer inner, outer $=$ global switching cutoffs for Lennard Jones   
lj/gromacs/coul/gromacs args $=$ inner outer (inner2) (outer2) inner, outer $=$ global switching cutoffs for Lennard Jones (and Coulombic if only 2 args) inner2, oute $\mathrm{r2}=\mathrm{gl}(\mathrm{\Omega}$ obal switching cutoffs for Coulombic (optional)  

# 4.125.2 Examples  

pair_style lj/gromacs 9.0 12.0  
pair_coeff \* \* 100.0 2.0  
pair_coeff 2 2 100.0 2.0 8.0 10.0  
pair_style lj/gromacs/coul/gromacs 9.0 12.0  
pair_style lj/gromacs/coul/gromacs 8.0 10.0 7.0 9.0  
pair_coeff \* \* 100.0 2.0  

# 4.125.3 Description  

The lj/gromacs styles compute shifted LJ and Coulombic interactions with an additional switching function $\mathrm{S}(\mathrm{r})$ that ramps the energy and force smoothly to zero between an inner and outer cutoff. It is a commonly used potential in the GROMACS MD code and for the coarse-grained models of (Marrink).  

$$
\begin{array}{l}{{E_{L J}=4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12}-\left(\frac{\sigma}{r}\right)^{6}\right]+S_{L J}(r)~r<r_{c}}}\ {{}}\ {{}}\ {{{\cal E}_{c}=\displaystyle\frac{C_{q}q_{j}}{\varepsilon r}~+S_{c}(r)~r<r_{c}}}\ {{}}\ {{{\cal S}(r)=C~r<r_{1}~}}\ {{}}\ {{{\cal S}(r)=\frac{A}{3}(r-r_{1})^{3}+\frac{B}{4}(r-r_{1})^{4}+C~r_{1}<r<r_{c}}}\ {{}}\ {{}}\ {{{\cal A}=(-3E^{\prime}(r_{c})+(r_{c}-r_{1})E^{\prime\prime}(r_{c}))/(r_{c}-r_{1})^{2}}}\ {{}}\ {{{\cal B}=(2E^{\prime}(r_{c})-(r_{c}-r_{1})E^{\prime\prime}(r_{c}))/(r_{c}-r_{1})^{3}}}\ {{}}\ {{{\cal C}=-E(r_{c})+\frac{1}{2}(r_{c}-r_{1})E^{\prime}(r_{c})-\frac{1}{12}(r_{c}-r_{1})^{2}E^{\prime\prime}(r_{c})}}\end{array}
$$  

$r_{1}$ is the inner cutoff; $r_{c}$ is the outer cutoff. The coefficients A, B, and $\mathrm{^C}$ are computed by LAMMPS to perform the shifting and smoothing. The function S(r) is actually applied once to each term of the LJ formula and once to the Coulombic formula, so there are 2 or 3 sets of A,B,C coefficients depending on which pair_style is used. The boundary conditions applied to the smoothing function are as follows: $S^{\prime}(r_{1})=S^{\prime\prime}(r_{1})=0,S(r_{c})=-E(r_{c}),S^{\prime}(r_{c})=-E^{\prime}(r_{c})$ , and $S^{\prime\prime}(r_{c})=-E^{\prime\prime}(r_{c})$ , where E(r) is the corresponding term in the LJ or Coulombic potential energy function. Single and double primes denote first and second derivatives with respect to r, respectively.  

The inner and outer cutoff for the LJ and Coulombic terms can be the same or different depending on whether 2 or 4 arguments are used in the pair_style command. The inner LJ cutoff must be $>0$ , but the inner Coulombic cutoff can be $>=0$ .  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • inner (distance units) • outer (distance units)  

Note that sigma is defined in the LJ formula as the zero-crossing distance for the potential, not as the energy minimum at $2^{1/6}\sigma$ .  

The last 2 coefficients are optional inner and outer cutoffs for style lj/gromacs. If not specified, the global inner and outer values are used.  

The last 2 coefficients cannot be used with style lj/gromacs/coul/gromacs because this force field does not allow varying cutoffs for individual atom pairs; all pairs use the global cutoff(s) specified in the pair_style command.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.125.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of the lj/cut pair styles can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

None of the GROMACS pair styles support the pair_modify shift option, since the Lennard-Jones portion of the pair interaction is already smoothed to 0.0 at the cutoff.  

The pair_modify table option is not relevant for this pair style.  

None of the GROMACS pair styles support the pair_modify tail option for adding long-range tail corrections to energy and pressure, since there are no corrections for a potential that goes to 0.0 at the cutoff.  

All of the GROMACS pair styles write their information to binary restart files, so pair_style and pair_coeff command do not need to be specified in an input script that reads a restart file.  

All of the GROMACS pair styles can only be used via the pair keyword of the run_style respa command. They do no support the inner, middle, outer keywords.  

# 4.125.5 Restrictions  

This pair style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.125.6 Related commands  

pair_coeff  

# 4.125.7 Default  

none  

(Marrink) Marrink, de Vries, Mark, J Phys Chem B, 108, 750-760 (2004).  

4.126 pair_style gw command  

# 4.127 pair_style gw/zbl command  

# 4.127.1 Syntax  

• style = gw or gw/zbl  

# 4.127.2 Examples  

pair_style gw   
pair_coeff \* \* SiC.gw Si C C pair_style gw/zbl   
pair_coeff \* \* SiC.gw.zbl C Si  

# 4.127.3 Description  

The gw style computes a 3-body Gao-Weber potential; similarly gw/zbl combines this potential with a modified repulsive ZBL core function in a similar fashion as implemented in the tersoff/zbl pair style.  

Unfortunately the author of this contributed code has not been able to submit a suitable documentation explaining the details of the potentials. The LAMMPS developers thus have finally decided to release the code anyway with only the technical explanations. For details of the model and the parameters, please refer to the linked publication.  

Only a single pair_coeff command is used with the gw and gw/zbl styles which specifies a Gao-Weber potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of GW elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine a file SiC.gw has Gao-Weber values for Si and C. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Si, and the fourth to be C, you would use the following pair_coeff command:  

pair_coeff \* \* SiC.gw Si Si Si C  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first three Si arguments map LAMMPS atom types 1,2,3 to the Si element in the GW file. The final C argument maps LAMMPS atom type 4 to the C element in the GW file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a $g w$ potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

Gao-Weber files in the potentials directory of the LAMMPS distribution have a “.gw” suffix. Gao-Weber with ZBL files have a “.gz.zbl” suffix. The structure of the potential files is similar to other many-body potentials supported by LAMMPS. You have to refer to the comments in the files and the literature to learn more details.  

# 4.127.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS as described above from values in the potential file.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.127.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

The Gao-Weber potential files provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use the GW potential with any LAMMPS units, but you would need to create your own GW potential file with coefficients listed in the appropriate units if your simulation does not use “metal” units.  

# 4.127.6 Related commands  

pair_coeff  

# 4.127.7 Default  

none  

(Gao) Gao and Weber, Nuclear Instruments and Methods in Physics Research B 191 (2012) 504.  

# 4.128 pair_style harmonic/cut command  

Accelerator Variants: harmonic/cut/omp  

# 4.128.1 Syntax  

• style $=$ harmonic/cut  

# 4.128.2 Examples  

pair_style harmonic/cut pair_coeff \* \* 0.2 2.0 pair_coeff 1 1 0.5 2.5  

# 4.128.3 Description  

Added in version 17Feb2022.  

Style harmonic/cut computes pairwise repulsive-only harmonic interactions with the formula  

$$
E=k(r_{c}-r)^{2}\qquadr<r_{c}
$$  

where $r_{c}$ is the cutoff. Note that the usual 1/2 factor is included in $k$ .  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• $k$ (energy/distance^2 units) • $r_{c}$ (distance units)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.128.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the $k$ and $r_{c}$ coefficients can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

Since the potential is zero at and beyond the cutoff parameter by construction, there is no need to support the pair_modify shift or tail options for the energy and pressure of the pair interaction.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.128.5 Restrictions  

The harmonic/cut pair style is only enabled if LAMMPS was built with the EXTRA-PAIR package. See the Build package page for more info.  

# 4.128.6 Related commands  

pair_coeff  

# 4.128.7 Default  

none  

# 4.129 pair_style hbond/dreiding/lj command  

Accelerator Variants: hbond/dreiding/lj/omp  

4.130 pair_style hbond/dreiding/lj/angleoffset command  

Accelerator Variants: hbond/dreiding/lj/angleoffset/omp  

# 4.131 pair_style hbond/dreiding/morse command  

Accelerator Variants: hbond/dreiding/morse/omp  

4.132 pair_style hbond/dreiding/morse/angleoffset command  

Accelerator Variants: hbond/dreiding/morse/angleoffset/omp  

# 4.132.1 Syntax  

pair_style style N inner_distance_cutoff outer_distance_cutoff angle_cutoff equilibrium_angle  

• style $=$ hbond/dreiding/lj or hbond/dreiding/morse or hbond/dreiding/lj/angleoffset or   
hbond/dreiding/morse/angleoffset   
• $\Nu=$ power of cosine of angle theta (integer)   
• inner_distance_cutoff $=$ global inner cutoff for Donor-Acceptor interactions (distance units)   
• outer_distance_cutoff $=$ global cutoff for Donor-Acceptor interactions (distance units)   
• angle_cutoff $=$ global angle cutoff for Acceptor-Hydrogen-Donor interactions (degrees)   
• (with style angleoffset) equilibrium_angle $=$ global equilibrium angle for Acceptor-Hydrogen-Donor interactions (degrees)  

# 4.132.2 Examples  

pair_style hybrid/overlay lj/cut 10.0 hbond/dreiding/lj 4 9.0 11.0 90.0   
pair_coeff 1 2 hbond/dreiding/lj 3 i 9.5 2.75 4 9.0 11.0 90.0   
pair_style hybrid/overlay lj/cut 10.0 hbond/dreiding/morse 2 9.0 11.0 90.0   
pair_coeff 1 2 hbond/dreiding/morse 3 i 3.88 1.7241379 2.9 2 9.0 11.0 90.0   
labelmap atom 1 C 2 O 3 H   
pair_coeff C O hbond/dreiding/morse H i 3.88 1.7241379 2.9 2 9.0 11.0 90.0   
pair_style hybrid/overlay lj/cut 10.0 hbond/dreiding/lj 4 9.0 11.0 90 170.0   
pair_coeff 1 2 hbond/dreiding/lj 3 i 9.5 2.75 4 9.0 11.0 90.0  

# 4.132.3 Description  

The hbond/dreiding styles compute the Acceptor-Hydrogen-Donor (AHD) 3-body hydrogen bond interaction for the DREIDING force field, given by:  

$$
\begin{array}{c}{{E=\left[L J(r)|M o r s e(r)\right]}}\ {{\quad\quad\quad\quad=S(r)*\left[L J(r)|M o r s e(r)\right]}}\ {{\quad\quad\quad=0}}\ {{\quad\quad\quad=0}}\ {{L J(r)=A R^{-12}-B R^{-10}c o s^{n}\theta=\varepsilon\left\{5\left[\frac{\sigma}{r}\right]^{1/2}-6\left[\frac{\sigma}{r}\right]^{10}\right\}c o s^{n}\theta}}\ {{\quad\quad\quad\quad}}\ {{M o r s e(r)=D_{0}\left\{\chi^{2}-2\chi\right\}c o s^{n}\theta=D_{0}\left\{e^{-2\alpha(r-r_{0})}-2e^{-\alpha(r-r_{0})}\right\}c o s^{n}\theta}}\ {{\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad}}\end{array}
$$  

where $r_{\mathrm{in}}$ is the inner spline distance cutoff, $r_{\mathrm{out}}$ is the outer distance cutoff, $\theta_{c}$ is the angle cutoff, and $n$ is the power of the cosine of the angle $\theta$ .  

Here, $r$ is the radial distance between the donor $(\mathrm{D})$ and acceptor (A) atoms and $\theta$ is the bond angle between the acceptor, the hydrogen $(\mathrm{H})$ and the donor atoms:  

![](images/d78d2ddccd1381087c73bc71a769e74511d074f05811e6c0815b046e8796eb3f.jpg)  

These 3-body interactions can be defined for pairs of acceptor and donor atoms, based on atom types. For each donor/acceptor atom pair, the third atom in the interaction is a hydrogen permanently bonded to the donor atom, e.g. in a bond list read in from a data file via the read_data command. The atom types of possible hydrogen atoms for each donor/acceptor type pair are specified by the pair_coeff command (see below).  

Style hbond/dreiding/lj is the original DREIDING potential of (Mayo). It uses a LJ 12/10 functional for the DonorAcceptor interactions. To match the results in the original paper, use $\mathrm{n}=4$ .  

Style hbond/dreiding/morse is an improved version using a Morse potential for the Donor-Acceptor interactions. (Liu) showed that the Morse form gives improved results for Dendrimer simulations, when $\mathfrak{n}=2$ .  

Added in version 4Feb2025.  

The style variants hbond/dreiding/lj/angleoffset and hbond/dreiding/lj/angleoffset take the equilibrium angle of the AHD as input, allowing it to reach 180 degrees. This variant option was added to account for cases (especially in some coarse-grained models) in which the equilibrium state of the bonds may equal the minimum energy state.  

See the Howto bioFF page for more information on the DREIDING force field.  

![](images/1d609e5e283e19681323837a2827eea8bb13beca2c843effe8b3842f3ac38e3a.jpg)  

# Note  

Because the Dreiding hydrogen bond potential is only one portion of an overall force field which typically includes other pairwise interactions, it is common to use it as a sub-style in a pair_style hybrid/overlay command, where another pair style provides the repulsive core interaction between pairs of atoms, e.g. a $1/\mathrm{r}^{\wedge}12$ Lennard-Jones repulsion.  

![](images/38da6c3d5c0cd4616f9527a578d9665a812351cd4b6a6eafe26209036636712c.jpg)  

# Note  

When using the hbond/dreiding pair styles with pair_style hybrid/overlay, you should explicitly define pair interactions between the donor atom and acceptor atoms, (as well as between these atoms and ALL other atoms in your system). Whenever pair_style hybrid/overlay is used, ordinary mixing rules are not applied to atoms like the donor and acceptor atoms because they are typically referenced in multiple pair styles. Neglecting to do this can cause difficult-to-detect physics problems.  

![](images/1b8e02d3d63d7c5982b0d9d5587ba441b0172c4a0c3fd313982ea72c50db8ea4.jpg)  

# Note  

In the original Dreiding force field paper 1-4 non-bonded interactions ARE allowed. If this is desired for your model, use the special_bonds command (e.g. “special_bonds $\mathrm{~j~}0.00.01.0^{\gamma})$ to turn these interactions on.  

![](images/a1e9653917ca36333a97ed8ddb9a8fc05bcabf33d85dfcb4dc1d653a72250306.jpg)  

# Note  

For the angleoffset variants, the referenced angle offset is the supplementary angle of the equilibrium angle parameter. It means if the equilibrium angle is 166.6 degrees, the calculated angle offset is 13.4 degrees.  

The following coefficients must be defined for pairs of eligible donor/acceptor types via the pair_coeff command as in the examples above.  

# Note  

Unlike other pair styles and their associated pair_coeff commands, you do not need to specify pair_coeff settings for all possible I,J type pairs. Only I,J type pairs for atoms which act as joint donors/acceptors need to be specified; all other type pairs are assumed to be inactive.  

![](images/23a1a213f450050d01630575a4166c289f6d0e84a85fd00d9029e76d0aa1ccd4.jpg)  

# Note  

A pair_coeff command can be specified multiple times for the same donor/acceptor type pair. This enables multiple hydrogen types to be assigned to the same donor/acceptor type pair. For other pair_styles, if the pair_coeff command is re-used for the same I.J type pair, the settings for that type pair are overwritten. For the hydrogen bond potentials this is not the case; the settings are cumulative. This means the only way to turn off a previous setting, is to re-use the pair_style command and start over.  

For the hbond/dreiding/lj style the list of coefficients is as follows:  

• $\mathtt{K}=$ hydrogen atom type $=1$ to Ntypes, or type label   
• donor flag $=i$ or $j$   
• $\varepsilon$ (energy units)   
• $\sigma$ (distance units)   
• $n=$ exponent in formula above   
• distance cutoff $r_{\mathrm{in}}$ (distance units)   
• distance cutoff $r_{\mathrm{out}}$ (distance units)   
• angle cutoff (degrees)  

For the hbond/dreiding/morse style the list of coefficients is as follows:  

• $\mathtt{K}=$ hydrogen atom type $=1$ to Ntypes, or type labe   
• donor flag $=i$ or $j$   
• $D_{0}$ (energy units)   
• $\alpha$ (1/distance units)   
• $r_{0}$ (distance units)   
• $n=$ exponent in formula above   
• distance cutoff $r_{\mathrm{in}}$ (distance units)   
• distance cutoff $r_{o u t}$ (distance units)   
• angle cutoff (degrees)  

For both the hbond/dreiding/lj/angleoffset and hbond/dreiding/morse/angleoffset styles an additional parameter is added: \* equilibrium angle (degrees)  

For all styles, a single hydrogen atom type K can be specified, or a wild-card asterisk can be used in place of or in conjunction with the K arguments to select multiple types as hydrogen atoms. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $^{\circ\circ}\mathrm{n}^{\ast\circ}$ or $\mathrm{^{6}m^{*}n^{,}}$ . See the pair_coeff command page for details.  

If the donor flag is $i$ , then the atom of type I in the pair_coeff command is treated as the donor, and J is the acceptor. If the donor flag is $j$ , then the atom of type J in the pair_coeff command is treated as the donor and I is the donor. This option is required because the pair_coeff command requires that $\ensuremath{\mathrm{{I}}}<=\ensuremath{\mathrm{{J}}}$ .  

$\varepsilon$ and $\sigma$ are settings for the hydrogen bond potential based on a Lennard-Jones functional form. Note that sigma is defined as the zero-crossing distance for the potential, not as the energy minimum at $2^{1/6}\sigma$ .  

$D_{0}$ and $\alpha$ and $r_{0}$ are settings for the hydrogen bond potential based on a Morse functional form.  

The last 3 coefficients for both styles are optional. If not specified, the global n, distance cutoff, and angle cutoff specified in the pair_style command are used. If you wish to only override the second or third optional parameter, you must also specify the preceding optional parameters.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.132.4 Mixing, shift, table, tail correction, restart, rRESPA info  

These pair styles do not support mixing. You must explicitly identify each donor/acceptor type pair.  

These styles do not support the pair_modify shift option for the energy of the interactions.  

The pair_modify table option is not relevant for these pair styles.  

These pair styles do not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

These pair styles do not write their information to binary restart files, so pair_style and pair_coeff commands need to be re-specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

These pair styles tally a count of how many hydrogen bonding interactions they calculate each timestep and the hbond energy. These quantities can be accessed via the compute pair command as a vector of values of length 2.  

To print these quantities to the log file (with a descriptive column heading) the following commands could be included in an input script:  

compute hb all pair hbond/dreiding/lj variable n_hbond equal c_hb[1] #number hbonds variable E_hbond equal c_hb[2] #hbond energy thermo_style custom step temp epair v_E_hbond  

# 4.132.5 Restrictions  

The base pair styles can only be used if LAMMPS was built with the MOLECULE package. The angleoffset variant also requires the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 4.132.6 Related commands  

pair_coeff  

# 4.132.7 Default  

none  

(Mayo) Mayo, Olfason, Goddard III, J Phys Chem, 94, 8897-8909 (1990). (Liu) Liu, Bryantsev, Diallo, Goddard III, J. Am. Chem. Soc 131 (8) 2798 (2009)  

# 4.133 pair_style hdnnp command  

# 4.133.1 Syntax  

pair_style hdnnp cutoff keyword value ...  

• cutof $=$ short-range cutoff of HDNNP (maximum symmetry function cutoff radius) • zero or more keyword/value pairs may be appended   
• keyword $=$ dir or showew or showewsum or maxew or resetew or cflength or cfenergy • value depends on the preceding keyword:   
dir value $=$ directory directory $=$ Path to HDNNP configuration files   
showew value $=$ yes or no   
showewsum value $=$ summary summary $=$ Write EW summary every this many timesteps (0 turns summary off)   
maxew value $=$ threshold threshold $=$ Maximum number of EWs allowed   
resetew value $=$ yes or no   
cflength value $=$ length length $=$ Length unit conversion factor   
cfenergy value $=$ energy energy $=$ Energy unit conversion factor  

# 4.133.2 Examples  

pair_style hdnnp 6.35 showew yes showewsum 100 maxew 1000 resetew yes cflength 1.8897261328␣   
$\hookrightarrow$ cfenergy 0.0367493254   
pair_coeff \* \* H O   
pair_style hdnnp 6.01 dir "./" showewsum 10000   
pair_coeff \* \* S Cu NULL Cu  

# 4.133.3 Description  

This pair style adds an interaction based on the high-dimensional neural network potential (HDNNP) method as presented in (Behler and Parrinello 2007). HDNNPs are machine learning potentials which require careful training of neural networks prior to application in MD simulations. The pair style uses an interface to the $n2p2$ library (Singraber, Behler and Dellago 2019) which is available on Github here. Please see the $n2p2$ documentation for further details. $n2p2$ (and hence this pair style) is compatible with neural network potentials trained with its own tools (Singraber et al 2019) and with RuNNer.  

Only a single pair_coeff command with two asterisk wild-cards is used with this pair style. Its additional arguments define the mapping of LAMMPS atom types to $\mathtt{n2p2}$ elements.  

In the above example LAMMPS types 1 and 2 are mapped to the elements “H” and “O” in $\mathtt{n2p2}$ , respectively. Multiple types may map to the same element, or some types may not be mapped at all. For example, if the LAMMPS simulation has four atom types, the command  

maps atom types 1 and 2 to the element “H”, type 3 to “O” and type 4 is not mapped (indicated by NULL). Atoms mapped to NULL are ignored by the HDNNP calculation, i.e. they do not contribute in any way to the evaluation of HDNNP energies and forces. This may be useful in a setup with hybrid pair styles.  

The mandatory pair style argument cutoff must match the short-range cutoff radius of the HDNNP. This corresponds to the maximum cutoff radius of all symmetry functions (the atomic environment descriptors of HDNNPs) used.  

![](images/269f69c5ae1e29b4c804925f68e0bf3c963b33dffb5e91a7f49cb501efdb95ea.jpg)  

# Note  

The cutoff must be given in LAMMPS length units, even if the neural network potential has been trained using a different unit system (see remarks about the cflength and cfenergy keywords below for details).  

The numeric value may be slightly larger than the actual maximum symmetry function cutoff radius (to account for rounding errors when converting units), but must not be smaller.  

Use the dir keyword to specify the directory containing the HDNNP configuration files. The directory must contain input.nn with neural network and symmetry function setup, scaling.data with symmetry function scaling data and weights.???.data with weight parameters for each element.  

The keyword showew can be used to turn on/off the display of extrapolation warnings (EWs) which are issued whenever a symmetry function value is out of bounds defined by minimum/maximum values in scaling.data. An extrapolation warning may look like this:  

### NNP EXTRAPOLATION WARNING ### STRUCTURE: 0 ATOM: 119 ELEMENT:␣ , Cu SYMFUNC: 32 TYPE: 3 VALUE: 2.166E-02 MIN: 2.003E-05 MAX: 1.756E-02  

stating that the value 2.166E-02 of symmetry function 32 of type 3 (Narrow Angular symmetry function), element Cu (see the log file for a symmetry function listing) was out of bounds (maximum in scaling.data is 1.756E-02) for atom 119. Here, the atom index refers to the LAMMPS tag (global index) and the structure index is used to print out the MPI rank the atom belongs to.  

The showew keyword should only be set to yes for debugging purposes. Extrapolation warnings may add lots of overhead as they are communicated each timestep. Also, if the simulation is run in a region where the HDNNP was not correctly trained, lots of extrapolation warnings may clog log files and the console. In a production run use showewsum instead.  

The keyword showewsum can be used to get an overview of extrapolation warnings occurring during an MD simulation. The argument specifies the interval at which extrapolation warning summaries are displayed and logged. An EW summary may look like this:  

<html><body><table><tr><td>### NNP EW SUMMARY ### TS:</td><td></td><td>100EW</td><td>11EWPERSTEP</td><td>1.100E-01</td></tr></table></body></html>  

Here, at timestep 100 the occurrence of 11 extrapolation warnings since the last summary is reported, which corresponds to an EW rate of 0.11 per timestep. Setting showewsum to 0 deactivates the EW summaries.  

A maximum number of allowed extrapolation warnings can be specified with the maxew keyword. If the number of EWs exceeds the maxew argument the simulation is stopped. Note however that this is merely an approximate threshold since the check is only performed at the end of each timestep and each MPI process counts individually to minimize communication overhead.  

The keyword resetew alters the behavior of the above mentioned maxew threshold. If resetew is set to yes the threshold is applied on a per-timestep basis and the internal EW counters are reset at the beginning of each timestep. With resetew set to no the counters accumulate EWs along the whole trajectory.  

If the training of a neural network potential has been performed with different physical units for length and energy than those set in LAMMPS, it is still possible to use the potential when the unit conversion factors are provided via the cflength and cfenergy keywords. If for example, the HDNNP was parameterized with Bohr and Hartree training data and symmetry function parameters (i.e. distances and energies in “input.nn” are given in Bohr and Hartree) but LAMMPS is set to use metal units (Angstrom and eV) the correct conversion factors are:  

cflength 1.8897261328   
cfenergy 0.0367493254  

Thus, arguments of cflength and cfenergy are the multiplicative factors required to convert lengths and energies given in LAMMPS units to respective quantities in native HDNNP units (1 Angstrom $=$ 1.8897261328 Bohr, 1 eV = 0.0367493254 Hartree).  

# 4.133.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This style does not support mixing. The pair_coeff command should only be invoked with asterisk wild cards (see above).  

This style does not support the pair_modify shift, table, and tail options.  

This style does not write information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.133.5 Restrictions  

This pair style is part of the ML-HDNNP package. It is only enabled if LAMMPS was built with that package. See the Build package doc page for more info.  

Please report bugs and feature requests to the n2p2 GitHub issue page.  

# Related commands  

pair_coeff , pair_hybrid, units  

# Default  

The default options are dir $=$ “hdnnp/”, showew $=$ yes, showewsum $=0$ , maxew $=0$ , resetew $=$ no, cflength $=1.0$ , cfenergy $=1.0$ .  

(Behler and Parrinello 2007) Behler, J.; Parrinello, M. Phys. Rev. Lett. 2007, 98 (14), 146401.  

(Singraber, Behler and Dellago 2019) Singraber, A.; Behler, J.; Dellago, C. J., Chem. Theory Comput. 2019, 15 (3) 1827-1840  

(Singraber et al 2019) Singraber, A.; Morawietz, T.; Behler, J.; Dellago, C., J. Chem. Theory Comput. 2019, 15 (5), 3075-3092.  

# 4.134 pair_style hybrid command  

Accelerator Variants: hybrid/kk, hybrid/omp  

# 4.135 pair_style hybrid/molecular command  

Accelerator Variant: hybrid/molecular/omp  

# 4.136 pair_style hybrid/overlay command  

Accelerator Variants: hybrid/overlay/kk, hybrid/overlay/omp  

# 4.137 pair_style hybrid/scaled command  

Accelerator Variant: hybrid/scaled/omp  

# 4.137.1 Syntax  

pair_style hybrid style1 args style2 args ... pair_style hybrid/molecular factor1 style1 args factor2 style 2 args pair_style hybrid/overlay style1 args style2 args ... pair_style hybrid/scaled factor1 style1 args factor2 style 2 args ...  

• style1,style2 $=$ list of one or more pair styles and their arguments • factor1,factor2 $=$ scale factors for pair styles, may be a variable  

# 4.137.2 Examples  

pair_style hybrid lj/cut/coul/cut 10.0 eam lj/cut 5.0   
pair_coeff $1^{*}21^{*}2$ eam niu3   
pair_coeff 3 3 lj/cut/coul/cut 1.0 1.0   
pair_coeff 1\*2 3 lj/cut 0.5 1.2  

(continues on next page)  

(continued from previous page)  

pair_style hybrid/overlay lj/cut 2.5 coul/long 2.0   
pair_coeff \* \* lj/cut 1.0 1.0   
pair_coeff \* \* coul/long   
pair_style hybrid/scaled 0.5 tersoff 0.5 sw   
pair_coeff \* \* tersoff Si.tersoff Si   
pair_coeff \* \* sw Si.sw Si $-$   
pair_style hybrid/molecular lj/cut 2.5 lj/cut 2.5   
pair_coeff \* \* lj/cut 1 1.0 1.0   
pair_coeff \* \* lj/cut 2 1.5 1.0   
variable one equal ramp(1.0,0.0)   
variable two equal 1.0-v_one   
pair $-$ style hybrid/scaled v_one lj/cut 2.5 v_two morse 2.5   
pair_coeff 1 1 lj/cut 1.0 1.0 2.5   
pair_coeff 1 1 morse 1.0 1.0 1.0 2.5 $-$   
variable peratom1 atom $1/(1{+}\exp({-}\Re\mathrm{k}^{*}\mathrm{vx}^{\setminus}2)$   
variable peratom2 atom 1-v_peratom1   
pair_style hybrid/scaled v_peratom1 lj/cut 2.5 v_peratom2 morse 2.5   
pair_coeff 1 1 lj/cut 1.0 1.0 2.5   
pair_coeff 1 1 morse 1.0 1.0 1.0 2.5  

# 4.137.3 Description  

The hybrid, hybrid/overlay, hybrid/molecular, and hybrid/scaled styles enable the use of multiple pair styles in one simulation. With the hybrid style, exactly one pair style is assigned to each pair of atom types. With the hybrid/overlay and hybrid/scaled styles, one or more pair styles can be assigned to each pair of atom types. With the hybrid/molecular style, pair styles are assigned to either intra- or inter-molecular interactions.  

The assignment of pair styles to type pairs is made via the pair_coeff command. The major difference between the hybrid/overlay and hybrid/scaled styles is that the hybrid/scaled adds a scale factor for each sub-style contribution to forces, energies and stresses. Because of the added complexity, the hybrid/scaled style has more overhead and thus may be slower than hybrid/overlay.  

The hybrid/molecular pair style accepts only two sub-styles: the first is assigned to intra-molecular interactions (i.e. both atoms have the same molecule ID), the second to inter-molecular interactions (i.e. interacting atoms have different molecule IDs).  

Here are two examples of hybrid simulations. The hybrid style could be used for a simulation of a metal droplet on a LJ surface. The metal atoms interact with each other via an eam potential, the surface atoms interact with each other via a lj/cut potential, and the metal/surface interaction is also computed via a lj/cut potential. The hybrid/overlay style could be used as in the second example above, where multiple potentials are superimposed in an additive fashion to compute the interaction between atoms. In this example, using lj/cut and coul/long together gives the same result as if the lj/cut/coul/long potential were used by itself. In this case, it would be more efficient to use the single combined potential, but in general any combination of pair potentials can be used together in to produce an interaction that is not encoded in any single pair_style file, e.g. adding Coulombic forces between granular particles. Another limitation of using the hybrid/overlay variant, that it does not generate lj/cut parameters for mixed atom types from a mixing rule due to restrictions discussed below.  

If the hybrid/scaled style is used instead of hybrid/overlay, contributions from sub-styles are weighted by their scale factors, which may be fractional or even negative. Furthermore the scale factor for each sub-style may a constant, an equal style variable, or an atom style variable. Variable scale factors may change during the simulation. Different sub-styles may use different scale factor styles. In the case of a sub-style scale factor that is an atom style variable, the force contribution to each atom from that sub-style is weighted by the value of the variable for that atom, while the contribution from that sub-style to the global potential energy is zero. All other contributions to the per-atom energy, per-atom virial, and global virial (if not obtained from forces) from that sub-style are zero. This enables switching smoothly between two different pair styles or two different parameter sets during a run in a similar fashion as could be done with fix adapt or fix alchemy. All pair styles that will be used are listed as “sub-styles” following the hybrid or hybrid/overlay keyword, in any order. In case of the hybrid/scaled pair style, each sub-style is prefixed with a scale factor. The scale factor is either a floating point number or an equal or atom style (or equivalent) variable. Each substyle’s name is followed by its usual arguments, as illustrated in the examples above. See the doc pages of the individual pair styles for a listing and explanation of the appropriate arguments for them.  

Note that an individual pair style can be used multiple times as a sub-style. For efficiency reasons this should only be done if your model requires it. E.g. if you have different regions of Si and C atoms and wish to use a Tersoff potential for pure Si for one set of atoms, and a Tersoff potential for pure C for the other set (presumably with some third potential for Si-C interactions), then the sub-style tersoff could be listed twice. But if you just want to use a Lennard-Jones or other pairwise potential for several different atom type pairs in your model, then you should just list the sub-style once and use the pair_coeff command to assign parameters for the different type pairs.  

#  Note  

There is one exception to this option to list an individual pair style multiple times: GPU-enabled pair styles in the GPU package. This is because the GPU package currently assumes that only one instance of a pair style is being used.  

In the pair_coeff commands, the name of a pair style must be added after the I,J type specification, with the remaining coefficients being those appropriate to that style. If the pair style is used multiple times in the pair_style command, then an additional numeric argument must also be specified which is a number from 1 to M where M is the number of times the sub-style was listed in the pair style command. The extra number indicates which instance of the sub-style these coefficients apply to.  

For example, consider a simulation with 3 atom types: types 1 and 2 are Ni atoms, type 3 are LJ atoms with charges. The following commands would set up a hybrid simulation:  

pair_style hybrid eam/alloy lj/cut/coul/cut 10.0 lj/cut 8.0 pair_coeff \* \* eam/alloy nialhjea Ni Ni NULL pair_coeff 3 3 lj/cut/coul/cut 1.0 1.0 pair_coeff 1\*2 3 lj/cut 0.8 1.3  

As an example of using the same pair style multiple times, consider a simulation with 2 atom types. Type 1 is Si, type 2 is C. The following commands would model the Si atoms with Tersoff, the C atoms with Tersoff, and the crossinteractions with Lennard-Jones:  

pair_style hybrid lj/cut 2.5 tersoff tersoff pair_coeff \* \* tersoff 1 Si.tersoff Si NULL pair_coeff \* \* tersoff 2 C.tersoff NULL C pair_coeff 1 2 lj/cut 1.0 1.5  

It is not recommended to read pair coefficients for a hybrid style from a “Pair Coeffs” or “PairIJ Coeffs” section of a data file via the read_data command, since those sections expect a fixed number of lines, either one line per atom type or one line pair pair of atom types, respectively. When reading from a data file, the lines of the “Pair Coeffs” and “PairIJ Coeffs” are changed in the same way as the pair_coeff command, i.e. the name of the pair style to which the parameters apply must follow the atom type (or atom types), e.g.  

<html><body><table><tr><td>Pair Coeffs</td></tr><tr><td>1 lj/cut/coul/cut 1.0 1.0</td></tr><tr><td></td></tr><tr><td>PairIJ Coeffs</td></tr><tr><td>1 1 lj/cut/coul/cut 1.0 1.0</td></tr></table></body></html>  

Note that the pair_coeff command for some potentials such as pair_style eam/alloy includes a mapping specification of elements to all atom types, which in the hybrid case, can include atom types not assigned to the eam/alloy potential. The NULL keyword is used by many such potentials (eam/alloy, Tersoff, AIREBO, etc), to denote an atom type that will be assigned to a different sub-style.  

For the hybrid style, each atom type pair I,J is assigned to exactly one sub-style. Just as with a simulation using a single pair style, if you specify the same atom type pair in a second pair_coeff command, the previous assignment will be overwritten.  

For the hybrid/overlay and hybrid/scaled styles, each atom type pair I,J can be assigned to one or more sub-styles. If you specify the same atom type pair in a second pair_coeff command with a new sub-style, then the second sub-style is added to the list of potentials that will be calculated for two interacting atoms of those types. If you specify the same atom type pair in a second pair_coeff command with a sub-style that has already been defined for that pair of atoms, then the new pair coefficients simply override the previous ones, as in the normal usage of the pair_coeff command. E.g. these two sets of commands are the same:  

<html><body><table><tr><td>pair style lj/cut 2.5</td><td></td><td></td><td></td></tr><tr><td>pair coeff</td><td>** 1.01.0</td><td></td><td></td></tr><tr><td>pair</td><td>coeff 2 2 1.5 0.8</td><td></td><td></td></tr><tr><td>pair style</td><td>e hybrid/overlay lj/cut 2.5</td><td></td><td></td></tr><tr><td>pair coeff **</td><td>lj/cut 1.0 1.0</td><td></td><td></td></tr><tr><td>pair</td><td>coeff 2 2 lj/cut 1.5 0.8</td><td></td><td></td></tr></table></body></html>  

Coefficients must be defined for each pair of atoms types via the pair_coeff command as described above, or in the “Pair Coeffs” or “PairIJ Coeffs” section of the data file read by the read_data command, or by mixing as described below.  

For all of the hybrid, hybrid/overlay, and hybrid/scaled styles, every atom type pair I,J (where $\mathrm{I}<=\mathrm{J}$ ) must be assigned to at least one sub-style via the pair_coeff command as in the examples above, or in the data file read by the read_data, or by mixing as described below. Also all sub-styles must be used at least once in a pair_coeff command.  

![](images/96898a7e74251d2c2bc5b29275191e3b0e131066cb49e20936d20dcd626d8f30.jpg)  

# Warning  

With hybrid pair styles the use of mixing to generate pair coefficients is significantly limited compared to the individual pair styles. LAMMPS never performs mixing of parameters from different sub-styles, even if they use the same type of coefficients, e.g. contain a Lennard-Jones potential variant. Those parameters must be provided explicitly. Also for hybrid/overlay and hybrid/scaled mixing is only performed for pairs of atom types for which only a single pair style is assigned.  

Thus it is strongly recommended to provide all mixed terms explicitly. For non-hybrid styles those could be generated and written out using the write_coeff command and then edited as needed to comply with the requirements for hybrid styles as explained above.  

If you want there to be no interactions between a particular pair of atom types, you have 3 choices. You can assign the pair of atom types to some sub-style and use the neigh_modify exclude type command. You can assign it to some sub-style and set the coefficients so that there is effectively no interaction (e.g. epsilon $=0.0$ in a LJ potential). Or, for hybrid, hybrid/overlay, or hybrid/scaled simulations, you can use this form of the pair_coeff command in your input script or the “PairIJ Coeffs” section of your data file:  

or this form in the “Pair Coeffs” section of the data file:  

If an assignment to none is made in a simulation with the hybrid/overlay or hybrid/scaled pair style, it wipes out all previous assignments of that pair of atom types to sub-styles.  

Note that you may need to use an atom_style hybrid command in your input script, if atoms in the simulation will need attributes from several atom styles, due to using multiple pair styles with different requirements.  

Different force fields (e.g. CHARMM vs. AMBER) may have different rules for applying exclusions or weights that change the strength of pairwise non-bonded interactions between pairs of atoms that are also 1-2, 1-3, and 1-4 neighbors in the molecular bond topology. This is normally a global setting defined the special_bonds command. However, different weights can be assigned to different hybrid sub-styles via the pair_modify special command. This allows multiple force fields to be used in a model of a hybrid system, however, there is no consistent approach to determine parameters automatically for the interactions between atoms of the two force fields, thus this approach this is only recommended when particles described by the different force fields do not mix.  

Here is an example for combining CHARMM and AMBER: The global amber setting sets the 1-4 interactions to non-zero scaling factors and then overrides them with 0.0 only for CHARMM:  

special_bonds amber pair_style hybrid lj/charmm/coul/long 8.0 10.0 lj/cut/coul/long 10.0 pair_modify pair lj/charmm/coul/long special lj/coul 0.0 0.0 0.0  

This input achieves the same effect:  

special_bonds 0.0 0.0 0.1   
pair_style hybrid lj/charmm/coul/long 8.0 10.0 lj/cut/coul/long 10.0   
pair_modify pair lj/cut/coul/long special lj 0.0 0.0 0.5   
pair_modify pair lj/cut/coul/long special coul 0.0 0.0 0.83333333   
pair_modify pair lj/charmm/coul/long special lj/coul 0.0 0.0 0.0  

Here is an example for combining Tersoff with OPLS/AA based on a data file that defines bonds for all atoms where - for the Tersoff part of the system - the force constants for the bonded interactions have been set to 0. Note the global settings are effectively lj/coul 0.0 0.0 0.5 as required for OPLS/AA:  

special_bonds lj/coul 1e-20 1e-20 0.5   
pair_style hybrid tersoff lj/cut/coul/long 12.0   
pair_modify pair tersoff special lj/coul 1.0 1.0 1.0  

For use with the various compute \*/tally computes, the pair_modify compute/tally command can be used to selectively turn off processing of the compute tally styles, for example, if those pair styles (e.g. many-body styles) do not support this feature.  

See the pair_modify page for details on the specific syntax, requirements and restrictions.  

# 4.137. pair_style hybrid/scaled command  

The potential energy contribution to the overall system due to an individual sub-style can be accessed and output via the compute pair command. Note that in the case of pair style hybrid/scaled this is the unscaled potential energy of the selected sub-style.  

![](images/2f86a8fddcb7add3e5c849c79f7bee5d04ff3d05c55f8867c8168befae2a9ad3.jpg)  

# Note  

Several of the potentials defined via the pair_style command in LAMMPS are really many-body potentials, such as Tersoff, AIREBO, MEAM, ReaxFF, etc. The way to think about using these potentials in a hybrid setting is as follows.  

A subset of atom types is assigned to the many-body potential with a single pair_coeff command, using “\* \*” to include all types and the NULL keywords described above to exclude specific types not assigned to that potential. If types 1,3,4 were assigned in that way (but not type 2), this means that all many-body interactions between all atoms of types 1,3,4 will be computed by that potential. Pair_style hybrid allows interactions between type pairs 2-2, 1-2, 2-3, 2-4 to be specified for computation by other pair styles. You could even add a second interaction for 1-1 to be computed by another pair style, assuming pair_style hybrid/overlay is used.  

But you should not, as a general rule, attempt to exclude the many-body interactions for some subset of the type pairs within the set of 1,3,4 interactions, e.g. exclude 1-1 or 1-3 interactions. That is not conceptually well-defined for manybody interactions, since the potential will typically calculate energies and foces for small groups of atoms, e.g. 3 or 4 atoms, using the neighbor lists of the atoms to find the additional atoms in the group.  

However, you can still use the pair_coeff none setting or the neigh_modify exclude command to exclude certain type pairs from the neighbor list that will be passed to a many-body sub-style. This will alter the calculations made by a many-body potential beyond the specific pairs, since it builds its list of 3-body, 4-body, etc interactions from the pair lists. You will need to think carefully as to whether excluding such pairs produces a physically meaningful result for your model.  

For example, imagine you have two atom types in your model, type 1 for atoms in one surface, and type 2 for atoms in the other, and you wish to use a Tersoff potential to compute interactions within each surface, but not between the surfaces. Then either of these two command sequences would implement that model:  

pair_style hybrid tersoff   
pair_coeff \* \* tersoff SiC.tersoff C C   
pair_coeff 1 2 none   
pair_style tersoff   
pair_coeff \* \* SiC.tersoff C C   
neigh_modify exclude type 1 2  

Either way, only neighbor lists with 1-1 or 2-2 interactions would be passed to the Tersoff potential, which means it would compute no 3-body interactions containing both type 1 and 2 atoms.  

Here is another example to use 2 many-body potentials together in an overlapping manner using hybrid/overlay. Imagine you have CNT (C atoms) on a Si surface. You want to use Tersoff for Si/Si and Si/C interactions, and AIREBO for C/C interactions. Si atoms are type 1; C atoms are type 2. Something like this will work:  

<html><body><table><tr><td>pair style hybrid/overlay tersoff airebo 3.0</td></tr><tr><td></td></tr><tr><td>pair coeff **+ tersoff SiC.tersoff.custom Si C</td></tr><tr><td>pair_coeff ** airebo CH.airebo NULL C</td></tr></table></body></html>  

Note that to prevent the Tersoff potential from computing C/C interactions, you would need to modify the SiC.tersoff potential file to turn off C/C interaction, i.e. by setting the appropriate coefficients to 0.0.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

![](images/8280f9513930e12e086a7e5b445061e9b8285e6f911ec58698362ce5e8b1556d.jpg)  

# Note  

Since the hybrid, hybrid/overlay, hybrid/scaled styles delegate computation to the individual sub-styles, the suffix versions of the hybrid and hybrid/overlay styles are used to propagate the corresponding suffix to all sub-styles, if those versions exist. Otherwise the non-accelerated version will be used. The individual accelerated sub-styles are part of the GPU, KOKKOS, INTEL, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

# 4.137.4 Mixing, shift, table, tail correction, restart, rRESPA info  

Any pair potential settings made via the pair_modify command are passed along to all sub-styles of the hybrid potential.  

For atom type pairs I,J and $\mathrm{\textbf{I}}!=\mathrm{\textbf{J}}$ , if the sub-style assigned to I,I and J,J is the same, and if the sub-style allows for mixing, then the coefficients for I,J can be mixed. This means you do not have to specify a pair_coeff command for I,J since the I,J type pair will be assigned automatically to the sub-style defined for both I,I and J,J and its coefficients generated by the mixing rule used by that sub-style. For the hybrid/overlay and hybrid/scaled style, there is an additional requirement that both the I,I and J,J pairs are assigned to a single sub-style. If this requirement is not met, no I,J coeffs will be generated, even if the sub-styles support mixing, and I,J pair coefficients must be explicitly defined.  

See the pair_modify command for details of mixing rules. See the See the page for the sub-style to see if allows fo mixing.  

The hybrid pair styles supports the pair_modify shift, table, and tail options for an I,J pair interaction, if the associated sub-style supports it.  

For the hybrid pair styles, the list of sub-styles and their respective settings are written to binary restart files, so a pair_style command does not need to specified in an input script that reads a restart file. However, the coefficient information is not stored in the restart file. The same is true for data files. Thus, pair_coeff commands need to be re-specified in the restart input script. For pair style hybrid/scaled also the names of any variables used as scale factors are restored, but not the variables themselves, so those may need to be redefined when continuing from a restart.  

These pair styles support the use of the inner, middle, and outer keywords of the run_style respa command, if their sub-styles do.  

# 4.137.5 Restrictions  

When using a long-range Coulombic solver (via the kspace_style command) with a hybrid pair_style, one or more sub-styles will be of the “long” variety, e.g. lj/cut/coul/long or buck/coul/long. You must ensure that the short-range Coulombic cutoff used by each of these long pair styles is the same or else LAMMPS will generate an error.  

Pair style hybrid/scaled currently only works for non-accelerated pair styles and pair styles from the OPT package.  

Pair style hybrid/molecular is not compatible with manybody potentials.  

When using pair styles from the GPU package they must not be listed multiple times. LAMMPS will detect this and abort.  

# 4.137.6 Related commands  

pair_coeff  

# 4.137.7 Default  

none  

# 4.138 pair_style ilp/graphene/hbn command  

Accelerator Variant: ilp/graphene/hbn/opt  

# 4.138.1 Syntax  

pair_style [hybrid/overlay ...] ilp/graphene/hbn cutoff tap_flag  

• cutof $=$ global cutoff (distance units) • tap_flag $=0/1$ to turn off/on the taper function  

# 4.138.2 Examples  

pair_style hybrid/overlay ilp/graphene/hbn 16.0 1   
pair_coeff \* \* ilp/graphene/hbn BNCH.ILP B N C   
pair_style hybrid/overlay rebo tersoff ilp/graphene/hbn 16.0 coul/shield 16.0   
pair_coeff \* \* rebo CH.rebo NULL NULL C   
pair_coeff \* \* tersoff BNC.tersoff B N NULL   
pair_coeff \* \* ilp/graphene/hbn BNCH.ILP B N C   
pair_coeff 1 1 coul/shield 0.70   
pair_coeff 1 2 coul/shield 0.695   
pair_coeff 2 2 coul/shield 0.69  

# 4.138.3 Description  

The ilp/graphene/hbn style computes the registry-dependent interlayer potential (ILP) potential as described in (Leven1), (Leven2) and (Maaravi). The normals are calculated in the way as described in (Kolmogorov).  

$$
\begin{array}{l}{\displaystyle E=\frac12\sum_{i}\sum_{j\neq i}V_{i j}}\ {\displaystyle V_{i j}=\mathrm{Tap}(r_{i j})\left\{e^{-\alpha(r_{i j}/\beta-1)}\left[\varepsilon+f(\rho_{i j})+f(\rho_{j i})\right]-\frac1{1+e^{-d\left[(r_{i j}/(\kappa_{i}r^{\prime}/\beta)-1\right]}}\cdot\frac{C_{6}}{r_{i j}^{6}}\right\}}\ {\displaystyle\rho_{i j}^{2}=r_{i j}^{2}-({\bf r}_{i j}\cdot{\bf n}_{i})^{2}}\ {\displaystyle\rho_{j i}^{2}=r_{i j}^{2}-({\bf r}_{i j}\cdot{\bf n}_{j})^{2}}\ {\displaystyle f(\rho)=C e^{-(\rho/\delta)^{2}}}\ {\displaystyle\mathrm{Tap}(r_{i j})=20\left(\frac{r_{i j}}{R_{\mathrm{at}}}\right)^{7}-70\left(\frac{r_{i j}}{R_{\mathrm{at}}}\right)^{6}+84\left(\frac{r_{i j}}{R_{\mathrm{at}}}\right)^{5}-35\left(\frac{r_{i j}}{R_{\mathrm{at}}}\right)^{4}+1}\end{array}
$$  

Where $\mathrm{Tap}(r_{i j})$ is the taper function which provides a continuous cutoff (up to third derivative) for interatomic separations larger than $r_{c}$ (Maaravi). The definitions of each parameter in the above equation can be found in (Leven1) and (Maaravi).  

It is important to include all the pairs to build the neighbor list for calculating the normals.  

# $\Theta$ Note  

This potential (ILP) is intended for interlayer interactions between two different layers of graphene, hexagonal boron nitride (h-BN) and their hetero-junction. To perform a realistic simulation, this potential must be used in combination with intralayer potential, such as AIREBO or Tersoff potential. To keep the intralayer properties unaffected, the interlayer interaction within the same layers should be avoided. Hence, each atom has to have a layer identifier such that atoms residing on the same layer interact via the appropriate intralayer potential and atoms residing on different layers interact via the ILP. Here, the molecule id is chosen as the layer identifier, thus a data file with the “full” atom style is required to use this potential.  

The parameter file (e.g. BNCH.ILP), is intended for use with metal units, with energies in meV. Two additional parameters, S, and rcut are included in the parameter file. $S$ is designed to facilitate scaling of energies. rcut is designed to build the neighbor list for calculating the normals for each atom pair.  

# Note  

The parameters presented in the parameter file (e.g. BNCH.ILP), are fitted with taper function by setting the cutoff equal to 16.0 Angstrom. Using different cutoff or taper function should be careful. The parameters for atoms pairs between Boron and Nitrogen are fitted with a screened Coulomb interaction coul/shield. Therefore, to simulated the properties of h-BN correctly, this potential must be used in combination with the pair style coul/shield.  

![](images/3bc4aac07857f869fa0bd8457b421e5d2ef6048712458531cdc9a7d2e53485d5.jpg)  

# Note  

Four new sets of parameters of ILP for 2D layered Materials with bilayer and bulk configurations are presented in (Ouyang1) and (Ouyang2), respectively. These parameters provide a good description in both short- and longrange interaction regimes. While the old ILP parameters published in (Leven2) and (Maaravi) are only suitable for long-range interaction regime. This feature is essential for simulations in high pressure regime (i.e., the interlayer distance is smaller than the equilibrium distance). The benchmark tests and comparison of these parameters can be found in (Ouyang1) and (Ouyang2).  

This potential must be used in combination with hybrid/overlay. Other interactions can be set to zero using pair_style none.  

This pair style tallies a breakdown of the total interlayer potential energy into sub-categories, which can be accessed via the compute pair command as a vector of values of length 2. The 2 values correspond to the following sub-categories:  

1. E_vdW $=$ vdW (attractive) energy   
2. $E_{-}R e p=\mathrm{R}$ epulsive energy  

To print these quantities to the log file (with descriptive column headings) the following commands could be included in an input script:  

compute 0 all pair ilp/graphene/hbn   
variable Evdw equal c_0[1]   
variable Erep equal c_0[2]   
thermo_style custom step temp epair v_Erep v_Evdw  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.138.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write their information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

# 4.138.5 Restrictions  

This pair style is part of the INTERLAYER package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be on for pair interactions.  

The BNCH.ILP potential file provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use this potential with any LAMMPS units, but you would need to create your own custom BNCH.ILP potential file with coefficients listed in the appropriate units, if your simulation does not use metal units.  

# 4.138.6 Related commands  

pair_coeff , pair_none, pair_style hybrid/overlay, pair_style drip, pair_style ilp_tmd, pair_style saip_metal, pair_style pair_kolmogorov_crespi_z, pair_style pair_kolmogorov_crespi_full, pair_style pair_lebedeva_z, pair_style pair_coul_shield.  

# 4.138.7 Default  

tap_flag $=1$  

(Ouyang1) W. Ouyang, D. Mandelli, M. Urbakh and O. Hod, Nano Lett. 18, 6009-6016 (2018).   
(Ouyang2) W. Ouyang et al., J. Chem. Theory Comput. 16(1), 666-676 (2020).   
(Leven1) I. Leven, I. Azuri, L. Kronik and O. Hod, J. Chem. Phys. 140, 104106 (2014).   
(Leven2) I. Leven et al, J. Chem.Theory Comput. 12, 2896-905 (2016).   
(Maaravi) T. Maaravi et al, J. Phys. Chem. C 121, 22826-22835 (2017).   
(Kolmogorov) A. N. Kolmogorov, V. H. Crespi, Phys. Rev. B 71, 235415 (2005).  

# 4.139 pair_style ilp/tmd command  

Accelerator Variant: ilp/tmd/opt  

# 4.139.1 Syntax  

pair_style [hybrid/overlay ...] ilp/tmd cutoff tap_flag  

cutof $=$ global cutoff (distance units) • tap_flag $=0/1$ to turn off/on the taper function  

# 4.139.2 Examples  

pair_style hybrid/overlay ilp/tmd 16.0 1  
pair_coeff \* \* ilp/tmd TMD.ILP Mo S S  
pair_style hybrid/overlay sw/mod sw/mod ilp/tmd 16.0  
pair_coeff \* \* sw/mod 1 tmd.sw.mod Mo S S NULL NULL NULL  
pair_coeff \* \* sw/mod 2 tmd.sw.mod NULL NULL NULL W Se Se  
pair_coeff \* \* ilp/tmd TMD.ILP Mo S S W Se Se  

# 4.139.3 Description  

Added in version 17Feb2022.  

The ilp/tmd style computes the registry-dependent interlayer potential (ILP) potential for transition metal dichalcogenides (TMD) as described in (Ouyang7) and (Jiang).  

$$
\begin{array}{l}{\displaystyle E=\frac12\sum_{i}\sum_{j\neq i}V_{i j}}\ {\displaystyle V_{i j}=\mathrm{Iap}(r_{i j})\left\{e^{-\alpha(r_{i j}/\beta-1)}\left[\varepsilon+f(\rho_{i j})+f(\rho_{j i})\right]-\frac1{1+e^{-d\left[(r_{i j}/(\kappa_{i}r^{\prime}/\beta)-1)\right]}}\cdot\frac{C_{6}}{r_{i j}^{6}}\right\}}\ {\displaystyle\rho_{i j}^{2}=r_{i j}^{2}-({\bf r}_{i j}\cdot{\bf n}_{i})^{2}}\ {\displaystyle\rho_{j}^{2}=r_{i j}^{2}-({\bf r}_{i j}\cdot{\bf n}_{j})^{2}}\ {\displaystyle f(\rho)=C e^{-(\rho/\delta)^{2}}}\ {\mathrm{Tap}(r_{i j})=20\left(\frac{r_{i j}}{R_{\mathrm{at}}}\right)^{7}-70\left(\frac{r_{i j}}{R_{\mathrm{at}}}\right)^{6}+84\left(\frac{r_{i j}}{R_{\mathrm{at}}}\right)^{5}-35\left(\frac{r_{i j}}{R_{\mathrm{at}}}\right)^{4}+1}\end{array}
$$  

Where $\mathrm{Tap}(r_{i j})$ is the taper function which provides a continuous cutoff (up to third derivative) for interatomic separations larger than $r_{c}$ pair_style ilp_graphene_hbn.  

It is important to include all the pairs to build the neighbor list for calculating the normals.  

# Note  

Since each MX2 $\mathbf{M}=\mathbf{M}\mathbf{0}$ , W and ${\mathrm{X}}={\mathrm{S}}$ , Se Te) layer contains two sub-layers of X atoms and one sub-layer of M atoms, the definition of the normal vectors used for graphene and h-BN is no longer valid for TMDs. In (Ouyang7), a new definition is proposed, where for each atom $i$ , its six nearest neighboring atoms belonging to the same sub-layer are chosen to define the normal vector $\{b f n\}_{i}$ .  

The parameter file (e.g. TMD.ILP), is intended for use with metal units, with energies in meV. Two additional parameters, S, and rcut are included in the parameter file. $S$ is designed to facilitate scaling of energies. rcut is designed to build the neighbor list for calculating the normals for each atom pair.  

# Note  

The parameters presented in the parameter file (e.g. TMD.ILP), are fitted with taper function by setting the cutoff equal to 16.0 Angstrom. Using different cutoff or taper function should be careful. These parameters provide a good description in both short- and long-range interaction regimes. This feature is essential for simulations in high pressure regime (i.e., the interlayer distance is smaller than the equilibrium distance). The benchmark tests and comparison of these parameters can be found in (Ouyang7).  

This potential must be used in combination with hybrid/overlay. Other interactions can be set to zero using pair_style none.  

This pair style tallies a breakdown of the total interlayer potential energy into sub-categories, which can be accessed via the compute pair command as a vector of values of length 2. The 2 values correspond to the following sub-categories:  

1. $E_{-}\nu d W=\mathrm{vdW}$ (attractive) energy   
2. $E_{-}R e p=\mathrm{R}$ epulsive energy  

To print these quantities to the log file (with descriptive column headings) the following commands could be included in an input script:  

compute 0 all pair ilp/tmd   
variable Evdw equal c_0[1]   
variable Erep equal c_0[2]   
thermo_style custom step temp epair v_Erep v_Evdw  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.139.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write their information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

# 4.139.5 Restrictions  

This pair style is part of the INTERLAYER package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be on for pair interactions.  

The TMD.ILP potential file provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use this potential with any LAMMPS units, but you would need to create your own custom TMD.ILP potential file with coefficients listed in the appropriate units, if your simulation does not use metal units.  

# 4.139.6 Related commands  

pair_coeff , pair_none, pair_style hybrid/overlay, pair_style drip, pair_style saip_metal, pair_style ilp_graphene_hbn, pair_style pair_kolmogorov_crespi_z, pair_style pair_kolmogorov_crespi_full, pair_style pair_lebedeva_z, pair_style pair_coul_shield.  

# 4.139.7 Default  

tap_flag $=1$  

(Ouyang7) W. Ouyang, et al., J. Chem. Theory Comput. 17, 7237 (2021).   
(Jiang) W. Jiang, et al., J. Phys. Chem. A, 127, 46, 9820-9830 (2023).  

# 4.140 pair_style kim command  

# 4.140.1 Syntax  

The argument model is the name of the KIM PM. For potentials archived in OpenKIM this is the extended KIM ID (see kim command for details). LAMMPS can invoke any KIM PM, however there can be incompatibilities (for example due to unit matching issues). In the event of an incompatibility, the code will terminate with an error message. Check both the LAMMPS and KIM log files for details.  

Only a single pair_coeff command is used with the kim style, which specifies the mapping of LAMMPS atom types to the species supported by the KIM PM. This is done by specifying $N$ additional arguments after the \* \* in the pair_coeff command, where $N$ is the number of LAMMPS atom types:  

• N element names $=$ mapping of KIM elements to atom types  

For example, consider a KIM PM that supports Si and C species. If the LAMMPS simulation has four atom types, where the first three are Si, and the fourth is C, the following pair_coeff command would be used:  

The first two arguments must be \* \* so as to span all LAMMPS atom types. The first three Si arguments map LAMMPS atom types 1, 2, and 3 to Si as defined within KIM PM. The final C argument maps LAMMPS atom type 4 to C.  

In addition to the usual LAMMPS error messages, the KIM library itself may generate errors, which should be printed to the screen. In this case it is also useful to check the kim.log file for additional error information. The file kim.log should be generated in the same directory where LAMMPS is running.  

To download, build, and install the KIM library on your system, see the lib/kim/README file. Once you have don this and built LAMMPS with the KIM package installed you can run the example input scripts in examples/kim.  

# 4.140.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write its information to binary restart files, since KIM stores the potential parameters. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.140.5 Restrictions  

This pair style is part of the KIM package. See details on restrictions in kim command.   
This current version of pair_style kim is compatible with the kim-api package version 2.0.0 and higher.  

# 4.140.6 Related commands  

pair_coeff , kim command  

# 4.140.7 Default  

none  

# 4.141 pair_style kolmogorov/crespi/full command  

# 4.141.1 Syntax  

pair_style hybrid/overlay kolmogorov/crespi/full cutoff tap_flag  

• cutof $=$ global cutoff (distance units) • tap_flag $=0/1$ to turn off/on the taper function  

# 4.141.2 Examples  

pair_style hybrid/overlay kolmogorov/crespi/full 20.0 0 pair_coeff \* \* none pair_coeff \* \* kolmogorov/crespi/full CH.KC C C pair_style hybrid/overlay rebo kolmogorov/crespi/full 16.0 1 pair_coeff \* \* rebo CH.rebo C H pair_coeff \* \* kolmogorov/crespi/full CH_taper.KC C H  

# 4.141.3 Description  

The kolmogorov/crespi/full style computes the Kolmogorov-Crespi (KC) interaction potential as described in (Kolmogorov). No simplification is made,  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\frac{1}{2}\sum_{i}\sum_{j\neq i}{\cal V}_{i j}}}\ {{\displaystyle{\cal V}_{i j}=e^{-\lambda(r_{i}-z_{0})}\left[C+f(\rho_{i j})+f(\rho_{j i})\right]-A\left(\frac{r_{i j}}{z_{0}}\right)^{-6}}}\ {{\displaystyle\rho_{i j}^{2}=r_{i j}^{2}-({\bf r}_{i j}\cdot{\bf n}_{i})^{2}}}\ {{\displaystyle\rho_{j i}^{2}=r_{i j}^{2}-({\bf r}_{i j}\cdot{\bf n}_{j})^{2}}}\ {{\displaystyle f(\rho)=e^{-(\rho/\delta)^{2}}\sum_{n=0}^{2}C_{2n}(\rho/\delta)^{2n}}}\end{array}
$$  

It is important to have a sufficiently large cutoff to ensure smooth forces and to include all the pairs to build the neighbor list for calculating the normals. Energies are shifted so that they go continuously to zero at the cutoff assuming that the exponential part of $V_{i j}$ (first term) decays sufficiently fast. This shift is achieved by the last term in the equation for $V_{i j}$ above. This is essential only when the tapper function is turned off. The formula of taper function can be found in pair style ilp/graphene/hbn.  

# Note  

This potential (ILP) is intended for interlayer interactions between two different layers of graphene. To perform a realistic simulation, this potential must be used in combination with intralayer potential, such as AIREBO or Tersoff potential. To keep the intralayer properties unaffected, the interlayer interaction within the same layers should be avoided. Hence, each atom has to have a layer identifier such that atoms residing on the same layer interact via the appropriate intralayer potential and atoms residing on different layers interact via the ILP. Here, the molecule id is chosen as the layer identifier, thus a data file with the “full” atom style is required to use this potential.  

The parameter file (e.g. CH.KC), is intended for use with metal units, with energies in meV. Two additional parameters, $S$ , and rcut are included in the parameter file. $S$ is designed to facilitate scaling of energies. rcut is designed to build the neighbor list for calculating the normals for each atom pair.  

![](images/263534493aa9f85b8413a9e6b2033b7f072e4e4dd6c01b8045d7a6d83a4ffdb7.jpg)  

# Note  

Two new sets of parameters of KC potential for hydrocarbons, CH.KC (without the taper function) and CH_taper.KC (with the taper function) are presented in (Ouyang1). The energy for the KC potential with the taper function goes continuously to zero at the cutoff. The parameters in both CH.KC and CH_taper.KC provide a good description in both short- and long-range interaction regimes. While the original parameters (CC.KC) published in (Kolmogorov) are only suitable for long-range interaction regime. This feature is essential for simulations in high pressure regime (i.e., the interlayer distance is smaller than the equilibrium distance). The benchmark tests and comparison of these parameters can be found in (Ouyang1) and (Ouyang2).  

This potential must be used in combination with hybrid/overlay. Other interactions can be set to zero using pair_style none.  

This pair style tallies a breakdown of the total interlayer potential energy into sub-categories, which can be accessed via the compute pair command as a vector of values of length 2. The 2 values correspond to the following sub-categories:  

1. $E_{-}\nu d W=\mathrm{vdW}$ (attractive) energy   
2. E_Rep $=$ Repulsive energy  

To print these quantities to the log file (with descriptive column headings) the following commands could be included in an input script:  

compute 0 all pair kolmogorov/crespi/full   
variable Evdw equal c_0[1]   
variable Erep equal c_0[2]   
thermo_style custom step temp epair v_Erep v_Evdw  

# 4.141.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write their information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

# 4.141.5 Restrictions  

This pair style is part of the INTERLAYER package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be on for pair interactions.  

The CH.KC potential file provided with LAMMPS (see the potentials folder) is parameterized for metal units. You can use this pair style with any LAMMPS units, but you would need to create your own custom CH.KC potential file with all coefficients converted to the appropriate units.  

# 4.141.6 Related commands  

pair_coeff , pair_none, pair_style hybrid/overlay, pair_style drip, pair_style pair_lebedeva_z, pair_style kolmogorov/crespi/z, pair_style ilp/graphene/hbn.  

# 4.141.7 Default  

tap_flag $=0$  

(Kolmogorov) A. N. Kolmogorov, V. H. Crespi, Phys. Rev. B 71, 235415 (2005) (Ouyang1) W. Ouyang, D. Mandelli, M. Urbakh and O. Hod, Nano Lett. 18, 6009-6016 (2018). (Ouyang2) W. Ouyang et al., J. Chem. Theory Comput. 16(1), 666-676 (2020).  

# 4.142 pair_style kolmogorov/crespi/z command  

# 4.142.1 Syntax  

pair_style [hybrid/overlay ...] kolmogorov/crespi/z cutoff  

# 4.142.2 Examples  

pair_style hybrid/overlay kolmogorov/crespi/z 20.0 pair_coeff \* \* none pair_coeff 1 2 kolmogorov/crespi/z CC.KC C C pair_style hybrid/overlay rebo kolmogorov/crespi/z 14.0 pair_coeff \* \* rebo CH.rebo C C pair_coeff 1 2 kolmogorov/crespi/z CC.KC C C  

# 4.142.3 Description  

The kolmogorov/crespi/z style computes the Kolmogorov-Crespi interaction potential as described in (Kolmogorov).   
An important simplification is made, which is to take all normals along the $\mathbf{Z}$ -axis.  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\frac{1}{2}\sum_{i}\sum_{j\neq i}{\cal V}_{i j}}}\ {{\displaystyle{\cal V}_{i j}=e^{-\lambda(r_{i j}-z_{0})}\left[C+f(\rho_{i j})+f(\rho_{j i})\right]-A\left(\frac{r_{i j}}{z_{0}}\right)^{-6}+A\left(\frac{\mathrm{cutoff}}{z_{0}}\right)^{-6}}}\ {{\displaystyle\rho_{i j}^{2}=\rho_{j i}^{2}=x_{i j}^{2}+y_{i j}^{2}\qquad({\bf n}_{i}\equiv\hat{{\bf z}})}}\ {{\displaystyle f(\rho)=e^{-(\rho/\delta)^{2}}\sum_{n=0}^{2}C_{2n}\left(\rho/\delta\right)^{2n}}}\end{array}
$$  

It is important to have a sufficiently large cutoff to ensure smooth forces. Energies are shifted so that they go continuously to zero at the cutoff assuming that the exponential part of $V_{i j}$ (first term) decays sufficiently fast. This shift is achieved by the last term in the equation for $V_{i j}$ above.  

This potential is intended for interactions between two layers of graphene. Therefore, to avoid interaction between layers in multi-layered materials, each layer should have a separate atom type and interactions should only be computed between atom types of neighboring layers.  

The parameter file (e.g. CC.KC), is intended for use with metal units, with energies in meV. An additional parameter, $S$ , is available to facilitate scaling of energies in accordance with (vanWijk).  

This potential must be used in combination with hybrid/overlay. Other interactions can be set to zero using pair_style none.  

# 4.142.4 Restrictions  

This fix is part of the INTERLAYER package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.142.5 Related commands  

pair_coeff , pair_none, pair_style hybrid/overlay, pair_style drip, pair_style ilp/graphene/hbn. pair_style kolmogorov/crespi/full, pair_style lebedeva/z  

# 4.142.6 Default  

none  

(Kolmogorov) A. N. Kolmogorov, V. H. Crespi, Phys. Rev. B 71, 235415 (2005)  

(vanWijk) M. M. van Wijk, A. Schuring, M. I. Katsnelson, and A. Fasolino, Physical Review Letters, 113, 135504 (2014)  

# 4.143 pair_style lcbop command  

# 4.143.1 Syntax  

# 4.143.2 Examples  

pair_style lcbop pair_coeff \* \* ../potentials/C.lcbop C  

# 4.143.3 Description  

The lcbop pair style computes the long-range bond-order potential for carbon (LCBOP) of (Los and Fasolino). See section II in that paper for the analytic equations associated with the potential.  

Only a single pair_coeff command is used with the lcbop style which specifies an LCBOP potential file with parameters for specific elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of LCBOP elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, if your LAMMPS simulation has 4 atom types and you want the first 3 to be C you would use the following pair_coeff command:  

pair_coeff \* \* C.lcbop C C C NULL  

The first 2 arguments must be $**_{\mathrm{~S~O~}}$ as to span all LAMMPS atom types. The first C argument maps LAMMPS atom type 1 to the C element in the LCBOP file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a lcbop potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

The parameters/coefficients for the LCBOP potential as applied to C are listed in the C.lcbop file to agree with the original (Los and Fasolino) paper. Thus the parameters are specific to this potential and the way it was fit, so modifying the file should be done carefully.  

# 4.143.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.143.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair potential requires the newton setting to be “on” for pair interactions.  

The C.lcbop potential file provided with LAMMPS (see the potentials directory) is parameterized for metal units. You can use the LCBOP potential with any LAMMPS units, but you would need to create your own LCBOP potential file with coefficients listed in the appropriate units if your simulation does not use “metal” units.  

# 4.143.6 Related commands  

pair_airebo, pair_coeff  

# 4.143.7 Default  

# 4.144.3 Description  

The lebedeva/z pair style computes the Lebedeva interaction potential as described in (Lebedeva1) and (Lebedeva2).   
An important simplification is made, which is to take all normals along the z-axis.  

The Lebedeva potential is intended for the description of the interlayer interaction between graphene layers. To perform a realistic simulation, this potential must be used in combination with an intralayer potential such as AIREBO or Tersoff facilitated by using pair style hybrid/overlay. To keep the intralayer properties unaffected, the interlayer interaction within the same layers should be avoided. This can be achieved by assigning different atom types to atoms of different layers (e.g. 1 and 2 in the examples above).  

Other interactions can be set to zero using pair_style none.  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\frac{1}{2}\sum_{i}\sum_{j\neq i}{\cal V}_{i j}}}\ {{\displaystyle{\cal V}_{i j}={\cal E}e^{-\alpha(r_{i}-z_{0})}}}\ {{\displaystyle~+{\cal C}(1+D_{1}\rho_{i j}^{2}+D_{2}\rho_{i j}^{4})e^{-\lambda_{1}\rho_{i j}^{2}}e^{-\lambda_{2}(z_{i j}^{2}-z_{0}^{2})}}}\ {{\displaystyle~-A\left(\frac{z_{0}}{r_{i j}}\right)^{6}+A\left(\frac{z_{0}}{r_{c}}\right)^{6}}}\ {{\displaystyle\rho_{i j}^{2}=x_{i j}^{2}+y_{i j}^{2}~({\bf n_{i}}\equiv\hat{\bf z})}}\end{array}
$$  

It is important to have a sufficiently large cutoff to ensure smooth forces. Energies are shifted so that they go continuously to zero at the cutoff assuming that the exponential part of $V_{i j}$ (first term) decays sufficiently fast. This shift is achieved by the last term in the equation for $V_{i j}$ above.  

The provided parameter file (CC.Lebedeva) contains two sets of parameters.  

• The first set (element name $\begin{array}{r}{\tilde{\bf\Psi}^{\leftarrow}\ C\ '}\end{array}$ ) is suitable for normal conditions and is taken from (Popov1) • The second set (element name “C1”) is suitable for high-pressure conditions and is taken from (Koziol1)  

Both sets contain an additional parameter, $S$ , that can be used to facilitate scaling of energies and is set to 1.0 by default.  

# 4.144.4 Restrictions  

This pair style is part of the INTERLAYER package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.144.5 Related commands  

pair_coeff , pair_style none, pair_style hybrid/overlay, pair_style drip, pair_style ilp/graphene/hbd, pair_style kolmogorov/crespi/z, pair_style kolmogorov/crespi/full.  

# 4.144.6 Default  

none  

(Lebedeva1) I. V. Lebedeva, A. A. Knizhnik, A. M. Popov, Y. E. Lozovik, B. V. Potapkin, Phys. Rev. B, 84, 245437 (2011)   
(Lebedeva2) I. V. Lebedeva, A. A. Knizhnik, A. M. Popov, Y. E. Lozovik, B. V. Potapkin, Physica E: 44, 949-954 (2012)   
(Popov1) A.M. Popov, I. V. Lebedeva, A. A. Knizhnik, Y. E. Lozovik and B. V. Potapkin, Chem. Phys. Lett. 536, 82-86 (2012).   
(Koziol1) Z. Koziol, G. Gawlik and J. Jagielski, Chinese Phys. B 28, 096101 (2019).  

# 4.145 pair_style lepton command  

Accelerator Variants: lepton/omp, lepton/coul/comp, lepton/sphere/comp  

# 4.145.1 Syntax  

• style $=$ lepton or lepton/coul or lepton/sphere • args $=$ list of arguments for a particular style  

lepton args $=$ cutoff  

cutoff $=$ global cutoff for the interactions (distance units)   
lepton/coul args $=$ cutoff keyword cuto $\mathrm{f}=\mathrm{gl}$ obal cutoff for the interactions (distance units) zero or more keywords may be appended keyword $=$ ewald or pppm or msm or dispersion or tip4p   
lepton/sphere args $=$ cutoff cutoff $=$ global cutoff for the interactions (distance units)  

# 4.145.2 Examples  

pair_style lepton 2.5  
pair_coeff \* \* $"\mathrm{k}^{*}\big(\mathrm{(r-r0)}\hat{\mathbf{\nabla}}2^{*}\mathrm{step(r0-r)}\big)$ ; k=200; r0=1.5" 2.0  
pair_coeff 1 2 "4.0\*eps\*((sig/r)^12 - (sig/r)^6);eps=1.0;sig=1.0" 1.12246204830937  
pair_coeff 2 2 $^{"}\mathrm{eps}^{*}(2.0^{*}(\mathrm{sig}/\mathrm{r})^{\sim}9-3.0^{*}(\mathrm{sig}/\mathrm{r})^{\sim}6);\mathrm{eps=1.0;\mathrm{sig=1.0"}}$   
pair_coeff 1 3 $"\mathrm{zbl}(13,6,\mathrm{r})$ "  
pair_coeff 3 3 "(1.0-switch)\*zbl(6,6,r)-switch\*4.0\*eps\*((sig/r)^6);switch=0.5\*(tanh(10.0\*(r-sig))+1.0);, eps=0.05;sig=3.20723"  
pair_style lepton/coul 2.5  
pair_coeff 1 1 "qi\*qj/r" 4.0  
pair_coeff 1 2 "lj+coul; lj=4.0\*eps\*((sig/r)^12 - (sig/r)^6); eps=1.0; sig=1.0; coul=qi\*qj/r"  
pair_style lepton/coul 2.5 pppm  
kspace_style pppm 1.0e-4  
pair_coeff 1 1 "qi\*qj/r\*erfc(alpha\*r); alpha=1.067"  
pair_style lepton/sphere 2.5  
pair_coeff 1 $\mathbf{\mu}^{*}\mathbf{\mu}^{*}((\mathrm{r}\mathrm{-r}0)\hat{\mathbf{\eta}}^{*}2^{*}\mathrm{step}(\mathrm{r}0\mathrm{-r}))$ ; $\mathrm{k=200}$ ; $\mathrm{r0=}$ radi+radj"  
pair_coef $\mathrm{:2~2~^{\circ}4.0^{\circ}e p s^{\circ}((s i g/r)^{\circ}12\cdot(s i g/r)^{\circ}6)}$ ; eps $=1.0$ ; sig=2.0\*sqrt(radi\*radj)"  

# 4.145.3 Description  

Added in version 8Feb2023: added pair styles lepton and lepton/coul  

Changed in version $15\mathrm{Jun}2023$ : added pair style lepton/sphere  

Pair styles lepton, lepton/coul, lepton/sphere compute pairwise interactions between particles which depend on the distance and have a cutoff. The potential function must be provided as an expression string using “r” as the distance variable. With pair style lepton/coul one may additionally reference the charges of the two atoms of the pair with “qi” and “qj”, respectively. With pair style lepton/sphere one may instead reference the radii of the two atoms of the pair with “radi” and “radj”, respectively; this is half of the diameter that can be set in data files or the set command.  

Note that further constants in the expressions can be defined in the same string as additional expressions separated by semicolons as shown in the examples above.  

The expression ${}^{\cdot}200.0^{*}(r-l.5){\wedge}2^{,}$ represents a harmonic potential around the pairwise distance $r_{0}$ of 1.5 distance units and a force constant $K$ of 200.0 energy units:  

$$
U_{i j}=K(r-r_{0})^{2}
$$  

The expression “qi\*qj/r” represents a regular Coulombic potential with cutoff:  

$$
U_{i j}={\frac{C q_{i}q_{j}}{{\varepsilon}r}}\qquadr<r_{c}
$$  

The expression ${}^{\cdot}2O O.O^{*}(r.(r a d i+r a d j)^{\wedge}2^{,}$ represents a harmonic potential that has the equilibrium distance chosen so that the radii of the two atoms touch:  

$$
U_{i j}=K(r-(r_{i}+r_{j}))^{2}
$$  

The Lepton library, that the lepton pair style interfaces with, evaluates this expression string at run time to compute the pairwise energy. It also creates an analytical representation of the first derivative of this expression with respect to “r” and then uses that to compute the force between the pairs of particles within the given cutoff.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• Lepton expression (energy units) • cutoff (distance units)  

The Lepton expression must be either enclosed in quotes or must not contain any whitespace so that LAMMPS recognizes it as a single keyword. More on valid Lepton expressions below. The last coefficient is optional; it allows to set the cutoff for a pair of atom types to a different value than the global cutoff.  

For pair style lepton only the “lj” values of the special_bonds settings apply in case the interacting pair is also connected with a bond. The potential energy will only be added to the “evdwl” property.  

For pair style lepton/coul only the “coul” values of the special_bonds settings apply in case the interacting pair is als connected with a bond. The potential energy will only be added to the “ecoul” property.  

For pair style lepton/sphere only the “lj” values of the special_bonds settings apply in case the interacting pair is als connected with a bond. The potential energy will only be added to the “evdwl” property.  

In addition to the functions listed below, both pair styles support in addition a custom “zbl(zi,zj,r)” function which computes the Ziegler-Biersack-Littmark (ZBL) screened nuclear repulsion for describing high-energy collisions between atoms. For details of the function please see the documentation for pair style zbl. The arguments of the function are the atomic numbers of atom i (zi), atom j (zj) and the distance r. Please see the examples above.  

# 4.145.4 Lepton expression syntax and features  

Lepton supports the following operators in expressions:  

<html><body><table><tr><td>Add</td><td>Subtract</td><td>Multiply</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td>Divide</td><td></td><td>Power</td></tr></table></body></html>  

The following mathematical functions are available:  

<html><body><table><tr><td>sqrt(x)</td><td>Square root</td><td>exp(x)</td><td>Exponential</td></tr><tr><td>log(x)</td><td>Natural logarithm</td><td>sin(x)</td><td>Sine (angle in radians)</td></tr><tr><td>cos(x)</td><td>Cosine (angle in radians)</td><td>sec(x)</td><td>Secant (angle in radians)</td></tr><tr><td>cSC(x)</td><td>Cosecant (angle in radians)</td><td>tan(x)</td><td>Tangent (angle in radians)</td></tr><tr><td>cot(x)</td><td>Cotangent (angle in radians)</td><td>asin(x)</td><td>Inverse sine (in radians)</td></tr><tr><td>acos(x)</td><td>Inverse cosine (in radians)</td><td>atan(x)</td><td>Inverse tangent (in radians)</td></tr><tr><td>sinh(x)</td><td>Hyperbolic sine</td><td>cosh(x)</td><td>Hyperbolic cosine</td></tr><tr><td>tanh(x)</td><td>Hyperbolic tangent</td><td>erf(x)</td><td>Error function</td></tr><tr><td>erfc(x)</td><td>Complementary Error function</td><td>abs(x)</td><td>Absolutevalue</td></tr><tr><td>min(x,y)</td><td>Minimumoftwovalues</td><td>max(x,y)</td><td>Maximumoftwovalues</td></tr><tr><td>delta(x)</td><td>delta(x) is 1 for x = 0, otherwise 0</td><td>step(x)</td><td>step(x) is 0 for x < 0, otherwise 1</td></tr></table></body></html>  

Numbers may be given in either decimal or exponential form. All of the following are valid numbers: 5, -3.1, 1e6, and $3.l2e{-}2$ .  

As an extension to the standard Lepton syntax, it is also possible to use LAMMPS variables in the format “v_name”. Before evaluating the expression, “v_name” will be replaced with the value of the variable “name”. This is compatible with all kinds of scalar variables, but not with vectors, arrays, local, or per-atom variables. If necessary, a custom scalar variable needs to be defined that can access the desired (single) item from a non-scalar variable. As an example, the following lines will instruct LAMMPS to ramp the force constant for a harmonic bond from 100.0 to 200.0 during the next run:  

variable fconst equal ramp(100.0, 200) bond_style lepton bond_coeff 1 1.5 "v_fconst \* (r^2)"  

An expression may be followed by definitions for intermediate values that appear in the expression. A semicolon “;” is used as a delimiter between value definitions. For example, the expression:  

<html><body><table><tr><td>a^2+a*b+b~2;a=a1+a2;b=b1+b2</td></tr></table></body></html>  

is exactly equivalent to  

$$
\scriptstyle\overbrace{(({\mathrm{a}}1+{\mathrm{a}}2)\cdot2+({\mathrm{a}}1+{\mathrm{a}}2)^{*}({\mathrm{b}}1+{\mathrm{b}}2)+({\mathrm{b}}1+{\mathrm{b}}2)\cdot2}
$$  

The definition of an intermediate value may itself involve other intermediate values. Whitespace and quotation characters (’'’ and ‘”’) are ignored. All uses of a value must appear before that value’s definition. For efficiency reasons, the expression string is parsed, optimized, and then stored in an internal, pre-parsed representation for evaluation.  

Evaluating a Lepton expression is typically between 2.5 and 5 times slower than the corresponding compiled and optimized $\mathrm{C}{+}{+}$ code. If additional speed or GPU acceleration (via GPU or KOKKOS) is required, the interaction can be represented as a table. Suitable table files can be created either internally using the pair_write or bond_write command or through the Python scripts in the tools/tabulate folder.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.145.5 Mixing, shift, table, tail correction, restart, rRESPA info  

Pair styles lepton, lepton/coul, and lepton/sphere do not support mixing. Thus, expressions for all I,J pairs must be specified explicitly.  

Only pair style lepton supports the pair_modify shift option for shifting the potential energy of the pair interaction so that it is 0 at the cutoff, pair styles lepton/coul and lepton/sphere do not.  

The pair_modify table options are not relevant for the these pair styles.  

These pair styles do not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.145.6 Restrictions  

These pair styles are part of the LEPTON package and only enabled if LAMMPS was built with this package. See the Build package page for more info.  

Pair style lepton/coul requires that atom atoms have a charge property, e.g. via atom_style charge.   
Pair style lepton/sphere requires that atom atoms have a radius property, e.g. via atom_style sphere.  

# 4.145.7 Related commands  

pair_coeff , pair_style python, pair_style table, pair_write  

# 4.145.8 Default  

none  

# 4.146 pair_style line/lj command  

# 4.146.1 Syntax  

# 4.146.3 Description  

Style line/lj treats particles which are line segments as a set of small spherical particles that tile the line segment length as explained below. Interactions between two line segments, each with N1 and N2 spherical particles, are calculated as the pairwise sum of ${\bf N}1^{*}{\bf N}2$ Lennard-Jones interactions. Interactions between a line segment with N spherical particles and a point particle are treated as the pairwise sum of N Lennard-Jones interactions. See the pair_style lj/cut page for the definition of Lennard-Jones interactions.  

The set of non-overlapping spherical sub-particles that represent a line segment are generated in the following manner. Their size is a function of the line segment length and the specified sub-particle size for that particle type. If a line segment has a length $\mathrm{L}$ and is of type I, then the number of spheres N that represent the segment is calculated as $\mathbf{N}$ $=\mathrm{L}/\mathrm{sizeI}$ , rounded up to an integer value. Thus if L is not evenly divisible by sizeI, N is incremented to include one extra sphere. The centers of the spheres are spaced equally along the line segment. Imagine $_{\mathrm{N}+1}$ equally-space points, which include the 2 end points of the segment. The sphere centers are halfway between each pair of points.  

The LJ interaction between 2 spheres on different line segments (or a sphere on a line segment and a point particles) is computed with sub-particle ε, $\sigma$ , and cutoff values that are set by the pair_coeff command, as described below. If the distance between the 2 spheres is greater than the sub-particle cutoff, there is no interaction. This means that some pairs of sub-particles on 2 line segments may interact, but others may not.  

For purposes of creating the neighbor list for pairs of interacting line segments or lines/point particles, a regular particleparticle cutoff is used, as defined by the cutoff setting above in the pair_style command or overridden with an optional argument in the pair_coeff command for a type pair as discussed below. The distance between the centers of 2 line segments, or the center of a line segment and a point particle, must be less than this distance (plus the neighbor skin; see the neighbor command), for the pair of particles to be included in the neighbor list.  

![](images/38d84833a277b8133e24c64d24a6b79a22e645355424ee8a80fcf1d564e4ef53.jpg)  

# Note  

This means that a too-short value for the cutoff setting can exclude a pair of particles from the neighbor list even if pairs of their sub-particle spheres would interact, based on the sub-particle cutoff specified in the pair_coeff command. E.g. sub-particles at the ends of the line segments that are close to each other. Which may not be what you want, since it means the ends of 2 line segments could pass through each other. It is up to you to specify a cutoff setting that is consistent with the length of the line segments you are using and the sub-particle cutoff settings.  

For style line/lj, the following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• sizeI (distance units) • sizeJ (distance units) • ε (energy units) • $\sigma$ (distance units) • subcutoff (distance units) • cutoff (distance units)  

The sizeI and sizeJ coefficients are the sub-particle sizes for line particles of type I and type J. They are used to define the N sub-particles per segment as described above. These coefficients are actually stored on a per-type basis. Thus if there are multiple pair_coeff commands that involve type I, as either the first or second atom type, you should use consistent values for sizeI or sizeJ in all of them. If you do not do this, the last value specified for sizeI will apply to all segments of type I. If typeI or typeJ refers to point particles, the corresponding sizeI or sizeJ is ignored; it can be set to 0.0.  

The ε, σ , and subcutoff coefficients are used to compute an LJ interactions between a pair of sub-particles on 2 line segments (of type I and J), or between a sub particle/point particle pair. As discussed above, the subcutoff and cutoff params are different. The latter is only used for building the neighbor list when the distance between centers of two line segments or one segment and a point particle is calculated.  

The cutoff coefficient is optional. If not specified, the global cutoff is used.  

# 4.146.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , coefficients must be specified. No default mixing rules are used.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.146.5 Restrictions  

This style is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Defining particles to be line segments so they participate in line/line or line/particle interactions requires the use the atom_style line command.  

# 4.146.6 Related commands  

pair_coeff , pair_style tri/lj  

# 4.146.7 Default  

none  

# 4.147 pair_style list command  

# 4.147.1 Syntax  

pair_style list listfile cutoff keyword  

• listfile $=$ name of file with list of pairwise interactions • cutof $=$ global cutoff (distance units) • keyword $=$ optional flag nocheck or check (default is check)  

# 4.147.2 Examples  

pair_style list restraints.txt 200.0   
pair_coeff \* \*   
pair_style hybrid/overlay lj/cut 1.1225 list pair_list.txt 300.0   
pair_coeff \* \* lj/cut 1.0 1.0   
pair_coeff 3\* 3\* list  

# 4.147.3 Description  

Style list computes interactions between explicitly listed pairs of atoms with the option to select functional form and parameters for each individual pair. Because the parameters are set in the list file, the pair_coeff command has no parameters (but still needs to be provided). The check and nocheck keywords enable/disable tests that checks whether all listed pairs of atom IDs were present and the interactions computed. If nocheck is set and either atom ID is not present, the interaction is skipped.  

This pair style can be thought of as a hybrid between bonded, non-bonded, and restraint interactions. It will typically be used as an additional interaction within the hybrid/overlay pair style. It currently supports three interaction styles: a 12-6 Lennard-Jones, a Morse and a harmonic potential.  

The format of the list file is as follows:  

• one line per pair of atoms • empty lines will be ignored • comment text starts with a ‘#’ character • line syntax: ID1 ID2 style coeffs cutoff  

ID1 = atom ID of first atom $\mathrm{ID2=}$ atom ID of second atom style $=$ style of interaction coeffs $=$ list of coeffs cutoff $=$ cutoff for interaction (optional)  

The cutoff parameter is optional for all but the quartic interactions. If it is not specified, the global cutoff is used.  

Here is an example file:  

<html><body><table><tr><td>this is a comment</td></tr><tr><td>15 259 lj126 1.0 1.0 50.0</td></tr><tr><td>15603 morse 10.01.22.0 10.0 # and another comment</td></tr><tr><td>18 470 harmonic 50.0 1.2 5.0</td></tr><tr><td>19 332 quartic 10.0 5.0 -1.2 1.2</td></tr><tr><td></td></tr></table></body></html>  

The style lj126 computes pairwise interactions with the formula  

$$
E=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{12}-\left({\frac{\sigma}{r}}\right)^{6}\right]\qquadr<r_{c}
$$  

and the coefficients:  

• ε (energy units) • $\sigma$ (distance units)  

The style morse computes pairwise interactions with the formula  

$$
E=D_{0}\left[1-e^{-\alpha(r-r_{0})}\right]^{2}r<r_{c}
$$  

and the coefficients:  

• $D_{0}$ (energy units) • $\alpha$ (1/distance units) • $r_{0}$ (distance units)  

The style harmonic computes pairwise interactions with the formula  

$$
E=K(r-r_{0})^{2}r<r_{c}
$$  

and the coefficients:  

• $K$ (energy units) • $r_{0}$ (distance units)  

Note that the usual $1/2$ factor is included in $K$ .  

The style quartic computes pairwise interactions with the formula  

$$
E=K(r-r_{0})^{2}(r-r_{0}-b_{1})(r-r_{0}-b_{2})\qquadr<r_{c}
$$  

and the coefficients:  

• $K$ (energy units) • $r_{0}$ (distance units) • $b_{1}$ (distance units) • $b_{2}$ (distance units)  

# 4.147.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing since all parameters are explicit for each pair.  

The pair_modify shift option is supported by this pair style.  

The pair_modify table and tail options are not relevant for this pair style.  

This pair style does not write its information to binary restart files, so pair_style and pair_coeff commands need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.147.5 Restrictions  

This pair style does not use a neighbor list and instead identifies atoms by their IDs. This has two consequences: 1) The cutoff has to be chosen sufficiently large, so that the second atom of a pair has to be a ghost atom on the same node on which the first atom is local; otherwise the interaction will be skipped. You can use the check option to detect, if interactions are missing. 2) Unlike other pair styles in LAMMPS, an atom I will not interact with multiple images of atom J (assuming the images are within the cutoff distance), but only with the closest image.  

This style is part of the MISC package. It is only enabled if LAMMPS is build with that package. See the Build package page on for more info.  

# 4.147.6 Related commands  

pair_coeff , pair_style hybrid/overlay, pair_style lj/cut, bond_style morse, bond_style harmonic bond_style quartic  

# 4.147.7 Default  

none  

# 4.148 pair_style lj/cut command  

Accelerator Variants: lj/cut/gpu, lj/cut/intel, lj/cut/kk, lj/cut/opt, lj/cut/omp  

# 4.148.1 Syntax  

• style = lj/cut args $=$ list of arguments for a particular style  

lj/cut args $=$ cutoff cutoff $=$ global cutoff for Lennard Jones interactions (distance units)  

# 4.148.2 Examples  

pair_style lj/cut 2.5   
pair_coeff \* \* 1 1   
pair_coeff 1 1 1 1.1 2.8  

# 4.148.3 Description  

The lj/cut styles compute the standard 12/6 Lennard-Jones potential, given by  

$$
E=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{12}-\left({\frac{\sigma}{r}}\right)^{6}\right]\qquadr<r_{c}
$$  

$r_{c}$ is the cutoff.  

See the lj/cut/coul styles to add a Coulombic pairwise interaction and the lj/cut/tip4p styles to add the TIP4P water model.  

# 4.148.4 Coefficients  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • LJ cutoff (distance units)  

The last coefficient is optional. If not specified, the global LJ cutoff specified in the pair_style command is used.  

Note that $\sigma$ is defined in the LJ formula as the zero-crossing distance for the potential, not as the energy minimum a $r_{0}=2^{\frac{1}{6}}\sigma$ . The _same_ potential function becomes:  

$$
E=\varepsilon\left[\left(\frac{r_{0}}{r}\right)^{12}-2\left(\frac{r_{0}}{r}\right)^{6}\right]\qquadr<r_{c}
$$  

When using the minimum as reference width. In the literature both formulations are used, but the describe the same potential, only the $\sigma$ value must be computed by $\sigma=r_{0}/2^{\frac{1}{6}}$ for use with LAMMPS, if this latter formulation is used.  

A version of these styles with a soft core, lj/cut/soft, suitable for use in free energy calculations, is part of the FEP package and is documented with the pair_style \*/soft styles.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.148.5 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of the lj/cut pair styles can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

All of the lj/cut pair styles support the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction.  

All of the lj/cut pair styles support the pair_modify tail option for adding a long-range tail correction to the energy and pressure for the Lennard-Jones portion of the pair interaction.  

All of the lj/cut pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

The lj/cut pair styles support the use of the inner, middle, and outer keywords of the run_style respa command, meaning the pairwise forces can be partitioned by distance at different levels of the rRESPA hierarchy. The other styles only support the pair keyword of run_style respa. See the run_style command for details.  

# 4.148.6 Related commands  

• pair_coeff • pair_style lj/cut/coul/cut • pair_style lj/cut/coul/debye • pair_style lj/cut/coul/dsf • pair_style lj/cut/coul/long • pair_style lj/cut/coul/msm • pair_style lj/cut/coul/wolf • pair_style lj/cut/tip4p/cut • pair_style lj/cut/tip4p/long  

# 4.148.7 Default  

none  

# 4.149 pair_style lj96/cut command  

Accelerator Variants: lj96/cut/gpu, lj96/cut/omp  

# 4.149.1 Syntax  

• cutof $=$ global cutoff for lj96/cut interactions (distance units)  

# 4.149.2 Examples  

pair_style lj96/cut 2.5   
pair_coeff \* \* 1.0 1.0 4.0   
pair_coeff 1 1 1.0 1.0  

# 4.149.3 Description  

The lj96/cut style compute a 9/6 Lennard-Jones potential, instead of the standard 12/6 potential, given by  

$$
E=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{9}-\left({\frac{\sigma}{r}}\right)^{6}\right]\qquadr<r_{c}
$$  

$r_{c}$ is the cutoff.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • σ (distance units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global LJ cutoff specified in the pair_style command is used.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.149.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of the lj/cut pair styles can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style supports the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style supports the pair_modify tail option for adding a long-range tail correction to the energy and pressure of the pair interaction.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style supports the use of the inner, middle, and outer keywords of the run_style respa command, meaning the pairwise forces can be partitioned by distance at different levels of the rRESPA hierarchy. See the run_style command for details.  

# 4.149.5 Restrictions  

This pair style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.149.6 Related commands  

pair_coeff  

# 4.149.7 Default  

none  

# 4.150 pair_style lj/cubic command  

Accelerator Variants: lj/cubic/gpu, lj/cubic/omp  

# 4.150.1 Syntax  

continuous at the inflection point. The cubic coefficient A3 is chosen so that both energy and force go to zero at the cutoff distance. Outside the cutoff distance the energy and force are zero.  

$$
\begin{array}{l}{{E=u_{L J}(r)r\leq r_{s}}}\ {{\quad=u_{L J}(r_{s})+(r-r_{s})u_{L J}^{\prime}(r_{s})-\displaystyle\frac{1}{6}A_{3}(r-r_{s})^{3}\qquadr_{s}<r\leq r_{c}}}\ {{\quad=0\qquadr>r_{c}}}\end{array}
$$  

The location of the inflection point $r_{s}$ is defined by the LJ diameter, $r_{s}/\sigma=(26/7)^{1/6}$ . The cutoff distance is defined by $r_{c}/r_{s}=67/48$ or $r_{c}/\sigma=1.737..$ . The analytic expression for the the cubic coefficient $A_{3}r_{m i n}^{3}/\varepsilon=27.93...$ is given in the paper by Holian and Ravelo (Holian).  

This potential is commonly used to study the shock mechanics of FCC solids, as in Ravelo et al. (Ravelo).  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

$$
\begin{array}{l}{\cdot\varepsilon(\mathrm{energyunits})}\ {\cdot\sigma(\mathrm{distanceunits})}\end{array}
$$  

Note that $\sigma$ is defined in the LJ formula as the zero-crossing distance for the potential, not as the energy minimum, which is located at $r_{m i n}=2^{\frac{1}{6}}\sigma$ . In the above example, $\sigma=\mathrm{{}}0.8908987$ , so $r_{m i n}=1.0$ .  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.150.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of the lj/cut pair styles can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

The lj/cubic pair style does not support the pair_modify shift option, since pair interaction is already smoothed to 0.0 at the cutoff.  

The pair_modify table option is not relevant for this pair style.  

The lj/cubic pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure, since there are no corrections for a potential that goes to 0.0 at the cutoff.  

The lj/cubic pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

The lj/cubic pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.150.5 Restrictions  

This pair style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.150.6 Related commands  

pair_coeff  

# 4.150.7 Default  

none  

(Holian) Holian and Ravelo, Phys Rev B, 51, 11275 (1995).   
(Ravelo) Ravelo, Holian, Germann and Lomdahl, Phys Rev B, 70, 014103 (2004).  

# 4.151 pair_style lj/cut/coul/cut command  

Accelerator Variants: lj/cut/coul/cut/gpu, lj/cut/coul/cut/kk, lj/cut/coul/cut/omp  

# 4.152 pair_style lj/cut/coul/debye command  

Accelerator Variants: lj/cut/coul/debye/gpu, lj/cut/coul/debye/kk, lj/cut/coul/debye/omp  

# 4.153 pair_style lj/cut/coul/dsf command  

Accelerator Variants: lj/cut/coul/dsf/gpu, lj/cut/coul/dsf/kk, lj/cut/coul/dsf/omp  

# 4.154 pair_style lj/cut/coul/long command  

Accelerator Variants: lj/cut/coul/long/gpu, lj/cut/coul/long/kk, lj/cut/coul/long/intel, lj/cut/coul/long/opt, lj/cut/coul/long/omp  

# 4.155 pair_style lj/cut/coul/msm command  

Accelerator Variants: lj/cut/coul/msm/gpu, lj/cut/coul/msm/omp  

# 4.156 pair_style lj/cut/coul/wolf command  

Accelerator Variants: lj/cut/coul/wolf/omp  

# 4.156.1 Syntax  

pair_style style args  

• style $=$ lj/cut/coul/cut or lj/cut/coul/debye or lj/cut/coul/dsf or lj/cut/coul/long lj/cut/coul/msm or lj/cut/coul/wolf • args $=$ list of arguments for a particular style  

lj/cut/coul/cut args = cutoff (cutoff2) cutoff = global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
lj/cut/coul/debye args = kappa cutoff (cutoff2) kappa = inverse of the Debye length (inverse distance units) cutoff = global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
lj/cut/coul/dsf args = alpha cutoff (cutoff2) alpha = damping parameter (inverse distance units) cutoff = global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (distance units)   
lj/cut/coul/long args = cutoff (cutoff2) cutoff = global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
lj/cut/coul/msm args = cutoff (cutoff2) cutoff = global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
lj/cut/coul/wolf args $=$ alpha cutoff (cutoff2) alpha $=$ damping parameter (inverse distance units) cutoff $=$ global cutoff for LJ (and Coulombic if only 2 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)  

# 4.156.2 Examples  

pair_style lj/cut/coul/cut 10.0   
pair_style lj/cut/coul/cut 10.0 8.0   
pair_coeff \* \* 100.0 3.0   
pair_coeff 1 1 100.0 3.5 9.0   
pair_coeff 1 1 100.0 3.5 9.0 9.0   
pair_style lj/cut/coul/debye 1.5 3.0   
pair_style lj/cut/coul/debye 1.5 2.5 5.0   
pair_coeff \* \* 1.0 1.0   
pair_coeff 1 1 1.0 1.5 2.5   
pair_coeff 1 1 1.0 1.5 2.5 5.0   
pair_style lj/cut/coul/dsf 0.05 2.5 10.0   
pair_coeff \* \* 1.0 1.0   
pair_coeff 1 1 1.0 1.0 2.5   
pair_style lj/cut/coul/long 10.0   
pair_style lj/cut/coul/long 10.0 8.0   
pair_coeff \* \* 100.0 3.0   
pair_coeff 1 1 100.0 3.5 9.0   
pair_style lj/cut/coul/msm 10.0   
pair_style lj/cut/coul/msm 10.0 8.0   
pair_coeff \* \* 100.0 3.0   
pair_coeff 1 1 100.0 3.5 9.0   
pair_style lj/cut/coul/wolf 0.2 5. 10.0   
pair_coeff \* \* 1.0 1.0   
pair_coeff 1 1 1.0 1.0 2.5  

# 4.156.3 Description  

The lj/cut/coul styles compute the standard 12/6 Lennard-Jones potential, given by  

$$
E=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{12}-\left({\frac{\sigma}{r}}\right)^{6}\right]\qquadr<r_{c}
$$  

$r_{c}$ is the cutoff.  

Style lj/cut/coul/cut adds a Coulombic pairwise interaction given by  

$$
E={\frac{C q_{i}q_{j}}{\varepsilon r}}\qquadr<r_{c}
$$  

where $C$ is an energy-conversion constant, $q_{i}$ and $q_{j}$ are the charges on the two atoms, and $\varepsilon$ is the dielectric constant which can be set by the dielectric command. If one cutoff is specified in the pair_style command, it is used for both the LJ and Coulombic terms. If two cutoffs are specified, they are used as cutoffs for the LJ and Coulombic terms respectively.  

Style lj/cut/coul/debye adds an additional exp() damping factor to the Coulombic term, given by  

$$
E={\frac{C q_{i}q_{j}}{\varepsilon r}}\exp(-\kappa r)\qquadr<r_{c}
$$  

where $\kappa$ is the inverse of the Debye length. This potential is another way to mimic the screening effect of a polar solvent.  

Style lj/cut/coul/dsf computes the Coulombic term via the damped shifted force model described in Fennell, given by:  

$$
E=q_{i}q_{j}\left[\frac{\mathrm{erfc}(\alpha r)}{r}-\frac{\mathrm{erfc}(\alpha r_{c})}{r_{c}}+\left(\frac{\mathrm{erfc}(\alpha r_{c})}{r_{c}^{2}}+\frac{2\alpha}{\sqrt{\pi}}\frac{\mathrm{exp}(-\alpha^{2}r_{c}^{2})}{r_{c}}\right)(r-r_{c})\right]\qquadr<r_{c}
$$  

where $\alpha$ is the damping parameter and erfc() is the complementary error-function. This potential is essentially a short-range, spherically-truncated, charge-neutralized, shifted, pairwise $l/r$ summation. The potential is based on Wolf summation, proposed as an alternative to Ewald summation for condensed phase systems where charge screening causes electrostatic interactions to become effectively short-ranged. In order for the electrostatic sum to be absolutely convergent, charge neutralization within the cutoff radius is enforced by shifting the potential through placement of image charges on the cutoff sphere. Convergence can often be improved by setting $\alpha$ to a small non-zero value.  

Styles lj/cut/coul/long and lj/cut/coul/msm compute the same Coulombic interactions as style lj/cut/coul/cut except that an additional damping factor is applied to the Coulombic term so it can be used in conjunction with the kspace_style command and its ewald or pppm option. The Coulombic cutoff specified for this style means that pairwise interactions within this distance are computed directly; interactions outside that distance are computed in reciprocal space.  

Style lj/cut/coul/wolf adds a Coulombic pairwise interaction via the Wolf summation method, described in Wolf , given by:  

$$
E_{i}=\frac{1}{2}\sum_{j\neq i}\frac{q_{i}q_{j}\mathrm{erfc}(\alpha r_{i j})}{r_{i j}}+\frac{1}{2}\sum_{j\neq i}\frac{q_{i}q_{j}\mathrm{erf}(\alpha r_{i j})}{r_{i j}}\qquadr<r_{c}
$$  

where $\alpha$ is the damping parameter, and erfc() is the complementary error-function terms. This potential is essentially a short-range, spherically-truncated, charge-neutralized, shifted, pairwise $l/r$ summation. With a manipulation of adding and subtracting a self term (for $\mathrm{i}=\mathrm{j}$ ) to the first and second term on the right-hand-side, respectively, and a small enough $\alpha$ damping parameter, the second term shrinks and the potential becomes a rapidly-converging real-space summation. With a long enough cutoff and small enough $\alpha$ parameter, the energy and forces calculated by the Wolf summation method approach those of the Ewald sum. So it is a means of getting effective long-range interactions with a short-range potential.  

# 4.156.4 Coefficients  

For all of the lj/cut/coul pair styles, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • cutoff1 (distance units) • cutoff2 (distance units)  

Note that $\sigma$ is defined in the LJ formula as the zero-crossing distance for the potential, not as the energy minimum at $2^{\frac{1}{6}}\sigma$ .  

The latter 2 coefficients are optional. If not specified, the global LJ and Coulombic cutoffs specified in the pair_style command are used. If only one cutoff is specified, it is used as the cutoff for both LJ and Coulombic interactions for this type pair. If both coefficients are specified, they are used as the LJ and Coulombic cutoffs for this type pair.  

For lj/cut/coul/long and lj/cut/coul/msm only the LJ cutoff can be specified since a Coulombic cutoff cannot be specified for an individual I,J type pair. All type pairs use the same global Coulombic cutoff specified in the pair_style command.  

A version of these styles with a soft core, lj/cut/coul/softand lj/cut/coul/long/soft, suitable for use in free energy calculations, is part of the FEP package and is documented with the pair_style \*/soft styles.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.156.5 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of the lj/cut pair styles can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

All of the lj/cut pair styles support the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction.  

The lj/cut/coul/long pair styles support the pair_modify table option since they can tabulate the short-range portion of the long-range Coulombic interaction.  

All of the lj/cut pair styles support the pair_modify tail option for adding a long-range tail correction to the energy and pressure for the Lennard-Jones portion of the pair interaction.  

All of the lj/cut pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

The lj/cut/coul/long pair styles support the use of the inner, middle, and outer keywords of the run_style respa command, meaning the pairwise forces can be partitioned by distance at different levels of the rRESPA hierarchy. The other styles only support the pair keyword of run_style respa. See the run_style command for details.  

# 4.156.6 Restrictions  

The lj/cut/coul/long and lj/cut/coul/msm styles are part of the KSPACE package.   
The lj/cut/coul/debye, lj/cut/coul/dsf, and lj/cut/coul/wolf styles are part of the EXTRA-PAIR package.   
These styles are only enabled if LAMMPS was built with those respective packages. See the Build package page for more info.  

# 4.156.7 Related commands  

pair_coeff  

# 4.156.8 Default  

none  

(Wolf) D. Wolf, P. Keblinski, S. R. Phillpot, J. Eggebrecht, J Chem Phys, 110, 8254 (1999).  

(Fennell) C. J. Fennell, J. D. Gezelter, J Chem Phys, 124, 234104 (2006).  

# 4.157 pair_style lj/cut/sphere command  

Accelerator Variant: lj/cut/sphere/omp  

# 4.157.1 Syntax  

$r_{c}$ is the cutoff ratio.  

This is the same potential function used by the lj/cut pair style, but the $\sigma_{i j}$ parameter is not set as a per-type parameter via the pair_coeff command. Instead it is calculated individually for each pair using the per-atom diameter attribute of atom_style sphere for the two atoms as $\sigma_{i}$ and $\sigma_{j}$ ; $\sigma_{i j}$ is then computed by the mixing rule for pair coefficients as set by the pair_modify mix command (defaults to geometric mixing). The cutoff is not specified as a distance, but as ratio that is internally multiplied by $\sigma_{i j}$ to obtain the actual cutoff for each pair of atoms.  

Note that $\sigma_{i j}$ is defined in the LJ formula above as the zero-crossing distance for the potential, not as the energy minimum which is at $2^{\frac{1}{6}}\sigma_{i j}$ .  

# $\Theta$ Notes on cutoffs, neighbor lists, and efficiency  

If your system is mildly polydisperse, meaning the ratio of the diameter of the largest particle to the smallest is less than 2.0, then the neighbor lists built by the code should be reasonably efficient. Which means they will not contain too many particle pairs that do not interact. However, if your system is highly polydisperse (ratio $>2.0$ ), the neighbor list build and force computations may be inefficient. There are two ways to try and speed up the simulations.  

The first is to assign atoms to different atom types so that atoms of each type are similar in size. E.g. if particle diameters range from 1 to 5 use 4 atom types, ensuring atoms of type 1 have diameters from 1.0-2.0, type 2 from 2.0-3.0, etc. This will reduce the number of non-interacting pairs in the neighbor lists and thus reduce the time spent on computing pairwise interactions.  

The second is to use the neighbor multi command which enabled a different algorithm for building neighbor lists. This will also require that you assign multiple atom types according to diameters, but will in addition use a more efficient size-dependent strategy to construct the neighbor lists and thus reduce the time spent on building neighbor lists.  

Here are example input script commands using both ideas for a highly polydisperse system:  

units lj   
atom_style sphere   
lattice fcc 0.8442   
region box block 0 10 0 10 0 10   
create_box 2 box   
create_atoms 1 box   
$\#$ create atoms with random diameters from bimodal distribution   
variable switch atom random(0.0,1.0,345634)   
variable diam atom (v_switch $<$ <0.75)\*normal(0.4,0.075,325)+(v_switch $>$ =0.7) $^*$ normal(1.2,0.2,453)   
set group all diameter v_diam   
$\#$ assign type 2 to atoms with diameter > 0.6   
variable large atom (2.0\*radius)>0.6   
group large variable large   
set group large type 2   
pair_style lj/cut/sphere 2.5   
pair_coeff \* \* 1.0   
neighbor 0.3 multi  

Using multiple atom types speeds up the calculation for this example by more than a factor of 2, and using the multi-style neighbor list build causes an additional speedup of about 20 percent.  

# 4.157.4 Coefficients  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • LJ cutoff ratio (unitless) (optional)  

The last coefficient is optional. If not specified, the global LJ cutoff ratio specified in the pair_style command is used. If a repulsive only LJ interaction is desired, the coefficient for the cutoff ratio should be set to the minimum of the L potential using $\$(2.0\hat{\textmd{(1.0/6.0)}})$  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.157.5 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon coefficients and cutoff ratio for the lj/cut/sphere pair style can be mixed.   
The default mixing style is geometric. See the pair_modify command for details.  

The lj/cut/sphere pair style supports the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction.  

The lj/cut/sphere pair style does not support the pair_modify tail option for adding a long-range tail corrections to the energy and pressure.  

The lj/cut/sphere pair style writes its information to binary restart files, so pair_style and pair_coeff commands do no need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.157.6 Restrictions  

The lj/cut/sphere pair style is only enabled if LAMMPS was built with the EXTRA-PAIR package. See the Build package page for more info.  

The lj/cut/sphere pair style does not support the sixthpower mixing rule.  

# 4.157.7 Related commands  

• pair_coeff • pair_style lj/cut • pair_style lj/expnd/sphere  

# 4.157.8 Default  

none  

# 4.158 pair_style lj/cut/tip4p/cut command  

Accelerator Variants: lj/cut/tip4p/cut/omp  

# 4.159 pair_style lj/cut/tip4p/long command  

Accelerator Variants: lj/cut/tip4p/long/gpu, lj/cut/tip4p/long/omp, lj/cut/tip4p/long/opt  

# 4.159.1 Syntax  

• style $=$ lj/cut/tip4p/cut or lj/cut/tip4p/long • args $=$ list of arguments for a particular style $\mathrm{lj/cut/tip4p/c}\imath$ ut args $=$ otype htype btype atype qdist cutoff (cutoff2) otype,htype $=$ atom types (numeric or type label) for TIP4P O and H btype,atype $=$ bond and angle types (numeric or type label) for TIP4P waters qdist $=$ distance from O atom to massless charge (distance units) cutoff $=$ global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units) lj/cut/tip4p/long args $=$ otype htype btype atype qdist cutoff (cutoff2) otype,htype = atom types (numeric or type label) for TIP4P O and H btype,atype = bond and angle types (numeric or type label) for TIP4P waters qdist $=$ distance from O atom to massless charge (distance units) cutoff $=$ global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)  

# 4.159.2 Examples  

pair_style lj/cut/tip4p/cut 1 2 7 8 0.15 12.0   
pair_style lj/cut/tip4p/cut 1 2 7 8 0.15 12.0 10.0   
pair_coeff \* \* 100.0 3.0   
pair_coeff 1 1 100.0 3.5 9.0   
pair_style lj/cut/tip4p/long 1 2 7 8 0.15 12.0   
pair_style lj/cut/tip4p/long 1 2 7 8 0.15 12.0 10.0   
pair_coeff \* \* 100.0 3.0   
pair_coeff 1 1 100.0 3.5 9.0   
pair_style lj/cut/tip4p/long OW HW HW-OW HW-OW-HW 0.15 12.0  

(continues on next page)  

(continued from previous page)  

labelmap atom 1 OW 2 HW labelmap bond 1 HW-OW labelmap angle 1 HW-OW-HW pair_coeff \* \* 100.0 3.0 pair_coeff OW OW 100.0 3.5 9.0  

# 4.159.3 Description  

The lj/cut/tip4p styles implement the TIP4P water model of (Jorgensen) and similar models, which introduce a massless site M located a short distance away from the oxygen atom along the bisector of the HOH angle. The atomic types of the oxygen and hydrogen atoms, the bond and angle types for OH and HOH interactions, and the distance to the massless charge site are specified as pair_style arguments and are used to identify the TIP4P-like molecules and determine the position of the M site from the positions of the hydrogen and oxygen atoms of the water molecules. The M site location is used for all Coulomb interactions instead of the oxygen atom location, also with all other atom types, while the location of the oxygen atom is used for the Lennard-Jones interactions. Style lj/cut/tip4p/cut uses a cutoff for Coulomb interactions; style lj/cut/tip4p/long is for use with a long-range Coulombic solver (Ewald or PPPM).  

![](images/39d5b33319149e05a29a83f4abe340fc3b7753f38f3596cb1cb26e1ed9a43116.jpg)  

# Note  

For each TIP4P water molecule in your system, the atom IDs for the $\mathrm{o}$ and $2\textrm{H}$ atoms must be consecutive, with the O atom first. This is to enable LAMMPS to “find” the $2\mathrm{{H}}$ atoms associated with each O atom. For example, if the atom ID of an O atom in a TIP4P water molecule is 500, then its $2\mathrm{~H~}$ atoms must have IDs 501 and 502.  

![](images/924b1917a8928a52c90fc2e9e3aba1df31d7204ff39b8f1f457aeadde9d88bf7.jpg)  

# Note  

If using type labels, the type labels must be defined before calling the pair_coeff command.  

See the Howto tip4p page for more information on how to use the TIP4P pair styles and lists of parameters to set. Note that the neighbor list cutoff for Coulomb interactions is effectively extended by a distance $2^{*}$ qdist when using the TIP4P pair style, to account for the offset distance of the fictitious charges on O atoms in water molecules. Thus it is typically best in an efficiency sense to use a LJ cutoff $>=$ Coulombic cutoff $+2^{*}$ qdist, to shrink the size of the neighbor list. This leads to slightly larger cost for the long-range calculation, so you can test the trade-off for your model.  

The lj/cut/tip4p styles compute the standard 12/6 Lennard-Jones potential, given by  

$$
E=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{12}-\left({\frac{\sigma}{r}}\right)^{6}\right]\qquadr<r_{c}
$$  

$r_{c}$ is the cutoff.  

They add Coulombic pairwise interactions given by  

$$
E={\frac{C q_{i}q_{j}}{\varepsilon r}}\qquadr<r_{c}
$$  

where $C$ is an energy-conversion constant, $q_{i}$ and $q_{j}$ are the charges on the two atoms, and $\varepsilon$ is the dielectric constant which can be set by the dielectric command. If one cutoff is specified in the pair_style command, it is used for both the LJ and Coulombic terms. If two cutoffs are specified, they are used as cutoffs for the LJ and Coulombic terms respectively.  

Style lj/cut/tip4p/long compute the same Coulombic interactions as style lj/cut/tip4p/cut except that an additional damping factor is applied to the Coulombic term so it can be used in conjunction with the kspace_style command and its ewald or pppm option. The Coulombic cutoff specified for this style means that pairwise interactions within this distance are computed directly; interactions outside that distance are computed in reciprocal space.  

# 4.159.4 Coefficients  

For all of the lj/cut pair styles, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • LJ cutoff (distance units)  

Note that $\sigma$ is defined in the LJ formula as the zero-crossing distance for the potential, not as the energy minimum at $2^{\frac{1}{6}}\sigma$ .  

The last coefficient is optional. If not specified, the global LJ cutoff specified in the pair_style command is used.  

For lj/cut/tip4p/cut and lj/cut/tip4p/long only the LJ cutoff can be specified since a Coulombic cutoff cannot be specified for an individual I,J type pair. All type pairs use the same global Coulombic cutoff specified in the pair_style command.  

![](images/d66a5721c097ab1422f14a747b42e9775ac118b0d839752f609f24a6fb7ffebc.jpg)  

# Warning  

Because of how these pair styles implement the coulomb interactions by implicitly defining a fourth site for the negative charge of the TIP4P and similar water models, special care must be taken when using these pair styles with other computations that also use charges. Unless they are specially set up to also handle the implicit definition of the 4th site, results are likely incorrect. Example: compute dipole/chunk. For the same reason, when using one of these pair styles with pair_style hybrid, all coulomb interactions should be handled by a single sub-style with TIP4P support. All other instances and styles will “see” the M point charges at the position of the Oxygen atom and thus compute incorrect forces and energies. LAMMPS will print a warning when it detects one of these issues.  

A version of these styles with a soft core, lj/cut/tip4p/long/soft, suitable for use in free energy calculations, is part of the FEP package and is documented with the pair_style \*/soft styles.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.159.5 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of the lj/cut pair styles can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

All of the lj/cut pair styles support the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction.  

The lj/cut/coul/long and lj/cut/tip4p/long pair styles support the pair_modify table option since they can tabulate the short-range portion of the long-range Coulombic interaction.  

All of the lj/cut pair styles support the pair_modify tail option for adding a long-range tail correction to the energy and pressure for the Lennard-Jones portion of the pair interaction.  

All of the lj/cut pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

The lj/cut and lj/cut/coul/long pair styles support the use of the inner, middle, and outer keywords of the run_style respa command, meaning the pairwise forces can be partitioned by distance at different levels of the rRESPA hierarchy. The other styles only support the pair keyword of run_style respa. See the run_style command for details.  

# 4.159.6 Restrictions  

The lj/cut/tip4p/long styles are part of the KSPACE package. The lj/cut/tip4p/cut style is part of the MOLECULE package. These styles are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

# 4.159.7 Related commands  

pair_coeff  

# 4.159.8 Default  

none  

(Jorgensen) Jorgensen, Chandrasekhar, Madura, Impey, Klein, J Chem Phys, 79, 926 (1983).  

# 4.160 pair_style lj/expand command  

Accelerator Variants: lj/expand/gpu, lj/expand/kk, lj/expand/omp  

# 4.161 pair_style lj/expand/coul/long command  

Accelerator Variants: lj/expand/coul/long/gpu, lj/expand/coul/long/kk  

# 4.161.1 Syntax  

(continued from previous page)  

# 4.161.3 Description  

Style lj/expand computes a LJ interaction with a distance shifted by delta which can be useful when particles are of different sizes, since it is different that using different sigma values in a standard LJ formula:  

$$
E=4\varepsilon\left[\left(\frac{\sigma}{r-\Delta}\right)^{12}-\left(\frac{\sigma}{r-\Delta}\right)^{6}\right]\qquadr<r_{c}+\Delta
$$  

$r_{c}$ is the cutoff which does not include the $\Delta$ distance. I.e. the actual force cutoff is the sum of $r_{c}+\Delta$ .  

For all of the lj/expand pair styles, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • $\Delta$ (distance units) • cutoff (distance units)  

The $\Delta$ values can be positive or negative. The last coefficient is optional. If not specified, the global LJ cutoff is used.  

For lj/expand/coul/long only the LJ cutoff can be specified since a Coulombic cutoff cannot be specified for an individua I,J type pair. All type pairs use the same global Coulombic cutoff specified in the pair_style command.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.161.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon, sigma, and shift coefficients and cutoff distance for this pair style can be mixed. Shift is always mixed via an arithmetic rule. The other coefficients are mixed according to the pair_modify mix value. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style supports the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style supports the pair_modify tail option for adding a long-range tail correction to the energy and pressure of the pair interaction.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.161.5 Restrictions  

none  

4.161.6 Related commands pair_coeff  

# 4.161.7 Default  

none  

# 4.162 pair_style lj/expand/sphere command  

Accelerator Variant: lj/expand/sphere/omp  

# 4.162.1 Syntax  

style $=$ lj/expand/sphere args $=$ list of arguments for a particular style  

lj/expand/sphere args $=$ cutoff cutoff $=$ global cutoff for Lennard Jones interactions (distance units)  

# 4.162.2 Examples  

pair_style lj/expand/sphere 2.5   
pair_coeff \* \* 1.0 1.0   
pair_coeff 1 1 1.1 0.4 2.8  

# 4.162.3 Description  

Added in version $15\mathrm{Jun}2023$ .  

The lj/expand/sphere style compute a 12/6 Lennard-Jones potential with a distance shifted by $\begin{array}{r}{\Delta=\frac{1}{2}(d_{i}+d_{j})}\end{array}$ , the average diameter of both atoms. This can be used to model particles of different sizes but same interactions, which is different from using different sigma values as in pair style lj/cut/sphere.  

$$
E=4\varepsilon\left[\left(\frac{\sigma}{r-\Delta}\right)^{12}-\left(\frac{\sigma}{r-\Delta}\right)^{6}\right]\qquadr<r_{c}+\Delta
$$  

$r_{c}$ is the cutoff which does not include the distance $\Delta$ . I.e. the actual force cutoff is the sum $r_{c}+\Delta$ .  

This is the same potential function used by the lj/expand pair style, but the $\Delta$ parameter is not set as a per-type parameter via the pair_coeff command. Instead it is calculated individually for each pair using the per-atom diameter attribute of atom_style sphere for the two atoms as the average diameter, $\begin{array}{r}{\Delta=\frac{1}{2}(d_{i}+d_{j})}\end{array}$  

Note that $\sigma$ is defined in the LJ formula above as the zero-crossing distance for the potential, not as the energy minimum which is at $2^{\frac{1}{6}}\sigma$ .  

# $\Theta$ Notes on cutoffs, neighbor lists, and efficiency  

If your system is mildly polydisperse, meaning the ratio of the diameter of the largest particle to the smallest is less than 2.0, then the neighbor lists built by the code should be reasonably efficient. Which means they will not contain too many particle pairs that do not interact. However, if your system is highly polydisperse (ratio $>2.0$ ), the neighbor list build and force computations may be inefficient. There are two ways to try and speed up the simulations.  

The first is to assign atoms to different atom types so that atoms of each type are similar in size. E.g. if particle diameters range from 1 to 5 use 4 atom types, ensuring atoms of type 1 have diameters from 1.0-2.0, type 2 from 2.0-3.0, etc. This will reduce the number of non-interacting pairs in the neighbor lists and thus reduce the time spent on computing pairwise interactions.  

The second is to use the neighbor multi command which enabled a different algorithm for building neighbor lists. This will also require that you assign multiple atom types according to diameters, but will in addition use a more efficient size-dependent strategy to construct the neighbor lists and thus reduce the time spent on building neighbor lists.  

Here are example input script commands using the first option for a highly polydisperse system:  

units lj   
atom_style sphere   
lattice fcc 0.8442   
region box block 0 10 0 10 0 10   
create_box 2 box   
create_atoms 1 box   
$\#$ create atoms with random diameters from bimodal distribution   
variable switch atom random(0.0,1.0,345634)   
variable diam atom (v_switch $<$ <0.75)\*normal(0.2,0.04,325)+(v_switch>=0.7)\*normal(0.6,0.2,453)   
set group all diameter v_diam   
$\#$ assign type 2 to atoms with diameter $>$ 0.35   
variable large atom (2.0\*radius)>0.35   
group large variable large   
set group large type 2   
pair_style lj/expand/sphere 2.0   
pair_coeff \* \* 1.0 0.5   
neighbor 0.3 bin  

Using multiple atom types speeds up the calculation for this example by more than 30 percent, but using the multistyle neighbor list does not provide a speedup.  

# 4.162.4 Coefficients  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units)  

# LAMMPS Documentation, Release 4Feb2025  

• σ (distance units) • LJ cutoff (distance units) (optional)  

The last coefficient is optional. If not specified, the global LJ cutoff specified in the pair_style command is used.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.162.5 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon, sigma, and cutoff coefficients for the lj/expand/sphere pair style can be mixed. The default mixing style is geometric. See the pair_modify command for details.  

The lj/expand/sphere pair style supports the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction.  

The lj/expand/sphere pair style does not support the pair_modify tail option for adding a long-range tail corrections to the energy and pressure.  

The lj/expand/sphere pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.162.6 Restrictions  

The lj/expand/sphere pair style is only enabled if LAMMPS was built with the EXTRA-PAIR package. See the Build package page for more info.  

# 4.162.7 Related commands  

• pair_coeff • pair_style lj/cut • pair_style lj/cut/sphere  

# 4.162.8 Default  

none  

# 4.163 pair_style lj/long/coul/long command  

Accelerator Variants: lj/long/coul/long/intel, lj/long/coul/long/omp, lj/long/coul/long/opt  

# 4.164 pair_style lj/long/tip4p/long command  

Accelerator Variants: lj/long/tip4p/long/omp  

# 4.164.1 Syntax  

• style $=$ lj/long/coul/long or lj/long/tip4p/long • args $=$ list of arguments for a particular style  

$\mathrm{lj/long/coul/long}$ args = flag_lj flag_coul cutoff (cutoff2) $\mathrm{{flag\_lj=long}}$ or cut or off ${\mathrm{long}}={\mathrm{use}}$ Kspace long-range summation for dispersion $1/\mathrm{r}^{\sim}6$ term $\mathrm{cut}=\mathrm{use}$ a cutoff on dispersion $1/\mathrm{r}^{\sim}6$ term off $=$ omit disperion $1/\mathrm{r}^{\sim}6$ term entirely flag_c $\mathrm{{\ell})u l}=\mathrm{{long}}$ or off ${\mathrm{long}}={\mathrm{use}}$ Kspace long-range summation for Coulombic 1/r term off = omit Coulombic term cutoff $=$ global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
lj/long/tip4p/long args = flag_lj flag_coul otype htype btype atype qdist cutoff (cutoff2) flag_lj = long or cut long = use Kspace long-range summation for dispersion 1/r^6 term cut = use a cutoff flag_coul = long or off long = use Kspace long-range summation for Coulombic 1/r term off = omit Coulombic term otype,htype $=$ atom types (numeric or type label) for TIP4P O and H btype,atype $=$ bond and angle types (numeric or type label) for TIP4P waters qdist $=$ distance from O atom to massless charge (distance units) cutoff $=$ global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)  

# 4.164.2 Examples  

pair_style lj/long/coul/long cut off 2.5   
pair_style lj/long/coul/long cut long 2.5 4.0   
pair_style lj/long/coul/long long long 2.5 4.0   
pair_coeff \* \* 1 1   
pair_coeff 1 1 1 3 4   
pair_style lj/long/tip4p/long long long 1 2 7 8 0.15 12.0   
pair_style lj/long/tip4p/long long long 1 2 7 8 0.15 12.0 10.0   
pair_coeff \* \* 100.0 3.0   
pair_coeff 1 1 100.0 3.5 9.0   
pair_style lj/long/tip4p/long long long OW HW HW-OW HW-OW-HW 0.15 12.0  

(continues on next page)  

(continued from previous page)  

labelmap atom 1 OW 2 HW labelmap bond 1 HW-OW labelmap angle 1 HW-OW-HW pair_coeff \* \* 100.0 3.0 pair_coeff OW OW 100.0 3.5 9.0  

# 4.164.3 Description  

Style lj/long/coul/long computes the standard 12/6 Lennard-Jones potential:  

$$
E=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{12}-\left({\frac{\sigma}{r}}\right)^{6}\right]\qquadr<r_{c}
$$  

with $\varepsilon$ and $\sigma$ being the usual Lennard-Jones potential parameters, plus the Coulomb potential, given by:  

$$
E={\frac{C q_{i}q_{j}}{\varepsilon r}}\qquadr<r_{c}
$$  

where $\mathrm{^C}$ is an energy-conversion constant, $q_{i}$ and $q_{j}$ are the charges on the two atoms, $\varepsilon$ is the dielectric constant which can be set by the dielectric command, and $r_{c}$ is the cutoff. If one cutoff is specified in the pair_style command, it is used for both the LJ and Coulombic terms. If two cutoffs are specified, they are used as cutoffs for the LJ and Coulombic terms respectively.  

The purpose of this pair style is to capture long-range interactions resulting from both attractive $1/\mathrm{r}\Lambda/6$ Lennard-Jones and Coulombic $1/\mathrm{r}$ interactions. This is done by use of the flag_lj and flag_coul settings. The In ‘t Veld paper has more details on when it is appropriate to include long-range $1/\mathrm{r}{\wedge}6$ interactions, using this potential.  

Style lj/long/tip4p/long implements the TIP4P water model of (Jorgensen), which introduces a massless site located a short distance away from the oxygen atom along the bisector of the HOH angle. The atomic types of the oxygen and hydrogen atoms, the bond and angle types for OH and HOH interactions, and the distance to the massless charge site are specified as pair_style arguments.  

![](images/c4752d3d89a9f0796ea4d9bc8b26132317cb6d42431127a3b447820c844c4a18.jpg)  

# Note  

For each TIP4P water molecule in your system, the atom IDs for the $\mathrm{o}$ and $2\textrm{H}$ atoms must be consecutive, with the O atom first. This is to enable LAMMPS to “find” the $2\mathrm{{H}}$ atoms associated with each O atom. For example, if the atom ID of an O atom in a TIP4P water molecule is 500, then its $2\mathrm{~H~}$ atoms must have IDs 501 and 502.  

![](images/75bd380f068369da1d3570f9ff2da8046906b3edf57990734f3b4ce7fd1f5b2e.jpg)  

# Note  

If using type labels, the type labels must be defined before calling the pair_coeff command.  

See the Howto tip4p page for more information on how to use the TIP4P pair style. Note that the neighbor list cutoff for Coulomb interactions is effectively extended by a distance $2^{*}$ qdist when using the TIP4P pair style, to account for the offset distance of the fictitious charges on O atoms in water molecules. Thus it is typically best in an efficiency sense to use a LJ cutoff $>=$ Coulombic cutoff $+~2^{*}$ qdist, to shrink the size of the neighbor list. This leads to slightly larger cost for the long-range calculation, so you can test the trade-off for your model.  

If flag_lj is set to long, no cutoff is used on the LJ $1/\mathrm{r}{\wedge}6$ dispersion term. The long-range portion can be calculated by using the kspace_style ewald/disp or pppm/disp commands. The specified LJ cutoff then determines which portion of the LJ interactions are computed directly by the pair potential versus which part is computed in reciprocal space via the Kspace style. If flag_ $l j$ is set to cut, the LJ interactions are simply cutoff, as with pair_style lj/cut.  

If flag_coul is set to long, no cutoff is used on the Coulombic interactions. The long-range portion can calculated by using any of several kspace_style command options such as pppm or ewald. Note that if flag_lj is also set to long, then the ewald/disp or pppm/disp Kspace style needs to be used to perform the long-range calculations for both the LJ and Coulombic interactions. If flag_coul is set to off, Coulombic interactions are not computed.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • cutoff1 (distance units) • cutoff2 (distance units)  

Note that sigma is defined in the LJ formula as the zero-crossing distance for the potential, not as the energy minimum at $2\sp{\wedge}(1/6)$ sigma.  

The latter 2 coefficients are optional. If not specified, the global LJ and Coulombic cutoffs specified in the pair_style command are used. If only one cutoff is specified, it is used as the cutoff for both LJ and Coulombic interactions for this type pair. If both coefficients are specified, they are used as the LJ and Coulombic cutoffs for this type pair.  

Note that if you are using flag_lj set to long, you cannot specify a LJ cutoff for an atom type pair, since only one global LJ cutoff is allowed. Similarly, if you are using flag_coul set to long, you cannot specify a Coulombic cutoff for an atom type pair, since only one global Coulombic cutoff is allowed.  

For lj/long/tip4p/long only the LJ cutoff can be specified since a Coulombic cutoff cannot be specified for an individual I,J type pair. All type pairs use the same global Coulombic cutoff specified in the pair_style command.  

A version of these styles with a soft core, lj/cut/soft, suitable for use in free energy calculations, is part of the FEP package and is documented with the pair_style \*/soft styles. The version with soft core is only available if LAMMPS was built with that package. See the Build package page for more info.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.164.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of the lj/long pair styles can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

These pair styles support the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction, assuming flag_lj is cut.  

These pair styles support the pair_modify table and table/disp options since they can tabulate the short-range portion of the long-range Coulombic and dispersion interactions.  

Thes pair styles do not support the pair_modify tail option for adding a long-range tail correction to the Lennard-Jones portion of the energy and pressure.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

The pair lj/long/coul/long styles support the use of the inner, middle, and outer keywords of the run_style respa command, meaning the pairwise forces can be partitioned by distance at different levels of the rRESPA hierarchy. See the run_style command for details.  

# 4.164.5 Restrictions  

These styles are part of the KSPACE package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.164.6 Related commands  

pair_coeff  

# 4.164.7 Default  

none  

(In ‘t Veld) In ‘t Veld, Ismail, Grest, J Chem Phys, 127, 144711 (2007).   
(Jorgensen) Jorgensen, Chandrasekhar, Madura, Impey, Klein, J Chem Phys, 79, 926 (1983).  

# 4.165 pair_style lj/relres command  

Accelerator Variants: lj/relres/omp  

# 4.165.1 Syntax  

pair_style lj/relres Rsi Rso Rci Rco  

• Rsi $=$ inner switching cutoff between the fine-grained and coarse-grained potentials (distance units) • $\scriptstyle\mathrm{\mathrm{Rso}}=$ outer switching cutoff between the fine-grained and coarse-grained potentials (distance units) • Rci $=$ inner cutoff beyond which the force smoothing for all interactions is applied (distance units) • Rco $=$ outer cutoff for all interactions (distance units)  

# 4.165.2 Examples  

pair_style lj/relres 4.0 5.0 8.0 10.0   
pair_coeff 1 1 0.5 1.0 1.5 1.1   
pair_coeff 2 2 0.5 1.0 0.0 0.0 3.0 3.5 6.0 7.0  

# 4.165.3 Description  

Pair style lj/relres computes a LJ interaction using the Relative Resolution (RelRes) framework which applies a fine-grained (FG) potential between near neighbors and a coarse-grained (CG) potential between far neighbors (Chaimovich1). This approach can improve the computational efficiency by almost an order of magnitude, while maintaining the correct static and dynamic behavior of a reference system (Chaimovich2).  

$$
E=\left\{\begin{array}{l l}{4\varepsilon^{F G}\left[\left(\frac{\sigma^{F G}}{r}\right)^{12}-\left(\frac{\sigma^{F G}}{r}\right)^{6}\right]-\Gamma_{s i},}&{\mathrm{if}\quad r<r_{s i},}\ {\sum_{m=0}^{4}\gamma_{s m}\left(r-r_{s i}\right)^{m}-\Gamma_{s o},}&{\mathrm{if}\quad r_{s i}\leq r<r_{s o},}\ {4\varepsilon^{c G}\left[\left(\frac{\sigma^{c G}}{r}\right)^{12}-\left(\frac{\sigma^{c G}}{r}\right)^{6}\right]-\Gamma_{c},}&{\mathrm{if}\quad r_{s o}\leq r<r_{c i},}\ {\sum_{m=0}^{4}\gamma_{c m}\left(r-r_{c i}\right)^{m}-\Gamma_{c},}&{\mathrm{if}\quad r_{c i}\leq r<r_{c o},}\ {0,}&{\mathrm{if}\quad r\geq r_{c o}.}\end{array}\right.
$$  

The FG parameters of the LJ potential $\cdot\varepsilon^{F G}$ and $\sigma^{F G}$ ) are applied up to the inner switching cutoff, $r_{s i}$ , while the CG parameters of the LJ potential $\mathbf{\varepsilon}_{\varepsilon}^{C G}$ and $\sigma^{C G}$ ) are applied beyond the outer switching cutoff, $r_{s o}$ . Between $r_{s i}$ and $r_{s o}$ a polynomial smoothing function is applied so that the force and its derivative are continuous between the FG and CG potentials. An analogous smoothing function is applied between the inner and outer cutoffs ( $r_{c i}$ and $r_{c o.}$ ). The offsets $\Gamma_{s i}$ , $\Gamma_{s o}$ and $\Gamma_{c}$ ensure the continuity of the energy over the entire domain. The corresponding polynomial coefficients $\gamma_{s m}$ and $\upgamma_{c m}$ , as well as the offsets are automatically computed by LAMMPS.  

# Note  

Energy and force resulting from this methodology can be plotted via the pair_write command.  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as will be described below:  

• $\varepsilon^{F G}$ (energy units) • $\sigma^{F G}$ (distance units) • $\varepsilon^{C G}$ (energy units) • $\sigma^{C G}$ (distance units)  

Additional parameters can be defined to specify different $r_{s i},r_{s o},r_{c i},r_{c o}$ for a particular set of atom types:  

• $r_{s i}$ (distance units) • $r_{s o}$ (distance units) • $r_{c i}$ (distance units) • $r_{c o}$ (distance units)  

These parameters are optional, and they are used to override the global cutoffs as defined in the pair_style command. If not specified, the global values for $r_{s i}$ , $r_{s o},r_{c i}$ , and $r_{c o}$ are used. If this override option is employed, all four arguments must be specified.  

Here are some guidelines for using the pair_style lj/relres command.  

In general, RelRes focuses on the speedup of pairwise interactions between all LJ sites. Importantly, it works with any settings and flags (e.g., special_bonds settings and newton flags) that can be used in a molecular simulation with the conventional LJ potential. In particular, all intramolecular topology with its energetics (i.e., bonds, angles, etc.) remains unaltered.  

At the most basic level in the RelRes framework, all sites are mapped into clusters. Each cluster is just a collection of sites bonded together (the bonds themselves are not part of the cluster). In general, a molecule may be comprised of several clusters, and preferably, no two sites in a cluster are separated by more than two bonds. There are two categories of sites in RelRes: “hybrid” sites embody both FG and CG models, while “ordinary” sites embody just FG characteristics with no CG features. A given cluster has a single hybrid site (typically its central site) and several ordinary sites (typically its peripheral sites). Notice that while clusters are necessary for the RelRes parameterization (discussed below), they are not actually defined in LAMMPS. Besides, the total number of sites in the cluster are called the “mapping ratio”, and this substantially impacts the computational efficiency of RelRes: For a mapping ratio of 3, the efficiency factor is around 4, and for a mapping ratio of 5, the efficiency factor is around 5 (Chaimovich2).  

The flexibility of LAMMPS allows placing any values for the LJ parameters in the input script. However, here are the optimal recommendations for the RelRes parameters, which yield the correct structural and thermal behavior in a system of interest (Chaimovich1). One must first assign a complete set of parameters for the FG interactions that are applicable to all atom types. Regarding the parameters for the CG interactions, the rules rely on the site category (if it is a hybrid or an ordinary site). For atom types of ordinary sites, $\varepsilon^{C G}$ must be set to 0 (zero) while the specific value of $\sigma^{C G}$ is irrelevant. For atom types of hybrid sites, the CG parameters should be generally calculated using the following equations:  

$$
\sigma_{I}^{C G}=\frac{\left((\sum_{\alpha\in A}\sqrt{\varepsilon_{\alpha}^{F G}\left(\sigma_{\alpha}^{F G}\right)^{12}})^{1/2}\right)}{\left((\sum_{\alpha\in A}\sqrt{\varepsilon_{\alpha}^{F G}\left(\sigma_{\alpha}^{F G}\right)^{6}})^{1/3}\right.}\quad\mathrm{and}\quad\varepsilon_{I}^{C G}=\frac{\left((\sum_{\alpha\in A}\sqrt{\varepsilon_{\alpha}^{F G}\left(\sigma_{\alpha}^{F G}\right)^{6}}\right)^{4}\right)}{\left((\sum_{\alpha\in A}\sqrt{\varepsilon_{\alpha}^{F G}\left(\sigma_{\alpha}^{F G}\right)^{12}})^{2}\right)^{2}}
$$  

where $I$ is an atom type of a hybrid site of a particular cluster $A$ , and corresponding with this cluster, the summation proceeds over all of its sites $\alpha$ . These equations are derived from the monopole term in the underlying Taylor series, and they are indeed relevant only if geometric mixing is applicable for the FG model; if this is not the case, Ref. (Chaimovich2) discusses the alternative formula, and in such a situation, the pair_coeff command should be explicitly used for all combinations of atom types $I!=J$ .  

The switching distance (the midpoint between inner and outer switching cutoffs) is another crucial factor in RelRes: decreasing it improves the computational efficiency, yet if it is too small, the molecular simulations may not capture the system behavior correctly. As a rule of thumb, the switching distance should be approximately $\sim1.5\sigma$ (Chaimovich1); recommendations can be found in Ref. (Chaimovich2). Regarding the switching smoothing zone, $\sim0.1\sigma$ is recommended; if desired, smoothing can be eliminated by setting the inner switching cutoff, $r_{s i}$ , equal to the outer switching cutoff, $r_{s o}$ (the same is true for the other cutoffs $r_{c i}$ and $r_{c o}$ ).  

As an example, imagine that in your system, a molecule is comprised just of one cluster such that one atom type (#1) is associated with its hybrid site, and another atom type (#2) is associated with its ordinary sites (in total, there are 2 atom types). If geometric mixing is applicable, the following commands should be used:  

<html><body><table><tr><td>pair style lj/relres Rsi Rso Rci Rco</td></tr><tr><td>pair coeff f 1 1 epsilon_FG1 sigma. FG1 epsilon_CG1 sigma_CG1</td></tr><tr><td>pair coeff f 2 2 epsilon_FG2 sigma FG2 0.0 0.0</td></tr></table></body></html>  

In a more complex situation, there may be two distinct clusters in a system (these two clusters may be on same molecule or on different molecules), each with its own switching cutoffs. If there are still two atom types in each cluster as in the earlier example, the commands should be:  

<html><body><table><tr><td colspan="4">e lj/relres :Rsi Rso Rci Rco</td></tr><tr><td>pair style pair coeff</td><td>f 1 1 epsilon FG1 s sigma</td><td>FG1 epsilon CG1 sigma</td><td>CG1 Rsi1 Rsol Rci Rco</td></tr><tr><td>pair coeff</td><td>f 22epsilon FG2 sigma FG2 20.0</td><td>0.0 Rsil Rsol Rci Rco</td><td></td></tr><tr><td>pair coeff 3 3 epsilon</td><td>FG3S sigma FG3 epsilon</td><td>CG3 S sigma CG3</td><td></td></tr><tr><td>pair coeff</td><td>f 4 4 epsilon _FG4 sigma. FG4 0.0</td><td>0.0</td><td></td></tr><tr><td>pair modify shift yes</td><td></td><td></td><td></td></tr></table></body></html>  

In this example, the switching cutoffs for the first cluster (atom types 1 and 2) is defined explicitly in the pair_coeff command which overrides the global values, while the second cluster (atom types 3 and 4) uses the global definition from the pair_style command. The emphasis here is that the atom types that belong to a specific cluster should have the same switching/cutoff arguments.  

In the case that geometric mixing is not applicable, for simulating the system from the previous example, we recommend using the following commands:  

<html><body><table><tr><td colspan="6">pair r_style lj/relres Rsi Rso Rci Rco</td></tr><tr><td>pair coeff 1 1 epsilon FG1</td><td>sigma</td><td>FG1</td><td>epsilon_CG1 sigma</td><td>CG1 Rsil Rsol Rci Rco</td><td></td></tr><tr><td>pair coeff 1 2 epsilon</td><td>FG12 sigma</td><td>FG12 0.0</td><td>0.0</td><td>Rsil Rsol Rci Rco</td><td></td></tr><tr><td>pair coeff 13 epsilon</td><td>FG13 sigma</td><td></td><td></td><td></td><td>FG13 epsilon_CG13 sigma_CG13 Rsi13 Rso13 Rci Rco</td></tr><tr><td>pair coeff 1 4 epsilon</td><td></td><td>FG14 sigma</td><td>FG14 0.0</td><td>0.0</td><td>Rsi13 Rso13 Rci Rco</td></tr><tr><td>pair coeff 2 2 epsilon</td><td>FG2</td><td>sigma FG2</td><td>0.0</td><td>0.0</td><td>Rsil Rsol Rci Rco</td></tr><tr><td>pair coeff 2 3 epsilon</td><td></td><td>FG23 sigma</td><td>FG23 0.0</td><td>0.0</td><td>Rsi13 Rso13 Rci Rc0</td></tr><tr><td>pair coeff 2 4 epsilon</td><td></td><td>FG24 sigma</td><td>FG24 0.0</td><td>0.0</td><td>Rsi13 Rso13 Rci Rc0</td></tr><tr><td>pair coeff FG3</td><td>33epsilon</td><td>sigma FG3</td><td>epsilon_CG3</td><td>sigma_CG3</td><td></td></tr><tr><td>pair coeff</td><td>34epsilon</td><td>FG34 sigma</td><td>FG34 0.0</td><td>0.0</td><td></td></tr><tr><td>pair coeff 4 4 epsilon</td><td>1FG4</td><td>sigma_FG4 0.0</td><td></td><td>0.0</td><td></td></tr><tr><td>pair modify shift yes</td><td></td><td></td><td></td><td></td><td></td></tr></table></body></html>  

Notice that the CG parameters are mixed only for interactions between atom types associated with hybrid sites, and that the cutoffs are mixed on the cluster basis.  

More examples can be found in the examples/relres folder.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.165.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs $I$ , $J$ with $I!=J$ , the $\varepsilon^{F G}$ , $\sigma^{F G}$ , $\varepsilon^{C G}$ , $\sigma^{C G}$ , $r_{s i}$ , $r_{s o},r_{c i}$ , and $r_{c o}$ parameters for this pair style can be mixed, if not defined explicitly. All parameters are mixed according to the pair_modify mix option. The default mix value is geometric, and it is recommended to use with this lj/relres style. See the “pair_modify” command for details.  

This pair style supports the pair_modify shift option for the energy of the pair interaction. It is recommended to set this option to yes. Otherwise, the offset $\Gamma_{c}$ is set to zero. Constants $\Gamma_{s i}$ and $\Gamma_{s o}$ are not impacted by this option.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure, since the energy of the pair interaction is smoothed to 0.0 at the cutoff.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.165.5 Restrictions  

This pair style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.165.6 Related commands  

pair_coeff  

# 4.165.7 Default  

none  

(Chaimovich1) A. Chaimovich, C. Peter and K. Kremer, J. Chem. Phys. 143, 243107 (2015).   
(Chaimovich2) M. Chaimovich and A. Chaimovich, J. Chem. Theory Comput. 17, 1045-1059 (2021).  

# 4.166 pair_style lj/smooth command  

Accelerator Variants: lj/smooth/gpu, lj/smooth/omp  

# 4.166.1 Syntax  

pair_style lj/smooth Rin Rc  

• Rin $=$ inner cutoff beyond which force smoothing will be applied (distance units) • $\mathbf{R}\mathbf{c}=$ outer cutoff for lj/smooth interactions (distance units)  

# 4.166.2 Examples  

pair_style lj/smooth 8.0 10.0   
pair_coeff \* \* 10.0 1.5   
pair_coeff 1 1 20.0 1.3 7.0 9.0  

# 4.166.3 Description  

Style lj/smooth computes a LJ interaction with a force smoothing applied between the inner and outer cutoff.  

$$
\begin{array}{l}{{\displaystyle{E=4\varepsilon\left[\left(\frac\sigma r\right)^{12}-\left(\frac\sigma r\right)^{6}\right]}~r<r_{i n}}}\ {{\quad}}\ {{\displaystyle{F=C_{1}+C_{2}(r-r_{i n})+C_{3}(r-r_{i n})^{2}+C_{4}(r-r_{i n})^{3}~r_{i n}<r<r_{c}}}}\end{array}
$$  

The polynomial coefficients C1, C2, C3, C4 are computed by LAMMPS to cause the force to vary smoothly from the inner cutoff $r_{i n}$ to the outer cutoff $r_{c}$ .  

At the inner cutoff the force and its first derivative will match the non-smoothed LJ formula. At the outer cutoff the force and its first derivative will be 0.0. The inner cutoff cannot be 0.0.  

![](images/be4d14a70a2641a3a202a73d5975460405f2d44002f83d4bdce99165a67f4996.jpg)  

# Note  

this force smoothing causes the energy to be discontinuous both in its values and first derivative. This can lead to poor energy conservation and may require the use of a thermostat. Plot the energy and force resulting from this formula via the pair_write command to see the effect.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • $r_{i n}$ (distance units) • $r_{c}$ (distance units)  

The last 2 coefficients are optional inner and outer cutoffs. If not specified, the global values for $r_{i n}$ and $r_{c}$ are used.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.166.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon, sigma, Rin coefficients and the cutoff distance for this pair style can be mixed. Rin is a cutoff value and is mixed like the cutoff. The other coefficients are mixed according to the pair_modify mix option. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style supports the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure, since the energy of the pair interaction is smoothed to 0.0 at the cutoff.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.166.5 Restrictions  

This pair style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.166.6 Related commands  

pair_coeff , pair lj/smooth/linear  

# 4.166.7 Default  

none  

# 4.167 pair_style lj/smooth/linear command  

Accelerator Variants: lj/smooth/linear/omp  

# 4.167.1 Syntax  

• cutof $=$ global cutoff for Lennard-Jones interactions (distance units)  

# 4.167.2 Examples  

pair_style lj/smooth/linear 2.5   
pair_coeff \* \* 1.0 1.0   
pair_coeff 1 1 0.3 3.0 9.0  

# 4.167.3 Description  

Style lj/smooth/linear computes a truncated and force-shifted LJ interaction (aka Shifted Force Lennard-Jones) that combines the standard 12/6 Lennard-Jones function and subtracts a linear term based on the cutoff distance, so that both, the potential and the force, go continuously to zero at the cutoff $r_{c}$ (Toxvaerd):  

$$
\begin{array}{l}{\displaystyle\phi\left(r\right)=4\varepsilon\left[\left(\frac\sigma r\right)^{12}-\left(\frac\sigma r\right)^{6}\right]}\ {\displaystyle E\left(r\right)=\phi\left(r\right)-\phi\left(r_{c}\right)-\left(r-r_{c}\right)\left.\frac{d\phi}{d r}\right|_{r=r_{c}}\quad\quad r<r_{c}}\end{array}
$$  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • σ (distance units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global LJ cutoff specified in the pair_style command is used.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator package  

page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.167.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style does not support the pair_modify shift option for the energy of the pair interaction, since it goes to 0.0 at the cutoff by construction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure, since the energy of the pair interaction is smoothed to 0.0 at the cutoff.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.167.5 Restrictions  

This pair style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.167.6 Related commands  

pair_coeff , pair lj/smooth  

# 4.167.7 Default  

none  

(Toxvaerd) Toxvaerd, Dyre, J Chem Phys, 134, 081102 (2011).  

4.168 pair_style lj/switch3/coulgauss/long command  

4.169 pair_style mm3/switch3/coulgauss/long command  

# 4.169.1 Syntax  

• style $=$ lj/switch3/coulgauss/long or mm3/switch3/coulgauss/long • args $=$ list of arguments for a particular style  

lj/switch3/coulgauss/long args $=$ cutoff (cutoff2) width cutoff $=$ global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units) width $=$ width parameter of the smoothing function (distance units)  

mm3/switch3/coulgauss/long args $=$ cutoff (cutoff2) width cutoff $=$ global cutoff for MM3 (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units) width $=$ width parameter of the smoothing function (distance units)  

# 4.169.2 Examples  

pair_style lj/switch3/coulgauss/long 12.0 3.0   
pair_coeff 1 0.2 2.5 1.2   
pair_style lj/switch3/coulgauss/long 12.0 10.0 3.0   
pair_coeff 1 0.2 2.5 1.2   
pair_style mm3/switch3/coulgauss/long 12.0 3.0   
pair_coeff 1 0.2 2.5 1.2   
pair_style mm3/switch3/coulgauss/long 12.0 10.0 3.0   
pair_coeff 1 0.2 2.5 1.2  

# 4.169.3 Description  

The lj/switch3/coulgauss style evaluates the LJ vdW potential  

$$
E=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{12}-\left({\frac{\sigma}{r}}\right)^{6}\right]
$$  

The mm3/switch3/coulgauss/long style evaluates the MM3 vdW potential (Allinger)  

$$
\begin{array}{r l}&{E=\varepsilon_{i j}\left[-2.25\left(\frac{r_{\nu,i j}}{r_{i j}}\right)^{6}+1.84(10)^{5}\exp\left[-12.0r_{i j}/r_{\nu,i j}\right]\right]S_{3}(r_{i j})}\ &{r_{\nu,i j}=r_{\nu,i}+r_{\nu,j}}\ &{\varepsilon_{i j}=\sqrt{\varepsilon_{i}\varepsilon_{j}}}\end{array}
$$  

Both potentials go smoothly to zero at the cutoff r_c as defined by the switching function  

$$
S_{3}(r)=\left\{\begin{array}{l l}{1\quad}&{\mathrm{if}\quad r<r_{\mathrm{c}}-w}\ {3x^{2}-2x^{3}}&{\mathrm{if}\quad r<r_{\mathrm{c}}\quad\mathrm{with}\quad x=\frac{r_{\mathrm{c}}-r}{w}}\ {0}&{\mathrm{if}\quad r>=r_{\mathrm{c}}}\end{array}\right.
$$  

where w is the width defined in the arguments. This potential is combined with Coulomb interaction between Gaussian charge densities:  

$$
E=\frac{q_{i}q_{j}\mathrm{erf}\left(r/\sqrt{\gamma_{1}^{2}+\gamma_{2}^{2}}\right)}{\varepsilon r_{i j}}
$$  

where $q_{i}$ and $q_{j}$ are the charges on the two atoms, $\varepsilon$ is the dielectric constant which can be set by the dielectric command, $\gamma_{i}$ and $\gamma_{j}$ are the widths of the Gaussian charge distribution and erf() is the error-function. This style has to be used in conjunction with the kspace_style command  

If one cutoff is specified it is used for both the vdW and Coulomb terms. If two cutoffs are specified, the first is used as the cutoff for the vdW terms, and the second is the cutoff for the Coulombic term.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• ε (energy) • σ (distance) • γ (distance)  

# 4.169.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of the lj/long pair styles can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

Shifting the potential energy is not necessary because the switching function ensures that the potential is zero at the cut-off.  

These pair styles support the pair_modify table and options since they can tabulate the short-range portion of the longrange Coulombic interactions.  

Thes pair styles do not support the pair_modify tail option for adding a long-range tail correction to the Lennard-Jones portion of the energy and pressure.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.169.5 Restrictions  

These styles are part of the YAFF package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.169.6 Related commands  

pair_coeff  

# 4.169.7 Default  

none  

# 4.170 pair_style local/density command  

# 4.170.1 Syntax  

pair_style style arg  

• style $=$ local/density • arg $=$ name of file containing tabulated values of local density and the potential  

# 4.170.2 Examples  

pair_style local/density benzene_water.localdensity.table pair_style hybrid/overlay table spline 500 local/density pair_coeff \* \* local/density benzene_water.localdensity.table  

# 4.170.3 Description  

The local density (LD) potential is a mean-field manybody potential, and, in some way, a generalization of embedded atom models (EAM). The name “local density potential” arises from the fact that it assigns an energy to an atom depending on the number of neighboring atoms of a given type around it within a predefined spherical volume (i.e., within the cutoff). The bottom-up coarse-graining (CG) literature suggests that such potentials can be widely useful in capturing effective multibody forces in a computationally efficient manner and thus improve the quality of CG models of implicit solvation (Sanyal1) and phase-segregation in liquid mixtures (Sanyal2), and provide guidelines to determine the extent of manybody correlations present in a CG model (Rosenberger). The LD potential in LAMMPS is primarily intended to be used as a corrective potential over traditional pair potentials in bottom-up CG models via hybrid/overlay pair style with other explicit pair interaction terms (e.g., tabulated, Lennard-Jones, Morse etc.). Because the LD potential is not a pair potential per se, it is implemented simply as a single auxiliary file with all specifications that will be read upon initialization.  

![](images/522f5d8329b46023fe5c23ff44bf312781940e257d76b898a3024ae57395539a.jpg)  

# Note  

Thus when used as the only interaction in the system, there is no corresponding pair_coeff command and when used with other pair styles using the hybrid/overlay option, the corresponding pair_coeff command must be supplied $^{**}$ as placeholders for the atom types.  

# System with a single CG atom type:  

A system of a single atom type (e.g., LJ argon) with a single local density (LD) potential would have an energy given by:  

$$
U_{L D}=\sum_{i}F(\rho_{i})
$$  

where $\rho_{i}$ is the LD at atom $i$ and $F(\rho)$ is similar in spirit to the embedding function used in EAM potentials. The LD at atom $i$ is given by the sum  

$$
\rho_{i}=\sum_{j\neq i}\varphi(r_{i j})
$$  

where $\varphi$ is an indicator function that is one at $\scriptstyle\mathrm{r=0}$ and zero beyond a cutoff distance R2. The choice of the functional form of $\varphi$ is somewhat arbitrary, but the following piecewise cubic function has proven sufficiently general: (Sanyal1), (Sanyal2) (Rosenberger)  

$$
\varphi(r)={\left\{\begin{array}{l l}{1}&{r\leq R_{1}}\ {c_{0}+c_{2}r^{2}+c_{4}r^{4}+c_{6}r^{6}}&{r\in(R_{1},R_{2})}\ {0}&{r\geq R_{2}}\end{array}\right.}
$$  

The constants $c$ are chosen so that the indicator function smoothly interpolates between 1 and 0 between the distances R1 and R2, which are called the inner and outer cutoffs, respectively. Thus phi satisfies ${\mathrm{phi}}({\mathsf{R}}1)=1$ , $\mathrm{phi}(\mathrm{R}2)=\mathrm{dphi}/\mathrm{dr}$ $\varpi\left({\bf r}{=}{\bf R}1\right)=\mathrm{dphi}/\mathrm{dr}\varpi\left({\bf r}{=}{\bf R}2\right)=0.$ . The embedding function F(rho) may or may not have a closed-form expression. To maintain generality, it is practically represented with a spline-interpolated table over a predetermined range of rho. Outside of that range it simply adopts zero values at the endpoints.  

It can be shown that the total force between two atoms due to the LD potential takes the form of a pair force, which motivates its designation as a LAMMPS pair style. Please see (Sanyal1) for details of the derivation.  

# Systems with arbitrary numbers of atom types:  

The potential is easily generalized to systems involving multiple atom types:  

$$
U_{L D}=\sum_{i}a_{\alpha}F(\rho_{i})
$$  

with the LD expressed as  

$$
\rho_{i}=\sum_{j\neq i}b_{\beta}\varphi(r_{i j})
$$  

where $\alpha$ gives the type of atom i, $\beta$ the type of atom $j$ , and the coefficients $a$ and $b$ filter for atom types as specified by the user. $a$ is called the central atom filter as it determines to which atoms the potential applies; $a_{\alpha}=1$ if the LD potential applies to atom type $\alpha$ else zero. On the other hand, $b$ is called the neighbor atom filter because it specifies which atom types to use in the calculation of the LD; $b_{\beta}=1$ if atom type $\beta$ contributes to the LD and zero otherwise.  

# Note  

Note that the potentials need not be symmetric with respect to atom types, which is the reason for two distinct sets of coefficients $a$ and $b$ . An atom type may contribute to the LD but not the potential, or to the potential but not the LD. Such decisions are made by the user and should (ideally) be motivated on physical grounds for the problem at hand.  

# General form for implementation in LAMMPS:  

Of course, a system with many atom types may have many different possible LD potentials, each with their own atom type filters, cutoffs, and embedding functions. The most general form of this potential as implemented in the pair_style local/density is:  

$$
U_{L D}=\sum_{k}U_{L D}^{(k)}=\sum_{i}\left[\sum_{k}a_{\alpha}^{(k)}F^{(k)}\left(\rho_{i}^{(k)}\right)\right]
$$  

where, $k$ is an index that spans the (arbitrary) number of applied LD potentials N_LD. Each LD is calculated as before with:  

$$
\rho_{i}^{(k)}=\sum_{j}b_{\beta}^{(k)}\varphi^{(k)}(r_{i j})
$$  

The superscript on the indicator function phi simply indicates that it is associated with specific values of the cutoff distances ${\mathrm{R1(k)}}$ and ${\mathrm{R}}2({\mathrm{k}})$ . In summary, there may be N_LD distinct LD potentials. With each potential type $(\mathrm{k})$ , one must specify:  

• the inner and outer cutoffs as R1 and R2   
• the central type filter $\mathrm{{a(k)}}$ , where $\mathrm{k}=1,2,...\mathrm{N}\_\mathrm{LD}$   
• the neighbor type filter $\mathfrak{b}(\mathbf{k})$ , where $\mathrm{k}=1,2,...\mathrm{N}\_\mathrm{LD}$   
• the LD potential function $\mathrm{F(k)(rho)}$ , typically as a table that is later spline-interpolated  

# Tabulated input file format:  

<html><body><table><tr><td>Line 1:</td><td>comment or blank (ignored)</td></tr><tr><td>Line 2:</td><td>comment or blank (ignored)</td></tr><tr><td></td><td></td></tr><tr><td>Line 3: Line 4:</td><td>N_LD N_rho (# of LD potentials and # of tabulated values, single space separated)</td></tr><tr><td>Line 5:</td><td>blank (ignored)</td></tr><tr><td>Line 6:</td><td>central-types (central atom types, single space separated)</td></tr><tr><td>Line 7:</td><td>neighbor-types (neighbor atom types single space separated)</td></tr><tr><td>Line 8:</td><td>rho_min rho_max drho (min, max and diff. in tabulated rho values, single space_</td></tr><tr><td>→separated)</td><td></td></tr><tr><td>Line 9: Line 10:</td><td>F(k)(rho _min + 0.drho)</td></tr><tr><td>Line 11:</td><td>F(k)(rho _min + 1.drho) F(k)(rho _min + 2.drho)</td></tr><tr><td></td><td></td></tr><tr><td>Line 9+N _rho: Line 10+N rho:</td><td>F(k)(rho _min + N_rho . drho)</td></tr><tr><td></td><td>blank (ignored)</td></tr><tr><td>Block 2</td><td></td></tr><tr><td>Block 3</td><td></td></tr><tr><td></td><td></td></tr></table></body></html>  

Lines 5 to $9{+}\mathrm{N}.$ _rho constitute the first block. Thus the input file is separated (by blank lines) into N_LD blocks each representing a separate LD potential and each specifying its own upper and lower cutoffs, central and neighbor atoms, and potential. In general, blank lines anywhere are ignored.  

# 4.170.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support automatic mixing. For atom type pairs $\alpha,\beta$ and $\alpha!=\beta$ , even if LD potentials of type $(\alpha,\alpha)$ and $(\beta,\beta)$ are provided, you will need to explicitly provide LD potential types $(\alpha,\beta)$ and $(\beta,\alpha)$ if need be (Here, the notation $(\alpha,\beta)$ means that $\alpha$ is the central atom to which the LD potential is applied and $\beta$ is the neighbor atom which contributes to the LD potential on $\alpha$ ).  

This pair style does not support the pair_modify shift, table, and tail options.  

The local/density pair style does not write its information to binary restart files, since it is stored in tabulated potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

# 4.170.5 Restrictions  

The local/density pair style is a part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.170.6 Related commands  

pair_coeff  

# 4.170.7 Default  

none  

(Sanyal1) Sanyal and Shell, Journal of Chemical Physics, 2016, 145 (3), 034109.   
(Sanyal2) Sanyal and Shell, Journal of Physical Chemistry B, 122 (21), 5678-5693.   
(Rosenberger) Rosenberger, Sanyal, Shell and van der Vegt, Journal of Chemical Physics, 2019, 151 (4), 044111.  

# 4.171 pair_style lubricate command  

Accelerator Variants: lubricate/omp  

# 4.172 pair_style lubricate/poly command  

Accelerator Variants: lubricate/poly/omp  

# 4.172.1 Syntax  

pair_style style mu flaglog flagfld cutinner cutoff flagHI flagVF  

• style $=$ lubricate or lubricate/poly   
• mu $=$ dynamic viscosity (dynamic viscosity units)   
• $\mathrm{flaglog=0/1}$ to exclude/include log terms in the lubrication approximation   
• flagfld $=0/1$ to exclude/include Fast Lubrication Dynamics (FLD) effects   
• cutinner $=$ inner cutoff distance (distance units)   
• cutof $=$ outer cutoff for interactions (distance units)   
• flagHI (optional) $=0/1$ to exclude/include $1/\mathrm{r}$ hydrodynamic interactions   
• flagVF (optional) $=0/1$ to exclude/include volume fraction corrections in the long-range isotropic terms  

# 4.172.2 Examples  

(all assume radius $=1$ )  

pair_style lubricate 1.5 1 1 2.01 2.5   
pair_coeff 1 1 2.05 2.8   
pair_coeff \* \*   
pair_style lubricate 1.5 1 1 2.01 2.5   
pair_coeff \* \*   
variable mu equal ramp(1,2)   
fix 1 all adapt 1 pair lubricate mu \* \* v_mu  

# 4.172.3 Description  

Styles lubricate and lubricate/poly compute hydrodynamic interactions between mono-disperse finite-size spherical particles in a pairwise fashion. The interactions have 2 components. The first is Ball-Melrose lubrication terms via the formulas in (Ball and Melrose)  

$$
\begin{array}{r}{W=-a_{s q}|(\nu_{1}-\nu_{2})\bullet\mathbf{n}\mathbf{n}|^{2}-a_{s h}|(\omega_{1}+\omega_{2})\bullet(\mathbf{I}-\mathbf{n}\mathbf{n})-2\Omega_{N}|^{2}-}\ {a_{p u}|(\omega_{1}-\omega_{2})\bullet(\mathbf{I}-\mathbf{n}\mathbf{n})|^{2}-a_{t w}|(\omega_{1}-\omega_{2})\bullet\mathbf{n}\mathbf{n}|^{2}\qquadr<r_{c}}\end{array}
$$  

$$
\Omega_{N}={\bf n}\times(\nu_{1}-\nu_{2})/r
$$  

which represents the dissipation W between two nearby particles due to their relative velocities in the presence of a background solvent with viscosity mu. Note that this is dynamic viscosity which has units of mass/distance/time, not kinematic viscosity.  

The Asq (squeeze) term is the strongest and is included if flagHI is set to 1 (default). It scales as 1/gap where gap is the separation between the surfaces of the 2 particles. The Ash (shear) and Apu (pump) terms are only included if flaglog is set to 1. They are the next strongest interactions, and the only other singular interaction, and scale as log(gap). Note that flaglog $=1$ and $\mathit{f l a g H I}=0$ is invalid, and will result in a warning message, after which flagHI will be set to 1. The Atw (twist) term is currently not included. It is typically a very small contribution to the lubrication forces.  

The flagHI and flagVF settings are optional. Neither should be used, or both must be defined.  

Cutinner sets the minimum center-to-center separation that will be used in calculations irrespective of the actual separation. Cutoff is the maximum center-to-center separation at which an interaction is computed. Using a cutoff less than 3 radii is recommended if flaglog is set to 1.  

The other component is due to the Fast Lubrication Dynamics (FLD) approximation, described in (Kumar), which can be represented by the following equation  

$$
\boldsymbol{F}^{H}=-\boldsymbol{R}_{F U}(\boldsymbol{U}-\boldsymbol{U}^{\infty})+\boldsymbol{R}_{F E}\boldsymbol{E}^{\infty}
$$  

where U represents the velocities and angular velocities of the particles, $U^{\infty}$ represents the velocity and the angular velocity of the undisturbed fluid, and $E^{\infty}$ represents the rate of strain tensor of the undisturbed fluid with viscosity mu. Again, note that this is dynamic viscosity which has units of mass/distance/time, not kinematic viscosity. Volume fraction corrections to R_FU are included as long as flagVF is set to 1 (default).  

![](images/fd59525e0f93412b56617b2c7fa3b3b76ed4e984303b926549d99651a30d61f7.jpg)  

# Note  

When using the FLD terms, these pair styles are designed to be used with explicit time integration and a correspondingly small timestep. Thus either $f\boldsymbol{{x}}$ nve/sphere or fix nve/asphere should be used for time integration. To perform implicit FLD, see the pair_style lubricate $U$ command.  

Style lubricate requires monodisperse spherical particles; style lubricate/poly allows for polydisperse spherical particles.  

The viscosity mu can be varied in a time-dependent manner over the course of a simulation, in which case in which case the pair_style setting for mu will be overridden. See the fix adapt command for details.  

If the suspension is sheared via the fix deform command then the pair style uses the shear rate to adjust the hydrodynamic interactions accordingly. Volume changes due to fix deform are accounted for when computing the volume fraction corrections to R_FU.  

When computing the volume fraction corrections to R_FU, the presence of walls (whether moving or stationary) will affect the volume fraction available to colloidal particles. This is currently accounted for with the following types of walls: wall/lj93, wall/lj126, wall/colloid, and wall/harmonic. For these wall styles, the correct volume fraction will be used when walls do not coincide with the box boundary, as well as when walls move and thereby cause a change in the volume fraction. Other wall styles may still work, but they will result in the volume fraction being computed based on the box boundaries. Several wall styles are not compatible with these pair styles and using them will result in an error.  

Since lubrication forces are dissipative, it is usually desirable to thermostat the system at a constant temperature. If Brownian motion (at a constant temperature) is desired, it can be set using the pair_style brownian command. These pair styles and the brownian style should use consistent parameters for mu, flaglog, flagfld, cutinner, cutoff, flagHI and flagVF.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• cutinner (distance units) • cutoff (distance units)  

The two coefficients are optional. If neither is specified, the two cutoffs specified in the pair_style command are used.   
Otherwise both must be specified.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.172.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{\textbf{I}}!=\mathrm{\textbf{J}}$ , the two cutoff distances for this pair style can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style does not support the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.172.5 Restrictions  

These styles are part of the COLLOID package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Only spherical monodisperse particles are allowed for pair_style lubricate.  

Only spherical particles are allowed for pair_style lubricate/poly.  

These pair styles will not restart exactly when using the read_restart command, though they should provide statistically similar results. This is because the forces they compute depend on atom velocities. See the read_restart command for more details.  

# 4.172.6 Related commands  

pair_coeff , pair_style lubricateU  

# 4.172.7 Default  

The default settings for the optional args are fla $\operatorname{gHI}=1$ and $\mathrm{{flagVF}=1}$ .  

(Ball) Ball and Melrose, Physica A, 247, 444-472 (1997).  

(Kumar) Kumar and Higdon, Phys Rev E, 82, 051401 (2010). See also his thesis for more details: A. Kumar, “Microscale Dynamics in Suspensions of Non-spherical Particles”, Thesis, University of Illinois Urbana-Champaign, (2010). (https://www.ideals.illinois.edu/handle/2142/16032)  

# 4.173 pair_style lubricateU command  

# 4.174 pair_style lubricateU/poly command  

# 4.174.1 Syntax  

pair_style style mu flaglog cutinner cutoff gdot flagHI flagVF  

• style $=$ lubricateU or lubricateU/poly   
• mu $=$ dynamic viscosity (dynamic viscosity units)   
• $\mathrm{flaglog=0/1}$ to exclude/include log terms in the lubrication approximation   
• cutinner $=$ inner cut off distance (distance units)   
• cutof $=$ outer cutoff for interactions (distance units)   
• gdot $=$ shear rate (1/time units)   
• flagHI (optional) $=0/1$ to exclude/include $1/\mathrm{r}$ hydrodynamic interactions   
• flagVF (optional) $=0/1$ to exclude/include volume fraction corrections in the long-range isotropic terms  

# 4.174.2 Examples  

(all assume radius $=1$ )  

pair_style lubricateU 1.5 1 2.01 2.5 0.01 1 1   
pair_coeff 1 1 2.05 2.8   
pair_coeff \* \*  

# 4.174.3 Description  

Styles lubricateU and lubricateU/poly compute velocities and angular velocities for finite-size spherical particles such that the hydrodynamic interaction balances the force and torque due to all other types of interactions.  

The interactions have 2 components. The first is Ball-Melrose lubrication terms via the formulas in (Ball and Melrose)  

$$
\begin{array}{r}{W=-a_{s q}|(\nu_{1}-\nu_{2})\bullet\mathbf{n}\mathbf{n}|^{2}-a_{s h}|(\omega_{1}+\omega_{2})\bullet(\mathbf{I}-\mathbf{n}\mathbf{n})-2\Omega_{N}|^{2}-}\ {a_{p u}|(\omega_{1}-\omega_{2})\bullet(\mathbf{I}-\mathbf{n}\mathbf{n})|^{2}-a_{t w}|(\omega_{1}-\omega_{2})\bullet\mathbf{n}\mathbf{n}|^{2}\qquadr<r_{c}}\end{array}
$$  

$$
\Omega_{N}={\bf n}\times(\nu_{1}-\nu_{2})/r
$$  

which represents the dissipation $\mathbf{W}$ between two nearby particles due to their relative velocities in the presence of a background solvent with viscosity mu. Note that this is dynamic viscosity which has units of mass/distance/time, not kinematic viscosity.  

The Asq (squeeze) term is the strongest and is included as long as flagHI is set to 1 (default). It scales as 1/gap where gap is the separation between the surfaces of the 2 particles. The Ash (shear) and Apu (pump) terms are only included if flaglog is set to 1. They are the next strongest interactions, and the only other singular interaction, and scale as log(gap). Note that flaglog $=1$ and $\mathit{f l a g H I}=0$ is invalid, and will result in a warning message, after which flagHI will be set to 1. The Atw (twist) term is currently not included. It is typically a very small contribution to the lubrication forces.  

The flagHI and flagVF settings are optional. Neither should be used, or both must be defined.  

Cutinner sets the minimum center-to-center separation that will be used in calculations irrespective of the actual separation. Cutoff is the maximum center-to-center separation at which an interaction is computed. Using a cutoff less than 3 radii is recommended if flaglog is set to 1.  

The other component is due to the Fast Lubrication Dynamics (FLD) approximation, described in (Kumar). The equation being solved to balance the forces and torques is  

$$
-R_{F U}(U-U^{\infty})=-R_{F E}E^{\infty}-F^{r e s t}
$$  

where U represents the velocities and angular velocities of the particles, $U^{\infty}$ represents the velocities and the angular velocities of the undisturbed fluid, and $E^{\infty}$ represents the rate of strain tensor of the undisturbed fluid flow with viscosity mu. Again, note that this is dynamic viscosity which has units of mass/distance/time, not kinematic viscosity. Volume fraction corrections to R_FU are included if $\it{f l a g V F}$ is set to 1 (default).  

Frest represents the forces and torques due to all other types of interactions, e.g. Brownian, electrostatic etc. Note that this algorithm neglects the inertial terms, thereby removing the restriction of resolving the small interial time scale, which may not be of interest for colloidal particles. These pair styles solve for the velocity such that the hydrodynamic force balances all other types of forces, thereby resulting in a net zero force (zero inertia limit). When defining these pair styles, they must be defined last so that when these styles are invoked all other types of forces have already been computed. For the same reason, they won’t work if additional non-pair styles are defined (such as bond or Kspace forces) as they are calculated in LAMMPS after the pairwise interactions have been computed.  

# Note  

When using these styles, the pair styles are designed to be used with implicit time integration and a correspondingly larger timestep. Thus either fix nve/noforce should be used for spherical particles defined via atom_style sphere or fix nve/asphere/noforce should be used for spherical particles defined via atom_style ellipsoid. This is because the velocity and angular momentum of each particle is set by the pair style, and should not be reset by the time integration fix.  

Style lubricateU requires monodisperse spherical particles; style lubricateU/poly allows for polydisperse spherical particles.  

If the suspension is sheared via the fix deform command then the pair style uses the shear rate to adjust the hydrodynamic interactions accordingly. Volume changes due to fix deform are accounted for when computing the volume fraction corrections to R_FU.  

When computing the volume fraction corrections to R_FU, the presence of walls (whether moving or stationary) will affect the volume fraction available to colloidal particles. This is currently accounted for with the following types of walls: wall/lj93, wall/lj126, wall/colloid, and wall/harmonic. For these wall styles, the correct volume fraction will be used when walls do not coincide with the box boundary, as well as when walls move and thereby cause a change in the volume fraction. To use these wall styles with pair_style lubricate $U$ or lubricateU/poly, the fld yes option must be specified in the fix wall command. Other wall styles may still work, but they will result in the volume fraction being computed based on the box boundaries. Several wall styles are not compatible with these pair styles and using them will result in an error.  

Since lubrication forces are dissipative, it is usually desirable to thermostat the system at a constant temperature. If Brownian motion (at a constant temperature) is desired, it can be set using the pair_style brownian command. These pair styles and the brownian style should use consistent parameters for mu, flaglog, flagfld, cutinner, cutoff, flagHI and flagVF.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• cutinner (distance units) • cutoff (distance units)  

The two coefficients are optional. If neither is specified, the two cutoffs specified in the pair_style command are used.   
Otherwise both must be specified.  

# 4.174.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{\textbf{I}}!=\mathrm{\textbf{J}}$ , the two cutoff distances for this pair style can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

These pair styles do not support the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for these pair styles.  

These pair styles do not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They does not support the inner, middle, outer keywords.  

# 4.174.5 Restrictions  

These styles are part of the COLLOID package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Currently, these pair styles assume that all other types of forces/torques on the particles have been already been computed when it is invoked. This requires this style to be defined as the last of the pair styles, and that no fixes apply additional constraint forces. One exception is the fix wall/colloid commands, which has an “fld” option to apply their wall forces correctly.  

Only spherical monodisperse particles are allowed for pair_style lubricateU.  

Only spherical particles are allowed for pair_style lubricateU/poly.  

For sheared suspensions, it is assumed that the shearing is done in the xy plane, with x being the velocity direction and y being the velocity-gradient direction. In this case, one must use fix deform with the same rate of shear (erate).  

These pair styles are only compatible with the following wall fixes: doc:fix wall/lj93, fix wall/lj126, fix wall/lj1043, fix wall/colloid, fix wall/harmonic, fix wall/lepton, fix wall/morse, fix wall/table <fix_wall>.  

# 4.174.6 Related commands  

pair_coeff , pair_style lubricate  

# 4.174.7 Default  

The default settings for the optional args are fla $\mathrm{gHI}=1$ and $\mathrm{{flagVF}=1}$ .  

(Ball) Ball and Melrose, Physica A, 247, 444-472 (1997).   
(Kumar) Kumar and Higdon, Phys Rev E, 82, 051401 (2010).  

4.175 pair_style lj/mdf command  

4.176 pair_style buck/mdf command  

4.177 pair_style lennard/mdf command  

# 4.177.1 Syntax  

pair_style style args  

• style $=$ lj/mdf or buck/mdf or lennard/mdf   
• args $=$ list of arguments for a particular style lj/mdf $\mathrm{{trgs}=\mathrm{{cu}}}$ toff1 cutoff2 cutoff1 $=$ inner cutoff for the start of the tapering function cutoff1 $=$ out cutoff for the end of the tapering function buck/mdf args $=$ cutoff1 cutoff2 cutoff1 $=$ inner cutoff for the start of the tapering function cutoff1 $=$ out cutoff for the end of the tapering function lennard/mdf args $=$ cutoff1 cutoff2 cutoff1 $=$ inner cutoff for the start of the tapering function cutoff1 $=$ out cutoff for the end of the tapering function  

# 4.177.2 Examples  

pair_style lj/mdf 2.5 3.0   
pair_coeff \* \* 1.0 1.0   
pair_coeff 1 1 1.1 2.8 3.0 3.2   
pair_style buck/mdf 2.5 3.0   
pair_coeff \* \* 100.0 1.5 200.0   
pair_coeff \* \* 100.0 1.5 200.0 3.0 3.5   
pair_style lennard/mdf 2.5 3.0   
pair_coeff \* \* 1.0 1.0   
pair_coeff 1 1 1021760.3664 2120.317338 3.0 3.2  

# 4.177.3 Description  

The lj/mdf, buck/mdf and lennard/mdf compute the standard 12-6 Lennard-Jones and Buckingham potential with the addition of a taper function that ramps the energy and force smoothly to zero between an inner and outer cutoff.  

$$
E_{s m o o t h}(r)=E(r)*f(r)
$$  

The tapering, $f(r)$ , is done by using the Mei, Davenport, Fernando function (Mei).  

$$
\begin{array}{l}{{f(r)=1.0\qquad\mathrm{for}\qquadr<r_{m}}}\ {{f(r)=(1-x)^{3}*(1+3x+6x^{2})\quad\mathrm{for}\qquadr_{m}<r<r_{c u t}}}\ {{f(r)=0.0\qquad\mathrm{for}\qquadr>=r_{c u t}}}\end{array}
$$  

where  

$$
x=\frac{(r-r_{m})}{(r_{c u t}-r_{m})}
$$  

Here $r_{m}$ is the inner cutoff radius and $r_{c u t}$ is the outer cutoff radius.  

For the lj/mdf pair_style, the potential energy, $E(r)$ , is the standard 12-6 Lennard-Jones written in the epsilon/sigma form:  

$$
E(r)=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{12}-\left({\frac{\sigma}{r}}\right)^{6}\right]
$$  

Either the first two or all of the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file read by the read_data. The two cutoffs default to the global values and ε and $\sigma$ can also be determined by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • $r_{m}$ (distance units) • $r_{c u t}$ (distance units)  

For the buck/mdf pair_style, the potential energy, $E(r)$ , is the standard Buckingham potential with three required coefficients. The two cutoffs can be omitted and default to the corresponding global values:  

$$
E(r)=A e^{(-r/\rho)}-\frac{C}{r^{6}}
$$  

• A (energy units) • $\rho$ (distance units) • $C$ (energy-distance^6 units) • $r_{m}$ (distance units) • $r_{c u t}$ (distance units)  

For the lennard/mdf pair_style, the potential energy, $E(r)$ , is the standard 12-6 Lennard-Jones written in the A/B form:  

$$
E(r)=\frac{A}{r^{12}}-\frac{B}{r^{6}}
$$  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file read by the read_data commands, or by mixing as described below. The two cutoffs default to their global values and must be either both given or both left out:  

• A (energy-distance^12 units) • $B$ (energy-distance $\wedge_{6}$ units) • $r_{m}$ (distance units) • $r_{c u t}$ (distance units)  

# 4.177.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the $\varepsilon$ and $\sigma$ coefficients and cutoff distances for the $\mathrm{{lj/mdf}}$ pair style can be mixed. The default mix value is geometric. See the “pair_modify” command for details. The other two pair styles buck/mdf and lennard/mdf do not support mixing, so all I,J pairs of coefficients must be specified explicitly.  

None of the lj/mdf, buck/mdf, or lennard/mdf pair styles supports the pair_modify shift option or long-range tail corrections to pressure and energy.  

These styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.177.5 Restrictions  

These pair styles can only be used if LAMMPS was built with the EXTRA-PAIR package. See the Build package doc page for more info.  

# 4.177.6 Related commands  

pair_coeff  

# 4.177.7 Default  

(Mei) Mei, Davenport, Fernando, Phys Rev B, 43 4653 (1991)  

# 4.178 pair_style meam command  

Accelerator Variants: meam/kk  

# 4.179 pair_style meam/ms command  

Accelerator Variants: meam/ms/kk  

# 4.179.1 Syntax  

# 4.179.3 Description  

![](images/614a0585c4856b0c9ccc667e75218688e81b16a51bc9b231454f10de84d5479c.jpg)  

# Note  

The behavior of the MEAM potential for alloy systems has changed as of November 2010; see description below of the mixture_ref_t parameter  

Pair style meam computes non-bonded interactions for a variety of materials using the modified embedded-atom method (MEAM) (Baskes). Conceptually, it is an extension to the original EAM method which adds angular forces. It is thus suitable for modeling metals and alloys with fcc, bcc, hcp and diamond cubic structures, as well as materials with covalent interactions like silicon and carbon.  

The meam pair style is a translation of the original Fortran version to $\mathrm{C}{+}{+}$ . It is functionally equivalent but more efficient and has additional features. The Fortran version of the meam pair style has been removed from LAMMPS after the 12 December 2018 release.  

Pair style meam/ms uses the multi-state MEAM (MS-MEAM) method according to (Baskes2), which is an extension to MEAM. This pair style is mostly equivalent to meam and differs only where noted in the documentation below.  

In the MEAM formulation, the total energy $\mathrm{\bfE}$ of a system of atoms is given by:  

$$
E=\sum_{i}\left\{F_{i}(\bar{\rho}_{i})+\frac{1}{2}\sum_{i=j}\phi_{i j}(r_{i j})\right\}
$$  

where $F$ is the embedding energy which is a function of the atomic electron density $\rho$ , and $\phi$ is a pair potential interaction. The pair interaction is summed over all neighbors J of atom I within the cutoff distance. As with EAM, the multi-body nature of the MEAM potential is a result of the embedding energy term. Details of the computation of the embedding and pair energies, as implemented in LAMMPS, are given in (Gullet) and references therein.  

The various parameters in the MEAM formulas are listed in two files which are specified by the pair_coeff command. These are ASCII text files in a format consistent with other MD codes that implement MEAM potentials, such as the serial DYNAMO code and Warp. Several MEAM potential files with parameters for different materials are included in the “potentials” directory of the LAMMPS distribution with a “.meam” suffix. All of these are parameterized in terms of LAMMPS metal units.  

Note that unlike for other potentials, cutoffs for MEAM potentials are not set in the pair_style or pair_coeff command;   
they are specified in the MEAM potential files themselves.  

Only a single pair_coeff command is used with the meam style which specifies two MEAM files and the element(s) to extract information for. The MEAM elements are mapped to LAMMPS atom types by specifying N additional arguments after the second filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• MEAM library file   
• Element1, Element2, . . .   
• MEAM parameter file   
• N element names $=$ mapping of MEAM elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential files.  

As an example, the potentials/library.meam file has generic MEAM settings for a variety of elements. The potentials/SiC.meam file has specific parameter settings for a Si and C alloy system. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Si, and the fourth to be C, you would use the following pair_coeff command:  

pair_coeff \* \* library.meam Si C sic.meam Si Si Si C  

The first 2 arguments must be $**_{\mathrm{~\tiny~S~O~}}$ as to span all LAMMPS atom types. The first filename is the element library file. The list of elements following it extracts lines from the library file and assigns numeric indices to these elements. The second filename is the alloy parameter file, which refers to elements using the numeric indices assigned before. The arguments after the parameter file map LAMMPS atom types to elements, i.e. LAMMPS atom types 1,2,3 to the MEAM Si element. The final C argument maps LAMMPS atom type 4 to the MEAM C element.  

If the second filename is specified as NULL, no parameter file is read, which simply means the generic parameters in the library file are used. Use of the NULL specification for the parameter file is discouraged for systems with more than a single element type (e.g. alloys), since the parameter file is expected to set element interaction terms that are not captured by the information in the library file.  

If a mapping value is specified as NULL, the mapping is not performed. This can be used when a meam potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

![](images/92229a27532de088102f3632509cbc2ab7c603a61cacfa8d5626ec96f6f10c38.jpg)  

# Note  

If the second filename is NULL, the element names between the two filenames can appear in any order, e.g. “Si C” or “C Si” in the example above. However, if the second filename is not NULL (as in the example above), it contains settings that are indexed by numbers for the elements that precede it. Thus you need to ensure that you list the elements between the filenames in an order consistent with how the values in the second filename are indexed. See details below on the syntax for settings in the second file.  

The MEAM library file provided with LAMMPS has the name potentials/library.meam. It is the “meamf” file used by other MD codes. Aside from blank and comment lines (starting with # which can appear anywhere), it is formatted as a series of entries, each of which has 19 parameters and can span multiple lines:  

elt, lat, z, ielement, atwt, alpha, b0, b1, b2, b3, alat, esub, asub, t0, t1, t2, t3, rozero, ibar  

The elt and lat parameters are text strings, such as $e l t=\mathrm{Si}$ or $\mathrm{Cu}$ and $l a t=$ dia or fcc. Because the library file is used by Fortran MD codes, these strings may be enclosed in single quotes, but this is not required. The other numeric parameters match values in the formulas above. The value of the elt string is what is used in the pair_coeff command to identify which settings from the library file you wish to read in. There can be multiple entries in the library file with the same elt value; LAMMPS reads the first matching entry it finds and ignores the rest.  

Other parameters in the MEAM library file correspond to single-element potential parameters:  

lat $=$ lattice structure of reference configuration   
z $=$ number of nearest neighbors in the reference structure   
ielement $=$ atomic number   
atwt $=$ atomic weight   
alat $=$ lattice constant of reference structure   
esub $=$ energy per atom (eV) in the reference structure at equilibrium   
asub $="\mathrm{A}"$ parameter for MEAM (see e.g. (Baskes))  

The alpha, $b O,b l,b2,b3,t O,t l,t2,t3$ parameters correspond to the standard MEAM parameters in the literature (Baskes) (the b parameters are the standard beta parameters). Note that only parameters normalized to $t0=I.0$ are supported. The rozero parameter is an element-dependent density scaling that weights the reference background density (see e.g. equation 4.5 in (Gullet)) and is typically 1.0 for single-element systems. The ibar parameter selects the form of the function G(Gamma) used to compute the electron density; options are  

0 => G = sqrt(1+Gamma) $1=>\mathrm{G}=\exp(\mathrm{Gamma}/2)$ $2=>$ not implemented $3=>\mathrm{G}=2/(1{+}\exp(\mathrm{-}\mathrm{Gamma}))$  

(continues on next page)  

(continued from previous page)  

$4=>\mathrm{G}=\mathrm{sqrt}(1+\mathrm{Gamma})$ $-5=>\mathrm{G}=+\mathrm{-sqrt}(\mathrm{abs}(1+\mathrm{Gamma}))$  

If used, the MEAM parameter file contains settings that override or complement the library file settings. Examples of such parameter files are in the potentials directory with a “.meam” suffix. Their format is the same as is read by other Fortran MD codes. Aside from blank and comment lines (start with # which can appear anywhere), each line has one of the following forms. Each line can also have a trailing comment (starting with #) which is ignored.  

keyword = value keyword(I) $=$ value keyword(I,J) = value keyword(I,J,K) = value  

The indices I, J, K correspond to the elements selected from the MEAM library file numbered in the order of how those elements were selected starting from 1. Thus for the example given before  

pair_coeff \* \* library.meam Si C sic.meam Si Si Si C an index of 1 would refer to Si and an index of 2 to C.  

The recognized keywords for the parameter file are as follows:  

rc $=$ cutoff radius for cutoff function; default $=4.0$   
delr $=$ length of smoothing distance for cutoff function; default = 0.1   
rho0(I) $=$ relative density for element I (overwrites value read from meamf file)   
$\mathrm{Ec}(\mathrm{I},\mathrm{J})$ $=$ cohesive energy of reference structure for I-J mixture   
delta(I,J) $=$ heat of formation for I-J alloy; if $\mathrm{Ec\_IJ}$ is input as zero, then LAMMPS sets $\mathrm{Ec\_IJ}=(\mathrm{Ec\_II}+\mathrm{Ec\_JJ})/2\cdot\mathrm{delta\_IJ}$   
alpha(I,J) = alpha parameter for pair potential between I and J (can be computed from bulk modulus of reference structure)   
re(I,J) $=$ equilibrium distance between I and J in the reference structure   
Cmax(I,J,K) = Cmax screening parameter when I-J pair is screened by K (I<=J); default = 2.8   
$\operatorname{Cmin}(\mathrm{I},\mathrm{J},\mathrm{K})=\operatorname{Cmin}$ screening parameter when I-J pair is screened by K ( $1<=\mathrm{J}$ ); $\mathrm{default}=2.0$   
lattce(I,J) = lattice structure of I-J reference structure: fcc = face centered cubic bcc = body centered cubic hcp = hexagonal close-packed dim = dimer dia = diamond (interlaced fcc for alloy) dia3= diamond structure with primary 1NN and secondary 3NN interaction b1 = rock salt (NaCl structure) $\mathrm{c11}=\mathrm{MoSi2}$ structure l12 = Cu3Au structure (lower case L, followed by 12) b2 = CsCl structure (interpenetrating simple cubic) ch4 = methane-like structure, only for binary system lin = linear structure (180 degree angle) zig = zigzag structure with a uniform angle tri = H2O-like structure that has an angle sc = simple cubic  

nn2(I,J) = turn on second-nearest neighbor MEAM formulation for  

I-J pair (see for example (Lee)). $0=$ second-nearest neighbor formulation off 1 = second-nearest neighbor formulation on default = 0   
attrac(I,J) = additional cubic attraction term in Rose energy I-J pair potential default = 0   
repuls(I,J) = additional cubic repulsive term in Rose energy I-J pair potential default = 0 = blend the MEAM I-J pair potential with the ZBL potential for small atom separations (ZBL) default = 1   
theta(I,J) = angle between three atoms in line, zigzag, and trimer reference structures in degrees default = 180   
gsmooth_factor $=$ factor determining the length of the G-function smoothing region; only significant for ibar=0 or ibar=4. 99.0 = short smoothing region, sharp step $0.5=\mathrm{{long}}$ smoothing region, smooth step default = 99.0   
augt1 = integer flag for whether to augment t1 parameter by 3/5\*t3 to account for old vs. new meam formulations; $0=\mathrm{don^{\prime}t}$ augment t1 1 = augment t1 default = 1   
ialloy = integer flag to use alternative averaging rule for t parameters, for comparison with the DYNAMO MEAM code $0=$ standard averaging (matches ialloy=0 in DYNAMO) $1=$ alternative averaging (matches ialloy=1 in DYNAMO) $2=\mathrm{no}$ averaging of t (use single-element values) default = 0   
mixture_ref_t = integer flag to use mixture average of t to compute the background reference density for alloys, instead of the single-element values (see description and warning elsewhere in this doc page) $0=\mathrm{do}$ not use mixture averaging for $\mathrm{t}$ in the reference density 1 = use mixture averaging for t in the reference density default = 0   
erose_form $=$ integer value to select the form of the Rose energy function (see description below). default = 0   
emb_lin_neg $=$ integer value to select embedding function for negative densities $0=\mathrm{F(rho)}{=}0$ 1 = F(rho) = -asub\*esub\*rho (linear in rho, matches DYNAMO) default = 0   
bkgd_dyn $=$ integer value to select background density formula $0=\mathrm{rho\_bkgd}=\mathrm{rho\_ref\_meam(a)}$ (as in the reference structure) ${\begin{array}{l}{1={\mathrm{~rho}}{\underline{{\mathbf{\Pi}}}}{\mathrm{bkgd}}={\mathrm{rho0}}{\underline{{\mathbf{\Pi}}}}{\mathrm{meam(a)}}^{*}\mathrm{Z}_{-}}\ {{\mathrm{default}}=0}\end{array}}$ meam(a) (matches DYNAMO)  

Rc, delr, re are in distance units (Angstroms in the case of metal units). $E c$ and delta are in energy units (eV in the case of metal units).  

Each keyword represents a quantity which is either a scalar, vector, 2d array, or 3d array and must be specified with the correct corresponding array syntax. The indices I,J,K each run from 1 to $\mathbf{N}$ where N is the number of MEAM elements being used.  

Thus these lines  

<html><body><table><tr><td>rho0(2) = 2.25 alpha(1,2) = 4.37</td></tr></table></body></html>  

set rho0 for the second element to the value 2.25 and set alpha for the alloy interaction between elements 1 and 2 to 4.37.  

The augt1 parameter is related to modifications in the MEAM formulation of the partial electron density function. In recent literature, an extra term is included in the expression for the third-order density in order to make the densities orthogonal (see for example (Wang), equation 3d); this term is included in the MEAM implementation in LAMMPS. However, in earlier published work this term was not included when deriving parameters, including most of those provided in the library.meam file included with LAMMPS, and to account for this difference the parameter $t I$ must be augmented by $3/5^{**}\mathfrak{t}3^{*}$ . If $a u g t I=1$ , the default, this augmentation is done automatically. When parameter values are fit using the modified density function, as in more recent literature, augt1 should be set to 0.  

The mixture_ref_t parameter is available to match results with those of previous versions of LAMMPS (before January 2011). Newer versions of LAMMPS, by default, use the single-element values of the $t$ parameters to compute the background reference density. This is the proper way to compute these parameters. Earlier versions of LAMMPS used an alloy mixture averaged value of $t$ to compute the background reference density. Setting mixture_ref_ $t=1$ gives the old behavior. WARNING: using mixture_ref_ $t=1$ will give results that are demonstrably incorrect for second-neighbor MEAM, and non-standard for first-neighbor MEAM; this option is included only for matching with previous versions of LAMMPS and should be avoided if possible.  

The parameters attrac and repuls, along with the integer selection parameter erose_form, can be used to modify the Rose energy function used to compute the pair potential. This function gives the energy of the reference state as a function of interatomic spacing. The form of this function is:  

astar $=$ alpha \* (r/re - 1.d0)   
if erose_form $=0$ : ero $\mathrm{se=-Ec^{*}(1+a s t a r+a3^{*}(a s t a r^{**}3)/(r/r e))^{*}e x p(-a s t a r)}$   
if erose_form $=1$ : $\mathrm{erose}=-\mathrm{Ec}^{*}(1+\mathrm{astar}+(-\mathrm{attrac}+\mathrm{repuls}/\mathrm{r})^{*}(\mathrm{astar}^{**}3))^{*}\mathrm{exp}(-\mathrm{astar})^{}$   
if erose_form = 2: $\mathrm{erose}=\mathrm{-Ec}^{*}(1+\mathrm{astar}+\mathrm{a3}^{*}(\mathrm{astar}^{**}3))^{*}\mathrm{exp}(\$ -astar)   
$\mathrm{a3=}$ repuls, astar < 0   
$\mathrm{a3=}$ attrac, astar >= 0  

Most published MEAM parameter sets use the default values $a t t r a c=r e p u l s e=0$ . Setting $r e p u l s=a t t r a c=d e l t a$ corresponds to the form used in several recent published MEAM parameter sets, such as (Valone)  

Then using meam/ms pair style the multi-state MEAM (MS-MEAM) method is activated. This requires 6 extra parameters in the MEAM library file, resulting in 25 parameters ordered that are ordered like this:  

elt, lat, z, ielement, atwt, alpha, b0, b1, b2, b3, b1m, b2m, b3m, alat, esub, asub, t0, t1, t2, t3, t1m, t2m, t3m, rozero, ibar  

The 6 extra MS-MEAM parameters are b1m, b2m, b3m, t1m, t2m, t3m. In the LAMMPS potentials folder, compatible files have an “.msmeam” extension.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

![](images/06b32bb416141576cb19505305da9687ec91bbdb69659368e0eac5b1fa93535b.jpg)  

# Note  

The default form of the erose expression in LAMMPS was corrected in March 2009. The current version is correct, but may show different behavior compared with earlier versions of LAMMPS with the attrac and/or repuls parameters are non-zero. To obtain the previous default form, use erose_form $=1$ (this form does not seem to appear in the literature). An alternative form (see e.g. (Lee2)) is available using erose_form $=2$ .  

# 4.179.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS with user-specifiable parameters as described above.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.179.5 Restrictions  

The meam and meam/ms pair styles are provided in the MEAM package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The maximum number of elements that can be read from the MEAM library file is determined at compile time. The default is 8. If you need support for more elements, you have to change the the constant ‘MAXELT’ at the beginning of the file src/MEAM/meam.h and update/recompile LAMMPS. There is no limit on the number of atoms types.  

# 4.179.6 Related commands  

pair_coeff , pair_style eam, pair_style meam/spline  

# 4.179.7 Default  

none  

(Baskes) Baskes, Phys Rev B, 46, 2727-2742 (1992).   
(Baskes2) Baskes, Phys Rev B, 75, 094113 (2007).   
(Gullet) Gullet, Wagner, Slepoy, SANDIA Report 2003-8782 (2003). DOI:10.2172/918395 This report may be accessed on-line via this link.   
(Lee) Lee, Baskes, Phys. Rev. B, 62, 8564-8567 (2000).   
(Lee2) Lee, Baskes, Kim, Cho. Phys. Rev. B, 64, 184102 (2001).   
(Valone) Valone, Baskes, Martin, Phys. Rev. B, 73, 214209 (2006).   
(Wang) Wang, Van Hove, Ross, Baskes, J. Chem. Phys., 121, 5410 (2004).   
(ZBL) J.F. Ziegler, J.P. Biersack, U. Littmark, “Stopping and Ranges of Ions in Matter”, Vol 1, 1985, Pergamon Press.  

# 4.180 pair_style meam/spline command  

Accelerator Variants: meam/spline/omp  

# 4.180.1 Syntax  

# 4.180.2 Examples  

pair_style meam/spline pair_coeff \* \* Ti.meam.spline Ti pair_coeff \* \* Ti.meam.spline Ti O  

# 4.180.3 Description  

The meam/spline style computes pairwise interactions for metals using a variant of modified embedded-atom method (MEAM) potentials (Lenosky). For a single species (“old-style”) MEAM, the total energy $\mathrm{\bfE}$ is given by  

$$
\begin{array}{l}{E=\displaystyle\sum_{i<j}\phi(r_{i j})+\sum_{i}U(n_{i})}\ {{n_{i}=\displaystyle\sum_{j}\rho(r_{i j})+\sum_{j<k,}f(r_{i j})f(r_{i k})g[\cos(\theta_{j i k})]}}\ {{\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad}{j,k\ne i}}\end{array}
$$  

where $\rho_{i}$ is the density at atom I, $\theta_{j i k}$ is the angle between atoms $\mathrm{J},\mathrm{I}$ , and $\mathrm{K}$ centered on atom I. The five functions $\phi,U,\rho,f$ , and $g$ are represented by cubic splines.  

The meam/spline style also supports a new style multicomponent modified embedded-atom method (MEAM) potential (Zhang), where the total energy $\mathrm{E}$ is given by  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\sum_{i<j}\phi_{i j}(r_{i j})+\sum_{i}U_{i}(n_{i})}}\ {{\displaystyle n_{i}=\sum_{j\neq i}\rho_{j}(r_{i j})+\sum_{j<k,}f_{j}(r_{i j})f_{k}(r_{i k})g_{j k}[\cos(\theta_{j i k})]}}\ {{\displaystyle j,k\neq i}}\end{array}
$$  

where the five functions $\phi,U,\rho,f$ , and $g$ depend on the chemistry of the atoms in the interaction. In particular, if there are $\mathbf{N}$ different chemistries, there are $\mathbf{N}$ different $U,\rho$ , and $f$ functions, while there are $\mathrm{N}(\mathrm{N}{+}1)/2$ different $\phi$ and $g$ functions. The new style multicomponent MEAM potential files are indicated by the second line in the file starts with “meam/spline” followed by the number of elements and the name of each element.  

The cutoffs and the coefficients for these spline functions are listed in a parameter file which is specified by the pair_coeff command. Parameter files for different elements are included in the “potentials” directory of the LAMMPS distribution and have a “.meam.spline” file suffix. All of these files are parameterized in terms of LAMMPS metal units.  

Note that unlike for other potentials, cutoffs for spline-based MEAM potentials are not set in the pair_style or pair_coeff command; they are specified in the potential files themselves.  

Unlike the EAM pair style, which retrieves the atomic mass from the potential file, the spline-based MEAM potential do not include mass information; thus you need to use the mass command to specify it.  

Only a single pair_coeff command is used with the meam/spline style which specifies a potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename  

• N element names $=$ mapping of spline-based MEAM elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine the Ti.meam.spline file has values for Ti (old style). In that case your LAMMPS simulation may only have one atom type which has to be mapped to the Ti element as follows:  

pair_coeff \* \* Ti.meam.spline Ti  

The first 2 arguments must be $**$ and there may be only one element following or NULL. Systems where there would be multiple atom types assigned to the same element are not supported by this pair style due to limitations in its implementation. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a meam/spline potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

An example with a two component spline (new style) is TiO.meam.spline, where the command  

pair_coeff \* \* TiO.meam.spline Ti O  

will map the first atom type to Ti and the second atom type to O. Note in this case that the species names need to match exactly with the names of the elements in the TiO.meam.spline file; otherwise an error will be raised. This behavior is different than the old style MEAM files.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.180.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify shift, table, and tail options.  

The meam/spline pair style does not write its information to binary restart files, since it is stored in an external potential parameter file. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

The meam/spline pair style can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.180.5 Restrictions  

This pair style requires the newton setting to be “on” for pair interactions.  

This pair style does not support mapping multiple atom types to the same element.  

This pair style is only enabled if LAMMPS was built with the MANYBODY package. See the Build package page for more info.  

# 4.180.6 Related commands  

pair_coeff , pair_style meam  

# 4.180.7 Default  

none  

(Lenosky) Lenosky, Sadigh, Alonso, Bulatov, de la Rubia, Kim, Voter, Kress, Modelling Simulation Materials Science Engineering, 8, 825 (2000).   
(Zhang) Zhang and Trinkle, Computational Materials Science, 124, 204-210 (2016).  

# 4.181 pair_style meam/sw/spline command  

# 4.181.1 Syntax  

# 4.181.2 Examples  

pair_style meam/sw/spline pair_coeff \* \* Ti.meam.sw.spline Ti pair_coeff \* \* Ti.meam.sw.spline Ti Ti Ti  

# 4.181.3 Description  

The meam/sw/spline style computes pairwise interactions for metals using a variant of modified embedded-atom method (MEAM) potentials (Lenosky) with an additional Stillinger-Weber (SW) term (Stillinger) in the energy. This form of the potential was first proposed by Nicklas, Fellinger, and Park (Nicklas). We refer to it as MEAM $.+\mathrm{SW}$ . The total energy E is given by  

$$
\begin{array}{c}{{\displaystyle{E=E_{M E A M}+E_{S W}}}}\ {{\displaystyle{E_{M E A M}=\sum_{I J}\phi(r_{I J})+\sum_{I}U(\rho_{I})}}}\ {{\displaystyle{E_{S W}=\sum_{I}\sum_{J K}F(r_{I J})F(r_{I K})G(\cos(\theta_{J I K}))}}}\ {{\displaystyle{\rho_{I}=\sum_{J}\rho(r_{I J})+\sum_{J K}f(r_{I J})f(r_{I K})g(\cos(\theta_{J I K}))}}}\end{array}
$$  

where $\rho_{I}$ is the density at atom I, $\theta_{J I K}$ is the angle between atoms $\mathrm{J},\mathrm{I}$ , and $\mathrm{K}$ centered on atom I. The seven functions $\phi,F,G,U,\rho,f$ , and $g$ are represented by cubic splines.  

The cutoffs and the coefficients for these spline functions are listed in a parameter file which is specified by the pair_coeff command. Parameter files for different elements are included in the “potentials” directory of the LAMMPS distribution and have a “.meam.sw.spline” file suffix. All of these files are parameterized in terms of LAMMPS metal units.  

Note that unlike for other potentials, cutoffs for spline-based MEAM $+\mathrm{SW}$ potentials are not set in the pair_style or pair_coeff command; they are specified in the potential files themselves.  

Unlike the EAM pair style, which retrieves the atomic mass from the potential file, the spline-based MEAM+SW potentials do not include mass information; thus you need to use the mass command to specify it.  

Only a single pair_coeff command is used with the meam/sw/spline style which specifies a potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of spline-based MEAM $+\mathrm{SW}$ elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine the Ti.meam.sw.spline file has values for Ti. If your LAMMPS simulation has 3 atoms types and they are all to be treated with this potential, you would use the following pair_coeff command:  

pair_coeff \* \* Ti.meam.sw.spline Ti Ti Ti  

The first 2 arguments must be $^{**}$ so as to span all LAMMPS atom types. The three Ti arguments map LAMMPS atom types 1,2,3 to the Ti element in the potential file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a meam/sw/spline potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

![](images/302d4c2d83a2a1f6447b2b468cac5c86dc5f547c052a8887f5bb397a2637c3d8.jpg)  

# Note  

The meam/sw/spline style currently supports only single-element MEAM $+\mathrm{SW}$ potentials. It may be extended for alloy systems in the future.  

Example input scripts that use this pair style are provided in the examples/PACKAGES/meam_sw_spline directory.  

# 4.181.4 Mixing, shift, table, tail correction, restart, rRESPA info  

The pair style does not support multiple element types or mixing. It has been designed for pure elements only.  

This pair style does not support the pair_modify shift, table, and tail options.  

The meam/sw/spline pair style does not write its information to binary restart files, since it is stored in an external potential parameter file. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

The meam/sw/spline pair style can only be used via the pair keyword of the run_style respa command. They do no support the inner, middle, outer keywords.  

# 4.181.5 Restrictions  

This pair style requires the newton setting to be “on” for pair interactions.  

This pair style is only enabled if LAMMPS was built with the MANYBODY package. See the Build package page for more info.  

# 4.181.6 Related commands  

pair_coeff , pair_style meam, pair_style meam/spline  

# 4.181.7 Default  

none  

(Lenosky) Lenosky, Sadigh, Alonso, Bulatov, de la Rubia, Kim, Voter, Kress, Modell. Simul. Mater. Sci. Eng. 8, 825 (2000).  

(Stillinger) Stillinger, Weber, Phys. Rev. B 31, 5262 (1985).  

(Nicklas) The spline-based $\mathbf{MEAM{+}S W}$ format was first devised and used to develop potentials for bcc transition metals by Jeremy Nicklas, Michael Fellinger, and Hyoungki Park at The Ohio State University.  

# 4.182 pair_style mesocnt command  

# 4.183 pair_style mesocnt/viscous command  

# 4.183.1 Syntax  

pair_style style neigh_cutoff mode neigh_mode • style $=$ mesocnt or mesocnt/viscous • neigh_cutof $=$ neighbor list cutoff (distance units) • mode $=$ chain or segment (optional) • neigh_mode $=i d$ or topology (optional)  

# 4.183.2 Examples  

pair_style mesocnt 30.0 pair_coeff \* \* C_10_10.mesocnt 2 pair_style mesocnt/viscous 60.0 chain topology pair_coeff \* \* C_10_10.mesocnt 0.001 20.0 0.2 2 4  

# 4.183.3 Description  

Style mesocnt implements a mesoscopic potential for the interaction of carbon nanotubes (CNTs), or other quasi-1D objects such as other kinds of nanotubes or nanowires. In this potential, CNTs are modelled as chains of cylindrical segments in which each infinitesimal surface element interacts with all other CNT surface elements with the LennardJones (LJ) term adopted from the airebo style. The interaction energy is then computed by integrating over the surfaces of all interacting CNTs.  

In LAMMPS, cylindrical segments are represented by bonds. Each segment is defined by its two end points (“nodes”) which correspond to atoms in LAMMPS. For the exact functional form of the potential and implementation details, the reader is referred to the original papers (Volkov1) and (Volkov2).  

Changed in version 15Sep2022.  

The potential supports two modes, segment and chain. By default, chain mode is enabled. In segment mode, interactions are pair-wise between all neighboring segments based on a segment-segment approach (keyword segment in pair_style command). In chain mode, interactions are calculated between each segment and infinitely or semi-infinitely long CNTs as described in (Volkov1). Chains of segments are converted to these (semi-)infinite CNTs bases on an approximate chain approach outlined in (Volkov2). Hence, interactions are calculated on a segment-chain basis (keyword chain in the pair_style command). Using chain mode allows to simplify the computation of the interactions significantly and reduces the computational times to the same order of magnitude as for regular bead spring models where beads interact with the standard pair_lj/cut potential. However, this method is only valid when the curvature of the CNTs in the system is small. When CNTs are buckled (see angle_mesocnt), local curvature can be very high and the pair_style automatically switches to segment mode for interactions involving buckled CNTs.  

The potential further implements two different neighbor list construction modes. Mode id uses atom and mol IDs to construct neighbor lists while topology modes uses only the bond topology of the system. While id mode requires bonded atoms to have consecutive LAMMPS atom IDs and atoms in different CNTs to have different LAMMPS molecule IDs, topology mode has no such requirement. Using id mode is faster and is enabled by default.  

![](images/c6ec0ae3aabd788017f461f932fc57f6555ded08ddf99c4767488e56d85f7d3d.jpg)  

# Note  

Neighbor id mode requires all CNTs in the system to have distinct LAMMPS molecule IDs and bonded atoms to have consecutive LAMMPS atom IDs. If this is not possible (e.g. in simulations of CNT rings), topology mode needs to be enabled in the pair_style command.  

Added in version 15Sep2022.  

In addition to the LJ interactions described above, style mesocnt/viscous explicitly models friction between neighboring segments. Friction forces are a function of the relative velocity between a segment and its neighboring approximate chain (even in segment mode) and only act along the axes of the interacting segment and chain. In this potential, friction forces acting per unit length of a nanotube segment are modelled as a shifted logistic function:  

$$
F^{\mathrm{FRICTION}}(\nu)/L=\frac{F^{\mathrm{max}}}{1+\exp(-k(\nu-\nu_{0}))}-\frac{F^{\mathrm{max}}}{1+\exp(k\nu_{0})}
$$  

In the pair_style command, the modes described above can be toggled using the segment or chain keywords. The neighbor list cutoff defines the cutoff within which atoms are included in the neighbor list for constructing neighboring CNT chains. This is different from the potential cutoff, which is directly calculated from parameters specified in the potential file. We recommend using a neighbor list cutoff of at least 3 times the maximum segment length used in the simulation to ensure proper neighbor chain construction.  

![](images/01c552f986f63267c871c471d889b17a850f1c686ea0dca8be8fd80e8c991603.jpg)  

# Note  

CNT ends are treated differently by all mesocnt styles. Atoms on CNT ends need to be assigned different LAMMPS atom types than atoms not on CNT ends.  

Style mesocnt requires tabulated data provided in a single ASCII text file, as well as a list of integers corresponding to all LAMMPS atom types representing CNT ends:  

• filename • $N$ CNT end atom types  

For example, if your LAMMPS simulation of (10, 10) nanotubes has 4 atom types where atom types 1 and 3 are assigned to ‘inner’ nodes and atom types 2 and 4 are assigned to CNT end nodes, the pair_coeff command would be:  

Fmax   
• $k$   
• $\nu_{0}$   
• N CNT end atom types  

Using the same example system as with style mesocnt with the addition of friction, the pair_coeff command is:  

pair_coeff \* \* C_10_10.mesocnt 0.03 20.0 0.20 2 4  

Potential files for CNTs can be readily generated using the freely available code provided on  

Using the same approach, it should also be possible to generate potential files for other 1D systems mentioned above.  

# Note  

Because of their size, mesocnt style potential files are not bundled with LAMMPS. When compiling LAMMPS from source code, the file C_10_10.mesocnt should be downloaded separately from https://download.lammps. org/potentials/C_10_10.mesocnt  

The first line of the potential file provides a time stamp and general information. The second line lists four integers giving the number of data points provided in the subsequent four data tables. The third line lists four floating point numbers: the CNT radius R, the LJ parameter sigma and two numerical parameters delta1 and delta2. These four parameters are given in Angstroms. This is followed by four data tables each separated by a single empty line. The first two tables have two columns and list the parameters uInfParallel and Gamma respectively. The last two tables have three columns giving data on a quadratic array and list the parameters Phi and uSemiParallel respectively. uInfParallel and uSemiParallel are given in eV/Angstrom, Phi is given in eV and Gamma is unitless.  

If a simulation produces many warnings about segment-chain interactions falling outside the interpolation range, we recommend generating a potential file with lower values of delta1 and delta2.  

# 4.183.4 Mixing, shift, table, tail correction, restart, rRESPA info  

These pair styles does not support mixing.  

These pair styles does not support the pair_modify shift, table, and tail options.  

These pair styles do not write their information to binary restart files, since it is stored in tabulated potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.183.5 Restrictions  

These styles are part of the MESONT package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

These pair styles require the newton setting to be “on” for pair interactions.  

hese pair styles require all 3 special_bonds lj settings to be non-zero for proper neighbor list construction.  

Pair style mesocnt/viscous requires you to use the comm_modify vel yes command so that velocities are stored by ghost atoms.  

# 4.183.6 Related commands  

pair_coeff , bond_style mesocnt, angle_style mesocnt  

# 4.183.7 Default  

mode $=$ chain, neigh_mode $=$ id  

(Volkov1) Volkov and Zhigilei, J Phys Chem C, 114, 5513 (2010).   
(Volkov2) Volkov, Simov and Zhigilei, APS Meeting Abstracts, Q31.013 (2008).  

# 4.184 pair_style edpd command  

Accelerator Variants: edpd/gpu  

# 4.185 pair_style mdpd command  

Accelerator Variants: mdpd/gpu  

4.186 pair_style mdpd/rhosum command  

4.187 pair_style tdpd command  

# 4.187.1 Syntax  

# 4.187.2 Examples  

pair_style edpd 1.58 9872598   
pair_coeff \* \* 18.75 4.5 0.41 1.58 1.42E-5 2.0 1.58   
pair_coeff 1 1 18.75 4.5 0.41 1.58 1.42E-5 2.0 1.58 power 10.54 -3.66 3.44 -4.10   
pair_coeff 1 1 18.75 4.5 0.41 1.58 1.42E-5 2.0 1.58 power 10.54 -3.66 3.44 -4.10 kappa -0.44 -3.21 5.04 0.00   
pair_style hybrid/overlay mdpd/rhosum mdpd 1.0 1.0 65689   
pair_coeff 1 1 mdpd/rhosum 0.75   
pair_coeff 1 1 mdpd -40.0 25.0 18.0 1.0 0.75   
pair_style tdpd 1.0 1.58 935662   
pair_coeff \* \* 18.75 4.5 0.41 1.58 1.58 1.0 1.0E-5 2.0   
pair_coeff 1 1 18.75 4.5 0.41 1.58 1.58 1.0 1.0E-5 2.0 3.0 1.0E-5 2.0  

# 4.187.3 Description  

The edpd style computes the pairwise interactions and heat fluxes for eDPD particles following the formulations in (Li2014_JCP) and $L i2O I5\_C C$ . The time evolution of an eDPD particle is governed by the conservation of momentum and energy given by  

$$
\begin{array}{r}{\displaystyle\frac{\mathrm{d}^{2}\mathbf{r}_{i}}{\mathrm{d}t^{2}}=\displaystyle\frac{\mathrm{d}\mathbf{v}_{i}}{\mathrm{d}t}=\mathbf{F}_{i}=\sum_{i\neq j}(\mathbf{F}_{i j}^{C}+\mathbf{F}_{i j}^{D}+\mathbf{F}_{i j}^{R})}\ {\displaystyle C_{\nu}\frac{\mathrm{d}T_{i}}{\mathrm{d}t}=q_{i}=\sum_{i\neq j}(q_{i j}^{C}+q_{i j}^{V}+q_{i j}^{R}),}\end{array}
$$  

where the three components of $F_{i}$ including the conservative force $F_{i j}^{C}$ , dissipative force $F_{i j}^{D}$ and random force ${\cal F}_{i j}^{R}$ are expressed as  

$$
\begin{array}{r l}&{\mathbf{F}_{i j}^{C}=\alpha_{i j}\omega_{C}(r_{i j})\mathbf{e}_{i j}}\ &{\mathbf{F}_{i j}^{D}=-\gamma\omega_{D}(r_{i j})(\mathbf{e}_{i j}\cdot\mathbf{v}_{i j})\mathbf{e}_{i j}}\ &{\mathbf{F}_{i j}^{R}=\sigma\omega_{R}(r_{i j})\xi_{i j}\Delta{t}^{-1/2}\mathbf{e}_{i j}}\ &{\omega_{C}(r)=1-r/r_{c}}\ &{\alpha_{i j}=A\cdot k_{B}(T_{i}+T_{j})/2}\ &{\omega_{D}(r)=\omega_{R}^{2}(r)=(1-r/r_{c})^{s}}\ &{\sigma_{i j}^{2}=4\gamma k_{B}T_{i}T_{j}/(T_{i}+T_{j})}\end{array}
$$  

in which the exponent of the weighting function $s$ can be defined as a temperature-dependent variable. The heat flux between particles accounting for the collisional heat flux $q^{C}$ , viscous heat flux $q^{V}$ , and random heat flux $q^{R}$ are given by  

$$
\begin{array}{l}{{q_{i}^{C}=\displaystyle\sum_{j\neq i}k_{i j}\omega_{C T}(r_{i j})\left(\frac{1}{T_{i}}-\frac{1}{T_{j}}\right)}}\ {{\mathrm{}}}\ {{q_{i}^{V}=\displaystyle\frac{1}{2C_{v}}\sum_{j\neq i}\left\{\omega_{D}(r_{i j})\left[\chi_{j}\left(\mathbf{e}_{i j}\cdot\mathbf{v}_{i j}\right)^{2}-\displaystyle\frac{\left(\sigma_{i j}\right)^{2}}{m}\right]-\sigma_{i j}\omega_{R}(r_{i j})\left(\mathbf{e}_{i j}\cdot\mathbf{v}_{i j}\right)\xi_{i j}\right\}}}\ {{q_{i}^{R}=\displaystyle\sum_{j\neq i}\beta_{i j}\omega_{R T}(r_{i j})d t^{-1/2}\xi_{i j}^{\epsilon}}}\ {{\partial_{C T}(r)=\omega_{R T}^{2}(r)=\left(1-r/r_{c}\right)^{s_{T}}}}\ {{k_{i j}=C_{v}^{2}\kappa(T_{i}+T_{j})^{2}/4k_{B}}}\ {{\beta_{i j}^{L}=2k_{B}k_{i j}}}\end{array}
$$  

where the mesoscopic heat friction $\kappa$ is given by  

$$
\kappa=\frac{315k_{B}\upsilon}{2\pi\rho C_{\nu}r_{c t}^{5}}\frac{1}{P r},
$$  

with υ being the kinematic viscosity. For more details, see Eq.(15) in (Li2014_JCP).  

The following coefficients must be defined in eDPD system for each pair of atom types via the pair_coeff command as in the examples above.  

• A (force units) • γ (force/velocity units) • power_f (positive real) • cutoff (distance units) • kappa (thermal conductivity units) • power_T (positive real) • cutoff_T (distance units) optional keyword $=$ power or kappa  

The keyword power or kappa is optional. Both “power” and “kappa” require 4 parameters $c_{1},c_{2},c_{3},c_{4}$ showing the temperature dependence of the exponent $s(T)=\mathrm{power}_{f}(1+c_{1}(T-1)+c_{2}(T-1)^{2}+c_{3}(T-1)^{3}+c_{4}(T-1)^{4})$ and of the mesoscopic heat friction sT (T ) = κ(1 $+c_{1}(T-1)+c_{2}(T-1)^{2}+c_{3}(T-1)^{3}+c_{4}(T-1)^{4})$ . If the keyword power or kappa is not specified, the eDPD system will use constant power_f and $\kappa$ , which is independent to temperature changes.  

The mdpd/rhosum style computes the local particle mass density $\rho$ for mDPD particles by kernel function interpolation.  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the example above.  

• cutoff (distance units)  

The mdpd style computes the many-body interactions between mDPD particles following the formulations in $(L i2O I3\_P O F)$ . The dissipative and random forces are in the form same as the classical DPD, but the conservative force is local density dependent, which are given by  

$$
\begin{array}{r l}&{\mathbf{F}_{i j}^{C}=A w_{c}(r_{i j})\mathbf{e}_{i j}+B(\rho_{i}+\rho_{j})w_{d}(r_{i j})\mathbf{e}_{i j}}\ &{\mathbf{F}_{i j}^{D}=-\gamma\omega_{D}(r_{i j})(\mathbf{e}_{i j}\cdot\mathbf{v}_{i j})\mathbf{e}_{i j}}\ &{\mathbf{F}_{i j}^{R}=\sigma\omega_{R}(r_{i j})\xi_{i j}\Delta t^{-1/2}\mathbf{e}_{i j}}\end{array}
$$  

where the first term in $F_{C}$ with a negative coefficient $A<0$ stands for an attractive force within an interaction range $r_{c}$ and the second term with $B>0$ is the density-dependent repulsive force within an interaction range $r_{d}$ .  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above.  

• A (force units) • B (force units) • γ (force/velocity units) • cutoff_c (distance units) • cutoff_d (distance units)  

The tdpd style computes the pairwise interactions and chemical concentration fluxes for tDPD particles following the formulations in $(L i2O I5\_J C P)$ . The time evolution of a tDPD particle is governed by the conservation of momentum and concentration given by  

$$
\begin{array}{l}{\displaystyle\frac{\mathrm{d}^{2}\mathbf{r}_{i}}{\mathrm{d}t^{2}}=\frac{\mathrm{d}\mathbf{v}_{i}}{\mathrm{d}t}=\mathbf{F}_{i}=\sum_{i\neq j}(\mathbf{F}_{i j}^{C}+\mathbf{F}_{i j}^{D}+\mathbf{F}_{i j}^{R})}\ {\displaystyle\frac{\mathrm{d}C_{i}}{\mathrm{d}t}=Q_{i}=\sum_{i\neq j}(Q_{i j}^{D}+Q_{i j}^{R})+Q_{i}^{S}}\end{array}
$$  

where the three components of $F_{i}$ including the conservative force $F_{i j}^{C}$ , dissipative force $F_{i j}^{C}$ and random force $F_{i j}^{C}$ are expressed as  

$$
\begin{array}{c}{{{\bf F}_{i j}^{C}=A\omega_{C}(r_{i j}){\bf e}_{i j}}}\ {{{\bf F}_{i j}^{D}=-\gamma\omega_{D}(r_{i j})({\bf e}_{i j}\cdot{\bf v}_{i j}){\bf e}_{i j}}}\ {{{\bf F}_{i j}^{R}=\sigma\omega_{R}(r_{i j})\xi_{i j}\Delta t^{-1/2}{\bf e}_{i j}}}\ {{\omega_{C}(r)=1-r/r_{c}}}\ {{\omega_{D}(r)=\omega_{R}^{2}(r)=(1-r/r_{c})^{\mathrm{power}_{i}}}}\ {{\sigma^{2}=2\gamma k_{B}T}}\end{array}
$$  

The concentration flux between two tDPD particles includes the Fickian flux $Q_{i j}^{D}$ and random flux $Q_{i j}^{R}$ , which are given by  

$$
\begin{array}{c}{{Q_{i j}^{D}=-\kappa_{i j}w_{D C}(r_{i j})\left(C_{i}-C_{j}\right)}}\ {{Q_{i j}^{R}=\varepsilon_{i j}\left(C_{i}+C_{j}\right)w_{R C}(r_{i j})\xi_{i j}}}\ {{w_{D C}(r_{i j})=w_{R C}^{2}(r_{i j})=(1-r/r_{c c})^{\mathrm{power}_{c\mathrm{c}}}}}\ {{\varepsilon_{i j}^{2}=m_{s}^{2}\kappa_{i j}\rho}}\end{array}
$$  

where the parameters kappa and epsilon determine the strength of the Fickian and random fluxes. $m_{s}$ is the mass of a single solute molecule. In general, $m_{s}$ is much smaller than the mass of a tDPD particle $m$ . For more details, see (Li2015_JCP).  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above.  

• A (force units) • γ (force/velocity units) • power_f (positive real) • cutoff (distance units) • cutoff_CC (distance units) • $\kappa_{i}$ (diffusivity units) • $\varepsilon_{i}$ (diffusivity units) • power_cc_i (positive real)  

The last 3 values must be repeated Nspecies times, so that values for each of the Nspecies chemical species are specified, as indicated by the “I” suffix. In the first pair_coeff example above for pair_style tdpd, Nspecies $=1$ . In the second example, Nspecies $=2$ , so 3 additional coeffs are specified (for species 2).  

# 4.187.4 Example scripts  

There are example scripts for using all these pair styles in examples/PACKAGES/mesodpd. The example for an eDPD simulation models heat conduction with source terms analog of periodic Poiseuille flow problem. The setup follows Fig.12 in $(L i2O I4\_J C P)$ . The output of the short eDPD simulation (about 2 minutes on a single core) gives a temperature and density profiles as  

![](images/85eda1a34bc66fb1ec48f0408ce0c707397785d24132c76adb5e88d2a2ea522f.jpg)  

The example for a mDPD simulation models the oscillations of a liquid droplet started from a liquid film. The mDPD parameters are adopted from $(L i2O I3\_P O F)$ . The short mDPD run (about 2 minutes on a single core) generates a particle trajectory which can be visualized as follows.  

![](images/96ec6eae63d8973b35a04d98e2b2c6cf89fbe24ca7ce861a0a536fb82e22b3f9.jpg)  

![](images/80e6c33f78a5b087168e4056671c13371bd4ffcd635b3b683b23dda4d118d83a.jpg)  

The first image is the initial state of the simulation. If you click it a GIF movie should play in your browser. The second image is the final state of the simulation.  

The example for a tDPD simulation computes the effective diffusion coefficient of a tDPD system using a method analogous to the periodic Poiseuille flow. The tDPD system is specified with two chemical species, and the setup follows Fig.1 in (Li2015_JCP). The output of the short tDPD simulation (about one and a half minutes on a single core) gives the concentration profiles of the two chemical species as  

![](images/8091241060defe30a79f1197593feb964612c82a13c6fcdaf1753b7fe78bec50.jpg)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.187.5 Mixing, shift, table, tail correction, restart, rRESPA info  

The styles edpd, mdpd, mdpd/rhosum and tdpd do not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

The styles edpd, mdpd, mdpd/rhosum and tdpd do not support the pair_modify shift, table, and tail options.  

The styles edpd, mdpd, mdpd/rhosum and tdpd do not write information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

# 4.187.6 Restrictions  

The pair styles edpd, mdpd, mdpd/rhosum and tdpd are part of the DPD-MESO package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.187.7 Related commands  

pair_coeff , fix mvv/dpd, fix mvv/edpd, fix mvv/tdpd, fix edpd/source, fix tdpd/source, compute edpd/temp/atom, compute tdpd/cc/atom  

# 4.187.8 Default  

none  

(Li2014_JCP) Li, Tang, Lei, Caswell, Karniadakis, J Comput Phys, 265: 113-127 (2014). DOI: 10.1016/j.jcp.2014.02.003.   
(Li2015_CC) Li, Tang, Li, Karniadakis, Chem Commun, 51: 11038-11040 (2015). DOI: 10.1039/C5CC01684C.   
(Li2013_POF) Li, Hu, Wang, Ma, Zhou, Phys Fluids, 25: 072103 (2013). DOI: 10.1063/1.4812366.   
(Li2015_JCP) Li, Yazdani, Tartakovsky, Karniadakis, J Chem Phys, 143: 014101 (2015). DOI: 10.1063/1.4923254.  

# 4.188 pair_style mgpt command  

# 4.188.1 Syntax  

where the prime on each summation sign indicates the exclusion of all self-interaction terms from the summation. The leading volume term E_vol as well as the two-ion central-force pair potential $\mathbf{v}_{-2}$ and the three- and four-ion angular-force potentials, $\mathrm{~v~}_{-}3$ and v_4, depend explicitly on the atomic volume Omega, but are structure independent and transferable to all bulk ion configurations, either ordered or disordered, and with of without the presence of point and line defects. The simplified model GPT or MGPT (Moriarty2, Moriarty3), which retains the form of E_tot and permits more efficient large-scale atomistic simulations, derives from the GPT through a series of systematic approximations applied to E_vol and the potentials v_n that are valid for mid-period transition metals with nearly half-filled d bands.  

Both analytic (Moriarty2) and matrix (Moriarty3) representations of MGPT have been developed. In the more general matrix representation, which can also be applied to f-band actinide metals and permits both canonical and non-canonical d/f bands, the multi-ion potentials are evaluated on the fly during a simulation through d- or f-state matrix multiplication, and the forces that move the ions are determined analytically. Fast matrix-MGPT algorithms have been developed independently by Glosli (Glosli, Moriarty3) and by Oppelstrup (Oppelstrup)  

The mgpt pair style calculates forces, energies, and the total energy per atom, E_tot/N, using the Oppelstrup matrixMGPT algorithm. Input potential and control data are entered through the pair_coeff command. Each material treated requires input parmin and potin potential files, as shown in the above examples, as well as specification by the user of the initial atomic volume Omega through pair_coeff. At the beginning of a time step in any simulation, the total volume of the simulation cell V should always be equal to Omega $\ast\mathbf{N}$ , where N is the number of metal ions present, taking into account the presence of any vacancies and/or interstitials in the case of a solid. In a constant-volume simulation, which is the normal mode of operation for the mgpt pair style, Omega, V and N all remain constant throughout the simulation and thus are equal to their initial values. In a constant-stress simulation, the cell volume V will change (slowly) as the simulation proceeds. After each time step, the atomic volume should be updated by the code as $\mathrm{Omega=V/N}$ . In addition, the volume term E_vol and the potentials v_2, v_3 and v_4 have to be removed at the end of the time step, and then respecified at the new value of Omega. In all simulations, Omega must remain within the defined volume range for E_vol and the potentials for the given material.  

The default option volpress yes in the pair_coeff command includes all volume derivatives of E_tot required to calculate the stress tensor and pressure correctly. The option volpress no disregards the pressure contribution resulting from the volume term E_vol, and can be used for testing and analysis purposes. The additional optional variable nbody controls the specific terms in E_tot that are calculated. The default option and the normal option for mid-period transition and actinide metals is nbody 1234 for which all four terms in E_tot are retained. The option nbody 12, for example, retains only the volume term and the two-ion pair potential term and can be used for GPT series-end transition metals that can be well described without $\mathbf{v}_{-}3$ and $\mathbf{V}_{-}4$ . The nbody option can also be used to test or analyze the contribution of any of the four terms in E_tot to a given calculated property.  

The mgpt pair style makes extensive use of matrix algebra and includes optimized kernels for the BlueGene/Q architecture and the Intel/AMD $\left(\mathrm{x}86\right)$ architectures. When compiled with the appropriate compiler and compiler switches (-msse3 on $\mathrm{x}86$ , and using the IBM XL compiler on BG/Q), these optimized routines are used automatically. For BG/Q machines, building with the default Makefile for that architecture (e.g., “make bgq”) should enable the optimized algebra routines. For $\mathbf{X}{-}86$ machines, there is a provided Makefile.mgptfast which enables the fast algebra routines, i.e. build LAMMPS with “make mgptfast”. The user will be informed in the output files of the matrix kernels in use. To further improve speed, on $\mathrm{x}86$ the option precision single can be added to the pair_coeff command, which improves speed (up to a factor of two) at the cost of doing matrix calculations with 7 digit precision instead of the default 16. For consistency the default option can be specified explicitly by the option precision double.  

All remaining potential and control data are contained with the parmin and potin files, including cutoffs, atomic mass, and other basic MGPT variables. Specific MGPT potential data for the transition metals tantalum (Ta4 and $\mathrm{Ta}6.8\mathrm{x}$ potentials), molybdenum (Mo5.2 potentials), and vanadium (V6.1 potentials) are contained in the LAMMPS potentials directory. The stored files are, respectively, Ta4.mgpt.parmin, Ta4.mgpt.potin, $\mathrm{Ta}6.8\mathrm{x}$ .mgpt.parmin, $\mathrm{Ta}6.8\mathrm{x}$ .mgpt.potin, Mo5.2.mgpt.parmin, Mo5.2.mgpt.potin, V6.1.mgpt.parmin, and V6.1.mgpt.potin . Useful corresponding informational “README” files on the Ta4, Ta6.8x, Mo5.2 and V6.1 potentials are also included in the potentials directory. These latter files indicate the volume mesh and range for each potential and give appropriate references for the potentials. It is expected that MGPT potentials for additional materials will be added over time.  

Useful example MGPT scripts are given in the examples/PACKAGES/mgpt directory. These scripts show the necessary steps to perform constant-volume calculations and simulations. It is strongly recommended that the user work through and understand these examples before proceeding to more complex simulations.  

![](images/ee097126e5116d53cfcc24ccb71148583d577afca9a0f0620e93ddb6b4f85997.jpg)  

# Note  

For good performance, LAMMPS should be built with the compiler flags “-O3 -msse3 -funroll-loops” when including this pair style. The src/MAKE/OPTIONS/Makefile.mgptfast is an example machine Makefile with these options included as part of a standard MPI build. Note that it as provided, it will build with whatever low-level compiler $^{\mathrm{{g++}}}$ , icc, etc) is the default for your MPI installation.  

# 4.188.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you needs to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.188.5 Restrictions  

This pair style is part of the MGPT package and is only enabled if LAMMPS is built with that package. See the Build package page for more info.  

The MGPT potentials require the newtion setting to be “on” for pair style interactions.  

The stored parmin and potin potential files provided with LAMMPS in the “potentials” directory are written in Rydberg atomic units, with energies in Rydbergs and distances in Bohr radii. The mgpt pair style converts Rydbergs to Hartrees to make the potential files compatible with LAMMPS electron units.  

The form of $\mathrm{E}_{-}$ tot used in the mgpt pair style is only appropriate for elemental bulk solids and liquids. This includes solids with point and extended defects such as vacancies, interstitials, grain boundaries and dislocations. Alloys and free surfaces, however, require significant modifications, which are not included in the mgpt pair style. Likewise, the hybrid pair style is not allowed, where MGPT would be used for some atoms but not for others.  

Electron-thermal effects are not included in the standard MGPT potentials provided in the “potentials” directory, where the potentials have been constructed at zero electron temperature. Physically, electron-thermal effects may be important in 3d (e.g., V) and 4d (e.g., Mo) transition metals at high temperatures near melt and above. It is expected that temperature-dependent MGPT potentials for such cases will be added over time.  

# 4.188.6 Related commands  

pair_coeff  

# 4.188.7 Default  

The options defaults for the pair_coeff command are volpress yes, nbody 1234, and precision double.  

(Moriarty1) Moriarty, Physical Review B, 38, 3199 (1988).   
(Moriarty2) Moriarty, Physical Review B, 42, 1609 (1990). Moriarty, Physical Review B 49, 12431 (1994). (Moriarty3) Moriarty, Benedict, Glosli, Hood, Orlikowski, Patel, Soderlind, Streitz, Tang, and Yang, Journal of Materials Research, 21, 563 (2006).   
(Glosli) Glosli, unpublished, 2005. Streitz, Glosli, Patel, Chan, Yates, de Supinski, Sexton and Gunnels, Journal of Physics: Conference Series, 46, 254 (2006).   
(Oppelstrup) Oppelstrup, unpublished, 2015. Oppelstrup and Moriarty, to be published.  

# 4.189 pair_style mie/cut command  

Accelerator Variants: mie/cut/gpu  

# 4.189.1 Syntax  

• cutof $=$ global cutoff for mie/cut interactions (distance units)  

# 4.189.2 Examples  

pair_style mie/cut 10.0   
pair_coeff 1 1 0.72 3.40 23.00 6.66   
pair_coeff 2 2 0.30 3.55 12.65 6.00   
pair_coeff 1 2 0.46 3.32 16.90 6.31  

# 4.189.3 Description  

The mie/cut style computes the Mie potential, given by  

$$
E=C\varepsilon\left[\left(\frac{\sigma}{r}\right)^{\gamma_{r e p}}-\left(\frac{\sigma}{r}\right)^{\gamma_{a t t}}\right]\qquadr<r_{c}
$$  

$r_{c}$ is the cutoff and C is a function that depends on the repulsive and attractive exponents, given by:  

$$
C=\left(\frac{\gamma_{r e p}}{\gamma_{r e p}-\gamma_{a t t}}\right)\left(\frac{\gamma_{r e p}}{\gamma_{a t t}}\right)^{\left(\frac{\gamma_{a t t}}{\gamma_{r e p}-\gamma_{a t t}}\right)}
$$  

Note that for $12/6$ exponents, $\mathrm{^C}$ is equal to 4 and the formula is the same as the standard Lennard-Jones potential.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• epsilon (energy units) • sigma (distance units) • gammaR   
• gammaA   
• cutoff (distance units)  

The last coefficient is optional. If not specified, the global cutoff specified in the pair_style command is used.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.189.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{~I~}!=\mathrm{~J~}$ , the epsilon and sigma coefficients and cutoff distance for all of the mie/cut pair styles can be mixed. If not explicitly defined, both the repulsive and attractive gamma exponents for different atoms will be calculated following the same mixing rule defined for distances. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style supports the pair_modify shift option for the energy of the pair interaction.  

This pair style supports the pair_modify tail option for adding a long-range tail correction to the energy and pressure of the pair interaction.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style supports the use of the inner, middle, and outer keywords of the run_style respa command, meaning the pairwise forces can be partitioned by distance at different levels of the rRESPA hierarchy. See the run_style command for details.  

# 4.189.5 Restrictions  

This pair style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.189.6 Related commands  

pair_coeff  

# 4.189.7 Default  

none  

(Mie) G. Mie, Ann Phys, 316, 657 (1903).   
(Avendano) C. Avendano, T. Lafitte, A. Galindo, C. S. Adjiman, G. Jackson, E. Muller, J Phys Chem B, 115, 11154 (2011).  

# 4.190 pair_style mliap command  

Accelerator Variants: mliap/kk  

# 4.190.1 Syntax  

pair_style mliap ... keyword values ...  

• one or two keyword/value pairs must be appended   
• keyword $=$ model or descriptor or unified model values $=$ style filename style $=$ linear or quadratic or nn or mliappy filename $=$ name of file containing model definitions descriptor values $=$ style filename style $=$ sna or so3 or ace filename $-$ name of file containing descriptor definitions unified values = filename ghostneigh_flag filename $-$ name of file containing serialized unified Python object ghostneigh_flag = 0/1 to turn off/on inclusion of ghost neighbors in neighbors list  

# 4.190.2 Examples  

pair_style mliap model linear InP.mliap.model descriptor sna InP.mliap.descriptor   
pair_style mliap model quadratic W.mliap.model descriptor sna W.mliap.descriptor   
pair_style mliap model nn Si.nn.mliap.model descriptor so3 Si.nn.mliap.descriptor   
pair_style mliap model mliappy ACE_NN_Pytorch.pt descriptor ace ccs_single_element.yace   
pair_style mliap unified mliap_unified_lj_Ar.pkl 0   
pair_coeff \* \* In P  

# 4.190.3 Description  

Pair style mliap provides a general interface to families of machine-learning interatomic potentials. It allows separate definitions of the interatomic potential functional form (model) and the geometric quantities that characterize the atomic positions (descriptor).  

By defining model and descriptor separately, it is possible to use many different models with a given descriptor, or many different descriptors with a given model. The pair style currently supports sna, so3 and ace descriptor styles, but it is straightforward to add new descriptor styles. By using the unified keyword, it is possible to define a Python model that combines functionalities of both model and descriptor.  

The SNAP descriptor style sna is the same as that used by pair_style snap, including the linear, quadratic, and chem variants. The available models are linear, quadratic, nn, and mliappy. The mliappy style can be used to couple python models, e.g. PyTorch neural network energy models, and requires building LAMMPS with the PYTHON package (see below). In order to train a model, it is useful to know the gradient or derivative of energy, force, and stress w.r.t. model parameters. This information can be accessed using the related compute mliap command.  

Added in version 2Jun2022.  

The descriptor style so3 is a descriptor that is derived from the the smooth SO(3) power spectrum with the explicit inclusion of a radial basis (Bartok) and (Zagaceta). The available models are linear and nn.  

Added in version 17Apr2024.  

The descriptor style ace is a class of highly general atomic descriptors, atomic cluster expansion descriptors (ACE) from (Drautz), that include a radial basis, an angular basis, and bases for other variables (such as chemical species) if relevant. In descriptor style ace, the ace descriptors may be defined up to an arbitrary body order. This descriptor style is the same as that used in pair_style pace and compute pace. The available models with ace in ML-IAP are linear and mliappy. The ace descriptors and models require building LAMMPS with the ML-PACE package (see below). The mliappy model style may be used with ace descriptors, but it requires that LAMMPS is also built with the PYTHON package. As with other model styles, the mliappy model style can be used to couple arbitrary python models that use the ace descriptors such as Pytorch NNs. Note that ALL mliap model styles with ace descriptors require that descriptors and hyperparameters are supplied in a .yace or .ace file, similar to compute pace.  

The pair_style mliap command must be followed by two keywords model and descriptor in either order, or the one keyword unified. A single pair_coeff command is also required. The first 2 arguments must be $^\ast\ast$ so as to span all LAMMPS atom types. This is followed by a list of N arguments that specify the mapping of MLIAP element names to LAMMPS atom types, where N is the number of LAMMPS atom types.  

The model keyword is followed by the model style. This is followed by a single argument specifying the model filename containing the parameters for a set of elements. The model filename usually ends in the .mliap.model extension. It may contain parameters for many elements. The only requirement is that it contain at least those element names appearing in the pair_coeff command.  

The top of the model file can contain any number of blank and comment lines (start with #), but follows a strict format after that. The first non-blank non-comment line must contain two integers:  

• nelems $=$ Number of elements nparams $=$ Number of parameters  

When the model keyword is linear or quadratic, this is followed by one block for each of the nelem elements. Each block consists of nparams parameters, one per line. Note that this format is similar, but not identical to that used for the pair_style snap coefficient file. Specifically, the line containing the element weight and radius is omitted, since these are handled by the descriptor.  

When the model keyword is nn (neural networks), the model file can contain blank and comment lines (start with #) anywhere. The second non-blank non-comment line must contain the string NET, followed by two integers:  

• ndescriptors $=$ Number of descriptors • nlayers $=$ Number of layers (including the hidden layers and the output layer)  

and followed by a sequence of a string and an integer for each layer:  

• Activation function (linear, sigmoid, tanh or relu) • nnodes $=$ Number of nodes  

This is followed by one block for each of the nelem elements. Each block consists of scale0 minimum value, scale1 (maximum - minimum) value, in order to normalize the descriptors, followed by nparams parameters, including bias and weights of the model, starting with the first node of the first layer and so on, with a maximum of 30 values per line.  

The detail of nn module implementation can be found at (Yanxon).  

# Notes on mliappy models  

When the model keyword is mliappy, if the filename ends in ‘.pt’, or ‘.pth’, it will be loaded using pytorch; otherwise, it will be loaded as a pickle file. To load a model from memory (i.e. an existing python object), specify the filename as “LATER”, and then call lammps.mliap.load_model(model) from python before using the pair style. When using LAMMPS via the library mode, you will need to call lammps.mliappy.activate_mliappy(lmp) on the active LAMMPS object before the pair style is defined. This call locates and loads the mliap-specific python module that is built into LAMMPS.  

The descriptor keyword is followed by a descriptor style, and additional arguments. Currently three descriptor styles are available: sna, so3, and ace.  

• sna indicates the bispectrum component descriptors used by the Spectral Neighbor Analysis Potential (SNAP) potentials of pair_style snap. A single additional argument specifies the descriptor filename containing the parameters and setting used by the SNAP descriptor. The descriptor filename usually ends in the .mliap.descriptor extension.  

• so3 indicated the power spectrum component descriptors. A single additional argument specifies the descriptor filename containing the parameters and setting.  

• ace indicates the atomic cluster expansion (ACE) descriptors. A single additional argument specifies the filename containing parameters, settings, and definitions of the ace descriptors (through tabulated basis function indices and corresponding generalized Clebsch-Gordan coefficients) in the ctilde file format, e.g. in the potential file format with \*.ace or \*.yace extensions from pair_style pace. Note that unlike the potential file, the ClebschGordan coefficients in the descriptor file supplied should NOT be multiplied by linear or square root embedding terms.  

The SNAP descriptor file closely follows the format of the pair_style snap parameter file. The file can contain blank and comment lines (start with #) anywhere. Each non-blank non-comment line must contain one keyword/value pair. The required keywords are rcutfac and twojmax. There are many optional keywords that are described on the pair_style snap doc page. In addition, the SNAP descriptor file must contain the nelems, elems, radelems, and welems keywords. The nelems keyword specifies the number of elements provided in the other three keywords. The elems keyword is followed by a list of nelems element names that must include the element names appearing in the pair_coeff command, but can contain other names too. Similarly, the radelems and welems keywords are followed by lists of nelems numbers giving the element radius and element weight of each element. Obviously, the order in which the elements are listed must be consistent for all three keywords.  

The SO3 descriptor file is similar to the SNAP descriptor except that it contains a few more arguments (e.g., nmax and alpha). The preparation of SO3 descriptor and model files can be done with the Pyxtal_FF package.  

The ACE descriptor file differs from the SNAP and SO3 files. It more closely resembles the potential file format for linear or square-root embedding ACE potentials used in the pair_style pace. As noted above, the key difference is that the Clebsch-Gordan coefficients in the descriptor file with mliap descriptor ace are NOT multiplied by linear or square root embedding terms. In other words,the model is separated from the descriptor definitions and hyperparameters. In pair_style pace, they are combined. The ACE descriptor files required by mliap are generated automatically in FitSNAP during linear, pytorch, etc. ACE model fitting. Additional tools are provided there to prepare ace descriptor files and hyperparameters before model fitting. The ace descriptor files can also be extracted from ACE model fits in pythonace.. It is important to note that order of the types listed in pair_coeff must match the order of the elements/types listed in the ACE descriptor file for all mliap styles when using ace descriptors.  

See the pair_coeff page for alternate ways to specify the path for these model and descriptor files.  

# Note  

To significantly reduce SO3 descriptor/force calculation time, some properties are pre-computed and reused during the calculation. These can consume a significant amount of RAM for simulations of larger systems since their size depends on the total number of neighbors per MPI process.  

Added in version 3Nov2022.  

The unified keyword is followed by an argument specifying the filename containing the serialized unified Python object and the “ghostneigh” toggle (0/1) to disable/enable the construction of neighbors lists including neighbors of ghost atoms. If the filename ends in ‘.pt’, or ‘.pth’, it will be loaded using pytorch; otherwise, it will be loaded as a pickle file. If ghostneigh is enabled, it is recommended to set comm_modify cutoff manually, such as in the following example.  

variable ninteractions equal 2   
variable cutdist equal 7.5   
variable skin equal 1.0   
variable commcut equal (\${ninteractions}\*\${cutdist})+\${skin}   
neighbor \${skin} bin   
comm_modify cutoff \${commcut}  

![](images/d9dc74979392af8fccd91a7814e93e125fef97cd7901729ee074256c699d373d.jpg)  

# Note  

To load a model from memory (i.e. an existing python object), call lammps.mliap.load_unified(unified) from python, and then specify the filename as “EXISTS”. When using LAMMPS via the library mode, you will need to call lammps.mliappy.activate_mliappy(lmp) on the active LAMMPS object before the pair style is defined. This call locates and loads the mliap-specific python module that is built into LAMMPS.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.190.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS with user-specifiable parameters as described above. You never need to specify a pair_coeff command with $\mathrm{I}!=\mathrm{J}$ arguments for this style.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.190.5 Restrictions  

This pair style is part of the ML-IAP package. It is only enabled if LAMMPS was built with that package. In addition, building LAMMPS with the ML-IAP package requires building LAMMPS with the ML-SNAP package. The mliappy model requires building LAMMPS with the PYTHON package. The ace descriptor requires building LAMMPS with the ML-PACE package. See the Build package page for more info. Note that pair_mliap/kk acceleration will not invoke the kk accelerated variants of SNAP or ACE descriptors.  

# 4.190.6 Related commands  

pair_style snap, compute mliap  

# 4.190.7 Default  

none  

(Bartok2013) Bartok, Kondor, Csanyi, Phys Rev B, 87, 184115 (2013).   
(Zagaceta2020) Zagaceta, Yanxon, Zhu, J Appl Phys, 128, 045113 (2020).   
(Yanxon2020) Yanxon, Zagaceta, Tang, Matteson, Zhu, Mach. Learn.: Sci. Technol. 2, 027001 (2020).  

# 4.191 pair_style momb command  

# 4.191.1 Syntax  

pair_style momb cutoff s6 d  

• cutof $=$ global cutoff (distance units) • $\mathrm{s}6=$ global scaling factor of the exchange-correlation functional used (unitless) • $\mathrm{d}=$ damping scaling factor of Grimme’s method (unitless)  

# 4.191.2 Examples  

pair_style momb 12.0 0.75 20.0   
pair_style hybrid/overlay eam/fs lj/charmm/coul/long 10.0 12.0 momb 12.0 0.75 20.0 morse 5.5   
pair_coeff 1 2 momb 0.0 1.0 1.0 10.2847 2.361  

# 4.191.3 Description  

Style momb computes pairwise van der Waals (vdW) and short-range interactions using the Morse potential and (Grimme) method implemented in the Many-Body Metal-Organic (MOMB) force field described comprehensively in (Fichthorn) and (Zhou). Grimme’s method is widely used to correct for dispersion in density functional theory calculations.  

$$
\begin{array}{c}{{E=D_{0}[\exp^{-2\alpha(r-r_{0})}-2\exp^{-\alpha(r-r_{0})}]-s_{6}\displaystyle\frac{C_{6}}{r^{6}}f_{d a m p}(r,R_{r})}}\ {{f_{d a m p}(r,R_{r})=\displaystyle\frac{1}{1+\exp^{-d(r/R_{r}-1)}}}}\end{array}
$$  

For the momb pair style, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data as described below:  

• $D_{0}$ (energy units)   
• $\alpha$ (1/distance units)   
• $r_{0}$ (distance units)   
• $C_{6}$ (energy\*distance^6 units)   
• $R_{r}$ (distance units, typically sum of atomic vdW radii)  

# 4.191.4 Restrictions  

This style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS is built with that package. See the Build package page on for more info.  

# 4.191.5 Related commands  

pair_coeff , pair_style morse  

# 4.191.6 Default  

none  

(Grimme) Grimme, J Comput Chem, 27(15), 1787-1799 (2006). (Fichthorn) Fichthorn, Balankura, Qi, CrystEngComm, 18(29), 5410-5417 (2016). (Zhou) Zhou, Saidi, Fichthorn, J Phys Chem C, 118(6), 3366-3374 (2014)  

# 4.192 pair_style morse command  

Accelerator Variants: morse/gpu, morse/omp, morse/opt, morse/kk  

# 4.193 pair_style morse/smooth/linear command  

Accelerator Variants: morse/smooth/linear/omp  

# 4.193.1 Syntax  

• style $=$ morse or morse/smooth/linear or morse/soft • args $=$ list of arguments for a particular style  

morse args $=$ cutoff cutoff $=$ global cutoff for Morse interactions (distance units)   
morse/smooth/linear args $=$ cutoff cutoff $=$ global cutoff for Morse interactions (distance units)  

# 4.193.2 Examples  

pair_style morse 2.5   
pair_style morse/smooth/linear 2.5   
pair_coeff \* \* 100.0 2.0 1.5   
pair_coeff 1 1 100.0 2.0 1.5 3.0  

# 4.193.3 Description  

Style morse computes pairwise interactions with the formula  

$$
E=D_{0}\left[e^{-2\alpha(r-r_{0})}-2e^{-\alpha(r-r_{0})}\right]r<r_{c}
$$  

$r_{c}$ is the cutoff.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• $D_{0}$ (energy units)  

# LAMMPS Documentation, Release 4Feb2025  

• $\alpha$ (1/distance units) • $r_{0}$ (distance units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global morse cutoff is used.  

The morse/smooth/linear variant is similar to the lj/smooth/linear variant in that it adds to the potential a shift and a linear term so that both, potential energy and force, go to zero at the cut-off:  

$$
\begin{array}{l l}{\phi\left(r\right)=D_{0}\left[e^{-2\alpha\left(r-r_{0}\right)}-2e^{-\alpha\left(r-r_{0}\right)}\right]}&{r<r_{c}}\ {E\left(r\right)=\phi\left(r\right)-\phi\left(r_{c}\right)-\left(r-r_{c}\right)\left.\frac{d\phi}{d r}\right|_{r=r_{c}}}&{r<r_{c}}\end{array}
$$  

The syntax of the pair_style and pair_coeff commands are the same for the morse and morse/smooth/linear styles.  

A version of the morse style with a soft core, morse/soft, suitable for use in free energy calculations, is part of the FEP package and is documented with the pair_style \*/soft styles. The version with soft core is only available if LAMMPS was built with that package. See the Build package page for more info.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.193.4 Mixing, shift, table, tail correction, restart, rRESPA info  

None of these pair styles support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

All of these pair styles support the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table options are not relevant for the Morse pair styles.  

None of these pair styles support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

All of these pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.193.5 Restrictions  

The morse/smooth/linear pair style is only enabled if LAMMPS was built with the EXTRA-PAIR package. See the Build package page for more info.  

# 4.193.6 Related commands  

pair_coeff , pair_style \*/soft  

# 4.193.7 Default  

none  

# 4.194 pair_style multi/lucy command  

# 4.194.1 Syntax  

pair_style multi/lucy style N keyword ...  

• style $=$ lookup or linear $=$ method of interpolation • $\Nu=$ use N values in lookup, linear tables  

# 4.194.2 Examples  

pair_style multi/lucy linear 1000   
pair_coeff \* \* multibody.table ENTRY1 7.0  

# 4.194.3 Description  

Style multi/lucy computes a density-dependent force following from the many-body form described in (Moore) and (Warren) as  

$$
F_{i}^{D D}(\rho_{i},\rho_{j},r_{i j})=\frac{1}{2}\omega_{D D}\left(r_{i j}\right)\left[A\left(\rho_{i}\right)+A\left(\rho_{j}\right)\right]e_{i j}
$$  

which consists of a density-dependent function, $A(\rho)$ , and a radial-dependent weight function, $\omega_{D D}(r_{i j})$ . The radialdependent weight function, $\omega_{D D}(r_{i j})$ , is taken as the Lucy function:  

$$
\omega_{D D}\left(r_{i j}\right)=\left(1+\frac{3r_{i j}}{r_{c u t}}\right)\left(1+\frac{r_{i j}}{r_{c u t}}\right)^{3}
$$  

The density-dependent energy for a given particle is given by:  

$$
u_{i}^{D D}\left(\rho_{i}\right)=\frac{\pi r_{c u t}^{4}}{84}\int_{\rho_{0}}^{\rho_{i}}A\left(\rho^{\prime}\right)d\rho^{\prime}
$$  

See the supporting information of (Brennan) or the publication by (Moore) for more details on the functional form.  

An interpolation table is used to evaluate the density-dependent energy $\textstyle(\int A(\rho^{\prime})d\rho^{\prime})$ and force $(A(\rho^{\prime}))$ . Note that the prefactor to the energy is computed after the interpolation, thus the $\int A(\rho^{\prime})d\rho^{\prime}$ will have units of energy / length $\triangle4$ .  

The interpolation table is created as a pre-computation by fitting cubic splines to the file values and interpolating the density-dependent energy and force at each of $N$ densities. During a simulation, the tables are used to interpolate the density-dependent energy and force as needed for each pair of particles separated by a distance $R$ . The interpolation is done in one of 2 styles: lookup and linear.  

For the lookup style, the density is used to find the nearest table entry, which is the density-dependent energy and force. For the linear style, the density is used to find the 2 surrounding table values from which the density-dependent energy and force are computed by linear interpolation.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• filename   
• keyword   
• cutoff (distance units)  

The filename specifies a file containing the tabulated density-dependent energy and force. The keyword specifies a section of the file. The cutoff is an optional coefficient. If not specified, the outer cutoff in the table itself (see below) will be used to build an interpolation table that extend to the largest tabulated distance. If specified, only file values up to the cutoff are used to create the interpolation table. The format of this file is described below.  

The format of a tabulated file is a series of one or more sections, defined as follows (without the parenthesized comments):  

# Density-dependent function (one or more comment or blank lines)  

DD-FUNCTION (keyword is first text on line)   
N 500 R 1.0 10.0 (N, R, RSQ parameters) (blank)   
1 1.0 25.5 102.34 (index, density, energy/r^4, force)   
2 1.02 23.4 98.5   
500 10.0 0.001 0.003  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections. The first line begins with a keyword which identifies the section. The line can contain additional text, but the initial text must match the argument specified in the pair_coeff command. The next line lists (in any order) one or more parameters for the table. Each parameter is a keyword followed by one or more numeric values.  

The parameter “N” is required and its value is the number of table entries that follow. Note that this may be different than the $N$ specified in the pair_style multi/lucy command. Let Ntable $=N$ in the pair_style command, and Nfile $=$ “N” in the tabulated file. What LAMMPS does is a preliminary interpolation by creating splines using the Nfile tabulated values as nodal points. It uses these to interpolate the density-dependent energy and force at Ntable different points. The resulting tables of length Ntable are then used as described above, when computing the density-dependent energy and force. This means that if you want the interpolation tables of length Ntable to match exactly what is in the tabulated file (with effectively no preliminary interpolation), you should set Ntable $=$ Nfile, and use the “RSQ” parameter. This is because the internal table abscissa is always RSQ (separation distance squared), for efficient lookup.  

All other parameters are optional. If “R” or “RSQ” does not appear, then the distances in each line of the table are used as-is to perform spline interpolation. In this case, the table values can be spaced in density uniformly or however you wish to position table values in regions of large gradients.  

If used, the parameters “R” or “RSQ” are followed by 2 values rlo and rhi. If specified, the density associated with each density-dependent energy and force value is computed from these 2 values (at high accuracy), rather than using the (low-accuracy) value listed in each line of the table. The density values in the table file are ignored in this case. For “R”, distances uniformly spaced between rlo and rhi are computed; for “RSQ”, squared distances uniformly spaced between rlo\*rlo and rhi\*rhi are computed.  

![](images/b2186bce7dec51ea3d7728ac05c7ac62fd71a3386435434c818477aa3a6a3f9d.jpg)  

# Note  

If you use “R” or “RSQ”, the tabulated distance values in the file are effectively ignored, and replaced by new values as described in the previous paragraph. If the density value in the table is not very close to the new value (i.e. round-off difference), then you will be assigning density-dependent energy and force values to a different density, which is probably not what you want. LAMMPS will warn if this is occurring.  

Following a blank line, the next N lines list the tabulated values. On each line, the first value is the index from 1 to N, the second value is r (in density units), the third value is the density-dependent function value (in energy units $/$ length $\triangle4$ ), and the fourth is the force (in force units). The density values must increase from one line to the next.  

Note that one file can contain many sections, each with a tabulated potential. LAMMPS reads the file section by section until it finds one that matches the specified keyword.  

# 4.194.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

The pair_modify shift, table, and tail options are not relevant for this pair style.  

This pair style writes the settings for the “pair_style multi/lucy” command to binary restart files, so a pair_style command does not need to specified in an input script that reads a restart file. However, the coefficient information is not stored in the restart file, since it is tabulated in the potential files. Thus, pair_coeff commands do need to be specified in the restart input script.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.194.5 Restrictions  

This command is part of the DPD-REACT package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.194.6 Related commands  

pair_coeff  

# 4.194.7 Default  

none  

(Warren) Warren, Phys Rev E, 68, 066702 (2003).   
(Brennan) Brennan, J Chem Phys Lett, 5, 2144-2149 (2014).   
(Moore) Moore, J Chem Phys, 144, 104501 (2016).  

# 4.195 pair_style multi/lucy/rx command  

Accelerator Variants: multi/lucy/rx/kk  

# 4.195.1 Syntax  

pair_style multi/lucy/rx style N keyword ...  

• style $=$ lookup or linear $=$ method of interpolation • $\Nu=\mathtt{u s e N}$ values in lookup, linear tables • weighting $=$ fractional or molecular (optional)  

# 4.195.2 Examples  

pair_style multi/lucy/rx linear 1000 pair_style multi/lucy/rx linear 1000 fractional pair_style multi/lucy/rx linear 1000 molecular pair_coeff \* \* multibody.table ENTRY1 h2o h2o 7.0 pair_coeff \* \* multibody.table ENTRY1 h2o 1fluid 7.0  

# 4.195.3 Description  

Style multi/lucy/rx is used in reaction DPD simulations, where the coarse-grained (CG) particles are composed of $m$ species whose reaction rate kinetics are determined from a set of $n$ reaction rate equations through the $f(x r x$ command. The species of one CG particle can interact with a species in a neighboring CG particle through a site-site interaction potential model. Style multi/lucy/rx computes the site-site density-dependent force following from the many-body form described in (Moore) and (Warren) as  

$$
F_{i}^{D D}(\rho_{i},\rho_{j},r_{i j})=\frac{1}{2}\omega_{D D}\left(r_{i j}\right)\left[A\left(\rho_{i}\right)+A\left(\rho_{j}\right)\right]e_{i j}
$$  

which consists of a density-dependent function, $A(\rho)$ , and a radial-dependent weight function, $\omega_{D D}(r_{i j})$ . The radialdependent weight function, $\omega_{D D}(r_{i j})$ , is taken as the Lucy function:  

$$
\omega_{D D}\left(r_{i j}\right)=\left(1+\frac{3r_{i j}}{r_{c u t}}\right)\left(1+\frac{r_{i j}}{r_{c u t}}\right)^{3}
$$  

The density-dependent energy for a given particle is given by:  

$$
u_{i}^{D D}\left(\rho_{i}\right)=\frac{\pi r_{c u t}^{4}}{84}\int_{\rho_{0}}^{\rho_{i}}A\left(\rho^{\prime}\right)d\rho^{\prime}
$$  

See the supporting information of (Brennan) or the publication by (Moore) for more details on the functional form.  

An interpolation table is used to evaluate the density-dependent energy $\textstyle(\int A(\rho^{\prime})d\rho^{\prime})$ and force $(A(\rho^{\prime}))$ . Note that the prefactor to the energy is computed after the interpolation, thus the $\int A(\rho^{\prime})d\rho^{\prime}$ will have units of energy / length $\wedge_{4}$ .  

The interpolation table is created as a pre-computation by fitting cubic splines to the file values and interpolating the density-dependent energy and force at each of $N$ densities. During a simulation, the tables are used to interpolate the density-dependent energy and force as needed for each pair of particles separated by a distance $R$ . The interpolation is done in one of 2 styles: lookup and linear.  

For the lookup style, the density is used to find the nearest table entry, which is the density-dependent energy and force.  

For the linear style, the density is used to find the 2 surrounding table values from which the density-dependent energy and force are computed by linear interpolation.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• filename  

• keyword   
• species1   
• species2   
• cutoff (distance units)  

The filename specifies a file containing the tabulated density-dependent energy and force. The keyword specifies a section of the file. The cutoff is an optional coefficient. If not specified, the outer cutoff in the table itself (see below) will be used to build an interpolation table that extend to the largest tabulated distance. If specified, only file values up to the cutoff are used to create the interpolation table. The format of this file is described below.  

The species tags define the site-site interaction potential between two species contained within two different particles. The species tags must either correspond to the species defined in the reaction kinetics files specified with the fix $r x$ command or they must correspond to the tag “1fluid”, signifying interaction with a product species mixture determined through a one-fluid approximation. The interaction potential is weighted by the geometric average of either the mole fraction concentrations or the number of molecules associated with the interacting coarse-grained particles (see the fractional or molecular weighting pair style options). The coarse-grained potential is stored before and after the reaction kinetics solver is applied, where the difference is defined to be the internal chemical energy (uChem).  

The format of a tabulated file is a series of one or more sections, defined as follows (without the parenthesized comments):  

# Density-dependent function (one or more comment or blank lines)   
DD-FUNCTION (keyword is first text on line)   
N 500 R 1.0 10.0 (N, R, RSQ parameters) (blank)   
1 1.0 25.5 102.34 (index, density, energy/ $\mathrm{\Delta_{r}}\hat{\mathbf{\phi}}_{4}$ , force)   
2 1.02 23.4 98.5   
500 10.0 0.001 0.003  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections. The first line begins with a keyword which identifies the section. The line can contain additional text, but the initial text must match the argument specified in the pair_coeff command. The next line lists (in any order) one or more parameters for the table. Each parameter is a keyword followed by one or more numeric values.  

The parameter “N” is required and its value is the number of table entries that follow. Note that this may be different than the $N$ specified in the pair_style multi/lucy/rx command. Let Ntable $=N$ in the pair_style command, and Nfile $\begin{array}{r l}{\mathbf{\Psi}=\mathbf{\Psi}^{66}\mathbf{N}^{5}}&{{}}\end{array}$ in the tabulated file. What LAMMPS does is a preliminary interpolation by creating splines using the Nfile tabulated values as nodal points. It uses these to interpolate the density-dependent energy and force at Ntable different points. The resulting tables of length Ntable are then used as described above, when computing the density-dependent energy and force. This means that if you want the interpolation tables of length Ntable to match exactly what is in the tabulated file (with effectively no preliminary interpolation), you should set Ntable $=$ Nfile, and use the “RSQ” parameter. This is because the internal table abscissa is always RSQ (separation distance squared), for efficient lookup.  

All other parameters are optional. If “R” or “RSQ” does not appear, then the distances in each line of the table are used as-is to perform spline interpolation. In this case, the table values can be spaced in density uniformly or however you wish to position table values in regions of large gradients.  

If used, the parameters “R” or “RSQ” are followed by 2 values rlo and rhi. If specified, the density associated with each density-dependent energy and force value is computed from these 2 values (at high accuracy), rather than using the (low-accuracy) value listed in each line of the table. The density values in the table file are ignored in this case. For “R”, distances uniformly spaced between rlo and rhi are computed; for “RSQ”, squared distances uniformly spaced between rlo\*rlo and rhi\*rhi are computed.  

![](images/9e61d8b0459d8be48ee3d10ca949ed701d3f6f4e84333c37bf5bf81284e59185.jpg)  

# Note  

If you use “R” or “RSQ”, the tabulated distance values in the file are effectively ignored, and replaced by new values as described in the previous paragraph. If the density value in the table is not very close to the new value (i.e. round-off difference), then you will be assigning density-dependent energy and force values to a different density, which is probably not what you want. LAMMPS will warn if this is occurring.  

Following a blank line, the next N lines list the tabulated values. On each line, the first value is the index from 1 to N, the second value is r (in density units), the third value is the density-dependent function value (in energy units $/$ length $\triangle4$ ), and the fourth is the force (in force units). The density values must increase from one line to the next.  

Note that one file can contain many sections, each with a tabulated potential. LAMMPS reads the file section by section until it finds one that matches the specified keyword.  

# 4.195.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

The pair_modify shift, table, and tail options are not relevant for this pair style.  

This pair style writes the settings for the “pair_style multi/lucy/rx” command to binary restart files, so a pair_style command does not need to specified in an input script that reads a restart file. However, the coefficient information is not stored in the restart file, since it is tabulated in the potential files. Thus, pair_coeff commands do need to be specified in the restart input script.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.195.5 Restrictions  

This command is part of the DPD-REACT package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.195.6 Related commands  

pair_coeff  

# 4.195.7 Default  

fractional weighting  

(Warren) Warren, Phys Rev E, 68, 066702 (2003).   
(Brennan) Brennan, J Chem Phys Lett, 5, 2144-2149 (2014).   
(Moore) Moore, J Chem Phys, 144, 104501 (2016).  

4.196 pair_style nb3b/harmonic command  

4.197 pair_style nb3b/screened command  

# 4.197.1 Syntax  

• style $=$ nb3b/harmonic or nb3b/screened  

# 4.197.2 Examples  

pair_style nb3b/harmonic   
pair_coeff \* \* MgOH.nb3bharmonic Mg O H   
pair_style nb3b/screened   
pair_coeff \* \* PO.nb3b.screened P NULL O   
pair_coeff \* \* SiOH.nb3b.screened Si O H  

# 4.197.3 Description  

The pair style nb3b/harmonic computes a non-bonded 3-body harmonic potential for the energy E of a system of atoms as  

$$
E=K(\theta-\theta_{0})^{2}
$$  

where $\theta_{0}$ is the equilibrium value of the angle and $K$ is a prefactor. Note that the usual 1/2 factor is included in $K.$ . The form of the potential is identical to that used in angle_style harmonic, but in this case, the atoms do not need to be explicitly bonded.  

Style nb3b/screened adds an additional exponentially decaying factor to the harmonic term, given by  

$$
E=K(\theta-\theta_{0})^{2}\exp\left(-\frac{r_{i j}}{\rho_{i j}}-\frac{r_{i k}}{\rho_{i k}}\right)
$$  

where $\rho_{i,j}$ and $\rho_{i}k$ are the screening factors along the two bonds. Note that the usual $1/2$ factor is included in $K$ .  

Only a single pair_coeff command is used with these styles which specifies a potential file with parameters for specified elements. These are mapped to LAMMPS atom types by specifying $\mathbf{N}$ additional arguments after the filename in the pair_coeff command, where $\mathbf{N}$ is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine a file SiC.nb3b.harmonic has potential values for Si and C. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Si, and the fourth to be C, you would use the following pair_coeff command:  

pair_coeff \* \* SiC.nb3b.harmonic Si Si Si C  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first three Si arguments map LAMMPS atom types 1,2,3 to the Si element in the potential file. The final C argument maps LAMMPS atom type 4 to the C element in the potential file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when the potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials. Two examples of pair_coeff command for use with the hybrid pair style are:  

pair_coeff \* \* nb3b/harmonic MgOH.nb3b.harmonic Mg O H  

Three-body non-bonded harmonic files in the potentials directory of the LAMMPS distribution have a “.nb3b.harmonic” suffix. Lines that are not blank or comments (starting with #) define parameters for a triplet of elements.  

Each entry has six arguments. The first three are atom types as referenced in the LAMMPS input file. The first argument specifies the central atom. The fourth argument indicates the $K$ parameter. The fifth argument indicates $\theta_{0}$ . The sixth argument indicates a separation cutoff in Angstroms.  

For a given entry, if the second and third arguments are identical, then the entry is for a cutoff for the distance between types 1 and 2 (values for $K$ and $\theta_{0}$ are irrelevant in this case).  

For a given entry, if the first three arguments are all different, then the entry is for the $K$ and $\theta_{0}$ parameters (the cutoff in this case is irrelevant).  

It is required that the potential file contains entries for all permutations of the elements listed in the pair_coeff command. If certain combinations are not parameterized the corresponding parameters should be set to zero. The potential file can also contain entries for additional elements which are not used in a particular simulation; LAMMPS ignores those entries.  

# 4.197.4 Restrictions  

This pair style can only be used if LAMMPS was built with the MANYBODY package. See the Build package page for more info.  

# 4.197.5 Related commands  

pair_coeff  

# 4.197.6 Default  

none  

# 4.198 pair_style nm/cut command  

Accelerator Variants: nm/cut/omp  

# 4.199 pair_style nm/cut/split command  

4.200 pair_style nm/cut/coul/cut command  

Accelerator Variants: nm/cut/coul/cut/omp  

# 4.201 pair_style nm/cut/coul/long command  

Accelerator Variants: nm/cut/coul/long/omp  

# 4.201.1 Syntax  

pair_style style args  

• style $=$ nm/cut or nm/cut/split or nm/cut/coul/cut or nm/cut/coul/long • args $=$ list of arguments for a particular style  

nm/cut args $=$ cutoff cutof $=$ global cutoff for Pair interactions (distance units)   
nm/cut/split args $=$ cutoff cutof $=$ global cutoff for Pair interactions (distance units)   
nm/cut/coul/cut $\mathrm{args}=0$ utoff (cutoff2) cutof $=$ global cutoff for Pair (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)   
nm/cut/coul/long args $=$ cutoff (cutoff2) cutof $=$ global cutoff for Pair (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)  

# 4.201.2 Examples  

<html><body><table><tr><td>pair_style nm/cut 12.0</td></tr><tr><td>pair_coef * * 0.01 5.4 8.0 7.0</td></tr><tr><td>pair _coeff 1 1 0.01 4.4 7.0 6.0</td></tr><tr><td></td></tr><tr><td>pair_style nm/cut/split 1.12246</td></tr><tr><td>pair_ coef 1 1 1.0 1.1246 12 6</td></tr><tr><td>pair_coeff * * 1.0 1.1246 11 6</td></tr><tr><td>pair_style nm/cut/coul/cut 12.0 15.0</td></tr><tr><td>pair _ coeff * * 0.01 5.4 8.0 7.0</td></tr><tr><td>pair _ coeff 1 1 0.01 4.4 7.0 6.0</td></tr><tr><td></td></tr><tr><td>pair_style nm/cut/coul/long 12.0 15.0 pair _ coeff * * 0.01 5.4 8.0 7.0</td></tr><tr><td>pair _coeff 1 1 0.01 4.4 7.0 6.0</td></tr></table></body></html>  

# 4.201.3 Description  

Style nm computes site-site interactions based on the N-M potential by Clarke, mainly used for ionic liquids. A site can represent a single atom or a united-atom site. The energy of an interaction has the following form:  

$$
E=\frac{E_{0}}{(n-m)}\left[m\left(\frac{r_{0}}{r}\right)^{n}-n\left(\frac{r_{0}}{r}\right)^{m}\right]\qquadr<r_{c}
$$  

where $r_{c}$ is the cutoff and $r_{0}$ is the minimum of the potential. Please note that this differs from the convention used for other Lennard-Jones potentials in LAMMPS where $\sigma$ represents the location where the energy is zero.  

Style nm/cut/split applies the standard LJ (12-6) potential above $r_{0}=2^{\frac{1}{6}}\sigma$ . Style nm/cut/split is employed in polymer equilibration protocols that combine core-softening approaches with topology-changing moves Dietz.  

Style nm/cut/coul/cut adds a Coulombic pairwise interaction given by  

$$
E={\frac{C q_{i}q_{j}}{\varepsilon r}}\qquadr<r_{c}
$$  

where $C$ is an energy-conversion constant, $q_{i}$ and $q_{j}$ are the charges on the two atoms, and epsilon is the dielectric constant which can be set by the dielectric command. If one cutoff is specified in the pair_style command, it is used for both the N-M and Coulombic terms. If two cutoffs are specified, they are used as cutoffs for the N-M and Coulombic terms respectively.  

Styles nm/cut/coul/long compute the same Coulombic interactions as style nm/cut/coul/cut except that an additional damping factor is applied to the Coulombic term so it can be used in conjunction with the kspace_style command and its ewald or pppm option. The Coulombic cutoff specified for this style means that pairwise interactions within this distance are computed directly; interactions outside that distance are computed in reciprocal space.  

For all of the nm pair styles, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands.  

• $E_{0}$ (energy units)   
• $r_{0}$ (distance units)   
• $n$ (unitless)   
• m (unitless)   
• cutoff1 (distance units)   
• cutoff2 (distance units)  

The latter 2 coefficients are optional. If not specified, the global N-M and Coulombic cutoffs specified in the pair_style command are used. If only one cutoff is specified, it is used as the cutoff for both N-M and Coulombic interactions for this type pair. If both coefficients are specified, they are used as the N-M and Coulombic cutoffs for this type pair. You cannot specify 2 cutoffs for style nm, since it has no Coulombic terms.  

For nm/cut/coul/long only the N-M cutoff can be specified since a Coulombic cutoff cannot be specified for an individua I,J type pair. All type pairs use the same global Coulombic cutoff specified in the pair_style command.  

# 4.201.4 Mixing, shift, table, tail correction, restart, rRESPA info  

These pair styles do not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly  

All of the nm pair styles supports the pair_modify shift option for the energy of the pair interaction.  

The nm/cut/coul/long pair styles support the pair_modify table option since they can tabulate the short-range portion of the long-range Coulombic interaction.  

All of the nm pair styles support the pair_modify tail option for adding a long-range tail correction to the energy and pressure for the N-M portion of the pair interaction.  

All of the nm pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

All of the nm pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffi command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.201.5 Restrictions  

These pair styles are part of the EXTRA-PAIR package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 4.201.6 Related commands  

pair_coeff , pair style lj/cut, bond style fene/nm  

# 4.201.7 Default  

none  

(Clarke) Clarke and Smith, J Chem Phys, 84, 2290 (1986).   
(Dietz) Dietz and Hoy, J. Chem Phys, 156, 014103 (2022).  

# 4.202 pair_style none command  

# 4.202.1 Syntax  

See the pair_style zero for a way to set a pairwise cutoff and thus trigger the building of a neighbor lists and setting a corresponding communication cutoff, but compute no pairwise interactions.  

# 4.202.4 Restrictions  

You must not use a pair_coeff command with this pair style. Since there is no interaction computed, you cannot set any coefficients for it.  

# 4.202.5 Related commands  

pair_style zero  

# 4.202.6 Default  

none  
4.203 pair_style oxdna/excv command  
4.204 pair_style oxdna/stk command  
4.205 pair_style oxdna/hbond command  
4.206 pair_style oxdna/xstk command  
4.207 pair_style oxdna/coaxstk command  

# 4.207.1 Syntax  

pair_style style1pair_coe ff \* \* style2 args  

• style1 $=$ hybrid/overlay oxdna/excv oxdna/stk oxdna/hbond oxdna/xstk oxdna/coaxstk • style2 $=$ oxdna/excv or oxdna/stk or oxdna/hbond or oxdna/xstk or oxdna/coaxstk • args $=$ list of arguments for these particular styles  

oxdna/stk args $=$ seq T xi kappa 6.0 0.4 0.9 0.32 0.75 1.3 0 0.8 0.9 0 0.95 0.9 0 0.95 2.0 0.65 2.0 0.65   
seq $=$ seqav (for average sequence stacking strength) or seqdep (for sequence-dependent stacking␣   
$\hookrightarrow$ strength) $\mathrm{T}=$ temperature (LJ units: $0.1=300~\mathrm{K}$ , real units: $300=300\mathrm{K}$ ) $\mathrm{{xi}=1.3448}$ (LJ units) or 8.01727944817084 (real units), temperature-independent coefficient in stacking␣   
$\hookrightarrow$ strength $\mathrm{{sappa=2.6568}}$ (LJ units) or 0.005279604 (real units), coefficient of linear temperature dependence in␣   
$\hookrightarrow$ stacking strength   
oxdna/hbond args = seq eps 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3.141592653589793 0.7␣   
,→4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
seq = seqav (for average sequence base-pairing strength) or seqdep (for sequence-dependent base-pairing␣   
$\hookrightarrow$ strength)   
eps = 1.077 (LJ units) or 6.42073911784652 (real units), average hydrogen bonding strength between␣   
$\hookrightarrow$ A-T and C-G Watson-Crick base pairs, 0 between all other pairs  

# 4.207.2 Examples  

# LJ units   
pair_style hybrid/overlay oxdna/excv oxdna/stk oxdna/hbond oxdna/xstk oxdna/coaxstk   
pair_coeff \* \* oxdna/excv 2.0 0.7 0.675 2.0 0.515 0.5 2.0 0.33 0.32   
pair_coeff \* \* oxdna/stk seqdep 0.1 1.3448 2.6568 6.0 0.4 0.9 0.32 0.75 1.3 0 0.8 0.9 0 0.95 0.9 0 0.95 2. , 0 0.65 2.0 0.65   
pair_coeff \* \* oxdna/hbond seqdep 0.0 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3. ,→141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff 1 4 oxdna/hbond seqdep 1.077 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3. ,→141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff 2 3 oxdna/hbond seqdep 1.077 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3. ,→141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff \* \* oxdna/xstk 47.5 0.575 0.675 0.495 0.655 2.25 0.791592653589793 0.58 1.7 1.0 0.68 1.7 1.0␣ ,→0.68 1.5 0 0.65 1.7 0.875 0.68 1.7 0.875 0.68   
pair_coeff \* \* oxdna/coaxstk 46.0 0.4 0.6 0.22 0.58 2.0 2.541592653589793 0.65 1.3 0 0.8 0.9 0 0.95 0.9 0␣ ,→0.95 2.0 -0.65 2.0 -0.65   
pair_style hybrid/overlay oxdna/excv oxdna/stk oxdna/hbond oxdna/xstk oxdna/coaxstk   
pair coeff \* \* oxdna/excv oxdna_lj.cgdna   
pair_coeff \* \* oxdna/stk seqav 0.1 1.3448 2.6568 oxdna_lj.cgdna $-$   
pair_coeff \* \* oxdna/hbond seqav oxdna_lj.cgdna   
pair_coeff 1 4 oxdna/hbond seqav oxdna_lj.cgdna   
pair_coeff 2 3 oxdna/hbond seqav oxdna_lj.cgdna   
pair_coeff \* \* oxdna/xstk oxdna_lj.cgdna   
pair_coeff \* \* oxdna/coaxstk oxdna_lj.cgdna  

# # Real units  

pair_style hybrid/overlay oxdna/excv oxdna/stk oxdna/hbond oxdna/xstk oxdna/coaxstk   
pair_coeff \* \* oxdna/excv 11.92337812042065 5.9626 5.74965 11.92337812042065 4.38677 4.259 1 $\hookrightarrow$ 92337812042065 2.81094 2.72576   
pair_coeff \* \* oxdna/stk seqdep 300.0 8.01727944817084 0.005279604 0.70439070204273 3.4072 7.6662␣ ,→2.72576 6.3885 1.3 0.0 0.8 0.9 0.0 0.95 0.9 0.0 0.95 2.0 0.65 2.0 0.65   
pair_coeff \* \* oxdna/hbond seqdep 0.0 0.93918760272364 3.4072 6.3885 2.89612 5.9626 1.5 0.0 0.7 1.5 0. ,→0 0.7 1.5 0.0 0.7 0.46 3.141592654 0.7 4.0 1.570796327 0.45 4.0 1.570796327 0.45   
pair_coeff 1 4 oxdna/hbond seqdep 6.42073911784652 0.93918760272364 3.4072 6.3885 2.89612 5.9626 1. ,→5 0.0 0.7 1.5 0.0 0.7 1.5 0.0 0.7 0.46 3.141592654 0.7 4.0 1.570796327 0.45 4.0 1.570796327 0.45 pair_coeff 2 3 oxdna/hbond seqdep 6.42073911784652 0.93918760272364 3.4072 6.3885 2.89612 5.9626 1. ,→5 0.0 0.7 1.5 0.0 0.7 1.5 0.0 0.7 0.46 3.141592654 0.7 4.0 1.570796327 0.45 4.0 1.570796327 0.45 pair_coeff \* \* oxdna/xstk 3.9029021145006 4.89785 5.74965 4.21641 5.57929 2.25 0.791592654 0.58 1.7␣ ,→1.0 0.68 1.7 1.0 0.68 1.5 0.0 0.65 1.7 0.875 0.68 1.7 0.875 0.68   
pair_coeff \* \* oxdna/coaxstk 3.77965257404268 3.4072 5.1108 1.87396 4.94044 2.0 2.541592654 0.65 1.3 0. ,→0 0.8 0.9 0.0 0.95 0.9 0.0 0.95 2.0 -0.65 2.0 -0.65   
pair $-$ style hybrid/overlay oxdna/excv oxdna/stk oxdna/hbond oxdna/xstk oxdna/coaxstk   
pair $-$ coeff \* \* oxdna/excv oxdna_real.cgdna   
pair_coeff \* \* oxdna/stk seqav 300.0 8.01727944817084 0.005279604 oxdna_real.cgdna   
pair_coeff \* \* oxdna/hbond seqav oxdna_real.cgdna   
pair_coeff 1 4 oxdna/hbond seqav oxdna_real.cgdna   
pair_coeff 2 3 oxdna/hbond seqav oxdna_real.cgdna   
pair_coeff \* \* oxdna/xstk oxdna_real.cgdna   
pair_coeff \* \* oxdna/coaxstk oxdna_real.cgdna  

![](images/18c776b4b8139409f62252f7061a9b3d9a0b12056fe77313b883fae08e8eca11.jpg)  

# Note  

The coefficients in the above examples are provided in forms compatible with both units $l j$ and units real (see documentation of units). These can also be read from a potential file with correct unit style by specifying the name of the file. Several potential files for each unit style are included in the potentials directory of the LAMMPS distribution.  

# 4.207.3 Description  

The oxdna pair styles compute the pairwise-additive parts of the oxDNA force field for coarse-grained modelling of DNA. The effective interaction between the nucleotides consists of potentials for the excluded volume interaction oxdna/excv, the stacking oxdna/stk, cross-stacking oxdna/xstk and coaxial stacking interaction oxdna/coaxstk as well as the hydrogen-bonding interaction oxdna/hbond between complementary pairs of nucleotides on opposite strands. Average sequence or sequence-dependent stacking and base-pairing strengths are supported (Sulc). Quasi-unique basepairing between nucleotides can be achieved by using more complementary pairs of atom types like 5-8 and 6-7, 9-12 and 10-11, 13-16 and 14-15, etc. This prevents the hybridization of in principle complementary bases within Ntypes/4 bases up and down along the backbone.  

The exact functional form of the pair styles is rather complex. The individual potentials consist of products of modulation factors, which themselves are constructed from a number of more basic potentials (Morse, Lennard-Jones, harmonic angle and distance) as well as quadratic smoothing and modulation terms. We refer to (Ouldridge-DPhil) and (Ouldridge) for a detailed description of the oxDNA force field.  

![](images/0af538c819b6d251d246c08fe958db0dace20144b67002d1519b22c9fd08c5d2.jpg)  

# Note  

These pair styles have to be used together with the related oxDNA bond style oxdna/fene for the connectivity of the phosphate backbone (see also documentation of bond_style oxdna/fene). Most of the coefficients in the above example have to be kept fixed and cannot be changed without reparameterizing the entire model. Exceptions are the first four coefficients after oxdna/stk (seq $=$ seqdep, ${\mathrm{T}}{=}0.1$ , $_{\mathrm{Xi=1}.3448}$ and kapp $_{1=2.6568}$ and corresponding real unit equivalents in the above examples) and the first coefficient after oxdna/hbond (seq $=:$ seqdep in the above example). When using a Langevin thermostat, e.g. through fix langevin or fix nve/dotc/langevin the temperature coefficients have to be matched to the one used in the fix.  

# Note  

These pair styles have to be used with the atom_style hybrid bond ellipsoid oxdna (see documentation of atom_style). The atom_style oxdna stores the $_3\cdot$ -to- $\cdot5^{\circ}$ polarity of the nucleotide strand, which is set through the bond topology in the data file. The first (second) atom in a bond definition is understood to point towards the $_3\cdot$ -end ( $\mho$ -end) of the strand.  

Example input and data files for DNA duplexes can be found in examples/PACKAGES/cgdna/examples/oxDNA/ and $\mathrm{\cdots/oxDNA2/}$ . A simple python setup tool which creates single straight or helical DNA strands, DNA duplexes or arrays of DNA duplexes can be found in examples/PACKAGES/cgdna/util/.  

Please cite (Henrich) in any publication that uses this implementation. An updated documentation that contains general information on the model, its implementation and performance as well as the structure of the data and input file can be found here.  

Please cite also the relevant oxDNA publications (Ouldridge), (Ouldridge-DPhil) and (Sulc).  

# 4.207.4 Potential file reading  

For each pair style above the first non-modifiable argument can be a filename, and if it is, no further arguments should be supplied. Therefore the following command:  

<html><body><table><tr><td>pair coeff 1 4 oxdna/hbond seqav oxdna_lj.cgdna</td></tr></table></body></html>  

will be interpreted as a request to read the corresponding hydrogen bonding potential parameters from the file with the given name. The file can define multiple potential parameters for both bonded and pair interactions, but for the example pair interaction above there must exist in the file a line of the form:  

If potential customization is required, the potential file reading can be mixed with the manual specification of the potential parameters. For example, the following command:  

pair_style hybrid/overlay oxdna/excv oxdna/stk oxdna/hbond oxdna/xstk oxdna/coaxstk   
pair_coeff \* \* oxdna/excv oxdna_lj.cgdna   
pair_coeff \* \* oxdna/stk seqav 0.1 1.3448 2.6568 6.0 0.4 0.9 0.32 0.75 1.3 0 0.8 0.9 0 0.95 0.9 0 0.95 2. ,→0 0.65 2.0 0.65   
pair_coeff \* \* oxdna/hbond seqav oxdna_lj.cgdna   
pair_coeff 1 4 oxdna/hbond seqav oxdna_lj.cgdna   
pair_coeff 2 3 oxdna/hbond seqav oxdna_lj.cgdna   
pair_coeff \* \* oxdna/xstk oxdna_lj.cgdna   
pair_coeff \* \* oxdna/coaxstk 46.0 0.4 0.6 0.22 0.58 2.0 2.541592653589793 0.65 1.3 0 0.8 0.9 0 0.95 0.9 0␣ $_{\leftrightarrow0.95\mathrm{~2.0~-0.65~2.0~-0.65}}$  

will read the stacking and coaxial stacking potential parameters from the manual specification and all others from the potential file oxdna_lj.cgdna.  

There are sample potential files for each unit style in the potentials directory of the LAMMPS distribution. The potential file unit system must align with the units defined via the units command. For conversion between different $L J$ and real unit systems for oxDNA, the python tool lj2real.py located in the examples/PACKAGES/cgdna/util/ directory can be used. This tool assumes similar file structure to the examples found in examples/PACKAGES/ cgdna/examples/.  

# 4.207.5 Restrictions  

These pair styles can only be used if LAMMPS was built with the CG-DNA package and the MOLECULE and ASPHERE package. See the Build package page for more info.  

# 4.207.6 Related commands  

bond_style oxdna/fene, pair_coeff , bond_style oxdna2/fene, pair_style oxdna2/excv, bond_style oxrna2/fene, pair_style oxrna2/excv, atom_style oxdna, fix nve/dotc/langevin  

# 4.207.7 Default  

none  

(Henrich) O. Henrich, Y. A. Gutierrez-Fosado, T. Curk, T. E. Ouldridge, Eur. Phys. J. E 41, 57 (2018).  

(Ouldridge-DPhil) T.E. Ouldridge, Coarse-grained modelling of DNA and DNA self-assembly, DPhil. University o Oxford (2011).  

(Ouldridge) T.E. Ouldridge, A.A. Louis, J.P.K. Doye, J. Chem. Phys. 134, 085101 (2011).   
(Sulc) P. Sulc, F. Romano, T.E. Ouldridge, L. Rovigatti, J.P.K. Doye, A.A. Louis, J. Chem. Phys. 137, 135101 (2012).  

4.208 pair_style oxdna2/excv command  

4.209 pair_style oxdna2/stk command  

4.210 pair_style oxdna2/hbond command  

4.211 pair_style oxdna2/xstk command  

4.212 pair_style oxdna2/coaxstk command  

4.213 pair_style oxdna2/dh command  

# 4.213.1 Syntax  

pair_style style1pair_coeff \* \* style2 args  

• style1 $=$ hybrid/overlay oxdna2/excv oxdna2/stk oxdna2/hbond oxdna2/xstk oxdna2/coaxstk oxdna2/dh • style2 $=$ oxdna2/excv or oxdna2/stk or oxdna2/hbond or oxdna2/xstk or oxdna2/coaxstk or oxdna2/dh • args $=$ list of arguments for these particular styles  

oxdna2/stk args $=$ seq $\mathrm{T}$ xi kappa 6.0 0.4 0.9 0.32 0.75 1.3 0 0.8 0.9 0 0.95 0.9 0 0.95 2.0 0.65 2.0 0.65 $\mathrm{seq}=\mathrm{seqav}$ (for average sequence stacking strength) or seqdep (for sequence-dependent stacking␣   
$\hookrightarrow$ strength) $\mathrm{T}=$ temperature (LJ units: $0.1=300~\mathrm{K}$ , real units: $300=300\mathrm{K}$ ) $\mathrm{{xi}=1.3523}$ (LJ units) or 8.06199211612242 (real units), temperature-independent coefficient in stacking␣   
$\hookrightarrow$ strength $\mathrm{kappa=2.6717}$ (LJ units) or 0.005309213 (real units), coefficient of linear temperature dependence in␣   
$\hookrightarrow$ stacking strength   
oxdna2/hbond args = seq eps 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3.141592653589793 0.   
,→7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
seq = seqav (for average sequence base-pairing strength) or seqdep (for sequence-dependent base-pairing␣   
$\hookrightarrow$ strength) $\mathrm{eps}=1.0678$ (LJ units) or 6.36589157849259 (real units), average hydrogen bonding strength between␣   
$\mathrm{\Gamma}\mathrm{{A}}\mathrm{{-}T}$ and C-G Watson-Crick base pairs, 0 between all other pairs   
oxdna2/dh args = T rhos qeff $\mathrm{T}=$ temperature (LJ units: 0.1 = 300 K, real units: $300=300$ K) rhos $=$ salt concentration (mole per litre) $\mathrm{qeff}=0.815$ (effective charge in elementary charges)  

# 4.213.2 Examples  

# LJ units   
pair_style hybrid/overlay oxdna2/excv oxdna2/stk oxdna2/hbond oxdna2/xstk oxdna2/coaxstk oxdna2/   
$\hookrightarrow$ dh   
pair_coeff \* \* oxdna2/excv 2.0 0.7 0.675 2.0 0.515 0.5 2.0 0.33 0.32 (continues on next page)  

(continued from previous page)  

pair_coeff \* \* oxdna2/stk seqdep 0.1 1.3523 2.6717 6.0 0.4 0.9 0.32 0.75 1.3 0 0.8 0.9 0 0.95 0.9 0 0.95␣ ,→2.0 0.65 2.0 0.65   
pair_coeff \* \* oxdna2/hbond seqdep 0.0 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3. ,→141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff 1 4 oxdna2/hbond seqdep 1.0678 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3. ,→141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff 2 3 oxdna2/hbond seqdep 1.0678 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3. ,→141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff \* \* oxdna2/xstk 47.5 0.575 0.675 0.495 0.655 2.25 0.791592653589793 0.58 1.7 1.0 0.68 1.7 1. ,→0 0.68 1.5 0 0.65 1.7 0.875 0.68 1.7 0.875 0.68   
pair_coeff \* \* oxdna2/coaxstk 58.5 0.4 0.6 0.22 0.58 2.0 2.891592653589793 0.65 1.3 0 0.8 0.9 0 0.95 0.9 0␣ ,→0.95 40.0 3.116592653589793   
pair_coeff \* \* oxdna2/dh 0.1 0.5 0.815   
pair_style hybrid/overlay oxdna2/excv oxdna2/stk oxdna2/hbond oxdna2/xstk oxdna2/coaxstk oxdna2/ $\hookrightarrow$ dh   
pair $-$ coeff \* \* oxdna2/excv oxdna2_lj.cgdna   
pair_coeff \* \* oxdna2/stk seqdep 0.1 1.3523 2.6717 oxdna2 pair_coeff \* \* oxdna2/hbond seqdep oxdna2_lj.cgdna $-$ lj.cgdna   
pair_coeff 1 4 oxdna2/hbond seqdep oxdna2_lj.cgdna   
pair_coeff 2 3 oxdna2/hbond seqdep oxdna2_lj.cgdna   
pair_coeff \* \* oxdna2/xstk oxdna2_lj.cgdna   
pair_coeff \* \* oxdna2/coaxstk oxdna2_lj.cgdna   
pair_coeff \* \* oxdna2/dh 0.1 0.5 oxdna2_lj.cgdna  

# # Real units  

pair_style hybrid/overlay oxdna2/excv oxdna2/stk oxdna2/hbond oxdna2/xstk oxdna2/coaxstk oxdna2/ $\hookrightarrow$ dh   
pair_coeff \* \* oxdna2/excv 11.92337812042065 5.9626 5.74965 11.92337812042065 4.38677 4.259 11. $\hookrightarrow$ 92337812042065 2.81094 2.72576   
pair_coeff \* \* oxdna2/stk seqdep 300.0 8.06199211612242 0.005309213 0.70439070204273 3.4072 7. ,→6662 2.72576 6.3885 1.3 0.0 0.8 0.9 0.0 0.95 0.9 0.0 0.95 2.0 0.65 2.0 0.65   
pair_coeff \* \* oxdna2/hbond seqdep 0.0 0.93918760272364 3.4072 6.3885 2.89612 5.9626 1.5 0.0 0.7 1.5␣ ,→0.0 0.7 1.5 0.0 0.7 0.46 3.141592654 0.7 4.0 1.570796327 0.45 4.0 1.570796327 0.45   
pair_coeff 1 4 oxdna2/hbond seqdep 6.36589157849259 0.93918760272364 3.4072 6.3885 2.89612 5.9626␣ ,→1.5 0.0 0.7 1.5 0.0 0.7 1.5 0.0 0.7 0.46 3.141592654 0.7 4.0 1.570796327 0.45 4.0 1.570796327 0.45 pair_coeff 2 3 oxdna2/hbond seqdep 6.36589157849259 0.93918760272364 3.4072 6.3885 2.89612 5.9626␣ ,→1.5 0.0 0.7 1.5 0.0 0.7 1.5 0.0 0.7 0.46 3.141592654 0.7 4.0 1.570796327 0.45 4.0 1.570796327 0.45 pair_coeff \* \* oxdna2/xstk 3.9029021145006 4.89785 5.74965 4.21641 5.57929 2.25 0.791592654 0.58 1. ,→7 1.0 0.68 1.7 1.0 0.68 1.5 0.0 0.65 1.7 0.875 0.68 1.7 0.875 0.68   
pair_coeff \* \* oxdna2/coaxstk 4.80673207785863 3.4072 5.1108 1.87396 4.94044 2.0 2.891592653589793 0. ,→65 1.3 0.0 0.8 0.9 0.0 0.95 0.9 0.0 0.95 40.0 3.116592653589793   
pair_coeff \* \* oxdna2/dh 300.0 0.5 0.815   
pair_style hybrid/overlay oxdna2/excv oxdna2/stk oxdna2/hbond oxdna2/xstk oxdna2/coaxstk oxdna2/ $\hookrightarrow$ dh   
pair pair $-$ coeff \* \* oxdna2/excv oxdna2_real.cgdna coeff \* \* oxdna2/stk seqdep 300.0 8.06199211612242 0.005309213 oxdna2_real.cgdna   
pair_coeff \* \* oxdna2/hbond seqdep oxdna2_real.cgdna   
pair_coeff 1 4 oxdna2/hbond seqdep oxdna2_real.cgdna   
pair_coeff 2 3 oxdna2/hbond seqdep oxdna2_real.cgdna   
pair_coeff \* \* oxdna2/xstk oxdna2_real.cgdna  

(continues on next page)  

(continued from previous page)  

pair_coeff \* \* oxdna2/coaxstk oxdna2_real.cgdna pair_coeff \* \* oxdna2/dh 300.0 0.5 oxdna2_real.cgdna  

# Note  

The coefficients in the above examples are provided in forms compatible with both units $l j$ and units real (see documentation of units). These can also be read from a potential file with correct unit style by specifying the name of the file. Several potential files for each unit style are included in the potentials directory of the LAMMPS distribution.  

# 4.213.3 Description  

The oxdna2 pair styles compute the pairwise-additive parts of the oxDNA force field for coarse-grained modelling of DNA. The effective interaction between the nucleotides consists of potentials for the excluded volume interaction oxdna2/excv, the stacking oxdna $2/s t k$ , cross-stacking oxdna2/xstk and coaxial stacking interaction oxdna2/coaxstk, electrostatic Debye-Hueckel interaction oxdna2/dh as well as the hydrogen-bonding interaction oxdna2/hbond between complementary pairs of nucleotides on opposite strands. Average sequence or sequence-dependent stacking and basepairing strengths are supported (Sulc). Quasi-unique base-pairing between nucleotides can be achieved by using more complementary pairs of atom types like 5-8 and 6-7, 9-12 and 10-11, 13-16 and 14-15, etc. This prevents the hybridization of in principle complementary bases within Ntypes/4 bases up and down along the backbone.  

The exact functional form of the pair styles is rather complex. The individual potentials consist of products of modulation factors, which themselves are constructed from a number of more basic potentials (Morse, Lennard-Jones, harmonic angle and distance) as well as quadratic smoothing and modulation terms. We refer to (Snodin) and the original oxDNA publications (Ouldridge-DPhil) and (Ouldridge) for a detailed description of the oxDNA2 force field.  

# Note  

These pair styles have to be used together with the related oxDNA2 bond style oxdna2/fene for the connectivity of the phosphate backbone (see also documentation of bond_style oxdna2/fene). Most of the coefficients in the above example have to be kept fixed and cannot be changed without reparameterizing the entire model. Exceptions are the first four coefficients after oxdna2/stk (seq ${=}:$ seqdep, ${\mathrm{T}}{=}0.1$ , $_{\mathrm{Xi=1}.3523}$ and kappa=2.6717 and corresponding real unit equivalents in the above examples). the first coefficient after oxdna2/hbond (seq $=$ seqdep in the above example) and the three coefficients after oxdna2/dh ${\mathrm{T}}{=}0.1$ , rhos $_{;=0.5}$ , qef $=0.815$ in the above example). When using a Langevin thermostat e.g. through fix langevin or fix nve/dotc/langevin the temperature coefficients have to be matched to the one used in the fix.  

![](images/297333ec72e9c9461b0ff5ffa3dc78627e02bcc0798327a7075dd40e74fab840.jpg)  

# Note  

These pair styles have to be used with the atom_style hybrid bond ellipsoid oxdna (see documentation of atom_style). The atom_style oxdna stores the $_3\cdot$ -to- $\cdot5^{\circ}$ polarity of the nucleotide strand, which is set through the bond topology in the data file. The first (second) atom in a bond definition is understood to point towards the $_3\cdot$ -end ( $\mho$ -end) of the strand.  

Example input and data files for DNA duplexes can be found in examples/PACKAGES/cgdna/examples/oxDNA/ and $\mathrm{\cdots/oxDNA2/}$ . A simple python setup tool which creates single straight or helical DNA strands, DNA duplexes or arrays of DNA duplexes can be found in examples/PACKAGES/cgdna/util/.  

Please cite (Henrich) in any publication that uses this implementation. An updated documentation that contains general information on the model, its implementation and performance as well as the structure of the data and input file can be  

found here.  

Please cite also the relevant oxDNA2 publications (Snodin) and (Sulc).  

# 4.213.4 Potential file reading  

For each pair style above the first non-modifiable argument can be a filename (with exception of Debye-Hueckel, for which the effective charge argument can be a filename), and if it is, no further arguments should be supplied. Therefore the following command:  

pair_coeff 1 4 oxdna2/hbond seqdep oxdna_real.cgdna will be interpreted as a request to read the corresponding hydrogen bonding potential parameters from the file with the given name. The file can define multiple potential parameters for both bonded and pair interactions, but for the example pair interaction above there must exist in the file a line of the form:  

1 4 hbond <coefficients>  

If potential customization is required, the potential file reading can be mixed with the manual specification of the potential parameters. For example, the following command:  

<html><body><table><tr><td colspan="20">pair style hybrid /overlay oxdna2 /excv 0xdna2/stk oxdna2/hbond oxdna2/xstk oxdna2/coaxstk oxdna2 dh</td></tr><tr><td colspan="9">pair_c coeff ** **</td></tr><tr><td colspan="5">pair</td><td colspan="2">seqdep 00.11.35232.67170xdna2 2_lj.cgdna</td></tr><tr><td></td><td>coeff coeff</td><td>oxdna2/stk ** oxdna2</td><td colspan="3">2/hbond seqdep oxdna2 lj.cgdna</td></tr><tr><td>pair</td><td></td><td></td><td colspan="3"></td></tr><tr><td>pair</td><td></td><td>coeff 1 4 oxdna2 2/hbond</td><td colspan="3">seqdep oxdna2 lj.cgdna</td></tr><tr><td>pair</td><td>**</td><td>coeff 2 3 oxdna2/hbond seqdep</td><td colspan="3">）oxdna2 lj.cgdna</td></tr><tr><td>pair</td><td>coeff</td><td>oxdna2/xstk oxdna2 **</td><td colspan="3">lj.cgdna</td></tr><tr><td>pair</td><td>coeff</td><td>oxdna2 coaxstkoxdna2 ** oxdna2 dh 0.1 0.5 0.815</td><td colspan="3">2lj.cgdna</td></tr><tr><td>pair</td><td>coeff</td><td></td><td colspan="3"></td></tr><tr><td></td><td></td><td></td><td colspan="3"></td></tr></table></body></html>  

will read the excluded volume and Debye-Hueckel effective charge qeff parameters from the manual specification and all others from the potential file oxdna2_lj.cgdna.  

There are sample potential files for each unit style in the potentials directory of the LAMMPS distribution. The potential file unit system must align with the units defined via the units command. For conversion between different $L J$ and real unit systems for oxDNA, the python tool lj2real.py located in the examples/PACKAGES/cgdna/util/ directory can be used. This tool assumes similar file structure to the examples found in examples/PACKAGES/ cgdna/examples/.  

# 4.213.5 Restrictions  

These pair styles can only be used if LAMMPS was built with the CG-DNA package and the MOLECULE and ASPHERE package. See the Build package page for more info.  

# 4.213.6 Related commands  

bond_style oxdna2/fene, pair_coeff , bond_style oxdna/fene, pair_style oxdna/excv, bond_style oxrna2/fene, pair_style oxrna2/excv, atom_style oxdna, fix nve/dotc/langevin  

# 4.213.7 Default  

none  

(Henrich) O. Henrich, Y. A. Gutierrez-Fosado, T. Curk, T. E. Ouldridge, Eur. Phys. J. E 41, 57 (2018).   
(Snodin) B.E. Snodin, F. Randisi, M. Mosayebi, et al., J. Chem. Phys. 142, 234901 (2015).   
(Sulc) P. Sulc, F. Romano, T.E. Ouldridge, L. Rovigatti, J.P.K. Doye, A.A. Louis, J. Chem. Phys. 137, 135101 (2012).   
(Ouldridge-DPhil) T.E. Ouldridge, Coarse-grained modelling of DNA and DNA self-assembly, DPhil. University of Oxford (2011).   
(Ouldridge) T.E. Ouldridge, A.A. Louis, J.P.K. Doye, J. Chem. Phys. 134, 085101 (2011).  

4.214 pair_style oxrna2/excv command  

4.215 pair_style oxrna2/stk command  

4.216 pair_style oxrna2/hbond command  

4.217 pair_style oxrna2/xstk command  

4.218 pair_style oxrna2/coaxstk command  

# 4.219 pair_style oxrna2/dh command  

# 4.219.1 Syntax  

pair_style style1pair_coef f \* \* style2 args  

• style1 $=$ hybrid/overlay oxrna2/excv oxrna2/stk oxrna2/hbond oxrna2/xstk oxrna2/coaxstk oxrna2/dh • style2 $=$ oxrna2/excv or oxrna2/stk or oxrna2/hbond or oxrna2/xstk or oxrna2/coaxstk or oxrna2/dh • args $=$ list of arguments for these particular styles  

oxrna2/stk args $=$ seq T xi kappa 6.0 0.43 0.93 0.35 0.78 0.9 0 0.95 0.9 0 0.95 1.3 0 0.8 1.3 0 0.8 2.0 0.65 2.   
$\textsuperscript{\scriptsize\to00.65}$ $\mathrm{seq}=\mathrm{seqav}$ (for average sequence stacking strength) or seqdep (for sequence-dependent stacking␣   
$\hookrightarrow$ strength) $\mathrm{T}=$ temperature (LJ units: $0.1=300~\mathrm{K}$ , real units: $300=300~\mathrm{K}$ ) $\mathrm{{xi}=1.40206}$ (LJ units) or 8.35864576375849 (real units), temperature-independent coefficient in␣   
$\hookrightarrow$ stacking strength   
kappa = 2.77 (LJ units) or 0.005504556 (real units), coefficient of linear temperature dependence in␣   
$\hookrightarrow$ stacking strength   
oxrna2/hbond args = seq eps 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3.141592653589793 0.7␣   
,→4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45 $\mathrm{seq}=\mathrm{seqav}$ (for average sequence base-pairing strength) or seqdep (for sequence-dependent base-pairing␣   
$\hookrightarrow$ strength) $\mathrm{eps}=0.870439$ (LJ units) or 5.18928666388042 (real units), average hydrogen bonding strength between␣   
$\mathrm{\Gamma\toA\mathrm{-}U}$ and C-G Watson-Crick and G-U wobble base pairs, 0 between all other pairs   
oxrna2/dh args = T rhos qeff  

T = temperature (LJ units: $0.1=300~\mathrm{K}$ , real units: $300=300~\mathrm{K}$ ) rhos = salt concentration (mole per litre) qeff = 1.02455 (effective charge in elementary charges)  

# 4.219.2 Examples  

# LJ units   
pair_style hybrid/overlay oxrna2/excv oxrna2/stk oxrna2/hbond oxrna2/xstk oxrna2/coaxstk oxrna2/dh pair_coeff \* \* oxrna2/excv 2.0 0.7 0.675 2.0 0.515 0.5 2.0 0.33 0.32   
pair_coeff \* \* oxrna2/stk seqdep 0.1 1.40206 2.77 6.0 0.43 0.93 0.35 0.78 0.9 0 0.95 0.9 0 0.95 1.3 0 0.8␣ ,→1.3 0 0.8 2.0 0.65 2.0 0.65   
pair_coeff \* \* oxrna2/hbond seqdep 0.0 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3. ,→141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff 1 4 oxrna2/hbond seqdep 0.870439 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3. ,→141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff 2 3 oxrna2/hbond seqdep 0.870439 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3. ,→141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff 3 4 oxrna2/hbond seqdep 0.870439 8.0 0.4 0.75 0.34 0.7 1.5 0 0.7 1.5 0 0.7 1.5 0 0.7 0.46 3. ,→141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff $^**$ oxrna2/xstk 59.9626 0.5 0.6 0.42 0.58 2.25 0.505 0.58 1.7 1.266 0.68 1.7 1.266 0.68 1.7 0. ,→309 0.68 1.7 0.309 0.68   
pair_coeff \* \* oxrna2/coaxstk 80 0.5 0.6 0.42 0.58 2.0 2.592 0.65 1.3 0.151 0.8 0.9 0.685 0.95 0.9 0.685 0. ,→95 2.0 -0.65 2.0 -0.65   
pair_coeff \* \* oxrna2/dh 0.1 0.5 1.02455   
pair style hybrid/overlay oxrna2/excv oxrna2/stk oxrna2/hbond oxrna2/xstk oxrna2/coaxstk oxrna2/dh   
pair_coeff \* \* oxrna2/excv oxrna2_lj.cgdna   
pair_coeff \* \* oxrna2/stk seqdep 0.1 1.40206 2.77 oxrna2_lj.cgdna   
pair_coeff \* \* oxrna2/hbond seqdep oxrna2_lj.cgdna   
pair_coeff 1 4 oxrna2/hbond seqdep oxrna2_lj.cgdna   
pair $-$ coeff 2 3 oxrna2/hbond seqdep oxrna2_lj.cgdna   
pair_coeff 3 4 oxrna2/hbond seqdep oxrna2_lj.cgdna   
pair pair pair $-$ $-$ $-$ coeff \* \* oxrna2/xstk oxrna2_lj.cgdna coeff \* \* oxrna2/coaxstk oxrna2_lj.cgdna coeff \* \* oxrna2/dh 0.1 0.5 oxrna2_lj.cgdna  

# # Real units  

pair_style hybrid/overlay oxrna2/excv oxrna2/stk oxrna2/hbond oxrna2/xstk oxrna2/coaxstk oxrna2/dh   
pair_coeff \* \* oxrna2/excv 11.92337812042065 5.9626 5.74965 11.92337812042065 4.38677 4.259 11. ,→92337812042065 2.81094 2.72576   
pair_coeff \* \* oxrna2/stk seqdep 300.0 8.35864576375849 0.005504556 0.70439070204273 3.66274 7. $\hookrightarrow$ 92174 2.9813 6.64404 0.9 0.0 0.95 0.9 0.0 0.95 1.3 0.0 0.8 1.3 0.0 0.8 2.0 0.65 2.0 0.65   
pair_coeff $^**$ oxrna2/hbond seqdep 0.0 0.93918760272364 3.4072 6.3885 2.89612 5.9626 1.5 0.0 0.7 1.5 0.   
,→0 0.7 1.5 0.0 0.7 0.46 3.141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.5707963267948966 0.45   
pair_coeff 1 4 oxrna2/hbond seqdep 5.18928666388042 0.93918760272364 3.4072 6.3885 2.89612 5.9626 1. ,→5 0.0 0.7 1.5 0.0 0.7 1.5 0.0 0.7 0.46 3.141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1. ,→5707963267948966 0.45   
pair_coeff 2 3 oxrna2/hbond seqdep 5.18928666388042 0.93918760272364 3.4072 6.3885 2.89612 5.9626 1.   
,→5 0.0 0.7 1.5 0.0 0.7 1.5 0.0 0.7 0.46 3.141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1.   
,→5707963267948966 0.45   
pair_coeff 3 4 oxrna2/hbond seqdep 5.18928666388042 0.93918760272364 3.4072 6.3885 2.89612 5.9626 1.   
,→5 0.0 0.7 1.5 0.0 0.7 1.5 0.0 0.7 0.46 3.141592653589793 0.7 4.0 1.5707963267948966 0.45 4.0 1. ,→5707963267948966 0.45  

(continues on next page)  

(continued from previous page)  

pair_coeff \* \* oxrna2/xstk 4.92690859644113 4.259 5.1108 3.57756 4.94044 2.25 0.505 0.58 1.7 1.266 0. , 68 1.7 1.266 0.68 1.7 0.309 0.68 1.7 0.309 0.68   
pair_coeff \* \* oxrna2/coaxstk 6.57330882442206 4.259 5.1108 3.57756 4.94044 2.0 2.592 0.65 1.3 0.151 0. ,→8 0.9 0.685 0.95 0.9 0.685 0.95 2.0 -0.65 2.0 -0.65   
pair_coeff \* \* oxrna2/dh 300.0 0.5 1.02455   
pair_style hybrid/overlay oxrna2/excv oxrna2/stk oxrna2/hbond oxrna2/xstk oxrna2/coaxstk oxrna2/dh pair $-$ coeff \* \* oxrna2/excv oxrna2_real.cgdna   
pair_coeff \* \* oxrna2/stk seqdep 300.0 8.35864576375849 0.005504556 oxrna2_real.cgdna   
pair $-$ coeff \* \* oxrna2/hbond seqdep oxrna2_real.cgdna   
pair_coeff 1 4 oxrna2/hbond seqdep oxrna2_real.cgdna   
pair $-$ coeff 2 3 oxrna2/hbond seqdep oxrna2_real.cgdna   
pair_coeff 3 4 oxrna2/hbond seqdep oxrna2_real.cgdna   
pair_coeff \* \* oxrna2/xstk oxrna2_real.cgdna   
pair_coeff \* \* oxrna2/coaxstk oxrna2_real.cgdna   
pair_coeff \* \* oxrna2/dh 300.0 0.5 oxrna2_real.cgdna  

# Note  

The coefficients in the above examples are provided in forms compatible with both units $l j$ and units real (see documentation of units). These can also be read from a potential file with correct unit style by specifying the name of the file. Several potential files for each unit style are included in the potentials directory of the LAMMPS distribution.  

# 4.219.3 Description  

The oxrna2 pair styles compute the pairwise-additive parts of the oxDNA force field for coarse-grained modelling of RNA. The effective interaction between the nucleotides consists of potentials for the excluded volume interaction oxrna2/excv, the stacking oxrna2/stk, cross-stacking oxrna2/xstk and coaxial stacking interaction oxrna2/coaxstk, electrostatic Debye-Hueckel interaction oxrna2/dh as well as the hydrogen-bonding interaction oxrna2/hbond between complementary pairs of nucleotides on opposite strands. Average sequence or sequence-dependent stacking and basepairing strengths are supported (Sulc2). Quasi-unique base-pairing between nucleotides can be achieved by using more complementary pairs of atom types like 5-8 and 6-7, 9-12 and 10-11, 13-16 and 14-15, etc. This prevents the hybridization of in principle complementary bases within Ntypes/4 bases up and down along the backbone.  

The exact functional form of the pair styles is rather complex. The individual potentials consist of products of modulation factors, which themselves are constructed from a number of more basic potentials (Morse, Lennard-Jones, harmonic angle and distance) as well as quadratic smoothing and modulation terms. We refer to (Sulc1) and the original oxDNA publications (Ouldridge-DPhil) and (Ouldridge) for a detailed description of the oxRNA2 force field.  

# $\Theta$ Note  

These pair styles have to be used together with the related oxDNA2 bond style oxrna2/fene for the connectivity of the phosphate backbone (see also documentation of bond_style oxrna2/fene). Most of the coefficients in the above example have to be kept fixed and cannot be changed without reparameterizing the entire model. Exceptions are the first four coefficients after oxrna2/stk (seq $=$ seqdep, $\mathrm{T}{=}0.1$ , $\scriptstyle\mathrm{xi=1.40206}$ and kappa $_{1=2.77}$ and corresponding real unit equivalents in the above examples), the first coefficient after oxrna2/hbond (seq $=$ seqdep in the above example) and the three coefficients after oxrna2/dh $\mathrm{(T=0.1}$ , rhos ${\it:=}0.5$ , qeff=1.02455 in the above example). When using a Langevin thermostat e.g. through fix langevin or fix nve/dotc/langevin the temperature coefficients have to be matched to the one used in the fix.  

![](images/d174ef45d8b020727a38083648249de12726292b8d94d2c10b348974b27dcb56.jpg)  

# Note  

These pair styles have to be used with the atom_style hybrid bond ellipsoid oxdna (see documentation of atom_style). The atom_style oxdna stores the $_3\cdot$ -to- $\cdot5^{\circ}$ polarity of the nucleotide strand, which is set through the bond topology in the data file. The first (second) atom in a bond definition is understood to point towards the $_3\cdot$ -end ( $\mho$ -end) of the strand.  

Example input and data files for DNA duplexes can be found in examples/PACKAGES/cgdna/examples/oxDNA/ and $\mathrm{\cdots/oxDNA2/}$ . A simple python setup tool which creates single straight or helical DNA strands, DNA duplexes or arrays of DNA duplexes can be found in examples/PACKAGES/cgdna/util/.  

Please cite (Henrich) in any publication that uses this implementation. The article contains general information on the model, its implementation and performance as well as the structure of the data and input file. The preprint version of the article can be found here. Please cite also the relevant oxRNA2 publications (Sulc1) and (Sulc2).  

# 4.219.4 Potential file reading  

For each pair style above the first non-modifiable argument can be a filename (with exception of Debye-Hueckel, for which the effective charge argument can be a filename), and if it is, no further arguments should be supplied. Therefore the following command:  

pair_coeff 3 4 oxrna2/hbond seqdep oxrna2_lj.cgdna  

will be interpreted as a request to read the corresponding hydrogen bonding potential parameters from the file with the given name. The file can define multiple potential parameters for both bonded and pair interactions, but for the example pair interaction above there must exist in the file a line of the form:  