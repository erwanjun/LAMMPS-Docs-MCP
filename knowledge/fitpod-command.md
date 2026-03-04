---
title: "fitpod command"
category: "command"
tags: ["fitpod"]
commands: ["fitpod"]
---
# fitpod command

## Syntax

```lammps
fitpod Ta_param.pod Ta_data.pod Ta_coefficients.pod
```
* fitpod = style name of this command
* Ta_param.pod = an input file that describes proper orthogonal descriptors (PODs)
* Ta_data.pod = an input file that specifies DFT data used to fit a POD potential
* Ta_coefficients.pod (optional) = an input file that specifies trainable coefficients of a POD potential

## Examples

```lammps
fitpod Ta_param.pod Ta_data.pod
fitpod Ta_param.pod Ta_data.pod Ta_coefficients.pod
```
## Description
*Added in version 22Dec2022*
Fit a machine-learning interatomic potential (ML-IAP) based on proper
orthogonal descriptors (POD); please see [(Nguyen and Rohskopf)](#Nguyen20222a), [(Nguyen2023)](#Nguyen20232a), [(Nguyen2024)](#Nguyen20242a), and [(Nguyen and Sema)](#Nguyen20243a) for details.
The fitted POD potential can be used to run MD simulations via
[pair_style pod](pair_pod).

Two input files are required for this command. The first input file
describes a POD potential parameter settings, while the second input
file specifies the DFT data used for the fitting procedure. All keywords
except *species* have default values. If a keyword is not set in the
input file, its default value is used. The table below has one-line
descriptions of all the keywords that can be used in the first input
file (i.e. `Ta_param.pod`)


| Keyword | Default | Type | Description |
| --- | --- | --- | --- |
| species | (none) | STRING | Chemical symbols for all elements in the system and have to match XYZ training files. |
| pbc | 1 1 1 | INT | three integer constants specify boundary conditions |
| rin | 0.5 | REAL | a real number specifies the inner cut-off radius |
| rcut | 5.0 | REAL | a real number specifies the outer cut-off radius |
| bessel_polynomial_degree | 4 | INT | the maximum degree of Bessel polynomials |
| inverse_polynomial_degree | 8 | INT | the maximum degree of inverse radial basis functions |
| number_of_environment_clusters | 1 | INT | the number of clusters for environment-adaptive potentials |
| number_of_principal_components | 2 | INT | the number of principal components for dimensionality reduction |
| onebody | 1 | BOOL | turns on/off one-body potential |
| twobody_number_radial_basis_functions | 8 | INT | number of radial basis functions for two-body potential |
| threebody_number_radial_basis_functions | 6 | INT | number of radial basis functions for three-body potential |
| threebody_angular_degree | 5 | INT | angular degree for three-body potential |
| fourbody_number_radial_basis_functions | 4 | INT | number of radial basis functions for four-body potential |
| fourbody_angular_degree | 3 | INT | angular degree for four-body potential |
| fivebody_number_radial_basis_functions | 0 | INT | number of radial basis functions for five-body potential |
| fivebody_angular_degree | 0 | INT | angular degree for five-body potential |
| sixbody_number_radial_basis_functions | 0 | INT | number of radial basis functions for six-body potential |
| sixbody_angular_degree | 0 | INT | angular degree for six-body potential |
| sevenbody_number_radial_basis_functions | 0 | INT | number of radial basis functions for seven-body potential |
| sevenbody_angular_degree | 0 | INT | angular degree for seven-body potential |

Note that both the number of radial basis functions and angular degree
must decrease as the body order increases. The next table describes all
keywords that can be used in the second input file (i.e. `Ta_data.pod`
in the example above):


| Keyword | Default | Type | Description |
| --- | --- | --- | --- |
| file_format | extxyz | STRING | only the extended xyz format (extxyz) is currently supported |
| file_extension | xyz | STRING | extension of the data files |
| path_to_training_data_set | (none) | STRING | specifies the path to training data files in double quotes |
| path_to_test_data_set | "" | STRING | specifies the path to test data files in double quotes |
| path_to_environment_configuration_set | "" | STRING | specifies the path to environment configuration files in double quotes |
| fraction_training_data_set | 1.0 | REAL | a real number (<= 1.0) specifies the fraction of the training set used to fit POD |
| randomize_training_data_set | 0 | BOOL | turns on/off randomization of the training set |
| fraction_test_data_set | 1.0 | REAL | a real number (<= 1.0) specifies the fraction of the test set used to validate POD |
| randomize_test_data_set | 0 | BOOL | turns on/off randomization of the test set |
| fitting_weight_energy | 100.0 | REAL | a real constant specifies the weight for energy in the least-squares fit |
| fitting_weight_force | 1.0 | REAL | a real constant specifies the weight for force in the least-squares fit |
| fitting_regularization_parameter | 1.0e-10 | REAL | a real constant specifies the regularization parameter in the least-squares fit |
| error_analysis_for_training_data_set | 0 | BOOL | turns on/off error analysis for the training data set |
| error_analysis_for_test_data_set | 0 | BOOL | turns on/off error analysis for the test data set |
| basename_for_output_files | pod | STRING | a basename string added to the output files |
| precision_for_pod_coefficients | 8 | INT | number of digits after the decimal points for numbers in the coefficient file |
| group_weights | global | STRING | `table` uses group weights defined for each group named by filename |

All keywords except *path_to_training_data_set* have default values. If
a keyword is not set in the input file, its default value is used.  After
successful training, a number of output files are produced, if enabled:

* `<basename>_training_errors.pod`  reports the errors in energy and forces for the training data set
* `<basename>_training_analysis.pod` reports detailed errors for all training configurations
* `<basename>_test_errors.pod` reports errors for the test data set
* `<basename>_test_analysis.pod` reports detailed errors for all test configurations
* `<basename>_coefficients.pod` contains the coefficients of the POD potential

After training the POD potential, `Ta_param.pod` and
`<basename>_coefficients.pod` are the two files needed to use the POD
potential in LAMMPS.  See [pair_style pod](pair_pod) for using the
POD potential. Examples about training and using POD potentials are
found in the directory lammps/examples/PACKAGES/pod and the Github repo
https://github.com/cesmix-mit/pod-examples.

### Loss Function Group Weights

The *group_weights* keyword in the `data.pod` file is responsible for
weighting certain groups of configurations in the loss function. For
example:

```lammps
group_weights table
Displaced_A15 100.0 1.0
Displaced_BCC 100.0 1.0
Displaced_FCC 100.0 1.0
Elastic_BCC   100.0 1.0
Elastic_FCC   100.0 1.0
GSF_110       100.0 1.0
GSF_112       100.0 1.0
Liquid        100.0 1.0
Surface       100.0 1.0
Volume_A15    100.0 1.0
Volume_BCC    100.0 1.0
Volume_FCC    100.0 1.0
```
This will apply an energy weight of `100.0` and a force weight of
`1.0` for all groups in the `Ta` example. The groups are named by
their respective filename. If certain groups are left out of this table,
then the globally defined weights from the `fitting_weight_energy` and
`fitting_weight_force` keywords will be used.

## POD Potential

We consider a multi-element system of *N* atoms with $N_\mathrm{e}$
unique elements.  We denote by $\boldsymbol r_n$ and $Z_n$
position vector and type of an atom *n* in the system,
respectively. Note that we have $Z_n \in \{1, \ldots, N_\mathrm{e}
\}$, $\boldsymbol R = (\boldsymbol r_1, \boldsymbol r_2, \ldots,
\boldsymbol r_N) \in \mathbb{R}^{3N}$, and $\boldsymbol Z = (Z_1,
Z_2, \ldots, Z_N) \in \mathbb{N}^{N}$. The total energy of the
POD potential is expressed as $E(\boldsymbol R, \boldsymbol Z) =
\sum_{i=1}^N E_i(\boldsymbol R_i, \boldsymbol Z_i)$, where


$$
E_i(\boldsymbol R_i, \boldsymbol Z_i) = \sum_{m=1}^M c_m \mathcal{D}_{im}(\boldsymbol R_i, \boldsymbol Z_i)
$$

Here $c_m$ are trainable coefficients and
$\mathcal{D}_{im}(\boldsymbol R_i, \boldsymbol Z_i)$ are per-atom
POD descriptors. Summing the per-atom descriptors over $i$ yields
the global descriptors $d_m(\boldsymbol R, \boldsymbol Z) =
\sum_{i=1}^N \mathcal{D}_{im}(\boldsymbol R_i, \boldsymbol Z_i)$.  It
thus follows that $E(\boldsymbol R, \boldsymbol Z) = \sum_{m=1}^M
c_m d_m(\boldsymbol R, \boldsymbol Z)$.

The per-atom POD descriptors include one, two, three, four, five, six,
and seven-body descriptors, which can be specified in the first input
file. Furthermore, the per-atom POD descriptors also depend on the
number of environment clusters specified in the first input file.
Please see [(Nguyen2024)](#Nguyen20242a) and [(Nguyen and Sema)](#Nguyen20243a) for the detailed description of the per-atom POD
descriptors.

## Training

A POD potential is trained using the least-squares regression against
density functional theory (DFT) data.  Let $J$ be the number of
training configurations, with $N_j$ being the number of atoms in
the j-th configuration. The training configurations are extracted from
the extended XYZ files located in a directory (i.e.,
path_to_training_data_set in the second input file).  Let
$\{E^{\star}_j\}_{j=1}^{J}$ and $\{\boldsymbol
F^{\star}_j\}_{j=1}^{J}$ be the DFT energies and forces for $J$
configurations. Next, we calculate the global descriptors and their
derivatives for all training configurations. Let $d_{jm}, 1 \le m
\le M$, be the global descriptors associated with the j-th
configuration, where $M$ is the number of global descriptors. We
then form a matrix $\boldsymbol A \in \mathbb{R}^{J \times M}$
with entries $A_{jm} = d_{jm}/ N_j$ for $j=1,\ldots,J$ and
$m=1,\ldots,M$.  Moreover, we form a matrix $\boldsymbol B
\in \mathbb{R}^{\mathcal{N} \times M}$ by stacking the derivatives of
the global descriptors for all training configurations from top to
bottom, where $\mathcal{N} = 3\sum_{j=1}^{J} N_j$.

The coefficient vector $\boldsymbol c$ of the POD potential is
found by solving the following least-squares problem


$$
{\min}_{\boldsymbol c \in \mathbb{R}^{M}} w_E \\boldsymbol A \boldsymbol c - \bar{\boldsymbol E}^{\star} \^2 + w_F \\boldsymbol B \boldsymbol c + \boldsymbol F^{\star} \^2 + w_R \\boldsymbol c \^2,
$$

where $w_E$ and $w_F$ are weights for the energy
(*fitting_weight_energy*) and force (*fitting_weight_force*),
respectively; and $w_R$ is the regularization parameter
(*fitting_regularization_parameter*).  Here $\bar{\boldsymbol
E}^{\star} \in \mathbb{R}^{J}$ is a vector of with entries
$\bar{E}^{\star}_j = E^{\star}_j/N_j$ and $\boldsymbol
F^{\star}$ is a vector of $\mathcal{N}$ entries obtained by
stacking $\{\boldsymbol F^{\star}_j\}_{j=1}^{J}$ from top to
bottom.

## Validation

POD potential can be validated on a test dataset in a directory
specified by setting path_to_test_data_set in the second input file.  It
is possible to validate the POD potential after the training is
complete.  This is done by providing the coefficient file as an input to
[fitpod](fitpod_command), for example,

```lammps
fitpod Ta_param.pod Ta_data.pod Ta_coefficients.pod
```
## Restrictions

This command is part of the ML-POD package.  It is only enabled if
LAMMPS was built with that package. See the [Build package](Build_package) page for more info.

## Related commands

[pair_style pod](pair_pod),
[compute pod/atom](compute_pod_atom),
[compute podd/atom](compute_pod_atom),
[compute pod/local](compute_pod_atom),
[compute pod/global](compute_pod_atom)

## Default

The keyword defaults are also given in the description of the input files.

----------


**(Nguyen and Rohskopf)** Nguyen and Rohskopf,  Journal of Computational Physics, 480, 112030, (2023).


**(Nguyen2023)** Nguyen, Physical Review B, 107(14), 144103, (2023).


**(Nguyen2024)** Nguyen, Journal of Computational Physics, 113102, (2024).


**(Nguyen and Sema)** Nguyen and Sema, https://arxiv.org/abs/2405.00306, (2024).
