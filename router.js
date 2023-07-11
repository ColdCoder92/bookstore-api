const express = require('express');
const router = express.Router();
const db = require('/Users/Tatiana/Desktop/wishlist-mgmt/db.js'); //./db
router.use(express.json());

// gets all wishlists
router.get('/wishlist', (req, res) => {
  db.query('SELECT * FROM wishlist', (err, results) => {
    if (err) {
      res.status(500).send('Error connecting to database. Try again.');
    } else {
      res.json(results);
    }
  });
});

// gets one wishlist from id entered (GET)
router.get('/wishlist/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM wishlist WHERE id = ?', [id], (err, results) => {
    if (results.length === 0) {
      res.status(404).json({ error: 'Wishlist was not found. Try again.' });
    } else {
      res.json(results);
    }
  });
});

// create wishlist for user with name (POST)
router.post('/wishlist/create', (req, res) => {
  const {id, name, user_id} = req.body;
  const query = 'INSERT INTO wishlist(id, name, user_id) VALUES(?, ?, ?)';

  db.query(query, [id, name, user_id], (err) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to create wishlist. Try again.' });
    } else {
      res.send("Successfully created wishlist!");
    }
  });
});

// add book into user's wishlist (POST) 
router.post('/wishlist/add_book', (req, res) => {
  const {id, book_id, user_id} = req.body;
  const query = 'INSERT INTO wishlist(id, book_id, user_id) VALUES(?, ?, ?)';
  //get it to replace null values????

  db.query(query, [id, book_id, user_id], (err) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to add book into the wishlist. Try again.' });
    } else {
      res.send("Sucessfully inserted book into wishlist!");
    }
  });
});

// move book from wishlist to shopping cart (DELETE)
router.delete('/wishlist/move', (req, res) => {
  const {book_id, user_id} = req.body;
  const query = 'INSERT INTO shopping_cart(book_id, user_id) VALUES(?, ?)';
  
  db.query(query, [book_id, user_id], (err) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to move book to shopping cart. Try again.' });
    } else {
      res.send("Sucessfully moved book into shopping cart!");
    }
  });
});

// remove book from wishlist (not into shopping cart)
router.delete('/wishlist/delete', (req, res) => {
  const {id, book_id} = req.body;
  const query = 'DELETE FROM wishlist WHERE id = ? AND book_id = ?';
 
  db.query(query, [id, book_id], (err) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to remove book from wishlist. Try again.' });
    } else {
      res.send("Sucessfully removed book from wishlist!");
    }
  });
});

module.exports = router;
