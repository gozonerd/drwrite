#!/usr/bin/env python3
"""Validation script for TT-02 Domain Knowledge Synthesis outputs."""
import yaml
import sys
from pathlib import Path

def validate_output(yaml_file):
    try:
        with open(yaml_file, 'r') as f:
            output = yaml.safe_load(f)
    except Exception as e:
        return False, f"Failed to parse YAML: {str(e)}"
    if output is None:
        return False, "YAML file is empty"
    required = ['title', 'task_type', 'version', 'executive_summary', 'fundamentals', 'evidence_findings', 'references']
    missing = [f for f in required if f not in output]
    if missing:
        return False, f"Missing required fields: {', '.join(missing)}"
    if output.get('task_type') != 'TT-02':
        return False, f"task_type must be 'TT-02'"
    if 'v02' not in output.get('version', ''):
        return False, f"version must contain 'v02'"
    if 'accuracy_compliance' not in output:
        return False, "Must include accuracy_compliance"
    rules = ['ACC-001', 'ACC-002', 'ACC-003', 'ACC-004', 'ACC-005', 'ACC-006', 'ACC-007', 'ACC-008', 'ACC-009']
    found = [r for r in rules if any(r in str(item) for item in output.get('accuracy_compliance', []))]
    if len(found) < 9:
        return False, f"Must reference all 9 accuracy rules; found {len(found)}"
    return True, "All validations passed"

def main():
    if len(sys.argv) < 2:
        print("Usage: python validate_output.py <yaml_file>")
        sys.exit(1)
    yaml_file = sys.argv[1]
    if not Path(yaml_file).exists():
        print(f"Error: File not found: {yaml_file}")
        sys.exit(1)
    success, message = validate_output(yaml_file)
    print(f"{'✓ PASS' if success else '✗ FAIL'}: {message}")
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
