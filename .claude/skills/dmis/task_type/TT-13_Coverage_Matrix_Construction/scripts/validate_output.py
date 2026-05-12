#!/usr/bin/env python3
"""TT-13 Output Validator - Coverage Matrix Construction"""

import sys
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """Validate TT-13 output"""
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    if 'coverage_matrix' not in output:
        errors.append("Missing required field: coverage_matrix")
    else:
        matrix = output['coverage_matrix']
        if 'required_elements' not in matrix:
            errors.append("coverage_matrix: Missing 'required_elements'")
        if 'threads_sources' not in matrix:
            errors.append("coverage_matrix: Missing 'threads_sources'")

    if 'coverage_aggregation' not in output:
        errors.append("Missing required field: coverage_aggregation")
    else:
        agg = output['coverage_aggregation']
        if 'element_coverage' not in agg:
            errors.append("coverage_aggregation: Missing 'element_coverage'")
        if 'overall_coverage' not in agg:
            errors.append("coverage_aggregation: Missing 'overall_coverage'")
        elif not isinstance(agg['overall_coverage'], (int, float)):
            errors.append("coverage_aggregation: overall_coverage must be numeric")
        elif not (0 <= agg['overall_coverage'] <= 1):
            errors.append("coverage_aggregation: overall_coverage must be between 0 and 1")

    if 'gap_analysis' not in output:
        errors.append("Missing required field: gap_analysis")
    else:
        gaps = output['gap_analysis']
        if 'gaps' in gaps and isinstance(gaps['gaps'], list):
            for idx, gap in enumerate(gaps['gaps']):
                if 'element' not in gap:
                    errors.append(f"gap_analysis.gaps[{idx}]: Missing 'element'")
                if 'severity' not in gap:
                    errors.append(f"gap_analysis.gaps[{idx}]: Missing 'severity'")
                elif gap['severity'] not in ['Low', 'Medium', 'High']:
                    errors.append(f"gap_analysis.gaps[{idx}]: Invalid severity '{gap['severity']}'")

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
