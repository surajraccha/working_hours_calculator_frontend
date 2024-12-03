import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { UserSettings } from '../types';

interface SettingsProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => Promise<void>;
}

export function Settings({ settings, onUpdate }: SettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const navigate = useNavigate();

  // Update local settings when prop changes
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleInputChange = (field: keyof UserSettings, value: number) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlur = async (field: keyof UserSettings) => {
    // Only update if the value has changed
    if (localSettings[field] !== settings[field]) {
      try {
        setIsLoading(true);
        await onUpdate(localSettings);
        navigate(`/${settings.userId}`);
      } catch (error) {
        console.error('Failed to update settings:', error);
        // Revert to previous value on error
        setLocalSettings(prev => ({
          ...prev,
          [field]: settings[field]
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

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
            value={localSettings.workingDaysPerMonth || ''}
            onChange={(e) => handleInputChange('workingDaysPerMonth', Number(e.target.value))}
            onBlur={() => handleBlur('workingDaysPerMonth')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            value={localSettings.hoursPerDay || ''}
            onChange={(e) => handleInputChange('hoursPerDay', Number(e.target.value))}
            onBlur={() => handleBlur('hoursPerDay')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <input
            type="text"
            value={localSettings.userId || ''}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
            <span className="text-gray-700">Updating settings...</span>
          </div>
        </div>
      )}
    </div>
  );
}