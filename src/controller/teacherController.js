const teacherSchema = require("../model/teacher");

const createTeacher = (req, res) => {
    const teacherSchema = classSchema(req.body);
    teacherSchema
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const getTeacherById = (req, res) => {
    const {id} = req.params;
    teacherSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const getTeachersBySubject = (req, res) => {
    const {subject} = req.params;
    teacherSchema
        .find(subject)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const updateTeacherById = (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, email, phone, education} = req.body;
    teacherSchema
        .updateOne(
            {_id: id},
            {$set: {firstName, lastName, email, phone, education}}
        )
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const updateTeacherPasswordById = (req, res) => {
    const {id, email, password} = req.params;
    const {newPassword} = req.body;
    teacherSchema
        .updateOne({_id: id, email , password}, {$set: {password: newPassword}})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}