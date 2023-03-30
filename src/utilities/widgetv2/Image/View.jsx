import { Image } from 'antd'
import React from 'react'

const View = (props) => {
  const { value, label, invalid } = props
  return (
    <>
      {label ? <label htmlFor={label}>{`${label}:`}</label> : null}
      <Image src={value} alt={value} />
    </>
  )
}

export default View
