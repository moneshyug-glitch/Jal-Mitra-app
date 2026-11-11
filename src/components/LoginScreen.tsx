import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Phone, UserCheck, ArrowRight } from 'lucide-react';
import { PWAInstallBanner } from './PWAInstallBanner';
import { BharatPeyjalLogo } from './BharatPeyjalLogo';

interface LoginScreenProps {
  onLogin: (id: string, pin: string, remember: boolean) => Promise<boolean>;
  onDemoLogin?: (enteredId?: string) => void;
  isLoading: boolean;
  errorMsg: string | null;
  savedId?: string;
  savedPin?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onDemoLogin,
  isLoading,
  errorMsg,
  savedId = '',
  savedPin = '',
}) => {
  const [id, setId] = useState(savedId || '');
  const [pin, setPin] = useState(savedPin || '');
  const [showPin, setShowPin] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !pin.trim()) return;
    onLogin(id.trim(), pin.trim(), remember);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 sm:py-8 flex flex-col justify-center min-h-[calc(100vh-140px)] animate-in fade-in zoom-in-95 duration-200">
      <PWAInstallBanner />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200/90 dark:border-slate-800 transition-colors">
        {/* Professional Bharat Peyjal Brand Header */}
        <div className="text-center mb-6">
          <BharatPeyjalLogo variant="stacked" size="lg" className="mb-2" />
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mt-1">
            जल मित्र स्टाफ लॉगिन
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            मोबाइल नंबर या Staff ID और 4-अंकों का PIN दर्ज करें
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              मोबाइल नंबर या STAFF ID
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="उदा: 7054198443 या BP001"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/80 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              4-अंकों का गुप्त PIN
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                maxLength={6}
                inputMode="numeric"
                className="w-full pl-10 pr-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/80 text-center tracking-widest text-base font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
                aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 px-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
              <span className="font-medium">मुझे याद रखें (Auto-Login)</span>
            </label>
            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-semibold flex items-center gap-1">
              🔒 सुरक्षित 256-bit
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold text-center space-y-2">
              <p>{errorMsg}</p>
              {onDemoLogin && (
                <button
                  type="button"
                  onClick={() => onDemoLogin(id)}
                  className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-300 border border-rose-200 dark:border-rose-800 font-bold text-xs shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  डेमो डेटा के साथ डैशबोर्ड खोलें →
                </button>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !id.trim() || !pin.trim()}
            className="w-full py-3.5 px-4 rounded-2xl text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-60 transition-all touch-press flex items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>लोड हो रहा है...</span>
              </>
            ) : (
              <>
                <span>डैशबोर्ड खोलें</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Google Sheet टेस्ट:</span>
            <button
              type="button"
              onClick={() => { setId('BP001'); setPin('1234'); }}
              className="px-2 py-0.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold border border-sky-200 dark:border-sky-800 hover:bg-sky-100 transition-colors"
            >
              BP001 (PIN 1234) भरें
            </button>
          </div>

          {onDemoLogin && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => onDemoLogin(id || 'BP001')}
                className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-1 px-2"
              >
                डैशबोर्ड प्रीव्यू देखें (Explore App) →
              </button>
            </div>
          )}
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-sky-500" /> केवल अधिकृत जल मित्र
          </span>
          <a
            href="tel:+917860393198"
            className="font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3" /> हेल्प: 7860393198
          </a>
        </div>
      </div>
    </div>
  );
};
