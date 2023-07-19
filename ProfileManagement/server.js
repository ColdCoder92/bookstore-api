const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//Middleware
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
const getUserRoutes = require('./routes/getUserRoutes');
const updateUserRoutes = require('./routes/updateUserRoutes');
const creditCardRoutes = require('./routes/creditCardRoutes');



//Routes
app.use('/api', userRoutes);
app.use('/api', getUserRoutes);
app.use('/api', updateUserRoutes);
app.use('/api', creditCardRoutes);




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
