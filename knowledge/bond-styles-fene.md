---
title: "Bond Styles: FENE and Variants"
description: "FENE, FENE/NM, FENE/expand, Gaussian, GROMOS bond styles"
category: "bond_style"
tags: ["bond", "FENE", "polymer", "Gaussian", "GROMOS"]
commands: ["bond_style fene", "bond_style fene/nm", "bond_style fene/expand", "bond_style gaussian", "bond_style gromos"]
---
# 5.3.5 Related commands  

bond_coeff , delete_bonds  

# 5.3.6 Default  

none  

(Sun) Sun, J Phys Chem B 102, 7338-7364 (1998).  

# 5.4 bond_style fene command  

Accelerator Variants: fene/intel, fene/kk, fene/omp  

# 5.5 bond_style fene/nm command  

# 5.5.1 Syntax  

bond_style fene bond_style fene/nm  

# 5.5.2 Examples  

bond_style fene   
bond_coeff 1 30.0 1.5 1.0 1.0   
bond_style fene/nm   
bond_coeff 1 2.25344 1.5 1.0 1.12246 2 6  

# 5.5.3 Description  

The fene bond style uses the potential  

$$
E=-0.5K R_{0}^{2}\ln{\left[1-\left(\frac{r}{R_{0}}\right)^{2}\right]}+4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12}-\left(\frac{\sigma}{r}\right)^{6}\right]+\varepsilon
$$  

to define a finite extensible nonlinear elastic (FENE) potential (Kremer), used for bead-spring polymer models. The first term is attractive, the second Lennard-Jones term is repulsive. The first term extends to $R_{0}$ , the maximum extent of the bond. The second term is cutoff at $2^{\frac{1}{6}}\sigma$ , the minimum of the LJ potential.  

The fene/nm bond style substitutes the standard LJ potential with the generalized LJ potential in the same form as in pair style nm/cut. The bond energy is then given by  

$$
E=-0.5K R_{0}^{2}\ln\left[1-\left(\frac{r}{R_{0}}\right)^{2}\right]+\frac{E_{0}}{(n-m)}\left[m\left(\frac{r_{0}}{r}\right)^{n}-n\left(\frac{r_{0}}{r}\right)^{m}\right]
$$  

Similar to the fene style, the generalized Lennard-Jones is cut off at the potential minimum, $r_{0}$ , to be repulsive only. The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $K$ (energy/distance^2) • $R_{0}$ (distance)  

# 5.4. bond_style fene command  

# LAMMPS Documentation, Release 4Feb2025  

• ε (energy) • σ (distance)  

For the fene/nm style, the following coefficients are used. Please note, that the standard LJ potential and thus the regular FENE potential is recovered for $\mathrm{\tilde{n}}{=}12\mathrm{m}{=}6\mathrm{,}$ ) and $r_{0}=2^{\frac{1}{6}}\sigma$ .  

• $K$ (energy/distance^2)   
• $R_{0}$ (distance)   
• $E_{0}$ (energy)   
• $r_{0}$ (distance)   
• n (unitless)   
• m (unitless)  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.5.4 Restrictions  

The fene bond style can only be used if LAMMPS was built with the MOLECULE package; the fene/nm bond style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package page for more info.  

You typically should specify special_bonds fene or special_bonds lj/coul 0 1 1 to use this bond style. LAMMPS will issue a warning it that’s not the case.  

# 5.5.5 Related commands  

bond_coeff , delete_bonds, pair style lj/cut, pair style nm/cut.  

# 5.5.6 Default  

none  

(Kremer) Kremer, Grest, J Chem Phys, 92, 5057 (1990).  

# 5.6 bond_style fene/expand command  

Accelerator Variants: fene/expand/omp  

# 5.6.1 Syntax  

# 5.6.2 Examples  

<html><body><table><tr><td>bonds style fene/expand</td></tr><tr><td>bond coeff 1 30.0 1.5 1.0 1.0 0.5</td></tr><tr><td></td></tr></table></body></html>  

# 5.6.3 Description  

The fene/expand bond style uses the potential  

$$
E=-0.5K R_{0}^{2}\ln{\left[1-\left(\frac{(r-\Delta)}{R_{0}}\right)^{2}\right]}+4\varepsilon\left[\left(\frac{\sigma}{(r-\Delta)}\right)^{12}-\left(\frac{\sigma}{(r-\Delta)}\right)^{6}\right]+\varepsilon
$$  

to define a finite extensible nonlinear elastic (FENE) potential (Kremer), used for bead-spring polymer models. The first term is attractive, the second Lennard-Jones term is repulsive.  

The fene/expand bond style is similar to fene except that an extra shift factor of $\Delta$ (positive or negative) is added to $r$ to effectively change the bead size of the bonded atoms. The first term now extends to $R_{0}+\Delta$ and the second term is cutoff at $2^{\frac{1}{6}}\dot{\sigma}+\Delta$ .  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $K$ (energy/distance^2)   
• $R_{0}$ (distance)   
• ε (energy)   
• σ (distance)   
• ∆ (distance)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.6.4 Restrictions  

This bond style can only be used if LAMMPS was built with the MOLECULE package. See the Build package page for more info.  

You typically should specify special_bonds fene or special_bonds lj/coul 0 1 1 to use this bond style. LAMMPS will issue a warning it that’s not the case.  

# 5.6.5 Related commands  

bond_coeff , delete_bonds  

# 5.6.6 Default  

none  

(Kremer) Kremer, Grest, J Chem Phys, 92, 5057 (1990).  

# 5.7 bond_style gaussian command  

# 5.7.1 Syntax  

# 5.7.2 Examples  

<html><body><table><tr><td>bond_style egaussian</td></tr><tr><td>bondcoeff 1 300.0 2 0.0128 0.375 3.37 0.0730 0.148 3.63</td></tr><tr><td></td></tr></table></body></html>  

# 5.7.3 Description  

The gaussian bond style uses the potential:  

$$
E=-k_{B}T l n\left(\sum_{i=1}^{n}\frac{A_{i}}{w_{i}\sqrt{\pi/2}}e x p\left(\frac{-2(r-r_{i})^{2}}{w_{i}^{2}}\right)\right)
$$  

This analytical form is a suitable potential for obtaining mesoscale effective force fields which can reproduce target atomistic distributions (Milano)  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $T$ temperature at which the potential was derived   
• $n$ (integer $>=1$ )   
• $A_{1}$ $>0$ , distance)   
• $w_{1}$ ( $>0$ , distance)   
• $r_{1}$ $\mathrm{\Delta}>=0$ , distance)   
• $A_{n}$ $>0$ , distance)   
• $w_{n}$ $>0$ , distance)   
• $r_{n}$ $\mathrm{\Delta}>=0$ , distance)  

# 5.7.4 Restrictions  

This bond style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 5.7.5 Related commands  

bond_coeff  

# 5.7.6 Default  

none  

(Milano) G. Milano, S. Goudeau, F. Mueller-Plathe, J. Polym. Sci. B Polym. Phys. 43, 871 (2005).  

# 5.8 bond_style gromos command  

Accelerator Variants: gromos/omp  

# 5.8.1 Syntax  

# 5.8.2 Examples  

<html><body><table><tr><td>bond style : gromos bond coeff 5 80.0 1.2</td></tr></table></body></html>  

# 5.8.3 Description  

The gromos bond style uses the potential  

$$
E=K(r^{2}-r_{0}^{2})^{2}
$$  

where $r_{0}$ is the equilibrium bond distance. Note that the usual 1/4 factor is included in $K$ .  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy/distance^4) • $r_{0}$ (distance)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.8.4 Restrictions  

This bond style can only be used if LAMMPS was built with the MOLECULE package. See the Build package page for more info.  

# 5.8.5 Related commands  

bond_coeff , delete_bonds  

# 5.8.6 Default  

none  

# 5.9 bond_style harmonic command  

Accelerator Variants: harmonic/intel, harmonic/kk, harmonic/omp  

# 5.9.1 Syntax  

# 5.9.2 Examples  

<html><body><table><tr><td>bond style harmonic</td></tr><tr><td>bond coeff f 580.01.2</td></tr></table></body></html>  

# 5.9.3 Description  

The harmonic bond style uses the potential  

$$
E=K(r-r_{0})^{2}
$$  

where $r_{0}$ is the equilibrium bond distance. Note that the usual $1/2$ factor is included in $K$ .  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy/distance^2) • $r_{0}$ (distance)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.9.4 Restrictions  

This bond style can only be used if LAMMPS was built with the MOLECULE package. See the Build package page for more info.  

# 5.9.5 Related commands  

bond_coeff , delete_bonds  

# 5.9.6 Default  

none  

# 5.10 bond_style harmonic/restrain command  

# 5.10.1 Syntax  

# 5.10.2 Examples  

<html><body><table><tr><td>bond</td><td>style harmonic</td></tr><tr><td>bond</td><td>coeff 5 80.0</td></tr></table></body></html>  

# 5.10.3 Description  

Added in version $28\mathbf{Mar}2023$ .  

The harmonic/restrain bond style uses the potential  

$$
E=K(r-r_{t=0})^{2}
$$  

where $r_{t=0}$ is the distance between the bonded atoms at the beginning of the first run or minimize command after the bond style has been defined $(t{=}0)$ . Note that the usual 1/2 factor is included in $K$ . This will effectively restrain bonds to their initial length, whatever that is. This is where this bond style differs from bond style harmonic where the bond length is set through the per bond type coefficients.  

The following coefficient must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands  

• $K$ (energy/distance^2)  

This bond style differs from other options to add harmonic restraints like fix restrain or pair style list or fix colvars in that it requires a bond topology, and thus the defined bonds will trigger exclusion of special neighbors from the neighbor list according to the special_bonds settings.  

# 5.10.4 Restart info  

This bond style supports the write_restart and read_restart commands. The state of the initial bond lengths is stored with restart files and read back.  

# 5.10.5 Restrictions  

This bond style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package page for more info.  

# 5.10. bond_style harmonic/restrain command  

This bond style maintains internal data to determine the original bond lengths $r_{t=0}$ . This information will be written to binary restart files but not to data files. Thus, continuing a simulation is only possible with read_restart. When using the read_data command, the reference bond lengths $r_{t=0}$ will be re-initialized from the current geometry.  

This bond style cannot be used with fix shake or fix rattle, with fix filter/corotate, or any tip4p pair style since there is no specific equilibrium distance for a given bond type.  

# 5.10.6 Related commands  

bond_coeff , bond_harmonic, fix restrain, pair style list  

# 5.10.7 Default  

none  

# 5.11 bond_style harmonic/shift command  

Accelerator Variants: harmonic/shift/omp  

# 5.11.1 Syntax  

# 5.11.2 Examples  

<html><body><table><tr><td>bond style harmonic/shift</td></tr></table></body></html>  

# 5.11.3 Description  

The harmonic/shift bond style is a shifted harmonic bond that uses the potential  

$$
E=\frac{U_{\mathrm{min}}}{(r_{0}-r_{c})^{2}}\left[(r-r_{0})^{2}-(r_{c}-r_{0})^{2}\right]
$$  

where $r_{0}$ is the equilibrium bond distance, and $r_{c}$ the critical distance. The potential is $-U_{\mathrm{min}}$ at $r0$ and zero at $r_{c}$ . The spring constant is $k=U_{\mathrm{min}}/[2(r_{0}-r_{c})^{2}]$ .  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $U_{\mathrm{min}}$ (energy) • $r_{0}$ (distance) • $r_{c}$ (distance)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.11.4 Restrictions  

This bond style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 5.11.5 Related commands  

bond_coeff , delete_bonds, bond_harmonic  

# 5.11.6 Default  

none  

# 5.12 bond_style harmonic/shift/cut command  

Accelerator Variants: harmonic/shift/cut/omp  

# 5.12.1 Syntax  

# 5.12.2 Examples  

bond_style harmonic/shift/cut bond_coeff 5 10.0 0.5 1.0  

# 5.12.3 Description  

The harmonic/shift/cut bond style is a shifted harmonic bond that uses the potential  

$$
E=\frac{U_{\mathrm{min}}}{(r_{0}-r_{c})^{2}}\left[(r-r_{0})^{2}-(r_{c}-r_{0})^{2}\right]
$$  

where $r_{0}$ is the equilibrium bond distance, and rc the critical distance. The bond potential is zero for distances $r>r_{c}$ .   
The potential is $-U_{\mathrm{min}}$ at $r_{0}$ and zero at $r_{c}$ . The spring constant is $k=U_{\mathrm{min}}/[2(r_{0}-r_{c})^{2}]$ .  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $U_{\mathrm{min}}$ (energy) • $r_{0}$ (distance) • $r_{c}$ (distance)  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages  

# 5.12. bond_style harmonic/shift/cut command  

page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.12.4 Restrictions  

This bond style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 5.12.5 Related commands  

bond_coeff , delete_bonds, bond_harmonic, bond_style harmonic/shift  

# 5.12.6 Default  

none  

# 5.13 bond_style hybrid command  

Accelerator Variants: hybrid/kk  

# 5.13.1 Syntax  

Bond Coeffs  

1 harmonic 80.0 1.2   
2 fene 30.0 1.5 1.0 1.0  

A bond style of none with no additional coefficients can be used in place of a bond style, either in a input script bond_coeff command or in the data file, if you desire to turn off interactions for specific bond types.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.13.4 Restrictions  

This bond style can only be used if LAMMPS was built with the MOLECULE package. See the Build package page for more info.  

Unlike other bond styles, the hybrid bond style does not store bond coefficient info for individual sub-styles in binary restart files or data files. Thus when restarting a simulation, you need to re-specify the bond_coeff commands.  

# 5.13.5 Related commands  

bond_coeff , delete_bonds  

# 5.13.6 Default  

none  

# 5.14 bond_style lepton command  

Accelerator Variants: lepton/omp  

# 5.14.1 Syntax  

# 5.14.2 Examples  

<html><body><table><tr><td>bond: style lepton bond style lepton no_offset</td></tr><tr><td></td><td></td></tr><tr><td>bond coeff bond coeff</td><td>11.5 "k*r~2; k=250.0"</td></tr><tr><td>f3 1.3 "k*r~2; k=350.0"</td><td>2 1.1 "k2*r~2 + k3*r~3 + k4*r~4; k2=300.0; k3=-100.0; k4=50.0"</td></tr><tr><td>bond coeff</td><td></td></tr></table></body></html>  

# 5.14.3 Description  

Added in version 8Feb2023.  

Bond style lepton computes bonded interactions between two atoms with a custom function. The potential function must be provided as an expression string using “r” as the distance variable relative to the reference distance $r_{0}$ which is provided as a bond coefficient. For example ${}^{\cdot\cdot}2O O.O{}^{\ast}r{}^{\wedge}2{}^{,}$ represents a harmonic potential with a force constant $K$ of 200.0 energy units:  

$$
U_{b o n d,i}=K(r_{i}-r_{0})^{2}=K r^{2}\:\:\:\:\:\:\:\:\:\:r=r_{i}-r_{0}
$$  

Changed in version 7Feb2024.  

By default the potential energy U is shifted so that he value U is 0.0 for $\$123$ . This is equivalent to using the optional keyword auto_offset. When using the keyword no_offset instead, the potential energy is not shifted.  

The Lepton library, that the lepton bond style interfaces with, evaluates this expression string at run time to compute the pairwise energy. It also creates an analytical representation of the first derivative of this expression with respect to “r” and then uses that to compute the force between the atom pairs forming bonds as defined by the topology data.  

The following coefficients must be defined for each bond type via the bond_coeff command as in the examples above or in the data file or restart files read by the read_data or read_restart commands:  

• Lepton expression (energy units) • $r_{0}$ (distance)  

The Lepton expression must be either enclosed in quotes or must not contain any whitespace so that LAMMPS recognizes it as a single keyword. More on valid Lepton expressions below. The $r_{0}$ is the “equilibrium distance”. The potential energy function in the Lepton expression is shifted in such a way, that the potential energy is 0 for a bond length $r_{i}==r_{0}$ .  

# 5.14.4 Lepton expression syntax and features  

Lepton supports the following operators in expressions:  

<html><body><table><tr><td>+ Add Subtract</td><td>* Multiply Divide</td></tr></table></body></html>  

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

# 5.14.5 Restrictions  

This bond style is part of the LEPTON package and only enabled if LAMMPS was built with this package. See the Build package page for more info.  

# 5.14.6 Related commands  

bond_coeff , bond_style table, bond_write, angle_style lepton, dihedral_style lepton  

# 5.14.7 Default  

none  

# 5.15 bond_style mesocnt command  

# 5.15.1 Syntax  

# 5.15.2 Examples  

bond_style mesocnt bond_coeff 1 C 10 10 20.0 bond_coeff 4 custom 800.0 10.0  

# 5.15.3 Description  

Added in version 15Sep2022.  

The mesocnt bond style is a wrapper for the harmonic style, and uses the potential  

$$
E=K(r-r_{0})^{2}
$$  

where $r_{0}$ is the equilibrium bond distance. Note that the usual 1/2 factor is included in $K$ . The style implements parameterization presets of $K$ for mesoscopic simulations of carbon nanotubes based on the atomistic simulations of (Srivastava).  

Other presets can be readily implemented in the future.  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

preset $=C$ or custom • additional parameters depending on preset  

Preset $C$ is for carbon nanotubes, and the additional parameters are:  

• chiral index $n$ (unitless) • chiral index m (unitless) • $r_{0}$ (distance)  

Preset custom is simply a direct wrapper for the harmonic style, and the additional parameters are:  

• K (energy/distance^2) • $r_{0}$ (distance)  

# 5.15.4 Restrictions  

This bond style can only be used if LAMMPS was built with the MOLECULE and MESONT packages. See the Build package page for more info.  

# 5.15.5 Related commands  

bond_coeff , delete_bonds  

# 5.15.6 Default  

none  

(Srivastava) Zhigilei, Wei and Srivastava, Phys. Rev. B 71, 165417 (2005).  

# 5.16 bond_style mm3 command  

# 5.16.1 Syntax  

# 5.16.2 Examples  

<html><body><table><tr><td>bond style emm3</td></tr><tr><td>bond coeff f 1 100.0 107.0</td></tr></table></body></html>  

# 5.16.3 Description  

The mm3 bond style uses the potential that is anharmonic in the bond as defined in (Allinger)  

$$
E=K(r-r_{0})^{2}\left[1-2.55(r-r_{0})+\frac{7}{12}2.55^{2}(r-r_{0})^{2}\right]
$$  

where $r_{0}$ is the equilibrium value of the bond, and $K$ is a prefactor. The anharmonic prefactors have units $\textrm{\AA}^{-n}$ : $-2.55\mathrm{\AA}^{-1}$ and $\frac{7}{12}2.55^{2}\mathrm{\AA}^{-2}$ . The code takes care of the necessary unit conversion for these factors internally. Note that the MM3 papers contain an error in Eq (1): $\textstyle{\frac{7}{12}}2.55$ should be replaced with ${\frac{7}{12}}2.55^{2}$  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above or in the data file or restart files read by the read_data or read_restart commands:  

• $K$ (energy/distance^2) • $r_{0}$ (distance)  

# 5.16.4 Restrictions  

This bond style can only be used if LAMMPS was built with the YAFF package. See the Build package doc page for more info.  

# 5.16. bond_style mm3 command  

# 5.16.5 Related commands  

bond_coeff  

# 5.16.6 Default  

none  

(Allinger) Allinger, Yuh, Lii, JACS, 111(23), 8551-8566 (1989),  

# 5.17 bond_style morse command  

Accelerator Variants: morse/omp  

# 5.17.1 Syntax  

# 5.17.2 Examples  

bond_style morse bond_coeff 5 1.0 2.0 1.2  

# 5.17.3 Description  

The morse bond style uses the potential  

$$
E=D\left[1-e^{-\alpha(r-r_{0})}\right]^{2}
$$  

where $r_{0}$ is the equilibrium bond distance, $\alpha$ is a stiffness parameter, and $D$ determines the depth of the potential well.  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• D (energy) • α (inverse distance) • $r_{0}$ (distance)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.17.4 Restrictions  

This bond style can only be used if LAMMPS was built with the MOLECULE package. See the Build package page for more info.  

# 5.17.5 Related commands  

bond_coeff , delete_bonds  

# 5.17.6 Default  

none  

# 5.18 bond_style none command  

# 5.18.1 Syntax  

# 5.18.2 Examples  

# 5.18.3 Description  

Using a bond style of none means bond forces and energies are not computed, even if pairs of bonded atoms were listed in the data file read by the read_data command.  

See the bond_style zero command for a way to calculate bond statistics, but compute no bond interactions.  

# 5.18.4 Restrictions  

none  

# 5.18.5 Related commands  

none bond_style zero  

# 5.18.6 Default  

none  

# 5.19 bond_style nonlinear command  

Accelerator Variants: nonlinear/omp  

# 5.19.1 Syntax  

# 5.19.2 Examples  

bond_style nonlinear bond_coeff 2 100.0 1.1 1.4  

# 5.19.3 Description  

The nonlinear bond style uses the potential  

$$
E=\frac{\varepsilon(r-r_{0})^{2}}{[\lambda^{2}-(r-r_{0})^{2}]}
$$  

to define an anharmonic spring (Rector) of equilibrium length $r_{0}$ and maximum extension lamda.  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• ε (energy) • $r_{0}$ (distance) • λ (distance)  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.19.4 Restrictions  

This bond style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package page for more info.  

# 5.19.5 Related commands  

bond_coeff , delete_bonds  

# 5.19.6 Default  

none  

5.20 bond_style oxdna/fene command  

5.21 bond_style oxdna2/fene command  

5.22 bond_style oxrna2/fene command  

# 5.22.1 Syntax  

bond_style oxdna/fene bond_style oxdna2/fene bond_style oxrna2/fene  

# 5.22.2 Examples  

# LJ units   
bond_style oxdna/fene   
bond_coeff \* 2.0 0.25 0.7525   
bond_style oxdna2/fene   
bond_coeff \* 2.0 0.25 0.7564   
bond_style oxrna2/fene   
bond_coeff \* 2.0 0.25 0.76107   
bond_style oxdna/fene   
bond_coeff \* oxdna_lj.cgdna   
# Real units   
bond_style oxdna/fene   
bond_coeff \* 11.92337812042065 2.1295 6.409795   
bond_style oxdna2/fene   
bond_coeff \* 11.92337812042065 2.1295 6.4430152   
bond_style oxrna2/fene _coeff \* 11.92337812042065 2.1295 6.482800913   
bond_style oxrna2/fene   
bond_coeff \* oxrna2_real.cgdna  

#  Note  

The coefficients in the above examples have to be kept fixed and cannot be changed without reparameterizing the entire model. They are provided in forms compatible with both units $l j$ and units real (see documentation of units). These can also be read from a potential file with correct unit style by specifying the name of the file. Several potential files for each unit style are included in the potentials directory of the LAMMPS distribution.  

# 5.22.3 Description  

The oxdna/fene, oxdna2/fene, and oxrna2/fene bond styles use the potential  

$$
E=-\frac{\varepsilon}{2}\ln\left[1-\left(\frac{r-r_{0}}{\Delta}\right)^{2}\right]
$$  

to define a modified finite extensible nonlinear elastic (FENE) potential (Ouldridge) to model the connectivity of the phosphate backbone in the oxDNA/oxRNA force field for coarse-grained modelling of DNA/RNA.  

The following coefficients must be defined for the bond type via the bond_coeff command as given in the above example, or in the data file or restart files read by the read_data or read_restart commands:  

• ε (energy) • ∆ (distance) • r0 (distance)  

# $\Theta$ Note  

The oxDNA bond style has to be used together with the corresponding oxDNA pair styles for excluded volume interaction oxdna/excv , stacking oxdna/stk , cross-stacking oxdna/xstk and coaxial stacking interaction oxdna/coaxstk as well as hydrogen-bonding interaction oxdna/hbond (see also documentation of pair_style oxdna/excv). For the oxDNA2 (Snodin) bond style the analogous pair styles oxdna2/excv , oxdna2/stk , oxdna2/xstk , oxdna2/coaxstk , oxdna2/hbond and an additional Debye-Hueckel pair style oxdna2/dh have to be defined. The same applies to the oxRNA2 (Sulc1) styles.  

![](images/dccf886608dea6be7300f209ac1f2aff0bff0efbc28bd7308b30ddf0099e4022.jpg)  

# Note  

This bond style has to be used with the atom_style hybrid bond ellipsoid oxdna (see documentation of atom_style). The atom_style oxdna stores the $_3\cdot$ -to- $\cdot5^{\circ}$ polarity of the nucleotide strand, which is set through the bond topology in the data file. The first (second) atom in a bond definition is understood to point towards the $_3\cdot$ -end ( $\mho$ -end) of the strand.  

![](images/4eee071f9aafdba3206c751f6442f40cfb31122766422dcab7bc6a24bcd18d64.jpg)  

# Warning  

If data files are produced with write_data, then the newton command should be set to newton on or newton off on. Otherwise the data files will not have the same $_3\cdot$ -to- $\cdot5^{\circ}$ polarity as the initial data file. This limitation does not apply to binary restart files produced with write_restart.  

