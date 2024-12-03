
export const calculateMinutesWorked = (entryTime: string, exitTime: string): number => {
  if (!entryTime || !exitTime) return 0;
  
  const [entryHours, entryMinutes] = entryTime.split(':').map(Number);
  const [exitHours, exitMinutes] = exitTime.split(':').map(Number);
  
  if (isNaN(entryHours) || isNaN(entryMinutes) || isNaN(exitHours) || isNaN(exitMinutes)) {
    return 0;
  }
  
  const totalMinutes = (exitHours * 60 + exitMinutes) - (entryHours * 60 + entryMinutes);
  return totalMinutes > 0 ? totalMinutes : 0;
};

export const formatMinutesToHours = (minutes: number): string => {
  if (typeof minutes !== 'number' || isNaN(minutes)) {
    return '0h 0m';
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  return `${hours}h ${remainingMinutes}m`;
};

export const calculateMonthlyTarget = (
  workingDaysPerMonth: number,
  hoursPerDay: number
): number => {
  if (typeof workingDaysPerMonth !== 'number' || typeof hoursPerDay !== 'number' ||
      isNaN(workingDaysPerMonth) || isNaN(hoursPerDay)) {
    return 0;
  }
  return Math.floor(workingDaysPerMonth * hoursPerDay * 60);
};

export const getDefaultWorkMinutes = (hoursPerDay: number): number => {
  if (typeof hoursPerDay !== 'number' || isNaN(hoursPerDay)) {
    return 0;
  }
  return Math.floor(hoursPerDay * 60);
};