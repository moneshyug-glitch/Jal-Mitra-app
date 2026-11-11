import React from 'react';
import { X, Printer, Share2, CheckCircle2, QrCode } from 'lucide-react';
import { MonthData, StaffInfo } from '../types';
import { BharatPeyjalLogo } from './BharatPeyjalLogo';

interface SalarySlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffInfo;
  monthData: MonthData;
}

export const SalarySlipModal: React.FC<SalarySlipModalProps> = ({
  isOpen,
  onClose,
  staff,
  monthData,
}) => {
  if (!isOpen) return null;

  const d = monthData;
  const paid = d.paidAmount !== undefined && d.paidAmount !== null ? Number(d.paidAmount) : 0;
  const pending = Math.max(0, Number(d.inHand || 0) - paid);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `*भारत पेयजल - जल मित्र मासिक वेतन पर्ची*\n` +
      `--------------------------------\n` +
      `👤 नाम: ${staff.name} (ID: ${staff.id})\n` +
      `📅 वेतन माह: ${d.month}\n` +
      `💰 मूल वेतन: ₹${d.baseSalary.toLocaleString('en-IN')}\n` +
      `🎁 कुल इंसेंटिव: +₹${d.totalIncentive.toLocaleString('en-IN')}\n` +
      `✂️ कुल कटौतियां: -₹${(d.totalPenalties + d.advanceTaken).toLocaleString('en-IN')}\n` +
      `--------------------------------\n` +
      `✅ कुल शुद्ध देय (Net In-Hand): ₹${d.inHand.toLocaleString('en-IN')}\n` +
      `🟢 प्राप्त रकम (Paid): ₹${paid.toLocaleString('en-IN')}\n` +
      `🟠 बकाया (Pending): ₹${pending.toLocaleString('en-IN')}\n` +
      `--------------------------------\n` +
      `📍 भारत पेयजल, हरदोई (उ.प्र.)\n` +
      `📞 हेल्पलाइन: 7860393198`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-5 sm:p-6 no-scrollbar">
        {/* Top Control Bar */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800 mb-4 print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            आधिकारिक वेतन पर्ची (Pay Slip)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="प्रिंट करें"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              title="WhatsApp पर भेजें"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Salary Slip Content */}
        <div className="border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 shadow-xs">
          {/* Slip Header with Professional Logo */}
          <div className="text-center pb-3 border-b-2 border-slate-900 dark:border-slate-100">
            <BharatPeyjalLogo variant="stacked" size="md" className="mb-2" />
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              स्वच्छ जल • समृद्ध भारत | हरदोई, उत्तर प्रदेश (पिन: 241001)
            </p>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-500">
              हेल्पलाइन: 7860393198 | ईमेल: hi@bharatpeyjal.in.net
            </p>
            <div className="mt-2 inline-block px-3 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700">
              मासिक वेतन पर्ची — {d.month}
            </div>
          </div>

          {/* Staff Information Table */}
          <div className="grid grid-cols-2 gap-2 text-xs py-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-slate-500 text-[10px] block">कर्मचारी का नाम:</span>
              <strong className="text-slate-900 dark:text-white font-bold">{staff.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">स्टाफ पहचान संख्या (ID):</span>
              <strong className="text-slate-900 dark:text-white font-bold">{staff.id}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">पद / भूमिका:</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">जल मित्र (डिलीवरी पार्टनर)</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">कार्य क्षेत्र:</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{staff.location || 'हरदोई जोन - 1'}</span>
            </div>
          </div>

          {/* Earnings & Deductions Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-b border-slate-200 dark:border-slate-800 text-xs">
            {/* Earnings Column */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-[11px] uppercase tracking-wider border-b border-emerald-200/50 pb-1">
                अर्जित आय (Earnings)
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">मूल फिक्स वेतन:</span>
                <span className="font-bold tabular-nums">₹{d.baseSalary.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">रेगुलर टंकी इंसेंटिव:</span>
                <span className="font-bold text-emerald-600 tabular-nums">+₹{d.regIncentiveTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">अल्टरनेटिव इंसेंटिव:</span>
                <span className="font-bold text-emerald-600 tabular-nums">+₹{d.altIncentiveTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">200 टंकी टारगेट बोनस:</span>
                <span className="font-bold text-emerald-600 tabular-nums">+₹{d.bookingPercentBonus.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">100% हाज़िरी इनाम:</span>
                <span className="font-bold text-emerald-600 tabular-nums">+₹{d.attendanceBonus.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-800 font-bold">
                <span>सकल आय (Gross Total):</span>
                <span className="text-emerald-600 tabular-nums">
                  ₹{(d.baseSalary + d.totalIncentive).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Deductions Column */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-rose-700 dark:text-rose-400 text-[11px] uppercase tracking-wider border-b border-rose-200/50 pb-1">
                कटौतियां (Deductions)
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">छुट्टी वेतन कटौती:</span>
                <span className="font-bold text-rose-600 tabular-nums">-₹{d.leaveCut.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">छूटी डिलीवरी जुर्माना:</span>
                <span className="font-bold text-rose-600 tabular-nums">-₹{d.missedDeliveries.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">लापरवाही / नुकसान:</span>
                <span className="font-bold text-rose-600 tabular-nums">-₹{d.damagePenalty.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">अग्रिम / एडवांस लिया:</span>
                <span className="font-bold text-rose-600 tabular-nums">-₹{d.advanceTaken.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-800 font-bold">
                <span>कुल कटौतियां:</span>
                <span className="text-rose-600 tabular-nums">
                  -₹{(d.totalPenalties + d.advanceTaken).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Net Pay Box */}
          <div className="my-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">
                शुद्ध देय वेतन (Net In-Hand)
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300">
                बैंक खाता / नकद भुगतान
              </span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-sky-600 dark:text-sky-400 tabular-nums">
                ₹{d.inHand.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Paid vs Due Status */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 block font-semibold">
                🟢 भुगतान हुआ:
              </span>
              <strong className="text-emerald-900 dark:text-emerald-200 font-bold tabular-nums">
                ₹{paid.toLocaleString('en-IN')}
              </strong>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <span className="text-[10px] text-amber-700 dark:text-amber-300 block font-semibold">
                🟠 बकाया रकम:
              </span>
              <strong className="text-amber-900 dark:text-amber-200 font-bold tabular-nums">
                ₹{pending.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          {/* Official Verification Stamp & QR Code */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-end text-[10px] text-slate-500">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>डिजिटल रूप से सत्यापित एवं अनुमोदित</span>
              </div>
              <p className="text-[9px]">जारी दिनांक: {new Date().toLocaleDateString('hi-IN')}</p>
            </div>
            <div className="text-right">
              <div className="w-12 h-12 border border-slate-300 dark:border-slate-700 rounded-lg p-1 bg-white dark:bg-slate-800 flex items-center justify-center mx-auto mb-1">
                <QrCode className="w-10 h-10 text-slate-800 dark:text-slate-200" />
              </div>
              <span className="text-[9px] font-bold block">प्राधिकृत हस्ताक्षर</span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-4 flex gap-2 print:hidden">
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs touch-press"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp पर भेजें</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 px-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-xs touch-press"
          >
            <Printer className="w-4 h-4" />
            <span>प्रिंट / सेव PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
