const STORAGE_KEY = "docs-theme";

const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem("${STORAGE_KEY}");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored ?? (prefersDark ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
    document.documentElement.dataset.theme = theme;
  } catch {}
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}

export const themeStorageKey = STORAGE_KEY;
