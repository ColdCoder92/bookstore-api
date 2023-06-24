const express = require('express');
const router = express.Router();
const db = require('./db');


//GET for subtotal of user's cart
router.get('/shopping_cart/:user_id/subtotal', (req, res) => {
  const userId = req.params.user_id;
  const query = 'SELECT SUM(sub_total) AS subtotal FROM shopping_cart WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Query error' });
    } else if (results.length === 0 || results[0].subtotal === null) {
      res.status(404).json({ error: 'User not found or no items in cart' });
    } else {
      const subtotal = results[0].subtotal;
      res.json({ subtotal });
    }
  });
});


// POST for adding book to cart
router.post('/shopping_cart', (req, res) => {
  const { book_id, user_id } = req.body;

  const query = 'INSERT INTO shopping_cart (book_id, user_id) VALUES (?, ?)';
  
  db.query(query, [book_id, user_id], (err) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to add the book to the shopping cart' });
    } else {
      res.sendStatus(200);
    }
  });
});


// GET all books in user's cart
router.get('/shopping_cart/:user_id/books', (req, res) => {
  const userId = req.params.user_id;
  const query = `
    SELECT books.*
    FROM shopping_cart
    JOIN books ON shopping_cart.book_id = books.book_id
    WHERE shopping_cart.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to retrieve the books in the shopping cart' });
    } else {
      res.json(results);
    }
  });
});


// DELETE book from cart
router.delete('/shopping_cart/:user_id/books/:book_id', (req, res) => {
  const userId = req.params.user_id;
  const bookId = req.params.book_id;

  const query = 'UPDATE shopping_cart SET book_id = NULL WHERE user_id = ? AND book_id = ?';

  db.query(query, [userId, bookId], (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to update the book in the shopping cart' });
    } else if (result.changedRows === 0) {
      res.status(404).json({ error: 'User not found or book not found in the shopping cart' });
    } else {
      res.sendStatus(204);
    }
  });
});


module.exports = router;