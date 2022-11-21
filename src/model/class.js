const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({
    className:{
        type: String,
        required: true
    },
    classDescription:{
        type: String,
        required: false
    },
    classDuration:{
        type: String,
        required: true
    },
    classType:{
        type: String,
        required: true,
        enum:['individual', 'grupal']
    },
    classFrequency:{
        type: String,
        required: true,
        enum:['única', 'semanal', 'mensual']
    },
    classSubject:{
        type: String,
        required: true,
        //enum: true
    },
    classPrice:{
        type: Number,
        required: true
    },
    classTeacher:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    classState:{
        type: String,
        required: true,
        //enum: true
    },
    classComments:[{
        type:mongoose.ObjectId,
        ref:Comment
    }]
});

module.exports = mongoose.model('Class', classSchema);