import React from 'react'
import { Select } from 'antd'
const { Option } = Select

const SelectWidget = (props) => {
  const { value, schema, label, options, defaultValue } = props

  return (
    <>
      {label ? <label htmlFor={label}>{`${label}:`}</label> : null}
      <Select
        id={label ? label : ''}
        className='br-5px'
        size='large'
        onChange={props.onChange}
        value={value}
        defaultValue={defaultValue}
        style={{ width: '100%' }}
      >
        {options?.map((item, idx) => (
          <Option key={idx} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </>
  )
}

export default SelectWidget
