const Resident = {
	hotel(parent, args, {prisma}) {
		return prisma.resident({id: parent.id}).hotel()
	}
}

export default Resident
