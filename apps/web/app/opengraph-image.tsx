import { ImageResponse } from "next/og";

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

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 55%, #0f766e 100%)",
          color: "white",
          padding: "70px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#a5b4fc",
            marginBottom: 26,
          }}
        >
          Tax Year 2026-27 · Income Tax Act 2025
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 26,
          }}
        >
          TaxSaral
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 38,
            lineHeight: 1.3,
            color: "#e0e7ff",
            maxWidth: 940,
          }}
        >
          Landmark case law mapped to the new sections, a full 1961-to-2025
          section mapping, explainers and free calculators.
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 46,
            fontSize: 26,
            color: "#c7d2fe",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "2px solid #6366f1",
              borderRadius: 999,
              padding: "8px 24px",
            }}
          >
            112 judgments
          </div>
          <div
            style={{
              display: "flex",
              border: "2px solid #6366f1",
              borderRadius: 999,
              padding: "8px 24px",
            }}
          >
            536 section mappings
          </div>
          <div
            style={{
              display: "flex",
              border: "2px solid #6366f1",
              borderRadius: 999,
              padding: "8px 24px",
            }}
          >
            No login · No ads
          </div>
        </div>
      </div>
    ),
    size
  );
}
