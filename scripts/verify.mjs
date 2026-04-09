#!/usr/bin/env node
/**
 * career-agent verify
 * Data integrity checks for the application tracker and reports.
 *
 * Run: node scripts/verify.mjs
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, basename } from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const TRACKER = join(ROOT, "data/applications.json");
const REPORTS_DIR = join(ROOT, "reports");

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ✗ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠ WARN:  ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}

// ── 1. Tracker exists and is valid JSON ──────────────────────────────────────
console.log("\n[1] Tracker file");
if (!existsSync(TRACKER)) {
  error("data/applications.json not found");
  process.exit(1);
}

let tracker;
try {
  tracker = JSON.parse(readFileSync(TRACKER, "utf8"));
  ok("Valid JSON");
} catch (e) {
  error(`Invalid JSON — ${e.message}`);
  process.exit(1);
}

const apps = tracker.applications ?? [];
ok(`${apps.length} application(s) found`);

// ── 2. Required fields on each entry ────────────────────────────────────────
console.log("\n[2] Required fields");
const REQUIRED = ["id", "company", "role", "status", "score", "date_found", "report_path"];

for (const app of apps) {
  for (const field of REQUIRED) {
    if (app[field] === undefined || app[field] === null || app[field] === "") {
      error(`#${app.id ?? "?"} — missing field: ${field}`);
    }
  }
}
if (errors === 0) ok("All entries have required fields");

// ── 3. No duplicate IDs ──────────────────────────────────────────────────────
console.log("\n[3] Duplicate IDs");
const ids = apps.map((a) => a.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length > 0) {
  error(`Duplicate IDs found: ${[...new Set(dupes)].join(", ")}`);
} else {
  ok("No duplicate IDs");
}

// ── 4. Report files exist for each entry ────────────────────────────────────
console.log("\n[4] Report files");
for (const app of apps) {
  if (!app.report_path) continue;
  const full = join(ROOT, app.report_path);
  if (!existsSync(full)) {
    error(`#${app.id} — report file missing: ${app.report_path}`);
  }
}
if (errors === 0) ok("All report paths resolve to real files");

// ── 5. Report files without a tracker entry ──────────────────────────────────
console.log("\n[5] Orphaned reports");
if (existsSync(REPORTS_DIR)) {
  const reportFiles = readdirSync(REPORTS_DIR).filter((f) => f.endsWith(".md"));
  const trackedPaths = new Set(apps.map((a) => basename(a.report_path ?? "")));
  for (const file of reportFiles) {
    if (!trackedPaths.has(file)) {
      warn(`Report not tracked in applications.json: reports/${file}`);
    }
  }
  if (warnings === 0) ok("No orphaned report files");
} else {
  warn("reports/ directory not found");
}

// ── 6. Valid status values ───────────────────────────────────────────────────
console.log("\n[6] Status values");
const VALID_STATUSES = ["evaluated", "applied", "interviewing", "offer", "rejected", "archived"];
for (const app of apps) {
  if (!VALID_STATUSES.includes(app.status)) {
    error(`#${app.id} — invalid status: "${app.status}"`);
  }
}
if (errors === 0) ok("All statuses are valid");

// ── 7. Score range ───────────────────────────────────────────────────────────
console.log("\n[7] Score range");
for (const app of apps) {
  if (typeof app.score !== "number" || app.score < 0 || app.score > 5) {
    error(`#${app.id} — score out of range: ${app.score}`);
  }
}
if (errors === 0) ok("All scores are 0–5");

// ── Summary ──────────────────────────────────────────────────────────────────
console.log("\n─────────────────────────────────");
if (errors === 0 && warnings === 0) {
  console.log("✓ All checks passed. Tracker is clean.");
} else {
  if (errors > 0) console.error(`✗ ${errors} error(s) found`);
  if (warnings > 0) console.warn(`⚠ ${warnings} warning(s) found`);
  process.exit(errors > 0 ? 1 : 0);
}
