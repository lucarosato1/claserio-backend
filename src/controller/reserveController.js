const reserveService = require('../service/reserveService');
const jwt = require('jsonwebtoken');

exports.createReserve = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;

    console.log("Creating reserve...")
    const reserve = req.body;
    try{
        const createdReserve = await reserveService.createReserve(reserve, tokenSubject);
        return res.status(201).json({status: 201, data: createdReserve, message: "Successfully created reserve"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getReservesByTeacherId = async function (req, res){
    const {teacherId} = req.params.teacherId;
    console.log(teacherId);
    try{
        const reserves = await reserveService.getReservesByTeacherId(teacherId);
        return res.status(200).json({status: 200, data: reserves, message: "Successfully reserves retrieved"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }    
}

exports.getReservesByStudentId = async function (req, res){
    const {studentId} = req.params.studentId;
    console.log(studentId);
    try{
        const reserves = await reserveService.getReservesByStudentId(studentId);
        return res.status(200).json({status: 200, data: reserves, message: "Successfully reserves retrieved"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }    
}

exports.updateReserve = async function (req, res){
    const id = req.params.id;
    const reserve = req.body;
    try{
        const updatedReserve = await reserveService.updateReserve(id, reserve);
        return res.status(200).json({status: 200, data: updatedReserve, message: "Successfully reserve updated"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }    
}