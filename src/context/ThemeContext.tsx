import React, { createContext, useContext, useEffect, useState } from 'react';
import { DynamicPalette, ThemeMode } from '../types';

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  palette: DynamicPalette;
  setMode: (mode: ThemeMode) => void;
  setPalette: (palette: DynamicPalette) => void;
  toggleDark: () => void;
  paletteMeta: Record<DynamicPalette, { name: string; hindiName: string; color: string; accentColor: string }>;
}

export const PALETTES_META: Record<DynamicPalette, { name: string; hindiName: string; color: string; accentColor: string }> = {
  ocean: {
    name: 'Ocean Blue',
    hindiName: 'जल मित्र (नीला)',
    color: '#003366',
    accentColor: '#3b82f6',
  },
  emerald: {
    name: 'Jal Kranti Emerald',
    hindiName: 'जल क्रांति (हरा)',
    color: '#065f46',
    accentColor: '#10b981',
  },
  saffron: {
    name: 'Surya Saffron',
    hindiName: 'सूर्य केसरिया (ऑरेंज)',
    color: '#c2410c',
    accentColor: '#f97316',
  },
  indigo: {
    name: 'Royal Indigo',
    hindiName: 'रॉयल इंडिगो (बैंगनी)',
    color: '#3730a3',
    accentColor: '#6366f1',
  },
  ruby: {
    name: 'Rose Ruby',
    hindiName: 'गुलाब रूबी (लाल)',
    color: '#9f1239',
    accentColor: '#f43f5e',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('bp_app_theme_mode');
    return (saved as ThemeMode) || 'light';
  });

  const [palette, setPaletteState] = useState<DynamicPalette>(() => {
    const saved = localStorage.getItem('bp_app_palette');
    return (saved as DynamicPalette) || 'ocean';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
  });

  // Apply theme mode and palette to HTML tag and update meta theme-color
  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    const computeIsDark = () => {
      if (mode === 'dark') return true;
      if (mode === 'light') return false;
      return systemDark.matches;
    };

    const effectiveDark = computeIsDark();
    setIsDark(effectiveDark);

    if (effectiveDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.setAttribute('data-theme', palette);

    // Update Android status bar theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (effectiveDark) {
        metaThemeColor.setAttribute('content', '#090d16');
      } else {
        const currentColor = PALETTES_META[palette]?.color || '#003366';
        metaThemeColor.setAttribute('content', currentColor);
      }
    }

    const handleSystemChange = () => {
      if (mode === 'system') {
        const nextDark = systemDark.matches;
        setIsDark(nextDark);
        if (nextDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    if (systemDark?.addEventListener) {
      systemDark.addEventListener('change', handleSystemChange);
    } else if (systemDark?.addListener) {
      systemDark.addListener(handleSystemChange);
    }

    return () => {
      if (systemDark?.removeEventListener) {
        systemDark.removeEventListener('change', handleSystemChange);
      } else if (systemDark?.removeListener) {
        systemDark.removeListener(handleSystemChange);
      }
    };
  }, [mode, palette]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('bp_app_theme_mode', newMode);
  };

  const setPalette = (newPalette: DynamicPalette) => {
    setPaletteState(newPalette);
    localStorage.setItem('bp_app_palette', newPalette);
  };

  const toggleDark = () => {
    const nextMode: ThemeMode = isDark ? 'light' : 'dark';
    setMode(nextMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        isDark,
        palette,
        setMode,
        setPalette,
        toggleDark,
        paletteMeta: PALETTES_META,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
