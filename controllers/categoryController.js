const { validationResult } = require("express-validator");
const CategoryModel = require("../models/Category");

module.exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name } = req.body;
    const existCategory = await CategoryModel.findOne({ name });
    if (!existCategory) {
      const category = await CategoryModel.create({
        name,
      });
      res.status(201).json({ msg: "Category Create Successfully." });
    } else {
      return res.status(400).json({ msg: `${name} category already created.` });
    }
  } else {
    return res.status(401).json(errors.array());
  }
};
