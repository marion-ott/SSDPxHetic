const Hotel = {
	sector(parent, args, {prisma}) {
		return prisma.hotel({id: parent.id}).sector()
	}
}

export default Hotel
