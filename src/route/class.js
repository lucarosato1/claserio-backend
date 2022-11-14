const express = require ("express");
const classSchema = require("../model/class");

const router = express.Router();

//create class
router.post('/class', (req, res) =>{
    const classToSave = classSchema(req.body);
    classToSave.save()
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});
//get all classes
router.get('/class', (req, res) => {
    classSchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});
//get class by id
router.get('/class/:id', (req, res) => {
    const { id } = req.params;
    classSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});
//update class by id
router.put('/class/:id', (req, res) => {
    const { id } = req.params;
    const { className, classDescription, classDuration, classType, classFrequency, classSubject, classPrice, classState } = req.body;
    classSchema
        .updateOne({ _id: id }, { $set:{className, classDescription, classDuration, classType, classFrequency, classSubject, classPrice, classState} })
        .then((data) => res.json(data))
        .catch((error)=>res.json({ message: error }));
});

module.exports = router;