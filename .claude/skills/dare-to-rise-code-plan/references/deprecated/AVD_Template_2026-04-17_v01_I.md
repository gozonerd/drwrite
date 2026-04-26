---
name: Architecture Vision Document — Template
description: Reusable template for authoring an AVD as a prerequisite input to /dare-to-rise-code-plan. Defines the high-level system shape, component boundaries, data flow, and deployment architecture. Filled-in instances feed into Stage 00 research.
type: template
skill: dare-to-rise-code-plan
version: v01_I
date: 2026-04-17
---

# Architecture Vision Document — Template

## How To Use This Template

Copy this file. Rename to `[ProjectPrefix]_AVD_[YYYY-MM-DD]_v01_I.md`. Fill in every required section. Mark optional sections as NA if not applicable with a one-line reason.

The AVD is downstream of the PRD (what the product IS) and TRD (what it MUST DO), and parallel to the TQCD (what success looks like quality-wise). The AVD describes the system's HIGH-LEVEL SHAPE before Stage 00 research picks specific libraries and before Stage 01 writes the implementation plan.

For simple projects (e.g., a library with a single consumer), the AVD may be short — components, data flow, deployment, done. For complex projects (multi-surface platforms, distributed systems, cross-app ecosystems), the AVD is the document that keeps architectural decisions coherent across stages.

Required sections must be completed before `/dare-to-rise-code-plan` Stage 00 can run.

---

## 1. Document Identity

### 1.1 Project Name And Version

*Project name matching PRD/TRD. Version matching PRD/TRD.*

### 1.2 PRD And TRD References

*Cite the PRD and TRD this AVD is downstream of.*

### 1.3 Revision History

| Version | Date | Changes | Reviewer |
|---------|------|---------|----------|

---

## 2. System Shape

### 2.1 One-Paragraph System Description

