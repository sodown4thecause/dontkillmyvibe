# Archon — Multi-Agent Dev Workspace PRD

**Status:** Draft v4 — full concept pivot
**Last updated:** May 21, 2026
**One-liner:** A native desktop app that runs every AI coding agent alongside your dev stack, and ensures what they produce actually works before it ships.

---

## 1. What this is

A 25–40MB native desktop application. You open it, your agents start, your dev server starts, your queue workers start. Every process is visible in one panel. Your agents can see stack state via MCP. When an agent finishes writing code, the validation pipeline kicks in automatically — git worktree, test run, lint, repair loop if needed, draft PR if it passes.

It is not an IDE. It is not another agent. It is the workspace your agents live in and the quality gate their output runs through.

Two prior products got half of this right:

- **Solo** manages the workspace. Agents can see your stack. Processes auto-restart. One dashboard. It stops there — no opinion about the code quality, no validation, no PR pipeline.
- **Archon v2** enforces code quality. Deterministic validation gates, git worktrees, repair loops, 17 default workflows. Requires YAML authoring and expert configuration. No workspace visibility layer.

This product is both layers in a single install.

---

## 2. Why this market exists

Solo proved the appetite. Built by one person, it has a paying user base and a clear free-to-pro conversion path — just on process management and MCP visibility. The product deliberately does not touch code quality or PRs.

That's not a mistake on Solo's part. It's a focused scope decision that left the harder, more valuable layer open.

Every developer running Claude Code or Codex right now has the same problem: the agent generates code confidently against a dev server that silently crashed 15 minutes ago, or the tests fail but nobody checked, or the PR opens with a broken build. The agent has no feedback loop. The developer is manually closing the loop themselves.

The workspace layer (Solo's job) solves half of that — the agent can now see the stack. The validation layer (Archon's job) solves the other half — what the agent produces is checked before it reaches the developer.

Nobody has shipped both together in a single native app.

---

## 3. Users

### Primary: the Developer Running Multiple Agents

Not specifically a vibe coder — any developer who has more than one AI coding agent running at a time.

- Running Claude Code and Codex in parallel on different tasks
- Has a Next.js dev server, a queue worker, a database, and maybe a stripe webhook listener all running at once
- Currently managing this across 6–9 terminal tabs with no unified view
- Pain: agents fly blind, processes crash silently, code ships broken

### Secondary: the Serious Vibe Coder

Ships real software via AI agents but doesn't want to think about infrastructure. They want to open one app, type a task, and get a working PR. The validation layer is the difference between this being a toy and being a workflow.

### Non-user

- Developers who only run one agent on simple tasks — they don't need orchestration
- Platform teams building custom enterprise harnesses — full Archon is right for them

---

## 4. The two pillars

### Pillar 1: Workspace visibility (Solo-inspired)

Every agent and every dev process runs in a single window. One dashboard, green/red status per process, auto-restart on crash, file watchers for live reload.

The MCP bridge is the critical piece: agents can read log output, check process status, and restart crashed services without the developer intervening. Context-aware agents write better code because they know whether the thing they're writing against is actually running.

This pillar is immediately valuable on day one — before the validation layer is even enabled. Developers will use this just to stop juggling terminal tabs.

### Pillar 2: Deterministic validation (Archon-powered)

When an agent produces code changes, the validation pipeline runs automatically in the background:

1. Spin up a git worktree (isolated — main branch untouched)
2. Apply the agent's changes
3. Run the test suite
4. Run the linter
5. If failures: repair loop, up to N attempts, feeding failure context back to the agent
6. If passes: open a draft PR with the diff and test output attached

The developer's only required action is reviewing and merging the draft PR. Everything before that is automated.

This layer is opt-in per repo and per agent session. Developers can use the workspace layer without enabling validation.

---

## 5. Positioning

**vs Solo:** Solo manages what's running. This manages what's produced. Complementary, not competing. Could integrate with Solo (run as a Solo process) but doesn't need to.

**vs Archon v2:** Archon is for harness engineers who write YAML DAGs. This is for any developer who installs a desktop app. The Archon v2 engine runs inside this product as the validation backend — users never see it.

