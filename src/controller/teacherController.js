const teacherSchema = require("../model/teacher");
const teacherService = require("../service/teacherService");
const jwt = require("jsonwebtoken");

const createTeacher = async function (req, res){
    console.log("Creating teacher...")
    const Teacher = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        experience: req.body.experience,
        password: req.body.password,
        title: req.body.title
    }

    try{
        const createdTeacher = await teacherService.createTeacher(Teacher);
        return res.status(201).json({status: 201, data: createdTeacher, message: "Successfully created teacher"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getTeacherById = async function (req, res){
    try {
        let teacher = await teacherService.getTeacherById(req.params.id);
        if (!teacher) { return res.status(404).json({status: 404, message: "Teacher not found"}); }
        return res.status(200).json({status: 200, data: teacher, message: "Successfully got teacher by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getTeacherByEmail = async function (req, res){
    try{
        let teacher = await teacherService.getTeacherByEmail(req.params.email);
        return res.status(200).json({status: 200, data: teacher, message: "Successfully got teacher by email"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getTeacherByPhone = async function (req, res){
    try{
        let teacher = await teacherService.getTeacherByPhone(req.params.phone);
        return res.status(200).json({status: 200, data: teacher, message: "Successfully got teacher by phone"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const updateTeacherPasswordById = async function (req, res){
    let token = req.headers.authorization;
    let subject = jwt.decode(token, {complete: true}).payload.id;
    try {
        let teacher = await teacherService.updateTeacherPasswordById(subject, req.params.password, req.body);
        return res.status(200).json({status: 200, data: teacher, message: "Successfully updated teacher password by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const updateTeacherById = async function (req, res){
    try {
        let teacher = await teacherService.updateTeacherById(req.params.id, req.body);
        return res.status(200).json({status: 200, data: teacher, message: "Successfully updated teacher by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const deleteTeacherById = async function (req, res){
    const {id} = req.params;
    await teacherSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

const loginTeacher = async function (req, res){
    console.log("Logging in teacher...")
    const {email, password} = req.params;
    try{
        const token = await teacherService.loginTeacher(email, password);
        if (!token) {
            return res.status(401).json({status: 401, message: "Invalid credentials"});
        }
        return res.status(200).json({status: 200, data: token, message: "Successfully logged in teacher"});
    } 
    catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

module.exports = {
    createTeacher,
    getTeacherById,
    getTeacherByEmail,
    getTeacherByPhone,
    updateTeacherById,
    updateTeacherPasswordById,
    deleteTeacherById,
    loginTeacher
}