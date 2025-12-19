import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all services
router.get("/", (req, res) => {
  const services = db
    .prepare("SELECT * FROM services ORDER BY date DESC")
    .all();
  res.json(services);
});

// Get services for a specific vehicle
router.get("/vehicle/:vehicleId", (req, res) => {
  const { vehicleId } = req.params;
  const services = db
    .prepare("SELECT * FROM services WHERE vehicleId = ? ORDER BY date DESC")
    .all(vehicleId);
  res.json(services);
});

// Create a service
router.post("/", (req, res) => {
  const { vehicleId, serviceType, mileage, date, notes } = req.body;

  const stmt = db.prepare(
    "INSERT INTO services (vehicleId, serviceType, mileage, date, notes) VALUES (?, ?, ?, ?, ?)"
  );

  const info = stmt.run(vehicleId, serviceType, mileage, date, notes || null);

  const service = db
    .prepare("SELECT * FROM services WHERE id = ?")
    .get(info.lastInsertRowid);

  res.status(201).json(service);
});

// Update a service
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { vehicleId, serviceType, mileage, date, notes } = req.body;

  const stmt = db.prepare(
    "UPDATE services SET vehicleId = ?, serviceType = ?, mileage = ?, date = ?, notes = ? WHERE id = ?"
  );

  stmt.run(vehicleId, serviceType, mileage, date, notes, id);

  const updated = db.prepare("SELECT * FROM services WHERE id = ?").get(id);
  res.json(updated);
});

// Delete a service
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM services WHERE id = ?").run(id);
  res.json({ message: "Service deleted" });
});

export default router;
