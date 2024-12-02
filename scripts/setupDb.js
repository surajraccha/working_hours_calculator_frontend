import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'work_hours.db'));

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    user_id TEXT PRIMARY KEY,
    working_days_per_week INTEGER DEFAULT 5,
    hours_per_day INTEGER DEFAULT 9,
    working_days_per_month INTEGER DEFAULT 22,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS entries (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    date TEXT,
    entry_time TEXT,
    exit_time TEXT,
    minutes_worked INTEGER,
    type TEXT CHECK(type IN ('office', 'wfh', 'holiday')),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

console.log('Database setup completed successfully!');