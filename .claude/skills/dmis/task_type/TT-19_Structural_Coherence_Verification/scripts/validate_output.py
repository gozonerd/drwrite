#!/usr/bin/env python3
"""TT-19 Output Validator - Structural Coherence Verification"""

import sys
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """Validate TT-19 output"""
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    # Check required sections
    required_sections = ['heading_hierarchy', 'logical_flow', 'narrative_arc', 'cross_references']
    for section in required_sections:
        if section not in output:
            errors.append(f"Missing required section: {section}")

    # Validate heading hierarchy
    if 'heading_hierarchy' in output:
        if not isinstance(output['heading_hierarchy'], list):
            errors.append("heading_hierarchy must be a list")

    # Validate logical flow
    if 'logical_flow' in output:
        if not isinstance(output['logical_flow'], list):
            errors.append("logical_flow must be a list")

    # Validate narrative arc
    if 'narrative_arc' in output:
        arc = output['narrative_arc']
        required_arc_fields = ['introduction_present', 'development_present', 'conclusion_present']
        for field in required_arc_fields:
            if field in arc and not isinstance(arc[field], bool):
                errors.append(f"narrative_arc: {field} must be boolean")

    # Validate orphaned elements
    if 'orphaned_elements' in output:
        if not isinstance(output['orphaned_elements'], list):
            errors.append("orphaned_elements must be a list")

    # Validate cross references
    if 'cross_references' in output:
        refs = output['cross_references']
        for field in ['total_links', 'valid_links']:
            if field in refs and not isinstance(refs[field], int):
                errors.append(f"cross_references: {field} must be integer")

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
