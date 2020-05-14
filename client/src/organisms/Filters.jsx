import React, { useState } from 'react'

const Filters = () => {
  const [isSector, setSector] = useState([])
  const [isCritic, setCritic] = useState([])

  var sectors = [
    { name: "92 / 93" },
    { name: "93" },
    { name: "77 / 91" },
    { name: "75" },
    { name: "78 / 95" },
  ]
  var crits = [
    { name: "0 - 20" },
    { name: "15 - 30" },
    { name: "25 - 50" },
    { name: "50 - 75" },
  ]

  const onChangeSector = (e) => {
    const val = e.target.value

    if (e.target.checked) {
      setSector([...isSector, { name: val }])
    } else {
      setSector(isSector.filter(isSector => isSector.name !== val))
    }
  }

  const onChangeCrit = (e) => {
    const val = e.target.value

    if (e.target.checked) {
      setCritic([...isCritic, { name: val }])
    } else {
      setCritic(isCritic.filter(isCritic => isCritic.name !== val))
    }
  }

  return (
    <aside
      style={{ flex: '0 0 20%', height: 'fit-content', borderRadius: 6 }}
      className='card'>
      <div>
        <div
          style={{
            padding: '0.75rem 1.5rem 0.75rem 1.5rem',
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6
          }}
          className='card'>
          <p style={{ marginBottom: 7 }}>
            <strong>Chercher ...</strong>
          </p>
          <div className='field'>
            <div className='control'>
              <input
                className='input is-info'
                type='text'
                placeholder='Secteur, criticité ...'
              />
            </div>
          </div>
        </div>
        <div style={{ padding: '0.75rem 1.5rem 1.5rem 1.5rem' }}>
          <ul style={{ marginBottom: 14 }}>
            <li>
              <p style={{ marginBottom: 7 }}>
                <strong>Secteurs</strong>
              </p>
              <ul className='menu-list control'>
                {Object.keys(sectors).map(
                  (sect, i) => {
                    let sector = sectors[sect]
                    return (
                      <div key={i}>
                        <li>
                          <label style={{ height: 43 }} className="panel-block">
                            <input value={sector.name} onChange={onChangeSector} type="checkbox" />
                            <div style={{ marginLeft: '0.75em' }}>{sector.name}</div>
                          </label>
                        </li>
                        <div
                          style={{ height: 1, backgroundColor: '#F3F3F3' }}></div>
                      </div>
                    )
                  }
                )}
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <p style={{ marginBottom: 7 }}>
                <strong>Taux de criticité</strong>
              </p>
              <ul className='menu-list control'>
                {Object.keys(crits).map(
                  (crit, i) => {
                    let c = crits[crit]
                    return (
                      <div key={i}>
                        <li>
                          <label
                            style={{ height: 43 }}
                            className='panel-block'>
                            <input onChange={onChangeCrit} value={c.name} type="checkbox" />
                            <div style={{ marginLeft: '0.75em' }}>{c.name}</div>
                          </label>
                        </li>
                        <div
                          style={{ height: 1, backgroundColor: '#F3F3F3' }}></div>
                      </div>
                    )
                  }
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Filters
