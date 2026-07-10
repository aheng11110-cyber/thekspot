import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'EN' | 'KO' | 'JP' | 'CN' | 'VN';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('site_lang');
    if (saved && ['EN', 'KO', 'JP', 'CN', 'VN'].includes(saved)) {
      return saved as Language;
    }
    return 'EN';
  });

  const setLang = (newLang: Language) => {
    if (newLang !== lang) {
      localStorage.setItem('site_lang', newLang);
      window.location.reload();
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
