const express = require('express');
const router = express.Router();
const controller = require('../controllers/position');

// localhost:5000/api/position/:categoryId
router.get('/:categoryId', controller.getByCategoryId);

// localhost:5000/api/position
router.post('/', controller.create);

// localhost:5000/api/position/:id
router.patch('/:id', controller.update);

// localhost:5000/api/position/:id
router.delete('/:id', controller.remove);

module.exports = router;