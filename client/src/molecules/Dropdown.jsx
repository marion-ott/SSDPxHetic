import React from 'react'
import { Icon } from '../atoms'

const Dropdown = () => (
  <div className='dropdown is-hoverable'>
    <div className='dropdown-trigger'>
      <button
        className='button'
        aria-haspopup='true'
        aria-controls='dropdown-menu4'>
        <Icon classname='fa-user' />
        <span>Marion</span>
        <span className='icon is-small'>
          <i className='fas fa-angle-down' aria-hidden='true'></i>
        </span>
      </button>
    </div>
    <div className='dropdown-menu' id='dropdown-menu3' role='menu'>
      <div className='dropdown-content'>
        <a href='#' className='dropdown-item'>
          Mon profil
        </a>
        <a href='#' className='dropdown-item'>
          Mes visites
        </a>
        <hr className='dropdown-divider' />
        <a href='#' className='dropdown-item'>
          Se déconnecter
        </a>
      </div>
    </div>
  </div>
)

export default Dropdown
