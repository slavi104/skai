<h1 align="center">SKAI Agents</h1>
<h2 align="center">JSON‑first AI agents with validated, structured outputs</h2>

SKAI Agents is a production-ready platform for building and operating AI agents with schema-enforced inputs and outputs, observability, and credit-based usage controls.

Note: This project is built over the Apptension SaaS Boilerplate.

## Getting started

### Requirements

- Install [Docker](https://docs.docker.com/get-docker)
- Install [Node.js](https://nodejs.org/en/download/) version 18 or above (which can be checked by running `node -v`).
  You can use [nvm](https://github.com/nvm-sh/nvm) or [n](https://github.com/tj/n) for managing multiple Node versions installed on a single machine.
- Install [pnpm](https://pnpm.io/installation) version 9 or above (which can be checked by running `pnpm --version`)
- (Windows only) Install [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install)

#### Optional

- Install [Python](https://www.python.org/downloads/) version 3.11 (which can be checked by running `python3 --version`) and [PDM](https://github.com/pdm-project/pdm/#installation) version 2.3 or above (which can be checked by running
  `pdm --version`)
  - You need this one if you want to run `pdm install` command in `packages/backend` or `packages/workers` outside
    docker container
  - You can use [`pyenv`](https://github.com/pyenv/pyenv) for managing multiple Python versions installed on a single machine.

### Setup

Clone the repository, then follow the steps below to install dependencies and run the app.

### Run locally

> :warning: **If you are using a Windows machine**, it's mandatory to have **WSL 2** (Windows Subsystem for Linux)
> installed on your system to run the commands for installing dependencies and running the application.

#### Install dependencies

The project is configured to use pnpm workspaces, which means that you can install `node_modules` of all packages in
repository, with single command:

```sh
pnpm install
```

### Start the app

Start both: backend and webapp

```sh
pnpm saas up
```

#### Start backend

```sh
pnpm saas backend up
```

#### Start webapp

```sh
pnpm saas webapp up
```

#### Local documentation

In order to run your local documentation server execute following command:

```sh
pnpm saas docs up
```

## Features

- JSON-first contracts with schema validation
- Idempotent APIs and credit-based metering
- Queue-backed workers and provider adapter (OpenAI first)
- Multi-tenant isolation (Postgres RLS)
- Webhooks with signed delivery and DLQ
- Observability and usage dashboards

## Tech stack

Front-end stack:

- [React](https://github.com/facebook/react)
- [GraphQL](https://graphql.org/)
- [Apollo Client](https://github.com/apollographql/apollo-client)
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [shadcn/ui](https://github.com/shadcn-ui/ui)
- [styled-components](https://github.com/styled-components/styled-components) (optional)
- [jest](https://github.com/jestjs/jest)
- [Storybook](https://github.com/storybookjs/storybook)
- [Vite](https://github.com/vitejs/vite)

Back-end stack:

- [Python](https://www.python.org/)
- [Django](https://github.com/django/django)
- [Django REST Framework](https://github.com/encode/django-rest-framework)
- [Graphene Django](https://github.com/graphql-python/graphene)
- [dj-stripe](https://github.com/dj-stripe/dj-stripe/)
- [Postgres](https://www.postgresql.org/)

Infrastructure:

- [NX](https://github.com/nrwl/nx)
- AWS infrastructure written in [AWS CDK](https://github.com/aws/aws-cdk)
- Github or Bitbucket

3rd party services:

- Stripe
- Contentful
- Sentry
- SonarCloud
- OpenAI

 

 

## License

SKAI Agents is licensed under the [MIT License](./LICENSE).

## Contributing

We welcome contributions from anyone interested in improving SKAI Agents. Please keep in mind that this project follows a [Code of Conduct](./CODE_OF_CONDUCT.md) to ensure a welcoming community for all.

For more detailed information on how to contribute to this project, please refer to our [Contributing Guide](./CONTRIBUTING.md).

Thank you for considering contributing to SKAI Agents!

---

## Brand

### SKAI Agents — Brand Brief

#### Mission

Enable businesses to deploy trustworthy AI agents that deliver structured, validated results over a simple JSON-first API—so teams can automate creative and cognitive work without prompt chaos.

#### Vision

Become the default AI infrastructure layer for modern businesses, where every workflow that needs reasoning, generation, or decision-making is orchestrated reliably through SKAI Agents.

#### Brand Values

- Reliability: Production-grade guarantees, predictable outputs, and enforced contracts.
- Clarity: JSON-first design, explicit schemas, and transparent observability.
- Trust & Security: Enterprise controls, privacy-first operations, and auditability.
- Developer Empathy: Simple SDKs, great docs, and fast integration paths.
- Accountability: Credit-based usage, clear limits, and measurable ROI.
- Performance: Low-latency execution, smart retries, and scalable routing.
- Interoperability: Works with your stack—webhooks, queues, and third-party APIs.

#### Positioning Statement

For product and platform teams who need predictable AI automation in production, SKAI Agents is the JSON-first AI agents platform that abstracts prompt engineering behind schemas and contracts. Unlike generic LLM wrappers or prompt tools, SKAI enforces structure with validation, provides credit-based controls, and offers simple SDKs so you can ship AI capabilities without fragile prompts or inconsistent outputs.

#### Key Differentiators

- JSON-First Contracts: Define inputs/outputs as schemas; receive structured data by default.
- Schema Validation: Enforced at runtime with typed SDKs to prevent malformed responses.
- Zero Prompt Chaos: Versioned templates, guardrails, and deterministic orchestration.
- Credit-Based Metering: Predictable spend controls per org, project, or environment.
- Simple SDKs: Lightweight clients for quick start and strong typing in common languages.
- Observability: Traces, logs, test harnesses, and drift detection for continuous quality.
- Model Choice & Routing: Use best-in-class models with routing and fallback strategies.
- Enterprise-Ready: Audit trails, access controls, and environment isolation.
- Integration-Ready: Webhooks, queues, CRM/CMS connectors, and first-class REST/JSON.

#### Why It Matters (Outcomes)

- Faster Shipping: Go from idea to production without building bespoke prompt tooling.
- Lower Risk: Contracts, validation, and guardrails reduce failures and rework.
- Lower Cost: Credit-based usage and efficient routing optimize spend.
- Better UX: Reliable, structured responses power consistent product experiences.

#### Audience

- B2B product teams, agencies, and operations leaders integrating AI at scale.
- Engineering leaders who need safe, observable AI in regulated or data-sensitive environments.

#### Brand Personality

Professional, trustworthy, and forward-looking. Helpful and precise—not playful, not hype-driven. Communicates substance over spectacle.

### SKAI Agents — Identity Starter

#### Color Palette (Accessible, Professional)

- Primary — Deep Blue: `#0A2A43` (WCAG-friendly on white; evokes trust/tech)
- Secondary — Electric Indigo: `#5A6FF7` (accents, CTAs; check contrast on dark)
- Accent — Teal: `#1BB5A6` (success/active states; sparing use)
- Warning — Amber: `#FFB020`
- Danger — Crimson: `#D6455D`
- Neutrals
  - Ink: `#0B1320`
  - Graphite: `#2C3440`
  - Slate: `#4B5563`
  - Ash: `#6B7280`
  - Mist: `#9CA3AF`
  - Cloud: `#E5E7EB`
  - Snow: `#F9FAFB`

Guideline: Maintain AA contrast (4.5:1 for body text). Reserve `#5A6FF7` for buttons/links with dark text on light backgrounds or white text on deep blue.

#### Typography (Google Fonts Only)

- Headings: Inter (700/600) — geometric, modern, excellent on web UIs.
- Body: Inter (400/500) — high readability; consider optical size.
- Mono (code): JetBrains Mono (400/600) — for code, JSON, CLI snippets.

Fallback stack examples:

- Headings/Body: `Inter, "Helvetica Neue", Arial, sans-serif`
- Mono: `"JetBrains Mono", SFMono-Regular, Menlo, Consolas, monospace`

Type scale (starter):

- H1: 36–44px / 1.2
- H2: 28–32px / 1.25
- H3: 22–24px / 1.3
- Body: 16–18px / 1.6
- Mono: 14–16px / 1.5

#### Logo Concept Directions

1. Contract Mark (JSON Bracket)

- Bracketed "S" or agent node within `{ }`, signaling schema/contracts.
- Rationale: Owns JSON-first territory visually. Works as favicon.

2. Signal Grid (Agent Network)

- Modular nodes forming a subtle "A" or "S"; conveys routing/reliability.
- Rationale: Speaks to orchestration, model choice, and fallbacks.

3. Forward Pointer (Deterministic Flow)

- Angular arrow/chevron built from right-angle segments (like brackets).
- Rationale: Progress, direction, and structure (no chaos).

Wordmark

- Use a clean, geometric sans: Inter Bold or similar.
- Kerning slightly tightened; letterforms all-caps or Title Case: "SKAI Agents".
- Keep "SKAI" weight equal or slightly heavier than "Agents".

#### Visual Guidelines for Digital Use

- Layout: Generous whitespace, grid-based sections, scannable blocks.
- UI: Primary deep blue headers; indigo CTA buttons; neutral backgrounds.
- Components: Cards with 8–12px radius, 1px neutral borders, subtle shadows.
- Data: Prefer neutral backgrounds with high-contrast code blocks.
- Icons: Outline icons with 2px stroke; avoid playful/rounded cartoon styles.
- Illustration: Abstract, geometric motifs; avoid 3D mascots.
- Accessibility: Enforce AA/AAA; test link/CTA contrast; focus states visible.

#### Usage Examples

- Buttons: Primary (indigo) on white with white text; hover darken by 6–8%.
- Sections: Dark hero on deep blue with white text; supporting indigo/teal accents.
- Docs: Light theme default; monospace for JSON; copy-to-clipboard visible.

#### Asset Starter Checklist

- Favicon: `{}` monogram in deep blue/white.
- Social: 1200×630 banners with bracket monogram and tagline.
- Icons: 16–512px sizes, consistent stroke.
- Logo lockups: Horizontal, stacked, and monogram-only.

### SKAI Agents — Messaging

#### Tagline Options (pick 1)

1. Structured AI, delivered as JSON.
2. AI agents with contracts, not chaos.
3. Ship AI fast—validated, observable, predictable.
4. The JSON-first AI agents platform.
5. Production AI without prompt guesswork.

#### Value Propositions

- Predictable by Design: JSON-first output with schema validation ensures consistent, contract-based responses.
- Faster to Ship: Simple SDKs, clear docs, and versioned prompts help teams move from prototype to production quickly.
- Controlled Costs: Credit-based usage and routing strategies align spend with value.
- Enterprise-Ready: Audit trails, RBAC, and environment isolation for secure operations.
- Integration-Ready: Works with your stack—webhooks, queues, and third-party systems.

#### Elevator Pitch

SKAI Agents is a JSON-first AI agents platform for companies that need predictable, production-grade automation. Define inputs and outputs as schemas, and get validated, structured results—no prompt chaos. With simple SDKs, credit-based controls, observability, and enterprise guardrails, SKAI makes it easy to integrate reasoning and generation into your products without compromising reliability, security, or speed.

### SKAI Agents — Voice & Tone

#### Tone Pillars

- Professional & Clear: Use precise language, unambiguous terms, and avoid hype.
- Trustworthy & Responsible: Emphasize reliability, validation, observability, and controls.
- Practical & Helpful: Focus on outcomes, integrations, and developer experience.
- Forward-Looking, Not Flashy: Confident about AI progress without buzzword excess.

#### Formality Balance

- Overall: Professional and direct. Use active voice. Avoid slang.
- Readability: Short sentences, concrete nouns and verbs, specific benefits.
- International English: Avoid idioms and culture-specific humor.

#### Vocabulary Guidelines

- Prefer: schema, contract, validation, observability, credits, outputs, routing, guardrails.
- Avoid: magic, sorcery, black-box, hack, wizardry, “just works.”
- Replace hype with facts: latencies, SLAs, versioning, typing, test coverage.

#### Structural Guidance

- Lead with value/outcome, then explain how.
- Use parallel structure and scannable lists.
- Name the audience when relevant (e.g., "platform teams", "ops leaders").

#### Do/Don’t Examples

##### Landing Page

- Do: "Define outputs as schemas. Receive validated JSON, every time."
- Don’t: "AI that magically understands your intent."

- Do: "Spin up agents with versioned prompts and enterprise guardrails."
- Don’t: "Launch AI assistants in minutes with zero effort."

##### Product Pages

- Do: "Credit-based usage with per-project limits and reporting."
- Don’t: "Unlimited AI for everyone."

- Do: "Typed SDKs for Node, Python, and Go."
- Don’t: "Works with everything, no configuration needed."

##### Docs & API

- Do: "Request must conform to `TaskSchema`. Server returns `ResultSchema` or validation errors."
- Don’t: "Send anything—our AI figures it out."

##### Status & Reliability

- Do: "Automatic retries with idempotency keys; full trace available."
- Don’t: "We’ll try again and hope it works."

#### Tone by Channel

- Website: Concise, benefits-first, accessible.
- Docs: Precise, example-led, exhaustive where needed.
- Sales Decks: Outcome-led, with performance and cost metrics.
- Social/Announcements: Conservative, informative, link to docs or changelogs.

---

## Architecture

### Table of Contents

- 1. Title & Executive Summary
- 2. High-Level Architecture (ASCII + Mermaid)
- 3. Data Model & Tenancy
- 4. Core Runtime Flows (Mermaid sequenceDiagram)
- 5. Job Queue Strategy (pg-boss)
- 6. Provider Adapter Layer
- 7. Credits & Idempotency (link to other docs)
- 8. Security & Access Control (brief, with links)
- 9. Webhooks (Outbound)
- 10. Observability & Usage Dashboards
- 11. Minimal Dependencies & Config
- 12. Failure, Backpressure & Resilience
- 13. Appendices

### 1) Title & Executive Summary

This document describes the production architecture for our multi-tenant AI SaaS JSON API built on Node.js + TypeScript using Fastify, Postgres with Row Level Security (RLS), and pg-boss for job orchestration (no RabbitMQ). We enforce strong tenancy isolation using Postgres RLS with `current_setting('app.account_id', true)` scoping set per-connection/transaction. The system processes asynchronous generation jobs through a provider adapter layer (OpenAI first), guarantees idempotent POSTs, delivers outbound webhooks, and powers usage dashboards from immutable ledgers. Credit-based billing integrates Stripe; Stripe events convert to credits via ledgers and trigger webhooks. The platform emphasizes minimal dependencies, PII-safe structured logs via pino redact, rate limits, API key rotation, and DLQs for failed jobs and webhooks.

### 2) High-Level Architecture (ASCII + Mermaid)

```
                          +-------------------------+
                          |      External Clients   |
                          |  (Server-to-Server)     |
                          +------------+------------+
                                       |
                                 HTTPS JSON API
                                       |
                          +------------v------------+
                          |  Fastify HTTP API       |
                          |  - Auth (API keys)      |
                          |  - Idempotency          |
                          |  - Rate Limiting        |
                          |  - Validation (zod)     |
                          +------+------------------+
                                 |  SQL (pg)
                                 v
     +--------------------+   +--+--------------------------+
     |  Worker Processes  |   |      Postgres (Primary)     |
     |  - pg-boss workers |   |  - app schema (RLS)         |
     |  - provider calls  |   |  - pg-boss schema           |
     +----------+---------+   |  - ledgers, jobs, webhooks  |
                |             +--+--------------------------+
                |   enqueue/dequeue    ^
                +----------------------+
                |
         +------v------+         +---------------------+
         | Provider    | <-----> |  Webhook Dispatcher |
         | Adapter     |         |  - Signed POSTs     |
         | (OpenAI)    |         |  - Retries + DLQ    |
         +-------------+         +---------------------+
```

```mermaid
flowchart TD
    A[Clients] -->|HTTPS JSON| B[Fastify API]
    B -->|pg: SQL + set_config(account_id)| C[(Postgres: app schema + RLS)]
    B -->|enqueue| D[[pg-boss queues]]
    D --> E[Workers]
    E -->|adapter| F[Provider Adapter<br/>OpenAI]
    E -->|updates| C
    E -->|events| G[Webhook Dispatcher]
    G -->|signed POST| H[Customer Webhook Endpoints]
    C --> I[(Usage Rollups + Dashboards)]
```

Responsibilities

- HTTP API (Fastify):

  - Exposes JSON-only `/v1` endpoints.
  - Authenticates via bearer API keys, enforces scopes, rate limits.
  - Validates payloads, computes canonical body hash, enforces idempotent POSTs.
  - Sets `set_config('app.account_id', ...)` per transaction; all queries scoped by RLS.
  - Enqueues pg-boss jobs and returns 202/201 with resource references.

- Worker processes:

  - Subscribe to pg-boss queues with least-privilege DB role.
  - Set `set_config('app.account_id', ...)` before tenant data access.
  - Call provider adapters (OpenAI first), write ledger entries, emit outbound events.
  - Export health/ready endpoints and metrics.

- Provider Adapter layer:

  - Normalizes calls to third-party LLM providers behind a stable interface.
  - Handles retries, timeouts (AbortController), and error mapping.
  - Does not decide pricing; pricing→credits occurs in service code.

- Postgres (primary + pg-boss schema):

  - Single source of truth with strict RLS for multi-tenancy isolation.
  - Stores jobs, job events, credits ledger, webhooks, Stripe dedupe state.
  - Hosts pg-boss tables in dedicated schema (e.g., `boss`).

- Webhook dispatcher:

  - Delivers signed JSON POSTs with HMAC, retries with exponential backoff.
  - Maintains delivery attempts and DLQ on permanent failure.

- Metrics/usage dashboards:

  - Materialized and standard views over `usage_rollups_daily` and events.
  - Surface KPIs: credit balance, credits/day, job latency, error rate, webhook success.

- Logging/observability:

  - PII-safe structured logs (pino) with redaction of sensitive JSON paths.
  - Correlates `request_id`, `account_id`, `job_id`, and timings across API and workers.

### 3) Data Model & Tenancy

Tables (name → key fields)

- accounts → id (pk), name, created_at
- users → id (pk), account_id (fk), email (unique within account), created_at
- api_keys → id (pk), account_id (fk), key_prefix, key_hash (unique), scopes[], created_at, last_used_at, rotated_at
- jobs → id (pk), account_id (fk), type, status, idempotency_key, created_at
- job_events → id (pk), job_id (fk), account_id (fk), name, payload, created_at
- credits_ledger → id (pk), account_id (fk), delta, reason, job_id (nullable), stripe_event_id (nullable), created_at
- webhook_endpoints → id (pk), account_id (fk), url, secret, events[], active, created_at
- webhook_deliveries → id (pk), account_id (fk), event_name, endpoint_id (fk), payload, delivery_key, status, attempts, last_attempt_at, created_at
- stripe_customers → id (pk), account_id (fk), stripe_customer_id (unique), created_at
- stripe_events → id (pk), account_id (fk), stripe_event_id (unique), type, payload, created_at, processed_at
- usage_rollups_daily → id (pk), account_id (fk), day, credits_used, jobs_count, avg_latency_ms, error_rate
- idempotency_keys → id (pk), account_id (fk), method, path, idempotency_key, body_hash, response_code, response_body, created_at, expires_at

RLS Policy Pattern

```sql
-- Enable RLS on all tenant tables
ALTER TABLE app.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.job_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.credits_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.webhook_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.webhook_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.stripe_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.usage_rollups_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.idempotency_keys ENABLE ROW LEVEL SECURITY;

-- Session scoping guard
CREATE POLICY rls_app_read ON app.accounts
  FOR SELECT USING (id = current_setting('app.account_id', true)::uuid);

-- Repeat per table with the appropriate account_id column
CREATE POLICY rls_read ON app.jobs
  FOR SELECT USING (account_id = current_setting('app.account_id', true)::uuid);
CREATE POLICY rls_write ON app.jobs
  FOR INSERT WITH CHECK (account_id = current_setting('app.account_id', true)::uuid);
CREATE POLICY rls_update ON app.jobs
  FOR UPDATE USING (account_id = current_setting('app.account_id', true)::uuid);
```

Roles

```sql
-- Roles
CREATE ROLE app_api NOINHERIT;
CREATE ROLE app_worker NOINHERIT;
CREATE ROLE app_migrator NOINHERIT;

-- Privileges (example subset)
GRANT USAGE ON SCHEMA app TO app_api, app_worker, app_migrator;
GRANT SELECT, INSERT, UPDATE ON app.jobs TO app_api, app_worker;
GRANT SELECT, INSERT ON app.idempotency_keys TO app_api;
GRANT SELECT, INSERT ON app.credits_ledger TO app_worker;

-- Ensure all access is gated by RLS
ALTER TABLE app.jobs FORCE ROW LEVEL SECURITY;
```

Connection scoping examples

Fastify request handler (transaction-scoped account):

```ts
// Fastify route handler outline
fastify.post(
  '/v1/jobs/generations',
  { preHandler: [authn, rateLimit, idempotency] },
  async (req, reply) => {
    const accountId = req.user.accountId; // from API key auth
    const client = await pgPool.connect();
    try {
      await client.query('BEGIN');
      await client.query("SELECT set_config('app.account_id', $1, true)", [
        accountId,
      ]);
      // All subsequent queries are RLS-scoped
      const { rows } = await client.query(
        'INSERT INTO app.jobs (id, account_id, type, status, idempotency_key) VALUES (gen_random_uuid(), $1, $2, $3, $4) RETURNING id',
        [
          accountId,
          'generation.create',
          'queued',
          req.headers['idempotency-key'],
        ],
      );
      await enqueueGenerationCreate(rows[0].id, accountId);
      await client.query('COMMIT');
      return reply.code(202).send({ job_id: rows[0].id });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },
);
```

Worker sets session account context before touching tenant rows:

```ts
async function withAccountContext<T>(
  client: PoolClient,
  accountId: string,
  fn: () => Promise<T>,
): Promise<T> {
  await client.query("SELECT set_config('app.account_id', $1, true)", [
    accountId,
  ]);
  return fn();
}
```

### 4) Core Runtime Flows (Mermaid sequenceDiagram)

Async generation job

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant A as Fastify API
    participant DB as Postgres (RLS)
    participant Q as pg-boss
    participant W as Worker
    participant P as OpenAI Adapter
    participant WH as Webhook Dispatcher

    C->>A: POST /v1/jobs/generations (Idempotency-Key)
    A->>DB: BEGIN; set_config(app.account_id)
    A->>DB: Insert idempotency row (unique)
    A->>DB: Reserve credits (pending)
    A->>Q: enqueue generation.create(job_id, account_id)
    A-->>C: 202 Accepted {job_id}
    W->>Q: subscribe generation.create
    W->>DB: set_config(app.account_id)
    W->>P: create chat completion
    P-->>W: result or error
    W->>DB: finalize ledger (+/- delta)
    W->>DB: update job status (succeeded/failed)
    W->>WH: emit job.completed/job.failed
    WH->>DB: record webhook_delivery
    WH-->>Client Endpoint: Signed POST
```

Step-by-step:

1. API authenticates, enforces idempotency by key + body hash.
2. Reserves estimated credits in `credits_ledger` as pending.
3. Enqueues `generation.create` with job + account context.
4. Worker calls OpenAI via adapter, then finalizes credits: confirm or refund.
5. Webhook dispatcher posts signed events to subscribed endpoints.

Stripe credit grant

```mermaid
sequenceDiagram
    autonumber
    participant S as Stripe
    participant A as Fastify API (/internal/stripe/webhook)
    participant DB as Postgres
    participant Q as pg-boss
    participant W as Worker
    participant WH as Webhook Dispatcher

    S->>A: POST event (signature)
    A->>A: Verify signature + dedupe by stripe_event_id
    A->>DB: Store stripe_event (idempotent)
    A->>Q: enqueue billing.credit_grant(account_id, amount)
    W->>Q: subscribe billing.credit_grant
    W->>DB: set_config(app.account_id)
    W->>DB: Insert credits_ledger (+amount, reason='stripe')
    W->>DB: Mark stripe_event processed
    W->>WH: Emit credits.granted
    WH-->>Customer Endpoint: Signed POST
```

Step-by-step:

1. Stripe webhook verified and deduped; event stored.
2. A background job grants credits in the ledger.
3. A webhook notifies the tenant of new credits.

Webhook delivery

```mermaid
sequenceDiagram
    autonumber
    participant D as Webhook Dispatcher
    participant DB as Postgres
    participant Q as pg-boss
    participant EP as Customer Endpoint

    D->>Q: enqueue webhook.delivery(delivery_id)
    D->>DB: Fetch endpoint + payload
    D->>EP: Signed POST with HMAC
    alt 2xx
        D->>DB: Mark success
    else non-2xx/timeout
        D->>Q: retry with backoff
        D->>DB: attempts++ / last_attempt_at
    end
    opt exceeded retries
        D->>DB: Move to DLQ + mark failed
    end
```

Step-by-step:

1. Each delivery is a separate job with its own retry policy.
2. Signed requests carry `X-Webhook-Signature` and `X-Delivery-Id`.
3. Exhausted retries write to DLQ for manual re-drive.

### 5) Job Queue Strategy (pg-boss)

Queues

- `generation.create`
- `webhook.delivery`
- `billing.credit_grant`

Defaults

- Retries: 5
- Backoff: exponential with jitter [5s, 15s, 45s, 2m, 5m]
- TTL per queue: configurable (e.g., `GENERATION_JOB_TTL=30m`, `WEBHOOK_TTL=2h`, `BILLING_TTL=2h`)
- Concurrency: env-driven per queue
- DLQ naming: `<queue>.dlq`

Worker bootstrap plan

1. Load config; connect as least-privilege role `app_worker`.
2. Register pg-boss handlers for each queue; expose `/healthz` and `/readyz`.
3. Implement graceful shutdown: stop accepting, drain, ack/fail outstanding.
4. Emit metrics: processed, failures, durations, queue depth.

TypeScript pseudo-implementation

```ts
import PgBoss from 'pg-boss';
import { Pool } from 'pg';
import pino from 'pino';

const log = pino({ level: process.env.LOG_LEVEL || 'info' });

export async function startWorker() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    application_name: 'worker',
  });
  const boss = new PgBoss({
    connectionString: process.env.DATABASE_URL,
    schema: process.env.PG_BOSS_SCHEMA || 'boss',
    onComplete: true,
  });
  await boss.start();

  const handler = async (job: any) => {
    const start = Date.now();
    const { account_id: accountId } = job.data;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query("SELECT set_config('app.account_id', $1, true)", [
        accountId,
      ]);
      if (job.name === 'generation.create') {
        await handleGenerationCreate(client, job.data);
      } else if (job.name === 'billing.credit_grant') {
        await handleCreditGrant(client, job.data);
      } else if (job.name === 'webhook.delivery') {
        await handleWebhookDelivery(client, job.data);
      }
      await client.query('COMMIT');
      await boss.complete(job.id);
      log.info(
        { job_id: job.id, queue: job.name, duration_ms: Date.now() - start },
        'processed',
      );
    } catch (err: any) {
      await client.query('ROLLBACK');
      log.error({ err, job_id: job.id, queue: job.name }, 'failed');
      await boss.fail(job.id, err);
    } finally {
      client.release();
    }
  };

  await boss.subscribe(
    'generation.create',
    { teamSize: Number(process.env.Q_GEN_CREATE_CONCURRENCY || 5) },
    handler,
  );
  await boss.subscribe(
    'billing.credit_grant',
    { teamSize: Number(process.env.Q_BILLING_GRANT_CONCURRENCY || 2) },
    handler,
  );
  await boss.subscribe(
    'webhook.delivery',
    { teamSize: Number(process.env.Q_WEBHOOK_DELIVERY_CONCURRENCY || 5) },
    handler,
  );
}
```

### 6) Provider Adapter Layer

Rationale: The adapter isolates provider-specific payloads, errors, and timeouts, enabling vendor swaps and consistent metering. It exposes a minimal, typed surface that returns normalized results and usage metadata. Pricing-to-credits mapping occurs outside the adapter in service code to keep pricing policy independent of provider behavior.

Interfaces (types only)

```ts
export type GenerationInput = {
  model: string;
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  temperature?: number;
  maxTokens?: number;
  accountId: string; // for auditing only
  requestId: string;
  timeoutMs?: number;
};

export type GenerationResult = {
  id: string;
  outputText: string;
  provider: 'openai';
  model: string;
  latencyMs: number;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  raw?: unknown;
};

export class ProviderError extends Error {
  constructor(
    message: string,
    public readonly code:
      | 'RATE_LIMIT'
      | 'TIMEOUT'
      | 'SERVER_ERROR'
      | 'BAD_REQUEST',
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
  }
}

export interface ProviderAdapter {
  generate(
    input: GenerationInput,
    abort: AbortSignal,
  ): Promise<GenerationResult>;
}
```

OpenAI first

- Endpoint: Chat Completions (`POST https://api.openai.com/v1/chat/completions`).
- Error mapping: HTTP 429→`RATE_LIMIT`, 5xx→`SERVER_ERROR`, 408/timeout→`TIMEOUT`, 4xx→`BAD_REQUEST`.
- Timeout: use `AbortController` with `timeoutMs` default 30s.
- Pricing→credits: applied by service code after `GenerationResult.usage` using static mapping in `/docs/CREDIT_MODEL.md`.

### 7) Credits & Idempotency (link to other docs)

Credits lifecycle

- Reservation: on job accept, insert a pending ledger entry with estimated cost.
- Finalization: worker replaces pending with actual cost; delta posted as new ledger entries (confirm or refund).
- Invariants: ledger is append-only; balance = sum(delta); no in-place updates.

Idempotency storage

- Keyed by `(account_id, method, path, idempotency_key)` with canonical `body_hash` (stable JSON stringify, sorted keys).
- TTL: 24h via `expires_at`; periodic job deletes expired rows.
- Conflict rules: same key + same `body_hash` returns saved response; same key + different `body_hash` → 409 Conflict.

SQL schema snippet

```sql
CREATE TABLE app.idempotency_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES app.accounts(id) ON DELETE CASCADE,
  method text NOT NULL,
  path text NOT NULL,
  idempotency_key text NOT NULL,
  body_hash text NOT NULL,
  response_code int,
  response_body jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '24 hours',
  UNIQUE(account_id, method, path, idempotency_key)
);
ALTER TABLE app.idempotency_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_idem ON app.idempotency_keys FOR ALL USING (account_id = current_setting('app.account_id', true)::uuid) WITH CHECK (account_id = current_setting('app.account_id', true)::uuid);
```

Fastify preHandler outline

```ts
async function idempotency(req: any, reply: any) {
  const key = req.headers['idempotency-key'];
  if (!key) return; // only enforced on POST/PUT/PATCH as configured
  const method = req.method;
  const path = req.routerPath;
  const accountId = req.user.accountId;
  const bodyHash = canonicalJsonHash(req.body);
  const client = await pgPool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SELECT set_config('app.account_id', $1, true)", [
      accountId,
    ]);
    const { rows } = await client.query(
      `INSERT INTO app.idempotency_keys (account_id, method, path, idempotency_key, body_hash)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (account_id, method, path, idempotency_key) DO UPDATE SET account_id = EXCLUDED.account_id
       RETURNING response_code, response_body, body_hash`,
      [accountId, method, path, key, bodyHash],
    );
    const idem = rows[0];
    if (idem.response_code != null) {
      // Existing response
      return reply.code(idem.response_code).send(idem.response_body);
    }
    if (idem.body_hash !== bodyHash) {
      return reply.code(409).send({ error: 'IDEMPOTENCY_KEY_CONFLICT' });
    }
    // Continue to handler; handler must update idempotency row with response
    (reply as any).onSend(async (_req: any, _reply: any, payload: any) => {
      await pgPool.query(
        'UPDATE app.idempotency_keys SET response_code=$1, response_body=$2 WHERE account_id=$3 AND method=$4 AND path=$5 AND idempotency_key=$6',
        [reply.statusCode, safeJson(payload), accountId, method, path, key],
      );
    });
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
```

See `/docs/CREDIT_MODEL.md` for pricing→credits mapping and `/docs/API_SPEC.md` for endpoint semantics.

### 8) Security & Access Control (brief, with links)

- Bearer API keys: format `sk_live_<prefix>_<random>`, store only `key_prefix` and `key_hash` (argon2id or bcrypt), never the full secret. Rotation: create a new key, migrate clients, deactivate old key, soft-delete.
- Scopes: e.g., `jobs:write`, `jobs:read`, `webhooks:write`, `billing:read` attached per key.
- Rate limits: per key and endpoint; return `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` headers.
- CORS posture: machine-to-machine only; default deny; allowlist none by default.
- TLS/HSTS: HTTPS only, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- PII-safe logging: pino redact paths

```json
[
  "req.headers.authorization",
  "req.headers.cookie",
  "res.headers.set-cookie",
  "body.card",
  "body.password",
  "body.token",
  "user.email",
  "key_hash",
  "webhook_endpoints.secret"
]
```

See `/docs/SECURITY_BASELINE.md` for additional controls.

### 9) Webhooks (Outbound)

Event schema examples

```json
{
  "type": "job.completed",
  "data": { "job_id": "...", "account_id": "...", "latency_ms": 1234 }
}
```

```json
{
  "type": "job.failed",
  "data": {
    "job_id": "...",
    "account_id": "...",
    "error": { "code": "RATE_LIMIT" }
  }
}
```

```json
{
  "type": "credits.granted",
  "data": { "amount": 1000, "account_id": "...", "source": "stripe" }
}
```

Signing

- Header: `X-Webhook-Signature: v1,t=<unix>,sig=<hmac_sha256(secret, t + '.' + body)>`
- Tolerance: ±5 minutes; reject if outside window or signature mismatch.

Idempotency for consumers

- Headers: `X-Delivery-Id` and `X-Delivery-Key` unique per delivery; consumers should dedupe on these.

Retry/DLQ policy

- Retries with exponential backoff and jitter (5s, 15s, 45s, 2m, 5m), up to 5 attempts.
- On exhaustion, mark delivery failed and copy to `webhook.delivery.dlq` for later redrive.

Webhook signing (Node.js example)

```ts
import crypto from 'node:crypto';

export function signWebhook(
  secret: string,
  body: string,
  nowSec = Math.floor(Date.now() / 1000),
) {
  const payload = `${nowSec}.${body}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return { header: `v1,t=${nowSec},sig=${sig}`, timestamp: nowSec };
}
```

### 10) Observability & Usage Dashboards

Logging fields

- `request_id`, `account_id`, `job_id`, `queue`, `status`, `duration_ms`, `provider`, `model`.

SQL views driving dashboards

```sql
CREATE MATERIALIZED VIEW app.usage_rollups_daily AS
SELECT
  account_id,
  date_trunc('day', created_at) AS day,
  sum(CASE WHEN delta < 0 THEN -delta ELSE 0 END) AS credits_used,
  count(*) FILTER (WHERE reason = 'generation') AS jobs_count,
  avg((job_events.payload->>'latency_ms')::int) AS avg_latency_ms,
  avg(CASE WHEN (job_events.name = 'job.failed') THEN 1 ELSE 0 END)::float AS error_rate
FROM app.credits_ledger
LEFT JOIN app.job_events ON app.job_events.job_id = app.credits_ledger.job_id
GROUP BY account_id, day;
```

Minimal dashboard KPIs

- Balance (sum of `credits_ledger.delta`).
- Credits/day (from `usage_rollups_daily`).
- Job latency p50/p95, error rate.
- Webhook success rate.

### 11) Minimal Dependencies & Config

Runtime dependencies and rationale

- fastify: HTTP server, JSON-only API.
- pg: Postgres driver.
- pg-boss: queueing on Postgres (no RabbitMQ).
- pino: structured logging with redaction.
- zod (optional): payload validation.
- undici/native fetch: outbound HTTP (provider + webhooks).
- stripe: webhook verification utilities.

Environment variables

| Name                           | Required | Example                      | Description                                    |
| ------------------------------ | -------- | ---------------------------- | ---------------------------------------------- |
| DATABASE_URL                   | yes      | postgres://user:pass@host/db | Primary Postgres connection                    |
| PG_BOSS_SCHEMA                 | no       | boss                         | Schema for pg-boss tables                      |
| OPENAI_API_KEY                 | yes      | sk-...                       | Adapter outbound auth                          |
| STRIPE_WEBHOOK_SECRET          | yes      | whsec_...                    | Verify Stripe webhooks                         |
| API_KEY_HASH_ALGO              | no       | argon2id                     | Hashing for API secrets                        |
| RATE_LIMIT_DEFAULT             | no       | 60,1m                        | Default per-key limit                          |
| Q_GEN_CREATE_CONCURRENCY       | no       | 5                            | Worker concurrency for generation              |
| Q_WEBHOOK_DELIVERY_CONCURRENCY | no       | 5                            | Worker concurrency for webhooks                |
| Q_BILLING_GRANT_CONCURRENCY    | no       | 2                            | Worker concurrency for billing                 |
| REQUEST_TIMEOUT_MS             | no       | 30000                        | Default provider timeout                       |
| WEBHOOK_TOLERANCE_SEC          | no       | 300                          | Signature tolerance                            |
| WEBHOOK_SIGNATURE_SECRET       | yes      | whs_...                      | HMAC secret per endpoint (stored per endpoint) |
| LOG_LEVEL                      | no       | info                         | Logging level                                  |

Safe defaults and failure modes

- Missing `OPENAI_API_KEY`: generation jobs fail fast with `SERVER_ERROR` and no credit deduction (refund pending reservations).
- Missing `STRIPE_WEBHOOK_SECRET`: Stripe endpoint disabled at startup.
- Absent rate limit config: default token bucket used and headers emitted.

### 12) Failure, Backpressure & Resilience

Scenarios

- Provider outage: workers backoff (retry policy); credit reservations refunded on failure; circuit-break after N failures.
- Stripe outage: webhook verifications may delay; events stored and processed later; idempotency ensures no double grants.
- Postgres degraded: API returns 503 for write-heavy endpoints; workers reduce concurrency; queues back up.
- Queue backlog: adjust `teamSize` concurrency; API may apply admission control (429) based on balance and queue depth.
- Webhook targets down: retries with backoff; after 5 attempts, move to DLQ with manual redrive.

Backpressure knobs

- Concurrency per queue, global in-flight limits, request timeouts, payload size caps (Fastify `bodyLimit`).

Non-goals in V1 and Future work

- No RabbitMQ (Postgres + pg-boss only).
- No multi-provider fallback; OpenAI only initially.
- No streaming responses; consider later.
- No tools or function-calling.
- No SSO for dashboard; consider in V2.
- No regional isolation; single region V1.

### 13) Appendices

Concise DDL snippets (core tables)

```sql
CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE app.accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app.api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES app.accounts(id) ON DELETE CASCADE,
  key_prefix text NOT NULL,
  key_hash text NOT NULL UNIQUE,
  scopes text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  last_used_at timestamptz,
  rotated_at timestamptz
);

CREATE TABLE app.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES app.accounts(id) ON DELETE CASCADE,
  type text NOT NULL,
  status text NOT NULL,
  idempotency_key text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app.job_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES app.jobs(id) ON DELETE CASCADE,
  account_id uuid NOT NULL REFERENCES app.accounts(id) ON DELETE CASCADE,
  name text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app.credits_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES app.accounts(id) ON DELETE CASCADE,
  delta bigint NOT NULL,
  reason text NOT NULL,
  job_id uuid REFERENCES app.jobs(id) ON DELETE SET NULL,
  stripe_event_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app.webhook_endpoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES app.accounts(id) ON DELETE CASCADE,
  url text NOT NULL,
  secret text NOT NULL,
  events text[] NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app.webhook_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES app.accounts(id) ON DELETE CASCADE,
  event_name text NOT NULL,
  endpoint_id uuid NOT NULL REFERENCES app.webhook_endpoints(id) ON DELETE CASCADE,
  payload jsonb NOT NULL,
  delivery_key text NOT NULL,
  status text NOT NULL,
  attempts int NOT NULL DEFAULT 0,
  last_attempt_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app.stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES app.accounts(id) ON DELETE CASCADE,
  stripe_customer_id text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app.stripe_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES app.accounts(id) ON DELETE CASCADE,
  stripe_event_id text NOT NULL UNIQUE,
  type text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz
);

CREATE TABLE app.usage_rollups_daily (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES app.accounts(id) ON DELETE CASCADE,
  day date NOT NULL,
  credits_used bigint NOT NULL DEFAULT 0,
  jobs_count int NOT NULL DEFAULT 0,
  avg_latency_ms int,
  error_rate double precision
);
```

RLS policies example

```sql
ALTER TABLE app.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY jobs_rls_all ON app.jobs FOR ALL
  USING (account_id = current_setting('app.account_id', true)::uuid)
  WITH CHECK (account_id = current_setting('app.account_id', true)::uuid);
```

Glossary

- Account: Tenant boundary; all data scoped by `account_id`.
- RLS: Row Level Security in Postgres enforcing per-tenant isolation.
- pg-boss: Queueing library storing jobs in Postgres.
- DLQ: Dead Letter Queue for failed jobs/deliveries.
- Idempotency: Property ensuring repeated POSTs with same key+body yield the same effect.
- Adapter: Abstraction layer over providers like OpenAI.
