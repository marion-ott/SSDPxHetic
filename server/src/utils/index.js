import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import deburr from 'lodash.deburr'
const JWT_SECRET = 'thisisasecret'
/**
 * Get logged in user id from JWT token
 * @param {Object} req (request)
 * @returns {String}
 */
const getAuthUserId = req => {
	const header = req.request.headers.authorization

	if (!header) {
		throw new Error('Authentication required')
	}
	console.log(req.request.headers)
	const token = header.replace('Bearer ', '')
	console.log(token)
	const decoded = jwt.verify(token, JWT_SECRET)

	return decoded.id
}

/**
 * Generate JWT token on signup or login
 * @param {String} id
 * @returns {String} token
 */
const generateToken = id => {
	return jwt.sign({id}, JWT_SECRET)
}

/**
 * Generate password hash from user input
 * @param {String} password
 * @returns {String}
 */
const hashPassword = password => {
	// TODO: add password requirements check
	// if (data.password.length < 8) {
	// 	throw new Error("Password doesn't meet requirements.")
	// }
	return bcrypt.hash(password, 10)
}

/**
 * Generate a simplified string for search queries purposes
 * @param {String} str1
 * @param {String} str2
 * @returns {String}
 */
const generateSearchIndex = (str1, str2 = null) => {
	let searchIndex = ''
	searchIndex = deburr(str1).toLowerCase()

	if (str2) {
		searchIndex = `${searchIndex} ${deburr(str2).toLowerCase()}`
	}

	return searchIndex
}

/**
 * Publish subscription on visit mutation
 * @param {String} mutation
 * @param {Object} data
 * @param {PubSub Object} pubsub
 */
const publishVisit = async (mutation, data, pubsub) => {
	await pubsub.publish('visit', {
		visit: {
			mutation,
			data
		}
	})

	return null
}

export {
	getAuthUserId,
	generateToken,
	hashPassword,
	generateSearchIndex,
	publishVisit
}
