import { useState, useEffect } from 'react';
import { getWorkEntries, saveWorkEntry, deleteWorkEntry } from '../lib/db/index';
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
      setEntries(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load entries'));
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

  async function updateEntry(entry: WorkEntry) {
    try {
      const updatedEntry = await saveWorkEntry(entry);
      setEntries(prev => prev.map(e => e.id === entry.id ? updatedEntry : e));
      return updatedEntry;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update entry'));
      throw err;
    }
  }

  async function removeEntry(entry:any) {
    try {
      await deleteWorkEntry(entry.id,entry.userId);
      setEntries(prev => prev.filter(e => e.id !== entry.id));
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
    updateEntry,
    removeEntry,
    refresh: loadEntries
  };
}