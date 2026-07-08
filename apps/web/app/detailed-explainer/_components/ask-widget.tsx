"use client";

import { useState } from "react";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import { AskClient } from "@/app/ask/_components/ask-client";

export function DetailedAskWidget({ section2025 }: { section2025: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Inline CTA */}
      <div className="mt-10 rounded-xl border-2 border-dashed border-primary/25 bg-gradient-to-br from-primary/5 to-blue-50/50 px-5 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Have a question about {section2025}?
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Ask our tax team — we&apos;ll send a detailed reply to your email within 2–3 business days.
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Ask a Question
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-3 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div
            className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl"
            style={{ height: "560px" }}
          >
            {/* Panel header */}
            <div className="flex shrink-0 items-center gap-2.5 bg-primary px-4 py-3">
              <MessageCircle className="h-4 w-4 text-primary-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-primary-foreground">
                  Ask about {section2025}
                </p>
                <p className="text-xs text-primary-foreground/70">
                  We reply by email · 2–3 business days
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* AskClient fills remaining height */}
            <div className="flex-1 overflow-hidden">
              <AskClient />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
