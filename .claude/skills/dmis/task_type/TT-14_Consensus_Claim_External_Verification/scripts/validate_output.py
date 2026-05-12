#!/usr/bin/env python3
"""TT-14 Output Validator - Consensus Claim External Verification"""

import sys
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """Validate TT-14 output"""
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    # Check required sections
    required_sections = ['consensus_claims', 'external_verification', 'shared_bias_assessment', 'confidence_scoring']
    for section in required_sections:
        if section not in output:
            errors.append(f"Missing required section: {section}")

    # Validate consensus claims
    if 'consensus_claims' in output:
        if not isinstance(output['consensus_claims'], list):
            errors.append("consensus_claims must be a list")
        elif len(output['consensus_claims']) == 0:
            errors.append("consensus_claims must contain at least one claim")
        else:
            for idx, claim in enumerate(output['consensus_claims']):
                if 'claim_id' not in claim:
                    errors.append(f"consensus_claims[{idx}]: Missing 'claim_id'")
                if 'statement' not in claim:
                    errors.append(f"consensus_claims[{idx}]: Missing 'statement'")

    # Validate external verification
    if 'external_verification' in output:
        if not isinstance(output['external_verification'], list):
            errors.append("external_verification must be a list")

    # Validate shared bias assessment
    if 'shared_bias_assessment' in output:
        if isinstance(output['shared_bias_assessment'], list):
            for idx, item in enumerate(output['shared_bias_assessment']):
                if 'bias_risk_level' in item:
                    valid_levels = ['Low', 'Medium', 'High']
                    if item['bias_risk_level'] not in valid_levels:
                        errors.append(f"shared_bias_assessment[{idx}]: Invalid bias_risk_level")

    # Validate confidence scoring
    if 'confidence_scoring' in output:
        if isinstance(output['confidence_scoring'], list):
            for idx, score in enumerate(output['confidence_scoring']):
                if 'combined_confidence' in score:
                    conf = score['combined_confidence']
                    if not isinstance(conf, (int, float)) or not (0 <= conf <= 1):
                        errors.append(f"confidence_scoring[{idx}]: combined_confidence must be 0-1")

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
