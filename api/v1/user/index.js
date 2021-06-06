const { Router } = require("express");
const router = Router();

const { getUserProfileDataCtrl } = require("./user.controller");

router.get("/", (req, res) => {
  res.send("User");
});

router.get("/profile", getUserProfileDataCtrl);

module.exports = router;
