const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'bookrating',
  user: 'user',
  database: 'bookrating_commenting',
  host: 'localhost',
  port: '3306'
});

const bookratingAndCommentingDb = {};

// Retrieve all ratings
bookratingAndCommentingDb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM bookrating`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// Retrieve ratings by ID
bookratingAndCommentingDb.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM commenting WHERE commentingin = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// Create a new rating
bookratingAndCommentingDb.createRating = (rating, userId, bookId) => {
  return new Promise((resolve, reject) => {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    pool.query(
      `INSERT INTO bookrating (rating, user_id, book_id, datestamp) VALUES (?, ?, ?, ?)`,
      [rating, userId, bookId, currentDate],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

// Create a new comment
bookratingAndCommentingDb.createComment = (comment, userId, bookId, datestamp) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO commenting (commentText, userId, bookId, datestamp) VALUES (?, ?, ?, ?)`,
      [comment, userId, bookId, datestamp],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

module.exports = bookratingAndCommentingDb;
