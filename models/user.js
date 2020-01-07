const mongoose, { Schema } = require('mongoose')

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
