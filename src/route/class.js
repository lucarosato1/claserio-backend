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

module.exports = router;