**vs Cursor / Windsurf / Claude Code:** Those are editors and agents. This is not an editor. It runs those agents. "Not an IDE. On purpose." is the right framing (Solo's line, but it applies here too).

**vs hosted AI tools (v0, Lovable, Bolt):** Those abstract away your local environment entirely. This works with your local environment — your actual codebase, your actual tests, your actual stack.

---

## 6. Tech stack

### Desktop shell: Tauri

Not Electron. Tauri uses the system's native WebView and a Rust core. Target binary size: 25–40MB. Starts in under a second. Uses less RAM than a Chrome tab.

Rust handles: process spawning and lifecycle management, file system watching, terminal I/O, platform-specific shell differences (the `.cmd` / macOS stdin issues that plagued the original Archon approach).

TypeScript/React frontend handles: the UI panels, agent session display, process dashboard.

### Agent loop: Vercel AI SDK 6

Manages model calls, tool calling with Zod schemas, streaming progress to the UI, and `needsApproval` gates on destructive actions (force push, schema migration, file deletion). Provider-agnostic — users bring their own Claude / GPT / Gemini API keys. No vendor lock-in on models.

### Validation engine: Archon v2

Runs as a local TypeScript/Bun subprocess managed by the Tauri shell. Provides the 17 default workflows as callable functions. Git worktree management, validation gates, and repair loops are all existing Archon v2 code — we wrap it, we don't rewrite it.

### State: SQLite (local)

Per-project SQLite database. Stores process configs, agent session history, workflow run logs, PR links. No external database. No cloud dependency for core functionality.

### PR integration: GitHub API

GitHub App for repo access and PR creation. Minimum scopes. All PRs open as drafts. The developer is always the final gate.

### MCP bridge: local MCP server

Exposes process status, logs, and restart controls to any connected agent. AI SDK 6's native MCP support handles the protocol. Agents connect automatically when they start inside the workspace.

### Optional cloud layer (v2+)

Remote MCP endpoint so Cursor/Windsurf users can access the validation workflows without the desktop app. Out of scope for v1.

---

## 7. The experience

### First run

```
Download (35MB). Open. 
"Add your first project" → pick a directory.
App auto-detects: Next.js dev server, Prisma, queue worker.
"Add agents" → Claude Code, Codex, whichever.
Hit play. Everything starts.
```

One window. All agents. All processes. All green.

### A typical session

```
[Agent panel]  Claude Code — Working on checkout flow
               Codex       — Reviewing PR #41
               
[Stack panel]  Next.js     ● Running  localhost:3000
               Queue       ● Running  3 jobs/min
               Postgres    ● Running  
               Stripe CLI  ✗ Crashed  → [auto-restarted 2m ago]

[Claude Code says in its terminal]
  "I notice the Stripe webhook listener restarted — 
   checking whether the test events replayed..."
```

The agent knows the webhook listener crashed and recovered. That's the MCP bridge working.

### When Claude Code finishes a task

```
[Validation pipeline fires automatically]

→ Worktree created: archon/checkout-flow-improvements
→ Running tests… 47/50 passing
→ 3 failures — running repair loop (attempt 1/2)
→ Fixed: stripe.constructEvent() argument order
→ Re-running tests… 50/50 passing
→ Lint… clean
→ Opening draft PR

Draft PR ready: github.com/you/repo/pull/63
Tests: 50/50 ✓  Lint: clean ✓  Review when ready.
```

The developer didn't do anything except continue working on the next task.

### needsApproval for destructive actions

Any action flagged as destructive — force push, database migration, file deletion — pops an inline approval prompt in the agent panel. The agent pauses. The developer approves or cancels. Previously approved patterns can be remembered.

---

## 8. Functional requirements

### Workspace layer (Pillar 1)

**FR-1: Process manager** *(Must)*
- Define any process (dev server, queue worker, database, shell script) per project
- One-click start/stop for all processes
- Auto-restart on crash with configurable backoff
- AC: A Next.js + Prisma + queue worker stack starts completely within 10 seconds

**FR-2: Terminal panels** *(Must)*
- Each agent and process gets a dedicated terminal panel
- Full ANSI support, interactive (respond to agent prompts directly)
- AC: Developer can respond to a Claude Code permission prompt without leaving the app

**FR-3: Unified dashboard** *(Must)*
- Single view showing status (running/stopped/crashed/error) for all agents and processes
- Updates within 500ms of state change
- AC: Developer can tell at a glance which processes are healthy without opening individual panels

**FR-4: File watchers** *(Should)*
- Define file patterns that trigger process restart
- AC: Saving a config file restarts the relevant process automatically

**FR-5: Local MCP server** *(Must)*
- Exposes process status, last N log lines, and restart control per process
- Any agent running in the workspace connects automatically
- AC: Claude Code can restart a crashed queue worker with a single tool call

**FR-6: Project config as code** *(Must)*
- `workspace.yml` defines all processes and agents
- Committable to the repo so the team gets the same setup
- Local overrides that don't get committed
- AC: A new team member clones the repo, opens the app, and the stack starts identically

**FR-7: Auto-detect common stacks** *(Should)*
- Detect package.json scripts, Procfile, docker-compose.yml
- Suggest processes to add on first open
- AC: A Next.js project is correctly detected and suggested in under 3 seconds

### Validation layer (Pillar 2)

**FR-8: Agent output detection** *(Must)*
- Detect when an agent session completes a task (agent signals done, or user triggers manually)
- Trigger validation pipeline with the changed files
- AC: Pipeline fires within 5 seconds of agent task completion

**FR-9: Git worktree isolation** *(Must)*
- All validation runs in a temporary worktree
- Main branch never touched during validation
- AC: `git status` on main is clean during and after any validation run

**FR-10: Test and lint execution** *(Must)*
- Run the project's existing test suite and linter inside the worktree
- Parse output to identify failures
- AC: Works with Jest, Vitest, Pytest, RSpec, Go test, PHPUnit without configuration

**FR-11: Repair loop via AI SDK 6 agent** *(Must)*
- On failure, feed error output back into the agent loop
- Attempt repair up to N times (default 2, configurable)
- AC: For a corpus of 50 known-fixable failures, repair succeeds ≥70% within 2 attempts

**FR-12: Draft PR creation** *(Must)*
- On validation pass, open a draft PR via GitHub App
- PR description includes: what changed, test results, lint status
- AC: 100% of PRs open as drafts, never auto-merged

**FR-13: Validation opt-in per repo** *(Must)*
- Validation pipeline is off by default, enabled per project
- Individual agent sessions can bypass it
- AC: A developer can use the workspace without triggering a single validation run

**FR-14: needsApproval for destructive operations** *(Must)*
- Flag any tool call involving deletion, force-push, or migration
- Agent pauses, inline prompt appears, developer approves or cancels
- AC: Zero unapproved destructive operations in the audit log

### Cross-platform

**FR-15: Mac, Windows, Linux support** *(Must)*
- Ship Mac first, Windows and Linux in phase 2
- Platform-specific shell handling abstracted in Rust layer
- AC: Full test suite passes on all three platforms in CI

---

## 9. Non-functional requirements

| Area | Requirement |
|---|---|
| **App size** | <50MB download. <200MB RAM at idle with one project loaded. |
| **Startup time** | App open to first process running: <3 seconds |
| **MCP latency** | Agent receives process status within 200ms of query |
| **Validation latency** | Worktree created and first test running within 10 seconds of trigger |
| **Privacy** | Code never leaves the machine in v1. No telemetry on code content, ever. |
| **Security** | workspace.yml changes after git pull require confirmation before execution |

---

## 10. Out of scope for v1

- **Remote/hosted execution.** Local only. Cloud MCP endpoint is v2.
- **Built-in AI models.** Users bring their own keys. No model vendor lock-in.
- **Custom workflow authoring.** The 17 Archon workflows plus whatever the agent naturally does.
- **Voice interface.** Not yet.
- **Team collaboration features.** Shared queues, permissions, audit dashboards. v2.
- **Windows and Linux desktop.** Mac ships first. The others follow.

---

## 11. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    TAURI DESKTOP SHELL                      │
│                                                             │
│   React UI                                                  │
│   ├── Agent panels (terminal per agent)                     │
│   ├── Process dashboard (status, logs, controls)            │
│   ├── Validation status (worktree, test results, PR link)   │
│   └── needsApproval prompts                                 │
│                                                             │
│   Rust core                                                 │
│   ├── Process spawning & lifecycle (cross-platform)         │
│   ├── File watching                                         │
│   ├── Terminal I/O                                          │
│   └── workspace.yml parsing                                 │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │  IPC
          ┌────────────┴────────────────────────┐
          │                                     │
          ▼                                     ▼
┌─────────────────────┐             ┌───────────────────────┐
│  Local MCP Server   │             │  Validation Engine    │
│                     │             │                       │
│  Exposes via MCP:   │             │  Vercel AI SDK 6      │
│  - process status   │             │  agent loop           │
│  - log streams      │◄────────────│  + Archon v2 engine   │
│  - restart control  │  reads      │  (TypeScript/Bun)     │
│                     │  state      │                       │
└─────────────────────┘             │  - Git worktrees      │
          ▲                         │  - Test runner        │
          │ connect                 │  - Repair loop        │
┌─────────────────────┐             │  - GitHub API         │
│  Running Agents     │             └───────────────────────┘
│                     │
│  Claude Code        │
│  Codex              │
│  Gemini CLI         │
│  Aider / custom     │
└─────────────────────┘
```

The Rust core handles everything that touches the OS. The TypeScript layer handles everything that touches AI. The two talk via Tauri's IPC bridge.

---

## 12. Phases

### Phase 1: Workspace layer (months 1–3) — ship this first

Build the Solo-equivalent. Process manager, terminal panels, unified dashboard, MCP bridge, workspace.yml. Mac only.

Goal: 500 developers using it daily just for the workspace features, before the validation layer is mature. This validates the market and generates feedback on what stacks and agents people actually run.

### Phase 2: Validation pipeline (months 4–6)

Wire Archon v2 into the desktop app as the validation engine. Worktrees, test running, repair loop, draft PR creation. Opt-in per project. AI SDK 6 manages the agent loop.

Goal: validation pipeline completes successfully on 80% of agent task completions in beta user repos.

### Phase 3: Windows and Linux (months 7–8)

The Rust core abstracts most platform differences. Windows `.cmd` wrapping and macOS stdin handling are solved at the Rust layer in phase 1. Linux is usually the easiest of the three.

### Phase 4: Cloud MCP + team features (months 9+)

Remote MCP endpoint so Cursor/Windsurf can access the validation workflows without the desktop app. Team workspace sharing, shared process configs, cloud execution queue for parallel validation runs.

---

## 13. Risks

| Risk | Mitigation |
|---|---|
| Agent output detection is hard — knowing when an agent "finished a task" is ambiguous | Manual trigger always available. Build heuristics: no agent output for 30s + files changed = probably done. Let users tune. |
| Tauri on Windows is more complex than macOS | Windows CI from day one in phase 1 even though we're not shipping yet. Catch issues early. |
| Archon v2 embeds awkwardly as a subprocess | Prototype this integration in week 1 before writing any UI code. This is the highest technical risk. |
| Solo ships a validation layer before we do | Possible. Differentiate on depth — their scope discipline works against them here. We go deeper on quality gates. |
| Developers don't want another app to manage | Position as the app that replaces 9 terminal tabs, not adds to them. Every install should close more windows than it opens. |

---

## 14. Open questions

1. **Name.** This isn't "Archon Lite" anymore — it's a standalone product that uses Archon as a backend. Needs its own identity.
2. **Pricing.** Free tier with N projects/processes (Solo's model works)? Paid validation pipeline? Decide before phase 2 ships.
3. **Agent output detection.** Heuristic vs explicit signal. Does the app intercept agent stdout to detect task completion, or do agents need to signal via MCP?
4. **Archon v2 embedding.** Does it run as a sidecar process or get compiled into the Tauri app? Sidecar is simpler to start; compiled is cleaner for distribution.
5. **Test runner auto-detection.** How opinionated do we get? Auto-detect based on package.json / Gemfile / pyproject.toml, or require explicit config?

---

## 15. What good looks like

A developer opens the app at 9am. Their Next.js app, Prisma, and a queue worker start automatically. Claude Code opens in the left panel, Codex in the right. Both agents can see the stack state.

By 9:15 Claude Code has finished implementing a new checkout flow. The validation pipeline fires without the developer doing anything — worktree, tests, lint, repair loop on one failing test, clean run on the second attempt. A draft PR opens at 9:22. The developer glances at it, merges it, moves on.

At 10:30 the queue worker crashes. The app restarts it in 3 seconds. Codex, which was mid-task, notices via MCP and factors the restart into its next tool call. The developer never knew it happened.

By the end of the day: 4 merged PRs, no broken builds, 9 fewer terminal tabs. The dev environment was a collaborator, not a liability.
