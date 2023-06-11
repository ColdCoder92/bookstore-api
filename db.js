const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Norskrom6',
  password: 'Beketh666?',
  database: 'shopping_cart_test'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to Shopping Cart');
});

module.exports = connection;