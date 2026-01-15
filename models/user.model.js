const { Schema, model } = require("mongoose");

const userSchema = new Schema();

const User = model('User', userSchema);

//faut renvoyer le model
module.exports = User;