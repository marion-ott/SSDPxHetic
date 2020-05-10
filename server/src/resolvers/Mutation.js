import bcrypt from 'bcryptjs'
import {
	getAuthUserId,
	generateToken,
	hashPassword,
	generateSearchIndex
} from './../utils'

const Mutation = {
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
	createHotel(parent, {data}, {prisma, request}) {
		data.searchIndex = generateSearchIndex(data.name)
		//TODO: generate lat long value from input address?
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
