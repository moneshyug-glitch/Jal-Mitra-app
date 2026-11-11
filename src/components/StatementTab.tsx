import React, { useState } from 'react';
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Receipt,
  Calendar,
  User,
  MapPin,
  Printer,
} from 'lucide-react';
import { MonthData, StaffInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface StatementTabProps {
  staff: StaffInfo;
  monthData: MonthData;
  onOpenSalarySlip: () => void;
}

export const StatementTab: React.FC<StatementTabProps> = ({
  monthData,
  onOpenSalarySlip,
}) => {
  const { t, language } = useLanguage();
  const [openReg, setOpenReg] = useState(false);
  const [openAlt, setOpenAlt] = useState(false);

  const d = monthData;
  const paid = d.paidAmount !== undefined && d.paidAmount !== null ? Number(d.paidAmount) : 0;
  const pending = Math.max(0, Number(d.inHand || 0) - paid);
  const perDayRate = Math.round(Number(d.baseSalary || 0) / 30);

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {t.statementTitle}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              {d.month} {t.statementSubtitle}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSalarySlip}
          className="px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-bold flex items-center gap-1.5 touch-press"
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>{t.openSlipBtn}</span>
        </button>
      </div>

      {/* Main 9 Itemized Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
          {/* 1. Base Salary */}
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {t.item1Title}
              </strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {t.item1Desc}
              </span>
            </div>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
              ₹{d.baseSalary.toLocaleString('en-IN')}
            </span>
          </div>

          {/* 2. Regular Tanki Incentive Accordion */}
          <div className="py-2.5">
            <div
              onClick={() => setOpenReg(!openReg)}
              className="flex justify-between items-center cursor-pointer select-none group"
            >
              <div className="pr-2">
                <div className="flex items-center gap-1.5">
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">
                    {t.item2Title}
                  </strong>
                  {openReg ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {d.regList?.length || 0} {t.item2ListPrompt} {openReg ? '▴' : '▾'}
                </span>
              </div>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                +₹{d.regIncentiveTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {openReg && (
              <div className="mt-2.5 p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2 animate-in fade-in duration-150">
                <div className="flex justify-between items-center pb-1 border-b border-emerald-200/40 dark:border-emerald-800/40 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                  <span>{t.item2Subheader} ({d.regList?.length || 0}):</span>
                  <span>{t.item2Rate}</span>
                </div>
                {(!d.regList || d.regList.length === 0) && (
                  <p className="text-slate-500 text-[11px]">{language === 'hi' ? 'कोई रेगुलर टंकी दर्ज नहीं है।' : 'No regular tankis recorded.'}</p>
                )}
                {d.regList?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex justify-between items-center gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate">
                        <User className="w-3 h-3 text-sky-500 shrink-0" />
                        <span className="truncate">{item.customer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <Calendar className="w-2.5 h-2.5" /> {item.date}
                        </span>
                        {item.address && (
                          <span className="flex items-center gap-0.5 truncate">
                            <MapPin className="w-2.5 h-2.5" /> {item.address}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0 tabular-nums">
                      +₹{item.amount}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Alternative Tanki Incentive Accordion */}
          <div className="py-2.5">
            <div
              onClick={() => setOpenAlt(!openAlt)}
              className="flex justify-between items-center cursor-pointer select-none group"
            >
              <div className="pr-2">
                <div className="flex items-center gap-1.5">
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">
                    {t.item3Title}
                  </strong>
                  {openAlt ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {d.altList?.length || 0} {t.item3ListPrompt} {openAlt ? '▴' : '▾'}
                </span>
              </div>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                +₹{d.altIncentiveTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {openAlt && (
              <div className="mt-2.5 p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2 animate-in fade-in duration-150">
                <div className="flex justify-between items-center pb-1 border-b border-emerald-200/40 dark:border-emerald-800/40 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                  <span>{t.item3Subheader} ({d.altList?.length || 0}):</span>
                  <span>{t.item3Rate}</span>
                </div>
                {(!d.altList || d.altList.length === 0) && (
                  <p className="text-slate-500 text-[11px]">{language === 'hi' ? 'कोई अल्टरनेटिव टंकी दर्ज नहीं है।' : 'No alternative tankis recorded.'}</p>
                )}
                {d.altList?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex justify-between items-center gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate">
                        <User className="w-3 h-3 text-sky-500 shrink-0" />
                        <span className="truncate">{item.customer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <Calendar className="w-2.5 h-2.5" /> {item.date}
                        </span>
                        {item.address && (
                          <span className="flex items-center gap-0.5 truncate">
                            <MapPin className="w-2.5 h-2.5" /> {item.address}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0 tabular-nums">
                      +₹{item.amount}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. Target Bonus */}
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {t.item4Title}
              </strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {t.item4Desc}
              </span>
            </div>
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              +₹{d.bookingPercentBonus.toLocaleString('en-IN')}
            </span>
          </div>

          {/* 5. Attendance Bonus */}
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {t.item5Title}
              </strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {d.leaveDays === 0
                  ? t.item5Eligible
                  : `${t.item5Ineligible} (${d.leaveDays} ${t.daysLeave})`}
              </span>
            </div>
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              +₹{d.attendanceBonus.toLocaleString('en-IN')}
            </span>
          </div>

          {/* 6. Leave Deduction */}
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {t.item6Title}
              </strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {d.leaveDays} {t.item6DescPrefix} (@ ₹{perDayRate}/{language === 'hi' ? 'दिन' : 'day'})
              </span>
            </div>
            <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
              -₹{d.leaveCut.toLocaleString('en-IN')}
            </span>
          </div>

          {/* 7. Missed Delivery Cut */}
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {t.item7Title}
              </strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {d.missedCount > 0 ? `${d.missedCount} ${t.item7DescCount}` : t.item7DescNone}
              </span>
            </div>
            <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
              -₹{d.missedDeliveries.toLocaleString('en-IN')}
            </span>
          </div>

          {/* 8. Damage Penalty */}
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {t.item8Title}
              </strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {t.item8Desc}
              </span>
            </div>
            <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
              -₹{d.damagePenalty.toLocaleString('en-IN')}
            </span>
          </div>

          {/* 9. Advance & Expenses */}
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {t.item9Title}
              </strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {t.item9Desc}
              </span>
            </div>
            <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
              -₹{d.advanceTaken.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Final Net Settlement Box */}
        <div className="mt-4 pt-3 border-t-2 border-slate-200 dark:border-slate-700/80 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {t.netInHandTotal}
            </span>
            <span className="text-base font-black text-sky-600 dark:text-sky-400 tabular-nums">
              ₹{d.inHand.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
            <span>{t.paidAmount}:</span>
            <strong className="text-slate-800 dark:text-slate-200 tabular-nums">
              ₹{paid.toLocaleString('en-IN')}
            </strong>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-amber-700 dark:text-amber-400">
              {t.dueAmount}:
            </span>
            <strong className="text-rose-600 dark:text-rose-400 tabular-nums font-bold">
              ₹{pending.toLocaleString('en-IN')}
            </strong>
          </div>
        </div>
      </div>

      {/* Share / Print Action Strip */}
      <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Receipt className="w-5 h-5 text-sky-500 shrink-0" />
          <p className="text-xs text-slate-600 dark:text-slate-300 truncate leading-tight">
            {t.officialSlipNotice}
          </p>
        </div>
        <button
          onClick={onOpenSalarySlip}
          className="px-3.5 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-xs touch-press"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{t.openSlipBtn}</span>
        </button>
      </div>
    </div>
  );
};
