const express = require ("express");
const commentSchema = require("../model/comment");
const commentController = require("../controller/commentController");
const { route } = require("./class");

const router = express.Router();

//create comment
router.post('/comments', commentController.createComment);

//get one comment by id
router.get('/comments/:id', commentController.getCommentById);

//get all comments by classId
router.get('/comments/:classId', commentController.getCommentsByClass);

//get all comments by classOwnerId
router.get('/comments/classOwnerId/:classOwnerId', commentController.getCommentsByOwner);

module.exports = router;