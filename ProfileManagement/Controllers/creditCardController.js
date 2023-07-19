const db = require('../config/db');

exports.createCreditCard = (req, res) => {
  const { username } = req.params;
  const { cardNumber, cardHolder, expirationDate, cvv } = req.body;

  // Create credit card for the user in the database
  const query = 'INSERT INTO credit_cards (cardNumber, cardHolder, expirationDate, cvv, userId) VALUES (?, ?, ?, ?, (SELECT id FROM users WHERE username = ?))';
  db.query(query, [cardNumber, cardHolder, expirationDate, cvv, username], (err, results) => {
    if (err) {
      console.error('Error creating credit card:', err);
      return res.status(500).json({ message: 'Error creating credit card' });
    }
    res.sendStatus(201);
  });
};
