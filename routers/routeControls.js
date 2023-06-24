const {myBookstoreConnection} = require("../connections/connection");
// Get All Available Comments from their respective users
/*
const getCommentList = (req, res) => {
    myBookstoreConnection.query('SELECT Comment, UserID FROM comments;',
    function (error, results, fields) {
        if (error) {
            throw error;
        }
        // console.log("Row created")
        var info = "";
        for (var row = 0; row < results.length; row++) {
            info += `${results[row].Comment} - User # ${results[row].UserID}\n`;
        }
        res.send(info);
        //console.log("%s - %s", results[0].Comment, results[0].User);
    });
} 
*/
// Get All Available Comments for a particular Book based on Book ID
const getBookCommentList = (req, res) => {
    myBookstoreConnection.query('SELECT Comment FROM comments WHERE BookID=?', 
    [req.params.bookID], function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.json(results);
    })
}
// Get All Available Ratings from their Respective Books
/*
const getRatingsList = (req, res) => {
    myBookstoreConnection.query('Select Rating, BookID FROM ratings;',
    function (error, results, fields) {
        if (error) {
            throw error;
        }
        for (var row = 0; row < results.length; row++) {
            info += `Book #${results[row].BookID} - ${results[row].Rating}/5\n`;
        }
    })
}
*/
// Get Specific Comment based on the Comment ID
/*
const getComment = (req, res) => {
    var rowIndex = req.params.commentID - 1;
    myBookstoreConnection.query('SELECT Comment, UserID FROM comments;',
    function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.send(`${results[rowIndex].Comment} - User # ${results[rowIndex].UserID}`);
    });
}
*/
// Get the Average Rating of a Book based on the Book ID
const getAverageRating = (req, res) => {
    myBookstoreConnection.query('SELECT Rating FROM ratings WHERE BookID=?',
    [req.params.bookID], function (error, results, fields) {
        if (error) {
            throw error;
        }
        var sum = 0;
        for (var row = 0; row < results.length; row++) {
            sum += results[row].Rating;
        }
        var average = sum / results.length;
        res.send(`Average Rating of Book ${req.params.bookID}: ${average}/5`);
    })
}
// Create a Comment for a Book by a User
const createComment = (req, res) => {
    myBookstoreConnection.query(
    'INSERT INTO comments(Comment, UserID, BookID, DateStamp) VALUES(?, ?, ?, CURDATE());',
    [req.body.Comment, req.body.UserID, req.body.BookID],
    function (error, results, fields) {
        if (error) {
            throw error;
        }
        // res.send("Comment Created!"); * To test the success of creating a comment
    });
}
// Create a Rating for a Book by a User based on a 5-Star Scale
const createRating = (req, res) => {
    myBookstoreConnection.query('INSERT INTO ratings(Rating, UserID, BookID, DateStamp) VALUES(?, ?, ?, CURDATE());',
    [req.body.Rating, req.body.UserID, req.body.BookID],
    function (error, results, fields) {
        if (error) {
            throw error;
        }
        // res.send("Rating Created!"); * To test the success of creating a comment
    });
}
module.exports = {
    getAverageRating, getBookCommentList, createComment, createRating
};