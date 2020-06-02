import React, { useState, useContext } from 'react'
import sectorContext from '../context/sectorContext'
import { Title, Label, Input } from './../atoms'

const Filters = () => {
  const { sectors } = useContext(sectorContext)
  const [isSector, setSector] = useState([])
  // const [isCritic, setCritic] = useState([])

  const data = [
    {
      label: 'Secteurs',
      items: sectors
    },
    {
      label: 'Note',
      items: [
        { name: '0 - 20' },
        { name: '15 - 30' },
        { name: '25 - 50' },
        { name: '50 - 75' }
      ]
    }
  ]

  const onChangeSector = (e) => {
    const val = e.target.value

    if (e.target.checked) {
      setSector([...isSector, { name: val }])
    } else {
      setSector(isSector.filter((isSector) => isSector.name !== val))
    }
  }

  // const onChangeCrit = (e) => {
  //   const val = e.target.value

  //   if (e.target.checked) {
  //     setCritic([...isCritic, { name: val }])
  //   } else {
  //     setCritic(isCritic.filter((isCritic) => isCritic.name !== val))
  //   }
  // }

  return (
    <aside className='filters'>
      <div className='box'>
        <Title size='is-4' tag='h4'>
          <strong>Filtrer</strong>
        </Title>
        {data.map((el, i) => (
          <div key={i} className='filters-section'>
            <p>
              <strong>{el.label}</strong>
            </p>
            <ul className='menu-list control'>
              {el.items.map((item, i) => (
                <li className='panel-block' key={i}>
                  <Input
                    value={item.name || item.zone}
                    onChange={onChangeSector}
                    type='checkbox'
                  />
                  <Label text={item.name || item.zone} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Filters
