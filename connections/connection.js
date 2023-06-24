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

module.exports = {myBookstoreConnection};