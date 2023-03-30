import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { helper, upload } from 'services'
import Image from 'utilities/widgetv2/Image'

const MediaModal = ({ open, onCancel, isLoading, setIsLoading, getAssets }) => {
  const [selectedFile, setSelectedFile] = useState([])

  useEffect(() => {
    if (!open) setSelectedFile([])
  }, [open])

  const onChange = (newValue) => {
    setSelectedFile(newValue)
  }

  const onOk = async () => {
    try {
      setIsLoading(true)
      const listFile = selectedFile.map((item) => item.originFileObj)
      let formData = new FormData()
      formData.append('image', listFile[0])
      let rs = await upload.uploadAssets(formData)
      if (!rs.link || rs.errorCode !== 0) return helper.toast('error', 'Upload file fail')
      helper.toast('success', 'Upload file done')
      onCancel()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      getAssets()
    }
  }

  return (
    <Modal
      centered
      title={'Upload Assets'}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={isLoading}
    >
      <Image.UploadFile onChange={onChange} value={selectedFile} maxCount={1} />
    </Modal>
  )
}

export default MediaModal
