import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { AndroidTopBar } from './components/AndroidTopBar';
import { AndroidBottomNav } from './components/AndroidBottomNav';
import { LoginScreen } from './components/LoginScreen';
import { DashboardTab } from './components/DashboardTab';
import { StatementTab } from './components/StatementTab';
import { WaterTestTab } from './components/WaterTestTab';
import { SettingsTab } from './components/SettingsTab';
import { SalarySlipModal } from './components/SalarySlipModal';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { ActiveTab, MonthData, StaffInfo } from './types';
import { loginStaff, getFallbackResponse, sanitizeMonthData, SAMPLE_MONTH_DATA } from './services/api';
import { WifiOff } from 'lucide-react';

function JalMitraApp() {
  const isOnline = useOnlineStatus();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [staff, setStaff] = useState<StaffInfo>({
    name: 'Talib',
    id: 'BP001',
    phone: '7054198443',
    role: 'जल मित्र (डिलीवरी पार्टनर)',
    location: 'भारत पेयजल हरदोई 🇮🇳',
  });

  const [monthList, setMonthList] = useState<string[]>(['November 2026', 'October 2026']);
  const [selectedMonth, setSelectedMonth] = useState<string>('November 2026');
  const [monthDataMap, setMonthDataMap] = useState<Record<string, MonthData>>(SAMPLE_MONTH_DATA);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSalarySlipOpen, setIsSalarySlipOpen] = useState(false);

  const savedId = typeof window !== 'undefined' ? localStorage.getItem('bp_staff_id') || '' : '';
  const savedPin = typeof window !== 'undefined' ? localStorage.getItem('bp_staff_pin') || '' : '';

  // Auto-login on mount if Remember Me was selected
  useEffect(() => {
    const remember = localStorage.getItem('bp_remember_me');
    const sId = localStorage.getItem('bp_staff_id');
    const sPin = localStorage.getItem('bp_staff_pin');

    if (remember === 'true' && sId && sPin) {
      handleLogin(sId, sPin, true, true);
    }
  }, []);

  const handleLogin = async (
    idVal: string,
    pinVal: string,
    remember: boolean,
    isQuiet = false
  ): Promise<boolean> => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const res = await loginStaff(idVal, pinVal);
      setIsLoading(false);

      if (!res.success) {
        if (!isQuiet) {
          setLoginError(res.message || 'लॉगिन असफल रहा। कृपया ID एवं PIN जांचें।');
        }
        return false;
      }

      if (remember) {
        localStorage.setItem('bp_staff_id', idVal);
        localStorage.setItem('bp_staff_pin', pinVal);
        localStorage.setItem('bp_remember_me', 'true');
      } else {
        localStorage.removeItem('bp_staff_id');
        localStorage.removeItem('bp_staff_pin');
        localStorage.removeItem('bp_remember_me');
      }

      if (res.staff) {
        setStaff(res.staff);
      }
      if (res.monthList && res.monthList.length > 0) {
        setMonthList(res.monthList);
      }
      if (res.defaultMonth) {
        setSelectedMonth(res.defaultMonth);
      }
      if (res.monthDataMap) {
        setMonthDataMap(res.monthDataMap);
      }

      setIsLoggedIn(true);
      return true;
    } catch {
      setIsLoading(false);
      if (!isQuiet) {
        setLoginError('नेटवर्क कनेक्शन में त्रुटि। कृपया पुनः प्रयास करें।');
      }
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bp_staff_id');
    localStorage.removeItem('bp_staff_pin');
    localStorage.removeItem('bp_remember_me');
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    setIsSalarySlipOpen(false);
  };

  const handleDemoLogin = (enteredId?: string) => {
    const fallback = getFallbackResponse(enteredId || 'BP001');
    if (fallback.staff) setStaff(fallback.staff);
    if (fallback.monthList) setMonthList(fallback.monthList);
    if (fallback.defaultMonth) setSelectedMonth(fallback.defaultMonth);
    if (fallback.monthDataMap) setMonthDataMap(fallback.monthDataMap);
    setIsLoggedIn(true);
  };

  const rawMonthData =
    monthDataMap[selectedMonth] || SAMPLE_MONTH_DATA['November 2026'] || Object.values(monthDataMap)[0];
  const currentMonthData: MonthData = sanitizeMonthData(rawMonthData, selectedMonth);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col justify-between items-center transition-colors">
      {/* Offline Toast Banner */}
      {!isOnline && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-600 text-white text-xs font-bold shadow-lg">
          <WifiOff className="w-3.5 h-3.5" />
          <span>ऑफ़लाइन मोड — कैश्ड डेटा उपलब्ध</span>
        </div>
      )}

      {/* Android Device Container Shell */}
      <div className="w-full max-w-md min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between shadow-2xl relative transition-colors sm:border-x sm:border-slate-200 dark:sm:border-slate-800">
        <div>
          {/* Simulated Android Native Status Bar */}
          <AndroidStatusBar />

          {/* Top Bar with brand & theme toggles */}
          <AndroidTopBar
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            staffName={staff.name}
          />

          {/* Main App Content Views */}
          <main className="w-full px-3.5 pt-3">
            {!isLoggedIn ? (
              <LoginScreen
                onLogin={(id, pin, remember) => handleLogin(id, pin, remember)}
                onDemoLogin={handleDemoLogin}
                isLoading={isLoading}
                errorMsg={loginError}
                savedId={savedId}
                savedPin={savedPin}
              />
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <DashboardTab
                    staff={staff}
                    monthData={currentMonthData}
                    monthList={monthList}
                    selectedMonth={selectedMonth}
                    onMonthChange={(m) => setSelectedMonth(m)}
                    onOpenStatement={() => setActiveTab('statement')}
                    onOpenSalarySlip={() => setIsSalarySlipOpen(true)}
                  />
                )}

                {activeTab === 'statement' && (
                  <StatementTab
                    staff={staff}
                    monthData={currentMonthData}
                    onOpenSalarySlip={() => setIsSalarySlipOpen(true)}
                  />
                )}

                {activeTab === 'water_test' && <WaterTestTab />}

                {activeTab === 'settings' && (
                  <SettingsTab staff={staff} onLogout={handleLogout} />
                )}
              </>
            )}
          </main>
        </div>

        {/* Bottom Navigation Bar when logged in */}
        {isLoggedIn && (
          <AndroidBottomNav
            activeTab={activeTab}
            onChangeTab={(t) => setActiveTab(t)}
          />
        )}

        {/* Salary Slip Modal */}
        <SalarySlipModal
          isOpen={isSalarySlipOpen}
          onClose={() => setIsSalarySlipOpen(false)}
          staff={staff}
          monthData={currentMonthData}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <JalMitraApp />
      </ThemeProvider>
    </LanguageProvider>
  );
}
