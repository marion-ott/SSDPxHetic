const Sector = {
	users(parent, args, {prisma}) {
		return prisma.sector({id: parent.id}).users()
	},
	hotels(parent, args, {prisma}) {
		return prisma.sector({id: parent.id}).hotels()
	}
}

export default Sector
