import React from 'react'

const Menu = () => (
  <aside className='menu'>
    <p className='menu-label'>General</p>
    <ul className='menu-list'>
      <li>
        <a href='/'>Dashboard</a>
      </li>
      <li>
        <a href='/'>Customers</a>
      </li>
    </ul>
    <p className='menu-label'>Administration</p>
    <ul className='menu-list'>
      <li>
        <a href='/'>Team Settings</a>
      </li>
      <li>
        <a href='/' className='is-active'>
          Manage Your Team
        </a>
        <ul>
          <li>
            <a href='/'>Members</a>
          </li>
          <li>
            <a href='/'>Plugins</a>
          </li>
          <li>
            <a href='/'>Add a member</a>
          </li>
        </ul>
      </li>
      <li>
        <a href='/'>Invitations</a>
      </li>
      <li>
        <a href='/'>Cloud Storage Environment Settings</a>
      </li>
      <li>
        <a href='/'>Authentication</a>
      </li>
    </ul>
  </aside>
)

export default Menu
