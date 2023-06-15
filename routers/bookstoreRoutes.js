const {getComment, getCommentList, getBookCommentList, getRatingsList, getAverageRating, createComment, createRating} = require("./routeControls");

const routers = (app) => {
    app.route("/comment-list")
    .get(getCommentList)
    .post(createComment)

    app.route("/comment-list/:bookID")
    .get(getBookCommentList)

    app.route("/rating-list")
    .get(getRatingsList)
    .post(createRating)

    app.route("/rating-list/:bookID")
    .get(getAverageRating)

    app.route("/comment-list/:commentID")
    .get(getComment)
    .put((req, res) => {
        res.send("Put API Activated!");
    })
    .delete((req, res) => {
        res.send("Delete API Activated!");
    })
}

module.exports = {routers};