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
const teacherRoutes = require('./route/teacher');
const classRoutes = require('./route/class');
const reserveRoutes = require('./route/reserve');
const commentRoutes = require('./route/comment');
const mailRoutes = require('./route/mailer');
const passwordRecoveyRoutes = require('./route/passwordRecovery');

// Middleware
app.use(express.json());
app.use("/api/v1", studentRoutes);
app.use("/api/v1", teacherRoutes);
app.use("/api/v1", classRoutes);
app.use("/api/v1", reserveRoutes);
app.use("/api/v1", commentRoutes);
app.use("/api/v1", mailRoutes);
app.use("/api/v1", passwordRecoveyRoutes);

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