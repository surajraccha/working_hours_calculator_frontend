import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import type { UserSettings } from '../types';

interface SettingsProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => void;
}

export function Settings({ settings, onUpdate }: SettingsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4">
        <SettingsIcon className="w-6 h-6 text-gray-500 mr-2" />
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Working Days per Month
          </label>
          <input
            type="number"
            min="1"
            max="23"
            value={settings.workingDaysPerMonth}
            onChange={(e) => onUpdate({
              ...settings,
              workingDaysPerMonth: Number(e.target.value)
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hours per Day
          </label>
          <input
            type="number"
            min="1"
            max="24"
            value={settings.hoursPerDay}
            onChange={(e) => onUpdate({
              ...settings,
              hoursPerDay: Number(e.target.value)
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <input
            type="text"
            value={settings.userId}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}