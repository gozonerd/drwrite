#!/usr/bin/env python3
"""TT-21 Output Validator - Writing Quality & Polish Assessment"""

import sys
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """Validate TT-21 output"""
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    # Check required sections
    required_sections = ['grammar_mechanics', 'spelling_punctuation', 'style_guide_compliance', 'tone_consistency', 'clarity_concision', 'professional_polish']
    for section in required_sections:
        if section not in output:
            errors.append(f"Missing required section: {section}")

    # Validate grammar mechanics
    if 'grammar_mechanics' in output:
        gm = output['grammar_mechanics']
        if 'errors_found' in gm and not isinstance(gm['errors_found'], int):
            errors.append("grammar_mechanics.errors_found must be integer")

    # Validate style guide compliance
    if 'style_guide_compliance' in output:
        sgc = output['style_guide_compliance']
        if 'compliance_score' in sgc:
            score = sgc['compliance_score']
            if not isinstance(score, (int, float)) or not (0 <= score <= 1):
                errors.append("style_guide_compliance.compliance_score must be 0-1")

    # Validate tone consistency
    if 'tone_consistency' in output:
        tc = output['tone_consistency']
        if 'consistency_score' in tc:
            score = tc['consistency_score']
            if not isinstance(score, (int, float)) or not (0 <= score <= 1):
                errors.append("tone_consistency.consistency_score must be 0-1")

    # Validate professional polish
    if 'professional_polish' in output:
        pp = output['professional_polish']
        if 'score' in pp:
            score = pp['score']
            if not isinstance(score, (int, float)) or not (0 <= score <= 1):
                errors.append("professional_polish.score must be 0-1")

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
