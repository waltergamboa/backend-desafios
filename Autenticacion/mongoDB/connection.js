const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        const url = "mongodb+srv://wgamboa:wgamboa1@cluster0.jqgfgcs.mongodb.net/?retryWrites=true&w=majority"
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
