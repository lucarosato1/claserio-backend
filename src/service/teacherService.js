// Getting the Newly created Mongoose Model we just created
const Teacher = require("../model/teacher");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to Create a Teacher
exports.createTeacher = async function (teacher) {
    // Creating a new Mongoose Object by using the new keyword
    const hashedPassword = bcrypt.hashSync(teacher.password, 8);

    let newTeacher = new Teacher({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        birthday: teacher.birthday,
        email: teacher.email,
        phone: teacher.phone,
        experience: teacher.experience,
        password: hashedPassword,
        title: teacher.title,
    })
    // Saving the Teacher
    let savedTeacher = await newTeacher.save();
    try {
        return jwt.sign({
            id: savedTeacher._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
    } catch (e) {
        // return an Error message describing the reason
        console.log(e)
        throw Error("Error while Creating Teacher")
    }
}

exports.getTeacherById = async function (id) {
    try {
        return await Teacher.findById(id);
    } catch (e) {
        throw Error("Error while getting teacher by id")
    }
}

exports.getTeacherByEmail = async function (email) {
    try {
        return await Teacher.find({email});
    } catch (e) {
        throw Error("Error while getting teacher by email")
    }
}

exports.getTeacherByPhone = async function (phone) {
    try {
        return await Teacher.find({phone});
    } catch (e) {
        throw Error("Error while getting teacher by phone")
    }
}

exports.updateTeacherPasswordById = async function (id, password, newPassword) {
    let oldTeacher = await Teacher.findOne({_id: id});

    if (!bcrypt.compareSync(password, oldTeacher.password)) {
        throw Error("Incorrect password");
    }

    return Teacher.findOneAndUpdate({_id: id},
        {
        $set: {
            password: bcrypt.hashSync(newPassword.newPassword, 8).toString()
        }
    });
}

exports.updateTeacherById = async function (id, teacher) {
    try{
        let oldTeacher = await Teacher.findById(id);

        if (!oldTeacher) {return false;}

        oldTeacher.firstName = teacher.firstName;
        oldTeacher.lastName = teacher.lastName;
        oldTeacher.phone = teacher.phone;
        oldTeacher.email = teacher.email;
        oldTeacher.experience = teacher.experience;

        return await oldTeacher.updateOne({_id: id}, {$set: {firstName: teacher.firstName, lastName: teacher.lastName, phone: teacher.phone, email: teacher.email, experience: teacher.experience}});

    } catch (e) {
        throw Error("Error while updating teacher by id")
    }
}

exports.deleteTeacherById = async function (id) {
    try{
        let oldTeacher = await Teacher.findById(id);

        if (!oldTeacher) {return false;}

        return await oldTeacher.remove({_id: id});

    } catch (e) {
        throw Error("Error while deleting teacher by id")
    }
}

exports.loginTeacher = async function (email, password) {
    try {
        let teacher = await Teacher.findOne({email});
        if (!teacher) {
            console.log("Teacher not found");
            return false;
        }
        if (!bcrypt.compareSync(password, teacher.password)) {
            console.log("Password not match");
            return false;
        }
        return jwt.sign({ id: teacher._id }, process.env.SECRET, { expiresIn: 86400 });
    } catch (e) {
        throw Error("Error while getting teacher by email")
    }
}