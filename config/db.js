const mongoose = require('mongoose')

module.exports = db

async function db(url, options) {
	try {
		mongoose.connection.once('open', function() {
			console.info('MongoDB event open')
			console.debug('MongoDB connected [%s]', url)

			mongoose.connection.on('connected', function() {
				console.info('MongoDB event connected')
			})

			mongoose.connection.on('disconnected', function() {
				console.warn('MongoDB event disconnected')
			})

			mongoose.connection.on('reconnected', function() {
				console.info('MongoDB event reconnected')
			})

			mongoose.connection.on('error', function(err) {
				console.error('MongoDB event error: ' + err)
			})

	
			return mongoose
		})

		return await mongoose.connect(url, options)
	} catch (error) {
		console.error('MongoDB connection error: ' + err)
		process.exit(1)
	}
}
