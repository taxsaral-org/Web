// Zero-dependency reader that turns a Word .docx into TaxSaral content blocks.

import { unzip } from "./zip.mjs";

// ── Tiny XML helpers ────────────────────────────────────────────────────────

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&amp;/g, "&");
}

function isTagStart(s, idx, tag) {
  if (!s.startsWith("<" + tag, idx)) return false;
  const c = s[idx + tag.length + 1];
  return c === ">" || c === "/" || c === " " || c === "\t" || c === "\n" || c === "\r";
}

/**
 * Return [start, end) of the element beginning at `start`, handling nesting.
 *
 * Tag names share prefixes in WordprocessingML (w:tbl / w:tblPr, w:num /
 * w:numbering), so both the opening and closing tags must be verified rather
 * than matched by substring alone.
 */
function elementRange(s, start, tag) {
  const openEnd = s.indexOf(">", start);
  if (openEnd < 0) return null;
  if (s[openEnd - 1] === "/") return [start, openEnd + 1]; // self-closing

  const open = "<" + tag;
  const close = "</" + tag;
  let depth = 1;
  let i = openEnd + 1;

  while (i < s.length && depth > 0) {
    let nOpen = s.indexOf(open, i);
    while (nOpen >= 0 && !isTagStart(s, nOpen, tag)) {
      nOpen = s.indexOf(open, nOpen + 1);
    }

    let nClose = s.indexOf(close, i);
    while (nClose >= 0 && s[nClose + close.length] !== ">") {
      nClose = s.indexOf(close, nClose + 1);
    }

    if (nClose < 0) return [start, s.length];

    if (nOpen >= 0 && nOpen < nClose) {
      const oe = s.indexOf(">", nOpen);
      if (s[oe - 1] !== "/") depth++;
      i = oe + 1;
    } else {
      depth--;
      i = nClose + close.length + 1;
    }
  }
  return [start, i];
}

/** Collect direct children of `xml` matching any of `tags`, in document order. */
function topLevelElements(xml, tags) {
  const out = [];
  let i = 0;
  while (i < xml.length) {
    const lt = xml.indexOf("<", i);
    if (lt < 0) break;
    const tag = tags.find((t) => isTagStart(xml, lt, t));
    if (tag) {
      const range = elementRange(xml, lt, tag);
      if (!range) break;
      out.push({ tag, xml: xml.slice(range[0], range[1]) });
      i = range[1];
    } else {
      i = lt + 1;
    }
  }
  return out;
}

/** All text inside an element, with tabs/breaks flattened to spaces. */
function textOf(xml) {
  let out = "";
  const re = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:tab\s*\/>|<w:br\s*\/>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    out += m[1] !== undefined ? decodeEntities(m[1]) : " ";
  }
  return out.replace(/\s+/g, " ").trim();
}

function styleOf(pXml) {
  const m = pXml.match(/<w:pStyle\s+w:val="([^"]+)"/);
  return m ? m[1] : "";
}

function isBold(xml) {
  // Bold on the paragraph mark or on any run.
  return /<w:b(?:\s[^>]*)?\/>|<w:b(?:\s[^>]*)?>\s*<\/w:b>/.test(xml);
}

// ── Numbering (bullet vs numbered lists) ────────────────────────────────────

function buildNumberingMap(numberingXml) {
  const map = new Map(); // numId -> "bullet" | "decimal"
  if (!numberingXml) return map;

  const abstractFmt = new Map(); // abstractNumId -> fmt at level 0
  for (const el of topLevelElements(numberingXml, ["w:abstractNum"])) {
    const id = el.xml.match(/w:abstractNumId="(\d+)"/)?.[1];
    if (id === undefined) continue;
    const lvl0 = topLevelElements(el.xml, ["w:lvl"])[0];
    const fmt = (lvl0 ?? el).xml.match(/<w:numFmt\s+w:val="([^"]+)"/)?.[1];
    if (fmt) abstractFmt.set(id, fmt);
  }

  for (const el of topLevelElements(numberingXml, ["w:num"])) {
    const numId = el.xml.match(/w:numId="(\d+)"/)?.[1];
    const absId = el.xml.match(/<w:abstractNumId\s+w:val="(\d+)"/)?.[1];
    if (numId !== undefined && absId !== undefined) {
      map.set(numId, abstractFmt.get(absId) ?? "decimal");
    }
  }
  return map;
}

function listInfoOf(pXml, numbering) {
  if (!/<w:numPr>/.test(pXml)) return null;
  const numId = pXml.match(/<w:numId\s+w:val="(\d+)"/)?.[1];
  const fmt = numId !== undefined ? numbering.get(numId) : undefined;
  return { ordered: fmt !== undefined && fmt !== "bullet" };
}

