const {myBookstoreConnection} = require("../connections/connection");

// Get All Available Comments for a particular Book based on Book ID
const getBookCommentList = (req, res) => {
    myBookstoreConnection.query('SELECT comment FROM comments WHERE book_id=?', 
    [req.params.bookID], function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.json(results);
    })
}
// Get the Average Rating of a Book based on the Book ID
const getAverageRating = (req, res) => {
    myBookstoreConnection.query('SELECT rating FROM ratings WHERE book_id=?',
    [req.params.bookID], function (error, results, fields) {
        if (error) {
            throw error;
        }
        var sum = 0;
        for (var row = 0; row < results.length; row++) {
            sum += results[row].rating;
        }
        var average = sum / results.length;
        res.send(`Average Rating of Book ${req.params.bookID}: ${average}/5`);
    })
}
// Create a Comment for a Book by a User
const createComment = (req, res) => {
    myBookstoreConnection.query(
    'INSERT INTO comments(comment, user_id, book_id, datestamp) VALUES(?, ?, ?, CURDATE());',
    [req.body.Comment, req.body.UserID, req.body.BookID],
    function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.send();
    });
}
// Create a Rating for a Book by a User based on a 5-Star Scale
const createRating = (req, res) => {
    var rating = req.body.Rating;
    // Ensure the rating is strictly between 0 and 5
    if (rating < 0) {
        rating = 0;
    }
    if (rating > 5) {
        rating = 5;
    }
    myBookstoreConnection.query('INSERT INTO ratings(rating, user_id, book_id, datestamp) VALUES(?, ?, ?, CURDATE());',
    [rating, req.body.UserID, req.body.BookID],
    function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.send();
        // res.send("Rating Created!"); * To test the success of creating a comment
    });
}
module.exports = {
    getAverageRating, getBookCommentList, createComment, createRating
};