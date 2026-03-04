/**
 * Process LAMMPS RST docs into knowledge base Markdown files
 *
 * Reads RST files from a local LAMMPS checkout (raw-docs/doc/src),
 * converts them to Markdown with proper frontmatter metadata,
 * and writes them to the knowledge/ directory.
 *
 * Usage: tsx scripts/process-docs.ts [--raw-dir <path>] [--output-dir <path>]
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { rstToMarkdown, extractRstTitle } from "./rst-converter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DEFAULT_RAW_DIR = path.join(PROJECT_ROOT, "raw-docs", "doc", "src");
const DEFAULT_OUTPUT_DIR = path.join(PROJECT_ROOT, "knowledge");

// ==================== Category Classification ====================

interface FileClassification {
  category: string;
  commands: string[];
  tags: string[];
  title: string;
}

/**
 * Classify an RST file by its filename into a category and extract metadata
 */
function classifyFile(filename: string, rstContent: string): FileClassification {
  const base = filename.replace(/\.rst$/, "");
  const rstTitle = extractRstTitle(rstContent);

  // --- pair_style ---
  if (base.startsWith("pair_") && base !== "pair_style" && base !== "pair_coeff" && base !== "pair_modify" && base !== "pair_write") {
    const styleName = base.replace("pair_", "").replace(/_/g, "/");
    return {
      category: "pair_style",
      commands: [`pair_style ${styleName}`],
      tags: extractTagsFromContent(rstContent, ["pair_style", styleName]),
      title: rstTitle || `pair_style ${styleName}`,
    };
  }
  if (base === "pair_style") {
    return { category: "pair_style", commands: ["pair_style"], tags: ["pair_style", "overview"], title: rstTitle || "Pair Style Overview" };
  }
  if (base === "pair_coeff") {
    return { category: "pair_style", commands: ["pair_coeff"], tags: ["pair_coeff", "coefficients"], title: rstTitle || "pair_coeff command" };
  }
  if (base === "pair_modify") {
    return { category: "pair_style", commands: ["pair_modify"], tags: ["pair_modify", "settings"], title: rstTitle || "pair_modify command" };
  }
  if (base === "pair_write") {
    return { category: "pair_style", commands: ["pair_write"], tags: ["pair_write", "table"], title: rstTitle || "pair_write command" };
  }

  // --- fix ---
  if (base.startsWith("fix_") && base !== "fix" && base !== "fix_modify") {
    const styleName = base.replace("fix_", "").replace(/_/g, "/");
    return {
      category: "fix",
      commands: [`fix ${styleName}`],
      tags: extractTagsFromContent(rstContent, ["fix", styleName]),
      title: rstTitle || `fix ${styleName}`,
    };
  }
  if (base === "fix") {
    return { category: "fix", commands: ["fix"], tags: ["fix", "overview"], title: rstTitle || "Fix Command Overview" };
  }
  if (base === "fix_modify") {
    return { category: "fix", commands: ["fix_modify"], tags: ["fix_modify", "settings"], title: rstTitle || "fix_modify command" };
  }

  // --- compute ---
  if (base.startsWith("compute_") && base !== "compute" && base !== "compute_modify") {
    const styleName = base.replace("compute_", "").replace(/_/g, "/");
    return {
      category: "compute",
      commands: [`compute ${styleName}`],
      tags: extractTagsFromContent(rstContent, ["compute", styleName]),
      title: rstTitle || `compute ${styleName}`,
    };
  }
  if (base === "compute") {
    return { category: "compute", commands: ["compute"], tags: ["compute", "overview"], title: rstTitle || "Compute Command Overview" };
  }
  if (base === "compute_modify") {
    return { category: "compute", commands: ["compute_modify"], tags: ["compute_modify", "settings"], title: rstTitle || "compute_modify command" };
  }

  // --- bond_style ---
  if (base.startsWith("bond_") && base !== "bond_style" && base !== "bond_coeff" && base !== "bond_write") {
    const styleName = base.replace("bond_", "").replace(/_/g, "/");
    return {
      category: "bond_style",
      commands: [`bond_style ${styleName}`],
      tags: extractTagsFromContent(rstContent, ["bond_style", styleName]),
      title: rstTitle || `bond_style ${styleName}`,
    };
  }
  if (base === "bond_style") {
    return { category: "bond_style", commands: ["bond_style"], tags: ["bond_style", "overview"], title: rstTitle || "Bond Style Overview" };
  }
  if (base === "bond_coeff") {
    return { category: "bond_style", commands: ["bond_coeff"], tags: ["bond_coeff"], title: rstTitle || "bond_coeff command" };
  }
  if (base === "bond_write") {
    return { category: "bond_style", commands: ["bond_write"], tags: ["bond_write"], title: rstTitle || "bond_write command" };
  }

  // --- angle_style ---
  if (base.startsWith("angle_") && base !== "angle_style" && base !== "angle_coeff" && base !== "angle_write") {
    const styleName = base.replace("angle_", "").replace(/_/g, "/");
    return {
      category: "angle_style",
      commands: [`angle_style ${styleName}`],
      tags: extractTagsFromContent(rstContent, ["angle_style", styleName]),
      title: rstTitle || `angle_style ${styleName}`,
    };
  }
  if (base === "angle_style") {
    return { category: "angle_style", commands: ["angle_style"], tags: ["angle_style", "overview"], title: rstTitle || "Angle Style Overview" };
  }
  if (base === "angle_coeff") {
    return { category: "angle_style", commands: ["angle_coeff"], tags: ["angle_coeff"], title: rstTitle || "angle_coeff command" };
  }
  if (base === "angle_write") {
    return { category: "angle_style", commands: ["angle_write"], tags: ["angle_write"], title: rstTitle || "angle_write command" };
  }

  // --- dihedral_style ---
  if (base.startsWith("dihedral_") && base !== "dihedral_style" && base !== "dihedral_coeff" && base !== "dihedral_write") {
    const styleName = base.replace("dihedral_", "").replace(/_/g, "/");
    return {
      category: "dihedral_style",
      commands: [`dihedral_style ${styleName}`],
      tags: extractTagsFromContent(rstContent, ["dihedral_style", styleName]),
      title: rstTitle || `dihedral_style ${styleName}`,
    };
  }
  if (base === "dihedral_style") {
    return { category: "dihedral_style", commands: ["dihedral_style"], tags: ["dihedral_style", "overview"], title: rstTitle || "Dihedral Style Overview" };
  }
  if (base === "dihedral_coeff") {
    return { category: "dihedral_style", commands: ["dihedral_coeff"], tags: ["dihedral_coeff"], title: rstTitle || "dihedral_coeff command" };
  }
  if (base === "dihedral_write") {
    return { category: "dihedral_style", commands: ["dihedral_write"], tags: ["dihedral_write"], title: rstTitle || "dihedral_write command" };
  }

  // --- improper_style ---
  if (base.startsWith("improper_") && base !== "improper_style" && base !== "improper_coeff") {
    const styleName = base.replace("improper_", "").replace(/_/g, "/");
    return {
      category: "improper_style",
      commands: [`improper_style ${styleName}`],
      tags: extractTagsFromContent(rstContent, ["improper_style", styleName]),
      title: rstTitle || `improper_style ${styleName}`,
    };
  }
  if (base === "improper_style") {
    return { category: "improper_style", commands: ["improper_style"], tags: ["improper_style", "overview"], title: rstTitle || "Improper Style Overview" };
  }
  if (base === "improper_coeff") {
    return { category: "improper_style", commands: ["improper_coeff"], tags: ["improper_coeff"], title: rstTitle || "improper_coeff command" };
  }

  // --- dump ---
  if (base.startsWith("dump") && base !== "dumps") {
    const cmdName = base === "dump" ? "dump" :
                    base === "dump_modify" ? "dump_modify" :
                    base === "dump_image" ? "dump image" :
                    `dump ${base.replace("dump_", "")}`;
    return {
      category: "dump",
      commands: [cmdName],
      tags: extractTagsFromContent(rstContent, ["dump", "output"]),
      title: rstTitle || cmdName,
    };
  }
  if (base === "dumps") {
    return { category: "dump", commands: ["dump"], tags: ["dump", "styles", "overview"], title: rstTitle || "Dump Styles Overview" };
  }

  // --- kspace ---
  if (base.startsWith("kspace_")) {
    const cmdName = base.replace("_", " ");
    return {
      category: "kspace",
      commands: [cmdName],
      tags: extractTagsFromContent(rstContent, ["kspace", "long-range", "Ewald", "PPPM"]),
      title: rstTitle || cmdName,
    };
  }

  // --- Howto guides ---
  if (base.startsWith("Howto_")) {
    const topic = base.replace("Howto_", "").replace(/_/g, " ");
    return {
      category: "howto",
      commands: [],
      tags: ["howto", topic, ...extractTagsFromContent(rstContent, [])],
      title: rstTitle || `How-To: ${topic}`,
    };
  }
  if (base === "Howto") {
    return { category: "howto", commands: [], tags: ["howto", "index"], title: rstTitle || "How-To Index" };
  }

  // --- Build ---
  if (base.startsWith("Build")) {
    const topic = base.replace("Build_", "").replace("Build", "overview").replace(/_/g, " ");
    return {
      category: "build",
      commands: [],
      tags: ["build", "installation", "cmake", topic],
      title: rstTitle || `Building LAMMPS: ${topic}`,
    };
  }

  // --- Developer ---
  if (base.startsWith("Developer") || base.startsWith("Classes") || base.startsWith("Modify")) {
    const topic = base.replace(/^(Developer|Classes|Modify)_?/, "").replace(/_/g, " ") || "overview";
    return {
      category: "developer",
      commands: [],
      tags: ["developer", "programming", topic],
      title: rstTitle || `Developer Guide: ${topic}`,
    };
  }

  // --- Python ---
  if (base.startsWith("Python")) {
    const topic = base.replace("Python_", "").replace("Python", "overview").replace(/_/g, " ");
    return {
      category: "python",
      commands: [],
      tags: ["python", "API", topic],
      title: rstTitle || `Python: ${topic}`,
    };
  }

  // --- Library API ---
  if (base.startsWith("Library")) {
    const topic = base.replace("Library_", "").replace("Library", "overview").replace(/_/g, " ");
    return {
      category: "library",
      commands: [],
      tags: ["library", "C-API", topic],
      title: rstTitle || `Library API: ${topic}`,
    };
  }
  if (base === "Fortran") {
    return { category: "library", commands: [], tags: ["fortran", "API"], title: rstTitle || "Fortran Interface" };
  }
  if (base === "Cplusplus") {
    return { category: "library", commands: [], tags: ["C++", "API"], title: rstTitle || "C++ Interface" };
  }

  // --- Install ---
  if (base.startsWith("Install")) {
    const topic = base.replace("Install_", "").replace("Install", "overview").replace(/_/g, " ");
    return {
      category: "install",
      commands: [],
      tags: ["install", topic],
      title: rstTitle || `Installation: ${topic}`,
    };
  }

  // --- Intro ---
  if (base.startsWith("Intro")) {
    const topic = base.replace("Intro_", "").replace("Intro", "overview").replace(/_/g, " ");
    return {
      category: "introduction",
      commands: [],
      tags: ["introduction", topic],
      title: rstTitle || `Introduction: ${topic}`,
    };
  }

  // --- Speed / Performance ---
  if (base.startsWith("Speed")) {
    const topic = base.replace("Speed_", "").replace("Speed", "overview").replace(/_/g, " ");
    return {
      category: "performance",
      commands: [],
      tags: ["performance", "acceleration", topic],
      title: rstTitle || `Performance: ${topic}`,
    };
  }

  // --- Run ---
  if (base.startsWith("Run")) {
    const topic = base.replace("Run_", "").replace("Run", "overview").replace(/_/g, " ");
    return {
      category: "run",
      commands: [],
      tags: ["run", "execution", topic],
      title: rstTitle || `Running LAMMPS: ${topic}`,
    };
  }

  // --- Packages ---
  if (base.startsWith("Package")) {
    return {
      category: "packages",
      commands: [],
      tags: ["packages", "optional"],
      title: rstTitle || "Optional Packages",
    };
  }

  // --- Errors ---
  if (base.startsWith("Error")) {
    const topic = base.replace("Errors_", "").replace("Errors", "overview").replace(/_/g, " ");
    return {
      category: "errors",
      commands: [],
      tags: ["errors", "debugging", topic],
      title: rstTitle || `Errors: ${topic}`,
    };
  }

  // --- Commands index pages ---
  if (base.startsWith("Commands")) {
    return {
      category: "command",
      commands: [],
      tags: ["commands", "index"],
      title: rstTitle || "Commands Reference",
    };
  }

  // --- General commands ---
  const GENERAL_COMMANDS: Record<string, string[]> = {
    atom_style: ["atom_style"],
    atom_modify: ["atom_modify"],
    balance: ["balance"],
    boundary: ["boundary"],
    change_box: ["change_box"],
    clear: ["clear"],
    comm_modify: ["comm_modify"],
    comm_style: ["comm_style"],
    create_atoms: ["create_atoms"],
    create_bonds: ["create_bonds"],
    create_box: ["create_box"],
    delete_atoms: ["delete_atoms"],
    delete_bonds: ["delete_bonds"],
    dielectric: ["dielectric"],
    dimension: ["dimension"],
    displace_atoms: ["displace_atoms"],
    dynamical_matrix: ["dynamical_matrix"],
    echo: ["echo"],
    fitpod_command: ["fitpod"],
    geturl: ["geturl"],
    group: ["group"],
    group2ndx: ["group2ndx"],
    hyper: ["hyper"],
    if: ["if"],
    include: ["include"],
    info: ["info"],
    jump: ["jump"],
    kim_commands: ["kim_init", "kim_interactions", "kim_query"],
    label: ["label"],
    labelmap: ["labelmap"],
    lattice: ["lattice"],
    log: ["log"],
    mass: ["mass"],
    mdi: ["mdi"],
    min_modify: ["min_modify"],
    min_spin: ["min/spin"],
    min_style: ["min_style"],
    minimize: ["minimize"],
    molecule: ["molecule"],
    neb: ["neb"],
    neb_spin: ["neb/spin"],
    neigh_modify: ["neigh_modify"],
    neighbor: ["neighbor"],
    newton: ["newton"],
    next: ["next"],
    package: ["package"],
    read_data: ["read_data"],
    read_dump: ["read_dump"],
    read_restart: ["read_restart"],
    region: ["region"],
    replicate: ["replicate"],
    rerun: ["rerun"],
    reset_atoms: ["reset_atoms"],
    reset_timestep: ["reset_timestep"],
    restart: ["restart"],
    run: ["run"],
    run_style: ["run_style"],
    set: ["set"],
    shell: ["shell"],
    special_bonds: ["special_bonds"],
    suffix: ["suffix"],
    thermo: ["thermo"],
    thermo_modify: ["thermo_modify"],
    thermo_style: ["thermo_style"],
    third_order: ["third_order"],
    timer: ["timer"],
    timestep: ["timestep"],
    uncompute: ["uncompute"],
    undump: ["undump"],
    unfix: ["unfix"],
    units: ["units"],
    variable: ["variable"],
    velocity: ["velocity"],
    write_coeff: ["write_coeff"],
    write_data: ["write_data"],
    write_dump: ["write_dump"],
    write_restart: ["write_restart"],
    write_molecule: ["write_molecule"],
  };

  if (GENERAL_COMMANDS[base]) {
    return {
      category: "command",
      commands: GENERAL_COMMANDS[base],
      tags: GENERAL_COMMANDS[base],
      title: rstTitle || `${GENERAL_COMMANDS[base][0]} command`,
    };
  }

  // --- Remaining files: classify as general ---
  return {
    category: "general",
    commands: [],
    tags: [base.replace(/_/g, " ")],
    title: rstTitle || base.replace(/_/g, " "),
  };
}

