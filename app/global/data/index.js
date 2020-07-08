import * as yup from 'yup'

const listKeys = [
  {
    name: 'uuid',
    label: 'UUID',
    type: 'text',
    inTable: false,
    inForm: true,
    yupVal: yup.string('La valeur est invalide').required('UUID requis')
  },
  {
    name: 'name',
    label: 'Nom',
    type: 'text',
    inTable: true,
    inForm: true,
    yupVal: yup.string('La valeur est invalide').required('Le nom est requis')
  },
  {
    name: 'firstName',
    label: 'Prénom',
    type: 'text',
    textContentType: 'none',
    autoCapitalize: 'none',
    keyboardType: 'default',
    autoCapitalize: 'words',
    inTable: true,
    inForm: true,
    yupVal: yup
      .string('La valeur est invalide')
      .required('Le prénom est requis')
  },
  {
    name: 'lastName',
    label: 'Nom',
    type: 'text',
    textContentType: 'none',
    keyboardType: 'default',
    autoCapitalize: 'words',
    inTable: true,
    inForm: true,
    yupVal: yup.string('La valeur est invalide').required('Le nom est requis')
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    textContentType: 'none',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    inTable: true,
    inForm: true,
    yupVal: yup
      .string()
      .email('Email invalide')
      .required("L'adresse email est requise")
  },
  {
    name: 'phone',
    label: 'Téléphone',
    type: 'phone',
    textContentType: 'none',
    keyboardType: 'default',
    autoCapitalize: 'none',
    inTable: true,
    inForm: true,
    yupVal: yup.string().required('Le téléphone est requis')
  },
  {
    name: 'password',
    label: 'Mot de passe',
    type: 'password',
    textContentType: 'none',
    autoCapitalize: 'none',
    keyboardType: 'default',
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
    yupVal: yup
      .string('La valeur est invalide')
      .required('Le secteur est requis'),
    options: []
  },
  {
    name: 'role',
    label: 'Rôle',
    type: 'select',
    inTable: false,
    inForm: true,
    yupVal: yup.string('La valeur est invalide'),
    options: ['USER', 'ADMIN']
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

const getFormProps = (data) => {
  const form = {
    initialValues: {},
    elements: []
  }
  const obj = {}

  Object.keys(data).forEach((key) => {
    if (key === 'id' || key === '__typename') return
    form.initialValues[key] = data[key] || ''
    const inputModel = listKeys.find((listKey) => listKey.name === key)

    if (!inputModel.inForm) return
    const element = {
      name: inputModel.name,
      inputProps: {
        placeholder: inputModel.label,
        type: inputModel.type,
        textContentType: inputModel.textContentType,
        keyboardType: inputModel.keyboardType,
        autoCapitalize: inputModel.autoCapitalize
      },
      labelProps: {
        label: inputModel.label
      }
    }
    if (inputModel.type === 'select') {
      element.inputProps.options = inputModel.options
    }
    obj[key] = inputModel.yupVal
    form.elements.push(element)
  })
  const schema = yup.object(obj)

  return [form, schema]
}

export { getFormProps }
