
const db = require('../orm/models/index');
const bcrypt = require('bcryptjs');
const UserController = {
  createUser: async (req, res) => {
    const { username, password, email,isAdmin } = req.body;
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const newUser = await db.User.create({
        username: username,
        email: email,
        password: hashPassword,
        isAdmin: isAdmin
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const user = await db.User.findAll({include: db.Cart},
        {raw:true},
        {nest:true});
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    const id = req.params.id;
    try {
       await db.User.destroy({
        where: { id: id },
      });
        await db.Cart.destroy({ where: { userId: id } });
        await db.Comment.destroy({ where: { userId: id } });
      res.status(200).json({ message: "Xóa người dùng thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
    const id = req.params.id;
    const { username, email,isAdmin } = req.body;
    try {
      await db.User.update(
        {
          username: username,
          email: email,
          isAdmin: isAdmin
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json({ message: "Cập nhật người dùng thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOneUser: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await db.User.findOne({
        where: { id: id },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = UserController;    