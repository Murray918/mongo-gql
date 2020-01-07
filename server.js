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



const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { User, Hobby } = require('./models')

/************** Mongo Connection Options ******************/
const PORT = 8080
const url = 'mongodb://localhost:27017/hobbies'
const options = {
	useNewUrlParser: true
}

const db = require('./config/db')(url, options)
/************************ GRAPHQL **************************/
const typeDefs = gql`
	type Query {
		hello: String
	}
`

const resolvers = {
	Query: {
		hello: () => 'Hello Word'
	}
}
// seeds
seed(User, users).then(result => console.log(result))
seed(Hobby, hobbies).then(result => console.log(result))
/****************** SET UP THE SERVER BELOW *****************/
const server = new ApolloServer({ typeDefs, resolvers })

//instantiate express
let app = express()
//set up with express
server.applyMiddleware({ app })

app.listen({ port: PORT }, url => {
	console.log(`
    YOUR SERVER IS LISTENING ON PORT: ${PORT}
    YOUR GQL PLAYGROUND IS RUNNING AT : http://localhost:${PORT}${server.graphqlPath}
    `)
})

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

