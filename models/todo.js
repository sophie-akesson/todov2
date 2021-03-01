const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
      name: { type: String, required: true },
      dueDate: { type: Date, default: Date.now },
      status: { type: String, required: true},
      starred: { type: Boolean, default: false }
});

const ToDo = mongoose.model("todo", toDoSchema);

module.exports = ToDo;