var express = require("express");
var router = express.Router();

router.get("/json", (req, res, next) => {
  res.json({
    message: "Learn create restapi with nodejs and mysql",
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