/**
 * Extract relevant tags from RST content
 */
function extractTagsFromContent(content: string, baseTags: string[]): string[] {
  const tags = new Set(baseTags);
  const lower = content.toLowerCase();

  // Detect package membership
  const packagePatterns: [RegExp, string][] = [
    [/kokkos/i, "KOKKOS"],
    [/openmp/i, "OPENMP"],
    [/\bgpu\b/i, "GPU"],
    [/intel\b/i, "INTEL"],
    [/manybody/i, "MANYBODY"],
    [/molecule/i, "MOLECULE"],
    [/kspace/i, "KSPACE"],
    [/rigid\b/i, "RIGID"],
    [/replica/i, "REPLICA"],
    [/granular/i, "GRANULAR"],
    [/reaxff/i, "REAXFF"],
    [/ml-snap/i, "ML-SNAP"],
    [/ml-pace/i, "ML-PACE"],
    [/ml-iap/i, "ML-IAP"],
    [/spin\b/i, "SPIN"],
  ];

  for (const [pattern, tag] of packagePatterns) {
    if (pattern.test(content)) {
      tags.add(tag);
    }
  }

  // Detect common physics topics
  const topicPatterns: [RegExp, string][] = [
    [/thermostat/i, "thermostat"],
    [/barostat/i, "barostat"],
    [/temperature/i, "temperature"],
    [/pressure/i, "pressure"],
    [/energy/i, "energy"],
    [/force/i, "force"],
    [/lennard.jones|lj\b/i, "lennard-jones"],
    [/coulomb/i, "coulomb"],
    [/ewald|pppm/i, "long-range"],
    [/eam\b/i, "EAM"],
    [/tersoff/i, "Tersoff"],
    [/rigid\s*bod/i, "rigid-body"],
    [/granular/i, "granular"],
    [/peridynamic/i, "peridynamics"],
    [/sph\b/i, "SPH"],
    [/dpd\b/i, "DPD"],
    [/machine.learn|ml\b/i, "machine-learning"],
    [/coarse.grain/i, "coarse-grain"],
  ];

  for (const [pattern, tag] of topicPatterns) {
    if (pattern.test(content.slice(0, 3000))) {
      tags.add(tag);
    }
  }

  return [...tags].slice(0, 15); // Limit tag count
}

