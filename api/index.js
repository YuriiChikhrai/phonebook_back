const { Router } = require("express");
const router = Router();

const VersionOne = require("./v1");
const VersionTwo = require("./v2");

router.use("/v1", VersionOne);

router.use("/v2", VersionTwo);

// Default fallback
router.use("/", VersionOne);

module.exports = router;
