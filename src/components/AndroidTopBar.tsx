import React, { useState } from 'react';
import { Sun, Moon, Palette, PhoneCall, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { DynamicPalette } from '../types';
import { BharatPeyjalLogo } from './BharatPeyjalLogo';

interface AndroidTopBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  staffName?: string;
}

export const AndroidTopBar: React.FC<AndroidTopBarProps> = ({
  isLoggedIn,
  onLogout,
  staffName,
}) => {
  const { isDark, toggleDark, palette, setPalette, paletteMeta } = useTheme();
  const [showPaletteMenu, setShowPaletteMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
        {/* Brand Zone with Professional Bharat Peyjal Logo */}
        <div className="flex items-center gap-2 min-w-0">
          <BharatPeyjalLogo variant="horizontal" size="sm" showSubtitle={false} />
          {isLoggedIn && staffName && (
            <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 truncate max-w-[120px]">
              {staffName}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Dynamic Theme Palette Picker */}
          <div className="relative">
            <button
              onClick={() => setShowPaletteMenu(!showPaletteMenu)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 touch-press transition-colors"
              title="डायनामिक थीम चुनें"
              aria-label="Dynamic Theme Palette"
            >
              <Palette className="w-4 h-4" />
            </button>

            {showPaletteMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowPaletteMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 p-2 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 py-1 mb-1">
                    डायनामिक थीम रंग
                  </p>
                  <div className="space-y-1">
                    {(Object.keys(paletteMeta) as DynamicPalette[]).map((key) => {
                      const item = paletteMeta[key];
                      const active = palette === key;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setPalette(key);
                            setShowPaletteMenu(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-left transition-colors ${
                            active
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="truncate">{item.hindiName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDark}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 touch-press transition-colors"
            title={isDark ? 'लाइट मोड चालू करें' : 'डार्क मोड चालू करें'}
            aria-label="Toggle Dark Mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Helpline Call Button */}
          <a
            href="tel:+917860393198"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 touch-press transition-colors"
            title="हेल्पलाइन पर कॉल करें"
            aria-label="Call Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
          </a>

          {/* Logout Button if Logged In */}
          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="w-8 h-8 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 touch-press transition-colors"
              title="लॉगआउट करें"
              aria-label="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
