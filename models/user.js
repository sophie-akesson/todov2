const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: String,
  tokenExpirationDate: Date,
  toDoList: [
    {
      name: { type: String, required: true },
      dueDate: { type: Date, default: Date.now },
      status: { type: String, required: true},
    },
  ],
});

userSchema.methods.addToDo = function(object) {
  this.toDoList.push(object);
  this.save();
}

userSchema.methods.removeToDo = function(id) {
  for(let i = 0; i < this.toDoList.length; i++) {
    if(this.toDoList[i]._id == id){
      this.toDoList.splice(i, 1);
    }
  }
  this.save();
}

const User = mongoose.model("user", userSchema);

module.exports = User;