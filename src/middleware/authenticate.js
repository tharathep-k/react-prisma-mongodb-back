const tokenService = require("../service/token-service");
const authService = require("../service/auth-service");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer")) {
      res.status(401).json("Unauthorized");
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      res.status(401).json("Unauthorized");
    }
    const payload = tokenService.verify(token);

    const user = await authService.getUserById(payload.id);

    if (!user) {
      res.status(401).json("Unauthorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
