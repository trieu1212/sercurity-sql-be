const express = require('express');
const MiddlewareController = require('../controllers/MiddlewareController');
const OrderController = require('../controllers/OrderController');
const router = express.Router();
//user
router.post('/create/:userId',MiddlewareController.verifyTokenAndAuthorize,OrderController.createOrder)
router.get('/:userId',MiddlewareController.verifyTokenAndAuthorize,OrderController.getUserOrder)

//admin
router.get('/all',MiddlewareController.verifyTokenAndAdminAuth,OrderController.getAllOrder)
module.exports = router;