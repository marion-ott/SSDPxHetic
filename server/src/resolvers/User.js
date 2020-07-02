const User = {
	sector(parent, args, {prisma}) {
		return prisma.user({id: parent.id}).sector()
	},
	// Never send back user password value
	password(parent, args, {prisma, request}) {
		return null
	},
	teams(parent, args, {prisma}) {
		return prisma.user({id: parent.id}).teams()
	}
}

export default User
