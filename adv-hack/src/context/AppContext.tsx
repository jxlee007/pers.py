import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { RoutingResult } from "../services/llmRouter";
import { type User, getSessionUser, setSessionUser } from "../services/authService";

type Language = "hi" | "en";
export type Theme = "light" | "dark";
export type TextScale = "sm" | "md" | "lg" | "xl";

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (hi: string, en: string) => string;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  increaseTextScale: () => void;
  decreaseTextScale: () => void;
  resetTextScale: () => void;
  routingResult: RoutingResult | null;
  setRoutingResult: (r: RoutingResult | null) => void;
  complaintText: string;
  setComplaintText: (t: string) => void;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  newCaseId: string | null;
  setNewCaseId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const FONT_SIZE_MAP: Record<TextScale, string> = {
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const storedLang = localStorage.getItem("cpgrams_lang") as Language | null;
  const storedTheme = localStorage.getItem("cpgrams_theme") as Theme | null;
  const storedScale = localStorage.getItem("cpgrams_text_scale") as TextScale | null;

  const [lang, setLangState] = useState<Language>(storedLang || "en");
  const [theme, setThemeState] = useState<Theme>(storedTheme || "light");
  const [textScale, setTextScaleState] = useState<TextScale>(storedScale || "md");

  const [routingResult, setRoutingResult] = useState<RoutingResult | null>(null);
  const [complaintText, setComplaintText] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(getSessionUser());
  const [newCaseId, setNewCaseId] = useState<string | null>(null);

  // Initialize theme on HTML root
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cpgrams_theme", theme);
  }, [theme]);

  // Initialize text scaling on HTML root
  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SIZE_MAP[textScale];
    document.documentElement.setAttribute("data-text-scale", textScale);
    localStorage.setItem("cpgrams_text_scale", textScale);
  }, [textScale]);

  // Language setup
  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);

  function setLang(l: Language) {
    setLangState(l);
    localStorage.setItem("cpgrams_lang", l);
    document.documentElement.lang = l === "hi" ? "hi" : "en";
  }

  function setTheme(newTheme: Theme) {
    setThemeState(newTheme);
  }

  function toggleTheme() {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }

  function setTextScale(scale: TextScale) {
    setTextScaleState(scale);
  }

  function increaseTextScale() {
    setTextScaleState((prev) => {
      if (prev === "sm") return "md";
      if (prev === "md") return "lg";
      return "xl";
    });
  }

  function decreaseTextScale() {
    setTextScaleState((prev) => {
      if (prev === "xl") return "lg";
      if (prev === "lg") return "md";
      return "sm";
    });
  }

  function resetTextScale() {
    setTextScaleState("md");
  }

  function t(hi: string, en: string) {
    return lang === "hi" ? hi : en;
  }

  function login(user: User) {
    setSessionUser(user);
    setCurrentUser(user);
  }

  function logout() {
    setSessionUser(null);
    setCurrentUser(null);
    setRoutingResult(null);
    setComplaintText("");
    setNewCaseId(null);
  }

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        theme,
        setTheme,
        toggleTheme,
        textScale,
        setTextScale,
        increaseTextScale,
        decreaseTextScale,
        resetTextScale,
        routingResult,
        setRoutingResult,
        complaintText,
        setComplaintText,
        currentUser,
        login,
        logout,
        newCaseId,
        setNewCaseId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp outside AppProvider");
  return ctx;
}
