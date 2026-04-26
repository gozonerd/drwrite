---
name: Architecture Vision Document — Template
description: Reusable template for authoring an AVD as a prerequisite input to /dare-to-rise-code-plan. Defines the high-level system shape, component boundaries, data flow, and deployment architecture. Filled-in instances feed into Stage 00 research.
type: template
skill: dare-to-rise-code-plan
version: v02_I
date: 2026-04-26
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

The component inventory MUST include the following categories where applicable (NA-with-justification permitted):

**Application components**
- Frontend / UI components (cross-references TRD §6.7 design system)
- Backend services / APIs
- Background workers / job processors
- Scheduled tasks / cron jobs
- CLI surfaces

**Data components**
- Primary databases (operational stores)
- Analytics / warehouse stores (if any)
- Cache layers (cross-references TRD §3.1 caching strategy, Track 11)
- Object storage (S3 / GCS / Azure Blob / etc.)
- Search indexes (if any)

**Observability components (Track 10, mandatory in production)**
- Log aggregator (the named service: Datadog / Splunk / ELK / Loki / CloudWatch)
- Metrics backend (Prometheus / Datadog / etc.)
- Tracing backend (Jaeger / Tempo / Datadog APM / Honeycomb)
- Alerting / on-call routing (PagerDuty / Opsgenie / VictorOps)
- Dashboard hosting (Grafana / Datadog / vendor-native)
- These are first-class components, not afterthoughts. Each appears in the component diagram and the deployment topology.

**Auth & identity components (Track 15, mandatory if system has auth)**
- Identity provider (Auth0 / Cognito / Clerk / Keycloak / custom)
- Session store (Redis / database / signed cookies)
- Token validator / authorizer (gateway-level / service-level / sidecar)
- Authorization policy engine if any (OPA / Cedar / framework-native)

**Queue & messaging components (Track 14, applicability-gated)**
- Message broker (SQS / RabbitMQ / Kafka / NATS / Redis Streams)
- Dead-letter queue (DLQ) destinations
- Event bus / pub-sub topics
- Required if reliability patterns demand async / decoupled processing per TRD §3.2

**AI / ML components (Track 19, applicability-gated)**
- Model serving infrastructure (in-process / inference server / managed API)
- Prompt / system-instruction store (versioned)
- Eval harness location
- Vector store / RAG retriever if applicable
- Output safety / classifier components if applicable
- Required IFF the product has AI in user-facing critical path*

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

## 5. Deployment Architecture (Load-Bearing — Track 12)

This section is load-bearing in v02 of the AVD: it captures the outputs of Stage 00 Track 12 (Deployment Architecture & Infrastructure-as-Code). For any production-deployable system this section is mandatory; only NA when the artifact is a pure library with no own runtime.

### 5.1 Deployment Targets

*Every deployment target. Required per target:*
- *Target name (production web, desktop release, npm package, plugin marketplace, etc.)*
- *Hosting / distribution mechanism (specific provider + service per TRD §6.6: AWS Fargate, GCP Cloud Run, Vercel, Fly.io, on-prem k8s, etc.)*
- *Build process (source → artifact)*
- *Release cadence (cross-references TRD §3.9, Track 16)*
- *Versioning scheme used at this target (cross-references TRD §3.9)*

### 5.2 Runtime Environments

*For each deployment target, the runtime environment it assumes:*
- *Browser versions / OS versions / Node versions / etc.*
- *Resource constraints (memory, CPU, disk)*
- *Network assumptions*
- *Container base image and security posture (distroless, non-root, scanned) if containerized*
- *Auto-scaling configuration (min, max, scale triggers)*

### 5.3 Environment Strategy

*Which environments exist and what they're for:*
- *Local / dev / staging / prod / preview-per-PR — per Track 12*
- *Environment parity expectations (how close staging mirrors prod)*
- *Data strategy per environment (synthetic, anonymized prod snapshot, isolated)*
- *Cost profile per environment (which envs run 24/7, which ephemeral)*

### 5.4 Infrastructure-as-Code

