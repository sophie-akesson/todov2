const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "A name is required."] },
  email: { type: String, required: [true, "An email is required."], unique: [true, "An account with this email already exists."] },
  password: { type: String, required: [true, "A password is required."] },
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