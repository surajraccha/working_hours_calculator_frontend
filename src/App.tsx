import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { TimeEntryForm } from './components/TimeEntryForm';
import { MonthlyStats } from './components/MonthlyStats';
import { Settings } from './components/Settings';
import { EntriesList } from './components/EntriesList';
import { MonthYearPicker } from './components/MonthYearPicker';
import { UserCreation } from './components/UserCreation';
import { getCurrentMonthYear } from './utils/dateUtils';
import { useWorkEntries } from './hooks/useWorkEntries';
import { useUserSettings } from './hooks/useUserSettings';
import { WorkEntry } from './types';
import Gotcha from './components/Gotcha';

function WorkHoursTracker() {
  const { userId } = useParams<{ userId: string }>();
  const [selectedMonthYear, setSelectedMonthYear] = React.useState(getCurrentMonthYear());
  
  if (!userId) {
    return <Navigate to="/" />;
  }

  const { settings, updateSettings } = useUserSettings(userId);
  const { 
    entries, 
    addEntry, 
    removeEntry,
    loading,
    refresh 
  } = useWorkEntries(userId, selectedMonthYear);

  // Calculate stats after each entry modification
  const stats = React.useMemo(() => ({
    totalMinutesWorked: entries.reduce((sum, entry) => sum + entry.minutes_worked, 0),
    targetMinutes: settings.workingDaysPerMonth * settings.hoursPerDay * 60,
    remainingMinutes: Math.max(0, (settings.workingDaysPerMonth * settings.hoursPerDay * 60) - 
      entries.reduce((sum, entry) => sum + entry.minutes_worked, 0)),
    daysWorked: entries.filter(e => e.type !== 'holiday').length,
    holidayCount: entries.filter(e => e.type === 'holiday').length,
    wfhCount: entries.filter(e => e.type === 'wfh').length,
    officeCount : entries.filter(e => e.type === 'office').length,
  }), [entries, settings.workingDaysPerMonth, settings.hoursPerDay]);

  const handleAddEntry = async (entry: WorkEntry) => {
    await addEntry(entry);
    refresh(); // Refresh entries after adding
  };

  const handleDeleteEntry = async (entry: WorkEntry) => {
    await removeEntry(entry);
    refresh(); // Refresh entries after deleting
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Work Hours Tracker</h1>
        <Settings settings={settings} onUpdate={updateSettings} />
        <MonthYearPicker current={selectedMonthYear} onChange={setSelectedMonthYear} />
        <MonthlyStats stats={stats} />
        <TimeEntryForm 
          settings={settings} 
          onSubmit={handleAddEntry}
          existingEntries={entries}
        />
        <EntriesList 
          entries={entries}
          onDelete={handleDeleteEntry}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gotcha />} />
        <Route path="/createUser" element={<UserCreation />} />
        <Route path="/:userId" element={<WorkHoursTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;