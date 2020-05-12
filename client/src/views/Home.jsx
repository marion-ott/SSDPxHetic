import React from 'react'

// import Employees from './Employees'
// import Hotels from './Hotels'
// import { List } from '../organisms'
// import { Filters } from '../organisms'
import { Modal } from '../organisms'
import { Title } from '../atoms'
// import { Icon } from '../atoms'

const Home = () => (
  <section className='section'>
    <Title classProp='is-1' tag='h1'>
      planning
    </Title>
    <Modal isActive />
  </section>
)

export default Home
