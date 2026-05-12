#!/usr/bin/env python3
"""
Validator for TT-24 Multi-Thread Synthesis output
Checks provenance completeness, AFR compliance, and divergence classification
"""

import yaml
import sys
from typing import Dict, List, Tuple

def validate_section(section: Dict) -> Tuple[bool, List[str]]:
    """Validate synthesized section structure"""
    errors = []

    required_fields = ['section_id', 'title', 'content', 'source_thread_id', 'audit_decision_applied']
    for field in required_fields:
        if field not in section:
            errors.append(f"Missing required field: {field}")

    if 'content' in section and not section['content'].strip():
        errors.append("Content field cannot be empty")

    if 'source_thread_id' in section and not section['source_thread_id']:
        errors.append("Source thread ID cannot be empty (provenance loss)")

    return len(errors) == 0, errors

def validate_divergence_entry(entry: Dict) -> Tuple[bool, List[str]]:
    """Validate divergence log entry"""
    errors = []

    required_fields = ['divergence_id', 'description', 'q1_factual_ground_truth',
                       'q2_downstream_dependency', 'q3_framing_only', 'decision', 'resolution_status']
    for field in required_fields:
        if field not in entry:
            errors.append(f"Missing required field: {field}")

    if 'decision' in entry:
        valid_decisions = ['RESOLVE_BEFORE_SYNTHESIS', 'HALT', 'DOCUMENT_ONLY']
        if entry['decision'] not in valid_decisions:
            errors.append(f"Invalid decision: {entry['decision']}")

    return len(errors) == 0, errors

def validate_output(output_file: str) -> bool:
    """Validate complete synthesis output"""
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

    # Check synthesized_content
    if 'synthesized_content' not in output:
        print("ERROR: Missing 'synthesized_content'")
        all_valid = False
    else:
        content = output['synthesized_content']
        if 'sections' in content:
            if not isinstance(content['sections'], list):
                print("ERROR: 'sections' must be a list")
                all_valid = False
            else:
                for i, section in enumerate(content['sections']):
                    is_valid, errors = validate_section(section)
                    if not is_valid:
                        all_valid = False
                        for error in errors:
                            print(f"Section {i}: {error}")

    # Check provenance_chain
    if 'provenance_chain' not in output:
        print("WARNING: Missing 'provenance_chain' - provenance incomplete")
        all_valid = False
    else:
        chain = output['provenance_chain']
        if not isinstance(chain, list):
            print("ERROR: 'provenance_chain' must be a list")
            all_valid = False

    # Check divergence_log
    if 'divergence_log' in output:
        div_log = output['divergence_log']
        if isinstance(div_log, list):
            for i, entry in enumerate(div_log):
                is_valid, errors = validate_divergence_entry(entry)
                if not is_valid:
                    all_valid = False
                    for error in errors:
                        print(f"Divergence entry {i}: {error}")

    # Verify no unresolved divergences (all should be classified)
    if 'divergence_log' in output:
        for entry in output['divergence_log']:
            if 'resolution_status' in entry and entry['resolution_status'] == 'unresolved':
                print("ERROR: Found unresolved divergence - must be classified")
                all_valid = False

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
