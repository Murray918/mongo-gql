// seeds can be run like this
// seed(User, users).then(result => console.log(result))
// seed(Hobby, hobbies).then(result => console.log(result))


const users = [
	{
		first_name: 'Melanie',
		last_name: 'McGuire',
		email: 'party@party.com'
	},
	{
		first_name: 'Andrew',
		last_name: 'Murray',
		email: 'party@party.com'
	},
	{
		first_name: 'Caleb',
		last_name: 'Holland',
		email: 'party@party.com'
	},
	{
		first_name: 'Daniel',
		last_name: 'St. Clair',
		email: 'party@party.com'
	},
	{
		first_name: 'Devin',
		last_name: 'Hanley',
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
