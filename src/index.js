// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const cookieParser = require("cookie-parser");
require("dotenv").config();
const port = process.env.PORT || 8000;

const app = express();
app.use(cors());

// Endpoints
const studentRoutes = require('./route/student');

// Middleware
app.use(express.json());
app.use("/api/v1", studentRoutes);

// routes
app.get("/test", (req, res) => {
    res.send("Hello World!");
});

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {console.log("Connected to MongoDB");})
    .catch((err) => {console.log(err);});

app.listen(port, () => {
  console.log("Listening on port", port);
});