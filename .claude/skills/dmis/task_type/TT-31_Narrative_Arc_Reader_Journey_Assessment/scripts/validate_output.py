#!/usr/bin/env python3
"""
Validator for TT-31 Narrative Arc Assessment output
Checks flow scores and coherence assessment consistency
"""

import yaml
import sys
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> bool:
    """Validate narrative arc assessment output"""
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

    # Check narrative_flow_assessment
    if 'narrative_flow_assessment' in output:
        assessment = output['narrative_flow_assessment']
        if 'logical_sequence_score' in assessment:
            try:
                score = float(assessment['logical_sequence_score'])
                if not (0 <= score <= 10):
                    print(f"ERROR: Logical sequence score out of range (0-10): {score}")
                    all_valid = False
            except (ValueError, TypeError):
                print(f"ERROR: Invalid logical_sequence_score: {assessment['logical_sequence_score']}")
                all_valid = False

    # Check section_transitions
    if 'section_transitions' in output:
        transitions = output['section_transitions']
        if isinstance(transitions, list):
            for i, transition in enumerate(transitions):
                if 'transition_quality' in transition:
                    valid_qualities = ['strong', 'adequate', 'weak', 'missing']
                    if transition['transition_quality'] not in valid_qualities:
                        print(f"ERROR: Invalid transition_quality in entry {i}: {transition['transition_quality']}")
                        all_valid = False

    # Check key_message_tracking
    if 'key_message_tracking' in output:
        messages = output['key_message_tracking']
        if isinstance(messages, list):
            for i, msg in enumerate(messages):
                if 'message_drift' in msg:
                    valid_drifts = ['none', 'minor', 'significant']
                    if msg['message_drift'] not in valid_drifts:
                        print(f"ERROR: Invalid message_drift in entry {i}: {msg['message_drift']}")
                        all_valid = False

    # Check coherence_summary
    if 'coherence_summary' not in output:
        print("ERROR: Missing 'coherence_summary'")
        all_valid = False
    else:
        summary = output['coherence_summary']

        # Check overall_coherence_score
        if 'overall_coherence_score' in summary:
            try:
                score = float(summary['overall_coherence_score'])
                if not (0 <= score <= 10):
                    print(f"ERROR: Coherence score out of range (0-10): {score}")
                    all_valid = False
            except (ValueError, TypeError):
                print(f"ERROR: Invalid overall_coherence_score: {summary['overall_coherence_score']}")
                all_valid = False

        # Check flow_assessment
        if 'flow_assessment' in summary:
            valid_assessments = ['excellent', 'good', 'acceptable', 'poor']
            if summary['flow_assessment'] not in valid_assessments:
                print(f"ERROR: Invalid flow_assessment: {summary['flow_assessment']}")
                all_valid = False

    # Check executive_summary_alignment
    if 'executive_summary_alignment' in output:
        alignment = output['executive_summary_alignment']
        if 'content_coverage' in alignment:
            try:
                coverage = float(alignment['content_coverage'])
                if not (0 <= coverage <= 1):
                    print(f"ERROR: Content coverage out of range (0-1): {coverage}")
                    all_valid = False
            except (ValueError, TypeError):
                print(f"ERROR: Invalid content_coverage: {alignment['content_coverage']}")
                all_valid = False

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
