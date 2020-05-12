import React from 'react'
import Dropdown from './Dropdown'
import Icon from '../atoms/Icon'

const ListItem = ({ index, data, keys }) => (
  <tr>
    <th style={{ verticalAlign: "middle" }}>{index}</th>
    {keys.map((el, i) => {
      if (typeof data[el.name] == 'object') {
        return <td style={{ verticalAlign: "middle" }} key={i}>{data[el.name] ? data[el.name].zone : 'N/A'}</td>
      }
      if (el.name === 'lastVisit') {
        return <td style={{ verticalAlign: "middle" }} key={i}>{new Date(data[el.name]).toLocaleDateString()}</td>
      }
      return <td style={{ verticalAlign: "middle" }} key={i}>{data[el.name]}</td>
    })}
    <td>
      <Dropdown title={<Icon classname='fa-ellipsis-h' />} data={["Détails", "Supprimer"]} />
    </td>
  </tr>
)

export default ListItem
