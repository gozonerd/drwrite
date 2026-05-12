#!/usr/bin/env python3
"""TT-18 Output Validator - Ontological Consistency Verification"""

import sys
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """Validate TT-18 output"""
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    # Check required sections
    required_sections = ['terminology_inventory', 'consistency_audit', 'framework_alignment']
    for section in required_sections:
        if section not in output:
            errors.append(f"Missing required section: {section}")

    # Validate terminology inventory
    if 'terminology_inventory' in output:
        if not isinstance(output['terminology_inventory'], list):
            errors.append("terminology_inventory must be a list")
        else:
            for idx, term in enumerate(output['terminology_inventory']):
                if 'term' not in term:
                    errors.append(f"terminology_inventory[{idx}]: Missing 'term'")
                if 'definition' not in term:
                    errors.append(f"terminology_inventory[{idx}]: Missing 'definition'")
                if 'scope' not in term:
                    errors.append(f"terminology_inventory[{idx}]: Missing 'scope'")

    # Validate consistency audit
    if 'consistency_audit' in output:
        if not isinstance(output['consistency_audit'], list):
            errors.append("consistency_audit must be a list")

    # Validate framework alignment
    if 'framework_alignment' in output:
        if not isinstance(output['framework_alignment'], list):
            errors.append("framework_alignment must be a list")
        else:
            for idx, framework in enumerate(output['framework_alignment']):
                if 'consistency_score' in framework:
                    score = framework['consistency_score']
                    if not isinstance(score, (int, float)) or not (0 <= score <= 1):
                        errors.append(f"framework_alignment[{idx}]: consistency_score must be 0-1")

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
