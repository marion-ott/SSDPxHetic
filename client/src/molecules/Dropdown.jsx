import React from 'react'
import { Icon } from '../atoms'

const Dropdown = ({ data, icon, downicon, title }) => {

  return (
    <div className='dropdown is-right is-hoverable'>
      <div className='dropdown-trigger'>
        <button
          className='button'
          aria-haspopup='true'
          aria-controls='dropdown-menu4'>
          {icon && <Icon classname={icon} />}
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
          {data && data.map((d, i) => {
            return <a key={i} href='#' className='dropdown-item'>{d}</a>
          })}
        </div>
      </div>
    </div>
  )
}


export default Dropdown
