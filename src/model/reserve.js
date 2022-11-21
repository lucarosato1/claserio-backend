const mongoose = require("mongoose")

const reserveSchema = new mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    teacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    state:{
        type: String,
        required: true,
        enum:['requested', 'accepted', 'canceled', 'finished'],
        default: 'requested'
    }
});

module.exports = mongoose.model('Reserves', reserveSchema);