const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const userRoutes = require('./ProfileManagement/routes/userRoutes');

app.use('/api', userRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
