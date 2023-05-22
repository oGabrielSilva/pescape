import LangService from '@PescaPE/services/LangService';
import ThemeServices from '@PescaPE/services/ThemeServices';
import { createContext, useCallback, useEffect, useLayoutEffect, useState } from 'react';

interface AppContextProviderProps {
  children: JSX.Element;
}

interface InterfaceAppContext {
  theme: ThemeServices;
  strings: GlobalDisplayLang;
  themeName: 'light' | 'dark';
  langService: LangService;
  formReportVisible: boolean;
  changeDisplayLang: (language: string) => void;
  setThemeName: (theme: 'light' | 'dark') => void;
  setFormReportVisible: (visible: boolean) => void;
}

export const AppContext = createContext({} as InterfaceAppContext);

export default function AppContextProvider({ children }: AppContextProviderProps) {
  const theme = new ThemeServices();
  const lang = new LangService();

  const [strings, setStrings] = useState<GlobalDisplayLang>(lang.getLang());
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');
  const [formReportVisible, setFormReportVisible] = useState(true);

  useEffect(() => {
    setThemeName(theme.getCurrentThemeName());
  }, []);

  const changeDisplayLang = useCallback((language: string) => {
    if (lang.langExist(language)) {
      const snap = lang.defineDisplayLang(language);
      setStrings(snap);
    }
  }, []);

  useLayoutEffect(
    () => (theme.getCurrentTheme().name === 'dark' ? theme.updateTheme() : void 0),
    []
  );

  useEffect(() => {
    const savedLang = lang.getSavedLang();
    if (savedLang.displaySelect.key !== strings.displaySelect.key) setStrings(savedLang);
  }, []);

  return (
    <AppContext.Provider
      value={{
        langService: lang,
        strings,
        theme,
        themeName,
        formReportVisible,
        setFormReportVisible,
        changeDisplayLang,
        setThemeName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
