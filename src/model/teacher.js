const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);