// Getting the Newly created Mongoose Model we just created
const Comment = require("../model/comment");
const jwt = require('jsonwebtoken');
const Class = require("../model/class"); 

exports.createComment = async function(comment){
    let newComment = new Comment({
        classId: comment.classId,
        classOwnerId: comment.classOwnerId,
        publisherId: comment.publisherId,
        comment: comment.comment,
        rank: comment.rank
    });
    try {
        // Saving the Comment
        let savedComment = await newComment.save();
        let addCommentToClass = await Class.findByIdAndUpdate(
            comment.classId,
            {$push: {comments: savedComment._id}},
            {new: true}
        );
        return jwt.sign({
            id: savedComment._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
    } catch (e) {
        // return an Error message describing the reason
        console.log(e)
        throw Error("Error while Creating Comment")
    }

}

exports.getCommentsByClass = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Comments = await Comments.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Comments;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Classes');
    }
}

exports.getCommentsByOwner = async function (query, page, limit){
       // Options setup for the mongoose paginate
       var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Comments = await Comments.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Comments;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Classes');
    }
 
}