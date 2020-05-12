import React from 'react'
import { Icon } from '../atoms'

const Dropdown = ({ children, titleicon, downicon, title }) => {
  return (
    <div className='dropdown is-right is-hoverable'>
      <div className='dropdown-trigger'>
        <button
          className='button'
          aria-haspopup='true'
          aria-controls='dropdown-menu4'>
          {titleicon && <Icon classname={titleicon} />}
          <span>{title}</span>
          {downicon &&
            <span className='icon is-small'>
              <i className='fas fa-angle-down' aria-hidden='true'></i>
            </span>
          }
        </button>
      </div>
      <div className='dropdown-menu' id='dropdown-menu3' role='menu'>
        <div className='dropdown-content'>
          {children}
        </div>
      </div>
    </div>
  )
}


export default Dropdown
