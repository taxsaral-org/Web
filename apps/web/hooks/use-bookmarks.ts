"use client";

import { useState, useEffect, useCallback } from "react";

export interface BookmarkItem {
  slug: string;
  type: "detailed" | "section";
  title: string;
  section: string;
  category: string;
  savedAt: string;
}

const KEY = "taxsaral_bookmarks";

function load(): BookmarkItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}

function persist(items: BookmarkItem[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => { setBookmarks(load()); }, []);

  const add = useCallback((item: Omit<BookmarkItem, "savedAt">) => {
    setBookmarks((prev) => {
      const deduped = prev.filter((b) => !(b.slug === item.slug && b.type === item.type));
      const next = [{ ...item, savedAt: new Date().toISOString() }, ...deduped];
      persist(next);
      return next;
    });
  }, []);

  const remove = useCallback((slug: string, type: BookmarkItem["type"]) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => !(b.slug === slug && b.type === type));
      persist(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (slug: string, type: BookmarkItem["type"]) =>
      bookmarks.some((b) => b.slug === slug && b.type === type),
    [bookmarks]
  );

  const toggle = useCallback(
    (item: Omit<BookmarkItem, "savedAt">) => {
      if (isBookmarked(item.slug, item.type)) remove(item.slug, item.type);
      else add(item);
    },
    [isBookmarked, add, remove]
  );

  return { bookmarks, add, remove, toggle, isBookmarked };
}
