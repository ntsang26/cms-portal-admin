import React, { useEffect, useState } from 'react'
import helper from 'services/helper.js'
import { CopyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import IconModal from 'utilities/components/IconModal/index.js'
import Widgets from 'utilities/widgetv2'

const TabButton = (props) => {
  const { apis } = props
  const [buttons, setButtons] = useState([])
  const [actButton, setActButton] = useState(null)
  const [isIconModalOpen, setIsIconModalOpen] = useState(false)

  useEffect(() => {
    setButtons(props.buttons)
  }, [props.buttons])

  const handleButton = {
    add: () => {
      const btn = [...buttons]
      if (btn[btn.length - 1]?.title === '') {
        helper.toast('warning', 'Please complete current button!')
      } else {
        btn.push({
          mode: 'create',
          title: '',
          action: 'url',
          icon: '',
          type: 'button',
        })
        props.onChange(btn)
      }
    },
    delete: (idx) => {
      const btn = [...buttons]
      btn.splice(idx, 1)
      setActButton(null)
      props.onChange(btn)
    },
    duplicate: (idx) => {
      const btn = [...buttons, { ...buttons[idx] }]
      props.onChange(btn)
    },
    onChange: (field, value) => {
      const clButtons = [...buttons]
      clButtons[actButton][field] = value
      props.onChange(clButtons)
    },
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
      name: 'Mode',
      field: 'mode',
      type: 'string',
      required: true,
      widget: 'SelectWidget',
      options: [
        {
          label: '',
          value: '',
        },
        {
          label: 'Create',
          value: 'create',
        },
        {
          label: 'Edit',
          value: 'edit',
        },
      ],
    },
    {
      name: 'Action',
      field: 'action',
      type: 'string',
      required: true,
      widget: 'SelectWidget',
      options: [
        {
          label: 'Redirect',
          value: 'url',
        },
        {
          label: 'Api',
          value: 'api',
        },
      ],
    },
    {
      name: 'Api',
      field: 'api',
      type: 'string',
      required: true,
      widget: 'SelectWidget',
      options: apis.map((api) => {
        return {
          label: api.name,
          value: api.name,
        }
      }),
    },
    {
      name: 'Type',
      field: 'type',
      type: 'string',
      required: true,
      widget: 'SelectWidget',
      options: [
        {
          label: 'Button',
          value: 'button',
        },
        {
          label: 'Submit',
          value: 'submit',
        },
      ],
    },
    {
      name: 'Url',
      field: 'url',
      type: 'string',
      required: true,
      disable: buttons[actButton]?.url,
      widget: 'Text',
    },
    {
      name: 'Icon',
      field: 'icon',
      type: 'string',
      required: true,
      widget: 'Text',
    },
    {
      name: 'Description',
      field: 'desc',
      type: 'string',
      required: true,
      widget: 'Text',
    },
    {
      name: 'On View Screen',
      field: 'onViewScreen',
      type: 'string',
      required: true,
      widget: 'SwitchWidget',
    },
  ]

  return (
    <div className='editor-tab mt-3'>
      <span className='shape-left mb-2 pl-1'>
        <Card
          title='Button'
          extra={
            <Button shape='round' icon={<PlusOutlined />} onClick={handleButton.add}>
              Add new
            </Button>
          }
          className='br-6px min-h-100'
        >
          <DragDropContext onDragEnd={(result) => props.handleOnDragEnd(result)}>
            <Droppable droppableId='buttons'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {buttons.map((button, key) => (
                    <Draggable
                      key={key.toString() || 'new-btn'}
                      draggableId={key.toString() || 'new-btn'}
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
                            className={`shape-left-step ${key === actButton ? 'active' : ''}`}
                            onClick={() => {
                              setActButton(key)
                            }}
                          >
                            <b>{button.title || 'New Button'}</b>
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
            actButton !== null ? (
              <>
                <Button
                  shape='round'
                  icon={<CopyOutlined />}
                  onClick={() => handleButton.duplicate(actButton)}
                  className="mr-2"
                >
                  Dupicate
                </Button>
                <Button
                  shape='round'
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleButton.delete(actButton)}
                >
                  Delete
                </Button>
              </>
            ) : null
          }
          className='br-6px min-h-100'
        >
          {actButton !== null ? (
            <Row>
              {FIELDS.map((item) => {
                const { name, field, widget, options } = item
                const Widget = Widgets[widget]
                const row = buttons[actButton] || {}
                const value = row[field]
                return (
                  <Col key={field} sm={12} md={6} className='px-2 mt-2'>
                    <Widget
                      field={field}
                      options={options}
                      label={name}
                      value={value}
                      onChange={(value) => {
                        handleButton.onChange(field, value)
                      }}
                      openModal={() => setIsIconModalOpen(true)}
                    />
                  </Col>
                )
              })}
            </Row>
          ) : null}
        </Card>
      </span>
      <IconModal isOpen={isIconModalOpen} hide={() => setIsIconModalOpen(false)} />
    </div>
  )
}

export default TabButton
