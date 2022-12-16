const express = require("express");
const router = express.Router();
const teacherController = require("../controller/teacherController");

// Create teacher
router.post("/teachers", teacherController.createTeacher);

// Get teacher by ID ( PathVariable )
router.get("/teachers/:id", teacherController.getTeacherById);

// Update teacher by ID
router.put("/teachers", teacherController.updateTeacherById);

// Update teacher password by id, email and password
router.put("/teachers/password/:id/:email/:password", teacherController.updateTeacherPasswordById);

// Delete teacher by ID ( PathVariable )
router.delete("/teachers/:id", teacherController.deleteTeacherById);

// Login teacher
router.get("/teachers/login/:email/:password", teacherController.loginTeacher);

module.exports = router;