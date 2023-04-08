const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    required: true,
    unique: true,
    type: String,
  },
});

const CategoryModel = mongoose.model("categorie", CategorySchema);
module.exports = CategoryModel;
