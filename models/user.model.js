const { Schema, model } = require("mongoose");
const userSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
  
    isActive: {
        type: Boolean,
        default:true
        
    }
});
const UserModel = model("UserModel", userSchema);
module.exports = UserModel;
