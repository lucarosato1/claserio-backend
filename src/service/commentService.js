// Getting the Newly created Mongoose Model we just created
const Comment = require("../model/comment");
const Class = require("../model/class");
const ClassService = require("../service/classService");

exports.createComment = async function (comment, tokenSubject) {
  let teacherId = await ClassService.getClassById(comment.classId).teacherId;
  let commentsForClass = await Comment.find({ classId: comment.classId });

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
    let totalRank = 0;
    commentsForClass.map((comment) => {
      totalRank += comment.rank;
    });

    let avgRank = totalRank / commentsForClass.length;

    await Class.findByIdAndUpdate(
      comment.classId,
      { $push: { comments: savedComment._id }, $set : {rank : avgRank} },
    );
    return savedComment;
  } catch (e) {
    // return an Error message describing the reason
    console.log(e);
    throw Error("Error while Creating Comment");
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

// FIXME
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

exports.getPendingCommentsByTeacherId = async function (teacherId) {
  // Try Catch the awaited promise to handle the error
  try {
    return await Comment.find({
      classOwnerId: teacherId,
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

exports.updateCommentById = async function (id, comment) {
  // Try Catch the awaited promise to handle the error
  try {
    var oldComment = await Comment.findById(id);

    if (oldComment == null) {
      return false;
    }
    oldComment.state = comment.state;
    //oldComment.rank = rank;

    return Comment.updateOne(
      { _id: id },
      {
        $set: {
          state: oldComment.state,
        },
      }
    );
  } catch (e) {
    throw Error("Error occured while Finding the Reserve");
  }
};
