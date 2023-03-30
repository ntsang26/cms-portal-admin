import React, { useEffect, useRef, useState } from 'react'
import { Badge, Button, Table, Dropdown, Menu, Input, Row, Col, Select } from 'antd'
import * as icons from '@ant-design/icons'
import { helper, request } from 'services'
import './listviewer.scss'
import useQuery from 'hooks/useQuery'
import FilterInput from './components/FilterInput'
import moment from 'moment'
import Swal from 'sweetalert2'

const { Option } = Select

const ListViewer = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    total: 10,
    pageSize: 10,
    current: 1,
    showSizeChanger: 'true',
    position: ['bottomCenter'],
  })
  const [page, setPage] = useState({
    grid: [],
    apis: [],
    lsButton: [],
    onViewSreenButton: [],
    lsFilterField: [],
    read: '',
  })
  const [isCollapse, setIsCollapse] = useState(false)
  const [query, setQuery] = useState({})
  const collapseRef = useRef(null)
  const actionBtnRef = useRef(null)
  const reactQuery = useQuery()
  const pageSid = reactQuery.get('pageSid')

  useEffect(() => {
    getPage()
  }, [])

  useEffect(() => {
    if (page.read) getData()
  }, [page, pagination.pageSize, pagination.current])

  const getPage = async () => {
    if (!pageSid) return
    const currentPage = helper.getPage(pageSid)
    if (!currentPage) {
      helper.toast('error')
      window.history.back()
    } else {
      const { apis, buttons, grid, read } = currentPage
      const lsButton = buttons.filter((button) => button.type === 'button')
      const onViewSreenButton = buttons.filter((button) => button.onViewScreen)
      const lsFilterField = grid.filter((item) => item.filterable)
      setPage({
        grid,
        apis,
        lsButton,
        onViewSreenButton,
        lsFilterField,
        read,
      })
    }
  }

  const renderButton = (lsButton = [], lsApi = {}, value) => {
    const type = lsButton?.length > 1 ? 'Dropdown' : 'Button'
    if (type === 'Button') {
      return lsButton.map((button, key) => {
        let { url, action } = button
        url = url?.replace('{{sid}}', value)
        if (action === 'url') {
          return (
            <Button href={url} key={key} shape='round'>
              {button.title}
            </Button>
          )
        } else {
          return (
            <Button
              key={key}
              shape='round'
              onClick={() => {
                lsApi[button.api](value)
              }}
            >
              {button.title}
            </Button>
          )
        }
      })
    } else {
      const menu = (
        <Menu
          items={lsButton.map((button, key) => {
            let { url } = button
            url = url?.replace('{{sid}}', value)
            let label = null
            switch (button.action) {
              case 'url':
                label = <a href={url}>{button.title}</a>
                break
              default:
                label = (
                  <span
                    onClick={() => {
                      lsApi[button.api]({ data: { sid: value } })
                    }}
                  >
                    {button.title}
                  </span>
                )
                break
            }
            return {
              key,
              label,
            }
          })}
        />
      )
      return (
        <Dropdown overlay={menu} placement='bottomLeft'>
          <Button
            type='primary'
            shape='round'
            className={`font-weight-500`}
            icon={<icons.SettingOutlined />}
          >
            Button
          </Button>
        </Dropdown>
      )
    }
  }

  const generateApi = (apis = []) => {
    const result = {}
    for (const item of apis) {
      const { name, url, method, toast, after, confirm } = item
      result[name] = async ({ param = '', data }) => {
        const options = {
          url: url + `${param}`,
          method,
          data,
        }
        if (!data) delete options.data
        if (confirm) {
          Swal.fire({
            title: 'Are you sure?',
            text: confirm,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then(async (result) => {
            if (result.isConfirmed) {
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
          })
        } else {
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
    }
    return result
  }

  const renderScreenButton = () => {
    return page.onViewSreenButton.map((button) => {
      const Icon = icons[button.icon] || icons.QuestionOutlined
      switch (button.action) {
        case 'url':
          return (
            <Button
              href={button?.url}
              key={button.title}
              type='primary'
              size='large'
              shape='round'
              className={`font-size-15px font-weight-500`}
              icon={<Icon className={`font-size-15px`} />}
            >
              {button.title}
            </Button>
          )
        case 'api':
          return (
            <Button className={`ant-btn`} key={button.title} shape='round'>
              {button.title}
            </Button>
          )
        default:
          break
      }
    })
  }

  const getData = async () => {
    try {
      setIsLoading(true)
      const req = await lsApi[page.read]({ data: { pagination, query } })
      if (req.errorCode !== 0) return
      for (const i in req.data) {
        req.data[i].key = req.data[i]._id
      }
      setData(req.data)
      const pa = { ...pagination }
      pa.total = req.count
      setPagination(pa)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChangePagination = (page, pageSize) => {
    const pa = { ...pagination }
    pa.current = page
    pa.pageSize = pageSize
    setPagination(pa)
  }

  const handleOnChangeQuery = (el) => {
    const { operator, value, field } = el
    const qr = { ...query }
    if (!qr[field]) qr[field] = {}
    if (value || value === '') qr[field].value = value
    if (operator) qr[field].operator = operator
    if (!qr[field].operator) qr[field].operator = '$eq'
    setQuery(qr)
  }

  const handleCollapse = () => {
    setIsCollapse(!isCollapse)
  }

  const handleClearFilter = () => {
    setQuery({})
  }

  const columns = page.grid.map((item) => {
    const { name, field, widget } = item
    let Cell = () => null
    switch (widget) {
      case 'Badge':
        Cell = (text) => <Badge status={item.Badge[text]} text={text} />
        break
      case 'DateFormat':
        Cell = (text) => <p>{moment(text).format('MMMM Do YYYY, h:mm:ss a')}</p>
        break
      default:
        Cell = (text) => <p>{text}</p>
        break
    }
    return {
      title: name,
      dataIndex: field,
      filtered: true,
      render: (text) => Cell(text),
    }
  })

  const lsApi = page.apis.length ? generateApi(page.apis) : {}

  const actionColumn = {
    title: 'Actions',
    dataIndex: 'sid',
    width: 130,
    fixed: 'right',
    align: 'center',
    render: (value) => renderButton(page.lsButton, lsApi, value),
  }

  return (
    <div className='page_container px-4 py-2 pt-4 mx-2'>
      <div className={`listviewer-header mb-3`}>
        <div className='search-header ml-2'>
          <div className='w-500px'>
            <Button
              type='primary'
              shape='circle'
              icon={
                <icons.CaretDownOutlined
                  style={{
                    transition: 'all 0.3s',
                    transform: `rotate( ${isCollapse ? '180deg' : '0'})`,
                  }}
                />
              }
              size={'large'}
              className='ml-1'
              onClick={handleCollapse}
            />
          </div>
          <div className={`mb-2`}>{renderScreenButton()}</div>
        </div>
        <div
          className={`search-collapse mt-1 position-relative`}
          style={{
            height: isCollapse
              ? collapseRef.current.clientHeight + actionBtnRef.current.clientHeight
              : 0,
            position: 'relative',
          }}
        >
          <Row ref={collapseRef}>
            <FilterInput
              query={query}
              lsFilterField={page.lsFilterField}
              handleOnChangeQuery={(obj) => {
                handleOnChangeQuery(obj)
              }}
            />
            <Col md={6}>
              <Select
                placeholder='Sort by'
                size='large'
                defaultValue={'createdAt'}
                style={{ width: '100%' }}
                onChange={(value) => {
                  let pagi = { ...pagination }
                  pagi.sort = value
                  setPagination(pagi)
                }}
              >
                {page.lsFilterField.map((item, key) => (
                  <Option value={item.field} key={key}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <div ref={actionBtnRef} style={{ position: 'absolute', right: 0, bottom: 0 }}>
              <Button
                type='primary'
                shape='round'
                icon={<icons.SearchOutlined />}
                size={'large'}
                className='ml-2'
                onClick={getData}
              />
              <Button
                type='primary'
                shape='round'
                icon={<icons.ClearOutlined />}
                size={'large'}
                className='ml-1'
                onClick={handleClearFilter}
              />
            </div>
          </Row>
        </div>
      </div>
      <Table
        dataSource={data}
        columns={[...columns, actionColumn]}
        pagination={{
          ...pagination,
          onChange: handleOnChangePagination,
        }}
        loading={isLoading}
      />
    </div>
  )
}

export default ListViewer
