const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//Middleware
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');

//Routes
app.use('/api', userRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
