const commentSchema = require("../model/comment");
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
        let comment = await StudentService.getCommentById(req.params.classId);
        return res.status(200).json({status: 200, data: comment, message: "Successfully got comment by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getCommentsByClassId = async function (req, res){
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;    
    try{
        let comments = await StudentService.getCommentsByClassId(req.params.classId);
        return res.status(200).json({status: 200, data: comment, message: "Successfully got comments by class id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getCommentsByClass = async function (req, res){
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Comments = await commentService.getCommentsByClass({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Comments, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}