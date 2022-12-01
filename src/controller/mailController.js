const mailService = require('../service/mailService');
const jwt = require('jsonwebtoken');

//send email
exports.sendEmail = async function (req, res){
    let {commentId, reason } = req.params;
    console.log("commentId: " + commentId, "reason: " + reason);
    try{
    const sentMail = await mailService.sendMail(commentId, reason);
    return res.status(200).json({status: 200, data: sentMail, message: "Successfully sent mail"});
    } catch(e){
        return res.status(400).json({status: 400, message: "Error sending mail"});
    }
}