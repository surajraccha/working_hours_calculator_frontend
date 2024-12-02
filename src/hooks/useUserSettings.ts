import { useState, useEffect } from 'react';
import { getUserSettings, saveUserSettings } from '../lib/db/index';
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
      if (data) {
        setSettings(data);
      } else {
        // Initialize with default settings if none exist
        const defaultSettings = { ...DEFAULT_SETTINGS, userId };
        await saveUserSettings(defaultSettings);
        setSettings(defaultSettings);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load settings'));
    } finally {
      setLoading(false);
    }
  }

  async function updateSettings(newSettings: UserSettings) {
    try {
      const savedSettings = await saveUserSettings(newSettings);
      setSettings(savedSettings);
      return savedSettings;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save settings'));
      throw err;
    }
  }

  return {
    settings,
    loading,
    error,
    updateSettings
  };
}