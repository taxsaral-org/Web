import { cn } from "@/lib/utils";

export interface PageStat {
  value: React.ReactNode;
  label: string;
}

/**
 * The opening block of a reference page: a plain line of context, a serif
 * title, a lede, and optionally a row of figures. Deliberately undecorated.
 */
export function PageHeader({
  kicker,
  title,
  children,
  stats,
  aside,
  className,
  width = "max-w-4xl",
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  stats?: PageStat[];
  aside?: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <section className={cn("border-b", className)}>
      <div className={cn("container mx-auto py-10 sm:py-12", width)}>
        {kicker && <p className="text-sm text-muted-foreground">{kicker}</p>}
        <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
        {children && (
          <div className="mt-4 max-w-2xl space-y-3 text-[15px] leading-relaxed text-muted-foreground">
            {children}
          </div>
        )}
        {stats && stats.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-2xl font-semibold">{value}</dd>
                <dd className="text-sm text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        )}
        {aside && <div className="mt-6">{aside}</div>}
      </div>
    </section>
  );
}
