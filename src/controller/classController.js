const classSchema = require("../model/class");

const createClass = (req, res) => {
    const student = classSchema(req.body);
    student
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const getAllClasses = (req, res) => {
    classSchema
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const getClassById = (req, res) => {
    const {id} = req.params;
    classSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const updateClassById = (req, res) => {
    const { id } = req.params;
    const { name, description, duration, type, frequency, subject, price, state } = req.body;
    classSchema
        .updateOne(
            {_id: id},
            {$set: { name, description, duration, type, frequency, subject, price, state }}
        )
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const deleteClassById = (req, res) => {
    const {id} = req.params;
    classSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}
