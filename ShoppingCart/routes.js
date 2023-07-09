const express = require('express');
const router = express.Router();
const db = require('./db');

// GET for subtotal of user's cart
router.get('/shopping_cart/:user_id/subtotal', (req, res) => {
  const userId = req.params.user_id;
  const query = `
    SELECT SUM(shopping_cart.subtotal) AS subtotal
    FROM shopping_cart
    JOIN books ON shopping_cart.book_id = books.id
    WHERE shopping_cart.cart_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Query error' });
    } else {
      const subtotal = results[0].subtotal || 0;
      res.json({ subtotal });
    }
  });
});

// POST for adding book to cart
router.post('/shopping_cart', (req, res) => {
  const { user_id, book_id } = req.body;

  const insertQuery = 'INSERT INTO shopping_cart (cart_id, book_id, subtotal) VALUES (?, ?, (SELECT price FROM books WHERE id = ?))';
  db.query(insertQuery, [user_id, book_id, book_id], (err) => {
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
    JOIN books ON shopping_cart.book_id = books.id
    WHERE shopping_cart.cart_id = ?
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

  const query = 'DELETE FROM shopping_cart WHERE cart_id = ? AND book_id = ?';

  db.query(query, [userId, bookId], (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to delete the book from the shopping cart' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found or book not found in the shopping cart' });
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
