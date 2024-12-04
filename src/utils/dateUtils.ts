import { format, isWeekend as isWeekendDate, startOfMonth, endOfMonth } from 'date-fns';

export const isWeekend = (date: string): boolean => {
  return isWeekendDate(new Date(date));
};

export const formatMonthYear = (month: number, year: number): string => {
  return format(new Date(year, month), 'MMMM yyyy');
};

export const getCurrentMonthYear = (): { month: number; year: number } => {
  const now = new Date();
  return {
    month: now.getMonth(),
    year: now.getFullYear()
  };
};

export const getMonthBoundaries = (month: number, year: number) => {
  const date = new Date(year, month);
  return {
    start: startOfMonth(date),
    end: endOfMonth(date)
  };
};

export const isDateInMonth = (date: string, month: number, year: number): boolean => {
  const checkDate = new Date(date);
  return checkDate.getMonth() === month && checkDate.getFullYear() === year;
};

export const validateDateSelection = (date: string): boolean => {
  const selectedDate = new Date(date);
  const currentDate = new Date();
  
  // Don't allow future dates
  if (selectedDate > currentDate) {
    return false;
  }
  
  // Don't allow weekends
  if (isWeekend(date)) {
    return false;
  }
  
  return true;
};