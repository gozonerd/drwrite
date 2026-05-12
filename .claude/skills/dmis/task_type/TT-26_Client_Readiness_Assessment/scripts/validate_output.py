#!/usr/bin/env python3
"""
Validator for TT-26 Client Readiness Assessment output
Checks dimension scores and decision consistency
"""

import yaml
import sys
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> bool:
    """Validate client readiness assessment output"""
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

    # Check readiness_assessment
    if 'readiness_assessment' not in output:
        print("ERROR: Missing 'readiness_assessment'")
        all_valid = False
    else:
        assessment = output['readiness_assessment']

        # Check overall_readiness_score
        if 'overall_readiness_score' not in assessment:
            print("ERROR: Missing 'overall_readiness_score'")
            all_valid = False
        else:
            try:
                score = float(assessment['overall_readiness_score'])
                if not (0 <= score <= 100):
                    print(f"ERROR: Score out of range (0-100): {score}")
                    all_valid = False
            except (ValueError, TypeError):
                print(f"ERROR: Invalid overall_readiness_score: {assessment['overall_readiness_score']}")
                all_valid = False

        # Check readiness_decision
        if 'readiness_decision' not in assessment:
            print("ERROR: Missing 'readiness_decision'")
            all_valid = False
        else:
            valid_decisions = ['ready', 'conditional', 'not_ready']
            if assessment['readiness_decision'] not in valid_decisions:
                print(f"ERROR: Invalid readiness_decision: {assessment['readiness_decision']}")
                all_valid = False
            else:
                # Check consistency between score and decision
                score = assessment.get('overall_readiness_score', 0)
                decision = assessment['readiness_decision']
                if decision == 'ready' and score < 70:
                    print(f"WARNING: Score {score} inconsistent with 'ready' decision (threshold: 70)")
                if decision == 'not_ready' and score >= 70:
                    print(f"WARNING: Score {score} inconsistent with 'not_ready' decision")

        # Check dimension_scores
        if 'dimension_scores' in assessment:
            dimensions = assessment['dimension_scores']
            required_dimensions = ['completeness', 'clarity', 'accuracy', 'actionability', 'format_compliance']
            for dim in required_dimensions:
                if dim in dimensions:
                    try:
                        score = float(dimensions[dim])
                        if not (0 <= score <= 100):
                            print(f"ERROR: {dim} score out of range: {score}")
                            all_valid = False
                    except (ValueError, TypeError):
                        print(f"ERROR: Invalid {dim} score: {dimensions[dim]}")
                        all_valid = False

    # Check critical_blockers
    if 'critical_blockers' in output:
        blockers = output['critical_blockers']
        if isinstance(blockers, list):
            for i, blocker in enumerate(blockers):
                if 'impact' in blocker:
                    valid_impacts = ['delivery_blocker', 'significant', 'minor']
                    if blocker['impact'] not in valid_impacts:
                        print(f"ERROR: Invalid impact in blocker {i}: {blocker['impact']}")
                        all_valid = False

    # Check recommendations
    if 'recommendations' in output:
        recs = output['recommendations']
        if isinstance(recs, list):
            for i, rec in enumerate(recs):
                if 'priority' in rec:
                    valid_priorities = ['critical', 'high', 'medium', 'low']
                    if rec['priority'] not in valid_priorities:
                        print(f"ERROR: Invalid priority in recommendation {i}: {rec['priority']}")
                        all_valid = False

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
