const {getBookCommentList, getAverageRating, createComment, createRating} = require("./routeControls");

const routers = (app) => {
    app.route("/comment-list")
    //.get(getCommentList)
    .post(createComment)

    app.route("/comment-list/:bookID")
    .get(getBookCommentList)

    app.route("/rating-list")
    //.get(getRatingsList)
    .post(createRating)

    app.route("/rating-list/:bookID")
    .get(getAverageRating)
    /*
    app.route("/comment-list/:commentID")
    .get(getComment) 
    */
}

module.exports = {routers};