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
        enum: ['individual', 'group']
    },
    frequency:{
        type: String,
        required: true,
        enum:['daily', 'weekly', 'monthly']
    },
    subject:{
        type: String,
        required: true,
        enum:['math', 'science', 'history', 'english', 'spanish', 'art', 'music', 'technology', 'other']
    },
    price:{
        type: Number,
        required: true
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Class', classSchema);