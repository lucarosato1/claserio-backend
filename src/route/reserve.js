const express = require ("express");
const reserveController = require("../controller/reserveController");

const router = express.Router();

//create reserve
router.post('/reserve', reserveController.createReserve);

//get all reserves by teacherId
router.get('/reserve/teacherId/:teacherId', reserveController.getReservesByTeacherId);

//get all pending reserves by teacher
router.get('/reserve/teacher/pending', reserveController.getPendingReservesByTeacher);

//get all accepted reserves by teacher
router.get('/reserve/teacher/accepted', reserveController.getAcceptedReservesByTeacher);

//get all reserves by studentId
router.get('/reserve/studentId/', reserveController.getReservesByStudentId);

//get all reserves approved by studentId
router.get('/reserve/studentId/approved', reserveController.getReservesApprovedByStudentId);

//change status reserve
router.put('/reserve/:id', reserveController.updateReserve);

module.exports = router;