const express = require('express');
const router = express.Router();
const db = require('/Users/Tatiana/Desktop/wishlist-mgmt/db.js');
router.use(express.json());

// gets one wishlist from id entered
router.get('/wishlist/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM wishlist WHERE id = ?', [id], (err, results) => {
    if (results.length === 0) {
      res.status(404).json({ error: 'Wishlist not found...' });
    } else {
      res.json(results);
    }
  });
});

// gets all wishlists
router.get('/wishlist', (req, res) => {
  db.query('SELECT * FROM wishlist', (err, results) => {
    if (err) {
      res.status(500).send('Error connecting to database...');
    } else {
      res.json(results);
    }
  });
});

// create (POST) wishlist for user with name
router.post('/wishlist/create', (req, res) => {
  const {id, name, username} = req.body;
  const query = 'INSERT INTO wishlist(id, name, username) VALUES(?, ?, ?)';

  db.query(query, [id, name, username], (err) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to create wishlist. Try again.' });
    } else {
      res.send("Successfully created wishlist!");
    }
  });
});

// add (POST) book into user's wishlist
router.post('/wishlist/add_book', (req, res) => {
  const {id, book_id} = req.body;
  const query = 'INSERT INTO wishlist(id, book_id) VALUES(?, ?)';

  db.query(query, [id, book_id], (err) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Failed to add book into the wishlist. Try again.' });
    } else {
      res.send("Sucessfully inserted book into wishlist!");
    }
  });
});

// remove (DELETE) book from wishlist


module.exports = router;
