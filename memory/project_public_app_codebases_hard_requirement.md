---
name: App Codebases Will Be Public For Job-Application Portfolio — IP-Clean Build Pipeline Is A Hard Requirement
description: Martinez Methods apps (Claude Cost, Claudette Code Check, Claudette Cheerleader Check) are destined to become public for Krystal's job-application portfolio; build pipelines must produce IP-clean artifacts by default, not rely on post-hoc scrubbing
type: project
originSessionId: 46056a33-f1c9-42ab-8260-97ba2f9b45f8
---
Krystal is actively applying to jobs and needs the app codebases she's building with D2R to be public as portfolio work. This is a hard requirement, not a nice-to-have, and it shapes every authorship decision on the build pipeline.

**Why:** Stated explicitly on 2026-04-22: "i just may be concerned about the ability to have the codebases of these apps be public on thie r own, something i need as i'm applying to jobs." The repos went private on 2026-04-16 for IP protection while underlying methodology gets scrubbed; the selective re-publicization for portfolio use requires that each repo pass the `Pre_Publication_IP_Scrub_Checklist` before going public.

**How to apply:**

1. Every D2R-pipeline-built app (Claude Cost, Claudette Code Check, Claudette Cheerleader Check, and future Martinez Methods apps) must produce IP-clean artifacts at authorship time — not be cleaned after the fact.
2. The D2R pipeline configuration must ensure: commit messages use branded terminology only, ASAE audit logs use branded folder/file names, skill-invocation traces (if persisted) are branded, test names are branded, variable/function/file names are branded.
3. `protocol.md` for the D2R methodology experiment must include IP-clean-by-default constraints as part of the per-condition entrypoint prompts.
4. Post-hoc scrubbing is the fallback safety net, not the primary protection. The primary protection is clean-at-authorship. Post-hoc scrubbing leaks (Streisand effect, missed filesystem artifacts, residual git history).
5. Every repo moving from private to public passes `Pre_Publication_IP_Scrub_Checklist` (`_grand_repo/docs/`, v02_I or later) with a signed scrub report in `deprecated/ip-scrub-reports/`.
6. Licensing: portfolio apps going public typically use BUSL-1.1 or PolyForm Noncommercial to retain IP rights while being visible. Never blanket-permissive (Apache/MIT) without deliberate rationale in the scrub report.

**Related:**
- `feedback_ip_discipline_filesystem.md` — IP discipline at every operational layer
- `feedback_ip_language.md` — branded terminology rule (original)
- `Pre_Publication_IP_Scrub_Checklist` at `_grand_repo/docs/Pre_Publication_IP_Scrub_Checklist_2026-04-22_v02_I.md`
- `project_job_hunt.md` — broader job-application context
