const jwt = require('jsonwebtoken')
const userModel = require("../model/user.model")

exports.tokenverify = async (req, res, next) => {
    let token = req.headers["authorization"].split(' ')[1]
    let { userId } = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await userModel.findById(userId);
    if (req.user) {
        next();
    }
    else {
        res.json({ message: "user invaild" });
    }
}