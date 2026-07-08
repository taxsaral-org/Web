import type { ReactNode } from "react";

function DeemedDividendFlow() {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        How Section 2(40)(e) Works
      </p>
      <svg
        viewBox="0 0 740 288"
        className="w-full max-w-2xl mx-auto h-auto"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <defs>
          <marker id="dd-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#374151" />
          </marker>
          <marker id="dd-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
          </marker>
        </defs>

        {/* Section label */}
        <text x="8" y="16" fill="#374151" fontSize="11" fontWeight="700">Sec. 2(40)(e)</text>

        {/* Closely Held Co box */}
        <rect x="8" y="108" width="172" height="68" rx="7" fill="#1e3a5f" />
        <text x="94" y="134" textAnchor="middle" fill="white" fontSize="12.5" fontWeight="700">
          Closely Held Co.
        </text>
        <text x="94" y="155" textAnchor="middle" fill="#93c5fd" fontSize="11">
          (Unlisted Co.)
        </text>

        {/* "Co | firm | AOP | BOI" header */}
        <text x="616" y="15" textAnchor="middle" fill="#374151" fontSize="10.5" fontWeight="500">
          Co | firm | AOP | BOI
        </text>

        {/* Concern box */}
        <rect x="466" y="20" width="155" height="55" rx="6" fill="white" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="543" y="52" textAnchor="middle" fill="#111827" fontSize="13.5" fontWeight="700">
          Concern
        </text>

        {/* Substantial interest note */}
        <text x="628" y="31" fill="#6b7280" fontSize="9.5">Substantial</text>
        <text x="628" y="44" fill="#6b7280" fontSize="9.5">interest at</text>
        <text x="628" y="57" fill="#6b7280" fontSize="9.5">any time in T.Y.</text>

        {/* Shareholder box */}
        <rect x="466" y="108" width="142" height="68" rx="6" fill="white" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="537" y="147" textAnchor="middle" fill="#111827" fontSize="13.5" fontWeight="700">
          Shareholder
        </text>

        {/* Deemed Dividend box */}
        <rect x="620" y="119" width="112" height="46" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
        <text x="676" y="138" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="700">
          Deemed
        </text>
        <text x="676" y="154" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="700">
          Dividend
        </text>

        {/* Any other person box */}
        <rect x="466" y="216" width="142" height="62" rx="6" fill="white" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="537" y="246" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="700">
          Any other
        </text>
        <text x="537" y="264" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="700">
          person
        </text>

        {/* Arrow: Closely Held → Concern (upper diagonal) */}
        <line x1="180" y1="124" x2="464" y2="46" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dd-arr)" />
        <text x="308" y="70" textAnchor="middle" fill="#374151" fontSize="10.5" fontStyle="italic">
          Loan or Adv.
        </text>

        {/* Arrow: Closely Held → Shareholder (horizontal) */}
        <line x1="180" y1="142" x2="464" y2="142" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dd-arr)" />
        {/* Blue highlight pill on middle arrow */}
        <rect x="208" y="126" width="85" height="19" rx="4" fill="#dbeafe" />
        <text x="250" y="139.5" textAnchor="middle" fill="#1d4ed8" fontSize="10.5" fontWeight="600">
          Loan or Adv.
        </text>
        <text x="308" y="160" textAnchor="middle" fill="#7c3aed" fontSize="9.5">
          10% or more equity shares
        </text>
        <text x="308" y="172" textAnchor="middle" fill="#7c3aed" fontSize="9.5">
          (Voting power)
        </text>

        {/* Arrow: Closely Held → Any other person (lower diagonal) */}
        <line x1="180" y1="162" x2="464" y2="232" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dd-arr)" />
        <text x="304" y="220" textAnchor="middle" fill="#374151" fontSize="10.5" fontStyle="italic">
          Loan or Adv.
        </text>

        {/* Arrow: Shareholder → Deemed Dividend */}
        <line x1="608" y1="142" x2="618" y2="142" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dd-arr)" />

        {/* Red dashed arrow: Shareholder → Any other person (vertical) */}
        <line
          x1="537"
          y1="176"
          x2="537"
          y2="214"
          stroke="#dc2626"
          strokeWidth="1.5"
          strokeDasharray="5,3"
          markerEnd="url(#dd-red)"
        />
        <text x="556" y="200" fill="#dc2626" fontSize="9.5" fontWeight="600">
          On behalf of
        </text>
      </svg>
    </div>
  );
}

