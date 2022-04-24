const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : String,
    googleid : String
})

const User = mongoose.model("googleuser", userSchema);

module.exports = User;