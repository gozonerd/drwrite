#!/usr/bin/env python3
"""
Validator for TT-32 Tone Consistency Scoring output
Checks tone scores, deviations, and consistency calculation
"""

import yaml
import sys
from typing import Dict, List, Tuple

def validate_section_tone(section: Dict) -> Tuple[bool, List[str]]:
    """Validate section tone score entry"""
    errors = []

    required_fields = ['section_id', 'tone_scores']
    for field in required_fields:
        if field not in section:
            errors.append(f"Missing required field: {field}")

    if 'tone_scores' in section:
        scores = section['tone_scores']
        tone_dimensions = ['formality', 'technicality', 'verbosity']
        for dim in tone_dimensions:
            if dim in scores:
                try:
                    score = float(scores[dim])
                    if not (0 <= score <= 10):
                        errors.append(f"{dim} score out of range (0-10): {score}")
                except (ValueError, TypeError):
                    errors.append(f"Invalid {dim} score type")

        if 'active_voice_ratio' in scores:
            try:
                ratio = float(scores['active_voice_ratio'])
                if not (0 <= ratio <= 1):
                    errors.append(f"Active voice ratio out of range (0-1): {ratio}")
            except (ValueError, TypeError):
                errors.append("Invalid active_voice_ratio type")

        if 'reader_assumption_level' in scores:
            valid_levels = ['novice', 'intermediate', 'expert']
            if scores['reader_assumption_level'] not in valid_levels:
                errors.append(f"Invalid reader_assumption_level: {scores['reader_assumption_level']}")

    return len(errors) == 0, errors

def validate_output(output_file: str) -> bool:
    """Validate tone consistency scoring output"""
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

    # Check section_tone_scores
    if 'section_tone_scores' not in output:
        print("ERROR: Missing 'section_tone_scores'")
        all_valid = False
    else:
        scores = output['section_tone_scores']
        if isinstance(scores, list):
            for i, section in enumerate(scores):
                is_valid, errors = validate_section_tone(section)
                if not is_valid:
                    all_valid = False
                    for error in errors:
                        print(f"Section tone score {i}: {error}")

    # Check statistical_summary
    if 'statistical_summary' in output:
        stats = output['statistical_summary']
        if 'mean_active_voice_ratio' in stats:
            try:
                ratio = float(stats['mean_active_voice_ratio'])
                if not (0 <= ratio <= 1):
                    print(f"ERROR: Mean active voice ratio out of range: {ratio}")
                    all_valid = False
            except (ValueError, TypeError):
                print("ERROR: Invalid mean_active_voice_ratio type")
                all_valid = False

    # Check deviations_flagged
    if 'deviations_flagged' in output:
        deviations = output['deviations_flagged']
        if isinstance(deviations, list):
            for i, dev in enumerate(deviations):
                if 'dimension' in dev:
                    valid_dims = ['formality', 'technicality', 'verbosity', 'voice']
                    if dev['dimension'] not in valid_dims:
                        print(f"ERROR: Invalid dimension in deviation {i}: {dev['dimension']}")
                        all_valid = False

                if 'flagged_as' in dev:
                    valid_flags = ['problematic', 'contextually_justified', 'intentional']
                    if dev['flagged_as'] not in valid_flags:
                        print(f"ERROR: Invalid flagged_as in deviation {i}: {dev['flagged_as']}")
                        all_valid = False

    # Check consistency_score
    if 'consistency_score' in output:
        consistency = output['consistency_score']
        if 'overall_tone_consistency' in consistency:
            try:
                score = float(consistency['overall_tone_consistency'])
                if not (0 <= score <= 1):
                    print(f"ERROR: Consistency score out of range (0-1): {score}")
                    all_valid = False
            except (ValueError, TypeError):
                print("ERROR: Invalid overall_tone_consistency type")
                all_valid = False

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
