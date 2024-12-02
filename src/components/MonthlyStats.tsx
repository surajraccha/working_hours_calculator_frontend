import React from 'react';
import { Clock, Target, Calendar } from 'lucide-react';
import { formatMinutesToHours } from '../utils/timeCalculations';
import type { MonthlyStats } from '../types';

interface MonthlyStatsProps {
  stats: MonthlyStats;
}

export function MonthlyStats({ stats }: MonthlyStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Clock className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Hours Worked</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {formatMinutesToHours(stats.totalMinutesWorked)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Target className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Target Hours</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {formatMinutesToHours(stats.targetMinutes)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Calendar className="w-5 h-5 text-purple-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Days Worked</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.daysWorked}</p>
      </div>
    </div>
  );
}