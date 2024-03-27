const express = require('express');
const UserController = require('../controllers/UserControler');
const MiddlewareController = require('../controllers/MiddlewareController');
const router = express.Router();

router.post('/create/:userId',MiddlewareController.verifyTokenAndAdminAuth,UserController.createUser)
router.get('/:userId',MiddlewareController.verifyTokenAndAdminAuth,UserController.getAllUser)
router.delete('/delete/:id',MiddlewareController.verifyTokenAndAdminAuth,UserController.deleteUser)
router.put('/update/:id',MiddlewareController.verifyTokenAndAdminAuth,UserController.updateUser)
router.get('/:id/:userId',MiddlewareController.verifyTokenAndAdminAuth,UserController.getOneUser)


module.exports = router;