const express = require('express');
const router = express.Router();
// const cors = require('cors');
const mongoose = require('mongoose');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

router.use(cors());
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({error:'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(200).json({message:"signup success you can login now"})

    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {

        if (!email || !password) {
            return res.status(422).json({ error: "plase add all the fields" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "user dosent exist with that email" })
        }
        const doMatch = await bcrypt.compare(password, user.password)
        if (doMatch) {
            const token = jwt.sign(
                {
                    userId: user._id
                }, "khalidmansoor")
            res.status(201).json({ token })
        } else {
            return res.status(401).json({ error: "email or password is invalid" })
        }

    } catch (err) {
        console.log(err)
    }

})


module.exports = router;
