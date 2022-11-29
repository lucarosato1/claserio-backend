const commentService = require("../service/commentService");

exports.createComment = async function (req, res){
    console.log("Creating comment...")
    
    const comment = req.body;
    
    try{
        const createdComment = await commentService.createComment(comment);
        return res.status(201).json({status: 201, data: createdComment, message: "Successfully created comment"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getCommentById = async function (req, res){
    try {
        let comment = await commentService.getCommentById(req.params.id);
        return res.status(200).json({status: 200, data: comment, message: "Successfully got comment by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getApprovedCommentsByClassId = async function (req, res){
    // Check the existence of the query parameters, If doesn't exists assign a default value
    const classId = req.params.classId;
    try{
        let comments = await commentService.getApprovedCommentsByClassId(classId);
        return res.status(200).json({status: 200, data: comments, message: "Successfully got comments by class id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getPendingCommentsByTeacherId = async function (req, res){
    // Check the existence of the query parameters, If doesn't exists assign a default value
    const teacherId = req.params.teacherId;
    try{
        let comments = await commentService.getPendingCommentsByTeacherId(teacherId);
        return res.status(200).json({status: 200, data: comments, message: "Successfully got pending comments by teacher id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getPendingCommentsByClassId = async function (req, res){
    // Check the existence of the query parameters, If doesn't exists assign a default value
    const classId = req.params.classId;
    console.log(classId);
    try{
        let comments = await commentService.getPendingCommentsByClassId(classId);
        return res.status(200).json({status: 200, data: comments, message: "Successfully got pending comments by class id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateCommentById = async function (req, res){
    const id = req.params.id;
    const comment = req.body;
    console.log(comment);
    try{
        const updatedComment = await commentService.updateCommentById(id, comment);
        return res.status(200).json({status: 200, data: updatedComment, message: "Successfully comment updated"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }    
}