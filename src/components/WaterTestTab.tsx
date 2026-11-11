import React, { useState } from 'react';
import { Droplet, Users, ShieldCheck, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WaterTestTab: React.FC = () => {
  const { t, language } = useLanguage();
  const [members, setMembers] = useState<number>(4);
  const [weather, setWeather] = useState<'summer' | 'normal' | 'winter'>('summer');
  const [activity, setActivity] = useState<'normal' | 'active'>('normal');
  const [tdsInput, setTdsInput] = useState<string>('95');

  // Calculation
  const basePerPerson = weather === 'summer' ? 3.5 : weather === 'winter' ? 2.2 : 2.8;
  const activityMultiplier = activity === 'active' ? 1.25 : 1.0;
  const dailyTotalLitres = Math.round(members * basePerPerson * activityMultiplier * 10) / 10;
  
  // 20L jar calculation
  const jarsPerMonth = Math.ceil((dailyTotalLitres * 30) / 20);
  const recommendedPlan =
    jarsPerMonth >= 25
      ? (language === 'hi' ? 'रेगुलर टंकी प्लान (प्रतिदिन 1 जार)' : 'Regular Tanki Plan (1 Jar Daily)')
      : (language === 'hi' ? 'अल्टरनेटिव प्लान (एक दिन छोड़कर)' : 'Alternative Plan (Every Other Day)');

  const parsedTds = parseInt(tdsInput, 10) || 0;
  const getTdsStatus = (tds: number) => {
    if (tds <= 50) return { label: language === 'hi' ? 'अति शुद्ध (खनिज कम)' : 'Ultra Pure (Low Minerals)', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/40' };
    if (tds <= 150) return { label: language === 'hi' ? 'उत्कृष्ट पेयजल (सर्वोत्तम स्वास्थ्य)' : 'Optimal Drinking Water (Best Health)', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40' };
    if (tds <= 250) return { label: language === 'hi' ? 'सुरक्षित एवं मानक' : 'Safe & Standard', color: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-950/40' };
    if (tds <= 350) return { label: language === 'hi' ? 'मध्यम (सावधानी आवश्यक)' : 'Moderate (Caution Needed)', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40' };
    return { label: language === 'hi' ? 'असुरक्षित / अशुद्ध पानी' : 'Unsafe / Impure Water', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/40' };
  };

  const tdsStatus = getTdsStatus(parsedTds);

  const handleShareAdvice = () => {
    const text = `*Bharat Payjal - Hydration & Health Consultation*\n` +
      `--------------------------------\n` +
      `👨‍👩‍👧‍👦 ${t.familyMembersLabel} ${members} ${t.persons}\n` +
      `💧 Daily Water Requirement: ${dailyTotalLitres} L\n` +
      `📦 Monthly 20L Jars Needed: ${jarsPerMonth} ${t.jarsPerMonth}\n` +
      `💡 Recommended Plan: ${recommendedPlan}\n` +
      `🔬 Measured TDS: ${parsedTds} PPM (${tdsStatus.label})\n` +
      `--------------------------------\n` +
      `For pure & healthy water delivery contact: 7860393198\n` +
      `Bharat Payjal - DRINK PURE, LIVE PURE`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-200">
      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-2xs"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <Droplet className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {t.waterTestTitle}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              {t.waterTestSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Calculator Inputs */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors space-y-4">
        {/* Family Member Count Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-500" /> {t.familyMembersLabel}
            </span>
            <span className="text-sm font-extrabold text-sky-600 dark:text-sky-400 tabular-nums">
              {members} {t.persons}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            value={members}
            onChange={(e) => setMembers(parseInt(e.target.value, 10))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <span>1 {t.persons}</span>
            <span>8 {t.persons}</span>
            <span>15 {t.persons}</span>
          </div>
        </div>

        {/* Weather Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            {t.weatherLabel}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'summer' as const, label: t.summer, icon: '☀️' },
              { id: 'normal' as const, label: t.normalWeather, icon: '🌤️' },
              { id: 'winter' as const, label: t.winter, icon: '❄️' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setWeather(item.id)}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all touch-press flex flex-col items-center gap-0.5 ${
                  weather === item.id
                    ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-200 border-2 border-sky-500'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-[11px] truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Physical Activity Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            {t.activityLabel}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActivity('normal')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all touch-press text-center ${
                activity === 'normal'
                  ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-200 border-2 border-sky-500'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.activityNormal}
            </button>
            <button
              type="button"
              onClick={() => setActivity('active')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all touch-press text-center ${
                activity === 'active'
                  ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-200 border-2 border-sky-500'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.activityHard}
            </button>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-700 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase font-bold tracking-wider text-sky-100">
              {t.recommendedIntakeTitle}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
              {members} {t.forMembers}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-amber-300 tabular-nums">
              {dailyTotalLitres}
            </span>
            <span className="text-base font-bold text-sky-100">{t.litresPerDay}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/20 text-xs">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs">
              <span className="text-[10px] text-sky-200 block">20L Jar:</span>
              <strong className="text-base font-bold text-white tabular-nums">
                ~{jarsPerMonth} {t.jarsPerMonth}
              </strong>
            </div>

            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs">
              <span className="text-[10px] text-sky-200 block">{t.bestPlan}</span>
              <strong className="text-xs font-bold text-amber-300 leading-tight block">
                {recommendedPlan}
              </strong>
            </div>
          </div>

          <button
            onClick={handleShareAdvice}
            className="w-full mt-2 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs touch-press"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t.shareAdviceBtn}</span>
          </button>
        </div>
      </div>

      {/* TDS Checking Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            {t.tdsTestTitle}
          </h4>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <input
              type="number"
              value={tdsInput}
              onChange={(e) => setTdsInput(e.target.value)}
              placeholder={t.tdsPlaceholder}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">PPM</span>
        </div>

        <div className={`p-3 rounded-2xl border ${tdsStatus.bg} flex items-center justify-between`}>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">
              {t.pdsPurityStatus}
            </span>
            <strong className={`text-xs font-extrabold ${tdsStatus.color}`}>
              {tdsStatus.label}
            </strong>
          </div>
          <span className="text-xs font-bold tabular-nums px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 shadow-2xs">
            {parsedTds} PPM
          </span>
        </div>

        <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
          <p>• <strong>50 - 150 PPM:</strong> {language === 'hi' ? 'पीने हेतु सर्वोत्तम गुणवत्ता (भारत पेयजल मानक)' : 'Ideal Drinking Water Quality (Bharat Payjal Standard)'}</p>
          <p>• <strong>300+ PPM:</strong> {language === 'hi' ? 'उच्च खनिज व अशुद्धियों की संभावना' : 'High dissolved solids and impurities risk'}</p>
        </div>
      </div>
    </div>
  );
};
