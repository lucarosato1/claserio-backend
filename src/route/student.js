const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

// Create student
router.post("/students", studentController.create_student);

// Get All students
router.get("/students",  studentController.get_all_students);

// Get student by ID ( PathVariable )
router.get("/students/:id", studentController.get_student_by_id);

// Get student by Email
router.get("/students/email/:email", studentController.get_student_by_email);

// Get student by phone
router.get("/students/phone/:phone", studentController.get_student_by_phone);

// Update student by ID ( PathVariable )
router.put("/students/:id", studentController.update_student_by_id);

// Update student password by id, email and password
router.put("/students/password/:id/:email/:password", studentController.update_student_password_by_id);

// Delete student by ID ( PathVariable )
router.delete("/students/:id", studentController.delete_student_by_id);

module.exports = router;