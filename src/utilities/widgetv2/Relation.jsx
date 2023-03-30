import { Select, Tag } from 'antd'
import useLocalData from 'hooks/useLocalData'
import React from 'react'

const { Option } = Select

const Relation = (props) => {
  const { value, schema, label, invalid, apiParams } = props
  const pages = useLocalData(schema?.api, apiParams)

  const options = pages?.map((item) => {
    return { value: item.sid, label: item.name }
  })

  return (
    <>
      {label ? <label htmlFor={label}>{`${label}:`}</label> : null}
      <Select
        showArrow
        size='large'
        style={{ width: '100%' }}
        value={value || ''}
        onChange={(e) => props.onChange(e)}
      >
        <Option value={''}>Please choose option</Option>
        {options?.map((option, key) => (
          <Option value={option.value} key={key}>
            {option.label}
          </Option>
        ))}
      </Select>
    </>
  )
}

const tagRender = (props) => {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color={'#108ee9'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      className={'mr-2'}
    >
      {label}
    </Tag>
  )
}

export default Relation
