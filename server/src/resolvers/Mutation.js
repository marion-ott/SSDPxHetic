import bcrypt from 'bcryptjs'
import {
	getAuthUserId,
	generateToken,
	hashPassword,
	generateSearchIndex,
	publishVisit
} from './../utils'

const Mutation = {
	/** AUTH */
	async login(parent, {data}, {prisma}) {
		const {email, password} = data

		const user = await prisma.user({email})
		if (!user) {
			throw new Error('user does not exist')
		}

		const isPwdCorrect = await bcrypt.compare(password, user.password)
		if (!isPwdCorrect) {
			throw new Error('incorrect password')
		}

		const token = await generateToken()

		return {
			token,
			user
		}
	},

	/** USERS */
	async createUser(parent, {data}, {prisma}) {
		data.password = await hashPassword(data.password)
		data.searchIndex = generateSearchIndex(data.firstName, data.lastName)
		const user = await prisma.createUser(data)
		const token = generateToken()

		return {
			user,
			token
		}
	},
	async updateUser(parent, {id, data}, {prisma, request}) {
		const userId = getAuthUserId(request)
		const requestingUser = await prisma.user({id})

		if (requestingUser.id !== userId && requestingUser.role === 'USER') {
			throw new Error(
				"The user doesn't exist or you don't have persmission to update the information."
			)
		}
		/**
		 * Prevent another user's password update
		 * Prevent the update of another ADMIN user
		 */
		if (requestingUser.role !== 'USER' && data.password) {
			throw new Error("You can't perform this action")
		}

		if (data.firstName || data.lastName) {
			data.searchIndex = generateSearchIndex(data.firstName, data.lastName)
		}

		if (data.password) {
			data.password = hashPassword(data.password)
		}

		return prisma.updateUser({
			data,
			where: {id: userId}
		})
	},
	deleteUser(parent, {id}, {prisma}) {
		return prisma.deleteUser({id})
	},

	/** TEAMS */
	createTeam(parent, {data}, {prisma, request}) {
		const users = data.users.map(id => ({
			id
		}))
		data = {
			...data,
			users: {
				connect: users
			}
		}
		return prisma.createTeam(data)
	},
	updateTeam(parent, {id, data}, {prisma}) {
		return prisma.updateTeam({
			data,
			where: {id}
		})
	},
	deleteTeam(parent, {id}, {prisma}) {
		return prisma.deleteTeam({id})
	},

	/** HOTELS */
	createHotel(parent, {data}, {prisma, request}) {
		data.searchIndex = generateSearchIndex(data.name)
		return prisma.createHotel(data)
	},
	updateHotel(parent, {id, data}, {prisma}) {
		if (data.name) {
			data.searchIndex = generateSearchIndex(data.name)
		}

		return prisma.updateHotel({
			data,
			where: {id}
		})
	},
	deleteHotel(parent, {id}, {prisma}) {
		return prisma.deleteHotel({id})
	},

	/** RESIDENTS */
	createResident(parent, {data}, {prisma, request}) {
		return prisma.createResident(data)
	},
	updateResident(parent, {id, data}, {prisma}) {
		if (data.name) {
			data.searchIndex = generateSearchIndex(data.name)
		}

		return prisma.updateResident({
			data,
			where: {id}
		})
	},
	deleteResident(parent, {id}, {prisma}) {
		return prisma.deleteResident({id})
	},

	/** VISIT */
	async createVisit(parent, {data}, {prisma, pubsub}) {
		const formattedData = {
			...data,
			team: {
				connect: {
					id: data.team
				}
			},
			hotel: {
				connect: {
					id: data.hotel
				}
			}
		}
		const visit = await prisma.createVisit(formattedData)
		await publishVisit('CREATED', visit, pubsub)
		return visit
	},
	async updateVisit(parent, {id, data}, {prisma, pubsub}) {
		if (data.team) {
			data.team = {
				connect: {
					id: data.team
				}
			}
		}

		if (data.hotel) {
			data.hotel = {
				connect: {
					id: data.hotel
				}
			}
		}

		const visit = prisma.updateVisit({
			data,
			where: {id}
		})
		await publishVisit('UPDATED', visit, pubsub)
		return visit
	},
	async deleteVisit(parent, {id}, {prisma, pubsub}) {
		const visit = await prisma.deleteVisit({id})
		await publishVisit('DELETED', visit, pubsub)
		return visit
	},

	/** SECTORS */
	createSector(parent, {data}, {prisma}) {
		return prisma.createSector(data)
	},
	updateSector(parent, {id, data}, {prisma}) {
		return prisma.updateSector({
			data,
			where: {id}
		})
	},
	deleteSector(parent, {id}, {prisma}) {
		return prisma.deleteSector({id})
	}
	// TODO: create visit type, query & mutations
	// async deleteVisit(parent, {id}, {prisma, request}) {
	// 	const userId = getAuthUserId(request)
	// 	const visitExists = await prisma.exists.Visit({
	// 		id,
	// 		user: {
	// 			id: userId
	// 		}
	// 	})
	// 	if (!visitExists) {
	// 		throw new Error("You can't delete another team visit.")
	// 	}

	// 	return prisma.deleteVisit({id})
	// }
}

export default Mutation
