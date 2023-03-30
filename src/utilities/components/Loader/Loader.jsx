import React from 'react'
import i18next from 'i18next'
import './style.scss'

function Loader({ tran = false }) {
  return (
    <div className={tran ? 'loader-wrapper' : 'loader--container'}>
      <div className='ripple'>
        <div></div>
        <div></div>
      </div>
      <h4 className='text'>{i18next.t('loading')}</h4>
    </div>
  )
}
export default Loader
