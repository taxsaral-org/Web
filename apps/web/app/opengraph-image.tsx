import { ImageResponse } from "next/og";
import { MAPPINGS, SECTIONS_IN_FORCE, oldRefs } from "./section-mapping/_components/mapping-data";

// Social share card, generated at build time. Without this every link
// shared to LinkedIn, X or WhatsApp renders as a blank card.
export const alt =
  "TaxSaral — Income Tax Act 2025: case law, section guide and calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered on request rather than at build time. @vercel/og resolves its
// bundled font through fileURLToPath, which throws on Windows when the
// project path contains a space — as this one does ("03. TaxSaral.org").
// Deferring to runtime keeps local builds working; the image is still
// generated once and cached at the edge.
export const dynamic = "force-dynamic";

// Same palette as globals.css: paper, ink, one deep green.
const PAPER = "#fbf9f6";
const INK = "#1f1b17";
const MUTED = "#6f665d";
const RULE = "#ddd5ca";
const GREEN = "#1b5545";

// A few familiar sections, with the new number read from the mapping data.
const PAIRS = ["80C", "87A", "24", "45", "192"].flatMap((old) => {
  const row = MAPPINGS.find((m) => !m.groupRef && oldRefs(m.old).includes(old));
  return row ? [{ old, now: row.new }] : [];
});

const cell = { display: "flex", width: 120, justifyContent: "flex-start" } as const;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          borderTop: `14px solid ${GREEN}`,
          padding: "64px 80px 60px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, color: MUTED }}>
            Income Tax Act, 2025 · Tax Year 2026-27
          </div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -2, marginTop: 14 }}>
            TaxSaral
          </div>
          <div style={{ display: "flex", fontSize: 38, lineHeight: 1.3, color: "#3b342e", maxWidth: 980, marginTop: 10 }}>
            The section numbers you know changed on 1 April 2026. The old Act and the new one, side by side.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", borderTop: `2px solid ${RULE}`, paddingTop: 22 }}>
          <div style={{ display: "flex", fontSize: 28, color: MUTED }}>
            <div style={{ ...cell, width: 110 }}>1961</div>
            {PAIRS.map(({ old }) => (
              <div key={old} style={cell}>{old}</div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 28, marginTop: 8 }}>
            <div style={{ ...cell, width: 110, color: MUTED }}>2025</div>
            {PAIRS.map(({ old, now }) => (
              <div key={old} style={{ ...cell, color: GREEN, fontWeight: 700 }}>{now}</div>
            ))}
            <div style={{ display: "flex", marginLeft: "auto", color: MUTED }}>
              {SECTIONS_IN_FORCE} sections mapped
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
