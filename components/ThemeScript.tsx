// components/ThemeScript.tsx
export default function ThemeScript() {
    const code = `
    try {
      const ls = localStorage.getItem("theme");
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const shouldDark = ls ? ls === "dark" : mql.matches;
      document.documentElement.classList.toggle("dark", shouldDark);
    } catch {}
    `
    return <script dangerouslySetInnerHTML={{ __html: code }} />
  }
  