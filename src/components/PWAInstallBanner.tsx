import React, { useState } from 'react';
import { Download, Share, X, Smartphone, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../context/LanguageContext';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t, language } = useLanguage();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // If app is already installed as standalone Android app, or user dismissed for this session
  if (isInstalled || dismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) {
        setInstallSuccess(true);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  return (
    <>
      <div className="w-full bg-gradient-to-r from-sky-700 via-blue-800 to-indigo-900 text-white px-4 py-2.5 rounded-2xl shadow-md mb-4 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-sky-200" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold leading-tight truncate">
              {installSuccess
                ? (language === 'hi' ? 'ऐप इंस्टॉल हो रहा है!' : 'Installing App...')
                : t.pwaInstallBannerTitle}
            </p>
            <p className="text-[10px] text-sky-100/80 leading-tight truncate">
              {installSuccess
                ? (language === 'hi' ? 'होम स्क्रीन पर ऐप आइकन देखें' : 'Check home screen for app icon')
                : t.pwaInstallBannerDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!installSuccess && (
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 bg-white text-blue-900 rounded-xl text-xs font-bold shadow-xs hover:bg-sky-50 touch-press flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.pwaInstallBtn}</span>
            </button>
          )}

          {installSuccess && (
            <div className="px-2.5 py-1 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 rounded-xl text-xs font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सफल' : 'Done'}</span>
            </div>
          )}

          <button
            onClick={() => setDismissed(true)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* iOS Modal instructions */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 p-5 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Share className="w-4 h-4 text-sky-500" />
                <span>{language === 'hi' ? 'iPhone / iPad पर इंस्टॉल करें' : 'Install on iPhone / iPad'}</span>
              </h3>
              <button
                onClick={() => setShowIOSModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                  1
                </span>
                <span>{language === 'hi' ? 'सफारी (Safari) ब्राउज़र के नीचे स्थित शेयर (Share) बटन दबाएं।' : 'Tap the Share icon in the Safari toolbar.'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                  2
                </span>
                <span>{language === 'hi' ? 'नीचे स्क्रॉल करके Add to Home Screen (होम स्क्रीन पर जोड़ें) पर टैप करें।' : 'Scroll down and tap Add to Home Screen.'}</span>
              </div>
            </div>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
