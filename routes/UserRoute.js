const express = require('express');
const UserController = require('../controllers/UserControler');
const MiddlewareController = require('../controllers/MiddlewareController');
const router = express.Router();

router.post('/create',MiddlewareController.verifyTokenAndAdminAuth,UserController.createUser)
router.get('/',MiddlewareController.verifyTokenAndAdminAuth,UserController.getAllUser)
router.delete('/delete/:id',MiddlewareController.verifyTokenAndAdminAuth,UserController.deleteUser)
router.put('/update/:id',MiddlewareController.verifyTokenAndAdminAuth,UserController.updateUser)


module.exports = router;