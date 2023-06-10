const express = require("express");
const {routers} = require("./routers/bookstoreRoutes");

const app = express();
routers(app);

app.get("/", (req, res) => {
    res.send("Server is listening on Port 5000");
});

app.listen(5000, () => {
    console.log("Server connected to Port 5000");
})