const express = require("express");
const { categoryValidation } = require("../validation/categoryValidation");
const { createCategory } = require("../controllers/categoryController");
const router = express.Router();

router.post("/create-category", categoryValidation, createCategory);

module.exports = router;
