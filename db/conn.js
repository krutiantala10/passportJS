const mongoose = require("mongoose")
exports.DBconnect=()=>{
     mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB is Connected...");
    })
    .catch((err) => {
      console.log(err);
    });

}