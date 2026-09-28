import { useCallback, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "maison-terre-theme";

function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

export function getInitialTheme(): Theme {
  const root = document.documentElement;

  if (isTheme(root.dataset.theme)) {
    return root.dataset.theme;
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // Ignore unavailable browser storage.
  }

  return "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The active theme still works for the current session.
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  }, [theme]);

  return { theme, toggleTheme };
}
