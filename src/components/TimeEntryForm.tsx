import React, { useState, useEffect } from 'react';
import { Clock, Plus, Pencil } from 'lucide-react';
import { calculateMinutesWorked, getDefaultWorkMinutes } from '../utils/timeCalculations';
import { isWeekend } from '../utils/dateUtils';
import type { WorkEntry, UserSettings } from '../types';

interface TimeEntryFormProps {
  onSubmit: (entry: WorkEntry) => void;
  editEntry?: WorkEntry;
  onCancel?: () => void;
  settings: UserSettings;
}

export function TimeEntryForm({ onSubmit, editEntry, onCancel, settings }: TimeEntryFormProps) {
  const [date, setDate] = useState(editEntry?.date || new Date().toISOString().split('T')[0]);
  const [entryTime, setEntryTime] = useState(editEntry?.entryTime || '');
  const [exitTime, setExitTime] = useState(editEntry?.exitTime || '');
  const [type, setType] = useState<WorkEntry['type']>(editEntry?.type || 'office');
  const [description, setDescription] = useState(editEntry?.description || '');

  const handleDateChange = (newDate: string) => {
    if (isWeekend(newDate)) {
      alert('Weekends are not allowed for work entries.');
      return;
    }
    setDate(newDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isWeekend(date)) {
      alert('Cannot add entries for weekends.');
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

    if (!editEntry) {
      setEntryTime('');
      setExitTime('');
      setDescription('');
      setType('office');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Clock className="w-6 h-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold">
          {editEntry ? 'Edit Entry' : 'New Entry'}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
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
            onChange={(e) => setType(e.target.value as WorkEntry['type'])}
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
                onChange={(e) => setEntryTime(e.target.value)}
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
                onChange={(e) => setExitTime(e.target.value)}
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
      
      <div className="flex justify-end space-x-2 mt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {editEntry ? <Pencil className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {editEntry ? 'Update Entry' : 'Add Entry'}
        </button>
      </div>
    </form>
  );
}