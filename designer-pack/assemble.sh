#!/usr/bin/env bash
# Assemble the designer pack: copy the current versions of the designer's
# documents into designer-pack/documents/, ready to hand over or sync to Drive.
#
# The output folder is gitignored on purpose, so there is never a stale second
# copy of a document committed alongside the original. Re-run this whenever a
# source document changes; the pack is a snapshot, not a live link.
#
# Usage, from the repository root:  bash designer-pack/assemble.sh
set -e

root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/designer-pack/documents"
mkdir -p "$out"

copy() {
  src="$root/$1"
  dest="$out/$2"
  if [ -f "$src" ]; then
    cp "$src" "$dest"
    echo "  added $2"
  else
    echo "  MISSING: $1 (skipped)" >&2
  fi
}

echo "Assembling designer pack into designer-pack/documents/"
copy "docs/03_designer_workflow.md"                                  "01_designer_workflow.md"
copy "docs/25_end_to_end_lifecycle.md"                               "02_lifecycle.md"
copy "docs/22_design_system_reuse_model.md"                          "03_design_system_reuse_model.md"
copy "docs/pilot-artefacts/03_figma_component_and_naming_standard.md" "04_figma_naming_standard.md"
copy "docs/pilot-artefacts/02_design_system_checklist.md"            "05_design_system_checklist.md"
copy "docs/pilot-artefacts/04_design_to_development_handover_contract.md" "06_handover_contract.md"
copy ".claude/skills/web-design/SKILL.md"                            "07_web_design_principles.md"
copy ".claude/skills/anti-ai-design-checklist/SKILL.md"              "08_anti_ai_design_checklist.md"
cp "$root/designer-pack/README.md" "$out/00_START_HERE.md"
echo "  added 00_START_HERE.md"

echo ""
echo "Done. Hand designer-pack/documents/ to the designer, or sync it to her shared Drive."
echo "Re-run this whenever a source document changes."
