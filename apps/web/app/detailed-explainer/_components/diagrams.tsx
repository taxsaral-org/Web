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

function SugarcaneRulesSplit() {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Rule 270 — Mr. Amar&apos;s Sugarcane (Field to Factory Bifurcation)
      </p>
      <svg
        viewBox="0 0 640 295"
        className="w-full max-w-2xl mx-auto h-auto"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <defs>
          <marker id="agr-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#374151" />
          </marker>
        </defs>

        {/* Top central box */}
        <rect x="195" y="10" width="250" height="50" rx="7" fill="#1e3a5f" />
        <text x="320" y="31" textAnchor="middle" fill="white" fontSize="12.5" fontWeight="700">
          Mr. Amar — Sugarcane Crop
        </text>
        <text x="320" y="50" textAnchor="middle" fill="#93c5fd" fontSize="10.5">
          Rule 270 — split between two uses
        </text>

        {/* Arrow to left box (40%) */}
        <polyline
          points="220,60 105,60 105,110"
          fill="none" stroke="#374151" strokeWidth="1.5"
          markerEnd="url(#agr-arr)"
        />
        <rect x="78" y="51" width="40" height="18" rx="3" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
        <text x="98" y="63.5" textAnchor="middle" fill="#065f46" fontSize="10.5" fontWeight="700">40%</text>

        {/* Arrow to right box (60%) */}
        <polyline
          points="420,60 535,60 535,110"
          fill="none" stroke="#374151" strokeWidth="1.5"
          markerEnd="url(#agr-arr)"
        />
        <rect x="508" y="51" width="40" height="18" rx="3" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1" />
        <text x="528" y="63.5" textAnchor="middle" fill="#78350f" fontSize="10.5" fontWeight="700">60%</text>

        {/* Left box — Direct Sale */}
        <rect x="10" y="110" width="195" height="150" rx="6" fill="white" stroke="#6b7280" strokeWidth="1.2" />
        <rect x="10" y="110" width="195" height="28" rx="6" fill="#dcfce7" />
        <rect x="10" y="126" width="195" height="12" fill="#dcfce7" />
        <text x="107" y="128" textAnchor="middle" fill="#14532d" fontSize="11.5" fontWeight="700">Sold Directly</text>

        <text x="22" y="158" fill="#374151" fontSize="10.5">Sale Proceeds</text>
        <text x="198" y="158" textAnchor="end" fill="#374151" fontSize="10.5">₹12,00,000</text>
        <line x1="22" y1="164" x2="198" y2="164" stroke="#e5e7eb" strokeWidth="0.8" />
        <text x="22" y="178" fill="#6b7280" fontSize="10">Less: Cultivation Cost</text>
        <text x="198" y="178" textAnchor="end" fill="#dc2626" fontSize="10">(₹6,00,000)</text>
        <line x1="22" y1="185" x2="198" y2="185" stroke="#374151" strokeWidth="1" />
        <text x="22" y="200" fill="#14532d" fontSize="11" fontWeight="700">Agricultural Income</text>
        <text x="198" y="200" textAnchor="end" fill="#14532d" fontSize="11" fontWeight="700">₹6,00,000</text>

        <rect x="22" y="213" width="95" height="18" rx="4" fill="#d1fae5" />
        <text x="69" y="225.5" textAnchor="middle" fill="#065f46" fontSize="9.5" fontWeight="600">EXEMPT ✓</text>

        {/* Right box — Factory Processing */}
        <rect x="435" y="110" width="195" height="150" rx="6" fill="white" stroke="#6b7280" strokeWidth="1.2" />
        <rect x="435" y="110" width="195" height="28" rx="6" fill="#fef9c3" />
        <rect x="435" y="126" width="195" height="12" fill="#fef9c3" />
        <text x="532" y="128" textAnchor="middle" fill="#78350f" fontSize="11.5" fontWeight="700">Factory Processing</text>

        <text x="447" y="154" fill="#14532d" fontSize="9.5" fontWeight="600">Agri portion (FMV − Cultivation)</text>
        <text x="447" y="169" fill="#374151" fontSize="10">FMV ₹25L − Cult ₹15L</text>
        <text x="623" y="169" textAnchor="end" fill="#14532d" fontSize="10" fontWeight="700">₹10,00,000</text>
        <rect x="447" y="174" width="70" height="17" rx="3" fill="#d1fae5" />
        <text x="482" y="185.5" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="600">Exempt ✓</text>

        <line x1="447" y1="196" x2="623" y2="196" stroke="#e5e7eb" strokeWidth="0.8" />

        <text x="447" y="212" fill="#dc2626" fontSize="9.5" fontWeight="600">Business portion (Sale − FMV − Mfg)</text>
        <text x="447" y="227" fill="#374151" fontSize="10">₹30L − ₹25L − ₹1.5L</text>
        <text x="623" y="227" textAnchor="end" fill="#dc2626" fontSize="10" fontWeight="700">₹3,50,000</text>
        <rect x="447" y="233" width="65" height="17" rx="3" fill="#fee2e2" />
        <text x="480" y="244.5" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="600">Taxable ✗</text>

        {/* Summary bar */}
        <rect x="10" y="273" width="620" height="20" rx="5" fill="#f8fafc" stroke="#e5e7eb" strokeWidth="1" />
        <text x="320" y="286" textAnchor="middle" fill="#374151" fontSize="10.5">
          Total Agri Income (Exempt): ₹16,00,000 &nbsp;|&nbsp; Total Business Income (Taxable): ₹3,50,000
        </text>
      </svg>
    </div>
  );
}

