#!/usr/bin/env python3
"""TT-16 Output Validator - Presupposition Archaeology"""

import sys
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """Validate TT-16 output"""
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    # Check required sections
    required_sections = ['assumptions_identified', 'grounding_assessment', 'remediation']
    for section in required_sections:
        if section not in output:
            errors.append(f"Missing required section: {section}")

    # Validate assumptions
    if 'assumptions_identified' in output:
        if not isinstance(output['assumptions_identified'], list):
            errors.append("assumptions_identified must be a list")
        else:
            for idx, assumption in enumerate(output['assumptions_identified']):
                if 'assumption_id' not in assumption:
                    errors.append(f"assumptions_identified[{idx}]: Missing 'assumption_id'")
                if 'grounding_status' in assumption:
                    valid_statuses = ['Explicitly stated', 'Implied only', 'External prerequisite']
                    if assumption['grounding_status'] not in valid_statuses:
                        errors.append(f"assumptions_identified[{idx}]: Invalid grounding_status")
                if 'gap_type' not in assumption:
                    errors.append(f"assumptions_identified[{idx}]: Missing 'gap_type'")

    # Validate grounding assessment
    if 'grounding_assessment' in output:
        assessment = output['grounding_assessment']
        for field in ['explicitly_stated', 'implied_only', 'external_prerequisite']:
            if field in assessment and not isinstance(assessment[field], int):
                errors.append(f"grounding_assessment: {field} must be integer")

    # Validate remediation
    if 'remediation' in output:
        if not isinstance(output['remediation'], list):
            errors.append("remediation must be a list")
        else:
            for idx, rem in enumerate(output['remediation']):
                if 'assumption_id' not in rem:
                    errors.append(f"remediation[{idx}]: Missing 'assumption_id'")
                if 'priority' in rem:
                    valid_priorities = ['Low', 'Medium', 'High', 'Critical']
                    if rem['priority'] not in valid_priorities:
                        errors.append(f"remediation[{idx}]: Invalid priority")

    is_valid = len(errors) == 0
    return is_valid, errors

def main():
    if len(sys.argv) < 2:
        print("Usage: validate_output.py <output_file>")
        sys.exit(1)

    output_file = sys.argv[1]
    is_valid, errors = validate_output(output_file)

    if is_valid:
        print(f"✓ {output_file} is valid")
        sys.exit(0)
    else:
        print(f"✗ {output_file} has validation errors:")
        for error in errors:
            print(f"  - {error}")
        sys.exit(1)

if __name__ == '__main__':
    main()
