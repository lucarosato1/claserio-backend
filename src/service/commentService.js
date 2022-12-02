// Getting the Newly created Mongoose Model we just created
const Comment = require("../model/comment");
const Class = require("../model/class");
const ClassService = require("../service/classService");
const TeacherService = require("../service/teacherService");
const StudentService = require("./studentService");

exports.createComment = async function (comment, tokenSubject) {
  let classObj = await ClassService.getClassById(comment.classId);
  if (!classObj) {
    throw Error("Class not found");
  }
  console.log("classObj", classObj);

  let teacherId = classObj.teacherId;
  console.log("teacherId", teacherId);

  let newComment = new Comment({
    classId: comment.classId,
    classOwnerId: teacherId,
    publisherId: tokenSubject,
    comment: comment.comment,
    rank: comment.rank,
  });
  try {
    // Saving the Comment
    let savedComment = await newComment.save();
    let commentsForClass = await Comment.find({ classId: comment.classId });
    let totalRank = 0;
    commentsForClass.map((comment) => {
      totalRank += comment.rank;
    });

    let avgRank = totalRank / commentsForClass.length;
    avgRank = parseFloat(avgRank).toFixed(2);
    console.log(
      "totalRank",
      totalRank,
      "lenght",
      commentsForClass.length,
      "avgRank",
      avgRank
    );
    await Class.findByIdAndUpdate(comment.classId, {
      rank: avgRank,
      $push: { comments: savedComment._id },
    });
    return savedComment;
  } catch (e) {
    // return an Error message describing the reason
    console.log(e);
    throw Error("Error while Creating Comment");
  }
};

exports.getCommentById = async function (id) {
  try {
    let comment = await Comment.findById(id);
    return comment;
  } catch (e) {
    throw Error("Error while getting comment by id");
  }
};

exports.getApprovedCommentsByClassId = async function (classId) {
  // Try Catch the awaited promise to handle the error
  try {
    return await Comment.find({ classId: classId, state: "approved" });
  } catch (e) {
    throw Error("Error while getting comments by class id");
  }
};

exports.getCommentsByOwner = async function (query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };
  // Try Catch the awaited promise to handle the error
  try {
    console.log("Query", query);
    var Comments = await Comments.paginate(query, options);
    // Return the Userd list that was retured by the mongoose promise
    return Comments;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Classes");
  }
};

exports.getPendingCommentsByTeacherId = async function (tokenSubject) {
  // Try Catch the awaited promise to handle the error
  try {
    return await Comment.find({
      classOwnerId: tokenSubject,
      state: "pending",
    });
  } catch (e) {
    throw Error("Error while getting comments by teacher id");
  }
};

exports.getPendingCommentsByClassId = async function (classId) {
  // Try Catch the awaited promise to handle the error
  try {
    return await Comment.find({
      classId: classId,
      state: "pending",
    });
  } catch (e) {
    throw Error("Error while getting comments by class id");
  }
};

exports.updateCommentById = async function (id, comment, tokenSubject) {
  // Try Catch the awaited promise to handle the error
  let commentToEdit = await Comment.findById(id);
  let ownerId = commentToEdit.classOwnerId;
  if (!commentToEdit) {
    throw Error("Comment not found");
  }
  let teacher = await TeacherService.getTeacherById(tokenSubject);
  if (!teacher) {
    throw Error("Teacher not found");
  }
  if (tokenSubject != ownerId) {
    throw Error("You are not the owner of this class");
  }

  try {
    return Comment.updateOne(
      { _id: id },
      {
        $set: {
          state: comment.state,
        },
      }
    );
  } catch (e) {
    throw Error("Error occured while Finding the Reserve");
  }
};

exports.rejectCommentById = async function (id, reason, tokenSubject) {
  // Try Catch the awaited promise to handle the error
  let MailService = require("../service/mailService");
  let commentToEdit = await Comment.findById(id);
  let ownerId = commentToEdit.classOwnerId;
  let student = await StudentService.getStudentById(commentToEdit.publisherId);

  if (!commentToEdit) {
    throw Error("Comment not found");
  }
  let teacher = await TeacherService.getTeacherById(tokenSubject);
  if (!teacher) {
    throw Error("Teacher not found");
  }
  if (tokenSubject != ownerId) {
    throw Error("You are not the owner of this class");
  }

  try {
    let subject = "Claserio - Tu comentario ha sido rechazado";
    let text = `Tu comentario "${commentToEdit.comment}" ha sido rechazado por el siguiente motivo: "${reason}"`;
    let mailTo = student.email;

    await MailService.sendMail(subject, text, mailTo);
    return Comment.updateOne(
      { _id: id },
      {
        $set: {
          state: "blocked",
        },
      }
    );
  } catch (e) {
    throw Error("Error occured while Finding the Reserve");
  }
};
