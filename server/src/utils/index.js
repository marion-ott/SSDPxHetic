import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import deburr from 'lodash.deburr'

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

	const token = header.replace('Bearer ', '')
	const decoded = jwt.verify(token, 'thisisasecret')

	return decoded.id
}

/**
 * Generate JWT token on signup or login
 * @param {String} id
 * @returns {String} token
 */
const generateToken = id => {
	return jwt.sign({id}, 'thisisasecret')
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

export {getAuthUserId, generateToken, hashPassword, generateSearchIndex}
