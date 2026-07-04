"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send, Lock, Clock, ShieldCheck, CheckCircle2,
  ArrowRight, MailOpen, RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = "email" | "chat" | "success";

interface ChatMessage {
  from: "team" | "user";
  text: string;
  ts: number;
}

// ── Avatar ────────────────────────────────────────────────────────────────────

function TeamAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
      TS
    </div>
  );
}

// ── Chat bubble ───────────────────────────────────────────────────────────────

function Bubble({ msg }: { msg: ChatMessage }) {
  const isTeam = msg.from === "team";
  return (
    <div className={cn("flex gap-2.5", isTeam ? "items-start" : "items-start flex-row-reverse")}>
      {isTeam && <TeamAvatar />}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line",
          isTeam
            ? "rounded-tl-none bg-muted text-foreground"
            : "rounded-tr-none bg-primary text-primary-foreground"
        )}
      >
        {msg.text}
      </div>
    </div>
  );
}

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-start gap-2.5">
      <TeamAvatar />
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-none bg-muted px-4 py-3">
        {[0, 150, 300].map(delay => (
          <span
            key={delay}
            className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Email phase ───────────────────────────────────────────────────────────────

function EmailPhase({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onSubmit(email);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <MailOpen className="h-8 w-8 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-xl font-bold">Enter your email to get started</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            We&apos;ll send our reply directly to your inbox. No account needed.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="ask-email">Your email address</Label>
            <Input
              id="ask-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              className={cn("h-11", error && "border-destructive")}
              autoFocus
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Trust micro-copy */}
        <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
          {[
            { icon: Lock, text: "Your email is only used to reply to your query" },
            { icon: ShieldCheck, text: "We never share your details with third parties" },
            { icon: Clock, text: "Typical response time: 2–3 business days" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AskClient() {
  const [phase, setPhase] = useState<Phase>("email");
  const [userEmail, setUserEmail] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [typing, setTyping] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const addTeamMessage = (text: string, delay = 0) => {
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: "team", text, ts: Date.now() }]);
    }, delay);
  };

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    setTyping(true);
    setPhase("chat");

    // Simulate brief typing delay for first message
    addTeamMessage(
      "Hi! Thanks for reaching out to TaxSaral.\n\nWe're here to help with your Income Tax Act 2025 questions for Tax Year 2026-27.",
      800
    );
    setTimeout(() => {
      setTyping(true);
      addTeamMessage(
        `Please describe your tax query below in as much detail as possible — include your income sources, any deductions you're claiming, or the specific scenario you're unsure about.\n\nWe'll send a detailed reply to ${email} within 2–3 business days.`,
        2000
      );
    }, 1200);
  };

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || submitting || phase === "success") return;

    setDraft("");
    setSubmitError("");
    setMessages(prev => [...prev, { from: "user", text, ts: Date.now() }]);
    setSubmitting(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "f47e2743-1ca0-4f7d-8719-3606c38d0c82",
          subject: `Tax Query — TaxSaral (from ${userEmail})`,
          from_name: "TaxSaral Visitor",
          reply_to: userEmail,
          email: userEmail,
          message: `From: ${userEmail}\n\nQuery:\n${text}`,
          botcheck: false,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMessages(prev => [
            ...prev,
            {
              from: "team",
              text: `✓ We've received your query!\n\nOur tax team will review it carefully and send a detailed response to ${userEmail} within 2–3 business days.\n\nThank you for reaching out — we look forward to helping you.`,
              ts: Date.now(),
            },
          ]);
          setPhase("success");
        }, 1200);
      } else {
        const msg = data?.message ?? data?.error ?? "Something went wrong. Please try again.";
        setSubmitError(msg);
        setMessages(prev => prev.slice(0, -1));
        setDraft(text);
      }
    } catch {
      setSubmitError("Unable to reach email service. Please check your connection and try again.");
      setMessages(prev => prev.slice(0, -1));
      setDraft(text);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  const handleDraftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  // ── Email phase ────────────────────────────────────────────────────────────
  if (phase === "email") {
    return <EmailPhase onSubmit={handleEmailSubmit} />;
  }

  // ── Chat phase ─────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <TeamAvatar />
        <div>
          <p className="text-sm font-semibold">TaxSaral Tax Team</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Replies by email · 2–3 business days
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          <Lock className="h-3 w-3 text-emerald-600" />
          Private
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}
        {typing && <TypingDots />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      {phase !== "success" ? (
        <div className="border-t bg-background px-4 py-3 space-y-2">
          {submitError && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              {submitError}
            </p>
          )}
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              rows={2}
              value={draft}
              onChange={handleDraftChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your tax question here... (Shift+Enter for new line)"
              disabled={submitting}
              className="flex-1 resize-none rounded-xl border bg-muted/30 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 transition-all"
              style={{ minHeight: "52px", maxHeight: "160px" }}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!draft.trim() || submitting}
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                draft.trim() && !submitting
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              aria-label="Send"
            >
              {submitting
                ? <RefreshCw className="h-4 w-4 animate-spin" />
                : <Send className="h-4 w-4" />
              }
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-right">
            {draft.length}/2000 · Press Enter to send
          </p>
        </div>
      ) : (
        /* Success footer */
        <div className="border-t bg-emerald-50 dark:bg-emerald-950 px-4 py-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-800 dark:text-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            Query submitted — reply coming to {userEmail}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/calculators/regime-optimizer"
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
            >
              Try Regime Optimizer
              <ArrowRight className="h-3 w-3" />
            </Link>
            <button
              type="button"
              onClick={() => {
                setPhase("email");
                setUserEmail("");
                setMessages([]);
                setDraft("");
                setSubmitError("");
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
            >
              Ask another question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
