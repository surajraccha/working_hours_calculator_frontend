import { isWeekend } from './dateUtils';

export const calculateMinutesWorked = (entryTime: string, exitTime: string): number => {
  const [entryHours, entryMinutes] = entryTime.split(':').map(Number);
  const [exitHours, exitMinutes] = exitTime.split(':').map(Number);
  
  const totalMinutes = (exitHours * 60 + exitMinutes) - (entryHours * 60 + entryMinutes);
  return totalMinutes > 0 ? totalMinutes : 0;
};

export const formatMinutesToHours = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const calculateMonthlyTarget = (
  workingDaysPerMonth: number,
  hoursPerDay: number
): number => {
  return workingDaysPerMonth * hoursPerDay * 60;
};

export const getDefaultWorkMinutes = (hoursPerDay: number): number => {
  return hoursPerDay * 60;
};