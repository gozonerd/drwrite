#!/usr/bin/env python3
"""TT-15 Output Validator - Contradiction Detection & Divergence Classification"""

import sys
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """Validate TT-15 output"""
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    # Check required sections
    if 'contradictions_identified' not in output:
        errors.append("Missing required section: contradictions_identified")
    if 'decision_tree_classifications' not in output:
        errors.append("Missing required section: decision_tree_classifications")
    if 'resolution_status' not in output:
        errors.append("Missing required section: resolution_status")

    # Validate contradictions
    if 'contradictions_identified' in output:
        if not isinstance(output['contradictions_identified'], list):
            errors.append("contradictions_identified must be a list")

    # Validate decision tree classifications
    if 'decision_tree_classifications' in output:
        if not isinstance(output['decision_tree_classifications'], list):
            errors.append("decision_tree_classifications must be a list")
        else:
            for idx, classification in enumerate(output['decision_tree_classifications']):
                # Check required decision tree fields
                required_q_fields = ['q1_factual_ground_truth', 'q2_downstream_dependency', 'q3_framing_interpretation']
                for field in required_q_fields:
                    if field not in classification:
                        errors.append(f"decision_tree_classifications[{idx}]: Missing '{field}'")

                if 'classification' in classification:
                    valid_classifications = ['RESOLVE-BEFORE-SYNTHESIS', 'HALT', 'DOCUMENT-ONLY']
                    if classification['classification'] not in valid_classifications:
                        errors.append(f"decision_tree_classifications[{idx}]: Invalid classification '{classification['classification']}'")

    # Validate resolution status
    if 'resolution_status' in output:
        status = output['resolution_status']
        if 'halt_required' not in status:
            errors.append("resolution_status: Missing 'halt_required'")
        if 'can_proceed_to_synthesis' not in status:
            errors.append("resolution_status: Missing 'can_proceed_to_synthesis'")

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
