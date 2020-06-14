const Team = {
	users(parent, args, {prisma}) {
		return prisma.team({id: parent.id}).users()
	},
	visits(parent, args, {prisma}) {
		return prisma.team({id: parent.id}).visits()
	},
	sector(parent, args, {prisma}) {
		return prisma.team({id: parent.id}).sector()
	}
}

export default Team
