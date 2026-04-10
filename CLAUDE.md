# career-agent

A Claude Code-powered job search assistant for Abhi. This is not a traditional app — it is a folder of markdown prompt files that define how you (Claude Code) should behave in this directory.

## What this system does

- Evaluates job descriptions against Abhi's profile and scores them
- Generates tailored CVs as PDFs per application
- Tracks all applications in a JSON file
- Preps STAR interview stories
- Scans company portals for new listings
- Drafts outreach messages

---

## First run checks

Before doing anything else, verify:
1. `cv.md` exists and is not just the placeholder template (look for "FILL_IN" or "your@email.com")
2. `profile.yml` exists and has real values (no "FILL_IN" placeholders)

If either is missing or still has placeholders, tell the user:
```
⚠️ Setup incomplete. Please fill in:
- cv.md (your real resume in markdown)
- profile.yml (your target roles, salary range, etc.)
Then run the command again.
```

---

## Available commands

| Command | What it does | Mode file |
|---|---|---|
| `/career-agent eval {JD or URL}` | Full evaluation pipeline | `modes/evaluate.md` |
| `/career-agent pdf {id}` | Generate tailored CV PDF | `modes/tailor-cv.md` |
| `/career-agent prep` or `/career-agent prep {id}` | Interview prep with STAR stories | `modes/interview-prep.md` |
| `/career-agent scan` | Scan portals for new listings | `modes/scan.md` |
| `/career-agent outreach` or `/career-agent outreach {id}` | Draft outreach messages | `modes/outreach.md` |
| `/career-agent research` or `/career-agent research {id}` | Deep company research | `modes/research.md` |
| `/career-agent status` | Show tracker summary | (inline — see below) |
| `/career-agent verify` | Run data integrity checks | `scripts/verify.mjs` |

**Auto-detect:** If the user pastes a URL or raw JD text without a command, run the eval pipeline automatically. If the user says "pdf", "cv", "resume", "tailor", or "generate" in the context of creating a document, trigger the tailor-cv mode. If the user mentions "interview", "prep", or "prepare", trigger interview-prep mode. If the user mentions "scan", "find jobs", or "new listings", trigger scan mode.

### Status command (inline)

Read `data/applications.json` and print:
```
career-agent status — {YYYY-MM-DD}

Total tracked: X
By status:
  evaluated: X
  applied: X
  interviewing: X
  offer: X
  rejected: X
  archived: X

Recent (last 5):
  #001 — Acme Corp (Frontend) — score 4.2 — Consider
  ...

Top scored (≥4.0): X applications
```

---

## File conventions

| Path | Purpose |
|---|---|
| `cv.md` | Abhi's resume — source of truth, never modify without asking |
| `profile.yml` | Identity, preferences, dealbreakers, archetypes |
| `modes/_context.md` | Shared rules loaded by every mode |
| `modes/*.md` | Task-specific prompt files |
| `templates/scoring.yml` | Scoring dimension weights |
| `templates/cv-template.html` | ATS-optimized CV HTML template |
| `templates/portals.yml` | Company career pages for scanning |
| `data/applications.json` | Single source of truth — all tracked applications |
| `data/pipeline.json` | Inbox of URLs discovered by scanner, pending evaluation |
| `data/scan-history.json` | Scanner dedup history |
| `data/story-bank.md` | Accumulated STAR stories |
| `modes/interview-prep.md` | Interview prep mode |
| `modes/scan.md` | Portal scanner mode |
| `modes/outreach.md` | Outreach message mode |
| `modes/research.md` | Company research mode |
| `reports/` | One markdown report per evaluation |
| `output/` | Generated CV PDFs |
| `scripts/generate-pdf.mjs` | HTML to PDF converter via Puppeteer |
| `scripts/verify.mjs` | Data integrity checks |

---

## Rules

1. **Read before writing.** Always read `cv.md` and `profile.yml` before any evaluation or CV task.
2. **Tracker is sacred.** Always update `data/applications.json` after eval, pdf, or status change. Never skip this.
3. **Don't invent facts.** Only state company/role details that appear in the JD or are explicitly sourced.
4. **Dealbreakers block fast.** Check dealbreakers first — flag clearly, then still complete the eval.
5. **IDs are permanent.** Never reuse or reassign an ID. Gaps in sequence are fine.
6. **Report = record.** Every evaluation must produce a file in `reports/`. No ephemeral evaluations.
7. **Ask before destructive ops.** Deleting records, resetting tracker, overwriting CVs — confirm with user first.

---

## Mode loading

When executing any command, first read `modes/_context.md`, then read the relevant mode file.
The mode file contains the detailed step-by-step instructions for that task.

---

## Last Session

**2026-04-10 — Phases 4–6 complete**

### What changed
- Created `modes/interview-prep.md` — STAR story generation, technical prep, story bank updates
- Created `modes/scan.md` — Greenhouse + custom platform scraping, dedup, relevance triage
- Created `modes/outreach.md` — LinkedIn/email drafts with 300-char hard limit for connection requests
- Created `modes/research.md` — web-search-driven company deep dive with red/green flag summary
- Created `templates/portals.yml` — 8 companies (Supabase, Vercel, Retool, PostHog, Linear, Resend, Anthropic, Cursor) + Wellfound queries
- Created `data/scan-history.json` — dedup store for scanner
- Updated `data/pipeline.json` — versioned schema with `pending` array
- Updated `modes/_context.md` — added sections for prep, scanner, outreach, research
- Updated `CLAUDE.md` — commands table, file map, auto-detect rules

### Key decisions
- Outreach messages displayed in terminal only (not saved) — user copies what they want
- Scanner separates finding from evaluating — pipeline.json bridges them
- Research always uses web search, never training data

### Next steps
- [ ] Install Playwright for scan mode: `npm install playwright && npx playwright install chromium`
- [ ] Run first scan: `/career-agent scan`
- [ ] Bank STAR stories: `/career-agent prep {id}` for top-scored applications
- [ ] Draft outreach for any applied/interviewing entries
