const express = require("express");
const router = express.Router();
const teacherController = require("../controller/teacherController");

// Import teacher
const teacherSchema = require("../model/teacher");

// Create teacher
router.post("/teachers", teacherController.createTeacher);

// Get teacher by ID ( PathVariable )
router.get("/teachers/:id", teacherController.getTeacherById);

// Update teacher by ID ( PathVariable )
router.put("/teachers/:id", teacherController.updateTeacherById);

// Update teacher password by id, email and password
router.put("/teachers/password/:id/:email/:password", teacherController.updateTeacherPasswordById);

// Delete teacher by ID ( PathVariable )
router.delete("/teachers/:id", teacherController.deleteTeacherById);
module.exports = router;