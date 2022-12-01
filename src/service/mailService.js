var nodemailer = require("nodemailer");
const Comment = require("../model/comment");
const Student = require("../model/student");

exports.sendMail = async function (commentId, reason) {
  let comment = await Comment.findById(commentId);
  let student = await Student.findById(comment.publisherId);
  console.log("comment: " + comment);
  var sender = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "classerio.uade@gmail.com",
      pass: "pycopmugeefonfkr",
    },
  });
  var mail = {
    from: "classerio.uade@gmail.com",
    to: student.email,
    subject: "Claserio - Comentario rechazado",
    text: `Se ha ocultado tu comentario por el siguiente motivo: "${reason}". El comentario es el siguiente: "${comment.comment}"`,
  };
  sender.sendMail(mail);
};
