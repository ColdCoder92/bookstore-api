const express = require('express');
const app = express();
const route = require('./router');
const db = require('./db');

app.use('/', route);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

app.get("/", (req, res) => {
  res.send("Wishlist API is working!");
});
