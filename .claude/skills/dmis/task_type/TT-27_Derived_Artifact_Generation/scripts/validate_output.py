#!/usr/bin/env python3
"""
Validator for TT-27 Derived Artifact Generation output
Checks extraction fidelity, AFR compliance, and novel content detection
"""

import yaml
import sys
from typing import Dict, List, Tuple

def validate_artifact(artifact: Dict) -> Tuple[bool, List[str]]:
    """Validate artifact structure"""
    errors = []

    required_fields = ['artifact_id', 'artifact_type', 'title', 'content', 'source_sections', 'entry_count']
    for field in required_fields:
        if field not in artifact:
            errors.append(f"Missing required field: {field}")

    if 'artifact_type' in artifact:
        valid_types = ['glossary', 'reference_matrix', 'index', 'bibliography', 'supplementary_table', 'appendix']
        if artifact['artifact_type'] not in valid_types:
            errors.append(f"Invalid artifact_type: {artifact['artifact_type']}")

    if 'source_sections' in artifact and not artifact['source_sections']:
        errors.append("Artifact must cite source sections (AFR-006 traceability)")

    if 'entry_count' in artifact:
        try:
            count = int(artifact['entry_count'])
            if count < 0:
                errors.append(f"Invalid entry_count: {count}")
        except (ValueError, TypeError):
            errors.append(f"Invalid entry_count type: {artifact['entry_count']}")

    return len(errors) == 0, errors

def validate_output(output_file: str) -> bool:
    """Validate artifact generation output"""
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

    # Check artifacts
    if 'artifacts' not in output:
        print("ERROR: Missing 'artifacts'")
        all_valid = False
    else:
        artifacts = output['artifacts']
        if isinstance(artifacts, list):
            for i, artifact in enumerate(artifacts):
                is_valid, errors = validate_artifact(artifact)
                if not is_valid:
                    all_valid = False
                    for error in errors:
                        print(f"Artifact {i}: {error}")

    # Check extraction_metadata
    if 'extraction_metadata' in output:
        metadata = output['extraction_metadata']
        if isinstance(metadata, list):
            for i, entry in enumerate(metadata):
                if 'extraction_confidence' in entry:
                    valid_conf = ['high', 'medium', 'low']
                    if entry['extraction_confidence'] not in valid_conf:
                        print(f"ERROR: Invalid extraction_confidence in metadata {i}")
                        all_valid = False

    # Check validation_summary
    if 'validation_summary' not in output:
        print("WARNING: Missing 'validation_summary'")
    else:
        summary = output['validation_summary']

        # AFR-006 enforcement: novel_content_count MUST be 0
        if 'novel_content_count' in summary:
            if summary['novel_content_count'] > 0:
                print(f"ERROR: AFR-006 violation - novel content detected ({summary['novel_content_count']} entries)")
                all_valid = False

        if 'extraction_fidelity' in summary:
            try:
                fidelity = float(summary['extraction_fidelity'])
                if fidelity < 1.0:
                    print(f"WARNING: Extraction fidelity below perfect (1.0): {fidelity}")
            except (ValueError, TypeError):
                print(f"ERROR: Invalid extraction_fidelity: {summary['extraction_fidelity']}")
                all_valid = False

        if 'compliance_status' in summary:
            if summary['compliance_status'] == 'non_compliant':
                print("ERROR: Artifact generation is non-compliant (likely AFR violation)")
                all_valid = False

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
