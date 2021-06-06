const { celebrate } = require("celebrate");

exports.validate = (schema, options = {}) => {
  return celebrate(schema, { ...options, stripUnknown: { objects: true } });
};

exports.isAuthorized = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next({
      code: 401,
      message: "unauthorized",
    });
  }
  next();
};
