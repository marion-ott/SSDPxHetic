const moment = require('moment')
const {prisma} = require('../generated/prisma-client')
const shuffle = require('lodash.shuffle')
const fs = require('fs')

// a faire tourner toutes les semaines

// function de creation de shifts
/*
* secteur a un shift
* shift tourne toutes les semaines
/

// ---------

/* a faire tourner toutes les 5 semaines

/* fonction de suppression des teams passeés
/*
* si data passée => supprime le binome
/

// ---------

/* faire tourner tous les jours en fin de journée */

// faire remonter les hotels
/*
* filtre des hotels avec notation et derniere visite (cf ancien script) par secteur
* faire remonter 5 listes
/

/**
 * 
 * TYPE SHIFT
 * id
 * rotation -> id
 * sector -> id
 * start_date -> lundi
 * end_date -> dimanche
 */

/**
 *
 * TYPE ROTATION
 * id 1 8h
 * id 2 8h
 * id 3 8h
 * id 4 10h
 * id 5 12h
 *
 * for const sector of sectors {
 * 	shift dont la date d'aujourd'hui est comprise entre start et end et sector.id === sector
 *
 *	Secteur 75 le 01/07/2020 est sur la rotation 1
 *	-> Secteur 75 le 03/07/2020 jusqu'au 10/07/2020 est sur la rotation 2
 *
 * 	const current = sector.getShift().id //
 * 	const nextShift = getShift(current + 1)
 * }
 *
 *
 */

const shifts = [
	{
		id: 'abc123',
		index: 1,
		start_time: '08h30',
		end_time: '16h30'
	},
	{
		id: 'def456',
		index: 2,
		start_time: '08h30',
		end_time: '16h30'
	},
	{
		id: 'ghi789',
		index: 3,
		start_time: '08h30',
		end_time: '16h30'
	},
	{
		id: 'jkl012',
		index: 4,
		start_time: '10h30',
		end_time: '18h30'
	},
	{
		id: 'mno345',
		index: 5,
		start_time: '12h30',
		end_time: '20h30'
	}
]

const schedules = [
	{
		shift: 'abc123',
		sector: '5ee62d1cc414790007fb6047',
		start_date: '2020-06-24T00:00:00+02:00',
		end_date: '2020-07-01T00:00:00+02:00'
	},
	{
		rotation: 'def456',
		sector: '5ee62d1cc414790007fb6048',
		start_date: '2020-06-24T00:00:00+02:00',
		end_date: '2020-07-01T00:00:00+02:00'
	},
	{
		rotation: 'ghi789',
		sector: '5ee62d1cc414790007fb6049',
		start_date: '2020-06-24T00:00:00+02:00',
		end_date: '2020-07-01T00:00:00+02:00'
	},
	{
		rotation: 'jkl012',
		sector: '5ee62d1cc414790007fb604a',
		start_date: '2020-06-24T00:00:00+02:00',
		end_date: '2020-07-01T00:00:00+02:00'
	},
	{
		rotation: 'mno345',
		sector: '5ee62d1cc414790007fb604b',
		start_date: '2020-06-24T00:00:00+02:00',
		end_date: '2020-07-01T00:00:00+02:00'
	}
]

const setSectorsShift = () => {
	const sectors = areas
	//const times = rotations

	for (const sector of sectors) {
		/**
		const current = await prisma.sector({id: sector.id}).shift({
			where: {
				end_date: moment().startOf('day')
			}
		})*/
		const sectorSchedule = schedules.find(
			schedule => schedule.sector === sector.id
		)
		const index = shifts.find(shift => shift.id === sectorSchedule.shift).index

		let newIndex = index + 1
		if (shifts.length === index) {
			newIndex = 1
		} else {
			newIndex = index + 1
		}

		const newShift = shifts.find(el => el.index === newIndex)

		const entry = {
			shift: newShift,
			sector: {
				connect: {
					id: sector.id
				}
			},
			start_date: moment()
				.add(1, 'days')
				.startOf('day'),
			end_date: moment()
				.add(8, 'days')
				.startOf('day')
		}

		//await prisma.createShift(entry)
	}
}

/* fonction pour associer un binome à un hotel = génération des visites
/*
* associer 5 hotels prio à chaque binome dans un secteur
* */

// -----------------------------

const getUsersList = async () => {
	const sectors = await prisma.sectors()
	const data = []

	for (const sector of sectors) {
		const array = await prisma
			.sector({id: sector.id})
			.users()
			.id()
		const item = {
			sector: sector.id,
			users: array
		}
		data.push(item)
	}
	// fs.writeFileSync(`${__dirname}/test.json`, JSON.stringify(users))

	const teams = []
	for (const entry of data) {
		let teamAmount = Math.floor(entry.users.length / 2) - 1
		const users = shuffle(entry.users)
		const startAt = moment().startOf('day')
		const endAt = moment()
			.add(5, 'weeks')
			.startOf('day')
		const team = {
			sector: {
				connect: {
					id: entry.sector
				}
			},
			startAt,
			endAt
		}
		while (teamAmount > 0) {
			teams.push({
				...team,
				users: {
					connect: users.splice(0, 2)
				}
			})
			teamAmount--
		}
		teams.push({
			...team,
			users: {
				connect: users
			}
		})
	}

	for (const team of teams) {
		//await prisma.createTeam(team)
	}
}
getUsersList()

// faire tourner tous les jours en fin de journée

// faire remonter les hotels
/*
* filtre des hotels avec notation et derniere visite (cf ancien script) par secteur
* faire remonter 5 listes
/**
 * TODO: mettre à jour le statut d'un hôtel lorsqu'une visite est programmée ou en cours
 */

/** HOTELS */
const getHotelsList = async () => {
	const hotels = await prisma.hotels()
}

// fonction pour associer un binome à un hotel = génération des visites
/*
 * associer 5 hotels prio à chaque binome dans un secteur
 * */