*How the infrastructure is reproducible — Track 12 outputs land here:*
- *IaC tooling (Terraform / Pulumi / CDK / SST / framework-native — name the specific tool + version)*
- *State management (where state lives, how it's locked, who can apply)*
- *Module / stack organization (one repo per env? per service? monorepo with workspaces?)*
- *Drift detection cadence and remediation policy*
- *IaC review workflow (PR-based / direct-apply / manual approval gates)*

### 5.5 Configuration And Secrets

*How is configuration delivered to each runtime? Where do secrets live? How are they rotated?*
- *Configuration source (env vars / config service / encrypted file / SSM Parameter Store / etc.)*
- *Secrets backend (KMS / Secrets Manager / Vault / SOPS / etc.) — cross-references TRD §3.3*
- *Secret rotation cadence per secret category (DB creds, API keys, signing keys)*
- *Local-dev secret strategy (no real prod secrets, .env.example pattern)*

### 5.6 Deployment Topology

*If the system spans multiple deployment targets, describe the topology:*
- *Which targets talk to which*
- *Authentication between targets (mTLS, signed JWTs, internal-network-only)*
- *Data replication or sync patterns*
- *Network architecture (VPC layout, subnets, ingress/egress, service mesh if any)*

### 5.7 Backup & Disaster Recovery (Track 12 + cross-references TRD §3.2)

*Required:*
- *What's backed up (specific data stores, configurations, encryption keys)*
- *Backup frequency per data class*
- *Backup storage location (different region / different provider / both)*
- *Backup retention per class*
- *Restore procedure (documented runbook location)*
- *DR drill cadence (last performed date, target frequency)*
- *Observed RTO and RPO from last drill vs. targets in TRD §3.2*

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
- [ ] §3.1 Component inventory includes application, data, observability (Track 10), auth (Track 15), queue (Track 14), AI (Track 19) categories with NA-justifications where applicable
- [ ] Every component has inputs, outputs, responsibility named
- [ ] Every primary data flow traced end-to-end
- [ ] §5.1 Every deployment target has runtime environment + build process documented
- [ ] §5.3 Environment strategy declared (which envs exist, parity expectations)
- [ ] §5.4 IaC tooling named with state management strategy (Track 12)
- [ ] §5.5 Configuration and secrets architecture documented
- [ ] §5.7 Backup & DR plan documented with last-drill date and observed RTO/RPO (Track 12 + TRD §3.2)
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

- **Stage 00 Track 1 (Tech Stack):** scopes against architectural style + component inventory
- **Stage 00 Track 4 (Language Depth):** scopes against component boundaries + runtime environments
- **Stage 00 Track 5 (Plugin Ecosystem):** scopes against cross-cutting concerns
- **Stage 00 Track 9 (Threat Modeling):** scopes against §3.2 boundaries + §6.4 security architecture; threat model lands trust boundaries here
- **Stage 00 Track 10 (Observability Stack):** lands observability components in §3.1 inventory + §6.1 cross-cutting concern
- **Stage 00 Track 11 (Performance & Scale):** scopes against §4 data flows + §3 boundaries
- **Stage 00 Track 12 (Deployment Architecture & IaC):** lands its outputs into §5 (load-bearing in v02)
- **Stage 00 Track 13 (Data Lifecycle & Privacy):** scopes against §4.3 persistence + §6.4 security architecture
- **Stage 00 Track 14 (Reliability & Resilience):** lands queue / DLQ / retry components in §3.1 + topology in §5.6
- **Stage 00 Track 15 (Auth & Identity):** lands identity provider + session store + token validator in §3.1 + auth topology in §5.6
- **Stage 00 Track 16 (Release Engineering):** lands release-cadence + versioning per target in §5.1
- **Stage 00 Track 19 (AI/ML, applicability-gated):** lands model serving + prompt store + eval harness components in §3.1 if applicable
- **Stage 01a (Skeleton):** maps components to implementation stages
- **Stage 01b (Full Plan):** writes Deep-spec content consistent with AVD component boundaries + data flows + deployment topology
