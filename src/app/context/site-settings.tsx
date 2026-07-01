import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultSiteSettings, subscribeSiteSettings, type SiteSettings } from "../services/admin";

type SiteSettingsContextValue = {
  settings: SiteSettings;
  isLoaded: boolean;
};

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  settings: defaultSiteSettings,
  isLoaded: false,
});

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(defaultSiteSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeSiteSettings((nextSettings) => {
      setSettings(nextSettings);
      setIsLoaded(true);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ settings, isLoaded }), [settings, isLoaded]);

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
