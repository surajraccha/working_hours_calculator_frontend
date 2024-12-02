import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMonthYear } from '../utils/dateUtils';
import type { MonthYear } from '../types';

interface MonthYearPickerProps {
  current: MonthYear;
  onChange: (monthYear: MonthYear) => void;
}

export function MonthYearPicker({ current, onChange }: MonthYearPickerProps) {
  const handlePrevMonth = () => {
    const newMonth = current.month === 0 ? 11 : current.month - 1;
    const newYear = current.month === 0 ? current.year - 1 : current.year;
    onChange({ month: newMonth, year: newYear });
  };

  const handleNextMonth = () => {
    const newMonth = current.month === 11 ? 0 : current.month + 1;
    const newYear = current.month === 11 ? current.year + 1 : current.year;
    onChange({ month: newMonth, year: newYear });
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-6">
      <button
        onClick={handlePrevMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <h2 className="text-lg font-semibold">
        {formatMonthYear(current.month, current.year)}
      </h2>
      
      <button
        onClick={handleNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}