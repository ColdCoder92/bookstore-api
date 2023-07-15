const db = require('../config/db');

exports.getUserByUsername = (req, res) => {
  const { username } = req.query;

  // Validate required field
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  // Retrieve user from the database
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err);
      return res.status(500).json({ message: 'Error retrieving user' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = results[0];
    res.json(user);
  });
};
