const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.createUser = (req, res) => {
  const { username, password, name, email, address } = req.body;

  // Validate required fields
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Error creating user' });
    }

  // Create user in the database
  const query = 'INSERT INTO users (username, password, name, email, address) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [username, hashedPassword, name, email, address], (err, results) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Error creating user' });
      }
      res.sendStatus(201);
    });
  });
};

exports.updateUser = (req, res) => {
  const { username } = req.params;
  const updatedFields = req.body;

  // Remove the email field from the updatedFields object
  delete updatedFields.email;

  // Generate the SET clause for the update query dynamically
  const setClause = Object.keys(updatedFields)
    .map((key) => `${key} = ?`)
    .join(', ');

  // Generate the parameter values array for the update query
  const parameterValues = Object.values(updatedFields);

  // Add the username parameter value to the array
  parameterValues.push(username);

  // Update the user in the database
  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ message: 'Error updating user' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user in the database
    const updateQuery = `UPDATE users SET ${setClause} WHERE username = ?`;
    db.query(updateQuery, parameterValues, (err, results) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ message: 'Error updating user' });
      }
      res.sendStatus(200);
    });
  });
};


