const db = require('../config/db');

exports.createUser = (req, res) => {
  const { username, password, name, email, address } = req.body;

  // Validate required fields
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Create user in the database
  const query = 'INSERT INTO users (username, password, name, email, address) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [username, password, name, email, address], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ message: 'Error creating user' });
    }
    res.sendStatus(201);
  });
};
