const navEls = {
  links: [
    {
      label: 'Planning',
      href: '/'
    },
    {
      label: 'Équipe',
      href: '/users'
    },
    {
      label: 'Hôtels',
      href: '/hotels'
    }
  ]
}

const filters = {
  users: [{}],
  hotels: [{}]
}

const listKeys = [
  {
    name: 'name',
    label: 'Nom'
  },
  {
    name: 'firstName',
    label: 'Prénom'
  },
  {
    name: 'lastName',
    label: 'Nom'
  },
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'sector',
    label: 'Secteur'
  },
  {
    name: 'rooms',
    label: 'Capacité'
  },
  {
    name: 'lastVisit',
    label: 'Dernière visite'
  },
  {
    name: 'score',
    label: 'Note'
  },
  {
    name: "date",
    label: 'Date'
  },
  {
    name: "coop",
    label: "Binome"
  },
  {
    name: "crit",
    label: "Criticité"
  },
  {
    name: "destination",
    label: "Destination"
  }
]

const form = {
  login: {
    initialValues: {
      email: '',
      password: ''
    },
    elements: [
      {
        name: 'email',
        icon: 'fa-envelope',
        inputProps: {
          placeholder: 'exemple@samu-social.net',
          type: 'email'
        },
        labelProps: {
          text: 'Email'
        }
      },
      {
        name: 'password',
        icon: 'fa-lock',
        inputProps: {
          placeholder: '',
          type: 'password'
        },
        labelProps: {
          text: 'Mot de passe'
        }
      }
    ]
  }
}

export { navEls, listKeys, filters, form }
