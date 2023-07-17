const express = require('express');
const router = express.Router();
const db = require('./db');

// GET for subtotal of user's cart
router.get('/shopping_cart/:user_id/subtotal', (req, res) => {
  const userId = req.params.user_id;
  const query = `
    SELECT SUM(books.price * cart_items.quantity) AS subtotal
    FROM cart_items
    JOIN books ON cart_items.book_id = books.id
    WHERE cart_items.cart_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error making query: ', err);
      res.status(500).json({ error: 'Query error' });
    } else {
      const subtotal = results[0]?.subtotal || 0;
      res.json({ subtotal });
    }
  });
});


// POST for adding book to cart
router.post('/shopping_cart', (req, res) => {
  const { user_id, book_id, quantity } = req.body;

  const insertQuery = 'INSERT INTO cart_items (cart_id, book_id, quantity) VALUES (?, ?, ?)';
  db.query(insertQuery, [user_id, book_id, quantity], (err) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to add the book to the shopping cart' });
    } else {
      // Update the subtotal in the shopping_cart table
      const updateQuery = `
        UPDATE shopping_cart
        SET subtotal = (
          SELECT SUM(books.price * cart_items.quantity)
          FROM cart_items
          JOIN books ON cart_items.book_id = books.id
          WHERE cart_items.cart_id = ?
        )
        WHERE cart_id = ?
      `;
      db.query(updateQuery, [user_id, user_id], (err) => {
        if (err) {
          console.error('Error updating subtotal: ', err);
        }
      });

      res.sendStatus(200);
    }
  });
});

// GET all books in user's cart
router.get('/shopping_cart/:user_id/books', (req, res) => {
  const userId = req.params.user_id;
  const query = `
    SELECT books.*
    FROM cart_items
    JOIN books ON cart_items.book_id = books.id
    WHERE cart_items.cart_id = ?
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

  const query = 'DELETE FROM cart_items WHERE cart_id = ? AND book_id = ?';

  db.query(query, [userId, bookId], (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to delete the book from the shopping cart' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found or book not found in the shopping cart' });
    } else {
      // Update the subtotal in the shopping_cart table
      const updateQuery = `
        UPDATE shopping_cart
        SET subtotal = (
          SELECT SUM(books.price * cart_items.quantity)
          FROM cart_items
          JOIN books ON cart_items.book_id = books.id
          WHERE cart_items.cart_id = ?
        )
        WHERE cart_id = ?
      `;
      db.query(updateQuery, [userId, userId], (err) => {
        if (err) {
          console.error('Error updating subtotal: ', err);
        }
      });

      res.sendStatus(204);
    }
  });
});

module.exports = router;

