import React, { useState } from 'react'
import { Col, Input, Modal, Row, Typography } from 'antd'
import * as icons from '@ant-design/icons'
import { SearchOutlined } from '@ant-design/icons'
import helper from 'services/helper.js'
import './iconModal.scss'

const IconModal = ({ isOpen, hide }) => {
  const [inputSearch, setInputSearch] = useState('')
  const [iconItems, setIconItems] = useState(
    Object.keys(icons).filter((item) => !invalidKeys.includes(item))
  )

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item)
    hide()
    helper.toast('success', `${item} copied!`)
  }

  const handleInput = (e) => {
    setInputSearch(e.target.value)
  }

  const handleSearchIcon = () => {
    let arr = [...iconItems]
    if (!inputSearch.trim()) {
      setIconItems(Object.keys(icons).filter((item) => !invalidKeys.includes(item)))
    } else {
      arr = arr.filter((item) => item.toLowerCase().includes(inputSearch.toLowerCase()))
      setIconItems(arr)
    }
  }

  return (
    <div>
      <Modal title='Icons' open={isOpen} onCancel={hide} centered width={1300}>
        <Row gutter={16}>
          <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Input
              placeholder='Search icon here, click icon to copy'
              size='large'
              suffix={<SearchOutlined />}
              style={{ width: '400px' }}
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchIcon()
              }}
            />
          </Col>
          {iconItems.map((item, idx) => {
            const Icon = icons[item] || icons.QuestionOutlined
            return (
              <Col span={4} key={idx}>
                <Row
                  className='icon-wp'
                  justify='center'
                  align='middle'
                  onClick={() => handleCopy(item)}
                >
                  <Icon />
                  <Typography.Text>{item}</Typography.Text>
                </Row>
              </Col>
            )
          })}
        </Row>
      </Modal>
    </div>
  )
}

const invalidKeys = [
  'IconProvider',
  'setTwoToneColor',
  'getTwoToneColor',
  'createFromIconfontCN',
  'default',
]

export default IconModal
