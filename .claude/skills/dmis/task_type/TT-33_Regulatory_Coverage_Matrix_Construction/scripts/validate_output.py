#!/usr/bin/env python3
"""
Validator for TT-33 Regulatory Coverage Matrix output
Checks matrix completeness, gap identification, and compliance assessment
"""

import yaml
import sys
from typing import Dict, List, Tuple

def validate_requirement(req: Dict) -> Tuple[bool, List[str]]:
    """Validate requirement entry"""
    errors = []

    required_fields = ['requirement_id', 'framework', 'jurisdiction', 'requirement_text', 'requirement_type']
    for field in required_fields:
        if field not in req:
            errors.append(f"Missing required field: {field}")

    if 'requirement_type' in req:
        valid_types = ['mandatory', 'recommended', 'best_practice']
        if req['requirement_type'] not in valid_types:
            errors.append(f"Invalid requirement_type: {req['requirement_type']}")

    return len(errors) == 0, errors

def validate_coverage_entry(entry: Dict) -> Tuple[bool, List[str]]:
    """Validate coverage matrix entry"""
    errors = []

    required_fields = ['requirement_id', 'coverage_status', 'adequacy_assessment']
    for field in required_fields:
        if field not in entry:
            errors.append(f"Missing required field: {field}")

    if 'coverage_status' in entry:
        valid_statuses = ['fully_addressed', 'partially_addressed', 'not_addressed']
        if entry['coverage_status'] not in valid_statuses:
            errors.append(f"Invalid coverage_status: {entry['coverage_status']}")

    if 'adequacy_assessment' in entry:
        valid_assessments = ['adequate', 'insufficient', 'missing']
        if entry['adequacy_assessment'] not in valid_assessments:
            errors.append(f"Invalid adequacy_assessment: {entry['adequacy_assessment']}")

    return len(errors) == 0, errors

def validate_output(output_file: str) -> bool:
    """Validate regulatory coverage matrix output"""
    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except yaml.YAMLError as e:
        print(f"YAML parse error: {e}")
        return False
    except FileNotFoundError:
        print(f"File not found: {output_file}")
        return False

    all_valid = True

    # Check requirements_inventory
    if 'requirements_inventory' not in output:
        print("ERROR: Missing 'requirements_inventory'")
        all_valid = False
    else:
        reqs = output['requirements_inventory']
        if isinstance(reqs, list):
            for i, req in enumerate(reqs):
                is_valid, errors = validate_requirement(req)
                if not is_valid:
                    all_valid = False
                    for error in errors:
                        print(f"Requirement {i}: {error}")

    # Check coverage_matrix
    if 'coverage_matrix' not in output:
        print("ERROR: Missing 'coverage_matrix'")
        all_valid = False
    else:
        matrix = output['coverage_matrix']
        if isinstance(matrix, list):
            for i, entry in enumerate(matrix):
                is_valid, errors = validate_coverage_entry(entry)
                if not is_valid:
                    all_valid = False
                    for error in errors:
                        print(f"Coverage entry {i}: {error}")

    # Check gap_analysis
    if 'gap_analysis' in output:
        gaps = output['gap_analysis']
        if 'critical_gaps' in gaps and isinstance(gaps['critical_gaps'], list):
            for gap in gaps['critical_gaps']:
                if 'severity' in gap:
                    valid_severities = ['critical', 'high']
                    if gap['severity'] not in valid_severities:
                        print(f"ERROR: Invalid gap severity: {gap['severity']}")
                        all_valid = False

    # Check coverage_summary
    if 'coverage_summary' not in output:
        print("ERROR: Missing 'coverage_summary'")
        all_valid = False
    else:
        summary = output['coverage_summary']

        # Verify coverage percentage calculation
        if all(k in summary for k in ['total_requirements', 'fully_addressed', 'partially_addressed']):
            try:
                total = int(summary['total_requirements'])
                fully = int(summary['fully_addressed'])
                partially = int(summary['partially_addressed'])
                not_addressed = int(summary.get('not_addressed', 0))

                calculated_coverage = (fully + (0.5 * partially)) / total if total > 0 else 0
                reported_coverage = float(summary.get('coverage_percentage', 0))

                if abs(calculated_coverage - reported_coverage) > 0.01:
                    print(f"WARNING: Coverage percentage mismatch. Calculated: {calculated_coverage:.2f}, Reported: {reported_coverage:.2f}")
            except (ValueError, TypeError):
                print("ERROR: Invalid numeric values in summary")
                all_valid = False

        # Check readiness_assessment consistency
        if 'readiness_assessment' in summary:
            valid_assessments = ['compliant', 'non_compliant', 'conditional']
            if summary['readiness_assessment'] not in valid_assessments:
                print(f"ERROR: Invalid readiness_assessment: {summary['readiness_assessment']}")
                all_valid = False

            # Verify consistency: critical gaps should result in non_compliant
            critical_gaps = output.get('gap_analysis', {}).get('critical_gaps', [])
            if len(critical_gaps) > 0 and summary['readiness_assessment'] == 'compliant':
                print("WARNING: Critical gaps exist but readiness_assessment is 'compliant'")

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
