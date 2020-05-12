const Team = {
	users(parent, args, {prisma}) {
		return prisma.team({id: parent.id}).users()
	}
}

export default Team
