#!/usr/bin/env python3
"""
Validator for TT-23 Adversarial Stress Testing output
Checks compliance with output schema and quality criteria
"""

import yaml
import sys
from typing import Dict, List, Tuple

def validate_attack_card(card: Dict) -> Tuple[bool, List[str]]:
    """Validate individual attack card structure"""
    errors = []

    required_fields = ['attack_id', 'category', 'severity', 'description', 'evidence', 'remediation', 'section_reference']
    for field in required_fields:
        if field not in card:
            errors.append(f"Missing required field: {field}")

    if 'category' in card:
        valid_categories = ['regulatory', 'technical', 'operational', 'logical', 'feasibility']
        if card['category'] not in valid_categories:
            errors.append(f"Invalid category: {card['category']}")

    if 'severity' in card:
        valid_severities = ['critical', 'high', 'medium']
        if card['severity'] not in valid_severities:
            errors.append(f"Invalid severity: {card['severity']}")

    if 'evidence' in card and not card['evidence']:
        errors.append("Evidence field cannot be empty")

    return len(errors) == 0, errors

def validate_output(output_file: str) -> bool:
    """Validate complete output structure and content"""
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

    # Check root structure
    if 'attack_cards' not in output:
        print("ERROR: Missing 'attack_cards' root field")
        all_valid = False
    else:
        attack_cards = output['attack_cards']
        if not isinstance(attack_cards, list):
            print("ERROR: 'attack_cards' must be a list")
            all_valid = False
        else:
            # Check minimum 5 attacks
            if len(attack_cards) < 5:
                print(f"ERROR: Minimum 5 attack cards required, found {len(attack_cards)}")
                all_valid = False

            # Validate each card
            for i, card in enumerate(attack_cards):
                is_valid, errors = validate_attack_card(card)
                if not is_valid:
                    all_valid = False
                    for error in errors:
                        print(f"Attack card {i}: {error}")

    # Check summary structure
    if 'summary' not in output:
        print("WARNING: Missing 'summary' field")
    else:
        summary = output['summary']
        required_summary = ['total_attacks', 'critical_count', 'high_count', 'medium_count']
        for field in required_summary:
            if field not in summary:
                print(f"WARNING: Missing summary field: {field}")

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
