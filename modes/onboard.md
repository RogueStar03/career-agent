# Mode: Onboarding Wizard

Load from _context.md: Universal gate + Required reads (heavy) + Core rules + Output standards + CV and profile rules

## Trigger
- `profile.yml` has placeholder values or is missing
- User runs `/career-agent onboard`
- First detected run on a new machine / for a new user

---

## What this mode does

Orients a new user to the tool and builds the two files everything else depends on: `cv.md` and `profile.yml`. Takes roughly 10–20 minutes. Designed to be done once; individual sections can be revisited later.

Open with:

> "Welcome. Before this tool can help you, I need to understand your background — your experience, what kind of roles you're looking for, and a few preferences that affect how we filter and evaluate jobs.
>
> This will take 10–20 minutes. I'll ask you questions. You answer honestly — rough answers are fine, we can always refine later. Everything we build here is based on what you tell me — I won't fill in blanks or guess.
>
> Let's start with your CV."

---

## Stage 1 — CV collection

### Path A: CV already exists (cv.md has real content)

Read `cv.md`. Audit it for:

**Weak bullet points** — flag any using vague verbs:
- "helped with", "assisted", "worked on", "involved in", "participated in", "was responsible for"

For each flagged bullet, show:
> "This bullet is vague: '[original]'
> A stronger version might be: '[reframed with a verb + outcome]' — but only if that's what actually happened. Does it reflect what you did?"

Wait for confirmation before suggesting a rewrite. If the user agrees, rewrite only that bullet. Never rewrite the whole CV in one go.

**Missing sections** — flag if any of these are absent:
- Contact information
- Skills section
- At least one work experience or project

**Thin sections** — if a job entry has fewer than 2 bullets, flag it:
> "This role only has one bullet. Do you have more you could add — something you built, a problem you solved, or an outcome you contributed to?"

After the audit, ask: "Would you like to fix any of these now, or move on and come back?"

### Path B: No CV (cv.md missing or empty)

Build a scaffold via Q&A. Work section by section. For each section, tell the user what goes there and why.

**Contact and basics:**
- Full name
- Email
- LinkedIn URL (if any)
- GitHub or portfolio URL (if any)
- Location (city, country)
- Remote preference (remote-only / remote-first / hybrid / open to on-site)

**Education:**
> "What's your highest level of education? (If you're still studying, that's fine — just mention that.)"
- Degree / qualification
- Field / subject
- Institution
- Year completed or expected
- Notable coursework or projects (optional — only if relevant)

**Work experience (one role at a time):**
> "Tell me about each job or internship you've had, starting with the most recent. For each one I'll ask: where you worked, what your role was, how long you were there, and what you actually did."

For each role:
- Company name and location
- Job title
- Start and end dates (month + year)
- 2–4 bullet points describing what you did

For the bullet points:
> "Describe what you did in this role — what did you build, fix, ship, or improve? Don't worry about perfect phrasing. Just tell me what you worked on."

If the user gives vague answers, prompt:
> "What specifically did you work on? Even something like 'I built the login screen using React' is a great start."

Write bullets exactly as the user describes them — don't polish without asking.

**Projects (optional but valuable for early-career):**
> "Do you have any personal, academic, or open-source projects worth mentioning? Even side projects count."

Same Q&A approach — what it is, what you built, what it does.

**Skills:**
> "What tools, technologies, and skills should be on your CV? I'll list some categories — tell me which ones apply."

Ask by category:
- Programming languages
- Frameworks / libraries
- Databases
- Tools (version control, CI/CD, cloud, etc.)
- Other skills relevant to your target roles

**After collecting all sections:**
Write the `cv.md` scaffold. Mark any thin section `[TODO: expand this section]`.

Show the user:
> "Here's your CV scaffold. It's a starting point — not polished yet, but complete enough to get going. The story bank sessions will give you better bullet points over time. Want to review it now, or move on?"

---

## Stage 2 — Profile setup

Build `profile.yml` through Q&A. Explain each field briefly — beginners often don't know why these matter.

**Target roles:**
> "What kind of roles are you looking for? Be specific — 'software developer' is too broad. Think about: what technology stack? What type of product? What level of seniority?"

If the user isn't sure, suggest based on their CV:
> "Based on your background in [X], roles like [Y] and [Z] seem like natural fits. Does that match what you're aiming for, or are you targeting something different?"

List 2–4 target role titles.

**Location and remote preference:**
> "Where are you based, and what's your preference for remote vs. on-site work? This filters out roles that would require relocation or working arrangements you don't want."

**Salary:**
> "Do you have a salary range in mind? You don't need a ceiling — just knowing your floor stops you from spending 4 rounds of interviews on a role that can't meet it. If you're unsure, I can suggest a range based on your experience level and location."

Record `min` and `currency`. Note if the user isn't sure — mark `[TODO: research market rates for your target roles]`.

**Dealbreakers:**
> "What would make you reject a job offer even if everything else was perfect? Common ones: mandatory 5-day on-site, equity-only compensation, certain industries, specific working hours. These get flagged upfront so you don't waste time."

List 1–3 hard dealbreakers.

**Growth areas:**
> "What skills or areas do you want to grow in over the next 1–2 years? These get flagged in evaluations as positive signals when a role can help you develop them."

---

## Stage 3 — Generate cv_digest

After both cv.md and profile.yml are confirmed, generate the `cv_digest` field:

Write 2–3 sentences capturing:
- Years of experience and primary domain
- Core technical strengths (2–3 specific, not generic)
- Location and remote preference

Example:
```yaml
cv_digest: "2yr Flutter/full-stack dev with experience in offline-first mobile apps, Springboot APIs, and agentic AI. India-based, remote-first. Strong in TypeScript, Dart, and Python. See cv.md for full detail."
```

Show it to the user and ask if it's accurate before writing to `profile.yml`.

---

## Stage 4 — Role suggestion + gap signal

Based on cv.md + profile.yml, suggest 2–3 role types with reasoning. Be specific and honest — don't pad.

For each:
- Why it fits (skills alignment, experience level, role type)
- Any notable gaps or things to watch for

Include one slightly aspirational option:
> "[Role X] is a stretch given your current [Y] — here's what you'd need to get there: [specific skills/experience]."

Keep this section honest. Don't over-promise.

---

## Stage 5 — What's next

End with a clear, ordered recommendation:

> "You're set up. Here's the recommended order from here:
>
> 1. `/career-agent story` — build your story bank before you apply anywhere. Interviewers will ask behavioral questions; you need real, verified answers ready.
> 2. `/career-agent scan` — find relevant roles based on your profile.
> 3. `/career-agent eval {url}` — when you find a role that interests you, evaluate it before applying.
>
> Don't skip step 1. It's the difference between prepared and winging it."
