const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const PORT = 8080

let app = express()

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

const server = new ApolloServer({ typeDefs, resolvers })

//set up with express
server.applyMiddleware({ app })

app.listen({ port : PORT}, (url) => {
	console.log(`
    YOUR SERVER IS LISTENING ON PORT: ${PORT}
    YOUR GQL PLAYGROUND IS RUNNING AT : http://localhost:${PORT}${server.graphqlPath}
    `)
})
