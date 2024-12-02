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

function WorkHoursTracker() {
  const { userId } = useParams<{ userId: string }>();
  const [selectedMonthYear, setSelectedMonthYear] = React.useState(getCurrentMonthYear());
  
  if (!userId) {
    return <Navigate to="/" />;
  }

  const { settings, updateSettings } = useUserSettings(userId);
  const { 
    entries: filteredEntries, 
    addEntry, 
    updateEntry, 
    removeEntry,
    loading 
  } = useWorkEntries(userId, selectedMonthYear);

  const stats = {
    totalMinutesWorked: filteredEntries.reduce((sum, entry) => sum + entry.minutesWorked, 0),
    targetMinutes: (settings?.workingDaysPerMonth?settings.workingDaysPerMonth:1) * (settings?.hoursPerDay?settings.hoursPerDay:1) * 60,
    remainingMinutes: 0,
    daysWorked: filteredEntries.filter(e => e.type !== 'holiday').length,
    holidayCount: filteredEntries.filter(e => e.type === 'holiday').length,
    wfhCount: filteredEntries.filter(e => e.type === 'wfh').length
  };

  stats.remainingMinutes = Math.max(0, stats.targetMinutes - stats.totalMinutesWorked);

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
        <TimeEntryForm settings={settings} onSubmit={addEntry} />
        <EntriesList 
          entries={filteredEntries}
          onEdit={updateEntry}
          onDelete={removeEntry}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserCreation />} />
        <Route path="/:userId" element={<WorkHoursTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;