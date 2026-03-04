#!/usr/bin/env bash
#
# Fetch LAMMPS documentation source (RST files) from GitHub
# Uses git sparse-checkout to only download doc/src
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
RAW_DIR="$PROJECT_ROOT/raw-docs"
REPO_URL="https://github.com/lammps/lammps.git"
BRANCH="develop"

echo "=== LAMMPS Documentation Fetcher ==="
echo "Target: $RAW_DIR"
echo ""

if [ -d "$RAW_DIR/.git" ]; then
  echo "Updating existing checkout..."
  cd "$RAW_DIR"
  git pull origin "$BRANCH" --depth 1
else
  echo "Sparse-checking out LAMMPS doc/src..."
  rm -rf "$RAW_DIR"
  mkdir -p "$RAW_DIR"
  cd "$RAW_DIR"
  git init
  git remote add origin "$REPO_URL"
  git config core.sparseCheckout true
  echo "doc/src/" > .git/info/sparse-checkout
  echo "Fetching (this may take a moment)..."
  git pull origin "$BRANCH" --depth 1
fi

RST_COUNT=$(find "$RAW_DIR/doc/src" -name "*.rst" -not -type l | wc -l | tr -d ' ')
echo ""
echo "Done! Fetched $RST_COUNT RST files to: $RAW_DIR/doc/src/"
echo "Next step: run 'npm run process-docs' to convert to knowledge base"
