const express = require("express")
const userRoutes = express.Router()
const { signUp ,logIn,getUser,logout } = require("../controller/user.controller")
const {tokenverify}= require('../helpers/tokenVerify')
const passport = require("passport");
const {isAuthenticate} = require('../helpers/passport')

userRoutes.post('/signup', signUp)
userRoutes.post('/login',passport.authenticate("local"), logIn)
userRoutes.get('/profile', tokenverify,getUser )
userRoutes.get('/logout',logout )

module.exports = userRoutes;