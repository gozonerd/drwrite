---
name: Portfolio Designer Thread Context
description: Opus-Million the Portfolio Designer — VPS live with 5 domains + AnythingLLM, funnel architecture, chatbot design, locked decisions
type: project
---

## Original Session (2026-03-25 to 2026-03-28, old laptop)

Model: Opus 4.6 (1M context). CWD: C:\Users\Krystal Martinez\Repos.

### What Was Accomplished
- Full 12-pass Best Practices reading journal + Entry 13
- PEK Cold Read Assessment (4 phases) — rated Krystal as Principal-level, 12/12 HIRE
- Read and absorbed Portfolio Designer Handoff Brief v02 from Job Hunter thread
- 6-document reading journal (Cold Assessment Key Findings, Unified Synthesis v04, Transcript Analysis, Adoption Framework v02 + Worked Examples, Super Resume v03)
- **PORT1 Funnel Architecture** — 2-dimensional routing: Problem Routing (visitor ranks 5 pain points) x Depth Routing (3 time tracks: headlines/standard/deep dive). Each page = single purpose, single CTA
- Gap Transparency Card — per-problem companion card showing learning roadmap
- Portfolio Curator Architecture Handoff — committed to krystal-will-work-in-ai
- Diagram Research v02 — added DFD as 6th diagram type

### Key Files Produced (Original Session)
- `krystal-will-work-in-ai/04_Portfolio_Design/PORT1_Funnel_Architecture_2026-03-28_v01_I.md`
- `krystal-will-work-in-ai/04_Portfolio_Design/Portfolio_Curator_Architecture_Handoff_2026-03-28_v01_I.md`
- `.claude/references/AI_Pipeline_Orchestration_Diagram_Research_2026-03-28_v02_I.md`

---

## Continuation Session (2026-04-06, new laptop)

Onboarded via Thread Onboarding Task Brief. Transcript read from zip export. New 12-pass reading journal + Entry 13 completed.

### New Locked Decisions
- **LOCK-09:** VPS (RackNerd) for all 5 domains + chatbot. Single infrastructure, Nginx for static sites, AnythingLLM for RAG chatbot.

### Chatbot Design Decisions
- **Platform:** AnythingLLM (self-hosted, Docker)
- **Model:** Nemotron 3 Super 120B via separate API keys (not sharing with Nemorch)
- **Personality:** Krystal's #1 fan — transparently biased, enthusiastic, can't understand why anyone wouldn't hire Krystal. Very open about her angle.
- **RAG knowledge base:** Start with Core (portfolio artifacts only), add Supporting (PEK Vols 01-06) after seeing real usage. Exclude Vols 07-08 (competitive intelligence).
- **Timing:** MVP if it doesn't become a distraction; PORT1 live with content comes first.

### VPS Setup — COMPLETED
Server: 104.168.46.112 (Ubuntu 24.04 LTS, RackNerd KVM)

| Component | Status |
|-----------|--------|
| Non-root user `nerdykrystal` | Created, sudo + docker groups |
| Nginx | Running, 5 virtual hosts configured |
| HTTPS (Certbot) | All 5 domains secured (www.store skipped — DNS issue) |
| Placeholder pages | Live on all 5 domains |
| AnythingLLM | Running in Docker on port 3001, persistent storage at /home/nerdykrystal/anythingllm/storage |
| Docker | Also running Cody's VentureKeep app |

### Domains
- krystalmartinez.com — PORT1 (get me contacted)
- krystalmartinez.cv — PORT2 (get me hired)
- krystalmartinez.work — fractional consulting
- krystalmartinez.site — LE Generator / AI Agent Team
- krystalmartinez.store — paid playbooks

### Outstanding Items (as of 2026-04-06)
1. AnythingLLM setup wizard (LLM provider, embedding model, workspace config)
2. Plug in OpenRouter API key for Nemotron 3 Super 120B
3. Create workspace and upload knowledge base docs
4. Configure chatbot personality (the #1 fan)
5. Wire AnythingLLM into portfolio site via Nginx reverse proxy
6. PORT1 site build (HTML/CSS/JS for the funnel)
7. PORT2 architecture (deferred until Curator selects PORT1 content)

**Why:** This thread is the architecture and build arm of the portfolio project. Design decisions made here constrain all build work.
**How to apply:** When building portfolio sites, VPS setup, or chatbot features, reference this thread's locked decisions and VPS config. The funnel architecture (2D routing) and LOCK-09 (single VPS infrastructure) are key constraints.
