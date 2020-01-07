/// you can seed like this in server.js

// const { seed, users, hobbies } = require('./config/db.seed')

// seed(User, users)
// 	.then(result => console.log(result))
// 	.catch(error => console.error(error))
// seed(Hobby, hobbies)
// 	.then(result => console.log(result))
// 	.catch(error => console.error(error))


const users = [
	{
		firstName: 'Melanie',
		lastName: 'McGuire',
		email: 'party@party.com'
	},
	{
		firstName: 'Andrew',
		lastName: 'Murray',
		email: 'party@party.com'
	},
	{
		firstName: 'Caleb',
		lastName: 'Holland',
		email: 'party@party.com'
	},
	{
		firstName: 'Daniel',
		lastName: 'St. Clair',
		email: 'party@party.com'
	},
	{
		firstName: 'Devin',
		lastName: 'Hanley',
		email: 'party@party.com'
	}
]

var hobbies = [
	{
		name: 'party'
	},
	{
		name: 'cooking'
	},
	{
		name: 'guitar'
	},
	{
		name: 'monopolizing small companies'
	},
	{
		name: 'partying'
	}
]

async function seed(doc, items) {
	let Doc = doc
	console.log(Doc)
	try {
		const check = await Doc.find()
		if (check.length >= 0) {
			items.forEach(item => {
				newItem = new Doc(item)
				console.log(newItem)
				newItem.save()
			})
			console.log(1234, 'Successfully seeded Doc')
		}
		return 'No Items Seeded'
	} catch (error) {
		console.error(error)
	}
}

module.exports = {
	seed,
	users,
	hobbies
}
