const Mutation = {
	createUser(parent, {input}, context) {
		return context.prisma.createUser(input)
	},
	updateUser(parent, {id, input}, context) {
		return context.prisma.updateUser({id}, {input})
	},
	deleteUser(parent, {id}, context) {
		return context.prisma.deleteUser({id})
	},
	createHotel(parent, {input}, context) {
		return context.prisma.createHotel(input)
	},
	updateHotel(parent, {id, input}, context) {
		return context.prisma.updateHotel({id}, {input})
	},
	deleteHotel(parent, {id}, context) {
		return context.prisma.deleteHotel({id})
	},
	createSector(parent, {input}, context) {
		return context.prisma.createSector(input)
	},
	updateSector(parent, {id, input}, context) {
		return context.prisma.updateSector({id}, {input})
	},
	deleteSector(parent, {id}, context) {
		return context.prisma.deleteSector({id})
	}
}

export default Mutation
