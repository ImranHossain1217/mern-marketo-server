const express = require("express");
const router = express.Router();
const { registerValidation, loginValidation } = require("../validation/userValidation");
const { register, login } = require("../controllers/userControllers");

router.post("/register", registerValidation, register);
router.post("/login",loginValidation,login);

module.exports = router;
