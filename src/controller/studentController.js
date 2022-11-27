const studentSchema = require("../model/student");
const StudentService = require("../service/studentService");
const jwt = require("jsonwebtoken");

const createStudent = async function (req, res){
    console.log("Creating student...")
    const Student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        education: req.body.education,
        password: req.body.password
    }

    try{
        const createdStudent = await StudentService.createStudent(Student);
        return res.status(201).json({status: 201, data: createdStudent, message: "Successfully created student"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getStudentById = (req, res) => {
    try {
        let student = StudentService.getStudentById(req.params.id);
        return res.status(200).json({status: 200, data: student, message: "Successfully got student by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getStudentByEmail = (req, res) => {
    try{
        let student = StudentService.getStudentByEmail(req.params.email);
        return res.status(200).json({status: 200, data: student, message: "Successfully got student by email"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getStudentByPhone = (req, res) => {
    try{
        let student = StudentService.getStudentByPhone(req.params.phone);
        return res.status(200).json({status: 200, data: student, message: "Successfully got student by phone"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}


const updateStudentPasswordByEmail = (req, res) => {
    
    let token = req.headers.authorization;
    console.log("Token: " + token);
    // get subject from token
    let subject = jwt.decode(token, {complete: true}).payload.id;
    console.log("UserId: " + subject);

    try {
        let student = StudentService.updateStudentPasswordById(req.params.id, req.params.password, req.body);
        return res.status(200).json({status: 200, data: student, message: "Successfully updated student password by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const updateStudentById = (req, res) => {

    let studentId = getStudentId(req, res);

    const newStudent = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        education: req.body.education}

    try {
        let student = StudentService.updateStudentById(subject, newStudent);
        return res.status(200).json({status: 200, data: student, message: "Successfully updated student by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const deleteStudentById = (req, res) => {
    const {id} = req.params;
    studentSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const getStudentId = (req, res) => {
    let token = req.headers.authorization;
    console.log("Token: " + token);
    // get subject from token
    let subject = jwt.decode(token, {complete: true}).payload.id;
    console.log("UserId: " + subject);

    return subject;
}

module.exports = {
    createStudent,
    getStudentById,
    getStudentByEmail,
    getStudentByPhone,
    updateStudentById,
    updateStudentPasswordById,
    deleteStudentById
}