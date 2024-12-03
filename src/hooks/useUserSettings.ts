import { useState, useEffect } from 'react';
import { getUserSettings, saveUserSettings } from '../lib/api';
import type { UserSettings } from '../types';

const DEFAULT_SETTINGS: UserSettings = {
  workingDaysPerWeek: 5,
  hoursPerDay: 9,
  workingDaysPerMonth: 22,
  userId: ''
};

export function useUserSettings(userId: string) {
  const [settings, setSettings] = useState<UserSettings>({ ...DEFAULT_SETTINGS, userId });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadSettings();
  }, [userId]);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await getUserSettings(userId);
      setSettings(data || { ...DEFAULT_SETTINGS, userId });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load settings'));
      setSettings({ ...DEFAULT_SETTINGS, userId });
    } finally {
      setLoading(false);
    }
  }

  async function updateSettings(newSettings: UserSettings) {
    try {
      setLoading(true);
      const savedSettings = await saveUserSettings(newSettings);
      setSettings(savedSettings);
      setError(null);
      return savedSettings;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save settings'));
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    settings,
    loading,
    error,
    updateSettings
  };
}