const passwordRecService = require('../service/passwordRecService');
const jwt = require('jsonwebtoken');

exports.createRecovery = async function (req, res){
    let {email} = req.params;
    console.log("Creating recovery...")
    try{
        const createdRecovery = await passwordRecService.createRecovery(email);
        return res.status(201).json({status: 201, data: createdRecovery, message: "Successfully created recovery"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}
