var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const { Product } = require("../models");

const v = new Validator();

/* GET products listing. */
router.get("/", async (req, res, next) => {
  const products = await Product.findAll();
  return res.json(products);
});

/* GET product by id. */
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const products = await Product.findByPk(id);
  return res.json(products || {});
});

/* POST product OR Create product. */
router.post("/", async (req, res, next) => {
  const schema = {
    name: "string",
    brand: "string",
    description: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const product = await Product.create(req.body);
  res.json(product);
});

/* UPDATE product by id. */
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  // cek data
  let product = await Product.findByPk(id);

  if (!product) {
    return res.json({
      message: "Data not found",
    });
  }

  const schema = {
    name: "string|optional",
    brand: "string|optional",
    description: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  // update data
  product = await product.update(req.body);
  res.json(product);
});

/* DELETE product by id. */
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  // cek data
  let product = await Product.findByPk(id);

  if (!product) {
    return res.json({
      message: "Data not found",
    });
  }

  // delete data
  product = await product.destroy();
  res.json({
    message: "Product deleted.",
  });
});

module.exports = router;
