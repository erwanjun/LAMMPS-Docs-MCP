---
title: "Peridynamics Theory"
description: "Peridynamics LPS and PMB models, damage mechanics, discretization for LAMMPS"
category: "howto"
tags: ["peridynamics", "LPS", "PMB", "damage", "continuum-mechanics"]
commands: ["pair_style peri/lps", "pair_style peri/pmb", "pair_style peri/ves", "pair_style peri/eps"]
---
# Linear Peridynamic Solid (LPS) Model  

We summarize the linear peridynamic solid (LPS) material model. For more on this model, the reader is referred to (Silling 2007). This model is a nonlocal analogue to a classical linear elastic isotropic material. The elastic properties of a a classical linear elastic isotropic material are determined by (for example) the bulk and shear moduli. For the LPS model, the elastic properties are analogously determined by the bulk and shear moduli, along with the horizon $\delta$ .  

The LPS model has a force scalar state  

$$
\underline{{t}}=\frac{3K\theta}{m}\underline{{\omega}}\underline{{x}}+\alpha\underline{{\omega}}\underline{{e}}^{\mathrm{d}},
$$  

with $K$ the bulk modulus and $\alpha$ related to the shear modulus $G$ as  

$$
\alpha={\frac{15G}{m}}.
$$  

The remaining components of the model are described as follows. Define the reference position scalar state $\underline{{x}}$ so that $\underline{{x}}\left<\xi\right>=\|\xi\|$ . Then, the weighted volume $m$ is defined as  

$$
m\left[{\bf x}\right]=\int_{\mathcal{H}_{\mathrm{x}}}\underline{{\omega}}\left\langle\boldsymbol{\xi}\right\rangle\underline{{x}}\left\langle\boldsymbol{\xi}\right\rangle\underline{{x}}\left\langle\boldsymbol{\xi}\right\rangle d V_{\boldsymbol{\xi}}.
$$  

Let  

$$
\underline{{e}}\left[\mathbf{x},t\right]\left\langle\xi\right\rangle=\left\|\xi+\eta\right\|-\left\|\xi\right\|
$$  

be the extension scalar state, and  

$$
\theta\left[\mathbf{x},t\right]={\frac{3}{m\left[\mathbf{x}\right]}}\int_{\mathcal{H}_{\mathrm{x}}}{\underline{{\omega}}\left\langle\boldsymbol{\xi}\right\rangle}\underline{{x}}\left\langle\boldsymbol{\xi}\right\rangle\underline{{e}}\left[\mathbf{x},t\right]\left\langle\boldsymbol{\xi}\right\rangle d V_{\boldsymbol{\xi}}
$$  

be the dilatation. The isotropic and deviatoric parts of the extension scalar state are defined, respectively, as  

$$
\underline{{e}}^{\mathrm{i}}=\frac{\theta\underline{{x}}}{3},\qquad\underline{{e}}^{\mathrm{d}}=\underline{{e}}-\underline{{e}}^{\mathrm{i}},
$$  

where the arguments of the state functions and the vectors on which they operate are omitted for simplicity. We note that the LPS model is linear in the dilatation $\theta$ , and in the deviatoric part of the extension $\varrho^{\mathrm{d}}$ .  

![](images/d9a9ea857acdac64e7e192409721319d38e599940427c065e30ad84a4b024274.jpg)  

# Note  

The weighted volume $m$ is time-independent, and does not change as bonds break. It is computed with respect to the bond family defined at the reference (initial) configuration.  

The non-negative scalar state $\underline{{\pmb{\omega}}}$ is an influence function (Silling 2007). For more on influence functions, see (Seleson 2010). If an influence function ${\underline{{\pmb{\omega}}}}$ depends only upon the scalar $\|\xi\|$ , (i.e., $\underline{{\omega}}\left\langle\xi\right\rangle=\underline{{\omega}}\left\langle\left\|\xi\right\|\right\rangle)$ ), then ${\underline{{\pmb{\omega}}}}$ is a spherical influence function. For a spherical influence function, the LPS model is isotropic (Silling 2007).  

![](images/9f2afba7c690cf56307e3d20819e0549eafe26b06035f8addc58cf7fd610691d.jpg)  

# Note  

In the LAMMPS implementation of the LPS model, the influence function $\underline{{\omega}}\left\langle\left\|\xi\right\|\right\rangle=1/\left\|\xi\right\|\right\rangle$ is used. However, the user can define their own influence function by altering the method “influence_function” in the file pair_peri_lps. cpp. The LAMMPS peridynamics code permits both spherical and non-spherical influence functions (e.g., isotropic and non-isotropic materials).  

# Prototype Microelastic Brittle (PMB) Model  

We summarize the prototype microelastic brittle (PMB) material model. For more on this model, the reader is referred to (Silling 2000) and (Silling 2005). This model is a special case of the LPS model; see (Seleson 2010) for the derivation. The elastic properties of the PMB model are determined by the bulk modulus $K$ and the horizon $\delta$ .  

The PMB model is expressed using the scalar force state field  

$$
\underline{{t}}\left[\mathbf{x,}t\right]\left\langle\xi\right\rangle=\frac{1}{2}f\left(\eta,\xi\right),
$$  

with $f$ a scalar-valued function. We assume that $f$ takes the form  

$$
f=c s,
$$  

where  

$$
c={\frac{18K}{\pi\delta^{4}}},
$$  

with $K$ the bulk modulus and $\delta$ the horizon, and $s$ the bond stretch, defined as  

$$
s(t,\eta,\xi)=\frac{\|\eta+\xi\|-\|\xi\|}{\|\xi\|}.
$$  

Bond stretch is a unitless quantity, and identical to a one-dimensional definition of strain. As such, we see that a bond at its equilibrium length has stretch $s=0$ , and a bond at twice its equilibrium length has stretch $s=1$ . The constant $c$ given above is appropriate for 3D models only. For more on the origins of the constant $c$ , see (Silling 2005). For the derivation of $c$ for 1D and 2D models, see (Emmrich).  

Given (5), $(I)$ reduces to  

with  

$$
\rho(\mathbf{x})\mathbf{i}(\mathbf{x},t)=\int_{\mathcal{H}_{\mathbf{x}}}\mathbf{f}\left(\eta,\xi\right)d V_{\xi}+\mathbf{b}(\mathbf{x},t),
$$  

$$
\mathbf{f}\left(\eta,\xi\right)=f\left(\eta,\xi\right)\frac{\xi+\eta}{\left\|\xi+\eta\right\|}.
$$  

Unlike the LPS model, the PMB model has a Poisson ratio of $\nu=1/4$ in 3D, and $\nu=1/3$ in 2D. This is reflected in the input for the PMB model, which requires only the bulk modulus of the material, whereas the LPS model requires both the bulk and shear moduli.  

# Damage  

Bonds are made to break when they are stretched beyond a given limit. Once a bond fails, it is failed forever (Silling). Further, new bonds are never created during the course of a simulation. We discuss only one criterion for bond breaking, called the critical stretch criterion.  

Define $\mu$ to be the history-dependent scalar boolean function  

$$
\mu(t,\eta,\xi)=\left\{\begin{array}{l l}{1}&{\mathrm{if~}s(t^{\prime},\eta,\xi)<\operatorname*{min}\left(s_{0}(t^{\prime},\eta,\xi),s_{0}(t^{\prime},\eta^{\prime},\xi^{\prime})\right)\mathrm{for~all~}0\leq t^{\prime}\leq t}\ {0}&{\mathrm{otherwise}}\end{array}\right\}.
$$  

where $\eta^{\prime}=\mathbf{u}(\mathbf{x}^{\prime\prime},t)-\mathbf{u}(\mathbf{x}^{\prime},t)$ and $\boldsymbol{\xi}^{\prime}=\mathbf{x}^{\prime\prime}-\mathbf{x}^{\prime}$ . Here, $s_{0}(t,\eta,\xi)$ is a critical stretch defined as  

# 8.5. Packages howto  

$$
\begin{array}{r}{s_{0}(t,\eta,\xi)=s_{00}-\alpha s_{\mathrm{min}}(t,\eta,\xi),\qquads_{\mathrm{min}}(t)=\displaystyle\operatorname*{min}_{\xi}s(t,\eta,\xi),}\end{array}
$$  

where $s_{00}$ and $\alpha$ are material-dependent constants. The history function $\mu$ breaks bonds when the stretch $s$ exceeds the critical stretch $s_{0}$ .  

Although $s_{0}(t,\eta,\xi)$ is expressed as a property of a particle, bond breaking must be a symmetric operation for all particle pairs sharing a bond. That is, particles $\mathbf{X}$ and $\mathbf{x}^{\prime}$ must utilize the same test when deciding to break their common bond. This can be done by any method that treats the particles symmetrically. In the definition of $\mu$ above, we have chosen to take the minimum of the two $s_{0}$ values for particles $\mathbf{X}$ and $\mathbf{x}^{\prime}$ when determining if the $\mathbf{x}{-}\mathbf{x}^{\prime}$ bond should be broken.  

Following (Silling), we can define the damage at a point $\mathbf{X}$ as  

$$
\varphi(\mathbf{x},t)=1-\frac{\int_{\mathcal{H}_{\mathbf{x}}}\mu(t,\eta,\xi)d V_{\mathbf{x}^{\prime}}}{\int_{\mathcal{H}_{\mathbf{x}}}d V_{\mathbf{x}^{\prime}}}.
$$  

# Discrete Peridynamic Model and LAMMPS Implementation  

In LAMMPS, instead of $(I)$ , we model this equation of motion:  

$$
\rho(\mathbf{x}){\ddot{\mathbf{y}}}(\mathbf{x},t)=\int_{{\mathcal{H}}_{\mathbf{x}}}\left\{{\underline{{\mathbf{T}}}}\left[\mathbf{x},t\right]\left\langle\mathbf{x}^{\prime}-\mathbf{x}\right\rangle-{\underline{{\mathbf{T}}}}\left[\mathbf{x}^{\prime},t\right]\left\langle\mathbf{x}-\mathbf{x}^{\prime}\right\rangle\right\}d V_{\mathbf{x}^{\prime}}+\mathbf{b}(\mathbf{x},t),
$$  

where we explicitly track and store at each timestep the positions and not the displacements of the particles. We observe that $\ddot{\mathbf{y}}(\mathbf{x},t)=\ddot{\mathbf{x}}+\ddot{\mathbf{u}}(\mathbf{x},t)=\ddot{\mathbf{u}}(\mathbf{x},t)$ , so that this is equivalent to $(I)$ .  

# Spatial Discretization  

The region defining a peridynamic material is discretized into particles forming a simple cubic lattice with lattice constant $\Delta x$ , where each particle $i$ is associated with some volume fraction $V_{i}$ . For any particle $i.$ , let ${\mathcal{F}}_{i}$ denote the family of particles for which particle $i$ shares a bond in the reference configuration. That is,  

$$
\mathcal F_{i}=\{p\mid\left\lvert\lvert\mathbf{x}_{p}-\mathbf{x}_{i}\right\rvert\right\rvert\leq\delta\}.
$$  

The discretized equation of motion replaces $(I)$ with  

$$
\rho{\ddot{\mathbf{y}}}_{i}^{n}=\sum_{p\in{\mathcal{F}}_{i}}\left\{{\mathbf{T}}\left[{\mathbf{x}}_{i},t\right]\left\langle{\mathbf{x}}_{p}^{\prime}-{\mathbf{x}}_{i}\right\rangle-{\mathbf{T}}\left[{\mathbf{x}}_{p},t\right]\left\langle{\mathbf{x}}_{i}-{\mathbf{x}}_{p}\right\rangle\right\}V_{p}+{\mathbf{b}}_{i}^{n},
$$  

where $n$ is the timestep number and subscripts denote the particle number.  

# Short-Range Forces  

In the model discussed so far, particles interact only through their bond forces. A particle with no bonds becomes a free non-interacting particle. To account for contact forces, short-range forces are introduced (Silling 2007). We add to the force in (12) the following force  

$$
\mathbf{f}_{S}(\mathbf{y}_{p},\mathbf{y}_{i})=\operatorname*{min}\left\{0,\frac{c_{S}}{\delta}(\left\|\mathbf{y}_{p}-\mathbf{y}_{i}\right\|-d_{p i})\right\}\frac{\mathbf{y}_{p}-\mathbf{y}_{i}}{\left\|\mathbf{y}_{p}-\mathbf{y}_{i}\right\|},
$$  

where $d_{p i}$ is the short-range interaction distance between particles $p$ and $i$ , and $c_{S}$ is a multiple of the constant $c$ from (6). Note that the short-range force is always repulsive, never attractive. In practice, we choose  

$$
c_{S}=15\frac{18K}{\pi\delta^{4}}.
$$  

For the short-range interaction distance, we choose (Silling 2007)  

$$
d_{p i}=\operatorname*{min}\left\{0.9\left\|\mathbf{x}_{p}-\mathbf{x}_{i}\right\|,1.35(r_{p}+r_{i})\right\},
$$  

where $r_{i}$ is called the node radius of particle $i.$ . Given a discrete lattice, we choose $r_{i}$ to be half the lattice constant.  

![](images/233bc3ad098a520e67e1d0a02e13ee134c49603bfa918ac37f7d54f2b4a6eaf3.jpg)  

# Note  

For a simple cubic lattice, $\Delta x=\Delta y=\Delta z$ .  

Given this definition of $d_{p i}$ , contact forces appear only when particles are under compression.  

When accounting for short-range forces, it is convenient to define the short-range family of particles  

$$
\mathcal{F}_{i}^{S}=\{p\mid\left\|\mathbf{y}_{p}-\mathbf{y}_{i}\right\|\leq d_{p i}\}.
$$  

# Modification to the Particle Volume  

The right-hand side of (12) may be thought of as a midpoint quadrature of $(I)$ . To slightly improve the accuracy of this quadrature, we discuss a modification to the particle volume used in (12). In a situation where two particles share a bond with $\left\|\mathbf{x}_{p}-\mathbf{x}_{i}\right\|=\delta$ , for example, we suppose that only approximately half the volume of each particle is “seen” by the other (Silling 2007). When computing the force of each particle on the other we use $V_{p}/2$ rather than $V_{p}$ in (12). As such, we introduce a nodal volume scaling function for all bonded particles where $\delta-r_{i}\leq\|{\bf x}_{p}-{\bf x}_{i}\|\leq\delta$ (see the Figure below).  

We choose to use a linear unitless nodal volume scaling function  

$$
\begin{array}{r}{\pmb{\nu}(\mathbf{x}_{p}-\mathbf{x}_{i})=\left\{\begin{array}{c l}{-\frac{1}{2r_{i}}\left\|\mathbf{x}_{p}-\mathbf{x}_{i}\right\|+\left(\frac{\delta}{2r_{i}}+\frac{1}{2}\right)}&{\mathrm{if}\delta-r_{i}\leq\left\|\mathbf{x}_{p}-\mathbf{x}_{i}\right\|\leq\delta}\ {1}&{\mathrm{if}\left\|\mathbf{x}_{p}-\mathbf{x}_{i}\right\|\leq\delta-r_{i}}\ {0}&{\mathrm{otherwise}}\end{array}\right\}}\end{array}
$$  

If $\left\|\mathbf{x}_{p}-\mathbf{x}_{i}\right\|=\delta$ , $\nu=0.5$ , and if $\left\|\mathbf{x}_{p}-\mathbf{x}_{i}\right\|=\delta-r_{i}$ , $\nu=1.0$ , for example.  

# Temporal Discretization  

When discretizing time in LAMMPS, we use a velocity-Verlet scheme, where both the position and velocity of the particle are stored explicitly. The velocity-Verlet scheme is generally expressed in three steps. In Algorithm 1, $\rho_{i}$ denotes the mass density of a particle and $\tilde{\mathbf{f}}_{i}^{n}$ denotes the the net force density on particle $i$ at timestep $n$ . The LAMMPS command fix nve performs a velocity-Verleet integration.  

# $\Theta$ Algorithm 1: Velocity Verlet  

$$
\begin{array}{r l}&{1\colon\mathbf v_{i}^{n+1/2}=\mathbf v_{i}^{n}+\frac{\Delta t}{2\rho_{i}}\widetilde{\mathbf f}_{i}^{n}}\ &{2\colon\mathbf y_{i}^{n+1}=\mathbf y_{i}^{n}+\Delta t\mathbf v_{i}^{n+1/2}}\ &{3\colon\mathbf v_{i}^{n+1}=\mathbf v_{i}^{n+1/2}+\frac{\Delta t}{2\rho_{i}}\widetilde{\mathbf f}_{i}^{n+1}}\end{array}
$$  

# 8.5. Packages howto  

![](images/8587710c651006411fabd34c9ad984904616ece9962392da4ccb331af4e89fa9.jpg)  

Fig. 1: Diagram showing horizon of a particular particle, demonstrating that the volume associated with particles near the boundary of the horizon is not completely contained within the horizon.  

# Breaking Bonds  

During the course of simulation, it may be necessary to break bonds, as described in the Damage section. Bonds are recorded as broken in a simulation by removing them from the bond family $\mathcal{F}_{i}$ (see $(I I)$ ).  

A naive implementation would have us first loop over all bonds and compute $s_{m i n}$ in $(9)$ , then loop over all bonds again and break bonds with a stretch $s>s0$ as in (8), and finally loop over all particles and compute forces for the next step of Algorithm 1. For reasons of computational efficiency, we will utilize the values of $s_{0}$ from the previous timestep when deciding to break a bond.  

![](images/d9389a3ee65be2cd38844475b363bb4a5860cf28f04c76746d3f2a218a6a9d97.jpg)  

# Note  

For the first timestep, $s_{0}$ is initialized to $\infty$ for all nodes. This means that no bonds may be broken until the second timestep. As such, it is recommended that the first few timesteps of the peridynamic simulation not involve any actions that might result in the breaking of bonds. As a practical example, the projectile in the commented example below is placed such that it does not impact the target brittle plate until several timesteps into the simulation.  

# LPS Pseudocode  

A sketch of the LPS model implementation in the PERI package appears in Algorithm 2. This algorithm makes use of the routines in Algorithm 3 and Algorithm 4.  

# Algorithm 2: LPS Peridynamic Model Pseudocode  

Fix $s_{00}$ , $\alpha$ , horizon $\delta$ , bulk modulus $K$ , shear modulus $G$ , timestep $\Delta t$ , and generate initial lattice of particles with lattice constant $\Delta x$ . Let there be $N$ particles. Define constant $c_{S}$ for repulsive short-range forces.  

Initialize bonds between all particles $i\neq j$ where $\|\mathbf{x}_{j}-\mathbf{x}_{i}\|\leq\delta$  

