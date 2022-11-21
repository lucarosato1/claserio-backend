const express = require ("express");
const commentSchema = require("../model/comment");

const router = express.Router();

//create comment
router.post('/comments', (req, res) =>{
    const commentToSave = commentSchema(req.body);
    commentToSave.save()
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

//get all comments by classId
router.get('/comments/classId/:classId', (req, res) =>{
    const {classId} = req.params;
    commentSchema.find({classId: classId})
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

//get all comments by classOwnerId
router.get('/comments/classOwnerId/:classOwnerId', (req, res) => {
    const { classOwnerId } = req.params;
    commentSchema.find({classOwnerId: classOwnerId})
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

module.exports = router;