const express = require('express');
const router = express.Router();
const controller = require('../controllers/order');

// localhost:5000/api/order
router.get('/', controller.getAll);

// localhost:5000/api/order
router.post('/', controller.create);

module.exports = router;