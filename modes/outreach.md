# Mode: Outreach Message

Load from _context.md: Universal gate + Required reads (light) + Core rules + Outreach rules

## Trigger
User says "/career-agent outreach", "/career-agent outreach {id}", "draft outreach", "linkedin message", "cold email"

## Input
- `/career-agent outreach {id}` — draft outreach for application #{id}
- Can also provide: recruiter name, hiring manager name, connection context

## Steps

### Step 1: Load context
Read silently:
- `profile.yml` — use `cv_digest` for background context (do NOT read full cv.md unless the user asks to reference a specific project)
- If id given: read the evaluation report from `reports/` — this has the relevant detail
- `data/applications.json` entry for status context
- `data/user-patterns.md` — apply any outreach-related preferences

### Step 2: Determine Outreach Type
Ask user if not clear:
- **LinkedIn connection request** — max 300 characters, must be concise
- **LinkedIn message** (already connected) — 300-500 words
- **Cold email to recruiter** — short, professional, with value prop
- **Follow-up after application** — reference that you applied

### Step 3: Draft Message

**LinkedIn Connection Request (300 char max):**
- Lead with shared context or genuine interest
- One line about why you're reaching out
- No "I'd love to pick your brain" generic nonsense
- Example structure: "{Specific observation about their work/company}. I'm a {your role} working on {relevant thing}. Would love to connect about {specific topic}."

**LinkedIn Message / Cold Email:**
- Opening: specific hook (reference their blog post, company news, product you used)
- Body: 2-3 sentences on your relevant experience (from cv.md, tied to their needs)
- Ask: one clear, low-effort ask (15-min chat, specific question, referral)
- Closing: grateful, not desperate
- Keep under 150 words for LinkedIn, under 200 for email

**Follow-up:**
- Reference when you applied and for what role
- One new piece of value (insight, relevant project, article you wrote)
- Reiterate interest briefly
- Keep under 100 words

### Step 4: Output
Show the draft message with:
- Character/word count
- Which type it is
- The recipient context (if known)

Don't save to a file — just show in terminal for the user to copy.

## Rules
1. Never be generic. Every message should have a specific hook.
2. Never lie about your experience — only reference real experience from cv_digest or the eval report
3. Keep LinkedIn connection requests UNDER 300 characters, hard limit
4. Tone: confident and specific, never desperate or overly formal
5. Don't use buzzwords: "synergy", "leverage", "passionate about", "rockstar"

## What's next
After showing the draft:
"Personalise before sending — replace any placeholder context with real details you know about this person. Set a follow-up reminder for 5–7 days if you don't hear back."
