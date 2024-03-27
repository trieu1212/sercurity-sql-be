const bcrypt = require("bcryptjs");
const db = require("../orm/models/index");
const jwt = require("jsonwebtoken");
const AuthController = {
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
    const { username, password, email } = req.body;
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const newUser = await db.User.create({
        username: username,
        email: email,
        password: hashPassword,
        refreshToken: null,
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
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
          const { password, ...info } = user.dataValues;
          res.status(200).json({ ...info, accessToken, refreshToken });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  refresh: async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).json({ message: "User not authenticated" });
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
              } else {
                const newAccessToken =
                  AuthController.generateAccessToken(decoded);
                const newRefreshToken =
                  AuthController.generateRefreshToken(decoded);
                await db.User.update(
                  { refreshToken: newRefreshToken },
                  { where: { refreshToken: refreshToken } }
                );
                res.status(200).json({
                  accessToken: newAccessToken,
                  refreshToken: newRefreshToken,
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
  logoutUser: async (req, res) => {
    const { refreshToken } = req.body;
    try {
      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }

      const user = await db.User.findOne({
        where: { refreshToken: refreshToken },
      });

      if (!user) {
        return res.status(403).json({ message: "Refresh token not valid" });
      }

      await db.User.update(
        { refreshToken: null },
        { where: { refreshToken: refreshToken } }
      );

      return res.status(200).json({ message: "User logged out" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = AuthController;
