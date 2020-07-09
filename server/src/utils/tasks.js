const moment = require('moment')
const { prisma } = require('../generated/prisma-client')
const _ = require('lodash')
const _shuffle = require('lodash.shuffle')
const _groupBy = require('lodash.groupby')
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
		const schedule = await prisma.sector({ id: sector.id }).schedules({
			where: {
				endDate: now
			}
		})

		const shift = await prisma.schedule({ id: schedule[0].id }).shift()

		let newIndex = shift.index + 1
		if (shifts.length === shift.index) {
			newIndex = 1
		} else {
			newIndex = shift.index + 1
		}

		const newShift = shifts.find(el => el.index === newIndex)

		const entry = {
			shift: {
				connect: {
					id: newShift.id
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

		await prisma.createSchedule(entry)
		console.log('Schedules successfully generated')
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
			.sector({ id: sector.id })
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
		const users = _shuffle(entry.users)
		// const startDate = moment()
		// 	.add(5, 'weeks')
		// 	.startOf('week')
		// const endDate = moment(startDate)
		// 	.add(5, 'weeks')
		// 	.startOf('day')

		const startDate = moment().startOf('week')
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

	for (const team of teams) {
		await prisma.createTeam(team)
	}
	console.log('Teams successfully generated')
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
const generateVisits = async () => {
	const MAX_VISITS_PER_DAY = 3
	const sectors = await prisma.sectors()
	const hotelsBySector = []
	const startDate = moment().startOf('week')
	const endDate = moment(startDate)
		.add(5, 'weeks')
		.startOf('day')
	const limit = moment(endDate).diff(startDate, 'days')

	for (const sector of sectors) {
		const hotels = await prisma.sector({ id: sector.id }).hotels({
			orderBy: 'criticity_ASC'
		})
		const element = {
			sector,
			hotels
		}
		hotelsBySector.push(element)
	}

	for (const { sector, hotels } of hotelsBySector) {
		const teams = await prisma.teams({
			where: {
				sector: {
					id: sector.id
				},
				startDate
			}
		})

		let hotelsToSkip = 0

		for (const team of teams) {
			for (let i = 0; i <= limit; i++) {
				const date = moment(startDate).add(i, 'days')
				if (moment(date).day() !== 0 && moment(date).day() !== 6) {
					const hotelsToSchedule = hotels.slice(
						hotelsToSkip,
						MAX_VISITS_PER_DAY * (i + 1)
					)

					for (const hotel of hotelsToSchedule) {
						const visit = {
							team: {
								connect: {
									id: team.id
								}
							},
							hotel: {
								connect: {
									id: hotel.id
								}
							},
							priority: hotel.criticity < 0,
							status: 'UPCOMING',
							date
						}

						await prisma.createVisit(visit)
						hotelsToSkip++
					}
				}
			}
		}
	}
	console.log('Visits successfully generated.')
}

// ! TODO: prevent doublon teams generation
// ? if user.teams {date: moment + 5weeks} exists skip

const generateAll = (async () => {
	await generateSchedules()
	await generateTeams()
	await generateVisits()
})()
