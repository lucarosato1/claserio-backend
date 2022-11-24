// Getting the Newly created Mongoose Model we just created
const Class = require("../model/class");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createClass = async function (Class) {
    let newClass = new ClassToSave({
        name: ClassToSave.name,
        lastName: student.lastName,
        birthday: student.birthday,
        email: student.email,
        phone: student.phone,
        education: student.education,
        password: hashedPassword
    })

    try {
        // Saving the Student
        let savedStudent = await newStudent.save();
        return jwt.sign({
            id: savedStudent._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
    } catch (e) {
        // return an Error message describing the reason
        console.log(e)
        throw Error("Error while Creating Student")
    }
}

exports.getAllClasses = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Classes = await Class.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Classes;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Classes');
    }
}