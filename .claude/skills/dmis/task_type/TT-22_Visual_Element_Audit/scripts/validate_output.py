#!/usr/bin/env python3
"""TT-22 Output Validator - Visual Element Audit"""

import sys
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """Validate TT-22 output"""
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    # Check required sections
    required_sections = ['visual_inventory', 'labeling_audit', 'reference_audit', 'source_verification', 'accessibility_evaluation']
    for section in required_sections:
        if section not in output:
            errors.append(f"Missing required section: {section}")

    # Validate visual inventory
    if 'visual_inventory' in output:
        inv = output['visual_inventory']
        if 'total_elements' in inv and not isinstance(inv['total_elements'], int):
            errors.append("visual_inventory.total_elements must be integer")
        if 'elements' not in inv:
            errors.append("visual_inventory: Missing 'elements' list")
        elif isinstance(inv['elements'], list):
            for idx, elem in enumerate(inv['elements']):
                if 'element_id' not in elem:
                    errors.append(f"visual_inventory.elements[{idx}]: Missing 'element_id'")
                if 'element_type' not in elem:
                    errors.append(f"visual_inventory.elements[{idx}]: Missing 'element_type'")

    # Validate labeling audit
    if 'labeling_audit' in output:
        if not isinstance(output['labeling_audit'], list):
            errors.append("labeling_audit must be a list")

    # Validate reference audit
    if 'reference_audit' in output:
        if not isinstance(output['reference_audit'], list):
            errors.append("reference_audit must be a list")

    # Validate source verification
    if 'source_verification' in output:
        if not isinstance(output['source_verification'], list):
            errors.append("source_verification must be a list")

    # Validate accessibility evaluation
    if 'accessibility_evaluation' in output:
        if not isinstance(output['accessibility_evaluation'], list):
            errors.append("accessibility_evaluation must be a list")

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
