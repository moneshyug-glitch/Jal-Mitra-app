import React, { useEffect, useState } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AndroidStatusBar: React.FC = () => {
  const { t } = useLanguage();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      hours = hours % 12 || 12;
      const formatted = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center justify-between px-5 pt-2 pb-1 text-xs select-none tracking-tight text-slate-700 dark:text-slate-300 font-semibold z-40 transition-colors">
      {/* Left: Time & Bharat Payjal Badge */}
      <div className="flex items-center gap-2">
        <span className="tabular-nums font-bold tracking-normal">{timeStr || '10:30'}</span>
        <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold hidden xs:inline">
          🇮🇳 {t.appName}
        </span>
      </div>

      {/* Right: Network & Battery status */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400">5G</span>
        <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
        <div className="flex items-center gap-1">
          <span className="text-[10px] tabular-nums font-medium">98%</span>
          <BatteryMedium className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </div>
  );
};
