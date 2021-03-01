const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: String,
  tokenExpirationDate: Date,
  toDoList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "todo",
    },
  ],
});

userSchema.methods.addToDo = function(object) {
  this.toDoList.push(object);
  this.save();
}

const User = mongoose.model("user", userSchema);

module.exports = User;