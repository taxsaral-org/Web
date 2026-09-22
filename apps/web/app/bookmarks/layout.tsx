import type { Metadata } from "next";

// The bookmarks page renders whatever an individual visitor saved in their
// own browser, so there is nothing stable for a crawler to index. Keeping it
// out of the index also keeps it from diluting the crawl budget.
export const metadata: Metadata = {
  title: "My Bookmarks — TaxSaral",
  description:
    "Sections, explainers and judgments you have saved on TaxSaral. Stored only in your own browser.",
  alternates: { canonical: "https://taxsaral.org/bookmarks" },
  robots: { index: false, follow: true },
};

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
