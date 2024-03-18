const express = require('express');
const ProductController = require('../controllers/ProductController');
const MiddlewareController = require('../controllers/MiddlewareController');
const router = express.Router();

router.get('/',ProductController.getAllProduct)
router.get('/:id',ProductController.getOneProduct)
// router.post('/create',MiddlewareController.verifyTokenAndAdminAuth,ProductController.createProduct)

module.exports = router;