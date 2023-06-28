// not needed
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tatianar309',
  database: 'bookstore_database'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

module.exports = connection;