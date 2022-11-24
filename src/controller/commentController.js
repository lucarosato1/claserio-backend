const commentSchema = require("../model/comment");
const commentService = require("../service/commentService");

const createComment = async function (req, res){
    console.log("Creating comment...")
    
    const comment = req.body;
    try{
        const createdComment = await commentService.createComment(comment);
        return res.status(201).json({status: 201, data: createdComment, message: "Successfully created comment"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getCommentById = (req, res) => {
    try {
        let comment = StudentService.getCommentById(req.params.id);
        return res.status(200).json({status: 200, data: comment, message: "Successfully got comment by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getCommentsByClass = (req, res) => {
    try {
        let comments = StudentService.getCommentsByClass(req.params.classId);
        commentSchema.find(req.params.classId);
        return res.status(200).json({status: 200, data: comments, message: "Successfully got comment by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}