function AgriculturalDecisionTree() {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Decision Tree — How to Tax Agricultural Income
      </p>
      <svg
        viewBox="0 0 680 575"
        className="w-full max-w-2xl mx-auto h-auto"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <defs>
          <marker id="dt-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#374151" />
          </marker>
        </defs>

        {/* Box A — Start */}
        <rect x="235" y="10" width="210" height="55" rx="6" fill="white" stroke="#6b7280" strokeWidth="1.5" />
        <text x="340" y="35" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="700">Does income meet</text>
        <text x="340" y="53" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="700">Section 2(5) criteria?</text>

        {/* A→B (No, left) */}
        <polyline points="235,37 190,37 190,137 170,137" fill="none" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dt-arr)" />
        <rect x="163" y="26" width="28" height="16" rx="3" fill="#fee2e2" />
        <text x="177" y="37.5" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="700">No</text>

        {/* A→C (Yes, down) */}
        <line x1="340" y1="65" x2="340" y2="110" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dt-arr)" />
        <rect x="345" y="78" width="30" height="16" rx="3" fill="#dcfce7" />
        <text x="360" y="89.5" textAnchor="middle" fill="#14532d" fontSize="9.5" fontWeight="700">Yes</text>

        {/* Box B — Fully Taxable */}
        <rect x="10" y="110" width="160" height="55" rx="6" fill="#fee2e2" stroke="#f87171" strokeWidth="1.5" />
        <text x="90" y="136" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="700">Fully Taxable</text>
        <text x="90" y="153" textAnchor="middle" fill="#991b1b" fontSize="11">as PGBP</text>

        {/* Box C — Own processing? */}
        <rect x="235" y="110" width="210" height="55" rx="6" fill="white" stroke="#6b7280" strokeWidth="1.5" />
        <text x="340" y="136" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="700">Processed in</text>
        <text x="340" y="153" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="700">own business?</text>

        {/* C→D (No, left) */}
        <polyline points="235,137 185,137 185,237 170,237" fill="none" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dt-arr)" />
        <rect x="188" y="126" width="28" height="16" rx="3" fill="#fee2e2" />
        <text x="202" y="137.5" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="700">No</text>

        {/* C→E (Yes, down) */}
        <line x1="340" y1="165" x2="340" y2="210" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dt-arr)" />
        <rect x="345" y="178" width="30" height="16" rx="3" fill="#dcfce7" />
        <text x="360" y="189.5" textAnchor="middle" fill="#14532d" fontSize="9.5" fontWeight="700">Yes</text>

        {/* Box D — 100% Exempt */}
        <rect x="10" y="210" width="160" height="55" rx="6" fill="#dcfce7" stroke="#4ade80" strokeWidth="1.5" />
        <text x="90" y="236" textAnchor="middle" fill="#14532d" fontSize="12" fontWeight="700">100% Exempt</text>
        <text x="90" y="253" textAnchor="middle" fill="#14532d" fontSize="11">Agricultural Income</text>

        {/* Box E — Specified crop? */}
        <rect x="235" y="210" width="210" height="55" rx="6" fill="white" stroke="#6b7280" strokeWidth="1.5" />
        <text x="340" y="236" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="700">Specified crop?</text>
        <text x="340" y="253" textAnchor="middle" fill="#6b7280" fontSize="10.5">(Tea / Coffee / Rubber)</text>

        {/* E→F (Yes, right) */}
        <polyline points="445,237 580,237 580,310" fill="none" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dt-arr)" />
        <rect x="449" y="226" width="30" height="16" rx="3" fill="#dcfce7" />
        <text x="464" y="237.5" textAnchor="middle" fill="#14532d" fontSize="9.5" fontWeight="700">Yes</text>

        {/* E→G (No, down) */}
        <line x1="340" y1="265" x2="340" y2="310" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dt-arr)" />
        <rect x="345" y="278" width="28" height="16" rx="3" fill="#fee2e2" />
        <text x="359" y="289.5" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="700">No</text>

        {/* Box F — Rule 271 */}
        <rect x="490" y="310" width="180" height="55" rx="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.5" />
        <text x="580" y="336" textAnchor="middle" fill="#1e40af" fontSize="11.5" fontWeight="700">Apply Rule 271</text>
        <text x="580" y="353" textAnchor="middle" fill="#1e40af" fontSize="10">(Tea / Coffee / Rubber %)</text>

        {/* Box G — Rule 270 */}
        <rect x="240" y="310" width="180" height="55" rx="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.5" />
        <text x="330" y="336" textAnchor="middle" fill="#1e40af" fontSize="11.5" fontWeight="700">Apply Rule 270</text>
        <text x="330" y="353" textAnchor="middle" fill="#1e40af" fontSize="10">Bifurcation (FMV pivot)</text>

        {/* G→H (down) */}
        <line x1="330" y1="365" x2="330" y2="415" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dt-arr)" />

        {/* F→H (down-left) */}
        <polyline points="580,365 580,393 332,393 332,415" fill="none" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dt-arr)" />

        {/* Box H — Partial integration? */}
        <rect x="175" y="415" width="310" height="60" rx="6" fill="white" stroke="#6b7280" strokeWidth="1.5" />
        <text x="330" y="441" textAnchor="middle" fill="#111827" fontSize="11.5" fontWeight="700">Qualify for Partial Integration?</text>
        <text x="330" y="458" textAnchor="middle" fill="#6b7280" fontSize="9.5">Individual/HUF/AOP AND agri &gt; ₹5K AND non-agri &gt; basic limit</text>

        {/* H→I (Yes, left) */}
        <polyline points="175,445 110,445 110,515" fill="none" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dt-arr)" />
        <rect x="118" y="434" width="30" height="16" rx="3" fill="#dcfce7" />
        <text x="133" y="445.5" textAnchor="middle" fill="#14532d" fontSize="9.5" fontWeight="700">Yes</text>

        {/* H→J (No, right) */}
        <polyline points="485,445 570,445 570,515" fill="none" stroke="#374151" strokeWidth="1.5" markerEnd="url(#dt-arr)" />
        <rect x="490" y="434" width="28" height="16" rx="3" fill="#fee2e2" />
        <text x="504" y="445.5" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="700">No</text>

        {/* Box I — 4-Step Partial Integration */}
        <rect x="10" y="515" width="200" height="50" rx="6" fill="#ede9fe" stroke="#a78bfa" strokeWidth="1.5" />
        <text x="110" y="539" textAnchor="middle" fill="#4c1d95" fontSize="11.5" fontWeight="700">4-Step Partial</text>
        <text x="110" y="556" textAnchor="middle" fill="#4c1d95" fontSize="11.5" fontWeight="700">Integration</text>

        {/* Box J — No Further Action */}
        <rect x="470" y="515" width="200" height="50" rx="6" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="570" y="539" textAnchor="middle" fill="#374151" fontSize="11.5" fontWeight="700">No Further</text>
        <text x="570" y="556" textAnchor="middle" fill="#374151" fontSize="11.5" fontWeight="700">Action</text>
      </svg>
    </div>
  );
}

