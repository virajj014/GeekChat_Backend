const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: '',
        // required: true
    },
    posts: {
        type: Array,
        default: []
    }
})


// userSchema.pre('sa')

mongoose.model("User", userSchema);