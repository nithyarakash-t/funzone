import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = 'light' | 'dark';
type ThemeContextType = {
    theme:Theme,
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
}
const STORAGE_KEY = "theme-preference";
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(getColorPreference() ?? 'light');

    useEffect(()=>{
        localStorage.setItem(STORAGE_KEY, theme);
        document.documentElement.setAttribute('data-theme', theme);
  
        window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', ({matches:isDark}) => {
          setTheme(isDark ? 'dark' : 'light');
        });
  
    },[theme])

    // get color preference on page load
    function getColorPreference() {
        if (localStorage.getItem(STORAGE_KEY)) return localStorage.getItem(STORAGE_KEY) as Theme;
        else return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }   

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
          {children}
        </ThemeContext.Provider>
    );
}


// Custom hook to use the context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
  