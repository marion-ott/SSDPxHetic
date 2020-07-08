const fs = require('fs')
const moment = require('moment')
const {prisma} = require('../src/generated/prisma-client')
const {
	generateSearchIndex,
	hashPassword,
	getPlaceInfo,
	generatePriorityIndex
} = require('./../src/utils/index')

let sectors, shifts

/**
 * Entry function to import data from json
 */
const importData = async () => {
	try {
		// Sector data import
		sectors = JSON.parse(fs.readFileSync(`${__dirname}/sectors.json`)).sectors
		console.log(`Importing ${sectors.length} sectors...`)

		for (const sector of sectors) {
			await prisma.createSector(sector)
		}

		console.log('Sectors successfully imported.')
		sectors = await prisma.sectors()

		// Sector data import
		shifts = JSON.parse(fs.readFileSync(`${__dirname}/shifts.json`)).shifts
		console.log(`Importing ${sectors.length} shifts...`)

		for (const shift of shifts) {
			await prisma.createShift(shift)
		}
		console.log('Shifts successfully imported.')
		shifts = await prisma.shifts()

		console.log('Importing schedules...')
		await generateSchedule()
		console.log('Schedules successfully imported.')

		// Hotel & employees data import
		await dataImport('employees', addUser)
		await dataImport('hotels', addHotel)

		const count = await prisma.hotels()
		console.log(count.length, ' hotels imported.')

		process.exit()
	} catch (err) {
		console.warn(err)
		process.exit()
	}
}

/**
 *
 * @param {String} file
 * @param {Function} callback
 * @returns {void}
 */
const dataImport = async (file, callback) => {
	const json = JSON.parse(fs.readFileSync(`${__dirname}/${file}.json`))
	console.log(`Importing ${json[file].length} ${file}...`)
	for (const entry of json[file]) {
		const sector = sectors.find(el => el.zone === entry.sector)
		if (sector) {
			entry.sector = {
				connect: {id: sector.id}
			}
		}

		if (file === 'hotels') {
			let info

			if (entry.lat) {
				info = await getPlaceInfo(entry.address, entry.zipCode, [
					entry.long,
					entry.lat
				])
			} else {
				info = await getPlaceInfo(entry.address, entry.zipCode)
			}

			entry.address = info.features[0].properties.name
			entry.zipCode = info.features[0].properties.postcode * 1
			entry.city = info.features[0].properties.city
			entry.long = info.features[0].geometry.coordinates[0] * 1
			entry.lat = info.features[0].geometry.coordinates[1] * 1
			entry.criticity = generatePriorityIndex(entry)
			entry.phone = '0612345678'
		}

		if (entry.password) {
			entry.password = await hashPassword(entry.password)
		}

		if (entry.name) {
			entry.searchIndex = generateSearchIndex(entry.name)
		}

		if (entry.firstName && entry.lastName) {
			entry.searchIndex = generateSearchIndex(entry.firstName, entry.lastName)
		}
		await callback(entry)
	}
	console.log(`${file} successfully imported.`)
}

/**
 * Generate 5 weeks of schedules for all sectors
 */
const generateSchedule = async () => {
	for (const sector of sectors) {
		const first = shifts.shift()
		shifts.push(first)

		for (const [index, shift] of shifts.entries()) {
			const startDate = moment()
				.add(index, 'weeks')
				.startOf('week')
			const endDate = moment(startDate)
				.add(7, 'days')
				.startOf('day')

			const schedule = {
				shift: {
					connect: {
						id: shift.id
					}
				},
				sector: {
					connect: {
						id: sector.id
					}
				},
				startDate,
				endDate
			}

			await prisma.createSchedule(schedule)
		}
	}
}

/**
 * Prisma data import
 * @param {Object} data
 * @returns {void}
 */
const addHotel = async data => {
	await prisma.createHotel(data)
}
const addUser = async data => {
	await prisma.createUser(data)
}

/**
 * Remove database data if needed
 */
const deleteData = async () => {
	const users = await prisma.users()
	console.log(`Deleting users...`)
	for (const user of users) {
		await prisma.deleteUser({id: user.id})
	}
	console.log(`${users.length} users deleted.`)

	const hotels = await prisma.hotels()
	console.log(`Deleting hotels...`)
	for (const hotel of hotels) {
		await prisma.deleteHotel({id: hotel.id})
	}
	console.log(`${hotels.length} hotels deleted.`)

	const schedules = await prisma.schedules()
	console.log(`Deleting schedules...`)
	for (const schedule of schedules) {
		await prisma.deleteSchedule({id: schedule.id})
	}
	console.log(`${schedules.length} schedules deleted.`)

	const visits = await prisma.visits()
	console.log(`Deleting visits...`)
	for (const visit of visits) {
		await prisma.deleteVisit({id: visit.id})
	}
	console.log(`${visits.length} visits deleted.`)

	const teams = await prisma.teams()
	console.log(`Deleting teams...`)
	for (const team of teams) {
		await prisma.deleteTeam({id: team.id})
	}
	console.log(`${teams.length} teams deleted.`)

	const sectors = await prisma.sectors()
	console.log(`Deleting sectors...`)
	for (const sector of sectors) {
		await prisma.deleteSector({id: sector.id})
	}
	console.log(`${sectors.length} sectors deleted.`)

	const residents = await prisma.residents()
	console.log(`Deleting residents...`)
	for (const resident of residents) {
		await prisma.deleteResident({id: resident.id})
	}
	console.log(`${residents.length} residents deleted.`)

	const shifts = await prisma.shifts()
	console.log(`Deleting shifts...`)
	for (const shift of shifts) {
		await prisma.deleteShift({id: shift.id})
	}
	console.log(`${shifts.length} shifts deleted.`)
}

/**
 * Use appropriate node script argument to proceed with the right action
 * e.g: `yarn data--import`
 */
if (process.argv[2] === '--import') {
	importData()
	console.log('Press ctrl + c to quit the data process.')
} else if (process.argv[2] === '--delete') {
	deleteData()
	console.log('Press ctrl + c to quit the data process.')
}
