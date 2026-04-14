# Mode: Tailor CV

Load from _context.md: Universal gate + Required reads (heavy) + Core rules + Output standards + PDF generation

Generate a tailored, ATS-optimized CV as a PDF for a specific job description.

## Trigger

User says `/career-agent pdf`, `/career-agent pdf {id}`, "tailor cv", "generate cv", "make resume for", or "pdf"

## Input Options

- `/career-agent pdf {id}` — use the report and JD from evaluation #{id}
- `/career-agent pdf` + pasted JD — use the pasted JD directly
- If no JD and no id provided, ask the user: "Paste the JD or give me an evaluation ID."

## Steps

### Step 1: Load context

Read silently:
- `cv.md` — source of truth. Never add anything not in here.
- `profile.yml` — contact info, skills
- `templates/cv-template.html` — the HTML template
- `data/user-patterns.md` — apply any tailor-cv preferences noted here

If an evaluation id was given, also read the corresponding `reports/{id}-*.md` to understand what scored well and what the gaps were.

### Step 2: Analyze the JD

Extract:
- **Required skills** — explicitly asked for
- **Preferred skills** — nice-to-haves
- **Key responsibilities** — what the role actually does
- **Keywords** — terms that appear multiple times or are clearly emphasized

### Step 3: Tailor content

**Professional Summary** (2–3 sentences):
- Lead with the strongest match to their core need
- Mention years of experience and 2–3 most relevant skills by name
- Include a line that aligns your direction with their mission
- Weave in 1–2 prominent JD keywords naturally — never forced

**Skills** (8–12 items, comma-separated):
- Extract every technology / skill keyword from the JD (required + preferred)
- Cross-reference against `profile.yml → skills` and `cv.md → Skills section`
- Include a skill ONLY IF: the JD mentions it (or a close synonym) AND cv/profile confirms Abhi has it
- Exception: always include the primary technology of the role (e.g. Flutter for a Flutter role, React for a React role) even if not spelled out in JD keywords, as long as it is in cv/profile
- Order: JD-required matches first → JD-preferred matches next → primary role tech if not already listed
- Never include a skill just because it is in the same category or archetype — it must be in the JD
- Keep as plain comma-separated text — no pills, no tags

**Experience bullets**:
- For each job, pick the 3–5 most relevant bullets for THIS role
- Lightly reword to incorporate JD keywords only where honest:
  - OK: "Built React components" → "Built React/Next.js components" if you used Next.js and JD asks for it
  - NOT OK: adding a technology you didn't actually use
- Prioritize bullets showing: impact (numbers if available), relevant tech, ownership
- Every bullet starts with a strong action verb

**Projects** (2–3 most relevant):
- Select from cv.md only
- Brief description emphasizing relevant tech and outcomes
- If an evaluated report exists, prefer projects that scored well in tech_stack_fit

**Education and Certifications**: straight from cv.md, no modification.

### Step 4: Fill the template

Read `templates/cv-template.html`.

Replace all `{{PLACEHOLDER}}` values:

| Placeholder | Value |
|---|---|
| `{{FULL_NAME}}` | Abhishek Kayasth |
| `{{EMAIL}}` | abhishekkayasth87@gmail.com |
| `{{PHONE}}` | +91-9638796077 |
| `{{LOCATION}}` | India (Remote) |
| `{{LINKEDIN}}` | https://www.linkedin.com/in/abhishek-kayasth-050250239/ |
| `{{PORTFOLIO}}` | https://github.com/RogueStar03/ |
| `{{PROFESSIONAL_SUMMARY}}` | 2–3 tailored sentences |
| `{{SKILLS}}` | Reordered comma-separated list |
| `{{EXPERIENCE}}` | HTML using `.job` structure (see below) |
| `{{PROJECTS}}` | HTML using `.project` structure (see below) |
| `{{EDUCATION}}` | HTML using `.edu-*` structure (see below) |
| `{{CERTIFICATIONS}}` | HTML `<ul class="cert-list">` |

**Experience HTML structure:**
```html
<div class="job">
  <div class="job-header">
    <span><span class="job-title">Role Title</span> — <span class="job-company">Company Name</span></span>
    <span class="job-date">Month YYYY – Month YYYY</span>
  </div>
  <ul>
    <li>Bullet point one</li>
    <li>Bullet point two</li>
  </ul>
</div>
```

**Project HTML structure:**
```html
<div class="project">
  <div class="project-header">
    <span class="project-name">Project Name</span>
    <span class="project-tech">Tech: Python, React, etc.</span>
  </div>
  <ul>
    <li>Bullet point one</li>
    <li>Bullet point two</li>
  </ul>
</div>
```

**Education HTML structure:**
```html
<div>
  <div class="edu-header">
    <span class="edu-degree">Degree — Major</span>
    <span class="edu-date">YYYY – YYYY</span>
  </div>
  <div class="edu-school">University Name</div>
  <div class="edu-detail">GPA: X.XX</div>
</div>
```

Save the filled HTML to `/tmp/cv-filled-{company-slug}.html`.

### Step 5: Generate PDF

Before generating, check if `output/cv-abhi-{company-slug}-{YYYY-MM-DD}.pdf` already exists:
- If it does **and** `pdf_path` in `data/applications.json` for this ID is already set, ask the user:
  ```
  A CV already exists for this application:
    output/cv-abhi-{company-slug}-{YYYY-MM-DD}.pdf

  Replace it, or save as v2?
  [1] Replace (overwrite)
  [2] Save as v2 (cv-abhi-{company-slug}-{YYYY-MM-DD}-v2.pdf)
  ```
  If the user chooses v2, increment the suffix (v2, v3, …) until the filename is free.
  If the user chooses replace, overwrite in place and keep the same `pdf_path`.

Run this command:
```bash
node scripts/generate-pdf.mjs /tmp/cv-filled-{company-slug}.html output/cv-abhi-{company-slug}-{YYYY-MM-DD}[-vN].pdf
```

### Step 6: Update tracker

If this was for an existing evaluation (by id), update the `pdf_path` field in `data/applications.json` with the final filename (including version suffix if applicable):
```json
"pdf_path": "output/cv-abhi-{company-slug}-{YYYY-MM-DD}[-vN].pdf"
```

### Step 7: Confirm

Print:
```
✓ CV tailored for {Company} — {Role}
  PDF: output/cv-abhi-{company-slug}-{YYYY-MM-DD}.pdf
  Highlights: [2-3 sentences on what was customized — which skills moved up, which bullets selected]
```

## Rules

1. Every bullet must trace back to cv.md. No invented experience, ever.
2. Rewriting bullets for keyword relevance is allowed. Fabricating new ones is not.
3. Keep it to 1 page. Cut the least relevant bullets if experience runs long.
4. Skills: 10–15 max — curated for this role, not exhaustive.
5. The professional summary is the highest-leverage section — spend the most effort here.
6. Always update applications.json with pdf_path after generating.

## What's next
After confirming the PDF:
"Your tailored CV is ready. Apply via the company's career portal, then update your status in `data/applications.json` to 'applied'. Run `/career-agent outreach {id}` if you want to also send a direct message to someone at the company."
