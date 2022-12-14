// Getting the Newly created Mongoose Model we just created
const Student = require("../model/student");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to Create a Student
exports.createStudent = async function (student) {
    // Creating a new Mongoose Object by using the new keyword
    const hashedPassword = bcrypt.hashSync(student.password, 8);

    let newStudent = new Student({
        firstName: student.firstName,
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

exports.getStudentById = async function (id) {
    try {
        return await Student.findById(id);
    } catch (e) {
        throw Error("Error while getting student by id")
    }
}

exports.getStudentByEmail = async function (email) {
    const student = await Student.findOne({email});
    if (!student) {
        return null;
    }
    return student;
}

exports.getStudentByPhone = async function (phone) {
    try {
        return await Student.find({phone});
    } catch (e) {
        throw Error("Error while getting student by phone")
    }
}

exports.updateStudentPasswordById = async function (id, password, newPassword) {
    console.log("updateStudentPasswordById", id, password, newPassword);
    console.log("Seeking student by id and pass...");

    let oldStudent = await Student.findOne({_id: id});

    if (!bcrypt.compareSync(password, oldStudent.password)) {
        throw Error("Incorrect password");
    }

    return Student.findOneAndUpdate({_id: id},
        {
            $set: {
                password: bcrypt.hashSync(newPassword.newPassword, 8).toString()
            }
        });
}

exports.updateStudentById = async function (id, student) {

        let oldStudent = await Student.findById(id);
        console.log("OldStudent: \n"+ JSON.stringify(oldStudent));

        if (oldStudent == null){
            return false;
        }
        oldStudent.firstName = student.firstName;
        oldStudent.lastName = student.lastName;
        oldStudent.phone = student.phone;
        oldStudent.email = student.email;
        oldStudent.education = student.education;

        console.log("NewStudent: \n"+ JSON.stringify(oldStudent));

        return Student.updateOne({_id: id},
            {
                $set: {
                    firstName: student.firstName,
                    lastName: student.lastName,
                    phone: student.phone,
                    email: student.email,
                    education: student.education
                }
            });
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

exports.loginStudent = async function (email, password) {
    try {
        let student = await Student.findOne({email});
        if (!student) {
            console.log("Student not found");
            return false;
        }
        if (!bcrypt.compareSync(password, student.password)) {
            console.log("Password not match");
            return false;
        }
        return jwt.sign({ id: student._id }, process.env.SECRET, { expiresIn: 86400 });
    } catch (e) {
        throw Error("Error while getting student by email")
    }
}