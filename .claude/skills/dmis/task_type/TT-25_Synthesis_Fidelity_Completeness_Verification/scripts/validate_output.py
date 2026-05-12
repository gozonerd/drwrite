#!/usr/bin/env python3
"""
Validator for TT-25 Synthesis Fidelity Verification output
Checks completeness, fidelity scores, and novel content detection
"""

import yaml
import sys
from typing import Dict, List, Tuple

def validate_component(component: Dict) -> Tuple[bool, List[str]]:
    """Validate component audit entry"""
    errors = []

    required_fields = ['component_id', 'source_section', 'winning_thread_id', 'status', 'fidelity_score']
    for field in required_fields:
        if field not in component:
            errors.append(f"Missing required field: {field}")

    if 'status' in component:
        valid_statuses = ['present_intact', 'present_modified', 'missing', 'distorted']
        if component['status'] not in valid_statuses:
            errors.append(f"Invalid status: {component['status']}")

    if 'fidelity_score' in component:
        try:
            score = float(component['fidelity_score'])
            if not (0.0 <= score <= 1.0):
                errors.append(f"Fidelity score out of range: {score}")
        except (ValueError, TypeError):
            errors.append(f"Invalid fidelity score: {component['fidelity_score']}")

    return len(errors) == 0, errors

def validate_output(output_file: str) -> bool:
    """Validate fidelity verification output"""
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

    # Check component_audit
    if 'component_audit' not in output:
        print("ERROR: Missing 'component_audit'")
        all_valid = False
    else:
        audit = output['component_audit']
        if isinstance(audit, list):
            for i, component in enumerate(audit):
                is_valid, errors = validate_component(component)
                if not is_valid:
                    all_valid = False
                    for error in errors:
                        print(f"Component {i}: {error}")

    # Check completeness_check
    if 'completeness_check' not in output:
        print("WARNING: Missing 'completeness_check'")
    else:
        check = output['completeness_check']
        if 'completeness_score' in check:
            try:
                score = float(check['completeness_score'])
                if score < 1.0:
                    print(f"WARNING: Completeness score < 1.0 ({score}); components may be missing")
            except (ValueError, TypeError):
                print(f"ERROR: Invalid completeness_score: {check['completeness_score']}")
                all_valid = False

    # Check novel_content_detection
    if 'novel_content_detection' in output:
        novel = output['novel_content_detection']
        if 'total_novel_count' in novel and novel['total_novel_count'] > 0:
            print(f"WARNING: Novel content detected ({novel['total_novel_count']} sections)")

    # Check fidelity_summary
    if 'fidelity_summary' not in output:
        print("ERROR: Missing 'fidelity_summary'")
        all_valid = False
    else:
        summary = output['fidelity_summary']
        if 'overall_fidelity_score' in summary:
            try:
                score = float(summary['overall_fidelity_score'])
                if score < 0.95:
                    print(f"WARNING: Fidelity score below threshold (0.95): {score}")
            except (ValueError, TypeError):
                print(f"ERROR: Invalid overall_fidelity_score: {summary['overall_fidelity_score']}")
                all_valid = False

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
