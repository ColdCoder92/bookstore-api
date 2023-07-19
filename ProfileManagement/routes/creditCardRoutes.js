const express = require('express');
const router = express.Router();
const creditCardController = require('../Controllers/creditCardController');

router.post('/users/:username/creditcards', creditCardController.createCreditCard);

module.exports = router;
