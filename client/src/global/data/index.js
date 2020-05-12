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
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'firstName',
    label: 'Prénom',
    type: 'text',
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'lastName',
    label: 'Nom',
    type: 'text',
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    yupVal: yup.string().email('Email invalide')
  },
  {
    name: 'sector',
    label: 'Secteur',
    type: 'select',
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'rooms',
    label: 'Capacité',
    type: 'number',
    yupVal: yup.number('La valeur est invalide')
  },
  {
    name: 'lastVisit',
    label: 'Dernière visite',
    type: null
  },
  {
    name: 'address',
    label: 'Adresse',
    type: 'text',
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'zipCode',
    label: 'Code postal',
    type: 'text',
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'city',
    label: 'Ville',
    type: 'text',
    yupVal: yup.string('La valeur est invalide')
  },
  {
    name: 'score',
    label: 'Note',
    type: null,
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

const formStructure = {
  initialValues: {},
  elements: []
}

const getFormProps = (data) => {
  const form = { ...formStructure }
  const obj = {}
  Object.keys(data).map((key) => {
    form.initialValues[key] = data[key]
    const inputModel = listKeys.find((listKey) => listKey.name === key)
    const element = {
      name: inputModel.name,
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
