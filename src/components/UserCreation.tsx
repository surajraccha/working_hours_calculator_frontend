import React, { useState } from 'react';
import { createNewUser } from '../lib/db';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UserCreation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const newUserId = await createNewUser();
      localStorage.setItem('workHoursUserId', newUserId);
      navigate(`/${newUserId}`);
    } catch (err) {
      console.error('Failed to create user:', err);
      setError('Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex items-center mb-6">
          <UserPlus className="w-8 h-8 text-blue-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Create a new user to start tracking your work hours. You'll receive a unique ID to access your data.
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <button
          onClick={handleCreateUser}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            'Create New User'
          )}
        </button>
      </div>
    </div>
  );
}