const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

// localhost:5000/api/auth/login
router.post('/login', controller.login);

// localhost:5000/api/auth/registration
router.post('/registration', controller.registrate);

module.exports = router;