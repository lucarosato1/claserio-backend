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
    try{
    const classes = await classService.getClassById(id);
    if (!classes) { return res.status(404).json({status: 404, message: "Class by id not found"})}
        return res.status(200).json({status: 200, data: classes, message: "Succesfully Classes Returned"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }

}

exports.getClassesByStudentReserve = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;

    try{
        const classes = await classService.getClassesByStudentReserve(tokenSubject);
        return res.status(200).json({status: 200, data: classes, message: "Successfully getted classes by student reserve"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassesByStudentReserveApproved = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;

    try{
        const classes = await classService.getClassesByStudentReserveApproved(tokenSubject);
        return res.status(200).json({status: 200, data: classes, message: "Successfully getted classes by student reserve approved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
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

exports.getAllPublishedClasses = async function (req, res){
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    try {
        const classes = await classService.getAllPublishedClasses({}, page, limit);
        return res.status(200).json({status: 200, data: classes, message: "Succesfully Classes Returned"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getAllPublishedClassesByTeacher = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;
    try {
        const classes = await classService.getAllPublishedClassesByTeacher(tokenSubject);
        return res.status(200).json({status: 200, data: classes, message: "Succesfully Classes Returned"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getAllUnpublishedClassesByTeacher = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;
    try {
        const classes = await classService.getAllUnpublishedClassesByTeacher(tokenSubject);
        return res.status(200).json({status: 200, data: classes, message: "Succesfully Classes Returned"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}
