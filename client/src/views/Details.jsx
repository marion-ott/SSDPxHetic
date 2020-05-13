import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Title } from './../atoms'

const Details = ({ location }) => {
  const breadcrumb = location.pathname.split('/')
  breadcrumb.shift()

  return (
    <section className='section'>
      <div className='breadcrumb is-right is-small' aria-label='breadcrumbs'>
        <ul>
          {breadcrumb.map((el, index) => (
            <li
              key={index}
              className={index === breadcrumb.length - 1 ? 'is-active' : ''}>
              <Link to={`/${el}`}>{el}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Title classProp='is-3' tag='h2'>
        Détails
      </Title>
      <div className='columns'>
        <div className='column'>col 1</div>
        <div className='column'>col 2</div>
      </div>
    </section>
  )
}

export default withRouter(Details)
