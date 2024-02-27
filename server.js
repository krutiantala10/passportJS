const express = require("express")
const app = express()
require("dotenv").config();
const jwt = require('jsonwebtoken')
// const path = require('path');
const port = process.env.PORT;

const session = require('express-session')
const{DBconnect}= require('./db/conn')
const userRoutes = require("./routes/user.routes");
const passport = require("passport");
const {initializingPassport}= require('./helpers/passport')

DBconnect()
initializingPassport(passport)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({secret:process.env.SECRET_KEY,resave:false,saveUninitialized:true}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})