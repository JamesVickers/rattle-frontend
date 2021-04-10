import { useEffect, useState } from "react";
import { colorThemeStorage } from "./colourModeStorage";

export const useDarkMode = (): {
  theme: string;
  toggleTheme: () => void;
} => {
  const [theme, setTheme] = useState("light");

  // Fetch the user’s colour theme mode preference from AsyncStorage and setting it to state
  useEffect(() => {
    async function getTheme() {
      const stored = await colorThemeStorage.get();
      setTheme(stored || "light");
    }
    getTheme();
  }, []);

  //  Set the new colour theme mode to AsyncStorage each time it’s updated
  useEffect(() => {
    if (!theme) return;
    colorThemeStorage.set(theme);
  }, [theme]);

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return {
    theme,
    toggleTheme,
  };
};
