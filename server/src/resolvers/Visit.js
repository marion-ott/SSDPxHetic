const Visit = {
	team(parent, args, {prisma}) {
		return prisma.visit({id: parent.id}).team()
	},
	hotel(parent, args, {prisma}) {
		return prisma.visit({id: parent.id}).hotel()
	}
}

export default Visit
