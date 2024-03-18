const express = require('express');
const CommentController = require('../controllers/CommentController');
const MiddlewareController = require('../controllers/MiddlewareController');
const router = express.Router();

router.post('/create/:userId',MiddlewareController.verifyTokenAndAuthorize,CommentController.createComment)
router.get('/:productId',CommentController.getProductComment)
// router.put('/edit/:id',MiddlewareController.verifyTokenAndAuthorize,CommentController.editComment)
router.delete('/delete/:commentId/:userId',MiddlewareController.verifyTokenAndAuthorize,CommentController.deleteComment)


module.exports = router;