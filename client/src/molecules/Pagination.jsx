import React from 'react'

// create & use amount & on click props
const Pagination = () => {
  return (
    <nav
      className='pagination is-centered is-small'
      role='navigation'
      aria-label='pagination'>
      <a href='/' className='pagination-previous'>
        Précédent
      </a>
      <a href='/' className='pagination-next'>
        Suivant
      </a>
      <ul className='pagination-list'>
        <li>
          <a href='/' className='pagination-link' aria-label='Goto page 1'>
            1
          </a>
        </li>
        <li>
          <span className='pagination-ellipsis'>&hellip;</span>
        </li>
        <li>
          <a href='/' className='pagination-link' aria-label='Goto page 45'>
            45
          </a>
        </li>
        <li>
          <a
            href='/'
            className='pagination-link is-current'
            aria-label='Page 46'
            aria-current='page'>
            46
          </a>
        </li>
        <li>
          <a href='/' className='pagination-link' aria-label='Goto page 47'>
            47
          </a>
        </li>
        <li>
          <span className='pagination-ellipsis'>&hellip;</span>
        </li>
        <li>
          <a href='/' className='pagination-link' aria-label='Goto page 86'>
            86
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
