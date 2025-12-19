# !AutoNotes 

A minimalist car maintenance tracker for managing service records across multiple vehicles.

## Features

- **Multi-vehicle tracking** - Add and manage multiple cars
- **Service records** - Track maintenance with mileage, date, and notes
- **Drag & drop** - Move service records between vehicles
- **Common services** - Quick-select from 5 most common maintenance types
- **Custom services** - Add your own service types via "Other" option
- **Persistent storage** - All data saved to SQLite database
- **Brutalist UI** - Clean, no-nonsense interface with black borders and minimal styling

## Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Native drag and drop API

**Backend:**
- Node.js + Express
- SQLite (better-sqlite3)
- RESTful API

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/AutoNotes.git
cd AutoNotes
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Install backend dependencies:**
```bash
cd server
npm install
cd ..
```

4. **Start the backend server:**
```bash
cd server
node app.js
```
You should see:
```
✅ Database tables created successfully!
✅ Server running on http://localhost:4000
```

5. **In a new terminal, start the frontend:**
```bash
npm run dev
```

6. **Open your browser to** `http://localhost:5173`

## Usage

### Adding a Vehicle
1. Click **"+ Add Vehicle"** button
2. Enter vehicle details (Make, Model, Year are required)
3. Optionally add VIN, License Plate, and Color
4. Click **"Add Vehicle"**

### Adding Service Records
1. Click **"+ Add Service"** in any vehicle column
2. Select a service type from the dropdown (or choose "Other" for custom)
3. Enter mileage and date
4. Optionally add notes
5. Click **"Add"**

### Managing Records
- **Move services** - Drag and drop service cards between vehicles
- **Delete services** - Click the ✖ button on any service card
- **Delete vehicles** - Click the ✖ button in the vehicle header (deletes all services for that vehicle)

## Project Structure
```
AutoNotes/
├── src/
│   ├── components/
│   │   ├── MaintenanceTracker.jsx  # Main app logic & state management
│   │   ├── Column.jsx               # Vehicle column component
│   │   ├── ServiceRecord.jsx        # Individual service card
│   │   └── VehicleModal.jsx         # Add vehicle modal
│   ├── api/
│   │   └── services.js              # API calls to backend
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── routes/
│   │   ├── vehicles.js              # Vehicle CRUD endpoints
│   │   └── services.js              # Service CRUD endpoints
│   ├── db.js                        # Database setup & schema
│   └── app.js                       # Express server
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Database Schema

### Vehicles Table
```sql
CREATE TABLE vehicles (
  id TEXT PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  vin TEXT,
  licensePlate TEXT,
  color TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Services Table
```sql
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vehicleId TEXT NOT NULL,
  serviceType TEXT NOT NULL,
  mileage INTEGER NOT NULL,
  date TEXT NOT NULL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicleId) REFERENCES vehicles(id) ON DELETE CASCADE
);
```

## API Endpoints

### Vehicles
- `GET /api/vehicles` - Get all vehicles with their services
- `GET /api/vehicles/:id` - Get a specific vehicle
- `POST /api/vehicles` - Create a new vehicle
- `PUT /api/vehicles/:id` - Update a vehicle
- `DELETE /api/vehicles/:id` - Delete a vehicle (cascades to services)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/vehicle/:vehicleId` - Get services for a specific vehicle
- `POST /api/services` - Create a new service
- `PUT /api/services/:id` - Update a service
- `DELETE /api/services/:id` - Delete a service

## Common Service Types

The app comes pre-configured with these common maintenance services:
1. Oil and Filter Changes
2. Tire Rotation
3. Brake Service
4. Transmission Service
5. Air Filter Replacement
6. Other (custom input)

## Development

### Running in Development Mode

**Terminal 1 - Backend:**
```bash
cd server
node app.js
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Port Configuration
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

Ports are configured in:
- `vite.config.js` (frontend)
- `server/app.js` (backend)

## Troubleshooting

### CORS Errors
Make sure the backend CORS origin matches your frontend port in `server/app.js`:
```javascript
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
```

### Port Conflicts
If port 5173 is in use, kill the process:
```bash
lsof -ti:5173 | xargs kill -9
```

### Styling Not Loading
Ensure Tailwind is properly configured:
1. Check `tailwind.config.js` exists
2. Check `src/index.css` has `@tailwind` directives
3. Restart dev server


*Inspired by a kanban board project, things really took off from there.*
