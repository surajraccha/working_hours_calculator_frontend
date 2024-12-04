import React, { useState, useEffect } from 'react';
import { Clock, Plus, AlertCircle } from 'lucide-react';
import { calculateMinutesWorked, getDefaultWorkMinutes } from '../utils/timeCalculations';
import { validateDateSelection, isDateInMonth } from '../utils/dateUtils';
import type { WorkEntry, UserSettings, MonthYear } from '../types';

interface TimeEntryFormProps {
  onSubmit: (entry: WorkEntry) => void;
  settings: UserSettings;
  existingEntries: WorkEntry[];
  selectedMonth: MonthYear;
}

export function TimeEntryForm({ onSubmit, settings, existingEntries, selectedMonth }: TimeEntryFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [type, setType] = useState<WorkEntry['type']>('office');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    // Check if the date is in the selected month
    if (!isDateInMonth(date, selectedMonth.month, selectedMonth.year)) {
      setError(`Please select a date in ${new Date(selectedMonth.year, selectedMonth.month).toLocaleString('default', { month: 'long', year: 'numeric' })}`);
      return false;
    }

    // Validate date selection
    if (!validateDateSelection(date)) {
      setError('Invalid date selection. Weekends and future dates are not allowed.');
      return false;
    }

    // Check for duplicate date entry
    const hasDuplicate = existingEntries.some(entry => entry.date === date);
    if (hasDuplicate) {
      setError('An entry already exists for this date');
      return false;
    }

    if (type === 'office') {
      if (!entryTime || !exitTime) {
        setError('Both entry and exit times are required for office entries');
        return false;
      }

      const minutesWorked = calculateMinutesWorked(entryTime, exitTime);
      if (minutesWorked <= 0) {
        setError('Exit time must be later than entry time');
        return false;
      }
    }

    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    let minutesWorked: number;
    if (type === 'wfh') {
      minutesWorked = getDefaultWorkMinutes(settings.hoursPerDay);
    } else if (type === 'holiday') {
      minutesWorked = 0;
    } else {
      minutesWorked = calculateMinutesWorked(entryTime, exitTime);
    }

    onSubmit({
      date,
      entryTime: type === 'office' ? entryTime : '',
      exitTime: type === 'office' ? exitTime : '',
      minutesWorked,
      type,
      description,
      userId: settings.userId
    });

    // Reset form
    setEntryTime('');
    setExitTime('');
    setDescription('');
    setType('office');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4">
        <Clock className="w-6 h-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold">New Entry</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setError(null);
            }}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entry Type
          </label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as WorkEntry['type']);
              setError(null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="office">Office</option>
            <option value="wfh">Work From Home</option>
            <option value="holiday">Holiday</option>
          </select>
        </div>

        {type === 'office' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entry Time
              </label>
              <input
                type="time"
                value={entryTime}
                onChange={(e) => {
                  setEntryTime(e.target.value);
                  setError(null);
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exit Time
              </label>
              <input
                type="time"
                value={exitTime}
                onChange={(e) => {
                  setExitTime(e.target.value);
                  setError(null);
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={type === 'holiday' ? 'Reason for holiday...' : 'Additional notes...'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </button>
      </div>
    </form>
  );
}