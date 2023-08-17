const express = require("express");
const app = express();

// Express middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Absolute Path
const path = require("path");
app.use(express.static(path.join(__dirname, "..")));

// Import Routers
const userRoutes = require('../routes/users.js');
const petRoutes = require('../routes/pets.js');

// Use the userRoutes router
app.use('/', userRoutes);
app.use('/', petRoutes);

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// API
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});