function COAGrandfatheringFormula() {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Section 90(7) — The COA Formula (Grandfathering)
      </p>
      <svg
        viewBox="0 0 580 215"
        className="w-full max-w-xl mx-auto h-auto"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <defs>
          <marker id="coa-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#374151" />
          </marker>
        </defs>

        {/* Top box: COA = HIGHER OF */}
        <rect x="160" y="10" width="260" height="54" rx="8" fill="#0f4c3a" />
        <text x="210" y="34" fill="white" fontSize="13" fontWeight="700">COA</text>
        <text x="248" y="34" fill="white" fontSize="13"> = </text>
        <rect x="270" y="18" width="100" height="26" rx="13" fill="#16a34a" />
        <text x="320" y="35" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">HIGHER OF</text>
        <text x="290" y="55" textAnchor="middle" fill="#6ee7b7" fontSize="10">Master this formula and every problem is plug-and-play</text>

        {/* Fork lines */}
        <line x1="290" y1="64" x2="290" y2="84" stroke="#6b7280" strokeWidth="1.5" />
        <line x1="120" y1="84" x2="460" y2="84" stroke="#6b7280" strokeWidth="1.5" />
        <line x1="120" y1="84" x2="120" y2="110" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#coa-arr)" />
        <line x1="460" y1="84" x2="460" y2="104" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#coa-arr)" />

        {/* A label at fork */}
        <text x="195" y="80" fill="#6b7280" fontSize="9.5" fontWeight="600" fontStyle="italic">A</text>
        <text x="430" y="80" fill="#6b7280" fontSize="9.5" fontWeight="600" fontStyle="italic">B</text>

        {/* Box A: Actual Cost */}
        <rect x="20" y="110" width="200" height="55" rx="6" fill="#dcfce7" stroke="#4ade80" strokeWidth="1.5" />
        <text x="120" y="136" textAnchor="middle" fill="#14532d" fontSize="12" fontWeight="700">Actual Cost</text>
        <text x="120" y="154" textAnchor="middle" fill="#14532d" fontSize="12" fontWeight="700">of Acquisition</text>

        {/* Box B: LOWER OF container */}
        <rect x="340" y="104" width="220" height="104" rx="6" fill="#fff7ed" stroke="#fb923c" strokeWidth="1.5" />
        {/* LOWER OF badge */}
        <rect x="395" y="112" width="110" height="22" rx="11" fill="#fb923c" />
        <text x="450" y="127" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">LOWER OF</text>

        {/* Sub-pill 1: FMV on 31.01.2018 */}
        <rect x="355" y="142" width="195" height="26" rx="5" fill="white" stroke="#9ca3af" strokeWidth="1.2" />
        <text x="452" y="158.5" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="600">FMV on 31.01.2018</text>

        {/* Sub-pill 2: Sale Value */}
        <rect x="355" y="175" width="195" height="26" rx="5" fill="white" stroke="#9ca3af" strokeWidth="1.2" />
        <text x="452" y="191.5" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="600">Sale Value</text>
      </svg>
    </div>
  );
}

export function getDiagram(id: string): ReactNode {
  const diagrams: Record<string, ReactNode> = {
    "deemed-dividend-flow": <DeemedDividendFlow />,
    "sv-pvt-ltd-setoff": <SVPvtLtdSetoff />,
    "sugarcane-split": <SugarcaneRulesSplit />,
    "agricultural-decision-tree": <AgriculturalDecisionTree />,
    "coa-grandfathering-formula": <COAGrandfatheringFormula />,
  };
  return diagrams[id] ?? null;
}
