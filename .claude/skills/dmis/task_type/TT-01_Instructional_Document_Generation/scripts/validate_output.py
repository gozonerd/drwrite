#!/usr/bin/env python3
"""
Validation script for TT-01 Instructional Document Generation outputs.
Checks required fields, structure, and basic content requirements.
"""

import yaml
import sys
from pathlib import Path


def validate_tt01_output(yaml_file):
    """Validate TT-01 output against schema requirements."""

    try:
        with open(yaml_file, 'r') as f:
            output = yaml.safe_load(f)
    except Exception as e:
        return False, f"Failed to parse YAML: {str(e)}"

    if output is None:
        return False, "YAML file is empty"

    # Check required fields
    required_fields = ['title', 'task_type', 'version', 'overview', 'prerequisites', 'procedures']
    missing_fields = [field for field in required_fields if field not in output]

    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"

    # Validate task_type
    if output.get('task_type') != 'TT-01':
        return False, f"task_type must be 'TT-01', got '{output.get('task_type')}'"

    # Validate version
    if not isinstance(output.get('version'), str) or 'v02' not in output.get('version', ''):
        return False, f"version must contain 'v02', got '{output.get('version')}'"

    # Validate procedures structure
    procedures = output.get('procedures', [])
    if not isinstance(procedures, list) or len(procedures) == 0:
        return False, "procedures must be non-empty list"

    # Check procedure structure
    for idx, proc in enumerate(procedures):
        if not isinstance(proc, dict):
            return False, f"Procedure {idx} is not a dictionary"
        if 'step_number' not in proc or 'action' not in proc:
            return False, f"Procedure {idx} missing step_number or action"

    # Check for quality checkpoints
    if 'quality_checkpoints' not in output or len(output.get('quality_checkpoints', [])) == 0:
        return False, "Must include quality_checkpoints"

    # Check accuracy compliance statement
    if 'accuracy_compliance' not in output:
        return False, "Must include accuracy_compliance statement"

    compliance = output.get('accuracy_compliance', [])
    required_rules = ['ACC-001', 'ACC-002', 'ACC-003', 'ACC-004', 'ACC-005',
                      'ACC-006', 'ACC-007', 'ACC-008', 'ACC-009']
    referenced_rules = [rule for rule in required_rules if any(rule in str(item) for item in compliance)]

    if len(referenced_rules) < 9:
        return False, f"Must reference all 9 accuracy rules (ACC-001 through ACC-009); found {len(referenced_rules)}"

    return True, "All validations passed"


def main():
    if len(sys.argv) < 2:
        print("Usage: python validate_output.py <yaml_file>")
        sys.exit(1)

    yaml_file = sys.argv[1]

    if not Path(yaml_file).exists():
        print(f"Error: File not found: {yaml_file}")
        sys.exit(1)

    success, message = validate_tt01_output(yaml_file)

    if success:
        print(f"✓ PASS: {message}")
        sys.exit(0)
    else:
        print(f"✗ FAIL: {message}")
        sys.exit(1)


if __name__ == '__main__':
    main()
