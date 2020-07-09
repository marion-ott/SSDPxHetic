import React from 'react'
import { Icon as EveIcon } from '@ui-kitten/components'
import Colors from '../../constants/Colors'

const Icon = ({
  name,
  focused,
  fill = Colors.tabIconDefault,
  width = 23,
  height = 23
}) => (
    <EveIcon
      style={{ width, height }}
      name={name}
      fill={focused ? Colors.tabIconSelected : fill}
    />
  )

export default Icon
