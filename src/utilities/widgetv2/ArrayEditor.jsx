import { Button } from 'antd'
import React from 'react'

/* fields : array || array<Object> 
Object: { 
    label,
    field,
    widget
} 
*/

const ArrayEditor = (props) => {
  const { value, label, fields } = props
  return (
    <div>
      {label ? <label htmlFor={label}>{`${label}:`}</label> : null}
      <Button>Add</Button>
    </div>
  )
}

export default ArrayEditor
