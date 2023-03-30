import React, { useEffect, useState } from 'react'
import helper from 'services/helper.js'
import { VALIDATE } from 'constant'
import local from 'services/local'
import { api } from 'services/api'
import Widgets from 'utilities/widgetv2'
import { UserOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import { Avatar, Button, Col, Row, Tag, Typography } from 'antd'
import '../dashboard.scss'

const Profile = () => {
  const [context, setContext] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errorMsg, setErrorMsg] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    handleProfile.getUser()
  }, [])

  const handleProfile = {
    getUser: async () => {
      let currentUser = local.get('user')
      let rs = await api.getUser({ sid: currentUser.sid })
      if (rs.errorCode != 0) helper.toast('error', rs.errorMsg)
      else setContext(rs.data)
    },
    onChange: (field, value) => {
      let clCtx = { ...context }
      let clErrMsg = { ...errorMsg }
      clCtx[field] = value
      clErrMsg[field] = ''
      if (clCtx['currentPassword'] === '') {
        for (const item of PASSWORD.filter(pas => pas.field !== 'currentPassword')) {
          clCtx[item.field] = ''
          if (!context[item.field]) {
            clErrMsg[item.field] = ''
          }
        }
      }
      setErrorMsg(clErrMsg)
      setContext(clCtx)
    },
    submit: () => {
      if (handleProfile.handleValidate()) {
        Swal.fire({
          title: 'Are you sure?',
          text: "If not, please check again.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            let rs = await api.updateUser({ context })
            if (rs.errorCode !== 0) {
              console.log(rs.errorMsg)
            } else {
              setContext(rs.data[0])
              Swal.fire(
                'Updated!',
                'Successfully changed information.',
                'success'
              )
            }
          }
        })
      }
    },
    handleValidate: () => {
      let check = true
      let clErrMsg = { ...errorMsg }
      for (const item of INFORMATION) {
        if (!context[item.field]) {
          clErrMsg[item.field] = `Please enter ${item.name}`
          check = false
        }
      }
      if (context['currentPassword']) {
        if (context['newPassword'] && context['confirmPassword']) {
          if (context['newPassword'] === context['confirmPassword']) {
            let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
            if (!decimal.test(context['newPassword'])) {
              clErrMsg['newPassword'] = VALIDATE.profile.notMatchRegex
              check = false
              setErrorMsg(clErrMsg)
            }
          } else {
            clErrMsg['confirmPassword'] = VALIDATE.profile.notMatch
            check = false
            setErrorMsg(clErrMsg)
          }
        } else {
          for (const item of PASSWORD.filter(pas => pas.field !== 'currentPassword')) {
            if (!context[item.field]) {
              clErrMsg[item.field] = `Please enter ${item.name}`
              check = false
            }
          }
          setErrorMsg(clErrMsg)
        }
      }
      setErrorMsg(clErrMsg)

      return check
    }
  }

  return (
    <div className='bg-color-gray-200 px-4 py-4 mx-2 br-6px'>
      <div className='bg-color-white py-3 br-6px bg-dashboard bg-profile'>
        <Row gutter={[24, 16]}>
          <Col span={24}>
            <div className='flex'>
              {context.avatar ? (
                <Avatar shape='square' icon={<UserOutlined />} size={144} />
              ) : (
                <Avatar shape='square' icon={<UserOutlined />} size={144} />
              )}
              <div className='ml-2'>
                <h2>{context.name.toUpperCase()}</h2>
                <Tag color='#f50'>{context.client}</Tag>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <h3>Personal Information</h3>
            {INFORMATION.map((item) => {
              const { name, field, widget } = item
              const Widget = Widgets[widget]
              const value = context[field]
              return (
                <div className='form-group mb-3' key={field}>
                  <Widget
                    value={value}
                    label={name}
                    field={field}
                    onChange={(value) => handleProfile.onChange(field, value)}
                  />
                  <Typography.Text type='danger'>{errorMsg[field]}</Typography.Text>
                </div>
              )
            })}
          </Col>
          <Col span={12}>
            <h3>Change password</h3>
            {PASSWORD.map((item) => {
              const { name, field, widget, type } = item
              const Widget = Widgets[widget]
              const value = context[field]
              return (
                <div className='form-group mb-3' key={field}>
                  <Widget
                    type={type}
                    value={value}
                    label={name}
                    field={field}
                    onChange={(value) => handleProfile.onChange(field, value)}
                  />
                  <Typography.Text type='danger'>{errorMsg[field]}</Typography.Text>
                </div>
              )
            })}
          </Col>
          <Col span={24}>
            <div>
              <Button type='primary' shape='round' size='large' onClick={handleProfile.submit}>
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

const INFORMATION = [
  {
    name: 'Name',
    field: 'name',
    type: 'string',
    required: true,
    widget: 'Text',
  },
  {
    name: 'Email',
    field: 'email',
    type: 'string',
    required: true,
    widget: 'Text',
  },
]

const PASSWORD = [
  {
    name: 'Current Password',
    field: 'currentPassword',
    type: 'password',
    required: true,
    widget: 'Text',
  },
  {
    name: 'New Password',
    field: 'newPassword',
    type: 'password',
    required: true,
    widget: 'Text',
  },
  {
    name: 'Confirm Password',
    field: 'confirmPassword',
    type: 'password',
    required: true,
    widget: 'Text',
  },
]

export default Profile