import { Typography } from 'antd'
import React from 'react'
import './dashboard.scss'

const Dashboard = () => {
  return (
    <div className='bg-color-gray-200 px-4 py-4 mx-2 br-6px'>
      <div className='bg-color-white px-3 py-3 br-6px bg-dashboard'>
        <Typography.Title level={1}>Welcome to JITS CMS PORTAL</Typography.Title>
      </div>
    </div>
  )
}

export default Dashboard
