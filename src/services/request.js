import DeviceDetector from 'device-detector-js'
import i18next from 'i18next'
import { config, helper, local } from 'services'

const deviceDetector = new DeviceDetector()

let request = {}
request.upload = async (url, formData, method = 'POST') => {
  url = `${config.HOST + '/'}${url}`
  let option = {
    method: method,
    body: formData,
    headers: {
      Authorization: `Bearer ${local.get('session') || 'customer'}`,
      device: JSON.stringify(deviceDetector.parse(navigator.userAgent)),
    },
  }
  if (config.debug) console.log(`[POST]`, url, option)
  let res = await fetch(url, option)
  let rs = await res.json()
  if (res.status !== 200) {
    console.log(res)
    throw rs
  }
  if (config.debug) console.log(`[RESPONSE]`, url, rs)
  return rs
}

request.request = async ({ url, data, headers, method = 'POST', isPublic = false }) => {
  try {
    url = `${config.HOST + '/'}${url}`
    let option = {
      method, // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${local.get('session') || 'customer'}`,
        device: JSON.stringify(deviceDetector.parse(navigator.userAgent)),
      },
    }
    option.headers = Object.assign({}, option.headers, headers)
    if (method === 'GET') delete option.body

    if (config.debug) console.log(`[${method}]`, url, option)

    let res = await fetch(url, option)

    let rs = await res.json()
    if (config.debug) console.log(`[RESPONSE]`, url, rs)
    switch (res.status) {
      case 401:
        helper.toast('error', rs.errorMsg || i18next.t('internalServerError'))
        window.location.href = '/#/login'
        break
      case 403:
        helper.toast('error', rs.errorMsg || i18next.t("You don't have permission"))
        break
      case 500:
        helper.toast('error', rs.errorMsg || i18next.t('internalServerError'))
        break
      case 200:
        if (rs && rs.errorCode === 0) {
          return rs
        } else {
          helper.toast('error', rs.errorMsg || i18next.t('internalServerError'))
          break
        }
      case 404:
        if (isPublic) {
          window.location.href = '/#/404'
        } else {
          helper.toast('error', rs.errorMsg || i18next.t('dataNotFound'))
        }
        break
      case 400:
        if (rs.code && rs.code === 'E_MISSING_OR_INVALID_PARAMS') {
          helper.toast('error', 'Invalid parameters')
        } else {
          helper.toast('error', rs.errorMsg || i18next.t('badRequest'))
        }
        break
      default:
        throw rs
    }
    return rs
  } catch (err) {
    helper.toast('error', i18next.t('internalServerError'))
    console.log('res', err)
    throw err
  }
}
export default request
