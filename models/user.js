const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    firstName : String,
    lastName :String,
    email : String,
    externalId: String,
    userHobbies: []
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)