function SVPvtLtdSetoff() {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Set-off Example — SV Pvt. Ltd.
      </p>
      <svg
        viewBox="0 0 610 298"
        className="w-full max-w-xl mx-auto h-auto"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <defs>
          <marker id="sv-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#374151" />
          </marker>
          <marker id="sv-grn" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" />
          </marker>
          <marker id="sv-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
          </marker>
        </defs>

        {/* SV PVT LTD box */}
        <rect x="8" y="12" width="148" height="90" rx="7" fill="white" stroke="#374151" strokeWidth="1.5" />
        <text x="82" y="36" textAnchor="middle" fill="#111827" fontSize="12.5" fontWeight="700">
          SV PVT LTD
        </text>
        <text x="82" y="55" textAnchor="middle" fill="#6b7280" fontSize="10">
          Rec.&amp; Surplus
        </text>
        <text x="82" y="75" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="600">
          ₹15,00,000
        </text>

        {/* DP box */}
        <rect x="370" y="22" width="100" height="55" rx="6" fill="white" stroke="#374151" strokeWidth="1.5" />
        <text x="420" y="54" textAnchor="middle" fill="#111827" fontSize="14" fontWeight="700">
          DP.
        </text>

        {/* Deemed Dividend box (right of DP) */}
        <rect x="480" y="12" width="122" height="75" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
        <text x="541" y="36" textAnchor="middle" fill="#78350f" fontSize="10.5" fontWeight="700">
          Deemed
        </text>
        <text x="541" y="51" textAnchor="middle" fill="#78350f" fontSize="10.5" fontWeight="700">
          Dividend
        </text>
        <text x="541" y="64" textAnchor="middle" fill="#78350f" fontSize="9.5">
          u/s 2(40)(e)
        </text>
        <text x="541" y="78" textAnchor="middle" fill="#78350f" fontSize="9.5">
          loan A/cnt.
        </text>

        {/* Loan arrow: SV → DP */}
        <line x1="156" y1="55" x2="368" y2="55" stroke="#374151" strokeWidth="1.5" markerEnd="url(#sv-arr)" />
        <text x="255" y="43" textAnchor="middle" fill="#6b7280" fontSize="10">
          17/7/26
        </text>
        <text x="255" y="57" textAnchor="middle" fill="#374151" fontSize="10.5" fontWeight="600">
          ₹5,00,000
        </text>
        <text x="255" y="70" textAnchor="middle" fill="#6b7280" fontSize="9.5">
          loan A/cnt.
        </text>

        {/* DP → Deemed Dividend arrow */}
        <line x1="470" y1="49" x2="479" y2="49" stroke="#374151" strokeWidth="1.5" markerEnd="url(#sv-arr)" />

        {/* Actual Dividend banner */}
        <rect x="168" y="135" width="238" height="52" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="287" y="156" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="700">
          Actual Dividend
        </text>
        <text x="287" y="174" textAnchor="middle" fill="#14532d" fontSize="11.5">
          ₹10,00,000
        </text>
        <text x="287" y="188" textAnchor="middle" fill="#14532d" fontSize="9.5">
          10/12/26
        </text>

        {/* Arrow: SV PVT LTD box down → left edge of Actual Dividend banner */}
        <polyline
          points="82,102 82,161 168,161"
          fill="none"
          stroke="#374151"
          strokeWidth="1.5"
          markerEnd="url(#sv-arr)"
        />

        {/* Arrow: DP box down → right edge of Actual Dividend banner */}
        <polyline
          points="420,77 420,161 406,161"
          fill="none"
          stroke="#374151"
          strokeWidth="1.5"
          markerEnd="url(#sv-arr)"
        />

        {/* SV outcome box */}
        <rect x="8" y="212" width="148" height="78" rx="7" fill="white" stroke="#16a34a" strokeWidth="1.5" />
        <text x="82" y="234" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="700">
          SV
        </text>
        <text x="82" y="252" textAnchor="middle" fill="#374151" fontSize="11.5">
          ₹5,00,000
        </text>
        <text x="82" y="268" textAnchor="middle" fill="#374151" fontSize="10.5">
          Paid
        </text>
        <text x="82" y="284" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="700">
          Dividend ✓
        </text>

        {/* Arrow: Actual Dividend → SV outcome (green) */}
        <line x1="82" y1="187" x2="82" y2="210" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#sv-grn)" />

        {/* DP outcome box */}
        <rect x="360" y="212" width="148" height="78" rx="7" fill="white" stroke="#dc2626" strokeWidth="1.5" />
        <text x="434" y="234" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="700">
          DP
        </text>
        <text x="434" y="252" textAnchor="middle" fill="#374151" fontSize="11.5">
          ₹5,00,000
        </text>
        <text x="434" y="266" textAnchor="middle" fill="#374151" fontSize="10">
          Setoff against loan
        </text>
        <text x="434" y="280" textAnchor="middle" fill="#374151" fontSize="10">
          of DP.
        </text>
        <text x="434" y="296" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="700">
          Dividend ✗
        </text>

        {/* Arrow: Actual Dividend → DP outcome (red) */}
        <line x1="420" y1="187" x2="420" y2="210" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#sv-red)" />
      </svg>
    </div>
  );
}

export function getDiagram(id: string): ReactNode {
  const diagrams: Record<string, ReactNode> = {
    "deemed-dividend-flow": <DeemedDividendFlow />,
    "sv-pvt-ltd-setoff": <SVPvtLtdSetoff />,
  };
  return diagrams[id] ?? null;
}
