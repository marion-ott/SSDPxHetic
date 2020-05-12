const Hotel = {
	sector(parent, args, {prisma}) {
		return prisma.hotel({id: parent.id}).sector()
	},
	residents(parent, args, {prisma}) {
		return prisma.hotel({id: parent.id}).residents()
	}
}

export default Hotel
