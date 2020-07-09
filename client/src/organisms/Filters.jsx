import React, { useState, useContext } from 'react'
import sectorContext from '../context/sectorContext'
import { Title, Label, Input } from './../atoms'

const Filters = () => {
  const { sectors } = useContext(sectorContext)
  const [isSector, setSector] = useState([])
  // const [isCritic, setCritic] = useState([])

  const onChangeSector = (e) => {
    const val = e.target.value

    if (e.target.checked) {
      setSector([...isSector, { name: val }])
    } else {
      setSector(isSector.filter((isSector) => isSector.name !== val))
    }
  }

  return (
    <aside className='filters'>
      <div className='box'>
        <Title size='is-4' tag='h4'>
          <strong>Filtrer</strong>
        </Title>
        <div className='filters-section'>
          <p>
            <strong>Secteurs</strong>
          </p>
          <ul className='menu-list control'>
            {sectors.map((item, i) => (
              <li className='panel-block' key={i}>
                <Input
                  value={item.zone}
                  onChange={onChangeSector}
                  type='checkbox'
                />
                <Label text={item.zone} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Filters