// ── Table parsing ───────────────────────────────────────────────────────────

function parseTable(tblXml) {
  const rows = [];
  for (const tr of topLevelElements(tblXml, ["w:tr"])) {
    const cells = [];
    let anyBold = false;
    for (const tc of topLevelElements(tr.xml, ["w:tc"])) {
      cells.push(textOf(tc.xml));
      if (isBold(tc.xml)) anyBold = true;
    }
    if (cells.length) rows.push({ cells, bold: anyBold });
  }
  return rows;
}

const CALLOUT_PREFIXES = [
  [/^INFO[:\-—]\s*/i, "info"],
  [/^NOTE[:\-—]\s*/i, "info"],
  [/^WARNING[:\-—]\s*/i, "warning"],
  [/^CAUTION[:\-—]\s*/i, "warning"],
  [/^TIP[:\-—]\s*/i, "tip"],
];

// ── Main ────────────────────────────────────────────────────────────────────

/**
 * Parse a .docx buffer into { meta, content }.
 * The first table in the document is treated as the metadata table
 * (two columns: field name | value). Everything after it is article body.
 */
export function parseDocx(buffer) {
  const files = unzip(buffer);
  const docBuf = files.get("word/document.xml");
  if (!docBuf) throw new Error("This does not look like a Word document (word/document.xml missing).");

  const doc = docBuf.toString("utf8");
  const numbering = buildNumberingMap(files.get("word/numbering.xml")?.toString("utf8"));

  const bodyMatch = doc.match(/<w:body[^>]*>([\s\S]*)<\/w:body>/);
  const body = bodyMatch ? bodyMatch[1] : doc;

  const elements = topLevelElements(body, ["w:p", "w:tbl"]);

  const meta = {};
  const content = [];
  let metaTableTaken = false;

  // Buffers so consecutive list items collapse into one block.
  let listBuf = null; // { ordered, items[] }
  const flushList = () => {
    if (listBuf && listBuf.items.length) {
      content.push({ type: listBuf.ordered ? "numbered" : "bullets", items: listBuf.items });
    }
    listBuf = null;
  };

  for (const el of elements) {
    if (el.tag === "w:tbl") {
      const rows = parseTable(el.xml);
      if (!rows.length) continue;

      // First table = metadata
      if (!metaTableTaken) {
        metaTableTaken = true;
        for (const r of rows) {
          if (r.cells.length >= 2) {
            const key = r.cells[0].replace(/[\s_]+/g, "").toLowerCase();
            if (key) meta[key] = r.cells.slice(1).join(" ").trim();
          }
        }
        continue;
      }

      flushList();
      const width = Math.max(...rows.map((r) => r.cells.length));

      if (width === 2) {
        // Two columns => a calculation / figures block.
        content.push({
          type: "calculation",
          rows: rows.map((r) => {
            const label = r.cells[0] ?? "";
            const amount = r.cells[1] ?? "";
            const row = { label, amount };
            if (r.bold) row.total = true;
            if (/^(add|less|plus|minus)\b/i.test(label)) row.indent = true;
            if (/^\(.*\)$/.test(amount.trim()) || /^-/.test(amount.trim())) row.negative = true;
            return row;
          }),
        });
      } else {
        // Three or more columns => a data table; first row is the header.
        const [head, ...rest] = rows;
        content.push({
          type: "table",
          headers: head.cells,
          rows: rest.map((r) => (r.bold ? { cells: r.cells, bold: true } : { cells: r.cells })),
        });
      }
      continue;
    }

    // Anything above the settings table is a label for the author's benefit
    // and is not part of the article.
    if (!metaTableTaken) continue;

    // Paragraph
    const text = textOf(el.xml);
    const style = styleOf(el.xml);
    const list = listInfoOf(el.xml, numbering);

    if (list) {
      if (!text) continue;
      if (!listBuf || listBuf.ordered !== list.ordered) {
        flushList();
        listBuf = { ordered: list.ordered, items: [] };
      }
      listBuf.items.push(text);
      continue;
    }

    flushList();
    if (!text) continue;

    if (/^Heading1$/i.test(style) || /^Title$/i.test(style)) {
      content.push({ type: "heading", text });
      continue;
    }
    if (/^Heading[2-6]$/i.test(style) || /^Subtitle$/i.test(style)) {
      content.push({ type: "subheading", text });
      continue;
    }

    const hit = CALLOUT_PREFIXES.find(([re]) => re.test(text));
    if (hit) {
      content.push({ type: "callout", variant: hit[1], text: text.replace(hit[0], "") });
      continue;
    }

    content.push({ type: "paragraph", text });
  }

  flushList();
  return { meta, content };
}
