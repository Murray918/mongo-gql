const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { User, Hobby } = require('./models')

/************** Mongo Connection Options ******************/
const PORT = 8080
const url = 'mongodb://localhost:27017/hobbies'
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}

const db = require('./config/db')(url, options)
/************************ GRAPHQL **************************/
const typeDefs = gql`
	type User {
		id: ID!
		firstName: String
		lastName: String
		email: String
	}

	type Hobby {
		id: ID!
		name: String
	}

	type Query {
		users: [User]
	}
`


const getAllUsers = async () => {
	try {
		return await User.find()
	} catch (error) {
		return Error(error.message)
	}
}

const resolvers = {
	Query: {
		users: getAllUsers
	}
}

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
