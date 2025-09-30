// index.js
require("newrelic");
const express = require("express");

const app = express();
const PORT = 3000;

// A simple endpoint
app.get("/", (req, res) => {
  res.send("Hello from Jenkins demo!");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
