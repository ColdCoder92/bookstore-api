const {getBookCommentList, getAverageRating, createComment, createRating} = require("./routeControls");

const routers = (app) => {
    app.route("/comment-list")
    .post(createComment)

    app.route("/comment-list/:bookID")
    .get(getBookCommentList)

    app.route("/rating-list")
    .post(createRating)

    app.route("/rating-list/:bookID")
    .get(getAverageRating)
}

module.exports = {routers};