const mongoose = require("mongoose");

//function to connect to MONGODB
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Connected");
}).catch(err=>{
    console.log("MongoDB error:"+err);
})


module.exports = mongoose.connection;