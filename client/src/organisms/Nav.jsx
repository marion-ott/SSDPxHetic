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
    <nav className='navbar' role='navigation' aria-label='main navigation'>
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
                <Button classProp='is-link'>
                  <Icon classProp='fa-calendar-plus' />
                  <p>Visite d'urgence</p>
                </Button>
                {/* <Icon classProp='fa-bell' /> */}
                <Dropdown downicon={true} title='Marion' titleicon='fa-user'>
                  <Link to='/' className='dropdown-item'>
                    Mon profile
                  </Link>
                  <Link to='/' className='dropdown-item'>
                    Mes visites
                  </Link>
                  <hr className='dropdown-divider'></hr>
                  <Link to='/' className='dropdown-item'>
                    Déconnexion
                  </Link>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
