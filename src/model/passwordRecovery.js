const mongoose = require("mongoose")

const passwordRecoverySchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PasswordRecovery', passwordRecoverySchema);