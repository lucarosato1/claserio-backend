// Getting the Newly created Mongoose Model we just created
const Comments = require("../model/comment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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