import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BaseTitle = ({ classProp, size, tag, children }) => {
  const Tag = `${tag}`
  return <Tag className={`title ${size} ${classProp}`}>{children}</Tag>
}

const Title = styled(BaseTitle)`
  color: black;
  font-weight: bold;
`

Title.defaultProps = {
  size: 'is-3',
  tag: 'h3'
}

Title.propTypes = {
  size: PropTypes.oneOf(['is-1', 'is-2', 'is-3', 'is-4', 'is-5', 'is-6']),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
}

export default Title
