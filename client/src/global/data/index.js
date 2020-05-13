import * as yup from 'yup'

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
    label: 'Nom',
    type: 'text',
    inTable: true,
    inForm: true,
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'firstName',
    label: 'Prénom',
    type: 'text',
    inTable: true,
    inForm: true,
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'lastName',
    label: 'Nom',
    type: 'text',
    inTable: true,
    inForm: true,
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: 'fa-envelope',
    inTable: true,
    inForm: true,
    yupVal: yup.string().email('Email invalide')
  },
  {
    name: 'password',
    label: 'Mot de passe',
    type: 'password',
    icon: 'fa-lock',
    inTable: false,
    inForm: true,
    yupVal: yup.string().email('Email invalide')
  },
  {
    name: 'sector',
    label: 'Secteur',
    type: 'select',
    inTable: true,
    inForm: true,
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'rooms',
    label: 'Capacité',
    type: 'number',
    inTable: true,
    inForm: true,
    yupVal: yup.number('La valeur est invalide')
  },
  {
    name: 'lastVisit',
    label: 'Dernière visite',
    inTable: true,
    inForm: false,
    type: null
  },
  {
    name: 'address',
    label: 'Adresse',
    type: 'text',
    inTable: false,
    inForm: true,
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'zipCode',
    label: 'Code postal',
    type: 'text',
    inTable: false,
    inForm: true,
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'city',
    label: 'Ville',
    type: 'text',
    inTable: false,
    inForm: true,
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'score',
    label: 'Note',
    type: null,
    inTable: true,
    inForm: false,
    yupVal: null
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

const getFormProps = (data) => {
  const form = {
    initialValues: {},
    elements: []
  }
  const obj = {}

  Object.keys(data).map((key) => {
    if (key === 'id' || key === '__typename') return
    form.initialValues[key] = data[key] || ''
    const inputModel = listKeys.find((listKey) => listKey.name === key)
    if (!inputModel.inForm) return
    const element = {
      name: inputModel.name,
      icon: inputModel.icon,
      inputProps: {
        placeholder: inputModel.label,
        type: inputModel.type
      },
      labelProps: {
        text: inputModel.label
      }
    }
    if (inputModel.type === 'select') {
      element.inputProps.options = ['75', '92']
    }
    obj[key] = inputModel.yupVal
    form.elements.push(element)
  })
  const schema = yup.object(obj)

  return [form, schema]
}

export { navEls, listKeys, filters, form, getFormProps }
