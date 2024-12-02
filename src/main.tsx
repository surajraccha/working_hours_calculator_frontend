import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize Google Sheets client before rendering
const init = async () => {
  try {    
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize application:', error);
    
    // Show error UI
    const root = document.getElementById('root')!;
    root.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; text-align: center; font-family: system-ui, -apple-system, sans-serif;">
        <div>
          <h1 style="color: #ef4444; font-size: 24px; margin-bottom: 16px;">Application Error</h1>
          <p style="color: #374151; margin-bottom: 16px;">Failed to initialize the application. Please check your configuration and try again.</p>
          <button 
            onclick="window.location.reload()" 
            style="background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer;"
          >
            Retry
          </button>
        </div>
      </div>
    `;
  }
};

init();