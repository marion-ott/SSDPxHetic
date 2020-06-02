import {generateSearchIndex, getAuthUserId} from './../utils'

const Query = {
	/** USERS */
	user(parent, {id}, {prisma, request}) {
		return prisma.user({id})
	},
	users(parent, args, {prisma}) {
		const opArgs = {
			// where: {
			// 	role: 'USER'
			// },
			first: args.first,
			skip: args.skip,
			orderBy: args.orderBy
		}

		if (args.query) {
			const input = generateSearchIndex(args.query)
			opArgs.where = {
				...opArgs.where,
				searchIndex_contains: input
			}
		}
		return prisma.users(opArgs)
	},

	/** AUTH */
	checkAuth(parent, args, {prisma, request}) {
		const id = getAuthUserId(request)
		return prisma.user({id})
	},

	/** TEAMS */
	team(parent, {id}, {prisma, request}) {
		return prisma.team({id})
	},
	teams(parent, args, {prisma}) {
		return prisma.teams()
	},

	/** HOTELS */
	hotel(parent, {id}, {prisma}) {
		return prisma.hotel({id})
	},
	hotels(parent, args, {prisma, request}) {
		const opArgs = {
			where: {},
			first: args.first,
			skip: args.skip,
			orderBy: args.orderBy
		}

		if (args.query) {
			const input = generateSearchIndex(args.query)
			opArgs.where = {
				searchIndex_contains: input
			}
		}

		return prisma.hotels(opArgs)
	},

	/** VISITS */
	visit(parent, {id}, {prisma}) {
		return prisma.visit({id})
	},
	visits(parent, args, {prisma}) {
		const opArgs = {
			where: {},
			first: args.first,
			skip: args.skip,
			orderBy: args.orderBy
		}

		return prisma.visits(opArgs)
	},

	/** SECTORS */
	sector(parent, {id}, {prisma}) {
		return prisma.sector({id})
	},
	sectors(parent, args, {prisma}) {
		return prisma.sectors()
	},

	/** RESIDENTS */
	resident(parent, {id}, {prisma, request}) {
		return prisma.resident({id})
	},
	residents(parent, args, {prisma}) {
		const opArgs = {
			where: {},
			first: args.first,
			skip: args.skip,
			orderBy: args.orderBy
		}

		return prisma.residents(opArgs)
	},

	/** COUNT */
	count(parent, args, {prisma}) {
		const opArgs = {
			where: {}
		}

		if (args.query) {
			const input = generateSearchIndex(args.query)
			opArgs.where = {
				searchIndex_contains: input
			}
		}

		if (args.type === 'hotels') {
			return prisma
				.hotelsConnection(opArgs)
				.aggregate()
				.count()
		}

		if (args.type === 'users') {
			return prisma
				.usersConnection(opArgs)
				.aggregate()
				.count()
		}

		if (args.type === 'residents') {
			return prisma
				.residentsConnection(opArgs)
				.aggregate()
				.count()
		}
		return null
	}
}

export default Query
