const { Schema, model } = require("mongoose");

const taskSchema = new Schema();

const Task = model('Task', taskSchema);

//faut renvoyer le model
module.exports = Task;