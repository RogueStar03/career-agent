# Mode: evaluate

Load from _context.md: Universal gate + Required reads (heavy) + Core rules + Scoring dimensions + Output standards + Archetype classification

Evaluate a job description against the user's profile and produce a structured report.

## Input

The user provides one of:
- Raw JD text (pasted inline)
- A URL to a job posting (fetch the page and extract the JD)

## Steps

### Step 1: Load context
Read `cv.md` and `profile.yml`. Also read `data/user-patterns.md` (apply any noted preferences silently).
Universal gate applies — if either file is missing or has placeholders, stop and ask before proceeding.

### Step 2: Extract JD metadata
From the JD, extract:
- `company`: company name
- `role`: exact job title
- `location`: stated location / remote policy
- `stack`: technologies mentioned
- `compensation`: stated range if any, else "not stated"
- `team_size`: if mentioned
- `stage`: company stage signals (seed, series X, public, enterprise)
- `url`: if provided by user

### Step 3: Dealbreaker check
Compare extracted metadata against `profile.yml → dealbreakers`.
If ANY dealbreaker is triggered → open the report with:
```
⚠️ DEALBREAKER DETECTED: [which one and why]
Recommend: Skip unless dealbreaker can be negotiated.
```
Proceed with full evaluation anyway so Abhi has the data.

### Step 4: Classify archetype
Match JD stack/keywords to `profile.yml → archetypes`. State the primary archetype.

### Step 5: Score each dimension
For each dimension in _context.md, assign a score 1–5 and write 1–2 sentences of reasoning.
Calculate weighted overall score (round to 1 decimal).

### Step 6: Gap analysis
List the top 3 gaps between the JD requirements and Abhi's current skills/experience.
For each gap: assess whether it's a dealbreaker, a growth opportunity, or easily addressed.

### Step 7: Recommendation
Based on overall score:
- 4.0+ → **Apply** — strong fit, prioritize
- 3.0–3.9 → **Consider** — worth applying with tailored CV
- 2.0–2.9 → **Weak** — apply only if pipeline is thin
- <2.0 → **Pass** — not worth the time

Include a 2–3 sentence plain English summary of why.

### Step 8: Determine ID
Read `data/applications.json`. Find the highest existing ID, increment by 1.
If file doesn't exist or is empty, start at 001.

### Step 9: Write report
Save to `reports/{id}-{company-slug}-{YYYY-MM-DD}.md` using this template:

```markdown
# Evaluation: {Company} — {Role}

**ID:** {id}
**Date:** {YYYY-MM-DD}
**URL:** {url or "not provided"}
**Archetype:** {archetype}
**Overall Score:** {score}/5.0
**Recommendation:** Apply / Consider / Weak / Pass

---

{dealbreaker warning if applicable}

## Dimension Scores

| Dimension | Score | Notes |
|---|---|---|
| Role Match | X/5 | ... |
| Tech Stack Fit | X/5 | ... |
| Growth Potential | X/5 | ... |
| Company Stage | X/5 | ... |
| Compensation | X/5 | ... |
| Remote Flexibility | X/5 | ... |
| Culture Signals | X/5 | ... |

## JD Metadata

- **Company:** ...
- **Role:** ...
- **Location:** ...
- **Stack:** ...
- **Compensation:** ...

## Gap Analysis

1. **Gap:** ... | **Verdict:** dealbreaker / growth opportunity / easily addressed
2. ...
3. ...

## Summary

[2–3 plain English sentences]

## Next Steps

- [ ] Tailor CV: `/career-agent pdf {id}`
- [ ] Interview prep: `/career-agent prep {id}`
- [ ] Research company: `/career-agent research {id}`
- [ ] Draft outreach: `/career-agent outreach {id}`
```

### Step 10: Update tracker
Append to `data/applications.json`:
```json
{
  "id": "{id}",
  "company": "{company}",
  "role": "{role}",
  "url": "{url}",
  "source": "manual",
  "status": "evaluated",
  "score": {score},
  "scores": {
    "role_match": X,
    "tech_stack_fit": X,
    "growth_potential": X,
    "company_stage": X,
    "compensation": X,
    "remote_flexibility": X,
    "culture_signals": X
  },
  "archetype": "{archetype}",
  "date_found": "{YYYY-MM-DD}",
  "date_applied": null,
  "report_path": "reports/{filename}.md",
  "pdf_path": null,
  "notes": ""
}
```

### Step 11: Confirm to user
Print a short summary:
```
✓ Evaluation complete
  ID: {id} | Score: {score}/5 | Recommendation: {recommendation}
  Report: reports/{filename}.md
  Tracker updated: data/applications.json
```

### Step 12: What's next
Check `data/pipeline.json` for any pending items.
- If pending items exist: "You have {N} roles in the pipeline — run `/career-agent eval` on the next one, or `/career-agent pdf {id}` to tailor your CV for this role."
- If no pending items: "No other roles queued. Run `/career-agent scan` to find more, or `/career-agent pdf {id}` to prep your CV for this one."

If the recommendation was Apply or Consider, also note: "Run `/career-agent story` if you haven't built your story bank yet — you'll need it for behavioral interviews."
