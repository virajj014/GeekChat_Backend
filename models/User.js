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
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    allmessages: {
        type: Array,
        default: []
    }
})


userSchema.pre('save', async function (next) {
    const user = this;
    console.log("Just before saving before hashing  ", user.password);
    if (!user.isModified('password')) {
        return next();
    }
    user.password = await bcrypt.hash(user.password, 8);
    console.log("Just before saving after hashing  ", user.password);
    next();
})

mongoose.model("User", userSchema);