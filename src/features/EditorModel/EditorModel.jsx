import React, { useEffect, useState } from 'react'
import useQuery from 'hooks/useQuery.js'
import { api, helper } from 'services'
import { Col, Row, Typography, Button, Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Widgets from 'utilities/widgetv2'
import './editorModel.scss'

const EditorModel = () => {
  const [model, setModel] = useState({
    name: '',
    collection: '',
    attributes: [],
  })

  const reactQuery = useQuery()
  const mode = reactQuery.get('mode')
  const modelSid = reactQuery.get('sid')

  useEffect(() => {
    if (mode === 'edit') handleModel.get()
  }, [])

  const handleAttribute = {
    add: () => {
      const att = [...model.attributes]
      if (att[att.length - 1]?.field === '') {
        helper.toast('warning', 'Please complete current attribute!')
      } else {
        att.push({
          field: '',
          type: 'string',
          unique: true,
          required: true,
        })
        handleModel.onChange('attributes', att)
      }
    },
    onChange: (field, value, key) => {
      const clAtt = [...model.attributes]
      clAtt[key][field] = value
      handleModel.onChange('attributes', clAtt)
    },
    delete: (idx) => {
      const att = [...model.attributes]
      att.splice(idx, 1)
      handleModel.onChange('attributes', att)
    },
  }

  const handleModel = {
    onChange: (field, value) => {
      const md = { ...model }
      md[field] = value
      setModel(md)
    },
    get: async () => {
      try {
        const rs = await api.getModel({
          query: { sid: { value: modelSid, operator: '$eq' } },
        })
        const data = rs.data[0]
        data.attributes = convertAttributes.pathToArray(data.attributes)
        setModel(data)
      } catch (error) {
        helper.toast('error')
        console.log(error)
      }
    },
    create: async () => {
      if (validatorModel() === false) {
        try {
          let context = { ...model }
          context['attributes'] = convertAttributes.pathToObject(context['attributes'])
          const rs = await api.createModel({ context })
          if (rs.errorCode === 0) return helper.toast('success')
          window.location.replace(`editorModel?mode=edit&sid=${rs.data[0].sid}`)
        } catch (error) {
          helper.toast('error')
          console.log(error)
        }
      }
    },
    update: async () => {
      if (validatorModel() === false) {
        try {
          let context = { ...model }
          context['attributes'] = convertAttributes.pathToObject(context['attributes'])
          const rs = await api.updateModel({ context })
          if (rs.errorCode === 0) return helper.toast('success')
          window.history.back()
        } catch (error) {
          helper.toast('error')
          console.log(error)
        }
      }
    },
  }

  const convertAttributes = {
    pathToObject: (arr = []) => {
      let obj = arr.reduce(
        (oarr, { field, type, unique, required }) => ({
          ...oarr,
          [field]: {
            type: type,
            unique: unique,
            required: required,
          },
        }),
        {}
      )
      return obj
    },
    pathToArray: (obj = {}) => {
      let arr = Object.keys(obj).map((key) => ({
        field: key,
        type: obj[key]?.type,
        unique: obj[key]?.unique,
        required: obj[key]?.required,
      }))
      return arr
    },
  }

  const validatorModel = () => {
    let attr = model.attributes
    if (model.name === '' || model.collection === '') {
      helper.toast('warning', 'Please complete infomation!')
      return true
    } else if (!attr[attr.length - 1]) {
      helper.toast('warning', 'Please add an attribute!')
      return true
    } else if (attr[attr.length - 1]?.field === '') {
      helper.toast('warning', 'Please complete infomation!')
      return true
    } else {
      return false
    }
  }

  return (
    <div className='bg-color-gray-200 px-4 py-4 mx-2 br-6px'>
      <div className='bg-color-white px-3 py-3 br-6px bg-model'>
        <Row justify='space-between' align='middle'>
          <Col>
            <Typography.Title className='ml-4' level={2}>
              {model?.sid ? model?.name : 'Create new model'}
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
              onClick={mode === 'create' ? handleModel.create : handleModel.update}
            >
              Save
            </Button>
          </Col>
        </Row>
        <Row>
          {FIELDS.map((item) => {
            const { name, field, widget, options, w } = item
            const Widget = Widgets[widget] || Widgets.Text
            return (
              <Col key={field} sm={w || 12} md={w || 6} className='px-2'>
                <Widget
                  field={field}
                  options={options}
                  label={name}
                  value={model[field] || ''}
                  onChange={(value) => {
                    handleModel.onChange(field, value)
                  }}
                />
              </Col>
            )
          })}
        </Row>
        <Row className='mt-2'>
          <Col className='px-2 w-full' span={24}>
            <Card
              title='Attributes'
              extra={
                <Button
                  size='large'
                  shape='round'
                  type='primary'
                  className='mt-3'
                  onClick={handleAttribute.add}
                >
                  Add new attribute
                </Button>
              }
            >
              {model.attributes.map((item, key) => {
                return (
                  <Row key={key} className='mb-2 att-row'>
                    {ATTR_FIELDS.map((item) => {
                      const { name, field, widget, options, w } = item
                      const Widget = Widgets[widget] || Widgets.Text
                      return (
                        <Col
                          key={field}
                          sm={w || 12}
                          md={w || widget === 'SwitchWidget' ? 2 : 6}
                          className='px-2'
                        >
                          <Widget
                            field={field}
                            options={options}
                            label={name}
                            value={model.attributes[key][field]}
                            onChange={(value) => {
                              handleAttribute.onChange(field, value, key)
                            }}
                          />
                        </Col>
                      )
                    })}
                    <Button
                      shape='round'
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleAttribute.delete(key)}
                    >
                      Delete
                    </Button>
                  </Row>
                )
              })}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
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
    name: 'Collection',
    field: 'collection',
    type: 'string',
    required: true,
    widget: 'Text',
  },
]

const ATTR_FIELDS = [
  {
    name: 'Field',
    field: 'field',
    type: 'string',
    required: true,
    widget: 'Text',
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
        label: 'Json',
        value: 'object',
      },
      {
        label: 'Boolean',
        value: 'boolean',
      },
    ],
  },
  {
    name: 'Unique',
    field: 'unique',
    type: 'string',
    required: true,
    widget: 'SwitchWidget',
  },
  {
    name: 'Required',
    field: 'required',
    type: 'string',
    required: true,
    widget: 'SwitchWidget',
  },
]

export default EditorModel
