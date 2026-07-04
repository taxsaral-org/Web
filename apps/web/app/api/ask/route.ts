import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let email = "", query = "";

  try {
    const body = await req.json();
    email = (body.email ?? "").trim();
    query = (body.query ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (!query || query.length < 10) {
    return NextResponse.json({ error: "Query is too short." }, { status: 400 });
  }
  if (query.length > 5000) {
    return NextResponse.json({ error: "Query exceeds maximum length." }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    if (process.env.NODE_ENV === "development") {
      console.log("[ask] DEV mode — no WEB3FORMS_ACCESS_KEY set. Payload:");
      console.log({ email, query });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Tax Query — TaxSaral (from ${email})`,
        from_name: "TaxSaral",
        reply_to: email,
        // Web3Forms sends plain-text "message" field — no HTML escaping needed
        message: `From: ${email}\n\nQuery:\n${query}`,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.success === false) {
      console.error("[ask] Web3Forms error:", data);
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
