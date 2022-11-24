const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        const url = process.env.MONGO_DB;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB conectada")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
