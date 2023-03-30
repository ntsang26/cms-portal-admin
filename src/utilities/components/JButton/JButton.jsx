import React from 'react'

const JButton = (props) => {
  return (
    <button
      onClick={props?.onClick()}
      onBlur={props?.onBlur()}
      type={props.type || 'button'}
      className={`jbutton ${props.color}`}
    >
      {props.children}
    </button>
  )
}

export default JButton
