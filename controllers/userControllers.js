const { validationResult } = require("express-validator");
const UserModel = require("../models/User");
const {
  hashedPassword,
  createToken,
  comparePassword,
} = require("../Auth/auth");

// register
module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, email, password } = req.body;
    const emailExist = await UserModel.findOne({ email });
    try {
      if (!emailExist) {
        const hashed = await hashedPassword(password);
        const user = await UserModel.create({
          name,
          email,
          password: hashed,
        });
        const token = createToken({ id: user._id, name: user.name });
        res.status(201).json({ msg: "Account Created Successfully..!", token });
      } else {
        return res.status(400).json({ msg: `${email} already Taken.` });
      }
    } catch (error) {
      return res.status(500).json("server internal error.");
    }
  } else {
    return res.status(400).json(errors.array());
  }
};

// login
module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        if (await comparePassword(password, user.password)) {
          const token = createToken({ id: user._id, name: user.name });
          if (user.admin) {
            return res.status(201).json({ token, admin: true });
          } else {
            return res.status(201).json({ token, admin: false });
          }
        } else {
          return res
            .status(401)
            .json({ errors: [{ msg: "Password not matched." }] });
        }
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: `${email} is not found.` }] });
      }
    } catch (error) {
      return res.status(500).json("Server Internal Error.");
    }
  } else {
    return res.status(400).json(errors.array());
  }
};
