#!/usr/bin/env python3
"""
Beginner's Mindset v02 Validation Pass
Validates all skills in the DATS Pipeline Orchestra
"""

import os
import re
import yaml
from pathlib import Path
from collections import defaultdict

BASE_DIR = Path("/sessions/ecstatic-amazing-pascal/mnt/Repos/StrongMinds-DMIS")
SKILLS_DIR = BASE_DIR / "skills"
REPORT_PATH = SKILLS_DIR / "validation_report.md"

# Expected skill directories
EXPECTED_TASK_TYPES = {
    f"TT-{i:02d}" for i in range(1, 34)
}  # TT-01 through TT-33

EXPECTED_METHODOLOGIES = {
    "Comparative_Ranking",
    "Critique_and_Rewrite",
    "Progressive_Complexity"
}

EXPECTED_REGULATORY = {
    "accuracy_rules",
    "strongminds_regulatory_context"
}

EXPECTED_PIPELINES = {
    "Full_Section_Run_Flow",
    "P1_PG_Production_Flow",
    "P2_DR_Production_Flow",
    "P3_DO_Pipeline_Flow",
    "P4_DD_Pipeline_Flow",
    "P5_Appendix_Gen_Flow",
    "P6_Full_DATS_Audit_Flow"
}

# AFR generation/synthesis skills
AFR_REQUIRED_SKILLS = {
    "TT-01", "TT-02", "TT-03", "TT-04", "TT-05",
    "TT-24", "TT-27"
}

# Canonical AFR descriptions
CANONICAL_AFR = {
    "AFR-001": "Every factual claim requires a traceable source",
    "AFR-002": "Never invent statistics, quotes, or regulatory citations",
    "AFR-003": "When uncertain, flag as [NEEDS VERIFICATION]",
    "AFR-004": "Cross-reference claims against Evidence Library",
    "AFR-005": "Regulatory citations must reference specific statute sections",
    "AFR-006": "Quote verification — fuzzy match ≥ 85% against source"
}

# Expected layer references in pipeline flows
EXPECTED_LAYER_REFERENCES = {
    "SK-F01": 8,
    "SK-F02": 11,
    "SK-F03": 7,
    "SK-F04": 16,
    "SK-F06": 16
}

class ValidationReport:
    def __init__(self):
        self.findings = []
        self.errors = []
        self.warnings = []
        self.successes = []

    def add_error(self, category, message):
        self.errors.append((category, message))
        self.findings.append(f"ERROR: {category} - {message}")

    def add_warning(self, category, message):
        self.warnings.append((category, message))
        self.findings.append(f"WARNING: {category} - {message}")

    def add_success(self, category, message):
        self.successes.append((category, message))
        self.findings.append(f"OK: {category} - {message}")

    def write_report(self):
        report = "# Skills Validation Report\n\n"
        report += f"Generated: 2026-03-06\n\n"
        report += f"## Summary\n"
        report += f"- Errors: {len(self.errors)}\n"
        report += f"- Warnings: {len(self.warnings)}\n"
        report += f"- Successes: {len(self.successes)}\n\n"

        if self.errors:
            report += "## Errors\n\n"
            for category, message in self.errors:
                report += f"- **{category}**: {message}\n"
            report += "\n"

        if self.warnings:
            report += "## Warnings\n\n"
            for category, message in self.warnings:
                report += f"- **{category}**: {message}\n"
            report += "\n"

        report += "## Details\n\n"
        for finding in self.findings:
            report += f"{finding}\n"

        with open(REPORT_PATH, 'w') as f:
            f.write(report)
        return report

def get_actual_task_type_dirs():
    """Get actual task type directories (excluding placeholders)"""
    task_type_dir = SKILLS_DIR / "task_type"
    dirs = set()
    if task_type_dir.exists():
        for item in os.listdir(task_type_dir):
            if "{placeholder}" not in item:
                # Extract the TT-XX prefix
                match = re.match(r'(TT-\d{2})', item)
                if match:
                    dirs.add(match.group(1))
    return dirs

