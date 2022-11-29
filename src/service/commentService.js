// Getting the Newly created Mongoose Model we just created
const Comment = require("../model/comment");
const jwt = require("jsonwebtoken");
const Class = require("../model/class");

exports.createComment = async function (comment) {
  let newComment = new Comment({
    classId: comment.classId,
    classOwnerId: comment.classOwnerId,
    publisherId: comment.publisherId,
    comment: comment.comment,
    rank: comment.rank,
  });
  try {
    // Saving the Comment
    let savedComment = await newComment.save();
    let addCommentToClass = await Class.findByIdAndUpdate(
      comment.classId,
      { $push: { comments: savedComment._id } },
      { new: true }
    );
    return jwt.sign(
      {
        id: savedComment._id,
      },
      process.env.SECRET,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );
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