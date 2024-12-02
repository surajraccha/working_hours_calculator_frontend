export interface WorkEntry {
  id?: string;
  date: string;
  entryTime: string;
  exitTime: string;
  minutesWorked: number;
  type: 'office' | 'wfh' | 'holiday';
  description?: string;
  userId: string;
}

export interface UserSettings {
  workingDaysPerWeek: number;
  hoursPerDay: number;
  userId: string;
  workingDaysPerMonth: number;
}

export interface MonthlyStats {
  totalMinutesWorked: number;
  targetMinutes: number;
  remainingMinutes: number;
  daysWorked: number;
  holidayCount: number;
  wfhCount: number;
}

export interface MonthYear {
  month: number;
  year: number;
}