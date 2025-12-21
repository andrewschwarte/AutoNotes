import express from "express";
import cors from "cors";
import vehiclesRouter from "./routes/vehicles.js";
import servicesRouter from "./routes/services.js";

const app = express();
const PORT = process.env.PORT || 4000;

// CORS - Allow both local and production origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://autonotes.onrender.com", // ← You'll update this with your actual frontend URL later
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "!AutoNotes API is running" });
});

// Mount routes
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/services", servicesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
