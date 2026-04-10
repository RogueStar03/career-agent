# Mode: Deep Company Research

## Trigger
User says "/career-agent research", "/career-agent research {id}", "/career-agent research {company name}", "research company", "deep dive"

## Input
- `/career-agent research {id}` — research the company from application #{id}
- `/career-agent research {company name}` — research by name

## Steps

### Step 1: Identify Company
Get the company name from the id lookup or direct input.

### Step 2: Research via Web Search
Search for and compile:

**Company Overview:**
- What they do (1-2 sentences)
- Founded when, HQ where, company size
- Funding stage and recent rounds (if startup)
- Key products/services

**Recent News (last 6 months):**
- Product launches, pivots, expansions
- Layoffs, restructuring (red flags)
- Press coverage, awards
- New leadership hires

**Engineering Culture:**
- Tech blog posts (what they write about, quality)
- Open source contributions
- Tech stack (from job postings, blog, GitHub)
- Engineering team size signals

**People:**
- CEO/founder background
- Engineering leadership (CTO, VP Eng)
- Notable employees (if relevant to your network)

**Glassdoor/Reputation Signals:**
- General sentiment (search for "{company} glassdoor reviews")
- Common praise and complaints
- Interview process reputation

**Competitive Landscape:**
- Main competitors
- How they differentiate
- Market position

### Step 3: Red/Green Flag Summary
Compile a quick-reference list:
- 🟢 Green flags (reasons to be excited)
- 🔴 Red flags (reasons to be cautious)
- 🟡 Unknowns (things to ask about in interview)

### Step 4: Interview Leverage
- Specific talking points that show you researched them
- Questions derived from recent news
- Ways to connect your experience to their current challenges

### Step 5: Save
Save to `reports/research-{company-slug}-{YYYY-MM-DD}.md`
If linked to an application id, note in applications.json `notes` field.
Confirm: "Research brief saved for {Company}."

## Rules
1. Use web search for everything — don't rely on training data for company info
2. Flag if information seems outdated or sparse
3. Be balanced — don't just find positive things
4. Keep the output focused and actionable, not an encyclopedia
