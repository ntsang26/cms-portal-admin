import React, { useEffect, useState } from 'react'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row } from 'antd'
import Widgets from 'utilities/widgetv2'
import helper from 'services/helper.js'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const TabGrid = (props) => {
  const [grid, setGrid] = useState([])
  const [actGrid, setActGrid] = useState(null)

  useEffect(() => {
    setGrid(props.grid)
  }, [props.grid])

  useEffect(() => {
    if (grid[actGrid]?.type) handelGrid.onChange('widget', '')
  }, [grid[actGrid]?.type])

  const handelGrid = {
    add: () => {
      const grd = [...grid]
      if (grd[grd.length - 1]?.name === '') {
        helper.toast('warning', 'Please complete current grid!')
      } else {
        grd.push({
          name: '',
          field: '',
          filterable: 'true',
          type: 'text',
          widget: 'text',
        })
        props.onChange(grd)
      }
    },
    delete: (idx) => {
      const grd = [...grid]
      grd.splice(idx, 1)
      setActGrid(null)
      props.onChange(grd)
    },
    onChange: (field, value) => {
      const clGrid = [...grid]
      clGrid[actGrid][field] = value
      props.onChange(clGrid)
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
      name: 'Filterable',
      field: 'filterable',
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
          label: 'Text',
          value: 'text',
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
          label: "Boolean",
          value: "boolean"
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
        ...optionsWidget[grid[actGrid]?.type || 'text'].map((item) => ({
          label: item,
          value: item.toLowerCase(),
        })),
      ],
    },
  ]

  return (
    <div className='editor-tab mt-3'>
      <span className='shape-left mb-2 pl-1'>
        <Card
          title='Grid'
          extra={
            <Button shape='round' icon={<PlusOutlined />} onClick={handelGrid.add}>
              Add new
            </Button>
          }
          className='br-6px min-h-100'
        >
          <DragDropContext onDragEnd={(result) => props.handleOnDragEnd(result)}>
            <Droppable droppableId='grids'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {grid.map((grd, key) => (
                    <Draggable
                      key={key.toString() || 'new-grid'}
                      draggableId={key.toString() || 'new-grid'}
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
                            className={`shape-left-step ${key === actGrid ? 'active' : ''}`}
                            onClick={() => {
                              setActGrid(key)
                            }}
                          >
                            <b>{grd.name || 'New Grid'}</b>
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
            actGrid !== null ? (
              <Button
                shape='round'
                icon={<DeleteOutlined />}
                danger
                onClick={() => handelGrid.delete(actGrid)}
              >
                Delete
              </Button>
            ) : null
          }
          className='br-6px min-h-100'
        >
          {actGrid !== null ? (
            <Row>
              {FIELDS.map((item) => {
                const { name, field, widget, options } = item
                const Widget = Widgets[widget]
                const row = grid[actGrid] || {}
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
                        handelGrid.onChange(field, value)
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
  text: ['Text'],
  date: ['DateFormat'],
  number: ['Number'],
  boolean: ['SwitchWidget']
}

export default TabGrid
