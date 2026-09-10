// Zero-dependency writer that produces a minimal, Word-compatible .docx.
// Used to generate the article template.

import { zip } from "./zip.mjs";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const XML_DECL = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const W_NS =
  'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';

export const BULLET_NUM_ID = 1;
export const NUMBER_NUM_ID = 2;

export function para(text, { style, bold, numId } = {}) {
  const pPr = [
    style ? `<w:pStyle w:val="${style}"/>` : "",
    numId
      ? `<w:numPr><w:ilvl w:val="0"/><w:numId w:val="${numId}"/></w:numPr>`
      : "",
  ].join("");
  const rPr = bold ? "<w:rPr><w:b/></w:rPr>" : "";
  return (
    `<w:p>${pPr ? `<w:pPr>${pPr}</w:pPr>` : ""}` +
    `<w:r>${rPr}<w:t xml:space="preserve">${esc(text)}</w:t></w:r></w:p>`
  );
}

export function table(rows, { widths } = {}) {
  const cols = Math.max(...rows.map((r) => r.cells.length));
  const w = widths ?? Array(cols).fill(Math.floor(9360 / cols));

  const grid = `<w:tblGrid>${w.map((x) => `<w:gridCol w:w="${x}"/>`).join("")}</w:tblGrid>`;
  const borders =
    "<w:tblBorders>" +
    ["top", "left", "bottom", "right", "insideH", "insideV"]
      .map((s) => `<w:${s} w:val="single" w:sz="4" w:color="999999"/>`)
      .join("") +
    "</w:tblBorders>";

  const body = rows
    .map((r) => {
      const cells = r.cells
        .map(
          (c, i) =>
            `<w:tc><w:tcPr><w:tcW w:w="${w[i] ?? w[0]}" w:type="dxa"/></w:tcPr>` +
            para(c, { bold: r.bold }) +
            "</w:tc>"
        )
        .join("");
      return `<w:tr>${cells}</w:tr>`;
    })
    .join("");

  return (
    `<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/>${borders}</w:tblPr>${grid}${body}</w:tbl>`
  );
}

function stylesXml() {
  const heading = (id, name, size, color) =>
    `<w:style w:type="paragraph" w:styleId="${id}">` +
    `<w:name w:val="${name}"/><w:basedOn w:val="Normal"/>` +
    `<w:pPr><w:spacing w:before="280" w:after="120"/><w:outlineLvl w:val="${id === "Heading1" ? 0 : 1}"/></w:pPr>` +
    `<w:rPr><w:b/><w:color w:val="${color}"/><w:sz w:val="${size}"/></w:rPr></w:style>`;

  return (
    `${XML_DECL}<w:styles ${W_NS}>` +
    `<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/></w:rPr></w:rPrDefault></w:docDefaults>` +
    `<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>` +
    heading("Heading1", "heading 1", "32", "1F3864") +
    heading("Heading2", "heading 2", "26", "2E5496") +
    `</w:styles>`
  );
}

function numberingXml() {
  const lvl = (fmt, text) =>
    `<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="${fmt}"/>` +
    `<w:lvlText w:val="${text}"/><w:lvlJc w:val="left"/>` +
    `<w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr>` +
    (fmt === "bullet"
      ? '<w:rPr><w:rFonts w:ascii="Symbol" w:hAnsi="Symbol"/></w:rPr>'
      : "") +
    `</w:lvl>`;

  return (
    `${XML_DECL}<w:numbering ${W_NS}>` +
    `<w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="hybridMultilevel"/>${lvl("bullet", "")}</w:abstractNum>` +
    `<w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="hybridMultilevel"/>${lvl("decimal", "%1.")}</w:abstractNum>` +
    `<w:num w:numId="${BULLET_NUM_ID}"><w:abstractNumId w:val="0"/></w:num>` +
    `<w:num w:numId="${NUMBER_NUM_ID}"><w:abstractNumId w:val="1"/></w:num>` +
    `</w:numbering>`
  );
}

export function buildDocx(bodyXml) {
  const document =
    `${XML_DECL}<w:document ${W_NS}><w:body>${bodyXml}` +
    `<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>` +
    `<w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr>` +
    `</w:body></w:document>`;

  const rel = (id, type, target) =>
    `<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/${type}" Target="${target}"/>`;

  return zip([
    {
      name: "[Content_Types].xml",
      data:
        `${XML_DECL}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
        `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
        `<Default Extension="xml" ContentType="application/xml"/>` +
        `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>` +
        `<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>` +
        `<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>` +
        `</Types>`,
    },
    {
      name: "_rels/.rels",
      data:
        `${XML_DECL}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
        rel("rId1", "officeDocument", "word/document.xml") +
        `</Relationships>`,
    },
    {
      name: "word/_rels/document.xml.rels",
      data:
        `${XML_DECL}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
        rel("rId1", "styles", "styles.xml") +
        rel("rId2", "numbering", "numbering.xml") +
        `</Relationships>`,
    },
    { name: "word/document.xml", data: document },
    { name: "word/styles.xml", data: stylesXml() },
    { name: "word/numbering.xml", data: numberingXml() },
  ]);
}
