#!/usr/bin/env python3
"""TT-17 Output Validator - Specification Actionability Assessment"""

import sys
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """Validate TT-17 output"""
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    # Check required sections
    required_sections = ['specifications_evaluated', 'gap_analysis', 'use_case_validation', 'remediation']
    for section in required_sections:
        if section not in output:
            errors.append(f"Missing required section: {section}")

    # Validate specifications
    if 'specifications_evaluated' in output:
        if not isinstance(output['specifications_evaluated'], list):
            errors.append("specifications_evaluated must be a list")
        else:
            for idx, spec in enumerate(output['specifications_evaluated']):
                if 'specification_id' not in spec:
                    errors.append(f"specifications_evaluated[{idx}]: Missing 'specification_id'")
                if 'actionability_score' in spec:
                    valid_scores = ['Fully Specified', 'Partially Specified', 'Underspecified']
                    if spec['actionability_score'] not in valid_scores:
                        errors.append(f"specifications_evaluated[{idx}]: Invalid actionability_score")

    # Validate gap analysis
    if 'gap_analysis' in output:
        if not isinstance(output['gap_analysis'], list):
            errors.append("gap_analysis must be a list")

    # Validate use case validation
    if 'use_case_validation' in output:
        if not isinstance(output['use_case_validation'], list):
            errors.append("use_case_validation must be a list")

    # Validate remediation
    if 'remediation' in output:
        if not isinstance(output['remediation'], list):
            errors.append("remediation must be a list")
        else:
            for idx, rem in enumerate(output['remediation']):
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
