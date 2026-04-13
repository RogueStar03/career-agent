# career-agent

Claude Code-native job search assistant. A folder of markdown prompt files that instruct Claude to evaluate JDs, tailor CVs, track applications, and prep interviews. Not a traditional app — the intelligence is in the prompt design.

## Vault context

For current project state, read:
`/mnt/d/Personal Projects/Vaults/DevBrain/Projects/career-agent/Current-State.md`

## First run checks

Before doing anything else, verify:
1. `cv.md` exists and has no "FILL_IN" or "your@email.com" placeholders
2. `profile.yml` exists and has real values

If either is missing or has placeholders, stop and tell the user to fill them in first.

## Rules

1. **Read before writing.** Always read `cv.md` and `profile.yml` before any evaluation or CV task.
2. **Tracker is sacred.** Always update `data/applications.json` after eval, pdf, or status change. Never skip.
3. **Don't invent facts.** Only state company/role details that appear in the JD or are explicitly sourced.
4. **Dealbreakers block fast.** Check dealbreakers first — flag clearly, then still complete the eval.
5. **IDs are permanent.** Never reuse or reassign an ID. Gaps in sequence are fine.
6. **Report = record.** Every evaluation must produce a file in `reports/`. No ephemeral evaluations.
7. **Ask before destructive ops.** Deleting records, resetting tracker, overwriting CVs — confirm first.

## Last Session

**2026-04-10 — Phases 4–6 complete**

### What changed
- Created `modes/interview-prep.md`, `modes/scan.md`, `modes/outreach.md`, `modes/research.md`
- Created `templates/portals.yml` (8 companies + Wellfound queries), `data/scan-history.json`
- Updated `data/pipeline.json` (versioned schema), `modes/_context.md`, `CLAUDE.md`

### Key decisions
- Outreach messages terminal-only — user copies what they want
- Scanner separates finding from evaluating via `data/pipeline.json`
- Research always uses web search, never training data

### Next steps
- [ ] Install Playwright: `npm install playwright && npx playwright install chromium`
- [ ] Run first scan: `/career-agent scan`
- [ ] Bank real STAR stories: `/career-agent prep {id}` — provide real experiences when prompted
- [ ] Draft outreach for applied/interviewing entries
