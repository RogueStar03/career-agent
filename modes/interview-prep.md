# Mode: Interview Prep

Load from _context.md: Universal gate + Required reads (heavy) + Core rules + Output standards + Interview prep rules

## Trigger
User says "/career-agent prep", "/career-agent prep {id}", or "interview prep", "prepare for interview"

## Input
- `/career-agent prep {id}` — prep for application #{id} (reads its report from reports/)
- `/career-agent prep` with a JD pasted — prep from scratch
- If neither, ask the user which role they're preparing for

---

## Step 1 — Load context

Read:
- `cv.md` — full resume (heavy mode — needed for accurate technical prep)
- `profile.yml` — background and targets
- `data/story-bank.md` — existing verified stories (check competency coverage before anything else)
- If id given: read the corresponding report from `reports/`

---

## Step 2 — Analyze the role

From the JD or evaluation report, identify:
- **Key behavioral competencies** the role emphasizes
- **Technical topics** likely to come up in screening
- **Seniority signals** — what depth of answers they expect
- **Team/org context** — what the team does, who the user would work with

---

## Step 3 — Behavioral prep

**Do not generate stories. Surface existing ones or initiate story collection.**

### 3a. Check story bank coverage against this role

Read `data/story-bank.md`. For each behavioral competency the role emphasizes, check if a verified story already covers it.

Show the user a quick coverage table:

```
Competency (role needs)     Story available?
─────────────────────────────────────────────
Problem-solving             ✓ "prod outage fix" — use this
Collaboration               ✓ "sprint planning conflict" — use this
Conflict                    ✗ — not in story bank
Failure                     ✓ "missed deadline recovery" — use this
```

### 3b. For competencies with existing stories — map them

For each covered competency, show:
```
Q: "[Likely behavioral question for this role]"
Story to use: "[title from story bank]"
Angle to emphasize: [which part of the story is most relevant to this specific JD]
```

Do not rewrite or paraphrase the story — the user already has it in story-bank.md and knows it.

### 3c. For gaps — redirect to story-bank mode

For any competency NOT covered in the story bank:

> "I don't have a verified story for [competency] in your story bank yet. I can't generate one — that would be made up. Two options:
> 1. Run `/career-agent story` now and we'll build a real story for this competency together.
> 2. Skip it for now and note it as a gap going into this interview."

Ask the user which they prefer. Do not proceed past this for the missing competency.

---

## Step 4 — Technical prep

Based on the JD's tech requirements and `cv.md`:

List 3–5 technical topics likely to come up. For each:
- One-line summary of what to review
- Suggested depth: surface / working knowledge / deep dive
- Flag any `growth_areas` from `profile.yml` — these deserve extra prep time

---

## Step 5 — Questions to ask them

Generate 3–4 thoughtful questions to ask the interviewer:
- Show you've read the JD carefully
- Probe for team culture, growth, and day-to-day reality
- Avoid questions easily answered by the company website

---

## Step 6 — Save

Save the full prep sheet to `reports/prep-{NNN}-{company-slug}-{YYYY-MM-DD}.md`

Format:
```markdown
# Interview Prep — {Company} — {Role}
Date: {YYYY-MM-DD}

## Behavioral stories mapped
[coverage table + question-to-story mapping from Step 3b]

## Gaps to address
[any competencies without a story — link to /career-agent story]

## Technical prep
[Step 4 output]

## Questions to ask
[Step 5 output]
```

Confirm: "Prep sheet saved to reports/. {X} competencies covered by existing stories, {Y} gaps flagged."

---

## What's next

After saving, output:
- If gaps exist: "Run `/career-agent story` to fill [competency] before your interview."
- If all covered: "Your story bank has you covered. Review your stories in `data/story-bank.md` — remember to tell them naturally, not from memory."
