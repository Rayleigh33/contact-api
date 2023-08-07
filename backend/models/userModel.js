const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: "String",
        required: [true,"pleaase enter your name"],
    },

    email: {
        type: "String",
        required: [true,"pleaase enter your email"],
        unique: [true,"email address already taken"],
    },

    password: {
        type: "String",
        required: [true,"pleaase enter password"],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("User",userSchema);