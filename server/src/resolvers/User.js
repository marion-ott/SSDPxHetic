const User = {
	sector(parent, args, {prisma}) {
		return prisma.user({id: parent.id}).sector()
	}
}

export default User
