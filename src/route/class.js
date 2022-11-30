const express = require ("express");
const classController = require("../controller/classController");

const router = express.Router();

//create class
router.post('/class', classController.createClass);
//get class by id
router.get('/class/:id', classController.getClassById);
//update class by id
router.put('/class/:id', classController.updateClassById);
//delete class by id
router.delete('/class/:id', classController.deleteClassById);
//get all published classes
router.get('/class/state/published', classController.getAllPublishedClasses);
// get all classes by reserve
router.get('/class/student/reserve', classController.getClassesByStudentReserve);
// get all classes by reserve approved
router.get('/class/student/reserve/approved', classController.getClassesByStudentReserveApproved);
// get all published classes by teacher
router.get('/class/teacher/state/published', classController.getAllPublishedClassesByTeacher);
// get all unpublished classes by teacher
router.get('/class/teacher/state/unpublished', classController.getAllUnpublishedClassesByTeacher);

module.exports = router;