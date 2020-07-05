import {generateSearchIndex, getAuthUserId} from './../utils'
import moment from 'moment'

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
			user
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
	visits(parent, args, {prisma}) {
		const opArgs = {
			where: {},
			first: args.first,
			skip: args.skip,
			orderBy: args.orderBy
		}

		if (args.query) {
			const input = generateSearchIndex(args.query)
			opArgs.where = {
				date: args.query
			}
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
	},

	async test(parent, {id}, {prisma}, info) {
		// const now = moment().startOf('week')
		// // const data = await prisma.sector({id}).schedules({
		// // 	where: {
		// // 		startDate: now
		// // 	}
		// // })

		// const schedule = await prisma.sector({id}).schedules({
		// 	where: {
		// 		startDate: now
		// 	}
		// })

		// const shift = await prisma.schedule({id: schedule[0].id}).shift()
		// const test = await prisma.shift({index: shift.index + 1})

		const sectors = await prisma.sectors()
		for (const sector of sectors) {
			const now = moment()
				.add(5, 'weeks')
				.startOf('week')
			const startDate = moment(now)
				.add(1, 'weeks')
				.startOf('week')
			const endDate = moment(startDate)
				.add(7, 'days')
				.startOf('day')

			const shifts = await prisma.shifts()
			const schedule = await prisma.sector({id: sector.id}).schedules({
				where: {
					endDate: now
				}
			})

			const shift = await prisma.schedule({id: schedule[0].id}).shift()

			let newIndex = shift.index + 1
			if (shifts.length === shift.index) {
				newIndex = 1
			} else {
				newIndex = shift.index + 1
			}

			const newShift = shifts.find(el => el.index === newIndex)

			const entry = {
				shift: newShift,
				sector: {
					connect: {
						id: sector.id
					}
				},
				startDate,
				endDate
			}

			//await prisma.createSchedule(entry)
		}

		return 'OK'
	}
}

export default Query
