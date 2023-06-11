const express = require('express');
const router = express.Router();
const db = require('./db');

// GET single user by id
router.get('/shopping_cart/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const query = 'SELECT * FROM shopping_cart WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Query error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(results);
    }
  });
});

//GET entire table
router.get('/shopping_cart', (req, res) => {
  db.query('SELECT * FROM shopping_cart', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving users from database');
    } else {
      res.json(results);
    }
  });
});




module.exports = router;
