const {myBookstoreConnection} = require("../connections/connection");
// Get All Available Comments from their respective users
const getCommentList = (req, res) => {
    myBookstoreConnection.query('SELECT Comment, User FROM comments;',
    function (error, results, fields) {
        if (error) {
            throw error;
        }
        // console.log("Row created")
        for (var row = 0; row < results.length; row++) {
            res.send(`${results[0].Comment} - ${results[0].User}`);
        }
        //console.log("%s - %s", results[0].Comment, results[0].User);
    });
}
// Get Specific Comment based on the Comment ID
const getComment = (req, res) => {
    var rowIndex = req.params.commentID - 1;
    myBookstoreConnection.query('SELECT Comment, User FROM comments;',
    function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.send(`${results[rowIndex].Comment} - ${results[rowIndex].User}`);
    });
}

module.exports = {getComment, getCommentList};