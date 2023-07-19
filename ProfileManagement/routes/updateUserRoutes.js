const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Update user route
router.put('/users/:username', userController.updateUser);
router.patch('/users/:username', userController.updateUser);

module.exports = router;
