const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    publisherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    classOwnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    rank:{
        type: Number,
        required: true
    },
    state:{
        type: String,
        required: false,
        enum:['pending', 'approved', 'blocked'],
        default: 'pending'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    isVisible:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Comments', commentSchema);