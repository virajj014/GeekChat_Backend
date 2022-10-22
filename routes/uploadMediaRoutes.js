const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

router.post('/setprofilepic', (req, res) => {
    const { email, profilepic } = req.body;


    // console.log("email: ", email);
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Credentials" })
            }
            savedUser.profilepic = profilepic;
            savedUser.save()
                .then(user => {
                    res.json({ message: "Profile picture updated successfully" })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/addpost', (req, res) => {
    const { email, post, postdescription } = req.body;

    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Credentials" })
            }
            savedUser.posts.push({ post, postdescription, likes: [], comments: [] });
            savedUser.save()
                .then(user => {
                    res.json({ message: "Post added successfully" })
                })
                .catch(err => {
                    res.json({ error: "Error adding post" })
                })
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = router;
