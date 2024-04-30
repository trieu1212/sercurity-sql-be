const express = require("express");
const db = require("../orm/models/index");
const { QueryTypes } = require("sequelize");
const CommentController = {
  getProductComment: async (req, res) => {
    const { productId } = req.params;
    try {
      const comments = await db.Comment.findAll({
        where: { productId: productId },
        include: [
          {
            model: db.User,
            attributes: ["id","username"],
          },
        ],
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //using sequelize to create a comment
  createComment: async (req, res) => {
    const productId = req.body.productId;
    const comment = req.body.comment;
    if (!productId || !comment) {
      const rawData = Object.keys(req.body)[0];
      const parsedData = JSON.parse(rawData);
      const newProductId = parsedData.productId;
      const newComment = parsedData.comment;
      try {
        console.log(req.body);
        await db.Comment.create({
          comment: newComment,
          userId: req.params.userId,
          productId: newProductId,
        });
        res.status(201).json({ message: "Thêm đánh giá thành công" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
    else {
      try {
        console.log(req.body);
        await db.Comment.create({
          comment: comment,
          userId: req.params.userId,
          productId: productId,
        });
        res.status(201).json({ message: "Thêm đánh giá thành công" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

  },
  //using raw queries to create comment
  // createComment: async (req, res) => {
  //   try {
  //     const { comment, productId } = req.body;
  //     const { userId } = req.params;

  //     const query = `
  //       INSERT INTO comment (comment, userId, productId)
  //       VALUES (?, ?, ?)
  //     `;

  //     await db.sequelize.query(query, {
  //       replacements: [comment, userId, productId],
  //       type: QueryTypes.INSERT
  //     });

  //     res.status(201).json({ message: "Comment created successfully" });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // },
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
