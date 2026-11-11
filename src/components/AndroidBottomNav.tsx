import React from 'react';
import { LayoutDashboard, FileText, Droplets, Settings } from 'lucide-react';
import { ActiveTab } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AndroidBottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const AndroidBottomNav: React.FC<AndroidBottomNavProps> = ({
  activeTab,
  onChangeTab,
}) => {
  const { t } = useLanguage();

  const tabs = [
    {
      id: 'dashboard' as ActiveTab,
      label: t.tabDashboard,
      icon: LayoutDashboard,
    },
    {
      id: 'statement' as ActiveTab,
      label: t.tabStatement,
      icon: FileText,
    },
    {
      id: 'water_test' as ActiveTab,
      label: t.tabWaterTest,
      icon: Droplets,
    },
    {
      id: 'settings' as ActiveTab,
      label: t.tabSettings,
      icon: Settings,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 transition-colors pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 items-center px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className="flex flex-col items-center justify-center h-full min-h-[48px] py-1 select-none touch-press group"
              aria-label={tab.label}
            >
              <div
                className={`relative px-4 py-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 scale-105'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                      }
                    : undefined
                }
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 transition-colors duration-150 ${
                  isActive
                    ? 'font-bold text-slate-900 dark:text-white'
                    : 'font-medium text-slate-500 dark:text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
