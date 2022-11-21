const express = require ("express");
const reserveSchema = require("../model/reserve");

const router = express.Router();

//create reserve
router.post('/reserves', (req, res) =>{
    const reserveToSave = reserveSchema(req.body);
    reserveToSave.save()
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

//get all reserves by teacherId
router.get('/reserves/teacherId/:teacherId', (req, res) =>{
    const {teacherId} = req.params;
    reserveSchema.find({ teacherId: teacherId })
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

//get all reserves by classId
router.get('/reserves/classId/:classId', (req, res) =>{
    const {classId} = req.params;
    reserveSchema.find({classId: classId})
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

//get all reserves by studentId
router.get('/reserves/studentId/:studentId', (req, res) => {
    const { studentId } = req.params;
    reserveSchema.find({ studentId: studentId })
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

//accept reserve
router.put('/reserves/accept/:id', (req, res) => {
    const { id } = req.params;
    reserveSchema.updateOne({ _id: id }, { $set: { state: "accepted" } })
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

//reject reserve
router.put('/reserves/cancel/:id', (req, res) => {
    const { id } = req.params;
    reserveSchema.updateOne({ _id: id }, { $set: { status: "canceled" } })
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

//finished reserve
router.put('/reserves/finish/:id', (req, res) => {
    const { id } = req.params;
    reserveSchema.updateOne({ _id: id }, { $set: { status: "finished" } })
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

module.exports = router;