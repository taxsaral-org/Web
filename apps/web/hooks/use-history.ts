"use client";

import { useState, useEffect, useCallback } from "react";

export interface HistoryItem {
  slug: string;
  type: "detailed" | "section";
  title: string;
  section: string;
  category: string;
  visitedAt: string;
}

const KEY = "taxsaral_history";
const MAX = 10;

function load(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}

function persist(items: HistoryItem[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => { setHistory(load()); }, []);

  const record = useCallback((item: Omit<HistoryItem, "visitedAt">) => {
    setHistory((prev) => {
      const deduped = prev.filter((h) => !(h.slug === item.slug && h.type === item.type));
      const next = [{ ...item, visitedAt: new Date().toISOString() }, ...deduped].slice(0, MAX);
      persist(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setHistory([]);
    persist([]);
  }, []);

  return { history, record, clear };
}
