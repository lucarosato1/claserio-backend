const express = require("express");
const router = express.Router();

// Import teacher
const teacherSchema = require("../model/teacher");

// Create teacher
router.post("/teachers", (req, res) => {
    const teacher = teacherSchema(req.body);
    teacher
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Get All teachers
router.get("/teachers", (req, res) => {
    teacherSchema
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Get teacher by ID ( PathVariable )
router.get("/teachers/:id", (req, res) => {
    const {id} = req.params;
    teacherSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Get teacher by Email
router.get("/teachers/email/:email", (req, res) => {
    const {email} = req.params;
    teacherSchema
        .find({email})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Get teacher by phone
router.get("/teachers/phone/:phone", (req, res) => {
    const {phone} = req.params;
    teacherSchema
        .find({phone})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Update teacher by ID ( PathVariable )
router.put("/teachers/:id", (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, email, phone, education} = req.body;
    teacherSchema
        .updateOne(
            {_id: id},
            {$set: {firstName, lastName, email, phone, education}}
        )
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// Update teacher password by id, email and password
router.put("/teachers/password/:id/:email/:password", (req, res) => {
    const {id, email, password} = req.params;
    const {newPassword} = req.body;
    teacherSchema
        .updateOne({_id: id, email , password}, {$set: {password: newPassword}})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));

});

// Delete teacher by ID ( PathVariable )
router.delete("/teachers/:id", (req, res) => {
    const {id} = req.params;
    teacherSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});
module.exports = router;