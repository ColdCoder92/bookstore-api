
const mysql = require('mysql');

const connection = mysql.createConnection({

  host: 'bookstore.czxmfbaajot2.us-east-2.rds.amazonaws.com',
  user: 'nick',
  password: 'dbpassword',
  database: 'bookstoredb',
  
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to Bookstore!');
});

module.exports = connection;