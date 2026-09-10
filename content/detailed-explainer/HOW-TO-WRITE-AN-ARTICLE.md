# How to publish a Detailed Explainer article

You write the article in **Microsoft Word**. Two commands turn it into a page on
the website. You never need to touch any code.

---

## One-time setup

You only do this once, ever.

Open **PowerShell** and go to the project folder:

```
cd "C:\Users\Shobhi\OneDrive\03. TaxSaral.org\Web"
```

Check Node is installed by running `node -v`. If you see a version number
(like `v20.11.0`) you are ready. If you get an error, install Node from
<https://nodejs.org> (pick the "LTS" button), then close and reopen PowerShell.

---

## Publishing an article — the whole process

### Step 1 — Create the Word file

```
npm run new-article "Deduction for Scientific Research"
```

This creates a Word document here:

```
content\detailed-explainer\word\deduction-for-scientific-research.docx
```

The name you type becomes both the article title and its web address, so
`"Deduction for Scientific Research"` gives you
`taxsaral.org/detailed-explainer/deduction-for-scientific-research`.

### Step 2 — Write it in Word

Open that file. At the top there is a **settings table** — fill it in.
Everything below the table is your article. Delete the example content and
write your own.

### Step 3 — Publish

Save and close Word, then run:

```
npm run publish
```

It reads every Word file in the folder and rebuilds the website's content.
If something is wrong it tells you exactly what and changes nothing.

### Step 4 — Put it live

```
git add -A
git commit -m "Add scientific research article"
git push
```

The live site updates by itself a minute or two after you push.

---

## The settings table

This table **must stay as the first table** in the document. Leave a field
blank if you do not need it.

| Field | What to put in it |
|---|---|
| **Title** | The article heading. Also becomes the web address. |
| **Section 2025** | e.g. `Section 206(2)`. Shown as a badge at the top. |
| **Section 1961** | The matching old-Act section, e.g. `Section 115JC`. |
| **Category** | Must be one of the nine below, spelled exactly. |
| **Summary** | One or two sentences. Used on the listing page and by Google. |
| **Keywords** | Search terms, separated by commas. |
| **Author** | Your name. Leave blank to show no credit box. |
| **Author LinkedIn** | Full profile link, `https://www.linkedin.com/in/...` |
| **Author Note** | Optional. A custom thank-you line — see below. |
| **Last Updated** | Optional. `2026-09-10` format. Defaults to when you saved the file. |

**The nine categories** — copy one of these exactly:

`Capital Gains` · `Corporate Tax` · `TDS & TCS` · `Business & Profession` ·
`Deductions` · `International Tax` · `Special Income` ·
`Charitable Trusts & NPOs` · `Agricultural Income`

---

## Writing the article

Use Word normally. Here is how each thing you do in Word appears on the site.

| In Word | On the website |
|---|---|
| **Heading 1** style | A main section heading with a line under it |
| **Heading 2** style | A smaller sub-heading |
| Normal paragraph | A paragraph |
| Bulleted list | A bulleted list |
| Numbered list | A numbered list |
| Table with **3+ columns** | A data table (first row = header) |
| Table with **exactly 2 columns** | A figures/computation block |

To apply Heading 1 or Heading 2, use the **Styles** box on Word's Home tab.

### Coloured boxes

Start a paragraph with one of these words and the whole paragraph becomes a
coloured highlight box:

- `INFO:` or `NOTE:` → blue box
- `WARNING:` or `CAUTION:` → amber box
- `TIP:` → green box

For example, typing `INFO: AMT never applies below ₹20 lakh.` gives you a blue
box reading "AMT never applies below ₹20 lakh."

### Figures tables (two columns)

A two-column table becomes a computation block. Three tricks:

- **Make a row bold** → shown as a total, with a heavier line above it.
- **Start the label with `Add:` or `Less:`** → the row is indented.
- **Put the amount in brackets**, like `(₹30.00)` → shown in red as a negative.

So this table in Word:

| | |
|---|---|
| Profits and gains of business | ₹330.00 |
| Add: Depreciation debited in books | ₹25.00 |
| Less: Depreciation as per rules | (₹30.00) |
| **Book Profit** | **₹325.00** |

...produces a properly formatted computation on the site.

---

## The author credit box

If you fill in **Author**, a credit card appears at the foot of the article,
just above the disclaimer. It shows the author's initials, their name, a
thank-you note, and a **Connect on LinkedIn** button.

Leave **Author Note** blank and it writes this for you:

> Thank you to *[first name]* for contributing this analysis to TaxSaral and
> helping make the Income Tax Act 2025 easier to navigate.

Fill **Author Note** in to say something specific instead — useful when a guest
contributor writes a piece and you want to thank them in your own words.

---

## Changing an article later

Open the same Word file, edit it, save it, then run `npm run publish` and push
again. The Word documents in `content\detailed-explainer\word\` are the master
copies — keep them.

## Deleting an article

Delete its `.docx` file, then run `npm run publish` and push.

---

## If something goes wrong

`npm run publish` refuses to change anything until every problem is fixed, so a
mistake can never break the live site. Common messages:

**"Missing Title in the settings table"** — the settings table is not the first
table in the document, or the left-hand cell does not say `Title`.

**"Category ... is not valid"** — check the spelling against the nine
categories above. `TDS & TCS` needs the `&`, not the word "and".

**"Its web address ... clashes with an existing built-in article"** — an older
article already uses that name. Change your title slightly.

**"Could not read this file"** — the file is probably still open in Word, or it
was saved as `.doc` instead of `.docx`. Close Word and save as `.docx`.

If you get stuck, the site as it stands is unaffected — nothing goes live until
you `git push`.
