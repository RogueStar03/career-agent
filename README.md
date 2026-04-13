# career-agent

A Claude Code-powered job search assistant. Not a traditional app — a folder of markdown prompt files that turn Claude Code into a structured, repeatable job application pipeline.

Evaluates job descriptions, scores them against your profile, generates tailored CVs, tracks applications, preps interview stories, and drafts outreach — all from the terminal.

---

## How it works

This system runs entirely inside [Claude Code](https://claude.ai/code). The `modes/` folder contains prompt files that define how Claude behaves for each task. Your resume and preferences are configuration files Claude reads before every operation.

```
/career-agent eval <JD text or URL>   → score a job posting          ✓
/career-agent pdf <id>                → generate a tailored CV PDF    ✓
/career-agent status                  → show tracker summary          ✓
/career-agent verify                  → run data integrity checks     ✓
/career-agent prep <id>               → interview prep (STAR stories) ✓
/career-agent scan                    → scan portals for new listings ✓
/career-agent outreach <id>           → draft outreach message        ✓
/career-agent research <id>           → deep company research         ✓
```

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

Edit both files:
- **`cv.md`** — your full resume in markdown
- **`profile.yml`** — target roles, salary range, dealbreakers, skill archetypes

### 4. Initialize data files

```bash
echo '{"applications": []}' > data/applications.json
echo '{"urls": []}' > data/pipeline.json
touch data/story-bank.md
```

### 5. Run your first evaluation

Open Claude Code in this directory and run:

```
/career-agent eval <paste a job description here>
```

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

## Why Claude Code

This system uses Claude Code's slash command system, file context, and tool access rather than building a traditional app. The "code" is mostly markdown — prompt engineering as configuration. Easier to modify, extend, and understand than a brittle Python CLI.

---

## License

MIT
