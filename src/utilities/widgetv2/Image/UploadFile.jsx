import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useState } from 'react'

const UploadFile = ({ value = [], onChange, maxCount }) => {
  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const handleOnChange = ({ fileList: newFileList }) => {
    onChange(newFileList)
  }

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options
    onSuccess('Ok')
  }

  return (
    // <ImgCrop rotate>
    <Upload
      customRequest={uploadImage}
      accept={'.jpg,.jpeg,.gif,.png'}
      listType='picture-card'
      fileList={value}
      onChange={handleOnChange}
      onPreview={onPreview}
      maxCount={maxCount || 1}
    >
      {value.length < 5 && '+ Upload'}
    </Upload>
    // </ImgCrop>
  )
}
export default UploadFile
