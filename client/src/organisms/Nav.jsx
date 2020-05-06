import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../atoms'
import { Button } from '../atoms'
import { navEls } from '../global/data'

const Nav = () => (
  <nav
    style={{ padding: '1rem 0' }}
    className='navbar'
    role='navigation'
    aria-label='main navigation'>
    <div className='container'>
      <div>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          {navEls.links.map(({ label, href }, id) => (
            <Link className='navbar-item' to={href} key={id}>
              {label}
            </Link>
          ))}
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <Button type='is-primary'>
                <strong>Sign up</strong>
              </Button>
              <Button type='is-light'>Log in</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
)

export default Nav
