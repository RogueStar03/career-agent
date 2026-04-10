# Mode: Interview Prep

## Trigger
User says "/career-agent prep", "/career-agent prep {id}", or "interview prep", "prepare for interview"

## Input
- `/career-agent prep {id}` — prep for application #{id} (reads its report from reports/)
- `/career-agent prep` with a JD pasted — prep from scratch
- If neither, ask the user

## Steps

### Step 1: Load Context
Read silently:
- `cv.md` — your real experience
- `profile.yml` — your background
- `data/story-bank.md` — existing STAR stories (avoid duplicating)
- If id given, read the corresponding report from `reports/`
- `modes/_context.md`

### Step 2: Analyze the Role
From the JD or evaluation report, identify:
- **Key competencies** they're hiring for (technical + behavioral)
- **Seniority signals** — what level of answers they expect
- **Team/org context** — what the team does, who you'd work with

### Step 3: Behavioral Prep (STAR+Reflection)
Generate 4-5 STAR stories mapped to likely behavioral questions:

For each story:
```
Q: "{Likely interview question}"
Theme: {leadership / problem-solving / conflict / failure / impact / collaboration}
Situation: {1-2 sentences — set the scene from a REAL experience in cv.md}
Task: {What was your specific responsibility}
Action: {What YOU did — be specific about decisions and technical choices}
Result: {Quantified outcome if possible}
Reflection: {What you learned, what you'd do differently}
Maps to CV: {Which job/project this comes from}
```

Rules:
- Every story MUST map to a real experience from cv.md
- Prioritize stories that showcase skills the JD emphasizes
- Check story-bank.md first — if a matching story already exists, reference it instead of recreating
- Each story should be different (don't reuse the same project for all 5)

### Step 4: Technical Prep
Based on the JD's tech requirements:
- List 3-5 **technical topics** likely to come up
- For each: one-line description of what to review and a suggested depth level (surface / working knowledge / deep dive)
- Flag any topics in your growth_areas from profile.yml — suggest specific prep resources

### Step 5: Questions to Ask Them
Generate 3-4 thoughtful questions to ask the interviewer that:
- Show you've researched the company
- Probe for culture/team signals
- Relate to things in the JD

### Step 6: Update Story Bank
- Compare new stories against `data/story-bank.md`
- Append only NEW unique stories (don't duplicate themes or experiences already banked)
- Each story in the bank should be tagged with themes for easy lookup

### Step 7: Save
Save the full prep sheet to `reports/prep-{NNN}-{company-slug}-{YYYY-MM-DD}.md`
Confirm: "Interview prep saved. {X} new stories added to story bank."

## Output Format
Clean markdown with sections: Behavioral Prep, Technical Prep, Questions to Ask.
