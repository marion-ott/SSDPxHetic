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

// a faire tourner toutes les 5 semaines

// fonction de suppression des teams passeés
/*
* si data passée => supprime le binome
/

// ---------

// faire tourner tous les jours en fin de journée

// faire remonter les hotels
/*
* filtre des hotels avec notation et derniere visite (cf ancien script) par secteur
* faire remonter 5 listes
/

// fonction pour associer un binome à un hotel = génération des visites
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
		const startAt = moment()
		const endAt = moment().add(5, 'weeks')
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
