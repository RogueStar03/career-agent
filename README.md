# career-agent

**Your job search, run like a system.**

No app. No dashboard. No SaaS subscription. Just Claude Code reading your CV, scoring job postings, generating tailored PDFs, and prepping your interviews — all from the terminal, all from a folder of markdown prompt files.

The intelligence is in the prompts. The data stays local.

---

## What it does

```
/career-agent onboard                 → first-run setup — builds cv.md + profile from scratch
/career-agent story                   → build your STAR story bank (real ones, not fabricated)
/career-agent eval <JD or URL>        → score a job posting across 7 dimensions
/career-agent pdf <id>                → generate a tailored CV PDF
/career-agent prep <id>               → interview prep — maps your stories to the role
/career-agent scan                    → scan company portals for new listings
/career-agent outreach <id>           → draft a cold outreach message
/career-agent research <id>           → deep company research via web
/career-agent status                  → tracker summary
/career-agent verify                  → data integrity check
```

Paste a URL or raw JD without a command → eval runs automatically.

**First time? Start with `/career-agent onboard`.** It asks what it needs and builds your profile through conversation.

---

## Setup

### Prerequisites

- [Claude Code](https://claude.ai/code) installed and authenticated
- Node.js 18+

### Install

```bash
git clone https://github.com/your-username/career-agent.git
cd career-agent
npm install
```

For portal scanning (optional):

```bash
npx playwright install chromium
```

### Initialize data files

```bash
echo '{"applications": []}' > data/applications.json
echo '{"version": 1, "pending": []}' > data/pipeline.json
touch data/story-bank.md data/user-patterns.md
```

### Run

Open Claude Code in this directory:

```
/career-agent onboard
```

If you already have a CV and know what you're after, skip to `/career-agent story` to build your interview bank first — it's the most valuable step before applying anywhere.

---

## How scoring works

Every eval scores the role across 7 dimensions, weighted average → recommendation.

| Dimension | Weight |
|---|---|
| Role Match | 0.20 |
| Tech Stack Fit | 0.20 |
| Compensation | 0.15 |
| Growth Potential | 0.15 |
| Company Stage | 0.10 |
| Remote Flexibility | 0.10 |
| Culture Signals | 0.10 |

**4.0+** Apply · **3.0–3.9** Consider · **2.0–2.9** Weak · **< 2.0** Pass

---

## Project structure

```
modes/          One prompt file per command — this is where the logic lives
templates/      Scoring config, CV HTML template, portal list
scripts/        Node.js utility scripts (PDF generation, verify)
data/           Local only — tracker, inbox, story bank, user patterns (gitignored)
reports/        Local only — one markdown report per eval (gitignored)
output/         Local only — generated CV PDFs (gitignored)
cv.md           Local only — your resume, source of truth (gitignored)
profile.yml     Local only — targets, dealbreakers, salary range (gitignored)
```

---

## Changelog

### 2026-04-14 — Integrity overhaul + token efficiency

**Anti-fabrication fix (critical)**
Interview prep previously generated STAR stories extrapolated from your CV. They looked right. They were made up. Rewritten so it maps only verified stories from your story bank to the role — if there are none, it redirects you to `/career-agent story` instead of inventing them.

**Token efficiency**
Light modes (outreach, scan, research, story-bank) no longer load the full `cv.md`. They read a `cv_digest` — a 2–3 sentence summary in `profile.yml`. Context reduction: **45–60% per light-mode invocation**.

Full application cycle benchmark (eval → tailored CV → outreach → interview prep): ~29k tokens on Sonnet 4.6.

**Onboarding wizard**
`/career-agent onboard` — new first-run mode. Builds `cv.md` from scratch via Q&A if you don't have one, or audits an existing one. Sets up `profile.yml` field by field with explanations. Generates `cv_digest`. Suggests target roles.

**Story bank**
`/career-agent story` — new mode. Asks open questions, probes for specifics, reflects back, structures into STAR only after you confirm. Never generates a story you didn't describe.

**Empty file gate**
All modes now stop immediately if required files are missing or contain placeholder values. No silent failures.

**Adaptive preferences**
`data/user-patterns.md` — modes append observed preferences (tone, role targets, recurring feedback). All modes read it at session start and apply preferences silently.

---

### 2026-04-10 — Phases 4–6

- Added `interview-prep`, `scan`, `outreach`, `research` modes
- Portal list (`templates/portals.yml`) with 8 companies + Wellfound queries
- Versioned `data/pipeline.json` schema for scan inbox

### 2026-04-07 — Phase 3

- CV tailoring mode + Puppeteer PDF generation
- ATS-optimized HTML template (`templates/cv-template.html`)

### 2026-04-07 — Phases 1–2

- Core eval pipeline, 7-dimension scoring system
- `data/applications.json` as single application tracker

---

## Why not just build an app

The prompt files are the product. Modifying how eval works means editing a markdown file. Adding a new command means writing a new prompt. No build step, no deployment, no framework to fight.

The tradeoff: everything is a manual Claude Code session. Nothing runs in the background. If that's a dealbreaker, this isn't the right tool.

---

## License

MIT
