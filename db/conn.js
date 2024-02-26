const mongoose = require("mongoose")
exports.DBconnect=()=>{
     mongoose.connect("mongodb://127.0.0.1:27017/rent-app")
    .then(() => {
      console.log("DB is Connected...");
    })
    .catch((err) => {
      console.log(err);
    });

}