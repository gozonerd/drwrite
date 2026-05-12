#!/usr/bin/env python3
"""
Validator for TT-29 Cross-Reference Resolution Audit output
Checks reference inventory completeness and resolution rates
"""

import yaml
import sys
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> bool:
    """Validate cross-reference audit output"""
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

    # Check reference_inventory
    if 'reference_inventory' not in output:
        print("ERROR: Missing 'reference_inventory'")
        all_valid = False
    else:
        inventory = output['reference_inventory']
        if isinstance(inventory, list):
            for i, ref in enumerate(inventory):
                if 'reference_type' in ref:
                    valid_types = ['section_link', 'figure_citation', 'table_reference', 'footnote', 'appendix_link', 'equation_ref']
                    if ref['reference_type'] not in valid_types:
                        print(f"ERROR: Invalid reference_type in entry {i}: {ref['reference_type']}")
                        all_valid = False

    # Check resolution_results
    if 'resolution_results' not in output:
        print("ERROR: Missing 'resolution_results'")
        all_valid = False
    else:
        results = output['resolution_results']
        if isinstance(results, list):
            for i, result in enumerate(results):
                if 'status' in result:
                    valid_statuses = ['resolved', 'unresolved', 'format_error']
                    if result['status'] not in valid_statuses:
                        print(f"ERROR: Invalid status in entry {i}: {result['status']}")
                        all_valid = False

    # Check summary
    if 'summary' not in output:
        print("ERROR: Missing 'summary'")
        all_valid = False
    else:
        summary = output['summary']

        # Verify resolution_rate calculation
        if 'resolved' in summary and 'total_references' in summary:
            try:
                rate = float(summary.get('resolution_rate', 0))
                total = int(summary['total_references'])
                resolved = int(summary['resolved'])

                if total > 0:
                    expected_rate = resolved / total
                    if abs(rate - expected_rate) > 0.01:
                        print(f"WARNING: Resolution rate mismatch. Expected {expected_rate:.2f}, got {rate:.2f}")

                if rate < 0.95:
                    print(f"WARNING: Resolution rate below threshold (0.95): {rate:.2f}")
            except (ValueError, TypeError):
                print("ERROR: Invalid numeric values in summary")
                all_valid = False

    # Check broken_references
    if 'broken_references' in output:
        broken = output['broken_references']
        if len(broken) > 0:
            summary = output.get('summary', {})
            if summary.get('unresolved', 0) != len(broken):
                print("WARNING: Broken references count doesn't match unresolved count in summary")

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
