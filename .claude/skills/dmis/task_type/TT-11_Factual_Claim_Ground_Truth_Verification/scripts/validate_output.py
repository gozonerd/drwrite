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
    if d.get('task_type') != 'TT-11':
        return False, "Invalid task_type"
    if 'v02' not in d.get('version',''):
        return False, "Invalid version"
    if 'accuracy_compliance' not in d:
        return False, "Missing accuracy_compliance"
    rules = ['ACC-001','ACC-002','ACC-003','ACC-004','ACC-005','ACC-006','ACC-007','ACC-008','ACC-009']
    found = len([r for r in rules if any(r in str(item) for item in d.get('accuracy_compliance',[]))])
    if found < 9:
        return False, f"Missing accuracy rules ({found}/9)"
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
