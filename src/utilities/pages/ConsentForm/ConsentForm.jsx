import React, { useEffect, useState } from 'react'
import i18next from 'i18next'
import queryString from 'qs'
import { Card, CardBody, div, Col, div, Row, Button } from 'antd'
import './consentForm.scss'
import { api } from 'services'

const ConsentForm = (props) => {
  const [configs, setConfigs] = useState([])
  const [email, setEmail] = useState('')
  const [token, setToken] = useState({})

  useEffect(() => {
    let query = queryString.parse(props.location.search, {
      ignoreQueryPrefix: true,
    })
    if (query.configs && query.email) {
      setConfigs(JSON.parse(query.configs))
      setEmail(JSON.parse(query.email))
      setToken(JSON.parse(query.code))
    }
  }, [])
  async function handle(organizationDomain, company) {
    try {
      let rs = await api.consent({ email, organizationDomain, company, token })
      if (rs && rs.errorCode === 0) {
        window.open(rs.data.link, '_self')
      } else {
        props.history.push(`/login`)
      }
    } catch (error) {
      console.log('Consent', error)
    }
  }
  return (
    <div>
      <div className='cs-header'>
        <div className='cs-brand'>JITS_AI_PORTAl</div>

        <div className='cs-email'>{email}</div>
      </div>
      <div className=' flex-row align-items-center d-flex' style={{ height: '90vh' }}>
        <div>
          <Row className='justify-content-center'>
            <Col md='6'>
              <div>
                <Card className='p-4'>
                  <CardBody>
                    <Row className='mb-3x'>
                      <Col md={12} className='mb-1'>
                        <span style={{ fontSize: '28px !important', fontWeight: 'bolder' }}>
                          {i18next.t('Select organization')}
                        </span>
                      </Col>
                      <Col md={12} className='mb-1'>
                        <label>{i18next.t('Below are the organization you can access')}</label>
                      </Col>
                      {configs.map((con, idx) => (
                        <Col md='12' key={idx} className='row-cf'>
                          <div className='float-left'>
                            <div className='bold'>{con.organizationName}</div>
                            <div className='cs-domain'>{con.organizationDomain}</div>
                          </div>
                          <div className='cs-btn'>
                            <Button
                              color='success'
                              onClick={() => handle(con.organizationDomain, con.company)}
                            >
                              {i18next.t('open')}
                            </Button>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default ConsentForm
