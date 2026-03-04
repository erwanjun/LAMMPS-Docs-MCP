---
title: "Code Architecture and Developer Guide"
description: "LAMMPS code structure, OOP design, factory pattern, memory management, parallel algorithms"
category: "developer"
tags: ["architecture", "OOP", "parallel", "memory", "developer"]
commands: []
---
h are created that consist of a list of include statements including all headers of all styles of a given type that are currently abled (or “installed”).  

ore details on individual classes in the LAMMPS class topology are as follows:   
• The Memory class handles allocation of all large vectors and arrays.   
• The Error class prints all (terminal) error and warning messages.   
• The Universe class sets up one or more partitions of processors so that one or multiple simulations can be run, on the processors allocated for a run, e.g. by the mpirun command.   
• The Input class reads and processes input (strings and files), stores variables, and invokes commands.   
• Command style classes are derived from the Command class. They provide input script commands that perform one-time operations before/after/between simulations or which invoke a simulation. They are usually instantiated from within the Input class, its command method invoked, and then immediately destructed.   
• The Finish class is instantiated to print statistics to the screen after a simulation is performed, by commands like run and minimize.   
• The Special class walks the bond topology of a molecular system to find first, second, third neighbors of each atom. It is invoked by several commands, like read_data, read_restart, or replicate.   
• The Atom class stores per-atom properties associated with atom styles. More precisely, they are allocated and managed by a class derived from the AtomVec class, and the Atom class simply stores pointers to them. The classes derived from AtomVec represent the different atom styles, and they are instantiated through the atom_style command.   
• The Update class holds instances of an integrator and a minimizer class. The Integrate class is a parent style for the Verlet and r-RESPA time integrators, as defined by the run_style command. The Min class is a parent style for various energy minimizers.   
• The Neighbor class builds and stores neighbor lists. The NeighList class stores a single list (for all atoms). A NeighRequest class instance is created by pair, fix, or compute styles when they need a particular kind of neighbor list and use the NeighRequest properties to select the neighbor list settings for the given request. There can be multiple instances of the NeighRequest class. The Neighbor class will try to optimize how the requests are processed. Depending on the NeighRequest properties, neighbor lists are constructed from scratch, aliased, or constructed by post-processing an existing list into sub-lists.   
• The Comm class performs inter-processor communication, typically of ghost atom information. This usually involves MPI message exchanges with 6 neighboring processors in the 3d logical grid of processors mapped to the simulation box. There are two communication styles, enabling different ways to perform the domain decomposition.   
• The Irregular class is used, when atoms may migrate to arbitrary processors.   
• The Domain class stores the simulation box geometry, as well as geometric Regions and any user definition of a Lattice. The latter are defined by the region and lattice commands in an input script.   
• The Force class computes various forces between atoms. The Pair parent class is for non-bonded or pairwise forces, which in LAMMPS also includes many-body forces such as the Tersoff 3-body potential if those are computed by walking pairwise neighbor lists. The Bond, Angle, Dihedral, Improper parent classes are styles for bonded interactions within a static molecular topology. The KSpace parent class is for computing long-range Coulombic interactions. One of its child classes, PPPM, uses the FFT3D and Remap classes to redistribute and communicate grid-based information across the parallel processors.   
• The Modify class stores lists of class instances derived from the $F i x$ and Compute base classes.   
• The Group class manipulates groups that atoms are assigned to via the group command. It also has functions to compute various attributes of groups of atoms.  

• The Output class is used to generate 3 kinds of output from a LAMMPS simulation: thermodynamic information printed to the screen and log file, dump file snapshots, and restart files. These correspond to the Thermo, Dump, and WriteRestart classes respectively. The Dump class is a base class, with several derived classes implementing various dump style variants.  

• The Timer class logs timing information, output at the end of a run.  

# 4.3 Code design  

This section explains some code design choices in LAMMPS with the goal of helping developers write new code similar to the existing code. Please see the section on Requirements for contributed code for more specific recommendations and guidelines. While that section is organized more in the form of a checklist for code contributors, the focus here is on overall code design strategy, choices made between possible alternatives, and discussing some relevant $\mathrm{C}{+}{+}$ programming language constructs.  

Historically, the basic design philosophy of the LAMMPS $\mathrm{C}{+}{+}$ code was a $^{\circ}\mathrm{C}$ with classes” style. The motivation was to make it easy to modify LAMMPS for people without significant training in $\mathrm{C}{+}{+}$ programming. Data structures and code constructs were used that resemble the previous implementation(s) in Fortran. A contributing factor to this choice was that at the time, $\mathrm{C}{+}{+}$ compilers were often not mature and some advanced features contained bugs or did not function as the standard required. There were also disagreements between compiler vendors as to how to interpret the $\mathrm{C}{+}{+}$ standard documents.  

However, $\mathrm{C}{+}{+}$ compilers and the $\mathrm{C}{+}{+}$ programming language have advanced significantly. In 2020, the LAMMPS developers decided to require the $\mathrm{C}{+}{+}11$ standard as the minimum $\mathrm{C}{+}{+}$ language standard for LAMMPS. Since then, we have begun to replace C-style constructs with equivalent $\mathrm{C}{+}{+}$ functionality. This was taken either from the $\mathrm{C}{+}{+}$ standard library or implemented as custom classes or functions. The goal is to improve readability of the code and to increase code reuse through abstraction of commonly used functionality.  

# Note  

Please note that as of spring 2023 there is still a sizable chunk of legacy code in LAMMPS that has not yet been refactored to reflect these style conventions in full. LAMMPS has a large code base and many contributors. There is also a hierarchy of precedence in which the code is adapted. Highest priority has been the code in the src folder, followed by code in packages in order of their popularity and complexity (simpler code gets adapted sooner), followed by code in the lib folder. Source code that is downloaded from external packages or libraries during compilation is not subject to the conventions discussed here.  

# 4.3.1 Object-oriented code  

LAMMPS is designed to be an object-oriented code. Each simulation is represented by an instance of the LAMMPS class. When running in parallel, each MPI process creates such an instance. This can be seen in the main.cpp file where the core steps of running a LAMMPS simulation are the following 3 lines of code:  

LAMMPS \*lammps $=$ new LAMMPS(argc, argv, lammps_comm);   
lammps- $\scriptscriptstyle\bigcirc$ input- $\scriptscriptstyle\bigcirc$ file();   
delete lammps;  

The first line creates a LAMMPS class instance and passes the command line arguments and the global communicator to its constructor. The second line triggers the LAMMPS instance to process the input (either from standard input or a provided input file) until the simulation ends. The third line deletes the LAMMPS instance. The remainder of the main.cpp file has code for error handling, MPI configuration, and other special features.  

The basic LAMMPS class hierarchy which is created by the LAMMPS class constructor is shown in LAMMPS class topology. When input commands are processed, additional class instances are created, or deleted, or replaced. Likewise, specific member functions of specific classes are called to trigger actions such as creating atoms, computing forces, computing properties, time-propagating the system, or writing output.  

# Compositing and Inheritance  

LAMMPS makes extensive use of the object-oriented programming (OOP) principles of compositing and inheritance. Classes like the LAMMPS class are a composite containing pointers to instances of other classes like Atom, Comm, Force, Neighbor, Modify, and so on. Each of these classes implements certain functionality by storing and manipulating data related to the simulation and providing member functions that trigger certain actions. Some of those classes like Force are themselves composites, containing instances of classes describing different force interactions. Similarly, the Modify class contains a list of Fix and Compute classes. If the input commands that correspond to these classes include the word style, then LAMMPS stores only a single instance of that class. E.g. atom_style, comm_style, pair_style, bond_style. If the input command does not include the word style, then there may be many instances of that class defined, for example region, fix, compute, dump.  

Inheritance enables creation of derived classes that can share common functionality in their base class while providing a consistent interface. The derived classes replace (dummy or pure) functions in the base class. The higher level classes can then call those methods of the instantiated classes without having to know which specific derived class variant was instantiated. In LAMMPS these derived classes are often referred to as “styles”, e.g. pair styles, fix styles, atom styles and so on.  

This is the origin of the flexibility of LAMMPS. For example, pair styles implement a variety of different non-bonded interatomic potentials functions. All details for the implementation of a potential are stored and executed in a single class.  

As mentioned above, there can be multiple instances of classes derived from the Fix or Compute base classes. They represent a different facet of LAMMPS’ flexibility, as they provide methods which can be called at different points within a timestep, as explained in the How a timestep works doc page. This allows the input script to tailor how a specific simulation is run, what diagnostic computations are performed, and how the output of those computations is further processed or output.  

Additional code sharing is possible by creating derived classes from the derived classes (e.g., to implement an accelerated version of a pair style) where only a subset of the derived class methods are replaced with accelerated versions.  

# Polymorphism  

Polymorphism and dynamic dispatch are another OOP feature that play an important role in how LAMMPS selects what code to execute. In a nutshell, this is a mechanism where the decision of which member function to call from a class is determined at runtime and not when the code is compiled. To enable it, the function has to be declared as virtual and all corresponding functions in derived classes should use the override property. Below is a brief example.  

<html><body><table><tr><td>class Base public:</td><td></td><td></td><td></td></tr><tr><td>virtual ~Base() = default; void call();</td><td></td><td></td><td></td></tr><tr><td>void normal();</td><td></td><td></td><td></td></tr><tr><td>virtual void polyO;</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>void Base::call() {</td><td></td><td></td><td></td></tr><tr><td>normal();</td><td></td><td></td><td></td></tr><tr><td>polyO;</td><td></td><td></td><td></td></tr><tr><td>人</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>class Derived : public Base {</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>public:</td><td></td><td></td><td></td></tr></table></body></html>  

(continued from previous page)  

<html><body><table><tr><td>~ Derived() override = default; void normal); void polyO override;</td></tr></table></body></html>  

The difference in behavior of the normal() and the poly() member functions is which of the two member functions is called when executing base1- $>$ call() versus base2->call(). Without polymorphism, a function within the base class can only call member functions within the same scope: that is, Base::call() will always call Base::normal(). But for the base2- $>$ call() case, the call of the virtual member function will be dispatched to Derived::poly() instead. This mechanism results in calling functions that are within the scope of the class that was used to create the instance, even if they are assigned to a pointer for their base class. This is the desired behavior, and this way LAMMPS can even use styles that are loaded at runtime from a shared object file with the plugin command.  

A special case of virtual functions are so-called pure functions. These are virtual functions that are initialized to 0 in the class declaration (see example below).  

<html><body><table><tr><td>class Base</td><td></td></tr><tr><td>public:</td><td></td></tr><tr><td>virtual void pure) = 0; ;</td><td></td></tr></table></body></html>  

This has the effect that an instance of the base class cannot be created and that derived classes must implement these functions. Many of the functions listed with the various class styles in the section Modifying & extending LAMMPS are pure functions. The motivation for this is to define the interface or API of the functions, but defer their implementation to the derived classes.  

However, there are downsides to this. For example, calls to virtual functions from within a constructor, will not be in the scope of the derived class, and thus it is good practice to either avoid calling them or to provide an explicit scope such as Base::poly() or Derived::poly(). Furthermore, any destructors in classes containing virtual functions should be declared virtual too, so they will be processed in the expected order before types are removed from dynamic dispatch.  

![](images/4626f41be462a90e7954ab5dc81cf98c42be1ec93587f361d2295b8d599f9ab9.jpg)  

# Important Notes  

In order to be able to detect incompatibilities at compile time and to avoid unexpected behavior, it is crucial that all member functions that are intended to replace a virtual or pure function use the override property keyword. For the same reason, the use of overloads or default arguments for virtual functions should be avoided, as they lead to confusion over which function is supposed to override which, and which arguments need to be declared.  

# Style Factories  

In order to create class instances for different styles, LAMMPS often uses a programming pattern called Factory. Those are functions that create an instance of a specific derived class, say PairLJCut and return a pointer to the type of the common base class of that style, Pair in this case. To associate the factory function with the style keyword, a std::map class is used with function pointers indexed by their keyword (for example “lj/cut” for PairLJCut and “morse” for PairMorse). A couple of typedefs help keep the code readable, and a template function is used to implement the actual factory functions for the individual classes. Below is an example of such a factory function from the Force class as declared in force.h and implemented in force.cpp. The file style_pair.h is generated during compilation and includes all main header files (i.e. those starting with pair_) of pair styles and then the macro PairStyle() will associate the style name “lj/cut” with a factory function creating an instance of the PairLJCut class.  

// from force.h   
typedef Pair \*(\*PairCreator)(LAMMPS \*);   
typedef std::map $<$ <std::string, PairCreator> PairCreatorMap;   
PairCreatorMap \*pair_map;   
// from force.cpp   
template $<$ <typename S, typename T> static S \*style_creator(LAMMPS \*lmp) return new T(lmp);   
}   
// [...]   
pair_map = new PairCreatorMap();   
#define PAIR_CLASS   
#define PairStyle(key, Class) (\*pair_map)[#key] = &style_creator $<$ <Pair, Class>; #include "style_pair.h"   
#undef PairStyle   
#undef PAIR_CLASS   
// from pair_lj_cut.h   
#ifdef PAIR_CLASS   
PairStyle(lj/cut,PairLJCut);   
#else   
// [...] Similar code constructs are present in other files like modify.cpp and modify.h or neighbor.cpp and neighbor.h.   
Those contain similar macros and include style_\*.h files for creating class instances of styles they manage.  

# $4.3.21/0$ and output formatting  

# C-style stdio versus $\hphantom{0}\mathbf{C}++$ style iostreams  

LAMMPS uses the “stdio” library of the standard C library for reading from and writing to files and console instead of $\mathrm{C}{+}{+}$ “iostreams”. This is mainly motivated by better performance, better control over formatting, and less effort to achieve specific formatting.  

Since mixing “stdio” and “iostreams” can lead to unexpected behavior, use of the latter is strongly discouraged. Output to the screen should not use the predefined stdout FILE pointer, but rather the screen and logfile FILE pointers managed by the LAMMPS class. Furthermore, output should generally only be done by MPI rank 0 (comm- ${\mathrm{\ddot{\gamma}m e}}==0$ ). Output that is sent to both screen and logfile should use the utils::logmesg() convenience function.  

We discourage the use of stringstreams because the bundled $\{\mathrm{fmt}\}$ library and the customized tokenizer classes provide the same functionality in a cleaner way with better performance. This also helps maintain a consistent programming syntax with code from many different contributors.  

# Formatting with the {fmt} library  

The LAMMPS source code includes a copy of the {fmt} library, which is preferred over formatting with the “printf()” family of functions. The primary reason is that it allows a typesafe default format for any type of supported data. This is particularly useful for formatting integers of a given size (32-bit or 64-bit) which may require different format strings depending on compile time settings or compilers/operating systems. Furthermore, $\{\mathrm{fmt}\}$ gives better performance, has more functionality, a familiar formatting syntax that has similarities to format() in Python, and provides a facility that can be used to integrate format strings and a variable number of arguments into custom functions in a much simpler way than the varargs mechanism of the C library. Finally, {fmt} has been included into the $\mathrm{C}++20$ language standard as std::format(), so changes to adopt it are future-proof, for as long as they are not using any extensions that are not (yet) included into $\mathrm{C}{+}{+}$ .  

The long-term plan is to switch to using std::format() instead of fmt::format() when the minimum $\mathrm{C}{+}{+}$ standard required for LAMMPS will be set to $\mathrm{C}++20$ . See the basic build instructions for more details.  

Formatted strings are frequently created by calling the fmt::format() function, which will return a string as a std::string class instance. In contrast to the $\%$ placeholder in printf(), the $\{\mathrm{fmt}\}$ library uses $\{\}$ to embed format descriptors. In the simplest case, no additional characters are needed, as {fmt} will choose the default format based on the data type of the argument. Otherwise, the utils::print() function may be used instead of printf() or fprintf(). In addition, several LAMMPS output functions, that originally accepted a single string as argument have been overloaded to accept a format string with optional arguments as well (e.g., Error::all(), Error::one(), utils::logmesg()).  

# Summary of the {fmt} format syntax  

The syntax of the format string is “{[<argument id>][:<format spec>]}”, where either the argument id or the format spec (separated by a colon ‘:’) is optional. The argument id is usually a number starting from 0 that is the index to the arguments following the format string. By default, these are assigned in order (i.e. 0, 1, 2, 3, 4 etc.). The most common case for using argument id would be to use the same argument in multiple places in the format string without having to provide it as an argument multiple times. The argument id is rarely used in the LAMMPS source code.  

More common is the use of a format specifier, which starts with a colon. This may optionally be followed by a fill character (default is ‘ ‘). If provided, the fill character must be followed by an alignment character $(^{\leftarrow}<;^{\leftarrow}\land^{,}{\cdot}>^{,}$ for left, centered, or right alignment (default)). The alignment character may be used without a fill character. The next important format parameter would be the minimum width, which may be followed by a dot ‘.’ and a precision for floating point numbers. The final character in the format string would be an indicator for the “presentation”, i.e. ‘d’ for decimal presentation of integers, $\mathbf{\hat{x}}$ for hexadecimal, ‘o’ for octal, ‘c’ for character etc. This mostly follows the “printf()” scheme, but without requiring an additional length parameter to distinguish between different integer widths. The $\{\mathrm{fmt}\}$ library will detect those and adapt the formatting accordingly. For floating point numbers there are correspondingly, $\mathbf{\hat{g}}^{\dagger}$ for generic presentation, $\mathbf{\hat{e}}^{,}$ for exponential presentation, and ‘f’ for fixed point presentation.  

The format string “{:8}” would thus represent any type argument and be replaced by at least 8 characters; “ $\{:<8\}$ ” would do this as left aligned, “ $\{:\sp{\wedge}8\}"$ as centered, “ $\{:>8\}^{}$ as right aligned. If a specific presentation is selected, the argument type must be compatible or else the $\{\mathrm{fmt}\}$ formatting code will throw an exception. Some format string examples are given below:  

<html><body><table><tr><td>auto mesg 二 fmt::format(" mesg fmt::format</td><td>CPU t time: : {:4d}:{:02d}:{:02d}\1 ("{:<8s}|{:<10.5g} {:<10.5g}|{:<10.5g}</td><td>n", ( cpuh,(</td><td>cpum, cpus); [{:6.1f} [{:6.2f}</td></tr><tr><td></td><td>time,t time max,</td><td>sq, tmp);</td><td>n</td></tr><tr><td>utils::logmesg</td><td># of 1-21 neighbors max</td><td>,maxall);</td><td></td></tr><tr><td>utils:logmesg(lmp,"Lattice spacing</td><td>in x,y,Z</td><td>n"</td><td></td></tr><tr><td></td><td></td><td>{.8} {..8} {.8}</td><td></td></tr><tr><td>xlattice,ylattice,zlattice);</td><td></td><td></td><td></td></tr></table></body></html>  

which will create the following output lines:  

<html><body><table><tr><td colspan="7">CPU time: 0:02:16</td></tr><tr><td>Pair</td><td>2.0133</td><td>2.0133</td><td></td><td>2.0133</td><td>0.0|84.21</td></tr></table></body></html>  

(continues on next page)  

# 4.3. Code design  

(continued from previous page)  

$4=\operatorname*{max}\#$ of 1-2 neighbors Lattice spacing in x,y,z = 1.6795962 1.6795962 1.6795962  

Finally, a special feature of the $\{\mathrm{fmt}\}$ library is that format parameters like the width or the precision may be also provided as arguments. In that case a nested format is used where a pair of curly braces (with an optional argument id) “{}” are used instead of the value, for example $\langle\langle:\{\}\mathrm{d}\rangle^{,}$ will consume two integer arguments, the first will be the value shown and the second the minimum width.  

For more details and examples, please consult the {fmt} syntax documentation website.  

# 4.3.3 Memory management  

Dynamical allocation of small data and objects can be done with the $\mathrm{C}{+}{+}$ commands “new” and “delete/delete[]”. Large data should use the member functions of the Memory class, most commonly, Memory::create(), Memory::grow(), and Memory::destroy(), which provide variants for vectors, 2d arrays, 3d arrays, etc. These can also be used for small data.  

The use of malloc(), calloc(), realloc() and free() directly is strongly discouraged. To simplify adapting legacy code into the LAMMPS code base the member functions Memory::smalloc(), Memory::srealloc(), and Memory::sfree() are available, which perform additional error checks for safety.  

Use of these custom memory allocation functions is motivated by the following considerations:  

• Memory allocation failures on any MPI rank during a parallel run will trigger an immediate abort of the entire parallel calculation.   
• A failing “new” will trigger an exception, which is also captured by LAMMPS and triggers a global abort.   
• Allocation of multidimensional arrays will be done in a C compatible fashion, but such that the storage of the actual data is stored in one large contiguous block. Thus, when MPI communication is needed, the data can be communicated directly (similar to Fortran arrays).   
• The “destroy()” and “sfree()” functions may safely be called on NULL pointers.   
• The “destroy()” functions will nullify the pointer variables, thus making “use after free” errors easy to detect.   
• It is possible to use a larger than default memory alignment (not on all operating systems, since the allocated storage pointers must be compatible with free() for technical reasons).  

In the practical implementation of code this means, that any pointer variables, that are class members should be initialized to a nullptr value in their respective constructors. That way, it is safe to call Memory::destroy() or delete[] on them before any allocation outside the constructor. This helps prevent memory leaks.  

# 4.4 Parallel algorithms  

LAMMPS is designed to enable running simulations in parallel using the MPI parallel communication standard with distributed data via domain decomposition. The parallelization aims to be efficient, and resulting in good strong scaling $\mathbf{\check{\rho}}=$ good speedup for the same system) and good weak scaling $\cong$ the computational cost of enlarging the system is proportional to the system size). Additional parallelization using GPUs or OpenMP can also be applied within the subdomain assigned to an MPI process. For clarity, most of the following illustrations show the 2d simulation case. The underlying algorithms in those cases, however, apply to both 2d and 3d cases equally well.  

# Note  

The text and most of the figures in this chapter were adapted for the manual from the section on parallel algorithms in the new LAMMPS paper.  

# 4.4.1 Partitioning  

The underlying spatial decomposition strategy used by LAMMPS for distributed-memory parallelism is set with the comm_style command and can be either “brick” (a regular grid) or “tiled”.  

![](images/020d83da1270e117215f76897fdbef5c2d7b4d5b473a7ee2fe9cac449ab1ef0d.jpg)  
Fig. 2: Domain decomposition schemes  

This figure shows the different kinds of domain decomposition used for MPI parallelization: “brick” on the left with an orthogonal (left) and a triclinic (middle) simulation domain, and a “tiled” decomposition (right). The black lines show the division into subdomains, and the contained atoms are “owned” by the corresponding MPI process. The green dashed lines indicate how subdomains are extended with “ghost” atoms up to the communication cutoff distance.  

The LAMMPS simulation box is a 3d or 2d volume, which can be of orthogonal or triclinic shape, as illustrated in the Domain decomposition schemes figure for the 2d case. Orthogonal means the box edges are aligned with the $x,y_{:}$ , z Cartesian axes, and the box faces are thus all rectangular. Triclinic allows for a more general parallelepiped shape in which edges are aligned with three arbitrary vectors and the box faces are parallelograms. In each dimension, box faces can be periodic, or non-periodic with fixed or shrink-wrapped boundaries. In the fixed case, atoms which move outside the face are deleted; shrink-wrapped means the position of the box face adjusts continuously to enclose all the atoms.  

For distributed-memory MPI parallelism, the simulation box is spatially decomposed (partitioned) into non-overlapping subdomains which fill the box. The default partitioning, “brick”, is most suitable when atom density is roughly uniform, as shown in the left-side images of the Domain decomposition schemes figure. The subdomains comprise a regular grid, and all subdomains are identical in size and shape. Both the orthogonal and triclinic boxes can deform continuously during a simulation, e.g. to compress a solid or shear a liquid, in which case the processor subdomains likewise deform.  

For models with non-uniform density, the number of particles per processor can be load-imbalanced with the default partitioning. This reduces parallel efficiency, as the overall simulation rate is limited by the slowest processor, i.e. the one with the largest computational load. For such models, LAMMPS supports multiple strategies to reduce the load imbalance:  

• The processor grid decomposition is by default based on the simulation cell volume and tries to optimize the volume to surface ratio for the subdomains. This can be changed with the processors command.   
• The parallel planes defining the size of the subdomains can be shifted with the balance command. Which can be done in addition to choosing a more optimal processor grid.   
• The recursive bisectioning algorithm in combination with the “tiled” communication style can produce a partitioning with equal numbers of particles in each subdomain.  

![](images/32227e9f036001926a0d08eb94a061e25e119d99046c360b66a34b48453d9671.jpg)  

The pictures above demonstrate different decompositions for a 2d system with $12\mathrm{MPI}$ ranks. The atom colors indicate the load imbalance of each subdomain, with green being optimal and red the least optimal.  

Due to the vacuum in the system, the default decomposition is unbalanced, with several MPI ranks without atoms (left). By forcing a 1x12x1 processor grid, every MPI rank does computations now, but the number of atoms per subdomain is still uneven, and the thin slice shape increases the amount of communication between subdomains (center left). With a $2\mathrm{x}6\mathrm{x}1$ processor grid and shifting the subdomain divisions, the load imbalance is further reduced and the amount of communication required between subdomains is less (center right). And using the recursive bisectioning leads to further improved decomposition (right).  

# 4.4.2 Communication  

Following the selected partitioning scheme, all per-atom data is distributed across the MPI processes, which allows LAMMPS to handle very large systems provided it uses a correspondingly large number of MPI processes. To be able to compute the short-range interactions, MPI processes need not only access to the data of atoms they “own” but also information about atoms from neighboring subdomains, in LAMMPS referred to as “ghost” atoms. These are copies of atoms storing required per-atom data for up to the communication cutoff distance. The green dashed-line boxes in the Domain decomposition schemes figure illustrate the extended ghost-atom subdomain for one processor.  

This approach is also used to implement periodic boundary conditions: atoms that lie within the cutoff distance across a periodic boundary are also stored as ghost atoms and taken from the periodic replication of the subdomain, which may be the same subdomain, e.g. if running in serial. As a consequence of this, force computation in LAMMPS is not subject to minimum image conventions and thus cutoffs may be larger than half the simulation domain.  

Efficient communication patterns are needed to update the “ghost” atom data, since that needs to be done at every MD time step or minimization step. The diagrams of the ghost atom communication figure illustrate how ghost atom communication is performed in two stages for a 2d simulation (three in 3d) for both a regular and irregular partitioning of the simulation box. For the regular case (left) atoms are exchanged first in the $x$ -direction, then in $y$ , with four neighbors in the grid of processor subdomains.  

In the $x$ stage, processor ranks 1 and 2 send owned atoms in their red-shaded regions to rank 0 (and vice versa). Then in the $y$ stage, ranks 3 and 4 send atoms in their blue-shaded regions to rank 0, which includes ghost atoms they received in the $x$ stage. Rank 0 thus acquires all its ghost atoms; atoms in the solid blue corner regions are communicated twice before rank 0 receives them.  

For the irregular case (right) the two stages are similar, but a processor can have more than one neighbor in each direction. In the $x$ stage, MPI ranks 1,2,3 send owned atoms in their red-shaded regions to rank 0 (and vice versa). These include only atoms between the lower and upper $y_{\l}$ -boundary of rank 0’s subdomain. In the $y$ stage, ranks 4,5,6 send atoms in their blue-shaded regions to rank 0. This may include ghost atoms they received in the $x$ stage, but only if they are needed by rank 0 to fill its extended ghost atom regions in the $+/-y$ directions (blue rectangles). Thus, in this case, ranks 5 and 6 do not include ghost atoms they received from each other (in the $x$ stage) in the atoms they send to rank 0. The key point is that while the pattern of communication is more complex in the irregular partitioning case, it can still proceed in two stages (three in 3d) via atom exchanges with only neighboring processors.  

When attributes of owned atoms are sent to neighboring processors to become attributes of their ghost atoms, LAMMPS calls this a “forward” communication. On timesteps when atoms migrate to new owning processors and neighbor lists are rebuilt, each processor creates a list of its owned atoms which are ghost atoms in each of its neighbor processors.  

![](images/0efd0a33bc644bd730e2b05fe5e02e22c54b58422685add97a82d1704bf2232f.jpg)  
Fig. 3: ghost atom communication  

This figure shows the ghost atom communication patterns between subdomains for “brick” (left) and “tiled” communication styles for 2d simulations. The numbers indicate MPI process ranks. Here the subdomains are drawn spatially separated for clarity. The dashed-line box is the extended subdomain of processor 0 which includes its ghost atoms. The red- and blue-shaded boxes are the regions of communicated ghost atoms.  

These lists are used to pack per-atom coordinates (for example) into message buffers in subsequent steps until the next reneighboring.  

A “reverse” communication is when computed ghost atom attributes are sent back to the processor who owns the atom. This is used (for example) to sum partial forces on ghost atoms to the complete force on owned atoms. The order of the two stages described in the ghost atom communication figure is inverted, and the same lists of atoms are used to pack and unpack message buffers with per-atom forces. When a received buffer is unpacked, the ghost forces are summed to owned atom forces. As in forward communication, forces on atoms in the four blue corners of the diagrams are sent, received, and summed twice (once at each stage) before owning processors have the full force.  

These two operations are used in many places within LAMMPS aside from exchange of coordinates and forces, for example by manybody potentials to share intermediate per-atom values, or by rigid-body integrators to enable each atom in a body to access body properties. Here are additional details about how these communication operations are performed in LAMMPS:  

• When exchanging data with different processors, forward and reverse communication is done using MPI_Send() and MPI_IRecv() calls. If a processor is “exchanging” atoms with itself, only the pack and unpack operations are performed, e.g. to create ghost atoms across periodic boundaries when running on a single processor. • For forward communication of owned atom coordinates, periodic box lengths are added and subtracted when the receiving processor is across a periodic boundary from the sender. There is then no need to apply a minimum image convention when calculating distances between atom pairs when building neighbor lists or computing forces. • The cutoff distance for exchanging ghost atoms is typically equal to the neighbor cutoff. But it can also set to a larger value if needed, e.g. half the diameter of a rigid body composed of multiple atoms or over $3\mathbf{x}$ the length of a stretched bond for dihedral interactions. It can also exceed the periodic box size. For the regular communication pattern (left), if the cutoff distance extends beyond a neighbor processor’s subdomain, then multiple exchanges are performed in the same direction. Each exchange is with the same neighbor processor, but buffers are packed/unpacked using a different list of atoms. For forward communication, in the first exchange, a processor sends only owned atoms. In subsequent exchanges, it sends ghost atoms received in previous exchanges. For the irregular pattern (right) overlaps of a processor’s extended ghost-atom subdomain with all other processors in each dimension are detected.  

# 4.4.3 Neighbor lists  

To compute forces efficiently, each processor creates a Verlet-style neighbor list which enumerates all pairs of atoms $i,j$ $i=$ owned, $j=$ owned or ghost) with separation less than the applicable neighbor list cutoff distance. In LAMMPS, the neighbor lists are stored in a multiple-page data structure; each page is a contiguous chunk of memory which stores vectors of neighbor atoms $j$ for many $i$ atoms. This allows pages to be incrementally allocated or deallocated in blocks as needed. Neighbor lists typically consume the most memory of any data structure in LAMMPS. The neighbor list is rebuilt (from scratch) once every few timesteps, then used repeatedly each step for force or other computations. The neighbor cutoff distance is $R_{n}=R_{f}+\Delta_{s}$ , where $R_{f}$ is the (largest) force cutoff defined by the interatomic potential for computing short-range pairwise or manybody forces and $\Delta_{s}$ is a “skin” distance that allows the list to be used for multiple steps assuming that atoms do not move very far between consecutive time steps. Typically, the code triggers reneighboring when any atom has moved half the skin distance since the last reneighboring; this and other options of the neighbor list rebuild can be adjusted with the neigh_modify command.  

On steps when reneighboring is performed, atoms which have moved outside their owning processor’s subdomain are first migrated to new processors via communication. Periodic boundary conditions are also (only) enforced on these steps to ensure each atom is re-assigned to the correct processor. After migration, the atoms owned by each processor are stored in a contiguous vector. Periodically, each processor spatially sorts owned atoms within its vector to reorder it for improved cache efficiency in force computations and neighbor list building. For that, atoms are spatially binned and then reordered so that atoms in the same bin are adjacent in the vector. Atom sorting can be disabled or its settings modified with the atom_modify command.  

![](images/ae477b9f401e17c6b34cd25fe3b0243d89e195818829f1d16426d9f9db72568a.jpg)  
Fig. 4: neighbor list stencils  

A 2d simulation subdomain (thick black line) and the corresponding ghost atom cutoff region (dashed blue line) for both   
orthogonal (left) and triclinic (right) domains. A regular grid of neighbor bins (thin lines) overlays the entire simulation domain   
and need not align with subdomain boundaries; only the portion overlapping the augmented subdomain is shown. In the triclinic   
case, it overlaps the bounding box of the tilted rectangle. The blue- and red-shaded bins represent a stencil of bins searched to find neighbors of a particular atom (black dot).  

To build a local neighbor list in linear time, the simulation domain is overlaid (conceptually) with a regular 3d (or 2d) grid of neighbor bins, as shown in the neighbor list stencils figure for 2d models and a single MPI processor’s subdomain. Each processor stores a set of neighbor bins which overlap its subdomain, extended by the neighbor cutoff distance $R_{n}$ . As illustrated, the bins need not align with processor boundaries; an integer number in each dimension is fit to the size of the entire simulation box.  

Most often, LAMMPS builds what is called a “half” neighbor list where each $i,j$ neighbor pair is stored only once, with either atom $i$ or $j$ as the central atom. The build can be done efficiently by using a pre-computed “stencil” of bins around a central origin bin which contains the atom whose neighbors are being searched for. A stencil is simply a list of integer offsets in $x,y,z$ of nearby bins surrounding the origin bin which are close enough to contain any neighbor atom $j$ within a distance $R_{n}$ from any atom $i$ in the origin bin. Note that for a half neighbor list, the stencil can be asymmetric, since each atom only need store half its nearby neighbors.  

These stencils are illustrated in the figure for a half list and a bin size of ${\frac{1}{2}}R_{n}$ . There are 13 red $^{+}$ blue stencil bins in 2d (for the orthogonal case, 15 for triclinic). In 3d there would be 63, 13 in the plane of bins that contain the origin bin and 25 in each of the two planes above it in the $z$ direction (75 for triclinic). The triclinic stencil has extra bins because the bins tile the bounding box of the entire triclinic domain, and thus are not periodic with respect to the simulation box itself. The stencil and logic for determining which $i,j$ pairs to include in the neighbor list are altered slightly to account for this.  

To build a neighbor list, a processor first loops over its “owned” plus “ghost” atoms and assigns each to a neighbor bin. This uses an integer vector to create a linked list of atom indices within each bin. It then performs a triply-nested loop over its owned atoms $i.$ , the stencil of bins surrounding atom $i^{\cdot}$ ’s bin, and the $j$ atoms in each stencil bin (including ghost atoms). If the distance $r_{i j}<R_{n}$ , then atom $j$ is added to the vector of atom $i^{\cdot}$ ’s neighbors.  

Here are additional details about neighbor list build options LAMMPS supports:  

• The choice of bin size is an option; a size half of $R_{n}$ has been found to be optimal for many typical cases. Smaller bins incur additional overhead to loop over; larger bins require more distance calculations. Note that for smaller bin sizes, the 2d stencil in the figure would be of a more semicircular shape (hemispherical in 3d), with bins near the corners of the square eliminated due to their distance from the origin bin. • Depending on the interatomic potential(s) and other commands used in an input script, multiple neighbor lists and stencils with different attributes may be needed. This includes lists with different cutoff distances, e.g. for force computation versus occasional diagnostic computations such as a radial distribution function, or for the r-RESPA time integrator which can partition pairwise forces by distance into subsets computed at different time intervals. It includes “full” lists (as opposed to half lists) where each $i,j$ pair appears twice, stored once with $i$ and $j,$ , and which use a larger symmetric stencil. It also includes lists with partial enumeration of ghost atom neighbors. The full and ghost-atom lists are used by various manybody interatomic potentials. Lists may also use different criteria for inclusion of a pairwise interaction. Typically, this simply depends only on the distance between two atoms and the cutoff distance. But for finite-size coarse-grained particles with individual diameters (e.g. polydisperse granular particles), it can also depend on the diameters of the two particles. • When using pair style hybrid multiple sub-lists of the master neighbor list for the full system need to be generated, one for each sub-style, which contains only the $i,j$ pairs needed to compute interactions between subsets of atoms for the corresponding potential. This means, not all $i$ or $j$ atoms owned by a processor are included in a particular sub-list. • Some models use different cutoff lengths for pairwise interactions between different kinds of particles, which are stored in a single neighbor list. One example is a solvated colloidal system with large colloidal particles where colloid/colloid, colloid/solvent, and solvent/solvent interaction cutoffs can be dramatically different. Another is a model of polydisperse finite-size granular particles; pairs of particles interact only when they are in contact with each other. Mixtures with particle size ratios as high as 10-100x may be used to model realistic systems. Efficient neighbor list building algorithms for these kinds of systems are available in LAMMPS. They include a method which uses different stencils for different cutoff lengths and trims the stencil to only include bins that straddle the cutoff sphere surface. More recently a method which uses both multiple stencils and multiple bin sizes was developed; it builds neighbor lists efficiently for systems with particles of any size ratio, though other considerations (timestep size, force computations) may limit the ability to model systems with huge polydispersity. • For small and sparse systems and as a fallback method, LAMMPS also supports neighbor list construction without binning by using a full $O(N^{2})$ loop over all $i,j$ atom pairs in a subdomain when using the neighbor nsq command. • Dependent on the “pair” setting of the newton command, the “half” neighbor lists may contain all pairs of atoms where atom $j$ is a ghost atom (i.e. when the newton pair setting is $o f f$ ). For the newton pair on setting the atom $j$ is only added to the list if its $z$ coordinate is larger, or if equal the $y$ coordinate is larger, and that is equal, too, the $x$ coordinate is larger. For homogeneously dense systems, that will result in picking neighbors from a same size sector in always the same direction relative to the “owned” atom, and thus it should lead to similar length neighbor lists and reduce the chance of a load imbalance. 4.4. Parallel algorithms 767  

# 4.4.4 Long-range interactions  

For charged systems, LAMMPS can compute long-range Coulombic interactions via the FFT-based particleparticle/particle-mesh (PPPM) method implemented in kspace style pppm and its variants. For that Coulombic interactions are partitioned into short- and long-range components. The short-ranged portion is computed in real space as a loop over pairs of charges within a cutoff distance, using neighbor lists. The long-range portion is computed in reciprocal space using a kspace style. For the PPPM implementation the simulation cell is overlaid with a regular FFT grid in 3d. It proceeds in several stages:  

a) each atom’s point charge is interpolated to nearby FFT grid points,   
b) a forward 3d FFT is performed,   
c) a convolution operation is performed in reciprocal space,   
d) one or more inverse 3d FFTs are performed, and   
e) electric field values from grid points near each atom are interpolated to compute its forces.  

For any of the spatial-decomposition partitioning schemes each processor owns the brick-shaped portion of FFT grid points contained within its subdomain. The two interpolation operations use a stencil of grid points surrounding each atom. To accommodate the stencil size, each processor also stores a few layers of ghost grid points surrounding its brick. Forward and reverse communication of grid point values is performed similar to the corresponding atom data communication. In this case, electric field values on owned grid points are sent to neighboring processors to become ghost point values. Likewise charge values on ghost points are sent and summed to values on owned points.  

For triclinic simulation boxes, the FFT grid planes are parallel to the box faces, but the mapping of charge and electric field values to/from grid points is done in reduced coordinates where the tilted box is conceptually a unit cube, so that the stencil and FFT operations are unchanged. However the FFT grid size required for a given accuracy is larger for triclinic domains than it is for orthogonal boxes.  

![](images/c96ded322859742b0c5dccbbce7fe3be41c847301faf0592663e2d65469a4ce3.jpg)  
Fig. 5: Parallel FFT in PPPM  

Stages of a parallel FFT for a simulation domain overlaid with an $\mathrm{8x8x8}$ 3d FFT grid, partitioned across 64 processors. Within each of the 4 diagrams, grid cells of the same color are owned by a single processor; for simplicity, only cells owned by 4 or 8 of the 64 processors are colored. The two images on the left illustrate brick-to-pencil communication. The two images on the right illustrate pencil-to-pencil communication, which in this case transposes the $y$ and $z$ dimensions of the grid.  

Parallel 3d FFTs require substantial communication relative to their computational cost. A 3d FFT is implemented by a series of 1d FFTs along the $x-,y-$ , and $z$ -direction of the FFT grid. Thus, the FFT grid cannot be decomposed like atoms into 3 dimensions for parallel processing of the FFTs but only in 1 (as planes) or 2 (as pencils) dimensions and in between the steps the grid needs to be transposed to have the FFT grid portion “owned” by each MPI process complete in the direction of the 1d FFTs it has to perform. LAMMPS uses the pencil-decomposition algorithm as shown in the Parallel FFT in PPPM figure.  

Initially (far left), each processor owns a brick of same-color grid cells (actually grid points) contained within in its subdomain. A brick-to-pencil communication operation converts this layout to 1d pencils in the $x$ -dimension (center left). Again, cells of the same color are owned by the same processor. Each processor can then compute a 1d FFT on each pencil of data it wholly owns using a call to the configured FFT library. A pencil-to-pencil communication then converts this layout to pencils in the y dimension (center right) which effectively transposes the $x$ and $y$ dimensions of the grid, followed by 1d FFTs in y. A final transpose of pencils from $y$ to $z$ (far right) followed by 1d FFTs in $z$ completes the forward FFT. The data is left in a z-pencil layout for the convolution operation. One or more inverse FFTs then perform the sequence of 1d FFTs and communication steps in reverse order; the final layout of resulting grid values is the same as the initial brick layout.  

Each communication operation within the FFT (brick-to-pencil or pencil-to-pencil or pencil-to-brick) converts one tiling of the 3d grid to another, where a tiling in this context means an assignment of a small brick-shaped subset of grid points to each processor, the union of which comprise the entire grid. The parallel fftMPI library written for LAMMPS allows arbitrary definitions of the tiling so that an irregular partitioning of the simulation domain can use it directly. Transforming data from one tiling to another is implemented in fftMPI using point-to-point communication, where each processor sends data to a few other processors, since each tile in the initial tiling overlaps with a handful of tiles in the final tiling.  

The transformations could also be done using collective communication across all $P$ processors with a single call to MPI_Alltoall(), but this is typically much slower. However, for the specialized brick and pencil tiling illustrated in Parallel FFT in PPPM figure, collective communication across the entire MPI communicator is not required. In the example, an $8^{3}$ grid with 512 grid cells is partitioned across 64 processors; each processor owns a $2\mathrm{x}2\mathrm{x}23\mathrm{d}$ brick of grid cells. The initial brick-to-pencil communication (upper left to upper right) only requires collective communication within subgroups of 4 processors, as illustrated by the 4 colors. More generally, a brick-to-pencil communication can be performed by partitioning $P$ processors into $P^{\frac{2}{3}}$ subgroups of $P^{\frac{1}{3}}$ processors each. Each subgroup performs collective communication only within its subgroup. Similarly, pencil-to-pencil communication can be performed by partitioning $P$ processors into $P^{\frac{1}{2}}$ subgroups of $\mathbf{\bar{\rho}}_{P_{2}^{1}}$ processors each. This is illustrated in the figure for the $y\Rightarrow z$ communication (center). An eight-processor subgroup owns the front $y z$ plane of data and performs collective communication within the subgroup to transpose from a $y$ -pencil to $z$ -pencil layout.  

LAMMPS invokes point-to-point communication by default, but also provides the option of partitioned collective communication when using a kspace_modify collective yes command to switch to that mode. In the latter case, the code detects the size of the disjoint subgroups and partitions the single $P$ -size communicator into multiple smaller communicators, each of which invokes collective communication. Testing on a large IBM Blue Gene/Q machine at Argonne National Labs showed a significant improvement in FFT performance for large processor counts; partitioned collective communication was faster than point-to-point communication or global collective communication involving all $P$ processors.  

ere are some additional details about FFTs for long-range and related grid/particle operations that LAMMPS supports:  

• The fftMPI library allows each grid dimension to be a multiple of small prime factors (2,3,5), and allows any number of processors to perform the FFT. The resulting brick and pencil decompositions are thus not always as well-aligned, but the size of subgroups of processors for the two modes of communication (brick/pencil and pencil/pencil) still scale as $O(P^{\frac{1}{3}})$ and $\dot{O}(P^{\frac{1}{2}})$ .   
• For efficiency in performing 1d FFTs, the grid transpose operations illustrated in Figure Parallel FFT in PPPM also involve reordering the 3d data so that a different dimension is contiguous in memory. This reordering can be done during the packing or unpacking of buffers for MPI communication.   
• For large systems and particularly many MPI processes, the dominant cost for parallel FFTs is often the communication, not the computation of 1d FFTs, even though the latter scales as $N\log(N)$ in the number of grid points $N$ per grid direction. This is due to the fact that only a 2d decomposition into pencils is possible while atom data (and their corresponding short-range force and energy computations) can be decomposed efficiently in 3d.  

Reducing the number of MPI processes involved in the MPI communication will reduce this kind of overhead. By using a hybrid MPI + OpenMP parallelization it is still possible to use all processes for parallel computation. It will use OpenMP parallelization inside the MPI domains. While that may have a lower parallel efficiency for some part of the computation, that can be less than the communication overhead in the 3d FFTs.  

As an alternative, it is also possible to start a multi-partition calculation and then use the verlet/split integrator to perform the PPPM computation on a dedicated, separate partition of MPI processes. This uses an integer “1:p” mapping of $p$ subdomains of the atom decomposition to one subdomain of the FFT grid decomposition and where pairwise non-bonded and bonded forces and energies are computed on the larger partition and the PPPM kspace computation concurrently on the smaller partition.  

• LAMMPS also implements PPPM-based solvers for other long-range interactions, dipole and dispersion (Lennard-Jones), which can be used in conjunction with long-range Coulombics for point charges. • LAMMPS implements a GridComm class which overlays the simulation domain with a regular grid, partitions it across processors in a manner consistent with processor subdomains, and provides methods for forward and reverse communication of owned and ghost grid point values. It is used for PPPM as an FFT grid (as outlined above) and also for the MSM algorithm, which uses a cascade of grid sizes from fine to coarse to compute longrange Coulombic forces. The GridComm class is also useful for models where continuum fields interact with particles. For example, the two-temperature model (TTM) defines heat transfer between atoms (particles) and electrons (continuum gas) where spatial variations in the electron temperature are computed by finite differences of a discretized heat equation on a regular grid. The fix ttm/grid command uses the GridComm class internally to perform its grid operations on a distributed grid instead of the original fix ttm which uses a replicated grid.  

# 4.4.5 OpenMP Parallelism  

The styles in the INTEL, KOKKOS, and OPENMP packages offer to use OpenMP thread parallelism to predominantly distribute loops over local data and thus follow an orthogonal parallelization strategy to the decomposition into spatial domains used by the MPI partitioning. For clarity, this section discusses only the implementation in the OPENMP package, as it is the simplest. The INTEL and KOKKOS packages offer additional options and are more complex since they support more features and different hardware like co-processors or GPUs.  

One of the key decisions when implementing the OPENMP package was to keep the changes to the source code small, so that it would be easier to maintain the code and keep it in sync with the non-threaded standard implementation. This is achieved by a) making the OPENMP version a derived class from the regular version (e.g. PairLJCutOMP from PairLJCut) and only overriding methods that are multi-threaded or need to be modified to support multi-threading (similar to what was done in the OPT package), b) keeping the structure in the modified code very similar so that side-byside comparisons are still useful, and c) offloading additional functionality and multi-thread support functions into three separate classes ThrOMP, ThrData, and FixOMP. ThrOMP provides additional, multi-thread aware functionality not available in the corresponding base class (e.g. Pair for PairLJCutOMP) like multi-thread aware variants of the “tally” functions. Those functions are made available through multiple inheritance, so those new functions have to have unique names to avoid ambiguities; typically _thr is appended to the name of the function. ThrData is a class that manages per-thread data structures. It is used instead of extending the corresponding storage to per-thread arrays to avoid slowdowns due to “false sharing” when multiple threads update adjacent elements in an array and thus force the CPU cache lines to be reset and re-fetched. FixOMP finally manages the “multi-thread state” like settings and access to per-thread storage, it is activated by the package omp command.  

# Avoiding data races  

A key problem when implementing thread parallelism in an MD code is to avoid data races when updating accumulated properties like forces, energies, and stresses. When interactions are computed, they always involve multiple atoms and thus there are race conditions when multiple threads want to update per-atom data of the same atoms. Five possible strategies have been considered to avoid this:  

1. Restructure the code so that there is no overlapping access possible when computing in parallel, e.g. by breaking lists into multiple parts and synchronizing threads in between.   
2. Have each thread be “responsible” for a specific group of atoms and compute these interactions multiple times, once on each thread that is responsible for a given atom, and then have each thread only update the properties of this atom.   
3. Use mutexes around functions and regions of code where the data race could happen.   
4. Use atomic operations when updating per-atom properties.  

5. Use replicated per-thread data structures to accumulate data without conflicts and then use a reduction to combine those results into the data structures used by the regular style.  

Option 5 was chosen for the OPENMP package because it would retain the performance for the case of a single thread and the code would be more maintainable. Option 1 would require extensive code changes, particularly to the neighbor list code; option 2 would have incurred a $2\mathbf{x}$ or more performance penalty for the serial case; option 3 causes significant overhead and would enforce serialization of operations in inner loops and thus defeat the purpose of multi-threading; option 4 slows down the serial case although not quite as bad as option 2. The downside of option 5 is that the overhead of the reduction operations grows with the number of threads used, so there would be a crossover point where options 2 or 4 would result in faster executing. That is why option 2 for example is used in the GPU package because a GPU is a processor with a massive number of threads. However, since the MPI parallelization is generally more effective for typical MD systems, the expectation is that thread parallelism is only used for a smaller number of threads (2-8). At the time of its implementation, that number was equivalent to the number of CPU cores per CPU socket on high-end supercomputers.  

Thus arrays like the force array are dimensioned to the number of atoms times the number of threads when enabling OpenMP support, and inside the compute functions a pointer to a different chunk is obtained by each thread. Similarly, accumulators like potential energy or virial are kept in per-thread instances of the ThrData class and then only reduced and stored in their global counterparts at the end of the force computation.  

# Loop scheduling  

Multi-thread parallelization is applied by distributing (outer) loops statically across threads. Typically, this would be the loop over local atoms $i$ when processing $i,j$ pairs of atoms from a neighbor list. The design of the neighbor list code results in atoms having a similar number of neighbors for homogeneous systems and thus load imbalances across threads are not common and typically happen for systems where also the MPI parallelization would be unbalanced, which would typically have a more pronounced impact on the performance. This same loop scheduling scheme can also be applied to the reduction operations on per-atom data to try and reduce the overhead of the reduction operation.  

# Neighbor list parallelization  

In addition to the parallelization of force computations, also the generation of the neighbor lists is parallelized. As explained previously, neighbor lists are built by looping over “owned” atoms and storing the neighbors in “pages”. In the OPENMP variants of the neighbor list code, each thread operates on a different chunk of “owned” atoms and allocates and fills its own set of pages with neighbor list data. This is achieved by each thread keeping its own instance of the MyPage page allocator class.  

# 4.5 Accessing per-atom data  

This page discusses how per-atom data is managed in LAMMPS, how it can be accessed, what communication patterns apply, and some of the utility functions that exist for a variety of purposes.  

# 4.5.1 Owned and ghost atoms  

As described on the parallel partitioning algorithms page, LAMMPS uses a domain decomposition of the simulation domain, either in a brick or tiled manner. Each MPI process owns exactly one subdomain and the atoms within it. To compute forces for tuples of atoms that are spread across sub-domain boundaries, also a “halo” of ghost atoms are maintained within the communication cutoff distance of its subdomain.  

The total number of atoms is stored in Atom::natoms (within any typical class this can be referred to at atom>natoms). The number of owned (or “local” atoms) are stored in Atom::nlocal; the number of ghost atoms is stored in Atom::nghost. The sum of Atom::nlocal over all MPI processes should be Atom::natoms. This is by default regularly checked by the Thermo class, and if the sum does not match, LAMMPS stops with a “lost atoms” error. For convenience also the property Atom::nmax is available, this is the maximum of Atom::nlocal $+$ Atom::nghost across all MPI processes.  

Per-atom properties are either managed by the atom style, individual classes, or as custom arrays by the individual classes. If only access to owned atoms is needed, they are usually allocated to be of size Atom::nlocal, otherwise of size Atom::nmax. Please note that not all per-atom properties are available or updated on ghost atoms. For example, per-atom velocities are only updated with comm_modify vel yes.  

# 4.5.2 Atom indexing  

When referring to individual atoms, they may be indexed by their local index, their index in their $A t o m{::}x$ array. This is densely populated containing first all owned atoms (index $<$ Atom::nlocal) and then all ghost atoms. The order of atoms in these arrays can change due to atoms migrating between between subdomains, atoms being added or deleted, or atoms being sorted for better cache efficiency. Atoms are globally uniquely identified by their atom $I D$ . There may be multiple atoms with the same atom ID present, but only one of them may be an owned atom.  

To find the local index of an atom, when the atom $I D$ is known, the Atom::map() function may be used. It will return the local atom index or -1. If the returned value is between 0 (inclusive) and Atom::nlocal (exclusive) it is an owned or “local” atom; for larger values the atom is present as a ghost atom; for a value of -1, the atom is not present on the current subdomain at all.  

If multiple atoms with the same tag exist in the same subdomain, they can be found via the Atom::sametag array. It points to the next atom index with the same tag or $^{-1}$ if there are no more atoms with the same tag. The list will be exhaustive when starting with an index of an owned atom, since the atom IDs are unique, so there can only be one such atom. Example code to count atoms with same atom ID in a subdomain:  

for (int i = 0; i < atom->nlocal; ++i) { int count = 0; while (sametag[i] >= 0) { i = sametag[i]; ++count; }   
printf("Atom ID: %ld is present %d times\n", atom- $\scriptscriptstyle\bigcirc$ tag[i], count);   
}  

# 4.5.3 Atom class versus AtomVec classes  

The Atom class contains all kinds of flags and counters about atoms in the system and that includes pointers to all per-atom properties available for atoms. However, only a subset of these pointers are non-NULL and which those are depends on the atom style. For each atom style there is a corresponding AtomVecXXX class derived from the AtomVec base class, where the XXX indicates the atom style. This AtomVecXXX class will update the counters and per-atom pointers if atoms are added or removed to the system or migrate between subdomains.  

# 4.6 Communication patterns  

This page describes various inter-processor communication operations provided by LAMMPS, mostly in the core Comm class. These are operations for common tasks implemented using MPI library calls. They are used by other classes to perform communication of different kinds. These operations are useful to know about when writing new code for LAMMPS that needs to communicate data between processors.  

# 4.6.1 Owned and ghost atoms  

As described on the parallel partitioning algorithms page, LAMMPS spatially decomposes the simulation domain, either in a brick or tiled manner. Each processor (MPI task) owns atoms within its subdomain and additionally stores ghost atoms within a cutoff distance of its subdomain.  

# Forward and reverse communication  

As described on the parallel communication algorithms page, the most common communication operations are first, forward communication which sends owned atom information from each processor to nearby processors to store with their ghost atoms. The need to do this communication arises when data from the owned atoms is updated (e.g. their positions) and this updated information needs to be copied to the corresponding ghost atoms.  

And second, reverse communication, which sends ghost atom information from each processor to the owning processor to accumulate (sum) the values with the corresponding owned atoms. The need for this arises when data is computed and also stored with ghost atoms (e.g. forces when using a “half” neighbor list) and thus those terms need to be added to their corresponding atoms on the process where they are “owned” atoms. Please note, that with the newton off setting this does not happen and the neighbor lists are constructed so that these interactions are computed on both MPI processes containing one of the atoms and only the data pertaining to the local atom is stored.  

The time-integration classes in LAMMPS invoke these operations each timestep via the forward_comm() and reverse_comm() methods in the Comm class. Which per-atom data is communicated depends on the currently used atom style and whether comm_modify vel setting is “no” (default) or “yes”.  

Similarly, Pair style classes can invoke the forward_comm(this) and reverse_comm(this) methods in the Comm class to perform the same operations on per-atom data that is generated and stored within the pair style class. Note that this function requires passing the this pointer as the first argument to enable the Comm class to call the “pack” and “unpack” functions discussed below. An example of the use of these functions are many-body pair styles like the embedded-atom method (EAM) which compute intermediate values in the first part of the compute() function that need to be stored by both owned and ghost atoms for the second part of the force computation. The Comm class methods perform the MPI communication for buffers of per-atom data. They “call back” to the Pair class, so it can pack or unpack the buffer with data the Pair class owns. There are 4 such methods that the Pair class must define, assuming it uses both forward and reverse communication:  

pack_forward_comm() unpack_forward_comm() • pack_reverse_comm() • unpack_reverse_comm()  

The arguments to these methods include the buffer and a list of atoms to pack or unpack. The Pair class also must set the comm_forward and comm_reverse variables, which store the number of values stored in the communication buffers for each operation. This means, if desired, it can choose to store multiple per-atom values in the buffer, and they will be communicated together to minimize communication overhead. The communication buffers are defined vectors containing double values. To correctly store integers that may be 64-bit (bigint, tagint, imageint) in the buffer, you need to use the ubuf union construct.  

The Fix, Bond, Compute, and Dump classes can also invoke the same kind of forward and reverse communication operations using the same Comm class methods. Likewise, the same pack/unpack methods and comm_forward/comm_reverse variables must be defined by the calling Fix, Bond, Compute, or Dump class.  

For all of these classes, there is an optional second argument to the forward_comm() and reverse_comm() call which can be used when the class performs multiple modes of communication, with different numbers of values per atom. The class should set the comm_forward and comm_reverse variables to the maximum value, but can invoke the communication for a particular mode with a smaller value. For this to work, the pack_forward_comm(), etc. methods typically use a class member variable to choose which values to pack/unpack into/from the buffer.  

Finally, for reverse communications in Fix classes there is also the reverse_comm_variable() method that allows the communication to have a different amount of data per-atom. It invokes these corresponding callback methods:  

pack_reverse_comm_size() unpack_reverse_comm_size()  

which have extra arguments to specify the amount of data stored in the buffer for each atom.  

# 4.6. Communication patterns  

# 4.6.2 Higher level communication  

There are also several higher-level communication operations provided in LAMMPS which work for either brick or tiled decompositions. They may be useful for a new class to invoke if it requires more sophisticated communication than the forward and reverse methods provide. The 3 communication operations described here are  

• ring • irregular • rendezvous  

You can invoke these grep command in the LAMMPS src directory, to see a list of classes that invoke the 3 operations.  

• grep "\->ring" \*.cpp \*/\*.cpp • grep "irregular\->" \*.cpp • grep $"11\cdot>$ rendezvous" \*.cpp \*/\*.cpp  

# Ring operation  

The ring operation is invoked via the ring() method in the Comm class.  

Each processor first creates a buffer with a list of values, typically associated with a subset of the atoms it owns. Now think of the $P$ processors as connected to each other in a ring. Each processor $M$ sends data to the next $M{+}I$ processor. It receives data from the preceding M-1 processor. The ring is periodic so that the last processor sends to the first processor, and the first processor receives from the last processor.  

Invoking the ring() method passes each processor’s buffer in $P$ steps around the ring. At each step a callback method, provided as an argument to ring(), in the caller is invoked. This allows each processor to examine the data buffer provided by every other processor. It may extract values needed by its atoms from the buffers, or it may alter placeholder values in the buffer. In the latter case, when the ring operation is complete, each processor can examine its original buffer to extract modified values.  

Note that the ring operation is similar to an MPI_Alltoall() operation, where every processor effectively sends and receives data to every other processor. The difference is that the ring operation does it one step at a time, so the total volume of data does not need to be stored by every processor. However, the ring operation is also less efficient than MPI_Alltoall() because of the $P$ stages required. So it is typically only suitable for small data buffers and occasional operations that are not time-critical.  

# Irregular operation  

The irregular operation is provided by the Irregular class. What LAMMPS terms irregular communication is when each processor knows what data it needs to send to what processor, but does not know what processors are sending it data. An example is when load-balancing is performed and each processor needs to send some of its atoms to new processors.  

The Irregular class provides 5 high-level methods useful in this context:  

• create_data() • exchange_data() • create_atom() • exchange_atom() • migrate_atoms()  

For the create_data() method, each processor specifies a list of $N$ datums to send, each to a specified processor. Internally, the method creates efficient data structures for performing the communication. The exchange_data() method triggers the communication to be performed. Each processor provides the vector of $N$ datums to send, and the size of each datum. All datums must be the same size.  

The create_atom() and exchange_atom() methods are similar, except that the size of each datum can be different.   
Typically, this is used to communicate atoms, each with a variable amount of per-atom data, to other processors.  

The migrate_atoms() method is a convenience wrapper on the create_atom() and exchange_atom() methods to simplify communication of all the per-atom data associated with an atom so that the atom can effectively migrate to a new owning processor. It is similar to the exchange() method in the Comm class invoked when atoms move to neighboring processors (in the regular or tiled decomposition) during timestepping, except that it allows atoms to have moved arbitrarily long distances and still be properly communicated to a new owning processor.  

# Rendezvous operation  

Finally, the rendezvous operation is invoked via the rendezvous() method in the Comm class. Depending on how much communication is needed and how many processors a LAMMPS simulation is running on, it can be a much more efficient choice than the ring() method. It uses the irregular operation internally once or twice to do its communication. The rendezvous algorithm is described in detail in (Plimpton), including some LAMMPS use cases.  

For the rendezvous() method, each processor specifies a list of $N$ datums to send and which processor to send each of them to. Internally, this communication is performed as an irregular operation. The received datums are returned to the caller via invocation of callback function, provided as an argument to rendezvous(). The caller can then process the received datums and (optionally) assemble a new list of datums to communicate to a new list of specific processors. When the callback function exits, the rendezvous() method performs a second irregular communication on the new list of datums.  

Examples in LAMMPS of use of the rendezvous operation are the fix rigid/small and fix shake commands (for one-time identification of the rigid body atom clusters) and the identification of special_bond 1-2, 1-3 and 1-4 neighbors within molecules. See the special_bonds command for context.  

(Plimpton) Plimpton and Knight, JPDC, 147, 184-195 (2021).  

# 4.7 How a timestep works  

The first and most fundamental operation within LAMMPS to understand is how a timestep is structured. Timestepping is performed by calling methods of the Integrate class instance within the Update class. Since Integrate is a base class, it will point to an instance of a derived class corresponding to what is selected by the run_style input script command.  

In this section, the timestep implemented by the Verlet class is described. A similar timestep protocol is implemented by the Respa class, for the r-RESPA hierarchical timestepping method.  

The Min base class performs energy minimization, so does not perform a literal timestep. But it has logic similar to what is described here, to compute forces and invoke fixes at each iteration of a minimization. Differences between time integration and minimization are highlighted at the end of this section.  

The Verlet class is encoded in the src/verlet.cpp and verlet.h files. It implements the velocity-Verlet timestepping algorithm. The workhorse method is Verlet::run(), but first we highlight several other methods in the class.  

• The init() method is called at the beginning of each dynamics run. It simply sets some internal flags, based on user settings in other parts of the code. • The setup() or setup_minimal() methods are also called before each run. The velocity-Verlet method requires current forces be calculated before the first timestep, so these routines compute forces due to all atomic interactions, using the same logic that appears in the timestepping described next. A few fixes are also invoked, using the mechanism described in the next section. Various counters are also initialized before the run begins. The setup_minimal() method is a variant that has a flag for performing less setup. This is used when runs are continued and information from the previous run is still valid. For example, if repeated short LAMMPS runs  

are being invoked, interleaved by other commands, via the pre no and every options of the run command, the setup_minimal() method is used. • The force_clear() method initializes force and other arrays to zero before each timestep, so that forces (torques, etc) can be accumulated.  

Now for the Verlet::run() method. Its basic structure in hi-level pseudocode is shown below. In the actual code in src/verlet.cpp some of these operations are conditionally invoked.  

<html><body><table><tr><td>loop over N timesteps:</td></tr><tr><td>if timeout condition: break ev_set()</td></tr><tr><td>fix->initial _integrateO</td></tr><tr><td>fix->post_integrate()</td></tr><tr><td>nflag = neighbor->decide()</td></tr><tr><td>if nfag: fix->pre _exchange()</td></tr><tr><td>domain->pbc() domain->reset _box()</td></tr><tr><td>comm->setup()</td></tr><tr><td>neighbor->setup_bins() comm->exchange()</td></tr><tr><td>comm- >borders()</td></tr><tr><td>fix->pre_neighbor() neighbor->build()</td></tr><tr><td>fix->post _neighbor()</td></tr><tr><td>else:</td></tr><tr><td>comm->forward_comm()</td></tr><tr><td>force_clear()</td></tr><tr><td>fix->pre_force()</td></tr><tr><td></td></tr><tr><td>pair->compute() bond->compute()</td></tr><tr><td>angle->compute()</td></tr><tr><td>dihedral->compute()</td></tr><tr><td>improper->compute() kspace- >compute()</td></tr><tr><td></td></tr><tr><td>fix->pre_reverse()</td></tr><tr><td>comm->reverse_comm()</td></tr><tr><td>fix->post_force()</td></tr><tr><td>fix->final_integrate() fix->end_of_step()</td></tr><tr><td></td></tr><tr><td>if any output on this step:</td></tr><tr><td>output->write()</td></tr><tr><td># after loop fix->post_run()</td></tr></table></body></html>  

The ev_set() method (in the parent Integrate class), sets two flags (eflag and vflag) for energy and virial computation.  

Each flag encodes whether global and/or per-atom energy and virial should be calculated on this timestep, because some fix or variable or output will need it. These flags are passed to the various methods that compute particle interactions, so that they either compute and tally the corresponding data or can skip the extra calculations if the energy and virial are not needed. See the comments for the Integrate::ev_set() method, which document the flag values.  

At various points of the timestep, fixes are invoked, e.g. fix- $\scriptscriptstyle\textgreater$ initial_integrate(). In the code, this is actually done via the Modify class, which stores all the Fix objects and lists of which should be invoked at what point in the timestep. Fixes are the LAMMPS mechanism for tailoring the operations of a timestep for a particular simulation. As described elsewhere, each fix has one or more methods, each of which is invoked at a specific stage of the timestep, as show in the timestep pseudocode. All the active fixes defined in an input script, that are flagged to have an initial_integrate() method, are invoked at the beginning of each timestep. Examples are fix nve or fix nvt or fix npt which perform the start-of-timestep velocity-Verlet integration operations to update velocities by a half-step, and coordinates by a full step. The post_integrate() method is next for operations that need to happen immediately after those updates. Only a few fixes use this, e.g. to reflect particles off box boundaries in the FixWallReflect class.  

The decide() method in the Neighbor class determines whether neighbor lists need to be rebuilt on the current timestep (conditions can be changed using the neigh_modify every/delay/check command). If not, coordinates of ghost atoms are acquired by each processor via the forward_comm() method of the Comm class. If neighbor lists need to be built, several operations within the inner if clause of the pseudocode are first invoked. The pre_exchange() method of any defined fixes is invoked first. Typically, this inserts or deletes particles from the system.  

Periodic boundary conditions are then applied by the Domain class via its pbc() method to remap particles that have moved outside the simulation box back into the box. Note that this is not done every timestep, but only when neighbor lists are rebuilt. This is so that each processor’s subdomain will have consistent (nearby) atom coordinates for its owned and ghost atoms. It is also why dumped atom coordinates may be slightly outside the simulation box if not dumped on a step where the neighbor lists are rebuilt.  

The box boundaries are then reset (if needed) via the reset_box() method of the Domain class, e.g. if box boundaries are shrink-wrapped to current particle coordinates. A change in the box size or shape requires internal information for communicating ghost atoms (Comm class) and neighbor list bins (Neighbor class) to be updated. The setup() method of the Comm class and setup_bins() method of the Neighbor class perform the update.  

The code is now ready to migrate atoms that have left a processor’s geometric subdomain to new processors. The exchange() method of the Comm class performs this operation. The borders() method of the Comm class then identifies ghost atoms surrounding each processor’s subdomain and communicates ghost atom information to neighboring processors. It does this by looping over all the atoms owned by a processor to make lists of those to send to each neighbor processor. On subsequent timesteps, the lists are used by the Comm::forward_comm() method.  

Fixes with a pre_neighbor() method are then called. These typically re-build some data structure stored by the fix that depends on the current atoms owned by each processor.  

Now that each processor has a current list of its owned and ghost atoms, LAMMPS is ready to rebuild neighbor lists via the build() method of the Neighbor class. This is typically done by binning all owned and ghost atoms, and scanning a stencil of bins around each owned atom’s bin to make a Verlet list of neighboring atoms within the force cutoff plus neighbor skin distance.  

In the next portion of the timestep, all interaction forces between particles are computed, after zeroing the per-atom force vector via the force_clear() method. If the newton flag is set to on by the newton command, forces are added to both owned and ghost atoms, otherwise only to owned (aka local) atoms.  

Pairwise forces are calculated first, which enables the global virial (if requested) to be calculated cheaply (at O(N) cost instead of $\mathrm{O}(\mathrm{N}^{**}{}^{*}2)$ at the end of the Pair::compute() method), by a dot product of atom coordinates and forces. By including owned and ghost atoms in the dot product, the effect of periodic boundary conditions is correctly accounted for. Molecular topology interactions (bonds, angles, dihedrals, impropers) are calculated next (if supported by the current atom style). The final contribution is from long-range Coulombic interactions, invoked by the KSpace class.  

The pre_reverse() method in fixes is used for operations that have to be done before the upcoming reverse communication (e.g. to perform additional data transfers or reductions for data computed during the force computation and stored with ghost atoms).  

If the newton flag is on, forces on ghost atoms are communicated and summed back to their corresponding owned atoms. The reverse_comm() method of the Comm class performs this operation, which is essentially the inverse operation of sending copies of owned atom coordinates to other processor’s ghost atoms.  

At this point in the timestep, the total force on each (local) atom is known. Additional force constraints (external forces, SHAKE, etc) are applied by Fixes that have a post_force() method. The second half of the velocity-Verlet integration, final_integrate() is then performed (another half-step update of the velocities) via fixes like nve, nvt, npt.  

At the end of the timestep, fixes that contain an end_of_step() method are invoked. These typically perform a diagnostic calculation, e.g. the ave/time and ave/chunk fixes. The final operation of the timestep is to perform any requested output, via the write() method of the Output class. There are 3 kinds of LAMMPS output: thermodynamic output to the screen and log file, snapshots of atom data to a dump file, and restart files. See the thermo_style, dump, and restart commands for more details.  

The flow of control during energy minimization iterations is similar to that of a molecular dynamics timestep. Forces are computed, neighbor lists are built as needed, atoms migrate to new processors, and atom coordinates and forces are communicated to neighboring processors. The only difference is what Fix class operations are invoked when. Only a subset of LAMMPS fixes are useful during energy minimization, as explained in their individual doc pages. The relevant Fix class methods are min_pre_exchange(), min_pre_force(), and min_post_force(). Each fix is invoked at the appropriate place within the minimization iteration. For example, the min_post_force() method is analogous to the post_force() method for dynamics; it is used to alter or constrain forces on each atom, which affects the minimization procedure.  

After all iterations are completed, there is a cleanup step which calls the post_run() method of fixes to perform operations only required at the end of a calculation (like freeing temporary storage or creating final outputs).  

# 4.8 Writing new styles  

The Modifying & extending LAMMPS section of the manual gives an overview of how LAMMPS can be extended by writing new classes that derive from existing parent classes in LAMMPS. Here, some specific coding details are provided for writing code for LAMMPS.  

# 4.8.1 Writing new pair styles  

Pair styles are at the core of most simulations with LAMMPS, since they are used to compute the forces (plus energy and virial contributions, if needed) on atoms for pairs or small clusters of atoms within a given cutoff. This is often the dominant computation in LAMMPS, and sometimes even the only one. Pair styles can be grouped into multiple categories:  

1. simple pairwise additive interactions of point particles (e.g. Lennard-Jones, Morse, Buckingham)   
2. pairwise additive interactions of point particles with added Coulomb interactions or only the Coulomb interactions   
3. manybody interactions of point particles (e.g. EAM, Tersoff )   
4. complex interactions that include additional per-atom properties (e.g. Discrete Element Models (DEM), Peridynamics, Ellipsoids)   
5. special purpose pair styles that may not even compute forces like pair_style zero and pair_style tracker, or are a wrapper for multiple kinds of interactions like pair_style hybrid, pair_style list, and pair_style kim  

In the text below, we will discuss aspects of implementing pair styles in LAMMPS by looking at representative case studies. The design of LAMMPS allows developers to focus on the essentials, which is to compute the forces (and energies or virial contributions), enter and manage the global settings as well as the potential parameters, and the pair style specific parts of reading and writing restart and data files. Most of the complex tasks like management of the atom positions, domain decomposition and boundaries, or neighbor list creation are handled transparently by other parts of the LAMMPS code.  

As shown on the page for writing or extending pair styles, in order to implement a new pair style, a new class must be written that is either directly or indirectly derived from the Pair class. If that class is directly derived from Pair, there are three methods that must be re-implemented, since they are “pure” in the base class: Pair::compute(), Pair::settings(), Pair::coeff(). In addition, a custom constructor is needed. All other methods are optional and have default implementations in the base class (most of which do nothing), but they may need to be overridden depending on the requirements of the model.  

We are looking at the following cases:  

• Case 1: a pairwise additive model • Case 2: a many-body potential • Case 3: a potential requiring communication • Case 4: potentials without a compute() function  

# 4.8.2 Package and build system considerations  

In general, new pair styles should be added to the EXTRA-PAIR package unless they are an accelerated pair style and then they should be added to the corresponding accelerator package (GPU, INTEL, KOKKOS, OPENMP, OPT). If you feel that your contribution should be added to a different package, please consult with the LAMMPS developers first.  

The contributed code needs to support the traditional GNU make build process and the CMake build process. For the GNU make process and if the package has an Install.sh file, most likely that file needs to be updated to correctly copy the sources when installing the package and properly delete them when uninstalling. This is particularly important when added a new pair style that is a derived class from an existing pair style in a package, so that its installation depends on the the installation status of the package of the derived class. For the CMake process, it is sometimes necessary to make changes to the package specific CMake scripting in cmake/Modules/Packages.  

# 4.8.3 Case 1: a pairwise additive model  

In this section, we will describe the procedure of adding a simple pair style to LAMMPS: an empirical model that can be used to model liquid mercury. The pair style shall be called bond/gauss and the complete implementation can be found in the files src/EXTRA-PAIR/pair_born_gauss.cpp and src/EXTRA-PAIR/pair_born_gauss.h of the LAMMPS source code.  

# Model and general considerations  

The functional form of the model according to (Bomont) consists of a repulsive Born-Mayer exponential term and a emperature dependent, attractive Gaussian term.  

$$
E=A_{0}\exp{\left(-\alpha r\right)}-A_{1}\exp{\left[-\beta\left(r-r_{0}\right)^{2}\right]}
$$  

For the application to mercury, the following parameters are listed:  

$\begin{array}{l}{{\bullet A_{0}=8.2464\times10^{13}\mathrm{eV}}}\ {{\bullet\alpha=12.48\mathring{\mathrm{A}}^{-1}}}\ {{\bullet\beta=0.44\mathring{\mathrm{A}}^{-2}}}\ {{\bullet r_{0}=3.56\mathring{\mathrm{A}}}}\end{array}$   
• $A_{1}$ is temperature dependent and can be determined from $A_{1}=a_{0}+a_{1}T+a_{2}T^{2}$ with:   
$\begin{array}{l}{-~a_{0}=1.97475\times10^{-2}~\mathrm{eV}}\ {-~a_{1}=8.40841\times10^{-5}~\mathrm{eV}/\mathrm{K}}\end{array}$  

$$
-~a_{2}=-2.58717\times10^{-8}{\mathrm{eV}}/{\mathrm{K}}^{-2}
$$  

With the optional cutoff, this means we have a total of 5 or 6 parameters for each pair of atom types. Additionally, we need to input a default cutoff value as a global setting.  

Because of the combination of Born-Mayer with a Gaussian, the pair style shall be named “born/gauss” and thus the class name would be PairBornGauss and the source files pair_born_gauss.h and pair_born_gauss.cpp. Since this is a rather uncommon potential, it shall be added to the EXTRA-PAIR package.  

# Header file  

The first segment of any LAMMPS source should be the copyright and license statement. Note the marker in the first line to indicate to editors like emacs that this file is a $\mathrm{C}{+}{+}$ source, even though the .h extension suggests a C source (this is a convention inherited from the very beginning of the $\mathrm{C}{+}{+}$ version of LAMMPS).  

Every pair style must be registered in LAMMPS by including the following lines of code in the second part of the header after the copyright message and before the include guards for the class definition:  

# #ifdef PAIR_CLASS  

// clang-format off   
PairStyle(born/gauss,PairBornGauss); // clang-format on   
#else  

/\* the definition of the PairBornGauss class (see below) is inserted here \*  

#endif  

This block between #ifdef PAIR_CLASS and $\#$ else will be included by the Force class in force.cpp to build a map of “factory functions” that will create an instance of these classes and return a pointer to it. The map connects the name of the pair style, “born/gauss”, to the name of the class, PairBornGauss. During compilation, LAMMPS constructs a file style_pair.h that contains $\#$ include statements for all “installed” pair styles. Before including style_pair.h into force.cpp, the PAIR_CLASS define is set and the PairStyle(name,class) macro defined. The code of the macro adds the installed pair styles to the “factory map” which enables the pair_style command to create the pair style instance.  

The list of header files to include is automatically updated by the build system if there are new files, so the presence of the new header file in the src/EXTRA-PAIR folder and the enabling of the EXTRA-PAIR package will trigger LAMMPS to include the new pair style when it is (re-)compiled. The “// clang-format” format comments are needed so that running clang-format on the file will not insert unwanted blanks between “born”, “/”, and “gauss” which would break the PairStyle macro.  

The third part of the header file is the actual class definition of the PairBornGauss class. This has the prototypes for all member functions that will be implemented by this pair style. This includes a few required and a number of optional functions. All functions that were labeled in the base class as “virtual” must be given the “override” property, as it is done in the code shown below.  

The “override” property helps to detect unexpected mismatches because compilation will stop with an error in case the signature of a function is changed in the base class without also changing it in all derived classes. For example, if this change added an optional argument with a default value, then all existing source code calling the function would not need changes and still compile, but the function in the derived class would no longer override the one in the base class due to the different number of arguments and the behavior of the pair style is thus changed in an unintended way. Using the “override” keyword prevents such issues.  

#include "pair.h"  

namespace LAMMPS_NS { class PairBornGauss : public Pair { public: PairBornGauss(class LAMMPS $^*$ \~PairBornGauss() override;  

void compute(int, int) override;   
void settings(int, char $^{**}$ ) override;   
void coeff(int, char $^{**}$ ) override;   
double init_one(int, int) override; void write_restart(FILE $^*$ ) override;   
void read_restart(FILE \*) override;   
void write_restart_settings(FILE \*) override;   
void read_restart_settings(FILE \*) override;   
void write_data(FILE \*) override;   
void write_data_all(FILE \*) override; double single(int, int, int, int, double, double, double, double &) override;   
void \*extract(const char \*, int $\&$ ) override;  

Also, variables and arrays for storing global settings and potential parameters are defined. Since these are internal to the class, they are placed after a “protected:” label.  

#  

protected: double cut_global; double \*\*cut; double $^{**}$ biga0, \*\*alpha, $^{**}$ biga1, $^{**}$ beta, $\ast\ast_{\mathrm{r0}}$ ; double $^{**}{\mathrm{a0}}$ , $^{\ast\ast}{\mathrm{a}}1$ , $^{\ast\ast}{\mathrm{a2}}$ ; double \*\*offset; virtual void allocate();   
};   
} namespace LAMMPS_NS   
#endif  

# Implementation file  

We move on to the implementation of the PairBornGauss class in the pair_born_gauss.cpp file. This file also starts with a LAMMPS copyright and license header. Below that notice is typically the space where comments may be added with additional information about this specific file, the author(s), affiliation(s), and email address(es). This way the contributing author(s) can be easily contacted, when there are questions about the implementation later. Since the file(s) may be around for a long time, it is beneficial to use some kind of “permanent” email address, if possible.  

LAMMPS - Large-scale Atomic/Molecular Massively Parallel Simulator https://www.lammps.org/, Sandia National Laboratories LAMMPS development team: developers@lammps.org  

Copyright (2003) Sandia Corporation. Under the terms of Contract DE-AC04-94AL85000 with Sandia Corporation, the U.S. Government retains certain rights in this software. This software is distributed under the GNU General Public License.  

See the README file in the top-level LAMMPS directory.  

// Contributing author: Axel Kohlmeyer, Temple University, akohlmey@gmail.com  

#include "pair_born_gauss.h"  

#include "atom.h" #include "comm.h" #include "error.h" #include "fix.h" #include "force.h" #include "memory.h" #include "neigh_list.h"  

#include <cmath> #include <cstring> using namespace LAMMPS_NS;  

The second section of the implementation file has various include statements. The include file for the class header has to come first, then a block of LAMMPS classes (sorted alphabetically) followed by a block of system headers and others, if needed. Note the standardized $\mathrm{C}{+}{+}$ notation for headers of C-library functions (cmath instead of math.h). The final statement of this segment imports the LAMMPS_NS:: namespace globally for this file. This way, all LAMMPS specific functions and classes do not have to be prefixed with LAMMPS_NS::.  

# Constructor and destructor (required)  

The first two functions in the implementation source file are typically the constructor and the destructor.  

Pair styles are different from most classes in LAMMPS that define a “style”, as their constructor only uses the LAMMPS class instance pointer as an argument, but not the arguments of the pair_style command. Instead, those arguments are processed in the Pair::settings() function (or rather the version in the derived class). The constructor is the place where global defaults are set and specifically flags are set indicating which optional features of a pair style are available.  

![](images/ad864c1d9a7a4e5f5963af918aaeca0e518d2e2dea270f21178dd9e1c76aa3b8.jpg)  

<html><body><table><tr><td></td><td>continuedfrompreviouspage</td></tr><tr><td>PairBornGauss::PairBornGauss (LAMMPS *lmp) : Pair(lmp)</td><td></td></tr><tr><td></td><td></td></tr><tr><td>writedata =1;</td><td></td></tr><tr><td></td><td></td></tr></table></body></html>  

The writedata $=I$ ; statement indicates that the pair style is capable of writing the current pair coefficient parameters to data files. That is, the class implements specific versions for Pair::data() and Pair::data_all(). Other statements that could be added here would be single_enable $=I$ ; or respa_enable $\mathbf{\nabla}=0$ ; to indicate that the Pair::single() function is present and the Pair::compute_(inner|middle|outer) functions are not, but those are also the default settings and already set in the base class.  

In the destructor, we need to delete all memory that was allocated by the pair style, usually to hold force field parameters that were entered with the pair_coeff command. Most of those array pointers will need to be declared in the derived class header, but some (e.g. setflag, cutsq) are already declared in the base class.  

<html><body><table><tr><td>PairBornGauss:~PairBornGaussO)</td></tr><tr><td>if (allocated){</td></tr><tr><td>memory->destroy(setflag);</td></tr><tr><td>memory->destroy(cutsq);</td></tr><tr><td>memory->destroy(cut);</td></tr><tr><td>memory->destroy(biga0);</td></tr><tr><td>memory- >destroy(alpha) ;</td></tr><tr><td>memory->destroy(biga1);</td></tr><tr><td>memory->destroy(beta); memory- >destroy(r0);</td></tr><tr><td>memory- >destroy(offset);</td></tr><tr><td></td></tr></table></body></html>  

# Settings and coefficients (required)  

To enter the global pair style settings and the pair style parameters, the functions Pair::settings() and Pair::coeff() need to be re-implemented. The arguments to the settings() function are the arguments given to the pair_style command. Normally, those would already be processed as part of the constructor, but moving this to a separate function allows users to change global settings like the default cutoff without having to reissue all pair_coeff commands or re-read the Pair Coeffs sections from the data file. In the settings() function, also the arrays for storing parameters, to define cutoffs, track which pairs of parameters have been explicitly set and allocated and, if needed, initialized. In this case, the memory allocation and initialization are moved to a function allocate().  

<html><body><table><tr><td>* allocate all arrays</td></tr><tr><td>void PairBornGauss::allocate</td></tr><tr><td></td></tr><tr><td>allocated =</td></tr><tr><td>int np1 atom->ntypes + 1;</td></tr><tr><td></td></tr><tr><td>memory->create(setflag, npl, np1, "pair:setfag"); for (int i = 1; i < npl; i++)</td></tr><tr><td>for (int j = i; j < npl; j++) setfaglil[j] = O;</td></tr></table></body></html>  

# 4.8. Writing new styles  

(continued from previous page)  

![](images/25a1eb68da9e316934ddb414e94bd85c8d52164376fb6d85d517e88f62166833.jpg)  

The arguments to the coeff() function are the arguments to the pair_coeff command. The function is also called when processing the Pair Coeffs or PairIJ Coeffs sections of data files. In the case of the Pair Coeffs section, there is only one atom type per line and thus the first argument is duplicated. Since the atom type arguments of the pair_coeff command may be a range (e.g. $^{*3}$ for atom types 1, 2, and 3), the corresponding arguments are passed to the utils::bounds() function which will then return the low and high end of the range. Note that the setflag array is set to 1 for all pairs of atom types processed by this call. This information is later used in the init_one() function to determine if any coefficients are missing and, if supported by the potential, generate those missing coefficients from the selected mixing rule.  

set coeffs for one or more type pairs   
void PairBornGauss::coeff(int narg, char \*\*arg)   
if (narg < 7 || narg $>8$ ) error- $>$ all(FLERR, "Incorrect args for pair coefficients"); if (!allocated) allocate(); int ilo, ihi, jlo, jhi; utils::bounds(FLERR, arg[0], 1, atom- $\scriptscriptstyle\textgreater$ ntypes, ilo, ihi, error); utils::bounds(FLERR, arg[1], 1, atom- $\scriptscriptstyle\textgreater$ ntypes, jlo, jhi, error); double biga0_one = utils::numeric(FLERR, arg[2], false, lmp);   
double alpha_one = utils::numeric(FLERR, arg[3], false, lmp); (continues on next page)  

(continued from previous page)  

double biga1 one = utils::numeric(FLERR, arg[4], false, lmp);   
double beta_one = utils::numeric(FLERR, arg[5], false, lmp);   
double r0_one = utils::numeric(FLERR, arg[6], false, lmp);   
double cut_one = cut_global;   
if ( $\mathrm{narg==10}$ ) cut_one $=$ utils::numeric(FLERR, arg[7], false, lmp);   
int count = 0;   
for (int i = ilo; i <= ihi; i++) { for $\mathrm{{(int~j=MAX(jlo,~i);~j~<=jhi;~j++)}~}\{$ { biga0[i][j] = biga0_one; alpha[i][j] = alpha_one; biga1[i][j] = biga1_one; beta[i][j] = beta_one; r0[i][j] = r0_one; cut[i][j] = cut_one; setflag[i][j] = 1; count++; }   
}   
if $(\mathrm{count}==0\$ ) error- $\scriptscriptstyle\bigcirc$ all(FLERR, "Incorrect args for pair coefficients");   
}  

# Initialization  

The init_one() function is called during the “init” phase of a simulation. This is where potential parameters are checked for completeness, derived parameters computed (e.g. the “offset” of the potential energy at the cutoff distance for use with the pair_modify shift yes command). If a pair style supports generating “mixed” parameters (i.e. where both atoms of a pair have a different atom type) using a “mixing rule” from the parameters of the type with itself, this is the place to compute and store those mixed values. The born/gauss pair style does not support mixing, so we only check for completeness. Another purpose of the init_one() function is to symmetrize the potential parameter arrays. The return value of the function is the cutoff for the given pair of atom types. This information is used by the neighbor list code to determine the largest cutoff and then build the neighbor lists accordingly.  

<html><body><table><tr><td>init for one type pair i,j and corresponding ji</td></tr><tr><td>double PairBornGauss::init _one(int i, int j)</td></tr><tr><td>(as o  so d n 'T<- ( == [ls) !</td></tr><tr><td></td></tr><tr><td>if (offset_fag) { double dr = cut[il[j] - rO[illj];</td></tr><tr><td>offset[i][j] = biga0[i]lj] * exp(-alpha[i][j] * cut[i][j]) - bigal[i]lj] * exp(-beta[i][j] * dr * dr);</td></tr><tr><td>else offset[il[j] = 0.0;</td></tr><tr><td>biga0[j][] = biga0[i][j];</td></tr><tr><td>alpha[j]lil = alpha[il[j];</td></tr><tr><td>bigal[j]i] = bigal[i[];</td></tr></table></body></html>  

(continued from previous page)  

beta[j][i] = beta[i][j];   
r0[j][i] = r0[i][j];   
offset[j][i] $=$ offset[i][j];   
return cut[i][j];  

# Computing forces from the neighbor list (required)  

The compute() function is the “workhorse” of a pair style. This is where we have the nested loops over all pairs of particles from the neighbor list to compute forces and - if needed - energies and virials.  

The first part is to define some variables for later use and store cached copies of data or pointers that we need to access frequently. Also, this is a good place to call Pair::ev_init(), which initializes several flags derived from the eflag and vflag parameters signaling whether the energy and virial need to be tallied and whether only globally or also per-atom.  

void PairBornGauss::compute(int eflag, int vflag) int i, j, ii, jj, inum, jnum, itype, jtype;   
double xtmp, ytmp, ztmp, delx, dely, delz, evdwl, fpair;   
double rsq, r, dr, aexp, bexp, factor_lj;   
int \*ilist, \*jlist, $^*$ numneigh, \*\*firstneigh; evdwl = 0.0; ev_init(eflag, vflag);   
double \*\*x = atom->x ;   
double \*\*f = atom- $\scriptscriptstyle\bigcirc$ f;   
int \*type = atom- $\scriptscriptstyle\bigcirc$ type;   
int nlocal = atom- $\scriptscriptstyle\textgreater$ nlocal;   
double $\mathrm{^{\ast}s p e c i a l\_l j=f o r c e}\mathrm{-special\_lj;}$   
int newton_pair = force- $>$ newton_pair;   
inum = list->inum;   
ilist = list->ilist; numneigh $=$ list- $\scriptscriptstyle\bigcirc$ numneigh;   
firstneigh $=$ list->firstneigh;  

The outer loop (index $i$ ) is over local atoms of our sub-domain. Typically, the value of inum (the number of neighbor lists) is the same as the number of local atoms ( $\mathbf{\check{\rho}}=$ atoms owned by this sub-domain). But when the pair style is used as a sub-style of a hybrid pair style or neighbor list entries are removed with neigh_modify exclude, this number may be smaller. The array list- $\cdot>$ ilist has the (local) indices of the atoms for which neighbor lists have been created. Then list- $\scriptscriptstyle\textgreater$ numneigh is an inum sized array with the number of entries of each list of neighbors, and list- $\scriptscriptstyle\textgreater$ firstneigh is a list of pointers to those lists.  

For efficiency reasons, cached copies of some properties of the outer loop atoms are also initialized.  

/ loop over neighbors of my atoms for (ii = 0; ii < inum; ii++) { $\mathrm{i}=$ ilist[ii];  

(continues on next page)  

(continued from previous page)  

$\mathrm{{xtmp}=x\vert i\vert\vert0\vert;}$ ;   
$\mathrm{{ytmp}=x[i][1];}$ ;   
$\mathrm{ztmp}=\mathrm{x}[\mathrm{i}][\mathrm{2}]$ ;   
itype $=$ type[i];   
jlist $=$ firstneigh[i];   
jnum = numneigh[i];  

The inner loop (index $j$ ) processes the neighbor lists. The neighbor list code encodes extra information using the upper 3 bits. The 2 highest bits encode whether a pair is a regular pair of neighbor $(=0)$ or a pair of $1-2~(=1)$ , $1-3(=2)$ , or 1-4 $(=3)$ ) “special” neighbor. The next highest bit encodes whether the pair stores data in a fix neigh/history instance (an undocumented internal fix style). The sbmask() inline function extracts those bits and converts them into a number. This number is used to look up the corresponding scaling factor for the non-bonded interaction from the force- $>$ special_lj array and stores it in the factor_lj variable. Due to the additional bits, the value of $j$ would be out of range when accessing data from per-atom arrays, so we apply the NEIGHMASK constant with a bit-wise and operation to mask them out. This step must be done, even if a pair style does not use special bond scaling of forces and energies to avoid segmentation faults.  

With the corrected $j$ index, it is now possible to compute the distance of the pair. For efficiency reasons, the square root is only taken after the check for the cutoff (which has been stored as squared cutoff by the Pair base class). For some pair styles, like the 12-6 Lennard-Jones potential, computing the square root can be avoided entirely.  

for (jj = 0; jj < jnum; jj++) { $\mathrm{j}=\mathrm{jlist}[\mathrm{jj}]$ ;   
factor_lj = special_lj[sbmask(j)];   
$\begin{array}{r}{\mathrm{j}\&=\mathrm{NEIGHMASK};}\end{array}$ ;   
delx = xtmp - x[j][0];   
$\mathrm{{dely}=y t m p-x[j][1];}$ ;   
$\mathrm{{delz}=z t m p-x[j][2]}$ ];   
rsq = delx \* delx + dely \* dely + delz \* delz;   
$\mathrm{jtype}=\mathrm{type}[\mathrm{j}]$ ;  

The following block of code is the actual application of the model potential to compute the force. Note, that fpair is the pair-wise force divided by the distance, as this simplifies the projection of the $\mathbf{X}\mathbf{-}$ , y-, and $\mathbf{Z}$ -components of the force vector by simply multiplying with the respective distances in those directions.  

if (rsq < cutsq[itype][jtype]) { $\mathrm{r}=\mathrm{sqrt}(\mathrm{rsq})$ ;   
dr = r - r0[itype][jtype]; aexp = biga0[itype][jtype] \* exp(-alpha[itype][jtype] \* r);   
bexp $=$ biga1[itype][jtype] \* exp(-beta[itype][jtype] \* dr \* dr);   
fpair $=$ alpha[itype][jtype] \* aexp;   
fpair -= 2.0 \* beta[itype][jtype] \* dr \* bexp;   
fpair $^{*}=$ factor_lj / r;  

In the next block, the force is added to the per-atom force arrays. This pair style uses a “half” neighbor list (each pair is listed only once) so we take advantage of the fact that $\vec{F}_{i j}=-\vec{F}_{j i}$ , i.e. apply Newton’s third law. The force is always stored when the atom is a “local” atom. Index $i$ atoms are always “local” (i.e. $i<$ nlocal); index $j$ atoms may be “ghost” atoms $(j>=\mathrm{nlocal})$ .  

Depending on the settings used with the newton command, those pairs are only listed once globally (newton_pair $==$ 1), then forces must be stored even with ghost atoms and after all forces are computed a “reverse communication” is performed to add those ghost atom forces to their corresponding local atoms. If the setting is disabled, then the extra communication is skipped, since for pairs straddling sub-domain boundaries, the forces are computed twice and only  

stored with the local atoms in the domain that owns it.  

f[i][0] += delx \* fpair; f[i][1] $\mathrm{{\ell}}=\mathrm{dely}^{\mathrm{~*~}}$ fpair; f[i][2] $\mathrm{-=delz^{\ast}}$ fpair; if (newton_pair $||\mathbf{j}<\mathrm{nlocal}\rangle$ ) { f[j][0 $\mathrm{\upharpoonright~{-}=d e l x~^{\ast}}$ fpair; f[j][1] $-=$ dely \* fpair; f[j][2] $\mathrm{-=delz^{\mathrm{~*~}}}$ fpair; }  

The ev_tally() function tallies global or per-atom energy and virial. For typical MD simulations, the potential energy is merely a diagnostic and only needed on output. Similarly, the pressure may only be computed for (infrequent) thermodynamic output. For all timesteps where this information is not needed either, eflag or evflag are zero and the computation and call to the tally function skipped. Note that evdwl is initialized to zero at the beginning of the function, so that it still is valid to access it, even if the energy is not computed (e.g. when only the virial is needed).  

if (eflag) evdwl $=$ factor_lj \* (aexp - bexp - offset[itype][jtype]); if (evflag) ev_tally(i, j, nlocal, newton_pair, evdwl, 0.0, fpair, delx, dely, delz); } } }  

If only the global virial is needed and no energy, then calls to $\mathrm{ev\_tally()}$ can be avoided altogether, and the global virial can be computed more efficiently from the dot product of the total per-atom force vector and the position vector of the corresponding atom, ${\vec{F}}\cdot{\vec{r}}.$ . This has to be done after all pair-wise forces are computed and before the reverse communication to collect data from ghost atoms, since the position has to be the position that was used to compute the force, i.e. not the “local” position if that ghost atom is a periodic copy.  

<html><body><table><tr><td>if (vflag_fdotr) ) virial_fdotr_compute();</td></tr><tr><td></td></tr></table></body></html>  

# Computing force and energy for a single pair  

Certain features in LAMMPS only require computing interactions between individual pairs of atoms and the (optional) single() function is needed to support those features (e.g. for tabulation of force and energy with pair_write). This is a repetition of the force kernel in the compute() function, but only for a single pair of atoms, where the (squared) distance is provided as a parameter (so it may not even be an existing distance between two specific atoms). The energy is returned as the return value of the function and the force as the fforce reference. Note, that this is, similar to how fpair is used in the compute() function, the magnitude of the force along the vector between the two atoms divided by the distance.  

The single() function is optional, but it is expected to be implemented for any true pair-wise additive potential. Manybody potentials and special case potentials do not implement it. In a few special cases (EAM, long-range Coulomb), the single() function implements the pairwise additive part of the complete force interaction and depends on either pre-computed properties (derivative of embedding term for EAM) or post-computed non-pair-wise force contributions (KSpace style in case of long-range Coulomb).  

The member variable single_enable should be set to 0 in the constructor, if it is not implemented (its default value is 1).  

double PairBornGauss::single(int /\*i\*/, int /\*j\*/, int itype, int jtype, double rsq, double /\*factor_coul\*/, double factor_lj, double &fforce)  

(continues on next page)  

(continued from previous page)  

double r, dr, aexp, bexp;   
r = sqrt(rsq);   
dr = r - r0[itype][jtype];   
aexp = biga0[itype][jtype] \* exp(-alpha[itype][jtype] \* r);   
bexp = biga1[itype][jtype] \* exp(-beta[itype][jtype] \* dr \* dr);   
fforce = factor_lj \* (alpha[itype][jtype] \* aexp - 2.0 \* dr \* beta[itype][jtype] \* bexp) / r;   
return factor_lj \* (aexp - bexp - offset[itype][jtype]);  

# Reading and writing of restart files  

Support for writing and reading binary restart files is provided by the following four functions. Writing is only done by MPI processor rank 0. The output of global (not related to atom types) settings is usually delegated to the write_restart_settings() function. This restart facility is commonly only used, if there are small number of per-type parameters. For potentials that use per-element parameters or tabulated data and read these from files, those parameters and the name of the potential file are not written to restart files and the pair_coeff command has to re-issued when restarting. For pair styles like “born/gauss” that do support writing to restart files, this is not required.  

Implementing the functions to read and write binary restart files is optional. The member variable restartinfo should be set to 0 in the constructor, if they are not implemented (its default value is 1).  

<html><body><table><tr><td></td></tr><tr><td>proc O writes to restart file</td></tr><tr><td>void PairBornGauss:write_restart(FILE *fp)</td></tr><tr><td></td></tr><tr><td>write_restart _settings(fp);</td></tr><tr><td></td></tr><tr><td>int i, j;</td></tr><tr><td>for (i = 1; i <= atom->ntypes; i++) {</td></tr><tr><td></td></tr><tr><td>for (j = i; j <= atom->ntypes; j++) {</td></tr><tr><td>fwrite(&setflag[il[j], sizeof(int), 1, fp);</td></tr><tr><td>if (setflagil[j]){</td></tr><tr><td>fwrite(&biga0[ilj], sizeof(double), 1, fp);</td></tr><tr><td>fwrite(&alpha[il[ij], sizeof(double), 1, fp);</td></tr><tr><td>fwrite(&bigal[illj], sizeof(double), 1, fp);</td></tr><tr><td>fwrite(&beta[illj], sizeof(double), 1, fp);</td></tr><tr><td>fwrite(&r0lillj], sizeof(double), 1, fp);</td></tr><tr><td>fwrite(&cut[ilj], sizeof(double), 1, fp);</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td>proc O writes to restart file</td></tr><tr><td></td></tr><tr><td></td></tr></table></body></html>  

(continued from previous page)  

void PairBornGauss::write_restart_settings(FILE \*fp)   
{ fwrite(&cut_global, sizeof(double), 1, fp); fwrite(&offset_flag, sizeof(int), 1, fp); fwrite(&mix_flag, sizeof(int), 1, fp);   
}  

Similarly, on reading, only MPI processor rank 0 has opened the restart file and will read the data. The data is then distributed across all parallel processes using calls to MPI_Bcast(). Before reading atom type specific data, the corresponding storage needs to be allocated. Order and number or storage size of items read must be exactly the same as when writing, or else the data will be read incorrectly.  

Reading uses the utils::sfread utility function to detect read errors and short reads, so that LAMMPS can abort if that happens, e.g. when the restart file is corrupted.  

proc 0 reads from restart file, bcasts   
void PairBornGauss::read_restart(FILE \*fp)   
{   
read_restart_settings(fp);   
allocate();   
int i, j;   
int me = comm- $\scriptscriptstyle\bigcirc$ me;   
for ( $\mathrm{i}=1$ ; i <= atom- $\scriptscriptstyle\textgreater$ ntypes; i++) { for (j = i; j $<=\mathrm{atom}-\mathrm{>nty}$ pes; j++) { if ( $\mathrm{me=}=0$ ) utils::sfread(FLERR, &setflag[i][j], sizeof(int), 1, fp, nullptr, error); MPI_Bcast(&setflag[i][j], 1, MPI_INT, 0, world); if (setflag[i][j]) { if $\mathrm{me==0}$ ) { utils::sfread(FLERR, &biga0[i][j], sizeof(double), 1, fp, nullptr, error); utils::sfread(FLERR, &alpha[i][j], sizeof(double), 1, fp, nullptr, error); utils::sfread(FLERR, &biga1[i][j], sizeof(double), 1, fp, nullptr, error); utils::sfread(FLERR, &beta[i][j], sizeof(double), 1, fp, nullptr, error); utils::sfread(FLERR, &r0[i][j], sizeof(double), 1, fp, nullptr, error); utils::sfread(FLERR, &cut[i][j], sizeof(double), 1, fp, nullptr, error); } MPI_Bcast(&biga0[i][j], 1, MPI_DOUBLE, 0, world); MPI_Bcast(&alpha[i][j], 1, MPI_DOUBLE, 0, world); MPI_Bcast(&biga1[i][j], 1, MPI_DOUBLE, 0, world); MPI_Bcast(&beta[i][j], 1, MPI_DOUBLE, 0, world); MPI_Bcast(&r0[i][j], 1, MPI_DOUBLE, 0, world); MPI_Bcast(&cut[i][j], 1, MPI_DOUBLE, 0, world); } proc 0 reads from restart file, bcasts (continues on next page)  

(continued from previous page)  

<html><body><table><tr><td>void PairBornGauss:read _restart _settings(FILE *fp) if (comm->me == 0{ utils:sfread(FLERR, &cut _global, sizeof(double), 1, fp, nullptr, error); utils:sfread(FLERR, &offset _fag, sizeof(int), 1, fp, nullptr, error); utils:sfread(FLERR, &mix_fag, sizeof(int), 1, fp, nullptr, error); MPI_Bcast(&cut _global, 1, MPI_DOUBLE, 0, world); MPI Bcast(&offset _fag, 1, MPI_INT, 0, world);</td><td></td></tr></table></body></html>  

# Writing coefficients to data files  

The write_data() and write_data_all() functions are optional and write out the current state of the pair_coeff settings as “Pair Coeffs” or “PairIJ Coeffs” sections to a data file when using the write_data command. The write_data() only writes out the diagonal elements of the pair coefficient matrix, as that is required for the format of the “Pair Coeffs” section. It is called when the “pair” option of the write_data command is “ii” (the default). This is suitable for force fields where all off-diagonal terms of the pair coefficient matrix are generated from mixing. If explicit settings for off-diagonal elements were made, LAMMPS will print a warning, as those would be lost. To avoid this, the “pair ij” option of write_data can be used which will trigger calling the write_data_all() function instead, which will write out all settings of the pair coefficient matrix (regardless of whether they were originally created from mixing or not).  

These data file output functions are only useful for true pair-wise additive potentials, where the potential parameters can be entered through multiple pair_coeff commands. Pair styles that require a single “pair_coeff \* \*” command are not compatible with reading their parameters from data files. For pair styles like born/gauss that do support writing to data files, the potential parameters will be read from the data file, if present, and pair_coeff commands may not be needed.  

The member variable writedata should be set to 1 in the constructor, if these functions are implemented (the default value is 0).  

<html><body><table><tr><td>proc O writes to data file</td></tr><tr><td>void PairBornGauss:write_data(FILE *fp)</td></tr><tr><td>for (int i = 1; i <= atom->ntypes; i++)</td></tr><tr><td>“[![]eeq ‘[[!1eq ‘[![eqde “[！[oeq ‘ ‘u\8% S% S% % % P% ‘dy)nud] r0[i[i);</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td>proc 0 writes all pairs to data file</td></tr><tr><td></td></tr><tr><td>void PairBornGauss:write_data_all(FILE *fp)</td></tr><tr><td></td></tr></table></body></html>  

# 4.8. Writing new styles  

<html><body><table><tr><td>(continuedfrompreviouspage)</td></tr><tr><td>“[![1e8q “[![eqde “[![!oeq “ ! ‘u\8% S% 8% 8% 8% S% P% P% ‘d)u1d]</td></tr><tr><td></td></tr><tr><td>beta[il[j], rO[i][j], cut[i][j]);</td></tr><tr><td></td></tr></table></body></html>  

# Give access to internal data  

The purpose of the extract() function is to facilitate access to internal data of the pair style by other parts of LAMMPS. One possible application is to use fix adapt to gradually change potential parameters during a run. Here, we implement access to the pair coefficient matrix parameters.  

<html><body><table><tr><td>void *PairBornGauss::extract(const char *str, int &dim)</td></tr><tr><td></td></tr><tr><td>dim = 2;</td></tr><tr><td>if (strcmp(str,' "biga0" return void * biga0;</td></tr><tr><td>if (strcmp(str, "bigal" 0 return (void 1 *) bigal;</td></tr><tr><td>if (strcmp(str, (0I return (void *) r0; return nullptr;</td></tr></table></body></html>  

Since the mercury potential, for which we have implemented the born/gauss pair style, has a temperature dependent parameter “biga1”, we can automatically adapt the potential based on the Taylor-MacLaurin expansion for “biga1” when performing a simulation with a temperature ramp. LAMMPS commands for that application are given below:  

<html><body><table><tr><td>variable tloi index 300.0</td></tr><tr><td>variable thi index 600.0</td></tr><tr><td>variable e temp equal ramp(v tlo,v_thi)</td></tr><tr><td>variable bigal equal (-2.58717e-8*v temp+8.40841e-5)*v_t temp+1.97475e-2</td></tr><tr><td>fix 1 all nvt temp ${tlo} ${thi} 0.1</td></tr><tr><td>fix 2 all adapt 1 pair born : biga1 △** gauss bigal</td></tr></table></body></html>  

# 4.8.4 Case 2: a many-body potential  

Since there is a detailed description of the purpose and general layout of a pair style in the previous case, we will focus on where the implementation of a typical many-body potential differs from a pair-wise additive potential. We will use the implementation of the Tersoff potential as pair_style tersoff as an example. The complete implementation can be found in the files src/MANYBODY/pair_tersoff.cpp and src/MANYBODY/pair_tersoff.h of the LAMMPS source code.  

# Constructor  

In the constructor, several pair style flags must be set differently for many-body potentials:  

• the potential is not pair-wise additive, so the single() function cannot be used. This is indicated by setting the single_enable member variable to 0 (default value is 1)   
• many-body potentials are usually not written to binary restart files. This is indicated by setting the member variable restartinfo to 0 (default is 1)   
• many-body potentials typically read all parameters from a file which stores parameters indexed with a string (e.g. the element). For this, only a single pair_coeff \* \* command is allowed. This requirement is set and checked for, when the member variable one_coeff is set to 1 (default value is 0)  

• many-body potentials can produce incorrect results if pairs of atoms are excluded from the neighbor list, e.g. explicitly by neigh_modify exclude or implicitly through defining bonds, angles, etc. and having a special_bonds setting that is not “special_bonds lj/coul 1.0 1.0 1.0”. LAMMPS will check for this and print a suitable warning, when the member variable manybody_flag is set to 1 (default value is 0).  

PairTersoff::PairTersoff(LAMMPS \*lmp) : Pair(lmp)   
{ single_enable = 0; restartinfo $=0$ ;   
one_coeff = 1; manybody_flag = 1;  

# Neighbor list request  

For computing the three-body interactions of the Tersoff potential a “full” neighbor list (both atoms of a pair are listed in each other’s neighbor list) is required. By default a “half” neighbor list is requested (each pair is listed only once). The request is made in the init_style() function. A more in-depth discussion of neighbor lists in LAMMPS and how to request them is in this section of the documentation  

Also, additional conditions must be met for some global settings which are checked in the init_style() function.  

<html><body><table><tr><td>米 init specific to this pair style</td></tr><tr><td></td></tr><tr><td>void PairTersoff:init _style()</td></tr><tr><td></td></tr><tr><td>if (atom->tag_enable 0 error->all(FLERR,"Pair style Tersoff requires atom IDs");</td></tr><tr><td>if (force->newton _pair == 0)</td></tr><tr><td>error->all(FLERR,"Pair style Tersoff requires newton pair on");</td></tr><tr><td>need a full neighbor list</td></tr><tr><td>neighbor->add _request(this,NeighConst:REQ _FULL);</td></tr></table></body></html>  

# Computing forces from the neighbor list  

Computing forces for a many-body potential is usually more complex than for a pair-wise additive potential and there are multiple components. For Tersoff, there is a pair-wise additive two-body term (two nested loops over indices $i$ and $j,$ and a three-body term (three nested loops over indices $i,j,$ and $k$ ). Since the neighbor list has all neighbors up to the maximum cutoff (for the two-body term), but the three-body interactions have a significantly shorter cutoff, a “short neighbor list” is also constructed at the same time while computing the two-body term and looping over the neighbor list for the first time.  

if (rsq $<$ cutshortsq) {   
neighshort[numshort++] = j;   
if (numshort $>=$ maxshort) { maxshort $+=$ maxshort/2; memory- $\scriptscriptstyle\bigcirc$ grow(neighshort,maxshort,"pair:neighshort");   
}   
}  

# 4.8. Writing new styles  

For the two-body term, only a half neighbor list would be needed, even though we have requested a full list (for the three-body loops). Rather than computing all interactions twice, we skip over half of the entries. This is done in a slightly complex way to make certain the same choice is made across all subdomains and so that there is no load imbalance introduced.  

$\sqrt{{\mathrm{jtag}}=\mathrm{tag}[{\mathrm{j}}]}$ ;   
if (itag > jtag) $\{$   
if ((itag+jtag) % 2 == 0) continue;   
$\}$ else if (itag $<$ jtag) {   
if ((itag+jtag) % 2 == 1) continue;   
$\}$ else $\{$   
if $(\mathrm{x|j|[2]<x[i][2]}),$ ) continue;   
if $(\mathrm{x[j][2]}\mathrm{~=-ztmp}\&\&\mathrm{x[j][1]<ytmp})$ continue;   
if $(\mathbf{x}[\mathbf{j}][2]==\mathbf{z}\mathbf{tmp}\&\&\mathbf{x}[\mathbf{j}][1]==\mathbf{y}\mathbf{tmp}\&\&\mathbf{x}[\mathbf{j}][0]<\mathbf{x}\mathbf{tmp})$ continue; }  

For the three-body term, there is one additional nested loop and it uses the “short” neighbor list, accumulated previously  

// three-body interactions   
// skip immediately if I-J is not within cuto   
double fjxtmp,fjytmp,fjztmp;   
for (jj = 0; jj $<$ numshort; jj++) {   
j = neighshort[jj];   
jtype = map[type[j]];   
[...] for ( $\mathrm{kk}=0$ ; kk < numshort; kk++) { if $(\mathrm{j})==\mathrm{kk}$ ) continue; $\mathrm{k}=\mathrm{neighshort}[\mathrm{kk}]$ ; $\mathrm{ktype}=\mathrm{map}[\mathrm{type}[\mathrm{k}]]$ ; [...]   
}   
[...]  

# Reading potential parameters  

For the Tersoff potential, the parameters are listed in a file and associated with triples of elements. Because we have set the one_coeff flag to 1 in the constructor, there may only be a single pair_coeff \* \* line in the input for this pair style, and as a consequence the coeff() function will only be called once. Thus, the coeff() function has to do three tasks, each of which is delegated to a function in the PairTersoff class:  

1. map elements to atom types. Those follow the potential file name in the command arguments and are processed by the map_element2type() function.   
2. read and parse the potential parameter file in the read_file() function.   
3. Build data structures where the original and derived parameters are indexed by all possible triples of atom types and thus can be looked up quickly in the loops for the force computation   
void PairTersoff::coeff(int narg, char \*\*arg)   
{   
if (!allocated) allocate(); (continues on next page)  

<html><body><table><tr><td>(continuedfrompreviouspage)</td></tr><tr><td></td></tr><tr><td>map_element2type(narg-3,arg+3);</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td>read potential file and initialize potential parameters</td></tr><tr><td></td></tr><tr><td>read _file(arg[2]);</td></tr></table></body></html>  

# 4.8.5 Case 3: a potential requiring communication  

For some models, the interactions between atoms depends on properties of their environment which have to be computed before the the forces can be computed. Since LAMMPS is designed to run in parallel using a domain decomposition strategy, not all information of the atoms may be directly available and thus communication steps may be need to collect data from ghost atoms of neighboring subdomains or send data to ghost atoms for application during the pairwise computation.  

Specifically, two communication patterns are needed: a “reverse communication” and a “forward communication”. The reverse communication collects data added to “ghost” atoms from neighboring sub-domains and sums it to their corresponding “local” atoms. This communication is only required and thus executed when the Force::newton_pair setting is 1 (i.e. newton on, the default). The forward communication is used to copy computed per-atom data from “local” atoms to their corresponding “ghost” atoms in neighboring sub-domains.  

For this we will look at how the embedding term of the embedded atom potential EAM is implemented in LAMMPS. The complete implementation of this pair style can be found in the files src/MANYBODY/pair_eam.cpp and src/ MANYBODY/pair_eam.h of the LAMMPS source code.  

# Allocating additional per-atom storage  

First suitable (local) per-atom arrays $(r h o,\mathcal{f}p$ , numforce) are allocated. These have to be large enough to include ghost atoms, are not used outside the compute() function and are re-initialized to zero once per timestep.  

if (atom- $\scriptscriptstyle\bigcirc$ nmax $>$ nmax) { memory- $\cdot>$ destroy(rho); memory- $\cdot>$ destroy(fp); memory- $\cdot>$ destroy(numforce); nmax $=$ atom- $\scriptscriptstyle\bigcirc$ nmax; memory- $\cdot>$ create(rho,nmax,"pair:rho"); memory- $\cdot>$ create(fp,nmax,"pair:fp"); memory- $\cdot>$ create(numforce,nmax,"pair:numforce");  

# Reverse communication  

Then a first loop over all pairs $(i$ and $j$ ) is performed, where data is stored in the rho array representing the electron density at the site of $i$ contributed from all neighbors $j$ . Since the EAM pair style uses a half neighbor list (for efficiency reasons), a reverse communication is needed to collect the contributions to rho from ghost atoms (only if newton on is set for pair styles).  

if (newton_pair) comm->reverse_comm(this);  

To support the reverse communication, two functions must be defined: pack_reverse_comm() that copies relevant data into a buffer for ghost atoms and unpack_reverse_comm() that takes the collected data and adds it to the rho array for the corresponding local atoms that match the ghost atoms. In order to allocate sufficiently sized buffers, a flag must be set in the pair style constructor. Since in this case a single double precision number is communicated per atom, the comm_reverse member variable is set to 1 (default is $0=$ no reverse communication).  

int PairEAM::pack_reverse_comm(int n, int first, double \*buf) int i,m,last; $\mathrm{m}=0$ ; last = first + n;   
for $(\mathrm{i}=\mathrm{first};\mathrm{i}<\mathrm{last};\mathrm{i}++)\mathrm{buf}[\mathrm{m}++]=\mathrm{rho}[\mathrm{i}]; $ return m;   
}   
void PairEAM::unpack_reverse_comm(int n, int $^*$ list, double $^*$ buf)   
int i,j,m; $\mathrm{m}=0$ ; for $\mathrm{\Omega}^{\prime}{\mathrm{i}\mathrm{\Omega}}=0$ ; i < n; i++) { $\mathrm{j}=$ list[i]; rho[j] += buf[m++]; }  

# Forward communication  

From the density array rho, the derivative of the embedding energy $f\boldsymbol{p}$ is computed. The computation is only done for “local” atoms, but for the force computation, that property also is needed on ghost atoms. For that a forward communication is needed.  

comm->forward_comm(this);  

Similar to the reverse communication, this requires implementing a pack_forward_comm() and an unpack_forward_comm() function. Since there is one double precision number per atom that needs to be communicated, we must set the comm_forward member variable to 1 (default is $0=\mathrm{no}$ forward communication).  

int PairEAM::pack_forward_comm(int n, int \*list, double \*buf, int pbc_flag, int \*pbc)   
int i,j,m; $\mathrm{m}=0$ ;   
for $(\mathrm{i}=0;\mathrm{i}<\mathrm{n};\mathrm{i}++)\left\{\begin{array}{r l}\end{array}\right.$ { $\mathrm{j}=$ list[i]; buf[m++] = fp[j]; }   
return m;   
void PairEAM::unpack_forward_comm(int n, int first, double \*buf)   
int i,m,last;   
m = 0;   
last = first + n; (continues on next page)  

<html><body><table><tr><td>(continuedfrompreviouspage)</td></tr><tr><td>for (i = first; i < last; i++) fplil = buf[m++];</td></tr><tr><td></td></tr><tr><td></td></tr></table></body></html>  

# 4.8.6 Case 4: potentials without a compute() function  

A small number of pair style classes do not implement a compute() function, but instead use that of a different pair style.  

# Embedded atom variants “eam/fs” and “eam/alloy”  

The pair styles eam/fs and eam/alloy share the same model and potential function as the eam pair style. They differ in the format of the potential files. Pair style eam supports only potential files for single elements. For multi-element systems, the mixed terms are computed from mixed parameters. The eam/fs and eam/alloy pair styles, however, require the use of a single potential file for all elements where the mixed element potential is included in the tabulation. That enables more accurate models for alloys, since the mixed terms can be adjusted for a better representation of material properties compared to terms created from mixing of per-element terms in the PairEAM class.  

We take a closer at the eam/alloy pair style. The complete implementation is in the files src/MANYBODY pair_eam_alloy.cpp and src/MANYBODY/pair_eam_alloy.h.  

The PairEAMAlloy class is derived from PairEAM and not Pair and overrides only a small number of functions:  

<html><body><table><tr><td>class PairEAMAlloy : virtual public PairEAM {</td></tr><tr><td>public: PairEAMAlloy(class LAMMPS</td></tr><tr><td>void coeff(int, char ** override;</td></tr><tr><td></td></tr><tr><td>protected:</td></tr><tr><td>void read _file(char override;</td></tr><tr><td>void 1file2array override;</td></tr></table></body></html>  

All other functionality is inherited from the base classes. In the constructor we set the one_coeff flag and the many_body flag to 1 to indicate the different behavior.  

<html><body><table><tr><td>PairEAMAlloy::PairEAMAlloy(LAMMPS *lmp) : PairEAM(lmp)</td></tr><tr><td>5 one coeff f=1;</td></tr><tr><td></td></tr><tr><td>manybody fag = 1;</td></tr></table></body></html>  

The coeff() function (not shown here) implements the different behavior when processing the pair_coeff command. The read_file() and file2array() replace the corresponding PairEAM class functions to accommodate the different data and file format.  

# AIREBO and AIREBO-M potentials  

The AIREBO-M potential differs from the better known AIREBO potential in that it use a Morse potential instead of a Lennard-Jones potential for non-bonded interactions. Since this difference is very minimal compared to the entire potential, both potentials are implemented in the PairAIREBO class and which non-bonded potential is used is determined by the value of the morseflag flag, which would be set to either 0 or 1.  

<html><body><table><tr><td>class PairAIREBOMorse : public PairAIREBO public:</td></tr></table></body></html>  

(continues on next page)  

# 4.8. Writing new styles  

(continued from previous page)  

PairAIREBOMorse(class LAMMPS void settings(int, char \*\*) override;  

The morseflag variable defaults to 0 and is set to 1 in the PairAIREBOMorse::settings() function which is called by the pair_style command. This function delegates all command argument processing and setting of other parameters to the PairAIREBO::settings() function of the base class.  

<html><body><table><tr><td>void PairAIREBOMorse::settings (int narg,( char ** arg)</td></tr><tr><td>PairAIREBO:settings(narg, arg);</td></tr><tr><td></td></tr><tr><td>morseflag = 1;</td></tr><tr><td>了</td></tr></table></body></html>  

The complete implementation is in the files src/MANYBODY/pair_airebo.cpp, src/MANYBODY/pair_airebo.   
h, src/MANYBODY/pair_airebo_morse.cpp, src/MANYBODY/pair_airebo_morse.h.  

(Bomont) Bomont, Bretonnet, J. Chem. Phys. 124, 054504 (2006)  

# 4.8.7 Writing a new fix style  

Writing fix styles is a flexible way of extending LAMMPS. Users can implement many things using fixes. Some fix styles are only used internally to support compute styles or pair styles:  

• change particles attributes (positions, velocities, forces, etc.). Examples: FixNVE, FixFreeze.   
• read or write data. Example: FixRestart.   
• adding or modifying properties due to geometry. Example: FixWall.   
• interacting with other subsystems or external code: Examples: FixTTM, FixExternal, FixMDI   
• saving information for analysis or future use (previous positions, for instance). Examples: FixAveTime, FixStoreState.  

All fixes are derived from the Fix base class and must have a constructor with the signature: FixPrintVel(class LAMMPS \*, int, char \*\*).  

Every fix must be registered in LAMMPS by writing the following lines of code in the header before include guards:  

#ifdef FIX_CLASS   
// clang-format off   
FixStyle(print/vel,FixPrintVel);   
// clang-format on   
#else   
/\* the definition of the FixPrintVel class comes here \* #endif  

Where print/vel is the style name of your fix in the input script and FixPrintVel is the name of the class. The header file would be called fix_print_vel.h and the implementation file fix_print_vel.cpp. These conventions allow LAMMPS to automatically integrate it into the executable when compiling and associate your new fix class with the designated keyword when it parses the input script.  

Let’s write a simple fix which will print the average velocity at the end of each timestep. First of all, implement a constructor:  

FixPrintVel::FixPrintVel(LAMMPS \*lmp, int narg, char $^{**}$ arg)   
: Fix(lmp, narg, arg)   
{   
if (narg $<4$ ) utils::missing_cmd_args(FLERR, "fix print/vel", error); nevery $=$ utils::inumeric(FLERR,arg[3],false,lmp);   
if (nevery $<=0$ )   
error- $>$ all(FLERR,"Illegal fix print/vel nevery value: {}", nevery);  

In the constructor you should parse the fix arguments which are specified in the script. All fixes have pretty much the same syntax: fix <fix-ID $>$ <fix group $>$ <fix name $>$ $<$ <fix arguments . $..>$ . The first 3 parameters are parsed by Fix base class constructor, while $<$ <fix arguments $>$ should be parsed by you. In our case, we need to specify how often we want to print an average velocity. For instance, once in 50 timesteps: fix 1 print/vel 50. There is a special variable in the Fix class called nevery which specifies how often the method end_of_step() is called. Thus all we need to do is just set it up.  

The next method we need to implement is setmask():  

int FixPrintVel::setmask()   
{ int mask = 0; mask |= FixConst::END_OF_STEP; return mask;  

Here the we specify which methods of the fix should be called during execution of a timestep. The constant END_OF_STEP corresponds to the end_of_step() method.  

void FixPrintVel::end_of_step()   
{ // for add3, scale3   
using namespace MathExtra; double\*\* v = atom->v; int nlocal = atom- $\scriptscriptstyle\bigcirc$ nlocal;   
double localAvgVel[4]; // 4th element for particles count memset(localAvgVel, 0, 4 \* sizeof(double)); for (int particleInd = 0; particleInd $<$ < nlocal; $^{++}$ particleInd) { add3(localAvgVel, v[particleInd], localAvgVel); }   
$\mathrm{localAvgVel{\vert3\vert}}=\mathrm{nlocal}$ ; double globalAvgVel[4]; memset(globalAvgVel, 0, 4 \* sizeof(double)); MPI_Allreduce(localAvgVel, globalAvgVel, 4, MPI_DOUBLE, MPI_SUM, world); scale3(1.0 / globalAvgVel[3], globalAvgVel); if ((comm- $>\mathrm{me}==0$ ) && screen) { utils::print(screen, "{}, {}, $\{\}\backslash\mathfrak{n}^{\mathfrak{n}}$ , globalAvgVel[0], globalAvgVel[1], globalAvgVel[2]);  

In the code above, we use MathExtra routines defined in math_extra.h. There are bunch of math functions to work with arrays of doubles as with math vectors. It is also important to note that LAMMPS code should always assume to be run in parallel and that atom data is thus distributed across the MPI ranks. Thus you can only process data from local atoms directly and need to use MPI library calls to combine or exchange data. For serial execution, LAMMPS comes bundled with the MPI STUBS library that contains the MPI library function calls in dummy versions that only work for a single MPI rank.  

In this code we use an instance of Atom class. This object is stored in the Pointers class (see pointers.h) which is the base class of the Fix base class. This object contains references to various class instances (the original instances are created and held by the LAMMPS class) with all global information about the simulation system. Data from the Pointers class is available to all classes inherited from it using protected inheritance. Hence when you write you own class, which is going to use LAMMPS data, don’t forget to inherit from Pointers or pass a Pointer to it to all functions that need access. When writing fixes we inherit from class Fix which is inherited from Pointers so there is no need to inherit from it directly.  

The code above computes average velocity for all particles in the simulation. Yet you have one unused parameter in fix call from the script: group_name. This parameter specifies the group of atoms used in the fix. So we should compute the average for all particles in the simulation only if group_name $\mathrm{\Delta={}^{\circ}a l l^{\prime\prime}}$ , but it can be any group. The group membership information of an atom is contained in the mask property of an atom and the bit corresponding to a given group is stored in the groupbit variable which is defined in Fix base class:  

for (int i = 0; i < nlocal; ++i) { if (atom- $\scriptscriptstyle\bigcirc$ mask[i] & groupbit) { // Do all job here   
}   
}  

Class Atom encapsulates atoms positions, velocities, forces, etc. Users can access them using the particle index. Note, that particle indexes are usually changed every few timesteps because of neighbor list rebuilds and spatial sorting (to improve cache efficiency).  

Let us consider another Fix example: We want to have a fix which stores atoms position from the previous time step in your fix. The local atoms indexes may not be valid on the next iteration. In order to handle this situation there are several methods which should be implemented:  

• double memory_usage(): return how much memory the fix uses (optional)   
• void grow_arrays(int): do reallocation of the per-particle arrays in your fix   
• void copy_arrays(int i, int j, int delflag): copy i-th per-particle information to j-th particle position. Used when atom sorting is performed. if delflag is set and atom j owns a body, move the body information to atom i.   
• void set_arrays(int i): sets i-th particle related information to zero  

Note, that if your class implements these methods, it must add calls of add_callback and delete_callback to the constructor and destructor. Since we want to store positions of atoms from the previous timestep, we need to add double\*\* xold to the header file. Than add allocation code to the constructor:  

FixSavePos::FixSavePos(LAMMPS $^{*}\mathrm{lmp}$ , int narg, char \*\*arg), xold(nullptr)   
{   
//... memory- $\cdot>$ create(xold, atom- $\scriptscriptstyle\bigcirc$ nmax, 3, "FixSavePos:x"); atom- $\scriptscriptstyle\bigcirc$ add_callback(0);   
}   
FixSavePos::\~FixSavePos() { atom- $\scriptscriptstyle\bigcirc$ delete_callback(id, 0); memory- $\cdot>$ destroy(xold);   
}  

Implement the aforementioned methods:  

double FixSavePos::memory_usage() int nmax $=$ atom- $\scriptscriptstyle\bigcirc$ nmax; double bytes $=0.0$ ; bytes $+=$ nmax \* 3 \* sizeof(double); return bytes;   
}   
void FixSavePos::grow_arrays(int nmax)   
{ memory- $\scriptscriptstyle\bigcirc$ grow(xold, nmax, 3, "FixSavePos:xold");   
}   
void FixSavePos::copy_arrays(int i, int j, int delflag)   
{ memcpy(xold[j], xold[i], sizeof(double) \* 3);   
}   
void FixSavePos::set_arrays(int i)   
{ memset(xold[i], 0, sizeof(double) \* 3);   
}   
int FixSavePos::pack_exchange(int i, double $^*$ buf) int $\mathrm{m}=0$ ; $\mathrm{buf}[\mathrm{m++}]=\mathrm{xold}[\mathrm{i}][\mathrm{0}];$ ; $\mathrm{buf}|\mathrm{m}{+}+|=\mathrm{xold}|\mathrm{i}||\mathrm{1}|;$ ; $\mathrm{buf}|\mathrm{m}{+}+|=\mathrm{xold}|\mathrm{i}||2|;$ ; return m;   
}   
int FixSavePos::unpack_exchange(int nlocal, double $^*$ buf)   
{ int $\mathrm{m}=0$ ; $\mathrm{xold}[\mathrm{nlocal}][0]=\mathrm{buf}[\mathrm{m++}];$ $\mathrm{xold}[\mathrm{nlocal}][1]=\mathrm{buf}[\mathrm{m++}];$ ; x $\mathrm{{old}[n l o c a l][2]=b u f[m++];}$ return m;   
}  

Now, a little bit about memory allocation. We use the Memory class which is just a bunch of template functions for allocating 1D and 2D arrays. So you need to add include memory.h to have access to them.  

Finally, if you need to write/read some global information used in your fix to the restart file, you might do it by setting the flag restart_global $=1$ in the constructor and implementing methods void write_restart(FILE ${}^{*}\mathrm{fp}$ ) and void restart(char $^{*}\mathrm{buf}^{}$ ). If, in addition, you want to write the per-atom property to restart files then these additional settings and functions are needed:  

• a fix flag indicating this needs to be set restart_peratom $=1$ ; • atom- $>$ add_callback() and atom- $\scriptscriptstyle\textgreater$ delete_callback() must be called a second time with the final argument  

# 4.8. Writing new styles  

set to 1 instead of 0 (indicating restart processing instead of per-atom data memory management).  

• the functions void pack_restart(int i, double \*buf) and void unpack_restart(int nlocal, int nth) need to be implemented  

# 4.8.8 Writing a new command style  

Command styles allow to do system manipulations or interfaces to the operating system.  

In the text below, we will discuss the implementation of one example. As shown on the page for writing or extending command styles, in order to implement a new command style, a new class must be written that is either directly or indirectly derived from the Command class. There is just one method that must be implemented: Command::command(). In addition, a custom constructor is needed to get access to the members of the LAMMPS class like the Error class to print out error messages. The Command::command() method processes the arguments passed to the command in the input and executes it. Any other methods would be for the convenience of implementation of the new command.  

In general, new command styles should be added to the EXTRA-COMMAND package. If you feel that your contribution should be added to a different package, please consult with the LAMMPS developers first. The contributed code needs to support the traditional GNU make build process and the CMake build process.  

# 4.8.9 Case 1: Implementing the geturl command  

In this section, we will describe the procedure of adding a simple command style to LAMMPS: the geturl command that allows to download files directly without having to rely on an external program like “wget” or “curl”. The complete implementation can be found in the files src/EXTRA-COMMAND/geturl.cpp and src/EXTRA-COMMAND geturl.h of the LAMMPS source code.  

# Interfacing the libcurl library  

Rather than implementing the various protocols for downloading files, we rely on an external library: libcurl library. This requires that the library and its headers are installed. For the traditional GNU make build system, this simply requires edits to the machine makefile to add compilation flags like for other libraries. For the CMake based build system, we need to add some lines to the file cmake/Modules/Packages/EXTRA-COMMAND.cmake:  

find_package(CURL QUIET COMPONENTS HTTP HTTPS)   
option(WITH_CURL "Enable libcurl support" \${CURL_FOUND})   
if(WITH_CURL) find_package(CURL REQUIRED COMPONENTS HTTP HTTPS) target_compile_definitions(lammps PRIVATE -DLAMMPS_CURL) target_link_libraries(lammps PRIVATE CURL::libcurl)   
endif()  

The first find_package() command uses a built-in CMake module to find an existing libcurl installation with development headers and support for using the HTTP and HTTPS protocols. The “QUIET” flag ensures that there is no screen output and no error if the search fails. The status of the search is recorded in the $\cdot\Phi\{\mathrm{CURL\_FOUND}\}^{},$ ” variable. That variable sets the default of the WITH_CURL option, which toggles whether support for libcurl is included or not.  

The second find_package() uses the “REQUIRED” flag to produce an error if the WITH_CURL option was set to True, but no suitable libcurl implementation with development support was found. This construct is used so that the CMake script code inside the if(WITH_CURL) and endif() block can be expanded later to download and compile libcurl as part of the LAMMPS build process, if it is not found locally. The target_compile_definitions() function added the define -DLAMMPS_CURL to the compilation flags when compiling objects for the LAMMPS library. This allows to always compile the geturl command, but use pre-processing to compile in the interface to libcurl only when it is present and usable and otherwise stop with an error message about the unavailability of libcurl to execute the functionality of the command.  

# Header file  

The first segment of any LAMMPS source should be the copyright and license statement. Note the marker in the first line to indicate to editors like emacs that this file is a $\mathrm{C}{+}{+}$ source, even though the .h extension suggests a C source (this is a convention inherited from the very beginning of the $\mathrm{C}{+}{+}$ version of LAMMPS).  

\* -\*- c++ -\*-   
LAMMPS - Large-scale Atomic/Molecular Massively Parallel Simulator https://www.lammps.org/, Sandia National Laboratories   
LAMMPS development team: developers@lammps.org   
Copyright (2003) Sandia Corporation. Under the terms of Contract   
DE-AC04-94AL85000 with Sandia Corporation, the U.S. Government retains certain rights in this software. This software is distributed under   
the GNU General Public License.   
See the README file in the top-level LAMMPS directory.  

Every command style must be registered in LAMMPS by including the following lines of code in the second part of the header after the copyright message and before the include guards for the class definition:  

# #ifdef COMMAND_CLASS  

// clang-format off   
CommandStyle(geturl,GetURL); // clang-format on   
#else  

This block between #ifdef COMMAND_CLASS and $\#$ else will be included by the Input class in input.cpp to build a map of “factory functions” that will create an instance of a Command class and call its command() method. The map connects the name of the command geturl with the name of the class GetURL. During compilation, LAMMPS constructs a file style_command.h that contains #include statements for all “installed” command styles. Before including style_command.h into input.cpp, the COMMAND_CLASS define is set and the CommandStyle(name, class) macro defined. The code of the macro adds the installed command styles to the “factory map” which enables the Input to execute the command.  

The list of header files to include in style_command.h is automatically updated by the build system if there are new files, so the presence of the new header file in the src/EXTRA-COMMAND folder and the enabling of the EXTRACOMMAND package will trigger LAMMPS to include the new command style when it is (re-)compiled. The “// clang-format” format comments are needed so that running clang-format on the file will not insert unwanted blanks which would break the CommandStyle macro.  

The third part of the header file is the actual class definition of the GetURL class. This has the custom constructor and the command() method implemented by this command style. For the constructor there is nothing to do but to pass the lmp pointer to the base class. Since the command() method is labeled “virtual” in the base class, it must be given the “override” property.  

#ifndef LMP_GETURL_H #define LMP_GETURL_H #include "command.h" namespace LAMMPS_NS class GetURL $^{\ast}$ public Command { (continues on next page)  

(continued from previous page)  

public: GetURL(class LAMMPS \*lmp) $^{\ast}$ Command(lmp) {}; void command(int, char \*\*) override;   
}; namespace LAMMPS_NS   
#endif   
#endif  

The “override” property helps to detect unexpected mismatches because compilation will stop with an error in case the signature of a function is changed in the base class without also changing it in all derived classes.  

# Implementation file  

We move on to the implementation of the GetURL class in the geturl.cpp file. This file also starts with a LAMMPS copyright and license header. Below that notice is typically the space where comments may be added with additional information about this specific file, the author(s), affiliation(s), and email address(es). This way the contributing author(s) can be easily contacted, when there are questions about the implementation later. Since the file(s) may be around for a long time, it is beneficial to use some kind of “permanent” email address, if possible.  

![](images/3a43b68df507d50fd9e31b11087404ea13b5f08880b85f70cf753d6462f2e560.jpg)  

The second section of the implementation file has various include statements. The include file for the class header has to come first, then a couple of LAMMPS classes (sorted alphabetically) followed by the header for the libcurl interface. This is wrapped into an $\#$ ifdef block so that LAMMPS will compile this file without error when the libcurl header is not available and thus the define not set. The final statement of this segment imports the LAMMPS_NS:: namespace globally for this file. This way, all LAMMPS specific functions and classes do not have to be prefixed with LAMMPS_NS::.  

# The command() function (required)  

Since the required custom constructor is trivial and implemented in the header, there is only one function that must be implemented for a command style and that is the command() function.  

void GetURL::command(int narg, char \*\*arg)   
{   
#if !defined(LAMMPS_CURL)   
error- $\scriptscriptstyle\bigcirc$ all(FLERR, "LAMMPS has not been compiled with libcurl support"); #else   
if (narg $<1$ ) utils::missing_cmd_args(FLERR, "geturl", error);   
int verify $=1$ ;   
int overwrite $=1$ ;   
int verbose $=0$ ;  

This first part also has the #ifdef block depending on the LAMMPS_CURL define. This way the command will simply print an error, if libcurl is not available but will not fail to compile. Furthermore, it sets the defaults for the following optional arguments.  

# process arguments  

std::string url = arg[0];  

// sanity check  

if ((url.find(':') == std::string::npos) $||$ ( $\mathrm{url.find(^{\prime}/^{\prime})===}$ std::string::npos)) error- $\scriptscriptstyle\bigcirc$ all(FLERR, "URL $"\{\}"$ is not a supported URL", url);  

std::string output $=$ url.substr(url.find_last_of('/') + 1);   
if (output.empty()) error- $\scriptscriptstyle\bigcirc$ all(FLERR, "URL $^{1}\{\}^{1}$ must end in a file string", url);  

This block stores the positional, i.e. non-optional argument of the URL to be downloaded and adds a couple of sanity checks on the string to make sure it is a valid URL. Also it derives the default name of the output file from the URL.  

int $\mathrm{iarg}=1$ ;   
while (iarg $<$ narg) {   
if (strcmp(arg[iarg], "output") == 0) { if (iarg + 2 > narg) utils::missing_cmd_args(FLERR, "geturl output", error); output $=$ arg[iarg + 1]; ++iarg;   
} else if (strcmp(arg[iarg], "overwrite") == 0) { if (iarg + 2 > narg) utils::missing_cmd_args(FLERR, "geturl overwrite", error); overwrite = utils::logical(FLERR, arg[iarg + 1], false, lmp); ++iarg; $\}$ else if (strcmp(arg[iarg], "verify") == 0) $\{$ { if (iarg + 2 > narg) utils::missing_cmd_args(FLERR, "geturl verify", error); verify = utils::logical(FLERR, arg[iarg + 1], false, lmp); ++iarg;   
} else if (strcmp(arg[iarg], "verbose") == 0) $\{$ { if (iarg + $2>$ narg) utils::missing_cmd_args(FLERR, "geturl verbose", error); verbose = utils::logical(FLERR, arg[iarg + 1], false, lmp); ++iarg;   
} else { error- $>$ all(FLERR, "Unknown geturl keyword: {}", arg[iarg]);  

(continues on next page)  

# 4.8. Writing new styles  

(continued from previous page)  

} ++iarg; }  

This block parses the optional arguments following the URL and stops with an error if there are arguments missing or an unknown argument is encountered.  

// only download files from rank 0   
if (comm->me != 0) return;   
if (!overwrite && platform::file_is_readable(output)) return;   
// open output file for writing   
FILE \*out = fopen(output.c_str(), "wb");   
if (!out)   
error- $\scriptscriptstyle\bigcirc$ all(FLERR, "Cannot open output file $\{\}$ for writing: $\{\}^{\dag}$ , output, utils::getsyserror());  

Here all MPI ranks other than 0 will return, so that the URL download will only happen from a single MPI rank. For that rank the output file is opened for writing using the C library function fopen().  

# initialize curl and perform download  

CURL \*curl;   
curl_global_init(CURL_GLOBAL_DEFAULT);   
curl = curl_easy_init();   
if (curl) { (void) curl_easy_setopt(curl, CURLOPT_URL, url.c_str()); (void) curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void \*) out); (void) curl_easy_setopt(curl, CURLOPT_FILETIME, 1L); (void) curl_easy_setopt(curl, CURLOPT_FAILONERROR, 1L); if (verbose && screen) { (void) curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L); (void) curl_easy_setopt(curl, CURLOPT_STDERR, (void \*) screen); } if (!verify) { (void) curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 0L); (void) curl_easy_setopt(curl, CURLOPT_SSL_VERIFYHOST, 0L); auto res = curl_easy_perform(curl); if (res != CURLE_OK) { long response $=0\mathrm{L}$ ; curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &response); error- $>$ one(FLERR, "Download of $\{\}$ failed with: {} {}", output, curl_easy_strerror(res), response); } curl_easy_cleanup(curl);  

This block now implements the actual URL download with the selected options via the “easy” interface of libcurl. For the details of what these function calls do, please have a look at the \*libcurl documentation.  

<html><body><table><tr><td></td></tr><tr><td>curl _global _cleanup();</td></tr><tr><td>fclose(out);</td></tr><tr><td></td></tr><tr><td>#endif {</td></tr></table></body></html>  

Finally, the previously opened file is closed and the command is complete.  

# 4.9 Notes for developers and code maintainers  

This section documents how some of the code functionality within LAMMPS works at a conceptual level. Comments on code in source files typically document what a variable stores, what a small section of code does, or what a function does and its input/outputs. The topics on this page are intended to document code functionality at a higher level.  

# Contents  

• Notes for developers and code maintainers  

– Reading and parsing of text and text files   
– Requesting and accessing neighbor lists   
– Errors, warnings, and informational messages   
– Choosing between a custom atom style, fix property/atom, and fix STORE/ATOM   
– Fix contributions to instantaneous energy, virial, and cumulative energy KSpace PPPM FFT grids  

# 4.9.1 Reading and parsing of text and text files  

Classes in LAMMPS frequently need to read in additional data from a file, e.g. potential parameters from a potential file for manybody potentials. LAMMPS provides several custom classes and convenience functions to simplify the process. They offer the following benefits:  

• better code reuse and fewer lines of code needed to implement reading and parsing data from a file   
• better detection of format errors, incompatible data, and better error messages   
• exit with an error message instead of silently converting only part of the text to a number or returning a 0 on unrecognized text and thus reading incorrect values   
• re-entrant code through avoiding global static variables (as used by strtok())   
• transparent support for translating unsupported UTF-8 characters to their ASCII equivalents (the text-to-value conversion functions only accept ASCII characters)  

In most cases (e.g. potential files) the same data is needed on all MPI ranks. Then it is best to do the reading and parsing only on MPI rank 0, and communicate the data later with one or more MPI_Bcast() calls. For reading generic text and potential parameter files the custom classes TextFileReader and PotentialFileReader are available. They allow reading the file as individual lines for which they can return a tokenizer class (see below) for parsing the line. Or they can return blocks of numbers as a vector directly. The documentation on File reader classes contains an example for a typical case.  

When reading per-atom data, the data on each line of the file usually needs to include an atom ID so it can be associated with a particular atom. In that case the data can be read in multi-line chunks and broadcast to all MPI ranks with utils::read_lines_from_file(). Those chunks are then split into lines, parsed, and applied only to atoms the MPI rank “owns”.  

For splitting a string (incrementally) into words and optionally converting those to numbers, the Tokenizer and ValueTokenizer can be used. Those provide a superset of the functionality of strtok() from the C-library and the latter also includes conversion to different types. Any errors while processing the string in those classes will result in an exception, which can be caught and the error processed as needed. Unlike the C-library functions atoi(), atof(), strtol(), or strtod() the conversion will check if the converted text is a valid integer or floating point number and will not silently return an unexpected or incorrect value. For example, atoi() will return 12 when converting $^{\bullet\bullet}12.5^{,}$ , while the ValueTokenizer class will throw an InvalidIntegerException if ValueTokenizer::next_int() is called on the same string.  

# 4.9.2 Requesting and accessing neighbor lists  

LAMMPS uses Verlet-style neighbor lists to avoid having to loop over all pairs of all atoms when computing pairwise properties with a cutoff (e.g. pairwise forces or radial distribution functions). There are three main algorithms that can be selected by the neighbor command: bin (the default, uses binning to achieve linear scaling with system size), nsq (without binning, quadratic scaling), multi (with binning, optimized for varying cutoffs or polydisperse granular particles). In addition to how the neighbor lists are constructed a number of different variants of neighbor lists need to be created (e.g. “full” or “half”) for different purposes and styles and those may be required in every time step (“perpetual”) or on some steps (“occasional”).  

The neighbor list creation is managed by the Neighbor class. Individual classes can obtain a neighbor list by creating an instance of a NeighRequest class which is stored in a list inside the Neighbor class. The Neighbor class will then analyze the various requests and apply optimizations where neighbor lists that have the same settings will be created only once and then copied, or a list may be constructed by processing a neighbor list from a different request that is a superset of the requested list. The neighbor list build is then processed in parallel.  

The most commonly required neighbor list is a so-called “half” neighbor list, where each pair of atoms is listed only once (except when the newton command setting for pair is off; in that case pairs straddling subdomains or periodic boundaries will be listed twice). Thus these are the default settings when a neighbor list request is created in:  

void Pair::init_style()   
{ neighbor->add_request(this);   
}   
void Pair::init_list(int /\*id\*/, NeighList \*ptr)   
{ list = ptr;   
}  

The this pointer argument is required so the neighbor list code can access the requesting class instance to store the assembled neighbor list with that instance by calling its init_list() member function. The optional second argument (omitted here) contains a bitmask of flags that determines the kind of neighbor list requested. The default value used here asks for a perpetual “half” neighbor list.  

Non-default values of the second argument need to be used to adjust a neighbor list request to the specific needs of a style. The tersoff pair style, for example, needs a “full” neighbor list:  

(continues on next page)  

(continued from previous page)  

neighbor- $\scriptscriptstyle\bigcirc$ add_request(this, NeighConst::REQ_FULL); }  

When a pair style supports r-RESPA time integration with different cutoff regions, the request flag may depend on the corresponding r-RESPA settings. Here is an example from pair style lj/cut:  

void PairLJCut::init_style()   
{ int list_style = NeighConst::REQ_DEFAULT;   
if (update- $>$ whichflag $==1\&\&$ utils::strmatch(update- $>$ integrate_style, "^respa")) { auto $\mathrm{respa=\left(Respa~^{*}\right)}$ update- $\scriptscriptstyle\bigcirc$ integrate; if (respa- $\scriptscriptstyle\bigcirc$ level_inner $>=0$ ) list_style $=$ NeighConst::REQ_RESPA_INOUT; if (respa- $\scriptscriptstyle\bigcirc$ level_middle $>=0$ ) list_style $=$ NeighConst::REQ_RESPA_ALL; }   
neighbor- $\scriptscriptstyle\bigcirc$ add_request(this, list_style); // [...]  

Granular pair styles need neighbor lists based on particle sizes and not cutoff and also may need to store data across timesteps (“history”). For example with:  

if (use_history) neighbor- $\scriptscriptstyle\bigcirc$ add_request(this, NeighConst::REQ_SIZE | NeighConst::REQ_HISTORY);   
else neighbor- $\scriptscriptstyle\bigcirc$ add_request(this, NeighConst::REQ_SIZE);  

In case a class would need to make multiple neighbor list requests with different settings, each request can set an id which is then used in the corresponding init_list() function to assign it to the suitable pointer variable. This is done for example by the pair style meam:  

void PairMEAM::init_style() [...] neighbor- $\scriptscriptstyle\bigcirc$ add_request(this, NeighConst::REQ_FULL)- $\scriptscriptstyle\bigcirc$ set_id(1); neighbor- $\scriptscriptstyle\bigcirc$ add_request(this)- $\cdot>$ set_id(2);   
}   
void PairMEAM::init_list(int id, NeighList \*ptr)   
{ if (id == 1) listfull = ptr; else if (id == 2) listhalf = ptr;  

Fixes may require a neighbor list that is only build occasionally (or just once) and this can also be indicated by a flag. As an example here is the request from the FixPeriNeigh class which is created internally by Peridynamics pair styles:  

neighbor->add_request(this, NeighConst::REQ_FULL | NeighConst::REQ_OCCASIONAL);  

It is also possible to request a neighbor list that uses a different cutoff than what is usually inferred from the pair style settings (largest cutoff of all pair styles plus neighbor list skin). The following is used in the compute rdf command implementation:  

if (cutflag) neighbor- $\scriptscriptstyle\bigcirc$ add_request(this, NeighConst::REQ_OCCASIONAL)- $\rightarrow$ set_cutoff(mycutneigh);  

(continues on next page)  

(continued from previous page)  

else neighbor- $\scriptscriptstyle\bigcirc$ add_request(this, NeighConst::REQ_OCCASIONAL);  

The neighbor list request function has a slightly different set of arguments when created by a command style. In this case the neighbor list is always an occasional neighbor list, so that flag is not needed. However for printing the neighbor list summary the name of the requesting command should be set. Below is the request from the delete atoms command:  

neighbor- $>$ add_request(this, "delete_atoms", NeighConst::REQ_FULL);  

# 4.9.3 Errors, warnings, and informational messages  

LAMMPS has specialized functionality to handle errors (which should terminate LAMMPS), warning messages (which should indicate possible problems without terminating LAMMPS), and informational text for messages about the progress and chosen settings. We strongly encourage using these facilities and to stay away from using printf() or fprintf() or std::cout or std::cerr and calling MPI_Abort() or exit() directly. Warnings and informational messages should be printed only on MPI rank 0 to avoid flooding the output when running in parallel with many MPI processes.  

# Errors  

When LAMMPS encounters an error, for example a syntax error in the input, then a suitable error message should be printed giving a brief, one line remark about the reason and then call either Error::all() or Error::one(). Error::all() must be called when the failing code path is executed by all MPI processes and the error condition will appear for all MPI processes the same. If desired, each MPI process may set a flag to either 0 or 1 and then MPI_Allreduce() searching for the maximum can be used to determine if there was an error on any of the MPI processes and make this information available to all. Error::one() in contrast needs to be called when only one or a few MPI processes execute the code path or can have the error condition. Error::all() is generally the preferred option.  

Calling these functions does not abort LAMMPS directly, but rather throws either a LAMMPSException (from Error::all()) or a LAMMPSAbortException (from Error::one()). These exceptions are caught by the LAMMPS main() program and then handled accordingly. The reason for this approach is to support applications, especially graphical applications like LAMMPS-GUI, that are linked to the LAMMPS library and have a mechanism to avoid that an error in LAMMPS terminates the application. By catching the exceptions, the application can delete the failing LAMMPS class instance and create a new one to try again. In a similar fashion, the LAMMPS Python module checks for this and then re-throws corresponding Python exception, which in turn can be caught by the calling Python code.  

There are multiple “signatures” that can be called:  

• Error::all(FLERR, "Error message"): this will abort LAMMPS with the error message “Error message”, followed by the last line of input that was read and processed before the error condition happened. • Error::all(FLERR, Error::NOLASTLINE, "Error message"): this is the same as before but without the last line of input. This is preferred for errors that would happen during a run or minimization, since showing the “run” or “minimize” command would be the last line, but is unrelated to the error. • Error::all(FLERR, idx, "Error message"): this is for argument parsing where “idx” is the index (starting at 0) of the argument for a LAMMPS command that is causing the failure (use -1 for the command itself). For index 0, you need to use the constant Error::ARGZERO to work around the inability of some compilers to disambiguate between a NULL pointer and an integer constant 0, even with an added type cast. The output may also include the last input line before and after, if they differ due to substituting variables. A textual indicator is pointing to the specific word that failed. Using the constant Error::NOPOINTER in place of the idx argument will suppress the marker and then the behavior is like the idx argument is not provided.  

FLERR is a macro containing the filename and line where the Error class is called and that information is appended to the error message. This allows to quickly find the relevant source code causing the error. For all three signatures, the single string “Error message” may be replaced with a format string using ‘{}’ placeholders and followed by a variable number of arguments, one for each placeholder. This format string and the arguments are then handed for formatting to the {fmt} library (which is bundled with LAMMPS) and thus allow processing similar to the “format()” functionality in Python.  

![](images/bd233716280627bc00db61c65d934db8f884ae6c1ebc92f8da9dca94e2f9e09d.jpg)  

# Note  

For commands like fix ave/time that accept wildcard arguments, the utils::expand_args() function may be passed as an optional argument where the function will provide a map to the original arguments from the expanded argument indices.  

For complex errors, that can have multiple causes and which cannot be explained in a single line, you can append to the error message, the string created by utils::errorurl(), which then provides a URL pointing to a paragraph of the Error and warning details that corresponds to the number provided. Example:  

error->all(FLERR, "Unknown identifier in data file: {}{}", keyword, utils::errorurl(1));  

This will output something like this:  

<html><body><table><tr><td>ERROR: Unknown identifier in data file: Massess</td></tr><tr><td>For more information see https://docs.lammps.org/ /err0001 (src/read_o data.cpp:1482</td></tr><tr><td>data</td></tr><tr><td>Last input line: read_ data.peptide</td></tr></table></body></html>  

Where the URL points to the first paragraph with explanations on the Error and warning details page in the manual.  

# Warnings  

To print warnings, the Errors::warning() function should be used. It also requires the FLERR macros as first argument to easily identify the location of the warning in the source code. Same as with the error functions above, the function has two variants: one just taking a single string as final argument and a second that uses the $\{\mathrm{fmt}\}$ library to make it similar to, say, fprintf(). One motivation to use this function is that it will output warnings with always the same capitalization of the leading “WARNING” string. A second is that it has a built in rate limiter. After a given number (by default 100), that can be set via the thermo_modify command no more warnings are printed. Also, warnings are written consistently to both screen and logfile or not, depending on the settings for screen or logfile output.  

# Note  

Unlike Error::all(), the warning function will produce output on every MPI process, so it typically would be prefixed with an if statement testing for comm- $>\mathrm{me}==0$ , i.e. limiting output to MPI rank 0.  

# Informational messages  

Finally, for informational message LAMMPS has the utils::logmesg() convenience function. It also uses the $\{\mathrm{fmt}\}$ library to support using a format string followed by a matching number of arguments. It will output the resulting formatted text to both, the screen and the logfile and will honor the corresponding settings about whether this output is active and to which file it should be send. Same as for Error::warning(), it would produce output for every MPI process and thus should usually be called only on MPI rank 0 to avoid flooding the output when running with many parallel processes.  

# 4.9.4 Choosing between a custom atom style, fix property/atom, and fix STORE/ATOM  

There are multiple ways to manage per-atom data within LAMMPS. Often the per-atom storage is only used locally and managed by the class that uses it. If the data has to persist between multiple time steps and migrate with atoms when they move from sub-domain to sub-domain or across periodic boundaries, then using a custom atom style, or $f\alpha$ property/atom, or the internal fix STORE/ATOM are possible options.  

• Using the atom style is usually the most programming effort and mostly needed when the per-atom data is an integral part of the model like a per-atom charge or diameter and thus should be part of the Atoms section of a data file.   
• Fix property/atom is useful if the data is optional or should be entered by the user, or accessed as a (named) custom property. In this case the fix should be entered as part of the input (and not internally) which allows to enter and store its content with data files.   
• Fix STORE/ATOM should be used when the data should be accessed internally only and thus the fix can be created internally.  

# 4.9.5 Fix contributions to instantaneous energy, virial, and cumulative energy  

Fixes can calculate contributions to the instantaneous energy and/or virial of the system, both in a global and peratom sense. Fixes that perform thermostatting or barostatting can calculate the cumulative energy they add to or subtract from the system, which is accessed by the ecouple and econserve thermodynamic keywords. This subsection explains how both work and what flags to set in a new fix to enable this functionality.  

Let’s start with thermostatting and barostatting fixes. Examples are the fix langevin and fix npt commands. Here is what the fix needs to do:  

• Set the variable ecouple $\mathit{f l a g}=1$ in the constructor. Also set scalar_flag $=1$ , extscalar $=1$ , and global_freq to a timestep increment which matches how often the fix is invoked. • Implement a compute_scalar() method that returns the cumulative energy added or subtracted by the fix, e.g. by rescaling the velocity of atoms. The sign convention is that subtracted energy is positive, added energy is negative. This must be the total energy added to the entire system, i.e. an “extensive” quantity, not a per-atom energy. Cumulative means the summed energy since the fix was instantiated, even across multiple runs. This is because the energy is used by the econserve thermodynamic keyword to check that the fix is conserving the total energy of the system, i.e. potential energy $^+$ kinetic energy $^+$ coupling energy ${\mathbf{\lambda}}={\mathbf{a}}$ constant.  

And here is how the code operates:  

• The Modify class makes a list of all fixes that set ecouple $\mathit{f l a g}=1$ .   
• The thermo_style custom command defines ecouple and econserve keywords.   
• These keywords sum the energy contributions from all the ecouple $\mathit{f l a g}=1$ fixes by invoking the energy_couple() method in the Modify class, which calls the compute_scalar() method of each fix in the list.  

Next, here is how a fix contributes to the instantaneous energy and virial of the system. First, it sets any or all of these flags to a value of 1 in their constructor:  

• energy_global_flag to contribute to global energy, example: fix indent • energy_peratom_flag to contribute to peratom energy, fix cmap • virial_global_flag to contribute to global virial, example: fix wall • virial_peratom_flag to contribute to peratom virial, example: fix wall  

The fix must also do the following:  

• For global energy, implement a compute_scalar() method that returns the energy added or subtracted on this timestep. Here the sign convention is that added energy is positive, subtracted energy is negative. • For peratom energy, invoke the ev_init(eflag,vflag) function each time the fix is invoked, which initializes peratom energy storage. The value of eflag may need to be stored from an earlier call to the fix during the same timestep. See how the fix cmap command does this in src/MOLECULE/fix_cmap.cpp. When an energy for one or more atoms is calculated, invoke the ev_tally() function to tally the contribution to each atom. Both the ev_init() and ev_tally() methods are in the parent Fix class.  

• For global and/or peratom virial, invoke the v_init(vflag) function each time the fix is invoked, which initializes virial storage. When forces on one or more atoms are calculated, invoke the v_tally() function to tally the contribution. Both the v_init() and v_tally() methods are in the parent Fix class. Note that there are several variants of v_tally(); choose the one appropriate to your fix.  

![](images/4f9ea4f46982ea9f4f38aff80191f43491c1d8bde230d150e475fde5b3cd804f.jpg)  

# Note  

The ev_init() and ev_tally() methods also account for global and peratom virial contributions. Thus you do not need to invoke the v_init() and v_tally() methods if the fix also calculates peratom energies.  

The fix must also specify whether (by default) to include or exclude these contributions to the global/peratom energy/virial of the system. For the fix to include the contributions, set either or both of these variables in the constructor:  

• thermo_energy $=1$ , for global and peratom energy • thermo_virial $=1$ , for global and peratom virial  

Note that these variables are zeroed in fix.cpp. Thus if you don’t set the variables, the contributions will be excluded (by default).  

However, the user has ultimate control over whether to include or exclude the contributions of the fix via the fix modify command:  

• fix modify energy yes to include global and peratom energy contributions • fix modify virial yes to include global and peratom virial contributions  

If the fix contributes to any of the global/peratom energy/virial values for the system, it should be explained on the fix doc page, along with the default values for the energy yes/no and virial yes/no settings of the fix modify command.  

Finally, these 4 contributions are included in the output of 4 computes:  

global energy in compute pe peratom energy in compute pe/atom • global virial in compute pressure • peratom virial in compute stress/atom  

These computes invoke a method of the Modify class to include contributions from fixes that have the corresponding flags set, e.g. energy_peratom_flag and thermo_energy for compute pe/atom.  

Note that each compute has an optional keyword to either include or exclude all contributions from fixes. Also note that compute pe and compute pressure are what is used (by default) by thermodynamic output to calculate values for its pe and press keywords.  

# 4.9.6 KSpace PPPM FFT grids  

The various KSpace PPPM styles in LAMMPS use FFTs to solve Poisson’s equation. This subsection describes:  

• how FFT grids are defined   
• how they are decomposed across processors   
• how they are indexed by each processor   
• how particle charge and electric field values are mapped to/from the grid  

An FFT grid cell is a 3d volume; grid points are corners of a grid cell and the code stores values assigned to grid points in vectors or 3d arrays. A global 3d FFT grid has points indexed 0 to N-1 inclusive in each dimension.  

Each processor owns two subsets of the grid, each subset is brick-shaped. Depending on how it is used, these subsets are allocated as a 1d vector or 3d array. Either way, the ordering of values within contiguous memory $\mathbf{X}$ fastest, then y, z slowest.  

For the 3d decomposition of the grid, the global grid is partitioned into bricks that correspond to the subdomains of the simulation box that each processor owns. Often, this is a regular 3d array $\mathrm{Px}$ by $\mathrm{Py}$ by $\mathrm{Pz}$ ) of bricks, where $\mathrm{P}=$ number of processors $=\mathrm{Px}^{\ast}\mathrm{Py}^{\ast}\mathrm{Pz}$ . More generally it can be a tiled decomposition, where each processor owns a brick and the union of all the bricks is the global grid. Tiled decompositions are produced by load balancing with the RCB algorithm; see the balance rcb command.  

For the FFT decompostion of the grid, each processor owns a brick that spans the entire x dimension of the grid while the y and z dimensions are partitioned as a regular 2d array (P1 by P2), where $\boldsymbol{\mathrm{P}}=\boldsymbol{\mathrm{P}}\boldsymbol{1}*\boldsymbol{\mathrm{P}}\boldsymbol{2}$ .  

The following indices store the inclusive bounds of the brick a processor owns, within the global grid:  

<html><body><table><tr><td>nFOO in = 3d decomposition brick</td></tr><tr><td></td></tr><tr><td>nFOO _fft = FFT decomposition brick</td></tr><tr><td>nFOO _out = 3d decomposition brick + ghost cells</td></tr></table></body></html>  

where FOO corresponds to xlo, xhi, ylo, yhi, zlo, or zhi.  

The in and fft indices are from 0 to N-1 inclusive in each dimension, where N is the grid size.  

The out indices index an array which stores the in subset of the grid plus ghost cells that surround it. These indices can thus be $<0$ or $>=\mathbf{N}$ .  

The number of ghost cells a processor owns in each of the 6 directions is a function of:  

neighbor skin distance (since atoms can move outside a proc subdomain) qdist $=$ offset or charge from atom due to TIP4P fictitious charge order $=$ mapping stencil size shift $=$ factor used when order is an even number (see below)  

Here is an explanation of how the PPPM variables order, nlower / nupper, shift, and OFFSET work. They are the relevant variables that determine how atom charge is mapped to grid points and how field values are mapped from grid points to atoms:  

order = # of nearby grid points in each dim that atom charge/field are mapped to/from nlower,nupper $=$ extent of stencil around the grid point an atom is assigned to OFFSET $=$ large integer added/subtracted when mapping to avoid $\mathrm{int}(-0.75)=0$ when $^{-1}$ is the desired␣ $\hookrightarrow$ result  

The particle_map() method assigns each atom to a grid point.  

If order is even, say 4:  

atom is assigned to grid point to its left (in each dim)   
shift $=$ OFFSET   
nlower $=-1$ , nupper $=2$ , which are offsets from assigned grid point   
window of mapping grid pts is thus 2 grid points to left of atom, 2 to right  

If order is odd, say 5:  

atom is assigned to left/right grid pt it is closest to (in each dim)   
shift $=$ OFFSET + 0.5   
nlower $=2$ , nupper = 2   
if point is in left half of cell, then window of affected grid pts is 3 grid points to left of atom, 2 to right   
if point is in right half of cell, then window of affected grid pts is 2 grid points to left of atom, 3 to right  

These settings apply to each dimension, so that if order $=5$ , an atom’s charge is mapped to 125 grid points that surround the atom.  

# 4.10 Notes for updating code written for older LAMMPS versions  

This section documents how $\mathrm{C}{+}{+}$ source files that are available outside of the LAMMPS source distribution (e.g. in external USER packages or as source files provided as a supplement to a publication) that are written for an older version of LAMMPS and thus need to be updated to be compatible with the current version of LAMMPS. Due to the active development of LAMMPS it is likely to always be incomplete. Please contact developers@lammps.org in case you run across an issue that is not (yet) listed here. Please also review the latest information about the LAMMPS programming style conventions, especially if you are considering to submit the updated version for inclusion into the LAMMPS distribution.  

Available topics in mostly chronological order are:  

• Setting flags in the constructor   
• Rename of pack/unpack_comm() to pack/unpack_forward_comm()   
• Use ev_init() to initialize variables derived from eflag and vflag   
• Use utils::count_words() functions instead of atom->count_words()   
• Use utils::numeric() functions instead of force->numeric()   
• Use utils::open_potential() function to open potential files   
• Use symbolic Atom and AtomVec constants instead of numerical values   
• Simplify customized error messages   
• Use of “override” instead of “virtual”   
• Simplified and more compact neighbor list requests   
• Split of fix STORE into fix STORE/GLOBAL and fix STORE/PERATOM   
• Rename of fix STORE/PERATOM to fix STORE/ATOM and change of arguments   
• Use Output::get_dump_by_id() instead of Output::find_dump()   
• Refactored grid communication using Grid3d/Grid2d classes instead of GridComm  

# 4.10.1 Setting flags in the constructor  

As LAMMPS gains additional functionality, new flags may need to be set in the constructor or a class to signal compatibility with such features. Most of the time the defaults are chosen conservatively, but sometimes the conservative choice is the uncommon choice, and then those settings need to be made when updating code.  

Pair styles:  

• manybody_flag: set to 1 if your pair style is not pair-wise additive • restartinfo: set to 0 if your pair style does not store data in restart files  

# 4.10.2 Rename of pack/unpack_comm() to pack/unpack_forward_comm()  

Changed in version $8\mathrm{Aug}2014$ .  

In this change set, the functions to pack/unpack data into communication buffers for forward communications were renamed from pack_comm() and unpack_comm() to pack_forward_comm() and unpack_forward_comm(), respectively. Also the meaning of the return value of these functions was changed: rather than returning the number of items per atom stored in the buffer, now the total number of items added (or unpacked) needs to be returned. Here is an example from the PairEAM class. Of course the member function declaration in corresponding header file needs to be updated accordingly.  

Old:  

int PairEAM::pack_comm(int n, int \*list, double \*buf, int pbc_flag, int \*pbc)   
{ int $\mathrm{m}=0$ ; for (int $\mathrm{i}=0$ ; i < n; i++) { int j = list[i]; buf[m++] = fp[j];   
}   
return 1;   
}  

New:  

int PairEAM::pack_forward_comm(int n, int $^*$ list, double \*buf, int pbc_flag, int \*pbc) int $\mathrm{m}=0$ ; for (int i = 0; i < n; i++) $\{$ { int j = list[i]; buf[m++] = fp[j]; }   
return m;  

# Note  

Because the various “pack” and “unpack” functions are defined in the respective base classes as dummy functions doing nothing, and because of the the name mismatch the custom versions in the derived class will no longer be called, there will be no compilation error when this change is not applied. Only calculations will suddenly produce incorrect results because the required forward communication calls will cease to function correctly.  

# 4.10.3 Use ev_init() to initialize variables derived from eflag and vflag  

Changed in version $29\mathrm{Mar}2019$ .  

There are several variables that need to be initialized based on the values of the “eflag” and “vflag” variables and since sometimes there are new bits added and new variables need to be set to 1 or 0. To make this consistent across all styles, there is now an inline function ev_init(eflag, vflag) that makes those settings consistently and calls either ev_setup() or ev_unset(). Example from a pair style:  

Old:  

<html><body><table><tr><td>if (eflag Il vflag) ev_setup(eflag, vfag); else evflag = vflag_fdotr = eflag_global = eflag_atom = O;</td></tr></table></body></html>  

New:  

<html><body><table><tr><td>ev init(eflag, vflag);</td></tr><tr><td></td></tr></table></body></html>  

Not applying this change will not cause a compilation error, but can lead to inconsistent behavior and incorrect tallying of energy or virial.  

# 4.10.4 Use utils::count_words() functions instead of atom->count_words()  

Changed in version $2\ensuremath{\mathrm{Jun}}2020$ .  

The “count_words()” functions for parsing text have been moved from the Atom class to the utils namespace. The “count_words()” function in “utils” uses the Tokenizer class internally to split a line into words and count them, thus it will not modify the argument string as the function in the Atoms class did and thus had a variant using a copy buffer. Unlike the old version, the new version does not remove comments. For that you can use the utils::trim_comment() function as shown in the example below.  

Old:  

<html><body><table><tr><td>nwords = atom->count _words(line);</td></tr><tr><td>int nwords atom->count _words(buf);</td></tr><tr><td></td></tr></table></body></html>  

New:  

nwords $=$ utils::count_words(line);   
int nwords $=$ utils::count_words(utils::trim_comment(buf));  

# See also  

utils::count_words(), utils::trim_comments()  

# 4.10.5 Use utils::numeric() functions instead of force->numeric()  

Changed in version 18Sep2020.  

The “numeric()” conversion functions (including “inumeric()”, “bnumeric()”, and “tnumeric()”) have been moved from the Force class to the utils namespace. Also they take an additional argument that selects whether the Error::all() or Error::one() function should be called in case of an error. The former should be used when all MPI processes call the conversion function and the latter must be used when they are called from only one or a subset of the MPI processes.  

Old:  

<html><body><table><tr><td>val = force->numeric(FLERR, arg[1]); force- >inumeric(FLERR, arg[2]);</td></tr></table></body></html>  

New:  

val = utils::numeric(FLERR, true, arg[1], lmp);   
num $=$ utils::inumeric(FLERR, false, arg[2], lmp);  

# See also  

utils::numeric(), utils::inumeric(), utils::bnumeric(), utils::tnumeric()  

# 4.10.6 Use utils::open_potential() function to open potential files  

Changed in version 18Sep2020.  

The utils::open_potential() function must be used to replace calls to force- $\cdot>$ open_potential() and should be used to replace fopen() for opening potential files for reading. The custom function does three additional steps compared to fopen(): 1) it will try to parse the UNITS: and DATE: metadata and will stop with an error on a units mismatch and will print the date info, if present, in the log file; 2) for pair styles that support it, it will set up possible automatic unit conversions based on the embedded unit information and LAMMPS’ current units setting; 3) it will not only try to open a potential file at the given path, but will also search in the folders listed in the LAMMPS_POTENTIALS environment variable. This allows potential files to reside in a common location instead of having to copy them around for simulations.  

Old:  

<html><body><table><tr><td>fp = force->open _potential(filename); fp = f fopen(filename, "r");</td></tr></table></body></html>  

New:  

<html><body><table><tr><td>fp = utils:open_potential(flename, lmp);</td></tr></table></body></html>  

# 4.10.7 Use symbolic Atom and AtomVec constants instead of numerical values  

Changed in version 18Sep2020.  

Properties in LAMMPS that were represented by integer values (0, 1, 2, 3) to indicate settings in the Atom and AtomVec classes (or classes derived from it) (and its derived classes) have been converted to use scoped enumerators instead.  

<html><body><table><tr><td>Symbolic Constant</td><td>Value</td><td>Symbolic Constant</td><td>Value</td><td>Symbolic Constant</td><td>Value</td></tr><tr><td>Atom::GROW</td><td>0</td><td>Atom::ATOMIC</td><td>0</td><td>Atom::MAP_NONE</td><td>0</td></tr><tr><td>Atom::RESTART</td><td>1</td><td>Atom::MOLECULAR</td><td>1</td><td>Atom::MAP_ARRAY</td><td>1</td></tr><tr><td>Atom::BORDER</td><td>2</td><td>Atom::TEMPLATE</td><td>2</td><td>Atom::MAP_HASH</td><td>2</td></tr><tr><td>AtomVec::PER_ATOM</td><td>0</td><td>AtomVec::PER_TYPE</td><td>1</td><td>Atom::MAP_YES</td><td>3</td></tr></table></body></html>  

Old:  

molecular = 0;   
mass_type = 1;   
if (atom- $>$ molecular == 2) if (atom- $\scriptscriptstyle\bigcirc$ map_style == 2) atom- $\cdot>$ add_callback(0);   
atom- $\cdot>$ delete_callback(id,1);  

# New:  

molecular = Atom::ATOMIC; mass_type = AtomVec::PER_TYPE; if (atom- $\scriptscriptstyle\bigcirc$ molecular == Atom::TEMPLATE) if (atom- $>$ map_style == Atom::MAP_HASH) atom- $\cdot>$ add_callback(Atom::GROW); atom- $>$ delete_callback(id,Atom::RESTART);  

# 4.10.8 Simplify customized error messages  

Changed in version 14May2021.  

Aided by features of the bundled {fmt} library, error messages now can have a variable number of arguments and the string will be interpreted as a {fmt} style format string so that error messages can be easily customized without having to use temporary buffers and sprintf(). Example:  

Old:  

if (fptr == NULL) { char str[128]; sprintf(str,"Cannot open AEAM potential file $\mathrm{\mathit{\Omega}{}_{\mathrm{{/os}}}}$ ",filename); error- $\scriptscriptstyle\bigcirc$ one(FLERR,str);   
}  

New:  

if $(\mathrm{fptr}==\mathrm{nullptr})$ error- $\scriptscriptstyle\bigcirc$ one(FLERR, "Cannot open AEAM potential file $\{\}$ : {}", filename, utils::getsyserror());  

# 4.10.9 Use of “override” instead of “virtual”  

Changed in version 17Feb2022.  

Since LAMMPS requires $\mathrm{C}{+}{+}11$ , we switched to use the “override” keyword instead of “virtual” to indicate polymorphism in derived classes. This allows the $\mathrm{C}{+}{+}$ compiler to better detect inconsistencies when an override is intended or not. Please note that “override” has to be added to all polymorph functions in derived classes and “virtual” only to the function in the base class (or the destructor). Here is an example from the FixWallReflect class:  

Old:  

FixWallReflect(class LAMMPS \*, int, char \*\*);   
virtual \~FixWallReflect();   
int setmask();   
void init();   
void post_integrate();  

New:  

FixWallReflect(class LAMMPS \*, int, char \*\*);   
\~FixWallReflect() override;   
int setmask() override;   
void init() override;   
void post_integrate() override;  

This change set will neither cause a compilation failure, nor will it change functionality, but if you plan to submit the updated code for inclusion into the LAMMPS distribution, it will be requested for achieve a consistent programming style.  

# 4.10.10 Simplified function names for forward and reverse communication  

Changed in version 24Mar2022.  

Rather than using the function name to distinguish between the different forward and reverse communication functions for styles, LAMMPS now uses the type of the “this” pointer argument.  

Old:  

<html><body><table><tr><td>comm->forward comm pair(this)</td><td></td></tr><tr><td>comm->f forward comm fix(this</td><td></td></tr><tr><td>comm->forward comm compute(this)</td><td></td></tr><tr><td>comm->forward comm dump(this);</td><td></td></tr><tr><td>comm->reverse _comm_pair(t (this);</td><td></td></tr><tr><td>comm->reverse comm fix(this);</td><td></td></tr><tr><td>comm->reverse comm compute(this)</td><td></td></tr><tr><td>comm->reverse dump(this) comm</td><td></td></tr></table></body></html>  

New:  

<html><body><table><tr><td>comm->forward_comm(this)</td></tr><tr><td></td></tr><tr><td>comm->reverse comm this);</td></tr></table></body></html>  

This change is required or else the code will not compile.  

# 4.10.11 Simplified and more compact neighbor list requests  

Changed in version $24\mathbf{Mar}2022$ .  

This change set reduces the amount of code required to request a neighbor list. It enforces consistency and no longer requires to change internal data of the request. More information on neighbor list requests can be found here. Example from the ComputeRDF class:  

Old:  

int irequest $=$ neighbor- $>$ request(this,instance_me);   
neighbor- $\scriptscriptstyle\bigcirc$ requests[irequest]- $\scriptscriptstyle\bigcirc$ pair = 0;   
neighbor- $\scriptscriptstyle\bigcirc$ requests[irequest]- $\scriptscriptstyle\bigcirc$ compute $=1$ ;   
neighbor- $\scriptscriptstyle\bigcirc$ requests[irequest]- $\scriptscriptstyle\bigcirc$ occasional $=1$ ;   
if (cutflag) { neighbor- $>$ requests[irequest]- $\scriptscriptstyle\bigcirc$ cut = 1; neighbor- $\scriptscriptstyle\bigcirc$ requests[irequest]- $\scriptscriptstyle\bigcirc$ cutoff = mycutneigh;   
}  

New:  

auto req $=$ neighbor- $\scriptscriptstyle\bigcirc$ add_request(this, NeighConst::REQ_OCCASIONAL);   
if (cutflag) req- $\scriptscriptstyle\bigcirc$ set_cutoff(mycutneigh);  

Public access to the NeighRequest class data members has been removed so this update is required to avoid compilation failure.  

# 4.10.12 Split of fix STORE into fix STORE/GLOBAL and fix STORE/PERATOM  

Changed in version 15Sep2022.  

This change splits the GLOBAL and PERATOM modes of fix STORE into two separate fixes STORE/GLOBAL and STORE/PERATOM. There was very little shared code between the two fix STORE modes and the two different code paths had to be prefixed with if statements. Furthermore, some flags were used differently in the two modes leading to confusion. Splitting the code into two fix styles, makes it more easily maintainable. Since these are internal fixes, there is no user visible change.  

Old:  

#include "fix_store.h"   
FixStore \*fix = dynamic_cast $<$ <FixStore \*>( modify- $\scriptscriptstyle\bigcirc$ add_fix(fmt::format("{} {} STORE peratom 1 13",id_pole,group- $\scriptscriptstyle\bigcirc$ names[0]));   
FixStore \*fix = dynamic_cast $<$ <FixStore \*>(modify- $\scriptscriptstyle\bigcirc$ get_fix_by_id(id_pole));  

New:  

#include "fix_store_peratom.h"  

FixStorePeratom \*fix = dynamic_cast $<$ <FixStorePeratom $^*>$ ( modify- $\scriptscriptstyle\bigcirc$ add_fix(fmt::format("{} {} STORE/PERATOM 1 13",id_pole,group- $\cdot>$ names[0]));  

FixStorePeratom \*fix = dynamic_cast $<$ <FixStorePeratom $^*>$ (modify- $>$ get_fix_by_id(id_pole));  

Old:  

#include "fix_store.h"   
FixStore \*fix = dynamic_cast $<$ <FixStore \*>( modify- $\cdot>$ add_fix(fmt::format("{} {} STORE global 1 1",id_fix,group- $\scriptscriptstyle\bigcirc$ names[igroup]));   
FixStore \*fix = dynamic_cast $<$ <FixStore \*>(modify- $\scriptscriptstyle\bigcirc$ get_fix_by_id(id_fix));  

New:  

#include "fix_store_global.h"  

FixStoreGlobal \*fix = dynamic_cast $<$ <FixStoreGlobal $^*>$ ( modify- $\scriptscriptstyle\bigcirc$ add_fix(fmt::format("{} {} STORE/GLOBAL 1 1",id_fix,group->names[igroup])); FixStoreGlobal \*fix = dynamic_cast $<$ <FixStoreGlobal $^*>$ (modify->get_fix_by_id(id_fix));  

This change is required or else the code will not compile.  

# 4.10.13 Rename of fix STORE/PERATOM to fix STORE/ATOM and change of arguments  

Changed in version 28Mar2023.  

The available functionality of the internal fix to store per-atom properties was expanded to enable storing data with ghost atoms and to support binary restart files. With those changes, the fix was renamed to fix STORE/ATOM and the number and order of (required) arguments has changed.  

Old syntax: ID group-ID STORE/PERATOM rflag n1 n2 [n3] • $r{\mathrm{/}}A g=0/1$ , no/yes store per-atom values in restart file • $n1=1,n2=1$ , no $n3\rightarrow$ per-atom vector, single value per atom • $n1=1,n2>1$ , no $n3\rightarrow$ per-atom array, $n2$ values per atom • $n1=1,n2>0,n3>0\rightarrow$ per-atom tensor, $n2\times n3$ values per atom  

New syntax: ID group-ID STORE/ATOM n1 n2 gflag rflag • $n1=1,n2=0\rightarrow$ per-atom vector, single value per atom • $n1>1,n2=0\rightarrow$ per-atom array, $n l$ values per atom • $n1>0,n2>0\rightarrow$ per-atom tensor, $n l\mathrm{~x~}n2$ values per atom • $g\hbar a g=0/1$ , no/yes communicate per-atom values with ghost atoms • $r{\mathrm{/}}A g=0/1$ , no/yes store per-atom values in restart file  

Since this is an internal fix, there is no user visible change.  

# 4.10.14 Use Output::get_dump_by_id() instead of Output::find_dump()  

Changed in version 15Sep2022.  

The accessor function to individual dump style instances has been changed from Output::find_dump() returning the index of the dump instance in the list of dumps to Output::get_dump_by_id() returning a pointer to the dump directly. Example:  

Old:  

int idump $=$ output- $>$ find_dump(arg[iarg+1]);   
if (idump $<0$ ) error- $\scriptscriptstyle\bigcirc$ all(FLERR,"Dump ID in hyper command does not exist");   
memory- $\cdot>$ grow(dumplist,ndump $+1$ ,"hyper:dumplist");   
dumplist[ndump++] = idump;   
[...]   
if (dumpflag) for (int idump = 0; idump $<\mathrm{~n~}$ dump; idump++) output- $>$ dump[dumplist[idump]]- $\scriptscriptstyle\bigcirc$ write();  

# New:  

auto idump = output- $>$ get_dump_by_id(arg[iarg+1]);   
if (!idump) error- $\cdot>$ all(FLERR,"Dump ID $\{\}$ in hyper command does not exist", arg[iarg+1]);   
dumplist.emplace_back(idump);   
[...] if (dumpflag) for (auto idump $^{\ast}$ dumplist) idump- $\scriptscriptstyle\bigcirc$ write();  

This change is required or else the code will not compile.  

# 4.10.15 Refactored grid communication using Grid3d/Grid2d classes instead of GridComm  

Changed in version 22Dec2022.  

The GridComm class was for creating and communicating distributed grids was replaced by the Grid3d class with added functionality. A Grid2d class was also added for additional flexibility.  

The new functionality and commands using the two grid classes are discussed on the following documentation pages:  

• Using distributed grids • Use of distributed grids within style classes  

If you have custom LAMMPS code, which uses the GridComm class, here are some notes on how to adapt it for using the Grid3d class.  

(1) The constructor has changed to allow the Grid3d / Grid2d classes to partition the global grid across processors, both for owned and ghost grid cells. Previously any class which called GridComm performed the partitioning itself and that information was passed in the GridComm::GridComm() constructor. There are several “set” functions which can be called to alter how Grid3d / Grid2d perform the partitioning. They should be sufficient for most use cases of the grid classes.   
(2) The partitioning is triggered by the setup_grid() method.   
(3) The setup() method of the GridComm class has been replaced by the setup_comm() method in the new grid classes. The syntax for the forward_comm() and reverse_comm() methods is slightly altered as is the syntax of the associated pack/unpack callback methods. But the functionality of these operations is the same as before.   
(4) The new Grid3d / Grid2d classes have additional functionality for dynamic load-balancing of grids and their associated data across processors. This did not exist in the GridComm class.  

This and more is explained in detail on the Use of distributed grids within style classes page. The following LAMMPS source files can be used as illustrative examples for how the new grid classes are used by computes, fixes, and various KSpace solvers which use distributed FFT grids:  

• src/fix_ave_grid.cpp  
• src/compute_property_grid.cpp• src/EXTRA-FIX/fix_ttm_grid.cpp• src/KSPACE/pppm.cpp  

This change is required or else the code will not compile.  

# 4.11 Writing plugins  

Plugins provide a mechanism to add functionality to a LAMMPS executable without recompiling LAMMPS. The functionality for this and the plugin command are implemented in the PLUGIN package which must be installed to use plugins.  

Plugins use the operating system’s capability to load dynamic shared object (DSO) files in a way similar shared libraries and then reference specific functions in those DSOs. Any DSO file with plugins has to include an initialization function with a specific name, “lammpsplugin_init”, that has to follow specific rules described below. When loading the DSO with the “plugin” command, this function is looked up and called and will then register the contained plugin(s) with LAMMPS.  

When the environment variable LAMMPS_PLUGIN_PATH is set, then LAMMPS will search the directory (or directories) listed in this path for files with names that end in plugin.so (e.g. helloplugin.so) and will try to load the contained plugins automatically at start-up. For plugins that are loaded this way, the behavior of LAMMPS should be identical to a binary where the corresponding code was compiled in statically as a package.  

From the programmer perspective this can work because of the object oriented design of LAMMPS where all pair style commands are derived from the class Pair, all fix style commands from the class Fix and so on and usually only functions present in those base classes are called directly. When a pair_style command command or fix command command is issued a new instance of such a derived class is created. This is done by a so-called factory function which is mapped to the style name. Thus when, for example, the LAMMPS processes the command pair_style lj/cut 2.5, LAMMPS will look up the factory function for creating the PairLJCut class and then execute it. The return value of that function is a Pair \* pointer and the pointer will be assigned to the location for the currently active pair style.  

A DSO file with a plugin thus has to implement such a factory function and register it with LAMMPS so that it gets added to the map of available styles of the given category. To register a plugin with LAMMPS an initialization function has to be present in the DSO file called lammpsplugin_init which is called with three void \* arguments: a pointer to the current LAMMPS instance, a pointer to the opened DSO handle, and a pointer to the registration function. The registration function takes two arguments: a pointer to a lammpsplugin_t struct with information about the plugin and a pointer to the current LAMMPS instance. Please see below for an example of how the registration is done.  

# 4.11.1 Members of lammpsplugin_t  

<html><body><table><tr><td>Member</td><td>Description</td></tr><tr><td>version</td><td>LAMMPS Version string the plugin was compiled for</td></tr><tr><td>style</td><td>Style of the plugin (pair, bond, fix, command, etc.)</td></tr><tr><td>name</td><td>Name of the plugin style</td></tr><tr><td>info</td><td>Stringwithinformation about theplugin</td></tr><tr><td>author</td><td>String with the name and email of the author</td></tr><tr><td>creator.v1</td><td>Pointer to factory function for pair, bond, angle, dihedral, improper, kspace, or command styles</td></tr><tr><td>creator.v2</td><td>Pointer to factory function for compute, fix, or region styles</td></tr><tr><td>handle</td><td>Pointer to the open DsO file handle</td></tr></table></body></html>  

Only one of the two alternate creator entries can be used at a time and which of those is determined by the style of plugin. The “creator.v1” element is for factory functions of supported styles computing forces (i.e. pair, bond, angle, dihedral, or improper styles) or command styles and the function takes as single argument the pointer to the LAMMPS instance. The factory function is cast to the lammpsplugin_factory1 type before assignment. The “creator.v2” element is for factory functions creating an instance of a fix, compute, or region style and takes three arguments: a pointer to the LAMMPS instance, an integer with the length of the argument list and a char \*\* pointer to the list of arguments. The factory function pointer needs to be cast to the lammpsplugin_factory2 type before assignment.  

# 4.11.2 Pair style example  

As an example, a hypothetical pair style plugin “morse2” implemented in a class PairMorse2 in the files pair_morse2. h and pair_morse2.cpp with the factory function and initialization function would look like this:  

#include "lammpsplugin.h"   
#include "version.h"   
#include "pair_morse2.h"   
using namespace LAMMPS_NS;   
static Pair \*morse2creator(LAMMPS \*lmp) return new PairMorse2(lmp);   
extern "C" void lammpsplugin_init(void $^*$ lmp, void $^*$ handle, void \*regfunc) lammpsplugin_regfunc register_plugin = (lammpsplugin_regfunc) regfunc; lammpsplugin_t plugin; plugin.version = LAMMPS_VERSION; plugin.style "pair"; plugin.name "morse2"; plugin.info $=11$ Morse2 variant pair style v1.0"; plugin.author $=$ "Axel Kohlmeyer (akohlmey@gmail.com)"; plugin.creator.v1 = (lammpsplugin_factory1 \*) &morse2creator; plugin.handle $=$ handle; (\*register_plugin)(&plugin,lmp);  

The factory function in this example is called morse2creator(). It receives a pointer to the LAMMPS class as only argument and thus has to be assigned to the creator.v1 member of the plugin struct and cast to the lammpsplugin_factory1 function pointer type. It returns a pointer to the allocated class instance derived from the Pair class. This function may be declared static to avoid clashes with other plugins. The name of the derived class, PairMorse2, however must be unique inside the entire LAMMPS executable.  

# 4.11.3 Fix style example  

If the factory function is for a fix or compute, which take three arguments (a pointer to the LAMMPS class, the number of arguments and the list of argument strings), then the pointer type is lammpsplugin_factory2 and it must be assigned to the creator. $\nu2$ member of the plugin struct. Below is an example for that:  

#include "lammpsplugin.h"   
#include "version.h"   
#include "fix_nve2.h"   
using namespace LAMMPS_NS;   
static Fix \*nve2creator(LAMMPS \*lmp, int argc, char $^{**}$ argv)   
return new FixNVE2(lmp,argc,argv);   
extern "C" void lammpsplugin_init(void \*lmp, void $^*$ handle, void \*regfunc) lammpsplugin_regfunc register_plugin = (lammpsplugin_regfunc) regfunc; lammpsplugin_t plugin; plugin.version = LAMMPS_VERSION; plugin.style $\begin{array}{r l}{\mathbf{\tau}}&{{}=\mathbf{\tau}^{||}\mathrm{fix}^{||}}\end{array}$ ; plugin.name $={}^{\"}\mathrm{nve2^{\"}}$ ; plugin.info = "NVE2 variant fix style v1.0"; plugin.author = "Axel Kohlmeyer (akohlmey@gmail.com)"; plugin.creator.v2 = (lammpsplugin_factory2 \*) &nve2creator; plugin.handle = handle; (\*register_plugin)(&plugin,lmp);  

# 4.11.4 Command style example  

Command styles also use the first variant of factory function as demonstrated in the following example, which also shows that the implementation of the plugin class may be within the same source file as the plugin interface code:  

<html><body><table><tr><td>#include "lammpsplugin.h"</td><td></td><td></td><td></td></tr><tr><td rowspan="2">#include "comm.h"</td><td></td><td></td><td></td></tr><tr><td>e "error.h"</td><td></td><td></td></tr><tr><td rowspan="2">#include</td><td>"command.h"</td><td></td><td></td></tr><tr><td>#include "version.h"</td><td></td><td></td></tr><tr><td rowspan="2"></td><td></td><td></td><td></td></tr><tr><td>#include <cstring></td><td></td><td></td></tr><tr><td rowspan="2"></td><td></td><td></td><td></td></tr><tr><td>namespace LAMMPS_NS </td><td></td><td></td></tr><tr><td rowspan="2">class Hello : public public:</td><td>Command {</td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table></body></html>  

# 4.11. Writing plugins  

(continued from previous page)  

Hello(class LAMMPS \*lmp) : Command(lmp) {}; void command(int, char \*\*); };   
using namespace LAMMPS_NS;   
void Hello::command(int argc, char \*\*argv) if (argc $\mathrel{\mathop:}=1$ ) error- $\scriptscriptstyle\bigcirc$ all(FLERR,"Illegal hello command"); if (comm- $>\mathrm{me}==0$ ) utils::logmesg(lmp,fmt::format("Hello, {}!\n",argv[0]));   
static void hellocreator(LAMMPS \*lmp)   
return new Hello(lmp);   
extern "C" void lammpsplugin_init(void $^*$ lmp, void $^*$ handle, void \*regfunc)   
{   
lammpsplugin_t plugin;   
lammpsplugin_regfunc register_plugin = (lammpsplugin_regfunc) regfunc; plugin.version = LAMMPS_VERSION; plugin.style = "command"; plugin.name = "hello"; plugin.info = "Hello world command v1.1"; plugin.author = "Axel Kohlmeyer (akohlmey@gmail.com)";   
plugin.creator.v1 = (lammpsplugin_factory1 \*) &hellocreator; plugin.handle = handle; (\*register_plugin)(&plugin,lmp);  

# 4.11.5 Additional Details  

The initialization function must be called lammpsplugin_init, it must have C bindings and it takes three void pointers as arguments. The first is a pointer to the LAMMPS class that calls it and it needs to be passed to the registration function. The second argument is a pointer to the internal handle of the DSO file, this needs to be added to the plugin info struct, so that the DSO can be closed and unloaded when all its contained plugins are unloaded. The third argument is a function pointer to the registration function and needs to be stored in a variable of lammpsplugin_regfunc type and then called with a pointer to the lammpsplugin_t struct and the pointer to the LAMMPS instance as arguments to register a single plugin. There may be multiple calls to multiple plugins in the same initialization function.  

To register a plugin a struct of the lammpsplugin_t needs to be filled with relevant info: current LAMMPS version string, kind of style, name of style, info string, author string, pointer to factory function, and the DSO handle. The registration function is called with a pointer to the address of this struct and the pointer of the LAMMPS class. The registration function will then add the factory function of the plugin style to the respective style map under the provided name. It will also make a copy of the struct in a list of all loaded plugins and update the reference counter for loaded plugins from this specific DSO file.  

The pair style itself (i.e. the PairMorse2 class in this example) can be written just like any other pair style that is included in LAMMPS. For a plugin, the use of the PairStyle macro in the section encapsulated by #ifdef PAIR_CLASS is not needed, since the mapping of the class name to the style name is done by the plugin registration function with the information from the lammpsplugin_t struct. It may be included in case the new code is intended to be later included in LAMMPS directly.  

A plugin may be registered under an existing style name. In that case the plugin will override the existing code. This can be used to modify the behavior of existing styles or to debug new versions of them without having to re-compile or re-install all of LAMMPS.  

# 4.11.6 Compiling plugins  

Plugins need to be compiled with the same compilers and libraries (e.g. MPI) and compilation settings (MPI on/off, OpenMP, integer sizes) as the LAMMPS executable and library. Otherwise the plugin will likely not load due to mismatches in the function signatures (LAMMPS is $\mathrm{C}{+}{+}$ so scope, type, and number of arguments are encoded into the symbol names and thus differences in them will lead to failed plugin load commands). Compilation of the plugin can be managed via both, CMake or traditional GNU makefiles. Some examples that can be used as a template are in the examples/plugins folder. The CMake script code has some small adjustments to allow building the plugins for running unit tests with them.  

Another example that converts the KIM package into a plugin can be found in the examples/kim/plugin folder. No changes to the sources of the KIM package themselves are needed; only the plugin interface and loader code needs to be added. This example only supports building with CMake, but is probably a more typical example. To compile you need to run CMake with -DLAMMPS_SOURCE_DIR $,=<$ <path/to/lammps/src/folder>. Other configuration setting are identical to those for compiling LAMMPS.  

A second example for a plugin from a package is in the examples/PACKAGES/pace/plugin folder that will create a plugin from the ML-PACE package. In this case the bulk of the code is in a static external library that is being downloaded and compiled first and then combined with the pair style wrapper and the plugin loader. This example also contains a NSIS script that can be used to create an Installer package for Windows (the mutual licensing terms of the external library and LAMMPS conflict when distributing binaries, so the ML-PACE package cannot be linked statically, but the LAMMPS headers required to build the plugin are also available under a less restrictive license). This will automatically set the required environment variable and launching a (compatible) LAMMPS binary will load and register the plugin and the ML-PACE package can then be used as it was linked into LAMMPS.  

# 4.12 Adding tests for unit testing  

This section discusses adding or expanding tests for the unit test infrastructure included into the LAMMPS source code distribution. Unlike example inputs, unit tests focus on testing the “local” behavior of individual features, tend to run fast, and should be set up to cover as much of the added code as possible. When contributing code to the distribution, the LAMMPS developers will appreciate if additions to the integrated unit test facility are included.  

Given the complex nature of MD simulations where many operations can only be performed when suitable “real” simulation environment has been set up, not all tests will be unit tests in the strict definition of the term. They are rather executed on a more abstract level by issuing LAMMPS script commands and then inspecting the changes to the internal data. For some classes of tests, generic test programs have been written that can be applied to parts of LAMMPS that use the same interface (via polymorphism) and those are driven by input files, so tests can be added by simply adding more of those input files. Those tests should be seen more as a hybrid between unit and regression tests.  

When adding tests it is recommended to also enable support for code coverage reporting, and study the coverage reports so that it is possible to monitor which parts of the code of a given file are executed during the tests and which tests would need to be added to increase the coverage.  

The tests are grouped into categories and corresponding folders. The following sections describe how the tests are implemented and executed in those categories with increasing complexity of tests and implementation.  

# 4.12.1 Tests for utility functions  

These tests are driven by programs in the unittest/utils folder and most closely resemble conventional unit tests. There is one test program for each namespace or group of classes or file. The naming convention for the sources and executables is that they start with with test_. The following sources and groups of tests are currently available:  

<html><body><table><tr><td>File name:</td><td>Test name:</td><td>Description:</td></tr><tr><td>test argutils.cpp</td><td>ArgInfo</td><td>Tests for ArgInfo class used by LAMMPS</td></tr><tr><td>test fmtlib.cpp</td><td>FmtLib</td><td>Tests for fmtlib:: functions used by LAMMPS</td></tr><tr><td>test math eigen impl.cpp</td><td>MathEigen</td><td>Tests for MathEigen: classes and functions</td></tr><tr><td>test mempool.cpp</td><td>MemPool</td><td>Tests for MyPage and MyPoolChunk</td></tr><tr><td>test tokenizer.cpp</td><td>Tokenizer</td><td>Tests for Tokenizer andValueTokenizer</td></tr><tr><td>test utils.cpp</td><td>Utils</td><td>Tests for utils: functions</td></tr></table></body></html>  

To add tests either an existing source file needs to be modified or a new source file needs to be added to the distribution and enabled for testing. To add a new file suitable CMake script code needs to be added to the CMakeLists.txt file in the unittest/utils folder. Example:  

add_executable(test_tokenizer test_tokenizer.cpp)   
target_link_libraries(test_tokenizer PRIVATE lammps GTest::GMockMain GTest::GMock GTest::GTest)   
add_test(Tokenizer test_tokenizer)  

This adds instructions to build the test_tokenizer executable from test_tokenizer.cpp and links it with the GoogleTest libraries and the LAMMPS library as well as it uses the main() function from the GoogleMock library of GoogleTest. The third line registers the executable as a test program to be run from ctest under the name Tokenizer.  

The test executable itself will execute multiple individual tests through the GoogleTest framework. In this case each test consists of creating a tokenizer class instance with a given string and explicit or default separator choice, and then executing member functions of the class and comparing their results with expected values. A few examples:  

<html><body><table><tr><td>TEST(Tokenizer, empty_string)</td></tr><tr><td>Tokenizer t("",""); ASSERT_EQ(t.countO), 0);</td></tr><tr><td></td></tr><tr><td>TEST(Tokenizer, two _words)</td></tr><tr><td>Tokenizer t("test word", " ");</td></tr><tr><td>ASSERT_EQ(t.count(), 2);</td></tr><tr><td></td></tr><tr><td>TEST(Tokenizer, default _separators)</td></tr><tr><td></td></tr><tr><td>Tokenizer t(" \r\n test \t word \f");</td></tr><tr><td>ASSERT_THAT(t.next(), Eq("test"));</td></tr><tr><td>ASSERT_THAT(t.next(), Eq("word"); ASSERT _EQ(t.count(), 2);</td></tr></table></body></html>  

Each of these TEST functions will become an individual test run by the test program. When using the ctest command as a front end to run the tests, their output will be suppressed and only a summary printed, but adding the ‘-V’ option will then produce output from the tests above like the following:  

<html><body><table><tr><td colspan="3"></td></tr><tr><td></td><td>1:RUN</td><td>]Tokenizer.empty_string</td></tr><tr><td>1:</td><td></td><td>OK ] Tokenizer.empty _string (0 ms)</td></tr><tr><td></td><td>1:RUN</td><td>Tokenizer.two words</td></tr><tr><td>1:</td><td></td><td>OK ｜ Tokenizer.two words s (0 ms)</td></tr><tr><td></td><td>1:RUN</td><td>Tokenizer.default _separators</td></tr><tr><td>1：</td><td>OK ｜ Tokenizer.default</td><td>t_separators (0 ms</td></tr><tr><td></td><td colspan="2"></td></tr></table></body></html>  

The MathEigen test collection has been adapted from a standalone test and does not use the GoogleTest framework and thus not representative. The other test sources, however, can serve as guiding examples for additional tests.  

# 4.12.2 Tests for individual LAMMPS commands  

The tests unittest/commands are a bit more complex as they require to first create a LAMMPS class instance and then use the $C{+}{+}A P I$ to pass individual commands to that LAMMPS instance. For that reason these tests use a GoogleTest “test fixture”, i.e. a class derived from testing::Test that will create (and delete) the required LAMMPS class instance for each set of tests in a TEST_F() function. Please see the individual source files for different examples of setting up suitable test fixtures. Here is an example for implementing a test using a fixture by first checking the default value and then issuing LAMMPS commands and checking whether they have the desired effect:  

TEST_F(SimpleCommandsTest, ResetTimestep)   
{ ASSERT_EQ(lmp->update->ntimestep, 0); BEGIN_HIDE_OUTPUT(); command("reset_timestep 10"); END_HIDE_OUTPUT(); ASSERT_EQ(lmp- $\scriptscriptstyle\bigcirc$ update- $>$ ntimestep, 10); BEGIN_HIDE_OUTPUT(); command("reset_timestep 0"); END_HIDE_OUTPUT(); ASSERT_EQ(lmp- $\scriptscriptstyle\bigcirc$ update- $\cdot>$ ntimestep, 0); TEST_FAILURE(".\*ERROR: Timestep must be $>=0.^{\ast\intercal}$ , command("reset_timestep -10");); TEST_FAILURE(".\*ERROR: Illegal reset_timestep . $^{*11}$ , command("reset_timestep");); TEST_FAILURE(".\*ERROR: Illegal reset_timestep .\*", command("reset_timestep 10 10");); TEST_FAILURE(".\*ERROR: Expected integer . $^{*11}$ , command("reset_timestep xxx"););  

Please note the use of the BEGIN_HIDE_OUTPUT and END_HIDE_OUTPUT functions that will capture output from running LAMMPS. This is normally discarded but by setting the verbose flag (via setting the TEST_ARGS environment variable, TEST_ARGS $=-\mathrm{v}$ ) it can be printed and used to understand why tests fail unexpectedly.  

The specifics of so-called “death tests”, i.e. conditions where LAMMPS should fail and throw an exception, are implemented in the TEST_FAILURE() macro. These tests operate by capturing the screen output when executing the failing command and then comparing that with a provided regular expression string pattern. Example:  

TEST_F(SimpleCommandsTest, UnknownCommand)   
{ TEST_FAILURE(".\*ERROR: Unknown command.\*", lmp- $\cdot>$ input- $\cdot>$ one("XXX one two"););   
}  

The following test programs are currently available:  

# 4.12. Adding tests for unit testing  

<html><body><table><tr><td>File name:</td><td>Test name:</td><td>Description:</td></tr><tr><td>test simple commands.cpp</td><td>SimpleCommands</td><td>Tests for LAMMPS commands that do not require a box</td></tr><tr><td>test latticeregion.cpp</td><td>LatticeRegion</td><td>Tests to validate the lattice and region commands</td></tr><tr><td>test groups.cpp</td><td>GroupTest</td><td>Teststovalidatetheg group command</td></tr><tr><td>test variables.cpp</td><td>VariableTest</td><td>Teststovalidatethevariablecommand</td></tr><tr><td>test kim_commands.cpp</td><td>KimCommands</td><td>Tests for several commands from the KIM package</td></tr><tr><td>test reset atoms.cpp</td><td>ResetAtoms</td><td>Tests tovalidatethereset_atomssub-commands</td></tr></table></body></html>  

# 4.12.3 Tests for the C-style library interface  

Tests for validating the LAMMPS C-style library interface are in the unittest/c-library folder. They text either utility functions or LAMMPS commands, but use the functions implemented in src/library.cpp as much as possible. There may be some overlap with other tests as far as the LAMMPS functionality is concerned, but the focus is on testing the C-style library API. The tests are distributed over multiple test programs which try to match the grouping of the functions in the source code and in the manual.  

This group of tests also includes tests invoking LAMMPS in parallel through the library interface, provided that LAMMPS was compiled with MPI support. These include tests where LAMMPS is run in multi-partition mode or only on a subset of the MPI world communicator. The CMake script code for adding this kind of test looks like this:  

if (BUILD_MPI)   
add_executable(test_library_mpi test_library_mpi.cpp) target_link_libraries(test_library_mpi PRIVATE lammps GTest::GTest GTest::GMock) target_compile_definitions(test_library_mpi PRIVATE \${TEST_CONFIG_DEFS})   
add_mpi_test(NAME LibraryMPI NUM_PROCS 4 COMMAND $\$<$ TARGET_FILE:test_library_   
,→mpi>)   
endif()  

Note the custom function add_mpi_test() which adapts how ctest will execute the test so it is launched in parallel (with 4 MPI ranks).  

# 4.12.4 Tests for the Python module and package  

The unittest/python folder contains primarily tests for classes and functions in the LAMMPS python module but also for commands in the PYTHON package. These tests are only enabled, if the necessary prerequisites are detected or enabled during configuration and compilation of LAMMPS (shared library build enabled, Python interpreter found, Python development files found).  

The Python tests are implemented using the unittest standard Python module and split into multiple files with similar categories as the tests for the C-style library interface.  

# 4.12.5 Tests for the Fortran interface  

Tests for using the Fortran module are in the unittest/fortran folder. Since they are also using the GoogleTest library, they require test wrappers written in $\mathrm{C}{+}{+}$ that will call fortran functions with a C function interface through ISO_C_BINDINGS which will in turn call the functions in the LAMMPS Fortran module.  

# 4.12.6 Tests for the $\hphantom{000}\mathbf{C}++$ -style library interface  

The tests in the unittest/cplusplus folder are somewhat similar to the tests for the C-style library interface, but do not need to test the convenience and utility functions that are only available through the C-style library interface. Instead they focus on the more generic features that are used in LAMMPS internally. This part of the unit tests is currently still mostly in the planning stage.  

# 4.12.7 Tests for reading and writing file formats  

The unittest/formats folder contains test programs for reading and writing files like data files, restart files, potential files or dump files. This covers simple things like the file i/o convenience functions in the utils:: namespace to complex tests of atom styles where creating and deleting of atoms with different properties is tested in different ways and through script commands or reading and writing of data or restart files.  

# 4.12.8 Tests for styles computing or modifying forces  

These are tests common configurations for pair styles, bond styles, angle styles, kspace styles and certain fix styles. Those are tests driven by some test executables build from sources in the unittest/force-styles folder and use LAMMPS input template and data files as well as input files in YAML format from the unittest/force-styles/tests folder. The YAML file names have to follow some naming conventions so they get associated with the test programs and categorized and listed with canonical names in the list of tests as displayed by ctest -N. If you add a new YAML file, you need to re-run CMake to update the corresponding list of tests.  

A minimal YAML file for a (molecular) pair style test will looks something like the following (see mol-pair-zero.yaml):  

lammps_version: 24 Aug 2020   
date_generated: Tue Sep 15 09:44:21 202   
epsilon: 1e-14   
prerequisites: ! | atom full pair zero   
pre_commands: ! ""   
post_commands: ! ""   
input_file: in.fourmol   
pair_style: zero 8.0   
pair_coeff: ! | \* \*   
extract: ! ""   
natoms: 29   
init_vdwl: 0   
init_coul: 0  

The following table describes the available keys and their purpose for testing pair styles:  

<html><body><table><tr><td>Key:</td><td>Description:</td></tr><tr><td>lammps_version</td><td>LAMMPS version used to last update the reference data</td></tr><tr><td>date_generated</td><td>date when the file was last updated</td></tr><tr><td>epsilon</td><td>base value for the relative precision required for tests to pass</td></tr><tr><td>prerequisites</td><td>list of style kind / style name pairs required to run the test</td></tr><tr><td>pre_commands</td><td>LAMMPS commands to be executed before the input template file is read</td></tr><tr><td>post_commands</td><td>LAMMPS commands tobe executed right before the actual tests</td></tr><tr><td>input_file</td><td>LAMMPS input file template based on pair style zero</td></tr><tr><td>pair_style</td><td>arguments to the pair_style command to be tested</td></tr><tr><td>pair_coeff</td><td>list of pair_coeff arguments to set parameters for the input template</td></tr><tr><td>extract</td><td>list of keywords supported by Pair:extractO and their dimension</td></tr><tr><td>natoms</td><td>number of atoms in the input file template</td></tr><tr><td>init_vdwl</td><td>non-Coulomb pair energy after “run O"</td></tr><tr><td>init_coul</td><td>Coulomb pair energy after “"run O"</td></tr><tr><td>init_stress</td><td>stress tensor after “run O"</td></tr><tr><td>init_forces</td><td>forces on atoms after “run O"</td></tr><tr><td>run_vdwl</td><td>non-Coulomb pair energy after “run 4"</td></tr><tr><td>run_coul</td><td>Coulomb pair energy after “run 4"</td></tr><tr><td>run_stress</td><td></td></tr><tr><td>run_forces</td><td>forces on atoms after “run 4"</td></tr></table></body></html>  

The test program will read all this data from the YAML file and then create a LAMMPS instance, apply the settings/commands from the YAML file as needed and then issue a “run $0^{\cdot\cdot}$ command, write out a restart file, a data file and a coeff file. The actual test will then compare computed energies, stresses, and forces with the reference data, issue a “run $\ddagger^{,}$ command and compare to the second set of reference data. This will be run with both the newton_pair setting enabled and disabled and is expected to generate the same results (allowing for some numerical noise). Then it will restart from the previously generated restart and compare with the reference and also start from the data file. A final check will use multi-cutoff r-RESPA (if supported by the pair style) at a 1:1 split and compare to the Verlet results. These sets of tests are run with multiple test fixtures for accelerated styles (OPT, OPENMP, INTEL, KOKKOS (OpenMP only)) and for the latter three with 4 OpenMP threads enabled. For these tests the relative error (epsilon) is lowered by a common factor due to the additional numerical noise, but the tests are still comparing to the same reference data.  

Additional tests will check whether all listed extract keywords are supported and have the correct dimensionality and the final set of tests will set up a few pairs of atoms explicitly and in such a fashion that the forces on the atoms computed from Pair::compute() will match individually with the results from Pair::single(), if the pair style does support that functionality.  

With this scheme a large fraction of the code of any tested pair style will be executed and consistent results are required for different settings and between different accelerated pair style variants and the base class, as well as for computing individual pairs through the Pair::single() method where supported.  

The test_pair_style tester is used with 4 categories of test inputs:  

• pair styles compatible with molecular systems using bonded interactions and exclusions. For pair styles requiring a KSpace style the KSpace computations are disabled. The YAML files match the pattern “mol-pair-\*.yaml” and the tests are correspondingly labeled with “MolPairStyle:\*”   
• pair styles not compatible with the previous input template. The YAML files match the pattern “atomic-pair\*.yaml” and the tests are correspondingly labeled with “AtomicPairStyle:\*”   
• manybody pair styles. The YAML files match the pattern “atomic-pair-\*.yaml” and the tests are correspondingly labeled with “AtomicPairStyle:\*”   
• kspace styles. The YAML files match the pattern “kspace-\*.yaml” and the tests are correspondingly labeled with “KSpaceStyle:\*”. In these cases a compatible pair style is defined, but the computation of the pair style  

contributions is disabled.  

The test_bond_style, test_angle_style, test_dihedral_style, and test_improper_style tester programs are set up in a similar fashion and share support functions with the pair style tester. The final group of tests in this section is for fix styles that add/manipulate forces and velocities, e.g. for time integration, thermostats and more.  

Adding a new test is easiest done by copying and modifying an existing YAML file for a style that is similar to one to be tested. The file name should follow the naming conventions described above and after copying the file, the first step is to replace the style names where needed. The coefficient values do not have to be meaningful, just in a reasonable range for the given system. It does not matter if some forces are large, for as long as they do not diverge.  

The template input files define a large number of index variables at the top that can be modified inside the YAML file to control the behavior. For example, if a pair style requires a “newton on” setting, the following can be used in as the “pre_commands” section:  

pre_commands: ! | variable newton_pair delete variable newton_pair index on  

And for a pair style requiring a kspace solver the following would be used as the “post_commands” section:  

post_commands: ! | pair_modify table 0 kspace_style pppm/tip4p 1.0e-6 kspace_modify gewald 0.3 kspace_modify compute no  

Note that this disables computing the kspace contribution, but still will run the setup. The “gewald” parameter should be set explicitly to speed up the run. For styles with long-range electrostatics, typically two tests are added one using the (slower) analytic approximation of the erfc() function and the other using the tabulated coulomb, to test both code paths. The reference results in the YAML files then should be compared manually, if they agree well enough within the limits of those two approximations.  

The test_pair_style and equivalent programs have special command-line options to update the YAML files. Running a command like  

test_pair_style mol-pair-lennard_mdf.yaml -g new.yaml will read the settings from the mol-pair-lennard_mdf.yaml file and then compute the reference data and write a new file with to new.yaml. If this step fails, there are likely some (LAMMPS or YAML) syntax issues in the YAML file that need to be resolved and then one can compare the two files to see if the output is as expected.  

It is also possible to do an update in place with:  

<html><body><table><tr><td>test _pair_s style mol-pair-lennard_mdf.yaml -u</td></tr></table></body></html>  

And one can finally run the full set of tests with:  

![](images/a262ac4419dd59fa36ef1c5033a424af21b4583555911277e33085e17f4be219.jpg)  

# Note  

These kinds of tests can be very sensitive to compiler optimization and thus the expectation is that they pass with compiler optimization turned off. When compiler optimization is enabled, there may be some failures, but one has to carefully check whether those are acceptable due to the enhanced numerical noise from reordering floating-point math operations or due to the compiler mis-compiling the code. That is not always obvious.  

# 4.12.9 Tests for programs in the tools folder  

The unittest/tools folder contains tests for programs in the tools folder. This currently only contains tests for the LAMMPS shell, which are implemented as a python scripts using the unittest Python module and launching the tool commands through the subprocess Python module.  

# 4.12.10 Troubleshooting failed unit tests  

There are by default no unit tests for newly added features (e.g. pair, fix, or compute styles) unless your pull request also includes tests for these added features. If you are modifying some existing LAMMPS features, you may see failures for existing tests, if your modifications have some unexpected side effects or your changes render the existing test invalid. If you are adding an accelerated version of an existing style, then only tests for INTEL, KOKKOS (with OpenMP only), OPENMP, and OPT will be run automatically. Tests for the GPU package are time consuming and thus are only run after a merge, or when a special label, gpu_unit_tests is added to the pull request. After the test has started, it is often best to remove the label since every PR activity will re-trigger the test (that is a limitation of triggering a test with a label). Support for unit tests using KOKKOS with GPU acceleration is currently not supported.  

When you see a failed build on GitHub, click on Details to be taken to the corresponding LAMMPS Jenkins CI web page. Click on the “Exit” symbol near the Logout button on the top right of that page to go to the “classic view”. In the classic view, there is a list of the individual runs that make up this test run (they are shown but cannot be inspected in the default view). You can click on any of those. Clicking on Test Result will display the list of failed tests. Click on the “Status” column to sort the tests based on their Failed or Passed status. Then click on the failed test to expand its output.  

For example, the following output snippet shows the failed unit test  

[ RUN ] PairStyle.gpu   
/home/builder/workspace/dev/pull_requests/ubuntu_gpu/unit_tests/cmake_gpu_opencl_mixed   
$\hookrightarrow$ smallbig_clang_static/unittest/force-styles/test_main.cpp:63: Failure   
Expected: (err) $<=$ (epsilon)   
Actual: 0.00018957912910606503 vs 0.0001   
Google Test trace:   
/home/builder/workspace/dev/pull_requests/ubuntu_gpu/unit_tests/cmake_gpu_opencl_mixed   
$\hookrightarrow$ smallbig_clang_static/unittest/force-styles/test_main.cpp:56: EXPECT_FORCES: init_forces␣   
$\hookrightarrow$ (newton off)   
/home/builder/workspace/dev/pull_requests/ubuntu_gpu/unit_tests/cmake_gpu_opencl_mixed   
$\hookrightarrow$ smallbig_clang_static/unittest/force-styles/test_main.cpp:64: Failure   
Expected: (err) $<=$ (epsilon)   
Actual: 0.00022892713393549854 vs 0.0001  

The failed assertions provide line numbers in the test source (e.g. test_main.cpp:56), from which one can understand what specific assertion failed.  

Note that the force style engine runs one of a small number of systems in a rather off-equilibrium configuration with a few atoms for a few steps, writes data and restart files, uses the clear command to reset LAMMPS, and then runs from those files with different settings (e.g. newton on/off) and integrators (e.g. verlet vs. respa). Beyond potential issues/bugs in the source code, the mismatch between the expected and actual values could be that force arrays are not properly cleared between multiple run commands or that class members are not correctly initialized or written to or read from a data or restart file.  

While the epsilon (relative precision) for a single, IEEE 754 compliant, double precision floating point operation is at about $2.2\mathrm{e}{-16}$ , the achievable precision for the tests is lower due to most numbers being sums over intermediate results for which the non-associativity of floating point math leads to larger errors. As a rule of thumb, the test epsilon can often be in the range 5.0e-14 to 1.0e-13. But for “noisy” force kernels, e.g. those a larger amount of arithmetic operations involving exp(), log() or sin() functions, and also due to the effect of compiler optimization or differences between compilers or platforms, epsilon may need to be further relaxed, sometimes epsilon can be relaxed to 1.0e12. If interpolation or lookup tables are used, epsilon may need to be set to $1.0\mathrm{e}{-10}$ or even higher. For tests of accelerated styles, the per-test epsilon is multiplied by empirical factors that take into account the differences in the order of floating point operations or that some or most intermediate operations may be done using approximations or with single precision floating point math.  

To rerun a failed unit test individually, change to the build directory and run the test with verbose output. For example, ctest with the -V flag also shows the exact command of the test. One can then use gdb --args to further debug and catch exceptions with the test command, for example,  

gdb --args /path/to/lammps/build/test_pair_style /path/to/lammps/unittest/force-styles/tests/mol-pair,→lj_cut_coul_long.yaml  

It is recommended to configure the build with -D BUILD_SHARED_LIBS $=$ on and use a custom linker to shorten the build time during recompilation. Installing ccache in your development environment helps speed up recompilation by caching previous compilations and detecting when the same compilation is being done again. Please see Development build options for further details.  

# 4.13 $\hphantom{000}\mathbf{C}\tilde{+}+$ base classes  

LAMMPS is designed to be used as a $\mathrm{C}{+}{+}$ class library where one can set up and drive a simulation through creating a class instance and then calling some abstract operations or commands on that class or its member class instances. These are interfaced to the C library API, which providing an additional level of abstraction simplification for common operations. The C API is also the basis for calling LAMMPS from Python or Fortran.  

When used from a $\mathrm{C}{+}{+}$ program, most of the symbols and functions in LAMMPS are wrapped into the LAMMPS_NS namespace so they will not collide with your own classes or other libraries. This, however, does not extend to the additional libraries bundled with LAMMPS in the lib folder and some of the low-level code of some packages.  

Behind the scenes this is implemented through inheritance and polymorphism where base classes define the abstract interface and derived classes provide the specialized implementation for specific models or optimizations or ports to accelerator platforms. This document will provide an outline of the fundamental class hierarchy and some selected examples for derived classes of specific models.  

# Note  

Please see the note about thread-safety in the library Howto doc page.  

# 4.13.1 LAMMPS Class  

The LAMMPS class is encapsulating an MD simulation state and thus it is the class that needs to be created when starting a new simulation system state. The LAMMPS executable essentially creates one instance of this class and passes the command-line flags and tells it to process the provided input (a file or stdin). It shuts the class down when control is returned to it and then exits. When using LAMMPS as a library from another code it is required to create an instance of this class, either directly from $\mathrm{C}{+}{+}$ with new LAMMPS() or through one of the library interface functions like lammps_open() of the C-library interface, or the lammps.lammps class constructor of the Python module, or the lammps() constructor of the Fortran module.  

In order to avoid clashes of function names, all of the core code in LAMMPS is placed into the LAMMPS_NS namespace. Functions or variables outside of that namespace must be “static”, i.e. visible only to the scope of the file/object they are defined in. Code in packages or the libraries in the lib folder may not adhere to this as some of them are adapted from legacy code or consist of external libraries with their own requirements and policies.  

# class LAMMPS  

LAMMPS simulation instance.  

The LAMMPS class contains pointers of all constituent class instances and global variables that are used by a LAMMPS simulation. Its contents represent the entire state of the simulation.  

The LAMMPS class manages the components of an MD simulation by creating, deleting, and initializing instances of the classes it is composed of, processing command-line flags, and providing access to some global properties. The specifics of setting up and running a simulation are handled by the individual component class instances.  

# Public Functions  

const char \*non_pair_suffix() const  

Return suffix for non-pair styles depending on pair_only_flag.  

# Returns  

suffix or null pointer  

const char \*match_style(const char \*style, const char \*name)  

Return name of package that a specific style belongs to  

This function checks the given name against all list of styles for all types of styles and if the name and the style match, it returns which package this style belongs to.  

# Parameters  

• style – Type of style (e.g. atom, pair, fix, etc.) • name – Name of style  

# Returns  

Name of the package this style is part of LAMMPS(argv &args, MPI_Comm) Create a LAMMPS simulation instance  

# Parameters  

• args – list of arguments communicator – MPI communicator used by this LAMMPS instance  

LAMMPS(int, char\*\*, MPI_Comm)  

Create a LAMMPS simulation instance  

The LAMMPS constructor starts up a simulation by allocating all fundamental classes in the necessary order, parses input switches and their arguments, initializes communicators, screen and logfile output FILE pointers.  

# Parameters  

• narg – number of arguments   
• arg – list of arguments   
• communicator – MPI communicator used by this LAMMPS instance  

\~LAMMPS() noexcept(false)  

Shut down a LAMMPS simulation instance  

The LAMMPS destructor shuts down the simulation by deleting top-level class instances, closing screen and log files for the global instance (aka “world”) and files and MPI communicators in sub-partitions (“universes”). Then it deletes the fundamental class instances and copies of data inside the class.  

# Public Static Functions  

static bool is_installed_pkg(const char \*pkg) Return true if a LAMMPS package is enabled in this binary  

# Parameters  

pkg – name of package  

# Returns  

true if yes, else false  

static std::vector<char $^*>$ argv_pointers(argv &args) Create vector of argv string pointers including terminating nullptr element  

# Parameters  

args – list of arguments  

class Pointers  

Base class for LAMMPS features.  

The Pointers class contains references to many of the pointers and members of the LAMMPS_NS::LAMMPS class. Derived classes thus gain access to the constituent class instances in the LAMMPS composite class and thus to the core functionality of LAMMPS.  

This kind of construct is needed, since the LAMMPS constructor should only be run once per LAMMPS instance and thus classes cannot be derived from LAMMPS itself. The Pointers class constructor instead only initializes $\mathrm{C}{+}{+}$ references to component pointer in the LAMMPS class.  

Subclassed by Atom, Input, PotentialFileReader  

# 4.13.2 LAMMPS Atom and AtomVec Base Classes  

class Atom $:$ protected Pointers  

Class to provide access to atom data.  

The Atom class provides access to atom style related global settings and per-atom data that is stored with atoms and migrates with them from sub-domain to sub-domain as atoms move around. This includes topology data, which is stored with either one specific atom or all atoms involved depending on the settings of the newton command.  

The actual per-atom data is allocated and managed by one of the various classes derived from the AtomVec class as determined by the atom_style command. The pointers in the Atom class are updated by the AtomVec class as needed.  

# Public Functions  

Atom(class LAMMPS\*)  

Atom class constructor  

This resets and initializes all kinds of settings, parameters, and pointer variables for per-atom arrays. This also initializes the factory for creating instances of classes derived from the AtomVec base class, which correspond to the selected atom style.  

# Parameters  

_lmp – pointer to the base LAMMPS class int find_custom(const char\*, int&, int&)  

Find a custom per-atom property with given name.  

This function returns the list index of a custom per-atom property with the name “name”, also returning by reference its data type and number of values per atom.  

# Parameters  

• name – Name of the property (w/o a “i_” or “d_” or “i2_” or “d2_” prefix) • &flag – Returns data type of property: 0 for int, 1 for double • &cols – Returns number of values: 0 for a single value, 1 or more for a vector of values  

# Returns  

index of property in the respective list of propertiesint find_custom_ghost(const char\*, int&, int&, int&)  

Find a custom per-atom property with given name and retrieve ghost property.  

This function returns the list index of a custom per-atom property with the name “name”, also returning by reference its data type, number of values per atom, and if it is communicated to ghost particles. Classes rarely need to check on ghost communication and so find_custom is typically preferred to this function. See pair amoeba for an example where checking ghost communication is necessary.  

# Parameters  

• name – Name of the property (w/o a “i_” or “d_” or “i2_” or “d2_” prefix) • &flag – Returns data type of property: 0 for int, 1 for double • &cols – Returns number of values: 0 for a single value, 1 or more for a vector of values • &ghost – Returns whether property is communicated to ghost atoms: 0 for no, 1 for yes  

# Returns  

index of property in the respective list of properties  

virtual int add_custom(const char\*, int, int, int ghost $=0$ )  

Add a custom per-atom property with the given name and type and size.  

This function will add a custom per-atom property with one or more values with the name “name” to the list of custom properties. This function is called, e.g. from fix property/atom.  

# Parameters  

• name – Name of the property (w/o a “i_” or “d_” or “i2_” or “d2_” prefix) • flag – Data type of property: 0 for int, 1 for double • cols – Number of values: 0 for a single value, 1 or more for a vector of values • ghost – Whether property is communicated to ghost atoms: 0 for no, 1 for yes  

# Returns  

index of property in the respective list of properties  

virtual void remove_custom(int, int, int)  

Remove a custom per-atom property of a given type and size.  

This will remove a property that was requested, e.g. by the fix property/atom command. It frees the allocated memory and sets the pointer to nullptr for the entry in the list so it can be reused. The lists of these pointers are never compacted or shrunk, so that indices to name mappings remain valid.  

# Parameters  

• index – Index of property in the respective list of properties • flag – Data type of property: 0 for int, 1 for double • cols – Number of values: 0 for a single value, 1 or more for a vector of values  

void \*extract(const char\*)  

Provide access to internal data of the Atom class by keyword  

This function is a way to access internal per-atom data. This data is distributed across MPI ranks and thus only the data for “local” atoms are expected to be available. Whether also data for “ghost” atoms is stored and up-to-date depends on various simulation settings.  

This table lists a large part of the supported names, their data types, length of the data area, and a short description.  

<html><body><table><tr><td>Name</td><td>Type</td><td>Items per   Description atom</td><td></td></tr><tr><td>mass</td><td>dou- ble</td><td></td><td>per-type mass. This array is NOT a per-atom array but of length ntypes+ 1, element 0 is ignored.</td></tr><tr><td>id</td><td>tagint</td><td>1</td><td>atom ID of the particles</td></tr><tr><td>type</td><td>int</td><td>1 1</td><td>atom type of the particles</td></tr><tr><td>mask</td><td>int</td><td></td><td>bitmask for mapping to groups. Individual bits are set to 0 or 1 for each group.</td></tr><tr><td>image</td><td>im- ageint</td><td></td><td>3image flags encoded into a single integer. See lammps_encode_image_fags().</td></tr><tr><td>X</td><td>dou- ble</td><td></td><td>X-, y-, and z-coordinate of the particles</td></tr><tr><td></td><td>dou- ble</td><td>3</td><td>X-, y-, and z-component of the velocity of the particles</td></tr><tr><td>f</td><td>dou- ble</td><td></td><td>X-, y-, and z-component of the force on the particles</td></tr><tr><td>molecule</td><td>int</td><td>1</td><td>molecule ID of the particles charge of the particles</td></tr><tr><td>b</td><td>dou- ble</td><td>1</td><td></td></tr><tr><td>mu</td><td>dou- ble</td><td></td><td>dipole moment of the particles</td></tr><tr><td>omega</td><td>dou- ble</td><td>3</td><td>x-, y-, and z-component of rotational velocity of the particles</td></tr><tr><td>angmom</td><td>dou- ble</td><td>3</td><td>x-, y-, and z-component of angular momentum of the particles</td></tr><tr><td>torque</td><td>dou- ble</td><td>3</td><td>x-, y-, and z-component of the torque on the particles</td></tr><tr><td>radius</td><td>dou- ble</td><td>1</td><td>radius of the (extended) particles</td></tr><tr><td>rmass</td><td>dou- ble</td><td>1</td><td>per-atom mass of the particles. nullptr if per-type masses are used. See the rmass _fag setting.</td></tr><tr><td>ellip- soid</td><td>int</td><td>1</td><td>1 if the particle is an ellipsoidal particle, O if not</td></tr><tr><td>line</td><td>int</td><td>1</td><td>1 if the particle is a line particle, O if not</td></tr><tr><td>tri body</td><td>int</td><td>1</td><td>1 if the particle is a triangulated particle, O if not</td></tr><tr><td>quat</td><td>int dou-</td><td>1 4</td><td>1 if the particle is a body particle, O if not four quaternion components of the particles</td></tr><tr><td>temper-</td><td>ble</td><td></td><td>temperature of the particles</td></tr><tr><td>ature heat-</td><td>dou- ble</td><td>1</td><td>heatflow of the particles</td></tr><tr><td>flow</td><td>dou- ble</td><td>1</td><td></td></tr><tr><td>i_name d_name</td><td>int dou-</td><td>1 1</td><td>single integer value defined by fix property/atom vector name single double value defined by fix property/atom vector name</td></tr><tr><td></td><td>ble</td><td></td><td></td></tr><tr><td>i2_name d2_name</td><td>int dou-</td><td>N N</td><td>N integer values defined by fix property/atom array name N double values defined by fix property/atom array name</td></tr></table></body></html>  

# See also  

lammps_extract_atom(), lammps_extract_atom_size()  

# See also  

extract_datatype, extract_size  

# Parameters  

name – string with the keyword of the desired property. Typically the name of the pointer variable returned  

# Returns  

pointer to the requested data cast to void \* or nullptr  

int extract_datatype(const char\*)  

Provide data type info about internal data of the Atom class  

Added in version 18Sep2020.  

# See also  

extract extract_size  

# Parameters  

name – string with the keyword of the desired property.  

# Returns  

data type constant for desired property or -1  

int extract_size(const char\*, int)  

Provide vector or array size info of internal data of the Atom class  

Added in version 19Nov2024.  

# See also  

extract extract_datatype  

# Parameters  

• name – string with the keyword of the desired property. • type – either LMP_SIZE_ROWS or LMP_SIZE_COLS for per-atom array or ignored  

# Returns  

size of the vector or size of the array for the requested dimension or -1  

struct PerAtom  

# 4.13.3 LAMMPS Input Base Class  

class Input : protected Pointers  

Class for processing commands and input files.  

The Input class contains methods for reading, pre-processing and parsing LAMMPS commands and input files and will dispatch commands to the respective class instances or contain the code to execute the commands directly. It also contains the instance of the Variable class which performs computations and text substitutions.  

# Public Functions  

Input(class LAMMPS\*, int, char\*\*) Input class constructor  

This sets up the input processing, processes the -var and -echo command-line flags, holds the factory of commands and creates and initializes an instance of the Variable class.  

To execute a command, a specific class instance, derived from Command, is created, then its command() member function executed, and finally the class instance is deleted.  

# Parameters  

• lmp – pointer to the base LAMMPS class • argc – number of entries in argv • argv – argument vector  

void file()  

Process all input from the FILE \* pointer infile  

This will read lines from infile, parse and execute them until the end of the file is reached. The infile pointer will usually point to stdin or the input file given with the -in command-line flag.  

void file(const char\*)  

Process all input from the file filename  

This function opens the file at the path filename, puts the current file pointer stored in infile on a stack and instead assigns infile with the newly opened file pointer. Then it will call the Input::file() function to read, parse and execute the contents of that file. When the end of the file is reached, it is closed and the previous file pointer from the infile file pointer stack restored to infile.  

# Parameters  

filename – name of file with LAMMPS commands  

char \*one(const std::string&)  

Process a single command from a string in single  

This function takes the text in single, makes a copy, parses that, executes the command and returns the name of the command (without the arguments). If there was no command in single it will return nullptr.  

# Parameters  

single – string with LAMMPS command  

# Returns  

string with name of the parsed command w/o arguments  

# 4.14 Platform abstraction functions  

The platform sub-namespace inside the LAMMPS_NS namespace provides a collection of wrapper and convenience functions and utilities that perform common tasks for which platform specific code would be required or for which a more high-level abstraction would be convenient and reduce duplicated code. This reduces redundant implementations and encourages consistent behavior and thus has some overlap with the “utils” sub-namespace.  

# 4.14.1 Time functions  

double LAMMPS_NS::platform::cputime()  

Return the consumed CPU time for the current process in seconds  

This is a wrapper around the POSIX function getrusage() and its Windows equivalent. It is to be used in a similar fashion as MPI_Wtime(). Its resolution may be rather low so it can only be trusted when observing processes consuming CPU time of at least a few seconds.  

# Returns  

used CPU time in seconds  

double LAMMPS_NS::platform::walltime()  

Return the wall clock state for the current process in seconds  

This clock is counting continuous time and is initialized during load of the executable/library. Its absolute value must be considered arbitrary and thus elapsed wall times are measured in taking differences. It is therefore to be used in a similar fashion as MPI_Wtime() but has a different offset, usually leading to better resolution.  

# Returns  

wall clock time in seconds  

void LAMMPS_NS::platform::usleep(int usec)  

Suspend execution for a microsecond interval  

This emulates the usleep(3) BSD function call also mentioned in POSIX.1-2001. This is not a precise delay; it may be longer, but not shorter.  

# Parameters  

usec – length of delay in microseconds  

# 4.14.2 Platform information functions  

std::string LAMMPS_NS::platform::os_info()  

Return string with the operating system version and architecture info  

# Returns  

string with info about the OS and the platform is is running on  

std::string LAMMPS_NS::platform::compiler_info()  

Return string with compiler version info  

This function uses predefined compiler macros to identify Compilers and their version and configuration info.  

# Returns  

string with the compiler information text  

std::string LAMMPS_NS::platform::cxx_standard()  

Return string with $\mathrm{C}{+}{+}$ standard version used to compile LAMMPS.  

This function uses predefined compiler macros to identify the $\mathrm{C}{+}{+}$ standard version used to compile LAMMPS with.  

# 4.14. Platform abstraction functions  

# Returns  

string with the $\mathrm{C}{+}{+}$ standard version or “unknown”  

std::string LAMMPS_NS::platform::openmp_standard()  

Return string with OpenMP standard version info  

This function uses predefined compiler macros to identify OpenMP support and the supported version of the standard.  

# Returns  

string with the openmp information text  

std::string LAMMPS_NS::platform::mpi_vendor()  

Return string with MPI vendor info  

This function uses predefined macros to identify the vendor of the MPI library used.  

# Returns  

string with the MPI vendor information text  

std::string LAMMPS_NS::platform::mpi_info(int &major, int &minor)  

Return string with MPI version info  

This function uses predefined macros and MPI function calls to identify the version of the MPI library used.  

# Parameters  

• major – major version of the MPI standard (set on exit) • minor – minor version of the MPI standard (set on exit)  

# Returns  

string with the MPI version information text  

std::string LAMMPS_NS::platform::compress_info()  

Return string with list of available compression types and executables  

This function tests which of the supported compression executables are available for reading or writing compressed files where supported.  

# Returns  

string with list of available compression tools  

# 4.14.3 File and path functions and global constants  

constexpr char LAMMPS_NS::platform::filepathsep[] = "/"  

Platform specific file path component separator  

This is a string with the character that separates directories and filename in paths on a platform. If multiple are characters are provided, the first is the preferred one.  

constexpr char LAMMPS_NS::platform::pathvarsep $=$ ':'  

Platform specific path environment variable component separator  

This is the character that separates entries in “PATH”-style environment variables. const char \*LAMMPS_NS::platform::guesspath(FILE \*fp, char \*buf, int len)  

Try to detect pathname from FILE pointer  

Currently only supported on Linux, MacOS, and Windows. Otherwise will report “(unknown)”.  

On Linux the folder /proc/self/fd holds symbolic links to the actual pathnames associated with each open file descriptor of the current process. On MacOS the same kind of information can be obtained using fcntl(fd, F_GETPATH,buf). On Windows we use GetFinalPathNameByHandleA() which is available with Windows Vista and later. If the buffer is too small $\AA^{\prime}<16$ bytes) a null pointer is returned.  

This function is used to provide a filename with error messages in functions where the filename is not passed as an argument, but the FILE \* pointer.  

# Parameters  

• fp – FILE pointer struct from STDIO library for which we want to detect the name • buf – storage buffer for pathname. output will be truncated if not large enough • len – size of storage buffer. output will be truncated to this length - 1  

# Returns  

pointer to the storage buffer with path or a NULL pointer if buf is invalid or the buffer size is too small  

std::string LAMMPS_NS::platform::path_basename(const std::string &path) Strip off leading part of path, return just the filename  

# Parameters  

path – file path  

Returns file name  

std::string LAMMPS_NS::platform::path_join(const std::string &a, const std::string &b)  

Join two pathname segments  

This uses the forward slash $\cdot/\bar{}$ character unless LAMMPS is compiled for Windows where it uses the backward slash ‘'  

# Parameters  

• a – first path • b – second path  

# Returns  

combined path  

bool LAMMPS_NS::platform::file_is_readable(const std::string &path) Check if file exists and is readable  

# Parameters  

path – file path  

# Returns  

true if file exists and is readable bool LAMMPS_NS::platform::is_console(FILE \*fp) Check if a file pointer may be connected to a console  

Parameters fp – file pointer   
Returns true if the file pointer is flagged as a TTY  

double LAMMPS_NS::platform::disk_free(const std::string &path)  

Return free disk space in bytes of file system pointed to by path  

Returns -1.0 if the path is invalid or free space reporting not supported.  

# Parameters  

path – file or folder path in file system  

# Returns  

bool LAMMPS_NS::platform::path_is_directory(const std::string &path) Check if a path is a directory  

# Parameters  

path – directory path  

Returns true if the directory exists  

std::string LAMMPS_NS::platform::current_directory()  

Get string with path to the current directory  

# Returns  

path to the current directory or empty string  

std::vector<std::string> LAMMPS_NS::platform::list_directory(const std::string &dir)  

Get list of entries in a directory  

This provides a list of strings of the entries in the directory without the leading path name while also skipping over “..” and “.”.  

# Parameters  

dir – path to directory  

# Returns  

vector with strings of all directory entries  

int LAMMPS_NS::platform::chdir(const std::string &path) Change current directory  

# Parameters  

path – new current working directory path  

# Returns  

-1 if unsuccessful, otherwise $>=0$  

int LAMMPS_NS::platform::mkdir(const std::string &path)  

Create a directory  

Unlike the the mkdir() or $\_\mathrm{mkdir()}$ functions of the C library, this function will also try to create non-existing sub-directories in case they don’t exist, and thus behaves like the mkdir -p command rather than plain mkdir or \`md.  

# Parameters  

path – directory path  

# Returns  

-1 if unsuccessful, otherwise $>=0$  

int LAMMPS_NS::platform::rmdir(const std::string &path)  

Delete a directory  

Unlike the the rmdir() or $\_\operatorname{rmdir}()$ functions of the C library, this function will check for the contents of the folder and recurse into any sub-folders, if necessary, and delete all contained folders and their contents before deleting the folder path.  

# Parameters  

path – directory path  

# Returns  

-1 if unsuccessful, otherwise $>=0$  

int LAMMPS_NS::platform::unlink(const std::string &path) Delete a file  

Parameters path – path to file to be deleted  

Returns 0 on success, -1 on error  

# 4.14.4 Standard I/O function wrappers  

constexpr bigint LAMMPS_NS::platform::END_OF_FILE = -1 constant to seek to the end of the file  

bigint LAMMPS_NS::platform::ftell(FILE \*fp) Get current file position  

# Parameters  

fp – FILE pointer of the given file  

Returns current FILE pointer position cast to a bigint  

int LAMMPS_NS::platform::fseek(FILE \*fp, bigint pos)  

Set absolute file position  

If the absolute position is END_OF_FILE, then position at the end of the file.  

# Parameters  

• fp – FILE pointer of the given file • pos – new position of the FILE pointer  

# Returns  

0 if successful, otherwise -1  

nt LAMMPS_NS::platform::ftruncate(FILE \*fp, bigint length) Truncate file to a given length and re-position file pointer  

# Parameters  

• fp – FILE pointer of the given file • length – length to which the file is being truncated to  

# Returns  

0 if successful, otherwise -1  

# 4.14. Platform abstraction functions  

FILE \*LAMMPS_NS::platform::popen(const std::string &cmd, const std::string &mode) Open a pipe to a command for reading or writing  

# Parameters  

• cmd – command for the pipe • mode – “r” for reading from cmd or “w” for writing to cmd  

# Returns  

file pointer to the pipe if successful or null  

int LAMMPS_NS::platform::pclose(FILE \*fp) Close a previously opened pipe  

# Parameters  

fp – FILE pointer for the pipe  

# Returns  

exit status of the pipe command or -1 in case of errors  

# 4.14.5 Environment variable functions  

int LAMMPS_NS::platform::putenv(const std::string &vardef) Add variable to the environment  

# Parameters  

vardef – variable name or variable definition (NAME $\mathbf{\Omega}_{1}=$ value)  

# Returns  

-1 if failure otherwise 0  

int LAMMPS_NS::platform::unsetenv(const std::string &variable) Delete variable from the environment  

# Parameters  

variable – variable name  

Returns -1 if failure otherwise 0  

std::vector<std::string> LAMMPS_NS::platform::list_pathenv(const std::string &var)  

Get list of entries in a path environment variable  

This provides a list of strings of the entries in an environment variable that is containing a “path” like “PATH” or “LD_LIBRARY_PATH”.  

# Parameters  

var – name of the environment variable  

# Returns  

vector with strings of all entries in that path variable std::string LAMMPS_NS::platform::find_exe_path(const std::string &cmd)  

Find pathname of an executable in the standard search pat  

This function will traverse the list of directories in the PATH environment variable and look for the executable cmd. If the file exists and is executable the full path is returned as string, otherwise an empty string is returned.  

On Windows the cmd string must not include an extension as this function will automatically append the extensions “.exe”, “.com” and “.bat” and look for those paths. On Windows also the current directory is checked (and first), but otherwise is not checked unless “.” exists in the PATH environment variable.  

Because of the nature of the check, this will not detect shell functions built-in command or aliases.  

Parameters cmd – name of command   
Returns vector with strings of all directory entries  

# 4.14.6 Dynamically loaded object or library functions  

void \*LAMMPS_NS::platform::dlopen(const std::string &fname) Open a shared object file or library  

# Parameters  

fname – name or path of the shared object  

Returns handle to the shared object or null  

int LAMMPS_NS::platform::dlclose(void \*handle)  

Close a shared object  

This releases the object corresponding to the provided handle. Resolved symbols associated with this handle may not be used after this call  

# Parameters  

handle – handle to an opened shared object  

# Returns  

0 if successful, non-zero of not  

void \*LAMMPS_NS::platform::dlsym(void \*handle, const std::string &symbol) Resolve a symbol in shared object  

# Parameters  

• handle – handle to an opened shared object symbol – name of the symbol to extract  

# Returns  

pointer to the resolved symbol or null  

std::string LAMMPS_NS::platform::dlerror()  

Obtain error diagnostic info after dynamic linking function calls  

Return a human-readable string describing the most recent error that occurred when using one of the functions for dynamic loading objects the last call to this function. If there was no error, the string is empty.  

Returns string with error message or empty  

# 4.14.7 Compressed file I/O functions  

bool LAMMPS_NS::platform::has_compress_extension(const std::string &file)  

Check if a file name ends in a known extension for a compressed file format Currently supported file extensions are: .gz, .bz2, .zst, .xz, .lzma, lz4  

Parameters file – name of the file to check  

# 4.14. Platform abstraction functions  

# Returns  

true if the file has a known extension, otherwise false  

FILE \*LAMMPS_NS::platform::compressed_read(const std::string &file) Open pipe to compressed text file for reading  

# Parameters  

file – name of the file to open  

# Returns  

FILE pointer to pipe using for reading the compressed file.  

FILE \*LAMMPS_NS::platform::compressed_write(const std::string &file) Open pipe to compressed text file for writing  

# Parameters  

file – name of the file to open  

# Returns  

FILE pointer to pipe using for reading the compressed file.  

# 4.15 Utility functions  

The utils sub-namespace inside the LAMMPS_NS namespace provides a collection of convenience functions and utilities that perform common tasks that are required repeatedly throughout the LAMMPS code like reading or writing to files with error checking or translation of strings into specific types of numbers with checking for validity. This reduces redundant implementations and encourages consistent behavior and thus has some overlap with the “platform” sub-namespace.  

# 4.15.1 I/O with status check and similar functions  

The the first two functions are wrappers around the corresponding C library calls fgets() or fread(). They will check if there were errors on reading or an unexpected end-of-file state was reached. In that case, the functions will stop with an error message, indicating the name of the problematic file, if possible unless the error argument is a NULL pointer.  

The utils::fgets_trunc() function will work similar for fgets() but it will read in a whole line (i.e. until the end of line or end of file), but store only as many characters as will fit into the buffer including a final newline character and the terminating NULL byte. If the line in the file is longer it will thus be truncated in the buffer. This function is used by utils::read_lines_from_file() to read individual lines but make certain they follow the size constraints.  

The utils::read_lines_from_file() function will read the requested number of lines of a maximum length into a buffer and will return 0 if successful or 1 if not. It also guarantees that all lines are terminated with a newline character and the entire buffer with a NULL character.  

oid LAMMPS_NS::utils::sfgets(const char \*srcname, int srcline, char $^{*}\mathrm{s}$ , int size, FILE \*fp, const char \*filename, Error \*error)  

Safe wrapper around fgets() which aborts on errors or EOF and prints a suitable error message to help debugging.  

Use nullptr as the error parameter to avoid the abort on EOF or error.  

# Parameters  

• srcname – name of the calling source file (from FLERR macro) • srcline – line in the calling source file (from FLERR macro) • s – buffer for storing the result of fgets() • size – size of buffer s (max number of bytes read by fgets())  

• fp – file pointer used by fgets()   
• filename – file name associated with fp (may be a null pointer; then LAMMPS will try to detect)   
• error – pointer to Error class instance (for abort) or nullptr  

void LAMMPS_NS::utils::sfread(const char \*srcname, int srcline, void \*s, size_t size, size_t num, FILE \*fp, constchar \*filename, Error \*error)  

Safe wrapper around fread() which aborts on errors or EOF and prints a suitable error message to help debugging.  

Use nullptr as the error parameter to avoid the abort on EOF or error.  

# Parameters  

• srcname – name of the calling source file (from FLERR macro)   
• srcline – line in the calling source file (from FLERR macro)   
• s – buffer for storing the result of fread()   
• size – size of data elements read by fread()   
• num – number of data elements read by fread()   
• fp – file pointer used by fread()   
• filename – file name associated with fp (may be a null pointer; then LAMMPS will try to detect)   
• error – pointer to Error class instance (for abort) or nullptr  

char \*LAMMPS_NS::utils::fgets_trunc(char \*s, int size, FILE \*fp)  

Wrapper around fgets() which reads whole lines but truncates the data to the buffer size and ensures a newline char at the end.  

This function is useful for reading line based text files with possible comments that should be parsed later. This applies to data files, potential files, atomfile variable files and so on. It is used instead of fgets() by utils::read_lines_from_file().  

# Parameters  

• s – buffer for storing the result of fgets() • size – size of buffer s (max number of bytes returned) • fp – file pointer used by fgets()  

int LAMMPS_NS::utils::read_lines_from_file(FILE \*fp, int nlines, int nmax, char \*buffer, int me, MPI_Comm comm)  

Read N lines of text from file into buffer and broadcast them  

This function uses repeated calls to fread() to fill a buffer with newline terminated text. If a line does not end in a newline (e.g. at the end of a file), it is added. The caller has to allocate an nlines by nmax sized buffer for storing the text data. Reading is done by MPI rank 0 of the given communicator only, and thus only MPI rank 0 needs to provide a valid file pointer.  

# Parameters  

• fp – file pointer used by fread • nlines – number of lines to be read • nmax – maximum length of a single line • buffer – buffer for storing the data.  

# 4.15. Utility functions  

• me – MPI rank of calling process in MPI communicator comm – MPI communicator for broadcast  

# Returns  

1 if the read was short, 0 if read was successful  

# 4.15.2 String to number conversions with validity check  

These functions should be used to convert strings to numbers. They are are strongly preferred over C library calls like atoi() or atof() since they check if the entire string is a valid (floating-point or integer) number, and will error out instead of silently returning the result of a partial conversion or zero in cases where the string is not a valid number. This behavior improves detecting typos or issues when processing input files.  

Similarly the utils::logical() function will convert a string into a boolean and will only accept certain words.  

The do_abort flag should be set to true in case this function is called only on a single MPI rank, as that will then trigge the a call to Error::one() for errors instead of Error::all() and avoids a “hanging” calculation when run in parallel.  

Please also see utils::is_integer() and utils::is_double() for testing strings for compliance without conversion.  

double LAMMPS_NS::utils::numeric(const char \*file, int line, const std::string &str, bool do_abort, LAMMPS \*lmp)  

Convert a string to a floating point number while checking if it is a valid floating point or integer number  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – string to be converted to number • do_abort – determines whether to call Error::one() or Error::all() • lmp – pointer to top-level LAMMPS class instance  

# Returns  

double precision floating point number  

double LAMMPS_NS::utils::numeric(const char \*file, int line, const char \*str, bool do_abort, LAMMPS \*lmp) This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – string to be converted to number • do_abort – determines whether to call Error::one() or Error::all() • lmp – pointer to top-level LAMMPS class instance  

# Returns  

double precision floating point number  

int LAMMPS_NS::utils::inumeric(const char \*file, int line, const std::string &str, bool do_abort, LAMMPS \*lmp) Convert a string to an integer number while checking if it is a valid integer number (regular int)  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – string to be converted to number • do_abort – determines whether to call Error::one() or Error::all() • lmp – pointer to top-level LAMMPS class instance  

# Returns  

integer number (regular int)  

int LAMMPS_NS::utils::inumeric(const char \*file, int line, const char \*str, bool do_abort, LAMMPS \*lmp) This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – string to be converted to number • do_abort – determines whether to call Error::one() or Error::all() • lmp – pointer to top-level LAMMPS class instance  

# Returns  

double precision floating point number  

bigint LAMMPS_NS::utils::bnumeric(const char \*file, int line, const std::string &str, bool do_abort, LAMMPS \*lmp) Convert a string to an integer number while checking if it is a valid integer number (bigint)  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – string to be converted to number • do_abort – determines whether to call Error::one() or Error::all() • lmp – pointer to top-level LAMMPS class instance  

# Returns  

integer number (bigint)  

bigint LAMMPS_NS::utils::bnumeric(const char \*file, int line, const char \*str, bool do_abort, LAMMPS \*lmp) This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – string to be converted to number  

# 4.15. Utility functions  

• do_abort – determines whether to call Error::one() or Error::all() • lmp – pointer to top-level LAMMPS class instance  

# Returns  

double precision floating point number  

tagint LAMMPS_NS::utils::tnumeric(const char \*file, int line, const std::string &str, bool do_abort, LAMMPS \*lmp)  

Convert a string to an integer number while checking if it is a valid integer number (tagint)  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – string to be converted to number • do_abort – determines whether to call Error::one() or Error::all() • lmp – pointer to top-level LAMMPS class instance  

# Returns  

integer number (tagint)  

tagint LAMMPS_NS::utils::tnumeric(const char \*file, int line, const char \*str, bool do_abort, LAMMPS \*lmp) This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – string to be converted to number • do_abort – determines whether to call Error::one() or Error::all() • lmp – pointer to top-level LAMMPS class instance  

# Returns  

double precision floating point number  

int LAMMPS_NS::utils::logical(const char \*file, int line, const std::string &str, bool do_abort, LAMMPS \*lmp) Convert a string to a boolean while checking whether it is a valid boolean term. Valid terms are ‘yes’, ‘no’, ‘true’, ‘false’, ‘on’, ‘off’, and ‘1’, ‘0’. Only lower case is accepted.  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – string to be converted to logical • do_abort – determines whether to call Error::one() or Error::all() • lmp – pointer to top-level LAMMPS class instance  

# Returns  

1 if string resolves to “true”, otherwise 0  

int LAMMPS_NS::utils::logical(const char \*file, int line, const char \*str, bool do_abort, LAMMPS \*lmp) This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – string to be converted to logical • do_abort – determines whether to call Error::one() or Error::all() • lmp – pointer to top-level LAMMPS class instance  

# Returns  

1 if string resolves to “true”, otherwise 0  

# 4.15.3 String processing  

The following are functions to help with processing strings and parsing files or arguments.  

char \*LAMMPS_NS::utils::strdup(const std::string &text)  

Make C-style copy of string in new storage  

This allocates a storage buffer and copies the C-style or $\mathrm{C}{+}{+}$ style string into it. The buffer is allocated with “new” and thus needs to be deallocated with “delete[]”.  

# Parameters  

text – string that should be copied  

Returns new buffer with copy of string  

std::string LAMMPS_NS::utils::lowercase(const std::string &line) Convert string to lowercase  

# Parameters  

line – string that should be converted  

Returns new string with all lowercase characters  

std::string LAMMPS_NS::utils::uppercase(const std::string &line) Convert string to uppercase  

# Parameters  

line – string that should be converted  

Returns new string with all uppercase characters  

std::string LAMMPS_NS::utils::trim(const std::string &line) Trim leading and trailing whitespace. Like TRIM() in Fortran.  

# Parameters  

line – string that should be trimmed  

Returns new string without whitespace (string)  

# 4.15. Utility functions  

std::string LAMMPS_NS::utils::trim_comment(const std::string &line) Return string with anything from the first ‘#’ character onward removed  

Parameters line – string that should be trimmed  

Returns new string without comment (string)  

std::string LAMMPS_NS::utils::strcompress(const std::string &text) Compress whitespace in a string  

Added in version 4Feb2025.  

This function compresses whitespace in a string to just a single blank.  

<html><body><table><tr><td>param text the text to be compressed (return string with whitespace compressed to single blanks</td></tr></table></body></html>  

std::string LAMMPS_NS::utils::strip_style_suffix(const std::string &style, LAMMPS \*lmp) Remove style suffix from string if suffix flag is active  

This will try to undo the effect from using the suffix command or the -suffix/-sf command-line flag and return correspondingly modified string.  

\param style string of style name   
\param lmp pointer to the LAMMPS class (has suffix_flag and suffix strings)   
\return processed string  

td::string LAMMPS_NS::utils::star_subst(const std::string &name, bigint step, int pad)  

Replace first ‘\*’ character in a string with a number, optionally zero-padded  

If there is no ‘\*’ character in the string, return the original string. If the number requires more characters than the value of the pad argument, do not add zeros; otherwise add as many zeroes as needed to the left to make the the number representation pad characters wide.  

# Parameters  

• name – string with file containing a ‘\*’ (or not) • step – step number to replace the (first) ‘\*’ • pad – zero-padding (may be zero)  

# Returns  

processed string  

inline bool LAMMPS_NS::utils::has_utf8(const std::string &line)  

Check if a string will likely have UTF-8 encoded characters  

UTF-8 uses the 7-bit standard ASCII table for the first 127 characters and all other characters are encoded as multiple bytes. For the multi-byte characters the first byte has either the highest two, three, or four bits set followed by a zero bit and followed by one, two, or three more bytes, respectively, where the highest bit is set and the second highest bit set to 0. The remaining bits combined are the character code, which is thus limited to 21-bits.  

For the sake of efficiency this test only checks if a character in the string has the highest bit set and thus is very likely an UTF-8 character. It will not be able to tell this this is a valid UTF-8 character or whether it is a 2-byte, 3-byte, or 4-byte character.  

See also utils::utf8_subst()  

# Parameters  

line – string that should be checked  

Returns true if string contains UTF-8 encoded characters (bool)  

std::string LAMMPS_NS::utils::utf8_subst(const std::string &line) Replace known UTF-8 characters with ASCII equivalents  

See also utils::has_utf8()  

# Parameters  

line – string that should be converted  

Returns new string with ascii replacements (string)  

size_t LAMMPS_NS::utils::count_words(const char \*text) Count words in C-string, ignore any whitespace matching “ \t\r\n\f”  

# Parameters  

text – string that should be searched  

Returns number of words found  

size_t LAMMPS_NS::utils::count_words(const std::string &text) Count words in string, ignore any whitespace matching “ \t\r\n\f”  

# Parameters  

text – string that should be searched  

Returns number of words found  

size_t LAMMPS_NS::utils::count_words(const std::string &text, const std::string &separators) Count words in string with custom choice of separating characters  

# Parameters  

• text – string that should be searched separators – string containing characters that will be treated as whitespace  

# Returns  

number of words found  

# 4.15. Utility functions  

size_t LAMMPS_NS::utils::trim_and_count_words(const std::string &text, const std::string &separators $=$ " \t\r\n\f")  

Count words in a single line, trim anything from ‘#’ onward  

# Parameters  

• text – string that should be trimmed and searched separators – string containing characters that will be treated as whitespace  

# Returns  

number of words found  

d::string LAMMPS_NS::utils::join_words(const std::vector<std::string> &words, const std::string &sep) Take list of words and join them with a given separator text.  

This is the inverse operation of what the split_words() function Tokenizer classes do.  

# Parameters  

words – STL vector with strings sep – separator string (may be empty)  

# Returns  

string with the concatenated words and separators  

std::vector<std::string> LAMMPS_NS::utils::split_words(const std::string &text)  

Take text and split into non-whitespace words.  

This can handle strings with single and double quotes, escaped quotes, and escaped codes within quotes, but due to using an STL container and STL strings is rather slow because of making copies. Designed for parsing command-lines and similar text and not for time critical processing. Use a tokenizer class if performance matters.  

See also Tokenizer, ValueTokenizer  

# Parameters  

text – string that should be split  

Returns STL vector with the words  

std::vector<std::string> LAMMPS_NS::utils::split_lines(const std::string &text) Take multi-line text and split into lines  

# Parameters  

text – string that should be split  

Returns STL vector with the lines  

bool LAMMPS_NS::utils::strsame(const std::string &text1, const std::string &text2) Compare two string while ignoring whitespace  

Added in version 4Feb2025.  

This function compares two strings while skipping over any kind of whitespace (blank, tab, newline, carriage return, etc.).  

\param text1 the first text to be compared   
\param text2 the second text to be compared   
\return true if the non-whitespace part of the two strings matches, false if not  

bool LAMMPS_NS::utils::strmatch(const std::string &text, const std::string &pattern) Match text against a simplified regex pattern  

More flexible and specific matching of a string against a pattern. This function is supposed to be a more safe, more specific and simple to use API to find pattern matches. The purpose is to replace uses of either strncmp() or strstr() in the code base to find sub-strings safely. With strncmp() finding prefixes, the number of characters to match must be counted, which can lead to errors, while using “^pattern” will do the same with less problems. Matching for suffixes using strstr() is not as specific as ‘pattern\$’, and complex matches, e.g. “^rigid.\*\/small.\*”, to match all small body optimized rigid fixes require only one test.  

The use of std::string arguments allows for simple concatenation even with char \* type variables. Example: utils::strmatch(text, std::string(“^”) $^+$ charptr)  

# Parameters  

• text – the text to be matched against the pattern pattern – the search pattern, which may contain regexp markers  

# Returns  

true if the pattern matches, false if not  

std::string LAMMPS_NS::utils::strfind(const std::string &text, const std::string &pattern) Find sub-string that matches a simplified regex pattern  

This function is a companion function to utils::strmatch(). Arguments and logic is the same, but instead of a boolean, it returns the sub-string that matches the regex pattern. There can be only one match. This can be used as a more flexible alternative to strstr().  

# Parameters  

• text – the text to be matched against the pattern pattern – the search pattern, which may contain regexp markers  

# Returns  

the string that matches the pattern or an empty one  

bool LAMMPS_NS::utils::is_integer(const std::string &str) Check if string can be converted to valid integer  

# Parameters  

str – string that should be checked  

# Returns  

true, if string contains valid a integer, false otherwise  

bool LAMMPS_NS::utils::is_double(const std::string &str) Check if string can be converted to valid floating-point number  

# Parameters  

str – string that should be checked  

# 4.15. Utility functions  

# Returns  

true, if string contains valid number, false otherwise  

bool LAMMPS_NS::utils::is_id(const std::string &str) Check if string is a valid ID ID strings may contain only letters, numbers, and underscores.  

# Parameters  

str – string that should be checked  

# Returns  

true, if string contains valid id, false otherwise int LAMMPS_NS::utils::is_type(const std::string &str)  

Check if string is a valid type label, or numeric type, or numeric type range. Numeric type or type range may only contain digits or the ‘\*’ character. Type label strings may not contain a digit, or a ‘\*’, or a ‘#’ character as the first character to distinguish them from comments and numeric types or type ranges. They also may not contain any whitespace. If the string is a valid numeric type or type range the function returns 0, if it is a valid type label the function returns 1, otherwise it returns -1.  

# Parameters  

str – string that should be checked  

Returns 0, 1, or -1, depending on whether the string is valid numeric type, valid type label or neither, respectively  

# 4.15.4 Potential file functions  

std::string LAMMPS_NS::utils::get_potential_file_path(const std::string &path) Determine full path of potential file. If file is not found in current directory, search directories listed in LAMMPS_POTENTIALS environment variable  

# Parameters  

path – file path  

# Returns  

full path to potential file  

td::string LAMMPS_NS::utils::get_potential_date(const std::string &path, const std::string &potential_name) Read potential file and return DATE field if it is present  

# Parameters  

• path – file path • potential_name – name of potential that is being read  

# Returns  

DATE field if present  

std::string LAMMPS_NS::utils::get_potential_units(const std::string &path, const std::string &potential_name) Read potential file and return UNITS field if it is present  

# Parameters  

• path – file path • potential_name – name of potential that is being read  

# Returns  

UNITS field if present  

int LAMMPS_NS::utils::get_supported_conversions(const int property) Return bitmask of available conversion factors for a given property  

# Parameters  

property – property to be converted  

# Returns  

bitmask indicating available conversions  

ouble LAMMPS_NS::utils::get_conversion_factor(const int property, const int conversion) Return unit conversion factor for given property and selected from/to units  

# Parameters  

• property – property to be converted conversion – constant indicating the conversion  

# Returns  

conversion factor  

FILE \*LAMMPS_NS::utils::open_potential(const std::string &name, LAMMPS \*lmp, int \*auto_convert) Open a potential file as specified by name  

If opening the file directly fails, the function will search for it in the list of folder pointed to by the environment variable LAMMPS_POTENTIALS (if it is set).  

If the potential file has a UNITS tag in the first line, the tag’s value is compared to the current unit style setting. The behavior of the function then depends on the value of the auto_convert parameter. If it is a null pointer, then the unit values must match or else the open will fail with an error. Otherwise the bitmask that auto_convert points to is used check for compatibility with possible automatic conversions by the calling function. If compatible, the bitmask is set to the required conversion or utils::NOCONVERT.  

# Parameters  

• name – file- or pathname of the potential file • lmp – pointer to top-level LAMMPS class instance • auto_convert – pointer to unit conversion bitmask or nullptr  

# Returns  

FILE pointer of the opened potential file or nullptr  

# 4.15.5 Argument processing  

template<typename TYPE>   
void LAMMPS_NS::utils::bounds(const char \*file, int line, const std::string &str, bigint nmin, bigint nmax, TYPE &nlo, TYPE &nhi, Error \*error, int failed $=-2$ )  

Compute index bounds derived from a string with a possible wildcard  

This functions processes the string in $s t r$ and set the values of nlo and nhi according to the following five cases:  

• a single number, i: nlo $=\mathrm{i};\mathrm{nhi}$ $\mathrm{nhi=i}$ ;   
• a single asterisk, \*: ${\mathrm{nlo}}={\mathrm{nmin}}$ ; nhi $=$ nmax;   
• a single number followed by an asterisk, $\mathrm{i}^{*}$ : $\mathrm{nlo=i}$ ; nhi $=$ nmax;   
• a single asterisk followed by a number, \*i: nlo $=$ nmin; nhi $=\mathrm{i}$ ;   
• two numbers with an asterisk in between. $\mathrm{i}^{*}\mathrm{j}$ : $\mathrm{nlo}=\mathrm{i};\mathrm{nhi}=\mathrm{j};$  

# 4.15. Utility functions  

# Parameters  

• file – name of source file for error message   
• line – line number in source file for error message   
• str – string to be processed   
• nmin – smallest possible lower bound   
• nmax – largest allowed upper bound   
• nlo – lower bound   
• nhi – upper bound   
• error – pointer to Error class for out-of-bounds messages   
• failed – argument index with failed expansion (optional)  

template<typename TYPE> void LAMMPS_NS::utils::bounds_typelabel(const char \*file, int line, const std::string &str, bigint nmin, bigint nmax, TYPE &nlo, TYPE &nhi, LAMMPS \*lmp, int mode)  

Same as utils::bounds(), but string may be a typelabe  

Added in version 27June2024.  

This functions adds the following case to utils::bounds():  

• a single type label, typestr: nl $)=\mathrm{nhi}=$ label2type(typestr)  

\param file name of source file for error message   
\param line line number in source file for error message   
\param str string to be processed   
\param nmin smallest possible lower bound   
\param nmax largest allowed upper bound   
\param nlo lower bound   
\param nhi upper bound   
\param lmp pointer to top-level LAMMPS class instance   
\param mode select labelmap using constants from Atom class  

int LAMMPS_NS::utils::expand_args(const char \*file, int line, int narg, char \*\*arg, int mode, char \*\*&earg,LAMMPS \*lmp, int \*\*argmap $=$ nullptr)  

Expand list of arguments when containing fix/compute wildcards  

This function searches the list of arguments in arg for strings of the kind $\mathrm{c\_ID[^{*}]}$ , $\mathrm{f\_ID}[\mathrm{*}]$ , $\mathbf{V}\_\mathrm{ID}[\ast]$ , $\mathrm{i}2\_\mathrm{ID}[\ast]$ , $\mathrm{d}2\_\mathrm{ID}[\stackrel{*}{\sim}]$ , or c_ID:gname:dname[\*] referring to computes, fixes, vector style variables, custom per-atom arrays, or grids, respectively. Any such strings are replaced by one or more strings with the ‘\*’ character replaced by the corresponding possible numbers as determined from the fix, compute, variable, property, or grid instance. Unrecognized strings are just copied. If the mode parameter is set to 0, expand global vectors, but not global arrays; if it is set to 1, expand global arrays (by column) but not global vectors.  

If any expansion happens, the earg list and all its strings are new allocations and must be freed explicitly by the caller. Otherwise arg and earg will point to the same address and no explicit de-allocation is needed by the caller.  

The argmap pointer to an int pointer may be used to accept an array of integers mapping the arguments after the expansion to their original index. If this pointer is NULL (the default) than this map is not created. Otherwise, it must be deallocated by the calling code.  

# Parameters  

• file – name of source file for error message   
• line – line number in source file for error message   
• narg – number of arguments in current list   
• arg – argument list, possibly containing wildcards   
• mode – select between global vectors $(=0)$ and arrays $(=1,$ )   
• earg – new argument list with wildcards expanded   
• lmp – pointer to top-level LAMMPS class instance   
• argmap – pointer to integer pointer for mapping expanded indices to input (optional)  

# Returns  

number of arguments in expanded list  

std::vector<std::string> LAMMPS_NS::utils::parse_grid_id(const char \*file, int line, const std::string &name, Error \*error)  

Parse grid reference into 3 sub-strings  

Format of grid ID reference $=$ id:gname:dname. Return vector with the 3 sub-strings.  

# Parameters  

• file – name of source file for error message   
• line – line number in source file for error message   
• name – complete grid ID   
error – pointer to Error class  

# Returns  

std::vector<std::string> containing the 3 sub-strings  

char \*LAMMPS_NS::utils::expand_type(const char \*file, int line, const std::string &str, int mode, LAMMPS \*lmp)  

Expand type label string into its equivalent numeric type  

This function checks if a given string may be a type label and then searches the labelmap type indicated by the mode argument for the corresponding numeric type. If this is found, a copy of the numeric type string is made and returned. Otherwise a null pointer is returned. If a string is returned, the calling code must free it with delete[].  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • str – type string to be expanded • mode – select labelmap using constants from Atom class • lmp – pointer to top-level LAMMPS class instance  

# Returns  

pointer to expanded string or null pointer  

# 4.15.6 Convenience functions  

template<typename ...Args> oid LAMMPS_NS::utils::logmesg(LAMMPS \*lmp, const std::string &format, Args&&... args)  

Send formatted message to screen and logfile, if available  

This function simplifies the repetitive task of outputting some message to both the screen and/or the log file The template wrapper with {fmt} formatting and argument processing allows this function to work similar to :cpp:func:utils::print() $<$ LAMMPS_NS::utils::print $>$ .  

# Parameters  

• lmp – pointer to LAMMPS class instance • format – format string of message to be printed • args – arguments to format string  

void LAMMPS_NS::utils::logmesg(LAMMPS \*lmp, const std::string &mesg)  

This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.  

# Parameters  

• lmp – pointer to LAMMPS class instance • mesg – string with message to be printed  

template<typename ...Args> void LAMMPS_NS::utils::print(FILE \*fp, const std::string &format, Args&&... args)  

Write formatted message to file  

Added in version 4Feb2025.  

This function implements a version of fprintf() that uses $\{\mathrm{fmt}\}$ formatting   
\param fp stdio FILE pointer   
\param format format string of message to be printed   
\param args arguments to format string  

void LAMMPS_NS::utils::print(FILE \*fp, const std::string &mesg)  

This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.  

# Parameters  

• fp – stdio FILE pointer • mesg – string with message to be printed  

std::string LAMMPS_NS::utils::errorurl(int errorcode)  

Return text redirecting the user to a specific paragraph in the manual  

The LAMMPS manual contains detailed explanations for errors and warnings where a simple error message may not be sufficient. These can be reached through URLs with a numeric code. This function creates the corresponding text to be included into the error message that redirects the user to that URL.  

# Parameters  

errorcode – number pointing to a paragraph in the manual  

void LAMMPS_NS::utils::missing_cmd_args(const std::string &file, int line, const std::string &cmd, Error \*error)  

Print error message about missing arguments for command  

This function simplifies the repetitive reporting missing arguments to a command.  

# Parameters  

• file – name of source file for error message • line – line number in source file for error message • cmd – name of the failing command error – pointer to Error class instance (for abort) or nullptr std::string LAMMPS_NS::utils::point_to_error(Input \*input, int failed) Create string with last command and optionally pointing to arg with error  

Added in version 4Feb2025.  

This function is a helper function for error messages. It creates extra output in error messages. It will produce either two or three lines: the original last input line before variable substitutions, the corresponding pre-processed command (only when different) and one or more ‘^’ characters pointing to the faulty argument as indicated by the failed argument. Any whitespace in the lines with the command output are compressed to a single blank by calling strcompress()  

\param input pointer to the Input class instance (for access to last command args) \param failed index of the faulty argument (-1 to point to the command itself) \return string with two or three lines to follow error messages  

void LAMMPS_NS::utils::flush_buffers(LAMMPS \*lmp)  

Flush output buffers  

This function calls fflush() on screen and logfile FILE pointers if available and thus tells the operating system to output all currently buffered data. This is local operation and independent from buffering by a file system or an MPI library.  

std::string LAMMPS_NS::utils::getsyserror()  

Return a string representing the current system error status  

This is a wrapper around calling strerror(errno).  

Returns error string  

std::string LAMMPS_NS::utils::check_packages_for_style(const std::string &style, const std::string &name, LAMMPS \*lmp)  

Report if a requested style is in a package or may have a typo  

# Parameters  

• style – type of style that is to be checked for • name – name of style that was not found • lmp – pointer to top-level LAMMPS class instance  

# 4.15. Utility functions  

# Returns  

string usable for error messages  

double LAMMPS_NS::utils::timespec2seconds(const std::string &timespec)  

Convert a time string to seconds The strings “off” and “unlimited” result in -1  

# Parameters  

timespec – a string in the following format: ([[HH:]MM:]SS)  

Returns total in seconds  

int LAMMPS_NS::utils::date2num(const std::string &date)  

Convert a LAMMPS version date to a number  

This will generate a number YYYYMMDD from a date string (with or without blanks) that is suitable for numerical comparisons, i.e. later dates will generate a larger number.  

The day may or may not have a leading zero, the month is identified by the first 3 letters (so there may be more) and the year may be 2 or 4 digits (the missing 2 digits will be assumed as 20. That is 04 corresponds to 2004).  

No check is made whether the date is valid.  

# Parameters  

date – string in the format (Day Month Year)  

Returns date code  

std::string LAMMPS_NS::utils::current_date()  

Return current date as string  

This will generate a string containing the current date in YYYY-MM-DD format.  

Returns string with current date  

# 4.15.7 Customized standard functions  

int LAMMPS_NS::utils::binary_search(const double needle, const int n, const double \*haystack)  

Binary search in a vector of ascending doubles of length N  

If the value is smaller than the smallest value in the vector, 0 is returned. If the value is larger or equal than the largest value in the vector, N-1 is returned. Otherwise the index that satisfies the condition  

haystack[index] $<=$ valu $\mathrm{{1e}<h a y s t a c k[\mathrm{{inde}}}$ x $_{+1}$ ]  

is returned, i.e. a value from 1 to N-2. Note that if there are tied values in the haystack, always the larger index is returned as only that satisfied the condition.  

# Parameters  

• needle – search value for which are are looking for the closest index • n – size of the haystack array • haystack – array with data in ascending order.  

# Returns  

index of value in the haystack array smaller or equal to needle void LAMMPS_NS::utils::merge_sort(int \*index, int num, void ${}^{*}\mathrm{ptr},$ , int (\*comp)(int, int, void\*))  

Custom merge sort implementation  

This function provides a custom upward hybrid merge sort implementation with support to pass an opaque pointer to the comparison function, e.g. for access to class members. This avoids having to use global variables. For improved performance, it uses an in-place insertion sort on initial chunks of up to 64 elements and switches to merge sort from then on.  

# Parameters  

• index – Array with indices to be sorted • num – Length of the index array • ptr – Pointer to opaque object passed to comparison function • comp – Pointer to comparison function  

# 4.16 Special Math functions  

The MathSpecial namespace implements a selection of custom and optimized mathematical functions for a variety of applications.  

double LAMMPS_NS::MathSpecial::factorial(const int n)  

Fast tabulated factorial function  

This function looks up pre-computed factorial values for arguments of $\mathrm{n}=0$ to a maximum of 167, which is the maximal value representable by a double precision floating point number. For other values of n a NaN value is returned.  

# Parameters  

n – argument (valid: $0<=\mathtt{n}<=167_{.}$ )  

# Returns  

value of n! as double precision number or NaN double LAMMPS_NS::MathSpecial::exp2_x86(double x) Fast implementation of $2\mathsf{\Pi}^{\wedge}\mathbf{X}$ without argument checks for little endian CPUs  

This function implements an optimized version of pow(2.0, x) that does not check for valid arguments and thus may only be used where arguments are well behaved. The implementation makes assumptions about the layout of double precision floating point numbers in memory and thus will only work on little endian CPUs. If little endian cannot be safely detected, the result of calling pow $(2.0,\mathbf{x})$ will be returned. This function also is the basis for the fast exponential fm_exp $\mathbf{\rho}(\mathbf{x})$ .  

# Parameters  

x – argument  

# Returns  

value of $2\mathsf{\Pi}^{\wedge}\mathbf{X}$ as double precision number double LAMMPS_NS::MathSpecial::fm_exp(double x)  

Fast implementation of $\exp(\mathrm{{x})}$ for little endian CPUs  

This function implements an optimized version of $\exp(\mathbf{x})$ for little endian CPUs. It calls the $\mathrm{exp}2\_\mathrm{x}86(\mathrm{x})$ function with a suitable prefactor to $\mathbf{X}$ to return $\exp(\mathbf{x})$ . The implementation makes assumptions about the layout of double precision floating point numbers in memory and thus will only work on little endian CPUs. If little endian cannot be safely detected, the result of calling the $\exp(\mathbf{x})$ implementation in the standard math library will be returned.  

# 4.16. Special Math functions  

# Parameters  

x – argument  

# Returns  

value of $\mathbf{e}^{\wedge}\mathbf{x}$ as double precision number static inline double LAMMPS_NS::MathSpecial::my_erfcx(const double x)  

Fast scaled error function complement exp(x\*x)\*erfc(x) for coul/long styles  

This is a portable fast implementation of $\exp(\mathbf{x}^{*}\mathbf{x})^{*}{\mathrm{erfc}}(\mathbf{x})$ that can be used in coul/long pair styles as a replacement for the polynomial expansion that is/was widely used. Unlike the polynomial expansion, that is only accurate at the level of single precision floating point it provides full double precision accuracy, but at comparable speed (unlike the erfc() implementation shipped with GNU standard math library).  

Parameters x – argument   
Returns value of $\mathtt{e}^{\wedge}(\mathbf{x}^{*}\mathbf{x})^{*}{\mathrm{erfc}}(\mathbf{x})$  

static inline double LAMMPS_NS::MathSpecial::expmsq(double x)  

Fast implementation of $\exp(-\mathbf{x}^{*}\mathbf{x})$ for little endian CPUs for coul/long styles  

This function implements an optimized version of $\exp(-\mathbf{X}^{*}\mathbf{X})$ based on $\exp2\_\mathrm{x86}()$ for use with little endian CPUs. If little endian cannot be safely detected, the result of calling the exp $\left(-\mathbf{X}^{*}\mathbf{X}\right)$ implementation in the standard math library will be returned.  

Parameters x – argument  

# Returns  

value of $\mathbf{e}^{\Lambda}(-\mathbf{X}^{*}\mathbf{X})$ as double precision number static inline double LAMMPS_NS::MathSpecial::square(const double &x) Fast inline version of pow(x, 2.0)  

Parameters x – argument   
Returns x\*x  

static inline double LAMMPS_NS::MathSpecial::cube(const double &x) Fast inline version of pow(x, 3.0)  

Parameters x – argument   
Returns x\*x  

static inline double LAMMPS_NS::MathSpecial::powsign(const int n) static inline double LAMMPS_NS::MathSpecial::powint(const double &x, const int n) static inline double LAMMPS_NS::MathSpecial::powsinxx(const double &x, int n)  

# 4.17 Tokenizer classes  

The purpose of the tokenizer classes is to simplify the recurring task of breaking lines of text down into words and/or numbers. Traditionally, LAMMPS code would be using the strtok() function from the C library for that purpose, but that function has two significant disadvantages: 1) it cannot be used concurrently from different LAMMPS instances since it stores its status in a global variable and 2) it modifies the string that it is processing. These classes were implemented to avoid both of these issues and also to reduce the amount of code that needs to be written.  

The basic procedure is to create an instance of the tokenizer class with the string to be processed as an argument and then do a loop until all available tokens are read. The constructor has a default set of separator characters, but that can be overridden. The default separators are all “whitespace” characters, i.e. the space character, the tabulator character, the carriage return character, the linefeed character, and the form feed character.  

Listing 1: Tokenizer class example listing entries of the PATH environment variable   


<html><body><table><tr><td>#include "tokenizer.h"</td></tr><tr><td>#include <cstdlib></td></tr><tr><td>#include <string></td></tr><tr><td>#include <iostream></td></tr><tr><td>using namespace LAMMPS_NS;</td></tr><tr><td>int main(int, char **)</td></tr><tr><td></td></tr><tr><td>const char *path = getenv("PATH");</td></tr><tr><td>if (path != nullptr){</td></tr><tr><td>Tokenizer p(path,":");</td></tr><tr><td>while (p.has_next())</td></tr><tr><td>std::cout << "Entry: " "u\ >>()xau'd >></td></tr><tr><td></td></tr><tr><td>return O;</td></tr></table></body></html>  

Most tokenizer operations cannot fail except for LAMMPS_NS::Tokenizer::next() (when used without first checking with LAMMPS_NS::Tokenizer::has_next()) and LAMMPS_NS::Tokenizer::skip(). In case of failure, the class will throw an exception, so you may need to wrap the code using the tokenizer into a try / catch block to handle errors. The LAMMPS_NS::ValueTokenizer class may also throw an exception when a (type of) number is requested as next token that is not compatible with the string representing the next word.  

Listing 2: ValueTokenizer class example with exception handling   


<html><body><table><tr><td>#include "tokenizer.h"</td><td></td></tr><tr><td>#include e<cstdlib></td><td></td></tr><tr><td>#include e<string></td><td></td></tr><tr><td>#include <iostream</td><td></td></tr><tr><td></td><td></td></tr><tr><td>using namespace LAMMPS _NS;</td><td></td></tr><tr><td>**</td><td></td></tr><tr><td>int main(int, char</td><td></td></tr><tr><td></td><td></td></tr><tr><td>double num1(0),num2(0),num3(0),num4(0);</td><td></td></tr><tr><td></td><td></td></tr></table></body></html>  

# 4.17. Tokenizer classes  

(continued from previous page)  

ValueTokenizer t(text);   
// read 4 doubles after skipping over 5 numbers   
try { t.skip(5); $\mathrm{num1=t.next\_double()}$ ; num2 = t.next_double(); num3 = t.next_double(); num4 = t.next_double();   
$\}$ catch (TokenizerException &e) { std::cout $<<$ "Reading numbers failed: $"<<\mathrm{e.what}()<<"\mathrm{n"}$ ;   
}   
std::cout << "Values: " << num1 << " " << num2 << " " << num3 << " " << num4 << "\n";   
return 0;  

This code example should produce the following output:  

Reading numbers failed: Not a valid floating-point number: 'twentytwo' Values: 20 21 0 0  

class Tokenizer  

# Public Functions  

Tokenizer(std::string str, std::string separators $=$ TOKENIZER_DEFAULT_SEPARATORS)  

Class for splitting text into words  

This tokenizer will break down a string into sub-strings (i.e words) separated by the given separator characters. If the string contains certain known UTF-8 characters they will be replaced by their ASCII equivalents processing the string.  

# See also  

ValueTokenizer, utils::split_words(), utils::utf8_subst()  

# Parameters  

• str – string to be processed _separators – string with separator characters (default: “ \t\r\n\f”)  

void reset()  

Re-position the tokenizer state to the first word, i.e. the first non-separator character void skip(int $\mathfrak{n}=1$ )  

Skip over a given number of tokens  

Parameters n – number of tokens to skip over  

bool has_next() const Indicate whether more tokens are available  

# Returns  

true if there are more tokens, false if not bool contains(const std::string &str) const Search the text to be processed for a sub-string. This method does a generic sub-string match.  

Parameters str – string to be searched for  

# Returns  

true if string was found, false if not  

bool matches(const std::string &str) const  

Search the text to be processed for regular expression match  

This method matches the current string against a regular expression using the utils::strmatch() function.  

Parameters str – regular expression to be matched against  

# Returns  

true if string was found, false if not std::string next() Retrieve next token.  

# Returns  

string with the next token size_t count() Count number of tokens in text.  

#  

Returns number of counted tokens std::vector<std::string> as_vector() Retrieve the entire text converted to an STL vector of tokens.  

# Returns  

The STL vector  

class TokenizerException $:$ public exception General Tokenizer exception class Subclassed by InvalidFloatException, InvalidIntegerException  

# Public Functions  

TokenizerException() $=$ delete The default constructor is disabled   
explicit TokenizerException(const std::string &msg, const std::string &token) Thrown during retrieving or skipping tokens  

# Parameters  

# LAMMPS Documentation, Release 4Feb2025  

• msg – String with error message • token – String of the token or word that caused the error  

inline const char \*what() const noexcept override  

Retrieve message describing the thrown exception  

This function provides the message that can be retrieved when the corresponding exception is caught.  

Returns String with error message  

class ValueTokenizer  

# Public Functions  

ValueTokenizer(const std::string &str, const std::string &separators $=$ TOKENIZER_DEFAULT_SEPARATORS)  

Class for reading text with numbers  

See also Tokenizer  

# See also  

Tokenizer InvalidIntegerException InvalidFloatException  

# Parameters  

• str – String to be processed • separators – String with separator characters (default: “ \t\r\n\f”)  

std::string next_string() Retrieve next token  

# Returns  

string with next token tagint next_tagint() Retrieve next token and convert to tagint  

# Returns  

value of next token bigint next_bigint() Retrieve next token and convert to bigint  

# Returns  

value of next token int next_int() Retrieve next token and convert to int  

# Returns  

value of next token double next_double() Retrieve next token and convert to double  

# Returns  

value of next token bool has_next() const Indicate whether more tokens are available  

# Returns  

true if there are more tokens, false if not bool contains(const std::string &value) const Search the text to be processed for a sub-string. This method does a generic sub-string match.  

Parameters value – string with value to be searched for  

# Returns  

true if string was found, false if not  

bool matches(const std::string &str) const  

Search the text to be processed for regular expression match.  

This method matches the current string against a regular expression using the utils::strmatch() function.  

Parameters str – regular expression to be matched against  

# Returns  

true if string was found, false if n void skip(int ntokens $=1$ ) Skip over a given number of tokens  

# Parameters  

n – number of tokens to skip over  

size_t count() Count number of tokens in text.  

# Returns  

number of counted tokens  

class InvalidIntegerException $:$ public TokenizerException  

Exception thrown by ValueTokenizer when trying to convert an invalid integer string  

# Public Functions  

inline explicit InvalidIntegerException(const std::string &token) Thrown during converting string to integer number  

Parameters token – String of the token/word that caused the error  

class InvalidFloatException $:$ public TokenizerException  

Exception thrown by ValueTokenizer when trying to convert an floating point string  

# Public Functions  

inline explicit InvalidFloatException(const std::string &token) Thrown during converting string to floating point number  

Parameters token – String of the token/word that caused the error  

# 4.18 Argument parsing classes  

The purpose of argument parsing classes it to simplify and unify how arguments of commands in LAMMPS are parsed and to make abstractions of repetitive tasks.  

The LAMMPS_NS::ArgInfo class provides an abstraction for parsing references to compute or fix styles, variables or custom integer or double properties handled by fix property/atom. These would start with a “c_”, “f_”, “v_”, “d_”, “d2_”, “i_”, or $\yen12\_$ followed by the ID or name of than instance and may be postfixed with one or two array indices “[<number>]” with numbers $>0$ .  

A typical code segment would look like this:  

Listing 3: Usage example for ArgInfo class   


<html><body><table><tr><td>int nvalues = 0; for (iarg = O; iarg < nargnew; iarg++) { ArgInfo argi(arg[iarg]);</td></tr></table></body></html>  

class ArgInfo  

# Public Types  

enum ArgTypes constants for argument types Values:  

enumerator ERROR   
enumerator UNKNOWN   
enumerator NONE   
enumerator X   
enumerator V   
enumerator F   
enumerator COMPUTE   
enumerator FIX   
enumerator VARIABLE   
enumerator KEYWORD   
enumerator TYPE   
enumerator MOLECULE   
enumerator DNAME   
enumerator INAME   
enumerator DENSITY_NUMBER   
enumerator DENSITY_MASS   
enumerator MASS   
enumerator TEMPERATURE   
enumerator BIN1D   
enumerator BIN2D   
enumerator BIN3D  

enumerator BINSPHERE enumerator BINCYLINDER  

# Public Functions  

ArgInfo(const std::string &arg, int allowed $=$ COMPUTE | FIX | VARIABLE)  

Class for processing references to fixes, computes and variables  

This class provides an abstraction for the repetitive task of parsing arguments that may contain references to fixes, computes, variables, or custom per-atom properties. It will identify the name and the index value in the first and second dimension, if present.  

# Parameters  

• arg – string with possible reference • allowed – integer with bitmap of allowed types of references  

inline int get_type() const get type of reference  

Return a type constant for the reference. This may be either COMPUTE, FIX, VARIABLE (if not restricted to a subset of those by the “allowed” argument of the constructor) or NONE, if it if not a recognized or allowed reference, or UNKNOWN, in case some error happened identifying or parsing the values of the indices  

# Returns  

integer with a constant from ArgTypes enumerator  

inline int get_ $\dim()$ const  

get dimension of reference  

This will return either 0, 1, 2 depending on whether the reference has no, one or two “[{number}]” postfixes.  

# Returns  

integer with the dimensionality of the reference  

inline int get_index1() const  

get index of first dimension  

This will return the number in the first “[{number}]” postfix or 0 if there is no postfix.  

# Returns  

integer with index or the postfix or 0  

inline int get_index2() const  

get index of second dimension  

This will return the number in the second “[{number}]” postfix or $^{-1}$ if there is no second postfix.  

# Returns  

integer with index of the postfix or -1  

inline const char ${}^{*}\mathrm{get\_name()}$ const  

return reference to the ID or name of the reference  

This string is pointing to an internal storage element and is only valid to use while the ArgInfo class instance is in scope. If you need a long-lived string make a copy with copy_name().  

# Returns  

C-style char \* string  

char \*copy_name() make copy of the ID of the reference as C-style string  

The ID is copied into a buffer allocated with “new” and thus must be later deleted with “delete []” to avoid a memory leak. Because it is a full copy in a newly allocated buffer, the lifetime of this string extends beyond the the time the ArgInfo class is in scope.  

Returns copy of string as char \*  

# 4.19 File reader classes  

The purpose of the file reader classes is to simplify the recurring task of reading and parsing files. They can use the ValueTokenizer class to process the read in text. The TextFileReader is a more general version while PotentialFileReader is specialized to implement the behavior expected for looking up and reading/parsing files with potential parameters in LAMMPS. The potential file reader class requires a LAMMPS instance, requires to be run on MPI rank 0 only, will use the utils::get_potential_file_path function to look up and open the file, and will call the LAMMPS_NS::Error class in case of failures to read or to convert numbers, so that LAMMPS will be aborted.  

Listing 4: Use of PotentialFileReader class in pair style coul/streitz  

<html><body><table><tr><td>PotentialFileReader reader(lmp, file, "coul/streitz"); char * line;</td></tr><tr><td>while((line = reader.next _line(NPARAMS _PER_LINE))) { try { ValueTokenizer values(line);</td></tr><tr><td>std:string iname = values.next _string);</td></tr><tr><td>int ielement; for (ielement 三（ O; ielement < nelements; ielement++)</td></tr><tr><td>if (iname 二二 elements[ielement]) break;</td></tr><tr><td>if (nparams == maxparam){ maxparam += DELTA;</td></tr><tr><td>params = (Param *) memory->srealloc(params,maxparam*sizeof(Param),</td></tr><tr><td>"pair:params");</td></tr><tr><td></td></tr><tr><td>params[nparams].ielement = ielement;</td></tr><tr><td>params[nparams].chi = values.next _double();</td></tr><tr><td>params[nparams].eta = values.next _double();</td></tr><tr><td>params[nparams].gamma = values.next _double(); params[nparams].zeta = values.next _double();</td></tr></table></body></html>  

<html><body><table><tr><td>(continued from previous page)</td></tr><tr><td></td></tr><tr><td>nparams++;</td></tr><tr><td></td></tr><tr><td></td></tr></table></body></html>  

A file that would be parsed by the reader code fragment looks like this:  

<html><body><table><tr><td colspan="5"># DATE: 2015-02-19 UNITS: metal CONTRIBUTOR: Ray Shan CITATION: Streitz and Mintmire,L →Phys Rev B, 50, 11996-12003 (1994)</td></tr><tr><td>#</td><td></td><td>J (eV)</td><td>(1/AA) gamma</td><td>zeta (1/AA) Z (e)</td></tr><tr><td># X (eV)</td><td></td><td></td><td></td><td></td></tr><tr><td>Al</td><td>0.000000</td><td>10.328655 14.035715</td><td>0.000000 0.000000</td><td>0.968438 0.763905 2.143957 0.000000</td></tr></table></body></html>  

class TextFileReader  

# Public Functions  

TextFileReader(const std::string &filename, const std::string &filetype)  

Class for reading and parsing text files  

The value of the class member variable ignore_comments controls whether any text following the pound sign (#) should be ignored (true) or not (false). Default: true, i.e. ignore.  

See also TextFileReader  

# Parameters  

• filename – Name of file to be read • filetype – Description of file type for error messages  

TextFileReader(FILE \*fp, std::string filetype)  

This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.  

This function is useful in combination with utils::open_potential().  

![](images/b8825ac29cb89155b2271de085b6d820ddb4410e4f68fed9a31733f3d3a53f40.jpg)  

# Note  

The FILE pointer is not closed in the destructor, but will be advanced when reading from it.  

# Parameters  

• fp – File descriptor of the already opened file • filetype – Description of file type for error messages  

virtual \~TextFileReader() Closes the file   
void set_bufsize(int) adjust line buffer size  

void rewind()  

Reset file to the beginning void skip_line()  

Read the next line and ignore it char \*next_line(int nparams $=0$ )  

Read the next line(s) until nparams words have been read.  

This reads a line and counts the words in it, if the number is less than the requested number, it will read the next line, as well. Output will be a string with all read lines combined. The purpose is to somewhat replicate the reading behavior of formatted files in Fortran.  

If the ignore_comments class member has the value true, then any text read in is truncated at the first ‘#’ character.  

# Parameters  

nparams – Number of words that must be read. Default: 0  

# Returns  

String with the concatenated text  

void next_dvector(double \*list, int n)  

Read lines until $n$ doubles have been read and stored in array list  

This reads lines from the file using the next_line() function, and splits them into floating-point numbers using the ValueTokenizer class and stores the number in the provided list.  

# Parameters  

• list – Pointer to array with suitable storage for $n$ doubles • n – Number of doubles to be read  

ValueTokenizer next_values(int nparams, const std::string &separators $=$ TOKENIZER_DEFAULT_SEPARATORS)  

Read text until nparams words are read and passed to a tokenizer object for custom parsing.  

This reads lines from the file using the next_line() function, and splits them into floating-point numbers using the ValueTokenizer class and stores the number in the provided list.  

# Parameters  

nparams – Number of words to be read separators – String with list of separators.  

# Returns  

ValueTokenizer object for read in text  

# Public Members  

bool ignore_comments Controls whether comments are ignored.  

class PotentialFileReader $:$ protected Pointers  

# 4.19. File reader classes  

# Public Functions  

PotentialFileReader(class LAMMPS \*lmp, const std::string &filename, const std::string &potential_name, const std::string &name_suffix, const int auto_convert $=0$ )  

Class for reading and parsing LAMMPS potential files  

The value of the class member variable ignore_comments controls whether any text following the pound sign (#) should be ignored (true) or not (false). Default: true, i.e. ignore.  

See also TextFileReader  

# Parameters  

• lmp – Pointer to LAMMPS instance   
• filename – Name of file to be read   
• potential_name – Name of potential style for error messages   
• name_suffix – Suffix added to potential name in error messages   
• auto_convert – Bitmask of supported unit conversions  

\~PotentialFileReader() override  

Closes the file void ignore_comments(bool value) Set comment $\circeq$ text after ‘#’) handling preference for the file to be read  

# Parameters  

value – Comment text is ignored if true, or not if false  

void rewind()  

Reset file to the beginning void skip_line() Read a line but ignore its content char \*next_line(int nparams $=0$ )  

Read the next line(s) until nparams words have been read.  

This reads a line and counts the words in it, if the number is less than the requested number, it will read the next line, as well. Output will be a string with all read lines combined. The purpose is to somewhat replicate the reading behavior of formatted files in Fortran.  

# Parameters  

nparams – Number of words that must be read. Default: 0  

# Returns  

String with the concatenated text  

void next_dvector(double \*list, int n)  

Read lines until $n$ doubles have been read and stored in array list  

This reads lines from the file using the next_line() function, and splits them into floating-point numbers using the ValueTokenizer class and stores the number in the provided list.  

# Parameters  

• list – Pointer to array with suitable storage for $n$ doubles • n – Number of doubles to be read  

ValueTokenizer next_values(int nparams, const std::string &separators $=$ TOKENIZER_DEFAULT_SEPARATORS)  

Read text until nparams words are read and passed to a tokenizer object for custom parsing.  

This reads lines from the file using the next_line() function, and splits them into floating-point numbers using the ValueTokenizer class and stores the number in the provided list.  

# Parameters  

nparams – Number of words to be read separators – String with list of separators.  

# Returns  

ValueTokenizer object for read in text double next_double() Read next line and convert first word to a double  

Returns Value of first word in line as double   
int next_int() Read next line and convert first word to an int Returns Value of first word in line as int   
tagint next_tagint() Read next line and convert first word to a tagint Returns Value of first word in line as tagint   
bigint next_bigint() Read next line and convert first word to a bigint Returns Value of first word in line as bigint   
std::string next_string() Read next line and return first word Returns First word of read in line  

# 4.20 Memory pool classes  

The memory pool classes are used for cases where otherwise many small memory allocations would be needed and where the data would be either all used or all freed. One example for that is the storage of neighbor lists. The memory management strategy is based on the assumption that allocations will be in chunks of similar sizes. The allocation is then not done per individual call for a reserved chunk of memory, but for a “page” that can hold multiple chunks of data. A parameter for the maximum chunk size must be provided, as that is used to determine whether a new page of memory must be used.  

The MyPage class offers two ways to reserve a chunk: 1) with MyPage::get() the chunk size needs to be known in advance, 2) with MyPage::vget() a pointer to the next chunk is returned, but its size is registered later with MyPage::vgot().  

# 4.20. Memory pool classes  

Listing 5: Example of using MyPage  

#include "my_page.h"   
using namespace LAMMPS_NS;   
MyPage<double> $^*$ dpage = new MyPage $<$ <double>;   
// max size of chunk: 256, size of page: 10240 doubles (=81920 bytes)   
dpage- $\cdot>$ init(256,10240);   
double \*\*build_some_lists(int num)   
{ dpage- $\scriptscriptstyle\bigcirc$ reset(); double \*\*dlist = new double\*[num]; for (int i=0; $.<$ < num; ++i) { double $\boldsymbol{^{*}}\mathrm{dptr}=\mathrm{dpage.vget}()$ ; int $\mathrm{{jnum}=0}$ ; for (int j=0; $\mathrm{j}<\mathrm{jmax};++\mathrm{j}$ ) $\{$ // compute some dvalue for eligible loop index j dptr[j] = dvalue; ++jnum; } if (dpage.status() != 0) $\{$ { // handle out of memory or jnum too large errors } dpage.vgot(jnum); dlist[i] = dptr; } return dlist;   
}  

template<class $\mathrm{T}\mathrm{>}$ class MyPage  

Templated class for storing chunks of datums in pages.  

The size of the chunk may vary from call to call, but must be less or equal than the maxchunk setting. The chunks are not returnable like with malloc() (i.e. you cannot call free() on them individually). One can only reset and start over. The purpose of this class is to replace many small memory allocations via malloc() with a few large ones. Since the pages are never freed until the class is re-initialized, they can be re-used without having to re-allocate them by calling the reset() method.  

The settings maxchunk, pagesize, and pagedelta control the memory allocation strategy. The maxchunk value represents the expected largest number of items per chunk. If there is less space left on the current page, a new page is allocated for the next chunk. The pagesize value represents how many items can fit on a single page. It should have space for multiple chunks of size maxchunk. The combination of these two parameters determines how much memory is wasted by either switching to the next page too soon or allocating too large pages that never get properly used. An error is issued if a requested chunk is larger than maxchunk. The pagedelta parameter determines how many pages are allocated in one go. In combination with the pagesize setting, this determines how often blocks of memory get allocated (fewer allocations will result in faster execution).  

#  Note  

This is a template class with explicit instantiation. If the class is used with a new data type, a new explicit instantiation may need to be added at the end of the file src/my_page.cpp to avoid symbol lookup errors.  

# Public Functions  

MyPage()  

Create a class instance  

Need to call init() before use to define allocation settings  

nt init(int user_maxchunk $=1$ , int user_pagesize $=1024$ , int user_pagedelta $=1$ )  

(Re-)initialize the set of pages and allocation parameters.  

This also frees all previously allocated storage and allocates the first page(s).  

# Parameters  

• user_maxchunk – Expected maximum number of items for one chunk • user_pagesize – Number of items on a single memory page • user_pagedelta – Number of pages to allocate with one malloc  

# Returns  

1 if there were invalid parameters, 2 if there was an allocation error or 0 if successful  

$$
T*\mathrm{get}(\mathrm{int}\mathrm{n}=1)
$$  

Pointer to location that can store N items.  

This will allocate more pages as needed. If the parameter $N$ is larger than the maxchunk setting, an error is flagged.  

# Parameters  

n – number of items for which storage is requested  

# Returns  

memory location or null pointer, if error or allocation failed  

inline T \*vget()  

Get pointer to location that can store maxchunk items.  

This will return the same pointer as the previous call to this function unless vgot() is called afterwards to record how many items of the chunk were actually used.  

# Returns  

pointer to chunk of memory or null pointer if run out of memory  

inline void vgot(int n)  

Mark $N$ items as used of the chunk reserved with a preceding call to vget().  

This will advance the internal pointer inside the current memory page. It is not necessary to call this function for $N=0$ , implying the reserved storage was not used. A following call to vget() will then reserve the same location again. It is an error if $N>$ maxchunk.  

# Parameters  

n – Number of items used in previously reserved chunk void reset()  

Reset state of memory pool without freeing any memory  

inline double size() const Return total size of allocated pages  

# Returns  

total storage used in bytes  

inline int status() const Return error status  

# Returns  

0 if no error, 1 requested chunk size $>$ maxchunk, 2 if malloc failed  

template<class T> class MyPoolChunk  

Templated class for storing chunks of datums in pages.  

The size of the chunk may vary from call to call between the minchunk and maxchunk setting. Chunks may be returned to the pool for re-use. Chunks can be reserved in nbin different sizes between minchunk and maxchunk. The chunksperpage setting specifies how many chunks are stored on any page and the pagedelta setting determines how many pages are allocated in one go. Pages are never freed, so they can be re-used without re-allocation.  

![](images/1495afa253c38987e622fe87eb2ca588dbbb30c9fa65ead838c2900ed5f4b462.jpg)  

# Note  

This is a template class with explicit instantiation. If the class is used with a new data type, a new explicit instantiation may need to be added at the end of the file src/my_pool_chunk.cpp to avoid symbol lookup errors.  

# Public Functions  

MyPoolChunk(int user_minchunk $=1$ , int user_maxchunk $=1$ , int user_nbin $=1$ , int user_chunkperpage $=$ 1024, int user_pagedelta $=1$ )  

Create a class instance and set memory pool parameters  

# Parameters  

• user_minchunk – Minimal chunk size • user_maxchunk – Maximal chunk size • user_nbin – Number of bins of different chunk sizes • user_chunkperpage – Number of chunks per page • user_pagedelta – Number of pages to allocate in one go  

\~MyPoolChunk()  

Destroy class instance and free all allocated memory T \*get(int &index) Return pointer/index of unused chunk of size maxchunk  

Parameters index – Index of chunk in memory pool  

# Returns  

Pointer to requested chunk of storage  

T \*get(int n, int &index) Return pointer/index of unused chunk of size N  

# Parameters  

• n – Size of chunk • index – Index of chunk in memory pool  

# Returns  

Pointer to requested chunk of storage void put(int index) Put indexed chunk back into memory pool via free list  

# Parameters  

index – Memory chunk index returned by call to get() double size() const Return total size of allocated pages  

# Returns  

total storage used in bytes  

inline int status() const Return error status  

# Returns  

0 if no error, 1 if invalid input, 2 if malloc() failed, 3 if chunk $>$ maxchunk  

# 4.21 Eigensolver functions  

The MathEigen sub-namespace of the LAMMPS_NS namespace contains functions and classes for eigensolvers. Currently only the jacobi3 function is used in various places in LAMMPS. That function is built on top of a group of more generic eigensolvers that are maintained in the math_eigen_impl.h header file. This header contains the implementation of three template classes:  

1. “Jacobi” calculates all of the eigenvalues and eigenvectors of a dense, symmetric, real matrix. 2. The “PEigenDense” class only calculates the principal eigenvalue (i.e. the largest or smallest eigenvalue), and its corresponding eigenvector. However it is much more efficient than “Jacobi” when applied to large matrices (larger than 13x13). PEigenDense also can understand complex-valued Hermitian matrices. 3. The “LambdaLanczos” class is a generalization of “PEigenDense” which can be applied to arbitrary sparse matrices.  

The “math_eigen_impl.h” code is an amalgamation of jacobi_pd by Andrew Jewett at Scripps Research (under CC0-1.0 license) and Lambda Lanczos by Yuya Kurebayashi at Tohoku University (under MIT license)  

int MathEigen::jacobi3(double const \*const \*mat, double \*eval, double \*\*evec, int sort $=-1$ )  

A specialized function which finds the eigenvalues and eigenvectors of a 3x3 matrix (in double $^{**}$ format).  

# Parameters  

• mat – the 3x3 matrix you wish to diagonalize eval – store the eigenvalues here  

# 4.21. Eigensolver functions  

• evec – store the eigenvectors here. . . • sort – order eigenvalues and -vectors (-1 decreasing (default), 1 increasing, 0 unsorted)  

# Returns  

0 if eigenvalue calculation converged, 1 if it failed  

int MathEigen::jacobi3(double const mat[3][3], double \*eval, double evec[3][3], int sort $=-1$ )  

This is an overloaded member function, provided for convenience. It differs from the above function only in wha argument(s) it accepts.  

# 4.22 Communication buffer coding with ubuf  

LAMMPS uses communication buffers where it collects data from various class instances and then exchanges the data with neighboring subdomains. For simplicity those buffers are defined as double buffers and used for doubles and integer numbers. This presents a unique problem when 64-bit integers are used. While the storage needed for a double is also 64-bit, it cannot be used by a simple assignment. To get around that limitation, LAMMPS uses the ubuf union. It is used in the various “pack” and “unpack” functions in the LAMMPS classes to store and retrieve integers that may be 64-bit from the communication buffers.  

union ubuf  

#include <lmptype. $h>$ Data structure for packing 32-bit and 64-bit integers into double (communication) buffers Using this union avoids aliasing issues by having member types (double, int) referencing the same buffer memory location.  

The explicit constructor for 32-bit integers prevents compilers from (incorrectly) calling the double constructor when storing an int into a double buffer.  

# Usage:  

Listing 6: To copy an integer into a double buffer:   


<html><body><table><tr><td>double buf[2];</td><td></td></tr><tr><td>int foo 二 1;</td><td></td></tr><tr><td>tagint t bar = 2<<40;</td><td></td></tr><tr><td>buf[1] = ubuf(foo).d;</td><td></td></tr><tr><td>buf[2] = ubuf(bar).d;</td><td></td></tr></table></body></html>  

Listing 7: To copy from a double buffer back to an int:   


<html><body><table><tr><td>foo = (int) bar</td><td>ubuf(buf[1]).i; (tagint) ubuf(buf[2]).i;</td></tr></table></body></html>  

The typecasts prevent compiler warnings about possible truncation issues.  

# Public Functions  

inline ubuf(const double &arg) inline ubuf(const int64_t &arg) inline ubuf(const int &arg)  

# Public Members  

double d  

int64_t i  

# 4.23 Use of distributed grids within style classes  

Added in version 22Dec2022.  

The LAMMPS source code includes two classes which facilitate the creation and use of distributed grids. These are the Grid2d and Grid3d classes in the src/grid2d.cpp.h and src/grid3d.cpp.h files respectively. As the names imply, they are used for 2d or 3d simulations, as defined by the dimension command.  

The Howto_grid page gives an overview of how distributed grids are defined from a user perspective, lists LAMMPS commands which use them, and explains how grid cell data is referenced from an input script. Please read that page first as it motivates the coding details discussed here.  

This doc page is for users who wish to write new styles (input script commands) which use distributed grids. There are a variety of material models and analysis methods which use atoms (or coarse-grained particles) and grids in tandem.  

A distributed grid means each processor owns a subset of the grid cells. In LAMMPS, the subset for each processor will be a sub-block of grid cells with low and high index bounds in each dimension of the grid. The union of the sub-blocks across all processors is the global grid.  

More specifically, a grid point is defined for each cell (by default the center point), and a processor owns a grid cell if its point is within the processor’s spatial subdomain. The union of processor subdomains is the global simulation box. If a grid point is on the boundary of two subdomains, the lower processor owns the grid cell. A processor may also store copies of ghost cells which surround its owned cells.  

# 4.23.1 Style commands  

Style commands which can define and use distributed grids include the compute, $f\alpha$ , pair, and kspace styles. If you wish grid cell data to persist across timesteps, then use a fix. If you wish grid cell data to be accessible by other commands, then use a fix or compute. Currently in LAMMPS, the pair_style amoeba, kspace_style pppm, and kspace_style msm commands use distributed grids but do not require either of these capabilities; they thus create and use distributed grids internally. Note that a pair style which needs grid cell data to persist could be coded to work in tandem with a fix style which provides that capability.  

The size of a grid is specified by the number of grid cells in each dimension of the simulation domain. In any dimension the size can be any value $>=1$ . Thus a $10\mathrm{x}10\mathrm{x}1$ grid for a 3d simulation is effectively a 2d grid, where each grid cell spans the entire $\mathbf{Z}$ -dimension. A 1x100x1 grid for a 3d simulation is effectively a 1d grid, where grid cells are a series of thin xz slabs in the y-dimension. It is even possible to define a 1x1x1 3d grid, though it may be inefficient to use it in a computational sense.  

Note that the choice of grid size is independent of the number of processors or their layout in a grid of processor subdomains which overlays the simulations domain. Depending on the distributed grid size, a single processor may own many 1000s or no grid cells.  

A command can define multiple grids, each of a different size. Each grid is an instantiation of the Grid2d or Grid3d class.  

The command also defines what data it will store for each grid it creates and it allocates the multidimensional array(s) needed to store the data. No grid cell data is stored within the Grid2d or Grid3d classes.  

If a single value per grid cell is needed, the data array will have the same dimension as the grid, i.e. a 2d array for a 2d grid, likewise for 3d. If multiple values per grid cell are needed, the data array will have one more dimension than the grid, i.e. a 3d array for a 2d grid, or 4d array for a 3d grid. A command can choose to define multiple data arrays for each grid it defines.  

# 4.23.2 Grid data allocation and access  

The simplest way for a command to allocate and access grid cell data is to use the create_offset() methods provided by the Memory class. Arguments for these methods can be values returned by the setup_grid() method (described below), which define the extent of the grid cells (owned $^{+}$ ghost) the processor owns. These 4 methods allocate memory for 2d (first two) and 3d (second two) grid data. The two methods that end in “_offset” allocate an array which stores a single value per grid cell. The two that end in “_last” allocate an array which stores Nvalues per grid cell.  

// single value per cell for a 2d grid = 2d array   
memory- $\scriptscriptstyle\bigcirc$ create2d_offset(data2d_one, nylo_out, nyhi_out, nxlo_out, nxhi_out, "data2d_one");   
// nvalues per cell for a 2d grid = 3d array   
memory- $\scriptscriptstyle\bigcirc$ create3d_offset_last(data2d_multi, nylo_out, nyhi_out, nxlo_out, nxhi_out, nvalues, "data2d_multi");   
// single value per cell for a 3d grid = 3d array   
memory- $\cdot>$ create3d_offset(data3d_one, nzlo_out, nzhi_out, nylo_out, nyhi_out, nxlo_out, nxhi_out, "data3d_one");   
// nvalues per cell for a 3d grid = 4d array   
memory- $\scriptscriptstyle\bigcirc$ create4d_offset_last(data3d_multi, nzlo_out, nzhi_out, nylo_out, nyhi_out, nxlo_out, nxhi_out, nvalues, "data3d_multi");  

Note that these multidimensional arrays are allocated as contiguous chunks of memory where the $\mathbf{X}$ -index of the grid varies fastest, then y, and the z-index slowest. For multiple values per grid cell, the Nvalues are contiguous, so their index varies even faster than the $\mathbf{X}$ -index.  

The key point is that the “offset” methods create arrays which are indexed by the range of indices which are the bounds of the sub-block of the global grid owned by this processor. This means loops like these can be written in the caller code to loop over owned grid cells, where the “i” loop bounds are the range of owned grid cells for the processor. These are the bounds returned by the setup_grid() method:  

<html><body><table><tr><td>for (int iy = iylo; iy <= iyhi; iy++) for (int ix = ixlo; ix <= ixhi; ix++)</td><td></td><td></td></tr><tr><td>data2d_one[iy][ix] = 0.0;</td><td></td><td></td></tr><tr><td></td><td>for (int iy = iylo; iy <= iyhi; iy++)</td><td></td></tr><tr><td></td><td>for (int ix = ixlo; ix <= ixhi; ix++)</td><td></td></tr><tr><td></td><td>for (int m = O; m < nvalues; m++)</td><td></td></tr><tr><td></td><td>data2d_multi[iy][ix][m] = 0.0;</td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td>for (int iz = izlo; iz <= izhi; iz++)</td><td></td></tr><tr><td></td><td>(++  =>  O! =  aU) 10J</td><td></td></tr><tr><td></td><td>for (int ix = ixlo; ix <= ixhi; ix++)</td><td></td></tr><tr><td>data3d _one[iz][iy][ix] = 0.0;</td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table></body></html>  

(continues on next page)  

(continued from previous page)  

for (int $\mathrm{iz=izlo}$ ; i $\mathrm{z}<=\mathrm{izhi}$ ; iz++) for (int iy $=$ iylo; iy $<=$ iyhi; iy++) for (int ix = ixlo; ix <= ixhi; ix++) for (int $\mathrm{m}=0$ ; m < nvalues; m++) data3d_multi[iz][iy][ix][m] = 0.0;  

Simply replacing the “i” bounds with “o” bounds, also returned by the setup_grid() method, would alter this code to loop over owned $^{+}$ ghost cells (the entire allocated grid).  

# 4.23.3 Grid class constructors  

The following subsections describe the public methods of the Grid3d class which a style command can invoke. The Grid2d methods are similar; simply remove arguments which refer to the z-dimension.  

There are 2 constructors which can be used. They differ in the extra i/o xyz lo/hi arguments:  

Grid3d(class LAMMPS \*lmp, MPI_Comm gcomm, int gnx, int gny, int gnz)   
Grid3d(class LAMMPS \*lmp, MPI_Comm gcomm, int gnx, int gny, int gnz, int ixlo, int ixhi, int iylo, int iyhi, int izlo, int izhi, int oxlo, int oxhi, int oylo, int oyhi, int ozlo, int ozhi)  

Both constructors take the LAMMPS instance pointer and a communicator over which the grid will be distributed. Typically this is the world communicator the LAMMPS instance is using. The kspace_style msm command creates a series of grids, each of different size, which are partitioned across different sub-communicators of processors. Both constructors are also passed the global grid size: gnx by gny by gnz.  

The first constructor is used when the caller wants the Grid class to partition the global grid across processors; the Grid class defines which grid cells each processor owns and also which it stores as ghost cells. A subsequent call to setup_grid(), discussed below, returns this info to the caller.  

The second constructor allows the caller to define the extent of owned and ghost cells, and pass them to the Grid class. The 6 arguments which start with “i” are the inclusive lower and upper index bounds of the owned (inner) grid cells this processor owns in each of the 3 dimensions within the global grid. Owned grid cells are indexed from 0 to N-1 in each dimension.  

The 6 arguments which start with “o” are the inclusive bounds of the owned $^{+}$ ghost (outer) grid cells it stores. If the ghost cells are on the other side of a periodic boundary, then these indices may be $<0$ or $>=\mathbf{N}$ in any dimension, so that oxlo $<=$ ixlo and ixhi $>=$ ixhi is always the case.  

For example, if $\mathrm{Nx}=100$ , then a processor might pass ixlo $\scriptstyle=50$ , ixh $=60$ , oxlo $_{\=48}$ , oxh ${\it\Omega}_{=62}$ to the Grid class. Or ixlo $_{=0}$ , ixh $=10$ , oxlo $=-2$ , oxh $^{=13}$ . If a processor owns no grid cells in a dimension, then the ihi value should be specified as one less than the ilo value.  

Note that the only reason to use the second constructor is if the logic for assigning ghost cells is too complex for the Grid class to compute, using the various set() methods described next. Currently only the kspace_style pppm/electrode and kspace_style msm commands use the second constructor.  

# 4.23.4 Grid class set methods  

The following methods affect how the Grid class computes which owned and ghost cells are assigned to each processor. Set_shift_grid() is the only method which influences owned cell assignment; all the rest influence ghost cell assignment. These methods are only used with the first constructor; they are ignored if the second constructor is used. These methods must be called before the setup_grid() method is invoked, because they influence its operation.  

void set_shift_grid(double shift);   
void set_distance(double distance);   
void set_stencil_atom(int lo, int hi);   
void set_shift_atom(double shift_lo, double shift_hi);   
void set_stencil_grid(int lo, int hi);   
void set_zfactor(double factor);  

Processors own a grid cell if a point within the grid cell is inside the processor’s subdomain. By default this is the center point of the grid cell. The set_shift_grid() method can change this. The shift argument is a value from 0.0 to 1.0 (inclusive) which is the offset of the point within the grid cell in each dimension. The default is 0.5 for the center of the cell. A value of 0.0 is the lower left corner point; a value of 1.0 is the upper right corner point. There is typically no need to change the default as it is optimal for minimizing the number of ghost cells needed.  

If a processor maps its particles to grid cells, it needs to allow for its particles being outside its subdomain between reneighboring. The distance argument of the set_distance() method sets the furthest distance outside a processor’s subdomain which a particle can move. Typically this is half the neighbor skin distance, assuming reneighboring is done appropriately. This distance is used in determining how many ghost cells a processor needs to store to enable its particles to be mapped to grid cells. The default value is 0.0.  

Some commands, like the kspace_style pppm command, map values (charge in the case of PPPM) to a stencil of grid cells beyond the grid cell the particle is in. The stencil extent may be different in the low and high directions. The set_stencil_atom() method defines the maximum values of those 2 extents, assumed to be the same in each of the 3 dimensions. Both the lo and hi values are specified as positive integers. The default values are both 0.  

Some commands, like the kspace_style pppm command, shift the position of an atom when mapping it to a grid cell, based on the size of the stencil used to map values to the grid (charge in the case of PPPM). The lo and hi arguments of the set_shift_atom() method are the minimum shift in the low direction and the maximum shift in the high direction, assumed to be the same in each of the 3 dimensions. The shifts should be fractions of a grid cell size with values between 0.0 and 1.0 inclusive. The default values are both 0.0. See the src/pppm.cpp file for examples of these lo/hi values for regular and staggered grids.  

Some methods like the fix ttm/grid command, perform finite difference kinds of operations on the grid, to diffuse electron heat in the case of the two-temperature model (TTM). This operation uses ghost grid values beyond the owned grid values the processor updates. The set_stencil_grid() method defines the extent of this stencil in both directions, assumed to be the same in each of the 3 dimensions. Both the lo and hi values are specified as positive integers. The default values are both 0.  

The kspace_style pppm commands allow a grid to be defined which overlays a volume which extends beyond the simulation box in the z dimension. This is for the purpose of modeling a 2d-periodic slab (non-periodic in z) as if it were a larger 3d periodic system, extended (with empty space) in the z dimension. The kspace_modify slab command is used to specify the ratio of the larger volume to the simulation volume; a volume ratio of ${\sim}3$ is typical. For this kind of model, the PPPM caller sets the global grid size gnz $\sim3\mathrm{x}$ larger than it would be otherwise. This same ratio is passed by the PPPM caller as the factor argument to the Grid class via the set_zfactor() method (set_yfactor() for 2d grids). The Grid class will then assign ownership of the 1/3 of grid cells that overlay the simulation box to the processors which also overlay the simulation box. The remaining $2/3$ of the grid cells are assigned to processors whose subdomains are adjacent to the upper $\mathbf{Z}$ boundary of the simulation box.  

# 4.23.5 Grid class setup_grid method  

The setup_grid() method is called after the first constructor (above) to partition the grid across processors, which determines which grid cells each processor owns. It also calculates how many ghost grid cells in each dimension and each direction each processor needs to store.  

Note that this method is NOT called if the second constructor above is used. In that case, the caller assigns owned and ghost cells to each processor.  

Also note that this method must be invoked after any set_\*() methods have been used, since they can influence the assignment of owned and ghost cells.  

void setup_grid(int &ixlo, int &ixhi, int &iylo, int &iyhi, int &izlo, int &izhi, int &oxlo, int &oxhi, int &oylo, int &oyhi, int &ozlo, int &ozhi)  

The 6 return arguments which start with “i” are the inclusive lower and upper index bounds of the owned (inner) grid cells this processor owns in each of the 3 dimensions within the global grid. Owned grid cells are indexed from 0 to N-1 in each dimension.  

The 6 return arguments which start with “o” are the inclusive bounds of the owned $^{+}$ ghost cells it owns. If the ghost cells are on the other side of a periodic boundary, then these indices may be $<0$ or $>=\mathbf{N}$ in any dimension, so that oxlo $<=$ ixlo and ixhi $>=$ ixhi is always the case.  

# 4.23.6 More grid class set methods  

The following 2 methods can be used to override settings made by the constructors above. If used, they must be called called before the setup_comm() method is invoked, since it uses the settings that these methods override. In LAMMPS these methods are called by by the kspace_style msm command for the grids it instantiates using the 2nd constructor above.  

void set_proc_neighs(int pxlo, int pxhi, int pylo, int pyhi, int pzlo, int pzhi) void set_caller_grid(int fxlo, int fxhi, int fylo, int fyhi, int fzlo, int fzhi)  

The set_proc_neighs() method sets the processor IDs of the 6 neighboring processors for each processor. Normally these would match the processor grid neighbors which LAMMPS creates to overlay the simulation box (the default). However, MSM excludes non-participating processors from coarse grid communication when less processors are used. This method allows MSM to override the default values.  

The set_caller_grid() method species the size of the data arrays the caller allocates. Normally these would match the extent of the ghost grid cells (the default). However the MSM caller allocates a larger data array (more ghost cells) for its finest-level grid, for use in other operations besides owned/ghost cell communication. This method allows MSM to override the default values.  

# 4.23.7 Grid class get methods  

The following methods allow the caller to query the settings for a specific grid, whether it created the grid or another command created it.  

void get_size(int &nxgrid, int &nygrid, int &nzgrid); void get_bounds_owned(int &xlo, int &xhi, int &ylo, int &yhi, int &zlo, int &zhi) void get_bounds_ghost(int &xlo, int &xhi, int &ylo, int &yhi, int &zlo, int &zhi)  

The get_size() method returns the size of the global grid in each dimension.  

The get_bounds_owned() method return the inclusive index bounds of the grid cells this processor owns. The values range from 0 to N-1 in each dimension. These values are the same as the “i” values returned by setup_grid().  

The get_bounds_ghost() method return the inclusive index bounds of the owned $^{+}$ ghost grid cells this processor stores. The owned cell indices range from 0 to N-1, so these indices may be less than 0 or greater than or equal to $\mathbf{N}$ in each dimension. These values are the same as the “o” values returned by setup_grid().  

# 4.23.8 Grid class owned/ghost communication  

If needed by the command, the following methods setup and perform communication of grid data to/from neighboring processors. The forward_comm() method sends owned grid cell data to the corresponding ghost grid cells on other processors. The reverse_comm() method sends ghost grid cell data to the corresponding owned grid cells on another processor. The caller can choose to sum ghost grid cell data to the owned grid cell or simply copy it.  

void setup_comm(int &nbuf1, int &nbuf2)   
void forward_comm(int caller, void \*ptr, int which, int nper, int nbyte, void \*buf1, void \*buf2, MPI_Datatype datatype);   
void reverse_comm(int caller, void \*ptr, int which, int nper, int nbyte, void \*buf1, void \*buf2, MPI_Datatype datatype)   
int ghost_adjacent();  

The setup_comm() method must be called one time before performing forward or reverse communication (multiple times if needed). It returns two integers, which should be used to allocate two buffers. The nbuf1 and nbuf2 values are the number of grid cells whose data will be stored in two buffers by the Grid class when forward or reverse communication is performed. The caller should thus allocate them to a size large enough to hold all the data used in any single forward or reverse communication operation it performs. Note that the caller may allocate and communicate multiple data arrays for a grid it instantiates. This size includes the bytes needed for the data type of the grid data it stores, e.g. double precision values.  

The forward_comm() and reverse_comm() methods send grid cell data from owned to ghost cells, or ghost to owned cells, respectively, as described above. The caller argument should be one of these values – Grid3d::COMPUTE, Grid3d::FIX, Grid3d::KSPACE, Grid3d::PAIR – depending on the style of the caller class. The ptr argument is the “this” pointer to the caller class. These two arguments are used to call back to pack()/unpack() functions in the caller class, as explained below.  

The which argument is a flag the caller can set which is passed to the caller’s pack()/unpack() methods. This allows a single callback method to pack/unpack data for several different flavors of forward/reverse communication, e.g. operating on different grids or grid data.  

The nper argument is the number of values per grid cell to be communicated. The nbyte argument is the number of bytes per value, e.g. 8 for double-precision values. The buf1 and buf2 arguments are the two allocated buffers described above. So long as they are allocated for the maximum size communication, they can be re-used for any forward_comm()/reverse_comm() call. The datatype argument is the MPI_Datatype setting, which should match the buffer allocation and the nbyte argument. E.g. MPI_DOUBLE for buffers storing double precision values.  

To use the forward_grid() method, the caller must provide two callback functions; likewise for use of the reverse_grid() methods. These are the 4 functions, their arguments are all the same.  

void pack_forward_grid(int which, void \*vbuf, int nlist, int \*list);   
void unpack_forward_grid(int which, void \*vbuf, int nlist, int \*list);   
void pack_reverse_grid(int which, void \*vbuf, int nlist, int \*list);   
void unpack_reverse_grid(int which, void \*vbuf, int nlist, int \*list);  

The which argument is set to the which value of the forward_comm() or reverse_comm() calls. It allows the pack/unpack function to select what data values to pack/unpack. Vbuf is the buffer to pack/unpack the data to/from. It is a void pointer so that the caller can cast it to whatever data type it chooses, e.g. double precision values. Nlist is the number of grid cells to pack/unpack and list is a vector (nlist in length) of offsets to where the data for each grid cell resides in the caller’s data arrays, which is best illustrated with an example from the src/EXTRA-FIX/fix_ttm_grid.cpp class which stores the scalar electron temperature for 3d system in a 3d grid (one value per grid cell):  

void FixTTMGrid::pack_forward_grid(int /\*which\*/, void \*vbuf, int nlist, int \*list) {   
auto buf $=$ (double \*) vbuf;  

(continues on next page)  

(continued from previous page)  

double ${}^{*}\mathrm{src}=\&\mathrm{T}.$ _electron[nzlo_out][nylo_out][nxlo_out];   
for (int $\mathrm{i}=0$ ; $\mathrm{i}<$ nlist; $\mathrm{i}++$ ) buf[i] $=$ src[list[i]];  

In this case, the which argument is not used, vbuf points to a buffer of doubles, and the electron temperature is stored by the FixTTMGrid class in a 3d array of owned $^{+}$ ghost cells called T_electron. That array is allocated by the memory- $\cdot>$ create_3d_offset() method described above so that the first grid cell it stores is indexed as T_electron[nzlo_out][nylo_out][nxlo_out]. The nlist values in list are integer offsets from that first grid cell. Setting src to the address of the first cell allows those offsets to be used to access the temperatures to pack into the buffer.  

Here is a similar portion of code from the src/fix_ave_grid.cpp class which can store two kinds of data, a scalar count of atoms in a grid cell, and one or more grid-cell-averaged atom properties. The code from its unpack_reverse_grid() function for 2d grids and multiple per-atom properties per grid cell (nvalues) is shown here:  

void FixAveGrid::unpack_reverse_grid(int /\*which\*/, void \*vbuf, int nlist, int \*list)   
auto buf $=$ (double \*) vbuf;   
double \*count,\*data,\*values;   
$\mathrm{count}=\mathrm{\&count2d[nylo\_out][nxlo\_out]};$   
data = &array2d[nylo_out][nxlo_out][0]; $\mathrm{m}=0$ ; for (i = 0; i < nlist; i++) { count[list[i]] += buf[m++]; values = &data[nvalues\*list[i]]; for $\mathrm{(j=0;j<nvalues;j{++})}$ values[j] $\mathrel{\mathop{\:-}}=\mathrm{buf}[\mathrm{m}++]$ ; }  

Both the count and the multiple values per grid cell are communicated in vbuf. Note that data is now a pointer to the first value in the first grid cell. And values points to where the first value in data is for an offset of grid cells, calculated by multiplying nvalues by list[i]. Finally, because this is reverse communication, the communicated buffer values are summed to the caller values.  

The ghost_adjacent() method returns a 1 if every processor can perform the necessary owned/ghost communication with only its nearest neighbor processors (4 in 2d, 6 in 3d). It returns a 0 if any processor’s ghost cells extend further than nearest neighbor processors.  

This can be checked by callers who have the option to change the global grid size to ensure more efficient nearestneighbor-only communication if they wish. In this case, they instantiate a grid of a given size (resolution), then invoke setup_comm() followed by ghost_adjacent(). If the ghost cells are not adjacent, they destroy the grid instance and start over with a higher-resolution grid. Several of the kspace_style pppm command variants have this option.  

# 4.23.9 Grid class remap methods for load balancing  

The following methods are used when a load-balancing operation, triggered by the balance or fix balance commands, changes the partitioning of the simulation domain into processor subdomains.  

In order to work with load-balancing, any style command (compute, fix, pair, or kspace style) which allocates a grid and stores per-grid data should define a reset_grid() method; it takes no arguments. It will be called by the two balance commands after they have reset processor subdomains and migrated atoms (particles) to new owning processors. The reset_grid() method will typically perform some or all of the following operations. See the src/fix_ave_grid.cpp and src/EXTRA_FIX/fix_ttm_grid.cpp files for examples of reset_grid() methods, as well as the pack_remap_grid() and unpack_remap_grid() functions.  

First, the reset_grid() method can instantiate new grid(s) of the same global size, then call setup_grid() to partition them via the new processor subdomains. At this point, it can invoke the identical() method which compares the owned and ghost grid cell index bounds between two grids, the old grid passed as a pointer argument, and the new grid whose identical() method is being called. It returns 1 if the indices match on all processors, otherwise 0. If they all match, then the new grids can be deleted; the command can continue to use the old grids.  

If not, then the command should allocate new grid data array(s) which depend on the new partitioning. If the command does not need to persist its grid data from the old partitioning to the new one, then the command can simply delete the old data array(s) and grid instance(s). It can then return.  

If the grid data does need to persist, then the data for each grid needs to be “remapped” from the old grid partitioning to the new grid partitioning. The setup_remap() and remap() methods are used for that purpose.  

int identical(Grid3d \*old); void setup_remap(Grid3d \*old, int &nremap_buf1, int &nremap_buf2) void remap(int caller, void \*ptr, int which, int nper, int nbyte, void \*buf1, void \*buf2, MPI_Datatype datatype)  

The arguments to these methods are identical to those for the setup_comm() and forward_comm() or reverse_comm() methods. However the returned nremap_buf1 and nremap2_buf values will be different than the nbuf1 and nbuf2 values. They should be used to allocate two different remap buffers, separate from the owned/ghost communication buffers.  

To use the remap() method, the caller must provide two callback functions:  

void pack_remap_grid(int which, void \*vbuf, int nlist, int \*list);   
void unpack_remap_grid(int which, void \*vbuf, int list, int \*list);  

Their arguments are identical to those for the pack_forward_grid() and unpack_forward_grid() callback functions (or the reverse variants) discussed above. Normally, both these methods pack/unpack all the data arrays for a given grid. The which argument of the remap() method sets the which value for the pack/unpack functions. If the command instantiates multiple grids (of different sizes), it can be used within the pack/unpack methods to select which grid’s data is being remapped.  

Note that the pack_remap_grid() function must copy values from the OLD grid data arrays into the vbuf buffer. The unpack_remap_grid() function must copy values from the vbuf buffer into the NEW grid data arrays.  

After the remap operation for grid cell data has been performed, the reset_grid() method can deallocate the two remap buffers it created, and can then exit.  

# 4.23.10 Grid class I/O methods  

There are two I/O methods in the Grid classes which can be used to read and write grid cell data to files. The caller can decide on the precise format of each file, e.g. whether header lines are prepended or comment lines are allowed. Fundamentally, the file should contain one line per grid cell for the entire global grid. Each line should contain identifying info as to which grid cell it is, e.g. a unique grid cell ID or the ix,iy,iz indices of the cell within a 3d grid. The line should also contain one or more data values which are stored within the grid data arrays created by the command  

For grid cell IDs, the LAMMPS convention is that the IDs run from 1 to N, where $\mathbf{N}=\mathbf{N}\mathbf{x}\overset{*}{\cdots}\mathbf{N}\mathbf{y}$ for 2d grids and $\Nu=$ $\mathrm{Nx}\stackrel{*}{\cdots}\mathrm{Ny}\stackrel{*}{\cdots}\mathrm{Nz}$ for 3d grids. The $\mathbf{X}$ -index of the grid cell varies fastest, then y, and the z-index varies slowest. So for a $10\mathrm{x}10\mathrm{x}10$ grid the cell IDs from 901-1000 would be in the top xy layer of the z dimension.  

The read_file() method does something simple. It reads a chunk of consecutive lines from the file and passes them back to the caller to process. The caller provides a unpack_read_grid() function for this purpose. The function checks the grid cell ID or indices and only stores grid cell data for the grid cells it owns.  

The write_file() method does something slightly more complex. Each processor packs the data for its owned grid cells into a buffer. The caller provides a pack_write_grid() function for this purpose. The write_file() method then loops over all processors and each sends its buffer one at a time to processor 0, along with the 3d (or 2d) index bounds of its grid cell data within the global grid. Processor 0 calls back to the unpack_write_grid() function provided by the caller with the buffer. The function writes one line per grid cell to the file.  

See the src/EXTRA_FIX/fix_ttm_grid.cpp file for examples of now both these methods are used to read/write electron temperature values from/to a file, as well as for implementations of the the pack/unpack functions described below.  

Here are the details of the two I/O methods and the 3 callback functions. See the src/fix_ave_grid.cpp file for examples of all of them.  

void read_file(int caller, void \*ptr, FILE \*fp, int nchunk, int maxline) void write_file(int caller, void \*ptr, int which, int nper, int nbyte, MPI_Datatype datatype  

The caller argument in both methods should be one of these values – Grid3d::COMPUTE, Grid3d::FIX, Grid3d::KSPACE, Grid3d::PAIR – depending on the style of the caller class. The ptr argument in both methods is the “this” pointer to the caller class. These 2 arguments are used to call back to pack()/unpack() functions in the caller class, as explained below.  

For the read_file() method, the $f\boldsymbol{p}$ argument is a file pointer to the file to be read from, opened on processor 0 by the caller. Nchunk is the number of lines to read per chunk, and maxline is the maximum number of characters per line. The Grid class will allocate a buffer for storing chunks of lines based on these values.  

For the write_file() method, the which argument is a flag the caller can set which is passed back to the caller’s pack()/unpack() methods. If the command instantiates multiple grids (of different sizes), this flag can be used within the pack/unpack methods to select which grid’s data is being written out (presumably to different files). the nper argument is the number of values per grid cell to be written out. The nbyte argument is the number of bytes per value, e.g. 8 for double-precision values. The datatype argument is the MPI_Datatype setting, which should match the nbyte argument. E.g. MPI_DOUBLE for double precision values.  

To use the read_grid() method, the caller must provide one callback function. To use the write_grid() method, it provides two callback functions:  

<html><body><table><tr><td>int unpack read 1_grid(int nlines, char *buffer</td></tr><tr><td>void l pack _write_grid(int which, void *vbuf)</td></tr><tr><td>void</td></tr><tr><td>unpack_write_grid(int which, void 1 *vbuf, int *bounds)</td></tr></table></body></html>  

For unpack_read_grid() the nlines argument is the number of lines of character data read from the file and contained in buffer. The lines each include a newline character at the end. When the function processes the lines, it may choose to skip some of them (header or comment lines). It returns an integer count of the number of grid cell lines it processed. This enables the Grid class read_file() method to know when it has read the correct number of lines.  

For pack_write_grid() and unpack_write_grid(), the vbuf argument is the buffer to pack/unpack data to/from. It is a void pointer so that the caller can cast it to whatever data type it chooses, e.g. double precision values. the which argument is set to the which value of the write_file() method. It allows the caller to choose which grid data to operate on.  

For unpack_write_grid(), the bounds argument is a vector of 4 or 6 integer grid indices (4 for 2d, 6 for 3d). They are the xlo,xhi,ylo,yhi,zlo,zhi index bounds of the portion of the global grid which the vbuf holds owned grid cell data values for. The caller should loop over the values in vbuf with a double loop (2d) or triple loop (3d), similar to the code snippets listed above. The x-index varies fastest, then y, and the $\mathbf{Z}$ -index slowest. If there are multiple values per grid cell, the index for those values varies fastest of all. The caller can add the x,y,z indices of the grid cell (or the corresponding grid cell ID) to the data value(s) written as one line to the output file.  

# 4.23.11 Style class grid access methods  

A style command can enable its grid cell data to be accessible from other commands. For example fix ave/grid or dump grid or dump grid/vtk. Those commands access the grid cell data by using a grid reference in their input script syntax, as described on the Howto_grid doc page. They look like this:  

• c_ID:gname:dname • c_ID:gname:dname[I] • f_ID:gname:dname • f_ID:gname:dname[I]  

Each grid command instantiates has a unique gname, defined by the command. Likewise each grid cell data structure (scalar or vector) associated with a grid has a unique dname, also defined by the command.  

To provide access to its grid cell data, a style command needs to implement the following 4 methods:  

int get_grid_by_name(const std::string &name, int &dim);   
void \*get_grid_by_index(int index);   
int get_griddata_by_name(int igrid, const std::string &name, int &ncol);   
void \*get_griddata_by_index(int index);  

Currently only computes and fixes can implement these methods. If it does so, the compute of fix should also set the variable pergrid_flag to 1. See any of the compute or fix commands which set “pergrid_flag $=1^{\mathfrak{N}}$ for examples of how these 4 functions can be implemented.  

The get_grid_by_name() method takes a grid name as input and returns two values. The dim argument is returned as 2 or 3 for the dimensionality of the grid. The function return is a grid index from 0 to $\mathrm{G}\r A$ where $G$ is the number of grids the command instantiates. A value of -1 is returned if the grid name is not recognized.  

The get_grid_by_index() method is called after the get_grid_by_name() method, using the grid index it returned as its argument. This method will return a pointer to the Grid2d or Grid3d class. The caller can use this to query grid attributes, such as the global size of the grid, to ensure it is of the expected size.  

The get_griddata_by_name() method takes a grid index igrid and a data name as input. It returns two values. The ncol argument is returned as a 0 if the grid data is a single value (scalar) per grid cell, or an integer $\mathbf M>0$ if there are M values (vector) per grid cell. Note that even if $\mathbf M=1$ , it is still a 1-length vector, not a scalar. The function return is a data index from 0 to D-1 where $D$ is the number of data sets associated with that grid by the command. A value of $^-1$ is returned if the data name is not recognized.  

The get_griddata_by_index() method is called after the get_griddata_by_name() method, using the data index it returned as its argument. This method will return a pointer to the multidimensional array which stores the requested data.  

As in the discussion above of the Memory class create_offset() methods, the dimensionality of the array associated with the returned pointer depends on whether it is a 2d or 3d grid and whether there is a single or multiple values stored for each grid cell:  

• single value per cell for a $2\mathrm{d}\mathrm{grid}=2\mathrm{d}$ array pointer • multiple values per cell for a $2\mathrm{d}\mathrm{grid}=3\mathrm{d}$ array pointer • single value per cell for a 3d grid $=3\mathrm{d}$ array pointer • multiple values per cell for a $3\mathrm{d}\mathrm{grid}=4\mathrm{d}$ array pointer  

The caller will typically access the data by casting the void pointer to the corresponding array pointer and using nested loops in x,y,z between owned or ghost index bounds returned by the get_bounds_owned() or get_bounds_ghost() methods to index into the array. Example code snippets with this logic were listed above,  

# 4.23.12 Final notes  

Finally, here are some additional issues to pay attention to for writing any style command which uses distributed grids via the Grid2d or Grid3d class.  

The command destructor should delete all instances of the Grid class, any buffers it allocated for forward/reverse or remap communication, and any data arrays it allocated to store grid cell data.  

If a command is intended to work for either 2d or 3d simulations, then it should have logic to instantiate either 2d or 3d grids and their associated data arrays, depending on the dimension of the simulation box. The fix ave/grid command is an example of such a command.  

When a command maps its particles to the grid and updates grid cell values, it should check that it is not updating or accessing a grid cell value outside the range of its owned $^{+}$ ghost cells, and generate an error message if that is the case. This could happen, for example, if a particle has moved further than half the neighbor skin distance, because the neighbor list update criterion are not adequate to prevent it from happening. See the src/KSPACE/pppm.cpp file and its particle_map() method for an example of this kind of error check.  

# Part III  

# Command Reference  

# COMMANDS  

# 1.1 angle_coeff command  

# 1.1.1 Syntax  

angle_coeff N args  

• $\Nu=$ numeric angle type (see asterisk form below), or type label • args $=$ coefficients for one or more angle types  

# 1.1.2 Examples  

angle_coeff 1 300.0 107.0   
angle_coeff \* 5.0   
angle_coeff 2\*10 5.0   
labelmap angle 1 hydroxyl   
angle_coeff hydroxyl 300.0 107.0  

# 1.1.3 Description  

Specify the angle force field coefficients for one or more angle types. The number and meaning of the coefficients depends on the angle style. Angle coefficients can also be set in the data file read by the read_data command or in a restart file.  

$N$ can be specified in one of two ways. An explicit numeric value can be used, as in the first example above. Or $N$ can be a type label, which is an alphanumeric string defined by the labelmap command or in a section of a data file read by the read_data command.  

For numeric values only, a wild-card asterisk can be used to set the coefficients for multiple angle types. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $\mathbf{\tilde{\Omega}}^{6}\mathbf{\tilde{n}}^{*}{\mathbf{\tilde{\Omega}}}^{,}$ or $\overline{{\mathbf{\omega}}}_{\mathrm{m}}^{*}\mathfrak{n}^{,}$ . If $N$ is the number of angle types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

Note that using an angle_coeff command can override a previous setting for the same angle type. For example, these commands set the coeffs for all angle types, then overwrite the coeffs for just angle type 2:  

angle_coeff \* 200.0 107.0 1.2   
angle_coeff 2 50.0 107.0  

A line in a data file that specifies angle coefficients uses the exact same format as the arguments of the angle_coeff command in an input script, except that wild-card asterisks should not be used since coefficients for all $N$ types must be listed in the file. For example, under the “Angle Coeffs” section of a data file, the line that corresponds to the first example above would be listed as  

The angle_style class2 is an exception to this rule, in that an additional argument is used in the input script to allow specification of the cross-term coefficients. See its doc page for details.  

The list of all angle styles defined in LAMMPS is given on the angle_style doc page. They are also listed in more compact form on the Commands angle doc page.  

On either of those pages, click on the style to display the formula it computes and its coefficients as specified by the associated angle_coeff command.  

# 1.1.4 Restrictions  

This command must come after the simulation box is defined by a read_data, read_restart, or create_box command.   
An angle style must be defined before any angle coefficients are set, either in the input script or in a data file.  

# 1.1.5 Related commands  

angle_style  

# 1.1.6 Default  

none  

# 1.2 angle_style command  

# 1.2.1 Syntax  

angle_style style  

• style $=$ none or zero or hybrid or amoeba or charmm or class2 or class2/p6 or cosine or cosine/buck6d or cosine/delta or cosine/periodic or cosine/shift or cosine/shift/exp or cosine/squared or cosine/squared/restricted or cross or dipole or fourier or fourier/simple or gaussian or harmonic or lepton or mm3 or quartic or spica or table  

# 1.2.2 Examples  

angle_style harmonic   
angle_style charmm   
angle_style hybrid harmonic cosine  

# 1.2.3 Description  

Set the formula(s) LAMMPS uses to compute angle interactions between triplets of atoms, which remain in force for the duration of the simulation. The list of angle triplets is read in by a read_data or read_restart command from a data or restart file.  

Hybrid models where angles are computed using different angle potentials can be setup using the hybrid angle style.  

The coefficients associated with a angle style can be specified in a data or restart file or via the angle_coeff command.  

All angle potentials store their coefficient data in binary restart files which means angle_style and angle_coeff commands do not need to be re-specified in an input script that restarts a simulation. See the read_restart command for details on how to do this. The one exception is that angle_style hybrid only stores the list of sub-styles in the restart file; angle coefficients need to be re-specified.  

![](images/226b401948eef0d8183549f84af01b1ff74e335ad5828577a8cab7fffc9ca12a.jpg)  

# Note  

When both an angle and pair style is defined, the special_bonds command often needs to be used to turn off (or weight) the pairwise interaction that would otherwise exist between 3 bonded atoms.  

In the formulas listed for each angle style, theta is the angle between the three atoms in the angle.  

Here is an alphabetic list of angle styles defined in LAMMPS. Click on the style to display the formula it computes and coefficients specified by the associated angle_coeff command.  

Click on the style to display the formula it computes, any additional arguments specified in the angle_style command, and coefficients specified by the associated angle_coeff command.  

There are also additional accelerated pair styles included in the LAMMPS distribution for faster performance on CPUs, GPUs, and KNLs. The individual style names on the Commands angle page are followed by one or more of (g,i,k,o,t) to indicate which accelerated styles exist.  

• none - turn off angle interactions   
• zero - topology but no interactions   
• hybrid - define multiple styles of angle interactions   
• amoeba - AMOEBA angle   
• charmm - CHARMM angle   
• class2 - COMPASS (class 2) angle   
• class2/p6 - COMPASS (class 2) angle expanded to 6th order   
• cosine - angle with cosine term   
• cosine/buck6d - same as cosine with Buckingham term between 1-3 atoms   
• cosine/delta - angle with difference of cosines   
• cosine/periodic - DREIDING angle   
• cosine/shift - angle cosine with a shift   
• cosine/shift/exp - cosine with shift and exponential term in spring constant   
• cosine/squared - angle with cosine squared term   
cosine/squared/restricted - angle with restricted cosine squared term   
• cross - cross term coupling angle and bond lengths   
• dipole - angle that controls orientation of a point dipole   
• fourier - angle with multiple cosine terms   
• fourier/simple - angle with a single cosine term   
• gaussian - multi-centered Gaussian-based angle potential  