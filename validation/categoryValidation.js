const { body } = require("express-validator");

module.exports.categoryValidation = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Please Create Category."),
];
