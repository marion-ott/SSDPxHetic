import {GraphQLServer, PubSub} from 'graphql-yoga'
import {prisma} from './generated/prisma-client'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Team from './resolvers/Team'
import Hotel from './resolvers/Hotel'
import Visit from './resolvers/Visit'
import Sector from './resolvers/Sector'
import Resident from './resolvers/Resident'
import Subscription from './resolvers/Subscription'
import Schedule from './resolvers/Schedule'

const resolvers = {
	Query,
	Mutation,
	User,
	Team,
	Hotel,
	Visit,
	Sector,
	Resident,
	Subscription,
	Schedule
}

const pubsub = new PubSub()

const server = new GraphQLServer({
	typeDefs: 'src/schema.graphql',
	resolvers,
	context(request) {
		return {
			prisma,
			pubsub,
			request
		}
	}
})

server.start({port: process.env.PORT || 9000}, () =>
	console.log(`Server started ${process.env.PORT}`)
)
