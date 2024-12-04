import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMonthYear, getCurrentMonthYear } from '../utils/dateUtils';
import type { MonthYear } from '../types';

interface MonthYearPickerProps {
  current: MonthYear;
  onChange: (monthYear: MonthYear) => void;
}

export function MonthYearPicker({ current, onChange }: MonthYearPickerProps) {
  const { month: currentMonth, year: currentYear } = getCurrentMonthYear();
  
  const handlePrevMonth = () => {
    const newMonth = current.month === 0 ? 11 : current.month - 1;
    const newYear = current.month === 0 ? current.year - 1 : current.year;
    
    // Don't allow navigating past the current month
    if (newYear < currentYear || (newYear === currentYear && newMonth > currentMonth)) {
      return;
    }
    
    onChange({ month: newMonth, year: newYear });
  };

  const handleNextMonth = () => {
    const newMonth = current.month === 11 ? 0 : current.month + 1;
    const newYear = current.month === 11 ? current.year + 1 : current.year;
    
    // Don't allow navigating past the current month
    if (newYear > currentYear || (newYear === currentYear && newMonth > currentMonth)) {
      return;
    }
    
    onChange({ month: newMonth, year: newYear });
  };

  const isCurrentMonth = current.month === currentMonth && current.year === currentYear;
  const isPastMonth = current.year < currentYear || 
    (current.year === currentYear && current.month < currentMonth);

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-6">
      <button
        onClick={handlePrevMonth}
        className={`p-2 rounded-full transition-colors ${
          isPastMonth 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'hover:bg-gray-100 text-gray-700'
        }`}
        disabled={isPastMonth}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <h2 className="text-lg font-semibold text-gray-800">
        {formatMonthYear(current.month, current.year)}
      </h2>
      
      <button
        onClick={handleNextMonth}
        className={`p-2 rounded-full transition-colors ${
          isCurrentMonth 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'hover:bg-gray-100 text-gray-700'
        }`}
        disabled={isCurrentMonth}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}