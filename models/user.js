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

userSchema.methods.removeToDo = function(id) {
  for(let i = 0; i < this.toDoList.length; i++) {
    if(this.toDoList[i]._id == id){
      this.toDoList.splice(i, 1);
    }
  }
  this.save();
}

userSchema.methods.completeToDo = function(id) {
  for(let i = 0; i < this.toDoList.length; i++) {
    if(this.toDoList[i]._id == id){
      this.toDoList[i].status = "complete";
    }
  }
  this.save();
}

userSchema.methods.toggleStarredToDo = function(id) {
  for(let i = 0; i < this.toDoList.length; i++) {
    if(this.toDoList[i]._id == id && this.toDoList[i].starred == false){
      this.toDoList[i].starred = true;
    }
    else if(this.toDoList[i]._id == id && this.toDoList[i].starred == true){
      this.toDoList[i].starred = false;
    }
  }
  this.save();
}

const User = mongoose.model("user", userSchema);

module.exports = User;