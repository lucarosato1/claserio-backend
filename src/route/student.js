const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

// Create student
router.post("/students", studentController.createStudent);

// Get student by ID ( PathVariable )
router.get("/students/:id", studentController.getStudentById);

// Get student by Email
router.get("/students/email/:email", studentController.getStudentByEmail);

// Get student by phone
router.get("/students/phone/:phone", studentController.getStudentByPhone);

// Update student by ID ( PathVariable )
router.put("/students/:id", studentController.updateStudentById);

// Update student password by id, email and password
router.put("/students/password/:id/:password", studentController.updateStudentPasswordById);

// Delete student by ID ( PathVariable )
router.delete("/students/:id", studentController.deleteStudentById);

module.exports = router;