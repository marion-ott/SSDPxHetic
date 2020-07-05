import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import deburr from 'lodash.deburr'
import axios from 'axios'

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

	const token = header.replace('Bearer ', '')
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

/**
 * Fetch precise long/lat values from data gouv API
 * @param {String} address
 * @param {Int} zip
 * @param {Array} coord
 * @returns {JSON}
 */
const getPlaceInfo = async (address, zip, coord) => {
	let url = ''
	if (coord) {
		url = `https://api-adresse.data.gouv.fr/reverse/?lon=${coord[0]}&lat=${coord[1]}`
	} else {
		address = address.toLowerCase().replace(' - ', ' ')
		url = `https://api-adresse.data.gouv.fr/search/?q=${address.toLowerCase()}&postcode=${zip}`
	}
	return await axios(url).then(res => res.data)
}

export {
	getAuthUserId,
	generateToken,
	hashPassword,
	generateSearchIndex,
	publishVisit,
	getPlaceInfo
}
