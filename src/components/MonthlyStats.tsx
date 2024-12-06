import React from 'react';
import { Clock, Target, Calendar, Home } from 'lucide-react';
import { formatMinutesToHours } from '../utils/timeCalculations';
import type { MonthlyStats, UserSettings } from '../types';

interface MonthlyStatsProps {
  stats: MonthlyStats;
  settings : UserSettings;
}

export function MonthlyStats({ stats,settings }: MonthlyStatsProps) {
  const safeStats = {
    totalMinutesWorked: typeof stats.totalMinutesWorked === 'number' ? stats.totalMinutesWorked : 0,
    targetMinutes: typeof stats.targetMinutes === 'number' ? stats.targetMinutes : 0,
    remainingMinutes: typeof stats.remainingMinutes === 'number' ? stats.remainingMinutes : 0,
    daysWorked: typeof stats.daysWorked === 'number' ? stats.daysWorked : 0,
    holidayCount: typeof stats.holidayCount === 'number' ? stats.holidayCount : 0,
    wfhCount: typeof stats.wfhCount === 'number' ? stats.wfhCount : 0,
    officeCount: typeof stats.officeCount === 'number' ? stats.officeCount : 0,
    totalCount : (typeof stats.holidayCount === 'number' ? stats.holidayCount : 0)+
                 (typeof stats.wfhCount === 'number' ? stats.wfhCount : 0)+
                 (typeof stats.officeCount === 'number' ? stats.officeCount : 0),
    pendingMinutes : (typeof stats.totalMinutesWorked === 'number' ? stats.totalMinutesWorked : 0) - 
                   (typeof stats.daysWorked === 'number' ? stats.daysWorked : 0) * settings.hoursPerDay * 60
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Clock className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Hours Worked</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {formatMinutesToHours(safeStats.totalMinutesWorked)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Clock className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">+- Hours</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {formatMinutesToHours(safeStats.pendingMinutes)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Target className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Target Hours</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {formatMinutesToHours(safeStats.targetMinutes)}
        </p>
      </div>

       <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Target className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Remaining Hours</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {formatMinutesToHours(safeStats.remainingMinutes)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Calendar className="w-5 h-5 text-purple-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Days Worked</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{safeStats.daysWorked}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Home className="w-5 h-5 text-orange-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Total Days</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{safeStats.totalCount}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Home className="w-5 h-5 text-orange-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Office Days</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{safeStats.officeCount}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Home className="w-5 h-5 text-orange-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">WFH Days</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{safeStats.wfhCount}</p>
      </div>
     
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Home className="w-5 h-5 text-orange-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Holidays</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{safeStats.holidayCount}</p>
      </div>
      
    </div>
  );
}