import getAuthUserId from './../utils/getAuthUserId'

const User = {
	sector(parent, args, {prisma}) {
		return prisma.user({id: parent.id}).sector()
	},
	// Never send back user password value
	password(parent, args, {prisma, request}) {
		return null
	}
}

export default User
