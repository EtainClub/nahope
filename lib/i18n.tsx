"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AppLanguage = "ko" | "en";

type LanguageContextValue = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  tr: (korean: string, english: string) => string;
};

const LANGUAGE_STORAGE_KEY = "nahope-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): AppLanguage {
  return "ko";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>(getInitialLanguage);

  const setLanguage = useCallback(() => {
    setLanguageState("ko");
  }, []);

  const tr = useCallback((korean: string) => korean, []);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "ko");
    document.documentElement.lang = "ko";
    document.documentElement.dataset.language = "ko";
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, tr }),
    [language, setLanguage, tr],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
