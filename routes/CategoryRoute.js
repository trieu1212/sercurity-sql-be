const express = require('express');
const CategoryController = require('../controllers/CategoryController')
const MiddlewareController = require('../controllers/MiddlewareController')
const router = express.Router();    

router.get('/',CategoryController.getAllCategory)

//admin
router.put('/update/:categoryId/:userId',MiddlewareController.verifyTokenAndAdminAuth,CategoryController.updateCategory)
router.delete('/delete/:categoryId/:userId',MiddlewareController.verifyTokenAndAdminAuth,CategoryController.deleteCategory)
router.post('/create/:userId',MiddlewareController.verifyTokenAndAdminAuth,CategoryController.createCategory)
router.get('/:categoryId/:userId',MiddlewareController.verifyTokenAndAdminAuth,CategoryController.getOneCategory)
module.exports = router;