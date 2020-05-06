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
  }
]

export { navEls, listKeys, filters }
