import { Button, Result } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'

const Page404 = () => {
  const history = useHistory()

  return (
    // <div className='c-app c-default-layout flex-row align-items-center'>
    //   <div>
    //     <div className='justify-content-center'>
    //       <div md='6'>
    //         <div className='clearfix'>
    //           <h1 className='float-left display-3 mr-4'>404</h1>
    //           <h4 className='pt-3'>Oops! You{"'"}re lost.</h4>
    //           <p className='text-muted float-left'>The page you are looking for was not found.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Result
      status='404'
      title='404'
      subTitle={`Oops! You're lost.`}
      extra={
        <>
          <h4>The page you are looking for was not found.</h4>
          <Button type='primary' onClick={() => history.push('/')}>
            Back Home
          </Button>
        </>
      }
    />
  )
}

export default Page404