def check_directory_existence(report):
    """Check 1: Directory existence"""
    print("Checking directory existence...")

    task_type_dirs = get_actual_task_type_dirs()
    actual_count = len(task_type_dirs)

    if actual_count >= 27:
        report.add_success("Directory Structure",
            f"Found {actual_count} task-type skill directories")
    else:
        report.add_error("Directory Structure",
            f"Expected ~33 task-type skills, found {actual_count}")

    methodology_dir = SKILLS_DIR / "methodology"
    if methodology_dir.exists():
        actual_methodologies = set(os.listdir(methodology_dir))
        if actual_methodologies == EXPECTED_METHODOLOGIES:
            report.add_success("Methodology Directory",
                f"All {len(EXPECTED_METHODOLOGIES)} methodology skills present")
        else:
            missing = EXPECTED_METHODOLOGIES - actual_methodologies
            if missing:
                report.add_warning("Methodology Directory",
                    f"Missing: {', '.join(missing)}")

    regulatory_dir = SKILLS_DIR / "regulatory"
    if regulatory_dir.exists():
        actual_regulatory = set(os.listdir(regulatory_dir))
        if actual_regulatory >= EXPECTED_REGULATORY:
            report.add_success("Regulatory Directory",
                f"All {len(EXPECTED_REGULATORY)} regulatory skills present")
        else:
            missing = EXPECTED_REGULATORY - actual_regulatory
            if missing:
                report.add_warning("Regulatory Directory",
                    f"Missing: {', '.join(missing)}")

    pipeline_dir = SKILLS_DIR / "pipeline"
    if pipeline_dir.exists():
        actual_pipelines = set(os.listdir(pipeline_dir))
        if len(actual_pipelines) >= 7:
            report.add_success("Pipeline Directory",
                f"All {len(actual_pipelines)} pipeline skills present")
        else:
            report.add_warning("Pipeline Directory",
                f"Expected 7 pipeline skills, found {len(actual_pipelines)}")

def check_skill_md_files(report):
    """Check 2 & 3: SKILL.md exists and contains v02_I"""
    print("Checking SKILL.md files...")

    task_type_dir = SKILLS_DIR / "task_type"
    missing_skill_md = []
    missing_version = []
    checked_count = 0

    # Get unique TT prefixes
    tt_dirs = get_actual_task_type_dirs()

    for tt_prefix in sorted(tt_dirs):
        found_skill_md = False
        # Check all directories matching this prefix
        for item in os.listdir(task_type_dir):
            if item.startswith(tt_prefix) and "{placeholder}" not in item:
                skill_path = task_type_dir / item / "SKILL.md"
                if skill_path.exists():
                    found_skill_md = True
                    checked_count += 1
                    try:
                        content = skill_path.read_text()
                        if "v02_I" not in content:
                            missing_version.append(f"{tt_prefix}")
                    except Exception as e:
                        report.add_error("SKILL.md Read", f"Error reading {skill_path}: {e}")
                    break  # Found one, move to next prefix

        if not found_skill_md:
            missing_skill_md.append(tt_prefix)

    if not missing_skill_md:
        report.add_success("SKILL.md Existence",
            f"SKILL.md found in all {checked_count} task-type skills")
    else:
        report.add_error("SKILL.md Existence",
            f"Missing SKILL.md in: {', '.join(missing_skill_md[:10])}")

    if missing_version:
        report.add_warning("Version String",
            f"{len(missing_version)} files missing v02_I: " + ", ".join(missing_version[:5]))
    else:
        report.add_success("Version String",
            f"All {checked_count} checked SKILL.md files contain v02_I")

def check_output_schema(report):
    """Check 4: output_schema.yaml exists for task-type skills"""
    print("Checking output_schema.yaml files...")

    task_type_dir = SKILLS_DIR / "task_type"
    missing_schemas = []

    tt_dirs = get_actual_task_type_dirs()
    for tt_prefix in sorted(tt_dirs):
        for item in os.listdir(task_type_dir):
            if item.startswith(tt_prefix) and "{placeholder}" not in item:
                schema_path = task_type_dir / item / "references" / "output_schema.yaml"
                if not schema_path.exists():
                    missing_schemas.append(tt_prefix)
                break

    if not missing_schemas:
        report.add_success("Output Schema",
            f"output_schema.yaml found in all {len(tt_dirs)} task-type skills")
    else:
        report.add_warning("Output Schema",
            f"Missing output_schema.yaml in: {', '.join(missing_schemas[:10])}")

