const mongoose = require("mongoose");

const userSchema =  mongoose.Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String,
            
        },
        password: {
            type: String,
            
        },
        isAvatarImageSet: {
            type: Boolean,
            default: false
        },
        avatarImage: {
            type: String,
            default: "",
        }
    },
    {
        timestamp: true
    }

);

module.exports = mongoose.model("Users", userSchema)