Example input and data files for DNA and RNA duplexes can be found in examples/PACKAGES/cgdna/examples/ oxDNA/\`, \`.../oxDNA2/ and . $\ldots/\mathrm{oxRNA2}/$ . A simple python setup tool which creates single straight or helical DNA strands, DNA/RNA duplexes or arrays of DNA/RNA duplexes can be found in examples/PACKAGES/cgdna/util/.  

Please cite (Henrich) in any publication that uses this implementation. An updated documentation that contains general information on the model, its implementation and performance as well as the structure of the data and input file can be found here.  

Please cite also the relevant oxDNA/oxRNA publications. These are (Ouldridge) and (Ouldridge-DPhil) for oxDNA, (Snodin) for oxDNA2, (Sulc1) for oxRNA2 and for sequence-specific hydrogen-bonding and stacking interactions (Sulc2).  

# 5.22.4 Potential file reading  

For each style oxdna, oxdna2 and oxrna2, the first parameter argument can be a filename, and if it is, no further arguments should be supplied. Therefore the following command:  

<html><body><table><tr><td>bond</td><td>style oxdna/fene</td></tr><tr><td>bond</td><td>coeff oxdna_lj.cgdna</td></tr></table></body></html>  

will be interpreted as a request to read the (FENE) potential (Ouldridge) parameters from the file with the given name. The file can define multiple potential parameters for both bonded and pair interactions, but for the above bonded interactions there must exist in the file a line of the form:  

There are sample potential files for each unit style in the potentials directory of the LAMMPS distribution. The potential file unit system must align with the units defined via the units command. For conversion between different $L J$ and real unit systems for oxDNA, the python tool lj2real.py located in the examples/PACKAGES/cgdna/util/ directory can be used. This tool assumes similar file structure to the examples found in examples/PACKAGES/ cgdna/examples/.  

# 5.22.5 Restrictions  

This bond style can only be used if LAMMPS was built with the CG-DNA package and the MOLECULE and ASPHERE package. See the Build package page for more info.  

# 5.22.6 Related commands  

pair_style oxdna/excv, pair_style oxdna2/excv, pair_style oxrna2/excv, bond_coeff , atom_style oxdna, fix nve/dotc/langevin  

# 5.22.7 Default  

none  

(Henrich) O. Henrich, Y. A. Gutierrez-Fosado, T. Curk, T. E. Ouldridge, Eur. Phys. J. E 41, 57 (2018).   
(Ouldridge-DPhil) T.E. Ouldridge, Coarse-grained modelling of DNA and DNA self-assembly, DPhil. University of Oxford (2011).   
(Ouldridge) T.E. Ouldridge, A.A. Louis, J.P.K. Doye, J. Chem. Phys. 134, 085101 (2011).   
(Snodin) B.E. Snodin, F. Randisi, M. Mosayebi, et al., J. Chem. Phys. 142, 234901 (2015).   
(Sulc1) P. Sulc, F. Romano, T. E. Ouldridge, et al., J. Chem. Phys. 140, 235102 (2014).   
(Sulc2) P. Sulc, F. Romano, T.E. Ouldridge, L. Rovigatti, J.P.K. Doye, A.A. Louis, J. Chem. Phys. 137, 135101 (2012).  

# 5.23 bond_style quartic command  

Accelerator Variants: quartic/omp  

# 5.23.1 Syntax  

# 5.23.2 Examples  

<html><body><table><tr><td>bonds style quartic</td><td></td></tr><tr><td>bond</td><td>coeff 2 1200 -0.55 0.25 1.3 34.6878</td></tr></table></body></html>  

# 5.23.3 Description  

The quartic bond style uses the potential  

$$
\begin{array}{r l}&{\boldsymbol{E}=E_{q}+E_{L J}}\ &{E_{q}=K(r-R_{c})^{2}(r-R_{c}-B_{1})(r-R_{c}-B_{2})+U_{0}}\ &{E_{L J}=\left\{\begin{array}{l l}{4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12}-\left(\frac{\sigma}{r}\right)^{6}\right]+\varepsilon}&{:\quad r<2^{\frac{1}{6}},\varepsilon=1,\sigma=1}\ {0}&{:\quad r>2^{\frac{1}{6}}}\end{array}\right.}\end{array}
$$  

to define a bond that can be broken as the simulation proceeds (e.g. due to a polymer being stretched). The $\sigma$ and $\varepsilon$ used in the LJ portion of the formula are both set equal to 1.0 by LAMMPS and the LJ portion is cut off at its minimum, i.e. at $r_{c}=2^{\frac{1}{6}}$ .  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $K$ (energy/distance^4)   
• $B_{1}$ (distance)   
• $B_{2}$ (distance)   
• $R_{c}$ (distance)   
• $U_{0}$ (energy)  

This potential was constructed to mimic the FENE bond potential for coarse-grained polymer chains. When monomers with $\sigma=\varepsilon=1.0$ are used, the following choice of parameters gives a quartic potential that looks nearly like the FENE potential:  

$$
\begin{array}{l}{{K=1200}}\ {{}}\ {{B_{1}=-0.55}}\ {{}}\ {{B_{2}=0.25}}\ {{}}\ {{R_{c}=1.3}}\ {{}}\ {{U_{0}=34.6878}}\end{array}
$$  

Different parameters can be specified using the bond_coeff command, but you will need to choose them carefully so they form a suitable bond potential.  

$R_{c}$ is the cutoff length at which the bond potential goes smoothly to a local maximum. If a bond length ever becomes $>R_{c}$ , LAMMPS “breaks” the bond, which means two things. First, the bond potential is turned off by setting its type to 0, and is no longer computed. Second, a pairwise interaction between the two atoms is turned on, since they are no longer bonded. See the Howto page on broken bonds for more information.  

LAMMPS does the second task via a computational sleight-of-hand. It subtracts the pairwise interaction as part of the bond computation. When the bond breaks, the subtraction stops. For this to work, the pairwise interaction must always be computed by the pair_style command, whether the bond is broken or not. This means that special_bonds must be set to 1,1,1, as indicated as a restriction below.  

Note that when bonds are dumped to a file via the dump local command, bonds with type 0 are not included. The delete_bonds command can also be used to query the status of broken bonds or permanently delete them, e.g.:  

delete_bonds all stats delete_bonds all bond 0 remove  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.23.4 Restrictions  

This bond style can only be used if LAMMPS was built with the MOLECULE package. See the Build package page for more info.  

The quartic style requires that special_bonds parameters be set to 1,1,1. Three- and four-body interactions (angle, dihedral, etc) cannot be used with quartic bonds.  

# 5.23.5 Related commands  

bond_coeff , delete_bonds  

# 5.23.6 Default  

none  

# 5.24 bond_style rheo/shell command  

# 5.24.1 Syntax  

bond_style rheo/shell keyword value attribute1 attribute2 ...  

• required keyword $=$ t/form   
• optional keyword $=$ store/local t/form value $=$ formation time for a bond (time units) store/local values $=$ fix_ID N attributes ... \* fix_ $\mathrm{ID}=\mathrm{ID}$ of associated internal fix to store data \* $\mathrm{N}=$ prepare data for output every this many timesteps \* attributes $=$ zero or more of the below attributes may be appended id1, $\mathrm{id2=IDs}$ of two atoms in the bond time $=$ the timestep the bond broke  

# 5.24. bond_style rheo/shell command  

x, y, $\mathrm{~Z~}=$ the center of mass position of the two atoms when the bond broke (distance units) x/ref, y/ref, $\mathbf{z/ref}=$ the initial center of mass position of the two atoms (distance units)  

# 5.24.2 Examples  

<html><body><table><tr><td>bond _style rheo/shell t/form 10.0</td></tr></table></body></html>  

# 5.24.3 Description  

Added in version $29\mathrm{Aug}2024$ .  

The rheo/shell bond style is designed to work with fix rheo/oxidation which creates candidate bonds between eligible surface or near-surface particles. When a bond is first created, it computes no forces and starts a timer. Forces are not computed until the timer reaches the specified bond formation time, t/form, and the bond is enabled and applies forces. If the two particles move outside of the maximum bond distance or move into the bulk before the timer reaches t/form, the bond automatically deletes itself. This deletion is not recorded as a broken bond in the optional store/local fix.  

Before bonds are enabled, they are still treated as regular bonds by all other parts of LAMMPS. This means they are written to data files and counted in computes such as nbond/atom. To only count enabled bonds, use the nbond/shell attribute in compute rheo/property/atom.  

When enabled, the bond then computes forces based on deviations from the initial reference state of the two atoms much like a BPM style bond (as further discussed in the BPM howto page). The reference state is stored by each bond when it is first enabled. Data is then preserved across run commands and is written to binary restart files such that restarting the system will not reset the reference state of a bond or the timer.  

This bond style is based on a model described in (Clemmer). The force has a magnitude of  

$$
F=2k(r-r_{0})+\frac{2k}{r_{0}^{2}\varepsilon_{c}^{2}}(r-r_{0})^{3}
$$  

where $k$ is a stiffness, $r$ is the current distance and $r_{0}$ is the initial distance between the two particles, and $\varepsilon_{c}$ is maximum strain beyond which a bond breaks. This is done by setting the bond type to 0 such that forces are no longer computed.  

A damping force proportional to the difference in the normal velocity of particles is also applied to bonded particles:  

$$
F_{D}=-\gamma{w}(\hat{r}\bullet\vec{\nu})
$$  

where $\gamma$ is the damping strength, $\hat{r}$ is the displacement normal vector, and $\vec{\nu}$ is the velocity difference between the two particles.  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $k$ (force/distance units) • $\varepsilon_{c}$ (unit less) • γ (force/velocity units)  

Unlike other BPM-style bonds, this bond style does not update special bond settings when bonds are created or deleted. This bond style also does not enforce specific special_bonds settings. This behavior is purposeful such RHEO pair forces and heat flows are still calculated.  

If the store/local keyword is used, an internal fix will track bonds that break during the simulation. Whenever a bond breaks, data is processed and transferred to an internal fix labeled $f i x\_I D$ . This allows the local data to be accessed by other LAMMPS commands. Following this optional keyword, a list of one or more attributes is specified. These include the IDs of the two atoms in the bond. The other attributes for the two atoms include the timestep during which the bond broke and the current/initial center of mass position of the two atoms.  

Data is continuously accumulated over intervals of $N$ timesteps. At the end of each interval, all of the saved accumulated data is deleted to make room for new data. Individual datum may therefore persist anywhere between $I$ to $N$ timesteps depending on when they are saved. This data can be accessed using the $f i x\_I D$ and a dump local command. To ensure all data is output, the dump frequency should correspond to the same interval of $N$ timesteps. A dump frequency of an integer multiple of $N$ can be used to regularly output a sample of the accumulated data.  

Note that when unbroken bonds are dumped to a file via the dump local command, bonds with type 0 (broken bonds) are not included. The delete_bonds command can also be used to query the status of broken bonds or permanently delete them, e.g.:  

delete_bonds all stats delete_bonds all bond 0 remove  

# 5.24.4 Restart and other info  

This bond style writes the reference state of each bond to binary restart files. Loading a restart file will properly restore bonds. However, the reference state is NOT written to data files. Therefore reading a data file will not restore bonds and will cause their reference states to be redefined.  

If the store/local option is used, an internal fix will calculate a local vector or local array depending on the number of input values. The length of the vector or number of rows in the array is the number of recorded, broken bonds. If a single input is specified, a local vector is produced. If two or more inputs are specified, a local array is produced where the number of columns $=$ the number of inputs. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector or array will be floating point values that correspond to the specified attribute.  

The single() function of this bond style returns 0.0 for the energy of a bonded interaction, since energy is not conserved in these dissipative potentials. The single() function also calculates two extra bond quantities, the initial distance $r_{0}$ and a time. These extra quantities can be accessed by the compute bond/local command as $b I$ and $^{b2}$ .  

# 5.24.5 Restrictions  

This bond style is part of the RHEO package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 5.24.6 Related commands  

bond_coeff , fix rheo/oxidation  

# 5.24.7 Default  

NA  

(Clemmer) Clemmer, Pierce, O’Connor, Nevins, Jones, Lechman, Tencer, Appl. Math. Model., 130, 310-326 (2024).  

# 5.25 bond_style special command  

# 5.25.1 Syntax  

# 5.25.2 Examples  

<html><body><table><tr><td>bond _style special</td><td></td></tr><tr><td>bond coeff</td><td>0.5 0.5</td></tr></table></body></html>  

# 5.25.3 Description  

The special bond style can be used to create conceptual bonds which effectively impose weightings on the pairwise Lennard Jones and/or Coulombic interactions between selected pairs of particles in the system. The form of the pairwise interaction will be whatever is computed by the pair_style command defined for the system; this command defines the weightings for its two terms.  

This command can thus be useful to apply weightings that cannot be handled by the special_bonds command, such as on 1-5 or 1-6 interactions. Or it can be used to add pairwise forces between one or more pairs of atoms that otherwise would not be include in the pair_style computation.  

The potential for this bond style has the form  

$$
E=w_{L J}E_{L J}+w_{C o u l}E_{C o u l}
$$  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $w_{L J}$ weight (0.0 to 1.0) on pairwise Lennard-Jones interactions • $w_{C o u l}$ weight (0.0 to 1.0) on pairwise Coulombic interactions  

Normally this bond style should be used in conjunction with one (or more) other bond styles which compute forces between atoms directly bonded to each other in a molecule. This means the bond_style hybrid command should be used with bond_style special as one of its sub-styles.  

Note that the same as for any other bond style, pairs of bonded atoms must be enumerated in the data file read by the read_data command. Thus if this command is used to weight all 1-5 interactions in the system, all the 1-5 pairs of atoms must be listed in the “Bonds” section of the data file.  

This bond style imposes strict requirements on settings made with the special_bonds command. These requirements ensure that the new bonds created by this style do not create spurious 1-2, 1-3, or 1-4 interactions within the molecular topology.  

Specifically 1-2 interactions must have weights of zero, 1-3 interactions must either have weights of unity or special_bonds angle yes must be used, and 1-4 interactions must have weights of unity or special_bonds dihedral yes must be used.  

If this command is used to create bonded interactions between particles that are further apart than usual (e.g. 1-5 or 1-6 interactions), this style may require an increase in the communication cutoff via the comm_modify cutoff command. If LAMMPS cannot find a partner atom in a bond, an error will be issued.  

# 5.25.4 Restrictions  

This bond style can only be used if LAMMPS was built with the MISC package. See the Build package doc page for more info.  

This bond style requires the use of a pair_style which computes a pairwise additive interaction and provides the ability to compute interactions for individual pairs of atoms. Manybody potentials are not compatible in general, but also some other pair styles are missing the required functionality and thus will cause an error.  

This command is not compatible with long-range Coulombic interactions. If a kspace_style <kspace_style $>$ is declared, an error will be issued.  

# 5.25.5 Related commands  

bond_coeff , special_bonds  

# 5.25.6 Default  

none  

# 5.26 bond_style table command  

Accelerator Variants: table/omp  

# 5.26.1 Syntax  

• style $=$ linear or spline $=$ method of interpolation • $\Nu=$ use N values in table  

# 5.26.2 Examples  

bond_style table linear 1000   
bond_coeff 1 file.table ENTRY1  

# 5.26.3 Description  

Style table creates interpolation tables of length $N$ from bond potential and force values listed in a file(s) as a function of bond length. The files are read by the bond_coeff command.  

The interpolation tables are created by fitting cubic splines to the file values and interpolating energy and force values at each of $N$ distances. During a simulation, these tables are used to interpolate energy and force values as needed. The interpolation is done in one of 2 styles: linear or spline.  

For the linear style, the bond length is used to find 2 surrounding table values from which an energy or force is computed by linear interpolation.  

For the spline style, a cubic spline coefficients are computed and stored at each of the $N$ values in the table. The bond length is used to find the appropriate set of coefficients which are used to evaluate a cubic polynomial which computes the energy or force.  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above.  

• filename • keyword  

The filename specifies a file containing tabulated energy and force values. The keyword specifies a section of the file.   
The format of this file is described below.  

Suitable tables for use with this bond style can be created by LAMMPS itself from existing bond styles using the bond_write command. This can be useful to have a template file for testing the bond style settings and to build a compatible custom file. Another option to generate tables is the Python code in the tools/tabulate folder of the LAMMPS source code distribution.  

The format of a tabulated file is as follows (without the parenthesized comments):  

<html><body><table><tr><td colspan="2"># Bond potential for harmonic (one or more comment or blank lines)</td></tr><tr><td colspan="2">HAM (keyword is the first text on line)</td></tr><tr><td>N 101 FP 0 0 EQ 0.5 (N, FP, EQ</td><td></td></tr><tr><td></td><td>parameters</td></tr><tr><td>(blank line) 10.00338.00001352.0000</td><td></td></tr><tr><td>(index, bond-length, energy, force)</td><td></td></tr><tr><td>20.01324.61521324.9600</td><td></td></tr><tr><td>1011.00338.0000-1352.0000</td><td></td></tr></table></body></html>  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections. The first line begins with a keyword which identifies the section. The line can contain additional text, but the initial text must match the argument specified in the bond_coeff command. The next line lists (in any order) one or more parameters for the table. Each parameter is a keyword followed by one or more numeric values.  

The parameter “N” is required and its value is the number of table entries that follow. Note that this may be different than the $N$ specified in the bond_style table command. Let Ntable $=N$ in the bond_style command, and Nfile $=$ “N” in the tabulated file. What LAMMPS does is a preliminary interpolation by creating splines using the Nfile tabulated values as nodal points. It uses these to interpolate as needed to generate energy and force values at Ntable different points. The resulting tables of length Ntable are then used as described above, when computing energy and force for individual bond lengths. This means that if you want the interpolation tables of length Ntable to match exactly what is in the tabulated file (with effectively no preliminary interpolation), you should set Ntable $=$ Nfile.  

The “FP” parameter is optional. If used, it is followed by two values fplo and fphi, which are the derivatives of the force at the innermost and outermost bond lengths. These values are needed by the spline construction routines. If not specified by the “FP” parameter, they are estimated (less accurately) by the first two and last two force values in the table.  

The “EQ” parameter is also optional. If used, it is followed by a the equilibrium bond length, which is used, for example, by the fix shake command. If not used, the equilibrium bond length is to the distance in the table with the lowest potential energy.  

Following a blank line, the next N lines list the tabulated values. On each line, the first value is the index from 1 to N, the second value is the bond length r (in distance units), the third value is the energy (in energy units), and the fourth is the force (in force units). The bond lengths must range from a LO value to a HI value, and increase from one line to the next. If the actual bond length is ever smaller than the LO value or larger than the HI value, then the calculation is aborted with an error, so it is advisable to cover the whole range of possible bond lengths.  

Note that one file can contain many sections, each with a tabulated potential. LAMMPS reads the file section by sectio until it finds one that matches the specified keyword.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.26.4 Restart info  

This bond style writes the settings for the “bond_style table” command to binary restart files, so a bond_style command does not need to specified in an input script that reads a restart file. However, the coefficient information is not stored in the restart file, since it is tabulated in the potential files. Thus, bond_coeff commands do need to be specified in the restart input script.  

# 5.26.5 Restrictions  

This bond style can only be used if LAMMPS was built with the MOLECULE package. See the Build package page for more info.  

# 5.26.6 Related commands  

bond_coeff , delete_bonds, bond_write  

# 5.26.7 Default  

none  

# 5.27 bond_style zero command  

# 5.27.1 Syntax  

• zero or more keywords may be appended • keyword $=$ nocoeff  

# 5.27.2 Examples  

<html><body><table><tr><td>bond style zero</td><td></td></tr><tr><td>bond_ style</td><td>zeronocoeff</td></tr><tr><td>bond coeff</td><td>*</td></tr><tr><td>bond coeff f*2.14</td><td></td></tr></table></body></html>  

# 5.27.3 Description  

Using an bond style of zero means bond forces and energies are not computed, but the geometry of bond pairs is still accessible to other commands.  

As an example, the compute bond/local command can be used to compute distances for the list of pairs of bond atoms listed in the data file read by the read_data command. If no bond style is defined, this command cannot be used.  

The optional nocoeff flag allows to read data files with a BondCoeff section for any bond style. Similarly, any bond_coeff commands will only be checked for the bond type number and the rest ignored.  

Note that the bond_coeff command must be used for all bond types. If specified, there can be only one value, which is going to be used to assign an equilibrium distance, e.g. for use with fix shake.  

# LAMMPS Documentation, Release 4Feb2025  

# 5.27.4 Restrictions  

none  

# 5.27.5 Related commands  

bond_style none  

# 5.27.6 Default  

none  

# ANGLE STYLES  

# 6.1 angle_style amoeba command  

# 6.1.1 Syntax  

# 6.1.2 Examples  

angle_style amoeba   
angle_coeff \* 75.0 -25.0 1.0 0.3 0.02 0.003   
angle_coeff \* ba 3.6551 24.895 1.0119 1.5228   
angle_coeff \* ub -7.6 1.5537  

# 6.1.3 Description  

The amoeba angle style uses the potential  

$$
\begin{array}{l}{{E=E_{a}+E_{b a}+E_{u b}}}\ {{\quad E_{a}=K_{2}\left(\theta-\theta_{0}\right)^{2}+K_{3}\left(\theta-\theta_{0}\right)^{3}+K_{4}\left(\theta-\theta_{0}\right)^{4}+K_{5}\left(\theta-\theta_{0}\right)^{5}+K_{6}\left(\theta-\theta_{0}\right)^{6}}}\ {{E_{b a}=N_{1}(r_{i j}-r_{1})(\theta-\theta_{0})+N_{2}(r_{j k}-r_{2})(\theta-\theta_{0})}}\ {{E_{U B}=K_{u b}(r_{i k}-r_{u b})^{2}}}\end{array}
$$  

where $E_{a}$ is the angle term, $E_{b a}$ is a bond-angle term, $E_{U B}$ is a Urey-Bradley bond term, $\theta_{0}$ is the equilibrium angle, $r_{1}$ and $r_{2}$ are the equilibrium bond lengths, and $r_{u b}$ is the equilibrium Urey-Bradley bond length.  

These formulas match how the Tinker MD code performs its angle calculations for the AMOEBA and HIPPO force fields. See the Howto amoeba page for more information about the implementation of AMOEBA and HIPPO in LAMMPS.  

Note that the $E_{a}$ and $E_{b a}$ formulas are identical to those used for the angle_style class2/p6 command, however there is no bond-bond cross term formula for $E_{b b}$ . Additionally, there is a $E_{U B}$ term for a Urey-Bradley bond. It is effectively a harmonic bond between the I and K atoms of angle IJK, even though that bond is not enumerated in the “Bonds” section of the data file.  

There are also two ways that Tinker computes the angle $\theta$ in the $E_{a}$ formula. The first is the standard way of treating IJK as an “in-plane” angle. The second is an “out-of-plane” method which Tinker may use if the center atom J in the angle is bonded to one additional atom in addition to I and K. In this case, all 4 atoms are used to compute the $E_{a}$ formula, resulting in forces on all 4 atoms. In the Tinker PRM file, these 2 options are denoted by angle versus anglep entries in the “Angle Bending Parameters” section of the PRM force field file. The pflag coefficient described below selects between the 2 options.  

Coefficients for the $E_{a}$ , $E_{b b}$ , and $E_{u b}$ formulas must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands.  

These are the 8 coefficients for the $E_{a}$ formula:  

• ${\mathfrak{p h a g}}=0$ or 1 • ubflag $=0$ or 1 • $\theta_{0}$ (degrees) • $K_{2}$ (energy) • $K_{3}$ (energy) • $K_{4}$ (energy) • $K_{5}$ (energy) • $K_{6}$ (energy)  

A pflag value of 0 vs 1 selects between the “in-plane” and “out-of-plane” options described above. Ubflag is 1 if there is a Urey-Bradley term associated with this angle type, else it is 0. $\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence the various $K$ values are effectively energy per radian $\mathbf{\nabla}^{\wedge}2$ or radian $\wedge3$ or radian $\mathord{\left.\begin{array}{l}{\wedge4}\end{array}\right.}$ or radian $\wedge5$ or radian $\mathord{\left.\begin{array}{l}{\land6}\ {\cdot}\end{array}\right.}$ .  

For the $E_{b a}$ formula, each line in a angle_coeff command in the input script lists 5 coefficients, the first of which is “ba” to indicate they are BondAngle coefficients. In a data file, these coefficients should be listed under a “BondAngle Coeffs” heading and you must leave out the “ba”, i.e. only list 4 coefficients after the angle type.  

• ba   
• $N_{1}$ (energy/distance^2)   
• $N_{2}$ (energy/distance^2)   
• $r_{1}$ (distance)   
• $r_{2}$ (distance)  

The $\theta_{0}$ value in the $E_{b a}$ formula is not specified, since it is the same value from the $E_{a}$ formula.  

For the $E_{u b}$ formula, each line in a angle_coeff command in the input script lists 3 coefficients, the first of which is “ub” to indicate they are UreyBradley coefficients. In a data file, these coefficients should be listed under a “UreyBradley Coeffs” heading and you must leave out the “ub”, i.e. only list 2 coefficients after the angle type.  

• ub   
• $K_{u b}$ (energy/distance^2)   
• $r_{u b}$ (distance)  

# 6.1.4 Restrictions  

This angle style can only be used if LAMMPS was built with the AMOEBA package. See the Build package doc page for more info.  

# 6.1.5 Related commands  

angle_coeff  

# 6.1.6 Default  

none  

# 6.2 angle_style charmm command  

Accelerator Variants: charmm/intel, charmm/kk, charmm/omp  

# 6.2.1 Syntax  

# 6.2.2 Examples  

angle_style charmm angle_coeff 1 300.0 107.0 50.0 3.0  

# 6.2.3 Description  

The charmm angle style uses the potential  

$$
E=K(\theta-\theta_{0})^{2}+K_{u b}(r-r_{u b})^{2}
$$  

with an additional Urey_Bradley term based on the distance $r$ between the first and third atoms in the angle. $K,\theta_{0},K_{u b}$ , and $R_{u b}$ are coefficients defined for each angle type.  

See (MacKerell) for a description of the CHARMM force field.  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy)   
• $\theta_{0}$ (degrees)   
• $K_{u b}$ (energy/distance^2)   
• $r_{u b}$ (distance)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence $K$ is effectively energy per radian $\wedge_{2}$ .  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.2.4 Restrictions  

This angle style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 6.2.5 Related commands  

angle_coeff , pair_style lj/charmm variants, dihedral_style charmm, dihedral_style charmmfsw, fix cmap  

# 6.2.6 Default  

none  

(MacKerell) MacKerell, Bashford, Bellott, Dunbrack, Evanseck, Field, Fischer, Gao, Guo, Ha, et al, J Phys Chem, 102, 3586 (1998).  

# 6.3 angle_style class2 command  

Accelerator Variants: class2/kk, class2/omp  

# 6.4 angle_style class2/p6 command  

# 6.4.1 Syntax  

# 6.4.2 Examples  

angle_style class2   
angle_coeff \* 75.0 25.0 0.3 0.002   
angle_coeff 1 bb 10.5872 1.0119 1.5228   
angle_coeff \* ba 3.6551 24.895 1.0119 1.5228  

# 6.4.3 Description  

The class2 angle style uses the potential  

$$
\begin{array}{r l}&{\quad E=E_{a}+E_{b b}+E_{b a}}\ &{\quad E_{a}=K_{2}(\theta-\theta_{0})^{2}+K_{3}(\theta-\theta_{0})^{3}+K_{4}(\theta-\theta_{0})^{4}}\ &{\quad E_{b b}=M(r_{i j}-r_{1})(r_{j k}-r_{2})}\ &{\quad E_{b a}=N_{1}(r_{i j}-r_{1})(\theta-\theta_{0})+N_{2}(r_{j k}-r_{2})(\theta-\theta_{0})}\end{array}
$$  

where $E_{a}$ is the angle term, $E_{b b}$ is a bond-bond term, and $E_{b a}$ is a bond-angle term. $\theta_{0}$ is the equilibrium angle and $r_{1}$ and $r_{2}$ are the equilibrium bond lengths.  

See (Sun) for a description of the COMPASS class2 force field.  

Coefficients for the $E_{a}$ , $E_{b b}$ , and $E_{b a}$ formulas must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands.  

These are the 4 coefficients for the $E_{a}$ formula:  

• $\theta_{0}$ (degrees)  

• K2 (energy) • $K_{3}$ (energy) • $K_{4}$ (energy)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence the various $K$ are effectively energy per radian $\mathbf{\nabla}^{\wedge}2$ or radian $\wedge3$ or radian $\triangle4$ .  

For the $E_{b b}$ formula, each line in a angle_coeff command in the input script lists 4 coefficients, the first of which is “bb” to indicate they are BondBond coefficients. In a data file, these coefficients should be listed under a “BondBond Coeffs” heading and you must leave out the “bb”, i.e. only list 3 coefficients after the angle type.  

• bb   
• $M$ (energy/distance^2)   
• $r_{1}$ (distance)   
• $r_{2}$ (distance)  

For the $E_{b a}$ formula, each line in a angle_coeff command in the input script lists 5 coefficients, the first of which is “ba” to indicate they are BondAngle coefficients. In a data file, these coefficients should be listed under a “BondAngle Coeffs” heading and you must leave out the “ba”, i.e. only list 4 coefficients after the angle type.  

• ba • $N_{1}$ (energy/distance) • $N_{2}$ (energy/distance) • $r_{1}$ (distance) • $r_{2}$ (distance)  

The $\theta_{0}$ value in the $E_{b a}$ formula is not specified, since it is the same value from the $E_{a}$ formula.  

# $\Theta$ Note  

It is important that the order of the I,J,K atoms in each angle listed in the Angles section of the data file read by the read_data command be consistent with the order of the $r_{1}$ and $r_{2}$ BondBond and BondAngle coefficients. This is because the terms in the formulas for $E_{b b}$ and $E_{b a}$ will use the I,J atoms to compute $r_{i j}$ and the J,K atoms to compute $r_{j k}$ .  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

The class2/p6 angle style uses the class2 potential expanded to sixth order:  

$$
E_{a}=K_{2}\left(\theta-\theta_{0}\right)^{2}+K_{3}\left(\theta-\theta_{0}\right)^{3}+K_{4}\left(\theta-\theta_{0}\right)^{4}+K_{5}\left(\theta-\theta_{0}\right)^{5}+K_{6}\left(\theta-\theta_{0}\right)^{6}
$$  

In this expanded term 6 coefficients for the $E_{a}$ formula need to be set:  

• $\theta_{0}$ (degrees) • $K_{2}$ (energy) • $K_{3}$ (energy) • $K_{4}$ (energy) • $K_{5}$ (energy) • $K_{6}$ (energy)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence the various $K$ are effectively energy per radian $\mathbf{\nabla}^{\wedge}2$ or radian $\wedge3$ or radian $^{\wedge}4$ or radian $\mathord{\left.\begin{array}{l}{\wedge\xi}\end{array}\right.}$ or radian $\wedge_{6}$ .  

The bond-bond and bond-angle terms remain unchanged.  

# 6.4.4 Restrictions  

This angle style can only be used if LAMMPS was built with the CLASS2 package. For the class2/p6 style LAMMPS needs to be built with the MOFFF package. See the Build package doc page for more info.  

# 6.4.5 Related commands  

angle_coeff  

# 6.4.6 Default  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.5.4 Restrictions  

This angle style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 6.5.5 Related commands  

angle_coeff  

# 6.5.6 Default  

none  

# 6.6 angle_style cosine/buck6d command  

# 6.6.1 Syntax  

# LAMMPS Documentation, Release 4Feb2025  

• K (energy) • n • $\theta_{0}$ (degrees)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally.  

Additional to the cosine term the cosine/buck6d angle style computes the short range (vdW) interaction belonging to the pair_style buck6d between the end atoms of the angle. For this reason this angle style only works in combination with the pair_style buck6d styles and needs the special_bonds 1-3 interactions to be weighted 0.0 to prevent double counting.  

# 6.6.4 Restrictions  

cosine/buck6d can only be used in combination with the pair_style buck6d style and with a special_bonds 0.0 weighting of 1-3 interactions.  

This angle style can only be used if LAMMPS was built with the MOFFF package. See the Build package doc page for more info.  

# 6.6.5 Related commands  

angle_coeff  

# 6.6.6 Default  

none  

# 6.7 angle_style cosine/delta command  

Accelerator Variants: cosine/delta/omp  

# 6.7.1 Syntax  

• θ0 (degrees)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.7.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 6.7.5 Related commands  

angle_coeff , angle_style cosine/squared  

# 6.7.6 Default  

none  

# 6.8 angle_style cosine/periodic command  

Accelerator Variants: cosine/periodic/omp  

# 6.8.1 Syntax  

• C (energy)   
• $B=1$ or $^{-1}$   
• $n=1,2,3,4,5$ or 6 for periodicity  

Note that the prefactor $C$ is specified as coefficient and not the overall force constant $\begin{array}{r}{K=\frac{2C}{n^{2}}}\end{array}$ . When $B=1$ , it leads to a minimum for the linear geometry. When $B=-1$ , it leads to a maximum for the linear geometry.  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.8.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 6.8.5 Related commands  

angle_coeff  

# 6.8.6 Default  

none  

# 6.9 angle_style cosine/shift command  

Accelerator Variants: cosine/shift/omp  

# 6.9.1 Syntax  

# 6.9.3 Description  

The cosine/shift angle style uses the potential  

$$
E=-\frac{U_{\mathrm{min}}}{2}\left[1+\cos(\theta-\theta_{0})\right]
$$  

where $\theta_{0}$ is the equilibrium angle. The potential is bounded between $-U_{\mathrm{min}}$ and zero. In the neighborhood of the minimum $E=-U_{\mathrm{min}}+U_{\mathrm{min}}/4(\theta-\theta_{0})^{2}$ hence the spring constant is $\frac{U_{\operatorname*{min}}}{2}$ .  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• Umin (energy) • θ (angle)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.9.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 6.9.5 Related commands  

angle_coeff , angle_style cosine/shift/exp  

# 6.9.6 Default  

none  

# 6.10 angle_style cosine/shift/exp command  

Accelerator Variants: cosine/shift/exp/omp  

# 6.10.1 Syntax  

angle_style cosine/shift/exp angle_coeff \* 10.0 45.0 2.0  

# 6.10.3 Description  

The cosine/shift/exp angle style uses the potential  

$$
E=-U_{\mathrm{min}}\frac{e^{-a U(\theta,\theta_{0})}-1}{e^{a}-1}\quad\mathrm{with}\quad U(\theta,\theta_{0})=-0.5\left(1+\cos(\theta-\theta_{0})\right)
$$  

where $U_{\mathrm{min}}$ , $\theta$ , and $a$ are defined for each angle type.  

The potential is bounded between $[-U_{\operatorname*{min}},0]$ and the minimum is located at the angle $\theta_{0}$ . The a parameter can be both positive or negative and is used to control the spring constant at the equilibrium.  

The spring constant is given by $k=A\exp(A)U_{\mathrm{min}}/[2(\exp(a)-1)]$ . For $a>3$ , $\begin{array}{r}{\frac{k}{U_{\mathrm{min}}}=\frac{a}{2}}\end{array}$ to better than $5\%$ relative error. For negative values of the $a$ parameter, the spring constant is essentially zero, and anharmonic terms takes over. The potential is furthermore well behaved in the limit $a\to0$ , where it has been implemented to linear order in $a$ for $a<0.001$ . In this limit the potential reduces to the cosineshifted potential.  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• Umin (energy) • θ (angle) • A (real number)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.10.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 6.10.5 Related commands  

angle_coeff , angle_style cosine/shift, dihedral_style cosine/shift/exp  

# 6.10.6 Default  

none  

# 6.11 angle_style cosine/squared command  

Accelerator Variants: cosine/squared/omp  

# 6.11.1 Syntax  

# 6.11.2 Examples  

angle_style cosine/squared angle_coeff 2\*4 75.0 100.0  

# 6.11.3 Description  

The cosine/squared angle style uses the potential  

$$
E=K[\cos(\theta)-\cos(\theta_{0})]^{2}
$$  

, which is commonly used in the DREIDING force field, where $\theta_{0}$ is the equilibrium value of the angle, and $K$ is a prefactor. Note that the usual 1/2 factor is included in $K$ .  

See (Mayo) for a description of the DREIDING force field.  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • $\theta_{0}$ (degrees)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.11.4 Restrictions  

This angle style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 6.11.5 Related commands  

angle_coeff  

# 6.11.6 Default  

none  

(Mayo) Mayo, Olfason, Goddard III, J Phys Chem, 94, 8897-8909 (1990).  

# 6.12 angle_style cosine/squared/restricted command  

Accelerator Variants: cosine/squared/restricted/omp  

# 6.12.1 Syntax  

# 6.12.2 Examples  

angle_style cosine/squared/restricted angle_coeff 2\*4 75.0 100.0  

# 6.12.3 Description  

Added in version $17\mathrm{Apr}2024$ .  

The cosine/squared/restricted angle style uses the potential  

$$
E=K[\cos(\theta)-\cos(\theta_{0})]^{2}/\sin^{2}(\theta)
$$  

, which is commonly used in the MARTINI force field, where $\theta_{0}$ is the equilibrium value of the angle, and $K$ is a prefactor. Note that the usual 1/2 factor is included in $K$ .  

See (Bulacu) for a description of the restricted angle for the MARTINI force field.  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • $\theta_{0}$ (degrees)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.12.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 6.12.5 Related commands  

angle_coeff  

# 6.12.6 Default  

(Bulacu) Bulacu, Goga, Zhao, Rossi, Monticelli, Periole, Tieleman, Marrink, J Chem Theory Comput, 9, 3282-3292 (2013).  

# 6.13 angle_style cross command  

# 6.13.1 Syntax  

# 6.13.2 Examples  

<html><body><table><tr><td>angle _style cross</td></tr><tr><td>angle coeff f 1 200.0 100.0 100.0 1.25 1.25 107.0</td></tr><tr><td></td></tr></table></body></html>  

# 6.13.3 Description  

The cross angle style uses a potential that couples the bond stretches of a bend with the angle stretch of that bend:  

$$
E=K_{S S}\left(r_{12}-r_{12,0}\right)\left(r_{32}-r_{32,0}\right)+K_{B S0}\left(r_{12}-r_{12,0}\right)\left(\theta-\theta_{0}\right)+K_{B S1}\left(r_{32}-r_{32,0}\right)\left(\theta-\theta_{0}\right)
$$  

where $r_{12,0}$ is the rest value of the bond length between atom 1 and 2, $r_{32,0}$ is the rest value of the bond length between atom 3 and 2, and $\theta_{0}$ is the rest value of the angle. $K_{S S}$ is the force constant of the bond stretch-bond stretch term and $K_{B S0}$ and $K_{B S1}$ are the force constants of the bond stretch-angle stretch terms.  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $K_{S S}$ (energy/distance^2) • $K_{B S0}$ (energy/distance) • $K_{B S1}$ (energy/distance) • $r_{12,0}$ (distance) • r32,0 (distance) • $\theta_{0}$ (degrees)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence the $K_{B S0}$ and $K_{B S1}$ are effectively energy/distance per radian.  

# 6.13. angle_style cross command  

# 6.13.4 Restrictions  

This angle style can only be used if LAMMPS was built with the YAFF package. See the Build package doc page for more info.  

# 6.13.5 Related commands  

angle_coeff  

# 6.13.6 Default  

none  

# 6.14 angle_style dipole command  

Accelerator Variants: dipole/omp  

# 6.14.1 Syntax  

# 6.14.2 Examples  

angle_style dipole angle_coeff 6 2.1 180.0  

# 6.14.3 Description  

The dipole angle style is used to control the orientation of a dipolar atom within a molecule $(O r s i)$ . Specifically, the dipole angle style restrains the orientation of a point dipole $\mu_{j}$ (embedded in atom $j$ ) with respect to a reference (bond) vector $\vec{r}_{i j}=\vec{r}_{i}-\vec{r}_{j}$ , where $i$ is another atom of the same molecule (typically, $i$ and $j$ are also covalently bonded).  

It is convenient to define an angle gamma between the ‘free’ vector $\vec{\mu}_{j}$ and the reference (bond) vector $\vec{r}_{i j}$ :  

$$
\cos\gamma=\frac{\vec{\mu}_{j}\cdot\vec{r}_{i j}}{\mu_{j}r_{i j}}
$$  

The dipole angle style uses the potential:  

$$
E=K(\cos\gamma-\cos\gamma_{0})^{2}
$$  

where $K$ is a rigidity constant and gamma0 is an equilibrium (reference) angle.  

The torque on the dipole can be obtained by differentiating the potential using the ‘chain rule’ as in appendix C.3 of (AllenTildesley):  

$$
\vec{T}_{j}=\frac{2K(\cos\gamma-\cos\gamma_{0})}{\mu_{j}r_{i j}}\vec{r}_{i j}\times\vec{\mu}_{j}
$$  

Example: if $\%$ is set to 0 degrees, the torque generated by the potential will tend to align the dipole along the reference direction defined by the (bond) vector $\vec{r}_{i j}$ (in other words, $\vec{\mu}_{j}$ is restrained to point towards atom $i^{\cdot}$ ).  

The dipolar torque $\vec{T}_{j}$ must be counterbalanced in order to conserve the local angular momentum. This is achieved via an additional force couple generating a torque equivalent to the opposite of $\vec{T}_{j}$ :  

$$
\begin{array}{c}{{-\vec{T}_{j}=\vec{r}_{i j}\times\vec{F}_{i}}}\ {{\vec{F}_{j}=-\vec{F}_{i}}}\end{array}
$$  

where $\vec{F}_{i}$ and $\vec{F}_{j}$ are applied on atoms $i$ and $j$ , respectively.  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • γ0 (degrees)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffi command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.14.4 Restrictions  

This angle style can only be used if LAMMPS was built with the DIPOLE package. See the Build package doc page for more info.  

# Note  

In the “Angles” section of the data file, the atom ID $j$ defining the direction of the dipole vector to restrain must come before the atom ID of the reference atom $i,$ A third atom ID $k$ must also be provided to comply with the requirement of a valid angle definition. This atom $\mathrm{ID}k$ should be chosen to be that of an atom bonded to atom i to avoid errors with “lost angle atoms” when running in parallel. Since the LAMMPS code checks for valid angle definitions, cannot use the same atom ID of either $i$ or $j$ (this was allowed and recommended with older LAMMPS versions).  

The newton command for intramolecular interactions must be “on” (which is the default except when using some accelerator packages).  

![](images/0338780188988727e350433db088ceaa26e55edde21d86b26aad0c2e6bd7e525.jpg)  

# Note  

This angle style should NOT be used with fix shake.  

# 6.14.5 Related commands  

angle_coeff , angle_hybrid  

# 6.14.6 Default  

# 6.15 angle_style fourier command  

Accelerator Variants: fourier/omp  

# 6.15.1 Syntax  

# 6.15.2 Examples  

angle_style fourier angle_coeff 75.0 1.0 1.0 1.0  

# 6.15.3 Description  

The fourier angle style uses the potential  

$$
E=K[C_{0}+C_{1}\cos(\theta)+C_{2}\cos(2\theta)]
$$  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • $C_{0}$ (real) • C1 (real) • C2 (real)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.15.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 6.15.5 Related commands  

angle_coeff  

# 6.15.6 Default  

none  

# 6.16 angle_style fourier/simple command  

Accelerator Variants: fourier/simple/omp  

# 6.16.1 Syntax  

# 6.16.2 Examples  

<html><body><table><tr><td>angle style fourier/simple</td></tr><tr><td>angle coeff 100.0 -1.0 1.0</td></tr></table></body></html>  

# 6.16.3 Description  

The fourier/simple angle style uses the potential  

$$
E=K[1.0+c\cos(n\theta)]
$$  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • c (real) • n (real)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.16.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 6.16.5 Related commands  

angle_coeff  

# 6.16.6 Default  

none  

# 6.17 angle_style gaussian command  

# 6.17.1 Syntax  

# 6.17.2 Examples  

angle_style gaussian angle_coeff 1 300.0 2 0.0128 0.375 80.0 0.0730 0.148 123.0  

# 6.17.3 Description  

The gaussian angle style uses the potential:  

$$
E=-k_{B}T l n\left(\sum_{i=1}^{n}\frac{A_{i}}{w_{i}\sqrt{\pi/2}}e x p\left(\frac{-2(\theta-\theta_{i})^{2}}{w_{i}^{2}}\right)\right)
$$  

This analytical form is a suitable potential for obtaining mesoscale effective force fields which can reproduce target atomistic distributions (Milano).  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $T$ temperature at which the potential was derived   
• n (integer $>=1$ )   
• $A_{1}$ $>0$ , radians)   
• $w_{1}$ ( $>0$ , radians)   
• $\theta_{1}$ (degrees)   
• $A_{n}$ $>0$ , radians)   
• $w_{n}$ $>0$ , radians)   
• $\theta_{n}$ (degrees)  

# 6.17.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 6.17.5 Related commands  

angle_coeff  

# 6.17.6 Default  

none  

(Milano) G. Milano, S. Goudeau, F. Mueller-Plathe, J. Polym. Sci. B Polym. Phys. 43, 871 (2005).  

# 6.18 angle_style harmonic command  

Accelerator Variants: harmonic/intel, harmonic/kk, harmonic/omp  

# 6.18.1 Syntax  

# 6.18.2 Examples  

angle_style harmonic angle_coeff 1 300.0 107.0  

# 6.18.3 Description  

The harmonic angle style uses the potential  

$$
E=K(\theta-\theta_{0})^{2}
$$  

where $\theta_{0}$ is the equilibrium value of the angle, and $K$ is a prefactor. Note that the usual $1/2$ factor is included in $K$ .  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • $\theta_{0}$ (degrees)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence $K$ is effectively energy per radian $\mathbf{\nabla}_{\cdot}\wedge\mathbf{\nabla}_{2}$ .  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.18. angle_style harmonic command  

# 6.18.4 Restrictions  

This angle style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 6.18.5 Related commands  

angle_coeff  

# 6.18.6 Default  

none  

# 6.19 angle_style hybrid command  

Accelerator Variants: hybrid/kk  

# 6.19.1 Syntax  

style1,style2 $=$ list of one or more angle styles  

# 6.19.2 Examples  

angle_style hybrid harmonic cosine angle_coeff 1 harmonic 80.0 30.0 angle_coeff $2^{*}$ cosine 50.0  

# 6.19.3 Description  

The hybrid style enables the use of multiple angle styles in one simulation. An angle style is assigned to each angle type. For example, angles in a polymer flow (of angle type 1) could be computed with a harmonic potential and angles in the wall boundary (of angle type 2) could be computed with a cosine potential. The assignment of angle type to style is made via the angle_coeff command or in the data file.  

In the angle_coeff commands, the name of an angle style must be added after the angle type, with the remaining coefficients being those appropriate to that style. In the example above, the 2 angle_coeff commands set angles of angle type 1 to be computed with a harmonic potential with coefficients 80.0, 30.0 for $K$ , $\theta_{0}$ . All other angle types $(2-N)$ are computed with a cosine potential with coefficient 50.0 for $K$ .  

If angle coefficients are specified in the data file read via the read_data command, then the same rule applies. E.g.   
“harmonic” or “cosine”, must be added after the angle type, for each line in the “Angle Coeffs” section, e.g.  

Angle Coeffs  

1 harmonic 80.0 30.0   
2 cosine 50.0  

If class2 is one of the angle hybrid styles, the same rule holds for specifying additional BondBond (and BondAngle) coefficients either via the input script or in the data file. I.e. class2 must be added to each line after the angle type. For lines in the BondBond (or BondAngle) section of the data file for angle types that are not class2, you must use an angle style of skip as a placeholder, e.g.  

BondBond Coeffs  

1 skip   
2 class2 3.6512 1.0119 1.0119  

Note that it is not necessary to use the angle style skip in the input script, since BondBond (or BondAngle) coefficients need not be specified at all for angle types that are not class2.  

An angle style of none with no additional coefficients can be used in place of an angle style, either in a input script angle_coeff command or in the data file, if you desire to turn off interactions for specific angle types.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.19.4 Restrictions  

This angle style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

Unlike other angle styles, the hybrid angle style does not store angle coefficient info for individual sub-styles in binary restart files or data files. Thus when restarting a simulation, you need to re-specify the angle_coeff commands.  

# 6.19.5 Related commands  

angle_coeff  

# 6.19.6 Default  

none  

# 6.20 angle_style lepton command  

Accelerator Variants: lepton/omp  

# 6.20.1 Syntax  

args $=$ auto_offset or no_offset auto_offset $=$ offset the potential energy so that the value at theta0 is 0.0 (default) no_offset = do not offset the potential energy  

# 6.20.2 Examples  

<html><body><table><tr><td>angle style lepton angle e_style lepton no_( offset</td></tr><tr><td></td></tr><tr><td>angle coeff 1120.0 "k*theta~2; k=250.0"</td></tr><tr><td>angle coeff 2 90.0 "k2*theta~2 + k3*theta~3 + k4*theta~4; k2=300.0; k3=-100.0; k4=50.0" angle coeff f 3 109.47 "k*theta~2; k=350.0"</td></tr></table></body></html>  

# 6.20.3 Description  

Added in version 8Feb2023.  

Angle style lepton computes angular interactions between three atoms with a custom potential function. The potential function must be provided as an expression string using “theta” as the angle variable relative to the reference angle $\theta_{0}$ which is provided as an angle coefficient. For example “200.0\*theta^2” represents a harmonic angle potential with a force constant $K$ of 200.0 energy units:  

$$
U_{a n g l e,i}=K(\theta_{i}-\theta_{0})^{2}=K\theta^{2}\qquad\theta=\theta_{i}-\theta_{0}
$$  

Changed in version 7Feb2024.  

By default the potential energy $\mathrm{U}$ is shifted so that the value $\mathrm{U}$ is 0.0 for $\$1$ theta $=$ theta $\boldsymbol{.05}$ . This is equivalent to using the optional keyword auto_offset. When using the keyword no_offset instead, the potential energy is not shifted.  

The Lepton library, that the lepton angle style interfaces with, evaluates this expression string at run time to compute the pairwise energy. It also creates an analytical representation of the first derivative of this expression with respect to “theta” and then uses that to compute the force between the angle atoms as defined by the topology data.  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• Lepton expression (energy units) • $\theta_{0}$ (degrees)  

The Lepton expression must be either enclosed in quotes or must not contain any whitespace so that LAMMPS recognizes it as a single keyword. More on valid Lepton expressions below. The $\theta_{0}$ coefficient is the “equilibrium angle”. It is entered in degrees, but internally converted to radians. Thus the expression must assume “theta” is in radians. The potential energy function in the Lepton expression is shifted in such a way, that the potential energy is 0 for a angle $\theta_{i}==\theta_{0}$ .  

# 6.20.4 Lepton expression syntax and features  

Lepton supports the following operators in expressions:  

<html><body><table><tr><td>Add</td><td></td><td>Subtract</td><td>Multiply</td><td></td><td>Divide</td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Power</td></tr></table></body></html>  

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

# 6.20.5 Restrictions  

This angle style is part of the LEPTON package and only enabled if LAMMPS was built with this package. See the Build package page for more info.  

# 6.20.6 Related commands  

angle_coeff , angle_style table, bond_style lepton,:doc:dihedral_style lepton <dihedral_lepton>  

# 6.20.7 Default  

none  

# 6.21 angle_style mesocnt command  

# 6.21.1 Syntax  

# 6.21.2 Examples  

angle_style mesocnt   
angle_coeff 1 buckling C 10 10 20.0   
angle_coeff 4 harmonic C 8 4 10.0   
angle_coeff 2 buckling custom 400.0 50.0 5.0   
angle_coeff 1 harmonic custom 300.0  

# 6.21.3 Description  

Added in version 15Sep2022.  

The mesocnt angle style uses the potential  

$$
\begin{array}{r l}{E=K_{\mathrm{H}}\Delta\theta^{2},\quad}&{{}\left|\Delta\theta\right|<\Delta\theta_{\mathrm{B}}}\ {E=K_{\mathrm{H}}\Delta\theta_{\mathrm{B}}^{2}+K_{\mathrm{B}}(\Delta\theta-\Delta\theta_{\mathrm{B}}),\quad}&{{}\left|\Delta\theta\right|\geq\Delta\theta_{\mathrm{B}}}\end{array}
$$  

where $\Delta\theta=\theta-\pi$ is the bending angle of the nanotube, $K_{\mathrm{H}}$ and $K_{\mathrm{B}}$ are prefactors for the harmonic and linear regime respectively and $\Delta\theta_{\mathrm{B}}$ is the buckling angle. Note that the usual $1/2$ factor for the harmonic potential is included in $K_{\mathrm{H}}$ .  

The style implements parameterization presets of $K_{\mathrm{H}},K_{\mathrm{B}}$ and $\Delta\theta_{\mathrm{B}}$ for mesoscopic simulations of carbon nanotubes based on the atomistic simulations of (Srivastava) and buckling considerations of (Zhigilei).  

The following coefficients must be defined for each angle type via the angle_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• mode $=$ buckling or harmonic • preset $=C$ or custom • additional parameters depending on preset  

If mode harmonic is chosen, the potential is simply harmonic and does not switch to the linear term when the buckling angle is reached. In buckling mode, the full piecewise potential is used.  

Preset $C$ is for carbon nanotubes, and the additional parameters are:  

• chiral index $n$ (unitless) • chiral index m (unitless) • $r_{0}$ (distance)  

Here, $r_{0}$ is the equilibrium distance of the bonds included in the angle, see bond_style mesocnt.  

In harmonic mode with preset custom, the additional parameter is:  

• $K_{\mathrm{H}}$ (energy)  

Hence, this setting is simply a wrapper for bond_style harmonic with an equilibrium angle of 180 degrees.  

In harmonic mode with preset custom, the additional parameters are:  

• $K_{\mathrm{H}}$ (energy) • $K_{\mathrm{B}}$ (energy) • ∆θB (degrees)  

$\Delta\theta_{\mathrm{B}}$ is specified in degrees, but LAMMPS converts it to radians internally; hence $K_{\mathrm{H}}$ is effectively energy per radian^2 and $K_{\mathrm{B}}$ is energy per radian.  

In buckling mode, this angle style adds the buckled property to all atoms in the simulation, which is an integer flag indicating whether the bending angle at a given atom has exceeded $\Delta\theta_{\mathrm{B}}$ . It can be accessed as an atomic variable, e.g. for custom dump commands, as i_buckled.  

# Note  

If the initial state of the simulation contains buckled nanotubes and pair_style mesocnt is used, the i_buckled atomic variable needs to be initialized before the pair_style is defined by doing a run 0 command straight after the angle_style command. See below for an example.  

If CNTs are already buckled at the start of the simulation, this script will correctly initialize i_buckled:  

<html><body><table><tr><td>angle style mesocnt</td></tr><tr><td>angle coeff 1 buckling C 10 10 20.0</td></tr><tr><td></td></tr><tr><td>run</td></tr><tr><td></td></tr><tr><td>pair style mesocnt 60.0 pair coeff ** C 10 10.mesocnt 1</td></tr></table></body></html>  

# 6.21.4 Restrictions  

This angle style can only be used if LAMMPS was built with the MOLECULE and MESONT packages. See the Build package doc page for more info.  

# 6.21.5 Related commands  

angle_coeff  

# 6.21.6 Default  

none  

(Srivastava) Zhigilei, Wei, Srivastava, Phys. Rev. B 71, 165417 (2005).   
(Zhigilei) Volkov and Zhigilei, ACS Nano 4, 6187 (2010).  

# 6.22 angle_style mm3 command  

# 6.22.1 Syntax  

# 6.22.2 Examples  

<html><body><table><tr><td>angle style mm3</td></tr><tr><td>angle coeff 1 100.0 107.0</td></tr></table></body></html>  

# 6.22.3 Description  

The mm3 angle style uses the potential that is anharmonic in the angle as defined in (Allinger)  

$$
E=K(\theta-\theta_{0})^{2}\left[1-0.014(\theta-\theta_{0})+5.6(10)^{-5}(\theta-\theta_{0})^{2}-7.0(10)^{-7}(\theta-\theta_{0})^{3}+9(10)^{-10}(\theta-\theta_{0})^{2}\right]
$$  

where $\theta_{0}$ is the equilibrium value of the angle, and $K$ is a prefactor. The anharmonic prefactors have units $\mathrm{deg}^{-n}$ , for example $-0.014{\bar{\mathrm{deg}}}^{-1}$ , $5.6\cdot10^{-5}\mathrm{deg}^{-2}$ , . . .  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

$$
\begin{array}{l}{{\cdot K(\mathrm{energy})}}\ {{\cdot\theta_{0}(\mathrm{degrees})}}\end{array}
$$  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence $K$ is effectively energy per radian $\wedge_{2}$ .  

# 6.22.4 Restrictions  

This angle style can only be used if LAMMPS was built with the YAFF package. See the Build package doc page for more info.  

# 6.22.5 Related commands  

angle_coeff  

# 6.22.6 Default  

none  

# 6.23 angle_style mwlc command  

# 6.23.1 Syntax  

# 6.23.2 Examples  

angle_style mwlc angle_coeff \* 25 1 10 1  

# 6.23.3 Description  

Added in version 4Feb2025.  

The mwlc angle style models a meltable wormlike chain and can be used to model non-linear bending elasticity of polymers, e.g. DNA. mwlc uses a potential that is a canonical-ensemble superposition of a non-melted and a melted state (Farrell). The potential is  

$$
E=-k_{B}T\log[q+q^{m}]+E_{0},
$$  

where the non-melted and melted partition functions are  

$$
\begin{array}{r}{q=\exp[-k_{1}(1+\cos\theta)/k_{B}T];}\ {q^{m}=\exp[-(\mu+k_{2}(1+\cos\theta))/k_{B}T].}\end{array}
$$  

$k_{1}$ is the bending elastic constant of the non-melted state, $k_{2}$ is the bending elastic constant of the melted state, $\mu$ is the melting energy, and $T$ is the reference temperature. The reference energy,  

$$
E_{0}=-k_{B}T\log[1+\exp[-\mu/k_{B}T]],
$$  

ensures that $\mathrm{\bfE}$ is zero for a fully extended chain.  

This potential is a continuous version of the two-state potential introduced by (Yan).  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $k_{1}$ (energy) • $k_{2}$ (energy) • µ (energy) • T (temperature)  

# 6.23.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 6.23.5 Related commands  

angle_coeff  

# 6.23.6 Default  

none  

(Farrell) Farrell, Dobnikar, Podgornik, Curk, Phys Rev Lett, 133, 148101 (2024).   
(Yan) Yan, Marko, Phys Rev Lett, 93, 108108 (2004).  

# 6.24 angle_style none command  

# 6.24.1 Syntax  

# 6.24.2 Examples  

# 6.24.3 Description  

Using an angle style of none means angle forces and energies are not computed, even if triplets of angle atoms were listed in the data file read by the read_data command.  

See the angle_style zero command for a way to calculate angle statistics, but compute no angle interactions.  

# 6.24.4 Restrictions  

none  

# 6.24.5 Related commands  

angle_style zero  

# 6.24.6 Default  

none  

# 6.25 angle_style quartic command  

Accelerator Variants: quartic/omp  

# 6.25.1 Syntax  

# 6.25.3 Description  

The quartic angle style uses the potential  

$$
E=K_{2}(\theta-\theta_{0})^{2}+K_{3}(\theta-\theta_{0})^{3}+K_{4}(\theta-\theta_{0})^{4}
$$  

where $\theta_{0}$ is the equilibrium value of the angle, and $K$ is a prefactor. Note that the usual $1/2$ factor is included in $K$ .  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $\theta_{0}$ (degrees) • $K_{2}$ (energy) • $K_{3}$ (energy) • $K_{4}$ (energy)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence the various $K$ are effectively energy per radian $\mathbf{\nabla}^{\wedge}2$ or radian $\wedge3$ or radian $\triangle4$ .  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.25.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 6.25.5 Related commands  

angle_coeff  

# 6.25.6 Default  

none  

# 6.26 angle_style spica command  

Accelerator Variants: spica/omp, spica/kk  

# 6.26.1 Syntax  

<html><body><table><tr><td>angle_style spica</td></tr><tr><td>angle_style spica/omp</td></tr></table></body></html>  

# 6.26.2 Examples  

# 6.26.3 Description  

The spica angle style is a combination of the harmonic angle potential,  

$$
E=K(\theta-\theta_{0})^{2}
$$  

where $\theta_{0}$ is the equilibrium value of the angle and $K$ a prefactor, with the repulsive part of the non-bonded lj/spica pair style between the atoms 1 and 3. This angle potential is intended for coarse grained MD simulations with the SPICA (formerly called SDK) parameterization using the pair_style lj/spica. Relative to the pair_style lj/spica, however, the energy is shifted by $\varepsilon$ , to avoid sudden jumps. Note that the usual 1/2 factor is included in $K$ .  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above:  

• $K$ (energy) • $\theta_{0}$ (degrees)  

$\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence $K$ is effectively energy per radian $\wedge_{2}$ .  

The required lj/spica parameters are extracted automatically from the pair_style.  

Style sdk, the original implementation of style spica, is available for backward compatibility.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.26.4 Restrictions  

This angle style can only be used if LAMMPS was built with the CG-SPICA package. See the Build package doc page for more info.  

# 6.26.5 Related commands  

angle_coeff , angle_style harmonic, pair_style lj/spica, pair_style lj/spica/coul/long  

# 6.26.6 Default  

none  

# 6.27 angle_style table command  

Accelerator Variants: table/omp  

# 6.27.1 Syntax  

• style $=$ linear or spline $=$ method of interpolation • $\Nu=$ use N values in table  

# 6.27.2 Examples  

<html><body><table><tr><td>angle e_style table linear 1000</td></tr><tr><td>angle ecoeff f3file.tableENTRY1</td></tr><tr><td></td></tr></table></body></html>  

# 6.27.3 Description  

Style table creates interpolation tables of length $N$ from angle potential and derivative values listed in a file(s) as a function of angle The files are read by the angle_coeff command.  

The interpolation tables are created by fitting cubic splines to the file values and interpolating energy and derivative values at each of $N$ angles. During a simulation, these tables are used to interpolate energy and force values on individual atoms as needed. The interpolation is done in one of 2 styles: linear or spline.  

For the linear style, the angle is used to find 2 surrounding table values from which an energy or its derivative is computed by linear interpolation.  

For the spline style, a cubic spline coefficients are computed and stored at each of the $N$ values in the table. The angle is used to find the appropriate set of coefficients which are used to evaluate a cubic polynomial which computes the energy or derivative.  

The following coefficients must be defined for each angle type via the angle_coeff command as in the example above.  

• filename • keyword  

The filename specifies a file containing tabulated energy and derivative values. The keyword specifies a section of the file. The format of this file is described below.  

Suitable tables for use with this angle style can be created by LAMMPS itself from existing angle styles using the angle_write command. This can be useful to have a template file for testing the angle style settings and to build a compatible custom file. Another option to generate tables is the Python code in the tools/tabulate folder of the LAMMPS source code distribution.  

The format of a tabulated file is as follows (without the parenthesized comments):  

<html><body><table><tr><td colspan="2">#Angle potential for harmonic (one or more comment or blank lines)</td></tr><tr><td>HAM</td><td>(keyword is the first text on line)</td></tr><tr><td></td><td>(continuesonnextpage）</td></tr></table></body></html>  

# 6.27. angle_style table command  

(continued from previous page)  

<html><body><table><tr><td>N 181 FP 0 0 EQ 90.0</td><td>(N, FP, EQ parameters</td></tr><tr><td>(blank line)</td><td></td></tr><tr><td>1 0.0 200.5 2.5</td><td>(index, angle, energy, derivative)</td></tr><tr><td>2 1.0198.0 2.5</td><td></td></tr><tr><td></td><td></td></tr><tr><td>181180.0 0.0 0.0</td><td></td></tr></table></body></html>  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections. The first line begins with a keyword which identifies the section. The line can contain additional text, but the initial text must match the argument specified in the angle_coeff command. The next line lists (in any order) one or more parameters for the table. Each parameter is a keyword followed by one or more numeric values.  

The parameter “N” is required and its value is the number of table entries that follow. Note that this may be different than the $N$ specified in the angle_style table command. Let Ntable $=N$ in the angle_style command, and $\mathrm{{Nfile={^{\mathrm{\infty}}N^{\mathrm{,\prime}}}}}$ in the tabulated file. What LAMMPS does is a preliminary interpolation by creating splines using the Nfile tabulated values as nodal points. It uses these to interpolate as needed to generate energy and derivative values at Ntable different points. The resulting tables of length Ntable are then used as described above, when computing energy and force for individual angles and their atoms. This means that if you want the interpolation tables of length Ntable to match exactly what is in the tabulated file (with effectively no preliminary interpolation), you should set Ntable $=$ Nfile.  

The “FP” parameter is optional. If used, it is followed by two values fplo and fphi, which are the second derivatives at the innermost and outermost angle settings. These values are needed by the spline construction routines. If not specified by the “FP” parameter, they are estimated (less accurately) by the first two and last two derivative values in the table.  

The “EQ” parameter is also optional. If used, it is followed by a the equilibrium angle value, which is used, for example, by the fix shake command. If not used, the equilibrium angle is set to 180.0.  

Following a blank line, the next N lines list the tabulated values. On each line, the first value is the index from 1 to N, the second value is the angle value (in degrees), the third value is the energy (in energy units), and the fourth is -dE/d(theta) (also in energy units). The third term is the energy of the 3-atom configuration for the specified angle. The last term is the derivative of the energy with respect to the angle (in degrees, not radians). Thus the units of the last term are still energy, not force. The angle values must increase from one line to the next. The angle values must also begin with 0.0 and end with 180.0, i.e. span the full range of possible angles.  

Note that one file can contain many sections, each with a tabulated potential. LAMMPS reads the file section by section until it finds one that matches the specified keyword.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 6.27.4 Restart, fix_modify, output, run start/stop, minimize info  

This angle style writes the settings for the “angle_style table” command to binary restart files, so a angle_style command does not need to specified in an input script that reads a restart file. However, the coefficient information is not stored in the restart file, since it is tabulated in the potential files. Thus, angle_coeff commands do need to be specified in the restart input script.  

# 6.27.5 Restrictions  

This angle style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 6.27.6 Related commands  

angle_coeff , angle_write  

# 6.27.7 Default  

none  

# 6.28 angle_style zero command  

# 6.28.1 Syntax  

• zero or more keywords may be appended • keyword $=$ nocoeff  

# 6.28.2 Examples  

angle_style zero angle_style zero nocoeff angle_coeff \* angle_coeff \* 120.0  

# 6.28.3 Description  

Using an angle style of zero means angle forces and energies are not computed, but the geometry of angle triplets is still accessible to other commands.  

As an example, the compute angle/local command can be used to compute the theta values for the list of triplets of angle atoms listed in the data file read by the read_data command. If no angle style is defined, this command cannot be used.  

The optional nocoeff flag allows to read data files with AngleCoeff section for any angle style. Similarly, any angle_coeff commands will only be checked for the angle type number and the rest ignored.  

Note that the angle_coeff command must be used for all angle types. If specified, there can be only one value, which is going to be used to assign an equilibrium angle, e.g. for use with fix shake.  

# LAMMPS Documentation, Release 4Feb2025  

# 6.28.4 Restrictions  

none  

# 6.28.5 Related commands  

angle_style none  

# 6.28.6 Default  

none  

# DIHEDRAL STYLES  

# 7.1 dihedral_style charmm command  

Accelerator Variants: charmm/intel, charmm/kk, charmm/omp  

# 7.2 dihedral_style charmmfsw command  

Accelerator Variants: charmmfsw/kk  

# 7.2.1 Syntax  

• style $=$ charmm or charmmfsw  

# 7.2.2 Examples  

<html><body><table><tr><td>dihedral</td><td>style charmm</td><td></td></tr><tr><td>dihedral</td><td>style charmmfsw</td><td></td></tr><tr><td>dihedral</td><td>coeff 1 0.2 1 180 1.0</td><td></td></tr><tr><td>dihedral</td><td>coeff 21.8 1</td><td>0 1.0</td></tr><tr><td>dihedral</td><td>coeff</td><td>1 3.1 2 180 0.5</td></tr></table></body></html>  

# 7.2.3 Description  

The charmm and charmmfsw dihedral styles use the potential  

$$
E=K[1+\cos(n\phi-d)]
$$  

See (MacKerell) for a description of the CHARMM force field. This dihedral style can also be used for the AMBER force field (see comment on weighting factors below). See (Cornell) for a description of the AMBER force field.  

![](images/4b21c87401d74f5995fefc8297c995d979362945b48bdc94e5c63fe795f1158c.jpg)  

# Note  

The newer charmmfsw style was released in March 2017. We recommend it be used instead of the older charmm style when running a simulation with the CHARMM force field, either with long-range Coulombics or a Coulombic cutoff, via the pair_style lj/charmmfsw/coul/long and pair_style lj/charmmfsw/coul/charmmfsh commands respectively. Otherwise the older charmm style is fine to use. See the discussion below and more details on the pair_style charmm doc page.  

The following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy)   
• n (integer $>=0$ )   
• $d$ (integer value of degrees)   
• weighting factor (1.0, 0.5, or 0.0)  

The weighting factor is required to correct for double counting pairwise non-bonded Lennard-Jones interactions in cyclic systems or when using the CHARMM dihedral style with non-CHARMM force fields. With the CHARMM dihedral style, interactions between the first and fourth atoms in a dihedral are skipped during the normal non-bonded force computation and instead evaluated as part of the dihedral using special epsilon and sigma values specified with the pair_coeff command of pair styles that contain “lj/charmm” (e.g. pair_style lj/charmm/coul/long) In 6-membered rings, the same 1-4 interaction would be computed twice (once for the clockwise 1-4 pair in dihedral 1-2-3-4 and once in the counterclockwise dihedral 1-6-5-4) and thus the weighting factor has to be 0.5 in this case. In 4-membered or 5-membered rings, the 1-4 dihedral also is counted as a 1-2 or 1-3 interaction when going around the ring in the opposite direction and thus the weighting factor is 0.0, as the 1-2 and 1-3 exclusions take precedence.  

Note that this dihedral weighting factor is unrelated to the scaling factor specified by the special bonds command which applies to all 1-4 interactions in the system. For CHARMM force fields, the special_bonds 1-4 interaction scaling factor should be set to 0.0. Since the corresponding 1-4 non-bonded interactions are computed with the dihedral. This means that if any of the weighting factors defined as dihedral coefficients (fourth coeff above) are non-zero, then you must use a pair style with “lj/charmm” and set the special_bonds 1-4 scaling factor to 0.0 (which is the default). Otherwise 1-4 non-bonded interactions in dihedrals will be computed twice.  

For simulations using the CHARMM force field with a Coulombic cutoff, the difference between the charmm and charmmfsw styles is in the computation of the 1-4 non-bond interactions, though only if the distance between the two atoms is within the switching region of the pairwise potential defined by the corresponding CHARMM pair style, i.e. within the outer cutoff specified for the pair style. The charmmfsw style should only be used when using the corresponding pair_style lj/charmmfsw/coul/charmmfsw or pair_style lj/charmmfsw/coul/long commands. Use the charmm style with the older pair_style commands that have just “charmm” in their style name. See the discussion on the CHARMM pair_style page for details.  

Note that for AMBER force fields, which use pair styles with “lj/cut”, the special_bonds 1-4 scaling factor should be set to the AMBER defaults (1/2 and 5/6) and all the dihedral weighting factors (fourth coeff above) must be set to 0.0. In this case, you can use any pair style you wish, since the dihedral does not need any Lennard-Jones parameter information and will not compute any 1-4 non-bonded interactions. Likewise the charmm or charmmfsw styles are identical in this case since no 1-4 non-bonded interactions are computed.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.2.4 Restrictions  

When using run_style respa, these dihedral styles must be assigned to the same r-RESPA level as pair or outer.  

When used in combination with CHARMM pair styles, the 1-4 special_bonds scaling factors must be set to 0.0. Otherwise non-bonded contributions for these 1-4 pairs will be computed multiple times.  

These dihedral styles can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 7.2.5 Related commands  

dihedral_coeff , pair_style lj/charmm variants, angle_style charmm, fix cmap  

# 7.2.6 Default  

none  

(Cornell) Cornell, Cieplak, Bayly, Gould, Merz, Ferguson, Spellmeyer, Fox, Caldwell, Kollman, JACS 117, 5179-5197 (1995).  

(MacKerell) MacKerell, Bashford, Bellott, Dunbrack, Evanseck, Field, Fischer, Gao, Guo, Ha, et al, J Phys Chem B, 102, 3586 (1998).  

# 7.3 dihedral_style class2 command  

Accelerator Variants: class2/omp, class2/kk  

# 7.3.1 Syntax  

# 7.3.3 Description  

The class2 dihedral style uses the potential  

$$
\begin{array}{l}{{{\cal E}={\cal E}_{d}+E_{m H}+E_{c h t}+E_{a t}+E_{d a t}+E_{b b13}}}\ {{}}\ {{{\cal E}_{d}=\displaystyle\sum_{n=1}^{3}K_{n}[1-\cos(n\phi-\phi_{n})]}}\ {{}}\ {{{\cal E}_{m H}=(r_{j k}-r_{2})[A_{1}\cos(\phi)+A_{2}\cos(2\phi)+A_{3}\cos(3\phi)]}}\ {{{\cal E}_{c k}=(r_{j}-r_{1})[B_{1}\cos(\phi)+B_{2}\cos(2\phi)+B_{3}\cos(3\phi)]+}}\ {{(r_{k l}-r_{3})[C_{1}\cos(\phi)+C_{2}\cos(2\phi)+C_{3}\cos(3\phi)]}}\ {{}}\ {{{\cal E}_{a t}=(\theta_{i j k}-\theta_{1})[D_{1}\cos(\phi)+D_{2}\cos(2\phi)+D_{3}\cos(3\phi)]+}}\ {{(\theta_{j k l}-\theta_{2})[E_{1}\cos(\phi)+E_{2}\cos(2\phi)+E_{3}\cos(3\phi)]}}\ {{}}\ {{{\cal E}_{a t}={\cal H}(\theta_{i j k}-\theta_{1})(\theta_{j k l}-\theta_{2})\cos(\phi)}}\ {{{\cal E}_{b k13}={\cal N}(r_{i j}-r_{1})(r_{k l}-r_{3})}}\end{array}
$$  

where $E_{d}$ is the dihedral term, $E_{m b t}$ is a middle-bond-torsion term, $E_{e b t}$ is an end-bond-torsion term, $E_{a t}$ is an angletorsion term, $E_{a a t}$ is an angle-angle-torsion term, and $E_{b b13}$ is a bond-bond-13 term.  

$\theta_{1}$ and $\theta_{2}$ are equilibrium angles and $r_{1},r_{2}$ , and $r_{3}$ are equilibrium bond lengths.  

See (Sun) for a description of the COMPASS class2 force field.  

Coefficients for the $E_{d},E_{m b t},E_{e b t},E_{a t},E_{a a t}$ , and $E_{b b13}$ formulas must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands.  

These are the 6 coefficients for the $E_{d}$ formula:  

• $K_{1}$ (energy) • $\phi_{1}$ (degrees) • $K_{2}$ (energy) • $\phi_{2}$ (degrees) • $K_{3}$ (energy) • phi3 (degrees)  

For the $E_{m b t}$ formula, each line in a dihedral_coeff command in the input script lists 5 coefficients, the first of which is mbt to indicate they are MiddleBondTorsion coefficients. In a data file, these coefficients should be listed under a MiddleBondTorsion Coeffs heading and you must leave out the mbt, i.e. only list 4 coefficients after the dihedral type.  

• mbt • $A_{1}$ (energy/distance) • $A_{2}$ (energy/distance) • $A_{3}$ (energy/distance) • $r_{2}$ (distance)  

For the $E_{e b t}$ formula, each line in a dihedral_coeff command in the input script lists 9 coefficients, the first of which is ebt to indicate they are EndBondTorsion coefficients. In a data file, these coefficients should be listed under a EndBondTorsion Coeffs heading and you must leave out the ebt, i.e. only list 8 coefficients after the dihedral type.  

• ebt • $B_{1}$ (energy/distance) • $B_{2}$ (energy/distance)  

• $B_{3}$ (energy/distance) • $C_{1}$ (energy/distance) • $C_{2}$ (energy/distance) • $C_{3}$ (energy/distance) • $r_{1}$ (distance) • $r_{3}$ (distance)  

For the $E_{a t}$ formula, each line in a dihedral_coeff command in the input script lists 9 coefficients, the first of which is at to indicate they are AngleTorsion coefficients. In a data file, these coefficients should be listed under a AngleTorsion Coeffs heading and you must leave out the at, i.e. only list 8 coefficients after the dihedral type.  

• at • $D_{1}$ (energy) • $D_{2}$ (energy) • $D_{3}$ (energy) • $E_{1}$ (energy) • $E_{2}$ (energy) • $E_{3}$ (energy) • $\theta_{1}$ (degrees) • $\theta_{2}$ (degrees)  

$\theta_{1}$ and $\theta_{2}$ are specified in degrees, but LAMMPS converts them to radians internally; hence the various $D$ and $E$ are effectively energy per radian.  

For the $E_{a a t}$ formula, each line in a dihedral_coeff command in the input script lists 4 coefficients, the first of which is aat to indicate they are AngleAngleTorsion coefficients. In a data file, these coefficients should be listed under a AngleAngleTorsion Coeffs heading and you must leave out the aat, i.e. only list 3 coefficients after the dihedral type.  

• aat • M (energy) • $\theta_{1}$ (degrees) • $\theta_{2}$ (degrees)  

$\theta_{1}$ and $\theta_{2}$ are specified in degrees, but LAMMPS converts them to radians internally; hence M is effectively energy per radian $\wedge2$ .  

For the $E_{b b13}$ formula, each line in a dihedral_coeff command in the input script lists 4 coefficients, the first of which is $b b I3$ to indicate they are BondBond13 coefficients. In a data file, these coefficients should be listed under a BondBond13 Coeffs heading and you must leave out the bb13, i.e. only list 3 coefficients after the dihedral type.  

• bb13   
• N (energy/distance^2)   
• $r_{1}$ (distance)   
• $r_{3}$ (distance)  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.3.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the CLASS2 package. See the Build package doc page for more info.  

# 7.3.5 Related commands  

dihedral_coeff  

# 7.3.6 Default  

(Sun) Sun, J Phys Chem B 102, 7338-7364 (1998).  

# 7.4 dihedral_style cosine/shift/exp command  

Accelerator Variants: cosine/shift/exp/omp  

# 7.4.1 Syntax  

The following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $U_{m i n}$ (energy) • θ (angle) • a (real number)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.4.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 7.4.5 Related commands  

dihedral_coeff , angle_style cosine/shift/exp  

# 7.4.6 Default  

none  

# 7.5 dihedral_style cosine/squared/restricted command  

# 7.5.1 Syntax  

, which is commonly used in the MARTINI force field.  

See (Bulacu) for a description of the restricted dihedral for the MARTINI force field.  

The following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • $\phi_{0}$ (degrees)  

$\phi_{0}$ is specified in degrees, but LAMMPS converts it to radians internally.  

# 7.5.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 7.5.5 Related commands  

dihedral_coeff  

# 7.5.6 Default  

none  

(Bulacu) Bulacu, Goga, Zhao, Rossi, Monticelli, Periole, Tieleman, Marrink, J Chem Theory Comput, 9, 3282-3292 (2013).  

# 7.6 dihedral_style fourier command  

Accelerator Variants: fourier/intel, fourier/omp  

# 7.6.1 Syntax  

• K1 (energy) • $n_{1}$ (integer $>=0$ ) • $d_{1}$ (degrees) • [. . . ] • $K_{m}$ (energy) • $n_{m}$ (integer $>=0$ ) • dm (degrees)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.6.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 7.6.5 Related commands  

dihedral_coeff  

# 7.6.6 Default  

none  

# 7.7 dihedral_style harmonic command  

Accelerator Variants: harmonic/intel, harmonic/kk, harmonic/omp  

# 7.7.1 Syntax  

# 7.7.3 Description  

The harmonic dihedral style uses the potential  

$$
E=K[1+d\cos(n\phi)]
$$  

The following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • d $^{+1}$ or -1) • n (integer >= 0)  

![](images/664a8a5b265a452ba4c15b672d9653526fa9f100bf8c05d2d8a1e490ddfaea31.jpg)  

# Note  

Here are important points to take note of when defining LAMMPS dihedral coefficients for the harmonic style, so that they are compatible with how harmonic dihedrals are defined by other force fields:  

• The LAMMPS convention is that the trans position $=180$ degrees, while in some force fields trans $=0$ degrees.   
• Some force fields reverse the sign convention on $d$ .   
• Some force fields let $n$ be positive or negative which corresponds to $d=1$ or $d=-1$ for the harmonic style.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.7.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 7.7.5 Related commands  

dihedral_coeff  

# 7.7.6 Default  

none  

# 7.8 dihedral_style helix command  

Accelerator Variants: helix/omp  

# 7.8.1 Syntax  

# 7.8.2 Examples  

<html><body><table><tr><td>dihedral S style ehelix</td></tr><tr><td>dihedral coeff 1 80.0 100.0 40.0</td></tr></table></body></html>  

# 7.8.3 Description  

The helix dihedral style uses the potential  

$$
E=A[1-\cos(\theta)]+B[1+\cos(3\theta)]+C[1+\cos(\theta+{\frac{\pi}{4}})]
$$  

This coarse-grain dihedral potential is described in $(G u o)$ . For dihedral angles in the helical region, the energy function is represented by a standard potential consisting of three minima, one corresponding to the trans (t) state and the other to gauche states $(\mathrm{g}+\mathrm{and}\mathrm{g}-)$ . The paper describes how the $A$ , $B$ and, $C$ parameters are chosen so as to balance secondary (largely driven by local interactions) and tertiary structure (driven by long-range interactions).  

The following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• A (energy) • B (energy) • C (energy)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.8.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 7.8.5 Related commands  

dihedral_coeff  

# 7.8.6 Default  

none  

(Guo) Guo and Thirumalai, Journal of Molecular Biology, 263, 323-43 (1996).  

# 7.9 dihedral_style hybrid command  

Accelerator Variants: hybrid/kk  

# 7.9.1 Syntax  

• style1,style2 $=$ list of one or more dihedral styles  

# 7.9.2 Examples  

dihedral_style hybrid harmonic helix dihedral_coeff 1 harmonic 6.0 1 3 dihedral_coeff $2^{*}$ helix 10 10 10  

# 7.9.3 Description  

The hybrid style enables the use of multiple dihedral styles in one simulation. An dihedral style is assigned to each dihedral type. For example, dihedrals in a polymer flow (of dihedral type 1) could be computed with a harmonic potential and dihedrals in the wall boundary (of dihedral type 2) could be computed with a helix potential. The assignment of dihedral type to style is made via the dihedral_coeff command or in the data file.  

In the dihedral_coeff commands, the name of a dihedral style must be added after the dihedral type, with the remaining coefficients being those appropriate to that style. In the example above, the 2 dihedral_coeff commands set dihedrals of dihedral type 1 to be computed with a harmonic potential with coefficients 6.0, 1, 3 for K, d, n. All other dihedral types (2-N) are computed with a helix potential with coefficients 10, 10, 10 for A, B, C.  

If dihedral coefficients are specified in the data file read via the read_data command, then the same rule applies. E.g.   
“harmonic” or “helix”, must be added after the dihedral type, for each line in the “Dihedral Coeffs” section, e.g.  

Dihedral Coeffs  

1 harmonic 6.0 1 3   
2 helix 10 10 10  

If class2 is one of the dihedral hybrid styles, the same rule holds for specifying additional AngleTorsion (and EndBondTorsion, etc) coefficients either via the input script or in the data file. I.e. class2 must be added to each line after the dihedral type. For lines in the AngleTorsion (or EndBondTorsion, etc) Coeffs section of the data file for dihedral types that are not class2, you must use an dihedral style of skip as a placeholder, e.g.  

AngleTorsion Coeffs  

1 skip   
2 class2 1.0 1.0 1.0 3.0 3.0 3.0 30.0 50.0  

Note that it is not necessary to use the dihedral style skip in the input script, since AngleTorsion (or EndBondTorsion, etc) coefficients need not be specified at all for dihedral types that are not class2.  

A dihedral style of none with no additional coefficients can be used in place of a dihedral style, either in a input script dihedral_coeff command or in the data file, if you desire to turn off interactions for specific dihedral types.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.9.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

Unlike other dihedral styles, the hybrid dihedral style does not store dihedral coefficient info for individual sub-styles in binary restart files or data files. Thus when restarting a simulation, you need to re-specify the dihedral_coeff commands.  

# 7.9.5 Related commands  

dihedral_coeff  

# 7.9.6 Default  

none  

# 7.10 dihedral_style lepton command  

Accelerator Variants: lepton/omp  

# 7.10.1 Syntax  

# 7.10.3 Description  

Added in version 8Feb2023.  

Dihedral style lepton computes dihedral interactions between four atoms forming a dihedral angle with a custom potential function. The potential function must be provided as an expression string using “phi” as the dihedral angle variable. For example ${}^{\leftrightarrow}200.0{}^{\ast}(p h i-I20.0){}^{\wedge}2{}^{\prime\prime}$ represents a quadratic dihedral potential around a 120 degree dihedral angle with a force constant $K$ of 200.0 energy units:  

$$
U_{d i h e d r a l,i}=K(\phi_{i}-\phi_{0})^{2}
$$  

The Lepton library, that the lepton dihedral style interfaces with, evaluates this expression string at run time to compute the pairwise energy. It also creates an analytical representation of the first derivative of this expression with respect to “phi” and then uses that to compute the force between the dihedral atoms as defined by the topology data.  

The potential function expression for each dihedral type is provided via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands. The expression is in energy units.  

The Lepton expression must be either enclosed in quotes or must not contain any whitespace so that LAMMPS recognizes it as a single keyword. More on valid Lepton expressions below. Dihedral angles are internally computed in radians and thus the expression must assume “phi” is in radians.  

# 7.10.4 Lepton expression syntax and features  

Lepton supports the following operators in expressions:  

<html><body><table><tr><td>+ Add</td><td></td><td>Subtract</td><td>Multiply</td><td>Divide</td><td></td><td>Power</td></tr><tr><td></td><td></td><td></td><td></td><td>/</td><td></td><td>V</td></tr></table></body></html>  

The following mathematical functions are available:  

<html><body><table><tr><td>sqrt(x)</td><td>Square root</td><td>exp(x)</td><td>Exponential</td></tr><tr><td>log(x)</td><td>Natural logarithm</td><td>sin(x)</td><td>Sine (angle in radians)</td></tr><tr><td>cos(x)</td><td>Cosine (angle in radians)</td><td>sec(x)</td><td>Secant (angle in radians)</td></tr><tr><td>csc(x)</td><td>Cosecant (angle in radians)</td><td>tan(x)</td><td>Tangent (angle in radians)</td></tr><tr><td>cot(x)</td><td>Cotangent (angle in radians)</td><td>asin(x)</td><td>Inverse sine (in radians)</td></tr><tr><td>acos(x)</td><td>Inverse cosine (in radians)</td><td>atan(x)</td><td>Inverse tangent (in radians)</td></tr><tr><td>sinh(x)</td><td>Hyperbolic sine</td><td>cosh(x)</td><td>Hyperbolic cosine</td></tr><tr><td>tanh(x)</td><td>Hyperbolic tangent</td><td>erf(x)</td><td>Errorfunction</td></tr><tr><td>erfc(x)</td><td>Complementary Error function</td><td>abs(x)</td><td>Absolutevalue</td></tr><tr><td>min(x,y)</td><td>Minimumoftwovalues</td><td>max(x,y)</td><td>Maximumoftwovalues</td></tr><tr><td>delta(x)</td><td>delta(x) is 1 for x = 0, otherwise 0</td><td>step(x)</td><td>step(x) is 0 for x < 0, otherwise 1</td></tr></table></body></html>  

Numbers may be given in either decimal or exponential form. All of the following are valid numbers: 5, -3.1, 1e6, and $3.l2e{-}2$ .  

As an extension to the standard Lepton syntax, it is also possible to use LAMMPS variables in the format “v_name”. Before evaluating the expression, “v_name” will be replaced with the value of the variable “name”. This is compatible with all kinds of scalar variables, but not with vectors, arrays, local, or per-atom variables. If necessary, a custom scalar variable needs to be defined that can access the desired (single) item from a non-scalar variable. As an example, the following lines will instruct LAMMPS to ramp the force constant for a harmonic bond from 100.0 to 200.0 during the next run:  

variable fconst equal ramp(100.0, 200) bond_style lepton bond_coeff 1 1.5 "v_fconst \* (r^2)"  

An expression may be followed by definitions for intermediate values that appear in the expression. A semicolon “;” is used as a delimiter between value definitions. For example, the expression:  

<html><body><table><tr><td>a~2+a*b+b~2; a=a1+a2; b=b1+b2</td></tr></table></body></html>  

is exactly equivalent to  

The definition of an intermediate value may itself involve other intermediate values. Whitespace and quotation characters (’'’ and ‘”’) are ignored. All uses of a value must appear before that value’s definition. For efficiency reasons, the expression string is parsed, optimized, and then stored in an internal, pre-parsed representation for evaluation.  

Evaluating a Lepton expression is typically between 2.5 and 5 times slower than the corresponding compiled and optimized $\mathrm{C}{+}{+}$ code. If additional speed or GPU acceleration (via GPU or KOKKOS) is required, the interaction can be represented as a table. Suitable table files can be created either internally using the pair_write or bond_write command or through the Python scripts in the tools/tabulate folder.  

Styles with a gpu, intel, $k k.$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.10.5 Restrictions  

This dihedral style is part of the LEPTON package and only enabled if LAMMPS was built with this package. See the Build package page for more info.  

# 7.10.6 Related commands  

dihedral_coeff , dihedral_style table, bond_style lepton, angle_style lepton  

# 7.10.7 Default  

none  

# 7.11 dihedral_style multi/harmonic command  

Accelerator Variants: multi/harmonic/omp  

# 7.11. dihedral_style multi/harmonic command  

# 7.11.1 Syntax  

# 7.11.2 Examples  

<html><body><table><tr><td>dihedral_style multi/harmonic</td></tr><tr><td>dihedral coeff 12020202020</td></tr></table></body></html>  

# 7.11.3 Description  

The multi/harmonic dihedral style uses the potential  

$$
E=\sum_{n=1,5}A_{n}\cos^{n-1}(\phi)
$$  

The following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $A_{1}$ (energy) • $A_{2}$ (energy) • A3 (energy) • A4 (energy) • A5 (energy)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.11.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 7.11.5 Related commands  

dihedral_coeff  

# 7.11.6 Default  

none  

# 7.12 dihedral_style nharmonic command  

Accelerator Variants: nharmonic/omp  

# 7.12.1 Syntax  

# 7.12.2 Examples  

dihedral_style nharmonic dihedral_coeff \* 3 10.0 20.0 30.0  

# 7.12.3 Description  

The nharmonic dihedral style uses the potential:  

$$
E=\sum_{i=1,n}A_{i}\cos^{i-1}(\phi)
$$  

The following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $n$ (integer $>=1$ ) • $A_{1}$ (energy) • $A_{2}$ (energy) • An (energy)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.12.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 7.12.5 Related commands  

dihedral_coeff  

# 7.12.6 Default  

none  

# 7.13 dihedral_style none command  

# 7.13.1 Syntax  

# 7.13.2 Examples  

# 7.13.3 Description  

Using a dihedral style of none means dihedral forces and energies are not computed, even if quadruplets of dihedral atoms were listed in the data file read by the read_data command.  

See the dihedral_style zero command for a way to calculate dihedral statistics, but compute no dihedral interactions.  

# 7.13.4 Restrictions  

none  

# 7.13.5 Related commands  

dihedral_style zero  

# 7.13.6 Default  

none  

# 7.14 dihedral_style opls command  

Accelerator Variants: opls/intel, opls/kk, opls/omp  

# 7.14.1 Syntax  

# 7.14.3 Description  

The opls dihedral style uses the potential  

$$
\begin{array}{c}{{E=\displaystyle\frac12K_{1}[1+\cos(\phi)]+\frac12K_{2}[1-\cos(2\phi)]+}}\ {{\mathrm{~}\displaystyle\frac12K_{3}[1+\cos(3\phi)]+\frac12K_{4}[1-\cos(4\phi)]}}\end{array}
$$  

Note that the usual $1/2$ factor is not included in the $\mathrm{K}$ values.  

This dihedral potential is used in the OPLS force field and is described in (Watkins).  

The following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $K_{1}$ (energy) • $K_{2}$ (energy) • K3 (energy) • K4 (energy)  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.14.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 7.14.5 Related commands  

dihedral_coeff  

# 7.14.6 Default  

# 7.15.1 Syntax  

# 7.15.2 Examples  

<html><body><table><tr><td>dihedral S style quadratic</td></tr><tr><td>dihedral coeff 100.0 80.0</td></tr><tr><td></td></tr></table></body></html>  

# 7.15.3 Description  

The quadratic dihedral style uses the potential:  

$$
E=K(\phi-\phi_{0})^{2}
$$  

This dihedral potential can be used to keep a dihedral in a predefined value (ci $\cdot=.$ zero, right-hand convention is used).  

The following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • $\phi_{0}$ (degrees)  

$\phi_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence $K$ is effectively energy per radian $\wedge_{2}$ .  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.15.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 7.15.5 Related commands  

dihedral_coeff  

# 7.15.6 Default  

none  

# 7.16 dihedral_style spherical command  

# 7.16.1 Syntax  

<html><body><table><tr><td>dihedral_style spherical</td></tr></table></body></html>  

# 7.16.2 Examples  

<html><body><table><tr><td>dihedral</td><td></td><td></td><td>coeff 1 1 286.1 1 124 1 1 90.0 0</td><td></td><td></td><td></td><td></td><td>190.00</td></tr><tr><td>dihedral</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>coeff1369.3193.9119001900&</td></tr><tr><td></td><td></td><td>49.1</td><td>00.000</td><td></td><td>174.4 1</td><td></td><td>00.000&</td><td></td></tr><tr><td></td><td></td><td>25.2</td><td>00.000</td><td></td><td>00.000</td><td></td><td>1 48.1 1</td><td></td></tr></table></body></html>  

# 7.16.3 Description  

The spherical dihedral style uses the potential:  

![](images/3366cef3780d52fc38b4f7c9966cd9d97ba899e1efaf6917789ef1804643dac2.jpg)  

(positive $\varphi$ points out of page)  

$$
\begin{array}{c}{{E(\phi,\theta_{1},\theta_{2})=\sum_{i=1}^{N}C_{i}\Phi_{i}(\phi)\Theta_{1i}(\theta_{1})\Theta_{2i}(\theta_{2})}}\ {{\Phi_{i}(\phi)=u_{i}-\cos((\phi-a_{i})K_{i})}}\ {{\Theta_{1i}(\theta_{1})=\nu_{i}-\cos((\theta_{1}-b_{i})L_{i})}}\ {{\Theta_{2i}(\theta_{2})=w_{i}-\cos((\theta_{2}-c_{i})M_{i})}}\end{array}
$$  

For this dihedral style, the energy can be any function that combines the 4-body dihedral-angle $(\phi)$ and the two 3- body bond-angles $(\theta_{1},\theta_{2})$ . For this reason, there is usually no need to define 3-body “angle” forces separately for the atoms participating in these interactions. It is probably more efficient to incorporate 3-body angle forces into the dihedral interaction even if it requires adding additional terms to the expansion (as was done in the second example). A careful choice of parameters can prevent singularities that occur with traditional force-fields whenever theta1 or theta2 approach 0 or 180 degrees.  

The last example above corresponds to an interaction with a single energy minima located near $\phi=93.9\$ , $\theta_{1}=74.4$ , $\theta_{2}=48.1$ degrees, and it remains numerically stable at all angles $(\phi,\theta_{1},\theta_{2})$ . In this example, the coefficients 49.1, and 25.2 can be physically interpreted as the harmonic spring constants for theta1 and theta2 around their minima. The coefficient 69.3 is the harmonic spring constant for phi after division by $\sin(74.4)^{*}\sin(48.1)$ (the minima positions for theta1 and theta2).  

The following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above, or in the Dihedral Coeffs section of a data file read by the read_data command:  

• $n$ (integer $>=1$ )   
• $C_{1}$ (energy)   
• $K_{1}$ (typically an integer) • $a_{1}$ (degrees)   
• $u_{1}$ (typically 0.0 or 1.0) • $L_{1}$ (typically an integer)   
• $b_{1}$ (degrees, typically 0.0 or 90.0)   
• $\nu_{1}$ (typically 0.0 or 1.0)   
• $M_{1}$ (typically an integer)   
• $c_{1}$ (degrees, typically 0.0 or 90.0)   
• $w_{1}$ (typically 0.0 or 1.0)   
• [. . . ]   
• $C_{n}$ (energy)   
• $K_{n}$ (typically an integer)   
• $a_{n}$ (degrees)   
• $u_{n}$ (typically 0.0 or 1.0)   
• $L_{n}$ (typically an integer)   
• $b_{n}$ (degrees, typically 0.0 or 90.0)   
• $\nu_{n}$ (typically 0.0 or 1.0)   
• $M_{n}$ (typically an integer)   
• $c_{n}$ (degrees, typically 0.0 or 90.0)   
• $w_{n}$ (typically 0.0 or 1.0)  

# 7.16.4 Restrictions  

This dihedral style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 7.16.5 Related commands  

dihedral_coeff  

# 7.16.6 Default  

none  

# 7.17 dihedral_style table command  

Accelerator Variants: table/omp  

# 7.18 dihedral_style table/cut command  

# 7.18.1 Syntax  

dihedral_style style interpolation Ntable  

• style $=$ table or table/cut • interpolation $=$ linear or spline $=$ method of interpolation • Ntable $=$ size of the internal lookup table  

# 7.18.2 Examples  

<html><body><table><tr><td>dihedral style table spline 400</td><td></td></tr><tr><td>dihedrals</td><td>e tablelinear 1000</td></tr><tr><td>style dihedral 1coeff</td><td>1 file.table DIH TABLE1</td></tr><tr><td>dihedralcoeff 2 file.table DIHTABLE2</td><td></td></tr><tr><td>dihedral</td><td></td></tr><tr><td>dihedralS style</td><td>style table/cut spline 400 table/cut linear 1000</td></tr><tr><td>dihedral 1coeff</td><td>1 aat 1.0 177 180file.table DIHTABLE1</td></tr><tr><td>dihedral coeff</td><td>f2aat0.5170180file.tableDIHTABLE2</td></tr></table></body></html>  

# 7.18.3 Description  

The table and table/cut dihedral styles create interpolation tables of length Ntable from dihedral potential and derivative values listed in a file(s) as a function of the dihedral angle “phi”. The files are read by the dihedral_coeff command. For dihedral style table/cut additionally an analytic cutoff that is quadratic in the bond-angle (theta) is applied in order to regularize the dihedral interaction.  

The interpolation tables are created by fitting cubic splines to the file values and interpolating energy and derivative values at each of Ntable dihedral angles. During a simulation, these tables are used to interpolate energy and force values on individual atoms as needed. The interpolation is done in one of 2 styles: linear or spline.  

For the linear style, the dihedral angle (phi) is used to find 2 surrounding table values from which an energy or its derivative is computed by linear interpolation.  

For the spline style, cubic spline coefficients are computed and stored at each of the Ntable evenly-spaced values in the interpolated table. For a given dihedral angle (phi), the appropriate coefficients are chosen from this list, and a cubic polynomial is used to compute the energy and the derivative at this angle.  

For dihedral style table the following coefficients must be defined for each dihedral type via the dihedral_coeff command as in the example above.  

• filename • keyword  

The filename specifies a file containing tabulated energy and derivative values. The keyword specifies which section of the file to read. The format of this file is the same for both dihedral styles and described below.  

For dihedral style table/cut the following coefficients must be defined for each dihedral type via the dihedral_coef command as in the example above.  

• style $\cong$ aat)   
cutoff prefactor (unitless) cutoff angle1 (degrees) cutoff angle2 (degrees) • filename   
• keyword  

The cutoff dihedral style uses a tabulated dihedral interaction with a cutoff function:  

$$
\begin{array}{l r}{{f(\theta)=K\qquad}}&{{\theta<\theta_{1}}}\ {{f(\theta)=K\left(1-\displaystyle\frac{(\theta-\theta_{1})^{2}}{(\theta_{2}-\theta_{1})^{2}}\right)\qquad}}&{{\theta_{1}<\theta<\theta_{2}}}\end{array}
$$  

The cutoff includes a prefactor $K$ to the cutoff function $f(\theta)$ . While this value would ordinarily be 1, there may be situations where the value could be different.  

The cutoff $\theta_{1}$ specifies the angle (in degrees) below which the dihedral interaction is unmodified, i.e. the cutoff function is 1.  

The cutoff function is applied between $\theta_{1}$ and $\theta_{2}$ , which is the angle at which the cutoff function drops to zero. The value of zero effectively “turns off” the dihedral interaction.  

The filename specifies a file containing tabulated energy and derivative values. The keyword specifies which section of the file to read. The format of this file is the same for both dihedral styles and described below.  

Suitable tables for use with this dihedral style can be created using the Python code in the tools/tabulate folder of the LAMMPS source code distribution.  

The format of a tabulated file is as follows (without the parenthesized comments). It can begin with one or more comment or blank lines.  

<html><body><table><tr><td colspan="2"># Table of the potential and its negative derivative</td></tr><tr><td colspan="2">DIH TABLE1 (keyword is the first text on line)</td></tr><tr><td colspan="2">N 30 DEGREES (N, NOF, DEGREES, RADIANS, CHECKU/F)</td></tr><tr><td colspan="2">(blank line)</td></tr><tr><td colspan="2">1 -168.0 -1.40351172223 0.0423346818422</td></tr><tr><td colspan="2">2 -156.0 -1.70447981034 0.00811786522531</td></tr><tr><td colspan="2">3 -144.0 -1.62956100432 -0.0184129719987</td></tr><tr><td colspan="2">30 180.0 -0.707106781187 0.0719306095245</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2"># Example 2: table of the potential. Forces omitted</td></tr><tr><td colspan="2">DIH TABLE2 N 30 NOF CHECKU testU.dat CHECKF testF.dat</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2">1 -168.0 -1.40351172223</td></tr><tr><td colspan="2">2 -156.0 -1.70447981034</td></tr><tr><td colspan="2">3 -144.0 -1.62956100432</td></tr></table></body></html>  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections. The first line begins with a keyword which identifies the section. The line can contain additional text, but the initial text must match the argument specified in the dihedral_coeff command. The next line lists (in any order) one or more parameters for the table. Each parameter is a keyword followed by one or more numeric values.  

Following a blank line, the next N lines list the tabulated values. On each line, the first value is the index from 1 to N, the second value is the angle value, the third value is the energy (in energy units), and the fourth is -dE/d(phi) also in energy units). The third term is the energy of the 4-atom configuration for the specified angle. The fourth term (when present) is the negative derivative of the energy with respect to the angle (in degrees, or radians depending on whether the user selected DEGREES or RADIANS). Thus the units of the last term are still energy, not force. The dihedral angle values must increase from one line to the next.  

Dihedral table splines are cyclic. There is no discontinuity at 180 degrees (or at any other angle). Although in the examples above, the angles range from -180 to 180 degrees, in general, the first angle in the list can have any value (positive, zero, or negative). However the range of angles represented in the table must be strictly less than 360 degrees (2pi radians) to avoid angle overlap. (You may not supply entries in the table for both 180 and -180, for example.) If the user’s table covers only a narrow range of dihedral angles, strange numerical behavior can occur in the large remaining gap.  

# Parameters:  

The parameter “N” is required and its value is the number of table entries that follow. Note that this may be different than the N specified in the dihedral_style table command. Let Ntable is the number of table entries requested dihedral_style command, and let Nfile be the parameter following “N” in the tabulated file $\because30^{\cdot\cdot}$ in the sparse example above). What LAMMPS does is a preliminary interpolation by creating splines using the Nfile tabulated values as nodal points. It uses these to interpolate as needed to generate energy and derivative values at Ntable different points (which are evenly spaced over a 360 degree range, even if the angles in the file are not). The resulting tables of length Ntable are then used as described above, when computing energy and force for individual dihedral angles and their atoms. This means that if you want the interpolation tables of length Ntable to match exactly what is in the tabulated file (with effectively nopreliminary interpolation), you should set Ntable $=$ Nfile. To ensure the nodal points in the user’s file are aligned with the interpolated table entries, the angles in the table should be integer multiples of 360/Ntable degrees, or $2^{*}$ PI/Ntable radians (depending on your choice of angle units).  

The optional “NOF” keyword allows the user to omit the forces (negative energy derivatives) from the table file (normally located in the fourth column). In their place, forces will be calculated automatically by differentiating the potential energy function indicated by the third column of the table (using either linear or spline interpolation).  

The optional “DEGREES” keyword allows the user to specify angles in degrees instead of radians (default).  

The optional “RADIANS” keyword allows the user to specify angles in radians instead of degrees. (Note: This changes the way the forces are scaled in the fourth column of the data file.)  

The optional “CHECKU” keyword is followed by a filename. This allows the user to save all of the Ntable different entries in the interpolated energy table to a file to make sure that the interpolated function agrees with the user’s expectations. (Note: You can temporarily increase the Ntable parameter to a high value for this purpose. “Ntable“ is explained above.)  

The optional “CHECKF” keyword is analogous to the “CHECKU” keyword. It is followed by a filename, and it allows the user to check the interpolated force table. This option is available even if the user selected the “NOF” option.  

Note that one file can contain many sections, each with a tabulated potential. LAMMPS reads the file section by section until it finds one that matches the specified keyword.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 7.18.4 Restart, fix_modify, output, run start/stop, minimize info  

These dihedral styles write the settings for the “dihedral_style table” or “dihedral_style table/cut” command to binary restart files, so a dihedral_style command does not need to specified in an input script that reads a restart file. However, the coefficient information loaded from the table file(s) is not stored in the restart file, since it is tabulated in the potential files. Thus, suitable dihedral_coeff commands do need to be specified in the restart input script after reading the restart file.  

# 7.18.5 Restrictions  

The table dihedral style can only be used if LAMMPS was built with the MOLECULE package. The table/cut dihedral style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 7.18.6 Related commands  

dihedral_coeff  

# 7.18.7 Default  

none  

# 7.19 dihedral_style zero command  

# 7.19.1 Syntax  

• zero or more keywords may be appended • keyword $=$ nocoeff  

# 7.19.2 Examples  

<html><body><table><tr><td>dihedral style zero</td></tr><tr><td>dihedral_style zeronocoeff</td></tr><tr><td>*</td></tr><tr><td>dihedral coeff</td></tr></table></body></html>  

# 7.19.3 Description  

Using a dihedral style of zero means dihedral forces and energies are not computed, but the geometry of dihedral quadruplets is still accessible to other commands.  

As an example, the compute dihedral/local command can be used to compute the theta values for the list of quadruplets of dihedral atoms listed in the data file read by the read_data command. If no dihedral style is defined, this command cannot be used.  

The optional nocoeff flag allows to read data files with a DihedralCoeff section for any dihedral style. Similarly, any dihedral_coeff commands will only be checked for the dihedral type number and the rest ignored.  

Note that the dihedral_coeff command must be used for all dihedral types, though no additional values are specified.  

# 7.19.4 Restrictions  

none  

# 7.19.5 Related commands  

none dihedral_style none  

# 7.19.6 Default  

none  

# IMPROPER STYLES  

# 8.1 improper_style amoeba command  

# 8.1.1 Syntax  

# 8.1.2 Examples  

<html><body><table><tr><td>improper style amoeba</td></tr><tr><td></td></tr><tr><td>improper coeff 149.6</td></tr></table></body></html>  

# 8.1.3 Description  

The amoeba improper style uses the potential  

$$
E=K(\chi)^{2}
$$  

where $\chi$ is the improper angle and $K$ is a prefactor. Note that the usual 1/2 factor is included in $K$ .  

This formula seems like a simplified version of the formula for the improper_style harmonic command with $\chi_{0}=0.0$ . However the computation of the angle $\chi$ is done differently to match how the Tinker MD code computes its out-of-plane improper for the AMOEBA and HIPPO force fields. See the Howto amoeba doc page for more information about the implementation of AMOEBA and HIPPO in LAMMPS.  

If the 4 atoms in an improper quadruplet (listed in the data file read by the read_data command are ordered I,J,K,L then atoms I,K,L are considered to lie in a plane and atom J is out-of-place. The angle $\chi_{0}$ is computed as the Allinger angle which is defined as the angle between the plane of I,K,L, and the vector from atom I to atom J.  

The following coefficient must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy)  

Note that the angle $\chi$ is computed in radians; hence $K$ is effectively energy per radian $\mathbf{\nabla}^{\wedge}2$ .  

# 8.1.4 Restrictions  

This improper style can only be used if LAMMPS was built with the AMOEBA package. See the Build package doc page for more info.  

# 8.1.5 Related commands  

improper_coeff , improper_harmonic  

# 8.1.6 Default  

none  

# 8.2 improper_style class2 command  

Accelerator Variants: class2/omp, class2/kk  

# 8.2.1 Syntax  

# 8.2.2 Examples  

improper_style class2   
improper_coeff 1 100.0 0   
improper_coeff \* aa 0.0 0.0 0.0 115.06 130.01 115.06  

# 8.2.3 Description  

The class2 improper style uses the potential  

$$
\begin{array}{c}{{E=E_{i}+E_{a a}}}\ {{E_{i}=K[\frac{\chi_{i j k l}+\chi_{k j l i}+\chi_{l j i k}}{3}-\chi_{0}]^{2}}}\ {{E_{a a}=M_{1}(\theta_{i j k}-\theta_{1})(\theta_{k j l}-\theta_{3})+}}\ {{M_{2}(\theta_{i j k}-\theta_{1})(\theta_{i j l}-\theta_{2})+}}\ {{M_{3}(\theta_{i j l}-\theta_{2})(\theta_{k j l}-\theta_{3})}}\end{array}
$$  

where $E_{i}$ is the improper term and $E_{a a}$ is an angle-angle term. The $3\chi$ terms in $E_{i}$ are an average over 3 out-of-plane angles.  

The 4 atoms in an improper quadruplet (listed in the data file read by the read_data command) are ordered I,J,K,L. χi jkl refers to the angle between the plane of I,J,K and the plane of J,K,L, and the bond JK lies in both planes. Similarly for $\chi_{k j l i}$ and $\chi_{l j i k}$ . Note that atom J appears in the common bonds (JI, JK, JL) of all $3X$ terms. Thus J (the second atom in the quadruplet) is the atom of symmetry in the $3\chi$ angles.  

The subscripts on the various $\theta\mathrm{s}$ refer to different combinations of three atoms (I,J,K,L) used to form a particular angle. E.g. $\theta_{i j l}$ is the angle formed by atoms I,J,L with J in the middle. $\theta_{1},\theta_{2},\theta_{3}$ are the equilibrium positions of those angles. Again, atom J (the second atom in the quadruplet) is the atom of symmetry in the theta angles, since it is always the center atom.  

Since atom J is the atom of symmetry, normally the bonds J-I, J-K, J-L would exist for an improper to be defined between the 4 atoms, but this is not required.  

See (Sun) for a description of the COMPASS class2 force field.  

Coefficients for the $E_{i}$ and $E_{a a}$ formulas must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands.  

These are the 2 coefficients for the $E_{i}$ formula:  

• K (energy) • χ0 (degrees)  

$\chi_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence $K$ is effectively energy per radian $\mathbf{\nabla}^{\wedge}2$ .  

For the $E_{a a}$ formula, each line in a improper_coeff command in the input script lists 7 coefficients, the first of which is aa to indicate they are AngleAngle coefficients. In a data file, these coefficients should be listed under a AngleAngle Coeffs heading and you must leave out the aa, i.e. only list 6 coefficients after the improper type.  

• aa • $M_{1}$ (energy) • $M_{2}$ (energy) • $M_{3}$ (energy) • $\theta_{1}$ (degrees) • $\theta_{2}$ (degrees) • $\theta_{3}$ (degrees)  

The $\theta$ values are specified in degrees, but LAMMPS converts them to radians internally; hence the hence the various $M$ are effectively energy per radian $\mathbf{\nabla}_{\cdot}\wedge\mathbf{\nabla}_{2}$ .  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 8.2.4 Restrictions  

This improper style can only be used if LAMMPS was built with the CLASS2 package. See the Build package doc page for more info.  

# 8.2.5 Related commands  

improper_coeff  

# 8.2.6 Default  

none  

(Sun) Sun, J Phys Chem B 102, 7338-7364 (1998).  

# 8.3 improper_style cossq command  

Accelerator Variants: cossq/omp  

# 8.3.1 Syntax  

# 8.3.2 Examples  

improper_style cossq improper_coeff 1 4.0 0.0  

# 8.3.3 Description  

The cossq improper style uses the potential  

$$
E=\frac{1}{2}K\cos^{2}\left(\chi-\chi_{0}\right)
$$  

where $\chi$ is the improper angle, $\chi_{0}$ is its equilibrium value, and $K$ is a prefactor.  

If the 4 atoms in an improper quadruplet (listed in the data file read by the read_data command) are ordered I,J,K,L then $\chi$ is the angle between the plane of I,J,K and the plane of J,K,L. Alternatively, you can think of atoms J,K,L as being in a plane, and atom I above the plane, and $\chi$ as a measure of how far out-of-plane I is with respect to the other 3 atoms.  

Note that defining 4 atoms to interact in this way, does not mean that bonds necessarily exist between I-J, J-K, or K-L, as they would in a linear dihedral. Normally, the bonds I-J, I-K, I-L would exist for an improper to be defined between the 4 atoms.  

The following coefficients must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • χ0 (degrees)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 8.3.4 Restrictions  

This improper style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 8.3.5 Related commands  

improper_coeff  

# 8.3.6 Default  

none  

# 8.4 improper_style cvff command  

Accelerator Variants: cvff/intel, cvff/omp  

# 8.4.1 Syntax  

# 8.4.2 Examples  

<html><body><table><tr><td>improper _style cvff</td></tr><tr><td>improper coeff 1 80.0 -1 4</td></tr><tr><td></td></tr></table></body></html>  

# 8.4.3 Description  

The cvff improper style uses the potential  

$$
E=K[1+d\cos(n\phi)]
$$  

where phi is the improper dihedral angle.  

If the 4 atoms in an improper quadruplet (listed in the data file read by the read_data command) are ordered I,J,K,L then the improper dihedral angle is between the plane of I,J,K and the plane of J,K,L. Note that because this is effectively a dihedral angle, the formula for this improper style is the same as for dihedral_style harmonic.  

Note that defining 4 atoms to interact in this way, does not mean that bonds necessarily exist between I-J, J-K, or K-L, as they would in a linear dihedral. Normally, the bonds I-J, I-K, I-L would exist for an improper to be defined between the 4 atoms.  

The following coefficients must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • d (+1 or -1) • n (0,1,2,3,4,6)  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

# 8.4. improper_style cvff command  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 8.4.4 Restrictions  

This improper style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 8.4.5 Related commands  

improper_coeff  

# 8.4.6 Default  

none  

# 8.5 improper_style distance command  

# 8.5.1 Syntax  

# 8.5.2 Examples  

# 8.5.3 Description  

The distance improper style uses the potential  

$$
E=K_{2}d^{2}+K_{4}d^{4}
$$  

where $d$ is the distance between the central atom and the plane formed by the other three atoms. If the 4 atoms in an improper quadruplet (listed in the data file read by the read_data command) are ordered I,J,K,L then the I-atom is assumed to be the central atom.  

![](images/31312c0792a132ffb94199d45bb44dc0381c1e684e9e8594a4616cedee2747b8.jpg)  

Note that defining 4 atoms to interact in this way, does not mean that bonds necessarily exist between I-J, J-K, or K-L, as they would in a linear dihedral. Normally, the bonds I-J, I-K, I-L would exist for an improper to be defined between the 4 atoms.  

The following coefficients must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $K_{2}$ (energy/distance^2) • $K_{4}$ (energy/distance^4)  

# 8.5.4 Restrictions  

This improper style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 8.5.5 Related commands  

improper_coeff  

# 8.5.6 Default  

none  

# 8.6 improper_style distharm command  

# 8.6.1 Syntax  

# 8.6.2 Examples  

<html><body><table><tr><td>improper _style distharm</td></tr><tr><td>improper coeff 125.0 0.5</td></tr></table></body></html>  

# 8.6.3 Description  

The distharm improper style uses the potential  

$$
E=K(d-d_{0})^{2}
$$  

where $d$ is the oriented distance between the central atom and the plane formed by the other three atoms. If the 4 atoms in an improper quadruplet (listed in the data file read by the read_data command) are ordered I,J,K,L then the L-atom is assumed to be the central atom. Note that this is different from the convention used in the improper_style distance. The distance $d$ is oriented and can take on negative values. This may lead to unwanted behavior if $d_{0}$ is not equal to zero.  

The following coefficients must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $K$ (energy/distance^2) • $d_{0}$ (distance)  

# 8.6.4 Restrictions  

This improper style can only be used if LAMMPS was built with the YAFF package. See the Build package doc page for more info.  

# 8.6.5 Related commands  

improper_coeff  

# 8.6.6 Default  

none  

# 8.7 improper_style fourier command  

Accelerator Variants: fourier/omp  

# 8.7.1 Syntax  

# 8.7.3 Description  

The fourier improper style uses the following potential:  

$$
E=K[C_{0}+C_{1}\cos(\omega)+C_{2}\cos(2\omega)]
$$  

where K is the force constant, C0, C1, C2 are dimensionless coefficients, and omega is the angle between the $\mathrm{IL}$ axis and the IJK plane:  

![](images/8d69a28d9db6bc4a8057dd2f59699f877cf8d8ed0050fe33c947b6ee864b8322.jpg)  

If all parameter (see below) is not zero, the all the three possible angles will taken in account.  

The following coefficients must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • C0 (unitless) • C1 (unitless) • C2 (unitless) • all (0 or 1, optional)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 8.7.4 Restrictions  

This angle style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 8.7.5 Related commands  

improper_coeff  

# 8.7.6 Default  

none  

# 8.8 improper_style harmonic command  

Accelerator Variants: harmonic/intel, harmonic/kk, harmonic/omp  

# 8.8.1 Syntax  

# 8.8.2 Examples  

<html><body><table><tr><td>improper style harmonic</td></tr><tr><td>f 1 100.00</td></tr><tr><td>improper coeff</td></tr></table></body></html>  

# 8.8.3 Description  

The harmonic improper style uses the potential  

$$
E=K(\chi-\chi_{0})^{2}
$$  

where $\chi$ is the improper angle, $\chi_{0}$ is its equilibrium value, and $K$ is a prefactor. Note that the usual 1/2 factor is included in $K$ .  

If the 4 atoms in an improper quadruplet (listed in the data file read by the read_data command) are ordered I,J,K,L then $\chi$ is the angle between the plane of I,J,K and the plane of J,K,L. Alternatively, you can think of atoms J,K,L as being in a plane, and atom I above the plane, and $\chi$ as a measure of how far out-of-plane I is with respect to the other 3 atoms.  

Note that defining 4 atoms to interact in this way, does not mean that bonds necessarily exist between I-J, J-K, or K-L, as they would in a linear dihedral. Normally, the bonds I-J, I-K, I-L would exist for an improper to be defined between the 4 atoms.  

The following coefficients must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • χ0 (degrees)  

$\chi_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence $K$ is effectively energy per radian $\mathbf{\nabla}^{\wedge}2$ .  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 8.8.4 Restrictions  

This improper style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 8.8.5 Related commands  

improper_coeff  

# 8.8.6 Default  

none  

# 8.9 improper_style hybrid command  

Accelerator Variants: hybrid/kk  

# 8.9.1 Syntax  

Improper Coeffs  

1 harmonic 120.0 30   
2 cvff 20.0 -1 2  

If class2 is one of the improper hybrid styles, the same rule holds for specifying additional AngleAngle coefficients either via the input script or in the data file. I.e. class2 must be added to each line after the improper type. For lines in the AngleAngle Coeffs section of the data file for dihedral types that are not class2, you must use an improper style of skip as a placeholder, e.g.  

AngleAngle Coeffs  

1 skip   
2 class2 0.0 0.0 0.0 115.06 130.01 115.06  

Note that it is not necessary to use the improper style skip in the input script, since AngleAngle coefficients need not be specified at all for improper types that are not class2.  

An improper style of none can be specified as the second argument to the improper_coeff command, if you desire to turn off certain improper types.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 8.9.4 Restrictions  

This improper style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

Unlike other improper styles, the hybrid improper style does not store improper coefficient info for individual substyles in binary restart files or data files. Thus when restarting a simulation, you need to re-specify the improper_coeff commands.  

# 8.9.5 Related commands  

improper_coeff  

# 8.9.6 Default  

none  

# 8.10 improper_style inversion/harmonic command  

# 8.10.1 Syntax  

# 8.10.2 Examples  

improper_style inversion/harmonic improper_coeff 1 18.776340 0.000000  

# 8.10.3 Description  

The inversion/harmonic improper style follows the Wilson-Decius out-of-plane angle definition and uses an harmonic potential:  

$$
E=K\left(\omega-\omega_{0}\right)^{2}
$$  

where $K$ is the force constant and $\omega$ is the angle evaluated for all three axis-plane combinations centered around the atom I. For the $\mathrm{IL}$ axis and the IJK plane $\omega$ looks as follows:  

![](images/bf16ce7ee9196373fdde6e0938481e5af5bfe4f48e5bc1fe1c3f1acad4e8052a.jpg)  

Note that the inversion/harmonic angle term evaluation differs to the improper_umbrella due to the cyclic evaluation of all possible angles $\omega$ .  

The following coefficients must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

$$
\begin{array}{l}{\cdot K(\mathrm{energy})}\ {\cdot\omega_{0}(\mathrm{degrees})}\end{array}
$$  

If $\omega_{\mathrm{0}}=0$ the potential term has a single minimum for the planar structure. Otherwise it has two minima at $+/-\omega_{0}$ , with a barrier in between.  

# 8.10.4 Restrictions  

This improper style can only be used if LAMMPS was built with the MOFFF package. See the Build package doc page for more info.  

# 8.10.5 Related commands  

improper_coeff  

# 8.10.6 Default  

none  

# 8.11 improper_style none command  

# 8.11.1 Syntax  

# 8.11.2 Examples  

# 8.11.3 Description  

Using an improper style of none means improper forces and energies are not computed, even if quadruplets of improper atoms were listed in the data file read by the read_data command.  

See the improper_style zero command for a way to calculate improper statistics, but compute no improper interactions.  

# 8.11.4 Restrictions  

none  

# 8.11.5 Related commands  

improper_style zero  

# 8.11.6 Default  

none  

# 8.12 improper_style ring command  

Accelerator Variants: ring/omp  

# 8.12.1 Syntax  

# 8.12.2 Examples  

<html><body><table><tr><td>improper _style e ring</td></tr><tr><td>improper coeff f 1 8000 70.5</td></tr></table></body></html>  

# 8.12.3 Description  

The ring improper style uses the potential  

$$
\begin{array}{c}{{E=\displaystyle\frac{1}{6}K\left(\Delta_{i j l}+\Delta_{i j k}+\Delta_{k j l}\right)^{6}}}\ {{\Delta_{i j l}=\displaystyle\cos\theta_{i j l}-\cos\theta_{0}}}\ {{\Delta_{i j k}=\displaystyle\cos\theta_{i j k}-\cos\theta_{0}}}\ {{\Delta_{k j l}=\displaystyle\cos\theta_{k j l}-\cos\theta_{0}}}\end{array}
$$  

where $K$ is a prefactor, $\theta$ is the angle formed by the atoms specified by (i,j,k,l) indices and $\theta_{0}$ its equilibrium value.  

If the 4 atoms in an improper quadruplet (listed in the data file read by the read_data command) are ordered i,j,k,l then $\theta_{i j l}$ is the angle between atoms $\mathrm{i,j}$ and l, $\theta_{i j k}$ is the angle between atoms i,j and k, $\theta_{k j l}$ is the angle between atoms j,k, and l.  

The “ring” improper style implements the improper potential introduced by Destree et al., in Equation (9) of (Destree). This potential does not affect small amplitude vibrations but is used in an ad-hoc way to prevent the onset of accidentally large amplitude fluctuations leading to the occurrence of a planar conformation of the three bonds i-j, $\mathrm{j-k}$ and $\mathrm{j}{-}1$ , an intermediate conformation toward the chiral inversion of a methine carbon. In the “Impropers” section of data file four atoms: i, j, k and l are specified with i,j and l lying on the backbone of the chain and $\mathbf{k}$ specifying the chirality of j.  

The following coefficients must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • θ0 (degrees)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 8.12.4 Restrictions  

This improper style can only be used if LAMMPS was built with the EXTRA-MOLECULE package. See the Build package doc page for more info.  

# 8.12.5 Related commands  

improper_coeff  

(Destree) M. Destree, F. Laupretre, A. Lyulin, and J.-P. Ryckaert, J Chem Phys, 112, 9632 (2000).  

# 8.13 improper_style sqdistharm command  

# 8.13.1 Syntax  

# 8.13.2 Examples  

<html><body><table><tr><td>improper style sqdistharm</td></tr></table></body></html>  

# 8.13.3 Description  

The sqdistharm improper style uses the potential  

$$
E=K(d^{2}-{d_{0}}^{2})^{2}
$$  

where $d$ is the distance between the central atom and the plane formed by the other three atoms. If the 4 atoms in an improper quadruplet (listed in the data file read by the read_data command) are ordered I,J,K,L then the L-atom is assumed to be the central atom. Note that this is different from the convention used in the improper_style distance.  

The following coefficients must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $K$ (energy/distance^4) • d02 (distance^2)  

Note that ${d_{0}}^{2}$ (in units distance^2) has be provided and not $d_{0}$ .  

# 8.13.4 Restrictions  

This improper style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 8.13.5 Related commands  

improper_coeff  

# 8.13.6 Default  

none  

# 8.14 improper_style umbrella command  

Accelerator Variants: umbrella/omp  

# 8.14.1 Syntax  

# 8.14.2 Examples  

<html><body><table><tr><td>improper _style umbrella</td></tr><tr><td>improper coeff 1 100.0 180.0</td></tr><tr><td></td></tr></table></body></html>  

# 8.14.3 Description  

The umbrella improper style uses the following potential, which is commonly referred to as a classic inversion and used in the DREIDING force field:  

$$
\begin{array}{l}{{\displaystyle{E=\frac{1}{2}K\left(\frac{1}{\sin\omega_{0}}\right)^{2}(\cos\omega-\cos\omega_{0})^{2}\qquad\omega_{0}\not=0^{o}}}}\ {{\displaystyle{E=K\left(1-c o s\omega\right)\qquad\omega_{0}=0^{o}}}}\end{array}
$$  

where $K$ is the force constant and $\omega$ is the angle between the $\mathrm{IL}$ axis and the IJK plane:  

![](images/90e14dcbb51d2fbf83494e8fb20ead6abc5c7a7eb27165dcb00c5e2638fadca6.jpg)  

If $\omega_{\mathrm{0}}=0$ the potential term has a minimum for the planar structure. Otherwise it has two minima at $\omega+/-\omega_{0}$ , with a barrier in between.  

See (Mayo) for a description of the DREIDING force field.  

The following coefficients must be defined for each improper type via the improper_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• K (energy) • ω0 (degrees)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 8.14.4 Restrictions  

This improper style can only be used if LAMMPS was built with the MOLECULE package. See the Build package doc page for more info.  

# 8.14.5 Related commands  

improper_coeff  

# 8.14.6 Default  

none  

(Mayo) Mayo, Olfason, Goddard III, J Phys Chem, 94, 8897-8909 (1990),  

# 8.15 improper_style zero command  

# 8.15.1 Syntax  

# 8.15.4 Restrictions  

none  

# 8.15.5 Related commands  

none improper_style none  

# 8.15.6 Default  

none  

# DUMP STYLES  

9.1 dump command   
9.2 dump vtk command   
9.3 dump h5md command   
9.4 dump molfile command   
9.5 dump netcdf command   
9.6 dump image command   
9.7 dump movie command   
9.8 dump atom/adios command   
9.9 dump custom/adios command  

# 9.10 dump cfg/uef command  

# 9.10.1 Syntax  

dump ID group-ID style N file attribute1 attribute2 ...  

• $\mathrm{ID}=$ user-assigned name for the dump   
• group- $\cdot\mathrm{ID}=\mathrm{ID}$ of the group of atoms to be dumped   
• style $=$ atom or atom/adios or atom/gz or atom/zstd or cfg or cfg/gz or cfg/zstd or cfg/uef or custom or custom/gz or custom/zstd or custom/adios or dcd or grid or grid/vtk or h5md or image or local or local/gz or local/zstd or molfile or movie or netcdf or netcdf/mpiio or vtk or xtc or xyz or xyz/gz or xyz/zstd or yaml   
• $\Nu=$ dump on timesteps which are multiples of N   
• file $=$ name of file to write dump info to   
• attribute1,attribute2,. . . $=$ list of attributes for a particular style atom attributes $=$ none atom/adios attributes $=\mathrm{none}$ , discussed on dump atom/adios page atom/gz attributes $=$ none   
atom/zstd attributes $=$ none   
cfg attributes $=$ same as custom attributes, see below   
cfg/gz attributes = same as custom attributes, see below   
cfg/zstd attributes $-$ same as custom attributes, see below   
cfg/uef attributes = same as custom attributes, discussed on dump cfg/uef page   
custom, custom/gz, custom/zstd attributes = see below   
custom/adios attributes $-$ same as custom attributes, discussed on dump custom/adios page   
dcd attributes = none   
h5md attributes = discussed on dump h5md page   
grid attributes = see below   
grid/vtk attributes = see below   
image attributes = discussed on dump image page   
local, local/gz, local/zstd attributes = see below   
molfile attributes = discussed on dump molfile page   
movie attributes = discussed on dump image page   
netcdf attributes = discussed on dump netcdf page   
netcdf/mpiio attributes = discussed on dump netcdf page   
vtk attributes $=$ same as custom attributes, see below, also dump vtk page   
xtc attributes $=$ none   
xyz attributes $=$ none   
xyz/gz attributes $=$ none   
xyz/zstd attributes $=$ none   
yaml attributes $=$ same as custom attributes, see below  

• custom or custom/gz or custom/zstd or cfg or cfg/gz or cfg/zstd or cfg/uef or netcdf or netcdf/mpiio or yaml attributes:  

possible attributes = id, mol, proc, procp1, type, element, mass, x, y, z, xs, ys, zs, xu, yu, zu, xsu, ysu, zsu, ix, iy, iz, vx, vy, vz, fx, fy, fz, q, mux, muy, muz, mu, radius, diameter, omegax, omegay, omegaz, angmomx, angmomy, angmomz, tqx, tqy, tqz, c_ID, c_ID[I], f_ID, f_ID[I], v_name, i_name, d_name, i2_name[I], d2_name[I]  

id = atom ID   
mol = molecule ID   
$\mathrm{proc}=\mathrm{I}\mathrm{D}$ of processor that owns atom   
$\mathrm{procp1}=\mathrm{1D+1}$ of processor that owns atom   
type = atom type   
typelabel = atom type label   
element = name of atom element, as defined by dump_modify command $-$   
mass $-$ atom mass   
x,y,z = unscaled atom coordinates   
xs,ys,zs = scaled atom coordinates   
xu,yu,zu $-$ unwrapped atom coordinates   
xsu,ysu,zsu = scaled unwrapped atom coordinates   
ix,iy,iz = box image that the atom is in   
vx,vy,vz = atom velocities   
fx,fy,fz = forces on atoms   
q = atom charge   
mux,muy,muz = orientation of dipole moment of atom   
mu = magnitude of dipole moment of atom   
radius,diameter $-$ radius, diameter of spherical particle   
omegax,omegay,omegaz $-$ angular velocity of spherical particle   
angmomx,angmomy,angmomz = angular momentum of aspherical particle   
tqx,tqy,tqz = torque on finite-size particles   
c_ID = per-atom vector calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ column of per-atom array calculated by a compute with ID, I can include wildcard␣   
$\hookrightarrow$ (see below)   
f_ID = per-atom vector calculated by a fix with ID   
f_ID[I] = Ith column of per-atom array calculated by a fix with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)   
v_name = per-atom vector calculated by an atom-style variable with name   
i_name = custom integer vector with name   
d_name = custom floating point vector with name   
$\mathrm{i2\_name[I]=Ith}$ column of custom integer array with name, I can include wildcard (see below)   
d2_name[I] = Ith column of custom floating point vector with name, I can include wildcard (see␣   
,→below)  

• local or local/gz or local/zstd attributes:  

possible attributes $=$ index, c_ID, c_ID[I], f_ID, f_ID[I] index = enumeration of local values   
$\mathrm{c\_ID}=\mathrm{local}$ vector calculated by a compute with ID $\mathrm{c\_ID[I]=Ith}$ column of local array calculated by a compute with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)   
f_ID = local vector calculated by a fix with ID $\mathrm{f\_ID[I]=Ith}$ column of local array calculated by a fix with ID, I can include wildcard (see below)  

• grid or grid/vtk attributes:  

possible attributes $=\mathrm{~c~}$ _ID:gname:dname, c_ID:gname:dname[I], f_ID:gname:dname, f_   
$\hookrightarrow$ ID:gname:dname[I]   
gname $=$ name of grid defined by compute or fix dname $=$ name of data field defined by compute or fix   
c_ID = per-grid vector calculated by a compute with ID $\mathrm{c\_ID[I]=Ith}$ column of per-grid array calculated by a compute with ID, I can include wildcard␣   
$\hookrightarrow$ (see below)   
f_ID = per-grid vector calculated by a fix with ID   
f_ID[I] = Ith column of per-grid array calculated by a fix with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)  

# 9.10.2 Examples  

dump myDump all atom 100 dump.lammpstrj   
dump myDump all atom/gz 100 dump.atom.gz   
dump myDump all atom/zstd 100 dump.atom.zst   
dump 2 subgroup atom 50 dump.run.bin   
dump 4a all custom 100 dump.myforce.\* id type x y vx fx   
dump 4a all custom 100 dump.myvel.lammpsbin id type x y z vx vy vz   
dump 4b flow custom 100 dump.%.myforce id type c_myF[3] v_ke   
dump 4b flow custom 100 dump.%.myforce id type c_myF[\*] v_ke   
dump 2 inner cfg 10 dump.snap.\*.cfg mass type xs ys zs vx vy vz   
dump snap all cfg 100 dump.config.\*.cfg mass type xs ys zs id type c_Stress[2]   
dump 1 all xtc 1000 file.xtc  

# 9.10.3 Description  

Dump a snapshot of quantities to one or more files once every $N$ timesteps in one of several styles. The timesteps on which dump output is written can also be controlled by a variable. See the dump_modify every command.  

Almost all the styles output per-atom data, i.e. one or more values per atom. The exceptions are as follows. The local styles output one or more values per bond (angle, dihedral, improper) or per pair of interacting atoms (force or neighbor interactions). The grid styles output one or more values per grid cell, which are produced by other commands which overlay the simulation domain with a regular grid. See the Howto grid doc page for details. The image style renders a JPG, PNG, or PPM image file of the system for each snapshot, while the movie style combines and compresses the series of images into a movie file; both styles are discussed in detail on the dump image page.  

Only information for atoms in the specified group is dumped. The dump_modify thresh and region and refresh commands can also alter what atoms are included. Not all styles support these options; see details on the dump_modify doc page.  

As described below, the filename determines the kind of output: text or binary or gzipped, one big file or one per timestep, one file for all the processors or multiple smaller files.  

![](images/33bad50ba811fe29b592cbdb68fb948b2a40dbcfdda30259301aefb699cd90a0.jpg)  

# Note  

Because periodic boundary conditions are enforced only on timesteps when neighbor lists are rebuilt, the coordinates of an atom written to a dump file may be slightly outside the simulation box. Re-neighbor timesteps will not typically coincide with the timesteps dump snapshots are written. See the dump_modify pbc command if you wish to force coordinates to be strictly inside the simulation box.  

![](images/e6d9534e68c6db4d052ffe2869f3daf000093180d4f9b77eca43422aa4b1a141.jpg)  

# Note  

Unless the dump_modify sort option is invoked, the lines of atom or grid information written to dump files (typically one line per atom or grid cell) will be in an indeterminate order for each snapshot. This is even true when running on a single processor, if the atom_modify sort option is on, which it is by default. In this case atoms are re-ordered periodically during a simulation, due to spatial sorting. It is also true when running in parallel, because data for a single snapshot is collected from multiple processors, each of which owns a subset of the atoms.  

![](images/a52cdbf7dc51b6914ad9b62d2a4fafdcf3cefab8669964de736f87b8d855aef8.jpg)  

# Warning  

Without either including atom IDs or using the dump_modify sort option, it is impossible for visualization programs (e.g. OVITO or VMD) or analysis tools to assign data in different frames consistently to the same atom. This can lead to incorrect visualizations or results. LAMMPS will print a warning in such cases.  

For the atom, custom, cfg, grid, and local styles, sorting is off by default. For the dcd, grid/vtk, xtc, xyz, and molfile styles, sorting by atom ID or grid ID is on by default. See the dump_modify page for details.  

The style keyword determines what kind of data is written to the dump file(s) and in what format.  

Note that atom, custom, dcd, xtc, xyz, and yaml style dump files can be read directly by VMD, a popular tool for visualizing and analyzing trajectories from atomic and molecular systems. For reading netcdf style dump files, the netcdf plugin needs to be recompiled from source using a NetCDF version compatible with the one used by LAMMPS. The bundled plugin binary uses a very old version of NetCDF that is not compatible with LAMMPS.  

Likewise the OVITO visualization package, popular for materials modeling, can read the atom, custom, local, xtc, cfg, netcdf, and xyz style atom dump files directly. With version 3.8 and above, OVITO can also read and visualize grid style dump files with grid cell data, including iso-surface images of the grid cell values.  

Note that settings made via the dump_modify command can also alter the format of individual values and content of the dump file itself. This includes the precision of values output to text-based dump files which is controlled by the dump_modify format command and its options.  

Format of native LAMMPS format dump files:  

The atom, custom, grid, and local styles create files in a simple LAMMPS-specific text format that is mostly selfexplanatory when viewing a dump file. Many post-processing tools either included with LAMMPS or third-party tools can read this format, as does the rerun command. See tools described on the Tools doc page for examples, including Pizza.py.  

For all these styles, the dimensions of the simulation box are included in each snapshot. The simulation box in LAMMPS can be defined in one of 3 ways: orthogonal, restricted triclinic, and general triclinic. See the Howto triclinic doc page for a detailed description of all 3 options.  

For an orthogonal simulation box the box information is formatted as:  

<html><body><table><tr><td>ITEM: BOX BOUNDS xx yy zZ</td></tr><tr><td>xlo xhi</td></tr><tr><td>ylo yhi</td></tr><tr><td>zlozhi</td></tr></table></body></html>  

where xlo,xhi are the maximum extents of the simulation box in the $x\cdot$ -dimension, and similarly for $y$ and $z$ . The “xx yy zz” terms are six characters that encode the style of boundary for each of the six simulation box boundaries (xlo,xhi; ylo,yhi; and zlo,zhi). Each of the six characters is one of $p$ (periodic), $f$ (fixed), $s$ (shrink wrap), or $m$ (shrink wrapped with a minimum value). See the boundary command for details.  

For a restricted triclinic simulation box, an orthogonal bounding box which encloses the restricted triclinic simulation box is output, along with the three tilt factors $(x y,x z,y z)$ of the triclinic box, formatted as follows:  

<html><body><table><tr><td>ITEM: BOX BOUNDS xy xz yz xx yy zz</td></tr><tr><td>xlo_bound xhi_bound xy</td></tr><tr><td>ylo_bound yhi_bound xz</td></tr><tr><td>zlo_bound zhi_bound yz</td></tr></table></body></html>  

The presence of the text “xy xz yz” in the ITEM line indicates that the three tilt factors will be included on each of the three following lines. This bounding box is convenient for many visualization programs. The meaning of the six character flags for “xx yy zz” is the same as above.  

Note that the first two numbers on each line are now xlo_bound instead of xlo, etc. because they represent a bounding box. See the Howto triclinic page for a geometric description of triclinic boxes, as defined by LAMMPS, simple formulas for how the six bounding box extents (xlo_bound, xhi_bound, etc.) are calculated from the triclinic parameters, and how to transform those parameters to and from other commonly used triclinic representations.  

For a general triclinic simulation box, see the “General triclinic” section below for a description of the ITEM: BOX BOUNDS format as well as how per-atom coordinates and per-atom vector quantities are output.  

The atom and custom styles output a “ITEM: NUMBER OF ATOMS” line with the count of atoms in the snapshot. Likewise they output an “ITEM: ATOMS” line which includes column descriptors for the per-atom lines that follow. For example, the descriptors would be “id type xs ys zs” for the default atom style, and would be the atom attributes you specify in the dump command for the custom style. Each subsequent line will list the data for a single atom.  

For style atom, atom coordinates are written to the file, along with the atom ID and atom type. By default, atom coords are written in a scaled format (from 0 to 1). That is, an $x$ value of 0.25 means the atom is at a location 1/4 of the distance from xlo to xhi of the box boundaries. The format can be changed to unscaled coords via the dump_modify settings. Image flags can also be added for each atom via dump_modify.  

Style custom allows you to specify a list of atom attributes to be written to the dump file for each atom. Possible attributes are listed above and will appear in the order specified. You cannot specify a quantity that is not defined for a particular simulation—such as $q$ for atom style bond, since that atom style does not assign charges. Dumps occur at the very end of a timestep, so atom attributes will include effects due to fixes that are applied during the timestep. An explanation of the possible dump custom attributes is given below.  

Added in version $22\mathrm{Dec}2022$ .  

For style grid the dimension of the simulation domain and size of the Nx by Ny by $\mathbf{Nz}$ grid that overlays the simulation domain are also output with each snapshot:  

ITEM: DIMENSION dim   
ITEM: GRID SIZE nx ny nz  

The value dim will be 2 or 3 for 2d or 3d simulations. It is included so that post-processing tools like OVITO, which can visualize grid-based quantities know how to draw each grid cell. The grid size will match the input script parameters for grid(s) created by the computes or fixes which are referenced by the the dump command. For 2d simulations (and grids), nz will always be 1.  

There will also be an “ITEM: GRID DATA” line which includes column descriptors for the per grid cell data. Each subsequent line $(\mathrm{Nx^{*}N y^{*}N z}$ lines) will list the data for a single grid cell. If grid cell IDs are included in the output via the compute property/grid command, then the IDs will range from 1 to $\mathrm{{N}=N_{X}*N_{Y}*N_{Z}}$ . The ordering of IDs is with the $\mathbf{X}$ index varying fastest, then the y index, and the z index varying slowest.  

For style local, local output generated by computes and fixes is used to generate lines of output that is written to the dump file. This local data is typically calculated by each processor based on the atoms it owns, but there may be zero or more entities per atom (e.g., a list of bond distances). An explanation of the possible dump local attributes is given below. Note that by using input from the compute property/local command with dump local, it is possible to generate information on bonds, angles, etc. that can be cut and pasted directly into a data file read by the read_data command.  

Dump files in other popular formats:  

# Note  

This section only discusses file formats relevant to this doc page. The top of this page has links to other dump commands (with their own pages) which write files in additional popular formats.  

Style cfg has the same command syntax as style custom and writes extended CFG format files, as used by the AtomEye visualization package. Since the extended CFG format uses a single snapshot of the system per file, a wildcard “\*” must be included in the filename, as discussed below. The list of atom attributes for style cfg must begin with either “mass type xs ys zs” or “mass type xsu ysu zsu” since these quantities are needed to write the CFG files in the appropriate format (though the “mass” and “type” fields do not appear explicitly in the file). Any remaining attributes will be stored as “auxiliary properties” in the CFG files. Note that you will typically want to use the dump_modify element command with CFG-formatted files, to associate element names with atom types, so that AtomEye can render atoms appropriately. When unwrapped coordinates xsu, ysu, and zsu are requested, the nominal AtomEye periodic cell dimensions are expanded by a large factor UNWRAPEXPAND $=10.0$ , which ensures atoms that are displayed correctly for up to UNWRAPEXPAND/2 periodic boundary crossings in any direction. Beyond this, AtomEye will rewrap the unwrapped coordinates. The expansion causes the atoms to be drawn farther away from the viewer, but it is easy to zoom the atoms closer, and the interatomic distances are unaffected.  

The dcd style writes DCD files, a standard atomic trajectory format used by the CHARMM, NAMD, and XPlor molecular dynamics packages. DCD files are binary and thus may not be portable to different machines. The number of atoms per snapshot cannot change with the dcd style. The unwrap option of the dump_modify command allows DCD coordinates to be written “unwrapped” by the image flags for each atom. Unwrapped means that if the atom has passed through a periodic boundary one or more times, the value is printed for what the coordinate would be if it had not been wrapped back into the periodic box. Note that these coordinates may thus be far outside the box size stored with the snapshot.  

The xtc style writes XTC files, a compressed trajectory format used by the GROMACS molecular dynamics package, and described here. The precision used in XTC files can be adjusted via the dump_modify command. The default value of 1000 means that coordinates are stored to 1/1000 nanometer accuracy. XTC files are portable binary files written in the NFS XDR data format, so that any machine which supports XDR should be able to read them. The number of atoms per snapshot cannot change with the xtc style. The unwrap option of the dump_modify command allows XTC coordinates to be written “unwrapped” by the image flags for each atom. Unwrapped means that if the atom has passed through a periodic boundary one or more times, the value is printed for what the coordinate would be if it had not been wrapped back into the periodic box. Note that these coordinates may thus be far outside the box size stored with the snapshot.  

The xyz style writes XYZ files, which is a simple text-based coordinate format that many codes can read. Specifically it has a line with the number of atoms, then a comment line that is usually ignored followed by one line per atom with the atom type and the x-, y-, and $z$ -coordinate of that atom. You can use the dump_modify element option to change the output from using the (numerical) atom type to an element name (or some other label). This option will help many visualization programs to guess bonds and colors. You can use the dump_modify types labels option to replace numeric atom types with type labels.  

Added in version 22Dec2022.  

The grid/vtk style writes VTK files for grid data on a regular rectilinear grid. Its content is conceptually similar to that of the text file produced by the grid style, except that it in an XML-based format which visualization programs which support the VTK format can read, e.g. the ParaView tool. For this style, there can only be 1 or 3 per grid cell attributes specified. If it is a single value, it is a scalar quantity. If 3 values are specified it is encoded in the VTK file as a vector quantity (for each grid cell). The filename for this style must include a “\*” wildcard character to produce one file per snapshot; see details below.  

Added in version 4May2022.  

Dump style yaml has the same command syntax as style custom and writes YAML format files that can be easily parsed by a variety of data processing tools and programming languages. Each timestep will be written as a YAML “document” (i.e., starts with “—” and ends with “. . . ”). The style supports writing one file per timestep through the “\*” wildcard but not multi-processor outputs with the “%” token in the filename. In addition to per-atom data, thermo data can be included in the yaml style dump file using the dump_modify thermo yes. The data included in the dump file uses the “thermo” tag and is otherwise identical to data specified by the thermo_style command.  

Below is an example for a YAML format dump created by the following commands.  

dump out all yaml 100 dump.yaml id type x y z vx vy vz ix iy iz dump_modify out time yes units yes thermo yes format $1\%5\mathrm{d}$ format $"\%$ 10.6e"  

The tags “time”, “units”, and “thermo” are optional and enabled by the dump_modify command. The list under the “box” tag has three lines for orthogonal boxes and four lines for triclinic boxes, where the first three are the box boundaries and the fourth the three tilt factors $(x y,x z,y z)$ . The “thermo” data follows the format of the yaml thermo style. The “keywords” tag lists the per-atom properties contained in the “data” columns, which contain a list with one line per atom. The keywords may be renamed using the dump_modify command same as for the custom dump style.  

creator: LAMMPS   
timestep: 0   
units: lj   
time: 0   
natoms: 4000  

(continues on next page)  

# 9.10. dump cfg/uef command  

(continued from previous page)  

boundary: [ p, p, p, p, p, p, ]   
thermo: - keywords: [ Step, Temp, E_pair, E_mol, TotEng, Press, ] - data: [ 0, 0, -27093.472213010766, 0, 0, 0, ]   
box: - [ 0, 16.795961913825074 ] - [ 0, 16.795961913825074 [ 0, 16.795961913825074 ]   
- [ 0, 0, 0 ]   
keywords: [ id, type, x, y, z, vx, vy, vz, ix, iy, iz, ]   
data: - [ 1 , 1 , 0.000000e+00 , 0.000000e+00 , 0.000000e+00 , -1.841579e-01 , -9.710036e-01 , -2.   
,→934617e+00 , 0 , 0 , 0, ]   
- [ 2 , 1 , 8.397981e-01 , 8.397981e-01 , 0.000000e+00 , -1.799591e+00 , 2.127197e+00 , 2.   
,→298572e+00 , 0 , 0 , 0, ]   
- [ 3 , 1 , 8.397981e-01 , 0.000000e+00 , 8.397981e-01 , -1.807682e+00 , -9.585130e-01 , 1.   
,→605884e+00 , 0 , 0 , 0, ]   
[...]   
timestep: 100   
units: lj   
time: 0.5   
[...]  

Frequency of dump output:  

Dumps are performed on timesteps that are a multiple of $N$ (including timestep 0) and on the last timestep of a minimization if the minimization converges. Note that this means a dump will not be performed on the initial timestep after the dump command is invoked, if the current timestep is not a multiple of $N$ . This behavior can be changed via the dump_modify first command, which can also be useful if the dump command is invoked after a minimization ended on an arbitrary timestep.  

The value of $N$ can be changed between runs by using the dump_modify every command (not allowed for dcd style). The dump_modify every command also allows a variable to be used to determine the sequence of timesteps on which dump files are written. In this mode a dump on the first timestep of a run will also not be written unless the dump_modify first command is used.  

If you instead want to dump snapshots based on simulation time (in time units of the units command command), the dump_modify every/time command can be used. This can be useful when the timestep size varies during a simulation run, e.g. by use of the fix dt/reset command.  

Dump filenames:  

The specified dump filename determines how the dump file(s) is written. The default is to write one large text file, which is opened when the dump command is invoked and closed when an undump command is used or when LAMMPS exits. For the dcd and xtc styles, this is a single large binary file.  

Many of the styles allow dump filenames to contain either or both of two wildcard characters. If a “\*” character appears in the filename, then one file per snapshot is written and the “\*” character is replaced with the timestep value. For example, tmp.dump.\* becomes tmp.dump.0, tmp.dump.10000, tmp.dump.20000, etc. This option is not available for the dcd and xtc styles. Note that the dump_modify pad command can be used to ensure all timestep numbers are the same length (e.g., 00010), which can make it easier to read a series of dump files in order with some post-processing tools.  

If a “ ${}^{\cdot}\mathbf{\mathrm{q}}_{\mathrm{0}}:$ ” character appears in the filename, then each of P processors writes a portion of the dump file, and the “%” character is replaced with the processor ID from 0 to $P-1$ . For example, tmp.dump. $\%$ becomes tmp.dump.0, tmp.dump.1, . . . tmp.dump.:math:P-1, etc. This creates smaller files and can be a fast mode of output on parallel machines that support parallel I/O for output. This option is not available for the dcd, xtc, xyz, grid/vtk, and yaml styles.  

By default, $P$ is the the number of processors, meaning one file per processor, but $P$ can be set to a smaller value via the nfile or fileper keywords of the dump_modify command. These options can be the most efficient way of writing out dump files when running on large numbers of processors.  

Note that using the “\*” and $^{66}\%$ ” characters together can produce a large number of small dump files!  

Deprecated since version 21Nov2023.  

The MPIIO package and the the corresponding “/mpiio” dump styles, except for the unrelated “netcdf/mpiio” style were removed from LAMMPS.  

Compression of dump file data:  

If the specified filename ends with “.bin” or “.lammpsbin”, the dump file (or files, if “\*” or “%” is also used) is written in binary format. A binary dump file will be about the same size as a text version, but will typically write out much faster. Of course, when post-processing, you will need to convert it back to text format (see the binary2txt tool) or write your own code to read the binary file. The format of the binary file can be understood by looking at the tools/ binary2txt.cpp file. This option is only available for the atom and custom styles.  

If the filename ends with “.gz”, the dump file (or files, if “\*” or $\mathbf{\hat{\mu}}^{\epsilon}\mathbf{C}\mathbf{\eta}_{0}^{\eta}$ is also used) is written in gzipped format. A gzipped dump file will be about $3\times$ smaller than the text version, but will also take longer to write. This option is not available for the dcd and xtc styles.  

Note that styles that end with gz are identical in command syntax to the corresponding styles without “gz”, however, they generate compressed files using the zlib library. Thus the filename suffix “.gz” is mandatory. This is an alternative approach to writing compressed files via a pipe, as done by the regular dump styles, which may be required on clusters where the interface to the high-speed network disallows using the fork() library call (which is needed for a pipe). For the remainder of this page, you should thus consider the atom and atom/gz styles (etc.) to be inter-changeable, with the exception of the required filename suffix.  

Similarly, styles that end with zstd are identical to the gz styles, but use the Zstd compression library instead and require a “.zst” suffix. See the dump_modify page for details on how to control the compression level in both variants.  

General triclinic simulation box output for the atom and custom styles:  

As mentioned above, the simulation box can be defined as a general triclinic box, which means that 3 arbitrary box edge vectors A, B, C can be specified. See the Howto triclinic doc page for a detailed description of general triclinic boxes.  

This option is provided as a convenience for users who may be converting data from solid-state crystallographic representations or from DFT codes for input to LAMMPS. However, as explained on the Howto_triclinic doc page, internally, LAMMPS only uses restricted triclinic simulation boxes. This means the box and per-atom information (e.g. coordinates, velocities) LAMMPS stores are converted (rotated) from general to restricted triclinic form when the system is created.  

# 9.10. dump cfg/uef command  

For dump output, if the dump_modify triclinic/general command is used, the box description and per-atom coordinates and other per-atom vectors will be converted (rotated) from restricted to general form when each dump file snapshots is output. This option can only be used if the simulation box was initially created as general triclinic. If the option is not used, and the simulation box is general triclinic, then the dump file snapshots will reflect the internal restricted triclinic geometry.  

The dump_modify triclinic/general option affects 3 aspects of the dump file output.  

First, the format for the BOX BOUNDS is as follows  

<html><body><table><tr><td>ITEM: BOX BOUNDS abc origin</td></tr><tr><td>ax ay az originx</td></tr><tr><td>bx by bz originy</td></tr><tr><td>cx cy cz originz</td></tr></table></body></html>  

where the A edge vector of the box is (ax,ay,az) and similarly for $\mathbf{B}$ and C. The origin of all 3 edge vectors is (originx, originy, originz).  

Second, the coordinates of each atom are converted (rotated) so that the atom is inside (or near) the general triclinic box defined by the A, B, C edge vectors. For style atom, this only alters output for unscaled atom coords, via the dump_modify scaled no setting. For style custom, this alters output for either unscaled or unwrapped output of atom coords, via the $x,y,z$ or $x u,y u,z u$ attributes. For output of scaled atom coords by both styles, there is no difference between restricted and general triclinic values.  

Third, the output for any attribute of the custom style which represents a per-atom vector quantity will be converted (rotated) to be oriented consistent with the general triclinic box and its orientation relative to the standard xyz coordinate axes.  

This applies to the following custom style attributes:  

• vx,vy,vz $=$ atom velocities   
• fx,fy,fz $=$ forces on atoms   
• mux,muy,muz $=$ orientation of dipole moment of atom   
• omegax,omegay,omegaz $=$ angular velocity of spherical particle   
angmomx,angmomy,angmomz $=$ angular momentum of aspherical particle   
tqx,tqy,tqz $=$ torque on finite-size particles  

For example, if the velocity of an atom in a restricted triclinic box is along the $\mathbf{X}$ -axis, then it will be output for a general triclinic box as a vector along the A edge vector of the box.  

![](images/6a43f43b63b5e46ba45551647312542138241e69a473b5c9ae9d0969bc9becaa.jpg)  

# Note  

For style custom, the dump_modify thresh command may access per-atom attributes either directly or indirectly through a compute or variable. If the attribute is an atom coordinate or one of the vectors mentioned above, its value will NOT be a general triclinic (rotated) value. Rather it will be a restricted triclinic value.  

Arguments for different styles:  

The sections below describe per-atom, local, and per grid cell attributes which can be used as arguments to the various styles.  

Note that in the discussion below, for styles which can reference values from a compute or fix or custom atom property, like the custom, cfg, grid or local styles, the bracketed index $i$ can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\flat}$ or $\mathbf{\tilde{\rho}}_{\mathrm{m}}^{*}\mathbf{\tilde{n}}^{,}$ . If $N$ is the number of columns in the array, then an asterisk with no numeric values means all column indices from 1 to $N$ . A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from m to $N$ (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual columns of the array had been listed one by one. For example, these two dump commands are equivalent, since the compute stress/atom command creates a per-atom array with six columns:  

<html><body><table><tr><td>compute myPress all stress/atom NULL</td></tr><tr><td>dump 2 all custom 100 tmp.dump id myPress[*] dump 0 2 all custom 100 tmp.dump id myPress[1] myPress[2] myPress[3] & myPress[4] myPress[5] myPress[6]</td></tr></table></body></html>  

Per-atom attributes used as arguments to the custom and $c f g$ styles:  

The id, mol, proc, procp1, type, typelabel, element, mass, vx, vy, vz, fx, fy, fz, $q$ attributes are self-explanatory.  

$I d$ is the atom ID. Mol is the molecule ID, included in the data file for molecular systems. Proc is the ID of the processor (0 to $N_{\mathrm{procs}}\textrm{--}1)$ that currently owns the atom. Procp1 is the proc $\mathrm{ID}{+1}$ , which can be convenient in place of a type attribute (1 to $N_{\mathrm{types},}$ ) for coloring atoms in a visualization program. Type is the atom type (1 to $N_{\mathrm{types},}$ ). Typelabel is the atom type label. Element is typically the chemical name of an element, which you must assign to each type via the dump_modify element command. More generally, it can be any string you wish to associated with an atom type. Mass is the atom mass. The quantities $\nu x,\nu y,\nu z,f x,f y,f z$ , and $q$ are components of atom velocity and force and atomic charge.  

There are several options for outputting atom coordinates. The $x,y,$ , and $z$ attributes write atom coordinates “unscaled”, in the appropriate distance units $(\mathring{\mathrm{A}},\bar{\sigma}$ , etc.). Use xs, ys, and $z s$ if you want the coordinates “scaled” to the box size so that each value is 0.0 to 1.0. If the simulation box is triclinic (tilted), then all atom coords will still be between 0.0 and 1.0. The actual unscaled $(x,y,z)$ coordinate is $x_{s}a+y_{s}b+z_{s}c$ , where $(a,b,c)$ are the non-orthogonal vectors of the simulation box edges, as discussed on the Howto triclinic page.  

Use xu, yu, and $z u$ if you want the coordinates “unwrapped” by the image flags for each atom. Unwrapped means that if the atom has passed through a periodic boundary one or more times, the value is printed for what the coordinate would be if it had not been wrapped back into the periodic box. Note that using xu, yu, and $z u$ means that the coordinate values may be far outside the box bounds printed with the snapshot. Using xsu, ysu, and zsu is similar to using xu, yu, and $z u$ , except that the unwrapped coordinates are scaled by the box size. Atoms that have passed through a periodic boundary will have the corresponding coordinate increased or decreased by 1.0.  

The image flags can be printed directly using the ix, iy, and $i z$ attributes. For periodic dimensions, they specify which image of the simulation box the atom is considered to be in. An image of 0 means it is inside the box as defined. A value of 2 means add 2 box lengths to get the true value. A value of $^{-1}$ means subtract 1 box length to get the true value. LAMMPS updates these flags as atoms cross periodic boundaries during the simulation.  

The mux, muy, and muz attributes are specific to dipolar systems defined with an atom style of dipole. They give the orientation of the atom’s point dipole moment. The mu attribute gives the magnitude of the atom’s dipole moment.  

The radius and diameter attributes are specific to spherical particles that have a finite size, such as those defined with an atom style of sphere.  

The omegax, omegay, and omegaz attributes are specific to finite-size spherical particles that have an angular velocity.   
Only certain atom styles, such as sphere, define this quantity.  

The angmomx, angmomy, and angmomz attributes are specific to finite-size aspherical particles that have an angula momentum. Only the ellipsoid atom style defines this quantity.  

The tqx, tqy, and tqz attributes are for finite-size particles that can sustain a rotational torque due to interactions with other particles.  

The $c_{-}I D$ and $c_{-}I D/I J$ attributes allow per-atom vectors or arrays calculated by a compute to be output. The ID in the attribute should be replaced by the actual ID of the compute that has been defined previously in the input script. Se the compute command for details. There are computes for calculating the per-atom energy, stress, centro-symmetry parameter, and coordination number of individual atoms.  

Note that computes which calculate global or local quantities, as opposed to per-atom quantities, cannot be output in a dump custom command. Instead, global quantities can be output by the thermo_style custom command, and local quantities can be output by the dump local command.  

If $c_{-}I D$ is used as a attribute, then the per-atom vector calculated by the compute is printed. If $c_{-}I D/i J$ is used, then i must be in the range from 1 to $M$ , which will print the ith column of the per-atom array with $M$ columns calculated by the compute. See the discussion above for how $i$ can be specified with a wildcard asterisk to effectively specify multiple values.  

The $f_{-}I D$ and $f_{-}I D/I J$ attributes allow vector or array per-atom quantities calculated by a $f\boldsymbol{{x}}$ to be output. The ID in the attribute should be replaced by the actual ID of the fix that has been defined previously in the input script. The $f\alpha$ ave/atom command is one that calculates per-atom quantities. Since it can time-average per-atom quantities produced by any compute, $f\boldsymbol{{x}}$ , or atom-style variable, this allows those time-averaged results to be written to a dump file.  

If $f_{-}I D$ is used as a attribute, then the per-atom vector calculated by the fix is printed. If $f_{-}I D/i\boldsymbol{\jmath}$ is used, then $i$ must be in the range from 1 to $M$ , which will print the ith column of the per-atom array with $M$ columns calculated by the fix. See the discussion above for how $i$ can be specified with a wildcard asterisk to effectively specify multiple values.  

The $\nu.$ _name attribute allows per-atom vectors calculated by a variable to be output. The name in the attribute should be replaced by the actual name of the variable that has been defined previously in the input script. Only an atom-style variable can be referenced, since it is the only style that generates per-atom values. Variables of style atom can reference individual atom attributes, per-atom attributes, thermodynamic keywords, or invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of creating quantities to output to a dump file.  

The i_name, d_name, i2_name, d2_name attributes refer to custom per-atom integer and floating-point vectors or arrays that have been added via the fix property/atom command. When that command is used specific names are given to each attribute which are the “name” portion of these keywords. For arrays i2_name and $d2.$ _name, the column of the array must also be included following the name in brackets (e.g., d2_xyz[i], i2_mySpin[i], where $i$ is in the range from 1 to $M$ , where $M$ is the number of columns in the custom array). See the discussion above for how $i$ can be specified with a wildcard asterisk to effectively specify multiple values.  

See the Modify page for information on how to add new compute and fix styles to LAMMPS to calculate per-atom quantities which could then be output into dump files.  

Attributes used as arguments to the local style:  

The index attribute can be used to generate an index number from 1 to N for each line written into the dump file, where N is the total number of local datums from all processors, or lines of output that will appear in the snapshot. Note that because data from different processors depend on what atoms they currently own, and atoms migrate between processor, there is no guarantee that the same index will be used for the same info (e.g. a particular bond) in successive snapshots.  

The $c_{-}I D$ and $c_{-}I D/I J$ attributes allow local vectors or arrays calculated by a compute to be output. The ID in the attribute should be replaced by the actual ID of the compute that has been defined previously in the input script. See the compute command for details. There are computes for calculating local information such as indices, types, and energies for bonds and angles.  

Note that computes which calculate global or per-atom quantities, as opposed to local quantities, cannot be output in a dump local command. Instead, global quantities can be output by the thermo_style custom command, and per-atom quantities can be output by the dump custom command.  

If $c_{-}I D$ is used as a attribute, then the local vector calculated by the compute is printed. If $c_{-}I D/I J$ is used, then I must be in the range from 1-M, which will print the Ith column of the local array with M columns calculated by the compute. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

The $f_{-}I D$ and $f_{-}I D/I J$ attributes allow local vectors or arrays calculated by a $f\boldsymbol{a}\boldsymbol{x}$ to be output. The ID in the attribute should be replaced by the actual ID of the fix that has been defined previously in the input script.  

If $f_{-}I D$ is used as a attribute, then the local vector calculated by the fix is printed. If $f_{-}I D/I J$ is used, then I must be in the range from 1-M, which will print the Ith column of the local with M columns calculated by the fix. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

Here is an example of how to dump bond info for a system, including the distance and energy of each bond:  

compute 1 all property/local batom1 batom2 btype   
compute 2 all bond/local dist eng   
dump 1 all local 1000 tmp.dump index c_1[1] c_1[2] c_1[3] c_2[1] c_2[2]  

Attributes used as arguments to the grid and grid/vtk styles:  

The attributes that begin with $c_{-}I D$ and $f_{-}I D$ both take colon-separated fields gname and dname. These refer to a grid name and data field name which is defined by the compute or fix. Note that a compute or fix can define one or more grids (of different sizes) and one or more data fields for each of those grids. The sizes of all grids output in a single dump grid command must be the same.  

The $c_{-}I D$ :gname:dname and $c_{-}I D$ :gname:dname[I] attributes allow per-grid vectors or arrays calculated by a compute to be output. The ID in the attribute should be replaced by the actual ID of the compute that has been defined previously in the input script.  

If $c_{-}I D$ :gname:dname is used as a attribute, then the per-grid vector calculated by the compute is printed. If $c_{-}I D$ :gname:dname[I] is used, then I must be in the range from 1-M, which will print the Ith column of the pergrid array with M columns calculated by the compute. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

The $f_{-}I D$ :gname:dname and f_ID:gname:dname[I] attributes allow per-grid vectors or arrays calculated by a $f\boldsymbol{a}\boldsymbol{x}$ to be output. The ID in the attribute should be replaced by the actual ID of the fix that has been defined previously in the input script.  

If $f_{-}I D$ :gname:dname is used as a attribute, then the per-grid vector calculated by the fix is printed. If $f_{-}I D$ :gname:dname[I] is used, then I must be in the range from 1-M, which will print the Ith column of the per-grid with M columns calculated by the fix. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

# 9.10.4 Restrictions  

To write gzipped dump files, you must either compile LAMMPS with the -DLAMMPS_GZIP option or use the styles from the COMPRESS package. See the Build settings page for details.  

While a dump command is active (i.e., has not been stopped by using the undump command), no commands may be used that will change the timestep (e.g., reset_timestep). LAMMPS will terminate with an error otherwise.  

The atom/gz, cfg/gz, custom/gz, and xyz/gz styles are part of the COMPRESS package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The xtc, dcd, and yaml styles are part of the EXTRA-DUMP package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 9.10.5 Related commands  

dump atom/adios, dump custom/adios, dump cfg/uef , dump h5md, dump image, dump molfile, dump netcdf , dump netcdf/mpiio, dump_modify, undump, write_dump  

# 9.10.6 Default  

The defaults for the image and movie styles are listed on the dump image page.  

# 9.11 dump atom/adios command  

# 9.12 dump custom/adios command  

# 9.12.1 Syntax  

dump ID group-ID atom/adios N file.bp dump ID group-ID custom/adios N file.bp args  

• $\mathrm{ID}=$ user-assigned name for the dump   
• group- $\mathrm{{\cdot}I D=I D}$ of the group of atoms to be imaged   
• adios $=$ style of dump command (other styles atom or cfg or dcd or xtc or xyz or local or custom are discussed on the dump doc page)   
• $\Nu=$ dump every this many timesteps   
• file.bp $=$ name of file/stream to write to   
• args $=$ same options as in dump custom command  

# 9.12.2 Examples  

dump adios1 all atom/adios 100 atoms.bp dump 4a all custom/adios 100 dump_adios.bp id v_p x y z dump 2 subgroup custom/adios 100 dump_adios.bp mass type xs ys zs vx vy vz  

# 9.12.3 Description  

Dump a snapshot of atom coordinates every $N$ timesteps in the ADIOS-based “BP” file format, or using different I/O solutions in ADIOS, to a stream that can be read on-line by another program. ADIOS-BP files are binary, portable, and self-describing.  

![](images/5ea9f2f4d4fc418dd1117579e491bbc7c4a777f96d91c51df995c5f565306d19.jpg)  

# Note  

To be able to use ADIOS, a file adios2_config.xml with specific configuration settings is expected in the current working directory. If the file is not present, LAMMPS will try to create a minimal default file. Please refer to the ADIOS documentation for details on how to adjust this file for optimal performance and desired features.  

# Use from write_dump:  

It is possible to use these dump styles with the write_dump command. In this case, the sub-intervals must not be set at all. The write_dump command can be used to create a new file at each individual dump.  

dump 4 all atom/adios 100 dump.bp write_dump all atom/adios singledump.bp  

# 9.12.4 Restrictions  

The number of atoms per snapshot can change with the adios style. When using the ADIOS tool ‘bpls’ to list the content of a .bp file, bpls will print __ for the size of the output table indicating that its size is changing every step.  

The atom/adios and custom/adios dump styles are part of the ADIOS package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 9.12.5 Related commands  

dump, dump_modify, undump  

# 9.13 dump cfg/uef command  

# 9.13.1 Syntax  

dump ID group-ID cfg/uef N file mass type xs ys zs args • $\mathrm{ID}=$ user-assigned name for the dump • group- $\cdot\mathrm{ID}=\mathrm{ID}$ of the group of atoms to be dumped • $\Nu=$ dump every this many timesteps • file $=$ name of file to write dump info to args $=$ same as args for dump custom  

# 9.13.2 Examples  

<html><body><table><tr><td>dump 1 all cfg/uef 10 dump.*.cfg mass type xs ys zs dump 0 2 all cfg/uef 100 dump.*.cfg g mass type xs ys zs id c_stress</td></tr></table></body></html>  

# 9.13.3 Description  

This command is used to dump atomic coordinates in the reference frame of the applied flow field when fix nvt/uef or fix npt/uef is used. Only the atomic coordinates and frame-invariant scalar quantities will be in the flow frame. If velocities are selected as output, for example, they will not be in the same reference frame as the atomic positions.  

# 9.13.4 Restrictions  

This fix is part of the UEF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This command can only be used when fix nvt/uef or fix npt/uef is active.  

# 9.13. dump cfg/uef command  

# 9.13.5 Related commands  

dump, fix nvt/uef  

# 9.13.6 Default  

none  

# 9.14 dump h5md command  

# 9.14.1 Syntax  

dump ID group-ID h5md N file.h5 args  

• $\mathrm{ID}=$ user-assigned name for the dump   
• group- $\cdot\mathrm{ID}=\mathrm{ID}$ of the group of atoms to be imaged   
• $h5m d=$ style of dump command (other styles atom or $c f g$ or dcd or xtc or xyz or local or custom are discussed on the dump doc page)   
• $\Nu=$ dump every this many timesteps   
• file.h5 $=$ name of file to write to   
• args $=$ position options or image or velocity options or force options or species options or file_from ID or box value or create_group value or author value $=$ list of data elements to dump, with their dump “sub-intervals” position options image velocity options force options species options file_from $\mathrm{ID}=\mathrm{do}$ not open a new file, re-use the already opened file from dump ID box value $\mathbf{\mu}=\mathbf{y}\mathbf{es}$ or no create_group value $=$ yes or no author value $=$ quoted string  

Note that at least one element must be specified and that image may only be present if position is specified first.  

For the elements position, velocity, force and species, a sub-interval may be specified to write the data only every N_element iterations of the dump (i.e. every $\mathbf{N}^{*}\mathbf{N}_{-}$ _element time steps). This is specified by this option directly following the element declaration:  

options $=$ every N_element  

# 9.14.2 Examples  

<html><body><table><tr><td>dump h5md1 all h5md 100 dump h5md.h5 position</td></tr><tr><td>image</td></tr><tr><td>dump h5md1 all h5md 100 dump h5md.h5 position velocity every 10 dump h5md1 all h5md 100 dump.</td></tr><tr><td>h5md.h5 velocity author "John Doe"</td></tr></table></body></html>  

# 9.14.3 Description  

Dump a snapshot of atom coordinates every N timesteps in the HDF5 based H5MD file format (de Buyl). HDF5 files are binary, portable and self-describing. This dump style will write only one file, on the root node.  

Several dumps may write to the same file, by using file_from and referring to a previously defined dump. Several groups may also be stored within the same file by defining several dumps. A dump that refers (via file_from) to an already open dump ID and that concerns another particle group must specify create_group yes.  

Each data element is written every $\mathsf{N}^{*}\mathsf{N}$ _element steps. For image, no sub-interval is needed as it must be present at the same interval as position. image must be given after position in any case. The box information (edges in each dimension) is stored at the same interval than the position element, if present. Else it is stored every N steps.  

![](images/bb7c8ac11c901b5b8b6ed60971648373c0b1037f368ea263b2ef28520eb03707.jpg)  

# Note  

Because periodic boundary conditions are enforced only on timesteps when neighbor lists are rebuilt, the coordinates of an atom written to a dump file may be slightly outside the simulation box.  

# Use from write_dump:  

It is possible to use this dump style with the write_dump command. In this case, the sub-intervals must not be set at all. The write_dump command can be used either to create a new file or to add current data to an existing dump file by using the file_from keyword.  

Typically, the species data is fixed. The following two commands store the position data every 100 timesteps, with the image data, and store once the species data in the same file.  

dump h5md1 all h5md 100 dump.h5 position image write_dump all h5md dump.h5 file_from h5md1 species  

# 9.14.4 Restrictions  

The number of atoms per snapshot cannot change with the h5md style. The position data is stored wrapped (box boundaries not enforced, see note above). Only orthogonal domains are currently supported. This is a limitation of the present dump h5md command and not of H5MD itself.  

The h5md dump style is part of the H5MD package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info. It also requires (i) building the ch5md library provided with LAMMPS (See the Build package page for more info.) and (ii) having the HDF5 library installed (C bindings are sufficient) on your system. The library ch5md is compiled with the h5cc wrapper provided by the HDF5 library.  

# 9.14.5 Related commands  

dump, dump_modify, undump  

(de Buyl) de Buyl, Colberg and Hofling, H5MD: A structured, efficient, and portable file format for molecular data, Comp. Phys. Comm. 185(6), 1546-1553 (2014) - [arXiv:1308.6382].  

# 9.15 dump image command  

# 9.16 dump movie command  

(see below for dump_modify options specific to dump image/movie)  

# 9.15. dump image command  

# 9.16.1 Syntax  

dump ID group-ID style N file color diameter keyword value ... $\mathrm{ID}=$ user-assigned name for the dump group- $\cdot\mathrm{ID}=\mathrm{ID}$ of the group of atoms to be imaged style $=$ image or movie $=$ style of dump command (other styles such as atom or cfg or dcd or xtc or custom are discussed on the dump doc page) $\Nu=$ dump every this many timesteps file $=$ name of file to write image to color $=$ atom attribute that determines color of each atom diameter $=$ atom attribute that determines size of each atom zero or more keyword/value pairs may be appended keyword $=$ atom or adiam or bond or grid or line or tri or body or fix or size or view or center o box or axes or subbox or shiny or fsaa or ssao $\mathrm{atom}=\mathrm{yes}$ or $\mathrm{no}=\mathrm{do}$ or do not draw atoms adiam size $=$ numeric value for atom diameter (distance units) bond values $=$ color width $=$ color and width of bonds color $=$ atom or type or none width $-$ number or atom or type or none number = numeric value for bond width (distance units) grid = per-grid value to use when coloring each grid cell per-grid value = c_ID:gname:dname, c_ID:gname:dname[I], f_ID:gname:dname, f_ $\hookrightarrow$ ID:gname:dname[I] gname = name of grid defined by compute or fix dname = name of data field defined by compute or fix c_ID = per-grid vector calculated by a compute with ID $\mathrm{c\_ID[I]=Ith}$ column of per-grid array calculated by a compute with ID f_ID = per-grid vector calculated by a fix with ID $\mathrm{f\_ID[I]=Ith}$ column of per-grid array calculated by a fix with ID line = color width color = type width = numeric value for line width (distance units) $\mathrm{tri}=\mathrm{color}$ tflag width color = type $\mathrm{tflag}=1$ for just triangle, 2 for just tri edges, 3 for both width = numeric value for tringle edge width (distance units) body $^-$ color bflag1 bflag2 color = type bflag1,bflag2 = 2 numeric flags to affect how bodies are drawn $\mathrm{fix=fixID}$ color fflag1 fflag2 fixID = ID of fix that generates objects to draw $\mathrm{color}=\mathrm{type}$ fflag1,fflag2 = 2 numeric flags to affect how fix objects are drawn size values = width height = size of images width $=$ width of image in # of pixels height $=$ height of image in # of pixels view values $=$ theta phi = view of simulation box theta $=$ view angle from $+\mathbf{Z}$ axis (degrees) phi = azimuthal view angle (degrees)  

theta or phi can be a variable (see below)   
center values = flag Cx Cy Cz = center point of image flag = s for static, d for dynamic Cx,Cy,Cz = center point of image as fraction of box dimension (0.5 = center of box) Cx,Cy,Cz can be variables (see below)   
up values = Ux Uy Uz = direction that is "up" in image Ux,Uy,Uz = components of up vector Ux,Uy,Uz can be variables (see below)   
zoom value = zfactor = size that simulation box appears in image zfactor = scale image size by factor $>1$ to enlarge, factor $<1$ to shrink zfactor can be a variable (see below)   
box values = yes/no diam = draw outline of simulation box yes/no = do or do not draw simulation box lines diam = diameter of box lines as fraction of shortest box length   
axes values = axes length diam = draw xyz axes $\mathrm{axes}=\mathrm{yes}$ or $\mathrm{no}=\mathrm{do}$ or do not draw xyz axes lines next to simulation box length = length of axes lines as fraction of respective box lengths diam = diameter of axes lines as fraction of shortest box length   
subbox values = lines diam = draw outline of processor subdomains lines = yes or no = do or do not draw subdomain lines diam $-$ diameter of subdomain lines as fraction of shortest box length   
shiny value = sfactor = shinyness of spheres and cylinders sfactor $-$ shinyness of spheres and cylinders from 0.0 to 1.0   
fsaa $\mathrm{arg=yes/no}$ $\mathrm{yes/no=do}$ or do not apply anti-aliasing   
ssao value = shading seed dfactor = SSAO depth shading shading $=$ yes or no = turn depth shading on/off seed $=$ random $\#$ seed (positive integer) dfactor $=$ strength of shading from 0.0 to 1.0  

# 9.17 dump_modify options for dump image/movie  

# 9.17.1 Syntax  

dump_modify dump-ID keyword values ...  

• these keywords apply only to the image and movie styles and are documented on this page   
• keyword $=$ acolor or adiam or amap or gmap or backcolor or bcolor or bdiam or bitrate or boxcolor or col   
framerate or gmap   
• see the dump modify doc page for more general keywords acolor args $=$ type color type $=$ atom type (numeric or type label) or range of numeric types (see below) color $=$ name of color or color1/color2/... adiam args $=$ type diam type $=$ atom type (numeric or type label) or range of numeric types (see below) diam = diameter of atoms of that type (distance units) amap $\mathrm{args}=\mathrm{lo}$ hi style delta N entry1 entry2 ... entryN lo $-$ number or min = lower bound of range of color map hi = number or max $=$ upper bound of range of color map style = 2 letters = c or d or s plus a or f c for continuous d for discrete  

s for sequential a for absolute f for fractional delta $-$ binsize (only used for style s, otherwise ignored) binsize $-$ range is divided into bins of this width $\Nu=\#$ of subsequent entries entry = value color (for continuous style) value = number or min or max = single value within range color = name of color used for that value entry = lo hi color (for discrete style) lo/hi = number or min or max = lower/upper bound of subset of range color $-$ name of color used for that subset of values entry = color (for sequential style) color $-$ name of color used for a bin of values backcolor arg = color color = name of color for background bcolor args = type color type = bond type (numeric or type label) or range of numeric types (see below) color = name of color or color1/color2/... bdiam args = type diam type = bond type (numeric or type label) or range of numeric types (see below) diam = diameter of bonds of that type (distance units) bitrate arg = rate rate = target bitrate for movie in kbps boxcolor arg = color color = name of color for simulation box lines and processor subdomain lines color args $-$ name R G B name = name of color R,G,B = red/green/blue numeric values from 0.0 to 1.0 framerate $\mathrm{arg}=\mathrm{fps}$ fps $=$ frames per second for movie gmap args $=$ identical to amap args  

# 9.17.2 Examples  

dump d0 all image 100 dump.\*.jpg type type   
dump d1 mobile image 500 snap.\*.png element element ssao yes 4539 0.6   
dump d2 all image 200 img-\*.ppm type type zoom 2.5 adiam 1.5 size 1280 720   
dump m0 all movie 1000 movie.mpg type type size 640 480   
dump m1 all movie 1000 movie.avi type type size 640 480   
dump m2 all movie 100 movie.m4v type type zoom 1.8 adiam v_value size 1280 720   
dump_modify 1 amap min max cf $\mathrm{0.03min}$ green 0.5 yellow max blue boxcolor red   
labelmap atom 1 C 2 H 3 O 4 N   
dump_modify 1 acolor C gray acolor H white acolor O red acolor N blue  

# 9.17.3 Description  

Dump a high-quality rendered image of the atom configuration every $N$ timesteps and save the images either as a sequence of JPEG or PNG or PPM files, or as a single movie file. The options for this command as well as the dump_modify command control what is included in the image or movie and how it appears. A series of such images can easily be manually converted into an animated movie of your simulation or the process can be automated without writing the intermediate files using the dump movie style; see further details below. Other dump styles store snapshots of numerical data associated with atoms in various formats, as discussed on the dump doc page.  

Note that a set of images or a movie can be made after a simulation has been run, using the rerun command to read snapshots from an existing dump file, and using these dump commands in the rerun script to generate the images/movie.  

Here are two sample images, rendered as $1024\times1024$ JPEG files.  

![](images/38ee10ac268cea8ec704b93655b8c69d5b91130c3bfce7aeda2e0969c252331c.jpg)  

Only atoms in the specified group are rendered in the image. The dump_modify region and thresh commands can also alter what atoms are included in the image. The filename suffix determines whether a JPEG, PNG, or PPM file is created with the image dump style. If the suffix is “.jpg” or “.jpeg”, then a JPEG format file is created, if the suffix is “.png”, then a PNG format is created, else a PPM (aka NETPBM) format file is created. The JPEG and PNG files are binary; PPM has a text mode header followed by binary data. JPEG images have lossy compression, PNG has lossless compression, and PPM files are uncompressed but can be compressed with gzip, if LAMMPS has been compiled with -DLAMMPS_GZIP and a “.gz” suffix is used.  

Similarly, the format of the resulting movie is chosen with the movie dump style. This is handled by the underlying FFmpeg converter and thus details have to be looked up in the FFmpeg documentation. Typical examples are: .avi, .mpg, .m4v, .mp4, .mkv, .flv, .mov, .gif Additional settings of the movie compression like bitrate and framerate can be set using the dump_modify command as described below.  

To write out JPEG and PNG format files, you must build LAMMPS with support for the corresponding JPEG or PNG library. To convert images into movies, LAMMPS has to be compiled with the -DLAMMPS_FFMPEG flag. See the Build settings page for details.  

# Note  

Because periodic boundary conditions are enforced only on timesteps when neighbor lists are rebuilt, the coordinates of an atom in the image may be slightly outside the simulation box.  

Dumps are performed on timesteps that are a multiple of $N$ (including timestep 0) and on the last timestep of a minimization if the minimization converges. Note that this means a dump will not be performed on the initial timestep after the dump command is invoked, if the current timestep is not a multiple of $N$ . This behavior can be changed via the dump_modify first command, which can be useful if the dump command is invoked after a minimization ended on an arbitrary timestep. $N$ can be changed between runs by using the dump_modify every command.  

Dump image filenames must contain a wildcard character “\*” so that one image file per snapshot is written. The “\*” character is replaced with the timestep value. For example, tmp.dump.\*.jpg becomes tmp.dump.0.jpg, tmp.dump.10000.jpg, tmp.dump.20000.jpg, etc. Note that the dump_modify pad command can be used to ensure all timestep numbers are the same length (e.g., 00010), which can make it easier to convert a series of images into a movie in the correct ordering.  

Dump movie filenames on the other hand, must not have any wildcard character since only one file combining all images into a single movie will be written by the movie encoder.  

The color and diameter settings determine the color and size of atoms rendered in the image. They can be any atom attribute defined for the dump custom command, including type and element. This includes per-atom quantities calculated by a compute, $f\boldsymbol{{x}}$ , or variable, which are prefixed by “c_”, “f_”, or “v_”, respectively. Note that the diameter setting can be overridden with a numeric value applied to all atoms by the optional adiam keyword.  

If type is specified for the color setting, then the color of each atom is determined by its atom type. By default the mapping of types to colors is as follows:  

• type $1=$ red • type $2=$ green • type $3=$ blue • type $4=$ yellow • type $5=$ aqua • type $6={\mathrm{cyan}}$  

and repeats itself for types $>6$ . This mapping can be changed by the “dump_modify acolor” command, as described below.  

If type is specified for the diameter setting then the diameter of each atom is determined by its atom type. By default all types have diameter 1.0. This mapping can be changed by the “dump_modify adiam” command, as described below.  

If element is specified for the color and/or diameter setting, then the color and/or diameter of each atom is determined by which element it is, which in turn is specified by the element-to-type mapping specified by the “dump_modify element” command, as described below. By default every atom type is C (carbon). Every element has a color and diameter associated with it, which is the same as the colors and sizes used by the AtomEye visualization package.  

If other atom attributes are used for the color or diameter settings, they are interpreted in the following way.  

If “vx”, for example, is used as the color setting, then the color of the atom will depend on the $\mathbf{X}$ -component of its velocity. The association of a per-atom value with a specific color is determined by a “color map”, which can be specified via the dump_modify amap command, as described below. The basic idea is that the atom-attribute will be within a range of values, and every value within the range is mapped to a specific color. Depending on how the color map is defined, that mapping can take place via interpolation so that a value of -3.2 is halfway between “red” and “blue”, or discretely so that the value of -3.2 is “orange”.  

If “vx”, for example, is used as the diameter setting, then the atom will be rendered using the x-component of its velocity as the diameter. If the per-atom value $<=0.0$ , them the atom will not be drawn. Note that finite-size spherical particles, as defined by atom_style sphere define a per-particle radius or diameter, which can be used as the diameter setting.  

The various keywords listed above control how the image is rendered. As listed below, all of the keywords have defaults, most of which you will likely not need to change. As described below, the dump modify command also has options specific to the dump image style, particularly for assigning colors to atoms, bonds, and other image features.  

The atom keyword allow you to turn off the drawing of all atoms, if the specified value is no. Note that this will not turn off the drawing of particles that are represented as lines, triangles, or bodies, as discussed below. These particles can be drawn separately if the line, tri, or body keywords are used.  

The adiam keyword allows you to override the diameter setting to set a single numeric size. All atoms will be drawn with that diameter, e.g. 1.5, which is in whatever distance units the input script defines, e.g. Angstroms.  

The bond keyword allows to you to alter how bonds are drawn. A bond is only drawn if both atoms in the bond are being drawn due to being in the specified group and due to other selection criteria (e.g. region, threshold settings of the dump_modify command). By default, bonds are drawn if they are defined in the input data file as read by the read_data command. Using none for both the bond color and width value will turn off the drawing of all bonds.  

If atom is specified for the bond color value, then each bond is drawn in 2 halves, with the color of each half being the color of the atom at that end of the bond.  

If type is specified for the color value, then the color of each bond is determined by its bond type. By default the mapping of bond types to colors is as follows:  

• type $1=$ red • type $2=$ green • type $3=$ blue • type $4=$ yellow • type $5=$ aqua • type $6={\mathrm{cyan}}$  

and repeats itself for bond types $>6$ . This mapping can be changed by the “dump_modify bcolor” command, as described below.  

The bond width value can be a numeric value or atom or type (or none as indicated above).  

If a numeric value is specified, then all bonds will be drawn as cylinders with that diameter, e.g. 1.0, which is in whatever distance units the input script defines, e.g. Angstroms.  

If atom is specified for the width value, then each bond will be drawn with a width corresponding to the minimum diameter of the two atoms in the bond.  

If type is specified for the width value then the diameter of each bond is determined by its bond type. By default all types have diameter 0.5. This mapping can be changed by the “dump_modify bdiam” command, as described below.  

The line keyword can be used when atom_style line is used to define particles as line segments, and will draw them as lines. If this keyword is not used, such particles will be drawn as spheres, the same as if they were regular atoms. The only setting currently allowed for the color value is type, which will color the lines according to the atom type of the particle. By default the mapping of types to colors is as follows:  

• type $1=$ red • type $2=$ green • type $3=$ blue • type $4=$ yellow • type $5=$ aqua • type $6=$ cyan  

and repeats itself for types $>6$ . There is not yet an option to change this via the dump_modify command.  

The line width can only be a numeric value, which specifies that all lines will be drawn as cylinders with that diameter, e.g. 1.0, which is in whatever distance units the input script defines, e.g. Angstroms.  

The tri keyword can be used when atom_style tri is used to define particles as triangles, and will draw them as triangles or edges (3 lines) or both, depending on the setting for tflag. If edges are drawn, the width setting determines the diameters of the line segments. If this keyword is not used, triangle particles will be drawn as spheres, the same as if they were regular atoms. The only setting currently allowed for the color value is type, which will color the triangles according to the atom type of the particle. By default the mapping of types to colors is as follows:  

• type $1=$ red • type $2=$ green • type $3=$ blue • type $4=$ yellow • type $5=$ aqua • type $6=$ cyan  

and repeats itself for types $>6$ . There is not yet an option to change this via the dump_modify command.  

The body keyword can be used when atom_style body is used to define body particles with internal state (e.g. subparticles), and will drawn them in a manner specific to the body style. If this keyword is not used, such particles will be drawn as spheres, the same as if they were regular atoms.  

The Howto body page describes the body styles LAMMPS currently supports, and provides more details as to the kind of body particles they represent and how they are drawn by this dump image command. For all the body styles, individual atoms can be either a body particle or a usual point (non-body) particle. Non-body particles will be drawn the same way they would be as a regular atom. The bflag1 and bflag2 settings are numerical values which are passed to the body style to affect how the drawing of a body particle is done. See the Howto body page for a description of what these parameters mean for each body style.  

The only setting currently allowed for the color value is type, which will color the body particles according to the atom type of the particle. By default the mapping of types to colors is as follows:  

• type $1=$ red • type $2=$ green • type $3=$ blue • type $4=$ yellow • type $5=$ aqua • type $6=$ cyan  

and repeats itself for types $>6$ . There is not yet an option to change this via the dump_modify command.  

The fix keyword can be used with a $f\boldsymbol{a}\boldsymbol{x}$ that produces objects to be drawn.  

The fflag1 and fflag2 settings are numerical values which are passed to the fix to affect how the drawing of its objects is done. See the individual fix page for a description of what these parameters mean for a particular fix.  

The only setting currently allowed for the color value is type, which will color the fix objects according to their type By default the mapping of types to colors is as follows:  

• type $1=$ red • type $2=$ green • type $3=$ blue • type $4=$ yellow • type $5=$ aqua • type $6={\mathrm{cyan}}$  

and repeats itself for types $>6$ . There is not yet an option to change this via the dump_modify command.  

The size keyword sets the width and height of the created images, i.e. the number of pixels in each direction.  

The view, center, up, and zoom values determine how 3d simulation space is mapped to the 2d plane of the image.   
Basically they control how the simulation box appears in the image.  

All of the view, center, up, and zoom values can be specified as numeric quantities, whose meaning is explained below. Any of them can also be specified as an equal-style variable, by using v_name as the value, where “name” is the variable name. In this case the variable will be evaluated on the timestep each image is created to create a new value. If the equal-style variable is time-dependent, this is a means of changing the way the simulation box appears from image to image, effectively doing a pan or fly-by view of your simulation.  

The view keyword determines the viewpoint from which the simulation box is viewed, looking towards the center point. The theta value is the vertical angle from the ${+\mathbf{Z}}$ axis, and must be an angle from 0 to 180 degrees. The phi value is an azimuthal angle around the z axis and can be positive or negative. A value of 0.0 is a view along the $+\mathbf{X}$ axis, towards the center point. If theta or $p h i$ are specified via variables, then the variable values should be in degrees.  

The center keyword determines the point in simulation space that will be at the center of the image. $C x,C y$ , and $C z$ are specified as fractions of the box dimensions, so that (0.5,0.5,0.5) is the center of the simulation box. These values do not have to be between 0.0 and 1.0, if you want the simulation box to be offset from the center of the image. Note, however, that if you choose strange values for $C x,C y$ , or $C z$ you may get a blank image. Internally, $C x,C y$ , and $C z$ are converted into a point in simulation space. If flag is set to “s” for static, then this conversion is done once, at the time the dump command is issued. If flag is set to “d” for dynamic then the conversion is performed every time a new image is created. If the box size or shape is changing, this will adjust the center point in simulation space.  

The up keyword determines what direction in simulation space will be “up” in the image. Internally it is stored as a vector that is in the plane perpendicular to the view vector implied by the theta and pni values, and which is also in the plane defined by the view vector and user-specified up vector. Thus this internal vector is computed from the user-specified up vector as  

up_internal $=$ view cross (up cross view)  

This means the only restriction on the specified $u p$ vector is that it cannot be parallel to the view vector, implied by the theta and phi values.  

The zoom keyword scales the size of the simulation box as it appears in the image. The default zfactor value of 1 should display an image mostly filled by the atoms in the simulation box. A zfactor $>1$ will make the simulation box larger; a zfactor $<1$ will make it smaller. Zfactor must be a value $>0.0$ .  

The box keyword determines if and how the simulation box boundaries are rendered as thin cylinders in the image. If no is set, then the box boundaries are not drawn and the diam setting is ignored. If yes is set, the 12 edges of the box are drawn, with a diameter that is a fraction of the shortest box length in x,y,z (for 3d) or x,y (for 2d). The color of the box boundaries can be set with the “dump_modify boxcolor” command.  

The axes keyword determines if and how the coordinate axes are rendered as thin cylinders in the image. If no is set, then the axes are not drawn and the length and diam settings are ignored. If yes is set, 3 thin cylinders are drawn to represent the x,y,z axes in colors red,green,blue. The origin of these cylinders will be offset from the lower left corner of the box by $10\%$ . The length setting determines how long the cylinders will be as a fraction of the respective box lengths. The diam setting determines their thickness as a fraction of the shortest box length in x,y,z (for 3d) or x,y (for 2d).  

The subbox keyword determines if and how processor subdomain boundaries are rendered as thin cylinders in the image. If no is set (default), then the subdomain boundaries are not drawn and the diam setting is ignored. If yes is set, the 12 edges of each processor subdomain are drawn, with a diameter that is a fraction of the shortest box length in x,y,z (for 3d) or x,y (for 2d). The color of the subdomain boundaries can be set with the “dump_modify boxcolor” command.  

The shiny keyword determines how shiny the objects rendered in the image will appear. The sfactor value must be a value $0.0<=$ sfactor $<=1.0$ , where sfactor $=1$ is a highly reflective surface and sfactor $=0$ is a rough non-shiny surface.  

Added in version 21Nov2023.  

The fsaa keyword can be used with the dump image command to improve the image quality by enabling full scene anti-aliasing. Internally the image is rendered at twice the width and height and then scaled down by computing the average of each $2\mathrm{x}2$ block of pixels to produce a single pixel in the final image at the original size. This produces images with smoother, less ragged edges. The application of this algorithm can increase the cost of computing the image by about $3\mathbf{x}$ or more.  

The ssao keyword turns on/off a screen space ambient occlusion (SSAO) model for depth shading. If yes is set, then atoms further away from the viewer are darkened via a randomized process, which is perceived as depth. The strength of the effect can be scaled by the dfactor parameter. If no is set, no depth shading is performed. The calculation of this effect can increase the cost of computing the image substantially by $\operatorname{5x}$ or more, especially with larger images. When used in combination with the fsaa keyword the computational cost of depth shading is particularly large.  

# 9.17.4 Image Quality Settings  

The two keywords fsaa and ssao can be used to improve the image quality at the expense of additional computational cost to render the images. The images below show from left to right the same render with default settings, with fsaa added, with ssao added, and with both keywords added.  

![](images/575b84c88edd47b1bf2b1c111125ec5b87c2580aa298821f59ccfb357a5cd8d7.jpg)  

A series of JPEG, PNG, or PPM images can be converted into a movie file and then played as a movie using commonly available tools. Using dump style movie automates this step and avoids the intermediate step of writing (many) image snapshot file. But LAMMPS has to be compiled with -DLAMMPS_FFMPEG and an FFmpeg executable have to be installed.  

To manually convert JPEG, PNG or PPM files into an animated GIF or MPEG or other movie file you can use:  

a) Use the ImageMagick convert program.  

<html><body><table><tr><td>convert *.jpg foo.gif</td></tr><tr><td>convert -loop 1 *.ppm foo.mpg</td></tr><tr><td></td></tr></table></body></html>  

Animated GIF files from ImageMagick are not optimized. You can use a program like gifsicle to optimize and thus massively shrink them. MPEG files created by ImageMagick are in MPEG-1 format with a rather inefficient compression and low quality compared to more modern compression styles like MPEG-4, H.264, VP8, VP9, H.265 and so on.  

b) Use QuickTime.  

Select “Open Image Sequence” under the File menu Load the images into QuickTime to animate them Select “Export” under the File menu Save the movie as a QuickTime movie (\*.mov) or in another format. QuickTime can generate very high quality and efficiently compressed movie files. Some of the supported formats require to buy a license and some are not readable on all platforms until specific runtime libraries are installed.  

c) Use FFmpeg  

FFmpeg is a command-line tool that is available on many platforms and allows extremely flexible encoding and decoding of movies.  

cat snap.\*.jpg | ffmpeg -y -f image2pipe -c:v mjpeg -i - -b:v 2000k movie.m4v cat snap.\*.ppm | ffmpeg -y -f image2pipe -c:v ppm -i - -b:v 2400k movie.avi  

Front ends for FFmpeg exist for multiple platforms. For more information see the FFmpeg homepage  

Play the movie:  

• a) Use your browser to view an animated GIF movie. Select “Open File” under the File menu Load the animated GIF file   
• b) Use the freely available mplayer or ffplay tool to view a movie. Both are available for multiple OSes and support a large variety of file formats and decoders.  

mplayer foo.mpg ffplay bar.avi  

• c) Use the Pizza.py animate tool, which works directly on a series of image files.  

a = animate("foo\*.jpg")  

• d) QuickTime and other Windows- or macOS-based media players can obviously play movie files directly. Similarly for corresponding tools bundled with Linux desktop environments. However, due to licensing issues with some file formats, the formats may require installing additional libraries, purchasing a license, or may not be supported.  

# 9.17.5 Dump_modify keywords for dump image and dump movie  

The following dump_modify keywords apply only to the dump image and dump movie styles. Any keyword that works with dump image also works with dump movie, since the movie is simply a collection of images. Some of the keywords only affect the dump movie style. The descriptions give details.  

The acolor keyword can be used with the dump image command, when its atom color setting is type, to set the color that atoms of each type will be drawn in the image.  

The specified type should be a type label or integer from 1 to Ntypes $=$ the number of atom types. For numeric types, a wildcard asterisk can be used in place of or in conjunction with the type argument to specify a range of atom types. This takes the form “\*” or $\mathbf{\overline{{\Omega}}^{6*}\mathbf{\overline{{\Omega}}\mathbf{n}}^{,,}}$ or “n\*” or $\overline{{\mathbf{\omega}}}_{\mathrm{m}}^{*}\mathfrak{n}^{,}$ . If $\Nu=$ the number of atom types, then an asterisk with no numeric values means all types from 1 to N. A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to N (inclusive). A middle asterisk means all types from m to n (inclusive).  

The specified color can be a single color which is any of the 140 pre-defined colors (see below) or a color name defined by the “dump_modify color” command, as described below. Or it can be two or more colors separated by a “/” character, e.g. red/green/blue. In the former case, that color is assigned to all the specified atom types. In the latter case, the list of colors are assigned in a round-robin fashion to each of the specified atom types.  

The adiam keyword can be used with the dump image command, when its atom diameter setting is type, to set the size that atoms of each type will be drawn in the image. The specified type should be a type label or integer from 1 to Ntypes. As with the acolor keyword, a wildcard asterisk can be used as part of the type argument to specify a range of numeric atom types. The specified diam is the size in whatever distance units the input script is using, e.g. Angstroms.  

The amap keyword can be used with the dump image command, with its atom keyword, when its atom setting is an atom-attribute, to setup a color map. The color map is used to assign a specific RGB (red/green/blue) color value to an individual atom when it is drawn, based on the atom’s attribute, which is a numeric value, e.g. its $\mathbf{X}$ -component of velocity if the atom-attribute “vx” was specified.  

The basic idea of a color map is that the atom-attribute will be within a range of values, and that range is associated with a series of colors (e.g. red, blue, green). An atom’s specific value $\mathbf{\nabla}_{\mathrm{VX}}=-3.2\$ ) can then mapped to the series of colors (e.g. halfway between red and blue), and a specific color is determined via an interpolation procedure.  

There are many possible options for the color map, enabled by the amap keyword. Here are the details.  

The lo and hi settings determine the range of values allowed for the atom attribute. If numeric values are used for lo and/or hi, then values that are lower/higher than that value are set to the value. I.e. the range is static. If lo is specified as min or hi as max then the range is dynamic, and the lower and/or upper bound will be calculated each time an image is drawn, based on the set of atoms being visualized.  

The style setting is two letters, such as “ca”. The first letter is either “c” for continuous, “d” for discrete, or “s” for sequential. The second letter is either “a” for absolute, or “f” for fractional.  

A continuous color map is one in which the color changes continuously from value to value within the range. A discrete color map is one in which discrete colors are assigned to sub-ranges of values within the range. A sequential color map is one in which discrete colors are assigned to a sequence of sub-ranges of values covering the entire range.  

An absolute color map is one in which the values to which colors are assigned are specified explicitly as values within the range. A fractional color map is one in which the values to which colors are assigned are specified as a fractional portion of the range. For example if the range is from -10.0 to 10.0, and the color red is to be assigned to atoms with a value of 5.0, then for an absolute color map the number 5.0 would be used. But for a fractional map, the number 0.75 would be used since 5.0 is $3/4$ of the way from -10.0 to 10.0.  

The delta setting must be specified for all styles, but is only used for the sequential style; otherwise the value is ignored. It specifies the bin size to use within the range for assigning consecutive colors to. For example, if the range is from $-10.0$ to 10.0 and a delta of 1.0 is used, then 20 colors will be assigned to the range. The first will be from $-10.0\leq$ color1 $<-9.0$ , then second from $-9.0\leq c o l o r2<-8.0$ , etc.  

The $N$ setting is how many entries follow. The format of the entries depends on whether the color map style is continuous, discrete or sequential. In all cases the color setting can be any of the 140 pre-defined colors (see below) or a color name defined by the dump_modify color option.  

For continuous color maps, each entry has a value and a color. The value is either a number within the range of values or min or max. The value of the first entry must be min and the value of the last entry must be max. Any entries in between must have increasing values. Note that numeric values can be specified either as absolute numbers or as fractions (0.0 to 1.0) of the range, depending on the “a” or “f” in the style setting for the color map.  

Here is how the entries are used to determine the color of an individual atom, given the value $X$ of its atom attribute. $X$ will fall between 2 of the entry values. The color of the atom is linearly interpolated (in each of the RGB values) between the 2 colors associated with those entries. For example, if $X=-5.0$ and the two surrounding entries are “red” at $-10.0$ and “blue” at 0.0, then the atom’s color will be halfway between “red” and “blue”, which happens to be “purple”.  

For discrete color maps, each entry has a lo and hi value and a color. The lo and $h i$ settings are either numbers within the range of values or lo can be min or hi can be max. The $l o$ and hi settings of the last entry must be min and max. Other entries can have any $l o$ and hi values and the sub-ranges of different values can overlap. Note that numeric lo and hi values can be specified either as absolute numbers or as fractions (0.0 to 1.0) of the range, depending on the “a” or “f” in the style setting for the color map.  

Here is how the entries are used to determine the color of an individual atom, given the value $\mathrm{X}$ of its atom attribute. The entries are scanned from first to last. The first time that $l o\mathrm{~}<=\mathrm{X}\mathrm{~}<=h i$ , X is assigned the color associated with that entry. You can think of the last entry as assigning a default color (since it will always be matched by X), and the earlier entries as colors that override the default. Also note that no interpolation of a color RGB is done. All atoms will be drawn with one of the colors in the list of entries.  

For sequential color maps, each entry has only a color. Here is how the entries are used to determine the color of an individual atom, given the value X of its atom attribute. The range is partitioned into N bins of width binsize. Thus X will fall in a specific bin from 1 to N, say the Mth bin. If it falls on a boundary between 2 bins, it is considered to be in the higher of the 2 bins. Each bin is assigned a color from the E entries. If $\mathrm{E}<\mathrm{N}.$ , then the colors are repeated. For example if 2 entries with colors red and green are specified, then the odd numbered bins will be red and the even bins green. The color of the atom is the color of its bin. Note that the sequential color map is really a shorthand way of defining a discrete color map without having to specify where all the bin boundaries are.  

Here is an example of using a sequential color map to color all the atoms in individual molecules with a different color.   
See the examples/pour/in.pour.2d.molecule input script for an example of how this is used.  

<html><body><table><tr><td>variable</td><td>colors string X</td></tr><tr><td>variable</td><td>"red green blue yellow white purple pink orange lime gray</td></tr><tr><td>mol a</td><td>atom mol%10</td></tr><tr><td>dump</td><td>1 all i image 250 i image.*.jpg v_mol type &</td></tr><tr><td>dump_modify</td><td>zoom 1.6 adiam 1.5 0 0 10 sa 1 10 ${colors}</td></tr><tr><td colspan="2">1 pad 5 amap</td></tr></table></body></html>  

In this case, 10 colors are defined, and molecule IDs are mapped to one of the colors, even if there are 1000s of molecules.  

The backcolor sets the background color of the images. The color name can be any of the 140 pre-defined colors (see below) or a color name defined by the dump_modify color option.  

The bcolor keyword can be used with the dump image command, with its bond keyword, when its color setting is type, to set the color that bonds of each type will be drawn in the image.  

The specified type should be a type label or integer from 1 to $N$ , where $N$ is the number of bond types. For numeric types, a wildcard asterisk can be used in place of or in conjunction with the type argument to specify a range of bond types. This takes the form “\*” or $\mathbf{\overline{{\Omega}}^{6*}\mathbf{\overline{{\Omega}}\mathbf{n}}^{,,}}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\flat}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the number of bond types, then an asterisk with no numerical values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

The specified color can be a single color which is any of the 140 pre-defined colors (see below) or a color name defined by the dump_modify color option. Or it can be two or more colors separated by a “/” character (e.g., red/green/blue). In the former case, that color is assigned to all the specified bond types. In the latter case, the list of colors are assigned in a round-robin fashion to each of the specified bond types.  

The bdiam keyword can be used with the dump image command, with its bond keyword, when its diam setting is type, to set the diameter that bonds of each type will be drawn in the image. The specified type should be a type label or integer from 1 to Nbondtypes. As with the bcolor keyword, a wildcard asterisk can be used as part of the type argument to specify a range of numeric bond types. The specified diam is the size in whatever distance units you are using (e.g., Angstroms).  

The bitrate keyword can be used with the dump movie command to define the size of the resulting movie file and its quality via setting how many kbits per second are to be used for the movie file. Higher bitrates require less compression and will result in higher quality movies. The quality is also determined by the compression format and encoder. The default setting is 2000 kbit/s, which will result in average quality with older compression formats.  

# Note  

Not all movie file formats supported by dump movie allow the bitrate to be set. If not, the setting is silently ignored.  

The boxcolor keyword sets the color of the simulation box drawn around the atoms in each image as well as the color of processor subdomain boundaries. See the “dump image box” command for how to specify that a box be drawn via the box keyword, and the subdomain boundaries via the subbox keyword. The color name can be any of the 140 pre-defined colors (see below) or a color name defined by the dump_modify color option.  

The color keyword allows definition of a new color name, in addition to the 140-predefined colors (see below), and associates three red/green/blue RGB values with that color name. The color name can then be used with any other dump_modify keyword that takes a color name as a value. The RGB values should each be floating point values between 0.0 and 1.0 inclusive.  

When a color name is converted to RGB values, the user-defined color names are searched first, then the 140 pre-defined color names. This means you can also use the color keyword to overwrite one of the pre-defined color names with new RBG values.  

The framerate keyword can be used with the dump movie command to define the duration of the resulting movie file. Movie files written by the dump movie command have a default frame rate of 24 frames per second and the images generated will be converted at that rate. Thus a sequence of 1000 dump images will result in a movie of about 42 seconds. To make a movie run longer you can either generate images more frequently or lower the frame rate. To speed a movie up, you can do the inverse. Using a frame rate higher than 24 is not recommended, as it will result in simply dropping the rendered images. It is more efficient to dump images less frequently.  

The gmap keyword can be used with the dump image command, with its grid keyword, to setup a color map. The color map is used to assign a specific RGB (red/green/blue) color value to an individual grid cell when it is drawn, based on the grid cell value, which is a numeric quantity specified with the grid keyword.  

The arguments for the gmap keyword are identical to those for the amap keyword (for atom coloring) described above.  

# 9.17.6 Restrictions  

To write JPEG images, you must use the -DLAMMPS_JPEG switch when building LAMMPS and link with a JPEG library. To write PNG images, you must use the -DLAMMPS_PNG switch when building LAMMPS and link with a PNG library.  

To write movie dumps, you must use the -DLAMMPS_FFMPEG switch when building LAMMPS and have the FFmpeg executable available on the machine where LAMMPS is being run. Typically its name is lowercase (i.e., “ffmpeg”).  

See the Build settings page for details.  

Note that since FFmpeg is run as an external program via a pipe, LAMMPS has limited control over its execution and no knowledge about errors and warnings printed by it. Those warnings and error messages will be printed to the screen only. Due to the way image data are communicated to FFmpeg, it will often print the message  

pipe:: Input/output error  

which can be safely ignored. Other warnings and errors have to be addressed according to the FFmpeg documentation. One known issue is that certain movie file formats (e.g., MPEG level 1 and 2 format streams) have video bandwidth limits that can be crossed when rendering too large of image sizes. Typical warnings look like this:  

<html><body><table><tr><td>[mpeg @ 0x98b5e0] packet too large, ignoring bufer limits to mux it</td></tr><tr><td></td></tr><tr><td>[mpeg @ 0x98b5e0l buffer underflow st=0 bufi=281407 size=285018 [mpeg @ 0x98b5e0l buffer underflow st=0 buf=283448 size=285018</td></tr></table></body></html>  

In this case it is recommended either to reduce the size of the image or to encode in a different format that is also supported by your copy of FFmpeg and which does not have this limitation (e.g., .avi, .mkv, mp4).  

# 9.17.7 Related commands  

dump, dump_modify, undump  

# 9.17.8 Default  

The defaults for the dump image and dump movie keywords are as follows:  

• adiam $=$ not specified (use diameter setting)   
• atom $=$ yes   
• bond $=$ none none (if no bonds in system)   
• bond $=$ atom 0.5 (if bonds in system)   
• $\mathrm{size}=512512$   
• view $=6030$ (for 3d)   
• view $=00$ (for 2d)   
• center $=\mathrm{~s~}0.50.50.5$   
• $\mathrm{up}=001\$ (for 3d)   
• $\mathrm{up}=010$ (for 2d)   
• $\mathrm{zoom}=1.0$   
• $\mathrm{box}=\mathrm{yes}0.02$   
• $\mathrm{axes}=\mathrm{no}0.00.0$   
• subbox no 0.0  

• shiny = 1.0 • ssao = no  

The defaults for the dump_modify keywords specific to dump image and dump movie are as follows:  

• acolor $={}^{*}$ red/green/blue/yellow/aqua/cyan   
• adiam $=^{*}1.0$   
• amap $=$ min max cf $0.02\mathrm{min}$ blue max red   
• backcolor $=$ black   
• bcolor $=*$ red/green/blue/yellow/aqua/cyan   
• bdiam $=^{*}0.5$   
• bitrate $=2000$   
• boxcolor $=$ yellow   
• color $=140$ color names are pre-defined as listed below   
• framerate $=24$   
• fsaa $=$ no   
gmap $=$ min max cf 0.0 2 min blue max red  

These are the standard 109 element names that LAMMPS pre-defines for use with the dump image and dump_modify commands.  

• $\mathrm{{1-10={^{\mathrm{\leftarrow}}H^{\cdot}}}}$ , “He”, “Li”, “Be”, “B”, “C”, “N”, “O”, “F”, “Ne” • $11{-}20=\mathrm{{}^{{\cdots}}N a}^{;\gamma}$ , “Mg”, “Al”, “Si”, “P”, “S”, “Cl”, “Ar”, “K”, “Ca” • $21-30={}^{\mathrm{\leftarrow}}\mathrm{Sc}^{\mathrm{\prime\prime}}$ , “Ti”, “V”, “Cr”, “Mn”, “Fe”, “Co”, “Ni”, “Cu”, “Zn” • $31{-}40={}^{\cdots}\mathrm{Ga}^{\prime\prime}$ , “Ge”, “As”, “Se”, “Br”, “Kr”, “Rb”, “Sr”, “Y”, “Zr” • $41{-}50={}^{{\cdot}{\cdot}}\mathrm{Nb}{}^{{\cdot}{\cdot}}$ , “Mo”, “Tc”, “Ru”, “Rh”, “Pd”, “Ag”, “Cd”, “In”, “Sn” • $51{-}60={}^{{\cdot}{\cdot}}\mathrm{Sb}{}^{{\cdot}{\cdot}}$ , “Te”, “I”, “Xe”, “Cs”, “Ba”, “La”, “Ce”, “Pr”, “Nd” • $61{-}70={}^{\cdot\cdot}\mathrm{Pm}^{\cdot}$ , “Sm”, “Eu”, “Gd”, “Tb”, “Dy”, “Ho”, “Er”, “Tm”, “Yb” • $71{-}80={}^{\mathrm{{\leftarrow}}}{\mathrm{{Lu}}}^{\mathrm{{\prime}}}$ , “Hf”, “Ta”, “W”, “Re”, “Os”, “Ir”, “Pt”, “Au”, “Hg” • $81{-}90=$ “Tl”, “Pb”, “Bi”, “Po”, “At”, “Rn”, “Fr”, “Ra”, “Ac”, “Th” • $91{-}100={}^{\cdots}\mathrm{Pa}^{,}$ , “U”, “Np”, “Pu”, “Am”, “Cm”, “Bk”, “Cf”, “Es”, “Fm” • $101{\cdot}109={}^{\cdot}\mathrm{Md}^{\cdot}$ , “No”, “Lr”, “Rf”, “Db”, “Sg”, “Bh”, “Hs”, “Mt”  

These are the 140 colors that LAMMPS pre-defines for use with the dump image and dump_modify commands. Additional colors can be defined with the dump_modify color command. The 3 numbers listed for each name are the RGB (red/green/blue) values. Divide each value by 255 to get the equivalent 0.0 to 1.0 value.  

<html><body><table><tr><td>aliceblue 248, 255</td><td>= 240,</td><td>antiquewhite = 250, 235,215</td><td>aqua = 0, 255, 255</td><td>255,212</td><td>aquamarine = 127,</td><td>azure = 240, 255, 255</td></tr><tr><td>beige = 245, 245, 220</td><td></td><td>bisque = 255, 228,196</td><td>black = 0, 0, 0</td><td>blanchedalmond = 255,255,205</td><td></td><td>blue = 0, 0, 255</td></tr><tr><td>blueviolet = 43,226</td><td>：138,</td><td>brown = 165,42,42</td><td>burlywood 184,135</td><td>222 160</td><td>cadetblue = 95, 158,</td><td>chartreuse = 127, 255,0</td></tr><tr><td>chocolate = 210, 105,30</td><td></td><td>coral = 255, 127,80</td><td>cornflowerblue 100,149,237</td><td>= cornsilk = 255, 248, 220</td><td>60</td><td>crimson = 220, 20,</td></tr><tr><td>cyan = 0,255, 255</td><td></td><td>darkblue = 0, 0, 139</td><td>darkcyan = 0, 139, 139</td><td>darkgoldenrod 184, 134,11</td><td></td><td>darkgray 二 169, 169, 169</td></tr><tr><td>darkgreen = 0, 100, 0</td><td></td><td>darkkhaki = 189, 183, 107</td><td>darkmagenta = 139, 0,139</td><td>darkolivegreen 85,107,47</td><td>140, 0</td><td>darkorange = 255,</td></tr><tr><td>50,204</td><td>darkorchid = 153,</td><td>darkred = 139, 0, 0</td><td>darksalmon = 233, 150,122</td><td>darkseagreen = 143, 188, 143</td><td></td><td>darkslateblue = 72, 61, 139</td></tr><tr><td>79,79</td><td>darkslategray = 47,</td><td>darkturquoise = 0, 206, 209</td><td>darkviolet = 148, 0, 211</td><td>deeppink = 255, 20, 147</td><td></td><td>deepskyblue = 0, 191, 255</td></tr><tr><td>dimgray 105,105</td><td>= 105,</td><td>dodgerblue = 30, 144, 255</td><td>firebrick = 178, 34, 34</td><td>foralwhite = 255, 250, 240</td><td></td><td>forestgreen = 34, 139, 34</td></tr><tr><td>255</td><td>fuchsia = 255, 0,</td><td>gainsboro = 220, 220, 220</td><td>ghostwhite e= 248, 248,255</td><td>gold = 255,215,0</td><td></td><td>goldenrod = 218, 165,32</td></tr><tr><td>gray = 128 indianred</td><td>128, ，128,</td><td>green = 0, 128, 0</td><td>greenyellow = 173, 255,47</td><td>honeydew 255,240</td><td>= 240,</td><td>hotpink = 255, 105, 180</td></tr><tr><td>92,92 lavenderblush</td><td>= 205,</td><td>indigo = 75, 0, 130</td><td>ivory = 255, 240, 240</td><td>khaki = 240, 230, 140</td><td></td><td>lavender 二 230, 230, 250</td></tr><tr><td>255,240,245</td><td>0</td><td>lawngreen = 124, 252,</td><td>lemonchiffon = 255, 250, 205</td><td>lightblue = 216, 230</td><td>173,</td><td>lightcoral = 240, 128, 128</td></tr><tr><td>lightcyan = 255,255</td><td>224,</td><td>lightgoldenrodyellow = 250, 250,210</td><td>lightgreen =144, 238,144</td><td>lightgrey = 211, 211</td><td>211,</td><td>lightpink = 255, 182,193</td></tr><tr><td>lightsalmon = 255, 160,122</td><td>178, 170</td><td>lightseagreen= 32，</td><td>lightskyblue = 135, 206, 250</td><td>lightslategray 119,136,153</td><td></td><td>lightsteelblue 176, 196,222</td></tr><tr><td>lightyellow = 255, 255,224</td><td></td><td>lime = 0, 255,0 50</td><td>limegreen = 50, 205,</td><td>linen = 250, 240, 230</td><td></td><td>magenta = 255, 0, 255</td></tr><tr><td>maroon = 128, 0, 0</td><td>102,205,170</td><td>mediumaquamarine e： 205</td><td>mediumblue = O, 0,</td><td>mediumorchid 186, 85, 211</td><td></td><td>mediumpurple 147,112,219</td></tr><tr><td>mediumseagreen = 60,179,113 midnightblue = 25,</td><td>123,104,238</td><td>mediumslateblue</td><td>mediumspringgreen =0,250,154</td><td>mediumturquoise = 72,209,204</td><td></td><td>mediumvioletred = 199,21,133</td></tr><tr><td>25,112</td><td>250</td><td>mintcream = 245, 255,</td><td>mistyrose 二 255, 228,225</td><td>moccasin 228, 181</td><td>255,</td><td>navajowhite = 255, 222,173</td></tr><tr><td>navy = 0, 0, 128</td><td></td><td>oldlace =253,245,230</td><td>olive = 128, 128, 0</td><td>olivedrab 142,35</td><td>107, 0</td><td>orange = 255, 165,</td></tr><tr><td>orangered = 255, 69,0</td><td></td><td>orchid = 218, 112, 214</td><td>palegoldenrod 238,232,170</td><td>palegreen 251,152</td><td>二 152,</td><td>paleturquoise 175,238,238</td></tr><tr><td>palevioletred 219,112,147</td><td>=</td><td>papayawhip = 255, 239,213</td><td>peachpuff 255, 239,213</td><td>peru = 205,133,63</td><td></td><td>pink = 255, 192, 203</td></tr><tr><td>plum = 221, 160, 221</td><td>powderblue 224,230</td><td>176, 二</td><td>purple = 128, 0, 128</td><td>red = 255, 0, 0</td><td></td><td>rosybrown = 188, 143,143</td></tr><tr><td>royalblue = 65, 105, 225</td><td>19</td><td>saddlebrown = 139,69,</td><td>salmon = 250, 128, 114</td><td>sandybrown = 244, 164, 96</td><td></td><td>seagreen = 46, 139, 87</td></tr><tr><td>seashell = 255, 245, 238</td><td></td><td>sienna = 160, 82,45</td><td>silver = 192, 192, 192</td><td>skyblue = 135, 206, 235</td><td></td><td>slateblue = 106, 90, 205</td></tr><tr><td>slategray = 128, 144</td><td>112,</td><td>snow =255,250,250</td><td>springgreen = 0, 255,127</td><td>steelblue = 70, 130, 180</td><td></td><td>tan = 210, 180, 140</td></tr><tr><td>teal = 0, 128, 128</td><td></td><td>thistle = 216, 191, 216</td><td>tomato = 253, 99,71</td><td>turquoise = 64, 224,</td><td></td><td>violet = 238, 130,</td></tr><tr><td>wheat = 245,222. 9.117</td><td></td><td>white =255,255,255</td><td>whitesmoke = 245, yellow = 255, 255, 0</td><td>208</td><td></td><td>238 yellowgreen = 154, 2677</td></tr></table></body></html>  