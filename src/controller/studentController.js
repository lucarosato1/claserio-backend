const studentSchema = require("../model/student");

const createStudent = (req, res) => {
    const student = studentSchema(req.body);
    student
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const getAllStudents = (req, res) => {
    studentSchema
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const getStudentById = (req, res) => {
    const {id} = req.params;
    studentSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const getStudentByEmail = (req, res) => {
    const {email} = req.params;
    studentSchema
        .find({email})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const getStudentByPhone = (req, res) => {
    const {phone} = req.params;
    studentSchema
        .find({phone})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const updateStudentById = (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, email, phone, education} = req.body;
    studentSchema
        .updateOne(
            {_id: id},
            {$set: {firstName, lastName, email, phone, education}}
        )
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const updateStudentPasswordById = (req, res) => {
    const {id, email, password} = req.params;
    const {newPassword} = req.body;
    studentSchema
        .updateOne({_id: id, email , password}, {$set: {password: newPassword}})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const deleteStudentById = (req, res) => {
    const {id} = req.params;
    studentSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    getStudentByEmail,
    getStudentByPhone,
    updateStudentById,
    updateStudentPasswordById,
    deleteStudentById
}