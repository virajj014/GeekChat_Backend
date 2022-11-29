const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = mongoose.model("Message");
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");


router.post('/savemessagetodb', async (req, res) => {
    const { senderid, message, roomid, recieverid } = req.body;
    console.log("MESSAGE RECEIVED - ", req.body);
    try {
        const newMessage = new Message({
            senderid,
            message,
            roomid,
            recieverid
        })
        await newMessage.save();
        res.send({ message: "Message saved successfully" });
    } catch (err) {
        res.status(422).send(err.message);
    }
});


router.post('/getmessages', async (req, res) => {
    const { roomid } = req.body;
    console.log("ROOM ID RECEIVED - ", roomid);

    Message.find({ roomid: roomid })
        .then(messages => {
            res.status(200).send(messages);
        })
        .catch(err => {
            console.log(err);
        });
});


router.post('/setusermessages', async (req, res) => {
    const { ouruserid, fuserid, lastmessage, roomid} = req.body;
    console.log("MESSAGE ID RECEIVED - ", fuserid);
    User.findOne({ _id: ouruserid })
        .then(user => {
            user.allmessages.map((item) => {
                if(item.fuserid == fuserid){
                    user.allmessages.pull(item);
                }
            })
            const date = Date.now();
            user.allmessages.push({ ouruserid , fuserid, lastmessage, roomid ,date });
            user.save()
            res.status(200).send({ message: "Message saved successfully" });
        })
        .catch(err => {
            console.log(err);
            res.status(422).send(err.message);
        });
});


router.post('/getusermessages', async (req, res) => {
    const { userid } = req.body;
    console.log("USER ID RECEIVED - ", userid);
    User.findOne({ _id: userid })
        .then(user => {
            res.status(200).send(user.allmessages);
        })
        .catch(err => {
            console.log(err);
            res.status(422).send(err.message);
        });
});


module.exports = router;
