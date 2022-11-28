const express = require ("express");
const commentController = require("../controller/commentController");

const router = express.Router();

//create comment
router.post('/comment', commentController.createComment);

//get one comment by id
router.get('/comment/:id', commentController.getCommentById);

//get all comments by classId
router.get('/comment/:classId', commentController.getCommentsByClassId);

//get all comments by classOwnerId
//router.get('/comment/classOwnerId/:classOwnerId', commentController.getCommentsByClassOwnerId);

module.exports = router;