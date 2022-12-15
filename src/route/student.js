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
router.put("/students", studentController.updateStudentById);

// Update student password by id, email and password
router.put("/students/password/:password", studentController.updateStudentPasswordById);

// Delete student by ID ( PathVariable )
router.delete("/students/:id", studentController.deleteStudentById);

// Login student
router.get("/students/login/:email/:password", studentController.loginStudent);

module.exports = router;