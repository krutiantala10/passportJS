const userModel = require("../model/user.model")
const jwt = require('jsonwebtoken')
const passport = require("passport");
const bcrypt = require('bcrypt')

exports.signUp = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await userModel.findOne({ email: email, isDelete: false });
        if (user) {
            return res.json({ message: "User already exists" });
        }
        let hashPassword = await bcrypt.hash(password, 10);
        user = await userModel.create({
            name,
            email,
            password: hashPassword
        });
        user.save();
        res.status(201).json({ user, message: "user is added" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error..." });
    }
}

exports.logIn = async (req, res) => {
    try {
        // console.log(req.body);
        let { email, password } = req.body
        let user = await userModel.findOne({ email: email, isDelete: false })
        if (!user) {
            return res.json({ message: "user is not found" })
        }
        let checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.json({ message: "incorrect password" })
        }
        let payload = {
            userId: user._id
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY)
        res.status(201).json({ token, message: "user is login" });
        // res.status(201).json({message: "user is login" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error..." });
    }
}

exports.getUser = async (req, res) => {
    try {
        res.json(req.user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error..." });
    }
}

exports.logout = async (req, res) => {
    try {
        req.logout()
        res.send('Logged out')
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error..." });
    }
}