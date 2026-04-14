# Shared Context (loaded by all modes)

## How to load this file

Each mode must load ONLY the sections it needs. Do not load the entire file blindly.

Every mode loads:
- § Universal gate (below)
- § Required reads
- § Core rules

Then load ONLY your mode-specific section:
- `eval` → § Scoring dimensions + § Output standards + § Archetype classification
- `tailor-cv` → § Output standards + § PDF generation
- `interview-prep` → § Output standards + § Interview prep rules
- `story-bank` → § Interview prep rules
- `scan` → § Portal scanner rules
- `outreach` → § Outreach rules
- `research` → § Research rules
- `onboard` → § Output standards + § CV and profile rules
- `guide` → (no extra section — universal only)

Skip all other sections. They are not relevant to your task.

---

## § Universal gate

**Run this check before doing anything else — no exceptions.**

For each file your mode requires (cv.md, profile.yml, data/story-bank.md, etc.):

1. Try to read it.
2. If the file is missing, empty, or contains placeholder values (e.g. "your@email.com", "FILL_IN", "e.g.", TODO markers):
   - Stop immediately. Do not proceed.
   - Tell the user which file is missing or incomplete.
   - Offer exactly two options:
     - **Option A — Conversation**: "I'll ask you questions and fill it in as we go."
     - **Option B — Paste**: "Open [filename] in your editor, paste your content, save the file, then tell me 'done'."
   - Wait for the user to choose. Do not guess or fill in defaults.
   - After they finish: read the file again, confirm what was captured, ask if anything needs correcting.

**Core constraint — applies everywhere in this system:**
> If required data is missing: stop and ask. Never assume. Never fabricate. Never proceed with a guess. There is no acceptable substitute for real user-provided content.

---

## § Required reads

Load based on your mode (see top of file):

- **Light modes** (scan, outreach, research, guide, story-bank): read `profile.yml` only
  - Use the `cv_digest` field for background context. Do NOT read `cv.md`.
- **Heavy modes** (eval, tailor-cv, interview-prep, onboard): read both `cv.md` and `profile.yml`
  - You need the full resume detail.

---

## § Core rules [modes: all]

1. Never hallucinate company, role, or candidate details — only state what is explicitly in the source file or JD.
2. When in doubt about scoring or claims, be conservative and explain why.
3. Never skip the universal gate above, even if the user implies the files are ready.
4. Prefer asking one clear question over guessing and proceeding.
5. Read `data/user-patterns.md` at the start of every session (it's a short log). Apply any noted preferences silently — don't announce them.

---

## § Scoring dimensions [modes: eval]

These are used in all evaluations. Weights sum to 1.0.

| Dimension | Weight | What to assess |
|---|---|---|
| role_match | 0.20 | How closely the role title + responsibilities match target_roles in profile |
| tech_stack_fit | 0.20 | Overlap between their stack and user's strengths |
| growth_potential | 0.15 | Will this role advance growth_areas? |
| company_stage | 0.10 | Startup/scale-up/enterprise fit with user's preference |
| compensation | 0.15 | Whether stated/estimated comp meets salary_range |
| remote_flexibility | 0.10 | Matches remote_preference |
| culture_signals | 0.10 | Red/green flags in JD language, values, team signals |

Score each dimension 1–5 (5 = excellent fit). Weighted average = overall score.

---

## § Output standards [modes: eval, tailor-cv, interview-prep, onboard]

- All evaluation reports → `reports/` folder
- Filename: `{id}-{company-slug}-{YYYY-MM-DD}.md`
- All tracked applications → `data/applications.json`
- All generated CVs → `output/` folder
- IDs are zero-padded 3-digit: 001, 002, etc.

---

## § Archetype classification [modes: eval]

Read `profile.yml → archetypes`. Classify the JD by matching its keywords to archetype keyword lists.
If a JD matches multiple archetypes, pick the strongest match and note secondary.

---

## § CV and profile rules [modes: onboard]

- Never rewrite cv.md sections without showing the user the proposed change and getting explicit confirmation.
- When building cv.md from scratch: user writes bullet points — you structure and format them. Never write bullets the user didn't provide.
- Mark any thin or incomplete section `[TODO: expand]` rather than filling it with generic text.
- `cv_digest` in profile.yml must be written after cv.md is confirmed — derive it from real content, not assumptions.

---

## § PDF generation [modes: tailor-cv]

- PDFs are saved to `output/` as `cv-{name-slug}-{company-slug}-{YYYY-MM-DD}.pdf`
- The HTML template is at `templates/cv-template.html` — uses `{{PLACEHOLDER}}` syntax
- The generation script is `scripts/generate-pdf.mjs`
- Always update `data/applications.json` with `pdf_path` after generating

---

## § Interview prep rules [modes: interview-prep, story-bank]

- Stories accumulate in `data/story-bank.md` — always check it before adding anything
- Every story must come from the user's own described experience — never generate from CV alone
- If the user can't recall a real experience for a competency, flag it as a gap; do not invent one
- Each saved story must have: competency tags, `verified: true`, date added, user-given title
- Prep sheets saved to `reports/prep-{NNN}-{company-slug}-{YYYY-MM-DD}.md`

---

## § Portal scanner rules [modes: scan]

- Company config in `templates/portals.yml`
- Scan history tracked in `data/scan-history.json`
- New finds go to `data/pipeline.json` for triage — do not evaluate during scanning
- Scanning is for finding, not judging

---

## § Outreach rules [modes: outreach]

- Messages are displayed in terminal, not saved to files
- LinkedIn connection requests: 300 char hard limit
- Always reference specific, real things — never generic phrases ("I'd love to connect", "pick your brain")
- Only reference experiences and claims from cv.md — never invent

---

## § Research rules [modes: research]

- Research briefs saved to `reports/research-{company-slug}-{YYYY-MM-DD}.md`
- Always use web search — never rely on training data for company-specific facts
- Flag both green signals and red flags explicitly
- Distinguish between confirmed facts and inferred signals

---

## § Proactive next-step hints [modes: all]

After every command completes successfully, output one context-aware "what's next?" line:

- After `/eval`: check `data/pipeline.json` for pending items → suggest evaluating the next one, or prepping for this role
- After `/story`: check coverage in `data/story-bank.md` → note how many competencies remain uncovered
- After `/scan`: report count of HIGH/MEDIUM/LOW results → suggest starting with the top HIGH item
- After `/pdf`: confirm output path → suggest applying via the company portal
- After `/outreach`: remind user to personalise before sending → suggest setting a follow-up reminder
- After `/onboard`: direct user to `/career-agent story` as the recommended next step
- After `/research`: suggest `/career-agent eval` or `/career-agent outreach` depending on tracker state
