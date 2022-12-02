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

exports.getPendingReservesByTeacher = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;

    try{
        const reserves = await reserveService.getPendingReservesByTeacher(tokenSubject);
        return res.status(200).json({status: 200, data: reserves, message: "Successfully reserves retrieved"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getAcceptedReservesByTeacher = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;
    try{
        const reserves = await reserveService.getAcceptedReservesByTeacher(tokenSubject);
        return res.status(200).json({status: 200, data: reserves, message: "Successfully reserves retrieved"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getReservesByStudentId = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;

    try{
        const reserves = await reserveService.getReservesByStudentId(tokenSubject);
        if (!reserves){
            console.log("Reserves not found");
            return res.status(404).json({status: 404, message: "Reserves not found"});
        }
        console.log("Reserves obtained successfully");
        return res.status(200).json({status: 200, data: reserves, message: "Successfully reserves retrieved"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }    
}

exports.getReservesApprovedByStudentId = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;

    try{
        const reserves = await reserveService.getReservesApprovedByStudentId(tokenSubject);
        if (!reserves){
            console.log("Reserves not found");
            return res.status(404).json({status: 404, message: "Reserves not found"});
        }
        console.log("Reserves obtained successfully");
        return res.status(200).json({status: 200, data: reserves, message: "Successfully reserves retrieved"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getAllReservesByStudentId = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;

    try{
        const reserves = await reserveService.getAllReservesByStudentId(tokenSubject);
        if (!reserves){
            console.log("Reserves not found");
            return res.status(404).json({status: 404, message: "Reserves not found"});
        }
        console.log("Reserves obtained successfully");
        return res.status(200).json({status: 200, data: reserves, message: "Successfully reserves retrieved"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getReservesWhereNotStudentId = async function (req, res){
    let token = req.headers.authorization;
    // get subject from token
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;

    try{
        const reserves = await reserveService.getReservesWhereNotStudentId(tokenSubject);
        if (!reserves){
            console.log("Reserves not found");
            return res.status(404).json({status: 404, message: "Reserves not found"});
        }
        console.log("Reserves obtained successfully");
        return res.status(200).json({status: 200, data: reserves, message: "Successfully reserves retrieved"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateReserve = async function (req, res){
    const id = req.params.id;
    const reserve = req.body;
    let token = req.headers.authorization;
    let tokenSubject = jwt.decode(token, {complete: true}).payload.id;
    try{
        const updatedReserve = await reserveService.updateReserve(id, reserve, tokenSubject);
        return res.status(200).json({status: 200, data: updatedReserve, message: "Successfully reserve updated"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }    
}