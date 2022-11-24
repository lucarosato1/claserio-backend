const teacherSchema = require("../model/teacher");
const teacherService = require("../service/teacherService");

const createTeacher = async function (req, res){
    console.log("Creating teacher...")
    const Teacher = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        education: req.body.education,
        password: req.body.password
    }

    try{
        const createdTeacher = await teacherService.createTeacher(Teacher);
        return res.status(201).json({status: 201, data: createdTeacher, message: "Successfully created teacher"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getTeacherById = (req, res) => {
    try {
        let teacher = teacherService.getTeacherById(req.params.id);
        return res.status(200).json({status: 200, data: teacher, message: "Successfully got teacher by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getTeacherByEmail = (req, res) => {
    try{
        let teacher = teacherService.getTeacherByEmail(req.params.email);
        return res.status(200).json({status: 200, data: teacher, message: "Successfully got teacher by email"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const getTeacherByPhone = (req, res) => {
    try{
        let teacher = teacherService.getTeacherByPhone(req.params.phone);
        return res.status(200).json({status: 200, data: teacher, message: "Successfully got teacher by phone"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const updateTeacherPasswordById = (req, res) => {
    try {
        let teacher = teacherService.updateTeacherPasswordById(req.params.id, req.params.password, req.body);
        return res.status(200).json({status: 200, data: teacher, message: "Successfully updated teacher password by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}
const updateTeacherById = (req, res) => {
    try {
        let teacher = teacherService.updateTeacherById(req.params.id, req.body);
        return res.status(200).json({status: 200, data: teacher, message: "Successfully updated teacher by id"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

const deleteTeacherById = (req, res) => {
    const {id} = req.params;
    teacherSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}

module.exports = {
    createTeacher,
    getTeacherById,
    getTeacherByEmail,
    getTeacherByPhone,
    updateTeacherById,
    updateTeacherPasswordById,
    deleteTeacherById
}