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
		hobbies: [Hobby]
	}

	type Hobby {
		id: ID!
		name: String
	}

	type Query {
		users: [User]
		hobbies: [Hobby]
	}

	input CreateUserHobby {
		userId: ID!
		hobbyId: ID!
	}

	type CreateUserHobbyPayload {
		user: User
		success: Boolean!
		error: String
	}

	type Mutation {
		createUserHobby(input: CreateUserHobby): CreateUserHobbyPayload
	}
`

const getAllUsers = async () => {
	try {
		return await User.find()
	} catch (error) {
		return error.message
	}
}

const getAllHobbies = async () => {
	try {
		return await Hobby.find()
	} catch (error) {
		return error.message
	}
}

const createUserHobby = async (_, { input }) => {
	try {
		const { userId, hobbyId } = input
		console.log(1111, input)

		const oldUser = await User.findById(userId)
		console.log(2222, oldUser)
		const hobby = await Hobby.findById(hobbyId)
		console.log(3333, hobby)
		oldUser.userHobbies.push(hobby)
		const user = await oldUser.save()
        console.log(user)
		return {
			user: user,
			success: true,
			error: null
		}
	} catch (error) {
		return {
			user: null,
			success: false,
			error: error.message
		}
	}
}

const Mutation = {
	createUserHobby
}

const Query = {
	users: getAllUsers,
	hobbies: getAllHobbies
}

const resolvers = {
	Query,
	Mutation
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
