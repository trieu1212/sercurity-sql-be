const express = require('express');
const MiddlewareController = require('../controllers/MiddlewareController');
const OrderController = require('../controllers/OrderController');
const router = express.Router();

router.post('/create/:userId',MiddlewareController.verifyTokenAndAuthorize,OrderController.createOrder)
router.get('/:userId',MiddlewareController.verifyTokenAndAuthorize,OrderController.getUserOrder)
module.exports = router;