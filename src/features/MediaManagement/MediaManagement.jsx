import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Image, Pagination, Row, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMedia } from 'redux/slice/mediaSlice'
import { api, helper } from 'services'
import MediaModal from './components/MediaModal'
import '../dashboard.scss'
import Swal from 'sweetalert2'

const MediaManagement = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState({})
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const [total, setTotal] = useState(10)
  const dispatch = useDispatch()
  const assets = useSelector((state) => state.mediaData.assets)

  const setAssets = (value) => {
    dispatch(setMedia(value))
  }

  useEffect(() => {
    handleAssets.get();
  }, [pagination])

  const handleAssets = {
    start: () => {
      setIsOpen(true)
    },
    get: async () => {
      try {
        handleLoading('getAsset', true)
        const rs = await api.getAssets({ pagination })
        if (rs.errorCode !== 0) return helper.toast('error', 'Get assets fail')
        setAssets(rs.data)
        setTotal(rs.count)
      } catch (error) {
        console.log(error)
      } finally {
        handleLoading('getAsset', false)
      }
    },
    end: () => {
      setIsOpen(false)
    },
    delete: (id) => {
      const confirm = true
      if (confirm) {
        Swal.fire({
          title: 'Are you sure?',
          text: confirm,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const rs = await api.deleteAssets({ id })
            if (rs.errorCode !== 0) return helper.toast('error', 'Delete assets fail')
            Swal.fire({
              title: "Successfully",
              text: rs.message,
              icon: "success"
            })
            try {
              handleLoading('getAsset', true)
              const rsAssets = await api.getAssets({ pagination })
              if (rsAssets.errorCode !== 0) return helper.toast('error', 'Get assets fail')
              setAssets(rsAssets.data)
              setTotal(rsAssets.count)
            } catch (error) {
              console.log(error)
            } finally {
              handleLoading('getAsset', false)
            }
          }
        })
      }
    }
  }

  const handleLoading = (field, value) => {
    const load = { ...isLoading }
    load[field] = value
    setIsLoading(load)
  }

  const handlePagination = (currentPage, pageSize) => {
    const clPag = { ...pagination, current: currentPage, pageSize }
    setPagination(clPag)
  }

  return (
    <div className='bg-color-gray-200 px-4 py-4 mx-2 br-6px'>
      <MediaModal
        open={isOpen}
        onCancel={handleAssets.end}
        getAssets={handleAssets.get}
        isLoading={isLoading['upload']}
        setIsLoading={(value) => {
          handleLoading('upload', value)
        }}
      />
      <div className='bg-color-white px-3 py-3 br-6px bg-dashboard relative'>
        {isLoading.getAssets ? (
          <Spin size='large' />
        ) : (
          <>
            <Typography.Title className='ml-4' level={2}>
              Media management
              <Button
                shape='round'
                size='large'
                type='primary'
                icon={<PlusOutlined />}
                className='float-right'
                onClick={handleAssets.start}
              >
                Add Assets
              </Button>
            </Typography.Title>
            <Row className='media-body px-3 mt-5'>
              {assets.map((asset, key) => (
                <Col xs={24} sm={12} md={8} lg={4} span={4} key={key} className='media-item px-2'>
                  <Image className='media-img' src={asset.url} />
                  <Button
                    type='primary'
                    danger
                    className='media-btn'
                    onClick={() => handleAssets.delete(asset.sid)}
                  >
                    <i class='bi bi-trash'></i>
                  </Button>
                </Col>
              ))}
            </Row>
            <div className='pagination-bottom'>
              <Pagination
                showSizeChanger
                defaultCurrent={pagination.current}
                total={total}
                pageSize={pagination.pageSize}
                onChange={handlePagination}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MediaManagement
