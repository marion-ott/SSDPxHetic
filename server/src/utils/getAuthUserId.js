import jwt from 'jsonwebtoken'

const getAuthUserId = req => {
	const header = req.request.headers.authorization

	if (!header) {
		throw new Error('Authentication required')
	}

	const token = header.replace('Bearer ', '')
	const decoded = jwt.verify(token, 'thisisasecret')

	return decoded.id
}

export default getAuthUserId
