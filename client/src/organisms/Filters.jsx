import React from 'react'

const Filters = () => (
  <aside className='menu column is-one-fifth'>
    <ul className='menu-list'>
      <a class='is-active'>Filtres</a>
      <li>
        <p className='menu-label'>
          <strong>Secteurs</strong>
        </p>
        <ul className='menu-list'>
          <li>
            <label className='panel-block'>
              <input type='checkbox' />
              75
            </label>
          </li>
          <li>
            <label className='panel-block'>
              <input type='checkbox' />
              92
            </label>
          </li>
        </ul>
      </li>
      <li>
        <p className='menu-label'>
          <strong>Note</strong>
        </p>
        <ul className='menu-list'>
          <li>
            <label className='panel-block'>
              <input type='checkbox' />> 10
            </label>
          </li>
          <li>
            <label className='panel-block'>
              <input type='checkbox' />
              >30
            </label>
          </li>
        </ul>
      </li>
      <li>
        <p className='menu-label'>
          <strong>Dernière visite</strong>
        </p>
        <ul className='menu-list'>
          <li>
            <label className='panel-block'>
              <input type='checkbox' />> 10
            </label>
          </li>
          <li>
            <label className='panel-block'>
              <input type='checkbox' />
              >30
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
)

export default Filters
