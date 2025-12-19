import Database from "better-sqlite3";
import fs from "fs";

if (!fs.existsSync("./db")) fs.mkdirSync("./db");
const db = new Database("./db/database.sqlite");

// Drop old tasks table (starting fresh!)
db.prepare("DROP TABLE IF EXISTS tasks").run();

// Create vehicles table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS vehicles (
    id TEXT PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    vin TEXT,
    licensePlate TEXT,
    color TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

// Create services table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicleId TEXT NOT NULL,
    serviceType TEXT NOT NULL,
    mileage INTEGER NOT NULL,
    date TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicleId) REFERENCES vehicles(id) ON DELETE CASCADE
  )
`
).run();

console.log("✅ Database tables created successfully!");

export default db;
