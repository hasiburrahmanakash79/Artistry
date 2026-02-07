import  { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") || "light",
  );

  // Apply theme to document and save in localStorage
  const applyTheme = (t) => {
    const root = document.documentElement;
    if (t === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", t);
    }
    localStorage.setItem("app-theme", t);
    setTheme(t);
  };

  useEffect(() => {
    applyTheme(theme);
  }, []);

  return (
    <div className="flex bg-base-200 rounded-lg p-1 w-max">
      {["mylight", "mytheme", ].map((t) => (
        <button
          key={t}
          onClick={() => applyTheme(t)}
          className={`flex-1 py-2 px-3 text-xs rounded-md transition ${
            theme === t
              ? "bg-primary text-primary-content"
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
