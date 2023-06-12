const {getComment, getCommentList} = require("./routeControls");

const routers = (app) => {
    app.route("/comment-list")
    .get(getCommentList)
    .post((req, res) => {
        res.send("Post API Activated!");
    })

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