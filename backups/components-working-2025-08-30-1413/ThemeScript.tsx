// components/ThemeScript.tsx
export default function ThemeScript() {
    const code = `
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", prefersDark);
      }
    } catch (e) {
      console.warn("Failed to initialize theme:", e);
    }
    `
    return <script dangerouslySetInnerHTML={{ __html: code }} />
  }
  