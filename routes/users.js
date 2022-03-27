var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send(process.env.APP_NAME);
});

/* Test. */
router.get("/me", (req, res, next) => {
  res.send("Hello World! I'm Andito");
});

module.exports = router;
