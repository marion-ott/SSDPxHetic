import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { List } from '../organisms'

const Details = ({ location }) => {
  const breadcrumb = location.pathname.split('/')
  breadcrumb.shift()

  var historic = [
    {
      date: "12/02/2020",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    },
    {
      date: "12/02/2020",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    },
    {
      date: "12/02/2020",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    },
    {
      date: "12/02/2020",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    },
    {
      date: "12/02/2020",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    },
    {
      date: "23/11/2019",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    },
    {
      date: "23/11/2019",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    },
    {
      date: "23/11/2019",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    },
    {
      date: "23/11/2019",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    },
    {
      date: "23/11/2019",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    },
    {
      date: "23/11/2019",
      coop: "Michel Lupin",
      crit: 22,
      destination: "25 rue des carrés, 75012 Paris"
    }
  ]

  return (
    <section style={{ height: "calc(100vh - 68px)" }} className='section'>
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
          <div class="card">
            <div class="card-content">
              <div style={{ justifyContent: 'center' }} className="is-flex">
                <div>
                  <figure style={{ margin: "auto" }} class="image is-96x96">
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 46,
                      color: "white",
                      justifyContent: "center",
                      height: 96,
                      width: 96,
                      backgroundColor: "rgb(50, 115, 220)",
                      borderRadius: 200
                    }}>
                      <i className="fas fa-user-alt"></i>
                    </div>
                    {/* <img class="is-rounded" src="https://bulma.io/images/placeholders/96x96.png" /> */}
                  </figure>
                  <h5 style={{ marginTop: 11 }} class="title is-5">
                    Helliot Thimothé
                  </h5>
                </div>
              </div>
              <div style={{ height: 1, backgroundColor: '#F3F3F3', margin: "14px 0px" }}></div>
              <div style={{ height: 55 }}>
                <h6 class="title is-6">Téléphone</h6>
                <h6 class="subtitle is-6">0434928433</h6>
              </div>
              <div style={{ height: 55 }}>
                <h6 class="title is-6">Email</h6>
                <h6 class="subtitle is-6">Helliot.Thimothé@gmail.com</h6>
              </div>
              <div style={{ height: 55 }}>
                <h6 class="title is-6">Adresse</h6>
                <h6 class="subtitle is-6">30 rue de la pépiniète</h6>
              </div>
            </div>
          </div>
        </div>
        <List type="details" title="Historique d'activité" entries={historic} />
      </div>
    </section>
  )
}

export default withRouter(Details)
