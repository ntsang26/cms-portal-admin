// import React, { useEffect, useState } from 'react'
// import { Card, CardBody, Col, Row, Button } from 'antd'
// import queryString from 'qs'
// import i18n from 'i18next'
// import SignUpForm from './components/SignUpForm'
// // import logosmall from 'assets/icons/JITS_AI_PORTAl.png'

// const CompanySignUp = (props) => {
//   const [company, setCompany] = useState({})
//   // const [message, setMessage] = useState('')
//   const [isShowConfirm, setShowConfirm] = useState(true)
//   const [isSelfRegister, setSelfRegister] = useState(true) //is register normal, not sign up with google or microsoft

//   useEffect(() => {
//     let query = queryString.parse(props.location.search, {
//       ignoreQueryPrefix: true,
//     })
//     if (query.user) {
//       let com = JSON.parse(query.user)
//       setCompany(com)
//       setSelfRegister(false)
//     } else {
//       setShowConfirm(false)
//       // setMessage(query.message)
//     }
//   }, [])
//   return (
//     <div className='app flex-row align-items-center d-flex' style={{ height: '100vh' }}>
//       <div>
//         <Row className='justify-content-center'>
//           <Col md='6'>
//             <div>
//               <Card className='p-4'>
//                 <CardBody>
//                   <Row className='mb-5'>
//                     <Col md={12} style={{ textAlign: 'center' }}>
//                       {/* <img src={logosmall} className='img-responsive' alt='avatar' /> */}
//                       <br />
//                       {/* <span style={{ fontSize: '20px', fontFamily: 'initial' }}>JITS_AI_PORTAl.io</span> */}
//                     </Col>
//                   </Row>

//                   {/* {message && (
//                     <Row className='mb-4'>
//                       <Col md={12} style={{ textAlign: 'center' }}>
//                         <span style={{ fontSize: '20px', fontFamily: 'initial' }}>
//                           {i18n.t('Your account does not exist, please contact to admin')}
//                         </span>
//                       </Col>
//                     </Row>
//                   )} */}
//                   {isShowConfirm && (
//                     <Row className='mb-4'>
//                       <Col md={12} style={{ textAlign: 'center' }} className='mb-5'>
//                         <span style={{ fontSize: '20px' }}>
//                           {i18n.t('doNotHaveAccountRegisterNew')}{' '}
//                           {company.email ? ' with email: ' + company.email + '?' : '?'}
//                         </span>
//                       </Col>

//                       <Col md='6' className='d-flex justify-content-center'>
//                         <Button
//                           color='danger'
//                           className='w-185px'
//                           onClick={() => props.history.push('/login')}
//                         >
//                           {i18n.t('cancel')}
//                         </Button>
//                       </Col>
//                       <Col md='6' className='d-flex justify-content-center'>
//                         <Button
//                           color='primary'
//                           className='w-185px'
//                           onClick={() => setShowConfirm(false)}
//                         >
//                           {i18n.t('registerNewCompany')}
//                         </Button>
//                       </Col>
//                     </Row>
//                   )}
//                   {!isShowConfirm && (
//                     <SignUpForm
//                       history={props.history}
//                       pCompany={company}
//                       isSelfRegister={isSelfRegister}
//                     />
//                   )}
//                 </CardBody>
//               </Card>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   )
// }

// export default CompanySignUp

import React from 'react'

const CompanySignUp = () => {
  return <div>CompanySignUp</div>
}

export default CompanySignUp
