const recoveryService = require('../service/recoveryService');

exports.sendRecoveryEmail = async function (req, res) {
    const email = req.body.email;
    try {
        const recovery = await recoveryService.sendRecoveryEmail(email);
        return res.status(200).json({status: 200, data: recovery, message: "Successfully recovery password"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.validateRecoveryCode = async function (req, res) {
    try {
        const recovery = await recoveryService.validateRecoveryCode(req.body.email, req.body.code, req.body.newPassword);
        return res.status(200).json({status: 200, data: recovery, message: "Successfully recovery password"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}