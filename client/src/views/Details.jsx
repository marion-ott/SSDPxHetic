import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import useGetOne from './../hooks/useGetOne'
import { Title } from './../atoms'
import { listKeys } from '../global/data'

const Details = ({ location, match }) => {
  const type = location.pathname.replace(`/${match.params.id}`, '').slice(1, -1)
  const { loading, error, data } = useGetOne(type, match.params.id)

  if (error) {
    return <p>{error}</p>
  }

  if (loading) {
    return <p>{loading}</p>
  }

  const keys = listKeys.filter((el) =>
    Object.keys(data[type]).find((entry) => entry === el.name && el.inForm)
  )

  const breadcrumb = [
    type,
    data[type].name || `${data[type].firstName} ${data[type].lastName}`
  ]

  return (
    <section style={{ height: 'calc(100vh - 68px)' }} className='section'>
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
      <div className='columns'>
        <div className='column is-one-third'>
          <div className='card box'>
            <div class='card-content'>
              <div class='media'>
                <div class='media-left'>
                  <figure class='image is-48x48'>
                    <img
                      src='https://bulma.io/images/placeholders/96x96.png'
                      alt='Placeholder image'
                    />
                  </figure>
                </div>
                <div class='media-content'>
                  <p class='title is-4'>
                    {data[type].name ||
                      `${data[type].firstName} ${data[type].lastName}`}
                  </p>
                  <p class='subtitle is-6'>Secteur {data[type].sector.zone}</p>
                </div>
              </div>

              <div class='content'>
                {Object.keys(data[type]).map((el) => {
                  const properKey = keys.find((key) => key.name === el)
                  if (
                    !properKey ||
                    el === 'name' ||
                    el === 'firstName' ||
                    el === 'lastName' ||
                    el === 'sector'
                  ) {
                    return
                  }

                  let value = data[type][el]

                  return (
                    <div className='details-info'>
                      <Title size='is-6' tag='h5'>
                        {properKey.label}
                      </Title>
                      <p>{value}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div class='column'>
          <Title size='is-3' tag='h3'>
            Visites
          </Title>
          <div class='box tabs is-small'>
            <ul>
              <li class='is-active'>
                <a href='/'>À venir</a>
              </li>
              <li>
                <a href='/'>Passées</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default withRouter(Details)
