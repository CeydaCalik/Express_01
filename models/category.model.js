const { Schema, model } = require("mongoose");

const categorySchema = new Schema();

const Category = model('Category', categorySchema);

//faut renvoyer le model
module.exports = Category;