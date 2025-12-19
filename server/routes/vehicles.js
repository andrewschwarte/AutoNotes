import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all vehicles with their services
router.get("/", (req, res) => {
  const vehicles = db
    .prepare("SELECT * FROM vehicles ORDER BY created_at DESC")
    .all();

  // For each vehicle, get its services
  const vehiclesWithServices = vehicles.map((vehicle) => {
    const services = db
      .prepare("SELECT * FROM services WHERE vehicleId = ? ORDER BY date DESC")
      .all(vehicle.id);

    return {
      ...vehicle,
      services,
    };
  });

  res.json(vehiclesWithServices);
});

// Get single vehicle
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const vehicle = db.prepare("SELECT * FROM vehicles WHERE id = ?").get(id);

  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  const services = db
    .prepare("SELECT * FROM services WHERE vehicleId = ?")
    .all(id);

  res.json({ ...vehicle, services });
});

// Create a vehicle
router.post("/", (req, res) => {
  const { id, make, model, year, vin, licensePlate, color } = req.body;

  const stmt = db.prepare(
    "INSERT INTO vehicles (id, make, model, year, vin, licensePlate, color) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  stmt.run(
    id,
    make,
    model,
    year,
    vin || null,
    licensePlate || null,
    color || null
  );

  const vehicle = db.prepare("SELECT * FROM vehicles WHERE id = ?").get(id);
  res.status(201).json(vehicle);
});

// Update a vehicle
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { make, model, year, vin, licensePlate, color } = req.body;

  const stmt = db.prepare(
    "UPDATE vehicles SET make = ?, model = ?, year = ?, vin = ?, licensePlate = ?, color = ? WHERE id = ?"
  );

  stmt.run(make, model, year, vin, licensePlate, color, id);

  const updated = db.prepare("SELECT * FROM vehicles WHERE id = ?").get(id);
  res.json(updated);
});

// Delete a vehicle (and all its services due to CASCADE)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM vehicles WHERE id = ?").run(id);
  res.json({ message: "Vehicle deleted" });
});

export default router;
