const { Router } = require("express");
const { isAuthorized } = require("./middlewares");
const router = Router();

router.use("/auth", require("./auth"));

router.use("/user", isAuthorized, require("./user"));

module.exports = router;
