import { Linkedin } from "lucide-react";

interface Props {
  author: string;
  authorLinkedIn?: string;
  authorNote?: string;
}

function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function AuthorCredit({ author, authorLinkedIn, authorNote }: Props) {
  const firstName = author.trim().split(/\s+/)[0];
  const note =
    authorNote ??
    `Thank you to ${firstName} for contributing this analysis to TaxSaral and helping make the Income Tax Act 2025 easier to navigate.`;

  return (
    <div className="mt-10 rounded-2xl border bg-gradient-to-br from-muted/40 to-muted/10 px-6 py-5">
      <div className="flex items-start gap-4">
        <div
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
        >
          {initialsOf(author)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Written by
          </p>
          <p className="mt-0.5 text-base font-semibold leading-snug text-foreground">
            {author}
          </p>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {note}
          </p>

          {authorLinkedIn && (
            <a
              href={authorLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[#0A66C2]/30 bg-[#0A66C2]/10 px-3 py-1.5 text-xs font-semibold text-[#0A66C2] transition-colors hover:bg-[#0A66C2]/20 dark:text-[#7CB9F2] dark:border-[#7CB9F2]/30"
            >
              <Linkedin className="h-3.5 w-3.5" />
              Connect on LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
