#!/usr/bin/env python3
"""
Validator for TT-28 Pipeline Orchestration output
Checks log completeness, retry limits, and notification delivery
"""

import yaml
import sys
from typing import Dict, List, Tuple
from datetime import datetime

def validate_execution_entry(entry: Dict) -> Tuple[bool, List[str]]:
    """Validate execution log entry"""
    errors = []

    required_fields = ['timestamp', 'stage', 'task_type', 'action', 'status']
    for field in required_fields:
        if field not in entry:
            errors.append(f"Missing required field: {field}")

    if 'action' in entry:
        valid_actions = ['prompt_assembled', 'submitted', 'validating', 'validation_passed', 'validation_failed', 'retrying', 'completed']
        if entry['action'] not in valid_actions:
            errors.append(f"Invalid action: {entry['action']}")

    if 'status' in entry:
        valid_statuses = ['running', 'success', 'failed', 'retrying']
        if entry['status'] not in valid_statuses:
            errors.append(f"Invalid status: {entry['status']}")

    return len(errors) == 0, errors

def validate_output(output_file: str) -> bool:
    """Validate orchestration log output"""
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

    # Check metadata
    if 'orchestration_metadata' not in output:
        print("ERROR: Missing 'orchestration_metadata'")
        all_valid = False

    # Check execution_log
    if 'execution_log' not in output:
        print("ERROR: Missing 'execution_log'")
        all_valid = False
    else:
        log = output['execution_log']
        if isinstance(log, list):
            for i, entry in enumerate(log):
                is_valid, errors = validate_execution_entry(entry)
                if not is_valid:
                    all_valid = False
                    for error in errors:
                        print(f"Execution log entry {i}: {error}")

    # Check retry_log (critical: max 1 retry per spec)
    if 'retry_log' in output:
        retries = output['retry_log']
        if isinstance(retries, list):
            for i, retry in enumerate(retries):
                if 'retry_count' in retry:
                    if retry['retry_count'] > 1:
                        print(f"ERROR: Retry count exceeds limit (1): {retry['retry_count']} in entry {i}")
                        all_valid = False

    # Check validation_results
    if 'validation_results' not in output:
        print("WARNING: Missing 'validation_results'")
    else:
        results = output['validation_results']
        if 'failed' in results and 'passed' in results:
            total = results['passed'] + results['failed']
            if total != results.get('total_outputs_validated', total):
                print("WARNING: Validation counts don't sum to total")

    # Check completion_summary
    if 'completion_summary' in output:
        summary = output['completion_summary']
        if 'stage_status' in summary:
            valid_statuses = ['passed', 'failed', 'partial']
            if summary['stage_status'] not in valid_statuses:
                print(f"ERROR: Invalid stage_status: {summary['stage_status']}")
                all_valid = False

    # Check notifications delivered
    if 'notifications' in output:
        notifs = output['notifications']
        for notif in notifs:
            if 'delivered' in notif and not notif['delivered']:
                print(f"WARNING: Notification not delivered to {notif.get('recipient', 'unknown')}")

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
