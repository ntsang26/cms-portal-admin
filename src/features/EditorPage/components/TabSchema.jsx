import React, { useEffect, useState } from 'react'
import { CopyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row } from 'antd'
import Widgets from 'utilities/widgetv2'
import helper from 'services/helper.js'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const TabSchema = (props) => {
  const [schema, setSchema] = useState([])
  const [actSchema, setActSchema] = useState(null)

  useEffect(() => {
    setSchema(props.schema)
  }, [props.schema])

  const handleSchema = {
    add: () => {
      const sch = [...schema]
      if (sch[sch.length - 1]?.name === '') {
        helper.toast('warning', 'Please complete current schema!')
      } else {
        sch.push({
          name: '',
          field: '',
          type: 'string',
          required: 'true',
          widget: '',
          w: '1',
        })
        props.onChange(sch)
      }
    },
    delete: (idx) => {
      const sch = [...schema]
      sch.splice(idx, 1)
      setActSchema(null)
      props.onChange(sch)
    },
    duplicate: (idx) => {
      const sch = [...schema, { ...schema[idx] }]
      props.onChange(sch)
    },
    onChange: (field, value) => {
      const clSchema = [...schema]
      clSchema[actSchema][field] = value
      props.onChange(clSchema)
    },
  }

  const FIELDS = [
    {
      name: 'Name',
      field: 'name',
      type: 'string',
      required: true,
      widget: 'Text',
    },
    {
      name: 'Field',
      field: 'field',
      type: 'string',
      required: true,
      widget: 'Text',
    },
    {
      name: 'Required',
      field: 'required',
      type: 'string',
      required: true,
      widget: 'SwitchWidget',
    },
    {
      name: 'Type',
      field: 'type',
      type: 'string',
      required: true,
      widget: 'SelectWidget',
      options: [
        {
          label: 'String',
          value: 'string',
        },
        {
          label: 'Number',
          value: 'number',
        },
        {
          label: 'Date',
          value: 'date',
        },
        {
          label: 'Json',
          value: 'json',
        },
        {
          label: 'Boolean',
          value: 'boolean'
        }
      ],
    },
    {
      name: 'Widget',
      field: 'widget',
      type: 'string',
      required: true,
      widget: 'SelectWidget',
      options: [
        {
          value: '',
          label: 'Please choose widget',
        },
        ...optionsWidget[schema[actSchema]?.type || 'string'].map((item) => ({
          label: item,
          value: item,
        })),
      ],
    },
    {
      name: 'Column',
      field: 'w',
      type: 'string',
      required: true,
      widget: 'SelectWidget',
      options: generateColumns(),
    },
  ]

  return (
    <div className='editor-tab mt-3'>
      <span className='shape-left mb-2 pl-1'>
        <Card
          title='Schema'
          extra={
            <Button shape='round' icon={<PlusOutlined />} onClick={handleSchema.add}>
              Add new
            </Button>
          }
          className='br-6px min-h-100'
        >
          <DragDropContext onDragEnd={(result) => props.handleOnDragEnd(result)}>
            <Droppable droppableId='schemas'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {schema.map((sch, key) => (
                    <Draggable
                      key={key.toString() || 'new-schema'}
                      draggableId={key.toString() || 'new-schema'}
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
                            className={`shape-left-step ${key === actSchema ? 'active' : ''}`}
                            onClick={() => {
                              setActSchema(key)
                            }}
                          >
                            <b>{sch.name || 'New Schema'}</b>
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
            actSchema !== null ? (
              <>
                <Button
                  shape='round'
                  icon={<CopyOutlined />}
                  onClick={() => handleSchema.duplicate(actSchema)}
                  className="mr-2"
                >
                  Dupicate
                </Button>
                <Button
                  shape='round'
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleSchema.delete(actSchema)}
                >
                  Delete
                </Button>
              </>
            ) : null
          }
          className='br-6px min-h-100'
        >
          {actSchema !== null ? (
            <Row>
              {FIELDS.map((item) => {
                const { name, field, widget, options } = item
                const Widget = Widgets[widget]
                const row = schema[actSchema] || {}
                const value = row[field]
                return (
                  <Col
                    key={field}
                    sm={12}
                    md={6}
                    order={widget === 'SwitchWidget' ? 1 : 0}
                    className='px-2 mt-2'
                  >
                    <Widget
                      field={field}
                      options={options}
                      label={name}
                      value={value}
                      onChange={(value) => {
                        handleSchema.onChange(field, value)
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

const optionsWidget = {
  string: ['Text', 'TextArea', 'SelectWidget'],
  date: ['DateFormat', 'DatePicker', 'DateRange'],
  number: ['Number'],
  json: ['GrapesEditor'],
  boolean: ['SwitchWidget']
}

const generateColumns = () => {
  let col = []
  for (let i = 1; i < 25; i++) {
    col.push({ value: i.toString(), label: i })
  }
  return col
}

export default TabSchema
