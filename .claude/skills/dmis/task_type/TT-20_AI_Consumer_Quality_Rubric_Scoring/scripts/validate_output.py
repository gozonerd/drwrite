#!/usr/bin/env python3
"""TT-20 Output Validator - AI Consumer Quality Rubric Scoring"""

import sys
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """Validate TT-20 output"""
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    # Check required sections
    required_sections = ['dimension_scores', 'aggregate_quality_score', 'threshold_comparison', 'remediation_priorities']
    for section in required_sections:
        if section not in output:
            errors.append(f"Missing required section: {section}")

    # Validate dimension scores
    if 'dimension_scores' in output:
        dimensions = output['dimension_scores']
        if not isinstance(dimensions, dict):
            errors.append("dimension_scores must be a dictionary")
        else:
            for dim_name, score in dimensions.items():
                if isinstance(score, dict):
                    if 'score' in score:
                        s = score['score']
                        if not isinstance(s, (int, float)) or not (0 <= s <= 1):
                            errors.append(f"dimension_scores.{dim_name}.score must be 0-1")

    # Validate aggregate score
    if 'aggregate_quality_score' in output:
        agg = output['aggregate_quality_score']
        if not isinstance(agg, (int, float)) or not (0 <= agg <= 1):
            errors.append("aggregate_quality_score must be between 0 and 1")

    # Validate threshold comparison
    if 'threshold_comparison' in output:
        tc = output['threshold_comparison']
        for field in ['meets_minimum', 'exceeds_target']:
            if field in tc and not isinstance(tc[field], bool):
                errors.append(f"threshold_comparison: {field} must be boolean")

    # Validate remediation priorities
    if 'remediation_priorities' in output:
        if not isinstance(output['remediation_priorities'], list):
            errors.append("remediation_priorities must be a list")

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
