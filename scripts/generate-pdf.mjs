#!/usr/bin/env node
/**
 * career-agent PDF generator
 * Converts a filled HTML resume to a PDF using Puppeteer headless Chrome.
 *
 * Usage: node scripts/generate-pdf.mjs <input-html> <output-pdf>
 *
 * Example:
 *   node scripts/generate-pdf.mjs /tmp/cv-filled-vercel.html output/cv-abhi-vercel-2026-04-08.pdf
 */

import { readFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const [,, inputArg, outputArg] = process.argv;

if (!inputArg || !outputArg) {
  console.error("Usage: node scripts/generate-pdf.mjs <input-html> <output-pdf>");
  process.exit(1);
}

const inputPath  = resolve(inputArg);
const outputPath = resolve(outputArg);

if (!existsSync(inputPath)) {
  console.error(`Error: input file not found — ${inputPath}`);
  process.exit(1);
}

// Ensure output directory exists
const outDir = dirname(outputPath);
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

let puppeteer;
try {
  puppeteer = (await import("puppeteer")).default;
} catch {
  console.error("Error: puppeteer not installed. Run: npm install puppeteer");
  process.exit(1);
}

let browser;
try {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Load via file:// URL so relative assets resolve correctly
  const fileUrl = pathToFileURL(inputPath).href;
  await page.goto(fileUrl, { waitUntil: "networkidle0" });

  await page.pdf({
    path: outputPath,
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log(`PDF saved to ${outputPath}`);
} catch (err) {
  console.error(`Error generating PDF: ${err.message}`);
  process.exit(1);
} finally {
  if (browser) await browser.close();
}
