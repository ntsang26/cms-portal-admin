import { request } from 'services'

const paths = {
  common: {
    login: 'user/login',
    getMetaData: 'page/getMeta',
  },
  admin: {},
  user: {
    getUser: 'user/getUser',
    updateUser: 'user/updateUser'
  },
  upload: {
    image: 'api/upload/uploadImage',
    uploadFileZip: 'api/upload/uploadFileZip',
    uploadAssets: 'media/uploadAssets',
  },
  media: {
    deleteAssets: 'media/deleteAssets',
    getAssets: 'media/getAssets',
  },
  model: {
    getModel: 'dynamic/dataModel/smodel',
    createModel: 'smodel/create',
    updateModel: 'smodel/update',
  },
  page: {
    getPage: 'dynamic/dataModel/spage',
    createPage: 'dynamic/dataModel/create/spage',
    updatePage: 'dynamic/dataModel/update/spage',
  },
}

let api = {}
let upload = {}

const flattenObject = (obj) => {
  let flattened = {}
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key]))
    } else {
      flattened[key] = obj[key]
    }
  })
  return flattened
}

const flattenedPaths = flattenObject(paths)

for (let key in flattenedPaths) {
  api[key] = async function (data, options = {}) {
    let { headers, method, isPublic } = options
    return await request.request({
      url: flattenedPaths[key],
      data,
      headers,
      method,
      isPublic,
    })
  }
}

const uploadPaths = paths.upload

for (let key in uploadPaths) {
  upload[key] = async function (formData, method) {
    console.log(uploadPaths[key])
    return await request.upload(uploadPaths[key], formData, method)
  }
}

export { api, upload }
