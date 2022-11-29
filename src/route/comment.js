const express = require ("express");
const commentController = require("../controller/commentController");

const router = express.Router();

//create comment
router.post('/comment', commentController.createComment);

//get one comment by id
router.get('/comment/:id', commentController.getCommentById);

//get approved comments by classId
router.get('/comment/approved/classId/:classId', commentController.getApprovedCommentsByClassId);

//get pending comments by teacherId
router.get('/comment/pending/teacherId/:teacherId', commentController.getPendingCommentsByTeacherId);

//get pending comments by classId
router.get('/comment/pending/classId/:classId', commentController.getPendingCommentsByClassId);

//update comment by id
router.put('/comment/:id', commentController.updateCommentById);

module.exports = router;