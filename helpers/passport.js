const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')

exports.initializingPassport = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "email", }, async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email: email })
                console.log(password);
                if (!user) {
                    return done(null, false, { message: 'No User Found' });
                }
                let matchPassword = await bcrypt.compare(password, user.password);
                if(!matchPassword){
                    return done(null, false, {message: 'Password not matched!'});
                }
                else
                {
                    return done(null, user);
                }
            } catch (error) {
                return done(error, false)
            }
        }
        ))

}


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id)
        done(null, user)
    } catch (error) {
        console.log("Error in deserialization", error)
        done(error)
    }
})

exports.isAuthenticate = (req, res, next) => {
    console.log(req.user)
    if (req.user)
        return next()
    else
    return res.send("You are not logged In")
}