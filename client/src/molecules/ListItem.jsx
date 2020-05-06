import React from 'react'

const ListItem = ({ index, data, keys }) => (
  <tr>
    <th>{index}</th>
    {keys.map((el, i) => {
      if (typeof data[el.name] == 'object') {
        return <td key={i}>{data[el.name] ? data[el.name].zone : 'N/A'}</td>
      }
      return <td key={i}>{data[el.name]}</td>
    })}
  </tr>
)

export default ListItem
