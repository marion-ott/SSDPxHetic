const Schedule = {
	sector(parent, args, {prisma}) {
		return prisma.schedule({id: parent.id}).sector()
	},
	shift(parent, args, {prisma}) {
		return prisma.schedule({id: parent.id}).shift()
	}
}

export default Schedule
