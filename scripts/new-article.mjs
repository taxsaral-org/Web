#!/usr/bin/env node
// Creates a blank Word template for a new Detailed Explainer article.
//
//   node scripts/new-article.mjs "My Article Name"

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildDocx, para, table, BULLET_NUM_ID, NUMBER_NUM_ID } from "./lib/docx-write.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "content", "detailed-explainer", "word");

const name = process.argv[2] || "New Article";
const fileName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".docx";

const body = [
  // ── Metadata table (MUST be the first table in the document) ──
  para("Article settings — fill this in, keep it as the first table", { style: "Heading1" }),
  table(
    [
      { cells: ["Field", "Value"], bold: true },
      { cells: ["Title", name] },
      { cells: ["Section 2025", "Section 000"] },
      { cells: ["Section 1961", "Section 000"] },
      { cells: ["Category", "Business & Profession"] },
      { cells: ["Summary", "One or two sentences describing what this article covers."] },
      { cells: ["Keywords", "keyword one, keyword two, keyword three"] },
      { cells: ["Author", "Your Name"] },
      { cells: ["Author LinkedIn", "https://www.linkedin.com/in/your-profile"] },
      { cells: ["Author Note", "(optional) A custom thank-you line. Leave blank for the default."] },
    ],
    { widths: [2600, 6760] }
  ),
  para(""),

  // ── Body starts here ──
  para("Write your article below this line", { style: "Heading1" }),
  para(
    "Delete everything from here down and write your own content. " +
      "The examples below show every kind of block you can use."
  ),
  para(""),

  para("This is a main heading (Word style: Heading 1)", { style: "Heading1" }),
  para(
    "This is a normal paragraph. Just type normally — the importer turns each " +
      "paragraph into a paragraph on the website."
  ),

  para("This is a sub-heading (Word style: Heading 2)", { style: "Heading2" }),
  para("Use a bulleted list for unordered points:"),
  para("First bullet point", { numId: BULLET_NUM_ID }),
  para("Second bullet point", { numId: BULLET_NUM_ID }),
  para("Third bullet point", { numId: BULLET_NUM_ID }),

  para("Use a numbered list for steps or conditions:"),
  para("First numbered item", { numId: NUMBER_NUM_ID }),
  para("Second numbered item", { numId: NUMBER_NUM_ID }),

  para("Coloured highlight boxes", { style: "Heading2" }),
  para("Start a paragraph with INFO: WARNING: or TIP: to make a coloured box."),
  para("INFO: This becomes a blue information box on the website."),
  para("WARNING: This becomes an amber warning box."),
  para("TIP: This becomes a green tip box."),

  para("Data table (three or more columns)", { style: "Heading2" }),
  para("A table with three or more columns becomes a normal data table. The first row is the header."),
  table([
    { cells: ["Assessee", "Rate", "Notes"], bold: true },
    { cells: ["General", "18.5%", "Standard rate"] },
    { cells: ["Co-operative society", "15%", "Concessional"] },
  ]),

  para("Figures table (exactly two columns)", { style: "Heading2" }),
  para(
    "A table with exactly TWO columns becomes a computation block. " +
      "Make a row bold to show it as a total. Rows starting with Add: or Less: are indented. " +
      "Put an amount in brackets to show it in red as a negative."
  ),
  table(
    [
      { cells: ["Profits and gains of business", "₹330.00"] },
      { cells: ["Add: Depreciation debited in books", "₹25.00"] },
      { cells: ["Less: Depreciation as per rules", "(₹30.00)"] },
      { cells: ["Book Profit", "₹325.00"], bold: true },
    ],
    { widths: [6400, 2960] }
  ),
].join("");

fs.mkdirSync(OUT_DIR, { recursive: true });
const outPath = path.join(OUT_DIR, fileName);

if (fs.existsSync(outPath)) {
  console.error(`\n  A file already called ${fileName} exists.\n  Delete or rename it first.\n`);
  process.exit(1);
}

fs.writeFileSync(outPath, buildDocx(body));

console.log(`
  Created your new article template:

    ${outPath}

  Next steps:
    1. Open that file in Word and write your article.
    2. Save it (keep it as .docx).
    3. Run:  npm run publish
`);
