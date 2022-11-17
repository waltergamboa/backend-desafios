const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
    type: String,
    require: true,
    trim: true,
    max: 50
    },
    email: {
    type: String,
    required: true,
    trim: true,
    max: 50,
    unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        max: 50
    }
});

module.exports = mongoose.model("Usuarios", UserSchema);
