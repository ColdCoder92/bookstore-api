const express = require('express');
const routes = require('../routes');

const app = express();

// Middleware configurations
app.use(express.json());

// Routes
app.use('/api/bookrating_commenting', routes); // Update the route path

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port', port);
});
