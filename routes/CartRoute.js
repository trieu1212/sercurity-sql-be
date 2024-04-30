const express = require('express');
const CartController = require('../controllers/CartController');
const MiddlewareController = require('../controllers/MiddlewareController')
const router = express.Router();

router.post('/create/:userId',MiddlewareController.verifyTokenAndAuthorize,CartController.createCart)
router.get('/:userId',MiddlewareController.verifyTokenAndAuthorize,CartController.getUserCart)
router.put('/update/:userId',MiddlewareController.verifyTokenAndAuthorize,CartController.updateUserCart)
router.delete('/delete/:productId/:userId',MiddlewareController.verifyTokenAndAuthorize,CartController.deleteProductFromCart)
module.exports = router;