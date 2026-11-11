import React from 'react';

interface BharatPeyjalLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const BharatPeyjalLogo: React.FC<BharatPeyjalLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  const logoSrc = "/assets/aistudio/Untitled_design_20261022_071518_0000_fe0422fd.png";

  const sizeClasses = {
    sm: {
      img: 'h-8 w-auto',
      iconOnly: 'w-8 h-8',
      text: 'text-xs',
      sub: 'text-[9px]',
    },
    md: {
      img: 'h-10 w-auto',
      iconOnly: 'w-10 h-10',
      text: 'text-sm font-bold',
      sub: 'text-[10px]',
    },
    lg: {
      img: 'h-20 w-auto max-w-[200px]',
      iconOnly: 'w-14 h-14',
      text: 'text-base font-bold',
      sub: 'text-xs',
    },
    xl: {
      img: 'h-28 w-auto max-w-[260px]',
      iconOnly: 'w-20 h-20',
      text: 'text-lg font-bold',
      sub: 'text-xs',
    },
  };

  if (variant === 'icon') {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-2xl bg-white p-1 shadow-xs border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shrink-0 ${sizeClasses[size].iconOnly} ${className}`}
      >
        <img
          src={logoSrc}
          alt="Bharat Payjal Emblem"
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/logo.png';
          }}
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* Crisp Logo Card with white backing for perfect dark mode legibility */}
        <div className="bg-white rounded-3xl p-3 shadow-md border border-slate-100 dark:border-slate-800 inline-flex items-center justify-center transition-transform duration-200 hover:scale-102">
          <img
            src={logoSrc}
            alt="Bharat Payjal - Drink Pure, Live Pure"
            className={`${sizeClasses[size].img} object-contain`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/logo.png';
            }}
          />
        </div>

        {showSubtitle && (
          <div className="mt-2.5 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span className="text-xs font-bold text-sky-800 dark:text-sky-300">
              जल मित्र आधिकारिक पोर्टल
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* High-contrast rounded pill container */}
      <div className="bg-white rounded-xl p-1 shadow-2xs border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-center shrink-0">
        <img
          src={logoSrc}
          alt="Bharat Payjal Logo"
          className="h-8 sm:h-9 w-auto object-contain max-w-[120px]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/logo.png';
          }}
        />
      </div>

      {showSubtitle && (
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800/60 truncate">
            जल मित्र ऐप
          </span>
        </div>
      )}
    </div>
  );
};
