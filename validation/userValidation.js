const { body } = require("express-validator");

module.exports.registerValidation = [
  body("name").not().isEmpty().trim().withMessage("Name is required."),
  body("email").isEmail().normalizeEmail().withMessage("Email is required."),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password should be 6 characters."),
];

module.exports.loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage("Email is Required."),
  body('password').not().isEmpty().withMessage("Password is Required.")
]