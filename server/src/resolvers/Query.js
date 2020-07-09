import {generateSearchIndex, getAuthUserId} from './../utils'
import moment from 'moment'

const Query = {
	/** USERS */
	user(parent, args, {prisma, request}) {
		return prisma.user({id: args.id})
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
	async checkAuth(parent, args, {prisma, request}) {
		const res = {
			success: false,
			user: null
		}
		const header = request.request.headers.authorization

		if (!header) {
			return res
		}

		const id = getAuthUserId(request)

		if (!id) {
			return res
		}
		const user = await prisma.user({id})

		if (!user) {
			return res
		}

		return {
			success: true,
			id
		}
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
	visits(parent, {start, end}, {prisma}) {
		return prisma.visits({
			where: {
				AND: [{date_gte: start}, {date_lte: end}]
			}
		})
	},

	async myVisits(parent, {date, teamId}, {prisma}) {
		const items = []
		const visits = await prisma.visits({
			where: {
				date
			}
		})

		for (const visit of visits) {
			const visitTeam = await prisma.visit({id: visit.id}).team({})

			if (visitTeam.id === args.teamId) {
				items.push(visit)
			}
		}

		return items
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

	/** SHIFTS */
	shift(parent, {id}, {prisma, request}) {
		return prisma.shift({id})
	},
	shifts(parent, args, {prisma}) {
		const opArgs = {
			where: {},
			first: args.first,
			skip: args.skip,
			orderBy: args.orderBy
		}

		return prisma.shifts(opArgs)
	},

	/** SCHEDULES */
	schedule(parent, {id}, {prisma, request}) {
		return prisma.schedule({id})
	},
	schedules(parent, args, {prisma}) {
		const opArgs = {
			where: {},
			first: args.first,
			skip: args.skip,
			orderBy: args.orderBy
		}

		return prisma.schedules(opArgs)
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
