export type ThemeMode = 'light' | 'dark' | 'system';

export type DynamicPalette = 'ocean' | 'emerald' | 'saffron' | 'indigo' | 'ruby';

export interface CustomerTanki {
  id?: string;
  date: string;
  customer: string;
  amount: number;
  type?: 'regular' | 'alternative';
  address?: string;
}

export interface MonthData {
  month: string;
  baseSalary: number;
  regList: CustomerTanki[];
  regIncentiveTotal: number;
  altList: CustomerTanki[];
  altIncentiveTotal: number;
  bookingPercentBonus: number;
  attendanceBonus: number;
  leaveDays: number;
  leaveCut: number;
  missedCount: number;
  missedDeliveries: number;
  damagePenalty: number;
  advanceTaken: number;
  totalIncentive: number;
  totalPenalties: number;
  inHand: number;
  paidAmount?: number | null;
}

export interface StaffInfo {
  name: string;
  id: string;
  phone?: string;
  role?: string;
  location?: string;
  joinDate?: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  staff?: StaffInfo;
  monthList?: string[];
  defaultMonth?: string;
  monthDataMap?: Record<string, MonthData>;
}

export type ActiveTab = 'dashboard' | 'statement' | 'water_test' | 'settings';
