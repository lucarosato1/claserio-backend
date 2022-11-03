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

// Get student by Email
router.get("/students/email/:email", (req, res) => {
    const {email} = req.params;
    studentSchema
        .find({email})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Get student by phone
router.get("/students/phone/:phone", (req, res) => {
    const {phone} = req.params;
    studentSchema
        .find({phone})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Update student by ID ( PathVariable )
router.put("/students/:id", (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, email, phone, education} = req.body;
    studentSchema
        .updateOne(
            {_id: id},
            {$set: {firstName, lastName, email, phone, education}}
        )
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Update student password by id, email and password
router.put("/students/password/:id/:email/:password", (req, res) => {
    const {id, email, password} = req.params;
    const {newPassword} = req.body;
    studentSchema
        .updateOne({_id: id, email , password}, {$set: {password: newPassword}})
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