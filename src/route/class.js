const express = require ("express");
const classSchema = require("../model/class");
const classController = require("../controller/classController");

const router = express.Router();

//create class
router.post('/class', classController.createClass);

//get all classes
router.get('/class', classController.getAllClasses);
//get class by id
router.get('/class/:id', classController.deleteClassById);
//update class by id
router.put('/class/:id', classController.updateClassById);

module.exports = router;