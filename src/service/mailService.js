const nodemailer = require("nodemailer");

exports.sendMail = async function (subject, bodyText, mailTo) {
  const sender = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_FROM,//"classerio.uade@gmail.com",
      pass: process.env.MAIL_PASSWORD//"pycopmugeefonfkr",
    },
  });
  const mail = {
    from: process.env.MAIL_FROM,
    to: mailTo,
    subject: subject,//"Claserio - Comentario rechazado",
    text: bodyText//`Se ha ocultado tu comentario por el siguiente motivo: "${reason}". El comentario es el siguiente: "${comment.comment}"`,
  };
  sender.sendMail(mail);
};