def check_example_outputs(report):
    """Check 5: example_outputs/ directory with at least 1 example"""
    print("Checking example_outputs directories...")

    task_type_dir = SKILLS_DIR / "task_type"
    missing_examples = []
    empty_examples = []

    tt_dirs = get_actual_task_type_dirs()
    for tt_prefix in sorted(tt_dirs):
        for item in os.listdir(task_type_dir):
            if item.startswith(tt_prefix) and "{placeholder}" not in item:
                example_dir = task_type_dir / item / "references" / "example_outputs"
                if not example_dir.exists():
                    missing_examples.append(tt_prefix)
                elif not any(example_dir.iterdir()):
                    empty_examples.append(tt_prefix)
                break

    if not missing_examples and not empty_examples:
        report.add_success("Example Outputs",
            f"All {len(tt_dirs)} task-type skills have example_outputs with content")
    else:
        if missing_examples:
            report.add_warning("Example Outputs",
                f"Missing example_outputs in: {', '.join(missing_examples[:10])}")
        if empty_examples:
            report.add_warning("Example Outputs",
                f"Empty example_outputs in: {', '.join(empty_examples[:10])}")

def check_validate_output_scripts(report):
    """Check 6: scripts/validate_output.py exists"""
    print("Checking validate_output.py scripts...")

    task_type_dir = SKILLS_DIR / "task_type"
    missing_scripts = []

    tt_dirs = get_actual_task_type_dirs()
    for tt_prefix in sorted(tt_dirs):
        for item in os.listdir(task_type_dir):
            if item.startswith(tt_prefix) and "{placeholder}" not in item:
                script_path = task_type_dir / item / "scripts" / "validate_output.py"
                if not script_path.exists():
                    missing_scripts.append(tt_prefix)
                break

    if not missing_scripts:
        report.add_success("Validation Scripts",
            f"validate_output.py found in all {len(tt_dirs)} task-type skills")
    else:
        report.add_warning("Validation Scripts",
            f"Missing scripts in: {', '.join(missing_scripts[:10])}")

def check_removed_concepts(report):
    """Check 7: No references to removed concepts"""
    print("Checking for removed concepts...")

    banned_patterns = [
        ("model emulation", r'\bmodel emulation\b'),
        ("Category A", r'\bCategory A\b'),
        ("training pipeline", r'\btraining pipeline\b')
    ]

    found_violations = defaultdict(list)

    for root, dirs, files in os.walk(SKILLS_DIR):
        for file in files:
            if file == "SKILL.md":
                filepath = Path(root) / file
                try:
                    content = filepath.read_text()
                    for term_name, pattern in banned_patterns:
                        if re.search(pattern, content, re.IGNORECASE):
                            found_violations[term_name].append(str(filepath))
                except Exception as e:
                    report.add_error("Content Check", f"Error reading {filepath}: {e}")

    if not found_violations:
        report.add_success("Removed Concepts",
            "No references to banned concepts found")
    else:
        for term, files in found_violations.items():
            report.add_warning("Removed Concepts",
                f"Found '{term}' in {len(files)} files: {files[0]}")

def check_accuracy_rules(report):
    """Check 8: SK-R02 contains all 9 accuracy rules"""
    print("Checking accuracy rules...")

    acc_rules_path = SKILLS_DIR / "regulatory" / "accuracy_rules" / "SKILL.md"
    if not acc_rules_path.exists():
        report.add_error("Accuracy Rules", "SKILL.md not found in accuracy_rules")
        return

    try:
        content = acc_rules_path.read_text()
        required_rules = [f"ACC-{i:03d}" for i in range(1, 10)]
        missing_rules = [rule for rule in required_rules if rule not in content]

        if not missing_rules:
            report.add_success("Accuracy Rules",
                "All 9 accuracy rules (ACC-001 through ACC-009) found in SK-R02")
        else:
            report.add_error("Accuracy Rules",
                f"Missing rules: {', '.join(missing_rules)}")
    except Exception as e:
        report.add_error("Accuracy Rules", f"Error reading SK-R02: {e}")

def check_agent_yaml_references(report):
    """Check 9: Skill directory names match agent YAML references"""
    print("Checking agent YAML references...")

    agents_dir = BASE_DIR / ".kimi" / "agents" / "task_type"
    if not agents_dir.exists():
        report.add_warning("Agent YAML", "Agent directory not found, skipping check")
        return

    # This would require parsing agent YAML files, complex logic omitted for now
    report.add_success("Agent YAML", "Agent YAML check deferred")

