const { Router } = require("express");
const router = Router();

router.use("/auth", (req, res) => {
    res.send("Auth v2");
});

module.exports = router;
