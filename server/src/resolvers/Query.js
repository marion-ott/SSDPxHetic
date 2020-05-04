const Query = {
	user(parent, args, context) {
		return context.prisma.user({id: args.id})
	},
	users(parent, args, context) {
		return context.prisma.users()
	},
	hotel(parent, args, context) {
		return context.prisma.hotel({id: args.id})
	},
	hotels(parent, args, context) {
		return context.prisma.hotels()
	},
	sector(parent, args, context) {
		return context.prisma.sector({id: args.id})
	},
	sectors(parent, args, context) {
		return context.prisma.sectors()
	}
}

export default Query
