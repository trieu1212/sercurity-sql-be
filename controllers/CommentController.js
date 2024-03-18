const express = require("express");
const db = require("../orm/models/index");

const CommentController = {
  getProductComment: async (req, res) => {
    const { productId } = req.params;
    try {
      const comments = await db.Comment.findAll({
        where: { productId: productId },
        include: [
          {
            model: db.User,
            attributes: ["username"],
          },
        ],
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createComment: async (req, res) => {
    try {
      const comment = await db.Comment.create({
        comment: req.body.comment,
        userId: req.params.userId,
        productId: req.body.productId,
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  editComment: async (req, res) => {
    const { id } = req.params.id;
    const { comment } = req.body;
    try {
      const comment = await db.Comment.update(
        {
          comment: comment,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json({ comment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteComment: async (req, res) => {
    const { commentId } = req.params;
    try {
      await db.Comment.destroy({ where: { id: commentId } });
      res.status(200).json({ message: "Xóa đánh giá thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = CommentController;