*In 3-5 sentences, describe the system's shape at the highest level. Not what it does (that's the PRD). Not what it must do technically (that's the TRD). Its architectural shape — client-server, static site, CLI, library + consumers, distributed workers, event-driven, etc.*

### 2.2 Architectural Style

*Name the architectural style(s) the system uses:*
- *Monolithic / Microservices / Serverless / Static Site / CLI / Library / Hybrid*
- *Synchronous / Asynchronous / Event-Driven / Request-Response*
- *Stateful / Stateless*
- *Client-Side / Server-Side / Hybrid*

*For each: one-line rationale.*

### 2.3 Surface Layers

*What surfaces does the system expose to consumers? For each surface:*
- *Name*
- *Consumer type (human user via UI, developer via API, developer via CLI, etc.)*
- *Relationship to other surfaces (are they all wrappers around one core? Independent? Dependent?)*

---

## 3. Components And Boundaries

### 3.1 Component Inventory

*Every major component of the system. Required per component:*
- *Component name*
- *Responsibility (one sentence)*
- *Inputs (from which other components or external sources)*
- *Outputs (to which other components or external sinks)*
- *Interfaces exposed (public API surface)*

### 3.2 Boundaries

*Where are the hard boundaries between components?*
- *Process boundaries (separate processes, separate services)*
- *Language / runtime boundaries (TypeScript vs Rust vs Python sidecar, etc.)*
- *Trust boundaries (which components can be trusted with which data)*
- *Release boundaries (which components ship together vs independently)*

### 3.3 Component Diagram

*Narrative description of component relationships (since this is a markdown doc, describe in prose or include a link to a separate diagram file). Required: every component in the inventory must appear; every arrow must have a direction and a label.*

---

## 4. Data Flow

### 4.1 Primary Data Flows

*The main data journeys through the system. Required per flow:*
- *Flow name*
- *Trigger*
- *Steps: data enters at X → transformed by Y → stored in Z (or transmitted to W)*
- *Output: what the consumer sees / receives*
- *Latency expectations (from TRD)*

### 4.2 Secondary Data Flows

*Background jobs, scheduled tasks, error-recovery flows.*

### 4.3 Data Persistence Points

*Where does data persist?*
- *Location (database type, file system, client-side storage, etc.)*
- *Lifetime (session / persistent / archival)*
- *Consistency model (strong / eventual / last-write-wins)*

---

## 5. Deployment Architecture

### 5.1 Deployment Targets

*Every deployment target. Required per target:*
- *Target name (production web, desktop release, npm package, plugin marketplace, etc.)*
- *Hosting / distribution mechanism*
- *Build process (source → artifact)*
- *Release cadence*

### 5.2 Runtime Environments

*For each deployment target, the runtime environment it assumes:*
- *Browser versions / OS versions / Node versions / etc.*
- *Resource constraints (memory, CPU, disk)*
- *Network assumptions*

### 5.3 Configuration And Secrets

*How is configuration delivered to each runtime? Where do secrets live? How are they rotated?*

### 5.4 Deployment Topology

*If the system spans multiple deployment targets, describe the topology:*
- *Which targets talk to which*
- *Authentication between targets*
- *Data replication or sync patterns*

---

## 6. Cross-Cutting Concerns

### 6.1 Logging And Observability

*Which components emit logs? What format? Where do they aggregate? (Cross-reference TRD Section 3.8.)*

### 6.2 Error Handling Strategy

*System-wide error handling: thrown exceptions vs Result types vs error channels. Error propagation between components.*

### 6.3 Concurrency Model

*How does the system handle concurrent operations? Event loop, worker threads, async/await patterns, message queues, etc.*

### 6.4 Security Architecture

*High-level: where is authentication enforced? Where is authorization enforced? Where does data encryption happen? (Cross-reference TRD Section 3.3.)*

### 6.5 Accessibility Architecture

*If the system has UI surfaces: how is accessibility architecturally enforced? Component library choice? Testing integration? (Cross-reference TRD Section 3.5 and TQCD Section 6.)*

---

## 7. Architectural Decisions (Mini-ADRs)

*For each significant architectural decision, record:*

*Required format per decision:*
- *Decision ID (AD-NN)*
- *Title (one-line)*
- *Status (Proposed / Accepted / Deprecated / Superseded)*
- *Context: what problem was being solved*
- *Options considered (with one-line summary each)*
- *Decision: which option was chosen*
- *Rationale: why this option*
- *Consequences: what this decision locks in and what it forecloses*

*Examples of decisions that warrant an AD:*
- *Language choice when multiple were viable*
- *Framework choice*
- *Sync vs async architectural choice*
- *Monolithic vs service-oriented*
- *Database choice*
- *Client-side vs server-side*
- *Custom library vs OSS adoption*

---

## 8. Technical Debt And Known Compromises

*Architectural compromises made in this version. Named so they're visible when decisions are revisited.*

*Required per item:*
- *Compromise description*
- *Why it was made*
- *What it costs*
- *When/whether to revisit*

---

## 9. Open Architectural Questions

*Unresolved architectural decisions. Stage 00 research should address these or Stage 01 must flag them for user decision.*

---

## 10. Stakeholder Approvals

*Who has approved this AVD?*

*Required per stakeholder: name, role, approval date, notes.*

---

## Validation Checklist (Pre-Stage-00)

- [ ] All required sections completed
- [ ] NA sections have one-line justifications
- [ ] Every component has inputs, outputs, responsibility named
- [ ] Every primary data flow traced end-to-end
- [ ] Every deployment target has runtime environment + build process documented
- [ ] Mini-ADRs present for every significant architectural decision
- [ ] Cross-cutting concerns addressed (or explicitly NA)
- [ ] Open questions named for Stage 00 to resolve
- [ ] Stakeholder approval documented

A project does not require an AVD if:
- The system is trivially simple (single file, no cross-component boundaries, no architectural choices to make)
- In which case Stage 00 documents the AVD-skipped status with justification

## Companion Documents

This AVD is one of four prerequisite inputs to `/dare-to-rise-code-plan`. The others:

- **PRD (Product Requirements Document)** — what the product IS
- **TRD (Technical Requirements Document)** — what it MUST DO technically
- **TQCD (Testing & Quality Criteria Document)** — what success looks like quality-wise

All four templates live in `.claude/skills/dare-to-rise-code-plan/references/` and each has a corresponding authorship skill (`/write-prd`, `/write-trd`, `/write-avd`, `/write-tqcd`).

## Downstream Use

This AVD feeds directly into:

- **Stage 00 Track 1:** Tech stack research scopes against the AVD's architectural style and component inventory
- **Stage 00 Track 4:** Language-depth-of-spec research scopes against the component boundaries and runtime environments
- **Stage 00 Track 5:** Skill/plugin ecosystem research scopes against cross-cutting concerns (which plugins help with accessibility, security, observability architecturally)
- **Stage 01a:** Skeleton authorship maps components to implementation stages
- **Stage 01b:** Full plan authorship writes Deep-spec content consistent with the AVD's component boundaries and data flows
