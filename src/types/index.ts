export interface WorkEntry {
  _id?: string;
  date: string;
  entry_time: string;
  exit_time: string;
  minutes_worked: number;
  type: 'office' | 'wfh' | 'holiday';
  description?: string;
  user_id: string;
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
  officeCount : number;
}

export interface MonthYear {
  month: number;
  year: number;
}