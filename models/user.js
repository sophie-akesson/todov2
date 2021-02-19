const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: String,
  tokenExpirationDate: Date,
  ToDoList: [
    {
      name: { type: String, required: true },
      dueDate: { type: Date, default: Date.now },
      status: { type: String, required: true},
    },
  ],
});

userSchema.methods.addToDo = function(object) {
  this.ToDoList.push(object);
  this.save();
}

const User = mongoose.model("user", userSchema);

module.exports = User;