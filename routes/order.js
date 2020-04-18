const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/order');

// localhost:5000/api/order?offset=2&limit=5
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);

// localhost:5000/api/order
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);

module.exports = router;