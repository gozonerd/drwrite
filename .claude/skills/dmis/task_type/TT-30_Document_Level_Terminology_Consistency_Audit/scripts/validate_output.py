#!/usr/bin/env python3
"""
Validator for TT-30 Terminology Consistency Audit output
Checks terminology index completeness and consistency scores
"""

import yaml
import sys
from typing import Dict, List, Tuple

def validate_output(output_file: str) -> bool:
    """Validate terminology consistency audit output"""
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

    # Check terminology_index
    if 'terminology_index' not in output:
        print("ERROR: Missing 'terminology_index'")
        all_valid = False

    # Check consistency_findings
    if 'consistency_findings' in output:
        findings = output['consistency_findings']
        if isinstance(findings, list):
            for i, finding in enumerate(findings):
                if 'inconsistency_type' in finding:
                    valid_types = ['definition_variance', 'formatting_inconsistency', 'acronym_undefined', 'acronym_inconsistent']
                    if finding['inconsistency_type'] not in valid_types:
                        print(f"ERROR: Invalid inconsistency_type in entry {i}: {finding['inconsistency_type']}")
                        all_valid = False

                if 'severity' in finding:
                    valid_severities = ['critical', 'major', 'minor']
                    if finding['severity'] not in valid_severities:
                        print(f"ERROR: Invalid severity in entry {i}: {finding['severity']}")
                        all_valid = False

    # Check acronym_audit
    if 'acronym_audit' in output:
        acronyms = output['acronym_audit']
        if isinstance(acronyms, list):
            for i, acronym in enumerate(acronyms):
                if 'defined_on_first_use' in acronym and 'consistent_expansion' in acronym:
                    if not acronym['defined_on_first_use']:
                        print(f"WARNING: Acronym '{acronym.get('acronym', 'unknown')}' not defined on first use")

    # Check glossary_coverage
    if 'glossary_coverage' not in output:
        print("WARNING: Missing 'glossary_coverage'")
    else:
        coverage = output['glossary_coverage']
        if 'coverage_rate' in coverage:
            try:
                rate = float(coverage['coverage_rate'])
                if rate < 0.90:
                    print(f"WARNING: Glossary coverage below threshold (0.90): {rate:.2f}")
            except (ValueError, TypeError):
                print(f"ERROR: Invalid coverage_rate: {coverage['coverage_rate']}")
                all_valid = False

    # Check summary
    if 'summary' not in output:
        print("ERROR: Missing 'summary'")
        all_valid = False
    else:
        summary = output['summary']

        # Verify consistency score is valid
        if 'overall_consistency_score' in summary:
            try:
                score = float(summary['overall_consistency_score'])
                if not (0.0 <= score <= 1.0):
                    print(f"ERROR: Consistency score out of range (0-1): {score}")
                    all_valid = False
            except (ValueError, TypeError):
                print(f"ERROR: Invalid overall_consistency_score: {summary['overall_consistency_score']}")
                all_valid = False

        # Check critical/major/minor counts
        if 'critical_count' in summary and 'total_inconsistencies' in summary:
            critical = int(summary.get('critical_count', 0))
            major = int(summary.get('major_count', 0))
            minor = int(summary.get('minor_count', 0))
            total = int(summary.get('total_inconsistencies', 0))

            if critical + major + minor != total:
                print(f"WARNING: Severity count mismatch: critical({critical}) + major({major}) + minor({minor}) != total({total})")

    return all_valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <output_file.yaml>")
        sys.exit(1)

    is_valid = validate_output(sys.argv[1])
    sys.exit(0 if is_valid else 1)
