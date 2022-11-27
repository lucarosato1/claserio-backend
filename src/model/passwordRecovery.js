const mongoose = require("mongoose")

const passwordRecoverySchema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now, required: true},
    email: {type: String, required: true},
    code: {type: Number, required: true},
});

module.exports = mongoose.model('Recoveries', passwordRecoverySchema);