#!/usr/bin/env python3
import yaml, sys
from pathlib import Path
def validate(f):
    try:
        d = yaml.safe_load(open(f))
    except:
        return False, "YAML parse error"
    if not d:
        return False, "Empty file"
    req = ['title','task_type','version','task_overview','input_specification','output_requirements','quality_criteria','guardrails']
    if any(x not in d for x in req):
        return False, f"Missing required fields"
    if d.get('task_type') != 'TT-05':
        return False, "Invalid task_type"
    if 'v02' not in d.get('version',''):
        return False, "Invalid version"
    if 'anti_fabrication_rules' not in d.get('guardrails',''):
        return False, "Missing anti-fabrication rules in guardrails"
    return True, "Valid"
if len(sys.argv) < 2:
    print("Usage: python validate_output.py <file>")
    sys.exit(1)
f = sys.argv[1]
if not Path(f).exists():
    print(f"Error: {f} not found")
    sys.exit(1)
ok, msg = validate(f)
print(f"{'✓ PASS' if ok else '✗ FAIL'}: {msg}")
sys.exit(0 if ok else 1)
