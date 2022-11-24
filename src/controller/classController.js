const classSchema = require("../model/class");
const classService = require("../service/classService");

exports.createClass = async function (req, res){
    console.log("Creating class...")

    const newClass = classSchema(req.body);
    try{
        const createdClass = await classService.createClass(newClass);
        return res.status(201).json({status: 201, data: createdClass, message: "Successfully created class"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }

}

exports.getAllClasses = async function (req, res){
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassById = (req, res) => {
    const {id} = req.params;
    classSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

exports.updateClassById = (req, res) => {
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

exports.deleteClassById = (req, res) => {
    const {id} = req.params;
    classSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}
