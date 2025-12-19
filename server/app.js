import express from "express";
import cors from "cors";
import vehiclesRouter from "./routes/vehicles.js";
import servicesRouter from "./routes/services.js";

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:5173", // ← Match 5173
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Mount routes
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/services", servicesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
