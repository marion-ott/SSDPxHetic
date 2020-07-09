import React from 'react'
import { ConfigProvider } from 'antd'
import frFR from 'antd/es/locale/fr_FR'
import { Calendar } from 'antd'
import 'antd/dist/antd.css'

export default ({ onChange }) => (
  <ConfigProvider locale={frFR}>
    <Calendar fullscreen={false} locale={frFR} onChange={onChange} />
  </ConfigProvider>
)
