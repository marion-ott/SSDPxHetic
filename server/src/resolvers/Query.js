import getAuthUserId from './../utils/getAuthUserId'

const Query = {
	user(parent, {id}, {prisma, request}) {
		const userId = getAuthUserId(request)
		return prisma.user({id})
	},
	users(parent, args, {prisma}) {
		const opArgs = {
			where: {},
			first: args.first,
			skip: args.skip,
			orderBy: args.orderBy
		}

		//TODO: create field with name in lowercase with no accent to handle search query
		if (args.query) {
			opArgs.where = {
				searchIndex_contains: args.query
			}
		}
		return prisma.users(opArgs)
	},
	hotel(parent, {id}, {prisma}) {
		return prisma.hotel({id})
	},
	hotels(parent, args, {prisma}) {
		const opArgs = {
			where: {},
			first: args.first,
			skip: args.skip,
			orderBy: args.orderBy
		}

		//TODO: create field with name in lowercase with no accent to handle search query
		if (args.query) {
			opArgs.where = {
				searchIndex_contains: args.query
			}
		}
		return prisma.hotels(opArgs)
	},
	sector(parent, {id}, {prisma}) {
		return prisma.sector({id})
	},
	sectors(parent, args, {prisma}) {
		return prisma.sectors()
	},
	count(parent, args, {prisma}) {
		if (args.query === 'hotels') {
			return prisma
				.hotelsConnection()
				.aggregate()
				.count()
		}
		return prisma
			.usersConnection()
			.aggregate()
			.count()
	}
}

export default Query
