const AuthorizationError = require("../errors/AuthorizationError");

const authorizeAdmin = (req, res, next) => {
  try {
    const { user_role } = req.auth;

    if (user_role != 1) {
      throw new AuthorizationError(
        "Hanya admin yang dapat mengakses endpoint ini"
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorizeAdmin;
