import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      html.style.backgroundColor = "#1a202c"; // Dark background
    } else {
      html.classList.remove("dark");
      html.style.backgroundColor = "#f7fafc"; // Light background
    }
  }, [darkMode]);

  return <>{children}</>;
};

export default ThemeProvider;
