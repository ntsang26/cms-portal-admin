import React, { useEffect, useState } from 'react'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row } from 'antd'
import Widgets from 'utilities/widgetv2'
import helper from 'services/helper.js'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const TabApis = (props) => {
  const [apis, setApis] = useState([])
  const [actApi, setActApi] = useState(null)

  useEffect(() => {
    setApis(props.apis)
  }, [props.apis])

  const handleApi = {
    add: () => {
      const api = [...apis]
      if (api[api.length - 1]?.name === '') {
        helper.toast('warning', 'Please complete current API!')
      } else {
        api.push({
          title: '',
          name: '',
          method: 'post',
          url: '',
          after: 'back',
          toast: 'true',
        })
        props.onChange(api)
      }
    },
    delete: (idx) => {
      const api = [...apis]
      api.splice(idx, 1)
      setActApi(null)
      props.onChange(api)
    },
    onChange: (field, value) => {
      const clApis = [...apis]
      clApis[actApi][field] = value
      props.onChange(clApis)
    },
  }

  return (
    <div className='editor-tab mt-3'>
      <span className='shape-left mb-2 pl-1'>
        <Card
          title='API'
          extra={
            <Button shape='round' icon={<PlusOutlined />} onClick={handleApi.add}>
              Add new
            </Button>
          }
          className='br-6px min-h-100'
        >
          <DragDropContext onDragEnd={(result) => props.handleOnDragEnd(result)}>
            <Droppable droppableId='apis'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {apis.map((api, key) => (
                    <Draggable
                      key={key.toString() || 'new-api'}
                      draggableId={key.toString() || 'new-api'}
                      index={key}
                    >
                      {(provided) => (
                        <div
                          className='py-1'
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className={`shape-left-step ${key === actApi ? 'active' : ''}`}
                            onClick={() => {
                              setActApi(key)
                            }}
                          >
                            <b>{api.name || 'New API'}</b>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Card>
      </span>
      <span className='shape-right mb-2 pl-1'>
        <Card
          title='Information'
          extra={
            actApi !== null ? (
              <Button
                shape='round'
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleApi.delete(actApi)}
              >
                Delete
              </Button>
            ) : null
          }
          className='br-6px min-h-100'
        >
          {actApi !== null ? (
            <Row>
              {FIELDS.map((item) => {
                const { name, field, widget, options, w } = item
                const Widget = Widgets[widget]
                const row = apis[actApi] || {}
                const value = row[field]
                return (
                  <Col key={field} sm={12} md={w || 6} className='px-2 mt-2'>
                    <Widget
                      field={field}
                      options={options}
                      label={name}
                      value={value}
                      onChange={(value) => {
                        handleApi.onChange(field, value)
                      }}
                    />
                  </Col>
                )
              })}
            </Row>
          ) : null}
        </Card>
      </span>
    </div>
  )
}

const FIELDS = [
  {
    name: 'Title',
    field: 'title',
    type: 'string',
    required: true,
    widget: 'Text',
  },
  {
    name: 'Name',
    field: 'name',
    type: 'string',
    required: true,
    widget: 'Text',
  },
  {
    name: 'Method',
    field: 'method',
    type: 'string',
    required: true,
    widget: 'SelectWidget',
    options: [
      {
        label: 'GET',
        value: 'get',
      },
      {
        label: 'POST',
        value: 'post',
      },
      {
        label: 'PUT',
        value: 'put',
      },
      {
        label: 'DELETE',
        value: 'delete',
      },
    ],
  },
  {
    name: 'URL',
    field: 'url',
    type: 'string',
    required: true,
    widget: 'Text',
  },
  {
    name: 'After API',
    field: 'after',
    type: 'string',
    required: true,
    widget: 'SelectWidget',
    options: [
      {
        label: 'None',
        value: 'none',
      },
      {
        label: 'Reload',
        value: 'reload',
      },
      {
        label: 'Back',
        value: 'back',
      },
      {
        label: 'Read again',
        value: 'readAgain',
      },
    ],
  },
  {
    name: 'Toast',
    field: 'toast',
    type: 'string',
    required: true,
    widget: 'SwitchWidget',
  },
  {
    name: 'Confirm',
    field: 'confirm',
    type: 'string',
    widget: 'TextArea',
    w: 24,
  },
]

export default TabApis
