---
name: Software Testing Taxonomy — Complete Reference
description: Comprehensive map of all software test types, stress test categories, and AI-driven test selection strategy. Source: ChatLLM conversation 2026-04-15.
type: reference
skill: dare-to-rise-code-plan
version: v01_I
date: 2026-04-17
---

# Software Testing Taxonomy — Complete Reference

Used to inform exhaustive QA stage design in D2R Code Plans. When planning Stage QA, check this reference to ensure the QA spec covers all relevant test categories for the application type, not just the obvious ones.

---

## Part 1: All Types of Software Tests (20 Categories)

### By Scope Layer

| Layer | Test Types |
|-------|-----------|
| Smallest | Unit, Component/Module |
| Mid | Integration, Contract |
| Feature | Functional, Acceptance |
| System | E2E, Regression, Smoke, Sanity |
| Specialized | Performance, Security, Accessibility, Usability, Snapshot/Visual Regression, Property-Based/Fuzz, Mutation |
| Operational | CI/CD Pipeline, Canary/A-B, Monitoring/Observability |

---

### 1. Unit Tests
- Test individual functions/classes in isolation
- No real dependencies (use mocks/stubs)
- Fast; run constantly during development
- **Goal:** Does this one piece of logic work?

### 2. Integration Tests
- Test how multiple components work together
- Often include real DBs, APIs, or services (or test versions)
- **Goal:** Do these parts interact correctly?

### 3. Component / Module Tests
- Between unit and integration in scope
- Test a full component (e.g., a React component, service layer)
- **Goal:** Does this self-contained feature behave correctly?

### 4. End-to-End (E2E) Tests
- Simulate real user workflows (UI → backend → DB)
- Run in a browser or full environment
- **Goal:** Does the whole system work from the user's perspective?

### 5. Functional Tests
- Validate features against requirements
- Can overlap with E2E but focus on *what*, not *how*
- **Goal:** Does this feature do what it's supposed to?

### 6. Regression Tests
- Re-run existing tests after changes
- Ensure nothing broke
- **Goal:** Did we accidentally break existing behavior?

### 7. Smoke Tests
- Quick, shallow checks of core functionality
- Often run after deployment
- **Goal:** Is the app basically alive?

### 8. Sanity Tests
- Narrow checks after small, targeted changes
- **Goal:** Does this specific fix/change work?

### 9. Acceptance Tests (UAT)
- Written from business/user perspective
- Sometimes in plain language (BDD: Given/When/Then)
- **Goal:** Does this meet user/business expectations?

### 10. Contract Tests (API-level)
- Ensure services agree on request/response formats
- **Goal:** Do services integrate without breaking each other?

### 11. Performance Tests
- Load testing (many users), stress testing (breaking point), soak testing (long duration)
- **Goal:** Can it handle real-world usage?

### 12. Security Tests
- Vulnerability scanning, penetration testing
- **Goal:** Can it be exploited?

### 13. Usability Tests
- Real users interacting with the system
- **Goal:** Is it easy and intuitive to use?

### 14. Accessibility Tests
- Ensure compliance (screen readers, keyboard nav, contrast)
- **Goal:** Can everyone use it?

### 15. Snapshot / Visual Regression Tests
- Compare UI screenshots over time
- **Goal:** Did the UI change unexpectedly?

### 16. Property-Based / Fuzz Tests
- Generate random/unexpected inputs to break the system
- **Goal:** Does this hold under weird/unexpected inputs?

### 17. Mutation Testing (meta-testing)
- Intentionally break code to test your tests
- **Goal:** Are our tests actually good?

### 18. CI/CD Pipeline Tests
- Automated test runs on every commit/deploy
- **Goal:** Catch issues before production

### 19. Canary / A/B Testing (in production)
- Release to small % of users
- **Goal:** Does it behave well in the real world?

### 20. Monitoring / Observability (post-deploy)
- Logs, metrics, alerts
- **Goal:** Is it still working after release?

---

### Mental Model: How They Fit Together

| Phase | Test Types |
|-------|-----------|
| During coding | Unit + Component |
| Feature validation | Integration + Functional |
| Pre-release | E2E + Regression + Acceptance |
| Production safety | Smoke + Monitoring + Canary |
| Specialized | Performance, Security, Accessibility |

---

## Part 2: All Stress Test Categories (39 Types)

Stress testing = pushing a system beyond normal operating conditions to see how it breaks, recovers, and degrades.

### Core Stress Tests (Load-Focused)

| # | Name | Focus |
|---|------|-------|
| 1 | Classic Stress Test | Where does it fail and how? Push beyond limits until failure. |
| 2 | Spike Testing | Sudden massive traffic surge (e.g., 100 → 10,000 users instantly) |
| 3 | Breakpoint Testing | Gradually increase load until collapse; find exact max capacity |
| 4 | Soak (Endurance) Testing | Moderate/high load over hours/days; finds memory leaks, resource exhaustion |
| 5 | Volume Testing | Huge datasets (millions of records); finds DB performance limits |
| 6 | Scalability Testing | Increase load while scaling infra; does scaling actually help? |
| 7 | Capacity Testing | Determine max users/throughput before failure |

### Resource Exhaustion Stress Tests

