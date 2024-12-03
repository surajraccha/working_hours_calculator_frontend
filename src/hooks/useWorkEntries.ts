import { useState, useEffect } from 'react';
import { getWorkEntries, saveWorkEntry, deleteWorkEntry } from '../lib/api';
import type { WorkEntry, MonthYear } from '../types';

export function useWorkEntries(userId: string, monthYear: MonthYear) {
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadEntries();
  }, [userId, monthYear.month, monthYear.year]);

  async function loadEntries() {
    try {
      setLoading(true);
      const data = await getWorkEntries(userId, monthYear.month, monthYear.year);
      setEntries(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load entries'));
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }

  async function addEntry(entry: WorkEntry) {
    try {
      const savedEntry = await saveWorkEntry(entry);
      setEntries(prev => [...prev, savedEntry]);
      return savedEntry;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save entry'));
      throw err;
    }
  }

  async function removeEntry(entry: WorkEntry) {
    if (!entry._id) return;
    
    try {
      await deleteWorkEntry(entry._id, userId);
      setEntries(prev => prev.filter(e => e._id !== entry._id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete entry'));
      throw err;
    }
  }

  return {
    entries,
    loading,
    error,
    addEntry,
    removeEntry,
    refresh: loadEntries
  };
}