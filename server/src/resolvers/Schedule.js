const Schedule = {
	shift(parent, args, {prisma}) {
		return prisma.schedule({id: parent.id}).shift()
	},
	sector(parent, args, {prisma}) {
		return prisma.schedule({id: parent.id}).sector()
	}
}

export default Schedule