itialize weighted volume $m$ for all particles using Algorithm 3 tialize $s_{0}=\infty$ {Initialize each entry to MAX_DOUBLE} ile not done do Perform step 1 of Algorithm 1, updating velocities of all particles Perform step 2 of Algorithm 1, updating positions of all particles $\tilde{s}_{0}=\infty$ {Initialize each entry to MAX_DOUBLE} for $i=1$ to $N$ do {Compute short-range forces} for all particles $j\in\mathcal{F}_{i}^{S}$ (the short-range family of nodes for particle $i$ ) do $r=\left\lVert\mathbf{y}_{j}-\mathbf{y}_{i}\right\rVert$ dr =
 min{0, 
r − d} {Short-range forces are only repulsive, never attractive} k = cδS Vkdr {cS defined in :ref:\`(14) <pericS>\`} f = f + k yj−yi ∥yj−yi∥ end for end for Compute the dilatation for each particle using Algorithm 4 for $i=1$ to $N$ do {Compute bond forces} for all particles $j$ sharing an unbroken bond with particle $i$ do $e=\left\|\mathbf{y}_{j}-\mathbf{y}_{i}\right\|-\left\|\mathbf{x}_{j}-\mathbf{x}_{i}\right\|$ $\omega_{+}=\underline{{\omega}}\left\langle\mathbf{x}_{j}-\mathbf{x}_{i}\right\rangle$ {Influence function evaluation} $\omega_{-}=\underline{{\omega}}\left\langle{{\bf{x}}_{i}}-{{\bf{x}}_{j}}\right\rangle$ {Influence function evaluation} $\begin{array}{r l}&{\hat{f}=\left[(3K-5G)\left(\frac{\theta(i)}{m(i)}\omega_{+}+\frac{\theta(j)}{m(j)}\omega_{-}\right)\lVert\mathbf{x}_{j}-\mathbf{x}_{i}\rVert+15G\left(\frac{\omega_{+}}{m(i)}+\frac{\omega_{-}}{m(j)}\right)e\right]V(\mathbf{x}_{j}-\mathbf{x}_{i})V_{j}}\ &{\mathbf{f}=\mathbf{f}+\hat{f}\frac{\mathbf{y}_{j}-\mathbf{y}_{i}}{\lVert\mathbf{y}_{j}-\mathbf{y}_{i}\rVert}}\ {*e}&{\mathrm{~.~.~},\quad\mathrm{~.~n~}}\end{array}$ if $(d r/\left\vert\left\vert\mathbf{x}_{j}-\mathbf{x}_{i}\right\vert\right\vert)>\operatorname*{min}(s_{0}(i),s_{0}(j))$ then Break $i^{\cdot}$ ’s bond with $j\left\{j\right\}$ ‘s bond with i will be broken when this loop iterates on j} end if $\widetilde{s}_{0}(i)=\mathrm{min}(\widetilde{s}_{0}(i),s_{00}-\alpha(d r/\left|\left|\mathbf{x}_{j}-\mathbf{x}_{i}\right|\right|))$ end for end for $s_{0}=\tilde{s}_{0}$ {Store for use in next timestep} Perform step 3 of Algorithm 1, updating velocities of all particles end while  

#  Algorithm 3: Computation of Weighted Volume m  

for $i=1$ to $N$ do $m(i)=0.0$ for all particles $j$ sharing a bond with particle $i$ do $\begin{array}{r}{m(i)=m(i)+\underline{{\omega}}\left\langle\mathbf{x}_{j}-\mathbf{x}_{i}\right\rangle\left\|\mathbf{x}_{j}-\mathbf{x}_{i}\right\|^{2}\boldsymbol{v}(\mathbf{x}_{j}-\mathbf{x}_{i})V_{j}}\end{array}$ end for   
end for  

#  Algorithm 4: Computation of Dilatation θ  

for $i=1$ to $N$ do $\theta(i)=0.0$ for all particles $j$ sharing an unbroken bond with particle i do $\begin{array}{r l}&{e=\left\|\mathbf{y}_{i}-\mathbf{y}_{j}\right\|-\left\|\mathbf{x}_{i}-\mathbf{x}_{j}\right\|}\ &{\theta(i)=\theta(i)+\underline{{\omega}}\left\langle\mathbf{x}_{j}-\mathbf{x}_{i}\right\rangle\left\|\mathbf{x}_{j}-\mathbf{x}_{i}\right\|e v(\mathbf{x}_{j}-\mathbf{x}_{i})V_{j}}\end{array}$ end for $\begin{array}{r}{\theta(i)=\frac{3}{m(i)}\theta(i)}\end{array}$   
end for  

# PMB Pseudocode  

A sketch of the PMB model implementation in the PERI package appears in Algorithm 5.  

#  Algorithm 5: PMB Peridynamic Model Pseudocode  

Fix $s_{00}$ , $\alpha$ , horizon $\delta$ , spring constant $c$ , timestep $\Delta t$ , and generate initial lattice of particles with lattice constant $\Delta x$ . Let there be $N$ particles.  

Initialize bonds between all particles $i\neq j$ where $\|\mathbf{x}_{j}-\mathbf{x}_{i}\|\leq\delta$   
Initialize $s_{0}=\infty$ {Initialize each entry to MAX_DOUBLE}   
while not done do Perform step 1 of Algorithm 1, updating velocities of all particles Perform step 2 of Algorithm 1, updating positions of all particles $\tilde{s}_{0}=\infty$ {Initialize each entry to MAX_DOUBLE} for $i=1$ to $N$ do {Compute short-range forces} for all particles $j\in\mathcal{F}_{i}^{S}$ (the short-range family of nodes for particle $i$ ) do $\begin{array}{r l}&{r=\left\lVert\mathbf{y}_{j}-\mathbf{y}_{i}\right\rVert}\ &{d r=\operatorname*{min}\{0,r-d\}\{S h o r t-r a n g e f o r c e s a r e o n l;}\ &{k=\frac{c_{s}}{\delta}V_{k}d r\left\{c_{S}d e f i n e d i n:r e f\colon(I4)<p e r i c S>\right\}}\ &{\mathbf{f}=\mathbf{f}+k\frac{\mathbf{y}_{j}-\mathbf{y}_{i}}{\left\lVert\mathbf{y}_{j}-\mathbf{y}_{i}\right\rVert}}\end{array}$ y repulsive, never attractive} end for end for for $i=1$ to $N$ do {Compute bond forces} for all particles $j$ sharing an unbroken bond with particle $i$ do $r=\left\lVert\mathbf{y}_{j}-\mathbf{y}_{i}\right\rVert$ $d r=r-\left\|\mathbf{x}_{j}-\mathbf{x}_{i}\right\|$ $\begin{array}{r}{k=\frac{c}{\|\mathbf{x}_{i}-\mathbf{x}_{j}\|}\nu(\mathbf{x}_{i}-\mathbf{x}_{j})V_{j}d r\left\{c d e f i n e d i n:r e f:\right>(6)<p e r i c>\forall}\end{array}$ $\mathbf{f}=\mathbf{f}+k{\frac{\mathbf{y}_{j}-\mathbf{y}_{i}}{\left\|\mathbf{y}_{j}-\mathbf{y}_{i}\right\|}}$ if $(d r/\left\vert\left\vert\mathbf{x}_{j}-\mathbf{x}_{i}\right\vert\right\vert)>\operatorname*{min}(s_{0}(i),s_{0}(j))$ then Break $i^{:}$ ’s bond with $j\left\{j\right\}$ ‘s bond with i will be broken when this loop iterate on j} end if $\widetilde{s}_{0}(i)=\mathrm{min}(\widetilde{s}_{0}(i),s_{00}-\alpha(d r/\left|\left|\mathbf{x}_{j}-\mathbf{x}_{i}\right|\right|))$ end for   
end for   
$s_{0}=\tilde{s}_{0}$ {Store for use in next timestep}   
Perform step 3 of Algorithm 1, updating velocities of all particles  

end while  

# Damage  

The damage associated with every particle (see (10)) can optionally be computed and output with a LAMMPS data dump. To do this, your input script must contain the command compute damage/atom This enables a LAMMPS peratom compute to calculate the damage associated with each particle every time a LAMMPS data dump frame is written.  

# Visualizing Simulation Results  

There are multiple ways to visualize the simulation results. Typically, you want to display the particles and color code them by the value computed with the compute damage/atom command.  

This can be done, for example, by using the built-in visualizer of the dump image or dump movie command to create snapshot images or a movie. Below are example command for using dump image with the example listed below and a set of images created for steps 300, 600, and 2000 this way.  

dump D2 all image 100 dump.peri.\*.png c_C1 type box no 0.0 view 30 60 zoom 1.5 up 0 0 -1 ␣ $\hookrightarrow$ ssao yes 4539 0.6 dump_modify D2 pad 5 adiam \* 0.001 amap 0.0 1.0 ca 0.1 3 min blue 0.5 yellow max red  

![](images/d2df40744006631775c2db0a177ab9366e90e899645a4aa9fd5098dcec8d2d0d.jpg)  

For interactive visualization, the Ovito is very convenient to use. Below are steps to create a visualization of the same example from below now using the generated trajectory in the dump.peri file.  

• Launch Ovito   
• File $->$ Load File $->$ dump.peri   
• Select “- $\cdot>$ Particle types” and under “Appearance” set “Display radius:” to 0.0005   
• From the “Add modification:” drop down list select “Color coding”   
• Under “Color coding” select from the “Color gradient” drop down list “Jet”   
• Also under “Color coding” set “Start value:” to 0 and “End value:” to 1  

• You can improve the image quality by adding the “Ambient occlusion” modification  

![](images/1024ec34bd074a4748b0f9f2d224eca75692c5ab17ff0eed04bd3d4547bf4020.jpg)  
Fig. 2: Screenshot of visualizing a trajectory with Ovito  

# Pitfalls  

# Parallel Scalability  

LAMMPS operates in parallel in a spatial-decomposition mode, where each processor owns a spatial subdomain of the overall simulation domain and communicates with its neighboring processors via distributed-memory message passing (MPI) to acquire ghost atom information to allow forces on the atoms it owns to be computed. LAMMPS also uses Verlet neighbor lists which are recomputed every few timesteps as particles move. On these timesteps, particles also migrate to new processors as needed. LAMMPS decomposes the overall simulation domain so that spatial subdomains of nearly equal volume are assigned to each processor. When each subdomain contains nearly the same number of particles, this results in a reasonable load balance among all processors. As is more typical with some peridynamic simulations, some subdomains may contain many particles while other subdomains contain few particles, resulting in a load imbalance that impacts parallel scalability.  

# Setting the “skin” distance  

The neighbor command with LAMMPS is used to set the so-called “skin” distance used when building neighbor lists. All atom pairs within a cutoff distance equal to the horizon $\delta$ plus the skin distance are stored in the list. Unexpected crashes in LAMMPS may be due to too small a skin distance. The skin should be set to a value such that $\delta$ plus the skin distance is larger than the maximum possible distance between two bonded particles. For example, if $s_{00}$ is increased, the skin distance may also need to be increased.  

# “Lost” particles  

All particles are contained within the “simulation box” of LAMMPS. The boundaries of this box may change with time, or not, depending on how the LAMMPS boundary command has been set. If a particle drifts outside the simulation box during the course of a simulation, it is called lost.  

As an option of the themo_modify command of LAMMPS, the lost keyword determines whether LAMMPS checks for lost atoms each time it computes thermodynamics and what it does if atoms are lost. If the value is ignore, LAMMPS does not check for lost atoms. If the value is error or warn, LAMMPS checks and either issues an error or warning. The code will exit with an error and continue with a warning. This can be a useful debugging option. The default behavior of LAMMPS is to exit with an error if a particle is lost.  

The peridynamic module within LAMMPS does not check for lost atoms. If a particle with unbroken bonds is lost, those bonds are marked as broken by the remaining particles.  

# Defining the peridynamic horizon δ  

In the pair_coeff command, the user must specify the horizon δ . This argument determines which particles are bonded when the simulation is initialized. It is recommended that $\delta$ be set to a small fraction of a lattice constant larger than desired.  

For example, if the lattice constant is 0.0005 and you wish to set the horizon to three times the lattice constant, then set $\delta$ to be 0.0015001, a value slightly larger than three times the lattice constant. This guarantees that particles three lattice constants away from each other are still bonded. If δ is set to 0.0015, for example, floating point error may result in some pairs of particles three lattice constants apart not being bonded.  

# Breaking bonds too early  

For technical reasons, the bonds in the simulation are not created until the end of the first timestep of the simulation.   
Therefore, one should not attempt to break bonds until at least the second step of the simulation.  

# Bugs  

The user is cautioned that this code is a beta release. If you are confident that you have found a bug in the peridynamic module, please report it in a GitHub Issue <https://github.com/lammps/lammps/issues> or send an email to the LAMMPS developers. First, check the New features and bug fixes section of the LAMMPS website site to see if the bug has already been reported or fixed. If not, the most useful thing you can do for us is to isolate the problem. Run it on the smallest number of atoms and fewest number of processors and with the simplest input script that reproduces the bug. In your message, describe the problem and any ideas you have as to what is causing it or where in the code the problem might be. We’ll request your input script and data files if necessary.  

# Modifying and Extending the Peridynamic Module  

To add new features or peridynamic potentials to the peridynamic module, the user is referred to the Modifying & extending LAMMPS section. To develop a new bond-based material, start with the peri/pmb pair style as a template. To develop a new state-based material, start with the peri/lps pair style as a template.  

# A Numerical Example  

To introduce the peridynamic implementation within LAMMPS, we replicate a numerical experiment taken from section 6 of (Silling 2005).  

# Problem Description and Setup  

We consider the impact of a rigid sphere on a homogeneous disk of brittle material. The sphere has diameter $0.01\textrm{m}$ and velocity $100\mathrm{m/s}$ directed normal to the surface of the target. The target material has density $\rho=2200\mathrm{kg/m}$ :math: $\wedge_{3}$ . A PMB material model is used with $K=14.9\mathrm{GPa}$ and critical bond stretch parameters given by $s_{00}=0.0005$ and $\alpha=0.25$ . A three-dimensional simple cubic lattice is constructed with lattice constant $0.0005\mathrm{~m~}$ and horizon 0.0015 m. (The horizon is three times the lattice constant.) The target is a cylinder of diameter $0.074\mathrm{~m~}$ and thickness 0.0025 m, and the associated lattice contains 103,110 particles. Each particle i has volume fraction $V_{i}=1.25\times10^{-10}\mathrm{m}^{3}$ .  

# 8.5. Packages howto  

The spring constant in the PMB material model is (see (6))  

$$
c=\frac{18k}{\pi\delta^{4}}=\frac{18(14.9\times10^{9})}{\pi(1.5\times10^{-3})^{4}}\approx1.6863\times10^{22}.
$$  

The CFL analysis from (Silling2005) shows that a timestep of $1.0\times10^{-7}$ is safe.  

We observe here that in IEEE double-precision floating point arithmetic when computing the bond stretch $s(t,\eta,\xi)$ at each iteration where $\|\eta+\xi\|$ is computed during the iteration and $\|\xi\|$ was computed and stored for the initial lattice, it may be that $f l(s)=\varepsilon$ with $\vert\varepsilon\vert\leq\varepsilon_{m a c h i n e}$ for an unstretched bond. Taking $\varepsilon=2.220446049250313\times10^{-16}$ , we see that the value $c s V_{i}\approx4.68\times10^{-4}$ , computed when determining $f$ , is perhaps larger than we would like, especially when the true force should be zero. One simple way to avoid this issue is to insert the following instructions in Algorithm Algorithm 5 after instruction 21 (and similarly for Algorithm Algorithm 2):  

i $\begin{array}{c}{\textbf{f}|d r|<\varepsilon_{m a c h i n e}\mathbf{then}}\ {d r=0}\end{array}$ end if  

Qualitatively, this says that displacements from equilibrium on the order of $10^{-16}\mathrm{m}$ are taken to be exactly zero, a seemingly reasonable assumption.  

# The Projectile  

The projectile used in the following experiments is not the one used in (Silling 2005). The projectile used here exerts a force  

$$
F(r)=-k_{s}(r-R)^{2}
$$  

on each atom where $k_{s}$ is a specified force constant, $r$ is the distance from the atom to the center of the indenter, and $R$ is the radius of the projectile. The force is repulsive and $F(r)=0$ for $r>R$ . For our problem, the projectile radius $R=0.05\mathrm{~m~}$ , and we have chosen $k_{s}=1.0\times10^{17}$ (compare with $(\delta)$ above).  

# Writing the LAMMPS Input File  

We discuss the example input script listed below. In line 2 we specify that SI units are to be used. We specify the dimension (3) and boundary conditions (“shrink-wrapped”) for the computational domain in lines 3 and 4. In line 5 we specify that peridynamic particles are to be used for this simulation. In line 7, we set the “skin” distance used in building the LAMMPS neighbor list. In line 8 we set the lattice constant (in meters) and in line 10 we define the spatial region where the target will be placed. In line 12 we specify a rectangular box enclosing the target region that defines the simulation domain. Line 14 fills the target region with atoms. Lines 15 and 17 define the peridynamic material model, and lines 19 and 21 set the particle density and particle volume, respectively. The particle volume should be set to the cube of the lattice constant for a simple cubic lattice. Line 23 sets the initial velocity of all particles to zero. Line 25 instructs LAMMPS to integrate time with velocity-Verlet, and lines 27-30 create the spherical projectile, sending it with a velocity of $100~\mathrm{m/s}$ towards the target. Line 32 declares a compute style for the damage (percentage of broken bonds) associated with each particle. Line 33 sets the timestep, line 34 instructs LAMMPS to provide a screen dump of thermodynamic quantities every 200 timesteps, and line 35 instructs LAMMPS to create a data file (dump.peri) with a complete snapshot of the system every 100 timesteps. This file can be used to create still images or movies. Finally, line 36 instructs LAMMPS to run for 2000 timesteps.  

Listing 5: Peridynamics Example LAMMPS Input Script   


<html><body><table><tr><td colspan="2">: 3D Peridynamic simulation with projectile</td></tr><tr><td>units S1</td><td></td></tr><tr><td>dimension 3</td><td></td></tr><tr><td>boundary SSS</td><td></td></tr><tr><td>atom style peri</td><td></td></tr></table></body></html>  

(continued from previous page)  

atom_modify map array   
7 neighbor 0.0010 bin   
8 lattice sc 0.0005   
# Create desired target   
10 region target cylinder y 0.0 0.0 0.037 -0.0025 0.0 units box   
11 # Make 1 atom type   
12 create_box 1 target   
13 # Create the atoms in the simulation region   
14 create_atoms 1 region target   
15 pair_style peri/pmb   
16 # <type1> <type2> <c> <horizon> $<$ <s00> <alpha>   
17 pair_coeff \* 1.6863e22 0.0015001 0.0005 0.25   
18 # Set mass density   
19 set group all density 2200   
20 # volume = lattice constant^3   
21 set group all volume 1.25e-10   
22 # Zero out velocities of particles   
23 velocity all set 0.0 0.0 0.0 sum no units box   
24 # Use velocity-Verlet time integrator   
25 fix F1 all nve   
26 # Construct spherical indenter to shatter target   
27 variable y0 equal 0.00510   
28 variable vy equal -100   
29 variable y equal "v_y0 + step\*dt\*v_vy"   
30 fix F2 all indent 1e17 sphere 0.0000 v_y 0.0000 0.0050 units box   
31 # Compute damage for each particle   
32 compute C1 all damage/atom   
33 timestep 1.0e-7   
34 thermo 200   
35 dump D1 all custom 100 dump.peri id type x y z c_C1   
36 run 2000  

# Note  

To use the LPS model, replace line 15 with pair_style peri/lps and modify line 16 accordingly.  

# Numerical Results and Discussion  

We ran the input script from above. Images of the disk (projectile not shown) appear in Figure below. The plot of damage on the top monolayer was created by coloring each particle according to its damage.  

The symmetry in the computed solution arises because a “perfect” lattice was used, and a because a perfectly spherical projectile impacted the lattice at its geometric center. To break the symmetry in the solution, the nodes in the peridynamic body may be perturbed slightly from the lattice sites. To do this, the lattice of points can be slightly perturbed using the displace_atoms command.  

![](images/d88465156cc09c99ee34b26f21e4012a47aaeb304593ed70f1fc38154a5644f5.jpg)  
(a) Cut view of target during impact.  

(b)Top monolayer showing fragmenta.   
tion. (Silling 2005) Silling Askari, Computer and Structures, 83, 1526-1535 (2005).   
(Silling 2007) Silling, Epton, Weckner, Xu, Askari, J Elasticity, 88, 151-184 (2007).   
(Seleson 2010) Seleson, Parks, Int J Mult Comp Eng 9(6), pp. 689-706, 2011.  

![](images/f3b45be8ec5c9a96d0ea05493a13245ef18f191f11a1728dbb4ac279f1712677.jpg)  
(c) Top monolayer showing damage. (blue $=0\%$ broken bonds; $\mathrm{red}=100\%$ broken bonds)  

![](images/41faac5840dc5c3e3bcbd0a94b4b72fa2111de24b364aaff8b68381523504bae.jpg)  
Fig. 3: Target during (a) and after (b,c) impact  

# 8.5.10 Manifolds (surfaces)  

# Overview:  

This page is not about a LAMMPS input script command, but about manifolds, which are generalized surfaces, as defined and used by the MANIFOLD package, to track particle motion on the manifolds. See the src/MANIFOLD/README file for more details about the package and its commands.  

Below is a list of currently supported manifolds by the MANIFOLD package, their parameters and a short description of them. The parameters listed here are in the same order as they should be passed to the relevant fixes.  

<html><body><table><tr><td>man- ifold</td><td>pa- ram- eters</td><td>equation</td><td>description</td></tr><tr><td>cylin- der</td><td>R</td><td>x^2 + y^2 - R^2 = 0</td><td>Cylinder along z-axis, axis going through (0,0,0)</td></tr><tr><td>cylin- der_de1</td><td>Rla</td><td>x^2 + y^2 - r(z)^2 = 0, r(x) = R if | z ↓ > 1, r(z)  A cylinder with a dent around z = 0 = R - a*(1 + cos(z/l))/2 otherwise</td><td></td></tr><tr><td>bell</td><td>dumb- a A Bc</td><td>+1）*（/z-7）+（ +x ）- (A*sin(B*z^2))^4)=0</td><td></td></tr><tr><td>ellip- soid</td><td>abc</td><td>(x/a)^2 + (y/b)^2 + (z/c)^2 = 0</td><td>An ellipsoid</td></tr><tr><td>gaus- sian_bu rcl</td><td>A1 rc2</td><td>if( x < rc1) -z + A * exp( -x^2 / (2 1^2) ); else if(x < rc2）-z + a + b*x + c*x^2 + d*x^3; else z</td><td>A Gaussian bump at x = y = O, smoothly tapered to a flat plane z = 0.</td></tr><tr><td>plane</td><td>ab c x0 y0</td><td>0 = (0z-z)* + (0K-△)*q +(0x-x)*</td><td>A plane with normal (a,b,c) going through point (x0,y0,z0)</td></tr><tr><td>plane_I a w</td><td>z0</td><td>Z - a*sin(w*x) = 0</td><td>A plane with a sinusoidal modulation on z along X.</td></tr><tr><td>sphere  R su-</td><td>Rq</td><td>x^2 + y^2 + z^2 -R^2 = 0 |x I^q + I y I^q +| z I^q - R^q = 0</td><td>A sphere of radius R A supersphere of hyperradius R</td></tr><tr><td>per- sphere spine</td><td></td><td></td><td></td></tr><tr><td></td><td>B, B2, C</td><td>a, A, -(x^2 + y^2) + (a^2 - z^2/f(z)^2)*(1 +  An approximation to a dendritic spine (A*sin(g(z)*z^2))^4), f(z) = c if z > 0, 1 oth- erwise; g(z) = B if z > 0, B2 otherwise</td><td></td></tr><tr><td></td><td>spine_t a, A, B, B2, C</td><td>+1)*(v(z)/7vZ-7v）+(Zv + 乙vx)- (A*sin(g(z)*z^2))^2), f(z) = c if z > 0, 1 oth- erwise; g(z) = B if z > 0, B2 otherwise</td><td> Another approximation to a dendritic spine</td></tr><tr><td>thy- lakoid torus</td><td>wB LB 1B R r</td><td>Various, see (Paquay) (R - sqrt( x^2 + y^2 ) )~2 + z^2 - r^2</td><td>A model grana thylakoid consisting of two block- like compartments connected by a bridge of width wB, length LB and taper length 1B A torus with large radius R and small radius r, cen-</td></tr></table></body></html>  

# 8.5. Packages howto  

(Paquay) Paquay and Kusters, Biophys. J., 110, 6, (2016). preprint available at arXiv:1411.3019.  

# 8.5.11 Reproducing hydrodynamics and elastic objects (RHEO)  

The RHEO package is a hybrid implementation of smoothed particle hydrodynamics (SPH) for fluid flow, which can couple to the BPM package to model solid elements. RHEO combines these methods to enable mesh-free modeling of multi-phase material systems. Its SPH solver supports many advanced options including reproducing kernels, particle shifting, free surface identification, and solid surface reconstruction. To model fluid-solid systems, the status of particles can dynamically change between a fluid and solid state, e.g. during melting/solidification, which determines how they interact and their physical behavior. The package is designed with modularity in mind, so one can easily turn various features on/off, adjust physical details of the system, or develop new capabilities. For instance, the numerics associated with calculating gradients, reproducing kernels, etc. are separated into distinct classes to simplify the development of new integration schemes which can call these calculations. Additional numerical details can be found in (Palermo) and (Clemmer). Example movies illustrating some of these capabilities are found at https://www.lammps.org/movies. html#rheopackage.  

Note, if you simply want to run a traditional SPH simulation, the SPH package package is likely better suited for your application. It has fewer advanced features and therefore benefits from improved performance. The MACHDYN package for solids may also be relevant for fluid-solid problems.  

At the core of the package is fix rheo which integrates particle trajectories and controls many optional features (e.g. the use of reproducing kernels). In conjunction to fix rheo, one must specify an instance of fix rheo/pressure and $f\alpha$ rheo/viscosity to define a pressure equation of state and viscosity model, respectively. Optionally, one can model a heat equation with fix rheo/thermal, which also allows the user to specify equations for a particle’s thermal conductivity, specific heat, latent heat, and melting temperature. The ordering of these fixes in an an input script matters. Fix rheo must be defined prior to all other RHEO fixes.  

Typically, RHEO requires atom style rheo. In addition to typical atom properties like positions and forces, particles store a local density, viscosity, pressure, and status. If thermal evolution is modeled, one must use atom style rheo/thermal which also includes a local energy, temperature, and conductivity. Note that the temperature is always derived from the energy. This implies the temperature attribute of the set command does not affect particles. Instead, one should use the sph/e attribute.  

The status variable uses bit-masking to track various properties of a particle such as its current state of matter (fluid or solid) and its location relative to a surface. Some of these properties (and others) can be accessed using compute rheo/property/atom. The status attribute in the set command only allows control over the first bit which sets the state of matter, 0 is fluid and 1 is solid.  

Fluid interactions, including pressure forces, viscous forces, and heat exchange, are calculated using pair rheo. Unlike typical pair styles, pair rheo ignores the special bond settings. Instead, it determines whether to calculate forces based on the status of particles: e.g., hydrodynamic forces are only calculated if a fluid particle is involved.  

To model elastic objects, there are currently two mechanisms in RHEO, one designed for bulk solid bodies and the other for thin shells. Both mechanisms rely on introducing bonded forces between particles and therefore require a hybrid of atom style bond and rheo (or rheo/thermal).  

To create an elastic solid body, one has to (a) change the status of constituent particles to solid (e.g. with the set command), (b) create bpm bonds between the particles (see the bpm howto page for more details), and (c) use pair rheo/solid to apply repulsive contact forces between distinct solid bodies. Akin to pair rheo, pair rheo/solid considers a particle’s fluid/solid phase to determine whether to apply forces. However, unlike pair rheo, pair rheo/solid does obey special bond settings such that contact forces do not have to be calculated between two bonded solid particles in the same elastic body.  

In systems with thermal evolution, fix rheo/thermal can optionally set a melting/solidification temperature allowing particles to dynamically swap their state between fluid and solid when the temperature exceeds or drops below the critical temperature, respectively. Using the react option, one can specify a maximum bond length and a bond type. Then, when solidifying, particles search their local neighbors and automatically create bonds with any neighboring solid particles in range. For BPM bond styles, bonds then use the immediate position of the two particles to calculate a reference state. When melting, particles delete any bonds of the specified type when reverting to a fluid state. Special bonds are updated as bonds are created/broken.  

The other option for elastic objects is an elastic shell that is nominally much thinner than a particle diameter, e.g. a oxide skin which gradually forms over time on the surface of a fluid. Currently, this is implemented using fix rheo/oxidation and bond style rheo/shell. Essentially, fix rheo/oxidation creates candidate bonds of a specified type between surface fluid particles within a specified distance. a newly created rheo/shell bond will then start a timer. While the timer is counting down, the bond will delete itself if particles move too far apart or move away from the surface. However, if the timer reaches a user-defined threshold, then the bond will activate and apply additional forces to the fluid particles. Bond style rheo/shell then operates very similarly to a BPM bond style, storing a reference length and breaking if stretched too far. Unlike the above method, this option does not remove the underlying fluid interactions (although particle shifting is turned off) and does not modify special bond settings of particles.  

While these two options are not expected to be appropriate for every system, either framework can be modified to create more suitable models (e.g. by changing the criteria for creating/deleting a bond or altering force calculations).  

(Palermo) Palermo, Wolf, Clemmer, O’Connor, Phys. Fluids, 36, 113337 (2024).   
(Clemmer) Clemmer, Pierce, O’Connor, Nevins, Jones, Lechman, Tencer, Appl. Math. Model., 130, 310-326 (2024).  

# 8.5.12 Magnetic spins  

The magnetic spin simulations are enabled by the SPIN package, whose implementation is detailed in Tranchida.  

The model represents the simulation of atomic magnetic spins coupled to lattice vibrations. The dynamics of those magnetic spins can be used to simulate a broad range a phenomena related to magneto-elasticity, or or to study the influence of defects on the magnetic properties of materials.  

The magnetic spins are interacting with each others and with the lattice via pair interactions. Typically, the magnetic exchange interaction can be defined using the pair/spin/exchange command. This exchange applies a magnetic torque to a given spin, considering the orientation of its neighboring spins and their relative distances. It also applies a force on the atoms as a function of the spin orientations and their associated inter-atomic distances.  

The command fix precession/spin allows to apply a constant magnetic torque on all the spins in the system. This torque can be an external magnetic field (Zeeman interaction), and an uniaxial or cubic magnetic anisotropy.  

A Langevin thermostat can be applied to those magnetic spins using fix langevin/spin. Typically, this thermostat can be coupled to another Langevin thermostat applied to the atoms using fix langevin in order to simulate thermostatted spin-lattice systems.  

The magnetic damping can also be applied using fix langevin/spin. It allows to either dissipate the thermal energy of the Langevin thermostat, or to perform a relaxation of the magnetic configuration toward an equilibrium state.  

The command fix setforce/spin allows to set the components of the magnetic precession vectors (while erasing and replacing the previously computed magnetic precession vectors on the atom). This command can be used to freeze the magnetic moment of certain atoms in the simulation by zeroing their precession vector.  

The command fix nve/spin can be used to perform a symplectic integration of the combined dynamics of spins and atomic motions.  

The minimization style min/spin can be applied to the spins to perform a minimization of the spin configuration.  

All the computed magnetic properties can be output by two main commands. The first one is compute spin, that enables to evaluate magnetic averaged quantities, such as the total magnetization of the system along x, y, or z, the spin temperature, or the magnetic energy. The second command is compute property/atom. It enables to output all the per atom magnetic quantities. Typically, the orientation of a given magnetic spin, or the magnetic force acting on this spin.  

# 8.5. Packages howto  

(Tranchida) Tranchida, Plimpton, Thibaudeau and Thompson, Journal of Computational Physics, 372, 406-425, (2018).  

# 8.6 Tutorials howto  

# 8.6.1 Using CMake with LAMMPS  

The support for building LAMMPS with CMake is a recent addition to LAMMPS thanks to the efforts of Christoph Junghans (LANL) and Richard Berger (LANL). One of the key strengths of CMake is that it is not tied to a specific platform or build system. Instead it generates the files necessary to build and develop for different build systems and on different platforms. Note, that this applies to the build system itself not the LAMMPS code. In other words, without additional porting effort, it is not possible - for example - to compile LAMMPS with Visual $\mathrm{C}{+}{+}$ on Windows. The build system output can also include support files necessary to program LAMMPS as a project in integrated development environments (IDE) like Eclipse, Visual Studio, QtCreator, Xcode, CodeBlocks, Kate and others.  

A second important feature of CMake is that it can detect and validate available libraries, optimal settings, available support tools and so on, so that by default LAMMPS will take advantage of available tools without requiring to provide the details about how to enable/integrate them.  

The downside of this approach is, that there is some complexity associated with running CMake itself and how to customize the building of LAMMPS. This tutorial will show how to manage this through some selected examples. Please see the chapter about building LAMMPS for descriptions of specific flags and options for LAMMPS in general and for specific packages.  

CMake can be used through either the command-line interface (CLI) program cmake (or cmake3), a text mode interactive user interface (TUI) program ccmake (or ccmake3), or a graphical user interface (GUI) program cmake-gui. All of them are portable software available on all supported platforms and can be used interchangeably. As of LAMMPS version 2 August 2023, the minimum required CMake version is 3.16.  

All details about features and settings for CMake are in the CMake online documentation. We focus below on the mos important aspects with respect to compiling LAMMPS.  

# Prerequisites  

This tutorial assumes that you are operating in a command-line environment using a shell like Bash or Zsh.  

• Linux: any Terminal window will work or text console • macOS: launch the Terminal application • Windows 10 or 11: install and run the Windows Subsystem for Linux • other Unix-like operating systems like FreeBSD  

# Note  

It is also possible to use CMake on Windows 10 or 11 through either the Microsoft Visual Studio IDE with the bundled CMake or from the Windows command prompt using a separately installed CMake package, both using the native Microsoft Visual $\mathrm{C}{+}{+}$ compilers and (optionally) the Microsoft MPI SDK. This tutorial, however, only covers unix-like command-line interfaces.  

We also assume that you have downloaded and unpacked a recent LAMMPS source code package or used Git to create a clone of the LAMMPS sources on your compilation machine.  

You should change into the top level directory of the LAMMPS source tree all paths mentioned in the tutorial are relative to that. Immediately after downloading it should look like this:  

<html><body><table><tr><td colspan="6"></td></tr><tr><td>$ ls bench doc</td><td></td><td>lib</td><td></td><td>potentials README tools</td><td></td></tr><tr><td>cmake</td><td>examples</td><td>SLICENSE</td><td>python</td><td>src</td><td></td></tr></table></body></html>  

# Build versus source directory  

When using CMake the build procedure is separated into multiple distinct phases:  

1. Configuration: detect or define which features and settings should be enable and used and how LAMMPS should be compiled   
2. Compilation: generate and compile all necessary source files and build libraries and executables.   
3. Installation: copy selected files from the compilation into your file system, so they can be used without having to keep the source and build tree around.  

The configuration and compilation of LAMMPS has to happen in a dedicated build directory which must be different from the source directory. Also the source directory (src) must remain pristine, so it is not allowed to “install” packages using the traditional make process and after an compilation attempt all created source files must be removed. This can be achieved with make no-all purge.  

You can pick any folder outside the source tree. We recommend to create a folder build in the top-level directory, or multiple folders in case you want to have separate builds of LAMMPS with different options (build-parallel, build-serial) or with different compilers (build-gnu, build-clang, build-intel) and so on. All the auxiliary files created by one build process (executable, object files, log files, etc) are stored in this directory or subdirectories within it that CMake creates.  

# Running CMake  

# CLI version  

In the (empty) build directory, we now run the command cmake ../cmake, which will start the configuration phase and you will see the progress of the configuration printed to the screen followed by a summary of the enabled features, options and compiler settings. A typical summary screen will look like this:  

\$ cmake ../cmake/   
-- The CXX compiler identification is GNU 8.2.0   
-- Check for working CXX compiler: /opt/tools/gcc-8.2.0/bin/c++   
-- Check for working CXX compiler: /opt/tools/gcc-8.2.0/bin/c++ - works   
-- Detecting CXX compiler ABI info   
-- Detecting CXX compiler ABI info - done   
$-$ Detecting CXX compile features   
$-$ Detecting CXX compile features - done   
$-$ Found Git: /usr/bin/git (found version "2.25.2")   
$-$ Running check for auto-generated files from make-based build system   
$-$ Found MPI_CXX: /usr/lib64/mpich/lib/libmpicxx.so (found version "3.1")   
$-$ Found MPI: TRUE (found version "3.1")   
$-$ Looking for C++ include omp.h   
$-$ Looking for C++ include omp.h - found   
$-$ Found OpenMP_CXX: -fopenmp (found version "4.5")   
$-$ Found OpenMP: TRUE (found version "4.5")   
$-$ Found JPEG: /usr/lib64/libjpeg.so (found version "62")   
$-$ Found PNG: /usr/lib64/libpng.so (found version "1.6.37")   
$-$ Found ZLIB: /usr/lib64/libz.so (found version "1.2.11")   
-- Found GZIP: /usr/bin/gzip   
-- Found FFMPEG: /usr/bin/ffmpeg  

(continues on next page)  

# 8.6. Tutorials howto  

(continued from previous page) $-$ Performing Test COMPILER_SUPPORTS-ffast-math $-$ Performing Test COMPILER_SUPPORTS-ffast-math - Success $-$ Performing Test COMPILER_SUPPORTS-march=native $-$ Performing Test COMPILER_SUPPORTS-march=native - Success $-$ Looking for C++ include cmath $-$ Looking for C++ include cmath - found $-$ Generating style_angle.h... [...] $-$ Generating lmpinstalledpkgs.h... $-$ The following tools and libraries have been found and configured: \* Git \* MPI \* OpenMP \* JPEG \* PNG \* ZLIB <<< Build configuration >>> Build type: RelWithDebInfo Install path: /home/akohlmey/.local Generator: Unix Makefiles using /usr/bin/gmake - <<< Compilers and Flags: >>> $-$ C++ Compiler: /opt/tools/gcc-8.2.0/bin/c++ Type: GNU Version: 8.2.0 C++ Flags: -O2 -g -DNDEBUG Defines: LAMMPS_SMALLBIG;LAMMPS_MEMALIGN=64;LAMMPS_JPEG;LAMMPS_ $\hookrightarrow$ PNG;LAMMPS_GZIP;LAMMPS_FFMPEG Options: -ffast-math;-march=native <<< Linker flags: >>> $-$ Executable name: lmp $-$ Static library flags: - <<< MPI flags >>> $-$ MPI includes: /usr/include/mpich-x86_64 -- MPI libraries: /usr/lib64/mpich/lib/libmpicxx.so;/usr/lib64/mpich/lib/libmpi.so; -- Configuring done -- Generating done - Build files have been written to: /home/akohlmey/compile/lammps/build  

The cmake command has one mandatory argument, and that is a folder with either the file CMakeLists.txt or CMakeCache.txt. The CMakeCache.txt file is created during the CMake configuration run and contains all active settings, thus after a first run of CMake all future runs in the build folder can use the folder . and CMake will know where to find the CMake scripts and reload the settings from the previous step. This means, that one can modify an existing configuration by re-running CMake, but only needs to provide flags indicating the desired change, everything else will be retained. One can also mix compilation and configuration, i.e. start with a minimal configuration and then, if needed, enable additional features and recompile.  

The steps above will NOT compile the code. The compilation can be started in a portable fashion with cmake --build ., or you use the selected built tool, e.g. make.  

# TUI version  

For the text mode UI CMake program the basic principle is the same. You start the command ccmake ../cmake in the build folder.  

![](images/ba5863d7f5e595a2d2536e9a9da64f89e10327caa736ed2e294a201e58b0d835.jpg)  
Fig. 4: Initial ccmake screen  

![](images/e947faf5fb6aa5aa689f9bed38e860a7d3067e3a0020f251c462bc7a56e48f7e.jpg)  
Fig. 5: Configure output of ccmake  

![](images/d89dd1a1d4bb61bd6736dd42cd07665096bc9d6dec7db6034ad8d6a09e61c872.jpg)  
Fig. 6: Options screen of ccmake  

This will show you the initial screen (left image) with the empty configuration cache. Now you type the ‘c’ key to run the configuration step. That will do a first configuration run and show the summary (center image). You exit the summary screen with ‘e’ and see now the main screen with detected options and settings. You can now make changes by moving and down with the arrow keys of the keyboard and modify entries. For on/off settings, the enter key will toggle the state. For others, hitting enter will allow you to modify the value and you commit the change by hitting the enter key again or cancel using the escape key. All “new” settings will be marked with a star ‘\*’ and for as long as one setting is marked like this, you have to re-run the configuration by hitting the ‘c’ key again, sometimes multiple times unless the TUI shows the word “generate” next to the letter ‘g’ and by hitting the ‘g’ key the build files will be written to the folder and the TUI exits. You can quit without generating build files by hitting ‘q’.  

# GUI version  

For the graphical CMake program the steps are similar to the TUI version. You can type the command cmake-gui ../cmake in the build folder. In this case the path to the CMake script folder is not required, it can also be entered from the GUI.  

![](images/b4b5945baad51b22730a2bc28af30d63af0edcb5366a7725f0bf3ed791f9356d.jpg)  
Fig. 7: Initial cmake-gui screen  

![](images/74b97b1bd695f0d48e6e86eb09f3c4714e1630edac251311597b9f4e9e7db091.jpg)  
Fig. 8: Generator selection in cmake-gui  

![](images/af8bf7be105e06fed96c0dc3e6db72274a8bf7ec02a35ecff7f50aaf0a080fa8.jpg)  
Fig. 9: Options screen of cmake-gui  

Again, you start with an empty configuration cache (left image) and need to start the configuration step. For the very first configuration in a folder, you will have a pop-up dialog (center image) asking to select the desired build tool and some configuration settings (stick with the default) and then you get the option screen with all new settings highlighted in red. You can modify them (or not) and click on the “configure” button again until satisfied and click on the “generate” button to write out the build files. You can exit the GUI from the “File” menu or hit “ctrl- $\overrightarrow{\mathrm{~q~}}^{,}$ .  

# 8.6. Tutorials howto  

# Setting options  

Options that enable, disable or modify settings are modified by setting the value of CMake variables. This is done on the command-line with the - $\cdot D$ flag in the format -D VARIABLE ${}={}$ value, e.g. -D CMAKE_BUILD_TYPE $\vDash$ Release or -D BUILD_ $\scriptstyle{\mathrm{MPI}}={\mathrm{on}}$ . There is one quirk: when used before the CMake directory, there may be a space between the - $\cdot D$ flag and the variable, after it must not be. Such CMake variables can have boolean values (on/off, yes/no, or 1/0 are all valid) or are strings representing a choice, or a path, or are free format. If the string would contain whitespace, it must be put in quotes, for example -D CMAKE_TUNE_FLAGS $=^{11}$ -ftree-vectorize -ffast-math".  

CMake variables fall into two categories: 1) common CMake variables that are used by default for any CMake configuration setup and 2) project specific variables, i.e. settings that are specific for LAMMPS. Also CMake variables can be flagged as advanced, which means they are not shown in the text mode or graphical CMake program in the overview of all settings by default, but only when explicitly requested (by hitting the ‘t’ key or clicking on the ‘Advanced’ check-box).  

# Some common CMake variables  

<html><body><table><tr><td>Variable</td><td>Description</td></tr><tr><td></td><td>CMAKE _INSTALL _PREFIX root directory of install location for make install (default: $HOME /.local) LAMMPS _INSTALL _RPATH set or remove runtime path setting from binaries for make install (default: off)</td></tr><tr><td>CMAKEBUILDTYPE</td><td>controls compilation options: one of RelWithDebInfo (default), Release, De-</td></tr><tr><td>BUILDSHAREDLIBS</td><td>bug,MinSizeRel if set to on build the LAMMPS library as shared library (default: off)</td></tr><tr><td></td><td>CMAKE _MAKE _PROGRAMN name/path of the compilation command (default depends on -G option, usually</td></tr><tr><td></td><td>make)</td></tr><tr><td>CMAKE_C_COMPILER</td><td>CMAKE_VERBOSE _MAKE] if set to on echo commands while executing during build (default: off) C compiler to be used for compilation (default: system specific, gcc on Linux)</td></tr><tr><td>CMAKE_CXX_COMPILER</td><td>C++ compiler to be used for compilation (default: system specific, g++ on</td></tr><tr><td></td><td>Linux) CMAKE _Fortran _COMPILEl Fortran compiler to be used for compilation (default: system specific, gfortran</td></tr><tr><td></td><td>on Linux)</td></tr><tr><td></td><td>(default: empty)</td></tr></table></body></html>  

# Some common LAMMPS specific variables  

<html><body><table><tr><td>Variable</td><td>Description</td></tr><tr><td>BUILD MPI</td><td>build LAMMPS with MPI support (default: on if a working MPI available, else off)</td></tr><tr><td>BUILD OMP</td><td>else off)</td></tr><tr><td>BUILD TOOLS</td><td>compile some additional executables from the tools folder (default: off)</td></tr><tr><td>BUILD DOC CMAKETUNE_FC</td><td>include building the HTML format documentation for packaging/installing (default: off)</td></tr><tr><td></td><td></td></tr><tr><td>FFT</td><td>liblammps_name.a select which FFT library to use: FFTW3, MKL, KISS (default, unless FFTW3 is found)</td></tr><tr><td>FFTKOKKOS</td><td>select which FFT library to use in Kokkos-enabled styles: FFTW3, MKL, HIPFFT, CUFFT, MKL GPU, KISS (default)</td></tr><tr><td>FFT SINGLE</td><td>select whether to use single precision FFTs (default: off)</td></tr><tr><td>WITHJPEG</td><td></td></tr><tr><td>WITH PNG</td><td>whether to support PNG format in dump image (default: on if found)</td></tr><tr><td>WITH GZIP</td><td>whether to support reading and writing compressed files (default: on if found)</td></tr><tr><td>WITHFFMPEG</td><td>whether to support generating movies with dump movie (default: on if found)</td></tr></table></body></html>  

# Enabling or disabling LAMMPS packages  

The LAMMPS software is organized into a common core that is always included and a large number of add-on packages that have to be enabled to be included into a LAMMPS executable. Packages are enabled through setting variables of the kind $\mathrm{PKG\_}_{-}\mathrm{<NAME>}$ to on and disabled by setting them to off (or using yes, no, 1, 0 correspondingly). ${<}\mathrm{NAME>}$ has to be replaced by the name of the package, e.g. MOLECULE or EXTRA-PAIR.  

# Using presets  

Since LAMMPS has a lot of optional features and packages, specifying them all on the command-line can be tedious. Or when selecting a different compiler toolchain, multiple options have to be changed consistently and that is rather error prone. Or when enabling certain packages, they require consistent settings to be operated in a particular mode. For this purpose, we are providing a selection of “preset files” for CMake in the folder cmake/presets. They represent a way to pre-load or override the CMake configuration cache by setting or changing CMake variables. Preset files are loaded using the - $C$ command-line flag. You can combine loading multiple preset files or change some variables later with additional - $-D$ flags. A few examples:  

cmake -C ../cmake/presets/basic.cmake -D PKG_MISC=on ../cmake cmake -C ../cmake/presets/clang.cmake -C ../cmake/presets/most.cmake ../cmake cmake -C ../cmake/presets/basic.cmake -D BUILD_MPI=off ../cmake  

The first command will install the packages KSPACE, MANYBODY, MOLECULE, RIGID and MISC; the first four from the preset file and the fifth from the explicit variable definition. The second command will first switch the compiler toolchain to use the Clang compilers and install a large number of packages that are not depending on any special external libraries or tools and are not very unusual. The third command will enable the first four packages like above and then enforce compiling LAMMPS as a serial program (using the MPI STUBS library).  

It is also possible to do this incrementally.  

cmake -C ../cmake/presets/basic.cmake ../cmake cmake -D PKG_MISC=on .  

will achieve the same final configuration as in the first example above. In this scenario it is particularly convenient to do the second configuration step using either the text mode or graphical user interface (ccmake or cmake-gui).  

![](images/f0715c4bad241655252062d2b4b8258e3f07a05f4b79c24d390af366d9efe912.jpg)  

# Note  

Using a preset to select a compiler package (clang.cmake, gcc.cmake, intel.cmake, oneapi.cmake, or pgi.cmake) are an exception to the mechanism of updating the configuration incrementally, as they will trigger a reset of cached internal CMake settings and thus reset settings to their default values.  

# Compilation and build targets  

The actual compilation will be started by running the selected build command (on Linux this is by default make, see below how to select alternatives). You can also use the portable command cmake --build . which will adapt to whatever the selected build command is. This is particularly convenient, if you have set a custom build command via the CMAKE_MAKE_PROGRAM variable.  

When calling the build program, you can also select which “target” is to be build through appending the --target flag and the name of the target to the build command. When using make as build tool, you can just append the target name to the command. Example: cmake --build . --target all or make all. The following abstract targets are available:  

# 8.6. Tutorials howto  

<html><body><table><tr><td>Target</td><td>Description</td></tr><tr><td>all</td><td>build “everything (default)</td></tr><tr><td>lammps</td><td>build the LAMMPS library and executable</td></tr><tr><td>doc</td><td>build the HTML documentation (if configured)</td></tr><tr><td>install</td><td>install all target files into folders in CMAKE CINSTALLPREFIX</td></tr><tr><td>test</td><td>runsome tests (if configured with -D ENABLE TESTING=on)</td></tr><tr><td>clean</td><td>remove all generatedfiles</td></tr></table></body></html>  

# Choosing generators  

While CMake usually defaults to creating makefiles to compile software with the make program, it supports multiple alternate build tools (e.g. ninja-build which tends to be faster and more efficient in parallelizing builds than make) and can generate project files for integrated development environments (IDEs) like VisualStudio, Eclipse or CodeBlocks. This is specific to how the local CMake version was configured and compiled. The list of available options can be seen at the end of the output of cmake --help. Example on Fedora 31 this is:  

<html><body><table><tr><td colspan="2">Generators</td></tr><tr><td colspan="2">The following generators are available on this platform (* marks default):</td></tr><tr><td>* Unix Makefiles Green Hills MULTI</td><td>= Generates standard UNIX makefiles. = Generates Green Hills MULTI files</td></tr><tr><td>Ninja</td><td>(experimental, work-in-progress).</td></tr><tr><td></td><td>= Generates build.ninja files.</td></tr><tr><td>Ninja Multi-Config WatcomWMake</td><td>= Generates build-<Config>.ninja files.</td></tr><tr><td></td><td>Generates Watcom WMake makefiles.</td></tr><tr><td>CodeBlocks - Ninja</td><td>Generates CodeBlocks project files.</td></tr><tr><td>CodeBlocks - Unix Makefiles = Generates CodeBlocks project files.</td><td></td></tr><tr><td>CodeLite - Ninja</td><td>= Generates CodeLite project files.</td></tr><tr><td>CodeLite - Unix Makefiles Sublime Text 2 - Ninja</td><td>= Generates CodeLite project files.</td></tr><tr><td>Sublime Text 2 - Unix Makefiles</td><td>= Generates Sublime Text 2 project files.</td></tr><tr><td>= Generates Sublime Text 2 project files.</td><td></td></tr><tr><td>Kate - Ninja</td><td>: Generates Kate project files.</td></tr><tr><td>Kate - Unix Makefiles</td><td>= Generates Kate project files.</td></tr><tr><td>Eclipse CDT4 - Ninja</td><td></td></tr><tr><td></td><td>= Generates Eclipse CDT 4.0 project files.</td></tr><tr><td>Eclipse CDT4 - Unix Makefiles= Generates Eclipse CDT 4.0 project files.</td><td></td></tr></table></body></html>  

Below is a screenshot of using the CodeBlocks IDE with the ninja build tool after running CMake as follows:  

cmake -G 'CodeBlocks - Ninja' ../cmake/presets/most.cmake ../cmake/  

![](images/a6190174ad55e6876e40d82f8548c0207600a71b23e00a4420db0d8976e56f76.jpg)  

# 8.6.2 LAMMPS GitHub tutorial  

written by Stefan Paquay  

This document describes the process of how to use GitHub to integrate changes or additions you have made to LAMMPS into the official LAMMPS distribution. It uses the process of updating this very tutorial as an example to describe the individual steps and options. You need to be familiar with git and you may want to have a look at the git book to familiarize yourself with some of the more advanced git features used below.  

As of fall 2016, submitting contributions to LAMMPS via pull requests on GitHub is the preferred option for integrating contributed features or improvements to LAMMPS, as it significantly reduces the amount of work required by the LAMMPS developers. Consequently, creating a pull request will increase your chances to have your contribution included and will reduce the time until the integration is complete. For more information on the requirements to have your code included into LAMMPS please see this page.  

# Making an account  

First of all, you need a GitHub account. This is fairly simple, just go to GitHub and create an account by clicking the “Sign up for GitHub” button. Once your account is created, you can sign in by clicking the button in the top left and filling in your username or e-mail address and password.  

# Forking the repository  

# 8.6. Tutorials howto  

To get changes into LAMMPS, you need to first fork the lammps/lammps repository on GitHub. At the time of writing, develop is the preferred target branch. Thus go to LAMMPS on GitHub and make sure branch is set to “develop”, as shown in the figure below.  

![](images/6a15c65dc03cd46a74ea45032caf28271badbceb8cc84ff2232228b7c7029dae.jpg)  

If it is not, use the button to change it to develop. Once it is, use the fork button to create a fork.  

![](images/80251a35008c82e137384a20edec0db84fc835d424e2d0414bfad4fcf13dea47.jpg)  

This will create a fork (which is essentially a copy, but uses less resources) of the LAMMPS repository under your own GitHub account. You can make changes in this fork and later file pull requests to allow the upstream repository to merge changes from your own fork into the one we just forked from (or others that were forked from the same repository). At the same time, you can set things up, so you can include changes from upstream into your repository and thus keep it in sync with the ongoing LAMMPS development.  

# Adding changes to your own fork  

Additions to the upstream version of LAMMPS are handled using feature branches. For every new feature, a so-called feature branch is created, which contains only those modification relevant to one specific feature. For example, adding a single fix would consist of creating a branch with only the fix header and source file and nothing else. It is explained in more detail here: feature branch workflow.  

# Feature branches  

First of all, create a clone of your version on GitHub on your local machine via HTTPS:  

git clone https://github.com/<your user name>/lammps.git <some name>  

or, if you have set up your GitHub account for using SSH keys, via SSH:  

<html><body><table><tr><td>git clone git@github.com:<your user name> /lammps.git</td></tr></table></body></html>  

You can find the proper URL by clicking the “Clone or download”-button:  

![](images/1ab2abc711787645470a57a62c6ac6085c592043cc57650fb14f28a757f31b3e.jpg)  

The above command copies (“clones”) the git repository to your local machine to a directory with the name you chose If none is given, it will default to “lammps”. Typical names are “mylammps” or something similar.  

You can use this local clone to make changes and test them without interfering with the repository on GitHub.  

To pull changes from upstream into this copy, you can go to the directory and use git pull:  

cd mylammps   
git checkout develop   
git pull https://github.com/lammps/lammps develop  

You can also add this URL as a remote:  

git remote add upstream https://www.github.com/lammps/lammps  

From then on you can update your upstream branches with:  

git fetch upstream  

and then refer to the upstream repository branches with upstream/develop or upstream/release and so on.  

At this point, you typically make a feature branch from the updated branch for the feature you want to work on. This tutorial contains the workflow that updated this tutorial, and hence we will call the branch “github-tutorial-update”:  

git fetch upstream git checkout -b github-tutorial-update upstream/develop  

Now that we have changed branches, we can make our changes to our local repository. Just remember that if you want to start working on another, unrelated feature, you should switch branches!  

![](images/d480b45af9dbb112aaf00e6d9ab6b9122920b43c9537fd5975afc3f0f40688fb.jpg)  

# Note  

Committing changes to the develop, release, or stable branches is strongly discouraged. While it may be convenient initially, it will create more work in the long run. Various texts and tutorials on using git effectively discuss the motivation for using feature branches instead.  

After changes are made  

# 8.6. Tutorials howto  

After everything is done, add the files to the branch and commit them:  

git add doc/src/Howto_github.txt git add doc/src/JPG/tutorial\*.png  

![](images/5b1293442d08d53d5a06e620ea402db06d33bb98e179b57f1c51085d3f65c1c3.jpg)  

# Warning  

Do not use git commit -a (or git add -A). The -a flag (or -A flag) will automatically include all modified and new files and that is rarely the behavior you want. It can easily lead to accidentally adding unrelated and unwanted changes into the repository. Instead it is preferable to explicitly use git add, git rm, git mv for adding, removing, renaming individual files, respectively, and then git commit to finalize the commit. Carefully check all pending changes with git status before committing them. If you find doing this on the command-line too tedious, consider using a GUI, for example the one included in git distributions written in Tk, i.e. use git gui (on some Linux distributions it may be required to install an additional package to use it).  

After adding all files, the change set can be committed with some useful message that explains the change.  

git commit -m 'Finally updated the GitHub tutorial'  

After the commit, the changes can be pushed to the same branch on GitHub:  

![](images/3d603f11affb3857b8d3e228ccb8a0c8b73da5fe9d8b39c328ef113d721519bb.jpg)  

Git will ask you for your user name and password on GitHub if you have not configured anything. If your local branch is not present on GitHub yet, it will ask you to add it by running  

git push --set-upstream origin github-tutorial-update  

If you correctly type your user name and password, the feature branch should be added to your fork on GitHub. If you want to make really sure you push to the right repository (which is good practice), you can provide it explicitly  

![](images/5b6b7ddc6ef79ba61fba9ee945b72ea4a04c81baf32b8c6ca8e901b950b7216f.jpg)  

Make sure that the current branch is set to the correct one, which, in this case, is “github-tutorial-update”. If done correctly, the only changes you will see are those that were made on this branch.  

This will open up a new window that lists changes made to the repository. If you are just adding new files, there is not much to do, but I suppose merge conflicts are to be resolved here if there are changes in existing files. If all changes can automatically be merged, green text at the top will say so and you can click the “Create pull request” button, see image.  

# Open a pull request  

![](images/acee5c9c2dcd7c1d6f3bcda37fd757f69d9ec0046bbbc5899f9e63f973875e7b.jpg)  

Before creating the pull request, make sure the short title is accurate and add a comment with details about your pull request. Here you write what your modifications do and why they should be incorporated upstream.  

Note the checkbox that says “Allow edits from maintainers”. This is checked by default checkbox (although in my version of Firefox, only the checkmark is visible):  

![](images/0e1201007892dae2953773441b76ea537c645696e8f5512e34bb7a22c3331f04.jpg)  

If it is checked, maintainers can immediately add their own edits to the pull request. This helps the inclusion of your branch significantly, as simple/trivial changes can be added directly to your pull request branch by the LAMMPS maintainers. The alternative would be that they make changes on their own version of the branch and file a reverse pull request to you. Just leave this box checked unless you have a very good reason not to.  

Now just write some nice comments and click on “Create pull request”.  

![](images/d80ea7e5699edffd0e95b9a43c387a6334b95c44619533b0eac53ef127a5cf78.jpg)  

![](images/43ad3365ee584298fa5620552e30e703d6ccf0140fa29b2bac44ff5d5ac71a70.jpg)  

# After filing a pull request  

![](images/3a726d6d2dcaddff6d7f53d324d86c88e94c981bcc4cdfa48fd83e66eeb374cf.jpg)  

When you submit a pull request (or ask for a pull request) for the first time, you will receive an invitation to become a LAMMPS project collaborator. Please accept this invite as being a collaborator will simplify certain administrative tasks and will probably speed up the merging of your feature, too.  

You will notice that after filing the pull request, some checks are performed automatically:  

# GitHub tutorial update #315  

![](images/ebf928abf1f170061de8d7f20825f46b399c71b4f80c9baf3f1fa3cef73b4812.jpg)  

If all is fine, you will see this:  

Add more commits by pushing to the github-tutorial-update branch on Pakketeretet2/lammps.  

![](images/b28283d0fdf91cfdbd9c216c24f0df40ac22eb70e50f0a4e36d3329c9864ad46.jpg)  

If any of the checks are failing, your pull request will not be processed, as your changes may break compilation for certain configurations or may not merge cleanly. It is your responsibility to remove the reason(s) for the failed test(s). If you need help with this, please contact the LAMMPS developers by adding a comment explaining your problems with resolving the failed tests.  

A few further interesting things (can) happen to pull requests before they are included.  

# Additional changes  

First of all, any additional changes you push into your branch in your repository will automatically become part of the pull request:  

![](images/93f305f838bc99a32d91b65309339585159e35c628f6842ff9001706c25ac524.jpg)  

This means you can add changes that should be part of the feature after filing the pull request, which is useful in case you have forgotten them, or if a developer has requested that something needs to be changed before the feature can be accepted into the official LAMMPS version. After each push, the automated checks are run again.  

# Labels  

LAMMPS developers may add labels to your pull request to assign it to categories (mostly for bookkeeping purposes), but a few of them are important: needs_work, work_in_progress, run_tests, test_for_regression, and ready_for_merge. The first two indicate, that your pull request is not considered to be complete. With “needs_work” the burden is on exclusively on you; while “work_in_progress” can also mean, that a LAMMPS developer may want to add changes. Please watch the comments to the pull requests. The two “test” labels are used to trigger extended tests before the code is merged. This is sometimes done by LAMMPS developers, if they suspect that there may be some subtle side effects from your changes. It is not done by default, because those tests are very time-consuming. The ready_for_merge label is usually attached when the LAMMPS developer assigned to the pull request considers this request complete and to trigger a final full test evaluation.  

# Reviews  

As of Fall 2021, a pull request needs to pass all automatic tests and at least 1 approving review from a LAMMPS developer with write access to the repository before it is eligible for merging. In case your changes touch code that certain developers are associated with, they are auto-requested by the GitHub software. Those associations are set in the file .github/CODEOWNERS Thus if you want to be automatically notified to review when anybody changes files or packages, that you have contributed to LAMMPS, you can add suitable patterns to that file, or a LAMMPS developer may add you.  

Otherwise, you can also manually request reviews from specific developers, or LAMMPS developers - in their assessment of your pull request - may determine who else should be reviewing your contribution and add that person. Through reviews, LAMMPS developers also may request specific changes from you. If those are not addressed, your pull requests cannot be merged.  

# Assignees  

There is an assignee property for pull requests. If the request has not been reviewed by any developer yet, it is not assigned to anyone. After revision, a developer can choose to assign it to either a) you, b) a LAMMPS developer (including him/herself) or c) Axel Kohlmeyer (akohlmey).  

• Case a) happens if changes are required on your part   
• Case b) means that at the moment, it is being tested and reviewed by a LAMMPS developer with the expectation that some changes would be required. After the review, the developer can choose to implement changes directly or suggest them to you.   
• Case c) means that the pull request has been assigned to the developer overseeing the merging of pull requests into the develop branch.  

In this case, Axel assigned the tutorial to Steve:  

![](images/7cdadf02416d65dd2cd501f91cc0f34512478eb1db5ccc41583d1ddfce341798.jpg)  

# Edits from LAMMPS maintainers  

If you allowed edits from maintainers (the default), any LAMMPS maintainer can add changes to your pull request. In this case, both Axel and Richard made changes to the tutorial:  

![](images/1f0c0d878c3e208bb362a8cf9198b3e9907c2d8a3ab8c4fa27ec73208f00412e.jpg)  

# Reverse pull requests  

Sometimes, however, you might not feel comfortable having other people push changes into your own branch, or maybe the maintainers are not sure their idea was the right one. In such a case, they can make changes, reassign you as the assignee, and file a “reverse pull request”, i.e. file a pull request in your forked GitHub repository to include changes in the branch, that you have submitted as a pull request yourself. In that case, you can choose to merge their changes  

# 8.6. Tutorials howto  

back into your branch, possibly make additional changes or corrections and proceed from there. It looks something like this:  

![](images/46782ea700ba5a5a2f28578d6cb00e29127ebbb5d565a3004813f567c1749700.jpg)  

For some reason, the highlighted button did not work in my case, but I can go to my own repository and merge the pull request from there:  

![](images/27a2ed5ea505ca8a4adfa07ef9611d2aaeaabac64e58ee4411991743bfe71c17.jpg)  

# some formatting updates and text rewrites for your pu request #1  

![](images/cfcaa8571d8dbe45a800debcbbcde7b5218355656acab08b7d6d6faee4fe9442.jpg)  

Be sure to check the changes to see if you agree with them by clicking on the tab button:  

# some formatting updates and text rewrites for your pull request #1  

![](images/b779bbaf87954d339358c3e16fcbba05e5dabb98f904ac949e6579753f6452bd.jpg)  

In this case, most of it is changes in the markup and a short rewrite of Axel’s explanation of the “git gui” and “git add” commands.  

![](images/1726f5a534d16daf417477e8834e00d3b3a77d75648480e28d0487b297684879.jpg)  

Because the changes are OK with us, we are going to merge by clicking on “Merge pull request”. After a merge it looks like this:  

Thanks Axel, will merge after a review.  

![](images/a95458d6f1c53d71d4f785707c509a03250479bf72960db62a4188b8a0e8c1a1.jpg)  

![](images/f2f1e74b2edc756170fcd6f9d728c888e522dea5e8702ab4c28a35d0a584ccf8.jpg)  

Avoidbugsbyautomaticallyrunningyourtests.  

![](images/40c3b9829a758a19d12a25fd4d98d9200989e833f18d2122514bb1d417148639.jpg)  

Now, since in the meantime our local text for the tutorial also changed, we need to pull Axel’s change back into our branch, and merge them:  

![](images/0c5e3eddc0cd4434a7990a84d4e38256fb76791e06442e9813cd3a30ba33a447.jpg)  

In this case, the merge was painless because git could auto-merge:  

![](images/762567d56b63d84f0db588e25a918a809022d53c99872f212da9e7f7548a9558.jpg)  

With Axel’s changes merged in and some final text updates, our feature branch is now perfect as far as we are concerned, so we are going to commit and push again:  

![](images/c9e324dc07074320665820445400c2cdc8cd82e00f6b15999da9db3bb8340995.jpg)  

This merge also shows up on the lammps GitHub page:  

![](images/56caca951b1754add4618ebd912988e6da6bf74dfad213cb2a551d72b0098bfa.jpg)  

# After a merge  

When everything is fine, the feature branch is merged into the develop branch:  

![](images/cd57fbe842d0f0756f5447af23031b92abf849dbdeacd4069313c1be2059a225.jpg)  

Now one question remains: What to do with the feature branch that got merged into upstream?  

It is in principle safe to delete them from your own fork. This helps keep it a bit more tidy. Note that you first have to switch to another branch!  

git checkout develop git pull https://github.com/lammps/lammps develop git branch -d github-tutorial-update  

If you do not pull first, it is not really a problem but git will warn you at the next statement that you are deleting a local branch that was not yet fully merged into HEAD. This is because git does not yet know your branch just got merged into LAMMPS upstream. If you first delete and then pull, everything should still be fine. You can display all branches that are fully merged by:  

Finally, if you delete the branch locally, you might want to push this to your remote(s) as well:  

# Recent changes in the workflow  

Some recent changes to the workflow are not captured in this tutorial. For example, in addition to the develop branch, to which all new features should be submitted, there is also a release, a stable, and a maintenance branch; the release branch is updated from the develop branch as part of a “feature release”, and stable (together with release) are updated from develop when a “stable release” is made. In between stable releases, selected bug fixes and infrastructure updates are back-ported from the develop branch to the maintenance branch and occasionally merged to stable as an update release.  

Furthermore, the naming of the release tags now follow the pattern “patch_<Day><Month> $<$ Year>” to simplify comparisons between releases. For stable releases additional “stable_<Day><Month> $<$ Year>” tags are applied and update releases are tagged with “stable_<Day><Month> $\cdot<$ Year>_update<Number>”, Finally, all releases and submissions are subject to automatic testing and code checks to make sure they compile with a variety of compilers and popular operating systems. Some unit and regression testing is applied as well.  

A detailed discussion of the LAMMPS developer GitHub workflow can be found in the file doc/github-developmentworkflow.md  

# 8.6.3 Using LAMMPS-GUI  

This document describes LAMMPS-GUI version 1.6.  

LAMMPS-GUI is a graphical text editor customized for editing LAMMPS input files that is linked to the LAMMPS library and thus can run LAMMPS directly using the contents of the editor’s text buffer as input. It can retrieve and display information from LAMMPS while it is running, display visualizations created with the dump image command,  

# 8.6. Tutorials howto  

and is adapted specifically for editing LAMMPS input files through text completion and reformatting, and linking to the online LAMMPS documentation for known LAMMPS commands and styles.  

![](images/850d835a9acd6bfaed7b2198c86a6d69c1d66f7522991ccb788e5b1d0f990e1c.jpg)  

# Note  

Pre-compiled, ready-to-use LAMMPS-GUI executables for Linux $\mathrm{~x86.~}64$ (Ubuntu 20.04LTS or later and compatible), macOS (version 11 aka Big Sur or later), and Windows (version 10 or later) are available for download. Non-MPI LAMMPS executables (as lmp) for running LAMMPS from the command-line and some LAMMPS tools compiled executables are also included. Also, the pre-compiled LAMMPS-GUI packages include the WHAM executables from http://membrane.urmc.rochester.edu/content/wham/ for use with LAMMPS tutorials.  

The source code for LAMMPS-GUI is included in the LAMMPS source code distribution and can be found in the tools/lammps-gui folder. It can be compiled alongside LAMMPS when compiling with CMake.  

LAMMPS-GUI tries to provide an experience similar to what people traditionally would have running LAMMPS using a command-line window and the console LAMMPS executable but just rolled into a single executable:  

• writing & editing LAMMPS input files with a text editor • run LAMMPS on those input file with selected command-line flags • extract data from the created files and visualize it with and external software  

That procedure is quite effective for people proficient in using the command-line, as that allows them to use tools for the individual steps that they are most comfortable with. In fact, it is often required to adopt this workflow when running LAMMPS simulations on high-performance computing facilities.  

The main benefit of using LAMMPS-GUI is that many basic tasks can be done directly from the GUI without switching to a text console window or using external programs, let alone writing scripts to extract data from the generated output. It also integrates well with graphical desktop environments where the .lmp filename extension can be registered with LAMMPS-GUI as the executable to launch when double clicking on such files. Also, LAMMPS-GUI has support for drag-n-drop, i.e. an input file can be selected and then moved and dropped on the LAMMPS-GUI executable, and LAMMPS-GUI will launch and read the file into its buffer. In many cases LAMMPS-GUI will be integrated into the graphical desktop environment and can be launched like other applications.  

LAMMPS-GUI thus makes it easier for beginners to get started running simple LAMMPS simulations. It is very suitable for tutorials on LAMMPS since you only need to learn how to use a single program for most tasks and thus time can be saved and people can focus on learning LAMMPS. The tutorials at https://lammpstutorials.github.io/ are specifically updated for use with LAMMPS-GUI and can their tutorial materials can be downloaded and loaded directly from the GUI.  

Another design goal is to keep the barrier low when replacing part of the functionality of LAMMPS-GUI with external tools. That said, LAMMPS-GUI has some unique functionality that is not found elsewhere:  

• auto-adapting to features available in the integrated LAMMPS library   
• auto-completion for LAMMPS commands and options   
• context-sensitive online help   
• start and stop of simulations via mouse or keyboard   
• monitoring of simulation progress   
• interactive visualization using the dump image command with the option to copy-paste the resulting settings   
• automatic slide show generation from dump image out at runtime   
• automatic plotting of thermodynamics data at runtime   
• inspection of binary restart files  

The following text provides a detailed tour of the features and functionality of LAMMPS-GUI. Suggestions for new features and reports of bugs are always welcome. You can use the the same channels as for LAMMPS itself for that purpose.  

# Installing Pre-compiled LAMMPS-GUI Packages  

LAMMPS-GUI is available as pre-compiled binary packages for Linux $\mathrm{~x86.~}64$ , macOS 11 and later, and Windows 10 and later. Alternately, it can be compiled from source.  

# Windows 10 and later  

After downloading the LAMMPS-Win10-64bit-GUI- $<$ version $>$ .exe installer package, you need to execute it, and start the installation process. Since those packages are currently unsigned, you have to enable “Developer Mode” in the Windows System Settings to run the installer.  

# MacOS 11 and later  

After downloading the LAMMPS-macOS-multiarch-GUI- $<$ version $>$ .dmg application bundle disk image, you need to double-click it and then, in the window that opens, drag the app bundle as indicated into the “Applications” folder. Afterwards, the disk image can be unmounted. Then follow the instructions in the “README.txt” file to get access to the other included command-line executables.  

# Linux on x86_64  

For Linux with x86_64 CPU there are currently two variants. The first is compiled on Ubuntu 20.04LTS, is using some wrapper scripts, and should be compatible with more recent Linux distributions. After downloading and unpacking the LAMMPS-Linux-x86_64-GUI- $<$ <version $>$ .tar.gz package. You can switch into the “LAMMPS_GUI” folder and execute “./lammps-gui” directly.  

The second variant uses flatpak and requires the flatpak management and runtime software to be installed. After downloading the LAMMPS-GUI-Linux-x86_64-GUI- $<$ version $>$ .flatpak flatpak bundle, you can install it with flatpak install --user LAMMPS-GUI-Linux-x86_64-GUI- $<$ <version $>$ .flatpak. After installation, LAMMPS-GUI should be integrated into your desktop environment under “Applications $>$ Science” but also can be launched from the console with flatpak run org.lammps.lammps-gui. The flatpak bundle also includes the console LAMMPS executable lmp which can be launched to run simulations with, for example with:  

flatpak run --command $=$ lmp org.lammps.lammps-gui -in in.melt  

Other bundled command-line executables are run the same way and can be listed with:  

\$(flatpak info --show-location org.lammps.lammps-gui )/files/bin  

# Compiling from Source  

There also are instructions for compiling LAMMPS-GUI from source code available elsewhere in the manual. Compilation from source requires using CMake.  

# Starting LAMMPS-GUI  

When LAMMPS-GUI starts, it shows the main window, labeled Editor, with either an empty buffer or the contents of the file used as argument. In the latter case it may look like the following:  

![](images/9aecd43c31dd553013181035920dbc8a9c76cd02a939d3585ba2ae92211db5bb.jpg)  

There is the typical menu bar at the top, then the main editor buffer, and a status bar at the bottom. The input file contents are shown with line numbers on the left and the input is colored according to the LAMMPS input file syntax. The status bar shows the status of LAMMPS execution on the left (e.g. “Ready.” when idle) and the current working directory on the right. The name of the current file in the buffer is shown in the window title; the word \*modified\* is added if the buffer edits have not yet saved to a file. The geometry of the main window is stored when exiting and restored when starting again.  

# Opening Files  

The LAMMPS-GUI application can be launched without command-line arguments and then starts with an empty buffer in the Editor window. If arguments are given LAMMPS will use first command-line argument as the file name for the Editor buffer and reads its contents into the buffer, if the file exists. All further arguments are ignored. Files can also be opened via the File menu, the $C t r l{-}O$ (Command- $o$ on macOS) keyboard shortcut or by drag-and-drop of a file from a graphical file manager into the editor window. If a file extension (e.g. .lmp) has been registered with the graphical environment to launch LAMMPS-GUI, an existing input file can be launched with LAMMPS-GUI through double clicking.  

Only one file can be edited at a time, so opening a new file with a filled buffer closes that buffer. If the buffer has unsaved modifications, you are asked to either cancel the operation, discard the changes, or save them. A buffer with modifications can be saved any time from the “File” menu, by the keyboard shortcut Ctrl-S (Command-S on macOS), or by clicking on the “Save” button at the very left in the status bar.  

# Running LAMMPS  

From within the LAMMPS-GUI main window LAMMPS can be started either from the Run menu using the Run LAMMPS from Editor Buffer entry, by the keyboard shortcut Ctrl-Enter (Command-Enter on macOS), or by clicking on the green “Run” button in the status bar. All of these operations causes LAMMPS to process the entire input script in the editor buffer, which may contain multiple run or minimize commands.  

LAMMPS runs in a separate thread, so the GUI stays responsive and is able to interact with the running calculation and access data it produces. It is important to note that running LAMMPS this way is using the contents of the input buffer for the run (via the lammps_commands_string() function of the LAMMPS C-library interface), and not the original file it was read from. Thus, if there are unsaved changes in the buffer, they will be used. As an alternative, it is also possible to run LAMMPS by reading the contents of a file from the Run LAMMPS from File menu entry or with Ctrl-Shift-Enter. This option may be required in some rare cases where the input uses some functionality that is not compatible with running LAMMPS from a string buffer. For consistency, any unsaved changes in the buffer must be either saved to the file or undone before LAMMPS can be run from a file.  

![](images/dd4aae82e06cddc74e1ce24a6107099ac9cd4032bfba5bc5d901a1d0169c3cf2.jpg)  

While LAMMPS is running, the contents of the status bar change. On the left side there is a text indicating that LAMMPS is running, which also indicates the number of active threads, when thread-parallel acceleration was selected in the Preferences dialog. On the right side, a progress bar is shown that displays the estimated progress for the current run or minimize command.  

Also, the line number of the currently executed command is highlighted in green.  

If an error occurs (in the example below the command label was incorrectly capitalized as “Label”), an error message dialog is shown and the line of the input which triggered the error is highlighted. The state of LAMMPS in the status bar is set to “Failed.” instead of “Ready.”  

![](images/3fc5237cbf1c7ac34a419b01d7a53559282e92a19e35dc049f93574f0ca63551.jpg)  

Up to three additional windows may open during a run:  

• an Output window with the captured screen output from LAMMPS • a Charts window with a line graph created from thermodynamic output of the run • a Slide Show window with images created by a dump image command in the input  

More information on those windows and how to adjust their behavior and contents is given below.  

An active LAMMPS run can be stopped cleanly by using either the Stop LAMMPS entry in the Run menu, the keyboard shortcut Ctrl-/ (Command-/ on macOS), or by clicking on the red button in the status bar. This will cause the running LAMMPS process to complete the current timestep (or iteration for energy minimization) and then complete the processing of the buffer while skipping all run or minimize commands. This is equivalent to the input script command timer timeout $O$ and is implemented by calling the lammps_force_timeout() function of the LAMMPS C-library interface. Please see the corresponding documentation pages to understand the implications of this operation.  

# Output Window  

By default, when starting a run, an Output window opens that displays the screen output of the running LAMMPS calculation, as shown below. This text would normally be seen in the command-line window.  

![](images/1d55093944fa75e7cf06cb34fa523f86cf30f2ad7d8ebbf5298b4435bc23f3bd.jpg)  

LAMMPS-GUI captures the screen output from LAMMPS as it is generated and updates the Output window regularly during a run. If there are any warnings or errors in the LAMMPS output, they are highlighted by using bold text colored in red. There is a small panel at the bottom center of the Output window showing how many warnings and errors were detected and how many lines the entire output has. By clicking on the button on the right with the warning symbol or by using the keyboard shortcut $C t r l{-}N$ (Command-N on macOS), you can jump to the next line with a warning or error.  

By default, the Output window is replaced each time a run is started. The runs are counted and the run number for the current run is displayed in the window title. It is possible to change the behavior of LAMMPS-GUI in the preferences dialog to create a new Output window for every run or to not show the current Output window. It is also possible to show or hide the current Output window from the View menu.  

The text in the Output window is read-only and cannot be modified, but keyboard shortcuts to select and copy all or parts of the text can be used to transfer text to another program. Also, the keyboard shortcut $C t r l{-}S$ (Command-S on macOS) is available to save the Output buffer to a file. The “Select All” and “Copy” functions, as well as a “Save Log to File” option are also available from a context menu by clicking with the right mouse button into the Output window text area.  

![](images/e92175aff709a38c975ec5b48c7caa6c4ebe9d1cfdb284c487493d217620effa.jpg)  

Should the Output window contain embedded YAML format text (see above for a demonstration), for example from using thermo_style yaml or thermo_modify line yaml, the keyboard shortcut $C t r l{-}Y$ (Command-Y on macOS) is available to save only the YAML parts to a file. This option is also available from a context menu by clicking with the right mouse button into the Output window text area.  

# Charts Window  

By default, when starting a run, a Charts window opens that displays a plot of thermodynamic output of the LAMMPS calculation as shown below.  

![](images/e95df717706be75d900c5a3a709141a505f05e58d9e87f23de02f648670bf91f.jpg)  

The drop down menu on the top right allows selection of different properties that are computed and written to thermo output. Only one property can be shown at a time. The plots are updated regularly with new data as the run progresses, so they can be used to visually monitor the evolution of available properties. The update interval can be set in the Preferences dialog. By default, the raw data for the selected property is plotted as a blue graph. As soon as there are a sufficient number of data points, there will be a second graph shown in red with a smoothed version of the data. From the drop down menu on the top left, you can select whether to plot only the raw data, only the smoothed data or both. The smoothing uses a Savitzky-Golay convolution filter The window width (left) and order (right) parameters can be set in the boxes next to the drop down menu. Default settings are 10 and 4 which means that the smoothing window includes 10 points each to the left and the right of the current data point and a fourth order polynomial is fit to the data in the window.  

You can use the mouse to zoom into the graph (hold the left button and drag to mark an area) or zoom out (right click) and you can reset the view with a click to the “lens” button next to the data drop down menu.  

The window title shows the current run number that this chart window corresponds to. Same as for the Output window, the chart window is replaced on each new run, but the behavior can be changed in the Preferences dialog.  

From the File menu on the top left, it is possible to save an image of the currently displayed plot or export the data in either plain text columns (for use by plotting tools like gnuplot or grace), as CSV data which can be imported for further processing with Microsoft Excel LibreOffice Calc or with Python via pandas, or as YAML which can be imported into Python with PyYAML or pandas.  

Thermo output data from successive run commands in the input script is combined into a single data set unless the format, number, or names of output columns are changed with a thermo_style or a thermo_modify command, or the current time step is reset with reset_timestep, or if a clear command is issued. This is where the YAML export from the Charts window differs from that of the Output window: here you get the compounded data set starting with the last change of output fields or timestep setting, while the export from the log will contain all YAML output but segmented into individual runs.  

# Image Slide Show  

By default, if the LAMMPS input contains a dump image command, a “Slide Show” window opens which loads and displays the images created by LAMMPS as they are written. This is a convenient way to visually monitor the progress of the simulation.  

# 8.6. Tutorials howto  

![](images/231391b2c558dcd398c6af8a10024ab987b9f6ab0fdc0a565e1d1995b7b94e90.jpg)  

The various buttons at the bottom right of the window allow single stepping through the sequence of images or playing an animation (as a continuous loop or once from first to last). It is also possible to zoom in or zoom out of the displayed images. The button on the very left triggers an export of the slide show animation to a movie file, provided the FFmpeg program is installed.  

When clicking on the “garbage can” icon, all image files of the slide show will be deleted. Since their number can be large for long simulations, this option enables to safely and quickly clean up the clutter caused in the working directory by those image files without risk of deleting other files by accident when using wildcards.  

# Variable Info  

During a run, it may be of interest to monitor the value of input script variables, for example to monitor the progress of loops. This can be done by enabling the “Variables Window” in the View menu or by using the Ctrl-Shift-W keyboard shortcut. This shows info similar to the info variables command in a separate window as shown below.  

![](images/f24a8344280e37dab82e001d9d0d06cbe5d6153d1a2bc5a3a8997647130c725b.jpg)  

Like for the Output and Charts windows, its content is continuously updated during a run. It will show “(none)” if there are no variables defined. Note that it is also possible to set index style variables, that would normally be set via command-line flags, via the “Set Variables. . . ” dialog from the Run menu. LAMMPS-GUI automatically defines the variable “gui_run” to the current value of the run counter. That way it is possible to automatically record a separate log for each run attempt by using the command  

log logfile-\${gui_run}.txt  

at the beginning of an input file. That would record logs to files logfile-1.txt, logfile-2.txt, and so on for successive runs.  

# Snapshot Image Viewer  

By selecting the Create Image entry in the Run menu, or by hitting the Ctrl-I (Command-I on macOS) keyboard shortcut, or by clicking on the “palette” button in the status bar of the Editor window, LAMMPS-GUI sends a custom write_dump image command to LAMMPS and reads back the resulting snapshot image with the current state of the system into an image viewer. This functionality is not available during an ongoing run. In case LAMMPS is not yet initialized, LAMMPS-GUI tries to identify the line with the first run or minimize command and execute all commands from the input buffer up to that line, and then executes a “run $0^{\cdot\cdot}$ command. This initializes the system so an image of the initial state of the system can be rendered. If there was an error in that process, the snapshot image viewer does not appear.  

When possible, LAMMPS-GUI tries to detect which elements the atoms correspond to (via their mass) and then colorize them in the image and set their atom diameters accordingly. If this is not possible, for instance when using reduced $(={}^{\cdot}1\mathrm{{j}^{\cdot}})$ ) units, then LAMMPS-GUI will check the current pair style and if it is a Lennard-Jones type potential, it will extract the sigma parameter for each atom type and assign atom diameters from those numbers. For cases where atom diameters are not auto-detected, the Atom size field can be edited and a suitable value set manually. The default value is inferred from the $\mathbf{X}$ -direction lattice spacing.  

If elements cannot be detected the default sequence of colors of the dump image command is assigned to the differen atom types.  

![](images/7a622e276b9504e6753c0219f1b3abf73f99634a37771697470764f8d1f9ecab.jpg)  

The default image size, some default image quality settings, the view style and some colors can be changed in the Preferences dialog window. From the image viewer window further adjustments can be made: actual image size, highquality (SSAO) rendering, anti-aliasing, view style, display of box or axes, zoom factor. The view of the system can be rotated horizontally and vertically. It is also possible to only display the atoms within a group defined in the input script (default is “all”). The image can also be re-centered on the center of mass of the selected group. After each change, the image is rendered again and the display updated. The small palette icon on the top left is colored while LAMMPS is running to render the new image; it is grayed out when LAMMPS is finished. When there are many atoms to render and high quality images with anti-aliasing are requested, re-rendering may take several seconds. From the File menu of the image window, the current image can be saved to a file (keyboard shortcut Ctrl-S) or copied to the clipboard (keyboard shortcut Ctrl-C) for pasting the image into another application.  

From the File menu it is also possible to copy the current dump image and dump_modify commands to the clipboard so they can be pasted into a LAMMPS input file so that the visualization settings of the snapshot image can be repeated for the entire simulation (and thus be repeated in the slide show viewer). This feature has the keyboard shortcut $C t r l{-}D$ .  

# Editor Window  

The Editor window of LAMMPS-GUI has most of the usual functionality that similar programs have: text selection via mouse or with cursor moves while holding the Shift key, Cut $(C t r l-X)$ , Copy $(C t r l-C)$ , Paste $(C t r l-V)$ , Undo $\left(C t r l-Z\right)$ , Redo (Ctrl-Shift-Z), Select All $\left(C t r l-A\right)$ . When trying to exit the editor with a modified buffer, a dialog will pop up asking whether to cancel the exit operation, or to save or not save the buffer contents to a file.  

The editor has an auto-save mode that can be enabled or disabled in the Preferences dialog. In auto-save mode, the editor buffer is automatically saved before running LAMMPS or before exiting LAMMPS-GUI.  

# Context Specific Word Completion  

By default, LAMMPS-GUI displays a small pop-up frame with possible choices for LAMMPS input script commands or styles after 2 characters of a word have been typed.  

![](images/a7b3997a5f85041a94f6fc21cc95e05903c041751bd1ef79dd7ba3d9f6e3e4ee.jpg)  

The word can then be completed through selecting an entry by scrolling up and down with the cursor keys and selecting with the ‘Enter’ key or by clicking on the entry with the mouse. The automatic completion pop-up can be disabled in the Preferences dialog, but the completion can still be requested manually by either hitting the ‘Shift-TAB’ key or by right-clicking with the mouse and selecting the option from the context menu. Most of the completion information is retrieved from the active LAMMPS instance and thus it shows only available options that have been enabled when compiling LAMMPS. That list, however, excludes accelerated styles and commands; for improved clarity, only the non-suffix version of styles are shown.  

# Line Reformatting  

The editor supports reformatting lines according to the syntax in order to have consistently aligned lines. This primarily means adding whitespace padding to commands, type specifiers, IDs and names. This reformatting is performed manually by hitting the ‘Tab’ key. It is also possible to have this done automatically when hitting the ‘Enter’ key to start a new line. This feature can be turned on or off in the Preferences dialog for Editor Settings with the “Reformat with ‘Enter’” checkbox. The amount of padding for multiple categories can be adjusted in the same dialog.  

Internally this functionality is achieved by splitting the line into “words” and then putting it back together with padding added where the context can be detected; otherwise a single space is used between words.  

# Context Specific Help  

![](images/f07b9b310f0a83a151bb365035b5109bfda87314195a5c252925956eb07ef8a2.jpg)  

A unique feature of LAMMPS-GUI is the option to look up the LAMMPS documentation for the command in the current line. This can be done by either clicking the right mouse button or by using the Ctrl-? keyboard shortcut. When using the mouse, there are additional entries in the context menu that open the corresponding documentation page in the online LAMMPS documentation in a web browser window. When using the keyboard, the first of those entries is chosen.  

If the word under the cursor is a file, then additionally the context menu has an entry to open the file in a read-only text viewer window. If the file is a LAMMPS restart file, instead the menu entry offers to inspect the restart.  

The text viewer is a convenient way to view the contents of files that are referenced in the input. The file viewer also supports on-the-fly decompression based on the file name suffix in a similar fashion as available with LAMMPS. If the necessary decompression program is missing or the file cannot be decompressed, the viewer window will contain a corresponding message.  

# Inspecting a Restart file  

When LAMMPS-GUI is asked to “Inspect a Restart”, it will read the restart file into a LAMMPS instance and then open three different windows. The first window is a text viewer with the output of an info command with system information stored in the restart. The second window is text viewer containing a data file generated with a write_data command. The third window is a Snapshot Image Viewer containing a visualization of the system in the restart.  

If the restart file is larger than 250 MBytes, a dialog will ask for confirmation before continuing, since large restart files may require large amounts of RAM since the entire system must be read into RAM. Thus restart file for large simulations that have been run on an HPC cluster may overload a laptop or local workstation. The Show Details. . . button will display a rough estimate of the additional memory required.  

# Menu  

The menu bar has entries File, Edit, Run, View, and About. Instead of using the mouse to click on them, the individual menus can also be activated by hitting the Alt key together with the corresponding underlined letter, that is $A l t\ –F$ activates the File menu. For the corresponding activated sub-menus, the key corresponding the underlined letters can be used to select entries instead of using the mouse.  

# File  

The File menu offers the usual options:  

• New clears the current buffer and resets the file name to \*unknown\*   
• Open opens a dialog to select a new file for editing in the Editor   
• View opens a dialog to select a file for viewing in a separate window (read-only) with support for on-the-fly decompression as explained above.  

# 8.6. Tutorials howto  

• Inspect restart opens a dialog to select a file. If that file is a LAMMPS restart three windows with information about the file are opened.   
• Save saves the current file; if the file name is \*unknown\* a dialog will open to select a new file name   
• Save As opens a dialog to select and new file name (and folder, if desired) and saves the buffer to it. Writing the buffer to a different folder will also switch the current working directory to that folder.   
• Quit exits LAMMPS-GUI. If there are unsaved changes, a dialog will appear to either cancel the operation, or to save, or to not save the modified buffer. In addition, up to 5 recent file names will be listed after the Open entry that allows re-opening recently opened files.   
This list is stored when quitting and recovered when starting again.  

# Edit  

The Edit menu offers the usual editor functions like Undo, Redo, Cut, Copy, Paste, and a Find and Replace dialog (keyboard shortcut $C t r l{-}F,$ . It can also open a Preferences dialog (keyboard shortcut $C t r l-P_{\mathrm{~,~}}$ ) and allows deleting all stored preferences and settings, so they are reset to their default values.  

# Run  

The Run menu has options to start and stop a LAMMPS process. Rather than calling the LAMMPS executable as a separate executable, the LAMMPS-GUI is linked to the LAMMPS library and thus can run LAMMPS internally through the LAMMPS C-library interface in a separate thread.  

Specifically, a LAMMPS instance will be created by calling lammps_open_no_mpi(). The buffer contents are then executed by calling lammps_commands_string(). Certain commands and features are only available after a LAMMPS instance is created. Its presence is indicated by a small LAMMPS L logo in the status bar at the bottom left of the main window. As an alternative, it is also possible to run LAMMPS using the contents of the edited file by reading the file. This is mainly provided as a fallback option in case the input uses some feature that is not available when running from a string buffer.  

The LAMMPS calculations are run in a concurrent thread so that the GUI can stay responsive and be updated during the run. The GUI can retrieve data from the running LAMMPS instance and tell it to stop at the next timestep. The Stop LAMMPS entry will do this by calling the lammps_force_timeout() library function, which is equivalent to a timer timeout $O$ command.  

The Set Variables. . . entry opens a dialog box where index style variables can be set. Those variables are passed to the LAMMPS instance when it is created and are thus set before a run is started.  

![](images/0f41688658ac8a2692e6e07d1fc901a4de38b4fee3d1adf54f54de9a394a8ac3.jpg)  

The Set Variables dialog will be pre-populated with entries that are set as index variables in the input and any variables that are used but not defined, if the built-in parser can detect them. New rows for additional variables can be added through the Add Row button and existing rows can be deleted by clicking on the $X$ icons on the right.  

The Create Image entry will send a dump image command to the LAMMPS instance, read the resulting file, and show it in an Image Viewer window.  

The View in OVITO entry will launch OVITO with a data file containing the current state of the system. This option is only available if LAMMPS-GUI can find the OVITO executable in the system path.  

The View in VMD entry will launch VMD with a data file containing the current state of the system. This option is only available if LAMMPS-GUI can find the VMD executable in the system path.  

# View  

The View menu offers to show or hide additional windows with log output, charts, slide show, variables, or snapshot images. The default settings for their visibility can be changed in the Preferences dialog.  

# About  

The About menu finally offers a couple of dialog windows and an option to launch the LAMMPS online documentation in a web browser. The About LAMMPS-GUI entry displays a dialog with a summary of the configuration settings of the LAMMPS library in use and the version number of LAMMPS-GUI itself. The Quick Help displays a dialog with a minimal description of LAMMPS-GUI. The LAMMPS-GUI Howto entry will open this documentation page from the online documentation in a web browser window. The LAMMPS Manual entry will open the main page of the LAMMPS online documentation in a web browser window. The LAMMPS Tutorial entry will open the main page of the set of LAMMPS tutorials authored and maintained by Simon Gravelle at https://lammpstutorials.github.io/ in a web browser window.  

# Find and Replace  

![](images/d1b6936b9017845e86507ca1802962652576c46e4f1283743300913315527124.jpg)  

The Find and Replace dialog allows searching for and replacing text in the Editor window.  

The dialog can be opened either from the Edit menu or with the keyboard shortcut $C t r l{-}F$ . You can enter the text to search for. Through three check-boxes the search behavior can be adjusted:  

• If checked, “Match case” does a case sensitive search; otherwise the search is case insensitive. • If checked, “Wrap around” starts searching from the start of the document, if there is no match found from the current cursor position until the end of the document; otherwise the search will stop. • If checked, the “Whole word” setting only finds full word matches (white space and special characters are word boundaries).  

Clicking on the Next button will search for the next occurrence of the search text and select / highlight it. Clicking on the Replace button will replace an already highlighted search text and find the next one. If no text is selected, or the selected text does not match the selection string, then the first click on the Replace button will only search and highlight the next occurrence of the search string. Clicking on the Replace All button will replace all occurrences from the cursor position to the end of the file; if the Wrap around box is checked, then it will replace all occurrences in the entire document. Clicking on the Done button will dismiss the dialog.  

# 8.6. Tutorials howto  

# Preferences  

The Preferences dialog allows customization of the behavior and look of LAMMPS-GUI. The settings are grouped and each group is displayed within a tab.  

![](images/422bfd6bf318cb031279c753dab408cde34c281b3a106ca110aea8683c043cc2.jpg)  

# General Settings:  

• Echo input to log: when checked, all input commands, including variable expansions, are echoed to the Output window. This is equivalent to using -echo screen at the command-line. There is no log file produced by default, since LAMMPS-GUI uses -log none.   
• Include citation details: when checked full citation info will be included to the log window. This is equivalent to using -cite screen on the command-line.   
• Show log window by default: when checked, the screen output of a LAMMPS run will be collected in a log window during the run   
• Show chart window by default: when checked, the thermodynamic output of a LAMMPS run will be collected and displayed in a chart window as line graphs.   
• Show slide show window by default: when checked, a slide show window will be shown with images from a dump image command, if present, in the LAMMPS input.   
• Replace log window on new run: when checked, an existing log window will be replaced on a new LAMMPS run, otherwise each run will create a new log window.   
• Replace chart window on new run: when checked, an existing chart window will be replaced on a new LAMMPS run, otherwise each run will create a new chart window.   
• Replace image window on new render: when checked, an existing chart window will be replaced when a new snapshot image is requested, otherwise each command will create a new image window.   
• Path to LAMMPS Shared Library File: this option is only visible when LAMMPS-GUI was compiled to load the LAMMPS library at run time instead of being linked to it directly. With the Browse.. button or by changing the text, a different shared library file with a different compilation of LAMMPS with different settings or from a different version can be loaded. After this setting was changed, LAMMPS-GUI needs to be re-launched.   
• Select Default Font: Opens a font selection dialog where the type and size for the default font (used for everything but the editor and log) of the application can be set.   
• Select Text Font: Opens a font selection dialog where the type and size for the text editor and log font of the application can be set.   
• Data update interval: Allows to set the time interval between data updates during a LAMMPS run in milliseconds. The default is to update the data (for charts and output window) every 10 milliseconds. This is good for many cases. Set this to 100 milliseconds or more if LAMMPS-GUI consumes too many resources during a run. For LAMMPS runs that run very fast (for example in tutorial examples), however, data may be missed and through lowering this interval, this can be corrected. However, this will make the GUI use more resources. This setting may be changed to a value between 1 and 1000 milliseconds.   
• Charts update interval: Allows to set the time interval between redrawing the plots in the Charts window in mil  

liseconds. The default is to redraw the plots every 500 milliseconds. This is just for the drawing, data collection  

is managed with the previous setting.  

# Accelerators:  

This tab enables selection of an accelerator package for LAMMPS to use and is equivalent to using the -suffix and - package flags on the command-line. Only settings supported by the LAMMPS library and local hardware are available. The Number of threads field allows setting the maximum number of threads for the accelerator packages that use threads.  

# Snapshot Image:  

This tab allows setting defaults for the snapshot images displayed in the Image Viewer window, such as its dimensions and the zoom factor applied. The Antialias switch will render images with twice the number of pixels for width and height and then smoothly scale the image back to the requested size. This produces higher quality images with smoother edges at the expense of requiring more CPU time to render the image. The HQ Image mode option turns on screen space ambient occlusion (SSAO) mode when rendering images. This is also more time consuming, but produces a more ‘spatial’ representation of the system shading of atoms by their depth. The Shiny Image mode option will render objects with a shiny surface when enabled. Otherwise the surfaces will be matted. The Show Box option selects whether the system box is drawn as a colored set of sticks. Similarly, the Show Axes option selects whether a representation of the three system axes will be drawn as colored sticks. The VDW Style checkbox selects whether atoms are represented by space filling spheres when checked or by smaller spheres and sticks. Finally there are a couple of drop down lists to select the background and box colors.  

# Editor Settings:  

This tab allows tweaking settings of the editor window. Specifically the amount of padding to be added to LAMMPS commands, types or type ranges, IDs (e.g. for fixes), and names (e.g. for groups). The value set is the minimum width for the text element and it can be chosen in the range between 1 and 32.  

The three settings which follow enable or disable the automatic reformatting when hitting the ‘Enter’ key, the automatic display of the completion pop-up window, and whether auto-save mode is enabled. In auto-save mode the editor buffer is saved before a run or before exiting LAMMPS-GUI.  

# Keyboard Shortcuts  

Almost all functionality is accessible from the menu of the editor window or through keyboard shortcuts. The following shortcuts are available (On macOS use the Command key instead of Ctrl/Control).  

<html><body><table><tr><td>Shortcut</td><td>Function</td><td>Shortcut</td><td>Function</td><td>Shortcut</td><td>Function</td></tr><tr><td>Ctrl+N</td><td>New File</td><td>Ctrl+Z</td><td>Undo edit</td><td>Ctrl+Enter</td><td>Run Input</td></tr><tr><td>Ctrl+O</td><td>Open File</td><td>Ctrl+Shift+Z</td><td>Redo edit</td><td>Ctrl+/</td><td>Stop Active Run</td></tr><tr><td>Ctrl+Shift+F</td><td>ViewFile</td><td>Ctrl+C</td><td>Copy text</td><td>Ctrl+Shift+V</td><td>SetVariables</td></tr><tr><td>Ctrl+S</td><td>Save File</td><td>Ctrl+X</td><td>Cut text</td><td>Ctrl+I</td><td>Snapshot Image</td></tr><tr><td>Ctrl+Shift+S</td><td>SaveFileAs</td><td>Ctrl+V</td><td>Paste text</td><td>Ctrl+L</td><td>Slide Show</td></tr><tr><td>Ctrl+Q</td><td>Quit Application</td><td>Ctrl+A</td><td>SelectAll</td><td>Ctrl+F</td><td>Find and Replace</td></tr><tr><td>Ctrl+W</td><td>CloseWindow</td><td>TAB</td><td>Reformat line</td><td>Shift+TAB</td><td>ShowCompletions</td></tr><tr><td>Ctrl+Shift+Enter</td><td>Run File</td><td>Ctrl+Shift+W</td><td>ShowVariables</td><td>Ctrl+P</td><td>Preferences</td></tr><tr><td>Ctrl+Shift+A</td><td>AboutLAMMPS</td><td>Ctrl+Shift+H</td><td>Quick Help</td><td>Ctrl+Shift+G</td><td>LAMMPS-GUIHowto</td></tr><tr><td>Ctrl+Shift+M</td><td>LAMMPSManual</td><td>Ctrl+?</td><td>Context Help</td><td>Ctrl+Shift+T</td><td>LAMMPSTutorial</td></tr></table></body></html>  

Further editing keybindings are documented with the Qt documentation. In case of conflicts the list above takes precedence.  

# 8.6. Tutorials howto  

All other windows only support a subset of keyboard shortcuts listed above. Typically, the shortcuts Ctrl-/ (Stop Run), Ctrl-W (Close Window), and Ctrl- $Q$ (Quit Application) are supported.  

# 8.6.4 Moltemplate Tutorial  

In this tutorial, we are going to use the tool Moltemplate to set up a classical molecular dynamic simulation using the OPLS-AA force field. The first task is to describe an organic compound and create a complete input deck for LAMMPS. The second task is to map the OPLS-AA force field to a molecular sample created with an external tool, e.g. PACKMOL, and exported as a PDB file. The files used in this tutorial can be found in the tools/moltemplate/tutorial-files folder of the LAMMPS source code distribution.  

# Simulating an organic solvent  

This example aims to create a cubic box of the organic solvent formamide.  

The first step is to create a molecular topology in the LAMMPS-template (LT) file format representing a single molecule, which will be stored in a Moltemplate object called _FAM inherits OPLSAA $\{\}$ . This command states that the object _FAM is based on an existing object called OPLSAA, which contains OPLS-AA parameters, atom type definitions, partial charges, masses and bond-angle rules for many organic and biological compounds.  

The atomic structure is the starting point to populate the command write('Data Atoms') $\{\}$ , which will write the Atoms section in the LAMMPS data file. The OPLS-AA force field uses the atom_style full, therefore, this column format is used: $\#$ atomID molID atomType charge coordX coordY coordZ. The atomIDs are replaced with Moltemplate $\$1$ -type variables, which are then substituted with unique numerical IDs. The same logic is applied to the molID, except that the same variable is used for the whole molecule. The atom types are assigned using $@$ -type variables. The assignment of atom types (e.g. @atom:177, $@$ atom:178) is done using the OPLS-AA atom types defined in the “In Charges” section of the file oplsaa.lt, looking for a reasonable match with the description of the atom. The resulting file (formamide.lt) follows:  

_FAM inherits OPLSAA {  

<html><body><table><tr><td># atomID molID atomType charge coordX coordY coordZ write('Data Atoms') {</td></tr><tr><td></td></tr><tr><td>$atom:C00 $mol @atom:177 0.00 0.100 0.490 0.0 $atom:O01 $mol @atom:178 0.00 1.091 -0.250 0.0</td></tr><tr><td>$atom:N02 $mol @atom:179 0.00 -1.121 -0.181 0.0</td></tr><tr><td>$atom:H03 $mol @atom:182 0.00 -2.013 0.272 0.0</td></tr><tr><td>$atom:H04 $mol @atom:182 0.00 -1.056 -1.190 0.0</td></tr><tr><td>$atom:H05 $mol @atom:221 0.00 0.144 1.570 0.0</td></tr><tr><td></td></tr><tr><td># A list of the bonds in the molecule:</td></tr><tr><td># BondID  AtomID1  AtomID2 write('Data Bond List'){</td></tr><tr><td>$bond:C1 $atom:C00 $atom:O01</td></tr><tr><td>$bond:C2 $atom:C00 $atom:H05</td></tr><tr><td>$bond:C3 $atom:C00 $atom:N02</td></tr><tr><td>$bond:C4 $atom:N02 $atom:H03</td></tr><tr><td>$bond:C5 $atom:N02 $atom:H04</td></tr><tr><td></td></tr></table></body></html>  

You don’t have to specify the charge in this example because they will be assigned according to the atom type. Analogously, only a “Data Bond List” section is needed as the atom type will determine the bond type. The other bonded interactions (e.g. angles, dihedrals, and impropers) will be automatically generated by Moltemplate.  

If the simulation is non-neutral, or Moltemplate complains that you have missing bond, angle, or dihedral types, this means at least one of your atom types is incorrect.  

The second step is to create a master file with instructions to build a starting structure and the LAMMPS commands to run an NPT simulation. The master file (solv_01.lt) follows:  

<html><body><table><tr><td colspan="2"># Import the force field.</td></tr><tr><td colspan="2">import /usr/local/moltemplate/moltemplate/force_fields/oplsaa.lt</td></tr><tr><td colspan="2">import formamide.lt # after oplsaa.lt, as it depends on it.</td></tr><tr><td colspan="2"># Create the input sample.</td></tr><tr><td colspan="2">solv = new FAM [5].move( 4.6, 0, 0)</td></tr><tr><td colspan="2">[5].move( 0, 4.6, 0)</td></tr><tr><td colspan="2">[5].move( 0, 0, 4.6)</td></tr><tr><td colspan="2">solv[*][*][*].move(-11.5, -11.5, -11.5)</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2"># Set the simulation box. write_once("Data Boundary") {</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2">-11.5 11.5 xlo xhi</td></tr><tr><td colspan="2">-11.5 11.5 ylo yhi</td></tr><tr><td colspan="2">-11.5 11.5 zlo zhi</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2"># Create an input deck for LAMMPS. write_once("In Init"){</td></tr><tr><td colspan="2"># Input variables.</td></tr><tr><td>variable run string solv_01</td><td></td></tr><tr><td>variable ts equal  1</td><td># output name # timestep</td></tr><tr><td>variable temp equal 300</td><td></td></tr><tr><td>variable p equal 1.</td><td># equilibrium temperature # equilibrium pressure</td></tr><tr><td>variable d equal</td><td># output frequency</td></tr><tr><td>variable equi equal 5000</td><td># Equilibration steps</td></tr><tr><td>variable prod 0000g 1enba</td><td># Production steps</td></tr><tr><td colspan="2"># PBC (set them before the creation of the box).</td></tr><tr><td colspan="2">boundary p p p</td></tr><tr><td colspan="2"># Run an NPT simulation.</td></tr><tr><td colspan="2">write_once("In Run"){</td></tr><tr><td colspan="2"># Derived variables. variable tcouple equal \$\{ts\}*100</td></tr><tr><td colspan="2">variable pcouple equal\$\{ts\}*1000</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2"># Output.</td></tr><tr><td colspan="2">thermo $d</td></tr><tr><td colspan="2">thermo_style custom step etotal evdwl ecoul elong ebond eangle &</td></tr><tr><td colspan="2">edihed eimp ke pe temp press vol density cpu</td></tr><tr><td colspan="2">thermo modify fush yes</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2"># Trajectory.</td></tr><tr><td colspan="2">pop'{\un1}\$\ p$\pop 1e rYL dunp</td></tr><tr><td colspan="2">dump _modify TRJ unwrap yes</td></tr></table></body></html>  

(continues on next page)  

# 8.6. Tutorials howto  

(continued from previous page)  

# Thermalisation and relaxation, NPT ensemble.   
timestep $\langle\mathbb{S}\backslash\{\mathrm{ts}\}\rangle$   
fix NPT all npt temp $\mathrm{\mathcal{S}~\{t e m p\}~\{~\hat{{\varepsilon}}\{t e m p\}~\{~\hat{{\varepsilon}}\{t e m p l e\}~\{t e m p l e}\}}}$ iso \\$p \\$p \\$\{pcouple\} velocity all create \\$\{temp\} 858096 dist gaussian   
# Short runs to update the PPPM settings as the box shinks.   
run $\langle\mathbb{S}\backslash\{\mathrm{equi}\}\rangle$ post no   
run $\langle\mathbb{S}\backslash\{\mathrm{equi}\}\rangle$ post no   
run $\langle\mathbb{S}\backslash\{\mathrm{equi}\}\rangle$ post no   
run $\mathfrak{P}\backslash\{\mathrm{equi}\}$   
# From now on, the density shouldn't change too much.   
run $\langle\mathbb{S}\backslash\{\mathrm{prod}\}\rangle$   
unfix NPT  

The first two commands insert the content of files oplsaa.lt and formamide.lt into the master file. At this point, we can use the command $\operatorname{solv}=\operatorname{new}$ _FAM [N] to create N copies of a molecule of type _FAM. In this case, we create an array of $5^{*5^{*}5}$ molecules on a cubic grid using the coordinate transformation command .move( 4.6, 0, 0). See the Moltemplate documentation to learn more about the syntax. As the sample was created from scratch, we also specify the simulation box size in the “Data Boundary” section.  

The LAMMPS setting for the force field are specified in the file oplsaa.lt and are written automatically in the input deck. We also specify the boundary conditions and a set of variables in the “In Init” section. The remaining commands to run an NPT simulation are written in the “In Run” section. Note that in this script, LAMMPS variables are protected with the escape character \ to distinguish them from Moltemplate variables, e.g. $\langle\$\{\mathrm{run}\}$ is a LAMMPS variable that is written in the input deck as $\$\{\mathrm{run}\}$ .  

Compile the master file with:  

# Mapping an existing structure  

Another helpful way to use Moltemplate is mapping an existing molecular sample to a force field. This is useful when a complex sample is assembled from different simulations or created with specialized software (e.g. PACKMOL). As in the previous example, all molecular species in the sample must be defined using single-molecule Moltemplate objects. For this example, we use a short polymer in a box containing water molecules and ions in the PDB file model.pdb.  

It is essential to understand that the order of atoms in the PDB file and in the Moltemplate master script must match, as we are using the coordinates from the PDB file in the order they appear. The order of atoms and molecules in the PDB file provided is as follows:  

• 500 water molecules, with atoms ordered in this sequence:  

<html><body><table><tr><td>ATOM</td><td>1</td><td>0</td><td>MOL D</td><td>1</td><td>5.901</td><td>7.384</td><td></td><td>1.103 0.00 0.00</td><td></td><td>DUM</td></tr><tr><td>ATOM</td><td></td><td>2H</td><td>MOL D</td><td>1</td><td>6.047</td><td>8.238</td><td>0.581</td><td>0.00</td><td>0.00</td><td>DUM</td></tr><tr><td>ATOM</td><td></td><td>3H</td><td>MOL D</td><td>1</td><td>6.188</td><td>7.533</td><td></td><td>2.0570.000.00</td><td></td><td>DUM</td></tr></table></body></html>  

• 1 polymer molecule.   
• $1\mathrm{Ca}^{2+}$ ion.   
• 2 Cl- ions.  

In the master LT file, this sequence of molecules is matched with the following commands:  

# Create the sample.   
wat $=$ new SPC[500]   
pol=new PolyNIPAM[1] cat $=$ new Ca[1]   
ani $=$ new Cl[2]  

Note that the first command would create 500 water molecules in the same position in space, and the other commands will use the coordinates specified in the corresponding molecular topology block. However, the coordinates will be overwritten by rendering an external atomic structure file. Note that if the same molecule species are scattered in the input structure, it is recommended to reorder and group together for molecule types to facilitate the creation of the input sample.  

The molecular topology for the polymer is created as in the previous example, with the atom types assigned as in the following schema:  

The molecular topology of the water and ions is stated directly into the master file for the sake of space, but they could also be written in a separate file(s) and imported before the sample is created.  

The resulting master LT file defining short annealing at a fixed volume (NVT) follows:  

# Use the OPLS-AA force field for all species.   
import /usr/local/moltemplate/moltemplate/force_fields/oplsaa.lt   
import PolyNIPAM.lt   
# Define the SPC water and ions as in the OPLS-AA   
Ca inherits OPLSAA { write("Data Atoms"){ \$atom:a1 \$mol:. @atom:354 0.0 0.00000 0.00000 0.000000 }   
Cl inherits OPLSAA { write("Data Atoms"){ \$atom:a1 \$mol:. @atom:344 0.0 0.00000 0.00000 0.000000  

(continues on next page)  

# 8.6. Tutorials howto  

![](images/b949b15938b17ebe339b87f87be47bfff9c50cc280d675450b5d0274aa6c1363.jpg)  
Fig. 11: Atom types assigned to the polymer’s repeating unit.  

(continued from previous page)   
}   
SPC inherits OPLSAA { write("Data Atoms"){ \$atom:O \$mol:. @atom:76 0. 0.0000000 0.00000 0.000000 \$atom:H1 \$mol:. @atom:77 0. 0.8164904 0.00000 0.5773590 \$atom:H2 \$mol:. @atom:77 0. -0.8164904 0.00000 0.5773590 write("Data Bond List") { \$bond:OH1 \$atom:O \$atom:H1 \$bond:OH2 \$atom:O \$atom:H2   
# Create the sample.   
wat=new SPC[500]   
pol=new PolyNIPAM[1]   
cat=new Ca[1]   
ani $=$ new Cl[2]   
# Periodic boundary conditions:   
write_once("Data Boundary"){ 0 26 xlo xhi 0 26 ylo yhi 0 26 zlo zhi   
}   
# Define the input variables.   
write_once("In Init"){ (continues on next page)  

(continued from previous page)  

# ables.  

$\begin{array}{r l}&{\mathrm{\#~Input~vari}}\ &{\mathrm{variable~run}}\ &{\mathrm{variable~ts}}\ &{\mathrm{variable~tem}]}\ &{\mathrm{variable~p}}\ &{\mathrm{variable~equi}}\end{array}$ string sample01 # output name equal 2 # timestep p equal 298.15 # equilibrium temperature equal 1. # equilibrium pressure equal 30000 # equilibration steps  

# PBC (set them before the creation of the box). boundary p p p   
neighbor 3 bin  

# Run an NVT simulation. write_once("In Run"){  

# Set the output.   
thermo 1000   
thermo_style custom step etotal evdwl ecoul elong ebond eangle & edihed eimp pe ke temp press atoms vol density cpu   
thermo_modify flush yes   
compute pe1 all pe/atom pair   
dump TRJ all custom 100 \\$\{run\}.dump id xu yu zu c_pe1  

# Minimise the input structure, just in case. minimize .01 .001 1000 100000 write_data \\$\{run\}.min  

# Set the constrains.   
group watergroup type @atom:76 $@$ atom:77   
fix 0 watergroup shake 0.0001 10 0 b $@$ bond:042_043 a @angle:043_042_043  

# # Short annealing.  

timestep \\$\{ts\}   
fix 1 all nvt temp \\$\{temp\} \\$\{temp\} \\$(100\*dt)   
velocity all create \\$\{temp\} 315443   
run \\$\{equi\}   
unfix 1  

In this example, the water model is SPC and it is defined in the oplsaa.lt file with atom types $@$ atom:76 and @atom:77. For water we also use the group and fix shake commands with Moltemplate $@$ -type variables, to ensure consistency with the numerical values assigned during compilation. To identify the bond and angle types, look for the extended $@$ atom IDs, which in this case are:  

<html><body><table><tr><td>eplace</td><td>@atom:76 @atom:76b042a042 d042i042</td></tr><tr><td>eplace{ @atom:77@atom:77b043a043d043i043</td><td></td></tr></table></body></html>  

From which we can identify the following “Data Bonds By Type”: $@$ bond:042_043 @atom:\*_b042\*_a\*_d\*_i\* $@$ atom: $\mathrm{^{*}\_b043^{*}\_a^{*}\_d^{*}\_i^{*}}$ and “Data Angles By Type”: $@$ angle:043_042_043 @atom:\*_b\*_a043\*_d\*_i\* @atom: $\stackrel{*}{\_}\mathrm{b^{*}}\_\mathrm{a042^{*}\_d^{*}}\mathrm{i^{*}}$ @atom: $\stackrel{*}{\_}\mathrm{b^{*}}\_\mathrm{a043^{*}}\_\mathrm{d^{*}}\_\mathrm{i^{*}}$  

Compile the master file with:  

moltemplate.sh -overlay-all -pdb model.pdb sample01.lt  

# 8.6. Tutorials howto  

And execute the simulation with the following:  

![](images/34f91103c915b028ac80b586fb0c3d5eafd978ddbbb5395dd716d8f2221a749f.jpg)  
mpirun -np 4 lmp -in sample01.in -l sample01.log   
Fig. 12: Sample visualized with Ovito loading the trajectory into the DATA file written after minimization.  

# 8.6.5 LAMMPS Python Tutorial  

# Contents  

![](images/06c7ca6f19f8c110714e1b49e2a22a90e4a218f2adc0ba7ad499544226046f16.jpg)  

# Overview  

The lammps Python module is a wrapper class for the LAMMPS $C$ language library interface API which is written using Python ctypes. The design choice of this wrapper class is to follow the C language API closely with only small changes related to Python specific requirements and to better accommodate object oriented programming.  

In addition to this flat ctypes interface, the lammps wrapper class exposes a discoverable API that doesn’t require as much knowledge of the underlying C language library interface or LAMMPS $\mathrm{C}{+}{+}$ code implementation.  

Finally, the API exposes some additional features for IPython integration into Jupyter notebooks, e.g. for embedde visualization output from dump style image.  

# 8.6. Tutorials howto  

# Step 1: Building LAMMPS as a shared library  

To use LAMMPS inside of Python it has to be compiled as shared library. This library is then loaded by the Python interface. In this example we enable the MOLECULE package and compile LAMMPS with PNG, JPEG and FFMPEG output support enabled.  

![](images/9e2efc011de2b59b854d8c39bf67c8f0a73397f959dd2f6bb3d53ce00c5736f8.jpg)  

# CMake build  

mkdir \$LAMMPS_DIR/build-shared cd \$LAMMPS_DIR/build-shared  

# MPI, PNG, Jpeg, FFMPEG are auto-detected   
cmake ../cmake -DPKG_MOLECULE=yes -DPKG_PYTHON=on -DBUILD_SHARED   
,→LIBS=yes   
make  

# $\mathfrak{G}$ Traditional make  

cd \$LAMMPS_DIR/src  

# add packages if necessary make yes-MOLECULE make yes-PYTHON  

# compile shared library using Makefile   
make mpi mode $:=$ shlib LMP_INC $=$ "-DLAMMPS_PNG -DLAMMPS_JPEG   
,→DLAMMPS_FFMPEG" JPG_LIB $=^{11}$ -lpng -ljpeg"  

# Step 2: Installing the LAMMPS Python package  

Next install the LAMMPS Python package into your current Python installation with:  

![](images/d5d0791c29ff8945a0453eaf355c4c3dedcce4fd9cd7dce2440bb284441816ab.jpg)  

This will create a so-called “wheel” and then install the LAMMPS Python module from that “wheel” into either into a system folder (provided the command is executed with root privileges) or into your personal Python module folder.  

![](images/4b836a2b1d970b4f380a09deed18644f5e3c2c26ce0da6dee3047b369617beb6.jpg)  

Recompiling the shared library requires re-installing the Python package.  

# Installation inside of a virtual environment  

You can use virtual environments to create a custom Python environment specifically tuned for your workflow.  

# Benefits of using a virtualenv  

• isolation of your system Python installation from your development installation   
• installation can happen in your user directory without root access (useful for HPC clusters)   
• installing packages through pip allows you to get newer versions of packages than e.g., through apt-get or yum package managers (and without root access)   
• you can even install specific old versions of a package if necessary  

# Prerequisite (e.g. on Ubuntu)  

# Creating a virtualenv with lammps installed  

# create virtual envrionment named 'testing' python3 -m venv \$HOME/python/testing  

# activate 'testing' environment source \$HOME/python/testing/bin/activate  

Now configure and compile the LAMMPS shared library as outlined above. When using CMake and the shared library has already been build, you need to re-run CMake to update the location of the python executable to the location in the virtual environment with:  

cmake . -DPython_EXECUTABLE=\$(which python)  

# install LAMMPS package in virtualenv (testing) make install-python  

# install other useful packages (testing) pip install matplotlib jupyter mpi4py pandas  

# return to original shell (testing) deactivate  

# Creating a new lammps instance  

To create a lammps object you need to first import the class from the lammps module. By using the default constructor, a new lammps instance is created.  

from lammps import lammps L = lammps()  

See the LAMMPS Python documentation for how to customize the instance creation with optional arguments.  

# 8.6. Tutorials howto  

# Commands  

Sending a LAMMPS command with the library interface is done using the command method of the lammps object. For instance, let’s take the following LAMMPS command:  

region box block 0 10 0 5 -0.5 0.5  

This command can be executed with the following Python code if L is a lammps instance:  

L.command("region box block 0 10 0 5 -0.5 0.5")  

For convenience, the lammps class also provides a command wrapper cmd that turns any LAMMPS command into a regular function call:  

L.cmd.region("box block", 0, 10, 0, 5, -0.5, 0.5)  

Note that each parameter is set as Python number literal. With the wrapper each command takes an arbitrary parameter list and transparently merges it to a single command string, separating individual parameters by white-space.  

The benefit of this approach is avoiding redundant command calls and easier parameterization. With the command function each call needs to be assembled manually using formatted strings.  

$$
\mathrm{\left(L.command(f^{\eta}r e g i o n b o x b l o c k\{x l o\}\{x h i\}\{y l o\}\{y h i\}\{z l o\}\{z h i\}^{\eta})\right.}
$$  

The wrapper accepts parameters directly and will convert them automatically to a final command string.  

L.cmd.region("box block", xlo, xhi, ylo, yhi, zlo, zhi)  

![](images/e772582fa175da78a08b93f6c661558c604f235035e5eb6ab4f0cb03028984a9.jpg)  

# Note  

When running in IPython you can use Tab-completion after L.cmd. to see all available LAMMPS commands.  

# Accessing atom data  

All per-atom properties that are part of the atom style in the current simulation can be accessed using the extract_atoms() method. This can be retrieved as ctypes objects or as NumPy arrays through the lammps.numpy module. Those represent the local atoms of the individual sub-domain for the current MPI process and may contain information for the local ghost atoms or not depending on the property. Both can be accessed as lists, but for the ctypes list object the size is not known and hast to be retrieved first to avoid out-of-bounds accesses.  

(continues on next page)  

(continued from previous page)  

x = L.numpy.extract_atom("x") v = L.numpy.extract_atom("v") print("positions array shape", x.shape) print("velocity array shape", v.shape) # turn on communicating velocities to ghost atoms L.cmd.comm_modify("vel", "yes") v = L.numpy.extract_atom('v') print("velocity array shape", v.shape)  

Some properties can also be set from Python since internally the data of the $\mathrm{C}{+}{+}$ code is accessed directly:  

# set position in 2D simulation x[0] = (1.0, 0.0)   
# set position in 3D simulation $|\mathbf{x}[0]=(1.0,0.0,1.)$  

# Retrieving the values of thermodynamic data and variables  

To access thermodynamic data from the last completed timestep, you can use the get_thermo() method, and to extract the value of (compatible) variables, you can use the extract_variable() method.  

result = L.get_thermo("ke") # kinetic energy result = L.get_thermo("pe") # potential energy result = L.extract_variable("t") / 2.0  

# Error handling  

We are using $\mathrm{C}{+}{+}$ exceptions in LAMMPS for errors and the C language library interface captures and records them. This allows checking whether errors have happened in Python during a call into LAMMPS and then re-throw the error as a Python exception. This way you can handle LAMMPS errors in the conventional way through the Python exception handling mechanism.  

![](images/66bdf3367bb26a4ec4af76638d923de516c570be21ecfeaf62ba0db0a1f1a22f.jpg)  

# Warning  

Capturing a LAMMPS exception in Python can still mean that the current LAMMPS process is in an illegal state and must be terminated. It is advised to save your data and terminate the Python instance as quickly as possible.  

# Using LAMMPS in IPython notebooks and Jupyter  

If the LAMMPS Python package is installed for the same Python interpreter as IPython, you can use LAMMPS directly inside of an IPython notebook inside of Jupyter. Jupyter is a powerful integrated development environment (IDE) for many dynamic languages like Python, Julia and others, which operates inside of any web browser. Besides autocompletion and syntax highlighting it allows you to create formatted documents using Markup, mathematical formulas, graphics and animations intermixed with executable Python code. It is a great format for tutorials and showcasing your latest research.  

To launch an instance of Jupyter simply run the following command inside your Python environment (this assumes you followed the Quick Start instructions):  

# 8.6. Tutorials howto  

# Interactive Python Examples  

Examples of IPython notebooks can be found in the python/examples/ipython subdirectory. To open these notebooks launch jupyter notebook inside this directory and navigate to one of them. If you compiled and installed a LAMMPS shared library with PNG, JPEG and FFMPEG support you should be able to rerun all of these notebooks.  

# Validating a dihedral potential  

This example showcases how an IPython Notebook can be used to compare a simple LAMMPS simulation of a harmonic dihedral potential to its analytical solution. Four atoms are placed in the simulation and the dihedral potential is applied on them using a datafile. Then one of the atoms is rotated along the central axis by setting its position from Python, which changes the dihedral angle.  

<html><body><table><tr><td>phi = [d \* math.pi / 180 for d in range(360)]</td><td></td></tr><tr><td>pos</td><td>[(1.0, math.cos(p), math.sin(p)) for p in phi]</td></tr><tr><td>x = L.numpy.extract _atom("x")</td><td></td></tr><tr><td>pe 二</td><td></td></tr><tr><td>for p in pos:</td><td></td></tr><tr><td>x[3] = p</td><td></td></tr><tr><td>L.cmd.run(O, "post", "no")</td><td></td></tr><tr><td>pe.append(L.get _thermo("pe"))</td><td></td></tr></table></body></html>  

By evaluating the potential energy for each position we can verify that trajectory with the analytical formula. To compare both solutions, we plot both trajectories over each other using matplotlib, which embeds the generated plot inside the IPython notebook.  

![](images/d416f38927b8c4ed84f8770aab9862f2cd8c0ab41213076173b1ef4022bfb0eb.jpg)  

# Running a Monte Carlo relaxation  

This second example shows how to use the lammps Python interface to create a 2D Monte Carlo Relaxation simulation, computing and plotting energy terms and even embedding video output.  

Initially, a 2D system is created in a state with minimal energy.  

![](images/0a42555bc8f1041245adc58a260759de9b0b408d47ea16285cc389503dd93ba8.jpg)  

It is then disordered by moving each atom by a random delta.  

random.seed(27848)   
deltaperturb = 0.2   
x = L.numpy.extract_atom("x")   
natoms = x.shape[0]  

for i in range(natoms): dx = deltaperturb \\* random.uniform(-1, 1) dy = deltaperturb \\* random.uniform(-1, 1) x[i][0] += dx x[i][1] += dy  

L.cmd.run(0, "post", "no")  

![](images/dce754a31b224309610d3dd33a3e9f71e1288f9e174471bf5c5887ba7cda28dc.jpg)  

Finally, the Monte Carlo algorithm is implemented in Python. It continuously moves random atoms by a random delta and only accepts certain moves.  

<html><body><table><tr><td>estart = L.get_thermo("pe") elast = estart</td><td></td></tr><tr><td>naccept</td><td></td></tr><tr><td>0</td><td></td></tr><tr><td>energies = [estart]</td><td></td></tr><tr><td>niterations = 3000</td><td></td></tr><tr><td>deltamove = 0.1</td><td></td></tr><tr><td>kT = 0.05</td><td></td></tr><tr><td></td><td></td></tr><tr><td>for i in range(niterations):</td><td></td></tr><tr><td>x = L.numpy.extract _atom("x")</td><td></td></tr><tr><td>natoms = x.shape[0]</td><td></td></tr><tr><td>iatom = random.randrange(O, natoms)</td><td></td></tr><tr><td>current _atom = x[iatom]</td><td></td></tr></table></body></html>  

# 8.6. Tutorials howto  

(continued from previous page)  

x0 = current_atom[0]   
y0 = current_atom[1]   
dx = deltamove \\* random.uniform(-1, 1)   
dy = deltamove \\* random.uniform(-1, 1)   
${\begin{array}{r l}&{{\mathrm{current}}\_{-}{\mathrm{atom}}[0]={\mathrm{x}}0+{\mathrm{dx}}}\ &{{\mathrm{current}}\_{-}{\mathrm{atom}}[1]={\mathrm{y}}0+{\mathrm{dy}}}\end{array}}$   
L.cmd.run(1, "pre no post no")   
$\begin{array}{l}{{\mathrm{e}=\mathrm{L.get\_thermo(^{\mathrm{\prime\mathrm{\prime}}}p e^{\mathrm{\prime\mathrm{\prime}}})}}}\ {{\mathrm{energies.append(e)}}}\end{array}$   
if e <= elast: naccept += 1 elast = e   
elif random.random() $<=$ math.exp(natoms\\*(elast-e)/kT): naccept += 1 elast = e   
else: $\begin{array}{l}{{\mathrm{current}}\ {-\mathrm{atom}[\mathrm{0}]=\mathrm{x0}}\ {{\mathrm{current}}\mathrm{atom}[\mathrm{1}]=\mathrm{y0}}\end{array}$  

The energies of each iteration are collected in a Python list and finally plotted using matplotlib.  

![](images/4f611c4431aebb3d9aa2c170ab19a9a7fa4c3ea0252c5511b544914336dcf790.jpg)  
Figure  

![](images/cd1d0a216398df2742da583bbb092d1373115b57e5122284040e71a72c37e341.jpg)  
Out[20]: [<matplotlib.lines.Line2D at 0x7f26a40123c8>]  

The IPython notebook also shows how to use dump commands and embed video files inside of the IPython notebook.  

# 8.6.6 PyLammps Tutorial  

The PyLammps interface is deprecated and will be removed in a future release of LAMMPS. As such, the PyLammps version of this tutorial has been removed and is replaced by the Use Python with LAMMPS.  

# 8.6.7 Using LAMMPS on Windows 10 with WSL  

written by Richard Berger  

It’s always been tricky for us to have LAMMPS users and developers work on Windows. We primarily develop LAMMPS to run on Linux clusters. To teach LAMMPS in workshop settings, we had to redirect Windows users to Linux Virtual Machines such as VirtualBox or Unix-like compilation with Cygwin.  

With the latest updates in Windows 10 (Version 2004, Build 19041 or higher), Microsoft has added a new way to work on Linux-based code. The Windows Subsystem for Linux (WSL). With WSL Version 2, you now get a Linux Virtual Machine that transparently integrates into Windows. All you need is to ensure you have the latest Windows updates installed and enable this new feature. Linux VMs are then easily installed using the Microsoft Store.  

In this tutorial, I’ll show you how to set up and compile LAMMPS for both serial and MPI usage in WSL2.  

# 8.6. Tutorials howto  

# Installation  

# Upgrade to the latest Windows 10  

Type “Updates” in Windows Start and select “Check for Updates”.  

![](images/ac173264d91b753cb6f4dd0321de11f58f85440399a04c5fc00682162d90380f.jpg)  

Install all pending updates and reboot your system as many times as necessary. Continue until your Windows installation is updated.  

![](images/27020622aa862f2d79014f69e9fc43449c61c73fceb93f10a5a31bdc3bbd8c1a.jpg)  

Verify your system has at least version 2004 and build 19041 or later. You can find this information by clicking on “OS build info”.  

# 8.6. Tutorials howto  

![](images/854bd05d8af2a58f4fe44f71aac8ceaa8d5529d4b7bb4a7e81777a8349d64489.jpg)  

# Enable WSL  

Next, we must install two additional Windows features to enable WSL support. Open a PowerShell window as an administrator. Type “PowerShell” in Windows Start and select “Run as Administrator”.  

![](images/d15472d4374415273ea538cb7c497b35bb983bead67736f9a302fd3ea1c2e538.jpg)  

Windows will ask you for administrator access. After you accept a new command line window will appear. Type in the following command to install WSL:  

dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart  

![](images/1bb159984ed2bb4cd48a35a315ac7cf757417489db2c35af996bd701dc2218e6.jpg)  

Next, enable the VirtualMachinePlatform feature using the following command:  

dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart  

# LAMMPS Documentation, Release 4Feb2025  

![](images/021fc5c6589796c5294dbd13b70c7ac7405c86669c7de9c3b8a59f03d902ed5d.jpg)  

Finally, reboot your system.  

# Update WSL kernel component  

Download and install the WSL Kernel Component Update. Afterwards, reboot your system.  

# Set WSL2 as default  

Again, open PowerShell as administrator and run the following command:  

wsl --set-default-version 2  

This command ensures that all future Linux installations will use WSL version 2.  

![](images/7f83ce4a50617ae4b255856445f02d94a93f1c1a3b774d8b99ba3514924a5278.jpg)  

# Install a Linux Distribution  

Next, we need to install a Linux distribution via the Microsoft Store. Install Ubuntu 20.04 LTS. Once installed, you can launch it like any other application from the Start Menu.  

![](images/dd14967f4e3dcfda19583a896196c12da9a1f65a51d37a9cad3569b4ba5a7ab5.jpg)  

# Initial Setup  

The first time you launch the Ubuntu Linux console, it will prompt you for a UNIX username and password. You will need this password to perform sudo commands later. Once completed, your Linux shell is ready for use. All your actions and commands will run as the Linux user you specified.  

![](images/fce89979bf37ae9ba89d81b209054cb0eac4b6565bdc9a7c9c8d46801dce44e9.jpg)  

# Windows Explorer / WSL integration  

Your Linux installation will have its own Linux filesystem, which contains the Ubuntu files. Your Linux user will have a regular Linux home directory in /home/ $<$ USERNAME $>$ . This directory is different from your Windows User directory. Windows and Linux filesystems are connected through WSL.  

All hard drives in Windows are accessible in the /mnt directory in Linux. E.g., WSL maps the C hard drive to the $/\mathrm{mnt/c}$ directory. That means you can access your Windows User directory in /mnt/c/Users/ <WINDOWS_USERNAME $>$ .  

The Windows Explorer can also access the Linux filesystem. To illustrate this integration, open an Ubuntu console and navigate to a directory of your choice. To view this location in Windows Explorer, use the explorer.exe . command (do not forget the final dot!).  

![](images/634326b2d9c7ea8af5a6ad56f214480ac8759dde2fddbfa211a9ea7b66957f33.jpg)  

# Compiling LAMMPS  

You now have a fully functioning Ubuntu installation and can follow most guides to install LAMMPS on a Linux system. Here are some of the essential steps to follow:  

# Install prerequisite packages  

Before we can begin, we need to download the necessary compiler toolchain and libraries to compile LAMMPS. In our Ubuntu-based Linux installation, we will use the apt package manager to install additional packages.  

First, upgrade all existing packages using apt update and apt upgrade.  

<html><body><table><tr><td>sudo apt update</td></tr><tr><td>sudo apt upgrade -y</td></tr><tr><td></td></tr></table></body></html>  

Next, install the following packages with apt install:  

<html><body><table><tr><td>sudo apt i install -y cmake : build-essential ccache gfortran openmpi-bin libopenmpi-dev</td></tr><tr><td>libfftw3-dev libjpeg-dev libpng-dev python3-dev p python3-pip python3-virtualenv libblas-dev liblapack-dev libhdf5-serial-dev hdf5-tools</td></tr></table></body></html>  

# Download LAMMPS  

Obtain a copy of the LAMMPS source code and go into it using the cd command.  

# Option 1: Download a LAMMPS tarball using wget  

wget https://github.com/lammps/lammps/archive/stable_3Mar2020.tar.gz   
tar xvzf stable_3Mar2020.tar.gz   
cd lammps  

# Option 2: Download a LAMMPS development version from GitHub  

<html><body><table><tr><td>git clone --depth=1 https://github.com/lammps/lammps.git cdlammps</td></tr></table></body></html>  

# Configure and Compile LAMMPS with CMake  

A beginner-friendly way to compile LAMMPS is to use CMake. Create a build directory to compile LAMMPS and move into it. This directory will store the build configuration and any binaries generated during compilation.  

<html><body><table><tr><td>mkdir build</td></tr><tr><td>cd build</td></tr></table></body></html>  

There are countless ways to compile LAMMPS. It is beyond the scope of this tutorial. If you want to find out more about what can be enabled, please consult the extensive documentation.  

To compile a minimal version of LAMMPS, we’re going to use a preset. Presets are a way to specify a collection of CMake options using a file.  

cmake ../cmake/presets/basic.cmake ../cmake  

This command configures the build and generates the necessary Makefiles. To compile the binary, run the make command.  

# prints out the current value of the PWD variable echo \$PWD  

Let us save this value in a temporary variable LAMMPS_BUILD_DIR for future use:  

# LAMMPS_BUILD_DIR=\$PWD  

The full path of the LAMMPS binary then is \$LAMMPS_BUILD_DIR/lmp.  

# Running an example script  

Now that we have a LAMMPS binary, we will run a script from the examples folder.  

Switch into the examples/melt folder:  

To run this example in serial, use the following command:  

![](images/6fc9b0db8a0d0aabe25ba9e75212b8e2f7c910cd778f2aac8e77198f3e18b1e0.jpg)  

To run the same script in parallel using MPI with 4 processes, do the following:  

# mpirun -np 4 \$LAMMPS_BUILD_DIR/lmp -in in.melt  

If you run LAMMPS for the first time, the Windows Firewall might prompt you to confirm access. LAMMPS is accessing the network stack to enable parallel computation. Allow the access.  

![](images/61cc6a57d642ec3f5326710d271071b35710c441e5dedaecd3b8dd0efe25409c.jpg)  

In either serial or MPI case, LAMMPS executes and will output something similar to this:  

![](images/763ceef21ea380db61fd5812f226790b11f4e41c518743c5e4dcdfd1ae59bb05.jpg)  

# Congratulations! You’ve successfully compiled and executed LAMMPS on WSL!  

# Final steps  

It is cumbersome to always specify the path of your LAMMPS binary. You can avoid this by adding the absolute path of your build directory to your PATH environment variable.  

<html><body><table><tr><td>export PATH=$LAMMPS BUILD DIR:$PATH</td></tr></table></body></html>  

You can then run LAMMPS input scripts like this:  

<html><body><table><tr><td>lmp -in in.melt</td></tr><tr><td></td></tr></table></body></html>  

or  

<html><body><table><tr><td>mpirun -np 4 lmp -in in.melt</td></tr></table></body></html>  

![](images/310876c4b37d1f110090fccdab1ce063b86ed89de0de4486f0976ea3c01a1304.jpg)  

# Note  

The value of this PATH variable will disappear once you close your console window. To persist this setting edit the $\Phi_{}\mathrm{HOME}$ /.bashrc file using your favorite text editor and add this line:  

<html><body><table><tr><td>export PATH= /full/path/to/your/lammps/build:$PATH</td></tr><tr><td>Example: If the LAMMPS executable lmp has the following absolute path:</td></tr><tr><td>/home/<USERNAME> /lammps/build/lmp</td></tr><tr><td>thePATHvariableshouldbe:</td></tr><tr><td>export PATH=/home/<USERNAME>/lammps/build:$PATH</td></tr></table></body></html>  

# Conclusion  

I hope this gives you good overview on how to start compiling and running LAMMPS on Windows. WSL makes preparing and running scripts on Windows a much better experience.  

If you are completely new to Linux, I highly recommend investing some time in studying Linux online tutorials. E.g., tutorials about Bash Shell and Basic Unix commands (e.g., Linux Journey). Acquiring these skills will make you much more productive in this environment.  

# See also  

• Windows Subsystem for Linux Documentation  

# 8.6. Tutorials howto  

# EXAMPLE SCRIPTS  

The LAMMPS distribution includes an examples subdirectory with many sample problems. Many are 2d models that run quickly and are straightforward to visualize, requiring at most a couple of minutes to run on a desktop machine. Each problem has an input script (in.\*) and produces a log file (log.\*) when it runs. Some use a data file (data.\*) of initial coordinates as additional input. A few sample log file run on different machines and different numbers of processors are included in the directories to compare your answers to. E.g. a log file like log.date.crack.foo.P means the “crack” example was run on P processors of machine “foo” on that date (i.e. with that version of LAMMPS).  

Many of the input files have commented-out lines for creating dump files and image files.  

If you uncomment the dump command in the input script, a text dump file will be produced, which can be animated by various visualization programs.  

If you uncomment the dump image command in the input script, and assuming you have built LAMMPS with a JPG library, JPG snapshot images will be produced when the simulation runs. They can be quickly post-processed into a movie using commands described on the dump image doc page.  

Animations of many of the examples can be viewed on the Movies section of the LAMMPS website.  

There are two kinds of subdirectories in the examples folder. Lower case named directories contain one or a few simple, quick-to-run problems. Upper case named directories contain up to several complex scripts that illustrate a particular kind of simulation method or model. Some of these run for longer times, e.g. to measure a particular quantity.  

Lists of both kinds of directories are given below.  

# 9.1 Lowercase directories  

<html><body><table><tr><td>accelerate</td><td>run with various acceleration options (OpenMP, GPU, Phi)</td></tr><tr><td>airebo</td><td>polyethylene with AIREBO potential</td></tr><tr><td>atm</td><td>Axilrod-Teller-Muto potential example</td></tr><tr><td>balance</td><td>dynamic load balancing, 2d system</td></tr><tr><td>body</td><td>body particles, 2d system</td></tr><tr><td>bpm</td><td>BPM simulations of pouring elastic grains and plate impact</td></tr><tr><td>cmap</td><td>CMAP5-body contributions to CHARMM forcefield</td></tr><tr><td>colloid</td><td>big colloid particles in a small particle solvent, 2d system</td></tr><tr><td>comb</td><td>models using the COMB potential</td></tr><tr><td>controller</td><td>useoffixcontroller asa thermostat</td></tr><tr><td>coreshell</td><td>core/shell model using CORESHELL package</td></tr><tr><td>crack</td><td>crack propagation in a 2d solid</td></tr><tr><td>deposit</td><td>deposit atoms and molecules on a surface</td></tr><tr><td>dipole</td><td>point dipolar particles, 2d system</td></tr></table></body></html>

continues on next page  

Table 1 – continued from previous page   


<html><body><table><tr><td>dreiding</td><td>methanol via Dreiding FF</td></tr><tr><td>eim</td><td>NaCl using the EIM potential</td></tr><tr><td>ellipse</td><td>ellipsoidal particles in spherical solvent, 2d system</td></tr><tr><td>flow</td><td>Couette and Poiseuille flow in a 2d channel</td></tr><tr><td>friction</td><td>frictional contact of spherical asperities between 2d surfaces</td></tr><tr><td>mc</td><td>Monte Carlo features via fix gcmc, widom and other commands</td></tr><tr><td>granregion</td><td>use of fix wall/region/gran as boundary on granular particles</td></tr><tr><td>hugoniostat</td><td>Hugoniostat shock dynamics</td></tr><tr><td>hyper</td><td>global and local hyperdynamics of diffusion on Pt surface</td></tr><tr><td>indent</td><td>spherical indenter into a 2d solid</td></tr><tr><td>kim</td><td>use of potentials from the OpenKIM Repository</td></tr><tr><td>mdi</td><td>use of the MDI package and MolSSI MDI code coupling library</td></tr><tr><td>meam</td><td>MEAM test for SiC and shear (same as shear examples)</td></tr><tr><td>melt</td><td>rapid melt of 3d LJ system</td></tr><tr><td>micelle</td><td>self-assembly of small lipid-like molecules into 2d bilayers</td></tr><tr><td>min</td><td>energy minimization of 2d LJ melt</td></tr><tr><td>msst</td><td>MSST shock dynamics</td></tr><tr><td>multi</td><td>multi neighboring for systems with large interaction disparities</td></tr><tr><td>nb3b</td><td>use of non-bonded 3-body harmonic pair style</td></tr><tr><td>neb</td><td>nudged elastic band (NEB) calculation for barrier finding</td></tr><tr><td>nemd</td><td>non-equilibrium MD of 2d sheared system</td></tr><tr><td>obstacle</td><td>fow around two voids in a 2d channel</td></tr><tr><td>peptide</td><td>dynamics of a small solvated peptide chain (5-mer)</td></tr><tr><td>peri</td><td>Peridynamic model of cylinder impacted by indenter</td></tr><tr><td>pour</td><td>pouring of granular particles into a 3d box, then chute flow</td></tr><tr><td>pid</td><td>parallel replica dynamics of vacancy diffusion in bulk Si</td></tr><tr><td>python</td><td>using embedded Python in a LAMMPS input script</td></tr><tr><td>qeq</td><td>use of the QEQ package for charge equilibration</td></tr><tr><td>rdf-adf</td><td>computing radial and angle distribution functions for water</td></tr><tr><td>reax</td><td>RDX and TATB models using the ReaxFF</td></tr><tr><td>rerun</td><td>use of rerun and read_dump commands</td></tr><tr><td>rheo</td><td>RHEO simulations of fluid flows and phase transitions</td></tr><tr><td>rigid</td><td>rigid bodies modeled as independent or coupled</td></tr><tr><td>shear</td><td>sideways shear applied to 2d solid, with and without a void</td></tr><tr><td></td><td>NVE dynamics for BCC tantalum crystal using SNAP potential</td></tr><tr><td>snap</td><td>stochastic rotation dynamics (SRD) particles as solvent</td></tr><tr><td>srd</td><td></td></tr><tr><td>streitz</td><td>use of Streitz/Mintmire potential with charge equilibration</td></tr><tr><td>stress_vcm</td><td>removing binned rigid body motion from binned stress profile</td></tr><tr><td>tad</td><td>temperature-accelerated dynamics of vacancy diffusion in bulk Si regression test input for a variety of manybody potentials</td></tr><tr><td>threebody tracker</td><td>track interactions in LJ melt</td></tr><tr><td>vashishta</td><td>use of theVashishta potential</td></tr><tr><td>voronoi</td><td>Voronoi tesselation via compute voronoi/atom command</td></tr><tr><td></td><td></td></tr></table></body></html>  

Here is how you can run and visualize one of the sample problems:  

<html><body><table><tr><td>cd indent</td><td></td></tr><tr><td>cp ../../src/lmp_ linux .</td><td>copy LAMMPS executable to this dir</td></tr><tr><td>lmp linux -in in.indent</td><td>run the problem</td></tr></table></body></html>  

Running the simulation produces the files dump.indent and log.lammps. You can visualize the dump file of snapshots with a variety of third-party tools highlighted on the Visualization page of the LAMMPS website.  

If you uncomment the dump image line(s) in the input script a series of JPG images will be produced by the run (assuming you built LAMMPS with JPG support; see the Build_settings page for details). These can be viewed individually or turned into a movie or animated by tools like ImageMagick or QuickTime or various Windows-based tools. See the dump image page for more details. E.g. this Imagemagick command would create a GIF file suitable for viewing in a browser.  

<html><body><table><tr><td>:ooJ 8d!* I do0I- 410Auoo %</td></tr><tr><td></td></tr></table></body></html>  

# 9.2 Uppercase directories  

<html><body><table><tr><td>ASPHERE</td><td>various aspherical particle models, using ellipsoids, rigid bodies, line/triangle particles, etc</td></tr><tr><td>COUPLE</td><td>examples of how to use LAMMPS as a library</td></tr><tr><td>DIFFUSE</td><td>compute diffusion coefficients via several methods</td></tr><tr><td>ELASTIC</td><td>compute elastic constants at zero temperature</td></tr><tr><td>ELASTIC_T</td><td>compute elastic constants at finite temperature</td></tr><tr><td>HEAT</td><td>compute thermal conductivity for LJ and water via fix ehex</td></tr><tr><td>KAPPA</td><td>computethermal conductivityviaseveralmethods</td></tr><tr><td>MC-LOOP</td><td>using LAMMPS in a Monte Carlo mode to relax the energy of a system in a input script loop</td></tr><tr><td>PACKAGES</td><td>examplesfor specific packages and contributed commands</td></tr><tr><td>SPIN</td><td>examples for features of the SPIN package</td></tr><tr><td>UNITS</td><td>examples that run the same simulation in lj, real, metal units</td></tr><tr><td>VISCOSITY</td><td>computeviscosityviaseveralmethods</td></tr></table></body></html>  

Nearly all of these directories have README files which give more details on how to understand and use their contents.  

The PACKAGES directory has a large number of subdirectories which correspond by name to specific packages. They contain scripts that illustrate how to use the command(s) provided in those packages. Many of the subdirectories have their own README files which give further instructions. See the Packages_details doc page for more info on specific packages.  

# AUXILIARY TOOLS  

LAMMPS is designed to be a computational kernel for performing molecular dynamics computations. Additional preand post-processing steps are often necessary to setup and analyze a simulation. A list of such tools can be found on the LAMMPS webpage at these links:  

• Pre/Post processing   
• External LAMMPS packages & tools   
• Pizza.py toolkit  

The last link for Pizza.py is a Python-based tool developed at Sandia which provides tools for doing setup, analysis, plotting, and visualization for LAMMPS simulations.  

Additional tools included in the LAMMPS distribution are described on this page.  

Note that many users write their own setup or analysis tools or use other existing codes and convert their output to a LAMMPS input format or vice versa. The tools listed here are included in the LAMMPS distribution as examples of auxiliary tools. Some of them are not actively supported by the LAMMPS developers, as they were contributed by LAMMPS users. If you have problems using them, we can direct you to the authors.  

The source code for each of these codes is in the tools subdirectory of the LAMMPS distribution. There is a Makefile (which you may need to edit for your platform) which will build several of the tools which reside in that directory. Most of them are larger packages in their own subdirectories with their own Makefiles and/or README files.  

# 10.1 Pre-processing tools  

<html><body><table><tr><td>amber2lmp</td><td>ch2lmp</td><td>chain</td><td>createatoms</td><td>drude</td><td>eamdatabase</td></tr><tr><td>eam generate</td><td>elff</td><td>ipp</td><td>micelle2d</td><td>moltemplate</td><td>msi2lmp</td></tr><tr><td>polybond</td><td>stl_bin2txt</td><td>tabulate</td><td>tinker</td><td></td><td></td></tr></table></body></html>  

# 10.2 Post-processing tools  

<html><body><table><tr><td>amber2lmp</td><td>binary2txt</td><td>ch2lmp</td><td>s</td><td>eff</td><td>fep</td></tr><tr><td>lmp2arc</td><td>lmp2cfg</td><td>matlab</td><td>phonon</td><td>pymol_asphere</td><td>python</td></tr><tr><td>replica</td><td>smd</td><td>spin</td><td>xmgrace</td><td></td><td></td></tr></table></body></html>  

# 10.3 Miscellaneous tools  

<html><body><table><tr><td>LAMMPS coding standards</td><td>emacs</td><td>i-PI</td><td>kate</td><td>LAMMPS- GUI</td><td>LAMMPSmagicpatterns for file(1)</td></tr><tr><td rowspan="2">Oflinebuildtool</td><td>Regression</td><td>singular-</td><td>SWIG</td><td>valgrind</td><td>vim</td></tr><tr><td>tester</td><td>ity/apptainer</td><td>interface</td><td></td><td></td></tr></table></body></html>  

# 10.4 Tool descriptions  

# 10.4.1 amber2lmp tool  

The amber2lmp subdirectory contains three Python scripts for converting files back-and-forth between the AMBER MD code and LAMMPS. See the README file in amber2lmp for more information.  

These tools were written by Keir Novik while he was at Queen Mary University of London. Keir is no longer there and cannot support these tools which are out-of-date with respect to the current LAMMPS version (and maybe with respect to AMBER as well). Since we don’t use these tools at Sandia, you will need to experiment with them and make necessary modifications yourself.  

# 10.4.2 binary2txt tool  

The file binary2txt.cpp converts one or more binary LAMMPS dump file into ASCII text files. The syntax for running the tool is  

# 10.4.4 chain tool  

The file chain.f90 creates a LAMMPS data file containing bead-spring polymer chains and/or monomer solvent atoms. It uses a text file containing chain definition parameters as an input. The created chains and solvent atoms can strongly overlap, so LAMMPS needs to run the system initially with a “soft” pair potential to un-overlap it. The syntax for running the tool is  

See the def.chain or def.chain.ab files in the tools directory for examples of definition files. This tool was used to create the system for the chain benchmark.  

# 10.4.5 LAMMPS coding standard  

The coding_standard folder contains multiple python scripts to check for and apply some LAMMPS coding conventions. The following scripts are available:  

<html><body><table><tr><td>permissions.py</td><td>detects if sources haveexecutable e permissions and scripts have not detects TAB characters and trailing whitespace</td></tr><tr><td>whitespace.py homepage.py</td><td>detects outdated LAMMPS homepage URLs (pointing to sandia.gov instead of_</td></tr><tr><td>lammps.org</td><td></td></tr><tr><td>errordocs.py</td><td>detects deprecated error docs in header files</td></tr><tr><td>versiontags.py</td><td>detects .. versionadded:: or .. versionchanged:: with 1 pending version date</td></tr></table></body></html>  

The tools need to be given the main folder of the LAMMPS distribution or individual file names as argument and will by default check them and report any non-compliance. With the optional -f argument the corresponding script will try to change the non-compliant file(s) to match the conventions.  

For convenience this scripts can also be invoked by the make file in the src folder with, make check-whitespace or make fix-whitespace to either detect or edit the files. Correspondingly for the other python scripts. make check will run all checks.  

# 10.4.6 colvars tools  

The colvars directory contains a collection of tools for post-processing data produced by the colvars collective variable library. To compile the tools, edit the makefile for your system and run “make”.  

Please report problems and issues the colvars library and its tools at: https://github.com/colvars/colvars/issues  

abf_integrate:  

MC-based integration of multidimensional free energy gradient Version 20110511  

$\cdot/\mathrm{abf\_integrate}<\mathrm{filename}>\left[\cdot\mathrm{n<nsteps}>\right]\left[\cdot\mathrm{t<temp}>\right]\left[\cdot\mathrm{m\_[0|1](metadynamics)}\right]\left[\cdot\mathrm{h\_wady(metadyname)}\right],$ < hill_height $>$ ,→] [-f < variable_hill_factor >]  

The LAMMPS interface to the colvars collective variable library, as well as these tools, were created by Axel Kohlmeyer (akohlmey at gmail.com) while at ICTP, Italy.  

# 10.4.7 createatoms tool  

The tools/createatoms directory contains a Fortran program called createAtoms.f which can generate a variety of interesting crystal structures and geometries and output the resulting list of atom coordinates in LAMMPS or other formats.  

See the included Manual.pdf for details.  

The tool is authored by Xiaowang Zhou (Sandia), xzhou at sandia.gov.  

# 10.4.8 drude tool  

The tools/drude directory contains a Python script called polarizer.py which can add Drude oscillators to a LAMMPS data file in the required format.  

See the header of the polarizer.py file for details.  

The tool is authored by Agilio Padua and Alain Dequidt: agilio.padua at ens-lyon.fr, alain.dequidt at uca.fr  

# 10.4.9 eam database tool  

The tools/eam_database directory contains a Fortran and a Python program that will generate EAM alloy setfl potential files for any combination of the 17 elements: Cu, Ag, Au, Ni, Pd, Pt, Al, Pb, Fe, Mo, Ta, W, Mg, Co, Ti, Zr, Cr. The files can then be used with the pair_style eam/alloy command.  

The Fortran version of the tool was authored by Xiaowang Zhou (Sandia), xzhou at sandia.gov, with updates from Lucas Hale (NIST) lucas.hale at nist.gov and is based on his paper:  

X. W. Zhou, R. A. Johnson, and H. N. G. Wadley, Phys. Rev. B, 69, 144113 (2004).  

The parameters for Cr were taken from:  

Lin Z B, Johnson R A and Zhigilei L V, Phys. Rev. B 77 214108 (2008).  

The Python version of the tool was authored by Germain Clavier (Unicaen) germain.clavier at unicaen.fr  

![](images/df8d666e3e22a11fa81a53901bbfe17b588b6fdcca4fd7f1befb1df5c6ade3f2.jpg)  

# Note  

The parameters in the database are only optimized for individual elements. The mixed parameters for interactions between different elements generated by this tool are derived from simple mixing rules and are thus inferior to parameterizations that are specifically optimized for specific mixtures and combinations of elements.  

# 10.4.10 eam generate tool  

The tools/eam_generate directory contains several one-file C programs that convert an analytic formula into a tabulated embedded atom method (EAM) setfl potential file. The potentials they produce are in the potentials directory, and can be used with the pair_style eam/alloy command.  

The source files and potentials were provided by Gerolf Ziegenhain (gerolf at ziegenhain.com).  

# 10.4.11 eff tool  

The tools/eff directory contains various scripts for generating structures and post-processing output for simulations using the electron force field (eFF).  

These tools were provided by Andres Jaramillo-Botero at CalTech (ajaramil at wag.caltech.edu).  

# 10.4.12 emacs tool  

The tools/emacs directory contains an Emacs Lisp add-on file for GNU Emacs that enables a lammps-mode for editing input scripts when using GNU Emacs, with various highlighting options set up.  

These tools were provided by Aidan Thompson at Sandia (athomps at sandia.gov).  

# 10.4.13 fep tool  

The tools/fep directory contains Python scripts useful for post-processing results from performing free-energy perturbation simulations using the FEP package.  

The scripts were contributed by Agilio Padua (ENS de Lyon), agilio.padua at ens-lyon.fr.  

See README file in the tools/fep directory.  

# 10.4.14 i-PI tool  

Changed in version 27June2024.  

The tools/i-pi directory used to contain a bundled version of the i-PI software package for use with LAMMPS. This version, however, was removed in 06/2024.  

The i-PI package was created and is maintained by Michele Ceriotti, michele.ceriotti at gmail.com, to interface to a variety of molecular dynamics codes.  

i-PI is now available via PyPI using the pip package manager at: https://pypi.org/project/ipi/  

Here are the commands to set up a virtual environment and install i-PI into it with all its dependencies.  

python -m venv ipienv source ipienv/bin/activate pip install --upgrade pip pip install ipi  

To install the development version from GitHub, please use:  

pip install git+https://github.com/i-pi/i-pi.git  

For further information, please consult the [i-PI home page](https://ipi-code.org).  

# 10.4.15 ipp tool  

The tools/ipp directory contains a Perl script ipp which can be used to facilitate the creation of a complicated file (say, a LAMMPS input script or tools/createatoms input file) using a template file.  

ipp was created and is maintained by Reese Jones (Sandia), rjones at sandia.gov.  

See two examples in the tools/ipp directory. One of them is for the tools/createatoms tool’s input file.  

# 10.4.16 kate tool  

The file in the tools/kate directory is an add-on to the Kate editor in the KDE suite that allow syntax highlighting of LAMMPS input scripts. See the README.txt file for details.  

The file was provided by Alessandro Luigi Sellerio (alessandro.sellerio at ieni.cnr.it).  

# 10.4.17 LAMMPS-GUI  

Added in version 2Aug2023.  

# Overview  

LAMMPS-GUI is a graphical text editor customized for editing LAMMPS input files that is linked to the LAMMPS $C$ -library and thus can run LAMMPS directly using the contents of the editor’s text buffer as input. It can retrieve and display information from LAMMPS while it is running, display visualizations created with the dump image command, and is adapted specifically for editing LAMMPS input files through syntax highlighting, text completion, and reformatting, and linking to the online LAMMPS documentation for known LAMMPS commands and styles.  

This is similar to what people traditionally would do to run LAMMPS but all rolled into a single application: that is, using a text editor, plotting program, and a visualization program to edit the input, run LAMMPS, process the output into graphs and visualizations from a command line window. This similarity is a design goal. While making it easy for beginners to start with LAMMPS, it is also the expectation that LAMMPS-GUI users will eventually transition to workflows that most experienced LAMMPS users employ.  

All features have been extensively exposed to keyboard shortcuts, so that there is also appeal for experienced LAMMPS users for prototyping and testing simulation setups.  

# Features  

A detailed discussion and explanation of all features and functionality are in the Using LAMMPS-GUI tutorial Howto page.  

Here are a few highlights of LAMMPS-GUI  

• Text editor with line numbers and syntax highlighting customized for LAMMPS   
• Text editor features command completion and auto-indentation for known commands and styles   
• Text editor will switch its working directory to folder of file in buffer   
• Many adjustable settings and preferences that are persistent including the 5 most recent files   
• Context specific LAMMPS command help via online documentation   
• LAMMPS is running in a concurrent thread, so the GUI remains responsive   
• Progress bar indicates how far a run command is completed   
• LAMMPS can be started and stopped with a mouse click or a hotkey   
• Screen output is captured in an Output Window   
• Thermodynamic output is captured and displayed as line graph in a Chart Window   
• Indicator for currently executed command   
• Indicator for line that caused an error   
• Visualization of current state in Image Viewer (via calling write_dump image)   
• Capture of images created via dump image in Slide show window   
• Dialog to set variables, similar to the LAMMPS command-line flag ‘-v’ / ‘-var’   
• Support for GPU, INTEL, KOKKOS/OpenMP, OPENMAP, and OPT and accelerator packages  

# Parallelization  

Due to its nature as a graphical application, it is not possible to use the LAMMPS-GUI in parallel with MPI, but OpenMP multi-threading and GPU acceleration is available and enabled by default.  

# Prerequisites and portability  

LAMMPS-GUI is programmed in $\mathrm{C}{+}{+}$ based on the $\mathrm{C}{+}{+}11$ standard and using the Qt GUI framework. Currently, Qt version 5.12 or later is required; Qt 5.15LTS is recommended; support for Qt version 6.x is available. Building LAMMPS with CMake is required.  

The LAMMPS-GUI has been successfully compiled and tested on:  

• Ubuntu Linux 20.04LTS $\mathrm{~x86\_64~}$ using GCC 9, Qt version 5.12   
• Fedora Linux $40\mathrm{x}86\_64$ using GCC 14 and Clang 17, Qt version 5.15LTS   
• Fedora Linux $40\mathrm{x}86\_64$ using GCC 14, Qt version 6.7   
• Apple macOS 12 (Monterey) and macOS 13 (Ventura) with Xcode on arm64 and x86_64, Qt version 5.15LTS   
• Windows 10 and $11\times86\_64$ with Visual Studio 2022 and Visual $\mathrm{C}{+}{+}14.36$ , Qt version 5.15LTS   
• Windows 10 and $11\times86\_64$ with Visual Studio 2022 and Visual $\mathrm{C++14.40}$ , Qt version 6.7   
• Windows 10 and 11 x86_64 with MinGW / GCC 10.0 cross-compiler on Fedora 38, Qt version 5.15LTS  

# Pre-compiled executables  

Pre-compiled LAMMPS executable packages that include the GUI are currently available from https://download. lammps.org/static or https://github.com/lammps/lammps/releases. For Windows, you need to download and then run the application installer. For macOS you download and mount the disk image and then drag the application bundle to the Applications folder. For Linux (x86_64) you currently have two options: 1) you can download the tar.gz archive, unpack it and run the GUI directly in place. The LAMMPS_GUI folder may also be moved around and added to the PATH environment variable so the executables will be found automatically. 2) you can download the Flatpak file and then install it locally with the flatpak command: flatpak install --user LAMMPS-Linux-x86_64-GUI- $<$ version>. flatpak and run it with flatpak run org.lammps.lammps-gui. The flatpak bundle also includes the command-line version of LAMMPS and some LAMMPS tools like msi2lmp. The can be launched by using the --command flag. For example to run LAMMPS directly on the in.lj benchmark input you would type in the bench folder: flatpak run --command $=$ lmp -in in.lj The flatpak version should also appear in the applications menu of standard desktop environments. The LAMMPS-GUI executable is called lammps-gui and either takes no arguments or attempts to load the first argument as LAMMPS input file.  

# Compilation  

The source for the LAMMPS-GUI is included with the LAMMPS source code distribution in the folder tools/ lammps-gui and thus it can be can be built as part of a regular LAMMPS compilation. Using CMake is required. To enable its compilation, the CMake variable -D BUILD_LAMMPS_GUI $\equiv$ on must be set when creating the CMake configuration. All other settings (compiler, flags, compile type) for LAMMPS-GUI are then inherited from the regular LAMMPS build. If the Qt library is packaged for Linux distributions, then its location is typically autodetected since the required CMake configuration files are stored in a location where CMake can find them without additional help. Otherwise, the location of the Qt library installation must be indicated by setting -D Qt5_DIR $\mathbf{\Omega},=$ / path/to/qt5/lib/cmake/ $\mathrm{Qt5}$ , which is a path to a folder inside the Qt installation that contains the file Qt5Config. cmake. Similarly, for Qt6 the location of the Qt library installation can be indicated by setting -D Qt6_DIR $\mathbf{\Omega},=$ / path/to/qt6/lib/cmake/Qt6, if necessary. When both, Qt5 and Qt6 are available, Qt6 will be preferred unless -D LAMMPS_GUI_USE_QT5 $=$ yes is set.  

It is possible to build the LAMMPS-GUI as a standalone compilation (e.g. when LAMMPS has been compiled with traditional make). Then the CMake configuration needs to be told where to find the LAMMPS headers and the LAMMPS library, via -D LAMMPS_SOURCE_DIR $\mathbf{\Omega}_{,}=$ /path/to/lammps/src. CMake will try to guess a build folder with the LAMMPS library from that path, but it can also be set with -D LAMMPS_LIB_DIR $\underline{{\underline{{\mathbf{\Pi}}}}}$ /path/to/lammps/lib.  

# Plugin version  

Rather than linking to the LAMMPS library during compilation, it is also possible to compile the GUI with a plugin loader that will load the LAMMPS library dynamically at runtime during the start of the GUI from a shared library; e.g. liblammps.so or liblammps.dylib or liblammps.dll (depending on the operating system). This has the advantage that the LAMMPS library can be built from updated or modified LAMMPS source without having to recompile the GUI. The ABI of the LAMMPS C-library interface is very stable and generally backward compatible. This feature is enabled by setting -D LAMMPS_GUI_USE_PLUGIN $\cong$ on and then -D LAMMPS_PLUGINLIB_DIR $\mathbf{\Omega},=$ / path/to/lammps/plugin/loader. Typically, this would be the examples/COUPLE/plugin folder of the LAMMPS distribution.  

When compiling LAMMPS-GUI with plugin support, there is an additional command-line flag $(-\mathrm{p}<\mathrm{path}>$ or --pluginpath $<$ <path $>$ ) which allows to override the path to LAMMPS shared library used by the GUI. This is usually auto-detected on the first run and can be changed in the LAMMPS-GUI Preferences dialog. The command-line flag allows to reset this path to a valid value in case the original setting has become invalid. An empty path (“”) as argument restores the default setting.  

# Platform notes  

# macOS  

When building on macOS, the build procedure will try to manufacture a drag-n-drop installer, LAMMPS-macOS-multiarch.dmg, when using the ‘dmg’ target (i.e. cmake --build $<$ <build dir $\rightarrow$ --target dmg or make dmg.  

To build multi-arch executables that will run on both, arm64 and $\mathrm{~x86\_64~}$ architectures natively, it is necessary to set the CMake variable -D CMAKE_OSX_ARCHITECTURES $=$ arm64;x86_64. To achieve wide compatibility with different macOS versions, you can also set -D CMAKE_OSX_DEPLOYMENT_TARGET=11.0 which will set compatibility to macOS 11 (Big Sur) and later, even if you are compiling on a more recent macOS version.  

# Windows  

On Windows either native compilation from within Visual Studio 2022 with Visual $\mathrm{C}{+}{+}$ is supported and tested, or compilation with the MinGW / GCC cross-compiler environment on Fedora Linux.  

# Visual Studio  

Using CMake and Ninja as build system are required. Qt needs to be installed, tested was a binary package downloaded from https://www.qt.io, which installs into the $\mathrm{C}\mathrm{:}\backslash\mathrm{Qt}$ folder by default. There is a custom x64-GUI-MSVC build configuration provided in the CMakeSettings.json file that Visual Studio uses to store different compilation settings for project. Choosing this configuration will activate building the lammps-gui.exe executable in addition to LAMMPS through importing package selection from the windows.cmake preset file and enabling building the LAMMPS-GUI and disabling building with MPI. When requesting an installation from the Build menu in Visual Studio, it will create a compressed LAMMPS-Win10-amd64.zip zip file with the executables and required dependent .dll files. This zip file can be uncompressed and lammps-gui.exe run directly from there. The uncompressed folder can be added to the PATH environment and LAMMPS and LAMMPS-GUI can be launched from anywhere from the command-line.  

# MinGW64 Cross-compiler  

The standard CMake build procedure can be applied and the mingw-cross.cmake preset used. By using mingw64-cmake the CMake command will automatically include a suitable CMake toolchain file (the regular cmake command can be used after that to modify the configuration settings, if needed). After building the libraries and executables, you can build the target ‘zip’ (i.e. cmake --build $<$ <build dir $\rightarrow$ --target zip or make zip to stage all installed files into a LAMMPS_GUI folder and then run a script to copy all required dependencies, some other files, and create a zip file from it.  

# Linux  

Version 5.12 or later of the Qt library is required. Those are provided by, e.g., Ubuntu 20.04LTS. Thus older Linux distributions are not likely to be supported, while more recent ones will work, even for pre-compiled executables (see above). After compiling with cmake --build $<$ build folder $>$ , use cmake --build $<$ build folder $>$ --target tgz or make tgz to build a LAMMPS-Linux-amd64.tar.gz file with the executables and their support libraries.  

It is also possible to build a flatpak bundle which is a way to distribute applications in a way that is compatible with most Linux distributions. Use the “flatpak” target to trigger a compile (cmake --build <build folder $>$ --target flatpak or make flatpak). Please note that this will not build from the local sources but from the repository and branch listed in the org.lammps.lammps-gui.yml LAMMPS-GUI source folder.  

# 10.4.18 lmp2arc tool  

The lmp2arc subdirectory contains a tool for converting LAMMPS output files to the format for Accelrys’ Insight MD code (formerly MSI/Biosym and its Discover MD code). See the README file for more information.  

This tool was written by John Carpenter (Cray), Michael Peachey (Cray), and Steve Lustig (Dupont). John is now a the Mayo Clinic (jec at mayo.edu), but still fields questions about the tool.  

This tool was updated for the current LAMMPS $\mathrm{C}{+}{+}$ version by Jeff Greathouse at Sandia (jagreat at sandia.gov).  

# 10.4.19 lmp2cfg tool  

The lmp2cfg subdirectory contains a tool for converting LAMMPS output files into a series of \*.cfg files which can be read into the AtomEye visualizer. See the README file for more information.  

This tool was written by Ara Kooser at Sandia (askoose at sandia.gov).  

# 10.4.20 Magic patterns for the “file” command  

Added in version 10Mar2021.  

The file magic contains patterns that are used by the file program available on most Unix-like operating systems which enables it to detect various LAMMPS files and print some useful information about them. To enable these patterns,  

# 10.4. Tool descriptions  

append or copy the contents of the file to either the file .magic in your home directory or (as administrator) to /etc/ magic (for a system-wide installation). Afterwards the file command should be able to detect most LAMMPS restarts, dump, data and log files. Examples:  

<html><body><table><tr><td colspan="2">$ file **</td></tr><tr><td>dihedral-quadratic.restart:</td><td>LAMMPS binary restart file (rev 2), Version 10 Mar 2021, Little Endian</td></tr><tr><td>mol-pair-wf cut.restart:</td><td>LAMMPS binary restart file (rev 2), Version 24 Dec 2020, Little Endian</td></tr><tr><td>atom.bin:</td><td>LAMMPS atom style binary dump (rev 2), Little Endian, First time step: 445570</td></tr><tr><td>custom.bin:</td><td>LAMMPS custom style binary dump (rev 2), Little Endian, First time step: 100</td></tr><tr><td>bn1.lammpstrj:</td><td>LAMMPS text mode dump, First time step: 5000</td></tr><tr><td>data.fourmol:</td><td>LAMMPS data file written by LAMMPS</td></tr><tr><td>pnc.data:</td><td>LAMMPS data file written by msi2lmp</td></tr><tr><td>data.spce:</td><td>LAMMPS data file written by TopoTools</td></tr><tr><td>B.data:</td><td>LAMMPS data file written by OVITO</td></tr><tr><td>log.lammps:</td><td>LAMMPS log file written by version 10 Feb 2021</td></tr></table></body></html>  

# 10.4.21 matlab tool  

The matlab subdirectory contains several MATLAB scripts for post-processing LAMMPS output. The scripts include readers for log and dump files, a reader for EAM potential files, and a converter that reads LAMMPS dump files and produces CFG files that can be visualized with the AtomEye visualizer.  

See the README.pdf file for more information.  

These scripts were written by Arun Subramaniyan at Purdue Univ (asubrama at purdue.edu).  

# 10.4.22 micelle2d tool  

The file micelle2d.f creates a LAMMPS data file containing short lipid chains in a monomer solution. It uses a text file containing lipid definition parameters as an input. The created molecules and solvent atoms can strongly overlap, so LAMMPS needs to run the system initially with a “soft” pair potential to un-overlap it. The syntax for running the tool is  

# 10.4.24 msi2lmp tool  

The msi2lmp subdirectory contains a tool for creating LAMMPS template input and data files from BIOVIA’s Materias Studio files (formerly Accelrys’ Insight MD code, formerly MSI/Biosym and its Discover MD code).  

This tool was written by John Carpenter (Cray), Michael Peachey (Cray), and Steve Lustig (Dupont). Several people contributed changes to remove bugs and adapt its output to changes in LAMMPS.  

This tool has several known limitations and is no longer under active development, so there are no changes except for the occasional bug fix.  

See the README file in the tools/msi2lmp folder for more information.  

# 10.4.25 Scripts for building LAMMPS when offline  

In some situations it might be necessary to build LAMMPS on a system without direct internet access. The scripts in tools/offline folder allow you to pre-load external dependencies for both the documentation build and for building LAMMPS with CMake.  

It does so by  

1. downloading necessary pip packages,   
2. cloning git repositories   
3. downloading tarballs  

to a designated cache folder.  

As of April 2021, all of these downloads make up around 600MB. By default, the offline scripts will download everything into the $\Phi_{}\mathrm{HOME}_{}$ /.cache/lammps folder, but this can be changed by setting the LAMMPS_CACHING_DIR environment variable.  

Once the caches have been initialized, they can be used for building the LAMMPS documentation or compiling LAMMPS using CMake on an offline system.  

The use_caches.sh script must be sourced into the current shell to initialize the offline build environment. Note that it must use the same LAMMPS_CACHING_DIR. This script does the following:  

1. Set up environment variables that modify the behavior of both, pip and git   
2. Start a simple local HTTP server using Python to host files for CMake  

Afterwards, it will print out instruction on how to modify the CMake commands to make sure it uses the local HTTP server.  

To undo the environment changes and shutdown the local HTTP server, run the deactivate_caches command.  

# Examples  

For all of the examples below, you first need to create the cache, which requires an internet connection.  

# if LAMMPS_CACHING_DIR is different from default, make sure to set it first   
# export LAMMPS_CACHING_DIR=path/to/folder   
source tools/offline/use_caches.sh   
cd doc/   
make html   
deactivate_caches  

# CMake Build  

When compiling certain packages with external dependencies, the CMake build system will download necessary files or sources from the web. For more flexibility the CMake configuration allows users to specify the URL of each of these dependencies. What the init_caches.sh script does is create a CMake “preset” file, which sets the URLs for all of the known dependencies and redirects the download to the local cache.  

# if LAMMPS_CACHING_DIR is different from default, make sure to set it first   
# export LAMMPS_CACHING_DIR=path/to/folder   
source tools/offline/use_caches.sh   
mkdir build   
cd build   
cmake -D LAMMPS_DOWNLOADS_URL=\${HTTP_CACHE_URL} -C "\${LAMMPS_HTTP_   
$\hookrightarrow$ CACHE_CONFIG}" -C ../cmake/presets/most.cmake ../cmake   
make -j 8  

deactivate_caches  

# 10.4.26 phonon tool  

The phonon subdirectory contains a post-processing tool, phana, useful for analyzing the output of the fix phonon command in the PHONON package.  

See the README file for instruction on building the tool and what library it needs. And see the examples/PACKAGES/phonon directory for example problems that can be post-processed with this tool.  

This tool was written by Ling-Ti Kong at Shanghai Jiao Tong University.  

# 10.4.27 polybond tool  

The polybond subdirectory contains a Python-based tool useful for performing “programmable polymer bonding”. The Python file lmpsdata.py provides a “Lmpsdata” class with various methods which can be invoked by a user-written Python script to create data files with complex bonding topologies.  

See the Manual.pdf for details and example scripts.  

This tool was written by Zachary Kraus at Georgia Tech.  

# 10.4.28 pymol_asphere tool  

The pymol_asphere subdirectory contains a tool for converting a LAMMPS dump file that contains orientation info for ellipsoidal particles into an input file for the PyMol visualization package or its open source variant.  

Specifically, the tool triangulates the ellipsoids so they can be viewed as true ellipsoidal particles within PyMol. See the README and examples directory within pymol_asphere for more information.  

This tool was written by Mike Brown at Sandia.  

# 10.4.29 python tool  

The python subdirectory contains several Python scripts that perform common LAMMPS post-processing tasks, such as:  

• extract thermodynamic info from a log file as columns of numbers • plot two columns of thermodynamic info from a log file using GnuPlot • sort the snapshots in a dump file by atom ID • convert multiple NEB dump files into one dump file for viz convert dump files into XYZ, CFG, or PDB format for viz by other packages  

These are simple scripts built on Pizza.py modules. See the README for more info on Pizza.py and how to use these scripts.  

# 10.4.30 Regression tester tool  

The regression-tests subdirectory contains a tool for performing regression tests with a given LAMMPS binary. The tool launches the LAMMPS binary with any given input script under one of the examples subdirectories, and compares the thermo output in the generated log file with those in the provided log file with the same number of processors in the same subdirectory. If the differences between the actual and reference values are within specified tolerances, the test is considered passed. For each test batch, that is, a set of example input scripts, the mpirun command, the LAMMPS command-line arguments, and the tolerances for individual thermo quantities can be specified in a configuration file in YAML format.  

The tool also reports if and how the run fails, and if a reference log file is missing. See the README file for more information.  

This tool was written by Trung Nguyen at U of Chicago (ndactrung at gmail.com).  

# 10.4.31 replica tool  

The tools/replica directory contains the reorder_remd_traj python script which can be used to reorder the replica trajectories (resulting from the use of the temper command) according to temperature. This will produce discontinuous trajectories with all frames at the same temperature in each trajectory. Additional options can be used to calculate the canonical configurational log-weight for each frame at each temperature using the pymbar package. See the README.md file for further details. Try out the peptide example provided.  

This tool was written by (and is maintained by) Tanmoy Sanyal, while at the Shell lab at UC Santa Barbara. (tanmoy dot 7989 at gmail.com)  

# 10.4.32 smd tool  

The smd subdirectory contains a $\mathrm{C}{+}{+}$ file dump2vtk_tris.cpp and Makefile which can be compiled and used to convert triangle output files created by the Smooth-Mach Dynamics (MACHDYN) package into a VTK-compatible unstructured grid file. It could then be read in and visualized by VTK.  

See the header of dump2vtk.cpp for more details.  

This tool was written by the MACHDYN package author, Georg Ganzenmuller at the Fraunhofer-Institute for HighSpeed Dynamics, Ernst Mach Institute in Germany (georg.ganzenmueller at emi.fhg.de).  

# 10.4.33 spin tool  

The spin subdirectory contains a C file interpolate.c which can be compiled and used to perform a cubic polynomial interpolation of the MEP following a GNEB calculation.  

See the README file in tools/spin/interpolate_gneb for more details.  

This tool was written by the SPIN package author, Julien Tranchida at Sandia National Labs (jtranch at sandia.gov, and by Aleksei Ivanov, at University of Iceland (ali5 at hi.is).  

# 10.4.34 singularity/apptainer tool  

The singularity subdirectory contains container definitions files that can be used to build container images for building and testing LAMMPS on specific OS variants using the Apptainer or Singularity container software. Contributions for additional variants are welcome. For more details please see the README.md file in that folder.  

# 10.4.35 stl_bin2txt tool  

The file stl_bin2txt.cpp converts binary STL files - like they are frequently offered for download on the web - into ASCII format STL files that LAMMPS can read with the create_atoms mesh or the fix smd/wall_surface commands. The syntax for running the tool is  

# What is included  

We provide here an “interface file”, lammps.i, that has the content of the library.h file adapted so SWIG can process it. That will create wrappers for all the functions that are present in the LAMMPS C library interface. Please note that not all kinds of C functions can be automatically translated, so you would have to add custom functions to be able to utilize those where the automatic translation does not work. A few functions for converting pointers and accessing arrays are predefined. We provide the file here on an “as is” basis to help people getting started, but not as a fully tested and supported feature of the LAMMPS distribution. Any contributions to complete this are, of course, welcome. Please also note, that for the case of creating a Python wrapper, a fully supported Ctypes based lammps module already exists. That module is designed to be object-oriented while SWIG will generate a 1:1 translation of the functions in the interface file.  

# Building the wrapper  

When using CMake, the build steps for building a wrapper module are integrated for the languages: Java, Lua, Perl5, Python, Ruby, and Tcl. These require that the LAMMPS library is build as a shared library and all necessary development headers and libraries are present.  

<html><body><table><tr><td>-D WITH SWIG=on to enable building any SWIG</td></tr></table></body></html>  

Manual building allows a little more flexibility. E.g. one can choose the name of the module and build and use a dynamically loaded object for Tcl with:  

<html><body><table><tr><td>swig -tcl -module tcllammps lammps.i</td><td></td></tr><tr><td>gcc -fPIC -shared $(pkg-config tcl --cflags) -o tcllammps.so</td><td></td></tr><tr><td>lammps_wrap.c -L ../src/ -llammps</td><td></td></tr><tr><td></td><td></td></tr></table></body></html>  

Or one can build an extended Tcl shell command with the wrapped functions included with:  

<html><body><table><tr><td>swig -tcl -module tcllmps lammps_shell.i</td></tr><tr><td>gcc -o tcllmpsh lammps_ wrap.c -Xlinker -export-dynamic</td></tr><tr><td>-DHAVE _CONFIG _H $(pkg-config tcl --cflags)</td></tr><tr><td>s- 0s/. - (sq--  yuo-xd)s</td></tr></table></body></html>  

In both cases it is assumed that the LAMMPS library was compiled as a shared library in the src folder. Otherwise the last part of the commands needs to be adjusted.  

# Utility functions  

Definitions for several utility functions required to manage and access data passed or returned as pointers are included in the lammps.i file. So most of the functionality of the library interface should be accessible. What works and what does not depends a bit on the individual language for which the wrappers are built and how well SWIG supports those. The SWIG documentation has very detailed instructions and recommendations.  

# Usage examples  

The tools/swig folder has multiple shell scripts, run_ $<$ name $>$ _example.sh that will create a small example script and demonstrate how to load the wrapper and run LAMMPS through it in the corresponding programming language.  

For illustration purposes below is a part of the Tcl example script.  

load ./tcllammps.so set lmp [lammps_open_no_mpi 0 NULL NULL] lammps_command \$lmp "units real" lammps_command \$lmp "lattice fcc 2.5" lammps_command \$lmp "region box block -5 5 -5 5 -5 5" lammps_command \$lmp "create_box 1 box" lammps_command \$lmp "create_atoms 1 box"  

set dt [doublep_value [voidp_to_doublep [lammps_extract_global \$lmp dt]]]   
puts "LAMMPS version $\mathbb{S}$ ver"   
puts [format "Number of created atoms: %g" [lammps_get_natoms \$lmp]]   
puts "Current size of timestep: \$dt"   
puts "LAMMPS version: [lammps_version \$lmp]"   
lammps_close \$lmp  

# 10.4.37 tabulate tool  

Added in version 22Dec2022.  

The tabulate folder contains Python scripts scripts to generate tabulated potential files for LAMMPS. The bulk of the code is in the tabulate module in the tabulate.py file. Some example files demonstrating its use are included. See the README file for more information.  

# 10.4.38 tinker tool  

The tinker folder contains Python scripts scripts to convert Tinker input files to LAMMPS.  

See the README file for more information.  

Those scripts were written by Steve Plimpton sjplimp at gmail.com  

# 10.4.39 valgrind tool  

The valgrind folder contains additional suppressions fur LAMMPS when using valgrind’s memcheck tool to search for memory access violation and memory leaks. These suppressions are automatically invoked when running tests through CMake “ctest -T memcheck”. See the provided README file to add these suppressions when running LAMMPS.  

# 10.4.40 vim tool  

The files in the tools/vim directory are add-ons to the VIM editor that allow easier editing of LAMMPS input scripts.   
See the README.txt file for details.  

These files were provided by Gerolf Ziegenhain (gerolf at ziegenhain.com)  

# 10.4.41 xmgrace tool  

The files in the tools/xmgrace directory can be used to plot the thermodynamic data in LAMMPS log files via the xmgrace plotting package. There are several tools in the directory that can be used in post-processing mode. The lammpsplot.cpp file can be compiled and used to create plots from the current state of a running LAMMPS simulation.  

See the README file for details.  

These files were provided by Vikas Varshney (vv0210 at gmail.com)  

# ERRORS  

These doc pages describe many of the error and warning message you can encounter when using LAMMPS. The common problems include conceptual issues. The messages and warnings doc pages give complete lists of all the messages the code may generate, with additional details for many of them.  

# 11.1 Common problems  

If two LAMMPS runs do not produce the exact same answer on different machines or different numbers of processors, this is typically not a bug. In theory you should get identical answers on any number of processors and on any machine. In practice, numerical round-off can cause slight differences and eventual divergence of molecular dynamics phase space trajectories within a few 100s or few 1000s of timesteps. However, the statistical properties of the two runs (e.g. average energy or temperature) should still be the same.  

If the velocity command is used to set initial atom velocities, a particular atom can be assigned a different velocity when the problem is run on a different number of processors or on different machines. If this happens, the phase space trajectories of the two simulations will rapidly diverge. See the discussion of the loop option in the velocity command for details and options that avoid this issue.  

Similarly, the create_atoms command generates a lattice of atoms. For the same physical system, the ordering and numbering of atoms by atom ID may be different depending on the number of processors.  

Some commands use random number generators which may be setup to produce different random number streams on each processor and hence will produce different effects when run on different numbers of processors. A commonly-used example is the fix langevin command for thermostatting.  

A LAMMPS simulation typically has two stages, setup and run. Most LAMMPS errors are detected at setup time;   
others like a bond stretching too far may not occur until the middle of a run.  

LAMMPS tries to flag errors and print informative error messages so you can fix the problem. For most errors it will also print the last input script command that it was processing. Of course, LAMMPS cannot figure out your physics or numerical mistakes, like choosing too big a timestep, specifying erroneous force field coefficients, or putting 2 atoms on top of each other! If you run into errors that LAMMPS does not catch that you think it should flag, please send an email to the developers or create an new topic on the dedicated MatSci forum section.  

If you get an error message about an invalid command in your input script, you can determine what command is causing the problem by looking in the log.lammps file or using the echo command to see it on the screen. If you get an error like “Invalid . . . style”, with . . . being fix, compute, pair, etc, it means that you mistyped the style name or that the command is part of an optional package which was not compiled into your executable. The list of available styles in your executable can be listed by using the -h command-line switch. The installation and compilation of optional packages is explained on the Build packages doc page.  

For a given command, LAMMPS expects certain arguments in a specified order. If you mess this up, LAMMPS will often flag the error, but it may also simply read a bogus argument and assign a value that is valid, but not what you wanted. E.g. trying to read the string “abc” as an integer value of 0. Careful reading of the associated doc page for the command should allow you to fix these problems. In most cases, where LAMMPS expects to read a number, either integer or floating point, it performs a stringent test on whether the provided input actually is an integer or floatingpoint number, respectively, and reject the input with an error message (for instance, when an integer is required, but a floating-point number 1.0 is provided):  

ERROR: Expected integer parameter instead of $"1.0"$ in input script or data file  

Some commands allow for using variable references in place of numeric constants so that the value can be evaluated and may change over the course of a run. This is typically done with the syntax $\nu_{.}$ _name for a parameter, where name is the name of the variable. On the other hand, immediate variable expansion with the syntax $\$\{\mathrm{name}\}$ is performed while reading the input and before parsing commands,  

![](images/81d528d87c20f06ba53f89f0e4ea2bf500d517eeb0bbb450a980b1d75577d917.jpg)  

# Note  

Using a variable reference (i.e. v_name) is only allowed if the documentation of the corresponding command explicitly says it is. Otherwise, you will receive an error message of this kind:  

ERROR: Expected floating point parameter instead of 'v_name' in input script or data file  

Generally, LAMMPS will print a message to the screen and logfile and exit gracefully when it encounters a fatal error. Sometimes it will print a WARNING to the screen and logfile and continue on; you can decide if the WARNING is important or not. A WARNING message that is generated in the middle of a run is only printed to the screen, not to the logfile, to avoid cluttering up thermodynamic output. If LAMMPS crashes or hangs without spitting out an error message first then it could be a bug (see this section) or one of the following cases:  

LAMMPS runs in the available memory a processor allows to be allocated. Most reasonable MD runs are compute limited, not memory limited, so this should not be a bottleneck on most platforms. Almost all large memory allocations in the code are done via C-style malloc’s which will generate an error message if you run out of memory. Smaller chunks of memory are allocated via $\mathrm{C}{+}{+}$ “new” statements. If you are unlucky you could run out of memory just when one of these small requests is made, in which case the code will crash or hang (in parallel), since LAMMPS does not trap on those errors.  

Illegal arithmetic can cause LAMMPS to run slow or crash. This is typically due to invalid physics and numerics that your simulation is computing. If you see wild thermodynamic values or NaN values in your LAMMPS output, something is wrong with your simulation. If you suspect this is happening, it is a good idea to print out thermodynamic info frequently (e.g. every timestep) via the thermo so you can monitor what is happening. Visualizing the atom movement is also a good idea to ensure your model is behaving as you expect.  

In parallel, one way LAMMPS can hang is due to how different MPI implementations handle buffering of messages. If the code hangs without an error message, it may be that you need to specify an MPI setting or two (usually via an environment variable) to enable buffering or boost the sizes of messages that can be buffered.  

# 11.2 Error and warning details  

Many errors or warnings are self-explanatory and thus straightforward to resolve. However, there are also cases, where there is no single cause and explanation, where LAMMPS can only detect symptoms of an error but not the exact cause, or where the explanation needs to be more detailed than what can be fit into a message printed by the program. The following are discussions of such cases.  

• Unknown identifier in data file • Incorrect format in . . . section of data file • Illegal variable command: expected X arguments but found Y • Out of range atoms - cannot compute . . .  

• Too many neighbor bins • Cannot use neighbor bins - box size << cutoff • Domain too large for neighbor bins • Molecule topology/atom exceeds system topology/atom • Molecule topology type exceeds system topology type • Molecule attributes do not match system attributes  

# 11.2.1 General troubleshooting advice  

Below are suggestions that can help to understand the causes of problems with simulations leading to errors or unexpected results.  

# Create a small test system  

Debugging problems often requires running a simulation many times with small modifications, thus it can be a huge time saver to first assemble a small test system input that has the same issue, but will take much time until it triggers the error condition. Also, it will be easier to see what happens.  

# Visualize your trajectory  

To better understand what is causing problems, it is often very useful to visualize the system close to the point of failure. It may be necessary to have LAMMPS output trajectory frames rather frequently. To avoid gigantic files, you can use dump_modify delay to delay output until the critical section is reached, and you can use a smaller test system (see above).  

# Parallel versus serial  

Issues where something is “lost” or “missing” often exhibit that issue only when running in parallel. That doesn’t mean there is no problem, only the symptoms are not triggering an error quickly. Correspondingly, errors may be triggered faster with more processors and thus smaller sub-domains.  

# Fast moving atoms  

Fast moving atoms may be “lost” or “missing” when their velocity becomes so large that they can cross a sub-domain within one timestep. This often happens when atoms are too close, but atoms may also “move” too fast from sub-domain to sub-domain if the box changes rapidly, e.g. when setting a large an initial box with shrink-wrap boundary conditions that collapses on the first step (in this case the solution is often using $\mathbf{\hat{\Pi}}_{\mathrm{m}},$ instead of ‘s’ as boundary condition).  

To reduce the impact of “close contacts”, one can remove those atoms or molecules with something like delete_atoms overlap 0.1 all all. With periodic boundaries, a close contact pair of atoms may be on opposite sides of the simulation box. Another option would be to first run a minimization (aka quench) before starting the MD. Reducing the time step can also help. Many times, one just needs to “ease” the system into a balanced state and can then switch to more aggressive settings.  

The speed of atoms during an MD depends on the steepness of the potential function and their mass. Since the positions and velocities of atoms are computed with finite timesteps, they choice of timestep can be too large for a stable numeric integration of the trajectory. In those cases using (temporarily) fix nve/limit or fix dt/reset can help to avoid too large updates or adapt the timestep according to the displacements.  

# Pressure, forces, positions becoming NaN of Inf  

Some potentials can overflow or have a division by zero with close contacts or bad geometries (for the given force styles in use) leading to forces that can no longer be represented as numbers. Those will show as “NaN” or “Inf”. On most machines, the program will continue, but there is no way to recover from it and those NaN or Inf values will propagate. So-called “soft-core” potentials or the “soft” repulsive-only pair style are less prone for this behavior (depending on the settings in use) and can be used at the beginning of a simulation. Also, single precision numbers can overflow much faster, so for the GPU or INTEL package it may be beneficial to run with double precision initially before switching to mixed or single precision for faster execution when the system has relaxed.  

# Communication cutoff  

The communication cutoff determines the “overlap” between sub-domains and atoms in these regions are referred to in LAMMPS as “ghost atoms”. This region has to be large enough to contain all atoms of a bond, angle, dihedral or improper with just one atom in the actual sub-domain. Typically, this cutoff is set to the largest cutoff from the pair style(s) plus the neighbor list skin distance and will be more than sufficient for all bonded interactions. But if the pair style cutoff is small this may bot be enough. LAMMPS will print a warning in this case using some heuristic based on the equilibrium bond length, but that may not be sufficient for cases where the force constants are small and thus bonds may be stretched very far. The communication cutoff can be adjusted with comm_modify cutoff <value>, but setting this too large will waste CPU time and memory.  

# Neighbor list settings  

Every time LAMMPS rebuilds the neighbor lists, LAMMPS will also check for “lost” or “missing” atoms. Thus it can help to use very conservative neighbor list settings and then examine the neighbor list statistics if the neighbor list rebuild can be safely delayed. Rebuilding the neighbor list less frequently (i.e. through increasing the delay or every setting has diminishing returns and increasing risks).  

# Ignoring lost atoms  

It is tempting to use the thermo_modify lost ignore to avoid that LAMMPS stops with an error. This setting should, however, only be used when atoms should leave the system. In general, ignoring a problem does not solve it.  

# Units  

A frequent cause for a variety of problems is due to using the wrong units settings for a particular potentials, especially when reading them from a potential file. Most of the (example) potentials bundled with LAMMPS have a “UNITS:” tag that allows LAMMPS to check of the units are consistent with what is intended, but potential files from publications or potential parameter databases may lack this metadata information and thus will not error out or warn when using the wrong setting. Most potential files usually use “metal” units, but some are parameterized for other settings, most notably ReaxFF potentials that use “real” units.  

Also, individual parameters for pair_coeff commands taken from publications or other MD software, may need to be converted and sometimes in unexpected ways. Thus some careful checking is recommended.  

# No error message printed  

In some cases - especially when running in parallel with MPI - LAMMPS may stop without displaying an error. But that does not mean, that there was no error message, instead it is highly likely that the message was written to a buffer and LAMMPS was aborted before the buffer was output. Usually, output buffers are output for every line of output, but sometimes, this is delayed until 4096 or 8192 bytes of output have been accumulated. This buffering for screen and logfile output can be disabled by using the -nb or -nonbuf command-line flag. This is most often needed when debugging crashing multi-replica calculations.  

# 11.2.2 Unknown identifier in data file  

This error happens when LAMMPS encounters a line of text with an unexpected keyword while reading a data file. This would be either header keywords or section header keywords. This is most commonly due to a mistyped keyword or due to a keyword that is inconsistent with the atom style used.  

The header section informs LAMMPS how many entries or lines are expected in the various sections (like Atoms, Masses, Pair Coeffs, etc.) of the data file. If there is a mismatch, LAMMPS will either keep reading beyond the end of a section or stop reading before the section has ended. In that case the next line will not contain a recognized keyword.  

Such a mismatch can also happen when the first line of the data is not a comment as required by the format, but a line with a valid header keyword. That would result in LAMMPS expecting, for instance, 0 atoms because the “atoms” header line is the first line and thus treated as a comment.  

Another possibility to trigger this error is to have a keyword in the data file that corresponds to a fix (e.g. fix cmap) but the read_data command is missing the (optional) arguments that identify the fix and the header keyword and section keyword or those arguments are inconsistent with the keywords in the data file.  

# 11.2.3 Incorrect format in . . . section of data file  

This error happens when LAMMPS reads the contents of a section of a data file and the number of parameters in the line differs from what is expected. This most commonly happens, when the atom style is different from what is expected for a specific data file since changing the atom style usually changes the format of the line.  

This error can also happen when the number of entries indicated in the header of a data file (e.g. the number of atoms) is larger than the number of lines provided (e.g. in the corresponding Atoms section) and then LAMMPS will continue reading into the next section and that would have a completely different format.  

# 11.2.4 Illegal variable command: expected X arguments but found Y  

This error indicates that there are the wrong number of arguments for a specific variable command, but a common reason for that is a variable expression that has whitespace but is not enclosed in single or double quotes.  

To explain, the LAMMPS input parser reads and processes lines. The resulting line is broken down into “words”. Those are usually individual commands, labels, names, values separated by whitespace (a space or tab character). For “words” that may contain whitespace, they have to be enclosed in single (’) or double $(^{\bullet})$ quotes. The parser will then remove the outermost pair of quotes and then pass that string as “word” to the variable command.  

Thus missing quotes or accidental extra whitespace will lead to the error shown in the header because the unquoted whitespace will result in the text being broken into more “words”, i.e. the variable expression being split.  

# 11.2.5 Out of range atoms - cannot compute . . .  

The PPPM (and also PPPMDisp and MSM) methods require to assemble a grid of electron density data derived from the (partial) charges assigned to the atoms. This charges are smeared out across multiple grid points (see kspace_modify order). When running in parallel with MPI, LAMMPS uses a domain decomposition scheme where each processor manages a subset of atoms and thus also a grid representing the density, which covers the actual volume of the subdomain and some extra space corresponding to the neighbor list skin. These are then combined and redistributed for parallel processing of the long-range component of the Coulomb interaction.  

The Out of range atoms error can happen, when atoms move too fast or the neighbor list skin is too small or the neighbor lists are not updated frequently enough. Then the smeared charges cannot be fully assigned to the density grid for all atoms. LAMMPS checks for this condition and stops with an error. Most of the time, this is an indication of a system with very high forces, most often at the beginning of a simulation or when boundary conditions are changed. The error becomes more likely with more MPI processes.  

There are multiple options to explore for avoiding the error. The best choice depends strongly on the individual system, and often a combination of changes is required. For example, more conservative MD parameter settings can be used (larger neighbor skin, shorter time step, more frequent neighbor list updates). Sometimes, it helps to revisit the system generation and avoid close contacts when building it, or use the delete_atoms overlap command to delete those close contact atoms, or run a minimization before the MD. It can also help to temporarily use a cutoff-Coulomb pair style and no kspace style until the system has somewhat equilibrated and then switch to the long-range solver.  

# 11.2.6 Too many neighbor bins  

The simulation box has become too large relative to the size of a neighbor bin and LAMMPS is unable to store the needed number of bins. This typically implies the simulation box has expanded too far. This can happen when some atoms move rapidly apart with shrink-wrap boundaries or when a fix (like fix deform or a barostat) excessively grows the simulation box.  

# 11.2.7 Cannot use neighbor bins - box size $<<$ cutoff  

LAMMPS is unable to build neighbor bins since the size of the box is much smaller than an interaction cutoff in at least one of its dimensions. Typically, this error is triggered when the simulation box has one very thin dimension. If a cubic neighbor bin had to fit exactly within the thin dimension, then an inordinate amount of bins would be created to fill space. This error can be avoided using the generally slower nsq neighbor style or by increasing the size of the smallest box lengths.  

# 11.2.8 Domain too large for neighbor bins  

The domain has become extremely large so that neighbor bins cannot be used. Too many neighbor bins would need to be created to fill space Most likely, one or more atoms have been blown out of the simulation box to a great distance or a fix (like fix deform or a barostat) has excessively grown the simulation box.  

# 11.2.9 Molecule topology/atom exceeds system topology/atom  

LAMMPS uses domain decomposition to distribute data (i.e. atoms) across the MPI processes in parallel runs. This includes topology data, that is data about bonds, angles, dihedrals, impropers and “special” neighbors. This information is stored with either one or all atoms involved in such a topology entry (which of the two option applies depends on the newton setting for bonds. When reading a data file, LAMMPS analyzes the requirements for this file and then the values are “locked in” and cannot be extended.  

So loading a molecule file that requires more of the topology per atom storage or adding a data file with such needs will lead to an error. To avoid the error, one or more of the extra/XXX/per/atom keywords are required to extend the corresponding storage. It is no problem to choose those numbers generously and have more storage reserved than actually needed, but having these numbers set too small will lead to an error.  

# 11.2.10 Molecule topology type exceeds system topology type  

The total number of atom, bond, angle, dihedral, and improper types is “locked in” when LAMMPS creates the simulation box. This can happen through either the create_box, the read_data, or the read_restart command. After this it is not possible to refer to an additional type. So loading a molecule file that uses additional types or adding a data file that would require additional types will lead to an error. To avoid the error, one or more of the extra/XXX/types keywords are required to extend the maximum number of the individual types.  

# 11.2.11 Molecule attributes do not match system attributes  

Choosing an atom_style in LAMMPS determines which per-atom properties are available. In a molecule file, however, it is possible to add sections (for example Masses or Charges) that are not supported by the atom style. Masses for example, are usually not a per-atom property, but defined through the atom type. Thus it would not be required to have a Masses section and the included data would be ignored. LAMMPS prints this warning to inform about this case.  

# 11.3 Reporting bugs  

If you are confident that you have found a bug in LAMMPS, please follow the steps outlined below:  

• Check the New features and bug fixes section of the LAMMPS WWW site or the GitHub Releases page to see if the bug has already been addressed in a patch release.   
• Check that your issue can be reproduced with the latest development version of LAMMPS.   
• Check the manual carefully to verify that the unexpected behavior you are observing is indeed in conflict with the documentation   
• Check the GitHub Issue page if your issue has already been reported and if it is still open.   
• Check the GitHub Pull Requests page to see if there is already a fix for your bug pending.   
• Check the LAMMPS forum at MatSci to see if the issue has been discussed before.  

If none of these steps yields any useful information, please file a new bug report on the GitHub Issue page. The website will offer you to select a suitable template with explanations and then you should replace those explanations with the information that you can provide to reproduce your issue.  

The most useful thing you can do to help us verify and fix a bug is to isolate the problem. Run it on the smallest number of atoms and fewest number of processors with the simplest input script that reproduces the bug. Try to identify what command or combination of commands is causing the problem and upload the complete input deck as a tar or zip archive. Please avoid using binary restart files unless the issue requires it. In the latter case you should also include an input deck to quickly generate this restart from a data file or a simple additional input. This input deck can be used with tools like a debugger or valgrind to further debug the crash.  

You may also post a message in the development category of the LAMMPS forum at MatSci describing the problem with the same kind of information. The forum can provide a faster response, especially if the bug reported is actually expected behavior or other LAMMPS users have come across it before.  

# 11.4 Debugging crashes  

If LAMMPS crashes with a “segmentation fault” or a “bus error” or similar message, then you can use the following two methods to further narrow down the origin of the issue. This will help the LAMMPS developers (or yourself) to understand the reason for the crash and apply a fix (either to the input script or the source code). This requires that your LAMMPS executable includes the required debug information. Otherwise it is not possible to look up the names of functions or variables.  

The following patch will introduce a bug into the code for pair style lj/cut when using the examples/melt/in.melt input. We use it to show how to identify the origin of a segmentation fault.  

-- a/src/pair_lj_cut.cpp   
+++ b/src/pair_lj_cut.cpp   
@@ -81,6 +81,7 @@ void PairLJCut::compute(int eflag, int vflag) int nlocal $\mathbf{\Sigma}=\operatorname{atc}$ m- $\scriptscriptstyle\textgreater$ nlocal; double \*special_lj $=$ force- $\scriptscriptstyle\textgreater$ special_lj; int newton_p $\mathrm{air}=\mathrm{force}->\mathrm{newton}$ _pair;   
+ double comx = 0.0; inum = list- $>$ inum; ilist = list- $>$ ilist;   
@@ -134,8 +135,10 @@ void PairLJCut::compute(int eflag, int vflag) evdwl,0.0,fpair,delx,dely,delz); } } (continues on next page)  

# 11.3. Reporting bugs  

(continued from previous page)  

comx $+=$ atom->rmass[i]\*x[i][0]; /\* BUG \* } printf("comx = %g\n",comx); if (vflag_fdotr) virial_fdotr_compute(); }  

After recompiling LAMMPS and running the input you should get something like this:  

$\$1$ ./lmp -in in.melt   
LAMMPS (19 Mar 2020)   
using 1 OpenMP thread(s) per MPI task   
Lattice spacing in $\mathrm{x,y,z=1.6796~1.6796~1.6796}$   
Created orthogonal $\mathrm{box=(000)}$ to (16.796 16.796 16.796) 1 by 1 by 1 MPI processor grid   
Created 4000 atoms   
create_atoms $\mathrm{CPU}=0.000432253$ secs   
Neighbor list info ...   
update every 20 steps, delay 0 steps, check no   
max neighbors/atom: 2000, page size: 100000   
master list distance cutoff = 2.8   
ghost atom $\mathrm{cutoff}=2.8\$   
binsize = 1.4, bins = 12 12 12   
1 neighbor lists, perpetual/occasional/extra = 1 0 0 (1) pair lj/cut, perpetual   
attributes: half, newton on   
pair build: half/bin/atomonly/newton   
stencil: half/bin/3d/newton   
bin: standard   
Setting up Verlet run ...   
Unit style : lj   
Current step : 0   
Time step : 0.005   
Segmentation fault (core dumped)  

# 11.4.1 Using the GDB debugger to get a stack trace  

There are two options to use the GDB debugger for identifying the origin of the segmentation fault or similar crash.   
The GDB debugger has many more features and options, as can be seen for example its online documentation.  

# Run LAMMPS from within the debugger  

Running LAMMPS under the control of the debugger as shown below only works for a single MPI rank (for debugging a program running in parallel you usually need a parallel debugger program). A simple way to launch GDB is to prefix the LAMMPS command-line with gdb --args and then type the command “run” at the GDB prompt. This will launch the debugger, load the LAMMPS executable and its debug info, and then run it. When it reaches the code causing the segmentation fault, it will stop with a message why it stopped, print the current line of code, and drop back to the GDB prompt.  

(continues on next page)  

(continued from previous page)  

Setting up Verlet run ... Unit style : lj Current step : 0 Time step : 0.005 Program received signal SIGSEGV, Segmentation fault.   
0x00000000006653ab in LAMMPS_NS::PairLJCut::compute (thi $=$ 0x829740, eflag=1, vflag=<optimized␣ $\hookrightarrow$ out $>$ ) at /home/akohlmey/compile/lammps/src/pair_lj_cut.cpp:139   
139 comx $+=$ atom- $\scriptscriptstyle\bigcirc$ rmass[i]\*x[i][0]; /\* BUG \*/ (gdb)  

Now typing the command “where” will show the stack of functions starting from the current function back to “main()”.  

(gdb) where   
#0 0x00000000006653ab in LAMMPS_NS::PairLJCut::compute (this $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ 0x829740, eflag $=1$ , vflag $\left[=\right]$   
,→<optimized out $>$ ) at /home/akohlmey/compile/lammps/src/pair_lj_cut.cpp:139   
#1 0x00000000004cf0a2 in LAMMPS_NS::Verlet::setup (this $=$ 0x7e6c90, flag $=1$ ) at /home/akohlmey/   
$\hookrightarrow$ compile/lammps/src/verlet.cpp:131   
#2 0x000000000049db42 in LAMMPS_NS::Run::command (this $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ this@entry $=$ 0x7fffffffcca0,␣   
$\hookrightarrow$ narg=narg@entry=1, arg $=$ arg@entry $=$ 0x7e8750) at /home/akohlmey/compile/lammps/src/run.cpp:177   
#3 0x000000000041258a in LAMMPS_NS::Input::command_creator<LAMMPS_NS::Run $>$ (lmp=   
,→<optimized out $>$ , narg=1, arg=0x7e8750) at /home/akohlmey/compile/lammps/src/input.cpp:878   
#4 0x0000000000410ad3 in LAMMPS_NS::Input::execute_command (this=0x7d1410) at /home/   
$\hookrightarrow$ akohlmey/compile/lammps/src/input.cpp:864   
#5 0x00000000004111fb in LAMMPS_NS::Input::file (this ${}={}$ 0x7d1410) at /home/akohlmey/compile/   
$\hookrightarrow$ lammps/src/input.cpp:229   
#6 0x000000000040933a in main (argc $=<$ <optimized out $>$ , argv $\asymp<$ <optimized out $>$ ) at /home/akohlmey/   
$\hookrightarrow$ compile/lammps/src/main.cpp:65   
(gdb)  

You can also print the value of variables and see if there is anything unexpected. Segmentation faults, for example, commonly happen when a pointer variable is not assigned and still initialized to NULL.  

(gdb) print x   
\$1 = (double \*\*) 0x7ffff7ca1010   
(gdb) print i   
\$2 = 0   
(gdb) print x[0]   
\$3 = (double \*) 0x7ffff6d80010   
(gdb) print x[0][0]   
$\$4=0$   
(gdb) print $\mathrm{x}[1][0]$   
$\$5$   
(gdb) print atom- $\cdot>$ rmass   
\$6 = (double \*) 0x0   
(gdb)  

# Inspect a core dump file with the debugger  

When an executable crashes with a “core dumped” message, it creates a file “core” or “core.<PID#>” which contains the information about the current state. This file may be located in the folder where you ran LAMMPS or in some hidden folder managed by the systemd daemon. In the latter case, you need to “extract” the core file with the coredumpctl utility to the current folder. Example: coredumpctl -o core dump lmp. Now you can launch the debugger to load the executable, its debug info and the core dump and drop you to a prompt like before.  

$\$1$ gdb lmp core   
Reading symbols from lmp...   
[New LWP 1928535]   
[Thread debugging using libthread_db enabled]   
Using host libthread_db library "/lib64/libthread_db.so.1".   
Core was generated by \`./lmp -in in.melt'.   
Program terminated with signal SIGSEGV, Segmentation fault.   
#0 0x00000000006653ab in LAMMPS_NS::PairLJCut::compute (this $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ 0x1b10740, eflag $=1$ , vflag $=$ ,→<optimized out $>$ )   
at /home/akohlmey/compile/lammps/src/pair_lj_cut.cpp:139   
139 comx $+=$ atom- $\scriptscriptstyle\bigcirc$ rmass[i]\*x[i][0]; /\* BUG \*/   
(gdb)  

From here on, you use the same commands as shown before to get a stack trace and print current values of (pointer) variables.  

# 11.4.2 Using valgrind to get a stack trace  

The valgrind suite of tools allows to closely inspect the behavior of a compiled program by essentially emulating a CPU and instrumenting the program while running. This slows down execution quite significantly, but can also report issues that are not resulting in a crash. The default valgrind tool is a memory checker and you can use it by prefixing the normal command-line with valgrind. Unlike GDB, this will also work for parallel execution, but it is recommended to redirect the valgrind output to a file (e.g. with --log-file $\Longleftarrow$ crash- $\%\mathrm{{p.txt}}$ , the $\%{\mathfrak{p}}$ will be substituted with the process ID) so that the messages of the multiple valgrind instances to the console are not mixed.  

$\$1$ valgrind ./lmp -in in.melt $==1933642==1$ Memcheck, a memory error detector ==1933642== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al. ==1933642== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info ==1933642== Command: ./lmp -in in.melt ==1933642== LAMMPS (19 Mar 2020) OMP_NUM_THREADS environment is not set. Defaulting to 1 thread. (src/comm.cpp:94) using 1 OpenMP thread(s) per MPI task Lattice spacing in x,y,z = 1.6796 1.6796 1.6796 Created orthogonal $\mathrm{box=(000)}$ to (16.796 16.796 16.796)   
1 by 1 by 1 MPI processor grid Created 4000 atoms create_atoms $\mathrm{{CPU}=0.032964}$ secs Neighbor list info ... update every 20 steps, delay 0 steps, check no max neighbors/atom: 2000, page size: 100000 master list distance cutoff $=2.8$ ghost atom cutoff = 2.8 binsize = 1.4, bins = 12 12 12   
1 neighbor lists, perpetual/occasional/extra = 1 0 0 (continues on next page)  

(continued from previous page)  

(1) pair lj/cut, perpetual attributes: half, newton on pair build: half/bin/atomonly/newton stencil: half/bin/3d/newton bin: standard   
Setting up Verlet run ... Unit style : lj Current step : 0 Time step : 0.005   
==1933642== Invalid read of size 8   
==1933642== at 0x6653AB: LAMMPS_NS::PairLJCut::compute(int, int) (pair_lj_cut.cpp:139)   
==1933642== by 0x4CF0A1: LAMMPS_NS::Verlet::setup(int) (verlet.cpp:131)   
==1933642== by 0x49DB41: LAMMPS_NS::Run::command(int, char $^{**}$ ) (run.cpp:177)   
==1933642== by 0x412589: void LAMMPS_NS::Input::command_creator<LAMMPS_NS::Run>   
$\hookrightarrow$ (LAMMPS_NS::LAMMPS\*, int, char $^{**}$ ) (input.cpp:881) =1933642== by 0x410AD2: LAMMPS_NS::Input::execute_command() (input.cpp:864) =1933642== by 0x4111FA: LAMMPS_NS::Input::file() (input.cpp:229) =1933642== by 0x409339: main (main.cpp:65)   
==1933642== Address 0x0 is not stack'd, malloc'd or (recently) free'd =1933642==  

As you can see, the stack trace information is similar to that obtained from GDB. In addition you get a more specific hint about what cause the segmentation fault, i.e. that it is a NULL pointer dereference. To find out which pointer exactly was NULL, you need to use the debugger, though.  

# 11.5 Debugging when LAMMPS appears to be stuck  

ometimes the LAMMPS calculation appears to be stuck, that is the LAMMPS process or processes are active, but here is no visible progress. This can have multiple reasons:  

• The selected styles are slow and require a lot of CPU time and the system is large. When extrapolating the expected speed from smaller systems, one has to factor in that not all models scale linearly with system size, e.g. kspace styles like ewald or pppm. There is very little that can be done in this case.   
• The output interval is not set or set to a large value with the thermo command. I the first case, there will be output only at the first and last step.   
• The output is block-buffered and instead of line-buffered. The output will only be written to the screen after 4096 or 8192 characters of output have accumulated. This most often happens for files but also with MPI parallel executables for output to the screen, since the output to the screen is handled by the MPI library so that output from all processes can be shown. This can be suppressed by using the -nonblock or -nb command-line flag, which turns off buffering for screen and logfile output.   
• An MPI parallel calculation has a bug where a collective MPI function is called (e.g. MPI_Barrier(), MPI_Bcast(), MPI_Allreduce() and so on) before pending point-to-point communications are completed or when the collective function is only called from a subset of the MPI processes. This also applies to some internal LAMMPS functions like Error::all() which uses MPI_Barrier() and thus Error::one() must be called, if the error condition does not happen on all MPI processes simultaneously.   
• Some function in LAMMPS has a bug where a for or while loop does not trigger the exit condition and thus will loop forever. This can happen when the wrong variable is incremented or when one value in a comparison becomes NaN due to an overflow.  

In the latter two cases, further information and stack traces (see above) can be obtain by attaching a debugger to a running process. For that the process ID (PID) is needed; this can be found on Linux machines with the top, htop, ps,  

or pstree commands.  

Then running the (GNU) debugger gdb with the -p flag followed by the process id will attach the process to the debugger and stop execution of that specific process. From there on it is possible to issue all debugger commands in the same way as when LAMMPS was started from the debugger (see above). Most importantly it is possible to obtain a stack trace with the where command and thus determine where in the execution of a timestep this process is. Also internal data can be printed and execution single stepped or continued. When the debugger is exited, the calculation will resume normally.  

# 11.6 Error messages  

This is an alphabetic list of the ERROR messages LAMMPS prints out and the reason why. If the explanation here is not sufficient, the documentation for the offending command may help. Error messages also list the source file and line number where the error was generated. For example, a message like this:  

ERROR: Illegal velocity command (velocity.cpp:78)  

means that line $\#78$ in the file src/velocity.cpp generated the error. Looking in the source code may help you figure out what went wrong.  

Doc page with WARNING messages  

# 1-3 bond count is inconsistent  

An inconsistency was detected when computing the number of 1-3 neighbors for each atom. This likely means something is wrong with the bond topologies you have defined.  

# 1-4 bond count is inconsistent  

An inconsistency was detected when computing the number of 1-4 neighbors for each atom. This likely means something is wrong with the bond topologies you have defined.  

# Accelerator sharing is not currently supported on system  

Multiple MPI processes cannot share the accelerator on your system. For NVIDIA GPUs, see the nvidia-smi command to change this setting.  

All angle coeffs are not set All angle coefficients must be set in the data file or by the angle_coeff command before running a simulation.  

All atom $I D s=\theta$ but atom_modify $i d=y e s$ Self-explanatory.  

All atoms of a swapped type must have same charge. Self-explanatory.  

All atoms of a swapped type must have the same charge. Self-explanatory.  

All bond coeffs are not set  

All bond coefficients must be set in the data file or by the bond_coeff command before running a simulation.  

All dihedral coeffs are not set All dihedral coefficients must be set in the data file or by the dihedral_coeff command before running a simulation.  

All improper coeffs are not set  

All improper coefficients must be set in the data file or by the improper_coeff command before running a simulation.  

# All masses are not set  

For atom styles that define masses for each atom type, all masses must be set in the data file or by the mas command before running a simulation. They must also be set before using the velocity command.  

# All mol IDs should be set for fix gcmc group atoms  

The molecule flag is on, yet not all molecule ids in the fix group have been set to non-zero positive values by the user. This is an error since all atoms in the fix gcmc group are eligible for deletion, rotation, and translation and therefore must have valid molecule ids.  

All pair coeffs are not set All pair coefficients must be set in the data file or by the pair_coeff command before running a simulation.  

All read_dump x,y,z fields must be specified for scaled, triclinic coords For triclinic boxes and scaled coordinates you must specify all 3 of the x,y,z fields, else LAMMPS cannot reconstruct the unscaled coordinates.  

All universe/uloop variables must have same # of values Self-explanatory.  

All variables in next command must be same style Self-explanatory.  

Angle atom missing in delete_bonds  

The delete_bonds command cannot find one or more atoms in a particular angle on a particular processor. The pairwise cutoff is too short or the atoms are too far apart to make a valid angle.  

# Angle atom missing in set command  

The set command cannot find one or more atoms in a particular angle on a particular processor. The pairwise cutoff is too short or the atoms are too far apart to make a valid angle.  

# Angle atoms %d %d %d missing on proc %d at step %ld  

One or more of three atoms needed to compute a particular angle are missing on this processor. Typically this is because the pairwise cutoff is set too short or the angle has blown apart and an atom is too far away.  

# Angle atoms missing on proc %d at step %ld  

One or more of three atoms needed to compute a particular angle are missing on this processor. Typically this is because the pairwise cutoff is set too short or the angle has blown apart and an atom is too far away.  

# Angle coeff for hybrid has invalid style  

Angle style hybrid uses another angle style as one of its coefficients. The angle style used in the angle_coeff command or read from a restart file is not recognized.  

Angle coeffs are not set  

No angle coefficients have been assigned in the data file or via the angle_coeff command.  

Angle extent $>$ half of periodic box length  

This error was detected by the neigh_modify check yes setting. It is an error because the angle atoms are so far apart it is ambiguous how it should be defined.  

# Angle potential must be defined for SHAKE  

When shaking angles, an angle_style potential must be used.  

Angle style hybrid cannot have hybrid as an argument Self-explanatory.  

Angle style hybrid cannot have none as an argument Self-explanatory.  

Angle style hybrid cannot use same angle style twice Self-explanatory.  

Angle table must range from 0 to 180 degrees Self-explanatory.  

Angle table parameters did not set $N$ List of angle table parameters must include $\mathbf{N}$ setting.  

Angle_coeff command before angle_style is defined Coefficients cannot be set in the data file or via the angle_coeff command until an angle_style has been assigned.  

Angle_coeff command before simulation box is defined The angle_coeff command cannot be used before a read_data, read_restart, or create_box command.  

Angle_coeff command when no angles allowed The chosen atom style does not allow for angles to be defined.  

Angle_style command when no angles allowed The chosen atom style does not allow for angles to be defined.  

Angles assigned incorrectly  

Angles read in from the data file were not assigned correctly to atoms. This means there is something invalid about the topology definitions.  

Angles defined but no angle types The data file header lists angles but no angle types.  

Append boundary must be shrink/minimum The boundary style of the face where atoms are added must be of type m (shrink/minimum).  

Arccos of invalid value in variable formula Argument of arccos() must be between -1 and 1.  

Arcsin of invalid value in variable formula Argument of arcsin() must be between -1 and 1.  

Assigning body parameters to non-body atom Self-explanatory.  

Assigning ellipsoid parameters to non-ellipsoid atom Self-explanatory.  

Assigning line parameters to non-line atom Self-explanatory.  

Assigning quat to non-body atom Self-explanatory.  

Assigning tri parameters to non-tri atom Self-explanatory.  

At least one atom of each swapped type must be present to define charges. Self-explanatory.  

Atom IDs must be consecutive for velocity create loop all Self-explanatory.  

Atom IDs must be used for molecular systems Atom IDs are used to identify and find partner atoms in bonds.  

Atom count changed in fix neb This is not allowed in a NEB calculation.  

Atom count is inconsistent, cannot write data file The sum of atoms across processors does not equal the global number of atoms. Probably some atoms have been lost.  

Atom count is inconsistent, cannot write restart file  

Sum of atoms across processors does not equal initial total count. This is probably because you have lost some atoms.  

# Atom in too many rigid bodies - boost MAXBODY  

Fix poems has a parameter MAXBODY (in fix_poems.cpp) which determines the maximum number of rigid bodies a single atom can belong to (i.e. a multibody joint). The bodies you have defined exceed this limit.  

Atom sort did not operate correctly This is an internal LAMMPS error. Please report it to the developers.  

Atom style hybrid cannot have hybrid as an argument Self-explanatory.  

Atom style hybrid cannot use same atom style twice Self-explanatory.  

Atom style template molecule must have atom types The defined molecule(s) does not specify atom types.  

Atom style was redefined after using fix property/atom This is not allowed.  

Atom type must be zero in fix gcmc mol command Self-explanatory.  

Atom vector in equal-style variable formula Atom vectors generate one value per atom which is not allowed in an equal-style variable.  

Atom-style variable in equal-style variable formula Atom-style variables generate one value per atom which is not allowed in an equal-style variable  

Atom_modify id command after simulation box is defined The atom_modify id command cannot be used after a read_data, read_restart, or create_box command.  

Atom_modify map command after simulation box is defined The atom_modify map command cannot be used after a read_data, read_restart, or create_box command.  

Atom_modify sort and first options cannot be used together Self-explanatory.  

Atom_style command after simulation box is defined The atom_style command cannot be used after a read_data, read_restart, or create_box command.  

Atom_style line can only be used in 2d simulations Self-explanatory.  

Atom_style tri can only be used in 3d simulations Self-explanatory.  

Atomfile variable could not read values Check the file assigned to the variable.  

Atomfile variable in equal-style variable formula Self-explanatory.  

Atomfile-style variable in equal-style variable formula Self-explanatory.  

Attempt to pop empty stack in fix box/relax Internal LAMMPS error. Please report it to the developers.  

Attempt to push beyond stack limit in fix box/relax Internal LAMMPS error. Please report it to the developers.  

Attempting to rescale a 0.0 temperature Cannot rescale a temperature that is already 0.0.  

Attempting to insert more particles than available lattice points Self-explanatory.  

# Bad FENE bond  

Two atoms in a FENE bond have become so far apart that the bond cannot be computed.  

Bad TIP4P angle type for PPPM/TIP4P Specified angle type is not valid.  

Bad TIP4P angle type for PPPMDisp/TIP4P Specified angle type is not valid.  

Bad TIP4P bond type for PPPM/TIP4P Specified bond type is not valid.  

Bad TIP4P bond type for PPPMDisp/TIP4P Specified bond type is not valid.  

Bad fix ID in fix append/atoms command The value of the fix_id for keyword spatial must start with “f_”.  

The 3d grid of processors defined by the processors command does not match the number of processors LAMMPS is being run on.  

Bad kspace_modify kmax/ewald parameter Kspace_modify values for the kmax/ewald keyword must be integers $>0$  

Bad kspace_modify slab parameter Kspace_modify value for the slab/volume keyword must be $>=2.0$ .  

Bad matrix inversion in mldivide3 This error should not occur unless the matrix is badly formed.  

Bad principal moments Fix rigid did not compute the principal moments of inertia of a rigid group of atoms correctly.  

Bad quadratic solve for particle/line collision This is an internal error. It should normally not occur.  

Bad quadratic solve for particle/tri collision This is an internal error. It should normally not occur.  

Bad real space Coulombic cutoff in fix tune/kspace Fix tune/kspace tried to find the optimal real space Coulombic cutoff using the Newton-Rhaphson method, but found a non-positive or NaN cutoff  

Balance command before simulation box is defined The balance command cannot be used before a read_data, read_restart, or create_box command.  

# Balance produced bad splits  

This should not occur. It means two or more cutting plane locations are on top of each other or out of order.   
Report the problem to the developers.  

Balance rcb cannot be used with comm_style brick Comm_style tiled must be used instead.  

Balance shift string is invalid The string can only contain the characters “x”, “y”, or “z”.  

Bias compute does not calculate a velocity bias The specified compute must compute a bias for temperature.  

# Bias compute does not calculate temperature  

The specified compute must compute temperature.  

Bias compute group does not match compute group The specified compute must operate on the same group as the parent compute.  

Big particle in fix srd cannot be point particle Big particles must be extended spheroids or ellipsoids.  

Bigint setting in lmptype.h is invalid Size of bigint is less than size of tagint.  

Bigint setting in lmptype.h is not compatible Format of bigint stored in restart file is not consistent with LAMMPS version you are running. See the settings in src/lmptype.h  

Bitmapped lookup tables require int/float be same size  

Cannot use pair tables on this machine, because of word sizes. Use the pair_modify command with table 0 instead.  

Bitmapped table in file does not match requested table Setting for bitmapped table in pair_coeff command must match table in file exactly.  

Bitmapped table is incorrect length in table file Number of table entries is not a correct power of 2.  

# Bond and angle potentials must be defined for TIP4P  

Cannot use TIP4P pair potential unless bond and angle potentials are defined.  

# Bond atom missing in box size check  

The second atom needed to compute a particular bond is missing on this processor. Typically this is because the pairwise cutoff is set too short or the bond has blown apart and an atom is too far away.  

# Bond atom missing in delete_bonds  

The delete_bonds command cannot find one or more atoms in a particular bond on a particular processor. The pairwise cutoff is too short or the atoms are too far apart to make a valid bond.  

# Bond atom missing in image check  

The second atom in a particular bond is missing on this processor. Typically this is because the pairwise cutoff is set too short or the bond has blown apart and an atom is too far away.  

# Bond atom missing in set command  

The set command cannot find one or more atoms in a particular bond on a particular processor. The pairwise cutoff is too short or the atoms are too far apart to make a valid bond.  

# Bond atoms %d %d missing on proc %d at step %ld  

The second atom needed to compute a particular bond is missing on this processor. Typically this is because the pairwise cutoff is set too short or the bond has blown apart and an atom is too far away.  

# Bond atoms missing on proc %d at step %ld  

The second atom needed to compute a particular bond is missing on this processor. Typically this is because the pairwise cutoff is set too short or the bond has blown apart and an atom is too far away.  

# Bond coeff for hybrid has invalid style  

Bond style hybrid uses another bond style as one of its coefficients. The bond style used in the bond_coef command or read from a restart file is not recognized.  

# Bond coeffs are not set  

No bond coefficients have been assigned in the data file or via the bond_coeff command.  

# Bond extent $>$ half of periodic box length  

This error was detected by the neigh_modify check yes setting. It is an error because the bond atoms are so far apart it is ambiguous how it should be defined.  

Bond potential must be defined for SHAKE Cannot use fix shake unless bond potential is defined.  

Bond style hybrid cannot have hybrid as an argument Self-explanatory.  

Bond style hybrid cannot have none as an argument Self-explanatory.  

Bond style hybrid cannot use same bond style twice Self-explanatory.  

Bond style quartic cannot be used with 3,4-body interactions No angle, dihedral, or improper styles can be defined when using bond style quartic.  

Bond style quartic cannot be used with atom style template This bond style can change the bond topology which is not allowed with this atom style.  

Bond style quartic requires special_bonds $=l,l,l$ This is a restriction of the current bond quartic implementation.  

Bond table parameters did not set $N$ List of bond table parameters must include $\mathbf{N}$ setting.  

Bond table values are not increasing The values in the tabulated file must be monotonically increasing.  

BondAngle coeff for hybrid angle has invalid format No “ba” field should appear in data file entry.  

BondBond coeff for hybrid angle has invalid format No “bb” field should appear in data file entry.  

Bond_coeff command before bond_style is defined Coefficients cannot be set in the data file or via the bond_coeff command until an bond_style has been assigned.  

Bond_coeff command before simulation box is defined The bond_coeff command cannot be used before a read_data, read_restart, or create_box command.  

Bond_coeff command when no bonds allowed The chosen atom style does not allow for bonds to be defined.  

Bond_style command when no bonds allowed The chosen atom style does not allow for bonds to be defined.  

# Bonds assigned incorrectly  

Bonds read in from the data file were not assigned correctly to atoms. This means there is something invalid about the topology definitions.  

Bonds defined but no bond types The data file header lists bonds but no bond types.  

Both restart files must use $\%$ or neither Self-explanatory.  

Both restart files must use MPI-IO or neither Self-explanatory.  

Both sides of boundary must be periodic Cannot specify a boundary as periodic only on the lo or hi side. Must be periodic on both sides.  

# Boundary command after simulation box is defined  

The boundary command cannot be used after a read_data, read_restart, or create_box command.  

# Box bounds are invalid  

The box boundaries specified in the read_data file are invalid. The lo value must be less than the hi value for all 3 dimensions.  

# Box command after simulation box is defined  

The box command cannot be used after a read_data, read_restart, or create_box command.  

CPU neighbor lists must be used for ellipsoid/sphere mix. When using Gay-Berne or RE-squared pair styles with both ellipsoidal and spherical particles, the neighbor list must be built on the CPU  

Can not specify Pxy/Pxz/Pyz in fix box/relax with non-triclinic box Only triclinic boxes can be used with off-diagonal pressure components. See the region prism command for details.  

Can not specify Pxy/Pxz/Pyz in fix nvt/npt/nph with non-triclinic box  

Only triclinic boxes can be used with off-diagonal pressure components. See the region prism command for details.  

Can only use -plog with multiple partitions Self-explanatory. See page discussion of command-line switches.  

Can only use -pscreen with multiple partitions Self-explanatory. See page discussion of command-line switches.  

Can only use Kokkos supported regions with Kokkos package Self-explanatory.  

Can only use NEB with 1-processor replicas This is current restriction for NEB as implemented in LAMMPS.  

Can only use TAD with 1-processor replicas for NEB This is current restriction for NEB as implemented in LAMMPS.  

Cannot (yet) do analytic differentiation with pppm/gpu This is a current restriction of this command.  

Cannot (yet) request ghost atoms with Kokkos half neighbor list This feature is not yet supported.  

Cannot (yet) use ‘electron’ units with dipoles This feature is not yet supported.  

Cannot (yet) use Ewald with triclinic box and slab correction This feature is not yet supported.  

Cannot (yet) use K-space slab correction with compute group/group for triclinic systems This option is not yet supported.  

Cannot (yet) use MSM with 2d simulation This feature is not yet supported.  

Cannot (yet) use PPPM with triclinic box and TIP4P This feature is not yet supported.  

Cannot (yet) use PPPM with triclinic box and kspace_modify diff ad This feature is not yet supported.  

Cannot (yet) use PPPM with triclinic box and slab correction This feature is not yet supported.  

Cannot (yet) use kspace slab correction with long-range dipoles and non-neutral systems or per-atom energy This feature is not yet supported.  

Cannot (yet) use kspace_modify diff ad with compute group/group This option is not yet supported.  

Cannot (yet) use kspace_style pppm/stagger with triclinic systems This feature is not yet supported.  

Cannot (yet) use molecular templates with Kokkos Self-explanatory.  

Cannot (yet) use respa with Kokkos Self-explanatory.  

Cannot (yet) use rigid bodies with fix deform and Kokkos Self-explanatory.  

Cannot (yet) use rigid bodies with fix nh and Kokkos Self-explanatory.  

Cannot (yet) use single precision with MSM (remove -DFFT_SINGLE from Makefile and re-compile) Single precision cannot be used with MSM.  

Cannot add atoms to fix move variable Atoms can not be added afterwards to this fix option.  

Cannot append atoms to a triclinic box The simulation box must be defined with edges aligned with the Cartesian axes.  

Cannot balance in z dimension for 2d simulation Self-explanatory.  

Cannot change box ortho/triclinic with certain fixes defined  

This is because those fixes store the shape of the box. You need to use unfix to discard the fix, change the box, then redefine a new fix.  

Cannot change box ortho/triclinic with dumps defined  

This is because some dumps store the shape of the box. You need to use undump to discard the dump, change the box, then redefine a new dump.  

Cannot change box tilt factors for orthogonal box Cannot use tilt factors unless the simulation box is non-orthogonal.  

Cannot change box to orthogonal when tilt is non-zero Self-explanatory.  

Cannot change box z boundary to non-periodic for a 2d simulation Self-explanatory.  

Cannot change dump_modify every for dump dcd The frequency of writing dump dcd snapshots cannot be changed.  

Cannot change dump_modify every for dump xtc The frequency of writing dump xtc snapshots cannot be changed.  

Cannot change timestep once fix srd is setup This is because various SRD properties depend on the timestep size.  

Cannot change timestep with fix pour This is because fix pour pre-computes the time delay for particles to fall out of the insertion volume due to gravity.  

Cannot change to comm_style brick from tiled layout Self-explanatory.  

# Cannot change_box after reading restart file with per-atom info  

This is because the restart file info cannot be migrated with the atoms. You can get around this by performing a 0-timestep run which will assign the restart file info to actual atoms.  

Cannot change_box in xz or yz for 2d simulation Self-explanatory.  

Cannot change_box in z dimension for 2d simulation Self-explanatory.  

Cannot clear group all This operation is not allowed.  

Cannot close restart file - MPI error: %s This error was generated by MPI when reading/writing an MPI-IO restart file.  

Cannot compute initial g_ewald_disp LAMMPS failed to compute an initial guess for the PPPM_disp g_ewald_6 factor that partitions the computation between real space and k-space for Dispersion interactions.  

# Cannot create an atom map unless atoms have IDs  

The simulation requires a mapping from global atom IDs to local atoms, but the atoms that have been defined have no IDs.  

Cannot create atoms with undefined lattice Must use the lattice command before using the create_atoms command.  

Cannot create/grow a vector/array of pointers for $9\mathbf{\epsilon}_{\mathrm{{/0}}s}$ LAMMPS code is making an illegal call to the templated memory allocators, to create a vector or array of pointers.  

Cannot create_atoms after reading restart file with per-atom info  

The per-atom info was stored to be used when by a fix that you may re-define. If you add atoms before re-defining the fix, then there will not be a correct amount of per-atom info.  

Cannot create_box after simulation box is defined A simulation box can only be defined once.  

Cannot currently use pair reax with pair hybrid This is not yet supported.  

Cannot currently use pppm/gpu with fix balance. Self-explanatory.  

Cannot delete group all Self-explanatory.  

Cannot delete group currently used by a compute Self-explanatory.  

Cannot delete group currently used by a dump Self-explanatory.  

Cannot delete group currently used by a fix Self-explanatory.  

Cannot delete group currently used by atom_modify first Self-explanatory.  

Cannot delete_atoms bond yes for non-molecular systems Self-explanatory.  

# Cannot displace_atoms after reading restart file with per-atom info  

This is because the restart file info cannot be migrated with the atoms. You can get around this by performing a 0-timestep run which will assign the restart file info to actual atoms.  

Cannot do GCMC on atoms in atom_modify first group This is a restriction due to the way atoms are organized in a list to enable the atom_modify first command.  

Cannot do atom/swap on atoms in atom_modify first group This is a restriction due to the way atoms are organized in a list to enable the atom_modify first command.  

Cannot dump sort on atom IDs with no atom IDs defined Self-explanatory.  

Cannot dump sort when multiple dump files are written In this mode, each processor dumps its atoms to a file, so no sorting is allowed.  

Cannot embed Python when also extending Python with LAMMPS When running LAMMPS via Python through the LAMMPS library interface you cannot also user the input script python command.  

Cannot evaporate atoms in atom_modify first group This is a restriction due to the way atoms are organized in a list to enable the atom_modify first command.  

Cannot find create_bonds group ID Self-explanatory.  

Cannot find delete_bonds group ID Group ID used in the delete_bonds command does not exist.  

Cannot find specified group ID for core particles Self-explanatory.  

Cannot find specified group ID for shell particles Self-explanatory.  

Cannot have both pair_modify shift and tail set to yes These 2 options are contradictory.  

Cannot intersect groups using a dynamic group This operation is not allowed.  

Cannot mix molecular and molecule template atom styles Self-explanatory.  

Cannot open -reorder file Self-explanatory.  

Cannot open ADP potential file $9\mathbf{\epsilon}_{\mathrm{{/0}}s}$ The specified ADP potential file cannot be opened. Check that the path and name are correct.  

Cannot open AIREBO potential file %s The specified AIREBO potential file cannot be opened. Check that the path and name are correct.  

Cannot open BOP potential file %s The specified BOP potential file cannot be opened. Check that the path and name are correct.  

Cannot open COMB potential file %s The specified COMB potential file cannot be opened. Check that the path and name are correct.  

Cannot open COMB3 lib.comb3 file The COMB3 library file cannot be opened. Check that the path and name are correct.  

Cannot open COMB3 potential file %s The specified COMB3 potential file cannot be opened. Check that the path and name are correct.  

Cannot open EAM potential file %s The specified EAM potential file cannot be opened. Check that the path and name are correct.  

Cannot open EIM potential file %s The specified EIM potential file cannot be opened. Check that the path and name are correct.  

Cannot open LCBOP potential file %s The specified LCBOP potential file cannot be opened. Check that the path and name are correct.  

Cannot open MEAM potential file $9\mathbf{\epsilon}_{\mathrm{{/0}}s}$ The specified MEAM potential file cannot be opened. Check that the path and name are correct.  

Cannot open SNAP coefficient file $9\mathbf{\epsilon}_{\mathrm{{/0}}s}$ The specified SNAP coefficient file cannot be opened. Check that the path and name are correct.  

Cannot open SNAP parameter file %s The specified SNAP parameter file cannot be opened. Check that the path and name are correct.  

Cannot open Stillinger-Weber potential file %s The specified SW potential file cannot be opened. Check that the path and name are correct.  

Cannot open Tersoff potential file $9\mathbf{\epsilon}_{\mathrm{{/0}}s}$ The specified potential file cannot be opened. Check that the path and name are correct.  

Cannot open Vashishta potential file %s The specified Vashishta potential file cannot be opened. Check that the path and name are correct.  

Cannot open balance output file Self-explanatory.  

Cannot open coul/streitz potential file %s The specified coul/streitz potential file cannot be opened. Check that the path and name are correct.  

Cannot open custom file Self-explanatory.  

Cannot open data file %s The specified file cannot be opened. Check that the path and name are correct.  

Cannot open dir to search for restart file Using a “\*” in the name of the restart file will open the current directory to search for matching file names.  

Cannot open dump file Self-explanatory.  

nnot open dump file %s The output file for the dump command cannot be opened. Check that the path and name are correct.  

Cannot open file %s The specified file cannot be opened. Check that the path and name are correct. If the file is a compressed fil also check that the gzip executable can be found and run.  

Cannot open file variable file %s The specified file cannot be opened. Check that the path and name are correct.  

Cannot open fix ave/chunk file %s The specified file cannot be opened. Check that the path and name are correct.  

Cannot open fix ave/correlate file %s The specified file cannot be opened. Check that the path and name are correct.  

Cannot open fix ave/histo file %s The specified file cannot be opened. Check that the path and name are correct.  

Cannot open fix ave/time file %s The specified file cannot be opened. Check that the path and name are correct.  

Cannot open fix balance output file Self-explanatory.  

Cannot open fix poems file %s The specified file cannot be opened. Check that the path and name are correct.  

Cannot open fix print file %s The output file generated by the fix print command cannot be opened  

Cannot open fix qeq parameter file $9\mathbf{\epsilon}_{\mathrm{{/0}}s}$ The specified file cannot be opened. Check that the path and name are correct.  

Cannot open fix qeq/comb file %s The output file for the fix qeq/combs command cannot be opened. Check that the path and name are correct  

Cannot open fix reax/bonds file %s The output file for the fix reax/bonds command cannot be opened. Check that the path and name are correct.  

Cannot open fix rigid infile %s The specified file cannot be opened. Check that the path and name are correct.  

Cannot open fix rigid restart file $9\mathbf{\epsilon}_{\mathrm{{/0}}s}$ The specified file cannot be opened. Check that the path and name are correct.  

Cannot open fix rigid/small infile %s The specified file cannot be opened. Check that the path and name are correct.  

annot open fix tmd file %s The output file for the fix tmd command cannot be opened. Check that the path and name are correct.  

Cannot open fix ttm file %s The output file for the fix ttm command cannot be opened. Check that the path and name are correct.  

Cannot open gzipped file  

LAMMPS was compiled without support for reading and writing gzipped files through a pipeline to the gzip program with -DLAMMPS_GZIP.  

Cannot open input script %s Self-explanatory.  

Cannot open log.cite file  

This file is created when you use some LAMMPS features, to indicate what paper you should cite on behalf of those who implemented the feature. Check that you have write privileges into the directory you are running in.  

Cannot open log.lammps for writing  

The default LAMMPS log file cannot be opened. Check that the directory you are running in allows for files to be created.  

# Cannot open logfile  

The LAMMPS log file named in a command-line argument cannot be opened. Check that the path and name are correct.  

Cannot open logfile %s The LAMMPS log file specified in the input script cannot be opened. Check that the path and name are correct.  

nnot open molecule file %s The specified file cannot be opened. Check that the path and name are correct.  

Cannot open nb3b/harmonic potential file %s The specified potential file cannot be opened. Check that the path and name are correct.  

# Cannot open pair_write file  

The specified output file for pair energies and forces cannot be opened. Check that the path and name are correct.  

annot open polymorphic potential file %s The specified polymorphic potential file cannot be opened. Check that the path and name are correct.  

Cannot open print file %s Self-explanatory.  

Cannot open processors output file Self-explanatory.  

Cannot open restart file $9\mathbf{\epsilon}_{\mathrm{{/0}}s}$ Self-explanatory.  

Cannot open restart file for reading - MPI error: %s This error was generated by MPI when reading/writing an MPI-IO restart file.  

Cannot open restart file for writing - MPI error: %s This error was generated by MPI when reading/writing an MPI-IO restart file.  

# Cannot open screen file  

The screen file specified as a command-line argument cannot be opened. Check that the directory you are running in allows for files to be created.  

Cannot open temporary file for world counter. Self-explanatory.  

# Cannot open universe log file  

For a multi-partition run, the master log file cannot be opened. Check that the directory you are running in allows for files to be created.  

For a multi-partition run, the master screen file cannot be opened. Check that the directory you are running in allows for files to be created.  

Cannot read from restart file - MPI error: %s This error was generated by MPI when reading/writing an MPI-IO restart file.  

Cannot read_data without add keyword after simulation box is defined Self-explanatory.  

Cannot read_restart after simulation box is defined The read_restart command cannot be used after a read_data, read_restart, or create_box command.  

Cannot redefine variable as a different style An equal-style variable can be re-defined but only if it was originally an equal-style variable.  

Cannot replicate 2d simulation in z dimension The replicate command cannot replicate a 2d simulation in the z dimension.  

Cannot replicate with fixes that store atom quantities  

Either fixes are defined that create and store atom-based vectors or a restart file was read which included atombased vectors for fixes. The replicate command cannot duplicate that information for new atoms. You should use the replicate command before fixes are applied to the system.  

# Cannot reset timestep with a dynamic region defined  

Dynamic regions (see the region command) have a time dependence. Thus you cannot change the timestep when one or more of these are defined.  

# Cannot reset timestep with a time-dependent fix defined  

You cannot reset the timestep when a fix that keeps track of elapsed time is in place.  

# 11.6. Error messages  

Cannot run 2d simulation with non-periodic Z dimension  

Use the boundary command to make the z dimension periodic in order to run a 2d simulation.  

Cannot set bond topology types for atom style template  

The bond, angle, etc types cannot be changed for this atom style since they are static settings in the molecule template files.  

Cannot set both respa pair and inner/middle/outer  

In the rRESPA integrator, you must compute pairwise potentials either all together (pair), or in pieces (inner/middle/outer). You can’t do both.  

Cannot set cutoff/multi before simulation box is defined Self-explanatory.  

Cannot set dpd/theta for this atom style Self-explanatory.  

Cannot set dump_modify flush for dump xtc Self-explanatory.  

Cannot set mass for this atom style This atom style does not support mass settings for each atom type. Instead they are defined on a per-atom basis in the data file.  

Cannot set meso/cv for this atom style Self-explanatory.  

Cannot set meso/e for this atom style Self-explanatory.  

Cannot set meso/rho for this atom style Self-explanatory.  

Cannot set non-zero image flag for non-periodic dimension Self-explanatory.  

Cannot set non-zero z velocity for 2d simulation Self-explanatory.  

Cannot set quaternion for atom that has none Self-explanatory.  

Cannot set quaternion with xy components for 2d system Self-explanatory.  

Cannot set respa hybrid and any of pair/inner/middle/outer In the rRESPA integrator, you must compute pairwise potentials either all together (pair), with different cutoff regions (inner/middle/outer), or per hybrid sub-style (hybrid). You cannot mix those.  

Cannot set respa middle without inner/outer In the rRESPA integrator, you must define both a inner and outer setting in order to use a middle setting.  

Cannot set restart file size - MPI error: %s This error was generated by MPI when reading/writing an MPI-IO restart file.  

Cannot set smd/contact/radius for this atom style Self-explanatory.  

Cannot set smd/mass/density for this atom style Self-explanatory.  

Cannot set temperature for fix rigid/nph The temp keyword cannot be specified.  

Cannot set theta for atom that is not a line Self-explanatory.  

Cannot set this attribute for this atom style The attribute being set does not exist for the defined atom style.  

Cannot set variable z velocity for 2d simulation Self-explanatory.  

Cannot skew triclinic box in z for 2d simulation Self-explanatory.  

Cannot subtract groups using a dynamic group This operation is not allowed.  

Cannot union groups using a dynamic group This operation is not allowed.  

Cannot use -kokkos on without KOKKOS installed Self-explanatory.  

Cannot use -reorder after -partition Self-explanatory. See page discussion of command-line switches.  

Cannot use Ewald with 2d simulation  

The kspace style ewald cannot be used in 2d simulations. You can use 2d Ewald in a 3d simulation; see the kspace_modify command.  

Cannot use Ewald/disp solver on system with no charge, dipole, or LJ particles No atoms in system have a non-zero charge or dipole, or are LJ particles. Change charges/dipoles or change options of the kspace solver/pair style.  

Cannot use EwaldDisp with 2d simulation This is a current restriction of this command.  

Cannot use Kokkos pair style with rRESPA inner/middle Self-explanatory.  

Cannot use NEB unless atom map exists Use the atom_modify command to create an atom map.  

Cannot use NEB with a single replica Self-explanatory.  

Cannot use NEB with atom_modify sort enabled This is current restriction for NEB implemented in LAMMPS.  

Cannot use PPPM with 2d simulation  

The kspace style pppm cannot be used in 2d simulations. You can use 2d PPPM in a 3d simulation; see the kspace_modify command.  

Cannot use PPPMDisp with 2d simulation  

The kspace style pppm/disp cannot be used in 2d simulations. You can use 2d pppm/disp in a 3d simulation; see the kspace_modify command.  

Cannot use PRD with a changing box The current box dimensions are not copied between replicas  

Cannot use PRD with a time-dependent fix defined PRD alters the timestep in ways that will mess up these fixes.  

Cannot use PRD with a time-dependent region defined PRD alters the timestep in ways that will mess up these regions.  

# Cannot use PRD with atom_modify sort enabled  

This is a current restriction of PRD. You must turn off sorting, which is enabled by default, via the atom_modify command.  

Cannot use PRD with multi-processor replicas unless atom map exists Use the atom_modify command to create an atom map.  

Cannot use TAD unless atom map exists for NEB See atom_modify map command to set this.  

Cannot use TAD with a single replica for NEB NEB requires multiple replicas.  

Cannot use TAD with atom_modify sort enabled for NEB This is a current restriction of NEB.  

Cannot use a damped dynamics min style with fix box/relax This is a current restriction in LAMMPS. Use another minimizer style.  

Cannot use a damped dynamics min style with per-atom DOF This is a current restriction in LAMMPS. Use another minimizer styl  

Cannot use append/atoms in periodic dimension The boundary style of the face where atoms are added can not be of type p (periodic).  

Cannot use atomfile-style variable unless atom map exists Self-explanatory. See the atom_modify command to create a map.  

Cannot use both com and bias with compute temp/chunk Self-explanatory.  

Cannot use chosen neighbor list style with buck/coul/cut/kk Self-explanatory.  

Cannot use chosen neighbor list style with buck/coul/long/kk Self-explanatory.  

Cannot use chosen neighbor list style with buck/kk That style is not supported by Kokkos.  

Cannot use chosen neighbor list style with coul/cut/kk That style is not supported by Kokkos.  

Cannot use chosen neighbor list style with coul/debye/kk Self-explanatory.  

Cannot use chosen neighbor list style with coul/dsf/kk That style is not supported by Kokkos.  

Cannot use chosen neighbor list style with coul/wolf/kk That style is not supported by Kokkos.  

Cannot use chosen neighbor list style with lj/charmm/coul/charmm/implicit/kk Self-explanatory.  

Cannot use chosen neighbor list style with lj/charmm/coul/charmm/kk Self-explanatory.  

Cannot use chosen neighbor list style with lj/charmm/coul/long/kk Self-explanatory.  

Cannot use chosen neighbor list style with lj/class2/coul/cut/kk Self-explanatory.  

Cannot use chosen neighbor list style with lj/class2/coul/long/kk Self-explanatory.  

Cannot use chosen neighbor list style with lj/class2/kk Self-explanatory.  

Cannot use chosen neighbor list style with lj/cut/coul/cut/kk That style is not supported by Kokkos.  

Cannot use chosen neighbor list style with lj/cut/coul/debye/kk Self-explanatory.  

Cannot use chosen neighbor list style with lj/cut/coul/long/kk That style is not supported by Kokkos.  

Cannot use chosen neighbor list style with lj/cut/kk That style is not supported by Kokkos.  

Cannot use chosen neighbor list style with lj/expand/kk Self-explanatory.  

Cannot use chosen neighbor list style with lj/gromacs/coul/gromacs/kk Self-explanatory.  

Cannot use chosen neighbor list style with lj/gromacs/kk Self-explanatory.  

Cannot use chosen neighbor list style with lj/spica/kk That style is not supported by Kokkos.  

Cannot use chosen neighbor list style with pair eam/kk That style is not supported by Kokkos.  

Cannot use chosen neighbor list style with pair eam/kk/alloy Self-explanatory.  

Cannot use chosen neighbor list style with pair eam/kk/fs Self-explanatory.  

Cannot use chosen neighbor list style with pair sw/kk Self-explanatory.  

Cannot use chosen neighbor list style with tersoff/kk Self-explanatory.  

Cannot use chosen neighbor list style with tersoff/zbl/kk Self-explanatory.  

Cannot use compute chunk/atom bin z for 2d model Self-explanatory.  

Cannot use compute cluster/atom unless atoms have IDs Atom IDs are used to identify clusters.  

Cannot use create_atoms rotate unless single style Self-explanatory.  

Cannot use create_bonds unless atoms have IDs This command requires a mapping from global atom IDs to local atoms, but the atoms that have been defined have no IDs.  

Cannot use create_bonds with non-molecular system Self-explanatory.  

Cannot use cwiggle in variable formula between runs This is a function of elapsed time.  

Cannot use delete_atoms bond yes with atom_style template This is because the bonds for that atom style are hardwired in the molecule template.  

Cannot use delete_atoms unless atoms have IDs Your atoms do not have IDs, so the delete_atoms command cannot be used.  

Cannot use delete_bonds with non-molecular system Your choice of atom style does not have bonds.  

Cannot use dump_modify fileper without $\%$ in dump file name Self-explanatory.  

Cannot use dump_modify nfile without $\%$ in dump file name Self-explanatory.  

Cannot use dynamic group with fix adapt atom This is not yet supported.  

Cannot use fix TMD unless atom map exists  

Using this fix requires the ability to lookup an atom index, which is provided by an atom map. An atom map does not exist (by default) for non-molecular problems. Using the atom_modify map command will force an atom map to be created.  

Cannot use fix bond/break with non-molecular systems Only systems with bonds that can be changed can be used. Atom_style template does not qualify.  

Only systems with bonds that can be changed can be used. Atom_style template does not qualify.  

Cannot use fix bond/swap with non-molecular systems nly systems with bonds that can be changed can be used. Atom_style template does not qua  

Cannot use fix box/relax on a 2nd non-periodic dimension  

When specifying an off-diagonal pressure component, the second of the two dimensions must be periodic. E.g.   
if the xy component is specified, then the y dimension must be periodic.  

Cannot use fix box/relax on a non-periodic dimension When specifying a diagonal pressure component, the dimension must be periodic.  

Cannot use fix box/relax with both relaxation and scaling on a tilt factor When specifying scaling on a tilt factor component, that component can not also be controlled by the barostat. E.g. if scalexy yes is specified and also keyword tri or xy, this is wrong.  

Cannot use fix box/relax with tilt factor scaling on a 2nd non-periodic dimension When specifying scaling on a tilt factor component, the second of the two dimensions must be periodic. E.g. if the xy component is specified, then the y dimension must be periodic.  

Cannot use fix deform on a shrink-wrapped boundary The x, y, z options cannot be applied to shrink-wrapped dimensions.  

Cannot use fix deform tilt on a shrink-wrapped 2nd dim This is because the shrink-wrapping will change the value of the strain implied by the tilt factor.  

Cannot use fix deform trate on a box with zero tilt The trate style alters the current strain.  

Cannot use fix deposit rigid and not molecule Self-explanatory.  

Cannot use fix deposit rigid and shake These two attributes are conflicting.  

Cannot use fix deposit shake and not molecule Self-explanatory.  

Cannot use fix enforce2d with 3d simulation Self-explanatory.  

Cannot use fix gcmc in a 2d simulation Fix gcmc is set up to run in 3d only. No 2d simulations with fix gcmc are allowed.  

Cannot use fix gcmc shake and not molecule Self-explanatory.  

Cannot use fix msst without per-type mass defined Self-explanatory.  

Cannot use fix npt and fix deform on same component of stress tensor This would be changing the same box dimension twice.  

annot use fix nvt/npt/nph on a 2nd non-periodic dimension  

When specifying an off-diagonal pressure component, the second of the two dimensions must be periodic. E.g.   
if the xy component is specified, then the y dimension must be periodic.  

Cannot use fix nvt/npt/nph on a non-periodic dimension When specifying a diagonal pressure component, the dimension must be periodic.  

Cannot use fix nvt/npt/nph with both xy dynamics and xy scaling Self-explanatory.  

Cannot use fix nvt/npt/nph with both xz dynamics and xz scaling Self-explanatory.  

Cannot use fix nvt/npt/nph with both yz dynamics and yz scaling Self-explanatory.  

Cannot use fix nvt/npt/nph with xy scaling when y is non-periodic dimension The second dimension in the barostatted tilt factor must be periodic.  

Cannot use fix nvt/npt/nph with xz scaling when z is non-periodic dimension The second dimension in the barostatted tilt factor must be periodic.  

Cannot use fix nvt/npt/nph with yz scaling when z is non-periodic dimension The second dimension in the barostatted tilt factor must be periodic.  

Cannot use fix pour rigid and not molecule Self-explanatory.  

Cannot use fix pour rigid and shake These two attributes are conflicting.  

Cannot use fix pour shake and not molecule Self-explanatory.  

Cannot use fix pour with triclinic box This option is not yet supported.  

Cannot use fix press/berendsen and fix deform on same component of stress tensor These commands both change the box size/shape, so you cannot use both together.  

Cannot use fix press/berendsen on a non-periodic dimension Self-explanatory.  

Cannot use fix press/berendsen with triclinic box Self-explanatory.  

Cannot use fix reax/bonds without pair_style reax Self-explanatory.  

Cannot use fix rigid npt/nph and fix deform on same component of stress tensor This would be changing the same box dimension twice.  

Cannot use fix rigid npt/nph on a non-periodic dimension When specifying a diagonal pressure component, the dimension must be periodic.  

Cannot use fix rigid/small npt/nph on a non-periodic dimension When specifying a diagonal pressure component, the dimension must be periodic.  

Cannot use fix shake with non-molecular system Your choice of atom style does not have bonds.  

Cannot use fix ttm with 2d simulation This is a current restriction of this fix due to the grid it creates.  

Cannot use fix ttm with triclinic box This is a current restriction of this fix due to the grid it creates.  

Cannot use fix tune/kspace without a kspace style Self-explanatory.  

Cannot use fix tune/kspace without a pair style This fix (tune/kspace) can only be used when a pair style has been specified.  

Cannot use fix wall in periodic dimension Self-explanatory.  

Cannot use fix wall zlo/zhi for a 2d simulation Self-explanatory.  

Cannot use fix wall/reflect in periodic dimension Self-explanatory.  

Cannot use fix wall/reflect zlo/zhi for a 2d simulation Self-explanatory.  

Cannot use fix wall/srd in periodic dimension Self-explanatory.  

Cannot use fix wall/srd more than once Nor is their a need to since multiple walls can be specified in one command.  

Cannot use fix wall/srd without fix srd Self-explanatory.  

Cannot use fix wall/srd zlo/zhi for a 2d simulation Self-explanatory.  

Cannot use fix_deposit unless atoms have IDs Self-explanatory.  

Cannot use fix_pour unless atoms have IDs Self-explanatory.  

Cannot use include command within an if command Self-explanatory.  

Cannot use lines with fix srd unless overlap is set This is because line segments are connected to each other.  

Cannot use multiple fix wall commands with pair brownian Self-explanatory.  

Cannot use multiple fix wall commands with pair lubricate Self-explanatory.  

Cannot use multiple fix wall commands with pair lubricate/poly Self-explanatory.  

Cannot use multiple fix wall commands with pair lubricateU Self-explanatory.  

Cannot use neigh_modify exclude with GPU neighbor builds This is a current limitation of the GPU implementation in LAMMPS.  

Too many neighbor bins will be created. This typically happens when the simulation box is very small in some  

Cannot use neighbor bins - box size << cutoff dimension, compared to the neighbor cutoff. Use the “nsq” style instead of “bin” style.   
Cannot use newton pair with beck/gpu pair style Self-explanatory.   
Cannot use newton pair with born/coul/long/gpu pair style Self-explanatory.   
Cannot use newton pair with born/coul/wolf/gpu pair style Self-explanatory.   
Cannot use newton pair with born/gpu pair style Self-explanatory.   
Cannot use newton pair with buck/coul/cut/gpu pair style Self-explanatory.   
Cannot use newton pair with buck/coul/long/gpu pair style Self-explanatory.   
Cannot use newton pair with buck/gpu pair style Self-explanatory.   
Cannot use newton pair with colloid/gpu pair style Self-explanatory.   
Cannot use newton pair with coul/cut/gpu pair style Self-explanatory.   
Cannot use newton pair with coul/debye/gpu pair style Self-explanatory.   
Cannot use newton pair with coul/dsf/gpu pair style Self-explanatory.   
Cannot use newton pair with coul/long/gpu pair style Self-explanatory.   
Cannot use newton pair with dipole/cut/gpu pair style Self-explanatory.   
Cannot use newton pair with dipole/sf/gpu pair style Self-explanatory.   
LAMMPS Documentation, Release 4Feb2025   
Cannot use newton pair with dpd/gpu pair style Self-explanatory.   
Cannot use newton pair with dpd/tstat/gpu pair style Self-explanatory.   
Cannot use newton pair with eam/alloy/gpu pair style Self-explanatory.   
Cannot use newton pair with eam/fs/gpu pair style Self-explanatory.   
Cannot use newton pair with eam/gpu pair style Self-explanatory.   
Cannot use newton pair with gauss/gpu pair style Self-explanatory.   
Cannot use newton pair with gayberne/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/charmm/coul/long/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/class2/coul/long/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/class2/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/cubic/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/cut/coul/cut/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/cut/coul/debye/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/cut/coul/dsf/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/cut/coul/long/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/cut/coul/msm/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/cut/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/expand/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/gromacs/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/spica/coul/long/gpu pair style Self-explanatory.   
Cannot use newton pair with lj/spica/gpu pair style Self-explanatory.  

Cannot use newton pair with lj96/cut/gpu pair style Self-explanatory.  

Cannot use newton pair with mie/cut/gpu pair style Self-explanatory.  

Cannot use newton pair with morse/gpu pair style Self-explanatory.  

Cannot use newton pair with resquared/gpu pair style Self-explanatory.  

Cannot use newton pair with soft/gpu pair style Self-explanatory.  

Cannot use newton pair with table/gpu pair style Self-explanatory.  

Cannot use newton pair with yukawa/colloid/gpu pair style Self-explanatory.  

Cannot use newton pair with yukawa/gpu pair style Self-explanatory.  

Cannot use newton pair with zbl/gpu pair style Self-explanatory.  

Cannot use non-zero forces in an energy minimization Fix setforce cannot be used in this manner. Use fix addforce instead.  

Cannot use non-periodic boundares with fix ttm This fix requires a fully periodic simulation box.  

# Cannot use non-periodic boundaries with Ewald  

For kspace style ewald, all 3 dimensions must have periodic boundaries unless you use the kspace_modify command to define a 2d slab with a non-periodic z dimension.  

# Cannot use non-periodic boundaries with EwaldDisp  

For kspace style ewald/disp, all 3 dimensions must have periodic boundaries unless you use the kspace_modify command to define a 2d slab with a non-periodic z dimension.  

# Cannot use non-periodic boundaries with PPPM  

For kspace style pppm, all 3 dimensions must have periodic boundaries unless you use the kspace_modify command to define a 2d slab with a non-periodic z dimension.  

# Cannot use non-periodic boundaries with PPPMDisp  

For kspace style pppm/disp, all 3 dimensions must have periodic boundaries unless you use the kspace_modify command to define a 2d slab with a non-periodic z dimension.  

Cannot use order greater than 8 with pppm/gpu. Self-explanatory.  

Cannot use package gpu neigh yes with triclinic box This is a current restriction in LAMMPS.  

Cannot use pair tail corrections with 2d simulations The correction factors are only currently defined for 3d systems.  

Cannot use processors part command without using partitions See the command-line -partition switch.  

Cannot use ramp in variable formula between runs This is because the ramp() function is time dependent.  

Cannot use read_data add before simulation box is defined Self-explanatory.  

Cannot use read_data extra with add flag Self-explanatory.  

Cannot use read_data offset without add flag Self-explanatory.  

Cannot use read_data shift without add flag Self-explanatory.  

Cannot use region INF or EDGE when box does not exist Regions that extend to the box boundaries can only be used after the create_box command has been used.  

Cannot use set atom with no atom IDs defined Atom IDs are not defined, so they cannot be used to identify an atom.  

Cannot use set mol with no molecule IDs defined Self-explanatory.  

Cannot use swiggle in variable formula between runs This is a function of elapsed time.  

Cannot use tris with fix srd unless overlap is set This is because triangles are connected to each other.  

Cannot use variable energy with constant efield in fix efield LAMMPS computes the energy itself when the E-field is constant.  

Cannot use variable energy with constant force in fix addforce This is because for constant force, LAMMPS can compute the change in energy directly.  

Cannot use variable every setting for dump dcd The format of DCD dump files requires snapshots be output at a constant frequency.  

Cannot use variable every setting for dump xtc The format of this file requires snapshots at regular intervals.  

Cannot use vdisplace in variable formula between runs This is a function of elapsed time.  

Cannot use velocity bias command without temp keyword Self-explanatory.  

Cannot use velocity create loop all unless atoms have IDs Atoms in the simulation to do not have IDs, so this style of velocity creation cannot be performed.  

Cannot use wall in periodic dimension Self-explanatory.  

Cannot use write_restart fileper without $\%$ in restart file name Self-explanatory.  

Cannot use write_restart nfile without $\%$ in restart file name Self-explanatory.  

Cannot wiggle and shear fix wall/gran Cannot specify both options at the same time.  

Cannot write to restart file - MPI error: %s This error was generated by MPI when reading/writing an MPI-IO restart file.  

Cannot yet use KSpace solver with grid with comm style tiled This is current restriction in LAMMPS.  

Cannot yet use comm_style tiled with multi-mode comm Self-explanatory.  

Cannot yet use comm_style tiled with triclinic box Self-explanatory.  

Cannot yet use compute tally with Kokkos This feature is not yet supported.  

Cannot yet use fix bond/break with this improper style This is a current restriction in LAMMPS.  

Cannot yet use fix bond/create with this improper style This is a current restriction in LAMMPS.  

Cannot yet use minimize with Kokkos This feature is not yet supported.  

Cannot yet use pair hybrid with Kokkos This feature is not yet supported.  

Cannot zero Langevin force of 0 atoms The group has zero atoms, so you cannot request its force be zeroed.  

Cannot zero gld force for zero atoms There are no atoms currently in the group.  

Cannot zero momentum of no atoms Self-explanatory.  

Change_box command before simulation box is defined Self-explanatory.  

Change_box volume used incorrectly The “dim volume” option must be used immediately following one or two settings for “dim1 . . . ” (and optionally “dim2 . . . ”) and must be for a different dimension, i.e. dim $:=\dim1$ and dim $:=\dim2$ .  

Chunk/atom compute does not exist for compute angmom/chunk Self-explanatory.  

Chunk/atom compute does not exist for compute com/chunk Self-explanatory.  

Chunk/atom compute does not exist for compute gyration/chunk Self-explanatory.  

Chunk/atom compute does not exist for compute inertia/chunk Self-explanatory.  

Chunk/atom compute does not exist for compute msd/chunk Self-explanatory.  

Chunk/atom compute does not exist for compute omega/chunk Self-explanatory.  

Chunk/atom compute does not exist for compute property/chunk Self-explanatory.  

Chunk/atom compute does not exist for compute temp/chunk Self-explanatory.  

Chunk/atom compute does not exist for compute torque/chunk Self-explanatory.  

Chunk/atom compute does not exist for compute vcm/chunk Self-explanatory.  

Chunk/atom compute does not exist for fix ave/chunk Self-explanatory.  

Comm tiled invalid index in box drop brick Internal error check in comm_style tiled which should not occur. Contact the developers.  

Comm tiled mis-match in box drop brick Internal error check in comm_style tiled which should not occur. Contact the developers.  

Comm_modify group $\mathrel{\mathop:}=$ atom_modify first group Self-explanatory.  

Communication cutoff for comm_style tiled cannot exceed periodic box length Self-explanatory.  

Communication cutoff too small for SNAP micro load balancing  

This can happen if you change the neighbor skin after your pair_style command or if your box dimensions grow during a run. You can set the cutoff explicitly via the comm_modify cutoff command.  

Compute %s does not allow use of dynamic group Dynamic groups have not yet been enabled for this compute.  

Compute for fix pafi does not calculate a local array Self-explanatory.  

Compute for fix pafi must have 9 fields per atom Self-explanatory.  

Compute ID for compute chunk /atom does not exist Self-explanatory.  

Compute ID for compute chunk/atom does not exist Self-explanatory.  

Compute gyration ID does not exist for compute gyration/shape Self-explanatory. Provide a valid compute ID.  

Compute gyration/shape compute ID does not point to a gyration compute Self-explanatory. Provide and ID of a compute gyration command.  

Compute ID for compute reduce does not exist Self-explanatory.  

Compute ID for compute slice does not exist Self-explanatory.  

Compute ID for fix ave/atom does not exist Self-explanatory.  

Compute ID for fix ave/chunk does not exist Self-explanatory.  

Compute ID for fix ave/correlate does not exist Self-explanatory.  

Compute ID for fix ave/histo does not exist Self-explanatory.  

Compute ID for fix ave/time does not exist Self-explanatory.  

Compute ID for fix numdiff does not exist Self-explanatory.  

Compute ID for fix numdiff/virial does not exist Self-explanatory.  

Compute ID for fix store/state does not exist Self-explanatory.  

Compute ID for fix vector does not exist Self-explanatory.  

Compute ID must be alphanumeric or underscore characters Self-explanatory.  

Compute angle/local used when angles are not allowed The atom style does not support angles.  

Compute angmom/chunk does not use chunk/atom compute The style of the specified compute is not chunk/atom.  

Compute body/local requires atom style body Self-explanatory.  

Compute bond/local used when bonds are not allowed The atom style does not support bonds.  

Compute centro/atom requires a pair style be defined This is because the computation of the centro-symmetry values uses a pairwise neighbor list.  

Compute chunk/atom bin/cylinder radius is too large for periodic box Radius cannot be bigger than 1/2 of a non-axis periodic dimension.  

Compute chunk/atom bin/sphere radius is too large for periodic box Radius cannot be bigger than 1/2 of any periodic dimension.  

Compute chunk/atom compute array is accessed out-of-range The index for the array is out of bounds.  

Compute chunk/atom compute does not calculate a per-atom array Self-explanatory.  

Compute chunk/atom compute does not calculate a per-atom vector Self-explanatory.  

Compute chunk/atom compute does not calculate per-atom values Self-explanatory.  

Compute chunk/atom cylinder axis must be z for 2d Self-explanatory.  

Compute chunk/atom fix array is accessed out-of-range The index for the array is out of bounds.  

Compute chunk/atom fix does not calculate a per-atom array Self-explanatory.  

Compute chunk/atom fix does not calculate a per-atom vector Self-explanatory.  

Compute chunk/atom fix does not calculate per-atom values Self-explanatory.  

Compute chunk/atom for triclinic boxes requires units reduced Self-explanatory.  

Compute chunk/atom ids once but nchunk is not once You cannot assign chunks IDs to atom permanently if the number of chunks may change.  

Compute chunk/atom molecule for non-molecular system Self-explanatory.  

Compute chunk/atom sphere z origin must be 0.0 for 2d Self-explanatory.  

Compute chunk/atom stores no IDs for compute property/chunk It will only store IDs if its compress option is enabled.  

Compute chunk/atom stores no coord1 for compute property/chunk Only certain binning options for compute chunk/atom store coordinates.  

Compute chunk/atom stores no coord2 for compute property/chunk Only certain binning options for compute chunk/atom store coordinates.  

Compute chunk/atom stores no coord3 for compute property/chunk Only certain binning options for compute chunk/atom store coordinates.  

Compute chunk/atom variable is not atom-style variable Self-explanatory.  

Compute chunk/atom without bins cannot use discard mixed That discard option only applies to the binning styles.  

Compute cluster/atom cutoff is longer than pairwise cutoff Cannot identify clusters beyond cutoff.  

Compute cluster/atom requires a pair style be defined This is so that the pair style defines a cutoff distance which is used to find clusters.  

Compute cna/atom cutoff is longer than pairwise cutoff Self-explanatory.  

Compute cna/atom requires a pair style be defined Self-explanatory.  

Compute com/chunk does not use chunk/atom compute The style of the specified compute is not chunk/atom.  

Compute contact/atom requires a pair style be defined Self-explanatory.  

Compute contact/atom requires atom style sphere Self-explanatory.  

Compute coord/atom cutoff is longer than pairwise cutoff Cannot compute coordination at distances longer than the pair cutoff, since those atoms are not in the neighbor list.  

Compute coord/atom requires a pair style be defined Self-explanatory.  

Compute damage/atom requires peridynamic potentia  

Damage is a Peridynamic-specific metric. It requires you to be running a Peridynamics simulation.  

Compute dihedral/local used when dihedrals are not allowed The atom style does not support dihedrals.   
Compute dilatation/atom cannot be used with this pair style Self-explanatory.   
Compute dilatation/atom requires Peridynamic pair style Self-explanatory.   
Compute does not allow an extra compute or fix to be reset This is an internal LAMMPS error. Please report it to the developers.   
Compute erotate/asphere requires atom style ellipsoid or line or tri Self-explanatory.   
Compute erotate/asphere requires extended particles This compute cannot be used with point particles.   
Compute erotate/rigid with non-rigid fix-ID Self-explanatory.   
Compute erotate/sphere requires atom style sphere Self-explanatory.   
Compute erotate/sphere/atom requires atom style sphere Self-explanatory.   
Compute event/displace has invalid fix event assigned This is an internal LAMMPS error. Please report it to the developers.   
Compute group/group group ID does not exist Self-explanatory.   
Compute gyration/chunk does not use chunk/atom compute The style of the specified compute is not chunk/atom.   
Compute heat/flux compute ID does not compute ke/atom Self-explanatory.   
Compute heat/flux compute ID does not compute pe/atom Self-explanatory.   
Compute heat/flux compute ID does not compute stress/atom Self-explanatory.   
Compute hexorder/atom cutoff is longer than pairwise cutoff Cannot compute order parameter beyond cutoff.   
Compute hexorder/atom requires a pair style be defined Self-explanatory.   
Compute improper/local used when impropers are not allowed The atom style does not support impropers.   
Compute inertia/chunk does not use chunk/atom compute The style of the specified compute is not chunk/atom.   
Compute ke/rigid with non-rigid fix-ID Self-explanatory.   
Compute msd/chunk does not use chunk/atom compute The style of the specified compute is not chunk/atom.  

# Compute msd/chunk nchunk is not static  

This is required because the MSD cannot be computed consistently if the number of chunks is changing. Compute chunk/atom allows setting nchunk to be static.  

Compute nve/asphere requires atom style ellipsoid Self-explanatory.  

Compute nvt/nph/npt asphere requires atom style ellipsoid Self-explanatory.  

Compute nvt/nph/npt body requires atom style body Self-explanatory.  

Compute omega/chunk does not use chunk/atom compute The style of the specified compute is not chunk/atom.  

Compute orientorder/atom cutoff is longer than pairwise cutof Cannot compute order parameter beyond cutoff.  

Compute orientorder/atom requires a pair style be defined Self-explanatory.  

Compute pair must use group all Pair styles accumulate energy on all atoms.  

Compute pe must use group all Energies computed by potentials (pair, bond, etc) are computed on all atoms.  

Compute plasticity/atom cannot be used with this pair style Self-explanatory.  

Compute plasticity/atom requires Peridynamic pair style Self-explanatory.  

Compute pressure must use group all Virial contributions computed by potentials (pair, bond, etc) are computed on all atoms.  

Compute pressure requires temperature ID to include kinetic energy The keflag cannot be used unless a temperature compute is provided.  

Compute pressure temperature ID does not compute temperature The compute ID assigned to a pressure computation must compute temperature.  

Compute property/atom floating point vector does not exist The command is accessing a vector added by the fix property/atom command, that does not exist.  

Compute property/atom for atom property that is not allocated Self-explanatory.  

Compute property/atom integer vector does not exist The command is accessing a vector added by the fix property/atom command, that does not exist.  

Compute property/chunk does not use chunk/atom compute The style of the specified compute is not chunk/atom.  

Compute property/local cannot use these inputs together Only inputs that generate the same number of datums can be used together. E.g. bond and angle quantities cannot be mixed.  

Compute property/local does not (yet) work with atom_style template Self-explanatory.  

Compute property/local for property that is not allocated Self-explanatory.  

Compute rdf requires a pair style be defined Self-explanatory.   
Compute reduce compute array is accessed out-of-range An index for the array is out of bounds.   
Compute reduce compute calculates global values A compute that calculates peratom or local values is required.   
Compute reduce compute does not calculate a local array Self-explanatory.   
Compute reduce compute does not calculate a local vector Self-explanatory.   
Compute reduce compute does not calculate a per-atom arr Self-explanatory.   
Compute reduce compute does not calculate a per-atom ve Self-explanatory.   
Compute reduce fix array is accessed out-of-range An index for the array is out of bounds.   
Compute reduce fix calculates global values A fix that calculates peratom or local values is require   
Compute reduce fix does not calculate a local array Self-explanatory.   
Compute reduce fix does not calculate a local vector Self-explanatory.   
Compute reduce fix does not calculate a per-atom array Self-explanatory.   
Compute reduce fix does not calculate a per-atom vector Self-explanatory.   
Compute reduce replace requires min or max mode Self-explanatory.   
Compute reduce variable is not atom-style variable Self-explanatory.   
Compute slice compute array is accessed out-of-range An index for the array is out of bounds.   
Compute slice compute does not calculate a global array Self-explanatory.   
Compute slice compute does not calculate a global vector Self-explanatory.   
Compute slice compute does not calculate global vector or array Self-explanatory.   
Compute slice compute vector is accessed out-of-range The index for the vector is out of bounds.   
Compute slice fix array is accessed out-of-range An index for the array is out of bounds.   
Compute slice fix does not calculate a global array Self-explanatory.   
Compute slice fix does not calculate a global vector Self-explanatory.   
Compute slice fix does not calculate global vector or array Self-explanatory.   
Compute slice fix vector is accessed out-of-range The index for the vector is out of bounds.   
Compute sna/atom cutoff is longer than pairwise cutoff Self-explanatory.   
Compute sna/atom requires a pair style be defined Self-explanatory.   
Compute snad/atom cutoff is longer than pairwise cutoff Self-explanatory.   
Compute snad/atom requires a pair style be defined Self-explanatory.   
Compute snav/atom cutoff is longer than pairwise cutoff Self-explanatory.   
Compute snav/atom requires a pair style be defined Self-explanatory.   
Compute stress/atom temperature ID does not compute temperature The specified compute must compute temperature.   
Compute temp/asphere requires atom style ellipsoid Self-explanatory.   
Compute temp/asphere requires extended particles This compute cannot be used with point particles.   
Compute temp/body requires atom style body Self-explanatory.   
Compute temp/body requires bodies This compute can only be applied to body particles.   
Compute temp/chunk does not use chunk/atom compute The style of the specified compute is not chunk/atom.   
Compute temp/cs requires ghost atoms store velocity Use the comm_modify vel yes command to enable this.   
Compute temp/cs used when bonds are not allowed This compute only works on pairs of bonded particles.   
Compute temp/partial cannot use vz for 2d systemx Self-explanatory.   
Compute temp/profile cannot bin z for 2d systems Self-explanatory.   
Compute temp/profile cannot use vz for 2d systemx Self-explanatory.  

Compute temp/sphere requires atom style sphere Self-explanatory.  

Compute ti kspace style does not exist Self-explanatory.  

Compute ti pair style does not exist Self-explanatory.  

Compute ti tail when pair style does not compute tail corrections Self-explanatory.  

Compute torque/chunk does not use chunk/atom compute The style of the specified compute is not chunk/atom.  

# Compute used in dump between runs is not current  

The compute was not invoked on the current timestep, therefore it cannot be used in a dump between runs.  

# Compute used in variable between runs is not current  

Computes cannot be invoked by a variable in between runs. Thus they must have been evaluated on the last timestep of the previous run in order for their value(s) to be accessed. See the page for the variable command for more info.  

# Compute used in variable thermo keyword between runs is not current  

Some thermo keywords rely on a compute to calculate their value(s). Computes cannot be invoked by a variable in between runs. Thus they must have been evaluated on the last timestep of the previous run in order for their value(s) to be accessed. See the page for the variable command for more info.  

Compute vcm/chunk does not use chunk/atom compute The style of the specified compute is not chunk/atom.  

Computed temperature for fix temp/berendsen cannot be 0.0 Self-explanatory.  

Computed temperature for fix temp/rescale cannot be 0.0 Cannot rescale the temperature to a new value if the current temperature is 0.0.  

Core/shell partner atom not found Could not find one of the atoms in the bond pair.  

Core/shell partners were not all found Could not find or more atoms in the bond pairs.  

Could not adjust g_ewald_6  

The Newton-Raphson solver failed to converge to a good value for g_ewald. This error should not occur for typical problems. Please send an email to the developers.  

Could not compute g_ewald  

The Newton-Raphson solver failed to converge to a good value for g_ewald. This error should not occur for typical problems. Please send an email to the developers.  

# Could not compute grid size  

The code is unable to compute a grid size consistent with the desired accuracy. This error should not occur for typical problems. Please send an email to the developers.  

# Could not compute grid size for Coulomb interaction  

The code is unable to compute a grid size consistent with the desired accuracy. This error should not occur for typical problems. Please send an email to the developers.  

# Could not compute grid size for Dispersion  

The code is unable to compute a grid size consistent with the desired accuracy. This error should not occur for typical problems. Please send an email to the developers.  

# Could not create 3d FFT plan  

The FFT setup for the PPPM solver failed, typically due to lack of memory. This is an unusual error. Check the size of the FFT grid you are requesting.  

# Could not create 3d grid of processors  

The specified constraints did not allow a $\mathrm{Px}$ by Py by $\mathrm{Pz}$ grid to be created where $\mathrm{Px}*\mathrm{Py}*\mathrm{Pz}=\mathrm{P}=$ total number of processors.  

Could not create 3d remap plan The FFT setup in pppm failed.  

# Could not create Python function arguments  

This is an internal Python error, possibly because the number of inputs to the function is too large.  

Could not create numa grid of processors The specified constraints did not allow this style of grid to be created. Usually this is because the total processo count is not a multiple of the cores/node or the user specified processor count is $>1$ in one of the dimensions.  

Could not create twolevel 3d grid of processors The specified constraints did not allow this style of grid to be created.  

Could not evaluate Python function input variable Self-explanatory.  

Could not find Python function The provided Python code was run successfully, but it not define a callable function with the required name.  

Could not find atom_modify first group ID Self-explanatory.  

Could not find change_box group ID Group ID used in the change_box command does not exist.  

Could not find compute ID for PRD Self-explanatory.  

Could not find compute ID for TAD Self-explanatory.  

Could not find compute ID for temperature bias Self-explanatory.  

Could not find compute ID to delete Self-explanatory.  

Could not find compute displace/atom fix ID Self-explanatory.  

Could not find compute event/displace fix ID Self-explanatory.  

Could not find compute group ID Self-explanatory.  

Could not find compute heat/flux compute ID Self-explanatory.  

Could not find compute msd fix ID Self-explanatory.  

Could not find compute msd/chunk fix ID The compute creates an internal fix, which has been deleted.  

Could not find compute pressure temperature ID The compute ID for calculating temperature does not exist.  

Could not find compute stress/atom temperature ID Self-explanatory.  

Could not find compute vacf fix ID Self-explanatory.  

Could not find compute/voronoi surface group ID Self-explanatory.  

Could not find compute_modify ID Self-explanatory.  

Could not find custom per-atom property ID Self-explanatory.  

Could not find delete_atoms group ID Group ID used in the delete_atoms command does not exist.  

Could not find delete_atoms region ID Region ID used in the delete_atoms command does not exist.  

Could not find displace_atoms group ID Group ID used in the displace_atoms command does not exist.  

Could not find dump custom compute ID Self-explanatory.  

Could not find dump custom fix ID Self-explanatory.  

Could not find dump custom variable name Self-explanatory.  

Could not find dump group ID A group ID used in the dump command does not exist.  

Could not find dump local compute ID Self-explanatory.  

Could not find dump local fix ID Self-explanatory.  

Could not find dump modify compute ID Self-explanatory.  

Could not find dump modify custom atom floating point property ID Self-explanatory.  

Could not find dump modify custom atom integer property ID Self-explanatory.  

Could not find dump modify fix ID Self-explanatory.  

Could not find dump modify variable name Self-explanatory.  

Could not find fix ID to delete Self-explanatory.  