| # | Name | Focus |
|---|------|-------|
| 8 | CPU Stress Testing | Max out CPU; threading, performance degradation |
| 9 | Memory Stress Testing | Force high memory usage; leaks, GC behavior, OOM crashes |
| 10 | Disk I/O Stress Testing | Heavy read/write; disk bottlenecks, latency |
| 11 | Network Bandwidth Stress | Saturate network; throughput limits, timeouts |
| 12 | File Descriptor / Handle Exhaustion | Open too many files/sockets; OS limits, resource cleanup |

### Distributed System Stress Tests

| # | Name | Focus |
|---|------|-------|
| 13 | Service Dependency Failure | Kill or degrade dependent services; resilience, fallback behavior |
| 14 | Cascading Failure Simulation | One failure triggers others; system-wide stability |
| 15 | Partition Testing (Network Splits) | Simulate network partitions; consistency, failover behavior |
| 16 | Retry Storm Testing | Force failures that trigger retries; amplification effects, system overload |
| 17 | Queue Backlog Stress | Overfill message queues; backpressure handling |

### Chaos / Failure Injection

| # | Name | Focus |
|---|------|-------|
| 18 | Chaos Engineering Tests | Random failures in production-like systems; real-world resilience |
| 19 | Fault Injection Testing | Inject specific faults (timeouts, errors); error handling paths |
| 20 | Latency Injection | Artificial delays in services; timeout handling, UX impact |
| 21 | Resource Throttling | Limit CPU/memory artificially; behavior under constrained environments |

### Data & State Stress

| # | Name | Focus |
|---|------|-------|
| 22 | Database Contention Testing | Many concurrent reads/writes; locks, deadlocks, transaction conflicts |
| 23 | Cache Stress Testing | Overload cache systems; evictions, cache misses, stampedes |
| 24 | Data Corruption Simulation | Inject bad/inconsistent data; validation & recovery |
| 25 | Large Payload Testing | Massive request/response sizes; serialization, timeouts |

### User Behavior Stress

| # | Name | Focus |
|---|------|-------|
| 26 | Concurrent User Stress | Thousands/millions simultaneous users; concurrency limits |
| 27 | Peak Traffic Pattern Simulation | Realistic bursts (e.g., Black Friday); real-world behavior under pressure |
| 28 | Abusive / Edge Behavior Testing | Rapid clicks, repeated requests, bots; rate limiting, abuse protection |

### Security-Oriented Stress

| # | Name | Focus |
|---|------|-------|
| 29 | DDoS Simulation | Massive malicious traffic; defense systems, rate limiting |
| 30 | Authentication Flood Testing | Login/token request storms; auth system bottlenecks |

### Client-Side Stress

| # | Name | Focus |
|---|------|-------|
| 31 | UI Stress Testing | Rapid interactions, rendering overload; frontend performance |
| 32 | Device Resource Stress | Low battery, low memory, slow CPU; mobile/web resilience |

### Infrastructure / Environment Stress

| # | Name | Focus |
|---|------|-------|
| 33 | Auto-Scaling Stress | Rapid scale up/down events; scaling lag, instability |
| 34 | Cold Start Stress (serverless) | Many cold starts simultaneously; latency spikes |
| 35 | Deployment Stress | Deploy under heavy traffic; zero-downtime reliability |
| 36 | Configuration Stress | Misconfigurations under load; robustness to human error |

### Meta / Combined Stress Tests

| # | Name | Focus |
|---|------|-------|
| 37 | Mixed Workload Testing | Combine reads, writes, background jobs; realistic system pressure |
| 38 | Game Day / Fire Drill Testing | Simulated incidents with team response; operational readiness |
| 39 | Recovery Testing (under stress) | Crash + recover while still under load; resilience + recovery time |

---

### Three Axes of Stress Testing

```
Load       → how much traffic / data
Resources  → what runs out (CPU, memory, network)
Failures   → what breaks (services, infra, dependencies)
```

Most real-world stress scenarios combine multiple axes simultaneously —
e.g., spike + dependency failure + retry storm = realistic outage simulation.

---

## Part 3: AI-Driven Test Selection Strategy

**Core idea:** Treat stress test selection as a closed-loop optimization problem. At each step, choose the scenario that maximizes: `P(failure) × severity × novelty (new coverage)`.

### Selection Loop

1. **Map system architecture** — APIs, DBs, queues, caches, external deps
2. **Identify critical failure modes** — bottlenecks, single points of failure, high-risk flows
3. **Select stress dimensions** — Load (users, data) × Resources (CPU, memory) × Failures (timeouts, partitions)
4. **Generate scenarios** — single-variable (pure load) AND multi-variable (combinatorial chaos)
5. **Run continuously** — not one-time; integrated into CI/CD or staging
6. **Learn from production** — feed real incidents back into test generation

### Why Combinatorial Matters

A human typically runs:
- Load test
- DB stress
- Maybe cache stress

An AI-expanded "relevant" set would also cover:
- Spike traffic while cache is cold
- DB contention while queue backlog grows
- Third-party API latency triggering retry storms
- Partial node failure during autoscaling event
- Large payloads combined with high concurrency
- Memory pressure during long-running jobs

None of these are new categories — they're combinations across dimensions that humans usually skip.

### How to Apply in D2R Plans

**Relevance scoping rule:** "All stress tests relevant to this system" — not a fixed checklist, but derived from architecture inspection.

When planning Stage QA stress tests, ask for each stress category:
- Does this system have the component this test targets?
- Is failure in this component high-severity for this use case?
- Is this failure mode plausible given actual usage patterns?

If yes to all three → include it. If no to any → skip and document why.
