import express from "express";
import cors from "cors";
import vehiclesRouter from "./routes/vehicles.js";
import servicesRouter from "./routes/services.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your Vite dev URL
  })
);
app.use(express.json());

// Mount routes
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/services", servicesRouter);

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
