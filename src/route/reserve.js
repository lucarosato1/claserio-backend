const express = require ("express");
const reserveController = require("../controller/reserveController");

const router = express.Router();

//create reserve
router.post('/reserve', reserveController.createReserve);

//get all reserves by teacherId
router.get('/reserve/teacherId/:teacherId', reserveController.getReservesByTeacherId);

//get all reserves by classId
//router.get('/reserves/classId/:classId', reserveController.getReservesByClassId);

//get all reserves by studentId
router.get('/reserve/studentId/:studentId', reserveController.getReservesByStudentId);

//change status reserve
router.put('/reserve/:id', reserveController.updateReserve);

module.exports = router;