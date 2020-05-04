import {GraphQLServer} from 'graphql-yoga'
import {prisma} from './generated/prisma-client'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Hotel from './resolvers/Hotel'
import Sector from './resolvers/Sector'

const resolvers = {
	Query,
	Mutation,
	User,
	Hotel,
	Sector
}

const server = new GraphQLServer({
	typeDefs: 'src/schema.graphql',
	resolvers,
	context: req => ({
		...req,
		prisma
	})
})

server.start({port: process.env.PORT || 9000}, () =>
	console.log(`Server started ${process.env.PORT}`)
)
