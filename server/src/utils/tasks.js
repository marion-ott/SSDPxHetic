const moment = require('moment')
const {prisma} = require('../generated/prisma-client')
const shuffle = require('lodash.shuffle')
const fs = require('fs')

/**
 * Generate schedule rotation for an extra week
 * TODO: CRON -> execute every week
 */
const generateSchedules = async () => {
	const sectors = await prisma.sectors()

	for (const sector of sectors) {
		const now = moment()
			.add(5, 'weeks')
			.startOf('week')
		const startDate = moment(now)
			.add(1, 'weeks')
			.startOf('week')
		const endDate = moment(startDate)
			.add(7, 'days')
			.startOf('day')

		const shifts = await prisma.shifts()
		const schedule = await prisma.sector({id: sector.id}).schedules({
			where: {
				endDate: now
			}
		})

		const shift = await prisma.schedule({id: schedule[0].id}).shift()

		let newIndex = shift.index + 1
		if (shifts.length === shift.index) {
			newIndex = 1
		} else {
			newIndex = shift.index + 1
		}

		const newShift = shifts.find(el => el.index === newIndex)

		const entry = {
			shift: newShift,
			sector: {
				connect: {
					id: sector.id
				}
			},
			startDate,
			endDate
		}

		// ! UNCOMMENT TO INSERT IN DB
		//await prisma.createSchedule(entry)
	}
}

/**
 * Generate teams for 5 weeks ahead
 * TODO: CRON -> execture every 5 weeks
 */
const generateTeams = async () => {
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

	const teams = []
	for (const entry of data) {
		let teamAmount = Math.floor(entry.users.length / 2) - 1
		const users = shuffle(entry.users)
		const startDate = moment()
			.add(5, 'weeks')
			.startOf('week')
		const endDate = moment(startDate)
			.add(5, 'weeks')
			.startOf('day')

		const team = {
			sector: {
				connect: {
					id: entry.sector
				}
			},
			startDate,
			endDate
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

	// ! UNCOMMENT TO INSERT IN DB
	for (const team of teams) {
		//await prisma.createTeam(team)
	}
}

/**
 * ! PEUT-ETRE NON UTILE SI INDICE D'IMPORTANCE
 * TODO: METTRE A JOUR LE STATUT D'UN HOTEL QUAND UNE VISITE EST PROGRAMMEE OU EN COURS
 * ? CREER UN INDICE D'IMPORTANCE EN RAPPORT AVEC LASTVISIT ET NOTE PUIS CLASSER LES HOTELS PAR INDICE_DESC
 * ? LE CONSERVER EN BASE ET LE METTRE A JOUR A CHAQUE UPDATE
 * TODO: RECUPERER TOUS LES HOTELS ORDERBY INDICE ET GROUP BY SECTEUR
 * ? SI INDICE > VALUE ALORS HOTEL EST CONSIDERE COMME PRIORITAIRE
 **/

const getHotelsToVisit = async () => {
	const hotels = await prisma.hotels()
}

/**
 * TODO: RECUPERER LA LISTE D'HOTELS REALISEE PRECEDEMMENT (OU FAIRE APPEL DIRECTEMENT ICI SI INDICE PRESENT)
 * ? GROUP BY SECTEUR SI NON FAIT
 *
 * ! OPTION 1:
 * TODO: CREER LES VISITES HORIZONTALEMENT -> LUN. 01 JUIL. 1 VISITE, MAR. 02 JUIL. 1 VISITE, MAR. 03 JUIL. 1 VISITE, ETC.
 * ? REFLECHIR AU NOMBRE MAX DE VISITES PAR JOUR
 *
 * ! OPTION 2:
 * TODO: REMPLIR JOUR PAR JOUR AVEC UN TABLEAU PRIO ET UN TABLEAU STANDARD
 * ? POUR CHAQUE JOUR COMMENCER PAR UNE PRIO PUIS REMPLIR AVEC STANDARD? OU 2 PRIO?
 * * PASSER AU JOUR SUIVANT APRES X HOTELS
 **/
const generateVisits = async () => {}
