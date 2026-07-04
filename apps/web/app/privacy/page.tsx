import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — TaxSaral",
  description: "How TaxSaral collects, uses, and protects information when you use our free income tax calculators and guide.",
};

const EFFECTIVE_DATE = "1 July 2026";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
      </div>

      <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">1. Overview</h2>
          <p>
            TaxSaral (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website at{" "}
            <strong className="text-foreground">taxsaral.org</strong>. This Privacy Policy explains what
            information we collect when you use our site, how we use it, and your rights in relation to it.
          </p>
          <p className="mt-2">
            TaxSaral provides free income tax calculators and educational guides based on the Income Tax Act 2025.
            We are committed to being transparent about our data practices and to collecting only the minimum
            information necessary to operate the site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">2. Information we collect</h2>

          <h3 className="font-semibold text-foreground mt-4 mb-1">2a. Calculator inputs (not collected)</h3>
          <p>
            All tax calculations — income figures, deductions, days in India, employer details — are processed
            entirely within your browser. <strong className="text-foreground">This data is never sent to our
            servers</strong> and we have no access to it.
          </p>

          <h3 className="font-semibold text-foreground mt-4 mb-1">2b. Usage analytics (Google Analytics)</h3>
          <p>
            We use Google Analytics 4 (GA4) to understand how visitors use our site. GA4 automatically collects:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Pages visited and time spent on each page</li>
            <li>General geographic location (country / city level)</li>
            <li>Device type, operating system, and browser</li>
            <li>Referring website or search engine</li>
            <li>Session duration and bounce rate</li>
          </ul>
          <p className="mt-2">
            This data is anonymous and aggregated. Google Analytics sets cookies in your browser to track sessions.
            You can opt out of GA4 tracking by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h3 className="font-semibold text-foreground mt-4 mb-1">2c. Ask a Question form</h3>
          <p>
            When you submit a question through our &quot;Ask a Question&quot; page, we collect:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your email address (to send our reply)</li>
            <li>The text of your query</li>
          </ul>
          <p className="mt-2">
            This information is transmitted via Web3Forms (web3forms.com) to our team&apos;s email inbox.
            We use it solely to respond to your question. We do not add you to any mailing list or share
            your email with third parties. Web3Forms&apos; privacy practices are governed by their own
            Privacy Policy available at web3forms.com.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">3. Cookies</h2>
          <p>
            TaxSaral does not set any first-party cookies. Google Analytics sets the following cookies:
          </p>
          <div className="mt-2 overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-foreground">Cookie</th>
                  <th className="px-4 py-2 text-left font-medium text-foreground">Purpose</th>
                  <th className="px-4 py-2 text-left font-medium text-foreground">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">_ga</td>
                  <td className="px-4 py-2">Distinguishes unique users</td>
                  <td className="px-4 py-2">2 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">_ga_*</td>
                  <td className="px-4 py-2">Maintains session state</td>
                  <td className="px-4 py-2">2 years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            You can disable cookies through your browser settings. Disabling cookies will not affect your
            ability to use any calculator or guide on this site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">4. How we use information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To understand which calculators and guide sections are most useful (GA4 data)</li>
            <li>To improve site content and fix errors</li>
            <li>To respond to questions submitted through the Ask a Question form</li>
          </ul>
          <p className="mt-2">
            We do not use your information for marketing, profiling, or any automated decision-making.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">5. Third-party services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong className="text-foreground">Google Analytics 4</strong> — usage analytics (Google LLC)</li>
            <li><strong className="text-foreground">Web3Forms</strong> — contact form submission routing</li>
            <li><strong className="text-foreground">Vercel</strong> — website hosting</li>
          </ul>
          <p className="mt-2">
            Each of these services operates under its own privacy policy. We recommend reviewing their
            policies if you have specific concerns.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">6. Data retention</h2>
          <p>
            GA4 analytics data is retained for 14 months by default as per Google&apos;s settings.
            Emails received through the Ask a Question form are retained in our inbox for as long as
            reasonably needed to assist you, and deleted when no longer required.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">7. Your rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Request deletion of any email and query you have submitted to us</li>
            <li>Opt out of Google Analytics tracking using the browser add-on linked above</li>
            <li>Contact us with any privacy-related questions or concerns</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">8. Children&apos;s privacy</h2>
          <p>
            TaxSaral is not directed at children under 13. We do not knowingly collect personal information
            from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">9. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the effective
            date at the top of this page. Continued use of the site after changes constitutes acceptance
            of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-2">10. Contact</h2>
          <p>
            For privacy-related questions or requests, contact us at:{" "}
            <a href="mailto:vsriram1008@gmail.com" className="text-primary underline underline-offset-4">
              vsriram1008@gmail.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
