const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

/*****************Connection Options*********************/
const PORT = 8080
const url = 'mongodb://localhost:27017/hobbies'
const options = {
	useNewUrlParser: true
}

/*************************GRAPHQL**************************/
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

/****************** SET UP THE SERVER BELOW *****************/
const server = new ApolloServer({ typeDefs, resolvers })

//instantiate mongo and listen
const db = require('./config/db')(url, options)

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
