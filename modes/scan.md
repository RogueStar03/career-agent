# Mode: Portal Scanner

Load from _context.md: Universal gate + Required reads (light) + Core rules + Portal scanner rules

## Trigger
User says "/career-agent scan", "scan portals", "find new jobs", "scan"

## Steps

### Step 0: Confirm targeting (before scanning anything)
Read `profile.yml`. Display the current scan targets and ask for confirmation:

```
Scanning for:
  Roles:    [target_roles from profile.yml]
  Location: [location]
  Remote:   [remote_preference]
  Salary:   [salary_range.min]+ [currency]

Confirm these targets, or override for this session?
[Press Enter to confirm, or describe any changes]
```

If the user overrides (e.g. "only Flutter roles" or "add Product Manager"), apply the override for this session only — do NOT write back to profile.yml.

### Step 1: Load context
Read silently:
- `templates/portals.yml` — companies and queries to scan
- `profile.yml` — target roles and keywords (cv_digest is sufficient — do NOT read cv.md)
- `data/scan-history.json` — previously seen URLs (to avoid duplicates)
- `data/applications.json` — already tracked applications (to avoid re-finding)
- `data/user-patterns.md` — apply any scan-related preferences noted here

### Step 2: Scan Each Company
For each company in portals.yml:

**Greenhouse platforms** (boards.greenhouse.io/*):
- Fetch the careers page URL
- Greenhouse pages are JSON-friendly: try fetching `{base_url}` and parsing the job listings
- Filter listings by matching company keywords against job title
- For each match, extract: title, url, location, department

**Custom platforms:**
- Use WebFetch to load the careers page
- Extract job listings from the page content
- Match against the company's keywords list
- Extract: title, url, location if available

**Job board queries:**
- Fetch each query URL
- Extract listings from the results
- Match against profile.yml target_roles

### Step 3: Deduplicate
- Check each found URL against scan-history.json `seen_urls`
- Check against applications.json (already being tracked)
- Only keep genuinely new listings

### Step 4: Score Relevance
For each new listing, do a QUICK relevance check (not a full evaluation):
- Does the title match any target_roles from profile.yml?
- Does location/remote match preferences?
- Rate: HIGH / MEDIUM / LOW relevance

### Step 5: Present Results
Show the user a summary table:
```
Scan Results — {date}
Found {X} new listings across {Y} companies

HIGH Relevance
| Company | Role | Location | URL |
|---------|------|----------|-----|
| ...     | ...  | ...      | ... |

MEDIUM Relevance
| Company | Role | Location | URL |
|---------|------|----------|-----|
| ...     | ...  | ...      | ... |

LOW Relevance (showing {N} of {M})
...
```

### Step 6: User Action
Ask: "Want me to evaluate any of these? Give me the numbers or say 'all high'."

If the user picks listings:
- Add them to `data/pipeline.json` with status "pending"
- Offer to run evaluation on them immediately

### Step 7: Update History
- Add ALL found URLs (not just new ones) to scan-history.json `seen_urls`
- Update `last_scan` timestamp
- Confirm: "Scan complete. {X} new listings found, scan history updated."

## Rules
1. Don't evaluate during scan — scanning is for FINDING, not judging
2. Greenhouse API is the most reliable — prioritize those
3. If a career page fails to load, skip it and note the error
4. Keep scan fast — don't deep-crawl, just get the listings page
5. Always show results grouped by relevance level

## What's next
After confirming results:
- If HIGH relevance items found: "Start with `/career-agent eval {url}` on the top HIGH result."
- If only MEDIUM/LOW: "Nothing high-relevance this scan. You can still evaluate MEDIUM items, or update `templates/portals.yml` with more companies to watch."
- If nothing new found: "No new listings since last scan. Try adding more companies to `templates/portals.yml`."
