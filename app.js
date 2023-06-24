const express = require('express');
const app = express();
const routes = require('./routes');
const {routers} = require("./routers/bookstoreRoutes");
const db = require('./db');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', routes);
routers(app);

app.listen(3000, () => {
  console.log('Server up on port 3000');
});

app.get("/", (req, res) => {
    res.send("Welcome to Ro's Bookstore!");
});
