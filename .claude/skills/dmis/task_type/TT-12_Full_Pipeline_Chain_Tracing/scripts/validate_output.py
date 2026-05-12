#!/usr/bin/env python3
"""
TT-12 Output Validator
Validates TT-12 Full Pipeline Chain Tracing outputs against schema requirements
"""

import sys
import json
import yaml
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> Tuple[bool, List[str]]:
    """
    Validate TT-12 output against schema requirements

    Args:
        output_file: Path to output YAML file

    Returns:
        Tuple of (is_valid: bool, errors: List[str])
    """
    errors = []

    try:
        with open(output_file, 'r') as f:
            output = yaml.safe_load(f)
    except FileNotFoundError:
        return False, [f"Output file not found: {output_file}"]
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML format: {str(e)}"]

    # Check root-level structure
    if 'provenance_traces' not in output:
        errors.append("Missing required field: provenance_traces")
    else:
        if not isinstance(output['provenance_traces'], list):
            errors.append("provenance_traces must be a list")
        elif len(output['provenance_traces']) == 0:
            errors.append("provenance_traces must contain at least one trace")
        else:
            # Validate each provenance trace
            for idx, trace in enumerate(output['provenance_traces']):
                trace_errors = validate_trace(trace, idx)
                errors.extend(trace_errors)

    # Check metadata
    if 'metadata' in output:
        meta_errors = validate_metadata(output['metadata'])
        errors.extend(meta_errors)

    is_valid = len(errors) == 0
    return is_valid, errors

def validate_trace(trace: Dict, trace_idx: int) -> List[str]:
    """Validate a single provenance trace"""
    errors = []
    prefix = f"Trace {trace_idx}"

    # Required fields
    required_fields = ['claim_id', 'final_statement', 'trace_chain', 'primary_sources', 'trace_status']
    for field in required_fields:
        if field not in trace:
            errors.append(f"{prefix}: Missing required field '{field}'")

    # Validate claim_id
    if 'claim_id' in trace and not isinstance(trace['claim_id'], str):
        errors.append(f"{prefix}: claim_id must be a string")

    # Validate final_statement
    if 'final_statement' in trace and not isinstance(trace['final_statement'], str):
        errors.append(f"{prefix}: final_statement must be a string")

    # Validate trace_chain
    if 'trace_chain' in trace:
        if not isinstance(trace['trace_chain'], list):
            errors.append(f"{prefix}: trace_chain must be a list")
        elif len(trace['trace_chain']) < 2:
            errors.append(f"{prefix}: trace_chain must contain at least 2 stages (P1 and P4)")
        else:
            stages_found = set()
            for stage_idx, stage in enumerate(trace['trace_chain']):
                stage_prefix = f"{prefix}.trace_chain[{stage_idx}]"
                if 'stage' in stage:
                    stages_found.add(stage['stage'])
                    if stage['stage'] not in ['P1', 'P2', 'P3', 'P4']:
                        errors.append(f"{stage_prefix}: Invalid stage '{stage['stage']}'")
                else:
                    errors.append(f"{stage_prefix}: Missing 'stage' field")

                if 'element_location' not in stage:
                    errors.append(f"{stage_prefix}: Missing 'element_location'")
                if 'supporting_evidence' not in stage:
                    errors.append(f"{stage_prefix}: Missing 'supporting_evidence'")

            # Check that trace includes P1 and P4
            if 'P1' not in stages_found:
                errors.append(f"{prefix}: trace_chain must include P1 (primary sources)")
            if 'P4' not in stages_found:
                errors.append(f"{prefix}: trace_chain must include P4 (final integration)")

    # Validate primary_sources
    if 'primary_sources' in trace:
        if not isinstance(trace['primary_sources'], list):
            errors.append(f"{prefix}: primary_sources must be a list")
        elif len(trace['primary_sources']) == 0:
            errors.append(f"{prefix}: primary_sources must contain at least one source")
        else:
            for src_idx, source in enumerate(trace['primary_sources']):
                if 'source_id' not in source:
                    errors.append(f"{prefix}.primary_sources[{src_idx}]: Missing 'source_id'")
                if 'source_type' not in source:
                    errors.append(f"{prefix}.primary_sources[{src_idx}]: Missing 'source_type'")

    # Validate trace_status
    if 'trace_status' in trace:
        valid_statuses = ['Complete', 'Partial', 'Broken']
        if trace['trace_status'] not in valid_statuses:
            errors.append(f"{prefix}: trace_status must be one of {valid_statuses}")

    # Validate convergence_validation if present
    if 'convergence_validation' in trace:
        required_convergence = ['p4_convergence_met', 'p3_convergence_met', 'p2_convergence_met', 'p1_convergence_met']
        for field in required_convergence:
            if field not in trace['convergence_validation']:
                errors.append(f"{prefix}: convergence_validation missing '{field}'")

    return errors

def validate_metadata(metadata: Dict) -> List[str]:
    """Validate metadata section"""
    errors = []

    if not isinstance(metadata, dict):
        errors.append("metadata must be a dictionary")
        return errors

    # Check for useful metadata fields
    if 'generated_date' not in metadata:
        errors.append("metadata: Missing 'generated_date'")

    if 'reviewer' not in metadata:
        errors.append("metadata: Missing 'reviewer'")

    if 'confidence_score' in metadata:
        score = metadata['confidence_score']
        if not isinstance(score, (int, float)) or not (0 <= score <= 1):
            errors.append("metadata: confidence_score must be between 0 and 1")

    return errors

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
