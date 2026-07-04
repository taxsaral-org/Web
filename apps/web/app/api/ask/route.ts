import { NextRequest, NextResponse } from "next/server";

// Escape HTML to prevent XSS in the email body
function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

export async function POST(req: NextRequest) {
  let email = "", query = "";

  try {
    const body = await req.json();
    email = (body.email ?? "").trim();
    query = (body.query ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Basic validation
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (!query || query.length < 10) {
    return NextResponse.json({ error: "Query is too short." }, { status: 400 });
  }
  if (query.length > 5000) {
    return NextResponse.json({ error: "Query exceeds maximum length." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  // In development without config: log and succeed so the UI works
  if (!apiKey || !toEmail) {
    if (process.env.NODE_ENV === "development") {
      console.log("[ask] DEV mode — email not sent. Payload:");
      console.log({ from: email, query });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1d4ed8">New Tax Query — TaxSaral</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:8px;font-weight:600;width:120px">From</td>
          <td style="padding:8px">${escHtml(email)}</td>
        </tr>
        <tr style="background:#f8fafc">
          <td style="padding:8px;font-weight:600;vertical-align:top">Query</td>
          <td style="padding:8px">${escHtml(query)}</td>
        </tr>
      </table>
      <p style="margin-top:24px;font-size:13px;color:#64748b">
        Reply to this email to respond directly to the user at <strong>${escHtml(email)}</strong>.
        Submitted via TaxSaral — Tax Year 2026-27 · Income Tax Act 2025.
      </p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "TaxSaral Queries <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `Tax Query from ${email}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[ask] Resend error:", err);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ask] Fetch error:", err);
    return NextResponse.json(
      { error: "Network error. Please try again later." },
      { status: 503 }
    );
  }
}
