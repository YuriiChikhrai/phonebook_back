const { Router } = require("express");
const passport = require("passport");
const { validate } = require("../middlewares");
const {
  registerUserValidation,
  loginUserValidation,
} = require("./auth.validation");
const { loginUserCtrl, registerUserCtrl } = require("./auth.controller");

const router = Router();

router.get("/", (req, res) => {
  res.json({
    a: {
      asdfasdfasd: " sadfsadfsadf sdf sdf ",
      asdfasdfasd2: " sadfsadfsadf sdf sdf ",
    },
    b: {
      asdfasdfasd: " sadfsadfsadf sdf sdf ",
      asdfasdfasd2: " sadfsadfsadf sdf sdf ",
    },
    c: {
      asdfasdfasd: " sadfsadfsadf sdf sdf ",
      asdfasdfasd2: " sadfsadfsadf sdf sdf ",
    },
    d: Date.now(),
  });
});

router.post(
  "/login",
  validate(loginUserValidation),
  passport.authenticate("local", {}),
  loginUserCtrl
);

router.post("/register", validate(registerUserValidation), registerUserCtrl);

module.exports = router;
