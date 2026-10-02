"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "./translations";

export type Theme = "dark" | "light";
const eventName = "portfolio-preference-change";
let fallbackTheme: Theme = "dark";
let fallbackLocale: Locale = "en";

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(eventName, listener);
  return () => { window.removeEventListener("storage", listener); window.removeEventListener(eventName, listener); };
}

function themeSnapshot(): Theme {
  try { const value = localStorage.getItem("portfolio-theme"); return value === "light" || value === "dark" ? value : fallbackTheme; }
  catch { return fallbackTheme; }
}

function localeSnapshot(): Locale {
  try { const value = localStorage.getItem("portfolio-language"); return value === "pt" || value === "en" ? value : fallbackLocale; }
  catch { return fallbackLocale; }
}

export function usePreferences() {
  const theme = useSyncExternalStore(subscribe, themeSnapshot, () => "dark" as Theme);
  const locale = useSyncExternalStore(subscribe, localeSnapshot, () => "en" as Locale);

  function setTheme(value: Theme) {
    fallbackTheme = value;
    document.documentElement.dataset.theme = value;
    try { localStorage.setItem("portfolio-theme", value); } catch { /* Preferences still work for this session. */ }
    window.dispatchEvent(new Event(eventName));
  }

  function setLocale(value: Locale) {
    fallbackLocale = value;
    try { localStorage.setItem("portfolio-language", value); } catch { /* Preferences still work for this session. */ }
    window.dispatchEvent(new Event(eventName));
  }

  return { theme, locale, setTheme, setLocale };
}
