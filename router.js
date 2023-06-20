const express = require('express');
const router = express.Router();
const db = require('/Users/Tatiana/Desktop/wishlist-mgmt/db.js');

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
router.post('/wishlist/:name', (req, res) => {
  const name = req.params.name;

  db.query('INSERT INTO wishlist(id, name) VALUES(?, ?);', [id], [name], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

// add (POST) book into user's wishlist
router.post('/wishlist/:name/:book_id', (req, res) => {

});


module.exports = router;
