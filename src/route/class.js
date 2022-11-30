const express = require ("express");
const classController = require("../controller/classController");

const router = express.Router();

//create class
router.post('/class', classController.createClass);
//get all classes
router.get('/class', classController.getAllClasses);
//get class by id
router.get('/class/:id', classController.getClassById);
//update class by id
router.put('/class/:id', classController.updateClassById);
//delete class by id
router.delete('/class/:id', classController.deleteClassById);
// get all classes by reserve
router.get('/class/student/reserve', classController.getClassesByStudentReserve);
// get all classes by reserve approved
router.get('/class/student/reserve/approved', classController.getClassesByStudentReserveApproved);

module.exports = router;