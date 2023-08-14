const express = require("express");
const app = express();

// Use body-parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { spCreateUser } = require("../db/connection");

// Absolute Path
const path = require("path");
app.use(express.static(path.join(__dirname, "..")));

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// API
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});


app.post("/createUser", async (req, res) => {
    // Get data from form.
    const {} = req.body;
    
    // Execute Stored Procedure.
    try {
      await spCreateUser();

    } catch (error) {
      console.log(error);
    }
});