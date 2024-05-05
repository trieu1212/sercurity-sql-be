
const db = require('../orm/models/index');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const UserController = {
  createUser: async (req, res) => {
    const { username, password, email, isAdmin } = req.body;
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
      const user = await db.User.findAll({ include: db.Cart },
        { raw: true },
        { nest: true });
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
    const id = req.params.userId;
    const { username, email, isAdmin, phone, address } = req.body;
    const formattedPhone = parseInt('0' + phone);
    try {
      await db.User.update(
        {
          username: username,
          email: email,
          isAdmin: isAdmin,
          phone: formattedPhone,
          address: address
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
    const userId = req.params.userId;
    console.log(userId);
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        include: [db.Cart, db.Comment]
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    const { password, token } = req.body
    if(!password || !token) throw new Error('Vui lòng nhập mật khẩu và token')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await db.User.findOne({
      where: {
        passwordResetToken: passwordResetToken,
        passwordResetExpires: { [db.Sequelize.Op.gt]: Date.now() }
      }
    })
    if(!user){
      throw new Error('Token không hợp lệ hoặc đã hết hạn')
    }
    else{
      const hashPassword = bcrypt.hashSync(password, 10);
      user.password = hashPassword;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      await user.save();
      res.status(200).json({message: 'Đổi mật khẩu thành công'})
    }
  }
};

module.exports = UserController;    