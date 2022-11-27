const passwordRecoverySchema = require ("../model/passwordRecovery");
const passwordRecoveryService = require ("../service/passwordRecoveryService");

exports.sendVerificationCode = async function (req, res){
    console.log ("Sending verification code...");

    const email = req.body.email;
    try {
        const verificationCode = await passwordRecoveryService.sendVerificationCode (email);
        return res.status (201).json ({status: 201, data: verificationCode, message: "Successfully sent verification code"});
    } catch (e) {
        return res.status (400).json ({status: 400, message: e.message});
    }
}

exports.verifyCode = async function (req, res){
    console.log ("Verifying code...");

    const code = req.body.code;
    try {
        const verificationCode = await passwordRecoveryService.verifyCode (code);
        return res.status (201).json ({status: 201, data: verificationCode, message: "Successfully verified code"});
    } catch (e) {
        return res.status (400).json ({status: 400, message: e.message});
    }
}