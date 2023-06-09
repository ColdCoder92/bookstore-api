const mysql = require("mysql");

const myBookstoreConnection = mysql.createConnection({
    user: "root",
    password: "database",
    database: "bookstore"
});

myBookstoreConnection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connection worked!!!");
});

myBookstoreConnection.query('SELECT Comment, User FROM comments;', function (error, results, fields) {
    if (error) throw error;
        // console.log("Row created")
        console.log("%s - %s", results[0].Comment, results[0].User);
});