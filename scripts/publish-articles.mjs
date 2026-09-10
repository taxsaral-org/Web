#!/usr/bin/env node
// Converts every Word document in content/detailed-explainer/word/
// into the data file the website reads.
//
//   node scripts/publish-articles.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseDocx } from "./lib/docx-read.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WORD_DIR = path.join(ROOT, "content", "detailed-explainer", "word");
const OUT_FILE = path.join(
  ROOT,
  "apps", "web", "app", "detailed-explainer", "_components", "articles.generated.ts"
);
const MANUAL_FILE = path.join(
  ROOT,
  "apps", "web", "app", "detailed-explainer", "_components", "detailed-data.ts"
);

const CATEGORIES = [
  "Capital Gains",
  "Corporate Tax",
  "TDS & TCS",
  "Business & Profession",
  "Deductions",
  "International Tax",
  "Special Income",
  "Charitable Trusts & NPOs",
  "Agricultural Income",
];

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const problems = [];
const warnings = [];

function fail(file, msg) { problems.push(`  ${file}\n     ${msg}`); }
function warn(file, msg) { warnings.push(`  ${file}\n     ${msg}`); }

// ── Read existing hand-written slugs so we can spot clashes ─────────────────
let manualSlugs = new Set();
try {
  const manual = fs.readFileSync(MANUAL_FILE, "utf8");
  manualSlugs = new Set([...manual.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]));
} catch { /* first run, file may not exist yet */ }

// ── Collect Word documents ─────────────────────────────────────────────────
if (!fs.existsSync(WORD_DIR)) {
  console.log(`\n  No articles folder yet.\n  Create one with:  npm run new-article "My Article"\n`);
  process.exit(0);
}

const docs = fs
  .readdirSync(WORD_DIR)
  .filter((f) => f.toLowerCase().endsWith(".docx") && !f.startsWith("~$"))
  .sort();

if (docs.length === 0) {
  console.log(`\n  No Word documents found in:\n    ${WORD_DIR}\n`);
}

const entries = [];
const seen = new Map();

for (const file of docs) {
  let parsed;
  try {
    parsed = parseDocx(fs.readFileSync(path.join(WORD_DIR, file)));
  } catch (e) {
    fail(file, `Could not read this file — ${e.message}`);
    continue;
  }

  const { meta, content } = parsed;
  const get = (k) => (meta[k] ?? "").trim();

  const title = get("title");
  if (!title) {
    fail(file, 'Missing "Title" in the settings table at the top of the document.');
    continue;
  }

  const slug = slugify(get("slug") || title);
  if (!slug) {
    fail(file, `Could not build a web address from the title "${title}".`);
    continue;
  }

  if (seen.has(slug)) {
    fail(file, `Its web address "${slug}" is already used by ${seen.get(slug)}. Change one of the titles.`);
    continue;
  }
  if (manualSlugs.has(slug)) {
    fail(file, `Its web address "${slug}" clashes with an existing built-in article. Change the title.`);
    continue;
  }
  seen.set(slug, file);

  const category = get("category");
  if (!CATEGORIES.includes(category)) {
    fail(
      file,
      `Category "${category || "(blank)"}" is not valid.\n     Use exactly one of: ${CATEGORIES.join(", ")}`
    );
    continue;
  }

  const summary = get("summary");
  if (!summary) fail(file, 'Missing "Summary" in the settings table.');

  if (content.length === 0) {
    fail(file, "The document has no article content after the settings table.");
    continue;
  }

  const author = get("author");
  const linkedIn = get("authorlinkedin");
  if (!author) warn(file, 'No "Author" set — the credit box will not be shown.');
  if (author && !linkedIn) warn(file, 'Author set but no "Author LinkedIn" — the Connect button will be hidden.');
  if (linkedIn && !/^https?:\/\/(www\.)?linkedin\.com\//i.test(linkedIn)) {
    warn(file, `"${linkedIn}" does not look like a LinkedIn address. It should start with https://www.linkedin.com/`);
  }

  const lastUpdated =
    get("lastupdated") ||
    fs.statSync(path.join(WORD_DIR, file)).mtime.toISOString().slice(0, 10);

  const keywords = get("keywords")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const entry = {
    slug,
    section2025: get("section2025") || "—",
    section1961: get("section1961") || "",
    title,
    summary,
    category,
    keywords: keywords.length ? keywords : [title.toLowerCase()],
    lastUpdated,
    content,
  };

  if (author) entry.author = author;
  if (linkedIn) entry.authorLinkedIn = linkedIn;
  if (get("authornote") && !/^\(optional\)/i.test(get("authornote"))) {
    entry.authorNote = get("authornote");
  }

  entries.push({ entry, file });
}

// ── Stop on any hard error, without touching the website ───────────────────
if (problems.length) {
  console.error(`\n  Could not publish — please fix the following and run again:\n`);
  console.error(problems.join("\n\n"));
  console.error(`\n  Nothing on the website has been changed.\n`);
  process.exit(1);
}

// ── Write the generated data file ──────────────────────────────────────────
const banner = `// ─────────────────────────────────────────────────────────────────────────────
// AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
//
// This file is rebuilt from the Word documents in:
//   content/detailed-explainer/word/
//
// To change an article, edit its Word document and run:  npm run publish
// ─────────────────────────────────────────────────────────────────────────────

import type { DetailedEntry } from "./detailed-data";

export const GENERATED_ARTICLES: DetailedEntry[] = `;

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(
  OUT_FILE,
  banner + JSON.stringify(entries.map((e) => e.entry), null, 2) + ";\n",
  "utf8"
);

// ── Report ─────────────────────────────────────────────────────────────────
if (warnings.length) {
  console.log(`\n  Published, with some things worth checking:\n`);
  console.log(warnings.join("\n\n"));
}

console.log(`\n  Published ${entries.length} article${entries.length === 1 ? "" : "s"}:\n`);
for (const { entry, file } of entries) {
  const who = entry.author ? `  ·  by ${entry.author}` : "";
  console.log(`    ${file}`);
  console.log(`      /detailed-explainer/${entry.slug}`);
  console.log(`      ${entry.content.length} blocks${who}\n`);
}

console.log(`  Now put it live:

    git add -A
    git commit -m "Update articles"
    git push

  The website updates itself a minute or two after you push.
`);
