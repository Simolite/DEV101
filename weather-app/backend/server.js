const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // allow frontend to talk to backend
app.use(express.json()); // allow JSON requests

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Fake weather route
app.get("/weather", (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  // Just return dummy weather data
  res.json({
    city,
    temperature: "23°C",
    condition: "Sunny",
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
