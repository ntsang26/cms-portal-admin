import React, { Component } from 'react'
import { Button, Card, Col, Input, Row } from 'antd'

import i18next from 'i18next'
import queryString from 'qs'

import Loader from 'utilities/components/Loader'
import { api, config, local, helper } from 'services'
import { Icons } from 'constant/icons'
import DeviceDetector from 'device-detector-js'

import './style.scss'
import eyeicon from 'assets/icons/visibility.png'
import jitsLogo from 'assets/icons/jits_logo.png'
import aiBg from 'assets/icons/ai_bg.jpg'
const deviceDetector = new DeviceDetector()
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      disableLogin: false,
      isShowPassword: false,
    }
  }
  componentDidMount() {
    this.query = queryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    })
    if (this.query.data) {
      var data = JSON.parse(this.query.data)
      local.set('session', data.token)
      local.set('user', JSON.stringify(data.userInfo))
      this.props.history.push(`/dashboard`)
      console.log(this.query)
    } else if (this.query.message) {
      helper.toast('success', this.query.message)
    }
  }

  async onLoginClick(e) {
    e.preventDefault()
    try {
      this.setState({ disableLogin: true })

      let rs = await api.login(
        {
          username: this.state.username,
          password: this.state.password,
        },
        {
          headers: {
            Authorization: `Basic ${config.BASIC_TOKEN}`,
          },
        }
      )

      if (rs?.data) {
        local.set('session', JSON.stringify(rs.data.token))
        local.set('user', JSON.stringify(rs.data.userInfo))
        local.set('expiredAt', JSON.stringify(rs.data.expiredAt))
        this.props.history.push(`/dashboard`)
      }
    } catch (err) {
      helper.toast('error', err)
    } finally {
      this.setState({ disableLogin: false })
    }
  }

  forgotPassword() {
    this.props.history.push('/forgotPassword')
  }
  register() {
    this.props.history.push('/join')
  }
  handleOnChange = (field, value) => {
    let v = value.replace(' ', '')
    this.setState({ [field]: v })
  }

  render() {
    let { disableLogin } = this.state
    if (this.state.isLoading) return <Loader />
    return (
      <div className='background-container'>
        <div className='my-container'>
          <div
            className='background-login'
            style={{
              backgroundImage: `url(${aiBg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          ></div>
          <div className='container-login'>
            <Card className='p-3'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <img src={jitsLogo} alt='JITS' className='jitsLogo' />
                  </div>
                  <p className='title'>{i18next.t('JITS CMS PORTAL')}</p>
                  <div className='mb-1'>
                    <Input
                      prefix={Icons.UserOutlined}
                      type='text'
                      placeholder={i18next.t('Username')}
                      value={this.state.username}
                      onChange={(evt) => {
                        this.handleOnChange('username', evt.target.value)
                      }}
                      size='large'
                      className={'br-20px mb-2'}
                    />
                  </div>
                  <div className='mb-1'>
                    <Input
                      prefix={Icons.LockOutlined}
                      suffix={
                        <div
                          onClick={() => {
                            this.setState({ isShowPassword: !this.state.isShowPassword })
                          }}
                        >
                          {this.state.isShowPassword ? (
                            Icons.EyeOutlined
                          ) : (
                            <img src={eyeicon} alt='eye' />
                          )}
                        </div>
                      }
                      type={this.state.isShowPassword ? 'text' : 'password'}
                      placeholder={i18next.t('password')}
                      value={this.state.password}
                      autoComplete='off'
                      onChange={(evt) => {
                        this.handleOnChange('password', evt.target.value)
                      }}
                      size='large'
                      className={'br-20px mb-2'}
                    />
                  </div>

                  <Row>
                    <Col span='24'>
                      <Button
                        block
                        type='primary'
                        onClick={this.onLoginClick.bind(this)}
                        disabled={disableLogin}
                        size='large'
                        shape='round'
                        className='mb-2'
                      >
                        {i18next.t('login')}
                      </Button>
                    </Col>
                    <Col span='24' className='text-align-center'>
                      <span>{i18next.t('OR')}</span>
                    </Col>

                    <Col span='24' className='text-right'>
                      <Button
                        color='link'
                        onClick={() => this.forgotPassword()}
                        className='mb-2'
                        type='button'
                        size='large'
                        shape='round'
                        block
                      >
                        {i18next.t('Forgot Password')}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
