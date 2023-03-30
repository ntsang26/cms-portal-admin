import { Select, Tag } from 'antd'
import useLocalData from 'hooks/useLocalData'
import React from 'react'

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
        mode='multiple'
        showArrow
        tagRender={tagRender}
        defaultValue={['gold', 'cyan']}
        style={{ width: '100%' }}
        options={options}
        value={value}
        onChange={(e) => props.onChange(e)}
      />
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
