import React, { useState } from 'react'
import { Input } from 'antd'

const TextArea = (props) => {
  const { value, schema, label, options } = props
  const [isBlur, setIsBlur] = useState(false)
  return (
    <>
      {label ? <label htmlFor={label}>{`${label}:`}</label> : null}
      <Input.TextArea
        type='textarea'
        rows={5}
        value={props.value || ''}
        disabled={props.schema?.disabled}
        placeholder={props.schema?.placeholder || ''}
        invalid={props.onChange && isBlur ? props.invalid : null}
        onBlur={() => setIsBlur(true)}
        onFocus={() => setIsBlur(false)}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </>
  )
}

export default TextArea
