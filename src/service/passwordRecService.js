const PasswordRecovery = require("../model/passwordRecovery"); 

exports.createRecovery = async function (email){
    try{
        const createdRecovery = await PasswordRecovery.create({
            email,
            token: generateToken(),
        });
        return createdRecovery;
    } catch(e){
        throw Error("Error while creating recovery");
    }
}

const generateToken = function(){
    const token = crypto.randomBytes(20).toString('hex');
    return token;
}