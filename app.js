const express = require("express");
const {routers} = require("./routers/bookstoreRoutes");

const app = express();
app.use(express.urlencoded({extended: true}));
routers(app);

app.get("/", (req, res) => {
    res.send("Welcome to Ro's Bookstore!");
});

app.listen(5000, () => {
    console.log("Server connected to Port 5000");
})