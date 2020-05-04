const fs = require('fs')
const {prisma} = require('../src/generated/prisma-client')

let sectors
/** ADD ALL DATA IN DB */
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

		// Hotel & employees data import
		await dataImport('employees', addUser)
		await dataImport('hotels', addHotel)

		process.exit()
	} catch (err) {
		console.warn(err)
		process.exit()
	}
}

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
		await callback(entry)
	}
	console.log(`${file} successfully imported.`)
}

const addHotel = async data => {
	await prisma.createHotel(data)
}
const addUser = async data => {
	await prisma.createUser(data)
}

/** REMOVE ALL DB DATA */
const deleteData = async () => {
	users = await prisma.users()
	console.log(`Deleting users...`)
	for (const user of users) {
		await prisma.deleteUser({id: user.id})
	}
	console.log(`${users.length} users deleted.`)

	hotels = await prisma.hotels()
	console.log(`Deleting hotels...`)
	for (const hotel of hotels) {
		await prisma.deleteHotel({id: hotel.id})
	}
	console.log(`${hotels.length} hotels deleted.`)

	sectors = await prisma.sectors()
	console.log(`Deleting sectors...`)
	for (const sector of sectors) {
		await prisma.deleteSector({id: sector.id})
	}
	console.log(`${sectors.length} sectors deleted.`)
}

/** UNCOMMENT IF YOU WISH TO REMOVE ALL DATA */
// deleteData()
importData()
