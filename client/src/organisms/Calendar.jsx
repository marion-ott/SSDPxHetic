import React from 'react'
import { ConfigProvider } from 'antd'
import frFR from 'antd/es/locale/fr_FR'
import { DatePicker } from 'antd'
import 'antd/dist/antd.css'
import moment from 'moment'

export default ({ onChange, selected }) => (
  <ConfigProvider locale={frFR}>
    <DatePicker
      onChange={onChange}
      locale={frFR}
      open={true}
      defaultOpen={true}
      defaultValue={moment(selected)}
      picker='week'
      onChange={onChange}
    />
  </ConfigProvider>
)
