"use client";

import { useEffect } from "react";
import { Printer } from "lucide-react";
import { useHistory } from "@/hooks/use-history";
import { BookmarkButton } from "@/components/bookmark-button";

interface Props {
  slug: string;
  title: string;
  section: string;
  category: string;
}

export function DetailPageActions({ slug, title, section, category }: Props) {
  const { record } = useHistory();

  useEffect(() => {
    record({ slug, type: "detailed", title, section, category });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className="no-print flex items-center gap-2">
      <BookmarkButton
        item={{ slug, type: "detailed", title, section, category }}
      />
      <button
        type="button"
        onClick={() => window.print()}
        title="Print / Save as PDF"
        className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
      >
        <Printer className="h-3.5 w-3.5" />
        Print / PDF
      </button>
    </div>
  );
}