/**
 * Files to skip (index pages, symlinks, non-essential)
 */
function shouldSkipFile(filename: string): boolean {
  const base = filename.replace(/\.rst$/, "");

  // Skip ATC symlinks (removed package)
  if (base.startsWith("atc_")) return true;

  // Skip pure index/toctree pages with no real content
  const indexPages = [
    "Manual", "Manual_version", "commands_list",
    "Bibliography", "Tools",
  ];
  if (indexPages.includes(base)) return true;

  // Skip internal/build infrastructure
  if (base === ".gitignore") return true;
  if (base === "accel_styles") return true;
  if (base === "lepton_expression") return false; // Keep this one

  return false;
}

/**
 * Generate the output filename for a knowledge base file
 */
function generateOutputFilename(rstFilename: string): string {
  const base = rstFilename.replace(/\.rst$/, "");
  // Convert CamelCase and underscores to kebab-case
  return base
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase() + ".md";
}

/**
 * Generate YAML frontmatter
 */
function generateFrontmatter(meta: FileClassification): string {
  const lines = ["---"];
  lines.push(`title: ${JSON.stringify(meta.title)}`);
  lines.push(`category: ${JSON.stringify(meta.category)}`);

  if (meta.tags.length > 0) {
    lines.push(`tags: [${meta.tags.map((t) => JSON.stringify(t)).join(", ")}]`);
  }

  if (meta.commands.length > 0) {
    lines.push(
      `commands: [${meta.commands.map((c) => JSON.stringify(c)).join(", ")}]`
    );
  }

  lines.push("---");
  return lines.join("\n");
}

