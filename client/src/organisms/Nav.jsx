import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import appContext from '../context/appContext'
import { Dropdown, Notifications } from '../molecules'
import { Logo, Button, Icon } from '../atoms'
import { navEls } from '../global/data'

const Nav = ({ setAuth }) => {
  const { context, setContext } = useContext(appContext)
  const { pathname } = useLocation()

  const handleLogout = () => {
    setContext({
      user: null
    })
    localStorage.removeItem('token')
  }

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
                <Notifications />
                {/* <Icon classProp='fa-bell' /> */}
                <Dropdown
                  downicon={true}
                  title={context.user.firstName}
                  titleicon='fa-user'>
                  <Link to='/' className='dropdown-item'>
                    Mon profil
                  </Link>
                  <Link to='/' className='dropdown-item'>
                    Mes visites
                  </Link>
                  <hr className='dropdown-divider'></hr>
                  <Link onClick={handleLogout} to='/' className='dropdown-item'>
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
