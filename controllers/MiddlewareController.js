const jwt = require("jsonwebtoken");
const MiddlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
        return res.status(403).json({ message: "Token is not valid" });
        }
        else{
          req.user = user;
          next();
        }
      });
    } else {
      return res.status(401).json({ message: "You are not authorized" });
    }
  },
  verifyTokenAndAdminAuth: (req, res, next) => {
    MiddlewareController.verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "You are not allowed to do that" });
      }
    });
  },
  verifyTokenAndAuthorize: (req, res, next) => {
    MiddlewareController.verifyToken(req, res, () => {
      console.log(req.user.id);
      console.log(req.params.userId);
        if (req.user.id === +req.params.userId || req.user.isAdmin) {
            next(); 
        } else {
            return res.status(403).json({ message: "You are not allowed to do that" });
        }
    });
}
};

module.exports = MiddlewareController;
