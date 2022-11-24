const classSchema = require("../model/class");
const classService = require("../service/classService");

const createClass = async function (req, res){
    console.log("Creating class...")
    const Class = {
        
    }
    const classSchema = classSchema(req.body);
    try{
        const createdStudent = await StudentService.createStudent(Student);
        return res.status(201).json({status: 201, data: createdStudent, message: "Successfully created student"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }

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

module.exports = {
    createClass,
    getAllClasses,
    getClassById,
    updateClassById,
    deleteClassById
}
