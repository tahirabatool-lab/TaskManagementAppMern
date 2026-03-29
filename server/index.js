const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/todoDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server running");
});

// Import Routes (future CRUD)
const todoRoutes = require("./routes/Todoroutes");
app.use("/todos", todoRoutes);

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
