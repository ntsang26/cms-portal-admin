// import React, { useEffect, useState } from 'react'
// import { Button, Col, Input, Row, CLabel, CSelect } from 'antd'
// import i18next from 'i18next'
// import { api, helper } from 'services'
// // import { timezone } from 'constant'

// const SignUpForm = ({ pCompany, history, isSelfRegister }) => {
//   const REMOTE_DOMAIN = '.JITS_AI_PORTAl.io'
//   const [company, setCompany] = useState({})
//   const [isLoading, setIsLoading] = useState(false)

//   const onChangeCompany = (prop, value) => {
//     let v = value
//     if (prop === 'phone') {
//       v = v.replace(/[^0-9]/g, '')
//     }
//     if (prop === 'organizationDomain') {
//       v = v.replace(/[^a-z0-9.-]/g, '')
//       v = v.replace('..', '.')
//       if (v.charAt(0) === '.' || v.charAt(0) === '-') {
//         v = v.slice(1)
//       }
//       // if (v.charAt(v.length - 1) === '.') {
//       //   v = v.slice(0, v.length - 1)
//       // }
//     }
//     if (prop === 'email') {
//       v = v.replace(/[^a-zA-Z0-9@.]/g, '')
//     }
//     // if (['organizationName'].includes(prop)) {
//     //   v = v.replace(/[^a-zA-Z0-9 ]/g, '')
//     // }
//     const tem = Object.assign({}, company)
//     if (prop === 'address') {
//       tem[prop] = value
//     } else {
//       tem[prop] = v
//     }
//     setCompany(tem)
//   }

//   const date = new Date()
//   const myTimezone = -date.getTimezoneOffset() / 60
//   const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

//   useEffect(() => {
//     let c = { ...pCompany }
//     c['timezone'] = myTimezone
//     setCompany(c)
//   }, [])
//   const onSignUpClick = async () => {
//     try {
//       setIsLoading(true)
//       let { phone, organizationName, email, name, organizationDomain, address, avatar, timezone } =
//         company
//       if (!phone || !organizationDomain || !email || !name || !organizationName || !timezone) {
//         return helper.toast('error', i18next.t('pleaseFillAll'))
//       }
//       if (phone.length < 9 || phone.length > 11) {
//         return helper.toast('error', i18next.t('Wrong format phone'))
//       }
//       if (!filter.test(email)) {
//         return helper.toast('error', i18next.t('Wrong format email'))
//       }
//       if ((organizationDomain + REMOTE_DOMAIN).includes('..')) {
//         return helper.toast('error', i18next.t('Wrong format Organization Domain'))
//       }
//       let rs = await api.signUpWithGoogle({
//         phone,
//         organizationName,
//         email,
//         name,
//         organizationDomain: organizationDomain + REMOTE_DOMAIN,
//         address,
//         avatar,
//         isSelfRegister,
//         timezone,
//       })
//       if (rs && rs.errorCode === 0) {
//         let domain = REMOTE_DOMAIN,
//           protocol = 'https://'

//         if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//           domain = '.localhost:3000'
//           protocol = 'http://'
//         }

//         let url =
//           protocol + organizationDomain + domain + '/#/login?data=' + JSON.stringify(rs.data)
//         let message = 'Register successfully'
//         if (isSelfRegister) {
//           message = 'Register successfully, please check your mail to get your account'
//           url = protocol + organizationDomain + domain + '/#/login?message=' + message
//         }
//         helper.toast('success', message)

//         window.open(url, '_self')
//       }
//     } catch (err) {
//       console.log('onSignUpClick', err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div>
//       {INFO_COMPANY.map((info) => (
//         <Row className='mb-1' key={info.property}>
//           <Col md='5' className='d-flex align-items-center'>
//             <CLabel className='mb-0'>
//               {i18next.t(info.label)}
//               {info.isRequire ? <span className='danger ml-1'>*</span> : ''}
//             </CLabel>
//           </Col>
//           <Col md='7'>
//             {/* {info.property === 'organizationDomain' ? (
//               <div className='rt-input-input'>
//                 <Input
//                   type='text'
//                   // placeholder={info.placeholder}
//                   value={company[info.property] || ''}
//                   onChange={(e) => onChangeCompany(info.property, e.target.value)}
//                 />
//               </div>
//             ) : (
//               <Input
//                 type='text'
//                 placeholder={info.placeholder}
//                 value={company[info.property] || ''}
//                 disabled={info.property === 'email' && !isSelfRegister}
//                 onChange={(e) => onChangeCompany(info.property, e.target.value)}
//               />
//             )} */}
//             {info.property === 'organizationDomain' && (
//               <div className='rt-input-input'>
//                 <Input
//                   type='text'
//                   // placeholder={info.placeholder}
//                   value={company[info.property] || ''}
//                   onChange={(e) => onChangeCompany(info.property, e.target.value)}
//                 />
//               </div>
//             )}
//             {info.property === 'timezone' && (
//               <CSelect
//                 type='select'
//                 value={company[info.property] || ''}
//                 onChange={(e) => onChangeCompany(info.property, e.target.value)}
//               >
//                 <option>{i18next.t('Please chose timezone')}</option>
//                 {/* {timezone.map((tz, idx) => (
//                   <option value={tz.value} key={idx}>
//                     {tz.text}
//                   </option>
//                 ))} */}
//               </CSelect>
//             )}
//             {!otherInput.includes(info.property) && (
//               <Input
//                 type='text'
//                 placeholder={info.placeholder}
//                 value={company[info.property] || ''}
//                 disabled={info.property === 'email' && !isSelfRegister}
//                 onChange={(e) => onChangeCompany(info.property, e.target.value)}
//               />
//             )}
//           </Col>
//         </Row>
//       ))}

//       <Row className='mb-4'>
//         {/* <Col md='12'>
//           <div>
//             {i18next.t('acceptedPolice')}
//             <a href='#' className='mx-1 primary'>
//               Term of Service
//             </a>
//             &
//             <a href='#' className='mx-1 primary'>
//               Privacy Policy
//             </a>
//           </div>
//         </Col> */}
//       </Row>

//       <Row>
//         <Col xs='6'>
//           <Button
//             color='danger'
//             className='bold'
//             block
//             disabled={isLoading}
//             onClick={() => history.push('/login')}
//           >
//             {i18next.t('cancel')}
//           </Button>
//         </Col>
//         <Col xs='6'>
//           <Button
//             color='primary'
//             type='submit'
//             className='bold mb-1'
//             block
//             disabled={isLoading}
//             onClick={() => onSignUpClick()}
//           >
//             {i18next.t(isLoading ? 'isLoading' : 'register')}
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   )
// }

// export default SignUpForm

// const INFO_COMPANY = [
//   {
//     label: 'organizationDomain',
//     placeholder: 'example.JITS_AI_PORTAl.io',
//     property: 'organizationDomain',
//     isRequire: true,
//   },
//   { label: 'organizationName', placeholder: '', property: 'organizationName', isRequire: true },
//   { label: 'Name', placeholder: '', property: 'name', isRequire: true },
//   { label: 'phone', placeholder: '', property: 'phone', isRequire: true },
//   { label: 'Email', placeholder: '', property: 'email', isRequire: true },
//   { label: 'address', placeholder: '', property: 'address', isRequire: false },
//   { label: 'Timezone', placeholder: '', property: 'timezone', isRequire: true },
// ]

// const otherInput = ['organizationDomain', 'timezone']

import React from 'react'

const SignUpForm = () => {
  return <div>SignUpForm</div>
}

export default SignUpForm
