const mongoose = require('mongoose')
const { Schema } = mongoose

const hobbySchema = new Schema({
	name: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Hobby', hobbySchema)
