const express = require("express");
const router = express.Router();

// Import student
const studentSchema = require("../model/student");

// Create student
router.post("/students", (req, res) => {
    const student = studentSchema(req.body);
    student
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Get All students
router.get("/students", (req, res) => {
    studentSchema
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Get student by ID ( PathVariable )
router.get("/students/:id", (req, res) => {
    const {id} = req.params;
    studentSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Update student by ID ( PathVariable )
router.put("/students/:id", (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, age, email} = req.body;
    studentSchema
        .updateOne(
            {_id: id},
            {$set: {firstName, lastName, age, email}}
        )
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Delete student by ID ( PathVariable )
router.delete("/students/:id", (req, res) => {
    const {id} = req.params;
    studentSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});
module.exports = router;