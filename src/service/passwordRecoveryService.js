var nodemailer = require('nodemailer');

exports.createVerificationCode = async function (email) {
    console.log ("Creating verification code...");
    const verificationCode = Math.floor (100000 + Math.random () * 999999);
    const Recovery = {
        email: email,
        code: verificationCode
    }

}

exports.sendVerificationCode = async function (email) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'classerio.uade@gmail.com',
            pass: 'genericpassword123'
        }
    });

    var mailOptions = {
        from: 'classerio.uade@gmail.com',
        to: email,
        subject: 'Claser.io - Password Recovery',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }
)}; 