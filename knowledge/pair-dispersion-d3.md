---
title: "pair_style dispersion/d3 command"
category: "pair_style"
tags: ["pair_style", "dispersion/d3", "energy", "machine-learning"]
commands: ["pair_style dispersion/d3"]
---
# pair_style dispersion/d3 command

## Syntax

```lammps
pair_style dispersion/d3 damping functional cutoff cn_cutoff
```
* damping = damping function: *original*, *zerom*, *bj*, or *bjm*
* functional = XC functional form: *pbe*, *pbe0*, ... (see list below)
* cutoff = global cutoff (distance units)
* cn_cutoff = coordination number cutoff (distance units)

## Examples

```lammps
pair_style dispersion/d3 original pbe 30.0 20.0
pair_coeff * * C
```
## Description

*Added in version 4Feb2025*
Style *dispersion/d3* computes the dispersion energy-correction used in
the DFT-D3 method of Grimme [(Grimme1)](#Grimme1).  It would
typically be used with a machine learning (ML) potential that was
trained with results from plain DFT calculations without the dispersion
correction through pair_style hybrid/overlay. ML potentials are often
combined *a posteriori* with dispersion energy-correction schemes (see
*e.g.* [(Qamar)](#Qamar) and [(Batatia)](#Batatia)).

The energy contribution $E_i$ for an atom $i$ is given by:


$$
E_i = \frac{1}{2} \sum_{j \neq i} \big(
             s_6 \frac{C_{6,ij}}{r^6_{ij}} f_6^{damp}(r_{ij}) +
             s_8 \frac{C_{8,ij}}{r^8_{ij}} f_8^{damp}(r_{ij}) \big)
$$

where $C_n$ is the averaged, geometry-dependent nth-order
dispersion coefficient for atom pair $ij$, $r_{ij}$ their
inter-nuclear distance, $s_n$ are XC functional-dependent scaling
factor, and $f_n^{damp}$ are damping functions.


> **Note**
> It is currently *not* possible to calculate three-body dispersion
> contributions, according to, for example, the Axilrod-Teller-Muto
> model.

*Changed in version 2Apr2025*

Available damping functions are the original "zero-damping" (*original*)
[(Grimme1)](#Grimme1), Becke-Johnson damping (*bj*) [(Grimme2)](#Grimme2), and their revised forms (*zerom* and *bjm*, respectively)
[(Sherrill)](#Sherrill).

Available XC functional scaling factors are listed in the table below,
and depend on the selected damping function.

+------------------+--------------------------------------------------------------------------------+
| Damping function | XC functional                                                                  |
+==================+================================================================================+
| |                | | slater-dirac-exchange, b-lyp, b-p, b97-d, revpbe, pbe, pbesol, rpw86-pbe,    |
| |                | | rpbe, tpss, b3-lyp, pbe0, hse06, revpbe38, pw6b95, tpss0, b2-plyp, pwpb95,   |
| | original       | | b2gp-plyp, ptpss, hf, mpwlyp, bpbe, bh-lyp, tpssh, pwb6k, b1b95, bop, o-lyp, |
| |                | | o-pbe, ssb, revssb, otpss, b3pw91, revpbe0, pbe38, mpw1b95, mpwb1k, bmk,     |
| |                | | cam-b3lyp, lc-wpbe, m05, m052x, m06l, m06, m062x, m06hf, hcth120             |
+------------------+--------------------------------------------------------------------------------+
|   zerom          |   b2-plyp, b3-lyp, b97-d, b-lyp, b-p, pbe, pbe0, lc-wpbe                       |
+------------------+--------------------------------------------------------------------------------+
| |                | | b-p, b-lyp, revpbe, rpbe, b97-d, pbe, rpw86-pbe, b3-lyp, tpss, hf, tpss0,    |
| |                | | pbe0, hse06, revpbe38, pw6b95, b2-plyp, dsd-blyp, dsd-blyp-fc, bop, mpwlyp,  |
| | bj             | | o-lyp, pbesol, bpbe, opbe, ssb, revssb, otpss, b3pw91, bh-lyp, revpbe0,      |
| |                | | tpssh, mpw1b95, pwb6k, b1b95, bmk, cam-b3lyp, lc-wpbe, b2gp-plyp, ptpss,     |
| |                | | pwpb95, hf/mixed, hf/sv, hf/minis, b3lyp/6-31gd, hcth120, pw1pw, pwgga,      |
| |                | | hsesol, hf3c, hf3cv, pbeh3c, pbeh-3c, mn15                                   |
+------------------+--------------------------------------------------------------------------------+
| bjm              |  b2-plyp, b3-lyp, b97-d, b-lyp, b-p, pbe, pbe0, lc-wpbe                        |
+------------------+--------------------------------------------------------------------------------+


This style is primarily supposed to be used combined with a
machine-learned interatomic potential trained on a DFT dataset (the
selected XC functional should be chosen accordingly) via the
[pair_style hybrid](pair_hybrid) command.

## Coefficients

All the required coefficients are already stored internally (in the
`src/EXTRA-PAIR/d3_parameters.h` file).  The only information to
provide are the chemical symbols of the atoms.  The number of chemical
symbols given must be equal to the number of atom types used and must
match their ordering as atom types.


## Mixing, shift, table, tail correction, restart, rRESPA info

This pair style does not support mixing since all parameters are
explicit for each pair of atom types.

This pair style does not support the [pair_modify](pair_modify) shift, table,
and tail options.

This pair style does not write its information to [binary restart
files](restart).

This pair style can only be used via the *pair* keyword of the
[run_style respa](run_style) command.  It does not support the
*inner*, *middle*, *outer* keywords.

## Restrictions

Style *dispersion/d3* is part of the EXTRA-PAIR package. It is only
enabled if LAMMPS was built with that package.  See the [Build
package](Build_package) page for more info.

The compiled in parameters require the use of [metal units](units).

It is currently *not* possible to calculate three-body dispersion
contributions according to, for example, the Axilrod-Teller-Muto model.

## Related commands

[pair_coeff](pair_coeff)

## Default

none

----------


**(Grimme1)** S. Grimme, J. Antony, S. Ehrlich, and H. Krieg, J. Chem. Phys. 132, 154104 (2010).


**(Qamar)** M. Qamar, M. Mrovec, T. Lysogorskiy, A. Bochkarev, and R. Drautz, J. Chem. Theory Comput. 19, 5151 (2023).


**(Batatia)** I. Batatia, *et al.*, arXiv:2401.0096 (2023).


**(Grimme2)** S. Grimme, S. Ehrlich and L. Goerigk,  J. Comput. Chem. 32, 1456 (2011).


**(Sherrill)** D. G. A. Smith, L. A. Burns, K. Patkowski, and C. D. Sherrill, J. Phys. Chem. Lett., 7, 2197, (2016).
