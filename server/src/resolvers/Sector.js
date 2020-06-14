const Sector = {
	users(parent, args, {prisma}) {
		return prisma.sector({id: parent.id}).users()
	},
	hotels(parent, args, {prisma}) {
		return prisma.sector({id: parent.id}).hotels()
	},
	teams(parent, args, {prisma}) {
		return prisma.sector({id: parent.id}).teams()
	}
}

export default Sector
