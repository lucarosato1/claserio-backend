// Getting the Newly created Mongoose Model we just created
const Class = require("../model/class");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to Create a Class
exports.createClass = async function (newClass) {
    // Creating a new Mongoose Object by using the new keyword
    let newClass = new Class({
        name: newClass.name,
        description: newClass.description,
        duration: newClass.duration,
        type: newClass.type,
        frequency: newClass.frequency,
        subject: newClass.subject,
        price: newClass.price,
        teacher: newClass.teacher,

    })

    try {
        // Saving the Student
        let savedClass = await savedClass.save();
        return jwt.sign({
            id: savedClass._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
    } catch (e) {
        // return an Error message describing the reason
        console.log(e)
        throw Error("Error while Creating Student")
    }
}

exports.getClassById = async function (id) {
    try {
        return await Class.findById(id);
    } catch (e) {
        throw Error("Error while getting student by id")
    }
}

exports.updateClassById = async function (id, newClass) {
    try{
        let oldClass = await Student.findById(id);

        if (!oldClass) {return false;}

        oldClass.name = newClass.name,
        oldClass.description = newClass.description,
        oldClass.duration = newClass.duration,
        oldClass.type = newClass.type,
        oldClass.frequency = newClass.frequency,
        oldClass.subject = newClass.subject,
        oldClass.price = newClass.price,
        oldClass.teacher = newClass.teacher

        return await oldClass.updateOne({_id: id}, {$set: {name: newClass.name, }});

    } catch (e) {
        throw Error("Error while updating student by id")
    }
}

exports.deleteStudentById = async function (id) {
    try{
        let oldStudent = await Student.findById(id);

        if (!oldStudent) {return false;}

        return await oldStudent.remove({_id: id});

    } catch (e) {
        throw Error("Error while deleting student by id")
    }
}