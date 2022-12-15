const mongoose = require("mongoose")

const recoverySchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    code:{
        type: Number,
        required: true,
        default: Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Recovery', recoverySchema);