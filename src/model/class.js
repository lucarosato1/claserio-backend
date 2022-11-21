const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    duration:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum:['individual', 'grupal']
    },
    frequency:{
        type: String,
        required: true,
        enum:['única', 'semanal', 'mensual']
    },
    subject:{
        type: String,
        required: true,
        //enum: true
    },
    price:{
        type: Number,
        required: true
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    state:{
        type: String,
        required: true,
        //enum: true
    }/*,
    comments:[{
        type:mongoose.ObjectId,
        ref:Comment
    }]*/
});

module.exports = mongoose.model('Class', classSchema);
