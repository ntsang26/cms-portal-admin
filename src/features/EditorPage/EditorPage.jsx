import React, { useEffect, useState } from 'react'
import { Col, Tabs, Row, Typography, Button } from 'antd'
import { TabSchema, TabGrid, TabButton, TabApis } from './components'
import useQuery from 'hooks/useQuery'
import Widgets from 'utilities/widgetv2'
import { api, helper } from 'services'
import './editorPage.scss'

const EditorPage = () => {
  const reactQuery = useQuery()
  const pageSid = reactQuery.get('sid')
  const [page, setPage] = useState({
    name: '',
    desc: '',
    client: 'admin',
    buttons: [],
    apis: [],
    schema: [],
    grid: [],
    read: null,
  })

  useEffect(() => {
    if (pageSid && !page.sid) handlePage.get()
  }, [pageSid])

  const handlePage = {
    onChange: (field, value) => {
      const pg = { ...page }
      pg[field] = value
      setPage(pg)
    },
    get: async () => {
      try {
        const rs = await api.getPage({ query: { sid: { value: pageSid, operator: '$eq' } } })
        if (rs.errorCode !== 0 || !rs.count) return helper.toast('error', 'Page not found')
        setPage(rs.data[0])
      } catch (error) {
        console.log(error)
      }
    },
    create: async () => {
      if (validateEditorTab() === false) {
        try {
          const rs = await api.createPage({ context: page })
          if (rs?.errorCode !== 0) return helper.toast('error', 'Create fail')
          helper.toast('success', 'Create success')
          setPage(rs.data)
          window.location.replace(`/editorPage?mode=edit&sid=${rs.data?.sid}`)
        } catch (error) {
          console.log(error)
        }
      }
    },
    update: async () => {
      if (validateEditorTab() === false) {
        try {
          const rs = await api.updatePage({ context: page })
          if (rs?.errorCode !== 0) return helper.toast('error', 'Update fail')
          helper.toast('success', 'Update success')
        } catch (error) {
          console.log(error)
        }
      }
    },
  }

  const handleOnDragEnd = (result, arr = {}) => {
    if (!result.destination) return
    const items = [...page[arr]]
    const [reorderItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderItem)
    const newPage = {
      ...page,
      [arr]: items,
    }
    setPage(newPage)
    handlePage.onChange(arr, newPage[arr])
  }

  const validateEditorTab = () => {
    const { apis, buttons, grid, schema } = page
    if (page.name === '') {
      helper.toast('warning', 'Please complete infomation!')
      return true
    } else if (apis[apis.length - 1]?.name === '') {
      helper.toast('warning', 'Please complete current API!')
      return true
    } else if (buttons[buttons.length - 1]?.title === '') {
      helper.toast('warning', 'Please complete current button!')
      return true
    } else if (grid[grid.length - 1]?.name === '') {
      helper.toast('warning', 'Please complete current grid!')
      return true
    } else if (schema[schema.length - 1]?.name === '') {
      helper.toast('warning', 'Please complete current schema!')
      return true
    } else {
      return false
    }
  }

  const apiReadOptions = page.apis?.map((item) => {
    return { label: item.name, value: item.name }
  })

  const BASE_FIELDS = [
    {
      name: 'Name',
      field: 'name',
      type: 'string',
      required: true,
      widget: 'Text',
    },
    {
      name: 'Client',
      field: 'client',
      type: 'string',
      required: true,
      widget: 'SelectWidget',
      options: [
        {
          label: 'Employee',
          value: 'employee',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
    },
    {
      name: 'Read',
      field: 'read',
      type: 'string',
      required: true,
      widget: 'SelectWidget',
      options: apiReadOptions,
    },
    {
      name: 'Description',
      field: 'desc',
      type: 'string',
      required: true,
      widget: 'Text',
    },
  ]

  return (
    <div className='editor-page bg-color-gray-200 px-4 py-4 mx-2 br-6px'>
      <div className='bg-color-white px-3 py-3 br-6px'>
        <Row justify='space-between' align='middle'>
          <Col>
            <Typography.Title className='ml-4' level={2}>
              {page.sid ? page.name : 'Create new page'}
            </Typography.Title>
          </Col>
          <Col>
            <Button shape='round' size='large' onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button
              shape='round'
              size='large'
              type='primary'
              className='ml-2'
              onClick={() => {
                if (page.sid) handlePage.update()
                else handlePage.create()
              }}
            >
              {page.sid ? 'Save' : 'Create'}
            </Button>
          </Col>
        </Row>
        <Row>
          {BASE_FIELDS?.map((item) => {
            const { name, field, widget, options, w } = item
            const Widget = Widgets[widget] || Widgets.Text
            return (
              <Col key={field} sm={w || 12} md={w || 6} className='px-2'>
                <Widget
                  field={field}
                  options={options}
                  label={name}
                  value={page[field]}
                  onChange={(value) => {
                    handlePage.onChange(field, value)
                  }}
                />
              </Col>
            )
          })}
        </Row>
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='API' key='1'>
            <TabApis
              apis={page.apis}
              onChange={(arr) => {
                handlePage.onChange('apis', arr)
              }}
              handleOnDragEnd={(result) => {
                handleOnDragEnd(result, 'apis')
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Button' key='2'>
            <TabButton
              buttons={page.buttons}
              apis={page.apis}
              onChange={(arr) => {
                handlePage.onChange('buttons', arr)
              }}
              handleOnDragEnd={(result) => {
                handleOnDragEnd(result, 'buttons')
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Grids' key='3'>
            <TabGrid
              grid={page.grid}
              onChange={(arr) => {
                handlePage.onChange('grid', arr)
              }}
              handleOnDragEnd={(result) => {
                handleOnDragEnd(result, 'grid')
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Schema' key='4'>
            <TabSchema
              schema={page.schema}
              onChange={(arr) => {
                handlePage.onChange('schema', arr)
              }}
              handleOnDragEnd={(result) => {
                handleOnDragEnd(result, 'schema')
              }}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default EditorPage
