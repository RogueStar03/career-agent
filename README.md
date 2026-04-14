# career-agent

A Claude Code-powered job search assistant. Not a traditional app — a folder of markdown prompt files that turn Claude Code into a structured, repeatable job application pipeline.

Evaluates job descriptions, scores them against your profile, generates tailored CVs, tracks applications, preps interview stories, and drafts outreach — all from the terminal.

---

## How it works

This system runs entirely inside [Claude Code](https://claude.ai/code). The `modes/` folder contains prompt files that define how Claude behaves for each task. Your resume and preferences are configuration files Claude reads before every operation.

```
/career-agent onboard                 → first-run setup wizard        ✓
/career-agent story                   → build your STAR story bank    ✓
/career-agent eval <JD text or URL>   → score a job posting           ✓
/career-agent pdf <id>                → generate a tailored CV PDF    ✓
/career-agent prep <id>               → interview prep (maps stories) ✓
/career-agent scan                    → scan portals for new listings ✓
/career-agent outreach <id>           → draft outreach message        ✓
/career-agent research <id>           → deep company research         ✓
/career-agent status                  → show tracker summary          ✓
/career-agent verify                  → run data integrity checks     ✓
```

**New users: start with `/career-agent onboard`.** It builds your `cv.md` and `profile.yml` through conversation if you don't have them yet.

Paste a URL or raw JD text without a command and eval runs automatically.

---

## Setup

### 1. Prerequisites

- [Claude Code](https://claude.ai/code) installed and authenticated
- Node.js (for utility scripts)

### 2. Clone the repo

```bash
git clone https://github.com/your-username/career-agent.git
cd career-agent
npm install
```

### 3. Add your personal files

These files are gitignored — they stay local and never get committed.

```bash
cp cv.md.example cv.md
cp profile.yml.example profile.yml
```

Or skip this step and run `/career-agent onboard` — it will build both files through conversation.

### 4. Initialize data files

```bash
echo '{"applications": []}' > data/applications.json
echo '{"version": 1, "pending": []}' > data/pipeline.json
touch data/story-bank.md
touch data/user-patterns.md
```

### 5. Run onboarding

Open Claude Code in this directory and run:

```
/career-agent onboard
```

This sets up your profile, reviews or builds your CV, and walks you through what to do next. If you already have `cv.md` and `profile.yml` filled in, you can skip straight to `/career-agent story` to build your interview story bank.

---

## Project structure

```
modes/          Prompt files — one per command
templates/      Scoring weights, CV HTML template, portal list
scripts/        Node.js utility scripts (verify, export, etc.)
data/           Local-only: tracker, inbox, story bank (gitignored)
reports/        Local-only: one markdown report per evaluation (gitignored)
output/         Local-only: generated CV PDFs (gitignored)
cv.md           Local-only: your resume (gitignored)
profile.yml     Local-only: your preferences (gitignored)
```

---

## Evaluation scoring

Each job is scored across 7 dimensions (weights sum to 1.0):

| Dimension | Weight |
|---|---|
| Role Match | 0.20 |
| Tech Stack Fit | 0.20 |
| Compensation | 0.15 |
| Growth Potential | 0.15 |
| Company Stage | 0.10 |
| Remote Flexibility | 0.10 |
| Culture Signals | 0.10 |

Score 1–5 per dimension → weighted average → **Apply / Consider / Weak / Pass**

---

## Changelog

### 2026-04-14 — Beginner-friendly redesign + integrity fixes

**New modes**
- `modes/onboard.md` — first-run wizard: builds `cv.md` from scratch via Q&A or audits an existing one, sets up `profile.yml` with field-by-field explanations, generates `cv_digest`, suggests target roles
- `modes/story-bank.md` — deep Q&A story elicitation: asks open questions, probes for specifics, reflects back for verification, only structures into STAR after user confirms. Never generates a story the user didn't describe.

**Integrity fix (critical)**
- `modes/interview-prep.md` rewritten — no longer generates STAR stories from the CV. Now maps existing verified stories from `data/story-bank.md` to the role, and explicitly redirects gaps to `/career-agent story`. Fabrication is gone.

**Token efficiency**
- `modes/_context.md` restructured with mode tags — each mode now loads only the sections it needs (not the full file)
- `profile.yml` gains a `cv_digest` field — a short 2–3 sentence background summary. Light modes (scan, outreach, research, story-bank) read this instead of loading the full `cv.md`. Saves ~45–60% context per invocation for those commands.

**Empty file handling**
- Universal gate in `_context.md`: if any required file is missing or has placeholder values, all modes stop and offer two options — conversation fill or paste-in-file. Nothing proceeds on missing data.

**Adaptive system**
- `data/user-patterns.md` — new preference log. Modes append observed preferences; all modes read it at session start and apply preferences silently.
- All modes now end with a context-aware "what's next?" hint based on current tracker state.

**Scan improvements**
- Pre-scan targeting confirmation step: shows current targets from `profile.yml` before scanning, accepts session-only overrides without writing back to the file.

---

### 2026-04-10 — Phases 4–6 complete

- Added `modes/interview-prep.md`, `modes/scan.md`, `modes/outreach.md`, `modes/research.md`
- Added `templates/portals.yml` (8 companies + Wellfound queries), `data/scan-history.json`
- Updated `data/pipeline.json` (versioned schema), `modes/_context.md`, `CLAUDE.md`

### 2026-04-07 — Phase 3 complete

- Added `modes/tailor-cv.md`, PDF generation via Puppeteer, skill intersection logic
- Added `templates/cv-template.html`, `scripts/generate-pdf.mjs`

### 2026-04-07 — Phases 1–2 complete

- Core eval pipeline, scoring dimensions, `data/applications.json` tracker
- `modes/evaluate.md`, `modes/_context.md`, `templates/scoring.yml`

---

## Why Claude Code

This system uses Claude Code's slash command system, file context, and tool access rather than building a traditional app. The "code" is mostly markdown — prompt engineering as configuration. Easier to modify, extend, and understand than a brittle Python CLI.

---

## License

MIT
