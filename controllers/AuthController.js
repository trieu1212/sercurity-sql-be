const bcrypt = require("bcryptjs");
const db = require("../orm/models/index");
const jwt = require("jsonwebtoken");
const SendMail = require("../ultils/SendMail");
const crypto = require('crypto');
const { QueryTypes, where } = require("sequelize");
//sequelize raw queries
const  AuthController = {
  generateAccessToken: (user) => {

    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2m" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },
  registerUser: async (req, res) => {
    const { username, password, email, phone, address } = req.body;
    console.log('register', req.body);
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const newUser = await db.User.create({
        username: username,
        email: email,
        password: hashPassword,
        phone: phone,
        address: address,
        refreshToken: null,
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //login using ORM
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await db.User.findOne({
        where: { username: username },
      });
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      } else {
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
          return res.status(400).json({ message: "wrong password" });
        } else {
          const accessToken = AuthController.generateAccessToken(user);
          const refreshToken = AuthController.generateRefreshToken(user);
          await db.User.update(
            { refreshToken: refreshToken },
            { where: { username: username } }
          );
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true
          });
          const userData = await db.User.findOne({
            where: { username: username },
            attributes: ['id', 'username', 'email', 'phone', 'address', 'isAdmin']
          });
          res.status(200).json({ userData, accessToken });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //login using raw queries 
  // username: ' OR '1'='1
  // password: ' OR '1'='1

  // loginUser: async (req, res) => {
  //   const { username, password } = req.body;
  //   try {
  //     const query = `
  //       SELECT * FROM user
  //       WHERE username = '${username}' AND password = '${password}'
  //       LIMIT 1
  //     `;
  //     const [user] = await db.sequelize.query(query, {
  //       type: QueryTypes.SELECT,
  //     });

  //     if (!user) {
  //       return res.status(400).json({ message: "User not found" });
  //     }

  //     const accessToken = AuthController.generateAccessToken(user);
  //     const refreshToken = AuthController.generateRefreshToken(user);

  //     await db.User.update(
  //       { refreshToken: refreshToken },
  //       { where: { username: user.username } }
  //     );
  //     res.cookie("refreshToken", refreshToken, {
  //       httpOnly: true,
  //       sameSite: 'strict',
  //       secure: true
  //     });
  //     const userData = user
  //     res.status(200).json({ userData, accessToken });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // },

  refresh: async (req, res) => {
    const cookie = req.cookies;
    const refreshToken = req.cookies.refreshToken;
    console.log('cookie', refreshToken);
    if (!cookie && refreshToken) {
      throw new Error('Không tìm thấy refresh token')
    } else {
      try {
        const user = await db.User.findOne({
          where: { refreshToken: refreshToken },
        });
        if (!user) {
          res.status(403).json({ message: "Refresh token not valid" });
        } else {
          jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_KEY,
            async (err, decoded) => {
              if (err) {
                console.log(err);
                throw new Error('Refresh token không hợp lệ')
              } else {
                const newAccessToken =
                  AuthController.generateAccessToken(decoded);
                const newRefreshToken =
                  AuthController.generateRefreshToken(decoded);
                await db.User.update(
                  { refreshToken: newRefreshToken },
                  { where: { refreshToken: refreshToken } }
                );
                res.cookie("refreshToken", newRefreshToken, {
                  httpOnly: true,
                  sameSite: 'strict',
                  secure: true
                })
                res.status(200).json({
                  accessToken: newAccessToken,
                });
              }
            }
          );
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  },
  getCurrent: async (req, res) => {
    const { id } = req.user;
    console.log('user id token', id);
    try {
      const user = await db.User.findOne({
        where: { id: id },
        include: [{
          model: db.Cart,
          include: [
            { model: db.Product }
          ]
        }, db.Comment],
        attributes: ['id', 'username', 'email', 'isAdmin', 'phone', 'address']
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  logoutUser: async (req, res) => {
    try {
      const cookie = req.cookies;
      const refreshToken = req.cookies.refreshToken;
      if (!cookie || cookie.refreshToken === undefined) {
        throw new Error('Không tìm thấy refresh token');
      } else {
        await db.User.update(
          { refreshToken: null },
          { where: { refreshToken: cookie.refreshToken } }
        );
        res.clearCookie('refreshToken', {
          httpOnly: true,
          sameSite: 'strict',
          secure: true
        });
        return res.status(200).json({ message: "Đã đăng xuất" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    const { email } = req.query
    if (!email) {
      throw new Error('Email không được để trống');
    }
    else {
      const user = await db.User.findOne({
        where: { email: email }
      })
      if (!user) {
        throw new Error('Email không hợp lệ') 
      }
      else {
        const resetToken = crypto.randomBytes(32).toString('hex');
        const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const passwordResetExpires = Date.now() + 15 * 60 * 1000;
        await db.User.update(
          { passwordResetToken: passwordResetToken, passwordResetExpires: passwordResetExpires },
          { where: { email: email } }
        )
        const html = `Hãy click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ khi bạn nhận mail này <a href=${process.env.URL_CLIENT}/reset-password/${email}/${resetToken}>Click here!</a>`
        const data = {
          email : email,
          html: html
        }
        const response = await SendMail(data);
        res.status(200).json(response)
      }
    }
  }
};

module.exports = AuthController;
