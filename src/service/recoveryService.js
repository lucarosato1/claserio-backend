const Recovery = require('../model/recovery');
const Teacher = require("../model/teacher");
const Student = require("../model/student");
const TeacherService = require('../service/teacherService');
const StudentService = require('../service/studentService');
const {sendMail} = require("./mailService");
const bcrypt = require('bcryptjs');

exports.sendRecoveryEmail = async function (email) {
    let student = await StudentService.getStudentByEmail(email);
    let teacher = await TeacherService.getTeacherByEmail(email);

    if (!student && !teacher) {
        throw Error("Email not found");
    }

    const recovery = new Recovery({
        email: email,
        code: Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
        date: new Date()
    });

    if (await Recovery.findOne({email: email})) {
        await Recovery.updateOne({email: email}, {code: recovery.code, date: recovery.date});
    }else{
        await recovery.save();
    }

    return await sendMail(
        "Claserio - Password recovery",
        `Your recovery code is: ${recovery.code}`,
        email
    );
}

// TODO: is not persisting the update wtf
exports.validateRecoveryCode = async function (email, code, newPassword) {
    let recovery = await Recovery.findOne({email: email, code: code});

    const student = await Student.findOne({email : email});
    const teacher = await Teacher.findOne({email : email});

    if (!recovery) {
        throw Error("Invalid code");
    }
    else if ((recovery.date.getTime() + 600000) < new Date().getTime()) {
        throw Error("Code expired")
    }

    if(!student && !teacher){
        throw Error("Email not found");
    }

    if (!student) {
        console.log("teacher");
        console.log(JSON.stringify(teacher));
        console.log("newPassword: " + newPassword);
        return teacher.updateOne(
            {email: email},
            {
                $set:
                    {password: bcrypt.hashSync(newPassword, 8)}}
        );
    }else {
        return student.updateOne(
            {email: email},
            {$set:
                    {password: bcrypt.hashSync(newPassword, 8)}}
        );
    }
}