const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    prompt: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Prompt"
        }
    ]
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  

userSchema.pre("save", async function (next) {
    if (!this.isModified) { //it works during update if password is not altered then it will exit from pre middleware of mongoose
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


module.exports = mongoose.model('User', userSchema);