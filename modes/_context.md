# Shared Context (loaded by all modes)

## Required reads before any task

You MUST read these files at the start of every mode:
1. `cv.md` — Abhi's full resume (source of truth for experience, skills, projects)
2. `profile.yml` — Target roles, salary, preferences, dealbreakers, archetypes

## Scoring dimensions

These are used in all evaluations. Weights sum to 1.0.

| Dimension | Weight | What to assess |
|---|---|---|
| role_match | 0.20 | How closely the role title + responsibilities match target_roles in profile |
| tech_stack_fit | 0.20 | Overlap between their stack and Abhi's strengths |
| growth_potential | 0.15 | Will this role advance growth_areas? |
| company_stage | 0.10 | Startup/scale-up/enterprise fit with Abhi's preference |
| compensation | 0.15 | Whether stated/estimated comp meets salary_range |
| remote_flexibility | 0.10 | Matches remote_preference |
| culture_signals | 0.10 | Red/green flags in JD language, values, team signals |

Score each dimension 1–5 (5 = excellent fit). Weighted average = overall score.

## Output standards

- All evaluation reports → `reports/` folder
- Filename: `{id}-{company-slug}-{YYYY-MM-DD}.md`
- All tracked applications → `data/applications.json`
- All generated CVs → `output/` folder
- IDs are zero-padded 3-digit: 001, 002, etc.

## Archetype classification

Read `profile.yml → archetypes`. Classify the JD by matching its keywords to archetype keyword lists.
If a JD matches multiple archetypes, pick the strongest match and note secondary.

## Rules

1. Always read cv.md and profile.yml before evaluating — never guess at Abhi's background
2. Always check if a dealbreaker is present — if yes, flag prominently at the top
3. Always save evaluation output to both reports/ (markdown) and data/applications.json
4. Never hallucinate company details — only state what's in the JD or explicitly sourced
5. When in doubt about scoring, be conservative (lower) and explain why

## PDF Generation

- PDFs are saved to `output/` as `cv-abhi-{company-slug}-{YYYY-MM-DD}.pdf`
- The HTML template is at `templates/cv-template.html` — uses `{{PLACEHOLDER}}` syntax
- The generation script is `scripts/generate-pdf.mjs`
- Always update `data/applications.json` with `pdf_path` after generating

## Interview Prep
- Prep sheets saved to `reports/prep-{NNN}-{company-slug}-{YYYY-MM-DD}.md`
- STAR stories accumulate in `data/story-bank.md` — always check before adding duplicates
- Every story must map to a real experience from cv.md

## Portal Scanner
- Company config in `templates/portals.yml`
- Scan history tracked in `data/scan-history.json`
- New finds go to `data/pipeline.json` for triage
- Scanning is for finding, not evaluating

## Outreach
- Messages are displayed in terminal, not saved to files
- LinkedIn connection requests: 300 char hard limit
- Always reference specific things, never be generic

## Research
- Research briefs saved to `reports/research-{company-slug}-{YYYY-MM-DD}.md`
- Always use web search, don't rely on training data
- Flag both green and red flags
