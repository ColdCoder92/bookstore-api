const express = require('express');
const app = express();
const {routers} = require("./routers/bookstoreRoutes");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
routers(app);

app.listen(3000, () => {
  console.log('Server up on port 3000');
});

app.get("/", (req, res) => {
    res.send("Welcome to Ro's Bookstore!");
});
