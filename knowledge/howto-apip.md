---
title: "Adaptive-precision interatomic potentials (APIP)"
category: "howto"
tags: ["howto", "apip", "energy", "force", "EAM", "machine-learning"]
---
# Adaptive-precision interatomic potentials (APIP)

The [PKG-APIP](#PKG-APIP) enables use of adaptive-precision potentials
as described in [(Immel2025)](#Immel2025_1) and
[(Immel2026)](#Immel2026_2).
In the context of this package, precision refers to the accuracy of an interatomic
potential.

Modern machine-learning (ML) potentials translate the accuracy of DFT
simulations into MD simulations, i.e., ML potentials are more accurate
compared to traditional empirical potentials.
However, this accuracy comes at a cost: there is a considerable performance
gap between the evaluation of classical and ML potentials, e.g., the force
calculation of a classical EAM potential is 100-1000 times faster compared
to the ML-based ACE method.
The evaluation time difference results in a conflict between large time and
length scales on the one hand and accuracy on the other.
This conflict is resolved by an APIP model for simulations, in which the highest precision
is required only locally but not globally.

An APIP model uses a precise but
expensive ML potential only for a subset of atoms, while a fast
potential is used for the remaining atoms.
Whether the precise or the fast potential is used is determined
by a continuous switching parameter $\lambda_i$ that can be defined for each
atom $i$.
The switching parameter can be adjusted dynamically during a simulation or
kept constant as explained below.

The potential energy $E_i$ of an atom $i$ described by an
adaptive-precision
interatomic potential is given by [(Immel2025)](#Immel2025_1)


$$
E_i = \lambda_i E_i^\text{(fast)} + (1-\lambda_i) E_i^\text{(precise)},
$$

where $E_i^\text{(fast)}$ is the potential energy of atom $i$
according to a fast interatomic potential,
$E_i^\text{(precise)}$ is the potential energy according to a precise
interatomic potential and $\lambda_i\in[0,1]$ is the
switching parameter that decides how the potential energies are weighted.

Adaptive-precision saves computation time when the computation of the
precise potential is not required for many atoms, i.e., when
$\lambda_i=1$ applies for many atoms.

The currently implemented potentials are:


| Fast potential | Precise potential |
| --- | --- |
| [ACE](pair_pace_apip) | [ACE](pair_pace_apip) |
| [EAM](pair_eam_apip) - |  |

In theory, any short-range potential can be used for an adaptive-precision
interatomic potential. How to implement a new (fast or precise)
adaptive-precision
potential is explained in [here](#implementing_new_apip_styles).

The switching parameter $\lambda_i$ that combines the two potentials
can be dynamically calculated during a
simulation.
There are two ways to calculate dynamic switching parameters.

1. according to [(Immel2026)](#Immel2026_2) with a differentiable
switching parameter that results in a conservative potential.
Energy and momentum are (in the absence of external forces) conserved
by design.

2. according to [(Immel2025)](#Immel2025_1) with a non-differentiable
switching parameter. In this case, the implementation can be optimized for
performance by using the switching parameters of the previous timestep.
Thereby, one can perform most of the switching-parameter calculation within
the force-calculation routine and include this calculations in the load-
balancing. The potential is not conservative and energy- and
momentum-conservation are achieved through a local correction.

Alternatively, one can set a constant switching parameter before the start
of a simulation.
Using constant switching parameters results in a conservative potential.

To run a simulation with an adaptive-precision potential, one needs the
following components:

----------

## Example

> **Note**
> How to select the values of the parameters of an adaptive-precision
> interatomic potential is discussed in detail in [(Immel2025)](#Immel2025_1)
> and [(Immel2026)](#Immel2026_2).

----------


## Implementing new APIP pair styles

One can introduce adaptive-precision to an existing pair style by modifying
the original pair style.
One should calculate the force
$F_i = - \nabla_i \sum_j E_j^\text{original}$ for a fast potential or
$F_i = - (1-\nabla_i) \sum_j E_j^\text{original}$ for a precise
potential from the original potential
energy $E_j^\text{original}$ to see where the switching parameter
$\lambda_i$ needs to be introduced in the force calculation.
The switching parameter $\lambda_i$ is known for all atoms $i$
in force calculation routine.
One needs to introduce an abortion criterion based on $\lambda_i$ to
ensure that all not required calculations are skipped and compute time can
be saved.
Furthermore, one needs to provide the number of calculations and measure the
computation time.
Communication within the force calculation needs to be prevented to allow
effective load-balancing.
With communication, the load balancer cannot balance few calculations of the
precise potential on one processor with many computations of the fast
potential on another processor.

All changes in the pair_style pace/apip compared to the pair_style pace
are annotated and commented.
Thus, the pair_style pace/apip can serve as an example for the implementation
of new adaptive-precision potentials.

----------


**(Immel2025)** Immel, Drautz and Sutmann, J Chem Phys, 162, 114119 (2025)


**(Immel2026)** Immel, Drautz and Sutmann, arXiv:2512.07693
