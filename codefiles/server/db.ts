import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'househunt.db'));
db.pragma('journal_mode = WAL');

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    role TEXT CHECK(role IN ('admin', 'owner', 'renter')) DEFAULT 'renter',
    profileImage TEXT,
    location TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    rentAmount REAL NOT NULL,
    propertyType TEXT,
    bedrooms INTEGER,
    amenities TEXT,
    images TEXT, -- JSON string array
    ownerId INTEGER,
    status TEXT CHECK(status IN ('available', 'booked')) DEFAULT 'available',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    propertyId INTEGER,
    ownerId INTEGER,
    tenantId INTEGER,
    tenantName TEXT,
    phone TEXT,
    bookingStatus TEXT CHECK(bookingStatus IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    bookingDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (propertyId) REFERENCES properties(id),
    FOREIGN KEY (ownerId) REFERENCES users(id),
    FOREIGN KEY (tenantId) REFERENCES users(id)
  );
`);

export default db;
