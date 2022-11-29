const classSchema = require("../model/class");
const classService = require("../service/classService");
const jwt = require('jsonwebtoken');

exports.createClass = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;
    
    console.log("Creating class...")

    const newClass = classSchema(req.body);
    try{
        const createdClass = await classService.createClass(newClass, tokenSubject);
        if (createdClass==null){ return res.status(401).json({status: 401, message: "Unauthorized"})}
        return res.status(201).json({status: 201, data: createdClass, message: "Successfully created class"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }

}

exports.getAllClasses = async function (req, res){
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    try {
        const classes = await classService.getAllClasses({}, page, limit);
        return res.status(200).json({status: 200, data: classes, message: "Succesfully Classes Returned"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassById = async function (req, res){
    const {id} = req.params;
    await classSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

exports.updateClassById = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;
    
    const { id } = req.params;
    const { name, description, duration, type, image, frequency, subject, price, state } = req.body;
    const updateClass = { name, description, duration, type, image, frequency, subject, price, state, tokenSubject };
    try{
        const updatedClass = await classService.updateClassById(id, updateClass, tokenSubject);
        if (updatedClass==null){ return res.status(401).json({status: 401, message: "Unauthorized"})}
        return res.status(200).json({status: 200, data: updatedClass, message: "Successfully updated class"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }

}

exports.deleteClassById = async function (req, res){
    const {id} = req.params;
    await classSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}
