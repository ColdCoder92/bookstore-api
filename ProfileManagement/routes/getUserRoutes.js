const express = require('express');
const router = express.Router();
const getUserController = require('../Controllers/getUserController');



router.get('/getUsers', getUserController.getUserByUsername);

module.exports = router;


