import { createContext, useContext, useState, ReactNode } from "react";
import type { RoutingResult } from "../services/llmRouter";
import { type User, getSessionUser, setSessionUser } from "../services/authService";

type Language = "hi" | "en";

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (hi: string, en: string) => string;
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

export function AppProvider({ children }: { children: ReactNode }) {
  const stored = localStorage.getItem("cpgrams_lang") as Language | null;
  const [lang, setLangState] = useState<Language>(stored || "en");
  const [routingResult, setRoutingResult] = useState<RoutingResult | null>(null);
  const [complaintText, setComplaintText] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(getSessionUser());
  const [newCaseId, setNewCaseId] = useState<string | null>(null);

  function setLang(l: Language) {
    setLangState(l);
    localStorage.setItem("cpgrams_lang", l);
    document.documentElement.lang = l === "hi" ? "hi" : "en";
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
    <AppContext.Provider value={{ lang, setLang, t, routingResult, setRoutingResult, complaintText, setComplaintText, currentUser, login, logout, newCaseId, setNewCaseId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp outside AppProvider");
  return ctx;
}
