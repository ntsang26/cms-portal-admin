import { Button, Checkbox, Col, Form, Input, Row, Spin, Typography } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import * as icons from '@ant-design/icons'
import Widgets from 'utilities/widgetv2'
import { helper, request } from 'services'
import useQuery from 'hooks/useQuery'
import IconModal from 'utilities/components/IconModal/index.js'
import './editor.scss'

const Editor = (props) => {
  const [pageInfo, setPageInfo] = useState({
    schema: [],
    apis: [],
    lsButton: [],
    read: null,
  })
  const [context, setContext] = useState({})
  const [loading, setLoading] = useState(false)
  const [isIconModalOpen, setIsIconModalOpen] = useState(false)
  const reactQuery = useQuery()
  const sid = reactQuery.get('sid'),
    mode = reactQuery.get('mode'),
    pageSid = reactQuery.get('pageSid')

  useEffect(() => {
    getPage()
  }, [pageSid])

  useEffect(() => {
    if (pageInfo.sid) {
      if (pageInfo.read && mode === 'edit') getData()
      else {
        const cont = {}
        for (const schema of pageInfo.schema) {
          const { field, type } = schema
          switch (type) {
            case "json":
              cont[field] = {}
              break;
            case "number":
              cont[field] = 0
              break;
            default:
              cont[field] = ""
              break;
          }
        }
        setContext(cont)
      }
    }
  }, [pageInfo, sid])

  const getPage = async () => {
    try {
      setLoading(true)
      if (!pageSid) return
      const currentPage = helper.getPage(pageSid)
      if (!currentPage) {
        helper.toast('error')
        window.history.back()
      } else {
        const { apis, buttons, read, schema, sid } = currentPage
        const submitButton = buttons.filter(
          (button) => button.mode === mode && button.type === 'submit'
        )
        setPageInfo({
          schema,
          apis,
          submitButton,
          read,
          sid
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getData = async () => {
    const req = await generateApi(pageInfo?.apis)[pageInfo.read]({
      data: { query: { sid: { value: sid, operator: '$eq' } } },
      toast: false,
    })
    if (req.errorCode !== 0 || !req.data.length) return null
    setContext(req.data[0])
  }

  const handleOnChange = (field, value) => {
    const ctx = { ...context }
    ctx[field] = value
    setContext(ctx)
  }

  const renderButton = () => {
    const { submitButton } = pageInfo
    const lsApi = generateApi(pageInfo?.apis)
    const visibleButton = submitButton?.filter((button) => button.mode === mode) || []
    return visibleButton.map((button, key) => {
      const { title, api, action, icon } = button
      const Icon = icons[icon] || icons.QuestionOutlined
      switch (action) {
        case 'url':
          return (
            <Button
              href={button.url}
              onClick={() => {
                lsApi[api]({ data: { context } })
              }}
              key={key}
              shape='round'
              size='large'
              type='primary'
              icon={<Icon className={`font-size-15px`} />}
            >
              {title}
            </Button>
          )
        default:
          return (
            <Button
              onClick={() => {
                lsApi[api]({ param: `?pageSid=${pageSid}`, data: { context } })
              }}
              shape='round'
              size='large'
              type='primary'
              color='#fffff'
              key={key}
              icon={<Icon className={`font-size-15px`} />}
            >
              {title}
            </Button>
          )
      }
    })
  }

  const renderInput = (item) => {
    const { name, type, widget, field, value, api, defaultValue, options } = item
    const apiParams = pageInfo.apis.find((item) => item.name === api) || null
    const Widget = Widgets[widget] || Widgets.Text
    return (
      <Widget
        field={field}
        label={name}
        type={type}
        value={context[field]}
        context={context}
        options={options}
        defaultValue={defaultValue}
        apiParams={apiParams}
        onChange={(value) => {
          handleOnChange(field, value)
        }}
        data={value}
        openModal={() => setIsIconModalOpen(true)}
      />
    )
  }

  const generateApi = (apis) => {
    const result = {}
    for (const item of apis) {
      const { name, url, method, after, toast } = item
      result[name] = async ({ param = '', data }) => {
        const options = {
          url: url + `${param}`,
          method,
          data,
        }
        if (!data) delete options.data
        const req = await request.request(options)
        if (req.errorCode === 0) {
          if (toast) helper.toast('success')
          switch (after) {
            case 'reload':
              window.location.reload()
              break
            case 'back':
              window.history.back()
              break
            case 'readAgain':
              getData()
              break
            default:
              break
          }
        }
        return req
      }
    }
    return result
  }

  useMemo(() => {
    generateApi(pageInfo?.apis)
  }, [pageInfo?.apis])

  return (
    <div className='bg-color-gray-200 px-4 py-4 mx-2 br-6px'>
      <div className='bg-color-white br-6px py-3 mb-3'>
        {loading ? (
          <div
            className='h-200px'
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Spin size='large' />
          </div>
        ) : (
          <Row className='px-4 py-2'>
            <Col span={24} className='mb-4'>
              <Row justify='space-between' align='middle'>
                <Col>
                  <Typography.Title level={2} style={{ marginBottom: 0 }}>
                    Editor Page
                  </Typography.Title>
                </Col>
                <Col>{renderButton()}</Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={12} style={{ marginBottom: '-1rem' }}>
                {pageInfo?.schema?.map((item, idx) => (
                  <Col key={idx} span={item.w || 6} className="mb-3">
                    {renderInput(item)}
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}
      </div>
      <IconModal isOpen={isIconModalOpen} hide={() => setIsIconModalOpen(false)} />
    </div>
  )
}

export default Editor