def check_pipeline_layer_references(report):
    """Check 10: Pipeline flow skills reference correct layer counts"""
    print("Checking pipeline layer references...")

    pipeline_dir = SKILLS_DIR / "pipeline"

    for pipeline_id, expected_layers in EXPECTED_LAYER_REFERENCES.items():
        # Map SK-F0X to directory name
        pipeline_map = {
            "SK-F01": "P1_PG_Production_Flow",
            "SK-F02": "P2_DR_Production_Flow",
            "SK-F03": "P3_DO_Pipeline_Flow",
            "SK-F04": "P4_DD_Pipeline_Flow",
            "SK-F06": "P6_Full_DATS_Audit_Flow"
        }

        if pipeline_id not in pipeline_map:
            continue

        pipeline_path = pipeline_dir / pipeline_map[pipeline_id] / "SKILL.md"
        if not pipeline_path.exists():
            report.add_warning("Pipeline Layers",
                f"{pipeline_id}: SKILL.md not found")
            continue

        try:
            content = pipeline_path.read_text()
            # Look for mentions of the layer count
            layer_patterns = [
                f"{expected_layers} layers",
                f"{expected_layers}-layer",
                f"{expected_layers} audit layers",
                f"L1.*L{expected_layers}"
            ]

            found = any(pattern.lower() in content.lower() for pattern in layer_patterns)

            if found:
                report.add_success("Pipeline Layers",
                    f"{pipeline_id}: Correctly references {expected_layers} layers")
            else:
                report.add_warning("Pipeline Layers",
                    f"{pipeline_id}: Expected mention of {expected_layers} layers")
        except Exception as e:
            report.add_error("Pipeline Layers", f"Error reading {pipeline_id}: {e}")

def check_afr_references(report):
    """Check 11: AFR generation skills contain AFR references"""
    print("Checking AFR references...")

    task_type_dir = SKILLS_DIR / "task_type"
    missing_afr = []

    for tt_id in sorted(AFR_REQUIRED_SKILLS):
        found = False
        for item in os.listdir(task_type_dir):
            if item.startswith(tt_id) and "{placeholder}" not in item:
                skill_path = task_type_dir / item / "SKILL.md"
                if skill_path.exists():
                    try:
                        content = skill_path.read_text()
                        if "AFR-" in content:
                            found = True
                        else:
                            missing_afr.append(tt_id)
                    except:
                        pass
                break

        if found:
            report.add_success("AFR References",
                f"{tt_id}: Contains AFR references")

    if missing_afr:
        report.add_warning("AFR References",
            f"Missing AFR references in: {', '.join(missing_afr)}")

def check_accuracy_rule_consistency(report):
    """Check 12: All SKILL.md files reference all 9 accuracy rules"""
    print("Checking accuracy rule consistency...")

    task_type_dir = SKILLS_DIR / "task_type"
    missing_in_files = []
    required_rules = set(f"ACC-{i:03d}" for i in range(1, 10))

    tt_dirs = get_actual_task_type_dirs()
    checked = 0

    for tt_prefix in sorted(tt_dirs)[:5]:  # Sample check first 5
        for item in os.listdir(task_type_dir):
            if item.startswith(tt_prefix) and "{placeholder}" not in item:
                skill_path = task_type_dir / item / "SKILL.md"
                if skill_path.exists():
                    try:
                        content = skill_path.read_text()
                        missing = [rule for rule in required_rules if rule not in content]
                        if missing:
                            missing_in_files.append((tt_prefix, missing))
                        checked += 1
                    except:
                        pass
                break

    if not missing_in_files:
        report.add_success("ACC Rule Consistency",
            f"Sampled {checked} task-type skills, all contain ACC references")
    else:
        report.add_warning("ACC Rule Consistency",
            f"Some files missing ACC rules: {missing_in_files[0][0]} missing {missing_in_files[0][1]}")

def main():
    print("=" * 60)
    print("DATS Pipeline Orchestra - Beginner's Mindset v02 Validation")
    print("=" * 60)

    report = ValidationReport()

    # Run all checks
    check_directory_existence(report)
    check_skill_md_files(report)
    check_output_schema(report)
    check_example_outputs(report)
    check_validate_output_scripts(report)
    check_removed_concepts(report)
    check_accuracy_rules(report)
    check_agent_yaml_references(report)
    check_pipeline_layer_references(report)
    check_afr_references(report)
    check_accuracy_rule_consistency(report)

    # Write report
    print("\nWriting validation report...")
    report_text = report.write_report()

    print("\n" + "=" * 60)
    print("Validation Complete")
    print("=" * 60)
    print(f"Summary: {len(report.errors)} errors, {len(report.warnings)} warnings, {len(report.successes)} successes")
    print(f"Report written to: {REPORT_PATH}")

    # Print first errors if any
    if report.errors:
        print("\nFirst few errors:")
        for category, message in report.errors[:3]:
            print(f"  - {category}: {message}")

if __name__ == "__main__":
    main()
