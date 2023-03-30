import React, { useState } from 'react'
import { Input } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

function Text(props) {
  const [isBlur, setIsBlur] = useState(false)
  const { value, schema, field, label, invalid, defaultValue, openModal, type} = props
  const calcType = () => {
    switch (schema?.type || type) {
      case 'number':
        return 'number'
      case 'email':
        return 'email'
      case 'password':
        return 'password'
      default:
        return 'text'
    }
  }

  return (
    <>
      {label ? <label htmlFor={label}>{`${label}:`}</label> : null}
      <Input
        id={label || ''}
        size='large'
        type={calcType()}
        value={value || ''}
        defaultValue={defaultValue}
        disabled={schema?.disabled || false}
        placeholder={schema?.placeholder || ''}
        onBlur={() => setIsBlur(true)}
        onFocus={() => setIsBlur(false)}
        invalid={props.onChange && isBlur ? invalid : null}
        onChange={(e) => {
          if (calcType() === 'number') {
            if (Number(e.target.value) < 0) return
            props.onChange?.(Number(e.target.value))
          } else props.onChange?.(e.target.value)
        }}
        className='br-5px'
        suffix={field === 'icon' ? <InfoCircleOutlined onClick={() => openModal()} /> : null}
        required={true}
      />
    </>
  )
}

export default Text
