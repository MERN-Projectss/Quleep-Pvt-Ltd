const express = require('express')
const router = express.Router();

const {createProduct ,getProduct,uploadImg} = require("../controller/productController")

router.post("/products", createProduct)
router.get("/products/", getProduct)
router.patch("/products/", uploadImg)

module.exports = router