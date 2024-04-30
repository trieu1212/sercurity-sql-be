const express = require('express');
const UserController = require('../controllers/UserControler');
const MiddlewareController = require('../controllers/MiddlewareController');
const router = express.Router();

router.post('/create/:userId',MiddlewareController.verifyTokenAndAdminAuth,UserController.createUser)
router.get('/all/:userId',MiddlewareController.verifyTokenAndAdminAuth,UserController.getAllUser)
router.delete('/delete/:id',MiddlewareController.verifyTokenAndAdminAuth,UserController.deleteUser)
router.put('/update/:userId',MiddlewareController.verifyTokenAndAuthorize,UserController.updateUser)
router.get('/:userId',MiddlewareController.verifyTokenAndAuthorize,UserController.getOneUser)


module.exports = router;