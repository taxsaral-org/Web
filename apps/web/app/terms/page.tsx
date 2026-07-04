import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — TaxSaral",
  description: "Terms and conditions for using TaxSaral's free income tax calculators and guides.",
};

const EFFECTIVE_DATE = "1 July 2026";

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
      </div>

      <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">1. Acceptance of terms</h2>
          <p>
            By accessing or using <strong className="text-foreground">taxsaral.org</strong> (&quot;the Site&quot;),
            you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">2. Nature of the service</h2>
          <p>
            TaxSaral provides free income tax calculators, educational guides, and a question-and-answer
            service based on the <strong className="text-foreground">Income Tax Act 2025</strong> as
            applicable to Tax Year 2026-27 (Assessment Year 2027-28).
          </p>
          <p className="mt-2">
            The Site is intended for Indian individual taxpayers seeking to understand their approximate
            tax liability and to learn about the provisions of the IT Act 2025.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">3. No tax or legal advice</h2>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <p className="font-semibold mb-1">Important — please read carefully</p>
            <p className="text-sm leading-relaxed">
              Nothing on TaxSaral — including calculator outputs, guide articles, and email responses
              to questions — constitutes tax advice, legal advice, or professional financial advice.
              All content is provided for <strong>educational and informational purposes only</strong>.
            </p>
          </div>
          <p className="mt-3">
            Tax calculations on this Site are estimates based on general inputs. They do not account for
            every individual circumstance, exemption, or ruling that may apply to your specific situation.
            You must consult a qualified <strong className="text-foreground">Chartered Accountant (CA)
            or tax professional</strong> before:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Filing your Income Tax Return</li>
            <li>Making advance tax payments</li>
            <li>Claiming deductions or exemptions</li>
            <li>Making investment or financial decisions based on tax implications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">4. Accuracy and updates</h2>
          <p>
            We make reasonable efforts to ensure all content reflects the Income Tax Act 2025 accurately.
            However, tax law is complex and subject to change through Finance Acts, notifications, circulars,
            and judicial decisions. We do not warrant that the information on this Site is complete, current,
            or error-free.
          </p>
          <p className="mt-2">
            TaxSaral is not responsible for any errors or omissions in the content, or for any loss or
            damage arising from reliance on information provided on the Site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">5. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by applicable law, TaxSaral and its operators shall not be
            liable for any direct, indirect, incidental, consequential, or special damages arising out of:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your use of or reliance on any calculator output or guide content</li>
            <li>Any errors, inaccuracies, or omissions in the content</li>
            <li>Any tax liability, penalty, or interest arising from decisions made based on this Site</li>
            <li>Interruption or unavailability of the Site</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">6. Ask a Question service</h2>
          <p>
            Responses provided through the &quot;Ask a Question&quot; feature are offered as general educational
            guidance only. They are not personalised tax advice and do not create a professional relationship
            between you and TaxSaral or any of its team members.
          </p>
          <p className="mt-2">
            We aim to respond within 2–3 business days but do not guarantee response times. We reserve
            the right to decline to answer questions that are outside the scope of the IT Act 2025 or
            that require professional engagement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">7. Intellectual property</h2>
          <p>
            All content on TaxSaral — including text, calculator logic, design, and code — is the property
            of TaxSaral and is protected under applicable intellectual property laws.
          </p>
          <p className="mt-2">
            You may share links to our pages and reference our content for personal, non-commercial purposes
            with appropriate attribution. You may not reproduce, copy, or redistribute our content for
            commercial purposes without prior written permission.
          </p>
          <p className="mt-2">
            The provisions of the Income Tax Act 2025 reproduced on this Site are public law and remain
            the property of the Government of India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">8. Third-party links</h2>
          <p>
            The Site may contain links to third-party websites (such as the Income Tax Department portal
            or other resources). These links are provided for convenience only. We have no control over,
            and accept no responsibility for, the content or practices of linked sites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">9. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Use the Site for any unlawful purpose</li>
            <li>Attempt to scrape, copy, or reproduce the Site&apos;s content at scale</li>
            <li>Submit false, misleading, or abusive content through the Ask a Question form</li>
            <li>Interfere with the Site&apos;s infrastructure or security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">10. Governing law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes arising from use of this Site
            shall be subject to the jurisdiction of courts in India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">11. Changes to these terms</h2>
          <p>
            We may update these Terms from time to time. The effective date at the top of this page will
            be updated accordingly. Your continued use of the Site after any changes constitutes acceptance
            of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">12. Contact</h2>
          <p>
            Questions about these Terms may be directed to:{" "}
            <a href="mailto:vsriram1008@gmail.com" className="text-primary underline underline-offset-4">
              vsriram1008@gmail.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
