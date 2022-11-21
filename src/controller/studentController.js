const studentSchema = require("../model/student");

const create_student = (req, res) => {
    const student = studentSchema(req.body);
    student
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const get_all_students = (req, res) => {
    studentSchema
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const get_student_by_id = (req, res) => {
    const {id} = req.params;
    studentSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const get_student_by_email = (req, res) => {
    const {email} = req.params;
    studentSchema
        .find({email})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const get_student_by_phone = (req, res) => {
    const {phone} = req.params;
    studentSchema
        .find({phone})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const update_student_by_id = (req, res) => {
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

const update_student_password_by_id = (req, res) => {
    const {id, email, password} = req.params;
    const {newPassword} = req.body;
    studentSchema
        .updateOne({_id: id, email , password}, {$set: {password: newPassword}})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const delete_student_by_id = (req, res) => {
    const {id} = req.params;
    studentSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

module.exports = {
    create_student,
    get_all_students,
    get_student_by_id,
    get_student_by_email,
    get_student_by_phone,
    update_student_by_id,
    update_student_password_by_id,
    delete_student_by_id
}