// ==================== Main Processing ====================

async function processAllDocs(rawDir: string, outputDir: string) {
  console.log("=== LAMMPS Documentation Processor ===\n");
  console.log(`RST source: ${rawDir}`);
  console.log(`Output dir: ${outputDir}\n`);

  // Check raw dir exists
  try {
    await fs.access(rawDir);
  } catch {
    console.error(
      `Error: RST source directory not found: ${rawDir}\n` +
        `Run 'npm run fetch-docs' first to download LAMMPS documentation.`
    );
    process.exit(1);
  }

  // List all RST files
  const allFiles = await fs.readdir(rawDir);
  const rstFiles = allFiles
    .filter((f) => f.endsWith(".rst"))
    .filter((f) => !shouldSkipFile(f))
    .sort();

  console.log(`Found ${rstFiles.length} RST files to process\n`);

  // Clean output directory (remove old generated files, keep a marker)
  await fs.mkdir(outputDir, { recursive: true });

  // Check for symlinks and skip them
  const validRstFiles: string[] = [];
  for (const f of rstFiles) {
    const fullPath = path.join(rawDir, f);
    try {
      const stat = await fs.lstat(fullPath);
      if (stat.isSymbolicLink()) {
        continue; // Skip symlinks
      }
      validRstFiles.push(f);
    } catch {
      continue;
    }
  }

  console.log(`Processing ${validRstFiles.length} files (after filtering symlinks)...\n`);

  // Process each file
  const stats = {
    total: 0,
    byCategory: new Map<string, number>(),
    commands: new Set<string>(),
    errors: [] as string[],
  };

  for (const rstFile of validRstFiles) {
    const fullPath = path.join(rawDir, rstFile);

    try {
      const rstContent = await fs.readFile(fullPath, "utf-8");

      // Skip very small files (< 100 chars) that are likely empty/redirect
      if (rstContent.trim().length < 100) {
        continue;
      }

      // Classify
      const meta = classifyFile(rstFile, rstContent);

      // Convert RST to Markdown
      const mdContent = rstToMarkdown(rstContent);

      // Skip files that convert to very little content
      if (mdContent.trim().length < 50) {
        continue;
      }

      // Generate output
      const frontmatter = generateFrontmatter(meta);
      const outputFilename = generateOutputFilename(rstFile);
      const outputPath = path.join(outputDir, outputFilename);

      const fullOutput = `${frontmatter}\n${mdContent}`;
      await fs.writeFile(outputPath, fullOutput, "utf-8");

      stats.total++;
      stats.byCategory.set(
        meta.category,
        (stats.byCategory.get(meta.category) || 0) + 1
      );
      for (const cmd of meta.commands) {
        stats.commands.add(cmd);
      }
    } catch (err) {
      stats.errors.push(`${rstFile}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Print stats
  console.log("\n=== Processing Complete ===\n");
  console.log(`Files processed: ${stats.total}`);
  console.log(`Commands indexed: ${stats.commands.size}`);
  console.log(`\nBy category:`);
  const sortedCategories = [...stats.byCategory.entries()].sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sortedCategories) {
    console.log(`  ${cat}: ${count} files`);
  }

  if (stats.errors.length > 0) {
    console.log(`\nErrors (${stats.errors.length}):`);
    for (const err of stats.errors.slice(0, 10)) {
      console.log(`  ${err}`);
    }
    if (stats.errors.length > 10) {
      console.log(`  ... and ${stats.errors.length - 10} more`);
    }
  }

  console.log(`\nKnowledge base written to: ${outputDir}`);
  console.log(`\nNext step: run 'npm run index' to rebuild the search index`);
}

// Parse CLI args
const args = process.argv.slice(2);
let rawDir = DEFAULT_RAW_DIR;
let outputDir = DEFAULT_OUTPUT_DIR;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--raw-dir" && args[i + 1]) {
    rawDir = path.resolve(args[i + 1]);
    i++;
  } else if (args[i] === "--output-dir" && args[i + 1]) {
    outputDir = path.resolve(args[i + 1]);
    i++;
  }
}

processAllDocs(rawDir, outputDir).catch((err) => {
  console.error("Processing failed:", err);
  process.exit(1);
});
