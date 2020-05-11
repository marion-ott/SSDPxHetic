import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Dropdown } from '../molecules'
import { Logo } from '../atoms'
import { Button } from '../atoms'
import { Icon } from '../atoms'
import { navEls } from '../global/data'

const Nav = () => {
  const { pathname } = useLocation()
  return (
    <nav
      style={{ padding: '.5rem 0' }}
      className='navbar'
      role='navigation'
      aria-label='main navigation'>
      <div className='container is-widescreen'>
        <div className='logo-container'>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        <div className='navbar-menu'>
          <div className='navbar-end'>
            {navEls.links.map(({ label, href }, id) => (
              <Link
                className={`navbar-item${
                  pathname === href ? ' is-active' : ''
                }`}
                to={href}
                key={id}>
                <strong>{label}</strong>
              </Link>
            ))}
          </div>
          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                <Button classname='is-link'>
                  <Icon classname='fa-calendar-plus' />
                  <p>Visite d'urgence</p>
                </Button>
                {/* <Icon classname='fa-bell' /> */}
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
