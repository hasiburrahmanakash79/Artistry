import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") || "Dark",
  );

  // Apply theme to document and save in localStorage
  const applyTheme = (t) => {
    const root = document.documentElement;
    let themeToSet;

    if (t === "System") {
      // Check current system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      themeToSet = prefersDark ? "Dark" : "Light";
    } else {
      themeToSet = t; // "Light" or "Dark"
    }

    root.setAttribute("data-theme", themeToSet);
    localStorage.setItem("app-theme", t);
    setTheme(t);
  };

  // Initial theme application
  useEffect(() => {
    applyTheme(theme);
  }, []);

  // Listen for system theme changes (only when "System" is selected)
  useEffect(() => {
    if (theme !== "System") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      applyTheme("System");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return (
    <div className="flex gap-1 p-1 bg-base-200 rounded-lg w-full">
      {["Light", "Dark", "System"].map((t) => (
        <button
          key={t}
          onClick={() => applyTheme(t)}
          className={`flex-1 py-2 px-3 text-xs rounded-md transition ${
            theme === t
              ? "bg-[#9C1E1E] text-white"
              : "hover:bg-base-300"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;