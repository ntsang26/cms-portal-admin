import React, { useState } from 'react'
import { Input, Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const SwitchWidget = (props) => {
  const { value, schema, label, options, defaultValue } = props
  return (
    <>
      {label ? <label htmlFor={label}>{`${label}:`}</label> : null}
      <br/>
      <Switch
        className='mt-2'
        rows={5}
        checked={props.value || false}
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked={defaultValue || false}
        onChange={(value) => props.onChange?.(value)}
      />
    </>
  )
}

export default SwitchWidget
