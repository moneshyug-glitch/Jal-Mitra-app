import React from 'react';
import {
  Calendar,
  Users,
  AlertTriangle,
  ShieldAlert,
  Award,
  Wallet,
  Gift,
  Scissors,
  HandCoins,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  Clock,
} from 'lucide-react';
import { MonthData, StaffInfo } from '../types';
import { BharatPeyjalLogo } from './BharatPeyjalLogo';

interface DashboardTabProps {
  staff: StaffInfo;
  monthData: MonthData;
  monthList: string[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onOpenStatement: () => void;
  onOpenSalarySlip: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  staff,
  monthData,
  monthList,
  selectedMonth,
  onMonthChange,
  onOpenStatement,
  onOpenSalarySlip,
}) => {
  const d = monthData;
  const totalCust = (d.regList?.length || 0) + (d.altList?.length || 0);
  const paid = d.paidAmount !== undefined && d.paidAmount !== null ? Number(d.paidAmount) : 0;
  const pending = Math.max(0, Number(d.inHand || 0) - paid);

  return (
    <div className="space-y-3.5 pb-20 animate-in fade-in duration-200">
      {/* 1. Profile & Month Selector Card with Bharat Peyjal Logo */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-3">
          <BharatPeyjalLogo variant="icon" size="lg" />

          <div className="min-w-0 flex-1">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                नमस्ते,
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60">
                <Sparkles className="w-3 h-3 text-amber-500" /> जल मित्र
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
              {staff.name}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                ID: {staff.id}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {staff.location || 'भारत पेयजल हरदोई 🇮🇳'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* Month Selector Strip */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 flex items-center justify-center shadow-2xs">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 leading-tight">
                  वेतन माह
                </span>
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  महीने का हिसाब
                </span>
              </div>
            </div>

            <div className="shrink-0 max-w-[170px]">
              <select
                value={selectedMonth}
                onChange={(e) => onMonthChange(e.target.value)}
                className="w-full text-xs font-bold py-1.5 px-2.5 rounded-xl bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
              >
                {monthList.map((m, idx) => (
                  <option key={m} value={m}>
                    {m} {idx === 0 ? '(चालू)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Performance Section (कार्य रिपोर्ट) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs shrink-0"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                कार्य रिपोर्ट (Performance)
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {d.month}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            मासिक रिपोर्ट
          </span>
        </div>

        {/* 4 KPI Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* KPI 1: New Customers */}
          <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/40 flex flex-col justify-between min-h-[92px]">
            <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-400">
              <span className="text-[11px] font-bold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> नए ग्राहक
              </span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="my-1">
              <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                {totalCust} ग्राहक
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
              {d.regList?.length || 0} रेगुलर + {d.altList?.length || 0} अल्टरनेटिव
            </p>
          </div>

          {/* KPI 2: Missed Deliveries */}
          <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/40 flex flex-col justify-between min-h-[92px]">
            <div className="flex justify-between items-center text-rose-700 dark:text-rose-400">
              <span className="text-[11px] font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> छूटी डिलीवरी
              </span>
              <span className="text-[10px] font-bold">⚠️</span>
            </div>
            <div className="my-1">
              <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                {d.missedCount || 0} शिकायत
              </span>
            </div>
            <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 leading-tight">
              ₹{(d.missedDeliveries || 0).toLocaleString('en-IN')} कटौती हुई
            </p>
          </div>

          {/* KPI 3: Penalty / Damage */}
          <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 flex flex-col justify-between min-h-[92px]">
            <div className="flex justify-between items-center text-amber-700 dark:text-amber-400">
              <span className="text-[11px] font-bold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> पेनल्टी/नुकसान
              </span>
              <span className="text-[10px]">⚖️</span>
            </div>
            <div className="my-1">
              <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                ₹{(d.damagePenalty || 0).toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
              लापरवाही कटौती
            </p>
          </div>

          {/* KPI 4: Attendance Record */}
          <div className="p-3 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/70 dark:border-sky-900/40 flex flex-col justify-between min-h-[92px]">
            <div className="flex justify-between items-center text-sky-700 dark:text-sky-400">
              <span className="text-[11px] font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> हाज़िरी रिकॉर्ड
              </span>
              <span className="text-[10px]">📅</span>
            </div>
            <div className="my-1">
              <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                {d.leaveDays === 0 ? '100% हाज़िरी' : `${d.leaveDays} दिन छुट्टी`}
              </span>
            </div>
            <p className={`text-[10px] font-bold leading-tight ${d.leaveDays === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
              {d.leaveDays === 0 ? '+₹200 नकद इनाम मिला' : 'इनाम के पात्र नहीं'}
            </p>
          </div>
        </div>

        {/* Advisory Strip */}
        <div className="mt-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2">
          <span className="shrink-0 text-sm">📢</span>
          <p className="leading-tight">
            <strong>मासिक समीक्षा:</strong> समय पर स्वच्छ पानी पहुंचाएं, शिकायतें शून्य रखें और पूरा इंसेंटिव हासिल करें।
          </p>
        </div>
      </div>

      {/* 3. Net In-Hand Banner (कुल बची शुद्ध सैलरी) */}
      <div
        className="rounded-3xl p-5 text-white shadow-lg relative overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)',
        }}
      >
        <div className="relative z-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-xs text-sky-100 mb-1">
            कुल बची शुद्ध सैलरी (NET PAYABLE)
          </span>

          <div className="text-3xl sm:text-4xl font-black text-amber-300 my-1 tabular-nums tracking-tight">
            ₹{d.inHand.toLocaleString('en-IN')}
          </div>

          <p className="text-[11px] text-sky-100/80 mb-3">
            इंसेंटिव जोड़कर और एडवांस व कटौतियां काटकर
          </p>

          {/* Paid vs Due Two-Pill Box */}
          <div className="grid grid-cols-2 gap-2 mt-2 text-left">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="block text-[10px] font-medium text-emerald-200">
                🟢 भुगतान हुआ (Paid)
              </span>
              <strong className="text-sm sm:text-base font-extrabold text-white tabular-nums">
                ₹{paid.toLocaleString('en-IN')}
              </strong>
            </div>

            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="block text-[10px] font-medium text-amber-200">
                🟠 बकाया रकम (Due)
              </span>
              <strong className="text-sm sm:text-base font-extrabold text-amber-300 tabular-nums">
                ₹{pending.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <div className="mt-3 flex justify-center">
            {pending === 0 && d.inHand > 0 ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-100 border border-emerald-400/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> पूरा भुगतान हो चुका है
              </span>
            ) : pending > 0 ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/30 text-amber-100 border border-amber-300/30">
                <Clock className="w-3.5 h-3.5" /> शेष ₹{pending.toLocaleString('en-IN')} बाद में देय है
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-slate-200">
                हिसाब सामान्य
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 4. Four Summary Stat Badges */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
          <div className="min-w-0 pr-1">
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">
              फिक्स सैलरी
            </span>
            <strong className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
              ₹{d.baseSalary.toLocaleString('en-IN')}
            </strong>
          </div>
          <Wallet className="w-4 h-4 text-slate-400 shrink-0" />
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
          <div className="min-w-0 pr-1">
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">
              कुल इंसेंटिव
            </span>
            <strong className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              +₹{d.totalIncentive.toLocaleString('en-IN')}
            </strong>
          </div>
          <Gift className="w-4 h-4 text-emerald-500 shrink-0" />
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
          <div className="min-w-0 pr-1">
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">
              कुल कटौती
            </span>
            <strong className="text-xs font-bold text-rose-600 dark:text-rose-400 tabular-nums">
              -₹{d.totalPenalties.toLocaleString('en-IN')}
            </strong>
          </div>
          <Scissors className="w-4 h-4 text-rose-500 shrink-0" />
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
          <div className="min-w-0 pr-1">
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">
              एडवांस + खर्चा
            </span>
            <strong className="text-xs font-bold text-amber-600 dark:text-amber-400 tabular-nums">
              -₹{d.advanceTaken.toLocaleString('en-IN')}
            </strong>
          </div>
          <HandCoins className="w-4 h-4 text-amber-500 shrink-0" />
        </div>
      </div>

      {/* 5. Quick Shortcut CTA Row */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={onOpenStatement}
          className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors touch-press flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                विस्तृत हिसाब
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">
                9 मदों का पूरा ब्यौरा
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={onOpenSalarySlip}
          className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors touch-press flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                वेतन पर्ची (Slip)
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">
                शेयर व प्रिंट करें
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 6. Annual Increment Policy Card (वार्षिक वेतन वृद्धि नीति) */}
      <div className="bg-gradient-to-br from-white via-white to-emerald-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 rounded-3xl p-4 shadow-sm border border-emerald-200/80 dark:border-emerald-900/40 transition-colors">
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0 shadow-2xs">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate leading-tight">
                वार्षिक वेतन वृद्धि नीति (Increment)
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight">
                Annual Appraisal & Career Growth
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 shrink-0">
            सैलरी इंक्रीमेंट
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
          भारत पेयजल में आपकी निष्ठा, ईमानदारी और उत्कृष्ट सेवा का सम्मान करने हेतु वार्षिक वेतन वृद्धि का प्रावधान है। <strong>सैलरी इंक्रीमेंट</strong> के लिए निम्नलिखित <strong>2 अनिवार्य पात्रता शर्तें</strong> पूर्ण करना आवश्यक है:
        </p>

        {/* 2 Conditions */}
        <div className="space-y-2 mb-3">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <strong className="text-xs text-slate-900 dark:text-white">
                  1 वर्ष का पूर्ण सेवाकाल
                </strong>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  12 माह अनिवार्य
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                कर्मचारी का भारत पेयजल के साथ कम से कम <strong>1 वर्ष (12 माह)</strong> का निरंतर, अनुशासित एवं समर्पित कार्यकाल पूरा होना आवश्यक है।
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <strong className="text-xs text-slate-900 dark:text-white">
                  न्यूनतम 36 नए ग्राहक
                </strong>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
                  36 ग्राहक / वर्ष
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                पूरे सेवा वर्ष के दौरान न्यूनतम <strong>36 नए सक्रिय ग्राहक</strong> संस्था से जोड़ना अनिवार्य है (औसतन केवल 3 ग्राहक प्रति माह)।
              </p>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <p className="leading-tight">
            <strong>नोट:</strong> दोनों शर्तें पूर्ण होने पर वार्षिक समीक्षा (Appraisal) में आपकी सैलरी में सम्मानजनक वृद्धि (Increment) की जाएगी।
          </p>
        </div>
      </div>
    </div>
  );
};
