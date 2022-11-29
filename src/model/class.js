const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
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
    image:{
        type: String,
        required: true
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
    teacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teachers',
        required: false
    },
    rank:{
        type: Number,
        required: false,
        default: 0
    },
    comments:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comments',
        required: false,
    },
    state:{
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Class', classSchema);