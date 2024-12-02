export const isWeekend = (date: string): boolean => {
  const dayOfWeek = new Date(date).getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
};

export const formatMonthYear = (month: number, year: number): string => {
  return new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
};

export const getCurrentMonthYear = (): { month: number; year: number } => {
  const now = new Date();
  return {
    month: now.getMonth(),
    year: now.getFullYear()
  };
};