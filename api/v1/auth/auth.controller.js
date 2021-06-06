const { registerUser, compareUserPassword } = require("../user/user.service");

exports.loginUserCtrl = async (req, res, next) => {
  try {
    res.json({
      message: "login success",
      user: req.user,
    });
  } catch (e) {
    next(e);
  }
};

exports.registerUserCtrl = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await registerUser(email, password, firstName, lastName);
    res.json({
      message: "register success",
      user: user._id,
    });
  } catch (e) {
    next(e);
  }
};
